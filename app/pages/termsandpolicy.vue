<template>
  <Navbar menu="Ketentuan & Kebijakan" />
  <section
    class="pb-24 lg:pb-0 max-w-full md:max-w-6xl mx-auto flex flex-col items-center"
  >
    <div class="container mx-auto px-4 py-12 md:py-16 mt-10">
      <!-- Header Dokumen -->
      <div class="mb-12 md:mb-16 max-w-3xl">
        <h1
          class="text-4xl md:text-5xl text-muted font-bold text-foreground font-serif mb-4"
        >
          Ketentuan & <span class="font-[1000] text-foreground">Kebijakan</span>
        </h1>
        <p
          class="text-base md:text-lg text-muted leading-relaxed transition-colors duration-300"
        >
          Dokumen Kebijakan Bisnis dan Operasional. Disusun berdasarkan model
          bisnis dan kebijakan operasional Appfoundry yang telah ditetapkan.
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <!-- Sidebar Desktop (lg ke atas) -->
        <aside class="hidden lg:block w-1/3 xl:w-1/4 flex-shrink-0">
          <div class="sticky top-20">
            <h2
              class="text-xs font-bold text-muted uppercase tracking-widest mb-6 transition-colors duration-300"
            >
              Daftar Isi
            </h2>
            <nav
              class="space-y-1 max-h-[70vh] overflow-y-auto pr-2 custom-scroll"
            >
              <button
                v-for="item in sections"
                :key="item.id"
                :id="`nav-item-${item.id}`"
                @click="scrollToSection(item.id)"
                :class="[
                  'w-full text-left flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 border-bottom',
                  activeSection === item.id
                    ? 'text-foreground font-semibold '
                    : 'text-muted hover:text-foreground',
                ]"
              >
                <span
                  :class="[
                    'flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors duration-300',
                    activeSection === item.id
                      ? 'bg-[var(--primary)] text-[var(--card)]'
                      : 'bg-[var(--background)] text-muted border border-border',
                  ]"
                >
                  {{ item.id }}
                </span>
                {{ item.title }}
              </button>
            </nav>
          </div>
        </aside>

        <!-- Konten Utama & Tab Mobile/Tablet -->
        <main class="flex-1 w-full relative">
          <!-- Tab Mobile/Tablet (Splide JS) -->
          <div
            class="lg:hidden sticky top-16 z-20 bg-[var(--background)]/95 backdrop-blur py-3 mb-8 -mx-4 px-4 shadow-md transition-colors duration-300"
          >
            <Splide
              :options="splideOptions"
              ref="splideRef"
              aria-label="Daftar Ketentuan"
            >
              <SplideSlide
                v-for="item in sections"
                :key="item.id"
                class="w-auto"
              >
                <button
                  @click="scrollToSection(item.id)"
                  :class="[
                    'w-full text-left px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-colors duration-200 border',
                    activeSection === item.id
                      ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-medium'
                      : 'bg-transparent text-muted border-border hover:bg-card',
                  ]"
                >
                  {{ item.id }}. {{ item.title }}
                </button>
              </SplideSlide>
            </Splide>
          </div>

          <!-- Body Konten -->
          <div class="space-y-6">
            <!-- Section Template Loop -->
            <section
              v-for="item in sections"
              :key="item.id"
              :id="`section-${item.id}`"
              class="scroll-mt-24 lg:scroll-mt-12 p-6 md:p-8"
            >
              <div class="flex items-center mb-6 border-b border-border pb-4">
                <span
                  class="text-4xl md:text-5xl font-extrabold text-muted opacity-20 mr-4 leading-none transition-colors duration-300"
                >
                  {{ String(item.id).padStart(2, "0") }}
                </span>
                <h2
                  class="text-xl md:text-2xl font-bold text-foreground transition-colors duration-300"
                >
                  {{ item.title }}
                </h2>
              </div>

              <!-- Konten HTML -->
              <div
                class="policy-content max-w-none text-muted leading-relaxed text-sm md:text-base space-y-4 transition-colors duration-300"
                v-html="item.content"
              ></div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

