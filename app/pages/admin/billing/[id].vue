<template>
  <div
    v-if="selectedClient"
    class="bg-card min-h-screen p-2 pt-6 lg:p-6 text-foreground space-y-6"
  >
    <!-- Breadcrumb -->
    <Breadcumb
      :items="[
        { label: 'Dashboard', to: '/admin' },
        { label: 'Billing', to: '/admin/billing' },
        { label: selectedClient.name },
      ]"
    />

    <!-- Header Detail -->
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center gap-3 mb-1.5">
          <h1 class="text-2xl font-bold">
            {{ selectedClient.name }}
          </h1>
          <Badge variant="success">{{ selectedClient.accountStatus }}</Badge>
        </div>

        <div class="flex items-center gap-4 text-xs text-secondary">
          <span class="flex items-center gap-1.5">
            <Mail class="w-3.5 h-3.5 text-muted" />

            {{ selectedClient.email }}
            <ExternalLink class="w-3 h-3 text-muted ml-0.5" />
          </span>
        </div>
      </div>

      <Button variant="primary">
        <div class="flex gap-2 items-center">
          <Edit class="w-3.5 h-3.5" />
          <span>Edit Tagihan</span>
        </div>
      </Button>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <!-- Paket Layanan -->
      <div
        class="bg-background rounded-xl p-5 border border-border shadow-app flex flex-col justify-between"
      >
        <div class="text-xs text-muted font-medium mb-2">Paket Layanan</div>

        <div>
          <div class="text-xl font-bold mb-1">
            {{ selectedClient.package }}
          </div>

          <div class="text-xs text-secondary">
            {{ selectedClient.services }}
          </div>
        </div>
      </div>

      <!-- Status Akun -->
      <div
        class="bg-background rounded-xl p-5 border border-border shadow-app flex flex-col justify-between"
      >
        <div class="text-xs text-muted font-medium mb-2">Status Akun</div>

        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 rounded-lg bg-success-soft text-success flex items-center justify-center shrink-0 mt-0.5"
          >
            <ShieldCheck class="w-4 h-4" />
          </div>

          <div>
            <div class="text-base font-bold text-success mb-0.5">
              {{ selectedClient.accountStatus }}
            </div>

            <div class="text-xs text-muted leading-tight">
              {{
                selectedClient.accountStatus === "Aktif"
                  ? "Akun aktif dan layanan berjalan normal."
                  : "Akun sedang tidak aktif."
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- Total Belum Lunas -->
      <div
        class="bg-background rounded-xl p-5 border border-border shadow-app flex flex-col justify-between"
      >
        <div class="text-xs text-muted font-medium mb-2">Total Belum Lunas</div>

        <div>
          <div class="text-xl font-bold mb-1">
            {{ selectedClient.unpaidAmount }}
          </div>

          <div class="text-xs" :class="selectedClient.unpaidBadgeClass">
            {{ selectedClient.unpaidSubtitle }}
          </div>
        </div>
      </div>

      <!-- Tagihan Berikutnya -->
      <div
        class="bg-background rounded-xl p-5 border border-border shadow-app flex flex-col justify-between"
      >
        <div class="text-xs text-muted font-medium mb-2">
          Tagihan Berikutnya
        </div>

        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 rounded-lg bg-surface text-secondary flex items-center justify-center shrink-0 mt-0.5"
          >
            <Calendar class="w-4 h-4" />
          </div>

          <div>
            <div class="text-base font-bold text-foreground mb-0.5">
              {{ selectedClient.nextBilling }}
            </div>

            <div class="text-xs text-muted">Jatuh tempo berikutnya</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Riwayat Tagihan -->
    <div class="bg-background p-6 rounded-2xl shadow-app">
      <h1 class="text-sm font-bold mb-4">Riwayat Tagihan</h1>

      <Table :headers="invoiceHeaders" :data="invoiceData" />
    </div>
  </div>

  <!-- Data Tidak Ditemukan -->
  <div v-else class="bg-card min-h-screen p-6 text-foreground">
    <Breadcumb
      :items="[
        { label: 'Dashboard', to: '/admin' },
        { label: 'Billing', to: '/admin/billing' },
        { label: 'Detail' },
      ]"
    />

    <div class="bg-background p-6 rounded-2xl shadow-app mt-6">
      <h1 class="text-lg font-bold">Client tidak ditemukan</h1>

      <p class="text-sm text-secondary mt-1">
        Data billing dengan ID tersebut tidak tersedia.
      </p>

      <button
        @click="goBack"
        class="mt-5 flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-sm font-medium"
      >
        <ArrowLeft class="w-4 h-4" />

        Kembali ke Billing
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import {
  ArrowLeft,
  Edit,
  Mail,
  ExternalLink,
  ShieldCheck,
  Calendar,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "billing",
  title: "Detail Billing",
});

const route = useRoute();

