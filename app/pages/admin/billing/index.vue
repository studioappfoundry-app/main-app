<template>
  <div class="bg-card min-h-screen p-2 pt-6 lg:p-6 text-foreground space-y-6">
    <!-- Breadcrumb -->
    <Breadcumb
      :items="[{ label: 'Dashboard', to: '/admin' }, { label: 'Billing' }]"
    />

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-1">Billing</h1>

        <p class="text-secondary text-sm">
          Kelola semua akun client dan tagihan mereka.
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
    </div>

    <!-- Table Card -->
    <div class="bg-background p-6 rounded-2xl shadow-app">
      <h1 class="text-sm font-bold mb-4">Daftar Client Billing</h1>

      <Table :headers="headers" :data="tableData" @select="handleSelect" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { Search, Filter } from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "billing",
  title: "Billing",
});

const searchQuery = ref("");

const clients = ref([
  {
    id: 1,
    name: "Klinik Sehat",
    initials: "KS",
    email: "admin@kliniksehat.com",
    phone: "+62 812-3456-7890",
    package: "Premium",
    services: "Website + SEO + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 0",
    unpaidSubtitle: "Semua tagihan lunas",
    unpaidBadgeClass: "text-success",
    nextBilling: "11 Sep 2026",
  },
  {
    id: 2,
    name: "Cafe Nusantara",
    initials: "CN",
    email: "hello@cafenusantara.com",
    phone: "+62 821-9876-5432",
    package: "Standard",
    services: "Website + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 1.250.000",
    unpaidSubtitle: "1 tagihan belum lunas",
    unpaidBadgeClass: "text-danger",
    nextBilling: "12 Agu 2026",
  },
  {
    id: 3,
    name: "PT ABC",
    initials: "PA",
    email: "admin@ptabc.com",
    phone: "+62 811-2233-4455",
    package: "Enterprise",
    services: "Website + SEO + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 2.500.000",
    unpaidSubtitle: "2 tagihan belum lunas",
    unpaidBadgeClass: "text-danger",
    nextBilling: "15 Agu 2026",
  },
  {
    id: 4,
    name: "Toko Makmur",
    initials: "TM",
    email: "owner@tokomakmur.com",
    phone: "+62 812-5566-7788",
    package: "Basic",
    services: "Website",
    accountStatus: "Nonaktif",
    accountNote: "Menunggu pembayaran",
    statusBadge: "bg-danger-soft text-danger",
    unpaidAmount: "Rp 750.000",
    unpaidSubtitle: "1 tagihan belum lunas",
    unpaidBadgeClass: "text-danger",
    nextBilling: "-",
  },
  {
    id: 5,
    name: "Studio Utama",
    initials: "SU",
    email: "contact@studioutama.com",
    phone: "+62 813-6677-8899",
    package: "Standard",
    services: "Website + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 0",
    unpaidSubtitle: "Semua tagihan lunas",
    unpaidBadgeClass: "text-success",
    nextBilling: "07 Sep 2026",
  },
]);

const filteredClients = computed(() => {
  const query = searchQuery.value.toLowerCase();

  if (!query) return clients.value;

  return clients.value.filter((client) => {
    return (
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    );
  });
});

const headers = [
  {
    key: "client",
    label: "Client",
  },
  {
    key: "contact",
    label: "Email / Kontak",
  },
  {
    key: "package",
    label: "Paket Layanan",
  },
  {
    key: "status",
    label: "Status Akun",
  },
  {
    key: "unpaid",
    label: "Total Belum Lunas",
  },
  {
    key: "nextBilling",
    label: "Tagihan Berikutnya",
  },
];

const tableData = computed(() =>
  filteredClients.value.map((item) => ({
    ...item,

    client: item.name,

    contact: item.email,

    status: item.accountStatus,

    unpaid: item.unpaidAmount,
  })),
);

const handleSelect = (item) => {
  navigateTo(`/admin/billing/${item.id}`);
};
</script>
