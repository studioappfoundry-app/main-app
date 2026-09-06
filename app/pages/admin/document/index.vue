<template>
  <div class="bg-card p-2 pt-6 lg:p-6">
    <main class="space-y-6">
      <!-- Breadcrumb -->
      <Breadcumb
        :items="[
          {
            label: 'Dashboard',
            to: '/admin',
          },
          {
            label: 'Dokumen & Kontrak',
          },
        ]"
      />

      <!-- Page Title & Header Actions -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-foreground">Dokumen & Kontrak</h1>

          <p class="text-sm text-secondary mt-1">
            Kelola seluruh berkas hukum, kontrak kerja sama, invoice, dan nota
            klien.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Input
            v-model="search"
            type="search"
            placeholder="Cari Client atau domain"
            class="bg-background"
          >
            <template #icon-left>
              <Search />
            </template>
          </Input>

          <Button class="h-10 px-4" variant="primary">
            <div class="flex gap-2">
              <Plus class="size-4" />
              Upload Dokumen
            </div>
          </Button>
        </div>
      </header>

      <!-- Stat Cards Grid -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <article
          v-for="(stat, idx) in stats"
          :key="idx"
          class="bg-background p-5 rounded-xl border border-border shadow-app space-y-1"
        >
          <p class="text-xs font-semibold text-muted">
            {{ stat.label }}
          </p>

          <p class="text-2xl font-bold text-foreground">
            {{ stat.count }}
          </p>

          <p class="text-[11px] text-secondary">
            {{ stat.subtext }}
          </p>
        </article>
      </section>

      <!-- Tabs & Table -->
      <section class="space-y-4">
        <!-- Tabs Filter -->
        <div class="border-b border-border pb-3 flex gap-6 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'text-sm font-medium transition-colors relative pb-2 whitespace-nowrap',
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

        <!-- Table Card -->
        <div class="bg-background p-6 rounded-2xl shadow-app">
          <h1 class="text-sm font-bold mb-4">Daftar Dokumen</h1>

          <Table
            :headers="headers"
            :data="filteredDocuments"
            @select="handleSelect"
          />
        </div>
      </section>

      <!-- Pagination -->
      <footer
        class="pt-4 flex items-center justify-between border-t border-border"
      >
        <p class="text-xs text-secondary">
          Menampilkan {{ filteredDocuments.length }} dari
          {{ documentsList.length }} data
        </p>

        <div class="flex items-center gap-1">
          <button
            class="p-1.5 rounded-lg border border-border text-secondary disabled:opacity-40"
            disabled
          >
            <ChevronLeft class="size-4" />
          </button>

          <button
            class="size-8 rounded-lg text-sm bg-primary-soft text-primary font-medium"
          >
            1
          </button>

          <button
            class="p-1.5 rounded-lg border border-border text-secondary hover:bg-surface"
          >
            <ChevronRight class="size-4" />
          </button>
        </div>
      </footer>
    </main>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { Search, ChevronLeft, ChevronRight, Plus } from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "dokumen",
  title: "Dokumen & Kontrak",
});

const activeTab = ref("all");
const searchQuery = ref("");

const stats = [
  {
    label: "Total Dokumen",
    count: "24",
    subtext: "Arsip dokumen terdaftar",
  },
  {
    label: "Kontrak Aktif",
    count: "8",
    subtext: "Perjanjian berjalan",
  },
  {
    label: "Menunggu TTD",
    count: "3",
    subtext: "Perlu persetujuan",
  },
  {
    label: "Invoice & Nota",
    count: "13",
    subtext: "Berkas transaksi",
  },
];

const tabs = [
  { id: "all", label: "Semua Dokumen" },
  { id: "Kontrak", label: "Kontrak" },
  { id: "Invoice", label: "Invoice" },
  { id: "Nota Pembayaran", label: "Nota Pembayaran" },
  { id: "Dokumen Lain", label: "Dokumen Lain" },
];

