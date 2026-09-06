<template>
  <Modal v-model="isModalOpen">
    <!-- Header -->
    <div class="flex flex-col items-center mb-8">
      <Iconography :box-height="40" :box-width="80">
        <svg
          viewBox="0 0 74 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Google"
        >
          <path
            fill="#4285F4"
            d="M21.35 12.24c0-.75-.07-1.47-.2-2.16H12v4.08h5.23a4.47 4.47 0 0 1-1.94 2.93v2.7h3.14c1.84-1.7 2.92-4.2 2.92-7.55Z"
          />
          <path
            fill="#34A853"
            d="M12 21.73c2.62 0 4.82-.87 6.43-2.36l-3.14-2.43c-.87.58-1.98.92-3.29.92-2.53 0-4.67-1.7-5.44-4H3.32v2.52A9.72 9.72 0 0 0 12 21.73Z"
          />
          <path
            fill="#FBBC05"
            d="M6.56 13.86A5.84 5.84 0 0 1 6.25 12c0-.64.11-1.26.31-1.86V7.62H3.32A9.72 9.72 0 0 0 2.28 12c0 1.57.38 3.06 1.04 4.38l3.24-2.52Z"
          />
          <path
            fill="#EA4335"
            d="M12 6.14c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.81 3.21 14.61 2.27 12 2.27a9.72 9.72 0 0 0-8.68 5.35l3.24 2.52c.77-2.3 2.91-4 5.44-4Z"
          />

          <!-- o -->
          <path
            fill="#EA4335"
            d="M29.25 8.5c-3.02 0-5.5 2.25-5.5 5.5s2.48 5.5 5.5 5.5 5.5-2.25 5.5-5.5-2.48-5.5-5.5-5.5Zm0 8.85c-1.65 0-2.82-1.3-2.82-3.35s1.17-3.35 2.82-3.35 2.82 1.3 2.82 3.35-1.17 3.35-2.82 3.35Z"
          />

          <!-- o -->
          <path
            fill="#FBBC05"
            d="M41.25 8.5c-3.02 0-5.5 2.25-5.5 5.5s2.48 5.5 5.5 5.5 5.5-2.25 5.5-5.5-2.48-5.5-5.5-5.5Zm0 8.85c-1.65 0-2.82-1.3-2.82-3.35s1.17-3.35 2.82-3.35 2.82 1.3 2.82 3.35-1.17 3.35-2.82 3.35Z"
          />

          <!-- g -->
          <path
            fill="#4285F4"
            d="M53.2 8.82v1.02h-.1c-.64-.77-1.52-1.34-2.84-1.34-2.64 0-5.06 2.32-5.06 5.5 0 3.15 2.42 5.5 5.06 5.5 1.32 0 2.2-.57 2.84-1.35h.1v.85c0 2.26-1.2 3.47-3.14 3.47-1.58 0-2.56-1.13-2.96-2.08l-2.34.97c.67 1.62 2.45 3.61 5.3 3.61 3.08 0 5.69-1.81 5.69-6.23V8.82H53.2Zm-2.7 8.53c-1.65 0-2.85-1.4-2.85-3.35 0-1.97 1.2-3.35 2.85-3.35 1.62 0 2.76 1.38 2.76 3.35 0 1.95-1.14 3.35-2.76 3.35Z"
          />

          <!-- l -->
          <path fill="#34A853" d="M58.25 2.75h2.62v16.42h-2.62V2.75Z" />

          <!-- e -->
          <path
            fill="#EA4335"
            d="M67.1 8.5c-3.08 0-5.36 2.38-5.36 5.5 0 3.3 2.5 5.5 5.65 5.5 2.54 0 4-.95 4.74-1.5l-2.04-1.36c-.54.4-1.28.67-2.7.67-1.4 0-2.4-.63-3.04-1.85l7.35-3.04-.28-.7C70.9 10.4 69.4 8.5 67.1 8.5Zm-2.7 3.7c.07-.88.88-2.1 2.72-2.1 1.43 0 2.24.7 2.58 1.7l-5.3 2.2Z"
          />
        </svg>
      </Iconography>
      <h1
        class="text-lg md:text-xl font-medium text-[var(--foreground)] transition-colors duration-300"
      >
        Pilih akun
      </h1>
    </div>

    <!-- List Akun -->
    <div class="border-bottom overflow-hidden transition-colors duration-300">
      <button
        v-for="(account, index) in accounts"
        :key="account.email"
        @click="selectAccount(account)"
        class="w-full flex items-center gap-4 p-4 py-2 text-left hover:bg-[var(--background)] transition-colors duration-200"
        :class="{ 'border-bottom': index !== accounts.length - 1 }"
      >
        <!-- Penggunaan Komponen Avatar dengan warna dari Parent -->
        <Avatar
          :src="account.src"
          :alt="account.name"
          size="lg"
          :class="account.bgColor"
        />
        <div class="flex-1 min-w-0">
          <p
            class="font-medium text-[var(--foreground)] truncate transition-colors duration-300"
          >
            {{ account.name }}
          </p>
          <p
            class="text-sm text-[var(--muted)] truncate transition-colors duration-300"
          >
            {{ account.email }}
          </p>
        </div>
      </button>

      <!-- Gunakan Akun Lain -->
      <button
        @click="useAnotherAccount"
        class="w-full flex items-center gap-4 p-4 text-left hover:bg-[var(--background)] transition-colors duration-200 border-bottom"
      >
        <div
          class="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--background)] text-[var(--muted)] border border-border transition-colors duration-300 flex-shrink-0"
        >
          <UserPlus class="w-6 h-6" />
        </div>
        <div class="flex-1 min-w-0">
          <p
            class="font-medium text-[var(--foreground)] transition-colors duration-300"
          >
            Gunakan akun lain
          </p>
        </div>
      </button>
    </div>
  </Modal>
  <LazyOrbHeader />
  <div
    class="min-h-screen text-foreground flex flex-col items-center justify-center relative px-4 transition-colors duration-300"
  >
    <header>
      <!-- Tombol Kembali ke Beranda (Pojok Kiri Atas) -->
      <NuxtLink
        to="/"
        class="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200 group"
      >
        <MoveLeft
          class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
        />
        <span>Beranda</span>
      </NuxtLink>
      <button
        @click="isDark = !isDark"
        class="absolute top-6 right-6 md:top-8 md:right-8 flex items-center justify-center text-muted hover-text focus:outline-none p-1 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        <Sun v-if="isDark" :size="20" />
        <Moon v-else :size="20" />
      </button>
    </header>
    <!-- Konten Utama Login -->
    <div class="w-full flex flex-col items-center gap-5">
      <div class="w-full flex items-center justify-center gap-5 md:px-20">
        <!-- Login -->
        <div
          class="w-full md:w-1/3 max-w-sm md:max-w-none flex flex-col items-center text-center"
        >
          <!-- Logo -->
          <div
            class="w-15 h-15 flex items-center justify-center shrink-0 mb-5 md:hidden"
          >
            <LogoIcon />
          </div>
          <h2
            class="text-foreground text-4xl font-bold tracking-tighter leading-[0.9] transition-colors mb-5 hidden md:block"
          >
            Masuk
          </h2>

          <!-- Judul -->
          <h1 class="text-base text-muted mb-8 transition-colors duration-300">
            Masuk Ke Halaman Akun Anda.
          </h1>

          <!-- Tombol Login Google -->
          <button
            @click="handleGoogleLogin"
            class="w-full flex items-center justify-center gap-3 bg-card border border-border text-foreground py-3.5 px-4 rounded-xl transition-all duration-300 hover:bg-[var(--background)] hover:border-[var(--foreground)] hover:shadow-lg"
          >
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>

            <span>Masuk menggunakan akun Google</span>
          </button>
        </div>

        <!-- Preview / Image -->
        <div
          class="hidden md:block w-1/2 aspect-square max-w-[400px] rounded-xl shadow-2xl bg-white mx-10 overflow-hidden shrink-0"
        >
          <img src="/poster.jpg" alt="" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Ketentuan dan Kebijakan -->
      <p
        class="mt-5 text-sm text-muted leading-relaxed max-w-xs text-center transition-colors duration-300"
      >
        Dengan melanjutkan ke dashboard, Anda menyetujui
        <NuxtLink
          to="/termsandpolicy"
          class="underline text-primary transition-colors duration-200"
        >
          Ketentuan dan Kebijakan
        </NuxtLink>
        Appfoundry.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MoveLeft, Sun, Moon, UserPlus } from "~/utils/icons";

const { isDark } = useDarkMode();
const isModalOpen = ref(false);

// Fungsi dummy untuk handle login
const handleGoogleLogin = () => {
  isModalOpen.value = true;
  // Logika autentikasi google di sini
};
const accounts = [
  {
    name: "Gian Prambudi",
    email: "gian.prambudi@appfoundry.com",
    src: "",
    bgColor: "bg-blue-100 text-blue-600", // Warna via Tailwind class
    type: "admin",
  },
  {
    name: "Endra Wijaya",
    email: "endra.wijaya@gmail.com",
    src: "",
    bgColor: "bg-purple-100 text-purple-600",
    type: "user",
  },
  {
    name: "User Tamu",
    email: "tamu@appfoundry.com",
    src: "",
    bgColor: "bg-orange-100 text-orange-600",
    type: "user",
  },
];

const selectAccount = (account) => {
  if (account.type === "admin") {
    navigateTo("/admin/");
  } else {
    navigateTo("/client/");
  }
};

useHead({
  title: "Masuk ke Dashboard ── Appfoundry",
});
</script>
