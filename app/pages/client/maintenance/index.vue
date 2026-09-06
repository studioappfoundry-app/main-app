<template>
  <Modal v-model="openModal">
    <h5 class="text-2xl tracking-tight font-bold mb-5">
      Riwayat Maintenance Website
    </h5>
    <div class="flex flex-col gap-4">
      <div
        v-for="item in dataRiwayat"
        :key="item.id"
        :class="[
          'bg-card border rounded-2xl p-5 shadow-app transition-all duration-200 ease-out flex flex-col md:flex-row md:justify-between group hover:bg-primary cursor-pointer',
        ]"
      >
        <!-- Row 1: Chip Kategori + Badge Status -->
        <div class="flex flex-col justify-between max-md:mb-3 leading-none">
          <div
            class="flex items-center gap-1.5 mb-3 text-secondary group-hover:text-background transition-all duration-200 ease-out"
          >
            <component :is="typeMap[item.type]?.icon" :size="13" />
            <span class="text-[11px] font-semibold">
              {{ typeMap[item.type]?.label }}
            </span>
          </div>

          <!-- Row 2: Judul -->
          <h3
            class="text-sm font-semibold text-foreground mb-1 group-hover:text-background transition-all duration-200 ease-out"
          >
            {{ item.title }}
          </h3>

          <!-- Row 3: Deskripsi (opsional) -->
          <p
            class="text-xs text-muted m-0 mb-2 md:mb-0 group-hover:text-background transition-all duration-200 ease-out"
          >
            {{ item.description }}
          </p>
        </div>
        <!-- Row 4: Meta -->
        <div
          class="flex md:flex-col-reverse items-center md:items-end justify-between gap-3 max-md:border-t border-border pt-3"
        >
          <div
            class="flex items-center gap-1.5 text-xs text-secondary group-hover:text-background transition-all duration-200 ease-out"
          >
            <Calendar class="w-3 h-3" />
            {{ formatTanggalIndo(item.checked_at) }}
          </div>
          <div>
            <Badge
              :variant="statusMap[item.status].variant"
              size="sm"
              class="group-hover:badge"
            >
              {{ statusMap[item.status].label }}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </Modal>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- DEV CONTROLLER: Toggle state untuk melihat kedua gambar -->

      <!-- Breadcrumb -->
      <Breadcumb :items="breadcrumbItems" />

      <div
        class="flex items-center justify-between bg-background p-3 rounded-xl border border-border shadow-app"
      >
        <span class="text-sm font-semibold text-secondary"
          >Pilih Status Maintenance User:</span
        >
        <div class="flex gap-2">
          <button
            @click="isMaintenanceActive = false"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              isMaintenanceActive === false
                ? 'bg-danger-soft text-danger border border-danger/20'
                : 'bg-surface text-secondary hover:bg-background',
            ]"
          >
            Non-Aktif
          </button>
          <button
            @click="isMaintenanceActive = true"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              isMaintenanceActive === true
                ? 'bg-primary-soft text-primary border border-primary/20'
                : 'bg-surface text-secondary hover:bg-background',
            ]"
          >
            Aktif
          </button>
        </div>
      </div>
      <!-- Header Title & Badge -->
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div class="flex items-center space-x-3">
          <h1 class="text-2xl font-bold tracking-tight text-foreground">
            Maintenance
          </h1>
          <Badge :variant="isMaintenanceActive ? 'success' : 'neutral'">{{
            isMaintenanceActive ? "Aktif" : "Belum Aktif"
          }}</Badge>
        </div>
        <p class="text-sm text-secondary">
          {{
            isMaintenanceActive
              ? "Kami menjaga website Anda tetap aman, stabil, dan selalu optimal."
              : "Aktifkan maintenance untuk menjaga website Anda tetap aman dan optimal."
          }}
        </p>
      </div>

      <template v-if="isMaintenanceActive">
        <!-- Main Info Card -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div
            class="flex flex-col items-center md:flex-row items-center space-x-5 gap-2"
          >
            <div
              class="w-16 h-16 rounded-2xl bg-success-soft flex items-center justify-center shrink-0"
            >
              <ShieldCheck :size="36" class="text-success" />
            </div>
            <div>
              <h2
                class="text-xl text-center md:text-left font-bold text-foreground"
              >
                Website Anda dalam kondisi terjaga
              </h2>
              <p class="text-sm text-center md:text-left text-secondary mt-1">
                Kami memantau dan merawat website Anda setiap hari agar tetap
                aman dan berjalan optimal.
              </p>
            </div>
          </div>
          <div
            class="w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6 space-y-2 text-sm min-w-[240px]"
          >
            <div class="flex justify-between lg:justify-start gap-8">
              <span class="text-secondary w-1/2">Status</span>
              <Badge variant="success" size="sm">Aktif</Badge>
            </div>
            <div class="flex justify-between lg:justify-start gap-8">
              <span class="text-secondary w-1/2">Paket</span>
              <span class="font-medium text-foreground">Free Maintenance</span>
            </div>
            <div class="flex justify-between lg:justify-start gap-8">
              <span class="text-secondary w-1/2">Berlaku sampai</span>
              <span class="font-medium text-foreground">11 September 2026</span>
            </div>
          </div>
        </div>

        <!-- Yang Kami Pantau -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-foreground">Yang Kami Pantau</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div
              v-for="(item, index) in monitoredItems"
              :key="index"
              class="bg-background border border-border rounded-xl p-4 flex flex-col items-center text-center space-y-3 shadow-app"
            >
              <div
                class="w-10 h-10 rounded-xl bg-success-soft flex items-center justify-center text-success"
              >
                <component :is="item.icon" :size="20" />
              </div>
              <div>
                <div class="font-semibold text-sm text-foreground">
                  {{ item.title }}
                </div>
                <div class="text-xs text-secondary mt-0.5">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aktivitas Terbaru -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-6"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-foreground">
              Aktivitas Terbaru
            </h3>
            <button
              class="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              @click="openModal = true"
            >
              Lihat Semua <ChevronRight :size="14" />
            </button>
          </div>
          <div class="divide-y divide-border">
            <div
              v-for="(act, index) in recentActivities"
              :key="index"
              class="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-success"
                >
                  <component :is="act.icon" :size="20" />
                </div>
                <div>
                  <div class="text-xs text-secondary">{{ act.date }}</div>
                  <div class="text-sm font-semibold text-foreground mt-0.5">
                    {{ act.title }}
                  </div>
                  <div class="text-xs text-muted mt-0.5">
                    {{ act.subtitle }}
                  </div>
                </div>
              </div>
              <Badge variant="success" size="sm">Selesai</Badge>
            </div>
          </div>
        </div>

        <!-- Banner Peringatan / Promo Upgrade -->
        <div
          class="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style="
            background: var(--success-soft);
            border: 1px solid var(--success-border);
          "
        >
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0"
            >
              <Calendar :size="24" />
            </div>
            <div>
              <div class="font-bold text-foreground text-sm md:text-base">
                Masa maintenance gratis Anda akan berakhir dalam 31 hari.
              </div>
              <div class="text-xs text-secondary mt-0.5">
                Untuk perlindungan berkelanjutan, aktifkan paket maintenance
                berbayar.
              </div>
            </div>
          </div>
          <Button variant="soft-primary" size="sm">
            <div class="flex items-center gap-2">Lihat Paket</div>
          </Button>
        </div>

        <!-- Grid Bawah (Tingkat Perlindungan & Bantuan) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            class="lg:col-span-2 bg-background border border border-border rounded-2xl p-6 shadow-app flex flex-col justify-between space-y-6"
          >
            <div>
              <ProgressBar label="Tingkat Perlindungan" :value="65" />
              <div
                class="w-full bg-surface-soft h-2.5 rounded-full overflow-hidden"
              >
                <div class="bg-success h-full rounded-full w-full"></div>
              </div>
            </div>
            <div class="text-sm text-secondary flex items-center gap-1.5">
              Website Anda terlindung dengan baik.
            </div>
          </div>

          <div
            class="bg-background border border-border rounded-2xl p-6 shadow-app flex flex-col justify-between space-y-4"
          >
            <div>
              <h3 class="text-base font-bold text-foreground">
                Butuh bantuan?
              </h3>
              <p class="text-xs text-secondary mt-1">
                Tim kami siap membantu kapan saja.
              </p>
            </div>
            <div class="flex items-center justify-between pt-2">
              <Button variant="solid" size="sm"
                ><NuxtLink to="/client/bantuan/"
                  >Buat Permintaan</NuxtLink
                ></Button
              >
              <div
                class="w-16 h-12 opacity-80 flex items-center justify-center"
              >
                <Headset :size="32" class="text-muted" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- Hero Belum Aktif Card -->
        <div
          class="bg-background border border-border rounded-2xl p-8 text-center shadow-app space-y-6"
        >
          <div
            class="w-20 h-20 rounded-lg bg-surface-soft mx-auto flex items-center justify-center text-muted border border-border"
          >
            <ShieldAlert :size="40" class="text-secondary" />
          </div>
          <div class="max-w-md mx-auto space-y-2">
            <h2 class="text-2xl font-bold text-foreground">
              Maintenance belum aktif
            </h2>
            <p class="text-sm text-secondary">
              Website Anda belum mendapatkan perlindungan maintenance dari
              Appfoundry.
            </p>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto border-t border-border"
          >
            <div class="flex items-start space-x-3 text-left p-3">
              <div
                class="w-8 h-8 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0 mt-0.5"
              >
                <ShieldCheck :size="18" />
              </div>
              <div>
                <div class="font-semibold text-sm text-foreground">
                  Website lebih aman
                </div>
                <div class="text-xs text-secondary mt-0.5">
                  Terhindar dari error, malware, dan serangan.
                </div>
              </div>
            </div>
            <div class="flex items-start space-x-3 text-left p-3">
              <div
                class="w-8 h-8 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0 mt-0.5"
              >
                <Activity :size="18" />
              </div>
              <div>
                <div class="font-semibold text-sm text-foreground">
                  Performa lebih stabil
                </div>
                <div class="text-xs text-secondary mt-0.5">
                  Website dipantau agar tetap cepat dan stabil.
                </div>
              </div>
            </div>
            <div class="flex items-start space-x-3 text-left p-3">
              <div
                class="w-8 h-8 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0 mt-0.5"
              >
                <Database :size="18" />
              </div>
              <div>
                <div class="font-semibold text-sm text-foreground">
                  Backup terjamin
                </div>
                <div class="text-xs text-secondary mt-0.5">
                  Data website dibackup secara rutin setiap hari.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pilih Paket Section -->
        <div class="space-y-6 pt-4">
          <div class="text-center space-y-2">
            <h3 class="text-2xl font-bold text-foreground">
              Dapatkan perlindungan penuh untuk website Anda
            </h3>
            <p class="text-sm text-secondary">
              Pilih paket maintenance yang sesuai dengan kebutuhan bisnis Anda.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <!-- Paket 3 Bulan -->
            <div
              class="bg-background border-2 border-primary rounded-2xl p-6 shadow-app flex flex-col justify-between relative space-y-6"
            >
              <div class="absolute top-6 right-2">
                <Badge variant="success" size="sm">Rekomendasi</Badge>
              </div>
              <div class="space-y-4">
                <div>
                  <h4 class="text-xl font-bold text-foreground">3 Bulan</h4>
                  <p class="text-xs text-secondary">Maintenance</p>
                </div>
                <div class="flex items-baseline space-x-1">
                  <span class="text-3xl font-extrabold text-foreground"
                    >Rp 450.000</span
                  >
                  <span class="text-xs text-secondary">/ 3 bulan</span>
                </div>
                <ul class="space-y-3 pt-2 text-sm text-secondary">
                  <li
                    v-for="(feat, idx) in pricingFeatures"
                    :key="idx"
                    class="flex items-center space-x-3"
                  >
                    <Check :size="16" class="text-success shrink-0" />
                    <span class="text-foreground">{{ feat }}</span>
                  </li>
                </ul>
              </div>
              <NuxtLink to="/client/maintenance/order" class="w-full">
                <Button class="w-full" variant="primary">
                  Aktifkan Paket 3 Bulan
                </Button>
              </NuxtLink>
            </div>

            <!-- Paket 6 Bulan -->
            <div
              class="bg-background border border-border rounded-2xl p-6 shadow-app flex flex-col justify-between space-y-6"
            >
              <div class="space-y-4">
                <div>
                  <h4 class="text-xl font-bold text-foreground">6 Bulan</h4>
                  <p class="text-xs text-secondary">Maintenance</p>
                </div>
                <div class="flex items-baseline space-x-1">
                  <span class="text-3xl font-extrabold text-foreground"
                    >Rp 800.000</span
                  >
                  <span class="text-xs text-secondary">/ 6 bulan</span>
                </div>
                <ul class="space-y-3 pt-2 text-sm text-secondary">
                  <li
                    v-for="(feat, idx) in pricingFeatures"
                    :key="idx"
                    class="flex items-center space-x-3"
                  >
                    <Check :size="16" class="text-success shrink-0" />
                    <span class="text-foreground">{{ feat }}</span>
                  </li>
                </ul>
              </div>
              <NuxtLink to="/client/maintenance/order" class="w-full">
                <Button variant="primary" class="w-full">
                  Aktifkan Paket 6 Bulan
                </Button></NuxtLink
              >
            </div>
          </div>
        </div>

        <!-- Info Free 1 Bulan Banner -->
        <div
          class="bg-info-soft border border-warning/20 p-4 rounded-xl flex items-center justify-between gap-4"
        >
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 rounded-xl bg-info-soft flex items-center justify-center text-info shrink-0"
            >
              <Clock :size="24" />
            </div>
            <div>
              <div class="font-bold text-foreground text-sm">
                Gratis 1 Bulan Maintenance
              </div>
              <div class="text-xs text-secondary mt-0.5">
                Setiap website mendapatkan maintenance gratis selama 1 bulan
                sejak website aktif.
              </div>
            </div>
          </div>
        </div>

        <!-- Bantuan Section Bawah (Expired) -->
        <div
          class="bg-warning-soft border border-warning/20 p-4 rounded-xl flex items-center justify-between gap-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-xl bg-warning-soft flex items-center justify-center text-warning shrink-0"
            >
              <AlertCircle :size="24" />
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="text-base font-bold text-foreground">
                Punya pertanyaan?
              </h4>
              <p class="text-xs text-secondary">
                Tim kami siap membantu Anda memilih paket yang paling tepat.
              </p>
            </div>
          </div>
          <NuxtLink to="/client/bantuan/">
            <Button variant="soft-warning" size="sm">
              <div class="flex items-center gap-2">Hubungi Kami</div>
            </Button>
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "maintenance",
  title: "Maintenance",
});
import { ref } from "vue";
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  Activity,
  Database,
  Lock,
  RefreshCw,
  Sliders,
  CheckCircle,
  Shield,
  Calendar,
  Headset,
  Check,
  CloudIcon,
  ChevronRight,
  AlertCircle,
  DatabaseBackup,
} from "~/utils/icons";

