<template>
  <div
    class="toggle-card"
    :class="{ 'is-disabled': disabled }"
    @click="handleCardClick"
  >
    <div class="card-icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="card-content">
      <strong>{{ title }}</strong>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <button
      type="button"
      class="toggle-switch"
      :class="{ on: modelValue }"
      :aria-pressed="modelValue"
      :disabled="disabled"
      @click.stop="toggle"
    >
      <i />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "change"]);

const toggle = () => {
  if (props.disabled) return;
  const next = !props.modelValue;
  emit("update:modelValue", next);
  emit("change", next);
};

const handleCardClick = () => {
  if (props.disabled) return;
  toggle();
};
</script>

<style scoped>
.toggle-card {
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
.toggle-card:hover:not(.is-disabled) {
  border-color: var(--muted);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.toggle-card.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
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

.toggle-switch {
  width: 36px;
  height: 20px;
  background: var(--border);
  border: none;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
  padding: 0;
  flex-shrink: 0;
}
.toggle-switch i {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: var(--card);
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.toggle-switch.on {
  background: var(--primary);
}
.toggle-switch.on i {
  transform: translateX(16px);
}
.toggle-switch:disabled {
  cursor: not-allowed;
}
</style>
