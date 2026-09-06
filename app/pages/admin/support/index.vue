<template>
  <div class="p-2 pt-6 lg:p-6 bg-card min-h-screen">
    <div class="space-y-6">
      <!-- Breadcrumb -->
      <Breadcumb
        :items="[
          {
            label: 'Dashboard',
            to: '/admin',
          },
          {
            label: 'Bantuan',
          },
        ]"
      />

      <!-- Header -->
      <header class="flex items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-semibold text-foreground">
            Bantuan (Support)
          </h1>

          <p class="text-secondary mt-1">
            Kelola semua permintaan bantuan dan pantau progress penyelesaiannya.
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
        </div>
      </header>

      <!-- Table -->
      <div class="bg-background p-6 rounded-2xl shadow-app">
        <h1 class="text-sm font-bold mb-4">Daftar Ticket Support</h1>

        <Table
          :headers="headers"
          :data="supportTickets"
          @select="handleSelect"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Search, ListFilter, Plus } from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "support",
  title: "Support",
});

const supportTickets = [
  {
    id: 1024,
    date: "12 Agu 2026, 10:23",
    clientShort: "KS",
    clientName: "Klinik Sehat",
    website: "kliniksehat.com",
    topic: "Contact form tidak mengirim email",
    priority: "Tinggi",
    status: "In Progress",
    progress: 60,
    lastUpdateDate: "12 Agu 2026, 10:23",
    lastUpdateBy: "Admin",
  },
  {
    id: 1023,
    date: "11 Agu 2026, 14:50",
    clientShort: "CN",
    clientName: "Cafe Nusantara",
    website: "cafenusantara.com",
    topic: "Update banner di homepage",
    priority: "Sedang",
    status: "On Hold",
    progress: 40,
    lastUpdateDate: "11 Agu 2026, 14:50",
    lastUpdateBy: "Admin",
  },
  {
    id: 1022,
    date: "10 Agu 2026, 09:15",
    clientShort: "PA",
    clientName: "PT ABC",
    website: "ptabc.com",
    topic: "Error di halaman layanan",
    priority: "Tinggi",
    status: "In Progress",
    progress: 80,
    lastUpdateDate: "10 Agu 2026, 09:15",
    lastUpdateBy: "Admin",
  },
  {
    id: 1021,
    date: "09 Agu 2026, 11:30",
    clientShort: "TM",
    clientName: "Toko Makmur",
    website: "tokomakmur.com",
    topic: "Website lambat saat akses mobile",
    priority: "Sedang",
    status: "Open",
    progress: 20,
    lastUpdateDate: "09 Agu 2026, 11:30",
    lastUpdateBy: "Client",
  },
  {
    id: 1020,
    date: "08 Agu 2026, 16:20",
    clientShort: "SU",
    clientName: "Studio Utama",
    website: "studioutama.com",
    topic: "Permintaan penambahan halaman",
    priority: "Rendah",
    status: "Resolved",
    progress: 100,
    lastUpdateDate: "08 Agu 2026, 16:20",
    lastUpdateBy: "Admin",
  },
];

const headers = [
  {
    key: "id",
    label: "Ticket ID",
  },
  {
    key: "clientName",
    label: "Client",
  },
  {
    key: "website",
    label: "Website",
  },
  {
    key: "topic",
    label: "Masalah / Topik",
  },
  {
    key: "priority",
    label: "Prioritas",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "progress",
    label: "Progress",
  },
  {
    key: "lastUpdateDate",
    label: "Terakhir Update",
  },
];

const handleSelect = (ticket) => {
  navigateTo(`/admin/support/${ticket.id}`);
};
</script>
