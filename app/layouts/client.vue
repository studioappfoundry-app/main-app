<script setup>
import { ArrowRight, Globe, Headphones, TrendingUp } from "~/utils/icons";
import { ref, onMounted } from "vue";

const route = useRoute();

const isModalOpen = ref(false);

const isNew = ref(false);
const isSuccess = ref(false);

const activeTab = computed(() => route.meta?.activeTab);
const topbarTitle = computed(() => route.meta?.title);
const isSidebarOpen = ref(false);

const isSidebarCollapsed = ref(false);

const businessTypes = [
  {
    label: "Kuliner / F&B",
    value: "kuliner-fnb",
  },
  {
    label: "Retail / Toko Online",
    value: "retail-toko-online",
  },
  {
    label: "Jasa / Konsultan",
    value: "jasa-konsultan",
  },
  {
    label: "Kesehatan / Klinik",
    value: "kesehatan-klinik",
  },
  {
    label: "Pendidikan",
    value: "pendidikan",
  },
  {
    label: "Lainnya",
    value: "lainnya",
  },
];

const form = ref({
  bisnis: "",
  type: "",
  wa: null,
  alamat: "",
});

useHead({
  title: "Dashboard Client ── Appfoundry",
});

onMounted(async () => {
  if (isNew.value) {
    isModalOpen.value = true;
  }
});
</script>

<template>
  <Modal v-model="isModalOpen" :un-close="false">
    <section v-if="!isSuccess" class="w-full">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          Lengkapi Profil Bisnis
        </h1>

        <p class="mt-2 text-sm leading-relaxed text-secondary">
          Mari kenali bisnis Anda agar kami bisa memberikan layanan terbaik.
        </p>
      </div>

      <!-- Form -->
      <div class="space-y-4">
        <Input
          v-model="form.bisnis"
          type="text"
          label="Nama Bisnis"
          placeholder="Contoh: Kedai Kopi Senja"
          max-width="100vw"
        />

        <Select
          v-model="form.type"
          label="Tipe Bisnis"
          :options="businessTypes"
          placeholder="Pilih tipe bisnis"
          searchable
          max-width="100vw"
        />

        <Input
          v-model="form.wa"
          type="number"
          label="Nomor WhatsApp"
          placeholder="Contoh: 08262626262"
          max-width="100vw"
        />

        <Input
          v-model="form.alamat"
          type="textarea"
          label="Alamat"
          placeholder="Contoh: Jl. Kenangan No. 123"
          max-width="100vw"
        />
      </div>

      <!-- Action -->
      <div class="mt-6">
        <Button
          variant="solid"
          class="w-full"
          :disabled="!form.bisnis || !form.type || !form.wa || !form.alamat"
          @click="isSuccess = true"
        >
          Simpan & Lanjutkan
        </Button>
      </div>
    </section>
    <section v-else class="w-full">
      <!-- Animation -->
      <div class="mx-auto mb-3 h-36 w-36 overflow-hidden">
        <LottieAnim
          animation="/anim/success.json"
          :loop="false"
          class="h-[150%] w-[150%] -translate-x-[15%] -translate-y-[15%]"
        />
      </div>

      <!-- Heading -->
      <div class="mx-auto max-w-xl text-center">
        <h1
          class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Selamat Datang di Appfoundry!
        </h1>

        <p
          class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-secondary sm:text-base"
        >
          Akun Anda sudah aktif. Sekarang Anda bisa mulai mengelola website dan
          layanan bisnis Anda dalam satu dashboard.
        </p>
      </div>

      <!-- Features -->
      <div class="mt-6 border-t border-border pt-5">
        <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <!-- Feature 1 -->
          <div
            class="flex min-w-0 items-start gap-3 rounded-xl bg-surface/50 p-3.5"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success"
            >
              <Globe :size="17" />
            </div>

            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-foreground">
                Kelola Website
              </h3>

              <p class="mt-1 text-xs leading-relaxed text-secondary">
                Kelola website untuk mendukung bisnis Anda.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div
            class="flex min-w-0 items-start gap-3 rounded-xl bg-surface/50 p-3.5"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success"
            >
              <TrendingUp :size="17" />
            </div>

            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-foreground">SEO & GEO</h3>

              <p class="mt-1 text-xs leading-relaxed text-secondary">
                Pantau dan tingkatkan visibilitas website Anda.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div
            class="flex min-w-0 items-start gap-3 rounded-xl bg-surface/50 p-3.5"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success"
            >
              <Headphones :size="17" />
            </div>

            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-foreground">
                Dukungan 24 Jam
              </h3>

              <p class="mt-1 text-xs leading-relaxed text-secondary">
                Dapatkan bantuan kapan pun Anda membutuhkannya.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-5">
        <Button
          variant="solid"
          size="lg"
          class="w-full"
          @click="isModalOpen = false"
        >
          <span class="flex items-center justify-center gap-2">
            Mulai Sekarang
            <ArrowRight class="h-4 w-4" />
          </span>
        </Button>
      </div>
    </section>
  </Modal>
  <div class="flex h-screen overflow-hidden items-stretch bg-card">
    <!-- Sidebar Component -->
    <SidebarClient
      :active-tab="activeTab"
      :is-open="isSidebarOpen"
      :is-collapsed="isSidebarCollapsed"
      @toggle-collapse="isSidebarCollapsed = !isSidebarCollapsed"
      @close-sidebar="isSidebarOpen = false"
    />

    <!-- Main Section -->
    <div class="flex flex-1 flex-col overflow-y-auto">
      <!-- Topbar Component -->
      <TopbarClient
        :title="topbarTitle"
        :is-collapsed="isSidebarCollapsed"
        @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      />

      <!-- Page Content -->
      <main class="flex-1 p-4 sm:p-6">
        <div class="mx-auto mt-10">
          <!-- Slot untuk konten dari pages/dashboard.vue dll -->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
