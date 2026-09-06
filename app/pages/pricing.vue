<template>
  <Navbar menu="Harga" />
  <section
    class="pb-24 lg:pb-0 max-w-full md:max-w-6xl flex flex-col items-center mx-auto"
  >
    <div class="container mx-auto px-4 py-12 md:py-16 mt-10">
      <!-- Header -->
      <div class="mb-12 md:mb-16 max-w-3xl">
        <h1 class="text-5xl text-muted font-bold text-foreground font-serif">
          Bangun
          <span class="font-[1000] text-foreground">Website</span> Anda
        </h1>
        <p class="text-base md:text-lg text-muted">
          Sesuaikan setiap bagian dengan kebutuhan bisnis Anda. Harga akan
          diperbarui secara realtime berdasarkan pilihan Anda.
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <!-- LEFT COLUMN: CONFIGURATOR -->
        <div class="flex-1 space-y-6 lg:space-y-8">
          <!-- 01. PONDASI WEBSITE -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                01
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">
                  Pondasi Website
                </h2>
                <p class="text-sm text-muted mt-1">
                  Apa yang ingin Anda bangun?
                </p>
              </div>
            </div>
            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RadioCard
                  v-for="foundation in foundationList"
                  :key="foundation.id"
                  :title="foundation.label"
                  :subtitle="foundation.desc"
                  :selected="selectedFoundation === foundation.id"
                  @select="selectFoundation(foundation.id)"
                >
                  <template #icon>
                    <component :is="foundation.icon" class="text-muted" />
                  </template>
                </RadioCard>
              </div>
            </div>
          </section>
          <!-- 02. PLATFORM -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                02
              </div>

              <div>
                <h2 class="text-lg font-bold text-foreground">Platform</h2>

                <p class="text-sm text-muted mt-1">
                  Pilih platform tempat aplikasi atau website akan digunakan.
                </p>
              </div>
            </div>

            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RadioCard
                  v-for="platform in platformOptions"
                  :key="platform.id"
                  :title="platform.label"
                  :subtitle="
                    platform.price > 0
                      ? formatCurrency(platform.price)
                      : 'Gratis'
                  "
                  :selected="configuration.platform === platform.id"
                  :disabled="isLocked"
                  @select="updateConfig('platform', platform.id)"
                >
                  <template #icon>
                    <Globe class="text-muted" />
                  </template>
                </RadioCard>
              </div>
            </div>
          </section>
          <!-- 03. DATA -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                03
              </div>

              <div>
                <h2 class="text-lg font-bold text-foreground">Data</h2>

                <p class="text-sm text-muted mt-1">
                  Tentukan bagaimana data aplikasi akan disimpan dan diakses.
                </p>
              </div>
            </div>

            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <RadioCard
                  v-for="data in dataOptions"
                  :key="data.id"
                  :title="data.label"
                  :subtitle="
                    data.price > 0 ? formatCurrency(data.price) : 'Gratis'
                  "
                  :selected="configuration.data === data.id"
                  :disabled="isLocked"
                  @select="updateConfig('data', data.id)"
                >
                  <template #icon>
                    <Database class="text-muted" />
                  </template>
                </RadioCard>
              </div>
            </div>
          </section>
          <!-- 02. SERVER -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                02
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">Server</h2>
                <p class="text-sm text-muted mt-1">
                  Pilih infrastruktur server yang sesuai dengan kebutuhan
                  traffic Anda.
                </p>
              </div>
            </div>
            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RadioCard
                  v-for="server in serverOptions"
                  :key="server.id"
                  :title="server.label"
                  :subtitle="
                    server.price > 0
                      ? formatCurrency(server.price) + ' / tahun'
                      : 'Gratis'
                  "
                  :selected="configuration.server === server.id"
                  :disabled="
                    isLocked ||
                    (configuration.data === 'local' && server.id !== 'none')
                  "
                  @select="updateConfig('server', server.id)"
                />
              </div>
            </div>
          </section>

          <!-- 03. DESAIN -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                03
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">Desain</h2>
                <p class="text-sm text-muted mt-1">
                  Tentukan tingkat kustomisasi desain visual Anda.
                </p>
              </div>
            </div>
            <div class="md:pl-12 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <RadioCard
                  v-for="design in designOptions"
                  :key="design.id"
                  :title="design.label"
                  :subtitle="
                    design.price > 0 ? formatCurrency(design.price) : 'Gratis'
                  "
                  :selected="configuration.design === design.id"
                  :disabled="isLocked"
                  @select="updateConfig('design', design.id)"
                />
              </div>
              <div class="pt-4 border-t border-border space-y-3">
                <ToggleCard
                  v-model="configuration.darkTheme"
                  title="Tema Dark"
                  subtitle="+ Rp250.000"
                  :disabled="isLocked"
                />

                <ToggleCard
                  v-model="configuration.multilingual"
                  title="Multi Bahasa"
                  subtitle="+ Rp300.000"
                  :disabled="isLocked"
                />

                <ToggleCard
                  v-model="configuration.paymentGateway"
                  title="Payment Gateway"
                  subtitle="+ Rp3.000.000"
                  :disabled="isLocked"
                />
              </div>
            </div>
          </section>

          <!-- 04. HALAMAN -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                04
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">Halaman</h2>
                <p class="text-sm text-muted mt-1">
                  Tentukan jumlah halaman yang dibutuhkan.
                </p>
              </div>
            </div>
            <div class="md:pl-12">
              <div
                class="mb-6 p-4 bg-[var(--background)] rounded-lg border border-border flex justify-between items-center"
              >
                <div>
                  <strong class="text-sm text-foreground"
                    >3 Halaman Dasar</strong
                  >
                  <p class="text-xs text-muted">Home, About, Contact</p>
                </div>
                <span class="text-sm font-semibold text-muted">Gratis</span>
              </div>
              <div class="space-y-3">
                <QuantityCard
                  v-model="configuration.staticPages"
                  title="Halaman Statis Tambahan"
                  subtitle="Rp50.000 / halaman"
                  :min="0"
                  :max="20"
                  :disabled="isLocked"
                />
                <QuantityCard
                  v-model="configuration.dynamicPages"
                  title="Halaman Dinamis Tambahan"
                  subtitle="Rp100.000 / halaman"
                  :min="0"
                  :max="20"
                  :disabled="isLocked"
                />
              </div>
            </div>
          </section>

          <!-- 05. DASHBOARD -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                05
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">Dashboard</h2>
                <p class="text-sm text-muted mt-1">
                  Kelola data website Anda melalui dashboard.
                </p>
              </div>
            </div>
            <div class="md:pl-12 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <RadioCard
                  v-for="dash in dashboardOptions"
                  :key="dash.id"
                  :title="dash.label"
                  :subtitle="
                    dash.price > 0 ? formatCurrency(dash.price) : 'Gratis'
                  "
                  :selected="configuration.dashboard === dash.id"
                  :disabled="isLocked"
                  @select="updateConfig('dashboard', dash.id)"
                />
              </div>
              <div class="pt-4 border-t border-border">
                <ToggleCard
                  v-model="configuration.documentation"
                  title="Dokumentasi"
                  subtitle="+ Rp400.000"
                  :disabled="isLocked || configuration.dashboard === 'none'"
                />
                <p
                  v-if="configuration.dashboard === 'none'"
                  class="text-xs text-muted mt-2 ml-16"
                >
                  Aktifkan dashboard untuk mengaktifkan opsi dokumentasi.
                </p>
              </div>
            </div>
          </section>

          <!-- 06. DOMAIN -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                06
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">Domain</h2>
                <p class="text-sm text-muted mt-1">
                  Pilih masa aktif nama domain Anda.
                </p>
              </div>
            </div>
            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <RadioCard
                  v-for="domain in domainOptions"
                  :key="domain.id"
                  :title="domain.label"
                  :subtitle="formatCurrency(domain.price)"
                  :selected="configuration.domain === domain.id"
                  :disabled="isLocked"
                  @select="updateConfig('domain', domain.id)"
                />
              </div>
            </div>
          </section>

          <!-- 07. SEO & GEO -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                07
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">SEO & GEO</h2>
                <p class="text-sm text-muted mt-1">
                  Optimasi mesin pencari dan geografis.
                </p>
              </div>
            </div>
            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <RadioCard
                  v-for="seo in seoOptions"
                  :key="seo.id"
                  :title="seo.label"
                  :subtitle="seo.price > 0 ? formatCurrency(seo.price) : 'Rp0'"
                  :selected="configuration.seo === seo.id"
                  :disabled="isLocked"
                  @select="updateConfig('seo', seo.id)"
                />
              </div>
            </div>
          </section>

          <!-- 08. MAINTENANCE -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                08
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">Maintenance</h2>
                <p class="text-sm text-muted mt-1">
                  Pilih periode pemeliharaan pasca-launch.
                </p>
              </div>
            </div>
            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <RadioCard
                  v-for="maint in maintenanceOptions"
                  :key="maint.id"
                  :title="maint.label"
                  :subtitle="
                    maint.price > 0 ? formatCurrency(maint.price) : 'Gratis'
                  "
                  :selected="configuration.maintenance === maint.id"
                  :disabled="isLocked"
                  @select="updateConfig('maintenance', maint.id)"
                />
              </div>
            </div>
          </section>

          <!-- 09. WAKTU PENGERJAAN -->
          <section
            class="bg-card shadow-md rounded-xl p-6 transition-all duration-300"
            :class="{ 'opacity-50 pointer-events-none': isLocked }"
          >
            <div class="flex items-start gap-4 mb-6">
              <div
                class="flex flex-col items-center justify-center w-8 h-8 mt-1 border border-border rounded-full text-xs font-bold text-muted flex-shrink-0"
              >
                09
              </div>
              <div>
                <h2 class="text-lg font-bold text-foreground">
                  Waktu Pengerjaan
                </h2>
                <p class="text-sm text-muted mt-1">
                  Pilih estimasi waktu pengerjaan. Pilihan disesuaikan dengan
                  Pondasi Website.
                </p>
              </div>
            </div>
            <div class="md:pl-12">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <OptionCard
                  v-for="tl in currentTimelineOptions"
                  :key="tl.id"
                  :title="tl.label"
                  :subtitle="tl.price > 0 ? formatCurrency(tl.price) : 'Gratis'"
                  :selected="configuration.timeline === tl.id"
                  :disabled="isLocked"
                  @select="updateConfig('timeline', tl.id)"
                />
              </div>
            </div>
          </section>
        </div>

        <!-- RIGHT COLUMN: RINGKASAN PESANAN (DESKTOP) -->
        <aside class="hidden lg:block w-[360px] flex-shrink-0">
          <div class="sticky top-20 bg-card shadow-md rounded-xl p-6 shadow-sm">
            <h2 class="text-lg font-bold text-foreground mb-6">
              Ringkasan Pesanan
            </h2>

            <div v-if="!selectedFoundation" class="text-center py-8">
              <div
                class="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--background)] flex items-center justify-center text-muted"
              >
                <Timer />
              </div>
              <p class="text-sm text-muted">
                Mulai dengan memilih pondasi website untuk melihat ringkasan
                konfigurasi Anda.
              </p>
            </div>

            <div v-else>
              <div
                class="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2 -mr-2"
              >
                <div
                  v-for="item in summaryItems"
                  :key="item.label"
                  class="flex justify-between items-start gap-4"
                >
                  <span class="text-sm text-muted">{{ item.label }}</span>
                  <span
                    class="text-sm font-medium text-foreground text-right whitespace-pre-line"
                    >{{ item.value }}</span
                  >
                </div>
              </div>

              <div class="border-t border-border pt-6">
                <div class="flex justify-between items-baseline mb-6">
                  <span class="text-base font-medium text-foreground"
                    >Total Investasi</span
                  >
                  <span class="text-xl font-bold text-primary">{{
                    formatCurrency(totalInvestasi)
                  }}</span>
                </div>
                <Button
                  variant="primary"
                  class="w-full"
                  :disabled="!selectedFoundation"
                >
                  Lanjutkan
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- MOBILE STICKY BOTTOM SUMMARY -->
    <div
      v-if="selectedFoundation"
      class="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50"
    >
      <div class="p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div v-if="showMobileSummary" class="mb-4 max-h-[50vh] overflow-y-auto">
          <div class="space-y-3 mb-4">
            <div
              v-for="item in summaryItems"
              :key="item.label"
              class="flex justify-between items-start gap-4"
            >
              <span class="text-sm text-muted">{{ item.label }}</span>
              <span
                class="text-sm font-medium text-foreground text-right whitespace-pre-line"
                >{{ item.value }}</span
              >
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between gap-4">
          <div
            @click="showMobileSummary = !showMobileSummary"
            class="cursor-pointer flex-1"
          >
            <p class="text-xs text-muted">
              Total Investasi
              <span
                class="inline-block ml-1 transition-transform"
                :class="{ 'rotate-180': showMobileSummary }"
                >▲</span
              >
            </p>
            <p class="text-lg font-bold text-primary">
              {{ formatCurrency(totalInvestasi) }}
            </p>
          </div>
          <button
            class="bg-[var(--primary)] text-[var(--card)] px-6 py-3 rounded-lg font-semibold text-sm"
          >
            Lanjutkan →
          </button>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import {
  LayoutTemplate,
  UserRound,
  Building2,
  BookOpen,
  Newspaper,
  CalendarDays,
  MonitorCog,
  BriefcaseBusiness,
  Timer,
  ShoppingBag,
  Globe,
  Database,
} from "~/utils/icons";

