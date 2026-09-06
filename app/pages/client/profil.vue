<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <Breadcumb :items="breadcrumbItems" />
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-foreground tracking-tight">
        Profil Saya
      </h1>
      <p class="text-sm text-secondary mt-1">
        Informasi profil dan bisnis Anda.
      </p>
    </div>

    <!-- Main Grid Layout (3 Columns) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Card 1: Informasi Profil (4 Columns) -->
      <div
        class="lg:col-span-4 bg-background border border-border rounded-xl p-6 shadow-app space-y-4"
      >
        <h2 class="font-bold text-foreground text-base m-0">
          Informasi Profil
        </h2>
        <p class="text-xs text-secondary mb-6">Data pribadi untuk akun Anda</p>
        <!-- Field: Nama Lengkap -->
        <Input
          type="text"
          label="Nama Lengkap"
          placeholder="e.g. Website refresh"
          max-width="100vw"
        />

        <!-- Field: Email -->
        <Input
          type="email"
          label="Alamat Email"
          placeholder="you@company.com"
          max-width="100vw"
        />

        <!-- Field: No. WhatsApp -->
        <Input
          type="number"
          label="Nomor Whatsapp"
          placeholder="e.g. 08262626262"
          max-width="100vw"
        />
      </div>

      <!-- Card 2: Informasi Bisnis (5 Columns) -->
      <div
        class="lg:col-span-5 bg-background border border-border rounded-xl p-6 shadow-app space-y-4"
      >
        <h2 class="font-bold text-foreground text-base m-0">
          Informasi Bisnis
        </h2>
        <p class="text-xs text-secondary mb-6">Data profil bisnis Anda</p>
        <!-- Field: Nama Bisnis -->
        <Input
          type="text"
          label="Nama Bisnis"
          placeholder="e.g. Website refresh"
          max-width="100vw"
        />

        <!-- Field: Alamat -->
        <Input type="textarea" label="Alamat" max-width="100vw" />

        <!-- Field: Industri -->
        <Input
          type="text"
          label="Tipe Bisnis"
          placeholder="e.g. Website refresh"
          max-width="100vw"
        />
      </div>

      <!-- Card 3: Foto Profil (3 Columns) -->
      <div
        class="lg:col-span-3 bg-background border border-border rounded-xl p-6 shadow-app flex flex-col items-center justify-center text-center"
      >
        <h2 class="font-bold text-foreground text-base mb-4">Foto Profil</h2>

        <!-- Avatar Container -->
        <div
          class="w-32 h-32 rounded-full overflow-hidden mb-4 bg-surface-soft border border-border flex items-center justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300&auto=format&fit=crop"
            alt="Foto Profil"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Notice Text -->
        <p class="text-[11px] text-muted mb-4">PNG, JPG maks. 2MB</p>

        <!-- Change Photo Button -->
        <Button variant="soft-primary"> Ubah Foto </Button>
      </div>
    </div>
    <div class="flex w-full justify-center mt-4">
      <Button variant="solid" class="w-full">Simpan Perubahan</Button>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "client",
  activeTab: "profil",
  title: "Profil",
});
const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/client/",
  },
  {
    label: "Profil",
  },
];
</script>
