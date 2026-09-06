<template>
  <Modal v-model="openModal">
    <h5 class="text-2xl tracking-tight font-bold mb-5">
      Riwayat Development Website
    </h5>
    <div class="px-2">
      <Stepper
        :steps="stepperSteps"
        direction="vertical"
        size="md"
        :current-step="currentStep"
      />
    </div>
  </Modal>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <!-- Breadcrumbs -->
    <Breadcumb :items="breadcrumbItems" />
    <div
      class="flex items-center justify-between bg-background p-3 rounded-xl border border-border shadow-app"
    >
      <span class="text-sm font-semibold text-secondary"
        >Pilih Status Data:</span
      >
      <div class="flex gap-2">
        <button
          @click="isData = false"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            isData === false
              ? 'bg-danger-soft text-danger border border-danger/20'
              : 'bg-surface text-secondary hover:bg-background',
          ]"
        >
          Non-Aktif
        </button>
        <button
          @click="isData = true"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            isData === true
              ? 'bg-primary-soft text-primary border border-primary/20'
              : 'bg-surface text-secondary hover:bg-background',
          ]"
        >
          Aktif
        </button>
      </div>
    </div>
    <section v-if="isData">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-foreground tracking-tight">
          Website Saya
        </h1>
        <p class="text-sm text-secondary mt-1">
          Informasi dan layanan untuk website Anda.
        </p>
      </div>

      <!-- Main Grid Container -->
      <div class="space-y-6">
        <!-- Section 1: Main Overview & Development Progress -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Card: Website Main Overview -->
          <section
            class="bg-background border border-border rounded-xl p-6 shadow-app flex flex-col justify-between"
          >
            <div>
              <!-- Domain Header -->
              <div class="flex items-center space-x-4 mb-6">
                <div
                  class="w-12 h-12 bg-primary-soft rounded-xl text-primary flex items-center justify-center shrink-0"
                >
                  <Globe class="w-6 h-6" />
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h2 class="text-xl font-bold text-foreground break-all">
                      kliniksehat.com
                    </h2>
                    <a href="#" target="_blank">
                      <ExternalLink
                        class="w-4 h-4 text-secondary cursor-pointer hover:text-foreground transition-colors"
                      />
                    </a>
                  </div>
                  <div class="flex items-center space-x-1.5 mt-1">
                    <span
                      class="w-2.5 h-2.5 rounded-full bg-success inline-block"
                    ></span>
                    <span class="text-xs text-success font-semibold"
                      >Online</span
                    >
                  </div>
                </div>
              </div>

              <!-- Details Grid (2 Columns x 4 Rows) -->
              <div class="grid grid-cols-2 gap-y-5 gap-x-6">
                <div class="flex items-start space-x-3">
                  <Box class="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p class="text-xs text-secondary font-medium">Pondasi</p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      Company Profile
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Globe class="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p class="text-xs text-secondary font-medium">Domain</p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      kliniksehat.com
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Layout class="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p class="text-xs text-secondary font-medium">Desain</p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      Custom Basic
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <ShieldCheck class="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p class="text-xs text-secondary font-medium">
                      SSL Certificate
                    </p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      Let's Encrypt
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <LayoutDashboard
                    class="w-4 h-4 text-secondary mt-0.5 shrink-0"
                  />
                  <div>
                    <p class="text-xs text-secondary font-medium">Dashboard</p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      Aktif
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Sliders class="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p class="text-xs text-secondary font-medium">SEO & GEO</p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      Aktif (Premium)
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Server class="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p class="text-xs text-secondary font-medium">Server</p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      Shared Hosting
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Wrench class="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p class="text-xs text-secondary font-medium">
                      Maintenance
                    </p>
                    <p class="text-sm font-semibold text-foreground mt-0.5">
                      Aktif (Free)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Right Card: Development Progress -->
          <section
            class="bg-background border border-border rounded-xl p-6 shadow-app flex flex-col justify-between"
          >
            <div>
              <!-- Card Header -->
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-base font-bold text-foreground">
                  Perkembangan Development
                </h3>
                <Badge variant="warning">Dalam Pengerjaan</Badge>
              </div>

              <!-- Progress Circle & Dates -->
              <div
                class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8"
              >
                <!-- Donut Progress Chart -->
                <div
                  class="relative w-36 h-36 flex items-center justify-center shrink-0"
                >
                  <DonutChart
                    :segments="progressSegments"
                    :show-legend="false"
                    center-label="Progress"
                    :center-value="progressSegments[0].value"
                  />
                </div>

                <!-- Date Details -->
                <div class="space-y-3 w-full sm:w-auto">
                  <div>
                    <p class="text-xs text-secondary font-medium">
                      Target Selesai
                    </p>
                    <p class="text-base font-bold text-foreground">
                      30 September 2026
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-secondary font-medium">Dimulai</p>
                    <p class="text-sm font-semibold text-foreground">
                      12 Agustus 2026
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-secondary font-medium">
                      Estimasi Selesai
                    </p>
                    <p class="text-sm font-semibold text-foreground">
                      30 September 2026
                    </p>
                  </div>
                </div>
              </div>

              <!-- Horizontal Stepper -->
              <div class="relative mb-2">
                <!-- Connecting Line -->
                <div
                  class="absolute top-4 left-6 right-6 h-0.5 bg-border -z-0"
                ></div>

                <div
                  class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 text-center relative z-10 gap-3"
                >
                  <!-- Step 1 -->
                  <div class="flex flex-col items-center">
                    <div
                      class="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center mb-2 shadow-sm"
                    >
                      <Check class="w-4 h-4 stroke-[3]" />
                    </div>
                    <p class="text-xs font-semibold text-foreground mb-1">
                      Perencanaan
                    </p>
                    <Badge variant="success" size="sm">Selesai</Badge>
                  </div>

                  <!-- Step 2 -->
                  <div class="flex flex-col items-center">
                    <div
                      class="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center mb-2 shadow-sm"
                    >
                      <Check class="w-4 h-4 stroke-[3]" />
                    </div>
                    <p class="text-xs font-semibold text-foreground mb-1">
                      Desain
                    </p>
                    <Badge variant="success" size="sm">Selesai</Badge>
                  </div>

                  <!-- Step 3 -->
                  <div class="flex flex-col items-center">
                    <div
                      class="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center mb-2 shadow-sm"
                    >
                      <Code2 class="w-4 h-4" />
                    </div>
                    <p class="text-xs font-semibold text-foreground mb-1">
                      Development
                    </p>
                    <Badge variant="warning" size="sm">Prosess</Badge>
                  </div>

                  <!-- Step 4 -->
                  <div class="flex flex-col items-center">
                    <div
                      class="w-8 h-8 rounded-full bg-background border-2 border-border text-muted flex items-center justify-center mb-2"
                    >
                      <User class="w-4 h-4" />
                    </div>
                    <p class="text-xs font-medium text-secondary mb-1">
                      Testing
                    </p>
                    <Badge variant="neutral" size="sm">Menunggu</Badge>
                  </div>

                  <!-- Step 5 -->
                  <div class="flex flex-col items-center">
                    <div
                      class="w-8 h-8 rounded-full bg-background border-2 border-border text-muted flex items-center justify-center mb-2"
                    >
                      <ShieldCheck class="w-4 h-4" />
                    </div>
                    <p class="text-xs font-medium text-secondary mb-1">
                      Launch
                    </p>
                    <Badge variant="neutral" size="sm">Menuggu</Badge>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Button -->
            <div class="mt-8">
              <Button variant="solid" class="w-full" @click="openModal = true">
                <div class="flex gap-2">
                  <span>Lihat Detail Development</span>
                  <ArrowRight class="w-4 h-4 text-secondary" />
                </div>
              </Button>
            </div>
          </section>
        </div>

        <!-- Section 3: Tech Info, Website Summary, Documents -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Bottom Card 1: Informasi Teknis -->
          <div
            class="bg-background border border-border rounded-xl p-6 shadow-app flex flex-col justify-between"
          >
            <div>
              <h3 class="text-base font-bold text-foreground mb-4">
                Informasi Teknis
              </h3>

              <div class="space-y-3 text-xs">
                <div class="flex justify-between items-center py-1">
                  <span class="text-secondary">Platform</span>
                  <span class="font-semibold text-foreground">Nuxt 3</span>
                </div>
                <div class="flex justify-between items-center py-1">
                  <span class="text-secondary">Bahasa Pemrograman</span>
                  <span class="font-semibold text-foreground"
                    >JavaScript, Vue.js</span
                  >
                </div>
                <div class="flex justify-between items-center py-1">
                  <span class="text-secondary">Database</span>
                  <span class="font-semibold text-foreground">MySQL</span>
                </div>
                <div class="flex justify-between items-center py-1">
                  <span class="text-secondary">Lokasi Server</span>
                  <span class="font-semibold text-foreground"
                    >Indonesia (ID)</span
                  >
                </div>
                <div class="flex justify-between items-center py-1">
                  <span class="text-secondary">Versi PHP</span>
                  <span class="font-semibold text-foreground">8.2</span>
                </div>
                <div class="flex justify-between items-center py-1">
                  <span class="text-secondary">Ukuran Website</span>
                  <span class="font-semibold text-foreground">128 MB</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Card 2: Ringkasan Website -->
          <div
            class="bg-background border border-border rounded-xl p-6 shadow-app flex flex-col justify-between"
          >
            <div>
              <div class="mb-4">
                <h3 class="text-base font-bold text-foreground">
                  Ringkasan Website
                </h3>
                <p class="text-xs text-secondary mt-0.5">
                  Ringkasan singkat performa website Anda.
                </p>
              </div>

              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 text-emerald-600 flex items-center justify-center"
                    >
                      <Radio class="w-4 h-4" />
                    </div>
                    <span class="text-xs text-secondary font-medium"
                      >Status Website</span
                    >
                  </div>
                  <span class="text-xs font-bold text-success">Online</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 text-emerald-600 flex items-center justify-center"
                    >
                      <Target class="w-4 h-4" />
                    </div>
                    <span class="text-xs text-secondary font-medium"
                      >Uptime 30 Hari Terakhir</span
                    >
                  </div>
                  <span class="text-xs font-bold text-success">100%</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 text-emerald-600 flex items-center justify-center"
                    >
                      <Clock class="w-4 h-4" />
                    </div>
                    <span class="text-xs text-secondary font-medium"
                      >Waktu Respons Rata-rata</span
                    >
                  </div>
                  <span class="text-xs font-bold text-success">320 ms</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 text-emerald-600 flex items-center justify-center"
                    >
                      <HardDrive class="w-4 h-4" />
                    </div>
                    <span class="text-xs text-secondary font-medium"
                      >Backup Terakhir</span
                    >
                  </div>
                  <span class="text-xs font-bold text-success"
                    >10 Agu 2026, 02:00</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 4: Bottom Help / Action Banner -->
        <section
          class="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style="
            background: var(--success-soft);
            border: 1px solid var(--success-border);
          "
        >
          <div class="flex items-center space-x-4">
            <div
              class="w-10 h-10 text-success bg-success-soft rounded-xl flex items-center justify-center shrink-0"
            >
              <HelpCircle class="w-5 h-5" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-foreground">
                Butuh perubahan pada website?
              </h4>
              <p class="text-xs text-secondary mt-0.5">
                Ajukan permintaan perubahan konten atau fitur melalui bantuan.
              </p>
            </div>
          </div>
          <Button variant="soft-primary" size="sm">
            <div class="flex items-center gap-2">
              Buat Permintaan
              <ArrowRight class="w-4 h-4" />
            </div>
          </Button>
        </section>
      </div>
    </section>
    <section v-else>
      <div class="max-w-2xl mx-auto mt-4 mb-8">
        <div
          class="bg-background border border-border rounded-2xl p-8 md:p-12 shadow-app text-center space-y-6"
        >
          <div
            class="w-20 h-20 rounded-lg bg-surface-soft flex items-center justify-center mx-auto"
          >
            <Globe class="w-10 h-10 text-muted" />
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground">
              Belum Ada Website Aktif
            </h2>
            <p class="text-sm text-secondary max-w-sm mx-auto">
              Anda belum memiliki website yang terdaftar. Pesan layanan
              pembuatan website untuk mulai mengelola bisnis Anda.
            </p>
          </div>
          <Button variant="solid">
            <NuxtLink to="/client/pemesanan" class="flex items-center gap-2">
              Pesan Website Sekarang
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
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
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "website",
  title: "Websiteku",
});