const documentsList = [
  {
    id: 1,
    name: "Perjanjian Layanan Website",
    category: "Kontrak",
    number: "CNTR-2026-001",
    client: {
      name: "Kedai Kopi Senja",
      domain: "kopisenja.com",
      initials: "KS",
      color: "bg-primary-soft",
      text: "text-primary",
    },
    date: "11 Agu 2026",
    period: "11 Agu 2026 - 11 Agu 2027",
    status: "Aktif",
    size: "2.4 MB",
    signStatus: "Sudah TTD (2/2)",
    uploadedBy: "Admin Appfoundry",
    description:
      "Perjanjian layanan pembuatan, pengelolaan, dan pemeliharaan website antara Kedai Kopi Senja dan Appfoundry.",
  },
  {
    id: 2,
    name: "Invoice Pelunasan Website",
    category: "Invoice",
    number: "INV-2026-002",
    client: {
      name: "Klinik Sehat",
      domain: "kliniksehat.com",
      initials: "KS",
      color: "bg-success-soft",
      text: "text-success",
    },
    date: "11 Agu 2026",
    period: "-",
    status: "Lunas",
    size: "1.1 MB",
    signStatus: "Tidak Perlu TTD",
    uploadedBy: "Finance Team",
    description:
      "Tagihan pelunasan tahap akhir pembuatan sistem reservasi klinik.",
  },
  {
    id: 3,
    name: "Berita Acara Serah Terima (BAST)",
    category: "Dokumen Lain",
    number: "BAST-2026-001",
    client: {
      name: "Cafe Nusantara",
      domain: "cafenusantara.com",
      initials: "CN",
      color: "bg-info-soft",
      text: "text-info",
    },
    date: "05 Agu 2026",
    period: "-",
    status: "Menunggu TTD",
    size: "1.8 MB",
    signStatus: "Menunggu TTD Client",
    uploadedBy: "Project Manager",
    description:
      "Dokumen serah terima hasil pengerjaan ulang tampilan antarmuka dan modul kasir.",
  },
  {
    id: 4,
    name: "Perjanjian Kerahasiaan (NDA)",
    category: "Kontrak",
    number: "NDA-2026-004",
    client: {
      name: "PT ABC",
      domain: "ptabc.com",
      initials: "PA",
      color: "bg-warning-soft",
      text: "text-warning",
    },
    date: "28 Jul 2026",
    period: "28 Jul 2026 - 28 Jul 2028",
    status: "Aktif",
    size: "3.2 MB",
    signStatus: "Sudah TTD (2/2)",
    uploadedBy: "Legal Admin",
    description:
      "Perjanjian kerahasiaan data internal dan source code aplikasi PT ABC.",
  },
  {
    id: 5,
    name: "Nota Pembayaran DP",
    category: "Nota Pembayaran",
    number: "PAY-2026-001",
    client: {
      name: "Toko Makmur",
      domain: "tokomakmur.com",
      initials: "TM",
      color: "bg-danger-soft",
      text: "text-danger",
    },
    date: "01 Agu 2026",
    period: "-",
    status: "Lunas",
    size: "950 KB",
    signStatus: "Tidak Perlu TTD",
    uploadedBy: "Finance Team",
    description:
      "Bukti pembayaran uang muka pengembangan e-commerce Toko Makmur.",
  },
];

const filteredDocuments = computed(() => {
  const filtered = documentsList.filter((doc) => {
    const matchesTab =
      activeTab.value === "all" || doc.category === activeTab.value;

    const query = searchQuery.value.toLowerCase();

    const matchesSearch =
      doc.name.toLowerCase().includes(query) ||
      doc.number.toLowerCase().includes(query) ||
      doc.client.name.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });
  console.log(filtered);
  return filtered.map((s) => ({
    ...s,
    client: s.client.name,
  }));
});

const headers = [
  {
    key: "client",
    label: "Client",
  },
  {
    key: "name",
    label: "Nama Dokumen",
  },
  {
    key: "category",
    label: "Kategori",
  },
  {
    key: "number",
    label: "Nomor Dokumen",
  },
  {
    key: "date",
    label: "Tanggal",
  },
  {
    key: "signStatus",
    label: "Status TTD / Berkas",
  },
];

const handleSelect = (doc) => {
  navigateTo(`/admin/document/${doc.id}`);
};
</script>
