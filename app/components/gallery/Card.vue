<template>
  <div
    class="card-base"
    :class="{ 'is-selected': selected, 'is-clickable': clickable }"
    :style="styleVars"
    @click="handleClick"
  >
    <div class="card-icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div class="card-content">
      <strong>{{ title }}</strong>
      <p v-if="subtitle">{{ subtitle }}</p>
      <template v-else>
        <slot />
      </template>
    </div>
    <div class="card-action" v-if="$slots.action || clickable">
      <slot name="action">
        <span class="arrow-icon">↗</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  selected: { type: Boolean, default: false },
  clickable: { type: Boolean, default: true },
  // Props baru untuk kustomisasi warna
  bgColor: { type: String, default: "" },
  hoverBgColor: { type: String, default: "" },
  textColor: { type: String, default: "" },
  hoverTextColor: { type: String, default: "" },
});

const emit = defineEmits(["click", "update:selected"]);

// Mengubah props menjadi CSS Variables agar bisa dipakai di <style>
const styleVars = computed(() => {
  const vars = {};
  if (props.bgColor) vars["--card-bg"] = props.bgColor;
  if (props.hoverBgColor) vars["--card-hover-bg"] = props.hoverBgColor;
  if (props.textColor) vars["--card-text"] = props.textColor;
  if (props.hoverTextColor) vars["--card-hover-text"] = props.hoverTextColor;
  return vars;
});

const handleClick = (e) => {
  if (!props.clickable) return;
  emit("click", e);
  emit("update:selected", !props.selected);
};
</script>

<style scoped>
.card-base {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  /* Pakai var() dengan fallback ke variabel global Anda */
  background: var(--card-bg, var(--card));
  color: var(--card-text, var(--foreground));
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}
.card-base.is-clickable {
  cursor: pointer;
}
.card-base.is-clickable:hover:not(.is-selected) {
  /* Warna hover mengambil dari var baru, fallback ke warna biasa */
  background: var(--card-hover-bg, var(--card-bg, var(--card)));
  color: var(--card-hover-text, var(--card-text, var(--foreground)));
  border-color: var(--muted);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.card-base.is-selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
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
  /* Strong mewarisi warna teks dari card-base */
  color: inherit;
}
.card-content p {
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}

.card-action {
  color: var(--muted);
  font-size: 14px;
}
.card-base.is-selected .card-action {
  color: var(--foreground);
}
</style>
