<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <div class="max-w-lg mx-auto space-y-6">
      <!-- Header -->
      <div class="text-center space-y-4 pt-4">
        <div class="flex items-center flex-col">
          <div class="w-32 h-32 overflow-hidden">
            <LottieAnim
              animation="/anim/success.json"
              :loop="false"
              class="w-[150%] h-[150%] -translate-x-[15%] -translate-y-[15%]"
            />
          </div>
          <h1 class="text-2xl font-bold text-foreground">
            Pembayaran Berhasil!
          </h1>
          <p class="text-sm text-secondary mt-2 max-w-xs mx-auto">
            Terima kasih, pembayaran Anda telah kami terima dan sedang diproses.
          </p>
        </div>
      </div>

      <!-- Receipt Card -->
      <div
        class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-5"
      >
        <div
          class="flex items-center justify-between pb-4 border-b border-border"
        >
          <span
            class="text-xs font-semibold text-secondary uppercase tracking-wider"
            >Status</span
          >
          <Badge variant="success">Berhasil</Badge>
        </div>

        <div class="space-y-4">
          <div v-for="item in details" :key="item.label">
            <p class="text-[11px] text-secondary uppercase tracking-wider mb-1">
              {{ item.label }}
            </p>
            <p class="text-sm font-semibold text-foreground">
              {{ item.value }}
            </p>
          </div>
        </div>

        <div
          class="border-t border-border pt-4 flex items-center justify-between"
        >
          <span class="text-sm font-bold text-foreground"
            >Total Pembayaran</span
          >
          <span class="text-xl font-bold text-primary">Rp 612.500</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col gap-3">
        <Button variant="solid" class="w-full">
          <NuxtLink
            to="/client/pembayaran"
            class="flex items-center justify-center gap-2 w-full"
          >
            Lihat Riwayat Pembayaran
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </Button>
        <Button variant="primary" class="w-full">
          <NuxtLink
            to="/client/tagihan"
            class="flex items-center justify-center gap-2 w-full"
          >
            Unduh Nota Pembayaran
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  ssr: false,
  // layout: "client",
  // title: "Nota Pembayaran",
  // activeTab: "pembayaran",
});

import { CheckCircle2, ArrowRight } from "~/utils/icons";

const details = [
  { label: "No. Transaksi", value: "TRX-20260904-001" },
  { label: "Tanggal", value: "4 September 2026, 14:32 WIB" },
  { label: "Tagihan", value: "Pelunasan Website" },
  { label: "Metode", value: "Transfer Bank BCA" },
  { label: "No. Invoice", value: "INV-2026-002" },
];
</script>
