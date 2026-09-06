<template>
  <!-- Overlay untuk mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
    @click="$emit('close-sidebar')"
  />

  <!-- Sidebar Container -->
  <aside
    class="sidebar-app fixed inset-y-0 left-0 z-40 w-64 transform bg-background border-r border-gray-200 transition-[width,transform] duration-300 ease-in-out flex flex-col overflow-hidden"
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static',
      isCollapsed ? 'md:w-15' : 'md:w-64',
    ]"
  >
    <!-- 1. Header / Logo (Fixed at top) -->
    <div
      class="relative flex items-center h-[76px] shrink-0 overflow-hidden px-4"
    >
      <!-- Logo Area -->
      <div
        class="group/logo flex items-center shrink-0 cursor-pointer"
        @click="toggleCollapse"
      >
        <!-- Logo Icon -->
        <div class="w-9 h-9 flex items-center justify-center shrink-0">
          <!-- Logo SaaS -->
          <div
            class="absolute flex items-center justify-center transition-all duration-200 ease-out"
            :class="
              isCollapsed
                ? 'opacity-100 scale-100 group-hover/logo:opacity-0 group-hover/logo:scale-90'
                : 'opacity-100 scale-100'
            "
          >
            <Iconography :box-height="24" :box-width="24">
              <LogoIcon />
            </Iconography>
          </div>

          <!-- Collapse Icon -->
          <div
            class="absolute flex items-center justify-center transition-all duration-200 ease-out"
            :class="
              isCollapsed
                ? 'opacity-0 scale-90 group-hover/logo:opacity-100 group-hover/logo:scale-100'
                : 'opacity-0 scale-90'
            "
          >
            <PanelLeft class="w-5 h-5 text-muted" />
          </div>
        </div>

        <!-- Logo Text -->
        <div
          class="ml-1 overflow-hidden transition-all duration-300 ease-in-out"
          :class="
            isCollapsed
              ? 'md:max-w-0 md:opacity-0 md:-translate-x-2 md:ml-0'
              : 'max-w-[130px] opacity-100 translate-x-0'
          "
        >
          <Iconography :box-height="36" :box-width="130">
            <LogoText :color="isDark ? '#fff' : '#000'" />
          </Iconography>
        </div>
      </div>

      <!-- Collapse Button ketika Expanded -->
      <button
        v-if="!isCollapsed"
        type="button"
        class="ml-auto flex w-8 h-8 items-center justify-center rounded-lg text-muted hover:bg-primary-soft hover:text-foreground transition-colors shrink-0"
        title="Ciutkan sidebar"
        @click="toggleCollapse"
      >
        <PanelLeft class="w-5 h-5" />
      </button>
    </div>

    <!-- 2. Menu Per Group (Area ini saja yang bisa di-scroll) -->
    <nav
      class="flex-1 overflow-y-auto py-4 space-y-6 min-h-0"
      :class="isCollapsed ? 'md:px-2 px-3' : 'px-3'"
    >
      <div v-for="group in menuGroups" :key="group.title">
        <!-- Group Title -->
        <p
          class="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
          :class="
            isCollapsed
              ? 'md:max-h-0 md:opacity-0 md:pb-0'
              : 'max-h-6 opacity-100'
          "
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
              :title="isCollapsed ? item.label : ''"
              class="group flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 cursor-pointer overflow-hidden"
              :class="[
                activeTab === item.key
                  ? 'font-bold text-primary bg-primary-soft'
                  : 'font-medium muted hover:bg-primary-soft hover:text-foreground',
                isCollapsed ? 'md:px-3' : 'px-3',
              ]"
              @click="
                (e) => {
                  navigate(e);
                  handleMenuClick();
                }
              "
            >
              <!-- ICON -->
              <span class="flex items-center justify-center w-5 h-5 shrink-0">
                <component
                  :is="item.icon"
                  class="w-5 h-5 shrink-0 transition-colors duration-200"
                  :class="
                    activeTab === item.key
                      ? 'font-bold text-primary'
                      : 'text-muted group-hover:text-foreground'
                  "
                />
              </span>
              <!-- LABEL AREA -->
              <span
                class="ml-3 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out"
                :class="
                  isCollapsed
                    ? 'md:ml-0 md:max-w-0 md:opacity-0'
                    : 'ml-3 max-w-[180px] opacity-100'
                "
              >
                {{ item.label }}
              </span>
              <!-- ACTIVE INDICATOR -->
              <span
                v-if="activeTab === item.key"
                class="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0 transition-opacity duration-200"
                :class="isCollapsed ? 'md:opacity-0' : 'opacity-100'"
              />
            </a>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- 3. Bantuan (Terunci di bawah / Fixed Bottom tanpa ikut ter-scroll) -->
    <div
      class="shrink-0 border-t border-gray-200 bg-background py-3"
      :class="isCollapsed ? 'md:px-2 px-3' : 'px-3'"
    >
      <NuxtLink
        title="Bantuan"
        class="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors overflow-hidden"
        :class="[
          activeTab === 'bantuan'
            ? 'font-bold text-primary bg-primary-soft'
            : 'font-medium muted hover:bg-primary-soft hover:text-foreground',
        ]"
        to="/client/bantuan/"
        @click="handleMenuClick"
      >
        <Headphones
          class="w-5 h-5 shrink-0"
          :class="
            activeTab === 'bantuan'
              ? 'font-bold text-primary'
              : 'text-muted group-hover:text-foreground'
          "
        />

        <!-- Label Bantuan -->
        <span
          class="whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
          :class="
            isCollapsed
              ? 'md:max-w-0 md:opacity-0 md:translate-x-[-8px]'
              : 'max-w-[180px] opacity-100 translate-x-0'
          "
        >
          Bantuan
        </span>

        <!-- Active Indicator -->
        <span
          v-if="activeTab === 'bantuan'"
          class="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0 transition-all duration-300"
          :class="isCollapsed ? 'md:opacity-0' : 'opacity-100'"
        />
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
import {
  LayoutDashboard,
  Globe,
  TrendingUp,
  Wrench,
  FileText,
  CreditCard,
  User,
  Headphones,
  Files,
  PanelLeft,
  Handshake,
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

const emit = defineEmits(["close-sidebar", "toggle-collapse"]);

const { isDark } = useDarkMode();

const menuGroups = [
  {
    title: "Utama",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/client/",
      },
      {
        key: "website",
        label: "Website Saya",
        icon: Globe,
        to: "/client/website",
      },
    ],
  },

  {
    title: "Layanan",
    items: [
      {
        key: "seo",
        label: "SEO & GEO",
        icon: TrendingUp,
        to: "/client/seo/",
      },
      {
        key: "maintenance",
        label: "Maintenance",
        icon: Wrench,
        to: "/client/maintenance/",
      },
    ],
  },

  {
    title: "Transaksi",
    items: [
      {
        key: "tagihan",
        label: "Tagihan",
        icon: FileText,
        to: "/client/tagihan",
      },
      {
        key: "pembayaran",
        label: "Pembayaran",
        icon: CreditCard,
        to: "/client/pembayaran",
      },
    ],
  },

  {
    title: "Akun",
    items: [
      {
        key: "dokumen",
        label: "Dokumen dan Kontrak",
        icon: Files,
        to: "/client/dokumen",
      },
      {
        key: "affiliate",
        label: "Affiliasi",
        icon: Handshake,
        to: "/client/affiliate",
      },
      {
        key: "profil",
        label: "Profil",
        icon: User,
        to: "/client/profil",
      },
    ],
  },
];

const handleMenuClick = () => {
  emit("close-sidebar");
};

const toggleCollapse = () => {
  emit("toggle-collapse");
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
