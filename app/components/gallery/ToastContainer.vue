<template>
  <Teleport to="body">
    <div class="toast-container">
      <transition-group name="toast-list" tag="div" class="toast-stack">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="`toast-${toast.variant}`"
          role="status"
        >
          <!-- Ikon Lucide Vue -->
          <component
            :is="iconMap[toast.variant]"
            :size="20"
            class="toast-icon"
          />

          <!-- Konten -->
          <div class="toast-content">
            <strong>{{ toast.title }}</strong>
            <p v-if="toast.message">{{ toast.message }}</p>
          </div>

          <!-- Tombol Close -->
          <button
            class="toast-close"
            @click="removeToast(toast.id)"
            aria-label="Close"
          >
            <X :size="16" />
          </button>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup>
import { Info, CheckCircle, AlertTriangle, XCircle, X } from "~/utils/icons";

const { toasts, removeToast } = useToast();

// Mapping ikon Lucide ke variant toast
const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10000;
  width: 340px;
  pointer-events: none;
}

.toast-stack {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.toast {
  position: relative;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  width: 100%;
  pointer-events: auto;
  margin-bottom: 12px;
  overflow: hidden;
}

/* Ikon & Efek Blur Glow */
.toast-icon {
  position: relative;
  flex-shrink: 0;
  margin-top: 1px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast::before {
  content: "";
  position: absolute;
  top: -30px;
  left: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  filter: blur(28px);
  opacity: 0.65;
  pointer-events: none;
}

/* Warna Glow (::before) & Ikon - Sesuaikan opacity agar cocok di light/dark */
.toast-info::before {
  background: rgba(56, 189, 248, 0.25);
}
.toast-success::before {
  background: rgba(52, 211, 153, 0.25);
}
.toast-warning::before {
  background: rgba(251, 191, 36, 0.25);
}
.toast-error::before {
  background: rgba(248, 113, 113, 0.25);
}

.toast-info .toast-icon {
  color: #3b82f6;
}
.toast-success .toast-icon {
  color: #10b981;
}
.toast-warning .toast-icon {
  color: #f59e0b;
}
.toast-error .toast-icon {
  color: #ef4444;
}

.toast-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.toast-content strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}
.toast-content p {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.4;
}

.toast-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--muted);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}
.toast-close:hover {
  color: var(--foreground);
}

/* Animasi Stacking */
.toast-list-enter-active,
.toast-list-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}
.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(120%);
}
.toast-list-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
}
.toast-list-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
