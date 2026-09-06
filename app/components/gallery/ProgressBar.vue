<template>
  <div class="progress-wrapper" :class="positionValue">
    <div class="progress-header" v-if="label || showValue">
      <span v-if="label" class="progress-label">{{ label }}</span>
      <span v-if="showValue && !indeterminate" class="progress-value">
        {{ valueText }}
      </span>
    </div>

    <div class="progress-track" :class="[`size-${size}`, `variant-${variant}`]">
      <div
        class="progress-fill"
        :class="{
          'is-striped': striped,
          'is-indeterminate': indeterminate,
        }"
        :style="{ width: indeterminate ? '100%' : `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  label: {
    type: String,
    default: "",
  },
  showValue: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: "primary",
    validator: (v) =>
      ["primary", "success", "warning", "danger", "neutral"].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  position: {
    type: String,
    default: "col",
    validator: (v) => ["col", "row"].includes(v),
  },
  striped: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
});

const positionValue = computed(() => {
  return props.position === "col" ? "flex-col" : "flex-row items-center";
});
const percentage = computed(() => {
  if (props.max <= 0) return 0;
  return Math.min(100, Math.max(0, (props.value / props.max) * 100));
});

const valueText = computed(() => {
  if (props.max === 100) return `${Math.round(percentage.value)}%`;
  return `${props.value} / ${props.max}`;
});
</script>

<style scoped>
.progress-wrapper {
  display: flex;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.progress-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
}
.progress-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

.progress-track {
  width: 100%;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

/* Sizes */
.size-sm {
  height: 6px;
}
.size-md {
  height: 8px;
}
.size-lg {
  height: 12px;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
  position: relative;
}

/* Variants - Menggunakan background-color agar bisa ditimpa oleh stripes */
.variant-primary .progress-fill {
  background-color: var(--primary);
}
.variant-success .progress-fill {
  background-color: #22c55e;
}
.variant-warning .progress-fill {
  background-color: #f59e0b;
}
.variant-danger .progress-fill {
  background-color: #ef4444;
}
.variant-neutral .progress-fill {
  background-color: var(--muted);
}

/* Striped Effect */
.is-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.25) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.25) 75%,
    transparent 75%,
    transparent
  );
  background-size: 16px 16px;
  animation: stripe-move 1s linear infinite;
}

@keyframes stripe-move {
  0% {
    background-position: 16px 0;
  }
  100% {
    background-position: 0 0;
  }
}

/* Indeterminate (Loading) State */
.is-indeterminate {
  width: 30% !important;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  animation: indeterminate 1.5s ease-in-out infinite;
}

@keyframes indeterminate {
  0% {
    left: -30%;
    width: 30%;
  }
  50% {
    left: 40%;
    width: 50%;
  }
  100% {
    left: 100%;
    width: 30%;
  }
}
</style>
