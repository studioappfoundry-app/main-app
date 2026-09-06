<template>
  <Modal v-model="openModalSuccess">
    <div class="text-center space-y-5 py-2">
      <div
        class="w-16 h-16 rounded-full bg-success-soft flex items-center justify-center mx-auto"
      >
        <CheckCircle2 class="w-8 h-8 text-success" />
      </div>
      <div class="space-y-1.5">
        <h2 class="text-xl font-bold text-foreground tracking-tight">
          Pesanan Berhasil Dibuat!
        </h2>
        <p class="text-sm text-secondary max-w-sm mx-auto">
          Tim kami akan segera memulai setup SEO & GEO website Anda setelah
          pembayaran terverifikasi.
        </p>
      </div>
      <div
        class="bg-surface-soft border border-border rounded-xl p-4 text-left space-y-2.5"
      >
        <div class="flex justify-between items-center text-xs">
          <span class="text-secondary">Paket</span>
          <span class="font-semibold text-foreground capitalize">{{
            selectedPackage.name
          }}</span>
        </div>
        <div class="flex justify-between items-center text-xs">
          <span class="text-secondary">Website</span>
          <span class="font-semibold text-foreground break-all"
            >kedaisenja.com</span
          >
        </div>
        <div class="flex justify-between items-center text-xs">
          <span class="text-secondary">Metode Pembayaran</span>
          <span class="font-semibold text-foreground">{{
            selectedPaymentLabel
          }}</span>
        </div>
        <div
          class="flex justify-between items-center pt-2 border-t border-border"
        >
          <span class="text-sm font-semibold text-foreground">Total</span>
          <span class="text-base font-bold text-primary">{{
            formatRupiah(selectedPackage.price)
          }}</span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2.5">
        <Button
          variant="solid"
          class="flex-1"
          @click="openModalSuccess = false"
        >
          <NuxtLink
            to="/client/tagihan"
            class="flex items-center justify-center gap-2 w-full"
          >
            Lihat Tagihan
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </Button>
        <Button
          variant="soft-primary"
          class="flex-1"
          @click="openModalSuccess = false"
        >
          <NuxtLink to="/client/seo" class="w-full"
            >Kembali ke SEO & GEO</NuxtLink
          >
        </Button>
      </div>
    </div>
  </Modal>

  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground pb-28 lg:pb-6">
    <!-- Breadcrumb -->
    <Breadcumb :items="breadcrumbItems" />

    <!-- Page Header -->
    <header
      class="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          Pesan Paket SEO & GEO
        </h1>
        <p class="text-sm text-secondary mt-1 max-w-lg">
          Tingkatkan visibilitas website Anda di Google dan mesin pencarian AI.
          Setup dikerjakan langsung oleh tim Appfoundry.
        </p>
      </div>
      <Badge variant="info" size="sm">Setup oleh Tim Ahli</Badge>
    </header>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- LEFT: Form Sections -->
      <div class="lg:col-span-7 space-y-6">
        <!-- STEP 1: Pilih Paket -->
        <section
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-xl bg-primary-soft text-primary flex items-center justify-center text-sm font-bold shrink-0"
            >
              1
            </div>
            <div>
              <h2 class="text-base font-bold text-foreground">Pilih Paket</h2>
              <p class="text-xs text-secondary">
                Basic untuk fondasi SEO, Premium untuk kontrol penuh.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="pkg in packages"
              :key="pkg.id"
              type="button"
              @click="selectedPackageId = pkg.id"
              :class="[
                'relative text-left rounded-2xl border-2 p-5 transition-all duration-200 flex flex-col justify-between space-y-4',
                selectedPackageId === pkg.id
                  ? 'border-primary bg-primary-soft/40 shadow-app'
                  : 'border-border bg-card hover:border-primary/40',
              ]"
            >
              <div class="space-y-3 w-full">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="text-lg font-bold text-foreground">
                      {{ pkg.name }}
                    </h3>
                    <p class="text-xs text-secondary">SEO & GEO</p>
                  </div>
                  <div
                    :class="[
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors',
                      selectedPackageId === pkg.id
                        ? 'border-primary bg-primary'
                        : 'border-border',
                    ]"
                  >
                    <Check
                      v-if="selectedPackageId === pkg.id"
                      class="w-3 h-3 text-background stroke-[3]"
                    />
                  </div>
                </div>

                <div v-if="pkg.badge" class="absolute -top-2.5 left-4">
                  <Badge :variant="pkg.badgeVariant" Bg size="sm">
                    {{ pkg.badge }}
                  </Badge>
                </div>

                <div class="space-y-0.5">
                  <p class="text-2xl font-extrabold text-foreground">
                    {{ formatRupiah(pkg.price) }}
                  </p>
                  <p class="text-xs text-secondary">
                    {{ formatRupiah(Math.round(pkg.price / 12)) }} / bulan,
                    ditagihkan per tahun
                  </p>
                </div>
              </div>

              <ul class="space-y-2 w-full">
                <li
                  v-for="(feat, idx) in pkg.features"
                  :key="idx"
                  class="flex items-center gap-2 text-xs text-foreground"
                >
                  <Check :size="14" class="text-success shrink-0" />
                  {{ feat }}
                </li>
              </ul>
            </button>
          </div>
        </section>

        <!-- STEP 2: Data Bisnis (khusus Premium) -->
        <section
          v-if="selectedPackageId === 'premium'"
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-xl bg-primary-soft text-primary flex items-center justify-center text-sm font-bold shrink-0"
            >
              2
            </div>
            <div>
              <h2 class="text-base font-bold text-foreground">
                Data Bisnis untuk Optimasi GEO & Local SEO
              </h2>
              <p class="text-xs text-secondary">
                Data ini kami gunakan untuk Google Business Profile dan
                structured data lokasi.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <Input
                v-model="geoForm.geo_business_name"
                type="text"
                label="Nama Bisnis"
                placeholder="e.g. Kedai Kopi Senja"
                max-width="100vw"
              />
            </div>
            <div class="sm:col-span-2">
              <Input
                v-model="geoForm.geo_address"
                type="textarea"
                label="Alamat Lengkap"
                placeholder="e.g. Jl. Merdeka No. 12, Kel. Sei Panas"
                max-width="100vw"
              />
            </div>
            <Input
              v-model="geoForm.geo_city"
              type="text"
              label="Kota"
              placeholder="e.g. Tarakan"
              max-width="100vw"
            />
            <Input
              v-model="geoForm.geo_region"
              type="text"
              label="Provinsi / Region"
              placeholder="e.g. Kalimantan Utara"
              max-width="100vw"
            />
            <Input
              v-model="geoForm.geo_country"
              type="text"
              label="Negara"
              placeholder="e.g. Indonesia"
              max-width="100vw"
            />
            <Input
              v-model="geoForm.geo_latitude"
              type="number"
              label="Latitude (opsional)"
              placeholder="e.g. 3.3000"
              max-width="100vw"
            />
            <Input
              v-model="geoForm.geo_longitude"
              type="number"
              label="Longitude (opsional)"
              placeholder="e.g. 117.6000"
              max-width="100vw"
            />
          </div>

          <div
            class="bg-info-soft border border-info/20 p-3.5 rounded-xl flex items-start gap-3"
          >
            <Info class="w-4 h-4 text-info shrink-0 mt-0.5" />
            <p class="text-xs text-secondary">
              Field meta (meta_title, meta_description, og, twitter) dan
              konfigurasi teknis akan diisi dan dioptimalkan langsung oleh tim
              kami saat proses setup.
            </p>
          </div>
        </section>

        <!-- Yang Didapat -->
        <section
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0"
            >
              <TrendingUp :size="20" />
            </div>
            <div>
              <h3 class="text-base font-bold text-foreground">
                Yang Anda Dapatkan
              </h3>
              <p class="text-xs text-secondary">
                Hasil maksimal tanpa perlu keahlian teknis.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="(item, idx) in benefits"
              :key="idx"
              class="flex items-start gap-3 p-3 rounded-xl bg-surface-soft border border-border"
            >
              <div
                class="w-8 h-8 rounded-lg bg-success-soft text-success flex items-center justify-center shrink-0"
              >
                <component :is="item.icon" :size="16" />
              </div>
              <div>
                <p class="text-xs font-bold text-foreground">
                  {{ item.title }}
                </p>
                <p class="text-[11px] text-secondary mt-0.5">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- RIGHT: Ringkasan Pesanan (Desktop Sticky) -->
      <aside class="hidden lg:block lg:col-span-5 lg:sticky lg:top-15">
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-5"
        >
          <h2 class="text-base font-bold text-foreground">Ringkasan Pesanan</h2>

          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0"
              >
                <TrendingUp :size="22" />
              </div>
              <div class="min-w-0">
                <p class="text-sm font-bold text-foreground capitalize">
                  SEO & GEO {{ selectedPackage.name }}
                </p>
                <p class="text-xs text-secondary">Berlaku 1 tahun penuh</p>
              </div>
            </div>

            <div
              class="bg-surface-soft border border-border rounded-xl p-4 space-y-2.5 text-xs"
            >
              <div class="flex justify-between items-center">
                <span class="text-secondary">Website</span>
                <span class="font-semibold text-foreground break-all"
                  >kedaisenja.com</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-secondary">Durasi</span>
                <span class="font-semibold text-foreground">12 bulan</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-secondary">Metode Pembayaran</span>
                <span class="font-semibold text-foreground">{{
                  selectedPaymentLabel
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-secondary">Setup</span>
                <Badge variant="success" size="sm">Dikerjakan Tim</Badge>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-secondary">Status Setelah Bayar</span>
                <Badge variant="success" size="sm">Aktif</Badge>
              </div>
            </div>

            <div class="space-y-2 pt-2 border-t border-border text-xs">
              <div class="flex justify-between items-center">
                <span class="text-secondary">Subtotal</span>
                <span class="font-semibold text-foreground">{{
                  formatRupiah(selectedPackage.price)
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-secondary">Biaya Setup</span>
                <span class="font-semibold text-success">Gratis</span>
              </div>
              <div
                class="flex justify-between items-center pt-2 border-t border-border"
              >
                <span class="text-sm font-bold text-foreground"
                  >Total Bayar</span
                >
                <span class="text-xl font-extrabold text-primary">{{
                  formatRupiah(selectedPackage.price)
                }}</span>
              </div>
            </div>
          </div>

          <Button variant="solid" class="w-full" @click="submitOrder">
            <div class="flex items-center justify-center gap-2">
              Buat Pesanan
              <ArrowRight class="w-4 h-4" />
            </div>
          </Button>

          <div
            class="flex items-center justify-center gap-2 text-[11px] text-muted"
          >
            <ShieldCheck class="w-3.5 h-3.5 text-success" />
            Pembayaran aman & terverifikasi otomatis
          </div>
        </div>
      </aside>
    </div>

    <!-- Banner Bantuan -->
    <div
      class="bg-warning-soft border border-warning/20 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-6"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-xl bg-warning-soft flex items-center justify-center text-warning shrink-0"
        >
          <AlertCircle :size="24" />
        </div>
        <div class="flex flex-col gap-1">
          <h4 class="text-base font-bold text-foreground">Punya pertanyaan?</h4>
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
  </div>

  <!-- MOBILE: Ringkasan Pemesanan Fixed Bottom -->
  <div
    v-if="selectedPackage"
    class="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50"
  >
    <div class="p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <!-- Expandable Detail -->
      <div
        v-if="showMobileSummary"
        class="mb-4 max-h-[50vh] overflow-y-auto rekapan"
      >
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

      <!-- Toggle & Action -->
      <div class="flex items-center justify-between gap-4">
        <div
          @click="showMobileSummary = !showMobileSummary"
          class="cursor-pointer flex-1 min-w-0"
        >
          <p class="text-xs text-muted flex items-center gap-1">
            Total Bayar
            <span
              class="inline-block transition-transform duration-200"
              :class="{ 'rotate-180': showMobileSummary }"
              >▲</span
            >
          </p>
          <p class="text-lg font-bold text-primary truncate">
            {{ formatRupiah(selectedPackage.price) }}
          </p>
        </div>
        <Button variant="solid" @click="submitOrder">
          <span class="flex items-center gap-2">
            Buat Pesanan
            <ArrowRight class="w-4 h-4" />
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "seo",
  title: "Pesan SEO & GEO",
});

import { ref, computed } from "vue";
import {
  Check,
  TrendingUp,
  Search,
  Bot,
  MapPin,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Info,
  CreditCard,
  Landmark,
  QrCode,
} from "~/utils/icons";

/* ---------- Breadcrumb ---------- */
const breadcrumbItems = [
  { label: "Dashboard", to: "/client/" },
  { label: "SEO & GEO", to: "/client/seo" },
  { label: "Pesan Paket" },
];

/* ---------- State Pilihan ---------- */
const selectedPackageId = ref("basic");
const selectedPaymentId = ref("bca");
const openModalSuccess = ref(false);
const showMobileSummary = ref(false);

/* ---------- Form GEO (mapping kolom tabel `seo`) ---------- */
const geoForm = ref({
  geo_business_name: "",
  geo_address: "",
  geo_city: "",
  geo_region: "",
  geo_country: "",
  geo_latitude: "",
  geo_longitude: "",
});

/* ---------- Paket ---------- */
const packages = [
  {
    id: "basic",
    name: "Basic",
    price: 300000,
    badge: "Rekomendasi",
    badgeVariant: "success",
    features: [
      "Google Search Console",
      "Sitemap & Robots.txt",
      "Meta Title & Description",
      "Structured Data (Schema)",
      "Monitoring performa SEO",
      "GEO Readiness dasar",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 750000,
    badge: "Paling Lengkap",
    badgeVariant: "info",
    features: [
      "Semua fitur SEO & GEO Basic",
      "Optimasi SEO berkelanjutan",
      "Analisis keyword & performa",
      "Structured Data lanjutan",
      "Google Business Profile",
      "Optimasi GEO untuk AI Search",
      "Insight & rekomendasi optimasi",
      "Support prioritas",
    ],
  },
];

const paymentMethods = [
  {
    id: "bca",
    name: "Transfer Bank BCA",
    desc: "Verifikasi otomatis 1–5 menit",
    icon: Landmark,
  },
  {
    id: "va",
    name: "Virtual Account",
    desc: "BCA, Mandiri, BNI, BRI, Permata",
    icon: CreditCard,
  },
  {
    id: "qris",
    name: "QRIS",
    desc: "Scan sekali dari e-wallet apa pun",
    icon: QrCode,
  },
];

const benefits = [
  {
    title: "Ditemukan di Google",
    desc: "Indexing & peringkat kata kunci terpantau.",
    icon: Search,
  },
  {
    title: "Siap untuk AI Search",
    desc: "Struktur konten mudah dibaca AI.",
    icon: Bot,
  },
  {
    title: "Local SEO Kuat",
    desc: "Muncul di pencarian lokasi sekitar.",
    icon: MapPin,
  },
  {
    title: "Data Terukur",
    desc: "Klik, impressions & CTR terpantau.",
    icon: TrendingUp,
  },
];

/* ---------- Derived ---------- */
const selectedPackage = computed(
  () => packages.find((p) => p.id === selectedPackageId.value) || packages[0],
);

const selectedPaymentLabel = computed(
  () =>
    paymentMethods.find((m) => m.id === selectedPaymentId.value)?.name || "-",
);

/* ---------- Mobile Summary Items ---------- */
const summaryItems = computed(() => [
  {
    label: "Paket",
    value: `SEO & GEO ${selectedPackage.value.name}`,
  },
  {
    label: "Website",
    value: "kedaisenja.com",
  },
  {
    label: "Durasi",
    value: "12 bulan",
  },
  {
    label: "Metode Pembayaran",
    value: selectedPaymentLabel.value,
  },
  {
    label: "Setup",
    value: "Dikerjakan Tim",
  },
  {
    label: "Subtotal",
    value: formatRupiah(selectedPackage.value.price),
  },
  {
    label: "Biaya Setup",
    value: "Gratis",
  },
  {
    label: "Status Setelah Bayar",
    value: "Aktif",
  },
]);

/* ---------- Helpers ---------- */
const formatRupiah = (num) =>
  "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ---------- Submit ---------- */
const submitOrder = () => {
  openModalSuccess.value = true;
};
</script>