const selectedFoundation = ref(null);
const showMobileSummary = ref(false);

const isLocked = computed(() => !selectedFoundation.value);

const configuration = reactive({
  platform: null,
  data: null,
  server: null,
  design: null,

  darkTheme: false,
  multilingual: false,
  paymentGateway: false,

  staticPages: 0,
  dynamicPages: 0,

  dashboard: null,
  documentation: false,

  domain: null,
  seo: null,
  maintenance: null,
  timeline: null,
});

const formatCurrency = (val) => {
  if (!val || val === 0) return "Gratis";

  return "Rp " + new Intl.NumberFormat("id-ID").format(val);
};

const foundationList = [
  {
    id: "landing-page",
    label: "Landing Page",
    desc: "Satu halaman utama untuk konversi",
    icon: LayoutTemplate,
  },
  {
    id: "portofolio",
    label: "Portofolio",
    desc: "Tampilkan karya dan proyek Anda",
    icon: UserRound,
  },
  {
    id: "company-profile",
    label: "Company Profile",
    desc: "Profil bisnis profesional",
    icon: Building2,
  },
  {
    id: "digital-catalog",
    label: "Digital Catalog",
    desc: "Katalog produk tanpa keranjang",
    icon: BookOpen,
  },
  {
    id: "blog-media",
    label: "Blog & Media",
    desc: "Publikasi artikel dan berita",
    icon: Newspaper,
  },
  {
    id: "toko-online",
    label: "Toko Online",
    desc: "E-commerce dengan checkout",
    icon: ShoppingBag,
  },
  {
    id: "booking-reservation",
    label: "Booking & Reservation",
    desc: "Sistem reservasi online",
    icon: CalendarDays,
  },
  {
    id: "pos-kasir",
    label: "POS & Kasir",
    desc: "Point of Sale terintegrasi",
    icon: MonitorCog,
  },
  {
    id: "business-app",
    label: "Business App",
    desc: "Aplikasi web custom",
    icon: BriefcaseBusiness,
  },
];

