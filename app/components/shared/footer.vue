<template>
  <footer class="bg-card text-foreground w-full transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
      <!-- Top Section -->
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-end gap-12 md:gap-8 pt-10 md:pt-26 pb-8 md:pb-15 lg:min-h-[50vh] min-h-[35vh]"
      >
        <!-- Logo Placeholder -->
        <div class="flex md:flex-col flex-row gap-0 gap-4 md:gap-0">
          <Iconography :boxWidth="40" :boxHeight="40">
            <LogoIcon />
          </Iconography>
          <Iconography :boxWidth="180" :boxHeight="50">
            <LogoText :color="isDark ? '#ffffff' : '#000000'" />
          </Iconography>
        </div>

        <!-- Tagline -->
        <h2
          class="text-muted text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-bold tracking-tighter leading-[0.9] md:text-right text-left transition-colors"
        >
          BUILD<br />
          <em class="font-serif capitalize text-foreground"> What's Next.</em>
        </h2>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-border py-8 md:py-10 transition-colors">
        <div
          class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <!-- Left: Legal Link -->
          <nav>
            <a
              href="#"
              class="text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors duration-300"
            >
              KETENTUAN & KEBIJAKAN
            </a>
          </nav>

          <!-- Right & Far Right: Copyright and Button -->
          <div class="flex justify-between items-center gap-12">
            <p
              class="text-xs uppercase tracking-[0.2em] text-muted transition-colors"
            >
              © 2026 APPFOUNDRY. ALL RIGHTS RESERVED.
            </p>

            <Button
              variant="soft"
              @click="scrollToTop"
              aria-label="Back to top"
            >
              <ArrowUp :size="16" :stroke-width="2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ArrowUp } from "~/utils/icons";

const { isDark } = useDarkMode();

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>
