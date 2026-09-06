<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <!-- Breadcrumb -->
    <Breadcumb :items="breadcrumbItems" />
    <div
      class="flex items-center justify-between bg-background p-3 rounded-xl border border-border shadow-app"
    >
      <span class="text-sm font-semibold text-secondary"
        >Pilih Status Data:</span
      >
      <div class="flex gap-2">
        <button
          @click="isData = false"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            isData === false
              ? 'bg-danger-soft text-danger border border-danger/20'
              : 'bg-surface text-secondary hover:bg-background',
          ]"
        >
          Non-Aktif
        </button>
        <button
          @click="isData = true"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            isData === true
              ? 'bg-primary-soft text-primary border border-primary/20'
              : 'bg-surface text-secondary hover:bg-background',
          ]"
        >
          Aktif
        </button>
      </div>
    </div>
    <section v-if="isData">
      <!-- Header Section -->
      <header class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight mb-1">Tagihan</h1>
        <p class="text-secondary text-sm">
          Daftar tagihan dan invoice yang perlu Anda bayarkan.
        </p>
      </header>

      <!-- Summary Banner Card -->
      <div
        class="bg-background border border-border rounded-xl p-6 mb-8 shadow-app flex flex-col md:flex-row items-stretch justify-between gap-6 relative overflow-hidden"
      >
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <!-- Metric 1: Total Belum Dibayar -->
          <div class="space-y-1">
            <p class="text-xs md:text-sm text-secondary font-medium">
              Total Belum Dibayar
            </p>
            <p class="text-2xl md:text-3xl font-bold text-primary">
              Rp 612.500
            </p>
            <p class="text-xs text-secondary">1 tagihan belum dibayar</p>
          </div>

          <!-- Metric 2: Jatuh Tempo Terdekat -->
          <div class="space-y-1 sm:border-l border-border sm:pl-6">
            <p class="text-xs md:text-sm text-secondary font-medium">
              Jatuh Tempo Terdekat
            </p>
            <p class="text-xl md:text-2xl font-bold text-foreground">
              20 Agustus 2026
            </p>
            <p class="text-xs text-secondary">dalam 9 hari</p>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="border-bottom mb-6 hidden md:block">
        <div class="flex gap-8 min-w-max text-sm font-medium">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'pb-3 transition-colors relative',
              activeTab === tab.id
                ? 'text-primary font-semibold'
                : 'text-secondary hover:text-foreground',
            ]"
          >
            {{ tab.label }}

            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
            />
          </button>
        </div>
      </div>
      <div class="md:hidden mb-6">
        <Splide :options="splideOption" aria-label="Filter Tagihan">
          <SplideSlide v-for="tab in tabs" :key="tab.id">
            <button
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-primary text-background'
                  : 'bg-hover text-secondary hover:text-foreground',
              ]"
            >
              {{ tab.label }}
            </button>
          </SplideSlide>
        </Splide>
      </div>
      <!-- Bills List Container -->
      <div
        class="bg-background border border-border rounded-xl shadow-app overflow-hidden mb-8"
      >
        <template v-for="(bill, index) in bills" :key="bill.id">
          <div
            v-show="activeTab === 'semua' || activeTab === bill.category"
            :class="[
              'p-2 py-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors',
              !bill.highlight && 'hover:bg-hover/50',
              bill.highlight && 'bg-warning-soft',
              index !== bills.length - 1 && 'border-bottom',
            ]"
          >
            <!-- Left -->
            <div class="flex items-start md:items-center gap-4">
              <div>
                <h3 class="font-semibold text-foreground text-sm md:text-base">
                  {{ bill.title }}
                </h3>

                <p
                  :class="[
                    'text-xs mt-0.5',
                    bill.descriptionPrimary
                      ? 'text-primary font-medium'
                      : 'text-secondary',
                  ]"
                >
                  {{ bill.description }}
                </p>
              </div>
            </div>

            <!-- Right -->
            <div
              class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 justify-between"
            >
              <!-- Invoice -->
              <div
                class="flex flex-row md:flex-col items-center md:justify-center text-xs gap-2"
              >
                <p class="text-secondary">
                  {{ bill.invoice }}
                </p>
                <p class="block md:hidden text-secondary">|</p>
                <p class="text-secondary">
                  {{ bill.date }}
                </p>
              </div>

              <!-- Price + Status -->
              <div
                class="flex items-center justify-between md:justify-end gap-4 min-w-[120px]"
              >
                <div class="text-right">
                  <p
                    :class="[
                      'text-base md:text-lg font-bold',
                      bill.statusVariant === 'warning'
                        ? 'text-warning'
                        : 'text-foreground',
                    ]"
                  >
                    {{ bill.amount }}
                  </p>
                  <Badge :variant="bill.statusVariant" size="sm">{{
                    bill.status
                  }}</Badge>
                </div>

                <Button v-if="bill.action" variant="soft-primary" size="sm">
                  Bayar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom Info Banner -->
      <div
        class="bg-success-soft border border-success/20 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-xl bg-success-soft flex items-center justify-center shrink-0"
          >
            <Calendar class="w-5 h-5 text-success" />
          </div>
          <div class="flex flex-col gap-1">
            <h4 class="font-bold text-foreground text-sm md:text-base">
              Bagaimana cara pembayaran?
            </h4>
            <p class="text-xs text-secondary mt-0.5 max-w-xl">
              Anda dapat melakukan pembayaran dengan mudah melalui transfer bank
              atau QRIS. Setelah pembayaran, sistem akan otomatis mengonfirmasi.
            </p>
          </div>
        </div>

        <Button variant="soft-primary" size="sm">
          <NuxtLink to="/client/bantuan/"> Lihat Cara Pembayaran </NuxtLink>
        </Button>
      </div>
    </section>
    <section v-else>
      <div class="max-w-2xl mx-auto mt-4 mb-8">
        <div
          class="bg-background border border-border rounded-2xl p-8 md:p-12 shadow-app text-center space-y-6"
        >
          <div
            class="w-20 h-20 rounded-lg bg-surface-soft flex items-center justify-center mx-auto"
          >
            <Receipt class="w-10 h-10 text-muted" />
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground">Belum Ada Tagihan</h2>
            <p class="text-sm text-secondary max-w-sm mx-auto">
              Tagihan akan muncul di sini setelah Anda melakukan pemesanan
              layanan.
            </p>
          </div>
          <Button variant="solid">
            <NuxtLink to="/client/pemesanan" class="flex items-center gap-2">
              Pesan Website Sekarang
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
      <div
        class="bg-warning-soft border border-warning/20 p-4 rounded-xl flex items-center justify-between gap-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl bg-warning-soft flex items-center justify-center text-warning shrink-0"
          >
            <AlertCircle :size="24" />
          </div>
          <div class="flex flex-col gap-1">
            <h4 class="text-base font-bold text-foreground">
              Punya pertanyaan?
            </h4>
            <p class="text-xs text-secondary">
              Tim kami siap membantu Anda memilih paket yang paling tepat.
            </p>
          </div>
        </div>
        <NuxtLink to="/client/bantuan/">
          <Button variant="soft-warning" size="sm">
            <div class="flex items-center gap-2">Hubungi Kami</div>
          </Button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "tagihan",
  title: "Tagihan",
});
import { ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import {
  LayoutGrid,
  Globe,
  ShieldCheck,
  TrendingUp,
  Server,
  Calendar,
  Receipt,
  AlertCircle,
} from "~/utils/icons";

const isData = ref(true);
const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/client/",
  },
  {
    label: "Tagihan",
  },
];

