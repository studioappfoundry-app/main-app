<template>
  <span
    :class="[
      'badge',
      `badge-${variant}${Bg === true ? '-bg' : ''}`,
      `badge-size-${size}`,
    ]"
  >
    <span v-if="dot" class="badge-dot"></span>
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "neutral",
    validator: (v) =>
      ["success", "warning", "danger", "neutral", "info"].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md"].includes(v),
  },
  Bg: {
    type: Boolean,
    default: false,
  },
  dot: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;

  font-weight: 600;
  border-radius: 999px;
  border: 1px solid transparent;

  white-space: nowrap;
}

.badge-size-sm {
  padding: 2px 8px;
  font-size: 10px;
}

.badge-size-md {
  padding: 4px 10px;
  font-size: 12px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.badge-success {
  background: var(--success-soft);
  color: var(--success);
  border-color: var(--success-border);
}

.badge-warning {
  background: var(--warning-soft);
  color: var(--warning);
  border-color: var(--warning-border);
}

.badge-danger {
  background: var(--danger-soft);
  color: var(--danger);
  border-color: var(--danger-border);
}

.badge-info {
  background: var(--info-soft);
  color: var(--info);
  border-color: var(--info-border);
}
.badge-success-bg {
  background: var(--success-soft-bg);
  color: var(--success);
  border-color: var(--success-border);
}

.badge-warning-bg {
  background: var(--warning-soft-bg);
  color: var(--warning);
  border-color: var(--warning-border);
}

.badge-danger-bg {
  background: var(--danger-soft-bg);
  color: var(--danger);
  border-color: var(--danger-border);
}

.badge-info-bg {
  background: var(--info-soft-bg);
  color: var(--info);
  border-color: var(--info-border);
}
.badge-neutral {
  background: var(--neutral);
  color: var(--muted);
  border-color: var(--border);
}
</style>