// Data Ketentuan dan Kebijakan
const sections = ref([
  {
    id: 1,
    title: "Ketentuan Umum",
    content: `
      <p>Appfoundry menyediakan layanan pembuatan website, pengembangan aplikasi berbasis web, konfigurasi kebutuhan digital, pengelolaan infrastruktur, domain, dashboard, maintenance, SEO & GEO, serta layanan pengembangan tambahan sesuai kebutuhan client.</p>
      <p>Setiap client yang menggunakan layanan Appfoundry dianggap memahami ketentuan yang berlaku terhadap project, pembayaran, pengembangan, penggunaan layanan, dan aset yang terkait dengan project.</p>
    `,
  },
  {
    id: 2,
    title: "Akun dan Autentikasi",
    content: `
      <p>Access ke platform Appfoundry menggunakan autentikasi melalui akun Google. Appfoundry tidak menyediakan sistem password manual untuk akun client.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Client menggunakan akun Google untuk mengakses layanan Appfoundry.</li>
        <li>Appfoundry menggunakan informasi yang diperlukan dari proses autentikasi untuk identifikasi dan pengelolaan layanan.</li>
        <li>Keamanan akun Google dan metode autentikasinya mengikuti sistem keamanan penyedia autentikasi.</li>
        <li>Client tetap bertanggung jawab atas aktivitas yang dilakukan melalui akun yang digunakan untuk mengakses Appfoundry.</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "Configurator dan Total Investasi",
    content: `
      <p>Appfoundry menggunakan sistem configurator untuk membantu client menentukan pondasi project dan kebutuhan layanan yang diinginkan.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Client memilih Pondasi sebagai dasar konfigurasi project.</li>
        <li>Sistem dapat menerapkan pilihan default berdasarkan Pondasi yang dipilih.</li>
        <li>Client dapat menyesuaikan pilihan yang tersedia sesuai kebutuhan.</li>
        <li>Total Investasi diperbarui berdasarkan konfigurasi aktif.</li>
        <li>Pilihan tambahan yang tidak dipilih tidak dimasukkan ke dalam perhitungan.</li>
      </ul>
      <p>Total Investasi yang ditampilkan melalui configurator menjadi dasar estimasi dan konfigurasi awal project. Kebutuhan, fungsi, integrasi, atau perubahan di luar konfigurasi dan scope yang telah disepakati dapat dikenakan biaya tambahan serta penyesuaian waktu pengerjaan.</p>
    `,
  },
  {
    id: 4,
    title: "Pondasi dan Ruang Lingkup Project",
    content: `
      <p>Pondasi project merupakan titik awal untuk menentukan jenis solusi digital yang akan dibangun. Pilihan Pondasi tidak berarti seluruh fitur yang secara umum terkait dengan kategori tersebut otomatis termasuk dalam project.</p>
      <div class="custom-grid grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 p-4 rounded-lg border border-border">
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Landing Page</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Portofolio</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Company Profile</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Digital Catalog</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Blog & Media</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Toko Online</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Booking & Reservation</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">POS & Kasir</span>
        <span class="custom-grid-item p-2 text-center rounded text-sm transition-colors duration-300">Business App</span>
      </div>
      <p class="mt-4">Ruang lingkup akhir project mengikuti konfigurasi dan kesepakatan yang telah disetujui. Fitur, integrasi, halaman, workflow, atau kebutuhan tambahan di luar scope dapat diperlakukan sebagai Additional Development.</p>
    `,
  },
  {
    id: 5,
    title: "Pembayaran",
    content: `
      <p>Pembayaran dilakukan melalui QRIS Payment Gateway yang terhubung dengan platform Appfoundry. Status pembayaran mengikuti konfirmasi dari sistem payment gateway.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Pembayaran dilakukan melalui instruksi pembayaran resmi yang tersedia di Appfoundry.</li>
        <li>Project atau layanan diproses setelah pembayaran yang diperlukan berhasil dikonfirmasi.</li>
        <li>Konfirmasi manual tidak secara otomatis mengubah status pembayaran apabila sistem payment gateway belum mengonfirmasi transaksi.</li>
      </ul>
      <p>Skema pembayaran project menggunakan 50/50: 50% sebagai Pembayaran Awal sebelum project memasuki proses development, dan 50% sebagai Pelunasan sesuai tahapan penyelesaian sebelum penyerahan atau go-live sesuai ketentuan project.</p>
    `,
  },
  {
    id: 6,
    title: "Keterlambatan Pembayaran",
    content: `
      <ul class="list-disc pl-6 space-y-2">
        <li>Client wajib menyelesaikan tagihan sesuai kewajiban pembayaran yang berlaku.</li>
        <li>Apabila suatu tagihan tidak diselesaikan dalam waktu maksimal 1 (satu) bulan sejak jatuh tempo, client dapat dinyatakan melanggar ketentuan layanan Appfoundry.</li>
        <li>Appfoundry dapat melakukan tindakan yang diperlukan, termasuk penundaan project, pembatasan akses, atau penangguhan layanan terkait.</li>
      </ul>
    `,
  },
  {
    id: 7,
    title: "Waktu Pengerjaan",
    content: `
      <p>Waktu pengerjaan yang dipilih melalui configurator merupakan target pengerjaan berdasarkan konfigurasi dan scope yang disepakati.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Keterlambatan pembayaran.</li>
        <li>Keterlambatan penyediaan materi, konten, atau akses dari client.</li>
        <li>Keterlambatan feedback atau persetujuan.</li>
        <li>Revisi atau perubahan di luar scope.</li>
        <li>Perubahan requirement setelah development berjalan.</li>
        <li>Kendala atau perubahan pada layanan pihak ketiga.</li>
      </ul>
      <p>Opsi waktu pengerjaan dengan biaya tambahan merupakan biaya prioritas atau percepatan pengerjaan berdasarkan kapasitas dan kelayakan scope, bukan jaminan mutlak tanpa mempertimbangkan kompleksitas aktual.</p>
    `,
  },
  {
    id: 8,
    title: "Kebijakan Revisi",
    content: `
      <p>Setiap project memiliki maksimal 3 (tiga) kali revisi minor dalam ruang lingkup yang telah disepakati.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Perubahan teks.</li>
        <li>Perubahan gambar atau konten.</li>
        <li>Penyesuaian warna.</li>
        <li>Penyesuaian spacing.</li>
        <li>Penyesuaian layout kecil.</li>
        <li>Perubahan visual yang tidak mengubah struktur atau fungsi utama.</li>
      </ul>
      <p>Permintaan yang menambah atau mengubah fungsi, struktur, workflow, integrasi, atau kebutuhan di luar kesepakatan awal tidak dianggap sebagai revisi minor. Perubahan tersebut dapat diperlakukan sebagai Additional Development dan dapat dikenakan biaya tambahan serta penyesuaian timeline.</p>
    `,
  },
  {
    id: 9,
    title: "Pembatalan Project",
    content: `
      <ul class="list-disc pl-6 space-y-2">
        <li>Client tidak dapat melakukan pembatalan project setelah proses development dimulai.</li>
        <li>Ketentuan ini berlaku karena sumber daya, waktu, dan proses pengerjaan telah dialokasikan untuk project tersebut.</li>
        <li>Kebijakan pengembalian pembayaran apabila pembatalan dilakukan sebelum proses development dimulai belum ditetapkan secara spesifik dalam model kebijakan ini dan dapat ditambahkan kemudian.</li>
      </ul>
    `,
  },
  {
    id: 10,
    title: "Server dan Infrastruktur",
    content: `
      <p>Appfoundry dapat menyediakan atau mengelola infrastruktur sesuai konfigurasi project, termasuk Shared, VPS Entry, VPS Pro, Dedicated Basic, atau Dedicated Pro.</p>
      <p>Jenis infrastruktur memengaruhi kapasitas, performa, dan biaya layanan. Appfoundry tidak memberikan jaminan mutlak atas ketersediaan tanpa gangguan apabila terjadi masalah pada provider atau layanan pihak ketiga di luar kendali Appfoundry.</p>
    `,
  },
  {
    id: 11,
    title: "Domain dan Migrasi",
    content: `
      <ul class="list-disc pl-6 space-y-2">
        <li>Selama masa kontrak aktif, domain dikelola dalam ekosistem layanan Appfoundry sesuai ketentuan project.</li>
        <li>Apabila kontrak diperpanjang, pengelolaan dan kepemilikan domain tetap mengikuti model layanan Appfoundry.</li>
        <li>Apabila masa kontrak berakhir dan client memutuskan untuk tidak memperpanjang layanan, domain dapat dialihkan kepada client sesuai prosedur teknis dan ketentuan yang berlaku.</li>
      </ul>
    `,
  },
  {
    id: 12,
    title: "Maintenance",
    content: `
      <p>Pilihan maintenance dalam model layanan Appfoundry adalah:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>1 Bulan — Gratis.</li>
        <li>3 Bulan — Rp450.000.</li>
        <li>6 Bulan — Rp800.000.</li>
      </ul>
      <p class="mt-3">Maintenance dapat mencakup perbaikan bug, perbaikan error, dan penyesuaian yang masih berada dalam ruang lingkup maintenance.</p>
      <p>Maintenance tidak secara otomatis mencakup fitur baru, perubahan fungsi besar, redesign besar, integrasi baru, atau perubahan scope.</p>
    `,
  },
  {
    id: 13,
    title: "SEO & GEO",
    content: `
      <p>Layanan SEO & GEO merupakan layanan optimasi sesuai pilihan konfigurasi yang tersedia.</p>
      <p>Appfoundry tidak menjamin peringkat tertentu pada mesin pencari, jumlah pengunjung tertentu, atau hasil tertentu karena hasil dapat dipengaruhi oleh kompetisi, kualitas konten, perubahan algoritma, platform pihak ketiga, dan faktor lainnya.</p>
    `,
  },
  {
    id: 14,
    title: "Dashboard dan Dokumentasi",
    content: `
      <p>Ketersediaan dashboard mengikuti konfigurasi yang dipilih oleh client. Pembelian website atau aplikasi tidak secara otomatis berarti seluruh jenis dashboard atau CMS termasuk.</p>
      <p>Dokumentasi hanya tersedia apabila termasuk dalam konfigurasi atau kesepakatan project.</p>
    `,
  },
  {
    id: 15,
    title: "Materi dan Konten Client",
    content: `
      <p>Client bertanggung jawab atas materi yang diberikan untuk kebutuhan project.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Logo.</li>
        <li>Teks.</li>
        <li>Foto.</li>
        <li>Video.</li>
        <li>Informasi bisnis.</li>
        <li>Data produk atau layanan.</li>
        <li>Konten dari pihak ketiga.</li>
      </ul>
      <p class="mt-3">Client bertanggung jawab memastikan bahwa materi yang diberikan memiliki hak penggunaan yang sesuai. Keterlambatan penyediaan materi, akses, feedback, atau persetujuan dapat memengaruhi timeline project.</p>
    `,
  },
  {
    id: 16,
    title: "Kepemilikan Source Code",
    content: `
      <p>Selama masa kontrak aktif, kepemilikan dan pengelolaan source code project berada di tangan Appfoundry. Client memperoleh hak untuk menggunakan hasil project sesuai layanan dan kontrak yang aktif.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Apabila client memperpanjang masa kontrak, kepemilikan dan pengelolaan source code tetap berada di tangan Appfoundry.</li>
        <li>Apabila masa kontrak berakhir dan client memutuskan untuk tidak memperpanjang layanan, kepemilikan source code project dapat dialihkan atau diakui oleh client sesuai ketentuan kontrak dan proses penyerahan yang berlaku.</li>
      </ul>
      <p class="mt-3">Kepemilikan tersebut tidak otomatis mencakup aset internal Appfoundry yang bersifat reusable atau digunakan secara umum, termasuk framework internal, starter code, reusable component, utility, library internal, atau bagian sistem lain yang bukan dibuat secara eksklusif untuk project client.</p>
    `,
  },
  {
    id: 17,
    title: "Data Project dan Database",
    content: `
      <p>Data bisnis dan database yang dihasilkan atau digunakan khusus untuk project client merupakan data yang terkait dengan project client sesuai ruang lingkup layanan dan ketentuan kontrak.</p>
      <p>Apabila kontrak berakhir dan tidak diperpanjang, data dapat menjadi bagian dari proses penyerahan atau migrasi sesuai prosedur teknis yang berlaku.</p>
    `,
  },
  {
    id: 18,
    title: "Layanan Pihak Ketiga",
    content: `
      <p>Project dapat menggunakan layanan pihak ketiga seperti payment gateway, provider infrastruktur, email provider, maps, analytics, API, atau layanan eksternal lainnya.</p>
      <p>Appfoundry tidak bertanggung jawab atas perubahan layanan, downtime, pembatasan, perubahan kebijakan, atau perubahan harga yang berasal dari pihak ketiga.</p>
    `,
  },
  {
    id: 19,
    title: "Penangguhan atau Pembatasan Layanan",
    content: `
      <p>Appfoundry dapat menunda, membatasi, atau menangguhkan layanan apabila diperlukan.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Keterlambatan pembayaran.</li>
        <li>Pelanggaran ketentuan layanan.</li>
        <li>Penggunaan layanan untuk aktivitas yang melanggar hukum.</li>
        <li>Aktivitas yang berpotensi membahayakan sistem atau infrastruktur.</li>
        <li>Keadaan teknis atau keamanan yang memerlukan tindakan segera.</li>
      </ul>
    `,
  },
  {
    id: 20,
    title: "Kebijakan Privasi",
    content: `
      <p>Appfoundry dapat mengumpulkan informasi yang diperlukan untuk autentikasi, pengelolaan akun, konfigurasi project, komunikasi layanan, pembayaran, dan pengembangan project.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li>Informasi identitas dasar yang diperoleh melalui autentikasi Google sesuai izin yang diberikan.</li>
        <li>Informasi bisnis yang diberikan oleh client.</li>
        <li>Konfigurasi dan kebutuhan project.</li>
        <li>Informasi komunikasi terkait layanan.</li>
        <li>Informasi transaksi dan status pembayaran.</li>
      </ul>
      <p class="mt-3">Informasi dapat digunakan untuk autentikasi dan pengelolaan akses, penyediaan layanan, pemrosesan project, pengelolaan tagihan, komunikasi, maintenance, dukungan, dan peningkatan layanan.</p>
      <p>Data pengguna Appfoundry perlu dibedakan dari data end user milik client yang mungkin diproses melalui website atau aplikasi yang dibangun oleh Appfoundry. Penggunaan autentikasi Google, payment gateway, provider infrastruktur, analytics, atau layanan pihak ketiga dapat melibatkan pemrosesan data sesuai kebijakan masing-masing penyedia layanan.</p>
    `,
  },
  {
    id: 21,
    title: "Perubahan Ketentuan",
    content: `
      <p>Appfoundry dapat memperbarui atau menyesuaikan ketentuan dan kebijakan apabila diperlukan untuk pengembangan layanan, perubahan operasional, atau kebutuhan lainnya.</p>
      <p>Versi terbaru kebijakan dapat ditampilkan melalui platform atau saluran resmi Appfoundry.</p>
    `,
  },
  {
    id: 22,
    title: "Catatan Pengembangan Dokumen",
    content: `
      <p>Dokumen ini merupakan dasar kebijakan bisnis dan operasional Appfoundry berdasarkan model bisnis yang telah ditetapkan. Untuk penggunaan sebagai dokumen hukum final yang mengikat, ketentuan dapat ditinjau dan disesuaikan lebih lanjut sesuai yurisdiksi, bentuk badan usaha, hubungan kontraktual, dan kebutuhan operasional Appfoundry.</p>
    `,
  },
]);

const splideRef = ref(null);
const activeSection = ref(1);
let observer = null;

const splideOptions = {
  pagination: false,
  arrows: false,
  autoWidth: true,
  gap: "0.5rem",
  padding: "0.5rem",
  drag: true,
};

onMounted(() => {
  // Inisialisasi Intersection Observer untuk Scroll Spy
  nextTick(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger ketika section ada di 20% atas viewport
      threshold: 0,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.id.split("-")[1]);
          if (id && activeSection.value !== id) {
            activeSection.value = id;

            // Auto scroll Splide Tab
            if (splideRef.value && splideRef.value.splide) {
              const index = sections.value.findIndex((s) => s.id === id);
              if (index !== -1) {
                splideRef.value.splide.go(index);
              }
            }

            // === TAMBAHKAN BLOK INI ===
            // Auto scroll Sidebar Desktop jika item aktif berada di luar viewport sidebar
            const navItem = document.getElementById(`nav-item-${id}`);
            if (navItem) {
              // block: 'nearest' akan memastikan sidebar hanya di-scroll
              // jika tombol tersebut benar-benar tersembunyi di luar area layar sidebar.
              navItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
            // ===========================
          }
        }
      });
    }, options);

    // Observe semua section konten
    sections.value.forEach((item) => {
      const el = document.getElementById(`section-${item.id}`);
      if (el) observer.observe(el);
    });
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

// Fungsi Scroll Manual saat tab/menu di klik
const scrollToSection = (id) => {
  const el = document.getElementById(`section-${id}`);
  if (el) {
    const headerOffset = window.innerWidth < 1024 ? 100 : 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
useHead({
  title: "Ketentuan dan Kebijakan ── Appfoundry",
});
</script>

<style scoped>
/* Kustomisasi Scrollbar Desktop */
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: var(--border);
  border-radius: 3px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--muted);
}

/* Styling dynamic HTML content via deep selector */
:deep(.policy-content p) {
  margin-bottom: 0.75rem;
}

:deep(.policy-content ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

:deep(.policy-content ul li) {
  padding-left: 0.25rem;
}

:deep(.policy-content .custom-grid) {
  background-color: var(--background);
  border: 1px solid var(--border);
}

:deep(.policy-content .custom-grid-item) {
  background-color: var(--card);
  border: 1px solid var(--border);
  color: var(--foreground);
  font-weight: 500;
}

/* Pastikan ukuran slide splide otomatis sesuai konten */
:deep(.splide__slide) {
  width: auto !important;
}
</style>
