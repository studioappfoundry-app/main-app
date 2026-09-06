<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="portal-layer" @mousedown.self="close">
        <transition name="modal-slide" appear>
          <div
            v-if="modelValue"
            class="overlay-panel w-full max-w-full md:max-w-[80vw] lg:max-w-[600px] max-h-[80vh] md:max-h-[90vh] rounded-xl p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <button class="close-btn" v-if="props.unClose" @click="close">
              ✕
            </button>
            <div class="modal-content" v-if="$slots.default">
              <slot></slot>
            </div>

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
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  unClose: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  if (props.unClose) {
    emit("update:modelValue", false);
  }
};
</script>

<style scoped>
.portal-layer {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.overlay-panel {
  background: var(--background);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 1px solid var(--border);
}

.close-btn {
  position: absolute;
  top: 0;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--muted);
  transform: translateY(10px);
  font-size: 14px;
}
.close-btn:hover {
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

.modal-content {
  margin-bottom: 20px;
}

.action-row {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-slide-leave-active {
  transition: all 0.2s ease;
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>
