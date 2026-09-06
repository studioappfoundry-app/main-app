<template>
  <Modal v-model="openModalRiwayat">
    <h2 class="text-2xl tracking-tight font-bold text-foreground mb-5">
      Riwayat Komisi
    </h2>

    <div v-if="isLoading" class="space-y-3 animate-pulse">
      <div v-for="n in 3" :key="n" class="h-12 bg-surface-soft rounded-lg" />
    </div>

    <div
      v-else-if="commissions.length === 0"
      class="text-center py-10 space-y-3"
    >
      <div
        class="w-14 h-14 rounded-xl bg-surface-soft flex items-center justify-center mx-auto"
      >
        <Receipt class="w-7 h-7 text-muted" />
      </div>
      <div>
        <h3 class="text-sm font-semibold text-foreground">Belum ada komisi</h3>
        <p class="text-xs text-secondary mt-1 max-w-xs mx-auto">
          Riwayat komisi Anda akan dimunculkan disini setelah anda mendapatkan
          user referral yang sudah menyelesaikan pembayaran.
        </p>
      </div>
    </div>

    <div v-else class="overflow-x-auto -mx-2 px-2">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="text-xs text-secondary border-b border-border">
            <th class="pb-2 font-medium pl-1">Tanggal</th>
            <th class="pb-2 font-medium">Pemesanan</th>
            <th class="pb-2 font-medium text-right">Persenan</th>
            <th class="pb-2 font-medium text-right">Komisi</th>
            <th class="pb-2 font-medium text-right pr-1">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr
            v-for="comm in commissions.slice(0, 5)"
            :key="comm.id"
            class="hover:bg-surface-soft/50 transition-colors"
          >
            <td class="py-3 pl-1 text-xs text-secondary">
              {{ formatDate(comm.created_at) }}
            </td>
            <td class="py-3">
              <div class="flex flex-col">
                <span class="font-medium text-foreground text-xs">
                  {{ comm.order_number }}
                </span>
                <span class="text-[11px] text-muted">
                  {{ comm.referred_name }}
                </span>
              </div>
            </td>
            <td class="py-3 text-right text-xs text-secondary">
              {{ comm.commission_rate }}%
            </td>
            <td class="py-3 text-right">
              <span class="font-semibold text-foreground text-xs">
                {{ formatRupiah(comm.commission_amount) }}
              </span>
            </td>
            <td class="py-3 text-right pr-1">
              <Badge
                :variant="comm.status === 'paid' ? 'success' : 'warning'"
                size="sm"
                class="ml-1.5"
              >
                {{ comm.status === "pending" ? "Pending" : "Terbayar" }}
              </Badge>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="commissions.length > 5" class="mt-3 text-center">
        <button class="text-xs font-semibold text-primary hover:underline">
          View All
        </button>
      </div>
    </div>
  </Modal>
  <Modal v-model="openModalUser">
    <h2 class="text-2xl tracking-tight font-bold text-foreground mb-5">
      Daftar Lengkap Referralku
    </h2>
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="text-xs text-secondary border-b border-border">
          <th class="pb-2 font-medium pl-1">Nama</th>
          <th class="pb-2 font-medium">Bergabung</th>
          <th class="pb-2 font-medium text-right pr-1">Pemesanan</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border">
        <tr
          v-for="user in referrals.slice(0, 5)"
          :key="user.id"
          class="group hover:bg-surface-soft/50 transition-colors"
        >
          <td class="py-3 pl-1">
            <div class="flex items-center gap-2.5">
              <div
                class="w-7 h-7 rounded-full bg-primary-soft flex items-center justify-center text-xs font-bold text-primary shrink-0"
              >
                {{ getInitials(user.name) }}
              </div>
              <span class="font-medium text-foreground">{{ user.name }}</span>
            </div>
          </td>
          <td class="py-3 text-secondary text-xs">
            {{ formatDate(user.created_at) }}
          </td>
          <td class="py-3 text-right pr-1">
            <Badge
              :variant="user.order_count > 0 ? 'success' : 'neutral'"
              size="sm"
            >
              {{ user.order_count }}
            </Badge>
          </td>
        </tr>
      </tbody>
    </table>
  </Modal>
  <Modal v-model="openModal">
    <h2 class="text-2xl tracking-tight font-bold text-foreground mb-5">
      Bagaimana cara kerja affiliasi
    </h2>
    <div class="px-2">
      <Stepper :steps="howSteps" direction="vertical" size="md" />
    </div>
  </Modal>

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
    <!-- Header / Hero -->
    <div
      class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          Affiliasi
        </h1>
        <p class="text-sm text-secondary mt-1 max-w-lg">
          Dapatkan komisi setiap Anda mengajak user baru menggunkan Appfoundry.
          Bagikan linkmu dan mulai dapatkan penghasilan hari ini.
        </p>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Button variant="soft-success" @click="openModal = true">
          <div class="flex gap-2">
            Panduan
            <FileQuestion class="w-4 h-4" />
          </div>
        </Button>
        <div class="flex gap-2">
          <Badge :variant="currentTierBadge.variant" size="sm">
            {{ currentTierBadge.label }}
          </Badge>
          <span class="text-sm font-bold text-foreground"
            >{{ currentRate }}% komisi</span
          >
        </div>
      </div>
    </div>

    <!-- Referral Link -->
    <div
      class="bg-background border border-border rounded-xl p-5 shadow-app mb-6"
    >
      <h2 class="text-sm font-bold text-foreground mb-4">Link Referral</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="text-xs font-medium text-secondary"
            >Kode Referral</label
          >
          <div
            class="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5"
          >
            <span class="text-sm font-semibold text-foreground tracking-wide">
              {{ currentUser.referral_code }}
            </span>
            <button
              @click="copyToClipboard(currentUser.referral_code, 'code')"
              class="text-muted hover:text-foreground transition-colors"
              :aria-label="copyState.code ? 'Copied' : 'Copy code'"
            >
              <Check v-if="copyState.code" class="w-4 h-4 text-success" />
              <Copy v-else class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-medium text-secondary"
            >Link Referral</label
          >
          <div
            class="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2"
          >
            <input
              ref="linkInput"
              :value="referralLink"
              readonly
              class="flex-1 bg-transparent text-sm text-foreground outline-none truncate"
            />
            <button
              @click="copyToClipboard(referralLink, 'link')"
              class="shrink-0 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Check v-if="copyState.link" class="w-3.5 h-3.5" />
              <Copy v-else class="w-3.5 h-3.5" />
              {{ copyState.link ? "Copied" : "Copy Link" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Affiliate Summary -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div
        class="bg-background border border-border rounded-xl p-5 shadow-app space-y-1"
      >
        <p class="text-xs font-semibold text-secondary">Level Affiliasi</p>
        <p class="text-2xl font-bold text-foreground">{{ currentTier.name }}</p>
        <p class="text-[11px] text-muted">{{ currentRate }}% pembagian</p>
      </div>
      <div
        class="bg-background border border-border rounded-xl p-5 shadow-app space-y-1"
      >
        <p class="text-xs font-semibold text-secondary">Total Referral</p>
        <p class="text-2xl font-bold text-foreground">{{ totalReferrals }}</p>
        <p class="text-[11px] text-muted">User Aktif</p>
      </div>
      <div
        class="bg-background border border-border rounded-xl p-5 shadow-app space-y-1"
      >
        <p class="text-xs font-semibold text-secondary">Total Pendapatan</p>
        <p class="text-2xl font-bold text-foreground">
          {{ formatRupiah(totalEarned) }}
        </p>
        <p class="text-[11px] text-muted">Seluruhnya</p>
      </div>
      <div
        class="bg-background border border-border rounded-xl p-5 shadow-app space-y-1"
      >
        <p class="text-xs font-semibold text-secondary">Komisi Tertunda</p>
        <p class="text-2xl font-bold text-warning">
          {{ formatRupiah(pendingCommission) }}
        </p>
        <p class="text-[11px] text-muted">
          Terbayar: {{ formatRupiah(paidCommission) }}
        </p>
      </div>
    </div>

    <!-- Level Progress -->
    <div
      class="bg-background border border-border rounded-xl p-5 shadow-app mb-6"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"
      >
        <div>
          <h2 class="text-base font-bold text-foreground">Level Affiliasi</h2>
          <p class="text-xs text-secondary mt-0.5">
            Tetap rekomendasikan user untuk membuka komisi yang lebih besar.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-secondary">Saat ini</span>
          <Badge :variant="currentTierBadge.variant" size="sm">
            {{ currentTier.name }}
          </Badge>
        </div>
      </div>

      <div v-if="currentTier.name !== 'Diamond'" class="space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-foreground">
            {{ totalReferrals }} referral
          </span>
          <span class="text-secondary">
            {{ nextTier.min }} referral untuk level {{ nextTier.name }}
          </span>
        </div>
        <div class="w-full bg-surface-soft h-2.5 rounded-full overflow-hidden">
          <div
            class="bg-primary h-full rounded-full transition-all duration-500"
            :style="{ width: levelProgressPercent + '%' }"
          />
        </div>
        <p class="text-xs text-secondary">
          <strong class="text-foreground">{{ referralsToNext }}</strong>
          referral lagi untuk mencapai level
          <strong class="text-foreground">{{ nextTier.name }}</strong> (
          {{ nextTier.rate }}% )
        </p>
      </div>

      <div
        v-else
        class="flex items-center gap-3 p-3 rounded-xl bg-success-soft border border-success-border"
      >
        <Trophy class="w-5 h-5 text-success shrink-0" />
        <div>
          <p class="text-sm font-bold text-foreground">
            Level Affiliasi Maksimal
          </p>
          <p class="text-xs text-secondary">
            Kamu sudah membuka level Diamond dengan komisi tertinggi dalam
            affiliasi.
          </p>
        </div>
      </div>
    </div>

    <!-- My Referrals & Commission History -->
    <div class="flex w-full mb-6">
      <!-- My Referrals -->
      <div
        class="bg-background border border-border rounded-xl p-5 shadow-app flex flex-1 flex-col"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-foreground">Referral Ku</h2>
          <button
            class="text-xs font-semibold text-primary hover:underline cursor-pointer"
            @click="openModalUser = true"
          >
            Lihat semua referral
          </button>
        </div>

        <div v-if="isLoading" class="space-y-3 animate-pulse">
          <div
            v-for="n in 3"
            :key="n"
            class="h-12 bg-surface-soft rounded-lg"
          />
        </div>

        <div
          v-else-if="referrals.length === 0"
          class="text-center py-10 space-y-3"
        >
          <div
            class="w-14 h-14 rounded-xl bg-surface-soft flex items-center justify-center mx-auto"
          >
            <Users class="w-7 h-7 text-muted" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-foreground">
              Belum ada referral
            </h3>
            <p class="text-xs text-secondary mt-1 max-w-xs mx-auto">
              Bagikan link referral Anda untuk mulai mendapatkan komisi.
            </p>
          </div>
          <Button variant="soft-primary" size="sm" @click="focusCopyLink">
            Copy Link Referral
          </Button>
        </div>

        <div v-else class="overflow-x-auto -mx-2 px-2">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="text-xs text-secondary border-b border-border">
                <th class="pb-2 font-medium pl-1">Nama</th>
                <th class="pb-2 font-medium">Bergabung</th>
                <th class="pb-2 font-medium text-right pr-1">Pemesanan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="user in referrals.slice(0, 5)"
                :key="user.id"
                class="group hover:bg-surface-soft/50 transition-colors"
              >
                <td class="py-3 pl-1">
                  <div class="flex items-center gap-2.5">
                    <div
                      class="w-7 h-7 rounded-full bg-primary-soft flex items-center justify-center text-xs font-bold text-primary shrink-0"
                    >
                      {{ getInitials(user.name) }}
                    </div>
                    <span class="font-medium text-foreground">{{
                      user.name
                    }}</span>
                  </div>
                </td>
                <td class="py-3 text-secondary text-xs">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="py-3 text-right pr-1">
                  <Badge
                    :variant="user.order_count > 0 ? 'success' : 'neutral'"
                    size="sm"
                  >
                    {{ user.order_count }}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="referrals.length > 5" class="mt-3 text-center">
            <button
              class="text-xs font-semibold text-primary hover:underline cursor-pointer"
              @click="openModalRiwayat = true"
            >
              Lihat Riwayat Komisi
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Affiliate Levels -->
    <div
      class="bg-background border border-border rounded-xl p-5 shadow-app mb-6"
    >
      <h2 class="text-base font-bold text-foreground mb-4">Affiliate Levels</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div
          v-for="tier in tiers"
          :key="tier.name"
          class="relative rounded-xl border p-4 transition-all"
          :class="[
            currentTier.name === tier.name
              ? 'border-primary bg-primary'
              : 'border-border bg-card hover:bg-surface-soft',
          ]"
        >
          <div
            v-if="currentTier.name === tier.name"
            class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-background flex items-center justify-center shadow-sm"
          >
            <Star class="w-3 h-3 fill-current" />
          </div>
          <div class="space-y-1">
            <p
              class="text-xs font-semibold uppercase tracking-wider"
              :class="
                currentTier.name === tier.name
                  ? 'text-background'
                  : 'text-muted'
              "
            >
              {{ tier.name }}
            </p>
            <p class="text-lg font-bold text-foreground">{{ tier.rate }}%</p>
            <p
              class="text-[11px]"
              :class="
                currentTier.name === tier.name
                  ? 'text-background'
                  : 'text-secondary'
              "
            >
              {{ tier.min }}+ referral{{ tier.min === 1 ? "" : "s" }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <section
      class="bg-warning-soft border border-warning/20 p-4 rounded-xl flex items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-xl bg-warning-soft flex items-center justify-center text-warning shrink-0"
        >
          <AlertCircle :size="24" />
        </div>
        <div class="flex flex-col gap-1">
          <h4 class="text-base font-bold text-foreground">Punya pertanyaan?</h4>
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
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "affiliate",
  title: "Affiliate",
});

