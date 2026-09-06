<template>
  <div
    class="radio-card"
    :class="{
      'is-selected': selected,
      'is-disabled': disabled,
    }"
    @click="handleClick"
  >
    <div class="card-icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="card-content">
      <strong>{{ title }}</strong>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <div class="radio-indicator" :class="{ 'is-on': selected }">
      <span class="radio-outer"></span>
      <span class="radio-inner"></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  selected: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["select", "click"]);

const handleClick = () => {
  if (props.disabled || props.selected) return;
  emit("select");
  emit("click");
};
</script>

<style scoped>
.radio-card {
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
.radio-card:hover:not(.is-selected):not(.is-disabled) {
  border-color: var(--muted);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.radio-card.is-selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}
.radio-card.is-disabled {
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

.radio-indicator {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.radio-outer {
  position: absolute;
  inset: 0;
  border: 2px solid var(--border);
  border-radius: 50%;
  background: var(--card);
  transition: border-color 0.2s ease;
}
.radio-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.2s ease;
}
.radio-indicator.is-on .radio-outer {
  border-color: var(--primary);
}
.radio-indicator.is-on .radio-inner {
  transform: translate(-50%, -50%) scale(1);
}
</style>
