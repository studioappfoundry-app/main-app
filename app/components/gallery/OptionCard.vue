<template>
  <div
    class="option-card"
    :class="[
      `variant-${variant}`,
      `status-${status}`,
      {
        'is-selected': selected,
        'is-disabled': disabled || isUnavailable,
      },
    ]"
    @click="handleClick"
  >
    <div class="card-icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="card-content">
      <div class="title-row">
        <strong>{{ title }}</strong>

        <span
          v-if="variant === 'availability'"
          class="status-badge"
          :class="`status-${status}`"
        >
          <span class="status-dot"></span>
          {{ statusLabel }}
        </span>
      </div>

      <p v-if="subtitle">{{ subtitle }}</p>
      <p v-if="variant === 'availability' && description" class="desc-text">
        {{ description }}
      </p>
    </div>

    <div class="card-action">
      <!-- Availability: tampilkan harga -->
      <template v-if="variant === 'availability'">
        <span v-if="price != null" class="option-price">
          {{ formattedPrice }}
        </span>
      </template>

      <!-- Default: tampilkan checkmark saat selected -->
      <template v-else>
        <span class="check-indicator" :class="{ 'is-on': selected }">
          <svg
            v-if="selected"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (v) => ["default", "availability"].includes(v),
  },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
  selected: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  // Availability-only
  status: {
    type: String,
    default: "in",
    validator: (v) => ["in", "low", "out"].includes(v),
  },
  price: { type: [Number, String], default: null },
  currencyPrefix: { type: String, default: "Rp" },
});

const emit = defineEmits(["select", "click"]);

const isUnavailable = computed(
  () => props.variant === "availability" && props.status === "out",
);

const statusLabel = computed(() => {
  const map = { in: "Tersedia", low: "Terbatas", out: "Habis" };
  return map[props.status] || "Tersedia";
});

const formattedPrice = computed(() => {
  if (props.price == null || props.price === "") return "";
  const num = Number(String(props.price).replace(/\D/g, ""));
  if (isNaN(num)) return props.price;
  return `${props.currencyPrefix} ${new Intl.NumberFormat("id-ID").format(num)}`;
});

const handleClick = () => {
  if (props.disabled || isUnavailable.value) return;
  if (props.variant === "default" && props.selected) return;
  emit("select");
  emit("click");
};
</script>

<style scoped>
.option-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
}
.option-card:hover:not(.is-disabled):not(.is-selected) {
  border-color: var(--muted);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.option-card.is-selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}
.option-card.is-disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Availability variant: warna border mengikuti status */
.option-card.variant-availability.status-in.is-selected {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}
.option-card.variant-availability.status-low.is-selected {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--background);
  border-radius: 8px;
  font-size: 18px;
  color: var(--foreground);
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.card-content strong {
  font-size: 14px;
  color: var(--foreground);
}
.card-content p {
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}
.desc-text {
  font-size: 11px !important;
}

/* Status Badge (availability) */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.status-badge .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.status-badge.status-in {
  background: rgba(5, 150, 105, 0.15);
  color: #059669;
  border-color: rgba(5, 150, 105, 0.2);
}
.status-badge.status-low {
  background: rgba(217, 119, 6, 0.15);
  color: #d97706;
  border-color: rgba(217, 119, 6, 0.2);
}
.status-badge.status-out {
  background: rgba(220, 38, 38, 0.15);
  color: #dc2626;
  border-color: rgba(220, 38, 38, 0.2);
}

/* Action area */
.card-action {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--muted);
  font-size: 14px;
}
.option-card.is-selected .card-action {
  color: var(--foreground);
}

.option-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--foreground);
  white-space: nowrap;
}

/* Check indicator (default variant) */
.check-indicator {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card);
  color: var(--card);
  transition: all 0.2s ease;
}
.check-indicator.is-on {
  background: var(--primary);
  border-color: var(--primary);
  color: var(--card);
}
</style>
