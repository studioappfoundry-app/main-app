<template>
  <div class="bg-card p-2 pt-6 lg:p-6">
    <main v-if="client" class="space-y-6">
      <!-- Header -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <Breadcumb
            :items="[
              { label: 'Dashboard', to: '/admin' },
              { label: 'SEO & GEO', to: '/admin/seo' },
              { label: client.client.name },
            ]"
          />

          <div class="flex items-center gap-3 mt-2">
            <h1 class="text-2xl font-bold text-foreground">
              {{ client.client.name }}
            </h1>

            <span
              :class="[
                'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium',
                client.package === 'Premium'
                  ? 'bg-primary-soft text-primary'
                  : 'bg-info-soft text-info',
              ]"
            >
              {{ client.package }}
            </span>

            <span
              :class="[
                'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium',
                client.status === 'Aktif'
                  ? 'bg-success-soft text-success'
                  : 'bg-surface text-muted',
              ]"
            >
              {{ client.status }}
            </span>
          </div>

          <a
            :href="`https://${client.client.domain}`"
            target="_blank"
            class="inline-flex items-center gap-1 mt-1 text-xs text-muted hover:text-primary"
          >
            <BotMessageSquare class="size-3.5" />

            {{ client.client.domain }}

            <ExternalLink class="size-3" />
          </a>
        </div>

        <!-- Basic -->
        <Button v-if="isBasic" variant="primary">
          <div class="flex gap-2 items-center">
            <Edit class="size-3.5" />
            Edit Setup
          </div>
        </Button>

        <!-- Premium -->
        <Button v-else variant="primary">
          <div class="flex gap-2 items-center">
            <RefreshCw class="size-3.5" />
            Sinkronkan Data
          </div>
        </Button>
      </header>

      <!-- ================= BASIC ================= -->

      <template v-if="isBasic">
        <!-- Stat Cards -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <article
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-info-soft text-info flex items-center justify-center shrink-0"
            >
              <ShieldCheck class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">Paket</p>

              <p class="text-base font-bold text-foreground mt-0.5">
                SEO & GEO Basic
              </p>

              <p class="text-xs text-secondary">Setup & optimasi dasar</p>
            </div>
          </article>

          <article
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-success-soft text-success flex items-center justify-center shrink-0"
            >
              <ShieldCheck class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">Status</p>

              <p class="text-base font-bold text-success mt-0.5">Aktif</p>

              <p class="text-xs text-secondary">Setup selesai</p>
            </div>
          </article>

          <article
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0"
            >
              <CalendarDays class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">Tanggal Setup</p>

              <p class="text-base font-bold text-foreground mt-0.5">
                {{ client.setupDate }}
              </p>
            </div>
          </article>

          <article
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-surface-soft text-secondary flex items-center justify-center shrink-0"
            >
              <BotMessageSquare class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">
                Google Search Console
              </p>

              <p class="text-base font-bold text-foreground mt-0.5">
                Terhubung
              </p>

              <p class="text-xs text-muted">
                {{ client.client.domain }}
              </p>
            </div>
          </article>
        </section>

        <!-- Optimasi Table -->
        <div class="bg-background p-6 rounded-2xl shadow-app">
          <h1 class="text-sm font-bold mb-4">Optimasi SEO & GEO</h1>

          <Table :headers="optimasiHeaders" :data="optimasiBasicList" />
        </div>

        <!-- Banner Upgrade -->
        <div
          class="bg-info-soft rounded-xl border border-border p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div class="flex items-start gap-3">
            <Info class="size-5 text-info shrink-0 mt-0.5" />

            <div>
              <h3 class="text-sm font-bold text-foreground">
                Paket Basic (Setup Saja)
              </h3>

              <p class="text-xs text-secondary mt-1">
                Paket ini mencakup setup dan optimasi dasar SEO & GEO.
                <br />

                Monitoring performa (klik, impressions, posisi kata kunci, dll)
                tersedia pada Paket Premium.
              </p>
            </div>
          </div>

          <button
            class="h-9 px-4 rounded-lg bg-primary text-foreground text-xs font-semibold hover:opacity-90 whitespace-nowrap shrink-0"
          >
            Upgrade ke Premium
          </button>
        </div>
      </template>

      <!-- ================= PREMIUM ================= -->

      <template v-else>
        <!-- Top Stat Cards -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0"
            >
              <ShieldCheck class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">Paket</p>

              <p class="text-base font-bold text-foreground mt-0.5">
                SEO & GEO Premium
              </p>
            </div>
          </div>

          <div
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-success-soft text-success flex items-center justify-center shrink-0"
            >
              <ShieldCheck class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">Status</p>

              <p class="text-base font-bold text-success mt-0.5">
                {{ client.status }}
              </p>

              <p class="text-xs text-secondary">Monitoring aktif</p>
            </div>
          </div>

          <div
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-info-soft text-info flex items-center justify-center shrink-0"
            >
              <CalendarDays class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">Periode Layanan</p>

              <p class="text-sm font-bold text-foreground mt-0.5">
                01 Agu 2026 - 01 Agu 2027
              </p>
            </div>
          </div>

          <div
            class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
          >
            <div
              class="size-12 rounded-xl bg-info-soft text-info flex items-center justify-center shrink-0"
            >
              <RefreshCw class="size-6" />
            </div>

            <div>
              <p class="text-xs font-medium text-muted">Data Terakhir</p>

              <p class="text-sm font-bold text-foreground mt-0.5">
                12 Agu 2026
              </p>

              <p class="text-xs text-muted">10:23</p>
            </div>
          </div>
        </section>

        <!-- Metric Cards -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Impressions -->
          <div
            class="bg-background p-4 rounded-xl border border-border shadow-app space-y-2"
          >
            <div class="flex items-center gap-2 text-xs text-muted font-medium">
              <div class="flex bg-info-soft rounded-sm text-info p-1">
                <Eye class="size-4" />
              </div>
              Impressions
            </div>

            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-foreground">
                {{ client.performance.impressions }}
              </span>

              <span
                class="inline-flex items-center gap-0.5 text-xs font-semibold text-success"
              >
                <TrendingUp class="size-3" />
                24,8%
              </span>
            </div>

            <p class="text-[10px] text-muted">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-info stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,15 L20,10 L40,14 L60,5 L80,12 L100,2"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- Clicks -->
          <div
            class="bg-background p-4 rounded-xl border border-border shadow-app space-y-2"
          >
            <div class="flex items-center gap-2 text-xs text-muted font-medium">
              <div class="flex bg-info-soft rounded-sm text-info p-1">
                <MousePointerClick class="size-4" />
              </div>
              Clicks
            </div>

            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-foreground">
                {{ client.performance.clicks }}
              </span>

              <span
                class="inline-flex items-center gap-0.5 text-xs font-semibold text-success"
              >
                <TrendingUp class="size-3" />
                18,2%
              </span>
            </div>

            <p class="text-[10px] text-muted">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-info stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,18 L20,12 L40,15 L60,8 L80,10 L100,4"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- CTR -->
          <div
            class="bg-background p-4 rounded-xl border border-border shadow-app space-y-2"
          >
            <div class="flex items-center gap-2 text-xs text-muted font-medium">
              <div class="flex bg-warning-soft rounded-sm text-warning p-1">
                <Percent class="size-4 text-warning" />
              </div>
              CTR
            </div>

            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-foreground"> 4,02% </span>

              <span
                class="inline-flex items-center gap-0.5 text-xs font-semibold text-success"
              >
                <TrendingUp class="size-3" />
                6,1%
              </span>
            </div>

            <p class="text-[10px] text-muted">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-warning stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,12 L20,16 L40,8 L60,14 L80,6 L100,10"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- Avg Position -->
          <div
            class="bg-background p-4 rounded-xl border border-border shadow-app space-y-2"
          >
            <div class="flex items-center gap-2 text-xs text-muted font-medium">
              <div class="flex bg-success-soft rounded-sm text-success p-1">
                <TrendingUp class="size-4" />
              </div>
              Avg. Position
            </div>

            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-foreground">
                {{ client.performance.avgPos }}
              </span>

              <span
                class="inline-flex items-center gap-0.5 text-xs font-semibold text-success"
              >
                <TrendingUp class="size-3" />
                1,3
              </span>
            </div>

            <p class="text-[10px] text-muted">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-success stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,8 L20,14 L40,10 L60,16 L80,5 L100,12"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </section>

        <!-- Chart & Tables -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Chart -->
          <section
            class="col-span-12 bg-background p-6 rounded-xl border border-border shadow-app space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-bold text-foreground">
                Performa Klik & Impressions

                <span class="text-xs font-normal text-muted">
                  (30 Hari Terakhir)
                </span>
              </h2>
            </div>

            <MultiLineChart
              :categories="[
                '12 Jul',
                '14 Jul',
                '16 Jul',
                '18 Jul',
                '20 Jul',
                '22 Jul',
                '24 Jul',
                '26 Jul',
                '28 Jul',
                '30 Jul',
                '1 Agu',
                '3 Agu',
                '5 Agu',
                '7 Agu',
                '9 Agu',
                '11 Agu',
              ]"
              :series="[
                {
                  name: 'Klik',
                  data: [
                    280, 295, 270, 310, 300, 325, 315, 340, 330, 350, 342, 360,
                    352, 370, 365, 382,
                  ],
                  color: '#3b82f6',
                },
                {
                  name: 'Impressions',
                  data: [
                    7200, 7500, 7100, 7800, 7600, 8100, 7950, 8350, 8200, 8600,
                    8450, 8800, 8650, 9100, 9250, 9500,
                  ],
                  color: '#10b981',
                },
              ]"
              :judul="false"
            />
          </section>

          <!-- Keywords -->
          <section
            class="col-span-12 md:col-span-6 bg-background p-6 rounded-2xl shadow-app"
          >
            <h1 class="text-sm font-bold mb-4">Kata Kunci Teratas</h1>

            <Table :headers="keywordHeaders" :data="topKeywords" />
          </section>

          <!-- Pages -->
          <section
            class="col-span-12 md:col-span-6 bg-background p-6 rounded-2xl shadow-app"
          >
            <h1 class="text-sm font-bold mb-4">Halaman Teratas</h1>

            <Table :headers="pageHeaders" :data="topPages" />
          </section>
        </div>

        <!-- Setup -->
        <section
          class="bg-background p-5 rounded-xl border border-border shadow-app space-y-3"
        >
          <h2 class="text-sm font-bold text-foreground">
            Optimasi SEO & GEO

            <span class="text-xs font-normal text-muted"> (Setup) </span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <Globe class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Google Search Console
                  </h4>
                  <p class="text-[10px] text-success font-medium">
                    Terhubung & Aktif
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <FileCode class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Meta Title & Description
                  </h4>
                  <p class="text-[10px] text-info font-medium">Dioptimalkan</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <MapPin class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Google Business Profile
                  </h4>
                  <p class="text-[10px] text-success font-medium">
                    Terverifikasi
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <Network class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Sitemap</h4>
                  <p class="text-[10px] text-success font-medium">
                    Aktif & Terindex
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <FileText class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Structured Data
                  </h4>
                  <p class="text-[10px] text-success font-medium">Aktif</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <MapPin class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Local SEO</h4>
                  <p class="text-[10px] text-info font-medium">Dioptimalkan</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <FileText class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Robots.txt</h4>
                  <p class="text-[10px] text-info font-medium">
                    Terkonfigurasi
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-lg">
                  <BarChart2 class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Core Web Vitals
                  </h4>
                  <p class="text-[10px] text-success font-medium">Baik</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-lg">
                  <Bot class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    GEO (AI Visibility)
                  </h4>
                  <p class="text-[10px] text-info font-medium">Dioptimalkan</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>
          </div>
        </section>

        <!-- Footer Info -->
        <div
          class="bg-surface p-4 rounded-xl border border-border flex items-center gap-2 text-xs text-muted"
        >
          <Info class="size-4 shrink-0 text-secondary" />

          <span>
            <strong class="text-foreground"> Data performa diambil </strong>

            langsung dari

            <strong> Google Search Console dan diperbarui </strong>

            secara otomatis setiap hari.
          </span>
        </div>
      </template>
    </main>

    <!-- Not Found -->
    <div
      v-else
      class="min-h-[60vh] flex flex-col items-center justify-center gap-4"
    >
      <h1 class="text-xl font-bold text-foreground">
        Data SEO tidak ditemukan
      </h1>

      <button
        @click="navigateTo('/admin/seo')"
        class="h-10 px-4 rounded-lg bg-primary text-foreground text-sm font-medium"
      >
        Kembali ke SEO & GEO
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import {
  ChevronLeft,
  CalendarDays,
  ExternalLink,
  ShieldCheck,
  BotMessageSquare,
  MoreHorizontal,
  RefreshCw,
  Info,
  CheckCircle2,
  MousePointerClick,
  Eye,
  Percent,
  BarChart2,
  TrendingUp,
  Edit,
  Bot,
  Globe,
  FileCode,
  MapPin,
  Network,
  FileText,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "seo",
  title: "Detail SEO & GEO",
});

