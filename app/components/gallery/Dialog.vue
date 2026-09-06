<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="portal-layer" @mousedown.self="closeModal">
        <transition name="modal-slide" appear>
          <div
            v-if="modelValue"
            class="overlay-panel"
            :class="`panel-${variant}`"
            role="alertdialog"
            aria-modal="true"
          >
            <button class="close-btn" @click="closeModal">✕</button>

            <p class="eyebrow" v-if="eyebrow">{{ eyebrow }}</p>
            <h3>{{ title }}</h3>
            <p class="muted">{{ message }}</p>

            <div class="action-row">
              <slot name="footer">
                <button class="control-button soft" @click="closeModal">
                  Cancel
                </button>
                <button
                  class="action-btn"
                  :class="`btn-${variant}`"
                  @click="confirmAction"
                >
                  {{ confirmText }}
                </button>
              </slot>
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
  variant: { type: String, default: "default" },
  eyebrow: { type: String, default: "" },
  title: { type: String, default: "Are you sure?" },
  message: { type: String, default: "This action cannot be undone." },
  confirmText: { type: String, default: "Confirm" },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const closeModal = () => emit("update:modelValue", false);
const confirmAction = () => {
  emit("confirm");
  closeModal();
};
</script>

<style scoped>
.portal-layer {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.overlay-panel {
  background: var(--card);
  border-radius: var(--radius);
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 1px solid var(--border);
}
.panel-danger {
  border-top: 4px solid #ef4444;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--muted);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}
.close-btn:hover {
  background: var(--background);
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;
  margin: 0 0 8px 0;
  text-transform: uppercase;
}
h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: var(--foreground);
}
.muted {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.control-button {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 14px;
}
.control-button.soft {
  background: var(--background);
  color: var(--foreground);
}
.control-button.soft:hover {
  background: var(--border);
}

.action-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  color: var(--card);
  font-size: 14px;
}
.btn-default {
  background: var(--foreground);
}
.btn-default:hover {
  background: #333; /* Sedikit lebih terang dari foreground untuk efek hover */
}
.btn-danger {
  background: #ef4444;
}
.btn-danger:hover {
  background: #dc2626;
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
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
</style>
