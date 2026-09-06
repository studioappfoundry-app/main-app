<template>
  <div class="bg-card p-2 pt-6 lg:p-6">
    <main class="space-y-6">
      <!-- Breadcrumb -->
      <Breadcumb
        :items="[
          {
            label: 'Dashboard',
            to: '/admin/',
          },
          {
            label: 'Maintenance',
            to: '/admin/maintenance',
          },
          {
            label: activeClient.client.name,
          },
        ]"
      />

      <!-- Header -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-foreground">
              {{ activeClient.client.name }}
            </h1>
            <Badge
              :variant="activeClient.status === 'Aktif' ? 'success' : 'warning'"
              >{{ activeClient.status }}</Badge
            >
          </div>

          <a
            :href="`https://${activeClient.client.domain}`"
            target="_blank"
            class="inline-flex items-center gap-1 mt-1 text-xs text-muted hover:text-primary"
          >
            {{ activeClient.client.domain }}
            <ExternalLink class="size-3" />
          </a>
        </div>

        <Button variant="primary">
          <div class="flex gap-2 items-center">
            <Plus :size="14" />
            Tambah Update
          </div>
        </Button>
      </header>

      <!-- Stat Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Paket -->
        <div
          class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
        >
          <div
            class="size-12 rounded-xl bg-success-soft text-success flex items-center justify-center shrink-0"
          >
            <ShieldCheck class="size-6" />
          </div>

          <div>
            <p class="text-xs font-medium text-muted">Paket Maintenance</p>

            <p class="text-xl font-bold text-foreground mt-0.5">
              {{ activeClient.package }}
            </p>

            <p class="text-xs text-secondary">
              {{ activeClient.packageName }}
            </p>
          </div>
        </div>

        <!-- Periode -->
        <div
          class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
        >
          <div
            class="size-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0"
          >
            <CalendarDays class="size-6" />
          </div>

          <div>
            <p class="text-xs font-medium text-muted">Periode Maintenance</p>

            <p class="text-sm font-bold text-foreground mt-1">
              {{ activeClient.period.split(" - ")[0] }}
              <span class="text-muted font-normal">s/d</span>
              {{ activeClient.period.split(" - ")[1] }}
            </p>

            <p class="text-xs text-muted mt-0.5">Total 92 hari</p>
          </div>
        </div>

        <!-- Status -->
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

            <p
              :class="[
                'text-xl font-bold mt-0.5',
                activeClient.status === 'Aktif'
                  ? 'text-success'
                  : 'text-warning',
              ]"
            >
              {{ activeClient.status }}
            </p>

            <p class="text-xs text-muted">Sejak 01 Agu 2026</p>
          </div>
        </div>

        <!-- Sisa Waktu -->
        <div
          class="bg-background p-5 rounded-xl border border-border shadow-app flex items-center gap-4"
        >
          <div
            class="size-12 rounded-xl bg-success-soft text-success flex items-center justify-center shrink-0"
          >
            <Clock class="size-6" />
          </div>

          <div class="flex-1">
            <p class="text-xs font-medium text-muted">Sisa Waktu</p>

            <p class="text-xl font-bold text-success my-0.5">
              {{ activeClient.timeLeft.value }}
              {{ activeClient.timeLeft.label }}
            </p>

            <ProgressBar :value="74" :show-value="false" />

            <p class="text-[10px] text-muted mt-1">74% dari periode selesai</p>
          </div>
        </div>
      </section>

      <!-- Informasi & Riwayat -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Informasi Layanan -->
        <section
          class="bg-background p-6 rounded-xl border border-border shadow-app space-y-4"
        >
          <h2 class="text-base font-bold text-foreground">Informasi Layanan</h2>
          <div class="space-y-4 text-sm">
            <div class="grid grid-cols-12 gap-2">
              <span class="col-span-4 text-secondary"> Jenis Layanan </span>

              <span class="col-span-8 font-medium text-foreground">
                Website Maintenance
              </span>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <span class="col-span-4 text-secondary"> Lingkup Pekerjaan </span>

              <span class="col-span-8 font-medium text-foreground">
                Monitoring, update keamanan, backup, perbaikan bug minor, dan
                update kecil.
              </span>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <span class="col-span-4 text-secondary"> Frekuensi </span>

              <span class="col-span-8 font-medium text-foreground">
                Mingguan
              </span>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <span class="col-span-4 text-secondary"> Penanggung Jawab </span>

              <span class="col-span-8 font-medium text-foreground">
                Admin Appfoundry
              </span>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <span class="col-span-4 text-secondary"> Catatan </span>

              <span class="col-span-8 font-medium text-foreground">
                Layanan sesuai dengan paket Basic Maintenance.
              </span>
            </div>
          </div>
        </section>

        <!-- Riwayat -->
        <section
          class="lg:col-span-2 bg-background p-6 rounded-xl border border-border shadow-app space-y-6"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-foreground">
              Riwayat Update Maintenance
            </h2>

            <button class="text-sm text-primary font-medium hover:underline">
              Lihat Semua
            </button>
          </div>

          <div class="space-y-6">
            <article
              v-for="(update, idx) in updateHistory"
              :key="idx"
              class="flex gap-4"
            >
              <div
                class="flex flex-col items-center justify-center size-17 rounded-xl bg-surface border border-border shrink-0"
              >
                <span class="text-base font-bold text-foreground leading-none">
                  {{ String(update.date.day).padStart(2, "0") }}
                </span>

                <span class="text-sm uppercase font-semibold text-muted mt-0.5">
                  {{ update.date.month }}
                </span>

                <span class="text-sm text-muted">
                  {{ update.date.year }}
                </span>
              </div>

              <div class="flex-1 space-y-2">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-foreground">
                    {{ update.type }}
                  </h3>
                </div>

                <ul
                  class="space-y-1 text-sm text-secondary list-disc list-inside"
                >
                  <li v-for="point in update.points" :key="point">
                    {{ point }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <!-- Catatan -->
        <section
          class="bg-background p-6 rounded-xl border border-border shadow-app space-y-4"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-foreground">
              Catatan Terakhir
            </h2>
          </div>

          <div class="p-4 rounded-xl bg-surface border border-border space-y-3">
            <p class="text-xs text-muted">12 Agu 2026, 10:23</p>

            <p class="text-sm text-foreground leading-relaxed">
              Contact form tidak mengirim email ke beberapa alamat. Sudah
              diperbaiki dan sekarang berfungsi normal.
            </p>
          </div>
        </section>

        <!-- Dokumentasi -->
        <section
          class="lg:col-span-2 bg-background p-6 rounded-xl border border-border shadow-app space-y-4"
        >
          <h2 class="text-base font-bold text-foreground">
            Dokumentasi & Referensi
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <article
              v-for="item in references"
              :key="item.name"
              class="p-3 rounded-xl border border-border bg-background flex items-center justify-between gap-3"
            >
              <div class="flex items-center gap-3 overflow-hidden">
                <div
                  class="size-9 rounded-lg bg-surface flex items-center justify-center shrink-0"
                >
                  <component :is="item.icon" class="size-4 text-secondary" />
                </div>

                <div class="truncate">
                  <p class="text-xs font-semibold text-foreground truncate">
                    {{ item.name }}
                  </p>

                  <p class="text-[10px] text-muted truncate">
                    {{ item.detail }}
                  </p>
                </div>
              </div>

              <button
                class="p-1.5 rounded-lg border border-border text-secondary hover:text-foreground shrink-0"
              >
                <Download class="size-3.5" />
              </button>
            </article>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
<script setup>
import {
  CalendarDays,
  ExternalLink,
  ShieldCheck,
  Clock,
  FileText,
  BotMessageSquare,
  Plus,
  Download,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "maintenance",
  title: "Detail Maintenance",
});