const route = useRoute();

const seoList = [
  {
    id: 1,

    client: {
      name: "Klinik Sehat",
      domain: "kliniksehat.com",
    },

    package: "Premium",
    status: "Aktif",

    setupDate: "09 Agustus 2026",

    performance: {
      impressions: "9.500",
      clicks: "382",
      avgPos: "7,8",
    },
  },

  {
    id: 2,

    client: {
      name: "Cafe Nusantara",
      domain: "cafenusantara.com",
    },

    package: "Basic",
    status: "Aktif",

    setupDate: "09 Agustus 2026",

    performance: null,
  },

  {
    id: 3,

    client: {
      name: "PT ABC",
      domain: "ptabc.com",
    },

    package: "Premium",
    status: "Aktif",

    setupDate: "09 Agustus 2026",

    performance: {
      impressions: "15.240",
      clicks: "624",
      avgPos: "5,2",
    },
  },

  {
    id: 4,

    client: {
      name: "Toko Makmur",
      domain: "tokomakmur.com",
    },

    package: "Belum Aktif",
    status: "Nonaktif",

    setupDate: null,

    performance: null,
  },

  {
    id: 5,

    client: {
      name: "Studio Utama",
      domain: "studioutama.com",
    },

    package: "Premium",
    status: "Aktif",

    setupDate: "09 Agustus 2026",

    performance: {
      impressions: "6.320",
      clicks: "241",
      avgPos: "8,9",
    },
  },
];

