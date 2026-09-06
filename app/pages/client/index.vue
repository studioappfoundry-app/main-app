<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
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
    <section class="mx-auto space-y-6" v-if="isData">
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <p class="text-sm text-muted mb-2">Selamat datang kembali,</p>

          <h1
            class="text-2xl font-bold text-foreground flex items-center gap-2"
          >
            Kedai Kopi Senja
          </h1>

          <p class="text-sm text-muted mt-1">
            Website Anda aktif dan berjalan dengan baik.
          </p>
        </div>

        <Button variant="soft-success">
          <NuxtLink to="/#" class="flex items-center gap-2">
            Kunjungi Website
            <ExternalLink class="w-4 h-4" />
          </NuxtLink>
        </Button>
      </header>
      <!-- Stats Atas -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="@container bg-background p-4 rounded-xl border border-border shadow-sm relative"
          v-if="statusDev"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-muted">
              Status Website
            </span>

            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>

          <div class="flex flex-col @min-[150px]:flex-row items-start gap-3">
            <div class="p-2.5 text-success bg-success-soft rounded-xl">
              <Globe class="w-5 h-5" />
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="font-bold text-lg leading-tight text-foreground">
                Online
              </h3>

              <a
                href="#"
                target="_blank"
                class="text-xs text-muted mt-0.5 flex items-center gap-1 cursor-pointer break-all"
              >
                kedaisenja.com
                <ExternalLink class="w-3 h-3 inline" />
              </a>
            </div>
          </div>

          <p class="text-xs text-success font-medium mt-4">
            Website dapat diakses
          </p>
        </div>

        <div
          class="@container bg-background p-4 rounded-xl border border-border shadow-sm"
          v-else
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-muted">
              Progres Project
            </span>

            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>

          <div class="flex flex-col @min-[150px]:flex-row items-start gap-3">
            <div class="p-2.5 bg-success-soft text-success rounded-xl">
              <Briefcase class="w-5 h-5" />
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="font-bold text-lg leading-tight text-foreground">
                80%
              </h3>

              <p class="text-xs text-muted mt-0.5">Development</p>
            </div>
          </div>
          <div class="mt-2">
            <ProgressBar :value="65" />
          </div>

          <p class="text-xs text-muted mt-2">4 dari 5 tahap selesai</p>
        </div>

        <div
          class="@container bg-background p-4 rounded-xl border border-border shadow-sm"
        >
          <span class="text-xs font-semibold text-muted block mb-3">
            Tagihan Berikutnya
          </span>

          <div class="flex flex-col @min-[150px]:flex-row items-start gap-3">
            <div class="p-2.5 text-danger bg-danger-soft rounded-xl shrink-0">
              <Receipt class="w-5 h-5" />
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="font-bold text-lg leading-tight text-danger">
                Rp 612.500
              </h3>

              <p class="text-xs text-muted mt-0.5">Jatuh tempo: 20 Agu 2026</p>

              <Badge variant="danger" size="sm"> Belum dibayar </Badge>
            </div>
          </div>

          <NuxtLink to="/client/tagihan">
            <Button variant="danger" size="sm" class="w-full mt-3">
              Bayar Sekarang
            </Button>
          </NuxtLink>
        </div>

        <div
          class="@container bg-background p-4 rounded-xl border border-border shadow-sm flex flex-col justify-between"
        >
          <div>
            <span class="text-xs font-semibold text-muted block mb-3">
              Domain
            </span>

            <div class="flex flex-col @min-[150px]:flex-row items-start gap-3">
              <div
                class="p-2 bg-success-soft text-success rounded-xl text-xs font-bold"
              >
                .com
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="font-bold text-sm text-foreground break-all">
                  kedaisenja.com
                </h3>

                <span class="text-xs font-medium text-success"> Aktif </span>
              </div>
            </div>
          </div>

          <p class="text-xs text-muted mt-4">Berakhir: 11 Agu 2027</p>
        </div>

        <div
          class="@container bg-background p-4 rounded-xl border border-border shadow-sm flex flex-col justify-between"
        >
          <div>
            <span class="text-xs font-semibold text-muted block mb-3">
              Maintenance
            </span>

            <div class="flex flex-col @min-[150px]:flex-row items-start gap-3">
              <div class="p-2.5 bg-success-soft text-success rounded-xl">
                <ShieldCheck class="w-5 h-5" />
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="font-bold text-lg leading-tight text-success">
                  Aktif
                </h3>

                <p class="text-xs text-muted mt-0.5 flex items-center gap-1">
                  Free Maintenance
                  <Info class="w-3 h-3 inline text-muted" />
                </p>
              </div>
            </div>
          </div>

          <p class="text-xs text-muted mt-4">Berakhir: 11 Sep 2026</p>
        </div>
      </section>
      <!-- Ringkasan dan Seo -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-5 space-y-6">
          <div
            class="bg-background p-5 rounded-xl border border-border shadow-sm"
          >
            <h2 class="font-bold text-foreground text-base mb-4">
              Ringkasan Website
            </h2>

            <div class="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
              <div class="flex items-center gap-2">
                <Server class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">Server</span>
              </div>

              <div class="font-medium text-foreground">Shared Hosting</div>

              <div class="flex items-center gap-2">
                <ShieldCheck class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">SSL Certificate</span>
              </div>

              <div class="font-medium text-foreground">Let's Encrypt</div>

              <div class="flex items-center gap-2">
                <Compass class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">SEO & GEO</span>
              </div>

              <div>
                <Badge variant="success" size="sm"> Aktif (Premium) </Badge>
              </div>

              <div class="flex items-center gap-2">
                <Percent class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">Maintenance</span>
              </div>

              <div>
                <Badge variant="success" size="sm"> Aktif (Free) </Badge>
              </div>

              <div class="flex items-center gap-2">
                <Box class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">Pondasi</span>
              </div>

              <div class="font-medium text-foreground">Company Profile</div>

              <div class="flex items-center gap-2">
                <Layout class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">Desain</span>
              </div>

              <div class="font-medium text-foreground">Custom Basic</div>

              <div class="flex items-center gap-2">
                <Folder class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">Dashboard/CMS</span>
              </div>

              <div>
                <Badge variant="success" size="sm"> Aktif </Badge>
              </div>

              <div class="flex items-center gap-2">
                <Server class="w-4 h-4 text-muted shrink-0" />
                <span class="text-muted">Server</span>
              </div>

              <div class="font-medium text-foreground">Shared Hosting</div>
            </div>
          </div>

          <div
            class="bg-background p-5 rounded-xl border border-border shadow-sm"
          >
            <div class="flex justify-between items-center mb-4">
              <h2 class="font-bold text-foreground text-base">
                Aktivitas Terbaru
              </h2>
              <NuxtLink
                to="/client/maintenance"
                class="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                Lihat semua aktivitas <ChevronRight :size="14" />
              </NuxtLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 text-success shrink-0">
                  <CheckCircle2 class="w-4 h-4" />
                </div>

                <div>
                  <p class="text-xs font-medium text-foreground">
                    Pembayaran DP diterima
                  </p>

                  <p class="text-[11px] text-muted">11 Agu 2026, 10:23</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="p-2 text-success shrink-0">
                  <Cloud class="w-4 h-4" />
                </div>

                <div>
                  <p class="text-xs font-medium text-foreground">
                    Backup otomatis berhasil
                  </p>

                  <p class="text-[11px] text-muted">09 Agu 2026, 02:00</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="p-2 text-success shrink-0">
                  <Rocket class="w-4 h-4" />
                </div>

                <div>
                  <p class="text-xs font-medium text-foreground">
                    Website berhasil dipublish
                  </p>

                  <p class="text-[11px] text-muted">09 Agu 2026, 15:40</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="p-2 text-success shrink-0">
                  <ShieldCheck class="w-4 h-4" />
                </div>

                <div>
                  <p class="text-xs font-medium text-foreground">
                    SSL certificate diperbarui
                  </p>

                  <p class="text-[11px] text-muted">08 Agu 2026, 09:12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="lg:col-span-7 bg-background p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <h2 class="font-bold text-foreground text-base">
                  SEO & GEO Performance
                </h2>

                <Badge variant="success" size="sm"> Premium </Badge>
              </div>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div class="border border-border p-3 rounded-xl bg-card">
                <div
                  class="flex items-center gap-1 text-[11px] text-muted mb-1"
                >
                  <Eye class="w-3.5 h-3.5 text-info" />
                  Impressions
                </div>

                <div class="flex flex-wrap items-baseline gap-1.5">
                  <span class="text-lg font-bold text-foreground"> 9.500 </span>

                  <span
                    class="text-[10px] font-semibold text-info flex items-center"
                  >
                    ↑ 24,8%
                  </span>
                </div>

                <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

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

              <div class="border border-border p-3 rounded-xl bg-card">
                <div
                  class="flex items-center gap-1 text-[11px] text-muted mb-1"
                >
                  <MousePointerClick class="w-3.5 h-3.5 text-info" />
                  Clicks
                </div>

                <div class="flex flex-wrap items-baseline gap-1.5">
                  <span class="text-lg font-bold text-foreground"> 382 </span>

                  <span
                    class="text-[10px] font-semibold text-success flex items-center"
                  >
                    ↑ 18,2%
                  </span>
                </div>

                <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

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

              <div class="border border-border p-3 rounded-xl bg-card">
                <div
                  class="flex items-center gap-1 text-[11px] text-muted mb-1"
                >
                  <Percent class="w-3.5 h-3.5 text-warning" />
                  CTR
                </div>

                <div class="flex flex-wrap items-baseline gap-1.5">
                  <span class="text-lg font-bold text-foreground"> 4,02% </span>

                  <span
                    class="text-[10px] font-semibold text-warning flex items-center"
                  >
                    ↑ 6,1%
                  </span>
                </div>

                <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

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

              <div class="border border-border p-3 rounded-xl bg-card">
                <div
                  class="flex items-center gap-1 text-[11px] text-muted mb-1"
                >
                  <TrendingUp class="w-3.5 h-3.5 text-success" />
                  Avg. Position
                </div>

                <div class="flex flex-wrap items-baseline gap-1.5">
                  <span class="text-lg font-bold text-foreground"> 7,8 </span>

                  <span
                    class="text-[10px] font-semibold text-success flex items-center"
                  >
                    ↓ 1,3
                  </span>
                </div>

                <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

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
            </div>

            <div class="mt-2">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-xs font-semibold text-foreground">
                    Performa Klik di Google
                  </p>

                  <p class="text-[11px] text-muted mt-0.5">
                    Performa 30 hari terakhir
                  </p>
                </div>

                <NuxtLink
                  to="/client/seo"
                  class="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Lihat Detail SEO & GEO
                  <ChevronRight :size="14" />
                </NuxtLink>
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
                      280, 295, 270, 310, 300, 325, 315, 340, 330, 350, 342,
                      360, 352, 370, 365, 382,
                    ],
                    color: '#3b82f6',
                  },
                  {
                    name: 'Impressions',
                    data: [
                      7200, 7500, 7100, 7800, 7600, 8100, 7950, 8350, 8200,
                      8600, 8450, 8800, 8650, 9100, 9250, 9500,
                    ],
                    color: '#10b981',
                  },
                ]"
                :judul="false"
              />
            </div>
          </div>
        </div>
      </section>
      <!-- Bantuan -->
      <div
        class="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4"
        style="
          background: var(--success-soft);
          border: 1px solid var(--success-border);
        "
      >
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-success-soft rounded-xl text-success">
            <ShieldCheck class="w-5 h-5" />
          </div>

          <div>
            <h4 class="font-bold text-sm text-foreground">
              Website Anda dilindungi dan dikelola oleh Appfoundry.
            </h4>

            <p class="text-xs text-muted">
              Kami memastikan website Anda aman, cepat, dan selalu optimal.
            </p>
          </div>
        </div>

        <Button variant="soft-primary" size="sm">
          <div class="flex items-center gap-2">
            Lihat Semua Layanan Saya
            <ArrowRight class="w-3.5 h-3.5" />
          </div>
        </Button>
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
  title: "Dashboard",
  ssr: false,
  activeTab: "dashboard",
  middleware: "auth",
});
import { ref } from "vue";
import {
  ExternalLink,
  Globe,
  Briefcase,
  Receipt,
  ShieldCheck,
  Info,
  Server,
  Compass,
  Percent,
  Box,
  Layout,
  Folder,
  CheckCircle2,
  Cloud,
  Rocket,
  ArrowRight,
  Eye,
  TrendingUp,
  ChevronRight,
  MousePointerClick,
  AlertCircle,
} from "~/utils/icons";
const statusDev = ref(true);
const isData = ref(true);
</script>