import { ref, computed, onMounted } from "vue";
import {
  Copy,
  Check,
  Trophy,
  Users,
  Receipt,
  Star,
  AlertCircle,
  FileQuestion,
} from "~/utils/icons";

const isData = ref(true);

const openModalUser = ref(false);
const openModalRiwayat = ref(false);
const openModal = ref(false);

/* ---------- Breadcrumb ---------- */
const breadcrumbItems = [
  { label: "Dashboard", to: "/client/" },
  { label: "Affiliate" },
];

/* ---------- Tier Configuration ---------- */
const tiers = [
  { name: "Bronze", min: 0, rate: 10 },
  { name: "Silver", min: 6, rate: 12 },
  { name: "Gold", min: 13, rate: 15 },
  { name: "Platinum", min: 25, rate: 18 },
  { name: "Diamond", min: 31, rate: 20 },
];

/* ---------- Dummy Data ---------- */
const currentUser = ref({
  id: 1,
  name: "Kedai Kopi Senja",
  referral_code: "APPF-7XK2",
});

const users = ref([
  { id: 101, name: "Budi Santoso", created_at: "2026-08-15", order_count: 2 },
  { id: 102, name: "Ani Wijaya", created_at: "2026-08-18", order_count: 1 },
  { id: 103, name: "Citra Lestari", created_at: "2026-08-20", order_count: 0 },
  { id: 104, name: "Dedi Pratama", created_at: "2026-08-22", order_count: 3 },
  { id: 105, name: "Eka Putri", created_at: "2026-08-25", order_count: 1 },
  { id: 106, name: "Fajar Nugroho", created_at: "2026-08-28", order_count: 0 },
  { id: 107, name: "Gita Maharani", created_at: "2026-08-30", order_count: 2 },
  { id: 108, name: "Hadi Sucipto", created_at: "2026-09-01", order_count: 1 },
]);
const referrals = computed(() => {
  if (isData.value) {
    return users.value;
  } else {
    return [];
  }
});
const commissions = computed(() => {
  if (isData.value) {
    return komisi.value;
  } else {
    return [];
  }
});
const komisi = ref([
  {
    id: 1,
    order_number: "#APP-001",
    referred_name: "Budi Santoso",
    commission_rate: 10,
    commission_amount: 1000000,
    status: "paid",
    created_at: "2026-08-16",
  },
  {
    id: 2,
    order_number: "#APP-002",
    referred_name: "Ani Wijaya",
    commission_rate: 10,
    commission_amount: 500000,
    status: "paid",
    created_at: "2026-08-19",
  },
  {
    id: 3,
    order_number: "#APP-003",
    referred_name: "Dedi Pratama",
    commission_rate: 10,
    commission_amount: 1500000,
    status: "pending",
    created_at: "2026-08-23",
  },
  {
    id: 4,
    order_number: "#APP-004",
    referred_name: "Eka Putri",
    commission_rate: 10,
    commission_amount: 500000,
    status: "pending",
    created_at: "2026-08-26",
  },
  {
    id: 5,
    order_number: "#APP-005",
    referred_name: "Gita Maharani",
    commission_rate: 10,
    commission_amount: 1000000,
    status: "paid",
    created_at: "2026-08-31",
  },
]);

