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
            to: '/admin/document',
          },
          {
            label: activeDocument.client.name,
          },
        ]"
      />

      <!-- Detail Header -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-foreground">
              {{ activeDocument.name }}
            </h1>
            <Badge
              :variant="[
                activeDocument.status === 'Aktif' ? 'success' : 'warning',
              ]"
              >{{ activeDocument.status }}</Badge
            >
          </div>

          <p class="text-xs text-muted mt-1">
            Nomor:

            <span class="font-mono text-foreground font-semibold">
              {{ activeDocument.number }}
            </span>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <Button class="h-9 px-3" variant="primary">
            <div class="flex gap-2 items-center">
              <Upload class="size-4" />
              Upload Revisi
            </div>
          </Button>
        </div>
      </header>

      <!-- Grid Stat Summary -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
        >
          <div
            class="size-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0"
          >
            <FileText class="size-6" />
          </div>

          <div>
            <p class="text-xs font-medium text-muted">Kategori Dokumen</p>

            <p class="text-base font-bold text-foreground mt-0.5">
              {{ activeDocument.category }}
            </p>

            <p class="text-[11px] text-secondary">
              {{ activeDocument.size }}
            </p>
          </div>
        </div>

        <div
          class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
        >
          <div
            class="size-12 rounded-xl bg-info-soft text-info flex items-center justify-center shrink-0"
          >
            <Building2 class="size-6" />
          </div>

          <div>
            <p class="text-xs font-medium text-muted">Klien Terkait</p>

            <p class="text-base font-bold text-foreground mt-0.5">
              {{ activeDocument.client.name }}
            </p>

            <p class="text-[11px] text-secondary">
              {{ activeDocument.client.domain }}
            </p>
          </div>
        </div>

        <div
          class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
        >
          <div
            class="size-12 rounded-xl bg-warning-soft text-warning flex items-center justify-center shrink-0"
          >
            <Clock class="size-6" />
          </div>

          <div>
            <p class="text-xs font-medium text-muted">Masa Berlaku / Tanggal</p>

            <p class="text-xs font-bold text-foreground mt-1">
              {{
                activeDocument.period !== "-"
                  ? activeDocument.period
                  : activeDocument.date
              }}
            </p>

            <p class="text-[11px] text-muted mt-0.5">
              Diterbitkan: {{ activeDocument.date }}
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
            <p class="text-xs font-medium text-muted">Status Tanda Tangan</p>

            <p class="text-sm font-bold text-success mt-0.5">
              {{ activeDocument.signStatus }}
            </p>

            <p class="text-[11px] text-muted">Oleh Admin & Client</p>
          </div>
        </div>
      </section>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Description Card -->
          <section
            class="bg-background p-6 rounded-xl border border-border shadow-app space-y-4"
          >
            <h2 class="text-base font-bold text-foreground">
              Informasi Dokumen
            </h2>

            <p class="text-sm text-secondary leading-relaxed">
              {{ activeDocument.description }}
            </p>

            <div
              class="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
            >
              <div>
                <span class="text-muted block"> Terakhir Diperbarui: </span>

                <span class="font-medium text-foreground">
                  {{ activeDocument.date }}
                </span>
              </div>
            </div>
          </section>

          <!-- Attachments -->
          <section
            class="bg-background p-6 rounded-xl border border-border shadow-app space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold text-foreground">
                Berkas & Lampiran
              </h2>

              <span class="text-xs text-muted">
                {{ attachments.length }} Berkas Tersedia
              </span>
            </div>

            <div class="space-y-3">
              <div
                v-for="(file, idx) in attachments"
                :key="idx"
                class="p-4 rounded-xl border border-border bg-surface flex items-center justify-between gap-4"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <div
                    class="size-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0"
                  >
                    <FileText class="size-5" />
                  </div>

                  <div class="truncate">
                    <p class="text-sm font-medium text-foreground truncate">
                      {{ file.name }}
                    </p>

                    <p class="text-xs text-muted">
                      {{ file.type }} • {{ file.size }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <button
                    class="p-2 rounded-lg border border-border bg-background text-secondary hover:text-foreground hover:bg-surface-soft cursor-pointer"
                  >
                    <Eye class="size-4" />
                  </button>

                  <button
                    class="p-2 rounded-lg bg-primary text-background hover:opacity-90 cursor-pointer"
                  >
                    <Download class="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right -->
        <section
          class="bg-background p-6 rounded-xl border border-border shadow-app space-y-6"
        >
          <h2 class="text-base font-bold text-foreground">
            Riwayat Aktivitas Dokumen
          </h2>

          <div
            class="relative space-y-6 before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-border"
          >
            <article
              v-for="(item, idx) in documentHistory"
              :key="idx"
              class="relative flex items-center gap-4"
            >
              <div class="flex items-center justify-center shrink-0 z-10">
                <component :is="item.icon" class="size-4" :class="item.color" />
              </div>

              <div class="space-y-0.5">
                <p class="text-xs font-semibold text-foreground">
                  {{ item.title }}
                </p>

                <p class="text-[11px] text-secondary">
                  {{ item.actor }}
                </p>

                <p class="text-[10px] text-muted">
                  {{ item.time }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
<script setup>
import { computed } from "vue";
import {
  Download,
  Eye,
  FileText,
  ShieldCheck,
  Clock,
  Building2,
  Upload,
  FileCheck,
  UserCheck,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "dokumen",
  title: "Detail Dokumen",
});

const route = useRoute();

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

const activeDocument = computed(() => {
  return documentsList.find((doc) => doc.id === Number(route.params.id));
});

if (!activeDocument.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Dokumen tidak ditemukan",
  });
}

const documentHistory = [
  {
    title: "Dokumen Ditandatangani oleh Klien",
    actor: "Budi Santoso (Kedai Kopi Senja)",
    time: "11 Agu 2026, 14:30",
    icon: UserCheck,
    color: "text-success",
  },
  {
    title: "Dokumen Ditandatangani oleh Admin",
    actor: "Admin Appfoundry",
    time: "11 Agu 2026, 10:15",
    icon: FileCheck,
    color: "text-primary",
  },
  {
    title: "Dokumen Diunggah ke Sistem",
    actor: "Admin Appfoundry",
    time: "10 Agu 2026, 16:00",
    icon: Upload,
    color: "text-secondary",
  },
];

const attachments = [
  {
    name: "CNTR-2026-001_Signed.pdf",
    size: "2.4 MB",
    type: "PDF Document",
  },
  {
    name: "Lampiran_A_SLA_Maintenance.pdf",
    size: "1.1 MB",
    type: "PDF Document",
  },
];

const backToList = () => {
  navigateTo("/admin/dokumen");
};
</script>
