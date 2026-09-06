<template>
  <div class="bg-card min-h-screen p-2 pt-6 lg:p-6 text-foreground">
    <!-- Header Page -->
    <div class="flex gap-4 flex-wrap items-start justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold flex items-center gap-2 mb-1">
          Dashboard Admin
        </h1>
        <p class="text-secondary text-sm">
          Pantau dan kelola semua layanan Appfoundry Studio dengan mudah.
        </p>
      </div>
      <Button variant="primary">
        <div class="flex gap-2 items-center">
          <span>Export Laporan</span>
          <ExternalLink class="w-4 h-4 text-background" />
        </div>
      </Button>
    </div>

    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="bg-background rounded-xl p-5 border border-border shadow-app relative flex flex-col justify-between"
      >
        <div class="flex items-start justify-between mb-3">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center"
            :class="stat.iconClass"
          >
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <span
            v-if="stat.showDot"
            class="w-2 h-2 rounded-full bg-success"
          ></span>
        </div>

        <div>
          <span class="text-xs text-secondary block mb-1 font-medium">{{
            stat.title
          }}</span>
          <div class="text-2xl font-bold tracking-tight mb-2">
            {{ stat.value }}
          </div>

          <div v-if="stat.change" class="flex items-center gap-1 text-xs">
            <span
              :class="
                stat.isUp
                  ? 'text-success flex items-center'
                  : 'text-danger flex items-center'
              "
            >
              <TrendingUp v-if="stat.isUp" class="w-3.5 h-3.5 mr-0.5 inline" />
              <TrendingDown v-else class="w-3.5 h-3.5 mr-0.5 inline" />
              {{ stat.isUp ? "↑" : "↓" }} {{ stat.change }}
            </span>
            <span class="text-muted">dari bulan lalu</span>
          </div>

          <div v-if="stat.subtext" class="text-xs text-danger font-medium">
            {{ stat.subtext }}
          </div>
        </div>
      </div>
    </div>

    <!-- Middle Section: Chart, Progress, Activity -->
    <div class="grid grid-cols-12 gap-6 mb-6">
      <!-- Ringkasan Layanan -->
      <div
        class="col-span-12 md:col-span-6 lg:col-span-3 bg-background rounded-xl p-5 border border-border shadow-app flex flex-col"
      >
        <h3 class="font-bold text-base mb-6">Ringkasan Layanan</h3>

        <div class="flex-1 flex flex-col justify-center items-center">
          <!-- Donut Chart -->
          <DonutChart
            :segments="serviceSegments"
            :center-value="totalServices"
            center-label="Total Layanan"
            :size="176"
            :show-legend="false"
          />

          <!-- Custom Legend -->
          <div class="w-full space-y-3 mt-6">
            <div
              v-for="item in services"
              :key="item.name"
              class="flex items-center justify-between text-xs"
            >
              <div class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rounded-full"
                  :style="{ backgroundColor: item.color }"
                />

                <span class="text-secondary font-medium">
                  {{ item.name }}
                </span>
              </div>

              <span class="text-muted font-medium">
                {{ item.count }} ({{ item.percentage }}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Project -->
      <div
        class="col-span-12 md:col-span-6 lg:col-span-5 bg-background rounded-xl p-5 border border-border shadow-app"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold text-base">Progress Project</h3>
          <Popover
            v-model="selectedStatus"
            size="sm"
            :options="['Semua Project', 'Project Selesai', 'Project Belum']"
          />
        </div>

        <div class="w-full">
          <div
            class="grid grid-cols-12 text-xs text-muted font-medium pb-3 border-b border-border"
          >
            <div class="col-span-4">Client</div>
            <div class="col-span-5">Progress</div>
            <div class="col-span-2">Stage</div>
            <div class="col-span-1"></div>
          </div>

          <div class="divide-y divide-border">
            <div
              v-for="project in projects"
              :key="project.client"
              class="grid grid-cols-12 items-center py-3.5 text-xs"
            >
              <div class="col-span-4 pr-2">
                <div class="font-bold text-foreground">
                  {{ project.client }}
                </div>
                <div class="text-muted text-[11px]">{{ project.domain }}</div>
              </div>

              <div class="col-span-5 pr-4 flex items-center gap-3">
                <ProgressBar :value="project.progress" position="row" />
              </div>

              <div class="col-span-2">
                <Badge :variant="project.progressStatus" size="sm">
                  {{ project.stage }}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Aktivitas Terbaru -->
      <div
        class="col-span-12 lg:col-span-4 bg-background rounded-xl p-5 border border-border shadow-app flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold text-base">Aktivitas Terbaru</h3>
            <Popover
              v-model="selectedAktivity"
              size="sm"
              :options="[
                'Semua Aktivitas',
                'Maintenance',
                'Development',
                'Seo & Geo',
                'Support',
                'Billing',
              ]"
            />
          </div>

          <div class="space-y-4">
            <div
              v-for="(act, idx) in activities"
              :key="idx"
              class="flex items-start gap-3"
            >
              <div
                class="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                :class="act.iconClass"
              >
                <component :is="act.icon" class="w-4 h-4" />
              </div>
              <div class="text-xs leading-relaxed">
                <p class="text-foreground">
                  {{ act.title }}
                  <span class="font-bold">{{ act.highlight }}</span>
                </p>
                <span class="text-muted text-[11px] block mt-0.5">{{
                  act.time
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Maintenance, Tagihan, Akses Cepat -->
    <div class="grid grid-cols-12 gap-6 mb-6">
      <!-- Maintenance Mendekati Berakhir -->
      <div
        class="col-span-12 md:col-span-6 bg-background rounded-xl p-5 border border-border shadow-app"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-base">Maintenance Mendekati Berakhir</h3>
          <NuxtLink
            to="/admin/maintenance"
            class="text-xs font-semibold text-primary hover:underline"
            >Lihat Semua</NuxtLink
          >
        </div>

        <div class="space-y-3">
          <div
            v-for="item in maintenanceExpirations"
            :key="item.name"
            class="flex items-center justify-between p-3 rounded-lg bg-surface border border-border"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg bg-success-soft text-success flex items-center justify-center"
              >
                <ShieldCheck class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-xs">{{ item.name }}</div>
                <div class="text-muted text-[11px]">{{ item.domain }}</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-xs text-muted">Berakhir: {{ item.date }}</span>
              <span
                class="px-2.5 py-1 bg-warning-soft text-warning text-[11px] font-semibold rounded-md"
              >
                {{ item.daysLeft }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tagihan Belum Dibayar -->
      <div
        class="col-span-12 md:col-span-6 bg-background rounded-xl p-5 border border-border shadow-app"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-base">Tagihan Belum Dibayar</h3>
          <NuxtLink
            to="/admin/billing"
            class="text-xs font-semibold text-primary hover:underline"
            >Lihat Semua</NuxtLink
          >
        </div>

        <div class="space-y-3">
          <div
            v-for="inv in unpaidInvoices"
            :key="inv.id"
            class="flex items-center justify-between p-3 rounded-lg bg-surface border border-border"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg bg-danger-soft text-danger flex items-center justify-center"
              >
                <FileText class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-xs">{{ inv.id }}</div>
                <div class="text-muted text-[11px]">{{ inv.client }}</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right">
                <div class="font-bold text-xs">{{ inv.amount }}</div>
                <div class="text-muted text-[11px]">
                  Jatuh tempo: {{ inv.dueDate }}
                </div>
              </div>
              <span
                class="px-2.5 py-1 bg-danger-soft text-danger text-[11px] font-semibold rounded-md"
              >
                Tertunda
              </span>
              <button class="text-muted hover:text-foreground">
                <MoreVertical class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "admin",
  activeTab: "dashboard",
  title: "Dashboard",
});
import { ref } from "vue";
import {
  User,
  Code2,
  ShieldCheck,
  Headphones,
  FileText,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ExternalLink,
  Search,
  Briefcase,
  Receipt,
  Users,
  BarChart2,
  CheckCircleIcon,
} from "~/utils/icons";
const selectedStatus = ref("");
const selectedAktivity = ref("");
const stats = [
  {
    title: "Total Client",
    value: "24",
    change: "20%",
    isUp: true,
    icon: Users,
    iconClass: "text-primary bg-primary-soft",
    showDot: false,
  },
  {
    title: "Project Berjalan",
    value: "8",
    change: "14%",
    isUp: true,
    icon: Briefcase,
    iconClass: "text-success bg-success-soft",
    showDot: true,
  },
  {
    title: "Maintenance Aktif",
    value: "12",
    change: "9%",
    isUp: true,
    icon: ShieldCheck,
    iconClass: "text-success bg-success-soft",
    showDot: true,
  },
  {
    title: "Ticket Terbuka",
    value: "3",
    change: "25%",
    isUp: false,
    icon: Headphones,
    iconClass: "text-warning bg-warning-soft",
    showDot: false,
  },
  {
    title: "Tagihan Belum Dibayar",
    value: "Rp 7.245.500",
    subtext: "5 tagihan tertunda",
    icon: Receipt,
    iconClass: "text-danger bg-danger-soft",
    isAlert: true,
  },
];

const services = [
  {
    name: "Development",
    count: 8,
    color: "var(--success)",
  },
  {
    name: "Maintenance",
    count: 12,
    color: "var(--primary)",
  },
  {
    name: "SEO & GEO",
    count: 7,
    color: "var(--info)",
  },
  {
    name: "Support",
    count: 3,
    color: "var(--warning)",
  },
];

const totalServices = computed(() =>
  services.reduce((total, item) => total + item.count, 0),
);

const serviceSegments = computed(() =>
  services.map((item) => ({
    label: item.name,
    value: Number(((item.count / totalServices.value) * 100).toFixed(1)),
    color: item.color,
  })),
);

const servicesWithPercentage = computed(() =>
  services.map((item) => ({
    ...item,
    percentage: ((item.count / totalServices.value) * 100).toFixed(1),
  })),
);
const projects = [
  {
    client: "Klinik Sehat",
    domain: "kliniksehat.com",
    progress: 75,
    progressColor: "bg-success",
    progressStatus: "success",
    stage: "Development",
    stageClass: "bg-success-soft text-success",
  },
  {
    client: "Cafe Nusantara",
    domain: "cafenusantara.com",
    progress: 45,
    progressColor: "bg-primary",
    progressStatus: "success",
    stage: "Design",
    stageClass: "bg-primary-soft text-primary",
  },
  {
    client: "PT ABC",
    domain: "ptabc.com",
    progress: 90,
    progressColor: "bg-success",
    progressStatus: "success",
    stage: "Review",
    stageClass: "bg-warning-soft text-warning",
  },
  {
    client: "Toko Makmur",
    domain: "tokomakmur.com",
    progress: 30,
    progressColor: "bg-primary",
    progressStatus: "warning",
    stage: "Development",
    stageClass: "bg-success-soft text-success",
  },
];

const activities = [
  {
    icon: CheckCircleIcon,
    iconClass: "text-success",
    title: "Pembayaran diterima dari",
    highlight: "Klinik Sehat - INV-2026-014",
    time: "2 jam yang lalu",
  },
  {
    icon: Code2,
    iconClass: "text-primary",
    title: "Progress project Cafe Nusantara",
    highlight: "diperbarui menjadi 45%",
    time: "3 jam yang lalu",
  },
  {
    icon: ShieldCheck,
    iconClass: "text-success",
    title: "Maintenance mingguan selesai untuk",
    highlight: "PT ABC",
    time: "5 jam yang lalu",
  },
  {
    icon: Headphones,
    iconClass: "text-warning",
    title: "Ticket baru dari Toko Makmur",
    highlight: "Update banner homepage",
    time: "6 jam yang lalu",
  },
  {
    icon: Search,
    iconClass: "text-info",
    title: "Sitemap diperbarui untuk",
    highlight: "Klinik Sehat",
    time: "Kemarin, 10:15",
  },
];

const maintenanceExpirations = [
  {
    name: "PT ABC",
    domain: "ptabc.com",
    date: "18 Agu 2026",
    daysLeft: "7 hari lagi",
  },
  {
    name: "Toko Makmur",
    domain: "tokomakmur.com",
    date: "22 Agu 2026",
    daysLeft: "11 hari lagi",
  },
  {
    name: "Klinik Utama",
    domain: "klinikutama.com",
    date: "28 Agu 2026",
    daysLeft: "17 hari lagi",
  },
];

const unpaidInvoices = [
  {
    id: "INV-2026-018",
    client: "PT ABC",
    amount: "Rp 1.800.000",
    dueDate: "15 Agu 2026",
  },
  {
    id: "INV-2026-017",
    client: "Toko Makmur",
    amount: "Rp 950.000",
    dueDate: "18 Agu 2026",
  },
  {
    id: "INV-2026-016",
    client: "Cafe Nusantara",
    amount: "Rp 2.495.500",
    dueDate: "20 Agu 2026",
  },
];

const quickActions = [
  {
    label: "Tambah Client",
    icon: User,
    iconClass: "text-success bg-success-soft",
  },
  {
    label: "Tambah Project",
    icon: Code2,
    iconClass: "text-success bg-success-soft",
  },
  {
    label: "Catat Maintenance",
    icon: ShieldCheck,
    iconClass: "text-success bg-success-soft",
  },
  {
    label: "Update SEO & GEO",
    icon: Search,
    iconClass: "text-success bg-success-soft",
  },
  {
    label: "Buat Ticket",
    icon: Headphones,
    iconClass: "text-success bg-success-soft",
  },
  {
    label: "Lihat Laporan",
    icon: BarChart2,
    iconClass: "text-success bg-success-soft",
  },
];
</script>
