import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: false,
  },

  modules: ["@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [
      // diagnosticPlugin,
      tailwindcss(),
      Icons({ compiler: "vue3" }),
      Components({
        resolvers: [IconsResolver({ prefix: "i" })],
        dts: true, // biar auto-generate components.d.ts untuk type support
      }),
    ],
    optimizeDeps: { include: ["gsap", "three", "@splidejs/vue-splide"] },
  },

  imports: {
    dirs: [
      "composables",
      "composables/**",
      "utils",
      "utils/**",
      "stores",
      "dummy",
      "stores/**",
    ],
  },

  components: [
    { path: "~/components/design", pathPrefix: false },
    { path: "~/components/gallery", pathPrefix: false },
    { path: "~/components/shared", pathPrefix: false },
    { path: "~/components/logo", pathPrefix: true },
  ],

  app: {
    baseURL: "/main-app/",
    head: {
      title: "Component Gallery — Durable-inspired UI",

      meta: [
        {
          name: "description",
          content:
            "A considered collection of interactive interface components and states.",
        },
      ],

      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-icon.png",
        },
      ],
    },
  },
  nitro: {
    preset: "github_pages",

    prerender: {
      crawlLinks: false,
      routes: ["/"],
    },
  },
});
