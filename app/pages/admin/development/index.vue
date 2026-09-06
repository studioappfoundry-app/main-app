<template>
  <div class="bg-card min-h-screen text-foreground p-2 pt-6 lg:p-6">
    <div class="space-y-6">
      <Breadcumb
        :items="[
          { label: 'Dashboard', to: '/admin' },
          { label: 'Development' },
        ]"
      />

      <!-- Header Section -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-foreground tracking-tight">
            Development
          </h1>

          <p class="text-secondary text-sm mt-1">
            Pantau progress pengerjaan semua website dan update status
            development.
          </p>
        </div>

        <!-- Action Toolbar -->
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
        <h1 class="text-sm font-bold mb-4">Daftar Development</h1>

        <Table
          :headers="headers"
          :data="filteredProjects"
          @select="openDetail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Search, Filter, Download } from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "development",
  title: "Development",
});

const router = useRouter();

const search = ref("");

const headers = [
  {
    key: "name",
    label: "Client",
  },
  {
    key: "website",
    label: "Website",
  },
  {
    key: "progress",
    label: "Progress",
  },
  {
    key: "stage",
    label: "Tahap Saat Ini",
  },
  {
    key: "targetDate",
    label: "Target Selesai",
  },
  {
    key: "lastUpdate",
    label: "Terakhir Update",
  },
  {
    key: "status",
    label: "Status",
  },
];

const projects = ref([
  {
    id: 1,
    name: "Klinik Sehat",
    initials: "KS",
    website: "kliniksehat.com",
    progress: "75%",
    stage: "Development",
    targetDate: "20 Agu 2026",
    lastUpdate: "12 Agu 2026",
    status: "On Track",
  },
  {
    id: 2,
    name: "Cafe Nusantara",
    initials: "CN",
    website: "cafenusantara.com",
    progress: "45%",
    stage: "Design",
    targetDate: "18 Agu 2026",
    lastUpdate: "11 Agu 2026",
    status: "On Track",
  },
  {
    id: 3,
    name: "PT ABC",
    initials: "PA",
    website: "ptabc.com",
    progress: "90%",
    stage: "Review",
    targetDate: "15 Agu 2026",
    lastUpdate: "10 Agu 2026",
    status: "On Track",
  },
  {
    id: 4,
    name: "Toko Makmur",
    initials: "TM",
    website: "tokomakmur.com",
    progress: "30%",
    stage: "Development",
    targetDate: "30 Agu 2026",
    lastUpdate: "08 Agu 2026",
    status: "Delay",
  },
  {
    id: 5,
    name: "Studio Utama",
    initials: "SU",
    website: "studioutama.com",
    progress: "60%",
    stage: "Content",
    targetDate: "22 Agu 2026",
    lastUpdate: "07 Agu 2026",
    status: "On Track",
  },
]);

const filteredProjects = computed(() => {
  const keyword = search.value.toLowerCase();

  if (!keyword) return projects.value;

  return projects.value.filter((project) => {
    return (
      project.name.toLowerCase().includes(keyword) ||
      project.website.toLowerCase().includes(keyword)
    );
  });
});

const openDetail = (project) => {
  console.log("cek");
  navigateTo(`/admin/development/${project.id}`);
};
</script>
