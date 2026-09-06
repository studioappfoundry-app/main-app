import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// const startTime = Date.now();

// const diagnosticPlugin = {
//   name: "nuxt-dev-diagnostic",

//   configureServer(server: any) {
//     const serverStart = performance.now();

//     console.log("");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log(" Nuxt Dev Diagnostic");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

//     server.middlewares.use((req: any, res: any, next: any) => {
//       const start = performance.now();

//       res.on("finish", () => {
//         const duration = performance.now() - start;
//         const status = duration >= 1000 ? "🔴" : duration >= 500 ? "⚠️" : "✓";

//         console.log(
//           `${status} ${req.method} ${req.originalUrl || req.url} ${duration.toFixed(0)}ms`,
//         );
//       });

//       next();
//     });

//     server.httpServer?.once("listening", () => {
//       const duration = performance.now() - serverStart;

//       console.log(`✓ Vite server ready: ${duration.toFixed(0)}ms`);
//       console.log(`✓ Total startup: ${Date.now() - startTime}ms`);
//       console.log("");
//       console.log("Watching requests...");
//       console.log("  ✓ <500ms");
//       console.log("  ⚠️ 500–1000ms");
//       console.log("  🔴 >1000ms");
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.log("");
//     });
//   },
// };

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
          href: "/icon.svg",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-icon.png",
        },
      ],
    },
  },
});
