<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <div class="mx-auto space-y-8">
      <!-- Header Utama & Profil User -->
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
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">
            Bantuan (Support Center)
          </h1>
          <p class="text-sm text-secondary mt-1">
            Temukan jawaban atau hubungi tim kami. Kami siap membantu Anda.
          </p>
        </div>
      </div>

      <!-- Search Bar & Filter -->
      <div class="flex flex-col sm:flex-row items-center gap-3">
        <Input
          v-model="search"
          type="search"
          placeholder="Cari bantuan apa yang kamu butuhkan ..."
          class="w-full"
          size="lg"
          max-width="100vw"
        >
          <template #icon-left>
            <Search />
          </template>
        </Input>
      </div>

      <!-- Dua Banner Kartu Aksi Atas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Kartu 1: Bantuan Langsung WhatsApp -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app flex flex-col justify-between space-y-6"
        >
          <div class="space-y-2">
            <h2 class="text-lg font-bold text-foreground">
              Butuh bantuan langsung?
            </h2>
            <p class="text-xs text-secondary leading-relaxed">
              Hubungi tim kami melalui
              <strong class="text-foreground font-semibold">WhatsApp</strong>
              untuk respon lebih cepat.
            </p>
          </div>
          <div class="flex items-center justify-between">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 px-4"
            >
              <MessageSquare class="w-4 h-4" />
              Hubungi Kami
            </a>
          </div>
        </div>

        <!-- Kartu 2: Buat Permohonan Tiket -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app flex flex-col justify-between space-y-6"
        >
          <div class="space-y-2">
            <h2 class="text-lg font-bold text-foreground">Butuh bantuan?</h2>
            <p class="text-xs text-secondary leading-relaxed">
              Kirim permohonan bantuan dan jelaskan masalah yang Anda hadapi.
            </p>
          </div>
          <div class="flex items-center justify-between">
            <Button variant="solid">
              <NuxtLink
                class="flex gap-2 items-center"
                to="/client/bantuan/permohonan"
              >
                <Plus :size="16" />
                Buat Permohonan
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>

      <!-- Permohonan Bantuan Saya -->
      <div
        class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4 mb-6"
      >
        <div
          class="flex flex-col md:flex-row items-end md:items-center justify-between gap-2"
        >
          <div class="flex md:items-center space-x-3">
            <h3 class="text-base font-bold text-foreground">
              Permohonan Bantuan Saya
            </h3>
            <Badge variant="success" size="sm"> Aktif & Terbaru </Badge>
          </div>
          <button
            class="text-sm font-semibold text-primary hover:underline flex items-center cursor-pointer"
          >
            Lihat Semua <ChevronRight :size="14" />
          </button>
        </div>

        <div class="divide-y divide-border" v-if="isData">
          <div
            v-for="(req, index) in myRequests"
            :key="index"
            class="py-4 first:pt-2 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer hover:bg-surface-soft/50 rounded-xl transition-all"
            @click="navigateTo(`/client/bantuan/${req.id}`)"
          >
            <div class="flex items-center space-x-4">
              <div>
                <div
                  class="text-sm font-bold text-foreground group-hover:text-primary transition-colors"
                >
                  {{ req.title }}
                </div>
                <div class="text-xs text-secondary mt-0.5">
                  <span class="font-semibold text-foreground">{{
                    req.id
                  }}</span>
                  • {{ req.updatedAt }}
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <Badge :variant="req.badgeClass">{{ req.status }}</Badge>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="w-20 h-20 rounded-lg bg-surface-soft flex items-center justify-center mx-auto"
          >
            <MessageCircleQuestion class="w-10 h-10 text-muted" />
          </div>
          <div class="space-y-2 flex flex-col items-center">
            <h2 class="text-xl text-center font-bold text-foreground">
              Belum Ada Permohonan Tiket Bantuan Anda
            </h2>
            <p class="text-sm text-secondary max-w-sm text-center">
              Anda belum memiliki bantuan yg bisa kami bantu. Pesan layanan
              bantuan jika ada memiliki kendala.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid Bawah: Pertanyaan Umum & Bantuan Berdasarkan Layanan -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Pertanyaan Umum (FAQ) -->
      <div
        class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4 flex flex-col justify-between"
      >
        <div class="flex items-center justify-between border-bottom pb-3 gap-2">
          <h3 class="text-base font-bold text-foreground">Pertanyaan Umum</h3>
          <NuxtLink to="/client/bantuan/faq">
            <button
              class="text-sm font-semibold text-primary hover:underline flex items-center cursor-pointer"
            >
              Lihat semua FAQ <ChevronRight :size="14" />
            </button>
          </NuxtLink>
        </div>
        <div class="space-y-1 divide-y divide-border">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              @click="toggleFaq(index)"
              class="group flex w-full items-center justify-between py-4 text-left focus:outline-none"
            >
              <span
                class="pr-4 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary"
              >
                {{ faq.question }}
              </span>

              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                :class="
                  activeIndex === index
                    ? 'bg-foreground text-background'
                    : 'border border-border bg-card text-muted'
                "
              >
                <Plus
                  :size="16"
                  :class="{ 'rotate-45': activeIndex === index }"
                  class="transition-transform duration-300"
                />
              </span>
            </button>

            <div
              class="grid transition-[grid-template-rows] duration-300 ease-in-out"
              :class="
                activeIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              "
            >
              <div class="overflow-hidden">
                <p class="pb-4 pr-10 text-sm leading-relaxed text-muted">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bantuan Berdasarkan Layanan -->
      <div
        class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4 flex flex-col justify-start"
      >
        <div class="border-bottom pb-3">
          <h3 class="text-base font-bold text-foreground">
            Bantuan berdasarkan layanan
          </h3>
        </div>
        <div class="space-y-3">
          <div
            v-for="(service, index) in supportServices"
            :key="index"
            class="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-surface-soft cursor-pointer transition-all group"
            @click="navigateTo(service.link)"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-9 h-9 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0"
              >
                <component :is="service.icon" :size="18" />
              </div>
              <div>
                <div
                  class="text-xs font-bold text-foreground group-hover:text-primary transition-colors"
                >
                  {{ service.title }}
                </div>
                <div class="text-[11px] text-secondary mt-0.5">
                  {{ service.desc }}
                </div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-muted" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "bantuan",
  title: "Pusat Bantuan",
});
import { ref } from "vue";
import {
  Search,
  MessageSquare,
  Plus,
  Send,
  ChevronRight,
  Globe,
  Edit3,
  CheckCircle2,
  Laptop,
  SearchCode,
  ShieldCheck,
  CreditCard,
  FileText,
  MessageCircleQuestion,
} from "~/utils/icons";