import { formatTanggalIndo } from "~/utils/helper";
// Default state sesuai permintaan: 1 bulan aktif (true)
const isMaintenanceActive = ref(true);

const openModal = ref(false);

const toggleActiveState = () => {
  isMaintenanceActive.value = !isMaintenanceActive.value;
};

const monitoredItems = [
  { title: "Uptime", desc: "Monitoring 24/7", icon: Clock },
  { title: "Keamanan", desc: "Firewall & Malware", icon: Lock },
  { title: "Backup", desc: "Backup Harian", icon: RefreshCw },
  { title: "Performa", desc: "Kecepatan & Stabilitas", icon: Sliders },
  { title: "Update", desc: "Sistem & Plugin", icon: RefreshCw },
  { title: "Perbaikan", desc: "Bug Minor", icon: CheckCircle },
];

const recentActivities = [
  {
    date: "11 Agu 2026, 02:00",
    title: "Backup harian berhasil dibuat",
    subtitle: "File: backup_20260811_0200.zip",
    icon: CloudIcon,
  },
  {
    date: "10 Agu 2026, 14:35",
    title: "SSL certificate diperiksa",
    subtitle: "SSL aktif dan valid",
    icon: Lock,
  },
  {
    date: "10 Agu 2026, 02:00",
    title: "Backup harian berhasil dibuat",
    subtitle: "File: backup_20260810_0200.zip",
    icon: Database,
  },
  {
    date: "09 Agu 2026, 09:12",
    title: "Website uptime normal",
    subtitle: "Website Anda online 24/7",
    icon: Activity,
  },
  {
    date: "08 Agu 2026, 11:23",
    title: "Pemeriksaan keamanan",
    subtitle: "Tidak ditemukan malware atau ancaman",
    icon: Shield,
  },
];

