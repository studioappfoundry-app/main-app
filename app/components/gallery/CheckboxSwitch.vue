<template>
  <div class="toggle-stack">
    <!-- Checkbox -->
    <label
      v-if="variant === 'checkbox' || variant === 'both'"
      class="check-label"
      :class="classes.checkbox"
    >
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />

      <span class="check-box"></span>
      <span>{{ label }}</span>
    </label>

    <!-- Switch -->
    <label
      v-if="variant === 'switch' || variant === 'both'"
      class="switch-label"
      :class="classes.switch"
    >
      <span>{{ switchLabel }}</span>

      <button
        type="button"
        class="switch"
        :class="{ on: switchValue }"
        :aria-pressed="switchValue"
        @click="$emit('update:switchValue', !switchValue)"
      >
        <i />
      </button>
    </label>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "both",
    validator: (value) => ["checkbox", "switch", "both"].includes(value),
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "Checkbox option",
  },
  switchValue: {
    type: Boolean,
    default: false,
  },
  switchLabel: {
    type: String,
    default: "Toggle option",
  },
  classes: {
    type: Object,
    default: () => ({
      switch: "",
      checkbox: "",
    }),
  },
});

defineEmits(["update:modelValue", "update:switchValue"]);
</script>

<style scoped>
.toggle-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Checkbox Styles */
.check-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--foreground);
  user-select: none;
}
.check-label input {
  display: none;
}
.check-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.check-label input:checked + .check-box {
  background: var(--primary);
  border-color: var(--primary);
}
.check-label input:checked + .check-box::after {
  content: "✓";
  color: var(--card); /* Ikon centang mengikuti warna card/background */
  font-size: 10px;
  font-weight: bold;
}

/* Switch Styles */
.switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 14px;
  color: var(--foreground);
  user-select: none;
}
.switch {
  width: 36px;
  height: 20px;
  background: var(--border);
  border: none;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
  padding: 0;
}
.switch i {
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
.switch.on {
  background: var(--primary);
}
.switch.on i {
  transform: translateX(16px);
}
</style>