const platformOptions = [
  {
    id: "web",
    label: "Web",
    price: 0,
  },
  {
    id: "android",
    label: "Android",
    price: 400000,
  },
  {
    id: "desktop",
    label: "Desktop",
    price: 400000,
  },
  {
    id: "android-desktop",
    label: "Android + Desktop",
    price: 750000,
  },
  {
    id: "web-android-desktop",
    label: "Web + Android/Desktop",
    price: 400000,
  },
  {
    id: "web-android-desktop-all",
    label: "Web + Android + Desktop",
    price: 750000,
  },
];

const dataOptions = [
  {
    id: "local",
    label: "Local / Offline",
    price: 0,
  },
  {
    id: "server",
    label: "Server / Online",
    price: 0,
  },
  {
    id: "hybrid",
    label: "Hybrid",
    price: 400000,
  },
];

const serverOptions = computed(() => {
  let sharedPrice = 350000;

  if (selectedFoundation.value === "landing-page") {
    sharedPrice = 180000;
  }

  if (
    selectedFoundation.value === "portofolio" ||
    selectedFoundation.value === "company-profile"
  ) {
    sharedPrice = 250000;
  }

  return [
    {
      id: "shared",
      label: "Shared",
      price: sharedPrice,
    },
    {
      id: "vps-basic",
      label: "VPS Basic",
      price: 1500000,
    },
    {
      id: "vps-entry",
      label: "VPS Entry",
      price: 3000000,
    },
    {
      id: "dedicated-basic",
      label: "Dedicated Basic",
      price: 7200000,
    },
    {
      id: "dedicated-pro",
      label: "Dedicated Pro",
      price: 8500000,
    },
    {
      id: "none",
      label: "Offline",
      price: 0,
    },
  ];
});