const pricingFeatures = [
  "Monitoring uptime 24/7",
  "Backup harian",
  "Pemeriksaan keamanan rutin",
  "Update sistem & plugin",
  "Perbaikan bug minor",
  "Support prioritas",
];
const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/client/",
  },
  {
    label: "Maintenance",
  },
];

const dataRiwayat = ref([
  {
    id: 1,
    maintenance_id: 4,
    type: "uptime_check",
    title: "Pengecekan Uptime Server Mingguan",
    status: "completed",
    checked_at: "2026-08-08T00:00:00Z",
    created_at: "2026-08-08T00:00:00Z",
  },
  {
    id: 2,
    maintenance_id: 4,
    type: "backup",
    title: "Backup Database Mingguan",
    status: "completed",
    checked_at: "2026-08-11T00:00:00Z",
    created_at: "2026-08-11T00:00:00Z",
  },
]);

const typeMap = {
  uptime_check: {
    label: "Pengecekan Uptime",
    icon: Activity,
  },
  backup: {
    label: "Backup Database",
    icon: DatabaseBackup,
  },
};

const statusMap = {
  completed: {
    label: "Selesai",
    variant: "success",
  },
};
</script>

<style scoped>
/* Menggunakan font custom dari root jika tersedia */
.font-sans {
  font-family: var(--font-sans);
}
</style>
