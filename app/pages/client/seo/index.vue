<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <Breadcumb :items="breadcrumbItems" />
    <!-- State Switcher (Untuk Demo/Pengujian 3 Tingkatan SEO) -->
    <div
      class="flex items-center justify-between bg-background p-3 rounded-xl border border-border shadow-app"
    >
      <span class="text-sm font-semibold text-secondary"
        >Pilih Status SEO User:</span
      >
      <div class="flex gap-2">
        <button
          @click="seoStatus = 'no-active'"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            seoStatus === 'no-active'
              ? 'bg-danger-soft text-danger border border-danger/20'
              : 'bg-surface text-secondary hover:bg-background',
          ]"
        >
          Non-Aktif
        </button>
        <button
          @click="seoStatus = 'basic'"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            seoStatus === 'basic'
              ? 'bg-primary-soft text-primary border border-primary/20'
              : 'bg-surface text-secondary hover:bg-background',
          ]"
        >
          SEO Basic
        </button>
        <button
          @click="seoStatus = 'monitoring'"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            seoStatus === 'monitoring'
              ? 'bg-success-soft text-success border border-success/20'
              : 'bg-surface text-secondary hover:bg-background',
          ]"
        >
          SEO Monitoring (Premium)
        </button>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row justify-between my-4">
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-bold text-foreground tracking-tight">
          SEO & GEO
        </h1>
        <Badge :variant="seoStatus !== 'no-active' ? 'success' : 'neutral'">{{
          seoStatus === "basic"
            ? "Basic"
            : seoStatus === "monitoring"
              ? "Premium"
              : "Belum Aktif"
        }}</Badge>
      </div>
      <p class="text-sm text-secondary mt-1">
        {{
          seoStatus === "basic"
            ? "Setup & Optimasi Dasar SEO"
            : seoStatus === "premium"
              ? "Monitoring & Controlling Performa Website di Google"
              : "Aktifkan optimasi SEO untuk kebutuhan bisnis Anda."
        }}
      </p>
    </div>

    <!-- TAMPILAN 1: SEO NON-AKTIF -->
    <div v-if="seoStatus === 'no-active'">
      <!-- Hero Belum Aktif Card -->
      <div
        class="bg-background border border-border rounded-2xl p-8 text-center shadow-app space-y-6"
      >
        <div
          class="w-20 h-20 rounded-lg bg-surface-soft mx-auto flex items-center justify-center text-muted border border-border"
        >
          <Earth :size="40" class="text-secondary" />
        </div>
        <div class="max-w-md mx-auto space-y-2">
          <h2 class="text-2xl font-bold text-foreground">
            SEO dan Geo belum aktif
          </h2>
          <p class="text-sm text-secondary">
            Aktifkan fitur ini untuk memulai memantau dan mengoptimalkan
            performa website anda.
          </p>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto border-t border-border"
        >
          <div class="flex items-start space-x-3 text-left p-3">
            <div
              class="w-8 h-8 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0 mt-0.5"
            >
              <Search :size="18" />
            </div>
            <div>
              <div class="font-semibold text-sm text-foreground">
                Optimasi SEO
              </div>
              <div class="text-xs text-secondary mt-0.5">
                Pantau dan tingkatkan peringkat website Anda di mesin pencari.
              </div>
            </div>
          </div>
          <div class="flex items-start space-x-3 text-left p-3">
            <div
              class="w-8 h-8 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0 mt-0.5"
            >
              <LocationEdit :size="18" />
            </div>
            <div>
              <div class="font-semibold text-sm text-foreground">
                Analisis Geo
              </div>
              <div class="text-xs text-secondary mt-0.5">
                Analisis perkembangan website melalui mesin pencarian AI.
              </div>
            </div>
          </div>
          <div class="flex items-start space-x-3 text-left p-3">
            <div
              class="w-8 h-8 rounded-xl bg-success-soft flex items-center justify-center text-success shrink-0 mt-0.5"
            >
              <ChartBarBig :size="18" />
            </div>
            <div>
              <div class="font-semibold text-sm text-foreground">
                Data & Insight
              </div>
              <div class="text-xs text-secondary mt-0.5">
                Dapatkan insight berbasis data untuk kebutuhan bisnis Anda.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pilih Paket Section -->
      <div class="space-y-6 pt-4">
        <div class="text-center space-y-2">
          <h3 class="text-2xl font-bold text-foreground">
            Dapatkan kontrolling penuh untuk website Anda
          </h3>
          <p class="text-sm text-secondary">
            Pilih paket seo dan geo yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6"
        >
          <!-- Paket Basic -->
          <div
            class="bg-background border-2 border-primary rounded-2xl p-6 shadow-app flex flex-col justify-between relative space-y-6"
          >
            <div class="absolute top-6 right-6">
              <Badge variant="success">Rekomendasi</Badge>
            </div>
            <div class="space-y-4">
              <div>
                <h4 class="text-xl font-bold text-foreground">Basic</h4>
                <p class="text-xs text-secondary">SEO & GEO</p>
              </div>
              <div class="flex items-baseline space-x-1">
                <span class="text-3xl font-extrabold text-foreground"
                  >Rp 300.000</span
                >
                <span class="text-xs text-secondary">/ tahun</span>
              </div>
              <ul class="space-y-3 pt-2 text-sm text-secondary">
                <li
                  v-for="(feat, idx) in seoGeoBasicFeatures"
                  :key="idx"
                  class="flex items-center space-x-3"
                >
                  <Check :size="16" class="text-success shrink-0" />
                  <span class="text-foreground">{{ feat }}</span>
                </li>
              </ul>
            </div>
            <NuxtLink to="/client/seo/order" class="w-full">
              <Button class="w-full" variant="primary">
                Aktifkan Paket Basic
              </Button>
            </NuxtLink>
          </div>

          <!-- Paket Premium -->
          <div
            class="bg-background border border-border rounded-2xl p-6 shadow-app flex flex-col justify-between space-y-6"
          >
            <div class="space-y-4">
              <div>
                <h4 class="text-xl font-bold text-foreground">Premiumn</h4>
                <p class="text-xs text-secondary">SEO & GEO</p>
              </div>
              <div class="flex items-baseline space-x-1">
                <span class="text-3xl font-extrabold text-foreground"
                  >Rp 750.000</span
                >
                <span class="text-xs text-secondary">/ tahun</span>
              </div>
              <ul class="space-y-3 pt-2 text-sm text-secondary">
                <li
                  v-for="(feat, idx) in seoGeoPremiumFeatures"
                  :key="idx"
                  class="flex items-center space-x-3"
                >
                  <Check :size="16" class="text-success shrink-0" />
                  <span class="text-foreground">{{ feat }}</span>
                </li>
              </ul>
            </div>
            <NuxtLink to="/client/seo/order" class="w-full">
              <Button class="w-full" variant="primary">
                Aktifkan Paket Premium
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bantuan Section Bawah (Expired) -->

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
        <NuxtLink to="/client/bantuan">
          <Button variant="soft-warning" size="sm"> Hubungi Kami </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- HEADER COMMON (BASIC & MONITORING) -->
    <template v-else>
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2 text-xs text-secondary font-medium">
          <CheckCircle2 class="w-4 h-4 text-success" />
          <span>{{
            seoStatus === "basic"
              ? "Setup Selesai"
              : "Terhubung ke Google Search Console"
          }}</span>
        </div>
        <span class="text-muted hidden lg:block">|</span>
        <div>
          <span class="text-muted">
            {{
              seoStatus === "basic"
                ? "Diselesaikan: 9 Agustus 2026"
                : "Data diperbarui: 9 Agustus 2026"
            }}
          </span>
        </div>
      </div>

      <!-- DOMAIN SELECTOR & DATE RANGE -->
      <div class="flex flex-wrap items-center justify-end gap-4 py-2">
        <template v-if="seoStatus === 'monitoring'">
          <Badge variant="neutral">
            <div class="flex gap-2 items-center">
              <span>30 Hari Terakhir (11 Jul – 9 Agu 2026)</span>
              <Calendar class="w-3.5 h-3.5 text-secondary" />
            </div>
          </Badge>
        </template>
      </div>

      <!-- TAMPILAN 2: SEO BASIC -->
      <div v-if="seoStatus === 'basic'" class="space-y-6">
        <!-- Banner Success -->
        <div
          class="bg-background rounded-2xl p-6 border border-border shadow-app flex flex-col md:flex-row items-center gap-6"
        >
          <div
            class="w-36 h-36 flex-shrink-0 relative flex items-center justify-center bg-surface-soft rounded-2xl"
          >
            <!-- Banner Vector Mock -->
            <div
              class="relative w-24 h-28 bg-surface border-2 border-border-strong rounded-lg p-2 shadow-sm flex flex-col justify-between"
            >
              <div
                class="w-6 h-3 bg-muted/30 rounded-full mx-auto -mt-4 border border-border"
              ></div>
              <div class="space-y-1.5 mt-2">
                <div class="flex items-center gap-1">
                  <CheckCircle2 class="w-3 h-3 text-success" />
                  <div class="h-1.5 w-full bg-muted/20 rounded"></div>
                </div>
                <div class="flex items-center gap-1">
                  <CheckCircle2 class="w-3 h-3 text-success" />
                  <div class="h-1.5 w-full bg-muted/20 rounded"></div>
                </div>
                <div class="flex items-center gap-1">
                  <CheckCircle2 class="w-3 h-3 text-success" />
                  <div class="h-1.5 w-full bg-muted/20 rounded"></div>
                </div>
              </div>
              <div
                class="w-6 h-6 rounded-full bg-primary flex items-center justify-center self-end -mr-3 -mb-3 shadow-md"
              >
                <span class="text-xs">⚙</span>
              </div>
            </div>
          </div>
          <div class="space-y-4 flex-1">
            <div>
              <h2 class="text-xl font-bold text-foreground">
                Setup SEO & GEO Telah Selesai!
              </h2>
              <p class="text-xs text-secondary mt-1">
                Kami telah melakukan setup dan optimasi dasar agar website Anda
                siap ditemukan di Google dan mesin pencarian berbasis AI.
              </p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                class="bg-surface-soft p-3 rounded-xl border border-border flex items-center gap-3"
              >
                <div class="p-2 rounded-xl bg-primary-soft text-primary">
                  <Calendar class="w-4 h-4" />
                </div>
                <div>
                  <p class="text-[10px] text-secondary font-medium">
                    Tanggal Selesai
                  </p>
                  <p class="text-xs font-bold text-foreground">
                    9 Agustus 2026
                  </p>
                </div>
              </div>
              <div
                class="bg-surface-soft p-3 rounded-xl border border-border flex items-center gap-3"
              >
                <div class="p-2 rounded-xl bg-primary-soft text-primary">
                  <FileText class="w-4 h-4" />
                </div>
                <div>
                  <p class="text-[10px] text-secondary font-medium">Paket</p>
                  <p class="text-xs font-bold text-foreground">
                    SEO & GEO Basic (Setup)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Checklist -->
        <div
          class="bg-background rounded-2xl p-6 border border-border shadow-app space-y-4"
        >
          <h3 class="text-sm font-bold text-foreground">
            Yang Telah Kami Kerjakan
          </h3>
          <div class="divide-y divide-border">
            <div class="py-3 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-info-soft text-info mt-0.5">
                  <Globe class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Google Search Console
                  </h4>
                  <p class="text-[11px] text-secondary">
                    Website Anda telah didaftarkan dan diverifikasi di Google
                    Search Console.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Selesai</Badge>
            </div>
            <div class="py-3 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-info-soft text-info mt-0.5">
                  <Network class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Sitemap</h4>
                  <p class="text-[11px] text-secondary">
                    Sitemap website telah dibuat dan dikirim ke Google.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Selesai</Badge>
            </div>
            <div class="py-3 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-info-soft text-info mt-0.5">
                  <FileCode class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Meta Title & Description
                  </h4>
                  <p class="text-[11px] text-secondary">
                    Meta title dan description telah dioptimalkan untuk setiap
                    halaman penting.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Selesai</Badge>
            </div>
            <div class="py-3 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-info-soft text-info mt-0.5">
                  <FileText class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Structured Data (Schema)
                  </h4>
                  <p class="text-[11px] text-secondary">
                    Structured data telah dipasang untuk membantu mesin pencari
                    memahami konten Anda.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Selesai</Badge>
            </div>
            <div class="py-3 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-info-soft text-info mt-0.5">
                  <MapPin class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Google Business Profile
                  </h4>
                  <p class="text-[11px] text-secondary">
                    Profil bisnis Anda telah dibuat/dioptimalkan di Google.
                  </p>
                </div>
              </div>
              <<Badge variant="success" size="sm">Selesai</Badge>
            </div>
            <div class="py-3 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-info-soft text-info mt-0.5">
                  <FileText class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Robots.txt</h4>
                  <p class="text-[11px] text-secondary">
                    Robots.txt telah dikonfigurasi untuk mengarahkan crawling
                    dengan benar.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Selesai</Badge>
            </div>
            <div class="py-3 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-info-soft text-info mt-0.5">
                  <Bot class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    GEO Readiness
                  </h4>
                  <p class="text-[11px] text-secondary">
                    Struktur konten dan informasi bisnis telah dioptimalkan agar
                    mudah dipahami AI.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">Selesai</Badge>
            </div>
          </div>
        </div>

        <!-- Banner Upgrade Notification -->
        <div
          class="bg-warning-soft border border-warning/20 p-4 rounded-xl flex items-center justify-between gap-4"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-xl bg-warning-soft text-warning">
              <AlertCircle class="w-5 h-5" />
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="text-base font-bold text-foreground">
                Paket Basic (Setup Saja)
              </h4>
              <p class="text-xs text-secondary">
                Paket ini mencakup setup dan optimasi dasar SEO & GEO.
                Monitoring performa (klik, impressions, posisi kata kunci, dll)
                tersedia pada <strong>Paket Premium</strong>.
              </p>
            </div>
          </div>
          <Button variant="soft-warning" size="sm">
            <div class="flex items-center gap-2">Upgrade ke Premium</div>
          </Button>
        </div>

        <!-- Bottom Grid 2 Cols -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="bg-background p-6 rounded-2xl border border-border shadow-app flex flex-col justify-between space-y-4"
          >
            <div class="space-y-3">
              <h3 class="text-sm font-bold text-foreground">
                Ingin Memantau Performa SEO Anda?
              </h3>
              <p class="text-xs text-secondary">
                Upgrade ke <strong>Paket Premium</strong> untuk mendapatkan data
                performa dari Google (Search Console) secara berkala dan laporan
                lengkap setiap bulan.
              </p>
              <ul class="space-y-2 text-xs text-foreground font-medium pt-1">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-3.5 h-3.5 text-success" /> Monitoring
                  klik, impressions, CTR & posisi kata kunci
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-3.5 h-3.5 text-success" /> Laporan
                  performa bulanan
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-3.5 h-3.5 text-success" /> Analisis
                  kata kunci & halaman
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-3.5 h-3.5 text-success" /> Rekomendasi
                  optimasi lanjutan
                </li>
              </ul>
            </div>
            <Button variant="soft-primary"> Upgrade ke Premium </Button>
          </div>

          <div
            class="bg-background p-6 rounded-2xl border border-border shadow-app flex flex-col justify-between relative overflow-hidden"
          >
            <div class="space-y-2">
              <h3 class="text-sm font-bold text-foreground">
                Butuh bantuan lebih lanjut?
              </h3>
              <p class="text-xs text-secondary mb-4">
                Tim kami siap membantu mengoptimalkan website Anda lebih jauh.
              </p>
              <Button variant="solid"> Buat Permintaan </Button>
            </div>
            <!-- Illustration SVG Vector Mock -->
            <div class="w-32 h-24 self-end -mr-2 -mb-2 opacity-80">
              <svg
                viewBox="0 0 100 80"
                fill="none"
                class="w-full h-full text-primary"
              >
                <circle
                  cx="60"
                  cy="30"
                  r="16"
                  fill="currentColor"
                  opacity="0.3"
                />
                <rect
                  x="20"
                  y="55"
                  width="40"
                  height="25"
                  rx="3"
                  fill="#98a2b3"
                  opacity="0.5"
                />
                <path
                  d="M50 45 C40 45, 35 60, 35 75 L85 75 C85 60, 80 45, 70 45 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- TAMPILAN 3: SEO MONITORING (PREMIUM) -->
      <div v-else-if="seoStatus === 'monitoring'" class="space-y-6">
        <!-- Metric Cards -->
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="border border-border p-3 rounded-xl bg-background">
            <div class="flex items-center gap-1 text-[11px] text-muted mb-1">
              <div class="flex bg-info-soft rounded-sm text-info p-1">
                <Eye class="w-3.5 h-3.5 text-info" />
              </div>
              Impressions
            </div>

            <div class="flex items-baseline gap-1.5">
              <span class="text-lg font-bold text-foreground"> 9.500 </span>

              <span
                class="text-[10px] font-semibold text-info flex items-center"
              >
                ↑ 24,8%
              </span>
            </div>

            <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-info stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,15 L20,10 L40,14 L60,5 L80,12 L100,2"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div class="border border-border p-3 rounded-xl bg-background">
            <div class="flex items-center gap-1 text-[11px] text-muted mb-1">
              <div class="flex bg-info-soft rounded-sm text-info p-1">
                <MousePointerClick class="w-3.5 h-3.5 text-info" />
              </div>
              Clicks
            </div>

            <div class="flex items-baseline gap-1.5">
              <span class="text-lg font-bold text-foreground"> 382 </span>

              <span
                class="text-[10px] font-semibold text-success flex items-center"
              >
                ↑ 18,2%
              </span>
            </div>

            <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-info stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,18 L20,12 L40,15 L60,8 L80,10 L100,4"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div class="border border-border p-3 rounded-xl bg-background">
            <div class="flex items-center gap-1 text-[11px] text-muted mb-1">
              <div class="flex bg-warning-soft rounded-sm text-warning p-1">
                <Percent class="w-3.5 h-3.5 text-warning" />
              </div>
              CTR
            </div>

            <div class="flex items-baseline gap-1.5">
              <span class="text-lg font-bold text-foreground"> 4,02% </span>

              <span
                class="text-[10px] font-semibold text-warning flex items-center"
              >
                ↑ 6,1%
              </span>
            </div>

            <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-warning stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,12 L20,16 L40,8 L60,14 L80,6 L100,10"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div class="border border-border p-3 rounded-xl bg-background">
            <div class="flex items-center gap-1 text-[11px] text-muted mb-1">
              <div class="flex bg-success-soft rounded-sm text-success p-1">
                <TrendingUp class="w-3.5 h-3.5" />
              </div>
              Avg. Position
            </div>

            <div class="flex items-baseline gap-1.5">
              <span class="text-lg font-bold text-foreground"> 7,8 </span>

              <span
                class="text-[10px] font-semibold text-success flex items-center"
              >
                ↓ 1,3
              </span>
            </div>

            <p class="text-[10px] text-muted mt-1">vs 30 hari sebelumnya</p>

            <svg
              class="w-full h-6 mt-2 text-success stroke-current fill-none"
              viewBox="0 0 100 20"
            >
              <path
                d="M0,8 L20,14 L40,10 L60,16 L80,5 L100,12"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        <!-- Main Chart Section -->
        <div
          class="bg-background p-6 rounded-2xl border border-border shadow-app space-y-4"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-foreground">
              Performa Klik & Impressions
            </h3>
          </div>

          <MultiLineChart
            :categories="[
              '12 Jul',
              '14 Jul',
              '16 Jul',
              '18 Jul',
              '20 Jul',
              '22 Jul',
              '24 Jul',
              '26 Jul',
              '28 Jul',
              '30 Jul',
              '1 Agu',
              '3 Agu',
              '5 Agu',
              '7 Agu',
              '9 Agu',
              '11 Agu',
            ]"
            :series="[
              {
                name: 'Klik',
                data: [
                  280, 295, 270, 310, 300, 325, 315, 340, 330, 350, 342, 360,
                  352, 370, 365, 382,
                ],
                color: '#3b82f6',
              },
              {
                name: 'Impressions',
                data: [
                  7200, 7500, 7100, 7800, 7600, 8100, 7950, 8350, 8200, 8600,
                  8450, 8800, 8650, 9100, 9250, 9500,
                ],
                color: '#10b981',
              },
            ]"
            :judul="false"
          />
        </div>

        <!-- Tables 2 Cols -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Table 1: Kata Kunci Teratas -->
          <div
            class="bg-background p-6 rounded-2xl border border-border shadow-app space-y-4"
          >
            <h3 class="text-sm font-bold text-foreground">
              Kata Kunci Teratas
            </h3>
            <Table :headers="keywordHeaders" :data="keywordData" />
          </div>

          <!-- Table 2: Halaman Teratas -->
          <div
            class="bg-background p-6 rounded-2xl border border-border shadow-app space-y-4"
          >
            <h3 class="text-sm font-bold text-foreground">Halaman Teratas</h3>
            <Table :headers="pageHeaders" :data="pageData" />
          </div>
        </div>

        <!-- SEO & GEO Optimizations Grid -->
        <div
          class="bg-background p-6 rounded-2xl border border-border shadow-app space-y-4"
        >
          <h3 class="text-sm font-bold text-foreground">
            SEO & GEO Optimizations
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <Globe class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Google Search Console
                  </h4>
                  <p class="text-[10px] text-success font-medium">
                    Terhubung & Aktif
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <FileCode class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Meta Title & Description
                  </h4>
                  <p class="text-[10px] text-info font-medium">Dioptimalkan</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <MapPin class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Google Business Profile
                  </h4>
                  <p class="text-[10px] text-success font-medium">
                    Terverifikasi
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <Network class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Sitemap</h4>
                  <p class="text-[10px] text-success font-medium">
                    Aktif & Terindex
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <FileText class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Structured Data
                  </h4>
                  <p class="text-[10px] text-success font-medium">Aktif</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <MapPin class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Local SEO</h4>
                  <p class="text-[10px] text-info font-medium">Dioptimalkan</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-xl">
                  <FileText class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">Robots.txt</h4>
                  <p class="text-[10px] text-info font-medium">
                    Terkonfigurasi
                  </p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-lg">
                  <BarChart2 class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    Core Web Vitals
                  </h4>
                  <p class="text-[10px] text-success font-medium">Baik</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>

            <div
              class="p-3 bg-surface-soft rounded-xl border border-border flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <div class="p-2 bg-info-soft text-info rounded-lg">
                  <Bot class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-foreground">
                    GEO (AI Visibility)
                  </h4>
                  <p class="text-[10px] text-info font-medium">Dioptimalkan</p>
                </div>
              </div>
              <CheckCircle2 class="w-4 h-4 text-success" />
            </div>
          </div>
        </div>

        <!-- Bottom Monitoring Footer Banner -->
        <div
          class="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style="
            background: var(--success-soft);
            border: 1px solid var(--success-border);
          "
        >
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-success-soft rounded-xl text-success">
              <Star class="w-5 h-5" />
            </div>

            <h4 class="font-bold text-sm text-foreground">
              Kami terus memantau dan mengoptimalkan website anda setiap
              harinya.
            </h4>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "client",
  activeTab: "seo",
  title: "Seo & Geo",
});
import { ref } from "vue";
import {
  CheckCircle2,
  Calendar,
  Globe,
  FileCode,
  FileText,
  Network,
  MapPin,
  Bot,
  TrendingUp,
  MousePointer,
  Percent,
  BarChart2,
  Star,
  Earth,
  AlertCircle,
  Eye,
  Search,
  LocationEdit,
  ChartBarBig,
  Check,
  MousePointerClick,
} from "~/utils/icons";