import {
  Globe,
  ExternalLink,
  Box,
  Layout,
  ShieldCheck,
  LayoutDashboard,
  Sliders,
  Server,
  Wrench,
  Check,
  Code2,
  User,
  ArrowRight,
  Radio,
  Target,
  Clock,
  HardDrive,
  HelpCircle,
  AlertCircle,
  Rocket,
  Lightbulb,
  FlaskConical,
  Palette,
} from "~/utils/icons";
import { formatTanggalIndo } from "~/utils/helper";

const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/client/",
  },
  {
    label: "Website Saya",
  },
];
const progressSegments = [
  {
    label: "Progress",
    value: 65,
    color: "var(--primary)",
  },
];
const isData = ref(true);
const openModal = ref(false);

const dataRiwayat = ref([
  {
    id: 1,
    project_id: 2,
    title: "Setup Repository & Environment",
    description:
      "Inisialisasi project Nuxt.js, struktur folder, dan environment staging.",
    type: "idea",
    status: "done",
    progress: 100,
    activity_date: "2026-05-06T01:00:00Z",
    created_at: "2026-05-06T01:00:00Z",
    updated_at: "2026-05-08T03:00:00Z",
  },
  {
    id: 2,
    project_id: 2,
    title: "Desain UI/UX Halaman Utama",
    description: "Pembuatan wireframe dan desain final untuk landing page.",
    type: "design",
    status: "done",
    progress: 100,
    activity_date: "2026-05-20T01:00:00Z",
    created_at: "2026-05-20T01:00:00Z",
    updated_at: "2026-06-02T03:00:00Z",
  },
  {
    id: 3,
    project_id: 2,
    title: "Integrasi Sistem Pemesanan Online",
    description:
      "Pengembangan modul pemesanan online dan koneksi ke payment gateway.",
    type: "dev",
    status: "in_progress",
    progress: 65,
    activity_date: "2026-08-05T01:00:00Z",
    created_at: "2026-08-05T01:00:00Z",
    updated_at: "2026-08-10T04:30:00Z",
  },
]);
const typeMap = {
  idea: {
    label: "Ide",
    icon: Lightbulb,
  },
  design: {
    label: "Desain",
    icon: Palette,
  },
  dev: {
    label: "Pengembangan",
    icon: Code2,
  },
  testing: {
    label: "Pengujian",
    icon: FlaskConical,
  },
  launch: {
    label: "Peluncuran",
    icon: Rocket,
  },
};

