<script setup>
const route = useRoute();

// Ambil active tab dari definePageMeta
const activeTab = computed(() => route.meta?.activeTab);
const topbarTitle = computed(() => route.meta?.title);
// State untuk sidebar mobile (drawer)
const isSidebarOpen = ref(false);

// State untuk sidebar tablet/desktop (collapse icon only)
const isSidebarCollapsed = ref(false);

useHead({
  title: "Dashboard Admin ── Appfoundry",
});
</script>

<template>
  <div class="flex min-h-screen items-stretch bg-card">
    <!-- Sidebar Component -->
    <SidebarAdmin
      :active-tab="activeTab"
      :is-open="isSidebarOpen"
      :is-collapsed="isSidebarCollapsed"
      @close-sidebar="isSidebarOpen = false"
    />

    <!-- Main Section -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Topbar Component -->
      <TopbarClient
        :title="topbarTitle"
        :is-admin="true"
        :is-collapsed="isSidebarCollapsed"
        @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
        @toggle-collapse="isSidebarCollapsed = !isSidebarCollapsed"
      />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6">
        <div class="mx-auto mt-10">
          <!-- Slot untuk konten dari pages/dashboard.vue dll -->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