const designOptions = [
  {
    id: "template",
    label: "Template",
    price: 0,
  },
  {
    id: "custom-basic",
    label: "Custom UI Basic",
    price: 750000,
  },
  {
    id: "custom-uiux",
    label: "Custom UI/UX",
    price: 1500000,
  },
];

const dashboardOptions = [
  {
    id: "none",
    label: "Tidak Ada",
    price: 0,
  },
  {
    id: "dynamic",
    label: "Dynamic",
    price: 750000,
  },
  {
    id: "complete",
    label: "Complete",
    price: 2500000,
  },
];

const domainOptions = [
  {
    id: "1-year",
    label: "1 Tahun",
    price: 250000,
  },
  {
    id: "2-year",
    label: "2 Tahun",
    price: 475000,
  },
  {
    id: "3-year",
    label: "3 Tahun",
    price: 680000,
  },
];

const seoOptions = [
  {
    id: "none",
    label: "Tidak Ada",
    price: 0,
  },
  {
    id: "basic",
    label: "Basic",
    price: 300000,
  },
  {
    id: "monitoring",
    label: "Monitoring",
    price: 750000,
  },
];

const maintenanceOptions = [
  {
    id: "1-month",
    label: "1 Bulan",
    price: 0,
  },
  {
    id: "3-month",
    label: "3 Bulan",
    price: 450000,
  },
  {
    id: "6-month",
    label: "6 Bulan",
    price: 800000,
  },
];