const statusMap = {
  in_progress: {
    label: "Sedang Dikerjakan",
    variant: "warning",
  },
  done: {
    label: "Selesai",
    variant: "success",
  },
};

// Definisi semua tahap yang diharapkan (urutan fix)
// Definisi semua tahap yang diharapkan (urutan fix)
const allTypes = ["idea", "design", "dev", "testing", "launch"];

// Mapping fallback
const fallbackTitles = {
  idea: "Perencanaan & Setup",
  design: "Desain UI/UX",
  dev: "Development",
  testing: "Testing & QA",
  launch: "Deployment & Launch",
};

const fallbackDesc = {
  idea: "Analisis kebutuhan dan inisialisasi project.",
  design: "Pembuatan wireframe, mockup, dan desain final.",
  dev: "Pengkodean frontend, backend, dan integrasi sistem.",
  testing: "Pengujian fungsional, keamanan, dan performa.",
  launch: "Deploy ke production dan go-live.",
};

const currentStep = computed(() => {
  // Cari tahap yang sedang dikerjakan
  const inProgressIndex = allTypes.findIndex((type) => {
    const item = dataRiwayat.value.find((item) => item.type === type);

    return item?.status === "in_progress";
  });

  if (inProgressIndex !== -1) {
    return inProgressIndex;
  }

  // Jika tidak ada in_progress,
  // cari tahap terakhir yang selesai
  let lastDoneIndex = -1;

  allTypes.forEach((type, index) => {
    const item = dataRiwayat.value.find((item) => item.type === type);

    if (item?.status === "done") {
      lastDoneIndex = index;
    }
  });

  // Kalau semua selesai, currentStep tidak lagi diperlukan
  if (lastDoneIndex === allTypes.length - 1) {
    return null;
  }

  // Kalau ada yang sudah selesai,
  // step berikutnya menjadi current
  if (lastDoneIndex !== -1) {
    return lastDoneIndex + 1;
  }

  // Belum ada progress sama sekali
  return 0;
});

// Build stepper steps dari dataRiwayat
const stepperSteps = computed(() => {
  return allTypes.map((type) => {
    const found = dataRiwayat.value.find((item) => item.type === type);

    if (found) {
      return {
        title: found.title,
        description: found.description,
        icon: typeMap[type]?.icon,

        meta:
          found.status === "in_progress"
            ? `${found.progress}% selesai`
            : found.status === "done"
              ? formatTanggalIndo(found.activity_date)
              : undefined,
      };
    }

    return {
      title: fallbackTitles[type],
      description: fallbackDesc[type],
      icon: typeMap[type]?.icon,
    };
  });
});
</script>

<style scoped>
/* Styling Tambahan Minimal jika diperlukan */
</style>
