<template>
  <Navbar menu="Beranda" />
  <main class="flex-col flex items-center mt-15 p-4 xl:p-0 overflow-x-hidden">
    <!-- Chat Fab -->
    <section id="chat-fab" class="flex justify-center">
      <div
        ref="chatComposerFab"
        class="chat-fab z-99999999 flex justify-center"
        :class="{ 'is-expanded': isChatOpen }"
        @click.stop
      >
        <!-- STATE: FAB -->
        <button
          v-if="!isChatOpen"
          class="chat-fab-trigger text-sm md:text-base w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] h-[8vh] xl:h-[10vh]"
          type="button"
          @click="isChatOpen = true"
        >
          <span>Ceritakan bisnis yang sedang kamu bangun...</span>
        </button>

        <!-- STATE: COMPOSER -->
        <div v-else class="chat-composer w-[90vw]">
          <div class="chat-input-wrapper">
            <Input
              v-model="chatText"
              type="textarea"
              maxWidth="100%"
              rows="6"
              size="lg"
              class="chat-input"
              placeholder="Ceritakan bisnis yang sedang kamu bangun..."
            />
          </div>

          <div class="chat-submit-footer">
            <Button variant="solid" size="md" @click="doSomething">
              <span class="flex items-center gap-2">
                Mulai Gratis
                <MoveRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section id="hero" class="max-w-full md:max-w-3xl md:mx-auto">
      <LazyOrbHeader :opacity="1.0" :line-intensity="2.0" />

      <div class="hero-content flex justify-center flex-col">
        <h1
          class="leading-none text-5xl md:text-6xl lg:text-7xl font-serif mb-0"
        >
          <em>The Professional <span class="text-muted">Web Builder</span></em>
        </h1>
        <p class="text-base md:text-lg leading-none m-0 mt-2">
          Website profesional untuk membantu bisnis tampil lebih meyakinkan,
          ditemukan lebih mudah, dan siap berkembang
        </p>
      </div>
      <div class="flex justify-center">
        <div class="chat-composer w-full" ref="chatComposerRef">
          <!-- Bungkus Input dengan div -->
          <div class="chat-input-wrapper">
            <Input
              v-model="chatText"
              type="textarea"
              maxWidth="100%"
              rows="6"
              size="lg"
              class="chat-input"
              placeholder="Ceritakan bisnis yang sedang kamu bangun..."
            />
          </div>

          <!-- Wrapper untuk tombol (background hitam) -->
          <div class="chat-submit-footer">
            <Button variant="solid" size="md">
              <span class="flex items-center gap-2">
                Mulai Gratis
                <MoveRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section id="slide-premium" class="pt-10 mt-5">
      <div
        class="relative flex bg-card h-[60vh] md:h-[80vh] w-[100vw] lg:w-[90vw] xl:w-6xl overflow-hidden lg:rounded-2xl xl:rounded-4xl transition-colors duration-300"
      >
        <div
          class="absolute bottom-5 left-5 right-5 xl:bottom-10 xl:left-10 xl:right-10 z-50"
        >
          <p class="text-xl font-semibold text-foreground">
            Premium & Professional
          </p>
          <p class="text-muted text-md leading-none">
            Desain modern yang membangun kesan <br />pertama dan kepercayaan
            pelanggan.
          </p>
        </div>
        <div
          class="absolute -bottom-100 -right-500 md:-right-450 lg:-right-430"
        >
          <RadialAngle :radius="968" :item-size="484" :angle-step="38" />
        </div>
      </div>
    </section>
    <section
      id="chip"
      class="py-10 my-10 mb-10 w-full flex flex-col items-start max-w-full lg:max-w-[90vw] xl:max-w-6xl"
    >
      <div class="mb-10">
        <h2
          class="text-4xl font-bold text-foreground tracking-tight font-serif transition-colors duration-300"
        >
          Ceritakan Bisnismu
        </h2>
        <p
          class="mt-3 text-muted text-sm sm:text-base transition-colors duration-300"
        >
          Pilih bidang bisnismu, lalu biarkan kami membantu membangun website
          yang sesuai.
        </p>
      </div>
      <div
        class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 sm:gap-6 mt-3"
      >
        <Card
          v-for="item in dataCard"
          :key="item.fondasi"
          :selected="selectedBusiness === item.fondasi"
          class="w-full cursor-pointer shadow-lg"
          bg-color="var(--card)"
          hover-bg-color="var(--background)"
          @click="selectBusiness(item)"
        >
          <div>
            <strong class="text-sm text-foreground">{{ item.fondasi }}</strong>
            <p class="text-sm text-muted">{{ item.sub }}</p>
          </div>
        </Card>
      </div>
    </section>
    <section
      id="works"
      class="py-10 mb-10 mb-10 w-full flex flex-col items-start max-w-full lg:max-w-[90vw] xl:max-w-6xl"
    >
      <div class="mb-10">
        <h2
          class="text-4xl font-bold text-foreground tracking-tight font-serif transition-colors duration-300"
        >
          Bagaimana Cara Kerjanya
        </h2>
        <p
          class="mt-3 text-muted text-sm sm:text-base transition-colors duration-300"
        >
          Dari cerita bisnis menjadi website profesional dalam beberapa langkah
          sederhana.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 min-h-[400px] items-center"
      >
        <!-- 01. Ceritakan Bisnismu -->
        <div
          class="group bg-card rounded-2xl p-6 lg:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[380px] shadow-lg hover:md:shadow-2xl hover:shadow-xl transition-all duration-300 order-1 hover:-translate-y-4"
        >
          <!-- angka: lebih besar, lebih ghosted, kasih leading-none biar rapat ke atas -->
          <span
            class="text-6xl lg:text-7xl text-muted opacity-50 font-light leading-none"
            >01.</span
          >
          <div class="mt-8 lg:mt-10">
            <!-- chip icon: warna independen dari bg card, konsisten di semua card -->
            <div
              class="w-12 h-12 rounded-xl bg-background text-muted flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-background transition-colors"
            >
              <MessageSquare width="1.2rem" height="1.2rem" />
            </div>
            <h3 class="text-xl font-medium text-foreground">
              Ceritakan Bisnismu
            </h3>
            <p class="mt-1 text-sm text-muted leading-relaxed max-w-sm">
              Ceritakan produk, target pelanggan, dan tujuan bisnismu — kami
              dengarkan dulu sebelum mulai bangun.
            </p>
          </div>
        </div>

        <!-- 02. Kami Bangun (Featured) -->
        <div
          class="group relative bg-surface rounded-2xl overflow-hidden shadow-xl hover:md:shadow-2xl hover:shadow-xl transition-all duration-300 order-1 md:col-span-2 lg:col-span-1 lg:order-2 z-10 hover:-translate-y-4"
        >
          <!-- bg-card sama kayak card lain, bukan bg-background sendiri -->
          <div
            class="h-48 sm:h-52 md:h-56 lg:h-64 w-full relative overflow-hidden bg-gradient-to-br from-[#eafaf8] via-[#bdeee7] to-[#7fd8cb]"
          >
            <!-- glow blobs blur, kasih depth sebelum garis mesh -->
            <div
              class="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/40 blur-3xl"
            ></div>
            <div
              class="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-teal-600/20 blur-3xl"
            ></div>

            <svg
              class="absolute inset-0 w-full h-full"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="meshA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stop-color="var(--background)"
                    stop-opacity="0.9"
                  />
                  <stop offset="50%" stop-color="#26a69a" stop-opacity="0.5" />
                  <stop
                    offset="100%"
                    stop-color="var(--background)"
                    stop-opacity="0.15"
                  />
                </linearGradient>
              </defs>
              <!-- multi-layer flowing lines, gantiin 2 path datar sebelumnya -->
              <g stroke="url(#meshA)" fill="none" stroke-width="1">
                <path
                  d="M-20,140 C60,80 140,180 220,90 S380,40 420,110"
                  stroke-opacity="0.9"
                />
                <path
                  d="M-20,120 C60,60 140,160 220,70 S380,20 420,90"
                  stroke-opacity="0.7"
                />
                <path
                  d="M-20,100 C60,40 140,140 220,50 S380,0 420,70"
                  stroke-opacity="0.5"
                />
                <path
                  d="M-20,160 C60,100 140,200 220,110 S380,60 420,130"
                  stroke-opacity="0.6"
                />
                <path
                  d="M-20,180 C60,120 140,220 220,130 S380,80 420,150"
                  stroke-opacity="0.4"
                />
              </g>
            </svg>
          </div>

          <div class="p-6 lg:p-8">
            <div
              class="w-12 h-12 rounded-xl bg-background text-muted flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-background transition-colors"
            >
              <Blocks width="1.2rem" height="1.2rem" />
            </div>
            <h3 class="text-xl font-medium text-foreground">Kami Bangun</h3>
            <p class="mt-1 text-sm text-muted leading-relaxed max-w-sm">
              Kami ubah kebutuhanmu menjadi website profesional untuk membantu
              bisnismu tampil secara digital.
            </p>
          </div>
        </div>

        <!-- 03. Review & Sempurnakan -->
        <div
          class="group bg-card rounded-2xl p-6 lg:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[380px] shadow-lg hover:md:shadow-2xl hover:shadow-xl transition-all duration-300 order-3 hover:-translate-y-4"
        >
          <span
            class="text-6xl lg:text-7xl text-muted opacity-50 font-light leading-none"
            >03.</span
          >
          <div class="mt-8 lg:mt-10">
            <div
              class="w-12 h-12 rounded-xl bg-background text-muted flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-background transition-colors"
            >
              <ClipboardCheck width="1.2rem" height="1.2rem" />
            </div>
            <h3 class="text-xl font-medium text-foreground">
              Review & Sempurnakan
            </h3>
            <p class="mt-1 text-sm text-muted leading-relaxed max-w-sm">
              Kamu cek hasilnya, kasih masukan, kami revisi sampai benar-benar
              pas dengan visimu.
            </p>
          </div>
        </div>

        <!-- 04. Siap Diluncurkan -->
        <div
          class="group bg-card rounded-2xl p-6 lg:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[380px] shadow-lg hover:md:shadow-2xl hover:shadow-xl transition-all duration-300 order-4 hover:-translate-y-4"
        >
          <span
            class="text-6xl lg:text-7xl text-muted opacity-50 font-light leading-none"
            >04.</span
          >
          <div class="mt-8 lg:mt-10">
            <div
              class="w-12 h-12 rounded-xl bg-background text-muted flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-background transition-colors"
            >
              <Rocket width="1.2rem" height="1.2rem" />
            </div>
            <h3 class="text-xl font-medium text-foreground">
              Siap Diluncurkan
            </h3>
            <p class="mt-1 text-sm text-muted leading-relaxed max-w-sm">
              Website live, kamu tinggal fokus jalankan bisnis — kami siap bantu
              kalau ada yang perlu disesuaikan.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
      id="benefit"
      class="my-10 max-w-full w-full lg:max-w-[90vw] xl:max-w-6xl"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 sm:gap-6"
      >
        <div
          class="bg-card relative rounded-2xl p-6 lg:col-start-1 lg:row-start-1 flex flex-col items-center justify-center overflow-hidden min-h-[350px] transition-colors duration-300"
        >
          <div class="absolute bottom-4 left-4 right-4 z-50">
            <p class="text-sm font-bold text-foreground">Dashboard Dinamis</p>
            <p class="text-muted text-sm leading-none">
              Kelola website dengan mudah melalui dashboard yang intuitif.
            </p>
          </div>
          <CardStack
            class="mb-15"
            width="40%"
            height="40%"
            :slides="[
              { image: '/stack/stack-1.png', alt: 'Sales tracking' },
              { image: '/stack/stack-2.png', alt: 'Task management' },
              { image: '/stack/stack-3.png', alt: 'Store analytics' },
            ]"
          />
        </div>

        <div
          class="relative bg-card rounded-2xl lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col items-center justify-center transition-colors duration-300 min-h-[350px]"
        >
          <div class="absolute bottom-4 left-4 right-4 z-50">
            <p class="text-sm font-bold text-foreground">SEO & GEO</p>
            <p class="text-muted text-sm leading-none">
              Bantu bisnis lebih mudah ditemukan di Google dan mesin pencarian
              AI.
            </p>
          </div>
          <LazyLineChart
            title="Impression"
            :value="24680"
            :data="lineData"
            type="Impressi"
            color="var(--primary)"
          />
        </div>

        <div
          class="relative bg-card rounded-2xl p-5 lg:col-start-3 lg:row-start-1 flex flex-col items-center justify-start lg:justify-center transition-colors duration-300 min-h-[250px]"
        >
          <div class="absolute bottom-4 left-4 right-4 z-50">
            <p class="text-sm font-bold text-foreground">High Performance</p>
            <p class="text-muted text-sm leading-none">
              Website cepat, ringan, dan tetap responsif di berbagai perangkat.
            </p>
          </div>
          <LazySpeedometerCard :value="95" :size="220" />
        </div>

        <div
          class="relative bg-card rounded-2xl lg:col-start-1 lg:row-start-2 flex flex-col items-start jusitfy-start lg:justify-center overflow-hidden transition-colors duration-300 min-h-[300px]"
        >
          <div class="absolute bottom-4 left-4 right-4 z-50">
            <p class="text-sm font-bold text-foreground">Mobile Friendly</p>
            <p class="text-muted text-sm leading-none">
              Nyaman digunakan di smartphone, tablet, maupun desktop.
            </p>
          </div>
          <LazyCursorTilt
            class="mb-20"
            desktop-image="/pointer/desktop.png"
            mobile-image="/pointer/hp.png"
            :max-tilt="10"
          />
        </div>

        <div
          class="relative bg-card rounded-2xl p-5 lg:col-start-3 lg:row-start-2 flex flex-col justify-start lg:justify-center items-center transition-colors duration-300 min-h-[300px]"
        >
          <div class="absolute bottom-4 left-4 right-4 z-50">
            <p class="text-sm font-bold text-foreground">
              Secure and Maintened
            </p>
            <p class="text-muted text-sm leading-none">
              Website dipantau dan dirawat agar tetap aman dan optimal.
            </p>
          </div>
          <LazyRadarChips class="mb-15" />
        </div>
      </div>
    </section>
    <section id="number" class="w-full flex flex-col items-center my-10 mt-20">
      <div
        class="text-5xl mb-3"
        style="color: var(--primary)"
        aria-label="Professional and Premium"
      >
        <span v-for="i in 5" :key="i">★</span>
      </div>

      <p class="text-muted text-base transition-colors duration-300">
        Professional & Premium
      </p>

      <div
        class="w-full social-proof-count text-4xl md:text-6xl lg:text-8xl font-bold mt-10 mb-3 text-center text-foreground transition-colors duration-300"
      >
        Built for Business
      </div>

      <p
        class="text-muted text-base text-center transition-colors duration-300"
      >
        Professional websites and web applications, built with care.
      </p>
    </section>
    <section id="faq" class="mb-10 mt-20 w-full lg:max-w-[90vw] xl:max-w-6xl">
      <div class="mb-10">
        <h2
          class="text-4xl font-bold text-foreground tracking-tight font-serif transition-colors duration-300"
        >
          FAQ
        </h2>
        <p
          class="mt-3 text-muted text-base text-sm sm:text-base transition-colors duration-300"
        >
          Pertanyaan yang sering diajukan seputar layanan Appfoundry Studio.
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="overflow-hidden transition-all duration-300 border-bottom"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex items-center justify-between p-5 text-left focus:outline-none"
          >
            <span
              class="font-semibold text-foreground text-base sm:text-lg pr-4 transition-colors duration-300"
            >
              {{ faq.question }}
            </span>
            <span
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300"
              :class="
                activeIndex === index
                  ? 'bg-[var(--foreground)] text-[var(--background)]'
                  : 'bg-card text-muted border border-border'
              "
            >
              <Plus
                :class="activeIndex === index ? 'rotate-45' : ''"
                class="transition-transform duration-300"
              />
            </span>
          </button>

          <div
            class="faq-answer-wrapper"
            :class="{ open: activeIndex === index }"
          >
            <div class="faq-answer-inner">
              <p
                class="px-5 pb-5 text-muted leading-relaxed text-sm sm:text-base transition-colors duration-300"
              >
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="splide" class="relative w-full mb-10 mt-20">
      <h2
        class="text-2xl text-muted font-semibold tracking-tight text-center transition-colors duration-300"
      >
        Dibangun dengan teknologi modern
      </h2>
      <ClientOnly>
        <div class="logo-slider-container">
          <Splide
            ref="SplideJS"
            :options="Splideoptions"
            aria-label="Technology Logos Slider"
            @mouseenter="pauseSlider"
            @mouseleave="playSlider"
            @focusin="pauseSlider"
            @focusout="playSlider"
          >
            <SplideSlide v-for="(logo, index) in logos" :key="index">
              <div class="logo-wrapper">
                <img
                  :src="logo.src"
                  :alt="logo.name"
                  class="logo-img h-[44px] md:h-[50px] lg:h-[68px]"
                />
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </ClientOnly>
    </section>
    <section id="cta" class="final-cta pb-26 mt-15">
      <div class="final-cta-bg"></div>
      <div class="container" style="position: relative">
        <h2
          class="font-bold leading-none text-foreground transition-colors duration-300"
        >
          Stop describing your idea to
          <span class="font-serif">friends.</span> Start building it.
        </h2>
        <p
          class="mt-10 ml-auto mr-auto mb-10 text-muted transition-colors duration-300"
        >
          Ceritakan ide bisnismu. Kami bantu mengubahnya menjadi website yang
          siap diluncurkan.
        </p>
        <Button variant="solid" size="md" @click="openchat">
          <span class="flex items-center gap-2">
            Mulai Ceritakan Bisnismu
            <MoveRight />
          </span>
        </Button>
      </div>
    </section>
  </main>
  <Footer />