const isData = ref(true);

const myRequests = [
  {
    id: "1024",
    title: "Website tidak bisa diakses",
    updatedAt: "Terakhir diperbarui 10 menit lalu",
    status: "Sedang Diproses",
    icon: Globe,
    iconBgClass: "bg-info-soft",
    iconColorClass: "text-info",
    badgeClass: "info",
  },
  {
    id: "1021",
    title: "Permintaan update homepage",
    updatedAt: "Terakhir diperbarui kemarin",
    status: "Menunggu Respons Anda",
    icon: Edit3,
    iconBgClass: "bg-warning-soft",
    iconColorClass: "text-warning",
    badgeClass: "warning",
  },
  {
    id: "1018",
    title: "Perubahan informasi kontak",
    updatedAt: "Terakhir diperbarui 2 hari lalu",
    status: "Selesai",
    icon: CheckCircle2,
    iconBgClass: "bg-success-soft",
    iconColorClass: "text-success",
    badgeClass: "success",
  },
];

const activeIndex = ref(0);

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = ref([
  {
    question: "Apa itu Appfoundry Studio?",
    answer:
      "Appfoundry Studio membantu bisnis membangun website dan web application yang profesional, cepat, aman, dan mudah dikelola—dengan pilihan kebutuhan yang dapat disesuaikan.",
  },
  {
    question: "Bagaimana cara memesan website di Appfoundry?",
    answer:
      "Anda dapat melihat demo yang disesuaikan dengan bisnis, memilih kebutuhan melalui configurator, melihat harga secara realtime, lalu melakukan pemesanan dan pembayaran.",
  },
  {
    question: "Berapa biaya membuat website?",
    answer:
      "Harga bergantung pada kebutuhan website, seperti hosting, desain, fitur, domain, SEO & GEO, dan maintenance. Anda dapat mengonfigurasi kebutuhan dan melihat estimasi harga sebelum memesan.",
  },
  {
    question: "Apakah website saya akan tetap dirawat setelah selesai dibuat?",
    answer:
      "Bisa. Appfoundry menyediakan layanan maintenance yang mencakup monitoring website, perbaikan error, dan update kecil sesuai ruang lingkup layanan. Bulan pertama gratis, kemudian tersedia pilihan 3 atau 6 bulan.",
  },
  {
    question: "Apakah Appfoundry membantu website ditemukan di Google?",
    answer:
      "Ya. Tersedia layanan SEO & GEO yang mencakup setup Google Search Console, sitemap, meta SEO, structured data, local SEO dasar, indexing, dan struktur yang siap untuk GEO.",
  },
]);

const supportServices = [
  {
    title: "Website Saya",
    desc: "Kelola dan informasi website Anda",
    icon: Laptop,
    link: "/client/bantuan/faq?category=website",
  },
  {
    title: "SEO & GEO",
    desc: "Bantuan layanan SEO & GEO",
    icon: SearchCode,
    link: "/client/bantuan/faq?category=seo-geo",
  },
  {
    title: "Maintenance",
    desc: "Informasi pemeliharaan website",
    icon: ShieldCheck,
    link: "/client/bantuan/faq?category=maintenance",
  },
  {
    title: "Tagihan & Pembayaran",
    desc: "Bantuan mengenai invoice dan pembayaran",
    icon: CreditCard,
    link: "/client/bantuan/faq?category=tagihan",
  },
  {
    title: "Dokumen & Kontrak",
    desc: "Dokumen, kontrak, dan serah terima",
    icon: FileText,
    link: "/client/bantuan/faq?category=dokumen",
  },
];
const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/client/",
  },
  {
    label: "Bantuan",
  },
];
const whatsappUrl = computed(() => {
  const number = "6282353731276";
  const text = encodeURIComponent(
    "Halo Admin Appfoundry, saya ingin bertanya...",
  );
  return `https://wa.me/${number}?text=${text}`;
});
</script>
