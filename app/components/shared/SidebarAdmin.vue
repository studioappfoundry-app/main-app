<template>
  <!-- Overlay untuk mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
    @click="$emit('close-sidebar')"
  />

  <!-- Sidebar Container -->
  <aside
    class="sidebar-app fixed inset-y-0 left-0 z-40 w-64 transform bg-background border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col"
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static',
      isCollapsed ? 'md:w-20' : 'md:w-64',
    ]"
  >
    <!-- Logo -->
    <div
      class="flex items-center gap-2 py-5 shrink-0 overflow-hidden"
      :class="isCollapsed ? 'md:justify-center md:px-0 px-6' : 'px-6'"
    >
      <div class="w-9 h-9 flex items-center justify-center shrink-0">
        <Iconography :box-height="36" :box-width="36">
          <LogoIcon />
        </Iconography>
      </div>
      <div :class="isCollapsed ? 'md:hidden' : ''">
        <Iconography :box-height="36" :box-width="130">
          <LogoText :color="isDark ? '#fff' : '#000'" />
        </Iconography>
      </div>
    </div>

    <!-- Menu Per Group -->
    <nav
      class="flex-1 overflow-y-auto py-4 space-y-6"
      :class="isCollapsed ? 'md:px-2 px-3' : 'px-3'"
    >
      <div v-for="group in menuGroups" :key="group.title">
        <p
          class="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap"
          :class="isCollapsed ? 'md:hidden' : ''"
        >
          {{ group.title }}
        </p>
        <div class="space-y-1">
          <NuxtLink
            v-for="item in group.items"
            :key="item.key"
            :to="item.to"
            custom
            v-slot="{ navigate }"
          >
            <a
              @click="
                (e) => {
                  navigate(e);
                  handleMenuClick();
                }
              "
              :title="isCollapsed ? item.label : ''"
              class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors cursor-pointer"
              :class="[
                activeTab === item.key
                  ? 'font-bold text-primary bg-primary-soft'
                  : 'font-medium muted hover:bg-primary-soft hover:text-foreground',
                isCollapsed ? 'md:justify-center md:px-0' : '',
              ]"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 shrink-0"
                :class="
                  activeTab === item.key
                    ? 'font-bold text-primary'
                    : 'text-muted group-hover:text-foreground'
                "
              />
              <span :class="isCollapsed ? 'md:hidden' : ''">{{
                item.label
              }}</span>
              <span
                v-if="activeTab === item.key && !isCollapsed"
                class="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
              />
            </a>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </aside>
</template>
<script setup>
import {
  LayoutDashboard,
  Code2,
  TrendingUp,
  Wrench,
  FileText,
  CreditCard,
  User,
  Headphones,
  Users,
} from "~/utils/icons";

const props = defineProps({
  activeTab: {
    type: String,
    default: "dashboard",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-sidebar"]);
const { isDark } = useDarkMode();

const menuGroups = [
  {
    title: "Utama",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/admin/",
      },
    ],
  },
  {
    title: "Manajemen",
    items: [
      {
        key: "client",
        label: "Client",
        icon: Users,
        to: "/admin/client/",
      },
      {
        key: "development",
        label: "Development",
        icon: Code2,
        to: "/admin/development/",
      },
      {
        key: "seo",
        label: "SEO & GEO",
        icon: TrendingUp,
        to: "/admin/seo/",
      },
      {
        key: "maintenance",
        label: "Maintenance",
        icon: Wrench,
        to: "/admin/maintenance/",
      },
      {
        key: "support",
        label: "Support",
        icon: Headphones,
        to: "/admin/support/",
      },
      {
        key: "dokumen",
        label: "Dokumen",
        icon: FileText,
        to: "/admin/document/",
      },
    ],
  },
  {
    title: "Keuangan",
    items: [
      {
        key: "billing",
        label: "Billing",
        icon: CreditCard,
        to: "/admin/billing/",
      },
    ],
  },
  {
    title: "Akun",
    items: [
      {
        key: "profil",
        label: "Profil",
        icon: User,
        to: "/admin/profil",
      },
    ],
  },
];

const handleMenuClick = () => {
  emit("close-sidebar");
};
</script>
<style scoped>
aside.sidebar-app nav::-webkit-scrollbar {
  width: 6px;
}
aside.sidebar-app nav::-webkit-scrollbar-track {
  background: transparent;
}
aside.sidebar-app nav::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}
aside.sidebar-app nav::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}
</style>
