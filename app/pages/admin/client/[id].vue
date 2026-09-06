<template>
  <div class="bg-card min-h-screen p-2 pt-6 lg:p-6 text-foreground">
    <Breadcumb :items="breadcrumbItems" />

    <!-- Client tidak ditemukan -->
    <div
      v-if="!selectedClient"
      class="bg-background rounded-xl border border-border p-6 text-center"
    >
      <h1 class="text-xl font-bold mb-2">Client tidak ditemukan</h1>

      <p class="text-muted text-sm mb-5">
        Data client dengan ID {{ clientId }} tidak tersedia.
      </p>

      <Button variant="outline" @click="navigateTo('/admin/client')">
        Kembali ke Client
      </Button>
    </div>

    <template v-else>
      <!-- Header -->
      <header class="flex flex-wrap gap-4 items-center justify-between mb-8">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h1 class="text-2xl font-bold">
              {{ selectedClient.name }}
            </h1>

            <Badge variant="success" size="sm">
              {{ selectedClient.status }}
            </Badge>
          </div>

          <a
            :href="selectedClient.url"
            target="_blank"
            class="text-xs text-muted hover:text-primary flex items-center gap-1"
          >
            {{ selectedClient.domain }}

            <ExternalLink class="w-3 h-3" />
          </a>
        </div>

        <div class="flex items-center gap-2">
          <Button variant="solid" size="sm">
            <div class="flex gap-2 items-center">
              <Edit class="w-3.5 h-3.5" />
              <span>Edit Client</span>
            </div>
          </Button>

          <Button variant="soft-danger" size="sm">
            <div class="flex gap-2 items-center">
              <Trash class="w-3.5 h-3.5" />
              <span>Hapus Client</span>
            </div>
          </Button>
        </div>
      </header>

      <!-- Cards -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Informasi Bisnis -->
        <div
          class="bg-background rounded-xl p-5 border border-border shadow-app"
        >
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b border-border"
          >
            <div class="flex items-center gap-2 font-bold text-sm">
              <Building2 class="w-4 h-4 text-secondary" />

              <span>Informasi Bisnis</span>
            </div>

            <Button variant="outline" size="sm">
              <div class="flex gap-2 items-center">
                <Edit class="w-3.5 h-3.5" />
                Edit
              </div>
            </Button>
          </div>

          <div class="space-y-4 text-sm">
            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Nama Bisnis </span>

              <span class="col-span-8 font-bold text-foreground">
                {{ selectedClient.name }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Email </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.email }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Telepon </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.phone }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Alamat </span>

              <span class="col-span-8 font-medium leading-relaxed">
                {{ selectedClient.address }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Jenis Bisnis </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.businessType }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Deskripsi </span>

              <span class="col-span-8 font-medium leading-relaxed">
                {{ selectedClient.description }}
              </span>
            </div>
          </div>
        </div>

        <!-- Informasi Website -->
        <div
          class="bg-background rounded-xl p-5 border border-border shadow-app"
        >
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b border-border"
          >
            <div class="flex items-center gap-2 font-bold text-sm">
              <Globe class="w-4 h-4 text-secondary" />

              <span>Informasi Website</span>
            </div>

            <Button variant="outline" size="sm">
              <div class="flex gap-2 items-center">
                <Edit class="w-3.5 h-3.5" />
                Edit
              </div>
            </Button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Domain </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.domain }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> URL Website </span>

              <a
                :href="selectedClient.url"
                target="_blank"
                class="col-span-8 font-medium hover:text-primary"
              >
                {{ selectedClient.url }}
              </a>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Paket Hosting </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.hosting }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Server / Lokasi </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.location }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> SSL </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.sslStatus }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Valid Sampai </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.sslValid }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Status Website </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.websiteStatus }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-4 text-secondary"> Tanggal Live </span>

              <span class="col-span-8 font-medium">
                {{ selectedClient.liveDate }}
              </span>
            </div>
          </div>
        </div>

        <!-- Informasi Teknis -->
        <div
          class="bg-background rounded-xl p-5 border border-border shadow-app"
        >
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b border-border"
          >
            <div class="flex items-center gap-2 font-bold text-sm">
              <Terminal class="w-4 h-4 text-secondary" />

              <span>Informasi Teknis</span>
            </div>

            <Button variant="outline" size="sm">
              <div class="flex gap-2 items-center">
                <Edit class="w-3.5 h-3.5" />
                Edit
              </div>
            </Button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary"> Platform </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.platform }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary">
                Bahasa Pemrograman
              </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.language }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary"> Database </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.database }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary">
                Versi PHP / Runtime
              </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.runtime }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary"> Lokasi Server </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.serverLocation }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary"> Jenis Pondasi Web </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.siteCategory }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary"> Desain </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.design }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary"> Tema </span>

              <span class="col-span-7 font-medium">
                {{ selectedClient.theme }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-5 text-secondary"> Catatan </span>

              <span class="col-span-7 font-medium leading-relaxed">
                {{ selectedClient.notes }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

import {
  ExternalLink,
  Edit,
  Trash,
  Building2,
  Globe,
  Terminal,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "client",
  title: "Detail Client",
});

const route = useRoute();

const clientId = computed(() => Number(route.params.id));

const clients = [
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
];

const selectedClient = computed(() => {
  return clients.find((client) => client.id === clientId.value);
});

const breadcrumbItems = computed(() => [
  {
    label: "Dashboard",
    to: "/admin/",
  },
  {
    label: "Client",
    to: "/admin/client",
  },
  {
    label: selectedClient.value?.name || "Detail Client",
  },
]);
</script>
