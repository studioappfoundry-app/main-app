<template>
  <div
    class="error-page bg-card min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
  >
    <div class="h-full flex justify-end z-1000">
      <button
        @click="isDark = !isDark"
        class="absolute top-6 right-6 md:top-8 md:right-8 flex items-center justify-center text-muted hover-text focus:outline-none p-1 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        <Sun v-if="isDark" :size="20" />
        <Moon v-else :size="20" />
      </button>
    </div>

    <!-- Layered ambient glow, tinted per error type -->
    <div class="glow glow-a" :style="{ background: config.glowA }" />
    <div class="glow glow-b" :style="{ background: config.glowB }" />

    <!-- Faint grid texture -->
    <div class="grid-overlay" />

    <div class="relative w-full max-w-[440px]" style="max-width: 440px">
      <div
        class="error-card bg-background border border-border rounded-[28px] px-8 py-10 sm:px-10 sm:py-12 text-center"
      >
        <!-- Status code, oversized display -->
        <div
          class="status-number leading-none font-extrabold tracking-tight mb-1"
          :style="{ color: config.accent }"
        >
          {{ code }}
        </div>

        <!-- Icon -->
        <div
          class="icon-ring mx-auto my-6"
          :style="{ borderColor: config.accentSoft }"
        >
          <component
            :is="config.icon"
            class="w-6 h-6"
            :style="{ color: config.accent }"
          />
        </div>

        <h1
          class="text-[22px] sm:text-2xl font-bold text-foreground mb-3 tracking-tight"
        >
          {{ config.title }}
        </h1>

        <p
          class="text-[13.5px] text-secondary leading-relaxed mb-9 max-w-[320px] mx-auto"
        >
          {{ config.message }}
        </p>

        <!-- Actions -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button class="btn-primary" @click="goHome">
            <Home class="w-4 h-4" />
            <span>{{ homeLabel }}</span>
          </button>

          <button v-if="config.retry" class="btn-ghost" @click="onRetry">
            <RotateCw class="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  Home,
  RotateCw,
  FileQuestion,
  ServerCrash,
  ShieldAlert,
  Lock,
  WifiOff,
  TimerReset,
  AlertTriangle,
  Sun,
  Moon,
} from "~/utils/icons";
const props = defineProps({
  error: { type: Object, default: null },
  homePath: { type: String, default: "/" },
});

const { isDark } = useDarkMode();

const code = computed(() => Number(props.error?.statusCode) || 500);

const errorMap = {
  400: {
    icon: AlertTriangle,
    title: "Permintaan tidak valid",
    message:
      "Data yang dikirim tidak dapat diproses. Periksa kembali input Anda dan coba lagi.",
    accent: "var(--warning)",
    accentSoft: "color-mix(in srgb, var(--warning) 30%, transparent)",
    retry: true,
  },
  401: {
    icon: Lock,
    title: "Sesi Anda telah berakhir",
    message:
      "Anda perlu masuk kembali untuk melanjutkan mengakses halaman ini.",
    accent: "var(--info)",
    accentSoft: "color-mix(in srgb, var(--info) 30%, transparent)",
    retry: false,
  },
  403: {
    icon: ShieldAlert,
    title: "Akses ditolak",
    message:
      "Anda tidak memiliki izin untuk mengakses halaman ini. Hubungi admin jika ini keliru.",
    accent: "var(--danger)",
    accentSoft: "color-mix(in srgb, var(--danger) 30%, transparent)",
    retry: false,
  },
  404: {
    icon: FileQuestion,
    title: "Halaman tidak ditemukan",
    message:
      "Halaman yang Anda cari mungkin sudah dipindahkan, dihapus, atau alamatnya salah.",
    accent: "var(--primary)",
    accentSoft: "color-mix(in srgb, var(--primary) 30%, transparent)",
    retry: false,
  },
  408: {
    icon: TimerReset,
    title: "Waktu permintaan habis",
    message: "Koneksi memakan waktu terlalu lama. Coba muat ulang halaman ini.",
    accent: "var(--warning)",
    accentSoft: "color-mix(in srgb, var(--warning) 30%, transparent)",
    retry: true,
  },
  429: {
    icon: TimerReset,
    title: "Terlalu banyak permintaan",
    message:
      "Anda mengirim permintaan terlalu cepat. Tunggu sebentar lalu coba lagi.",
    accent: "var(--warning)",
    accentSoft: "color-mix(in srgb, var(--warning) 30%, transparent)",
    retry: true,
  },
  500: {
    icon: ServerCrash,
    title: "Terjadi kesalahan pada server",
    message:
      "Ada yang tidak berjalan sebagaimana mestinya di sisi kami. Tim kami sudah diberi tahu.",
    accent: "var(--danger)",
    accentSoft: "color-mix(in srgb, var(--danger) 30%, transparent)",
    retry: true,
  },
  502: {
    icon: WifiOff,
    title: "Server tidak merespons",
    message: "Gagal terhubung ke server. Silakan coba beberapa saat lagi.",
    accent: "var(--danger)",
    accentSoft: "color-mix(in srgb, var(--danger) 30%, transparent)",
    retry: true,
  },
  503: {
    icon: TimerReset,
    title: "Layanan sedang tidak tersedia",
    message:
      "Kami sedang melakukan pemeliharaan singkat. Silakan kembali beberapa saat lagi.",
    accent: "var(--warning)",
    accentSoft: "color-mix(in srgb, var(--warning) 30%, transparent)",
    retry: true,
  },
};

