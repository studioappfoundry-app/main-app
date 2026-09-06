<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <!-- Breadcrumb -->
    <Breadcumb :items="breadcrumbItems" />

    <!-- Toggle Demo -->
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

    <!-- ========== SECTION: ADA DATA ========== -->
    <section v-if="isData" class="space-y-6 mt-4">
      <!-- Page Title -->
      <div class="space-y-1">
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          Dokumen & Kontrak
        </h1>
        <p class="text-sm text-secondary">
          Semua dokumen resmi dan kontrak antara Anda dan Appfoundry.
        </p>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(stat, idx) in stats"
          :key="idx"
          class="bg-background p-4 rounded-2xl border border-border shadow-app space-y-1"
        >
          <p class="text-xs font-semibold text-foreground">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-foreground">{{ stat.count }}</p>
          <p class="text-[11px] text-muted">{{ stat.subtext }}</p>
        </div>
      </div>

      <!-- Detail Dokumen Card (Dinamis) -->
      <div
        class="bg-background rounded-2xl p-6 border border-border shadow-app space-y-4"
      >
        <h2 class="text-sm font-bold text-foreground">Detail Dokumen</h2>

        <!-- Jika sudah ada yang dipilih -->
        <div v-if="selectedDocument" class="space-y-4">
          <div
            class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div class="flex flex-col md:flex-row items-start gap-5">
              <!-- Document Illustration -->
              <div
                class="w-28 h-28 bg-surface-soft border border-border rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <div
                  class="w-16 h-20 bg-surface border border-border rounded-md p-2 shadow-sm flex flex-col justify-between"
                >
                  <div class="space-y-1.5">
                    <div class="w-full h-1 bg-muted/40 rounded"></div>
                    <div class="w-3/4 h-1 bg-muted/40 rounded"></div>
                    <div class="w-5/6 h-1 bg-muted/40 rounded"></div>
                    <div class="w-2/3 h-1 bg-muted/40 rounded"></div>
                  </div>
                  <div
                    class="w-3 h-3 rounded-full bg-primary self-end flex items-center justify-center"
                  >
                    <span class="text-[8px] text-white">✓</span>
                  </div>
                </div>
              </div>

              <!-- Document Info -->
              <div class="space-y-3">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-base font-bold text-foreground">
                    {{ selectedDocument.name }}
                  </h3>
                  <Badge
                    :variant="
                      selectedDocument.status === 'Aktif'
                        ? 'success'
                        : 'primary'
                    "
                    size="sm"
                  >
                    {{ selectedDocument.status }}
                  </Badge>
                </div>

                <div
                  class="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-y-1.5 gap-x-4 text-xs"
                >
                  <span class="text-secondary font-medium">Nomor</span>
                  <span class="text-foreground font-semibold">{{
                    selectedDocument.number
                  }}</span>

                  <span class="text-secondary font-medium">Kategori</span>
                  <span class="text-foreground font-semibold">{{
                    selectedDocument.category
                  }}</span>

                  <span class="text-secondary font-medium">Tanggal</span>
                  <span class="text-foreground font-semibold">{{
                    selectedDocument.date
                  }}</span>

                  <template v-if="selectedDocument.period">
                    <span class="text-secondary font-medium">Periode</span>
                    <span class="text-foreground font-semibold">{{
                      selectedDocument.period
                    }}</span>
                  </template>
                </div>

                <p class="text-xs text-secondary pt-1 max-w-md">
                  {{ selectedDocument.description }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-row gap-2.5 w-full md:w-auto">
              <Button variant="soft-primary" size="sm">
                <div class="flex gap-2">
                  <Eye class="w-4 h-4" />
                  <span>Lihat Dokumen</span>
                </div>
              </Button>
              <Button variant="soft-primary" size="sm">
                <div class="flex gap-2">
                  <Download class="w-4 h-4" />
                  <span>Download PDF</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <!-- Blank State: Belum ada yang dipilih -->
        <div v-else class="text-center py-10 space-y-3">
          <div
            class="w-16 h-16 rounded-full bg-surface-soft flex items-center justify-center mx-auto"
          >
            <FileText class="w-8 h-8 text-muted" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-foreground">
              Belum Ada Dokumen yang Dipilih
            </h3>
            <p class="text-xs text-secondary mt-1 max-w-xs mx-auto">
              Klik salah satu baris pada tabel di bawah untuk melihat detail
              dokumen.
            </p>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="space-y-4">
        <!-- Desktop Tabs -->
        <div class="border-b border-border mb-6 hidden lg:block">
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

        <!-- Mobile Tabs -->
        <div class="lg:hidden mb-6">
          <Splide :options="splideOption" aria-label="Filter dokumen">
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

        <!-- Table -->
        <div
          class="bg-background p-6 rounded-2xl border border-border shadow-app space-y-4"
        >
          <h3 class="text-sm font-bold text-foreground">Daftar Dokumen</h3>
          <Table
            :headers="documentHeaders"
            :data="filteredDocuments"
            @select="onRowSelect"
          />
        </div>
      </div>

      <!-- Bottom Banner -->
      <div
        class="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-success-soft border border-success-border"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-10 h-10 text-success bg-success-soft rounded-xl flex items-center justify-center shrink-0"
          >
            <Info class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-foreground">
              Semua dokumen penting tersimpan dengan aman.
            </h4>
            <p class="text-xs text-secondary mt-0.5">
              Dokumen dapat diunduh kapan saja sesuai kebutuhan Anda.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION: BLANK STATE (Tidak Ada Data) ========== -->
    <section v-else class="mt-4 space-y-6">
      <div class="max-w-2xl mx-auto">
        <div
          class="bg-background border border-border rounded-2xl p-8 md:p-12 shadow-app text-center space-y-6"
        >
          <div
            class="w-20 h-20 rounded-full bg-surface-soft flex items-center justify-center mx-auto"
          >
            <FileText class="w-10 h-10 text-muted" />
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground">Belum Ada Dokumen</h2>
            <p class="text-sm text-secondary max-w-sm mx-auto">
              Lakukan pemesanan layanan terlebih dahulu. Dokumen, kontrak, dan
              nota pembayaran akan tersedia di sini setelah Anda melakukan
              transaksi.
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
  activeTab: "dokumen",
  title: "Dokumen & Kontrak",
});