const timelineOptions = [
  {
    id: "1-week",
    label: "1 Minggu",
    price: 750000,
  },
  {
    id: "2-weeks",
    label: "2 Minggu",
    price: 500000,
  },
  {
    id: "1-month",
    label: "1 Bulan",
    price: 0,
  },
  {
    id: "2-months",
    label: "2 Bulan",
    price: 750000,
  },
  {
    id: "3-months",
    label: "3 Bulan",
    price: 400000,
  },
];

const currentTimelineOptions = computed(() => {
  return selectedFoundation.value ? timelineOptions : [];
});

const additionalPricing = {
  darkTheme: 250000,
  multilingual: 300000,
  documentation: 400000,
  paymentGateway: 3000000,
};

const foundationPresets = {
  "landing-page": {
    label: "Landing Page",
    config: {
      platform: "web",
      data: "server",
      server: "shared",
      design: "template",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 0,
      dynamicPages: 0,

      dashboard: "none",
      documentation: false,

      domain: "1-year",
      seo: "none",
      maintenance: "1-month",
      timeline: "1-month",
    },
  },

  portofolio: {
    label: "Portofolio",
    config: {
      platform: "web",
      data: "local",
      server: "shared",
      design: "template",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 0,
      dynamicPages: 0,

      dashboard: "none",
      documentation: false,

      domain: "1-year",
      seo: "none",
      maintenance: "1-month",
      timeline: "1-month",
    },
  },

  "company-profile": {
    label: "Company Profile",
    config: {
      platform: "web",
      data: "server",
      server: "shared",
      design: "template",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 2,
      dynamicPages: 0,

      dashboard: "none",
      documentation: false,

      domain: "1-year",
      seo: "basic",
      maintenance: "1-month",
      timeline: "3-months",
    },
  },

  "digital-catalog": {
    label: "Digital Catalog",
    config: {
      platform: "web",
      data: "server",
      server: "shared",
      design: "template",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 0,
      dynamicPages: 1,

      dashboard: "dynamic",
      documentation: false,

      domain: "1-year",
      seo: "none",
      maintenance: "1-month",
      timeline: "2-months",
    },
  },

  "blog-media": {
    label: "Blog & Media",
    config: {
      platform: "web",
      data: "server",
      server: "shared",
      design: "template",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 0,
      dynamicPages: 1,

      dashboard: "dynamic",
      documentation: false,

      domain: "1-year",
      seo: "basic",
      maintenance: "1-month",
      timeline: "2-months",
    },
  },

  "toko-online": {
    label: "Toko Online",
    config: {
      platform: "web",
      data: "server",
      server: "vps-entry",
      design: "template",

      darkTheme: false,
      multilingual: false,
      paymentGateway: true,

      staticPages: 1,
      dynamicPages: 2,

      dashboard: "dynamic",
      documentation: true,

      domain: "1-year",
      seo: "basic",
      maintenance: "3-month",
      timeline: "2-months",
    },
  },

  "booking-reservation": {
    label: "Booking & Reservation",
    config: {
      platform: "web",
      data: "server",
      server: "vps-entry",
      design: "template",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 1,
      dynamicPages: 1,

      dashboard: "dynamic",
      documentation: false,

      domain: "1-year",
      seo: "basic",
      maintenance: "3-month",
      timeline: "2-months",
    },
  },

  "pos-kasir": {
    label: "POS & Kasir",
    config: {
      platform: "web",
      data: "server",
      server: "vps-entry",
      design: "custom-basic",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 0,
      dynamicPages: 3,

      dashboard: "complete",
      documentation: true,

      domain: "1-year",
      seo: "none",
      maintenance: "3-month",
      timeline: "3-months",
    },
  },

  "business-app": {
    label: "Business App",
    config: {
      platform: "web",
      data: "server",
      server: "vps-entry",
      design: "custom-basic",

      darkTheme: false,
      multilingual: false,
      paymentGateway: false,

      staticPages: 1,
      dynamicPages: 5,

      dashboard: "complete",
      documentation: true,

      domain: "1-year",
      seo: "none",
      maintenance: "3-month",
      timeline: "3-months",
    },
  },
};

