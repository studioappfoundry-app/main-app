<template>
  <Teleport to="body">
    <transition name="sheet-fade">
      <div
        v-if="modelValue"
        class="portal-layer sheet-layer"
        @mousedown.self="close"
      >
        <transition name="sheet-slide" appear>
          <div v-if="modelValue" class="bottom-sheet">
            <div class="sheet-handle"></div>
            <button class="close-btn" @click="close">✕</button>

            <p class="eyebrow" v-if="eyebrow">{{ eyebrow }}</p>
            <h3 v-if="title">{{ title }}</h3>
            <p class="muted" v-if="message">{{ message }}</p>

            <!-- Slot untuk konten dinamis -->
            <div class="sheet-content">
              <slot></slot>
            </div>

            <!-- Slot untuk footer/tombol -->
            <div class="action-row" v-if="$slots.footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  eyebrow: { type: String, default: "" },
  title: { type: String, default: "" },
  message: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);
</script>

<style scoped>
.portal-layer {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

.bottom-sheet {
  background: var(--card);
  width: 100%;
  max-width: 500px;
  border-radius: 16px 16px 0 0;
  padding: 16px 24px 32px;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-bottom: none;
}

.sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--border);
  border-radius: 999px;
  margin: 0 auto 16px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 14px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}
.close-btn:hover {
  background: var(--background);
  color: var(--foreground);
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  margin: 0 0 8px 0;
  text-transform: uppercase;
}
h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: var(--foreground);
}
.muted {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--muted);
}
.sheet-content {
  margin-bottom: 16px;
}

.action-row {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* Transitions */
.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.3s ease;
}
.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}

.sheet-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.sheet-slide-leave-active {
  transition: transform 0.2s ease;
}
.sheet-slide-enter-from,
.sheet-slide-leave-to {
  transform: translateY(100%);
}
</style>
