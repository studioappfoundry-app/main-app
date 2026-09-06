<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground overflow-x-hidden">
    <!-- Breadcrumb -->
    <Breadcumb :items="breadcrumbItems" />

    <!-- Page Header -->
    <header class="mb-6">
      <h1 class="text-2xl font-bold tracking-tight text-foreground">
        Pusat Pertanyaan
      </h1>
      <p class="text-sm text-secondary mt-1">
        Temukan jawaban atas pertanyaan umum seputar layanan Appfoundry Studio.
      </p>
    </header>

    <!-- Search -->
    <div class="mb-6">
      <Input
        v-model="searchQuery"
        type="search"
        placeholder="Cari pertanyaan atau jawaban ..."
        class="w-full"
        size="lg"
        max-width="100vw"
      >
        <template #icon-left>
          <Search />
        </template>
      </Input>
    </div>

    <!-- Category Tabs: Desktop -->
    <div class="border-b border-border mb-6 hidden md:block">
      <Splide :options="splideDesktop" aria-label="Kategori FAQ">
        <SplideSlide v-for="cat in allCategories" :key="cat.slug">
          <button
            type="button"
            @click="setCategory(cat.slug)"
            :class="[
              'pb-3 transition-colors relative',
              activeCategory === cat.slug
                ? 'text-primary font-semibold'
                : 'text-secondary hover:text-foreground',
            ]"
          >
            {{ cat.name }}
            <span
              v-if="activeCategory === cat.slug"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
            />
          </button>
        </SplideSlide>
      </Splide>
    </div>

    <!-- Category Tabs: Mobile -->
    <div class="md:hidden mb-6">
      <Splide :options="splideOptions" aria-label="Kategori FAQ">
        <SplideSlide v-for="cat in allCategories" :key="cat.slug">
          <button
            type="button"
            @click="setCategory(cat.slug)"
            :class="[
              'whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
              activeCategory === cat.slug
                ? 'bg-primary text-white'
                : 'text-secondary hover:text-foreground',
            ]"
          >
            {{ cat.name }}
          </button>
        </SplideSlide>
      </Splide>
    </div>

    <!-- Empty State -->
    <div v-if="filteredFaqs.length === 0" class="max-w-2xl mx-auto mb-8">
      <div
        class="bg-background border border-border rounded-2xl p-8 md:p-12 shadow-app text-center space-y-6"
      >
        <div
          class="w-20 h-20 rounded-lg bg-surface-soft flex items-center justify-center mx-auto"
        >
          <MessageCircleQuestion class="w-10 h-10 text-muted" />
        </div>
        <div class="space-y-2">
          <h2 class="text-xl font-bold text-foreground">
            Pertanyaan Tidak Ditemukan
          </h2>
          <p class="text-sm text-secondary max-w-sm mx-auto">
            Silakan tanyakan langsung kepada Admin melalui WhatsApp, tim kami
            siap membantu Anda.
          </p>
        </div>
        <Button variant="solid">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2"
          >
            <MessageSquare class="w-4 h-4" />
            Chat WhatsApp
          </a>
        </Button>
      </div>
    </div>

    <!-- FAQ Groups -->
    <div v-else class="space-y-6 mb-6">
      <section v-for="group in groupedFaqs" :key="group.categoryId">
        <!-- Group Title -->
        <div
          v-if="activeCategory === 'all' || searchQuery"
          class="flex items-center gap-2 mb-4"
        >
          <h2 class="text-sm font-bold text-foreground">
            {{ group.categoryName }}
          </h2>
          <Badge variant="neutral" size="sm">
            {{ group.items.length }}
          </Badge>
        </div>

        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app"
        >
          <div class="space-y-1 divide-y divide-border">
            <div
              v-for="item in group.visibleItems"
              :key="item.id"
              class="overflow-hidden transition-all duration-300"
            >
              <button
                type="button"
                @click="toggleFaq(item.id)"
                class="group flex w-full items-center justify-between py-4 text-left focus:outline-none"
              >
                <span
                  class="pr-4 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary"
                >
                  {{ item.question }}
                </span>

                <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                  :class="
                    activeKey === item.id
                      ? 'bg-foreground text-background'
                      : 'border border-border bg-card text-muted'
                  "
                >
                  <Plus
                    :size="16"
                    :class="{ 'rotate-45': activeKey === item.id }"
                    class="transition-transform duration-300"
                  />
                </span>
              </button>

              <div
                class="grid transition-[grid-template-rows] duration-300 ease-in-out"
                :class="
                  activeKey === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                "
              >
                <div class="overflow-hidden">
                  <p
                    class="pb-4 pr-10 text-sm leading-relaxed text-muted whitespace-pre-wrap"
                  >
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Show All -->
        <div v-if="group.hasMore" class="mt-4 text-center">
          <Button
            variant="soft-primary"
            size="sm"
            @click="showAllForCategory(group.categoryId)"
          >
            <div class="flex items-center gap-2">
              Tampilkan Semua
              <ChevronRight :size="14" class="rotate-90" />
            </div>
          </Button>
        </div>
      </section>
    </div>

    <!-- Banner Bantuan -->
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
          <h4 class="text-base font-bold text-foreground">Punya pertanyaan?</h4>
          <p class="text-xs text-secondary">
            Tim kami siap membantu Anda memilih paket yang paling tepat.
          </p>
        </div>
      </div>
      <Button variant="soft-warning" size="sm">
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 px-4"
        >
          <MessageSquare class="w-4 h-4" />
          Hubungi Kami
        </a>
      </Button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "bantuan",
  title: "FAQ",
});
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import {
  Search,
  Plus,
  MessageSquare,
  MessageCircleQuestion,
  ChevronRight,
  AlertCircle,
} from "~/utils/icons";
import { faqCategories, getCategoryBySlug, getAllFaqItems } from "~/utils/faq";