const labelsMap = {
  platform: Object.fromEntries(platformOptions.map((i) => [i.id, i.label])),

  data: Object.fromEntries(dataOptions.map((i) => [i.id, i.label])),

  server: computed(() =>
    Object.fromEntries(serverOptions.value.map((i) => [i.id, i.label])),
  ),

  design: Object.fromEntries(designOptions.map((i) => [i.id, i.label])),

  dashboard: Object.fromEntries(dashboardOptions.map((i) => [i.id, i.label])),

  domain: Object.fromEntries(domainOptions.map((i) => [i.id, i.label])),

  seo: Object.fromEntries(seoOptions.map((i) => [i.id, i.label])),

  maintenance: Object.fromEntries(
    maintenanceOptions.map((i) => [i.id, i.label]),
  ),
};

const selectFoundation = (id) => {
  selectedFoundation.value = id;

  const preset = foundationPresets[id].config;

  Object.keys(configuration).forEach((key) => {
    if (key in preset) {
      configuration[key] = preset[key];
    }
  });
};

const updateConfig = (key, value) => {
  if (isLocked.value) return;

  configuration[key] = value;
};
watch(
  () => configuration.data,
  (newVal) => {
    if (newVal === "local") {
      configuration.server = "none";
    } else if (configuration.server === "none") {
      configuration.server = "shared";
    }
  },
);
watch(
  () => configuration.dashboard,
  (newVal) => {
    if (newVal === "none") {
      configuration.documentation = false;
    }
  },
);