const route = useRoute();

const maintenanceList = [
  {
    id: 1,
    client: {
      name: "Klinik Sehat",
      domain: "kliniksehat.com",
      initials: "KS",
      color: "bg-success-soft",
      text: "text-success",
    },
    package: "3 Bulan",
    packageName: "Basic Maintenance",
    period: "01 Agu 2026 - 01 Nov 2026",
    status: "Aktif",
    timeLeft: {
      value: 68,
      label: "hari lagi",
    },
    lastUpdate: "12 Agu 2026",
  },
  {
    id: 2,
    client: {
      name: "Cafe Nusantara",
      domain: "cafenusantara.com",
      initials: "CN",
      color: "bg-info-soft",
      text: "text-info",
    },
    package: "6 Bulan",
    packageName: "Standard Maintenance",
    period: "22 Jun 2026 - 22 Des 2026",
    status: "Aktif",
    timeLeft: {
      value: 131,
      label: "hari lagi",
    },
    lastUpdate: "11 Agu 2026",
  },
  {
    id: 3,
    client: {
      name: "PT ABC",
      domain: "ptabc.com",
      initials: "PA",
      color: "bg-warning-soft",
      text: "text-warning",
    },
    package: "3 Bulan",
    packageName: "Basic Maintenance",
    period: "18 Apr 2026 - 18 Jul 2026",
    status: "Aktif",
    timeLeft: {
      value: 5,
      label: "hari lagi",
    },
    lastUpdate: "10 Agu 2026",
  },
  {
    id: 4,
    client: {
      name: "Toko Makmur",
      domain: "tokomakmur.com",
      initials: "TM",
      color: "bg-danger-soft",
      text: "text-danger",
    },
    package: "3 Bulan",
    packageName: "Basic Maintenance",
    period: "08 Mei 2026 - 08 Agu 2026",
    status: "Akan Berakhir",
    timeLeft: {
      value: 0,
      label: "Hari ini",
    },
    lastUpdate: "08 Agu 2026",
  },
  {
    id: 5,
    client: {
      name: "Studio Utama",
      domain: "studioutama.com",
      initials: "SU",
      color: "bg-success-soft",
      text: "text-success",
    },
    package: "6 Bulan",
    packageName: "Standard Maintenance",
    period: "15 Mei 2026 - 15 Nov 2026",
    status: "Aktif",
    timeLeft: {
      value: 94,
      label: "hari lagi",
    },
    lastUpdate: "07 Agu 2026",
  },
];