const clients = [
  {
    id: 1,
    name: "Klinik Sehat",
    initials: "KS",
    email: "admin@kliniksehat.com",
    phone: "+62 812-3456-7890",
    package: "Premium",
    services: "Website + SEO + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 0",
    unpaidSubtitle: "Semua tagihan lunas",
    unpaidBadgeClass: "text-success",
    nextBilling: "11 Sep 2026",

    invoices: [
      {
        id: "INV-2026-018",
        period: "11 Agu 2026 - 10 Sep 2026",
        dueDate: "11 Sep 2026",
        amount: "Rp 2.500.000",
        status: "Lunas",
        statusBadge: "bg-success-soft text-success",
        paymentMethod: "Transfer Bank",
        paymentTime: "11 Agu 2026, 09:15",
        createdAt: "11 Agu 2026, 08:32",
      },
      {
        id: "INV-2026-017",
        period: "11 Jul 2026 - 10 Agu 2026",
        dueDate: "11 Agu 2026",
        amount: "Rp 2.500.000",
        status: "Lunas",
        statusBadge: "bg-success-soft text-success",
        paymentMethod: "Transfer Bank",
        paymentTime: "11 Jul 2026, 10:22",
        createdAt: "11 Jul 2026, 08:40",
      },
      {
        id: "INV-2026-016",
        period: "11 Jun 2026 - 10 Jul 2026",
        dueDate: "11 Jul 2026",
        amount: "Rp 2.500.000",
        status: "Lunas",
        statusBadge: "bg-success-soft text-success",
        paymentMethod: "Transfer Bank",
        paymentTime: "11 Jun 2026, 09:18",
        createdAt: "11 Jun 2026, 08:30",
      },
      {
        id: "INV-2026-015",
        period: "11 Mei 2026 - 10 Jun 2026",
        dueDate: "11 Jun 2026",
        amount: "Rp 2.500.000",
        status: "Lunas",
        statusBadge: "bg-success-soft text-success",
        paymentMethod: "Transfer Bank",
        paymentTime: "11 Mei 2026, 09:05",
        createdAt: "11 Mei 2026, 08:28",
      },
      {
        id: "INV-2026-014",
        period: "11 Apr 2026 - 10 Mei 2026",
        dueDate: "11 Mei 2026",
        amount: "Rp 2.500.000",
        status: "Lunas",
        statusBadge: "bg-success-soft text-success",
        paymentMethod: "Transfer Bank",
        paymentTime: "11 Apr 2026, 09:10",
        createdAt: "11 Apr 2026, 08:27",
      },
    ],
  },

  {
    id: 2,
    name: "Cafe Nusantara",
    initials: "CN",
    email: "hello@cafenusantara.com",
    phone: "+62 821-9876-5432",
    package: "Standard",
    services: "Website + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 1.250.000",
    unpaidSubtitle: "1 tagihan belum lunas",
    unpaidBadgeClass: "text-danger",
    nextBilling: "12 Agu 2026",
    invoices: [],
  },

  {
    id: 3,
    name: "PT ABC",
    initials: "PA",
    email: "admin@ptabc.com",
    phone: "+62 811-2233-4455",
    package: "Enterprise",
    services: "Website + SEO + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 2.500.000",
    unpaidSubtitle: "2 tagihan belum lunas",
    unpaidBadgeClass: "text-danger",
    nextBilling: "15 Agu 2026",
    invoices: [],
  },

  {
    id: 4,
    name: "Toko Makmur",
    initials: "TM",
    email: "owner@tokomakmur.com",
    phone: "+62 812-5566-7788",
    package: "Basic",
    services: "Website",
    accountStatus: "Nonaktif",
    accountNote: "Menunggu pembayaran",
    statusBadge: "bg-danger-soft text-danger",
    unpaidAmount: "Rp 750.000",
    unpaidSubtitle: "1 tagihan belum lunas",
    unpaidBadgeClass: "text-danger",
    nextBilling: "-",
    invoices: [],
  },

  {
    id: 5,
    name: "Studio Utama",
    initials: "SU",
    email: "contact@studioutama.com",
    phone: "+62 813-6677-8899",
    package: "Standard",
    services: "Website + Maintenance",
    accountStatus: "Aktif",
    statusBadge: "bg-success-soft text-success",
    unpaidAmount: "Rp 0",
    unpaidSubtitle: "Semua tagihan lunas",
    unpaidBadgeClass: "text-success",
    nextBilling: "07 Sep 2026",
    invoices: [],
  },
];

const selectedClient = computed(() => {
  return clients.find((client) => client.id === Number(route.params.id));
});

const invoiceHeaders = [
  {
    key: "id",
    label: "ID Tagihan",
  },
  {
    key: "period",
    label: "Periode",
  },
  {
    key: "dueDate",
    label: "Jatuh Tempo",
  },
  {
    key: "amount",
    label: "Total Tagihan",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "paymentMethod",
    label: "Pembayaran",
  },
  {
    key: "createdAt",
    label: "Dibuat Pada",
  },
];

const goBack = () => {
  navigateTo("/admin/billing");
};

const invoiceData = computed(() => {
  return selectedClient.value?.invoices || [];
});
</script>