const id = computed(() => Number(route.params.id));

const client = computed(() => {
  return seoList.find((item) => item.id === id.value);
});

const isBasic = computed(() => {
  return client.value?.package === "Basic";
});

const optimasiHeaders = [
  {
    key: "optimasi",
    label: "Optimasi",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "deskripsi",
    label: "Deskripsi",
  },
  {
    key: "tanggal",
    label: "Tanggal Selesai",
  },
];

const keywordHeaders = [
  {
    key: "kataKunci",
    label: "Kata Kunci",
  },
  {
    key: "klik",
    label: "Klik",
  },
  {
    key: "impresi",
    label: "Impresi",
  },
  {
    key: "posisi",
    label: "Posisi",
  },
];

const pageHeaders = [
  {
    key: "halaman",
    label: "Halaman",
  },
  {
    key: "klik",
    label: "Klik",
  },
  {
    key: "impresi",
    label: "Impressions",
  },
];

const optimasiBasicList = [
  {
    optimasi: "Google Search Console",
    status: "Selesai",
    deskripsi: "Website didaftarkan dan diverifikasi",
    tanggal: "01 Agu 2026",
  },
  {
    optimasi: "Sitemap",
    status: "Selesai",
    deskripsi: "Sitemap dibuat dan dikirim ke Google",
    tanggal: "01 Agu 2026",
  },
  {
    optimasi: "Meta Title & Description",
    status: "Selesai",
    deskripsi: "Meta title dan description dioptimalkan",
    tanggal: "08 Agu 2026",
  },
  {
    optimasi: "Structured Data (Schema)",
    status: "Selesai",
    deskripsi: "Structured data terpasang pada halaman utama",
    tanggal: "08 Agu 2026",
  },
  {
    optimasi: "Robots.txt",
    status: "Selesai",
    deskripsi: "Robots.txt dikonfigurasi dengan benar",
    tanggal: "01 Agu 2026",
  },
  {
    optimasi: "GEO Readiness",
    status: "Selesai",
    deskripsi: "Struktur konten dioptimalkan untuk AI Search",
    tanggal: "10 Agu 2026",
  },
];

