<template>
  <nav
    class="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[var(--background)]/50 border-b border-border z-9999 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo Web (Kiri) -->
        <div class="flex-shrink-0">
          <NuxtLink href="/" class="flex gap-2">
            <Iconography :boxWidth="32" :boxHeight="32">
              <LogoIcon />
            </Iconography>
            <Iconography :boxWidth="144" :boxHeight="40">
              <LogoText :color="isDark ? '#ffffff' : '#000000'" />
            </Iconography>
          </NuxtLink>
        </div>

        <!-- Menu Desktop (Tengah/Kanan) -->
        <div class="hidden md:flex items-center md:gap-5 lg:gap-7 xl:gap-10">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.href"
            :class="[
              'relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-[var(--primary)] after:transition-transform after:duration-300',
              props.menu === link.name
                ? 'text-primary after:scale-x-100'
                : 'text-muted after:scale-x-0',
            ]"
            class="hover-text text-sm font-medium transition-colors"
          >
            {{ link.name }}
          </NuxtLink>

          <!-- Tombol Get Started -->
          <NuxtLink to="/signin">
            <Button variant="solid" class="hover-btn">
              <div class="flex items-center gap-2">
                Mulai Sekarang
                <MoveRight :size="16" />
              </div>
            </Button>
          </NuxtLink>
          <!-- Tombol Dark Mode Toggle -->
          <button
            @click="isDark = !isDark"
            class="flex items-center justify-center text-muted hover-text focus:outline-none p-1 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            <Sun v-if="isDark" :size="20" />
            <Moon v-else :size="20" />
          </button>
        </div>

        <!-- Tombol Hamburger Mobile (Kanan) -->
        <div class="md:hidden flex items-center gap-2">
          <button
            @click="isDark = !isDark"
            class="text-muted hover-text focus:outline-none rounded-md p-2 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            <Sun v-if="isDark" :size="22" />
            <Moon v-else :size="22" />
          </button>

          <button
            @click="toggleMenu"
            class="text-muted hover-text focus:outline-none focus:ring-2 focus:ring-[var(--border)] rounded-md p-2 transition-colors"
            aria-label="Toggle Menu"
          >
            <component :is="isMobileMenuOpen ? X : Menu" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Dropdown Mobile -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden bg-[var(--background)] border-t border-border transition-colors duration-300"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.href"
          @click="closeMenu"
          :class="[
            'block px-3 py-2 text-base font-medium text-muted hover-text hover:bg-[var(--primary-soft)] rounded-md transition-colors',
            props.menu === link.name ? 'text-primary font-bold' : 'text-muted',
          ]"
        >
          {{ link.name }}
        </NuxtLink>

        <!-- Tombol Get Started di Mobile -->
        <NuxtLink
          to="/signin"
          @click="closeMenu"
          class="block w-full text-center mt-2 bg-[var(--foreground)] text-[var(--background)] px-3 py-2 rounded-md text-base font-medium hover-btn transition-colors flex items-center justify-center gap-2"
        >
          Mulai Sekarang
          <MoveRight :size="18" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { Menu, X, MoveRight, Moon, Sun } from "~/utils/icons";

const props = defineProps({
  menu: { type: String, default: "" },
});

const isMobileMenuOpen = ref(false);
const { isDark } = useDarkMode();

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Harga", href: "/pricing" },
  { name: "Ketentuan & Kebijakan", href: "/termsandpolicy" },
];
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
.hover-text:hover {
  color: var(--primary);
}
.hover-btn:hover {
  background-color: var(--primary);
  color: #fff;
}
</style>