const isLoading = ref(false);

/* ---------- Derived Data ---------- */
const totalReferrals = computed(() => referrals.value.length);

const currentTier = computed(() => {
  let tier = tiers[0];
  for (const t of tiers) {
    if (totalReferrals.value >= t.min) tier = t;
  }
  return tier;
});

const currentRate = computed(() => currentTier.value.rate);

const currentTierBadge = computed(() => {
  const map = {
    Bronze: { variant: "neutral", label: "Bronze" },
    Silver: { variant: "primary", label: "Silver" },
    Gold: { variant: "warning", label: "Gold" },
    Platinum: { variant: "success", label: "Platinum" },
    Diamond: { variant: "success", label: "Diamond" },
  };
  return map[currentTier.value.name] || map.Bronze;
});

const nextTier = computed(() => {
  const idx = tiers.findIndex((t) => t.name === currentTier.value.name);
  return tiers[idx + 1] || null;
});

const referralsToNext = computed(() => {
  if (!nextTier.value) return 0;
  return nextTier.value.min - totalReferrals.value;
});

const levelProgressPercent = computed(() => {
  if (!nextTier.value) return 100;
  return Math.min(
    100,
    Math.round((totalReferrals.value / nextTier.value.min) * 100),
  );
});

const totalEarned = computed(() =>
  commissions.value.reduce((sum, c) => sum + c.commission_amount, 0),
);