</template>
<script setup>
import { ref, nextTick, onMounted, onBeforeMount } from "vue";
import {
  MoveRight,
  Plus,
  MessageSquare,
  Blocks,
  ClipboardCheck,
  Rocket,
} from "~/utils/icons";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

const chatText = ref("");
const isChatOpen = ref(false);
const chatComposerFab = ref(null);
const chatComposerRef = ref(null);
const SplideJS = ref(null);

const lineData = ref([
  { label: "Jan", value: 1000 },
  { label: "Feb", value: 3000 },
  { label: "Mar", value: 4200 },
  { label: "Apr", value: 5700 },
  { label: "May", value: 8800 },
]);

const dataCard = [
  {
    fondasi: "Kuliner & Hospitality",
    sub: "Kafe, restoran, hotel, dan akomodasi",
    prompt: "untuk bisnis kafe, restoran, hotel, atau akomodasi.",
  },
  {
    fondasi: "Ritel & E-Commerce",
    sub: "Toko, produk, dan pengalaman belanja",
    prompt: "untuk toko atau bisnis e-commerce.",
  },
  {
    fondasi: "Fashion & Kecantikan",
    sub: "Brand, koleksi, dan layanan perawatan",
    prompt: "untuk brand fashion atau bisnis kecantikan.",
  },
  {
    fondasi: "Jasa & Profesional",
    sub: "Agensi, konsultan, dan penyedia jasa",
    prompt: "untuk bisnis jasa, agensi, atau konsultan.",
  },
  {
    fondasi: "Pendidikan & Organisasi",
    sub: "Sekolah, komunitas, dan organisasi",
    prompt: "untuk sekolah, komunitas, atau organisasi.",
  },
  {
    fondasi: "Kesehatan & Kebugaran",
    sub: "Klinik, perawatan, dan layanan kesehatan",
    prompt: "untuk klinik atau bisnis kesehatan dan kebugaran.",
  },
  {
    fondasi: "Properti & Konstruksi",
    sub: "Hunian, proyek, dan pengembangan",
    prompt: "untuk bisnis properti atau konstruksi.",
  },
  {
    fondasi: "Teknologi & Kreatif",
    sub: "Startup, software, dan karya digital",
    prompt: "untuk startup, software, atau bisnis kreatif digital.",
  },
  {
    fondasi: "Industri & Otomotif",
    sub: "Manufaktur, agribisnis, dan otomotif",
    prompt: "untuk bisnis manufaktur, agribisnis, atau otomotif.",
  },
];
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