const activeClient = computed(() => {
  return maintenanceList.find((item) => item.id === Number(route.params.id));
});

if (!activeClient.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Data maintenance tidak ditemukan",
  });
}

const updateHistory = [
  {
    date: {
      day: 12,
      month: "Agu",
      year: 2026,
    },
    type: "Maintenance Mingguan",
    time: "10:23",
    admin: "Admin Appfoundry",
    points: [
      "Monitoring performa website",
      "Backup database dan file",
      "Perbaikan bug pada contact form",
      "Update plugin dan dependencies",
    ],
  },
  {
    date: {
      day: 5,
      month: "Agu",
      year: 2026,
    },
    type: "Maintenance Mingguan",
    time: "09:15",
    admin: "Admin Appfoundry",
    points: [
      "Monitoring uptime website",
      "Scan keamanan dan malware",
      "Optimasi kecepatan halaman",
      "Pemeriksaan link broken",
    ],
  },
  {
    date: {
      day: 29,
      month: "Jul",
      year: 2026,
    },
    type: "Maintenance Mingguan",
    time: "10:02",
    admin: "Admin Appfoundry",
    points: [
      "Monitoring & health check",
      "Backup rutin",
      "Update keamanan server",
      "Perbaikan bug kecil",
    ],
  },
];

const references = [
  {
    icon: BotMessageSquare,
    name: "Checklist Maintenance",
    detail: "Dokumen checklist rutin mingguan",
  },
  {
    icon: FileText,
    name: "Laporan Backup Terakhir",
    detail: "Backup_20260812.zip",
  },
  {
    icon: FileText,
    name: "Log Perubahan",
    detail: "Changelog update terakhir",
  },
];

const backToList = () => {
  navigateTo("/admin/maintenance");
};
</script>