const activeTab = ref("semua");
const splideOption = {
  autoWidth: true,
  gap: "0.5rem",
  arrows: false,
  pagination: false,
};
const tabs = [
  {
    id: "semua",
    label: "Semua",
  },
  {
    id: "belum-dibayar",
    label: "Belum Dibayar",
  },
  {
    id: "akan-datang",
    label: "Akan Datang",
  },
];
const bills = [
  {
    id: 1,
    category: "belum-dibayar",

    title: "Pelunasan Website",
    description: "Pembayaran pelunasan sisa 50%",

    invoice: "INV-2026-002",
    date: "20 Agustus 2026",

    amount: "Rp 612.500",

    status: "Belum Dibayar",
    statusVariant: "warning",

    icon: LayoutGrid,
    iconBg: "bg-amber-500/15",
    iconColor: "text-warning",

    highlight: true,
    action: true,
  },

  {
    id: 2,
    category: "akan-datang",

    title: "Perpanjangan Domain",
    description: "kedaisenja.com",

    invoice: "INV-2026-003",
    date: "11 Agustus 2027",

    amount: "Rp 250.000",

    status: "Akan Datang",
    statusVariant: "info",

    icon: Globe,
    iconBg: "bg-info-soft",
    iconColor: "text-info",

    descriptionPrimary: true,
  },

  {
    id: 3,
    category: "akan-datang",

    title: "Maintenance 12 Bulan",
    description: "Perlindungan & perawatan website",

    invoice: "INV-2026-004",
    date: "11 November 2026",

    amount: "Rp 450.000",

    status: "Akan Datang",
    statusVariant: "info",

    icon: ShieldCheck,
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },

  {
    id: 4,
    category: "akan-datang",

    title: "SEO & GEO Premium",
    description: "Monitoring & controlling performa SEO",

    invoice: "INV-2026-005",
    date: "11 September 2026",

    amount: "Rp 300.000",

    status: "Akan Datang",
    statusVariant: "info",

    icon: TrendingUp,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
  },

  {
    id: 5,
    category: "akan-datang",

    title: "Hosting 12 Bulan",
    description: "Server & hosting website",

    invoice: "INV-2026-006",
    date: "11 Agustus 2027",

    amount: "Rp 500.000",

    status: "Akan Datang",
    statusVariant: "info",

    icon: Server,
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-600",
  },
];
</script>

<style scoped>
/*
  Style disesuaikan secara presisi dengan utility class Tailwind CSS 
  dan variabel CSS kustom root yang tersedia.
*/
</style>
