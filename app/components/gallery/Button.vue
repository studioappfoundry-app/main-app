<template>
  <button
    :class="[
      'btn-base',
      `btn-${variant}`,
      `btn-size-${size}`,
      { 'is-loading': loading, 'is-disabled': disabled || loading },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Render Ripple Effect via Vue State -->
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="ripple-effect"
      :style="ripple.style"
    ></span>

    <!-- Loading Spinner -->
    <span v-if="loading" class="btn-spinner"></span>

    <!-- Icon Left -->
    <slot v-else name="icon-left"></slot>

    <!-- Content -->
    <span class="btn-content"><slot></slot></span>

    <!-- Icon Right -->
    <slot v-if="!loading" name="icon-right"></slot>
  </button>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "solid",
    validator: (v) =>
      [
        // Base
        "solid",
        "soft",
        "ghost",
        "outline",

        // Solid semantic
        "primary",
        "success",
        "danger",
        "info",
        "warning",

        // Soft semantic
        "soft-primary",
        "soft-success",
        "soft-danger",
        "soft-info",
        "soft-warning",
      ].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const ripples = ref([]);
let rippleId = 0;

const handleClick = (event) => {
  if (props.disabled || props.loading) return;

  const btn = event.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const id = rippleId++;
  ripples.value.push({
    id,
    style: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
    },
  });

  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, 600);

  emit("click", event);
};
</script>

<style scoped>
.btn-base {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px solid transparent;
  border-radius: 10px;

  font-family: inherit;
  font-weight: 600;

  cursor: pointer;
  overflow: hidden;

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;

  user-select: none;
  white-space: nowrap;
  isolation: isolate;
}

.btn-size-sm {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 8px;
}

.btn-size-md {
  padding: 9px 16px;
  font-size: 14px;
}

.btn-size-lg {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 12px;
}

.btn-solid {
  background: var(--foreground);
  color: var(--background);
}

.btn-solid:hover:not(.is-disabled) {
  opacity: 0.88;
  transform: translateY(-1px);
}

.btn-soft {
  background: var(--card);
  color: var(--foreground);
  border-color: var(--border);
}

.btn-soft:hover:not(.is-disabled) {
  background: var(--border);
}

.btn-ghost {
  background: transparent;
  color: var(--foreground);
}

.btn-ghost:hover:not(.is-disabled) {
  background: var(--card);
}

.btn-outline {
  background: transparent;
  color: var(--foreground);
  border: 1px solid var(--border) !important;
}

.btn-outline:hover:not(.is-disabled) {
  background: var(--card);
}

.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.btn-primary:hover:not(.is-disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-soft-primary {
  background: var(--primary-soft);
  color: var(--primary);
}

.btn-soft-primary:hover:not(.is-disabled) {
  background: var(--primary);
  color: var(--primary-foreground);
}

.btn-success {
  background: var(--success);
  color: var(--success-foreground);
}

.btn-success:hover:not(.is-disabled) {
  background: var(--success-hover);
  transform: translateY(-1px);
}

.btn-soft-success {
  background: var(--success-soft);
  color: var(--success);
}

.btn-soft-success:hover:not(.is-disabled) {
  background: var(--success);
  color: var(--success-foreground);
}

.btn-danger {
  background: var(--danger);
  color: var(--danger-foreground);
}

.btn-danger:hover:not(.is-disabled) {
  background: var(--danger-hover);
  transform: translateY(-1px);
}

.btn-soft-danger {
  background: var(--danger-soft);
  color: var(--danger);
}

.btn-soft-danger:hover:not(.is-disabled) {
  background: var(--danger);
  color: var(--danger-foreground);
}

.btn-info {
  background: var(--info);
  color: var(--info-foreground);
}

.btn-info:hover:not(.is-disabled) {
  background: var(--info-hover);
  transform: translateY(-1px);
}

.btn-soft-info {
  background: var(--info-soft);
  color: var(--info);
}

.btn-soft-info:hover:not(.is-disabled) {
  background: var(--info);
  color: var(--info-foreground);
}

.btn-warning {
  background: var(--warning);
  color: var(--warning-foreground);
}

.btn-warning:hover:not(.is-disabled) {
  background: var(--warning-hover);
  transform: translateY(-1px);
}

.btn-soft-warning {
  background: var(--warning-soft);
  color: var(--warning);
}

.btn-soft-warning:hover:not(.is-disabled) {
  background: var(--warning);
  color: var(--warning-foreground);
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-content,
.btn-spinner {
  position: relative;
  z-index: 2;
}

.btn-spinner {
  width: 14px;
  height: 14px;

  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;

  animation: spin 0.6s linear infinite;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.35);

  transform: scale(0);
  animation: ripple 0.6s linear;

  pointer-events: none;
  z-index: 1;
}

.btn-soft .ripple-effect,
.btn-soft-primary .ripple-effect,
.btn-soft-success .ripple-effect,
.btn-soft-danger .ripple-effect,
.btn-soft-info .ripple-effect,
.btn-soft-warning .ripple-effect,
.btn-ghost .ripple-effect,
.btn-outline .ripple-effect {
  background: currentColor;
  opacity: 0.12;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
