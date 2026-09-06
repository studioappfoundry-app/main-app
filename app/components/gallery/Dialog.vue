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
            <!-- Close -->
            <button
              type="button"
              class="close-btn"
              aria-label="Close"
              @click="closeModal"
            >
              ✕
            </button>

            <!-- Content -->
            <div class="panel-content">
              <h3 class="text-center font-semibold">
                {{ title }}
              </h3>

              <p class="text-center muted">
                {{ message }}
              </p>

              <!-- Actions -->
              <div class="action-row mt-5">
                <slot name="footer">
                  <Button variant="outline" @click="closeModal">
                    Kembali
                  </Button>

                  <Button :variant="variant" @click="confirmAction">
                    {{ confirmText }}
                  </Button>
                </slot>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  variant: {
    type: String,
    default: "neutral",
    validator: (value) =>
      ["danger", "primary", "neutral", "warning", "info"].includes(value),
  },

  title: {
    type: String,
    default: "Are you sure?",
  },

  message: {
    type: String,
    default: "Please confirm this action.",
  },

  confirmText: {
    type: String,
    default: "Confirm",
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const confirmAction = () => {
  emit("confirm");
  closeModal();
};
</script>

<style scoped>
.portal-layer {
  position: fixed;
  inset: 0;
  z-index: 999999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}

.overlay-panel {
  --panel-color: var(--foreground);
  --panel-soft: var(--surface-soft);

  position: relative;
  isolation: isolate;

  width: 100%;
  max-width: 400px;
  overflow: hidden;

  border: 1px solid var(--border);
  border-radius: 28px;

  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--panel-color) 32%, white) 0%,
    color-mix(in srgb, var(--panel-color) 18%, white) 24%,
    color-mix(in srgb, var(--panel-color) 8%, white) 52%,
    var(--surface) 82%
  );

  box-shadow:
    0 24px 60px rgba(16, 24, 40, 0.12),
    0 8px 24px rgba(16, 24, 40, 0.06);

  color: var(--foreground);
}

.panel-primary {
  --panel-color: var(--primary);
  --panel-soft: var(--primary-soft);
}

.panel-danger {
  --panel-color: var(--danger);
  --panel-soft: var(--danger-soft-bg);
}

.panel-warning {
  --panel-color: var(--warning);
  --panel-soft: var(--warning-soft-bg);
}

.panel-info {
  --panel-color: var(--info);
  --panel-soft: var(--info-soft-bg);
}

.panel-neutral {
  --panel-color: var(--foreground);
  --panel-soft: var(--neutral);
}

.overlay-panel::before {
  content: "";

  position: absolute;
  z-index: -1;

  width: 220px;
  height: 220px;

  top: -120px;
  left: 50%;

  transform: translateX(-50%);

  border-radius: 50%;

  background: color-mix(in srgb, var(--panel-color) 15%, transparent);

  filter: blur(25px);

  pointer-events: none;
}

.panel-content {
  position: relative;
  z-index: 2;

  padding: 72px 28px 28px;
}

.close-btn {
  position: absolute;
  z-index: 5;

  top: 18px;
  right: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  padding: 0;

  border: 0;
  border-radius: var(--radius-xl);

  background: color-mix(in srgb, var(--surface) 55%, transparent);

  color: var(--foreground);

  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    color 0.2s ease;
}

.close-btn:hover {
  background: var(--surface);
  color: var(--foreground);

  transform: scale(1.05);
}

.close-btn:active {
  transform: scale(0.96);
}

h3 {
  margin: 0 0 10px;

  font-family: var(--font-sans);
  font-size: var(--text-xl, 24px);
  font-weight: 700;
  line-height: 1.25;

  color: var(--foreground);
}

.muted {
  max-width: 340px;

  margin: 0 auto;

  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.6;

  color: var(--text-secondary);
}

.action-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 8px;
}

.control-button,
.action-btn {
  padding: 8px 16px;

  border-radius: var(--radius-sm);

  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;
}

/* Cancel */

.control-button {
  border: 1px solid var(--border);
}

.control-button.soft {
  background: var(--surface);
  color: var(--foreground);
}

.control-button.soft:hover {
  background: var(--hover);
  border-color: var(--border-strong);
}

/* Confirm */

.action-btn {
  border: 0;
}

.btn-danger {
  background: var(--danger);
  color: var(--danger-foreground);
}

.btn-danger:hover {
  background: var(--danger-hover);
}

.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-neutral {
  background: var(--foreground);
  color: var(--background);
}

.btn-neutral:hover {
  background: var(--ink);
}

.btn-warning {
  background: var(--warning);
  color: var(--warning-foreground);
}

.btn-warning:hover {
  background: var(--warning-hover);
}

.btn-info {
  background: var(--info);
  color: var(--info-foreground);
}

.btn-info:hover {
  background: var(--info-hover);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active {
  transition:
    opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;

  transform: translateY(20px) scale(0.96);
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 480px) {
  .portal-layer {
    padding: 16px;
  }

  .overlay-panel {
    max-width: 100%;

    border-radius: 24px;
  }

  .panel-content {
    padding: 64px 22px 22px;
  }

  .action-row {
    flex-direction: column;
  }

  .action-row :deep(button) {
    width: 100%;
  }
}
</style>