import { ref, computed, onMounted } from "vue";
import {
  Eye,
  Download,
  Info,
  ArrowRight,
  FileText,
  AlertCircle,
} from "~/utils/icons";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

const breadcrumbItems = [
  { label: "Dashboard", to: "/client/" },
  { label: "Dokumen" },
];

// Toggle demo data
const isData = ref(true);

// Stat cards
const stats = [
  { label: "Kontrak Aktif", count: "1", subtext: "Perjanjian layanan aktif" },
  { label: "Invoice", count: "3", subtext: "Total invoice" },
  { label: "Pembayaran", count: "6", subtext: "Transaksi berhasil" },
  { label: "Dokumen Lain", count: "2", subtext: "Dokumen lainnya" },
];

// Dokumen dengan field lengkap untuk card detail
const documents = [
  {
    name: "Perjanjian Layanan Website",
    category: "Kontrak",
    number: "CNTR-2026-001",
    date: "11 Agu 2026",
    period: "11 Agustus 2026 – 11 Agustus 2027",
    status: "Aktif",
    statusColor: 1,
    description:
      "Perjanjian layanan pembuatan, pengelolaan, dan pemeliharaan website antara Kedai Kopi Senja dan Appfoundry.",
  },
  {
    name: "Invoice Pelunasan Website",
    category: "Invoice",
    number: "INV-2026-002",
    date: "11 Agu 2026",
    status: "Lunas",
    statusColor: 1,
    description:
      "Invoice pelunasan sisa pembayaran pembuatan website company profile.",
  },
  {
    name: "Invoice DP Website",
    category: "Invoice",
    number: "INV-2026-001",
    date: "01 Agu 2026",
    status: "Lunas",
    statusColor: 1,
    description: "Invoice pembayaran uang muka (DP) pembuatan website.",
  },
  {
    name: "Nota Pembayaran DP",
    category: "Nota Pembayaran",
    number: "PAY-2026-001",
    date: "01 Agu 2026",
    status: "Lunas",
    statusColor: 1,
    description: "Bukti pembayaran uang muka via transfer bank BCA.",
  },
  {
    name: "Nota Pembayaran Pelunasan",
    category: "Nota Pembayaran",
    number: "PAY-2026-002",
    date: "11 Agu 2026",
    status: "Lunas",
    statusColor: 1,
    description: "Bukti pembayaran pelunasan via transfer bank BCA.",
  },
  {
    name: "Berita Acara Serah Terima",
    category: "Dokumen Lain",
    number: "BAST-2026-001",
    date: "11 Agu 2026",
    status: "Aktif",
    statusColor: 1,
    description:
      "Dokumen serah terima hasil pekerjaan pembuatan website kepada klien.",
  },
  {
    name: "Sertifikat SSL",
    category: "Dokumen Lain",
    number: "SSL-2026-001",
    date: "11 Agu 2026",
    period: "11 Agustus 2026 – 11 Agustus 2027",
    status: "Aktif",
    statusColor: 1,
    description: "Sertifikat keamanan SSL Let's Encrypt untuk domain website.",
  },
];

// State dokumen yang sedang dipilih (dari tabel)
const selectedDocument = ref(null);

// Saat row tabel diklik
const onRowSelect = (document) => {
  selectedDocument.value = document;
};

// Table config
const documentHeaders = [
  { key: "name", label: "Nama Dokumen" },
  { key: "category", label: "Kategori" },
  { key: "number", label: "Nomor" },
  { key: "date", label: "Tanggal" },
  {
    key: "status",
    label: "Status",
    badge: true,
    badgeColorKey: "statusColor",
  },
];

const splideOption = {
  autoWidth: true,
  gap: "0.5rem",
  arrows: false,
  pagination: false,
};

const activeTab = ref("all");

const tabs = [
  { id: "all", label: "Semua Dokumen" },
  { id: "contract", label: "Kontrak" },
  { id: "invoice", label: "Invoice" },
  { id: "payment", label: "Nota Pembayaran" },
  { id: "other", label: "Dokumen Lain" },
];

const filteredDocuments = computed(() => {
  if (activeTab.value === "all") return documents;

  const categoryMap = {
    contract: "Kontrak",
    invoice: "Invoice",
    payment: "Nota Pembayaran",
    other: "Dokumen Lain",
  };

  return documents.filter((d) => d.category === categoryMap[activeTab.value]);
});
</script>