const totalInvestasi = computed(() => {
  if (!selectedFoundation.value) return 0;

  const c = configuration;
  let total = 0;

  const platform = platformOptions.find((item) => item.id === c.platform);

  if (platform) {
    total += platform.price;
  }

  const data = dataOptions.find((item) => item.id === c.data);

  if (data) {
    total += data.price;
  }

  const server = serverOptions.value.find((item) => item.id === c.server);

  if (server) {
    total += server.price;
  }

  const design = designOptions.find((item) => item.id === c.design);

  if (design) {
    total += design.price;
  }

  if (c.darkTheme) {
    total += additionalPricing.darkTheme;
  }

  if (c.multilingual) {
    total += additionalPricing.multilingual;
  }

  total += c.staticPages * 50000;
  total += c.dynamicPages * 100000;

  const dashboard = dashboardOptions.find((item) => item.id === c.dashboard);

  if (dashboard) {
    total += dashboard.price;
  }

  if (c.documentation && c.dashboard !== "none") {
    total += additionalPricing.documentation;
  }

  const domain = domainOptions.find((item) => item.id === c.domain);

  if (domain) {
    total += domain.price;
  }

  const seo = seoOptions.find((item) => item.id === c.seo);

  if (seo) {
    total += seo.price;
  }

  const maintenance = maintenanceOptions.find(
    (item) => item.id === c.maintenance,
  );

  if (maintenance) {
    total += maintenance.price;
  }

  const timeline = timelineOptions.find((item) => item.id === c.timeline);

  if (timeline) {
    total += timeline.price;
  }

  if (c.paymentGateway) {
    total += additionalPricing.paymentGateway;
  }

  return total;
});

const summaryItems = computed(() => {
  if (!selectedFoundation.value) return [];

  const c = configuration;

  const items = [
    {
      label: "Pondasi",
      value: foundationPresets[selectedFoundation.value].label,
    },

    {
      label: "Platform",
      value: labelsMap.platform[c.platform],
    },

    {
      label: "Data",
      value: labelsMap.data[c.data],
    },

    {
      label: "Server",
      value: labelsMap.server.value[c.server],
    },

    {
      label: "Desain",
      value: labelsMap.design[c.design],
    },
  ];

  if (c.darkTheme) {
    items.push({
      label: "Tema Dark",
      value: "Aktif",
    });
  }

  if (c.multilingual) {
    items.push({
      label: "Multi Bahasa",
      value: "Aktif",
    });
  }

  let halamanText = "3 Halaman Dasar";

  if (c.staticPages > 0) {
    halamanText += `\n+ ${c.staticPages} Halaman Statis`;
  }

  if (c.dynamicPages > 0) {
    halamanText += `\n+ ${c.dynamicPages} Halaman Dinamis`;
  }

  items.push({
    label: "Halaman",
    value: halamanText,
  });

  items.push({
    label: "Dashboard",
    value: labelsMap.dashboard[c.dashboard],
  });

  if (c.documentation && c.dashboard !== "none") {
    items.push({
      label: "Dokumentasi",
      value: "Aktif",
    });
  }

  items.push({
    label: "Domain",
    value: labelsMap.domain[c.domain],
  });

  items.push({
    label: "SEO & GEO",
    value: labelsMap.seo[c.seo],
  });

  items.push({
    label: "Maintenance",
    value: labelsMap.maintenance[c.maintenance],
  });

  const timeline = timelineOptions.find((item) => item.id === c.timeline);

  if (timeline) {
    items.push({
      label: "Waktu Pengerjaan",
      value: timeline.label,
    });
  }

  if (c.paymentGateway) {
    items.push({
      label: "Payment Gateway",
      value: "Aktif",
    });
  }

  return items;
});

useHead({
  title: "Konfigurasi Harga ── Appfoundry",
});
</script>

<style scoped>
/* Custom Scrollbar for Summary */
.space-y-3::-webkit-scrollbar {
  width: 4px;
}
.space-y-3::-webkit-scrollbar-track {
  background: transparent;
}
.space-y-3::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}
</style>
