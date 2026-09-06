<template>
  <div class="qty-card" :class="{ 'is-disabled': disabled }">
    <div class="card-icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="card-content">
      <strong>{{ title }}</strong>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <div class="qty-stepper">
      <button
        type="button"
        class="qty-btn"
        :disabled="disabled || modelValue <= min"
        @click="decrease"
        aria-label="Decrease"
      >
        −
      </button>

      <input
        type="text"
        class="qty-input"
        :value="modelValue"
        :disabled="disabled"
        :readonly="!editable"
        inputmode="numeric"
        @input="onInput"
        @blur="onBlur"
      />

      <button
        type="button"
        class="qty-btn"
        :disabled="disabled || modelValue >= max"
        @click="increase"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 99 },
  step: { type: Number, default: 1 },
  editable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "change"]);

const clamp = (v) => Math.min(props.max, Math.max(props.min, v));

const emitValue = (v) => {
  const next = clamp(v);
  if (next === props.modelValue) return;
  emit("update:modelValue", next);
  emit("change", next);
};

const increase = () => emitValue(props.modelValue + props.step);
const decrease = () => emitValue(props.modelValue - props.step);

const onInput = (e) => {
  const raw = e.target.value.replace(/\D/g, "");
  emitValue(raw === "" ? props.min : Number(raw));
};

const onBlur = (e) => {
  // Re-sync displayed value if invalid/empty
  e.target.value = props.modelValue;
};
</script>

<style scoped>
.qty-card {
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
}
.qty-card.is-disabled {
  opacity: 0.5;
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

.qty-stepper {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 3px;
  flex-shrink: 0;
}

.qty-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--foreground);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.15s ease;
  padding: 0;
}
.qty-btn:hover:not(:disabled) {
  background: var(--card);
  color: var(--primary);
}
.qty-btn:active:not(:disabled) {
  transform: scale(0.92);
}
.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-input {
  width: 36px;
  text-align: center;
  border: none;
  background: transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--foreground);
  outline: none;
  padding: 0;
}
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.qty-input:disabled {
  cursor: not-allowed;
}
</style>