// State Status SEO: 'no-active', 'basic', 'monitoring' (Default: monitoring)
const seoStatus = ref("monitoring");

// State Dropdown Website
const selectedDomain = ref("kedaisenja.com");

const breadcrumbItems = [
  {
    label: "Dashboard",
    to: "/client/",
  },
  {
    label: "Seo & Geo",
  },
];
const keywordHeaders = [
  {
    key: "keyword",
    label: "Kata Kunci",
  },
  {
    key: "clicks",
    label: "Klik",
  },
  {
    key: "impressions",
    label: "Impressions",
  },
  {
    key: "position",
    label: "Posisi",
  },
];

const keywordData = [
  {
    keyword: "kedai kopi senja",
    clicks: 120,
    impressions: "1.800",
    position: "1,8",
  },
  {
    keyword: "cafe kopi terdekat",
    clicks: 58,
    impressions: "1.050",
    position: "2,4",
  },
  {
    keyword: "kopi enak tarakan",
    clicks: 32,
    impressions: 680,
    position: "3,1",
  },
  {
    keyword: "tempat ngopi nyaman",
    clicks: 24,
    impressions: 520,
    position: "4,2",
  },
  {
    keyword: "menu kopi kekinian",
    clicks: 18,
    impressions: 450,
    position: "5,6",
  },
];
const pageHeaders = [
  {
    key: "page",
    label: "Halaman",
    align: "text-left",
  },
  {
    key: "clicks",
    label: "Klik",
    align: "text-right",
  },
  {
    key: "impressions",
    label: "Impressions",
    align: "text-right",
  },
];

const pageData = [
  {
    page: "/",
    clicks: 132,
    impressions: "2.900",
  },
  {
    page: "/menu",
    clicks: 88,
    impressions: "1.600",
  },
  {
    page: "/tentang-kami",
    clicks: 46,
    impressions: 780,
  },
  {
    page: "/kontak",
    clicks: 34,
    impressions: 520,
  },
  {
    page: "/blog/rekomendasi-kopi",
    clicks: 22,
    impressions: 350,
  },
];
const seoGeoBasicFeatures = [
  "Google Search Console",
  "Sitemap & Robots.txt",
  "Meta Title & Description",
  "Structured Data (Schema)",
  "Monitoring performa SEO",
  "GEO Readiness dasar",
];

const seoGeoPremiumFeatures = [
  "Semua fitur SEO & GEO Basic",
  "Optimasi SEO berkelanjutan",
  "Analisis keyword & performa",
  "Structured Data lanjutan",
  "Google Business Profile",
  "Optimasi GEO untuk AI Search",
  "Insight & rekomendasi optimasi",
  "Support prioritas",
];
</script>
<style scoped>
/* Pemakaian CSS Scoped dibuat seminimal mungkin karena sudah menggunakan class Tailwind dan utility custom CSS yang Anda berikan */
</style>
