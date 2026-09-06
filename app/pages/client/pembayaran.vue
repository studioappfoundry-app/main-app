<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <!-- Breadcrumb & Header -->
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
    <section class="max-w-6xl mx-auto space-y-8" v-if="isData">
      <header class="mb-6">
        <h1 class="text-2xl font-bold mb-1">Pembayaran</h1>
        <p class="text-secondary text-sm">
          Riwayat pembayaran dan transaksi Anda.
        </p>
      </header>
      <!-- Summary Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(stat, idx) in stats"
          :key="idx"
          class="bg-background border border-border rounded-xl p-5 shadow-app transition-all"
        >
          <p class="text-xs font-semibold text-secondary mb-2">
            {{ stat.label }}
          </p>
          <p class="text-2xl font-bold text-foreground mb-2">
            {{ stat.value }}
          </p>
          <p class="text-xs text-secondary">{{ stat.sub }}</p>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="border-bottom mb-6 hidden md:block">
        <div class="flex gap-8 min-w-max text-sm font-medium">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'pb-3 transition-colors relative',
              activeTab === tab.id
                ? 'text-primary font-semibold'
                : 'text-secondary hover:text-foreground',
            ]"
          >
            {{ tab.label }}
            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
            />
          </button>
        </div>
      </div>
      <div class="md:hidden">
        <Splide :options="splideOption" aria-label="Filter pembayaran">
          <SplideSlide v-for="tab in tabs" :key="tab.id">
            <button
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-secondary hover:text-foreground',
              ]"
            >
              {{ tab.label }}
            </button>
          </SplideSlide>
        </Splide>
      </div>

      <!-- Table Container -->
      <div
        class="bg-background p-6 rounded-2xl border border-border shadow-app space-y-4"
      >
        <h3 class="text-sm font-bold text-foreground">Detail Pembayaran</h3>
        <Table
          :headers="paymentHeaders"
          :data="filteredPayments"
          @select="onRowSelect"
        />
      </div>

      <!-- Banner Informasi Bawah -->
      <div
        class="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4"
        style="
          background: var(--success-soft);
          border: 1px solid var(--success-border);
        "
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-16 h-20 bg-success-soft border border-slate-200 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 relative"
          >
            <FileText class="w-8 h-8 text-success" />
            <div
              class="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-bold text-foreground">
              Butuh Nota atau Bukti Pembayaran?
            </h4>
            <p class="text-xs text-secondary mt-0.5">
              Semua pembayaran otomatis tercatat di sistem.<br
                class="hidden sm:inline"
              />
              Anda dapat mengunduh nota kapan saja.
            </p>
          </div>
        </div>
        <Button variant="soft-primary" size="sm"> Lihat Semua Dokumen </Button>
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
            <CreditCard class="w-10 h-10 text-muted" />
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground">
              Belum Ada Riwayat Pembayaran
            </h2>
            <p class="text-sm text-secondary max-w-sm mx-auto">
              Anda belum memiliki riwayat pembayaran. Lakukan pembayaran tagihan
              anda terlebih dahulu.
            </p>
          </div>
          <Button variant="solid">
            <NuxtLink to="/client/website" class="flex items-center gap-2">
              Kembali ke Tagihan
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
  activeTab: "pembayaran",
  title: "Pembayaran",
});
import { ref } from "vue";
import { AlertCircle, ArrowRight, CreditCard, FileText } from "~/utils/icons";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

// State untuk tab aktif
const activeTab = ref("semua");
const isData = ref(true);
const splideOption = {
  autoWidth: true,
  gap: "0.5rem",
  arrows: false,
  pagination: false,
};

const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/client/",
  },
  {
    label: "Pembayaran",
  },
];
// List tab navigasi
const tabs = [
  {
    id: "semua",
    label: "Semua",
  },
  {
    id: "berhasil",
    label: "Berhasil",
  },
  {
    id: "menunggu",
    label: "Menunggu",
  },
  {
    id: "gagal",
    label: "Gagal",
  },
];

const payments = ref([
  {
    id: 1,
    category: "berhasil",

    tanggal: "12 Agustus 2026, 14:32",
    transaksi: "TRX-20260812-001",
    tagihan: "Pelunasan Website",
    metode: "Transfer Bank BCA",
    jumlah: "Rp 612.500",

    status: "Berhasil",
    statusColor: "1",
  },
  {
    id: 2,
    category: "berhasil",

    tanggal: "10 Agustus 2026, 10:15",
    transaksi: "TRX-20260810-002",
    tagihan: "Pembayaran Website",
    metode: "Transfer Bank BCA",
    jumlah: "Rp 612.500",

    status: "Berhasil",
    statusColor: "1",
  },
  {
    id: 3,
    category: "menunggu",

    tanggal: "14 Agustus 2026, 09:45",
    transaksi: "TRX-20260814-003",
    tagihan: "SEO & GEO Premium",
    metode: "Transfer Bank Mandiri",
    jumlah: "Rp 300.000",

    status: "Menunggu",
    statusColor: "0",
  },
  {
    id: 4,
    category: "gagal",

    tanggal: "08 Agustus 2026, 16:20",
    transaksi: "TRX-20260808-004",
    tagihan: "Hosting 12 Bulan",
    metode: "Virtual Account BNI",
    jumlah: "Rp 500.000",

    status: "Gagal",
    statusColor: "3",
  },
]);

const filteredPayments = computed(() => {
  if (activeTab.value === "semua") {
    return payments.value;
  }

  return payments.value.filter((item) => item.category === activeTab.value);
});

const paymentHeaders = [
  {
    key: "tanggal",
    label: "Tanggal",
  },
  {
    key: "transaksi",
    label: "No. Transaksi",
  },
  {
    key: "tagihan",
    label: "Tagihan",
  },
  {
    key: "metode",
    label: "Metode",
  },
  {
    key: "jumlah",
    label: "Jumlah",
  },
  {
    key: "status",
    label: "Status",
    badge: true,
    badgeColorKey: "statusColor",
  },
];
// Data Statistik
const stats = [
  { label: "Total Pembayaran", value: "Rp 1.837.500", sub: "Semua waktu" },
  { label: "Pembayaran Berhasil", value: "6", sub: "Transaksi" },
  { label: "Total Lunas", value: "Rp 1.837.500", sub: "100% dari total" },
  { label: "Metode Terbanyak", value: "QRIS", sub: "4 transaksi" },
];
const onRowSelect = (row) => {
  if (row.category === "berhasil") {
    navigateTo(`/client/nota/${row.id}`);
  }
};
</script>
