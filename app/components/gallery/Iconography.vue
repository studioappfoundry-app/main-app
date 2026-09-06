<template>
  <div class="icon-row">
    <div
      class="icon-box"
      :style="{
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  boxWidth: {
    type: [String, Number],
    default: 40,
  },
  boxHeight: {
    type: [String, Number],
    default: 40,
  },
});

const emit = defineEmits(["select"]);
const selectedIndex = ref(null);

const handleSelect = (index, icon) => {
  selectedIndex.value = index;
  emit("select", icon);
};
</script>

<style scoped>
.icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  pointer-events: none;
}

.icon-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--muted);
  transition: color 0.2s ease;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.icon-action:hover {
  color: var(--foreground);
}
.icon-action:hover .icon-box {
  border-color: var(--muted);
}

/* State Active (saat diklik) */
/* .icon-action.active {
  color: var(--card);
} */
.icon-action.active .icon-box {
  color: var(--card);
}

.icon-label {
  font-size: 12px;
  font-weight: 500;
}
</style>
