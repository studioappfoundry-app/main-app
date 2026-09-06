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
          },
        ]"
      />

      <!-- Header Halaman -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-foreground">Maintenance</h1>

          <p class="text-sm text-secondary mt-1">
            Pantau dan kelola semua layanan maintenance website klien.
          </p>
        </div>
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
      </header>

      <!-- Tabel Maintenance -->
      <div class="bg-background p-6 rounded-2xl shadow-app">
        <h1 class="text-sm font-bold mb-4">Daftar Maintenance</h1>

        <Table :headers="headers" :data="dataTabel" @select="handleSelect" />
      </div>
    </main>
  </div>
</template>
<script setup>
import { Search, ListFilter, Download } from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "maintenance",
  title: "Maintenance",
});

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
const dataTabel = computed(() => {
  return maintenanceList.map((item) => ({
    ...item,
    client: item.client.name,
    timeLeft: item.timeLeft.value + " " + item.timeLeft.label,
  }));
});
const headers = [
  {
    key: "client",
    label: "Client",
  },
  {
    key: "website",
    label: "Website",
  },
  {
    key: "package",
    label: "Paket Maintenance",
  },
  {
    key: "period",
    label: "Periode",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "timeLeft",
    label: "Sisa Waktu",
  },
  {
    key: "lastUpdate",
    label: "Terakhir Update",
  },
];

const handleSelect = (item) => {
  navigateTo(`/admin/maintenance/${item.id}`);
};
</script>