const topKeywords = [
  {
    kataKunci: "klinik sehat",
    klik: "120",
    impresi: "1.800",
    posisi: "1,6",
  },
  {
    kataKunci: "dokter terdekat",
    klik: "58",
    impresi: "1.050",
    posisi: "2,4",
  },
  {
    kataKunci: "layanan kesehatan",
    klik: "32",
    impresi: "680",
    posisi: "3,1",
  },
  {
    kataKunci: "klinik umum",
    klik: "24",
    impresi: "520",
    posisi: "4,2",
  },
  {
    kataKunci: "dokter spesialis",
    klik: "18",
    impresi: "450",
    posisi: "5,6",
  },
];

const topPages = [
  {
    halaman: "/",
    klik: "132",
    impresi: "2.900",
  },
  {
    halaman: "/layanan",
    klik: "88",
    impresi: "1.600",
  },
  {
    halaman: "/tentang-kami",
    klik: "46",
    impresi: "780",
  },
  {
    halaman: "/kontak",
    klik: "34",
    impresi: "520",
  },
  {
    halaman: "/blog/health-tips",
    klik: "22",
    impresi: "350",
  },
];

const setupBadges = [
  {
    title: "Google Search Console",
    status: "Terhubung",
  },
  {
    title: "Sitemap",
    status: "Aktif",
  },
  {
    title: "Meta Title & Description",
    status: "Dioptimalkan",
  },
  {
    title: "Structured Data",
    status: "Aktif",
  },
  {
    title: "Robots.txt",
    status: "Terkonfigurasi",
  },
  {
    title: "GEO Readiness",
    status: "Dioptimalkan",
  },
];
</script>