const breadcrumbItems = [
  { label: "Dashboard", to: "/client/" },
  { label: "Bantuan", to: "/client/bantuan" },
  { label: "FAQ" },
];

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const DEFAULT_LIMIT = 6;
const ALL_SLUG = "all";

const searchQuery = ref("");
const activeCategory = ref(ALL_SLUG);
const activeKey = ref(null);
const showAllMap = ref({});

const allCategories = computed(() => [
  { id: "all", name: "Semua", slug: ALL_SLUG },
  ...faqCategories,
]);

const splideOptions = {
  autoWidth: true,
  gap: "0.5rem",
  arrows: false,
  pagination: false,
  drag: "free",
  snap: true,
};
const splideDesktop = {
  autoWidth: true,
  gap: "1.5rem",
  arrows: false,
  pagination: false,
  drag: "free",
  snap: true,
};
const whatsappUrl = computed(() => {
  const number = config.public?.whatsappAdmin || "6282353731276";
  const text = encodeURIComponent(
    "Halo Admin Appfoundry, saya ingin bertanya...",
  );
  return `https://wa.me/${number}?text=${text}`;
});

const filteredFaqs = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim();
  let items = [];

  if (activeCategory.value === ALL_SLUG) {
    items = getAllFaqItems();
  } else {
    const cat = getCategoryBySlug(activeCategory.value);
    if (cat && cat.items) {
      items = cat.items.map((item) => ({
        ...item,
        categoryId: cat.id,
        categoryName: cat.name,
      }));
    }
  }

  if (!keyword) return items;

  return items.filter(
    (item) =>
      item.question.toLowerCase().includes(keyword) ||
      item.answer.toLowerCase().includes(keyword),
  );
});

const groupedFaqs = computed(() => {
  const groups = {};

  for (const item of filteredFaqs.value) {
    const catId = item.categoryId;
    if (!groups[catId]) {
      groups[catId] = {
        categoryId: catId,
        categoryName: item.categoryName,
        items: [],
        visibleItems: [],
        hasMore: false,
      };
    }
    groups[catId].items.push(item);
  }

  for (const catId in groups) {
    const group = groups[catId];
    const showAll =
      showAllMap.value[catId] || searchQuery.value.trim().length > 0;

    if (showAll) {
      group.visibleItems = group.items;
      group.hasMore = false;
    } else {
      group.visibleItems = group.items.slice(0, DEFAULT_LIMIT);
      group.hasMore = group.items.length > DEFAULT_LIMIT;
    }
  }

  return Object.values(groups);
});

const setCategory = (slug) => {
  activeCategory.value = slug;
  showAllMap.value = {};
  activeKey.value = null;

  router.replace({
    path: "/client/bantuan/faq",
    query: slug === ALL_SLUG ? {} : { category: slug },
  });
};

const toggleFaq = (id) => {
  activeKey.value = activeKey.value === id ? null : id;
};

const showAllForCategory = (categoryId) => {
  showAllMap.value[categoryId] = true;
};

const syncCategoryFromUrl = () => {
  const slug = route.query.category;
  const validSlugs = allCategories.value.map((c) => c.slug);

  if (slug && validSlugs.includes(slug)) {
    activeCategory.value = slug;
  } else {
    activeCategory.value = ALL_SLUG;
  }
};

watch(
  () => route.query.category,
  () => {
    syncCategoryFromUrl();
  },
  { immediate: false },
);

watch(searchQuery, () => {
  activeKey.value = null;
});

onMounted(() => {
  syncCategoryFromUrl();
});

useHead(() => ({
  title: "FAQ — Appfoundry Studio",
  meta: [
    {
      name: "description",
      content:
        "Temukan jawaban atas pertanyaan umum seputar layanan website, SEO, maintenance, tagihan, dan support Appfoundry Studio.",
    },
  ],
  link: [{ rel: "canonical", href: "https://appfoundry.studio/faq" }],
}));
</script>