// Konfigurasi Splide untuk efek berjalan terus (marquee effect)
const Splideoptions = {
  type: "loop",
  drag: "free",
  focus: 0,
  autoWidth: true,

  gap: "3rem",

  arrows: false,
  pagination: false,

  autoplay: true,
  interval: 0,
  speed: 80000,
  pauseOnHover: true,
  pauseOnFocus: true,
  breakpoints: {
    768: {
      gap: "1rem",
    },

    480: {
      gap: "0rem",
    },
  },
};
const pauseSlider = () => {
  SplideJS.value?.splide?.Components.Autoplay.pause();
};

const playSlider = () => {
  SplideJS.value?.splide?.Components.Autoplay.play();
};
// Data dummy logo teknologi (Menggunakan Simple Icons CDN agar berwarna)
const logos = [
  { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Vue.js", src: "https://cdn.simpleicons.org/vuedotjs/42b883" },
  { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Angular", src: "https://cdn.simpleicons.org/angular/DD0031" },
  { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "MySQL", src: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", src: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "SQLite", src: "https://cdn.simpleicons.org/sqlite/003B57" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Python", src: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Docker", src: "https://cdn.simpleicons.org/docker/2496ED" },
];
const handleClickOutside = () => {
  if (!isChatOpen.value) return;

  isChatOpen.value = false;
};
// Set index pertama (0) agar terbuka secara default saat halaman di-load
const activeIndex = ref(0);

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const selectedBusiness = ref("");

const selectBusiness = async (item) => {
  const text = "Saya ingin membangun website ";
  selectedBusiness.value = item.fondasi;
  chatText.value = text + item.prompt;

  // Tunggu DOM selesai update, lalu geser ke chatbot
  await nextTick();

  chatComposerRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const ticking = ref(false);

const handleScroll = () => {
  if (ticking.value) return;

  ticking.value = true;

  requestAnimationFrame(() => {
    if (!chatComposerFab.value) {
      ticking.value = false;
      return;
    }
    if (window.scrollY >= 510 && window.scrollY < 3651) {
      chatComposerFab.value.classList.add("slide-up");
    } else {
      chatComposerFab.value.classList.remove("slide-up");
    }
    ticking.value = false;
  });
};
const openchat = async () => {
  await nextTick();

  chatComposerRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.addEventListener("click", handleClickOutside);
});
// const
useHead({
  title: "Appfoundry ── Bangun Bisnismu, Sesuai Keinginanmu",
});
</script>

<style scoped>
.chat-composer {
  display: flex;
  flex-direction: column;
  z-index: 999;
}

.chat-input-wrapper {
  width: 100%;
}

/* Area background hitam di bawah */
.chat-submit-footer {
  width: 100%;
  background-color: var(
    --card
  ) !important; /* Menggunakan foreground (dark/light) */
  padding: 8px 12px;

  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  margin-top: -4px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 100;
  transition: background-color 0.3s ease;
}

/* Modifikasi input agar sudut bawahnya rata (karena dihubungkan ke div hitam) */
:deep(.chat-input) {
  background-color: var(--card) !important;
  padding: 0 !important;
  /* Samakan lengungan bawah input menjadi 0 agar menyatu mulus dengan area hitam */
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;

  /* Hilangkan border bawah jika ada, agar tidak ada garis pemisah */
  border: none !important;
  box-shadow: none !important;
  color: var(--foreground) !important;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh; /* Atau tinggi yang diinginkan, misal 80vh */
  min-height: 600px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* Konten diletakkan di atas canvas */
.hero-content {
  position: relative;
  z-index: 10; /* Lebih tinggi dari canvas (canvas default z-index 0) */
  text-align: center;
  padding: 2rem;
  /* pointer-events: none; -> Jangan pakai ini jika ada button/form di dalam sini */
}

.hero-content h1 {
  font-weight: 700;
  color: var(--foreground);
  letter-spacing: -0.03em;
  transition: color 0.3s ease;
}

.hero-content p {
  color: var(--muted);
  line-height: 1.6;
  transition: color 0.3s ease;
}

.cta-button {
  padding: 0.9rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  background: var(--foreground);
  color: var(--background);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.cta-button:hover {
  background: var(--primary);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    min-height: 500px;
  }
}

.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-in-out;
  border-bottom: 1px solid var(--border);
}

.faq-answer-wrapper.open {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}
.final-cta {
  text-align: center;
  position: relative;
}
.final-cta-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 60% at 50% 30%,
    color-mix(in srgb, var(--primary) 13%, transparent),
    transparent 70%
  );
  pointer-events: none;
}
.final-cta h2 {
  font-size: clamp(36px, 5vw, 60px);
  margin-bottom: 20px;
  max-width: 18ch;
  margin-left: auto;
  margin-right: auto;
}
.final-cta h2 .serif {
  color: var(
    --amber,
    #f59e0b
  ); /* Fallback warna amber jika tidak didefinisikan */
}
.final-cta p {
  font-size: 17px;
  color: var(--muted);
  max-width: 52ch;
}
/* Logo App Perusahan Besar Teknologi IT */
.logo-slider-container {
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
  /* Opsional: tambahkan gradient fade di kiri & kanan agar terlihat lebih elegan */
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px; /* Sesuaikan lebar wrapper */
}

.logo-img {
  width: auto;
  /* Default state: Grayscale */
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Hover state: Kembali berwarna */
.logo-img:hover {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.15); /* Sedikit membesar saat di hover */
}

/* chat fab */
.chat-fab {
  position: fixed;
  left: 50%;
  bottom: -10%;
  z-index: 100;
  width: 320px;
  transform: translateX(-50%);

  transition:
    width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    bottom 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.chat-fab.slide-up {
  bottom: 5%;
}
/* =========================
   FAB
========================= */

.chat-fab-trigger {
  position: fixed;
  left: 50%;
  display: flex;
  align-items: center;
  padding: 0 18px;

  border: 1px solid var(--border);
  border-radius: 999px;

  background: var(--card);

  color: var(--muted);
  text-align: left;

  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 2px 6px rgba(0, 0, 0, 0.04);

  cursor: pointer;
  transform: translate(-50%, -90%);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.3s ease,
    color 0.3s ease;
}

.chat-fab-trigger:hover {
  transform: translate(-50%, -90%);
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.25),
    0 3px 8px rgba(0, 0, 0, 0.05);
}

.chat-fab-trigger span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* =========================
   EXPANDED
========================= */

.chat-fab.is-expanded {
  width: min(680px, calc(100vw - 32px));
  bottom: 24px;
}

.chat-composer {
  overflow: hidden;

  border: 1px solid var(--card);
  border-radius: 20px;
  background: var(--card);

  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.14),
    0 5px 15px rgba(0, 0, 0, 0.06);

  animation: composer-expand 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.chat-input-wrapper {
  padding: 14px 16px 8px;
}

.chat-input {
  width: 100%;
}

.chat-submit-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  background: var(--foreground); /* Ubah dari #111 ke variabel foreground */
}

.chat-submit-footer button {
  border-radius: 10px;
}

/* =========================
   ANIMATION
========================= */

@keyframes composer-expand {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