const pendingCommission = computed(() =>
  commissions.value
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + c.commission_amount, 0),
);

const paidCommission = computed(() =>
  commissions.value
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.commission_amount, 0),
);

const referralLink = computed(
  () => `https://appfoundry.id/register?ref=${currentUser.value.referral_code}`,
);

/* ---------- Steps ---------- */
const howSteps = [
  {
    title: "Bagikan",
    description: "Bagikan link referral Anda dengan teman atau user lainnya.",
  },
  {
    title: "Mendaftar",
    description:
      "User baru mendaftar di Appfoundry menggunakan link referral Anda.",
  },
  {
    title: "Pembelian",
    description:
      "User baru menyelesaikan pemesanan dan pembayaran paket di Appfoundry.",
  },
  {
    title: "Menghasilkan",
    description:
      "Anda akan mendapatkan komisi yang sesuai dengan tingkatan level Anda.",
  },
];

/* ---------- Copy Behavior ---------- */
const copyState = ref({ code: false, link: false });

const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text);
    copyState.value[type] = true;
    setTimeout(() => {
      copyState.value[type] = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const focusCopyLink = () => {
  /* CTA empty state bisa scroll ke section referral link jika diperlukan */
};

/* ---------- Helpers ---------- */
const formatRupiah = (num) => {
  return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatDate = (str) => {
  const d = new Date(str);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/* ---------- Simulate Loading ---------- */
onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
});
</script>
