<template>
  <div class="bg-card min-h-screen p-2 pt-6 lg:p-6 text-foreground">
    <Breadcumb :items="breadcrumbItems" />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold mb-1">Client</h1>

        <p class="text-secondary text-sm">
          Kelola semua client dan informasi website mereka.
        </p>
      </div>

      <!-- Search -->
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

    <!-- Table -->
    <div class="bg-background p-6 rounded-2xl shadow-app">
      <h1 class="text-sm font-bold mb-4">Daftar Client</h1>
      <Table :headers="headers" :data="filteredClients" @select="openDetail" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search } from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "client",
  title: "Client",
});

const search = ref("");

const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/admin/",
  },
  {
    label: "Client",
  },
];

const headers = [
  {
    key: "name",
    label: "Client",
  },
  {
    key: "domain",
    label: "Domain / Website",
  },
  {
    key: "hosting",
    label: "Paket Hosting",
  },
  {
    key: "sslStatus",
    label: "SSL",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "joinedDate",
    label: "Bergabung",
  },
  {
    key: "lastUpdate",
    label: "Terakhir Update",
  },
];

const clients = ref([
  {
    id: 1,
    name: "Klinik Sehat",
    email: "hello@kliniksehat.com",

    domain: "kliniksehat.com",
    url: "https://kliniksehat.com",

    hosting: "VPS Pro",
    location: "Singapore",

    sslStatus: "Aktif",
    sslValid: "Valid s.d 12 Agu 2027",

    status: "Aktif",

    joinedDate: "10 Jul 2026",
    lastUpdate: "12 Agu 2026",

    phone: "+62 812-3456-7890",
    address: "Jl. Sehat No. 123, Jakarta Selatan, DKI Jakarta 12500",
    businessType: "Klinik Kesehatan",

    description:
      "Klinik kesehatan dengan layanan umum, gigi, dan pemeriksaan rutin.",

    websiteStatus: "Online",
    liveDate: "12 Jul 2026",

    platform: "Nuxt.js",
    language: "TypeScript",
    database: "MySQL",
    runtime: "Node.js 20",
    serverLocation: "Singapore",

    siteCategory: "Company Profile",
    design: "Custom UI/UX",
    theme: "Light",

    notes: "Menggunakan Tailwind CSS & Nuxt UI.",
  },

  {
    id: 2,
    name: "Cafe Nusantara",
    email: "info@cafenusantara.com",

    domain: "cafenusantara.com",
    url: "https://cafenusantara.com",

    hosting: "VPS Entry",
    location: "Indonesia",

    sslStatus: "Aktif",
    sslValid: "Valid s.d 04 Feb 2027",

    status: "Aktif",

    joinedDate: "22 Jun 2026",
    lastUpdate: "11 Agu 2026",

    phone: "+62 811-2222-3333",
    address: "Jl. Nusantara No. 45, Bandung",
    businessType: "Cafe & Restaurant",

    description: "Cafe dengan konsep makanan dan minuman khas Nusantara.",

    websiteStatus: "Online",
    liveDate: "25 Jun 2026",

    platform: "WordPress",
    language: "PHP",
    database: "MySQL",
    runtime: "PHP 8.2",
    serverLocation: "Indonesia",

    siteCategory: "Digital Catalog",
    design: "Custom UI/UX",
    theme: "Light",

    notes: "Website menggunakan menu digital.",
  },

  {
    id: 3,
    name: "PT ABC",
    email: "admin@ptabc.com",

    domain: "ptabc.com",
    url: "https://ptabc.com",

    hosting: "Dedicated Basic",
    location: "Singapore",

    sslStatus: "Aktif",
    sslValid: "Valid s.d 18 Apr 2027",

    status: "Aktif",

    joinedDate: "05 Jun 2026",
    lastUpdate: "10 Agu 2026",

    phone: "+62 812-9999-8888",
    address: "Jl. Industri No. 10, Jakarta",
    businessType: "Professional Services",

    description: "Perusahaan penyedia layanan profesional.",

    websiteStatus: "Online",
    liveDate: "10 Jun 2026",

    platform: "Laravel",
    language: "PHP",
    database: "MySQL",
    runtime: "PHP 8.3",
    serverLocation: "Singapore",

    siteCategory: "Company Profile",
    design: "Custom UI/UX",
    theme: "Dark",

    notes: "Menggunakan sistem CMS custom.",
  },

  {
    id: 4,
    name: "Toko Makmur",
    email: "cs@tokomakmur.com",

    domain: "tokomakmur.com",
    url: "https://tokomakmur.com",

    hosting: "Shared Hosting",
    location: "Indonesia",

    sslStatus: "Akan Expired",
    sslValid: "Exp 01 Sep 2026",

    status: "Perlu Diperbarui",

    joinedDate: "28 Mei 2026",
    lastUpdate: "08 Agu 2026",

    phone: "+62 813-5555-7777",
    address: "Jl. Makmur No. 88, Surabaya",
    businessType: "Retail",

    description: "Toko retail dengan layanan penjualan online.",

    websiteStatus: "Online",
    liveDate: "01 Jun 2026",

    platform: "WooCommerce",
    language: "PHP",
    database: "MySQL",
    runtime: "PHP 8.1",
    serverLocation: "Indonesia",

    siteCategory: "Toko Online",
    design: "Template Custom",
    theme: "Light",

    notes: "Perlu perpanjangan SSL.",
  },

  {
    id: 5,
    name: "Studio Utama",
    email: "contact@studioutama.com",

    domain: "studioutama.com",
    url: "https://studioutama.com",

    hosting: "VPS Pro",
    location: "Singapore",

    sslStatus: "Aktif",
    sslValid: "Valid s.d 30 Jan 2027",

    status: "Aktif",

    joinedDate: "15 Mei 2026",
    lastUpdate: "07 Agu 2026",

    phone: "+62 814-1111-2222",
    address: "Jl. Kreatif No. 12, Yogyakarta",
    businessType: "Creative Agency",

    description: "Studio kreatif dan digital agency.",

    websiteStatus: "Online",
    liveDate: "20 Mei 2026",

    platform: "Nuxt.js",
    language: "TypeScript",
    database: "PostgreSQL",
    runtime: "Node.js 20",
    serverLocation: "Singapore",

    siteCategory: "Portfolio",
    design: "Custom UI/UX",
    theme: "Dark",

    notes: "Menggunakan animasi GSAP.",
  },
]);

const filteredClients = computed(() => {
  const keyword = search.value.toLowerCase().trim();

  if (!keyword) {
    return clients.value;
  }

  return clients.value.filter((client) => {
    return (
      client.name.toLowerCase().includes(keyword) ||
      client.domain.toLowerCase().includes(keyword) ||
      client.email.toLowerCase().includes(keyword)
    );
  });
});

const openDetail = (client) => {
  if (!client) return;

  navigateTo(`/admin/client/${client.id}`);
};
</script>