const fallback = {
  icon: AlertTriangle,
  title: "Terjadi kesalahan",
  message: "Sesuatu berjalan tidak sesuai rencana. Silakan coba lagi.",
  accent: "var(--muted)",
  accentSoft: "color-mix(in srgb, var(--muted) 30%, transparent)",
  retry: true,
};

const config = computed(() => {
  const base = errorMap[code.value] || fallback;
  return {
    ...base,
    title: props.error?.statusMessage || base.title,
    message:
      props.error?.message && code.value === 500
        ? props.error.message
        : base.message,
    glowA: `color-mix(in srgb, ${base.accent} 22%, transparent)`,
    glowB: `color-mix(in srgb, ${base.accent} 10%, transparent)`,
  };
});

const homeLabel = computed(() =>
  code.value === 404 ? "Kembali ke Beranda" : "Kembali",
);

const goHome = () => navigateTo(props.homePath);

const onRetry = () => {
  if (import.meta.client) window.location.reload();
};

useHead({
  title: `Error ${code.value} ── Appfoundry`,
});
</script>

<style scoped>
.error-page {
  isolation: isolate;
}

.glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.glow-a {
  width: 520px;
  height: 520px;
  top: -180px;
  left: 50%;
  transform: translateX(-50%);
  animation: drift 12s ease-in-out infinite;
}
.glow-b {
  width: 360px;
  height: 360px;
  bottom: -160px;
  right: 8%;
  animation: drift 14s ease-in-out infinite reverse;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent);
  -webkit-mask-image: radial-gradient(
    ellipse 70% 60% at 50% 35%,
    black,
    transparent
  );
  opacity: 0.5;
}

.error-card {
  position: relative;
  z-index: 1;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 24px 48px -12px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.status-number {
  font-size: clamp(56px, 12vw, 72px);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.icon-ring {
  width: 52px;
  height: 52px;
  border: 1.5px solid;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: 12px;
  background: var(--foreground);
  color: var(--background);
  font-size: 13.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}
.btn-primary:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}
.btn-primary:active {
  transform: translateY(0);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: 12px;
  background: transparent;
  color: var(--foreground);
  font-size: 13.5px;
  font-weight: 600;
  border: 1px solid var(--border);
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background 0.18s ease;
}
.btn-ghost:hover {
  background: var(--card);
  border-color: var(--muted);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-24px, 16px) scale(1.06);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow-a,
  .glow-b,
  .error-card {
    animation: none;
  }
}
</style>
