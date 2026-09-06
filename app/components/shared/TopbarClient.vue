<template>
  <Dialog
    v-model="showDialog"
    variant="warning"
    title="Keluar dari akun?"
    message="Anda perlu masuk kembali untuk mengakses akun Anda."
    confirmText="Keluar"
    @confirm="handleLogout"
  />
  <header
    class="fixed top-0 inset-x-0 backdrop-blur-md bg-[var(--background)]/50 z-10 transition-all duration-300"
    :class="isCollapsed ? 'md:ml-15' : 'md:ml-64'"
  >
    <div class="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
      <!-- Left Section -->
      <div class="flex items-center gap-3">
        <!-- Hamburger Button (Mobile only) -->
        <button
          class="md:hidden p-2 rounded-md transition-colors"
          @click="emit('toggle-sidebar')"
          aria-label="Open Sidebar"
        >
          <Menu class="w-6 h-6 text-muted" />
        </button>

        <div class="md:pl-6">
          <h1 class="text-lg text-foreground font-semibold leading-none">
            {{ title }}
          </h1>
          <p
            class="text-xs text-muted mt-1 hidden sm:block whitespace-nowrap text-ellipsis overflow-hidden"
          >
            Kelola website dan layanan Anda
          </p>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          @click="isDark = !isDark"
          class="flex items-center justify-center text-muted hover-text focus:outline-none p-1 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>
        <!-- User Profile -->

        <DropdownMenu :top-menu="5" menuMaxHeight="80vh">
          <template #trigger>
            <div class="flex items-center gap-2 pl-2 sm:pl-3">
              <Avatar
                src=""
                :alt="siteInfo.name"
                class="bg-gradient-to-br from-orange-400 to-orange-600"
              />
              <div class="hidden sm:block">
                <p
                  class="text-sm text-foreground font-medium leading-none text-gray-800"
                >
                  {{ siteInfo.name }}
                </p>
                <p class="text-xs text-muted mt-1">
                  {{ siteInfo.domain }}
                </p>
              </div>
              <ChevronDown class="hidden sm:block w-4 h-4 text-gray-400" />
            </div>
          </template>
          <template #items>
            <NuxtLink
              :to="linkProfil"
              class="px-2 py-3 flex gap-3 text-muted hover:text-foreground hover:bg-primary-soft border-bottom"
            >
              <User class="w-5 h-5" />
              <p>Profile</p>
            </NuxtLink>
            <button
              class="p-2 py-3 flex gap-3 text-muted hover:text-foreground hover:bg-primary-soft"
              @click="showDialog = true"
            >
              <LogOut class="w-5 h-5" />
              <p>Keluar</p>
            </button>
          </template>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Menu, ChevronDown, User, LogOut, Sun, Moon } from "~/utils/icons";

const props = defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-sidebar", "toggle-collapse"]);
const { isDark } = useDarkMode();

const showDialog = ref(false);
const siteInfo = ref({
  name: "Kedai Kopi Senja",
  domain: "kedaisenja.com",
  status: "Online",
});
const linkProfil = computed(() => {
  return "/client/profil";
});
const handleLogout = () => {
  return navigateTo("/");
};
</script>
