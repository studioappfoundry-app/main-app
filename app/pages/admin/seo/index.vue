<template>
  <div class="bg-card p-2 pt-6 lg:p-6">
    <main class="space-y-6">
      <!-- Header -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <Breadcumb
            :items="[
              { label: 'Dashboard', to: '/admin' },
              { label: 'SEO & GEO' },
            ]"
          />

          <div class="flex items-center gap-2 mt-2">
            <h1 class="text-2xl font-bold text-foreground">SEO & GEO</h1>

            <span
              class="inline-flex items-center rounded-md bg-primary-soft text-primary px-2 py-0.5 text-xs font-semibold"
            >
              Premium
            </span>
          </div>

          <p class="text-sm text-secondary mt-1">
            Pantau performa dan kelola layanan SEO & GEO seluruh website klien.
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

      <!-- Table Card -->
      <div class="bg-background p-6 rounded-2xl shadow-app">
        <h1 class="text-sm font-bold mb-4">Daftar SEO & GEO Client</h1>

        <Table
          :headers="headers"
          :data="filteredSeoList"
          @select="handleSelect"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Search, ListFilter, Download } from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "seo",
  title: "SEO & GEO",
});

const router = useRouter();

const search = ref("");

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
    label: "Paket",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "performance",
    label: "Performa (30 Hari)",
  },
  {
    key: "lastData",
    label: "Data Terakhir",
  },
];

const seoList = [
  {
    id: 1,

    client: {
      name: "Klinik Sehat",
      domain: "kliniksehat.com",
      initials: "KS",
      color: "bg-success-soft",
      text: "text-success",
    },

    website: "kliniksehat.com",

    package: "Premium",

    status: "Aktif",

    statusDesc: "Monitoring aktif",

    performance: {
      impressions: "9.500",
      clicks: "382",
      avgPos: "7,8",
      trend: "+ 18,2%",
      isUp: true,
    },

    lastData: "12 Agu 2026 10:23",
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

    website: "cafenusantara.com",

    package: "Basic",

    status: "Aktif",

    statusDesc: "Setup selesai",

    performance: null,

    lastData: "10 Agu 2026 09:15",
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

    website: "ptabc.com",

    package: "Premium",

    status: "Aktif",

    statusDesc: "Monitoring aktif",

    performance: {
      impressions: "15.240",
      clicks: "624",
      avgPos: "5,2",
      trend: "+ 12,4%",
      isUp: true,
    },

    lastData: "11 Agu 2026 08:42",
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

    website: "tokomakmur.com",

    package: "Belum Aktif",

    status: "Nonaktif",

    statusDesc: "Belum berlangganan",

    performance: null,

    lastData: "—",
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

    website: "studioutama.com",

    package: "Premium",

    status: "Aktif",

    statusDesc: "Monitoring aktif",

    performance: {
      impressions: "6.320",
      clicks: "241",
      avgPos: "8,9",
      trend: "- 3,1%",
      isUp: false,
    },

    lastData: "12 Agu 2026 07:55",
  },
];

const filteredSeoList = computed(() => {
  const keyword = search.value?.toLowerCase().trim();

  const filtered = !keyword
    ? seoList
    : seoList.filter((item) => {
        return (
          item.client.name.toLowerCase().includes(keyword) ||
          item.client.domain.toLowerCase().includes(keyword)
        );
      });

  return filtered.map((item) => ({
    ...item,

    client: item.client.name,

    performance: item.performance ? item.performance.trend : "-",
  }));
});

const handleSelect = (item) => {
  navigateTo(`/admin/seo/${item.id}`);
};
</script>
