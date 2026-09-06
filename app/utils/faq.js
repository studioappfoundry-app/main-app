export const faqCategories = [
  {
    id: "website",
    name: "Website Saya",
    slug: "website",
    items: [
      {
        id: "website-order",
        question: "Apa yang terjadi setelah client melakukan order?",
        answer:
          "Setelah client melakukan pemesanan melalui configurator, Appfoundry akan menyiapkan dan mengerjakan website/aplikasi sesuai konfigurasi. Proses development dimulai setelah pembayaran DP (50%) dikonfirmasi dan client memberikan konfirmasi untuk memulai project. Perkembangan development akan dilaporkan melalui halaman Website Saya di Dashboard client.",
      },
      {
        id: "website-mulai",
        question: "Kapan project resmi mulai dikerjakan?",
        answer:
          "Project resmi dikerjakan setelah pembayaran DP (50%) terkonfirmasi di sistem payment gateway dan konfirmasi pengerjaan diterima dari client.",
      },
      {
        id: "website-estimasi",
        question: "Berapa lama estimasi waktu pengerjaan project?",
        answer:
          "Waktu pengerjaan tergantung pada pilihan pondasi dan opsi kecepatan yang dipilih pada configurator:\\n\\n- Paket 1 (Landing Page, Portofolio): 3–4 hari (+Rp750.000), 1 minggu (+Rp500.000), atau 1 bulan (Gratis / Standar).\\n- Paket 2 (Digital Catalog, Blog & Media, Toko Online, Booking & Reservation): 2 minggu (+Rp750.000), 1 bulan (+Rp400.000), atau 2 bulan (Gratis / Standar).\\n- Paket 3 (Company Profile, POS & Kasir, Business App, Portal): 1 bulan (+Rp750.000), 2 bulan (+Rp400.000), atau 3 bulan (Gratis / Standar).",
      },
      {
        id: "website-materi",
        question: "Bagaimana client memberikan materi atau konten?",
        answer:
          "Materi seperti logo, teks, foto, video, informasi bisnis, data produk, atau materi lainnya dapat dikirimkan melalui admin Appfoundry, baik melalui WhatsApp maupun email. Keterlambatan penyerahan materi, feedback, atau persetujuan dari client dapat menyebabkan jadwal pengerjaan (timeline) terhambat.",
      },
      {
        id: "website-desain",
        question: "Apa saja pilihan desain dan add-on visual yang tersedia?",
        answer:
          "Client dapat memilih opsi desain: Template (Gratis), Custom Basic (Rp750.000), atau Custom UI/UX (Rp1.500.000). Tersedia pula Add-on Visual seperti Dark Theme (+Rp300.000) dan Multi Bahasa (+Rp400.000).",
      },
      {
        id: "website-revisi",
        question: "Bagaimana proses revisi ke-1, ke-2, dan ke-3?",
        answer:
          "Revisi minor dapat dilakukan selama masa development sesuai ruang lingkup project. Maksimal terdapat 3 kali revisi minor. Revisi minor mencakup perubahan teks, gambar, warna, spacing, layout kecil, atau penyesuaian visual yang tidak mengubah fungsi atau struktur utama. Permintaan fitur baru atau perubahan di luar kesepakatan awal akan dihitung sebagai Additional Development.",
      },
      {
        id: "website-golive",
        question: "Kapan website dianggap selesai dan go-live?",
        answer:
          "Website dianggap siap go-live setelah pengerjaan tahap akhir selesai, dilakukan testing, client menyetujui hasilnya (approval), dan pembayaran pelunasan (50% kedua) telah berhasil dikonfirmasi.",
      },
    ],
  },
  {
    id: "seo-geo",
    name: "SEO & GEO",
    slug: "seo-geo",
    items: [
      {
        id: "seo-aktif",
        question: "Berapa lama layanan SEO & GEO aktif?",
        answer:
          "Layanan SEO & GEO yang dibeli client aktif selama 1 tahun sejak diaktifkan.",
      },
      {
        id: "seo-paket",
        question: "Apa saja pilihan paket SEO & GEO?",
        answer:
          "\\n- Gratis (Rp0): Tidak memilih/membeli layanan optimasi SEO & GEO tambahan.\\n- Basic Setup (Rp300.000): Setup dasar seperti Google Search Console, sitemap, meta title & description, structured data / schema bisnis, robots.txt, dan struktur GEO-ready.\\n- Premium Monitoring (Rp750.000): Basic Setup ditambah optimasi SEO, analisis keyword dan performa, Google Business Profile, optimasi GEO untuk AI Search, insight berkala, serta support prioritas.",
      },
      {
        id: "seo-garansi",
        question: "Apakah hasil SEO & GEO dijamin masuk peringkat tertentu?",
        answer:
          "Appfoundry akan melakukan layanan optimasi sesuai paket. Namun, hasil SEO & GEO tidak dapat dijamin dalam bentuk peringkat tertentu, jumlah pengunjung tertentu, atau hasil bisnis tertentu karena dipengaruhi banyak faktor seperti persaingan, kualitas konten, dan algoritma mesin pencari.",
      },
      {
        id: "seo-perpanjang",
        question: "Apakah SEO & GEO dapat diperpanjang?",
        answer:
          "Bisa. Client dapat memperpanjang layanan SEO & GEO setelah masa layanan 1 tahun berakhir.",
      },
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance",
    slug: "maintenance",
    items: [
      {
        id: "maintenance-mulai",
        question: "Kapan masa maintenance dimulai dan berapa biayanya?",
        answer:
          "Paket awal menyediakan maintenance gratis selama 1 bulan pertama setelah pengerjaan selesai. Setelahnya, client dapat mengambil paket perpanjangan: 3 Bulan (Rp450.000) atau 6 Bulan (Rp800.000).",
      },
      {
        id: "maintenance-cakupan",
        question: "Apa saja yang dicakup dalam layanan maintenance?",
        answer:
          "Maintenance mencakup monitoring website, penanganan masalah, bug, dan error teknis yang masih berada dalam ruang lingkup layanan. Maintenance tidak mencakup pembuatan fitur baru, perubahan fungsi besar, redesign besar, atau perubahan scope.",
      },
      {
        id: "maintenance-habis",
        question: "Bagaimana jika masa maintenance habis?",
        answer:
          "Layanan maintenance menjadi tidak aktif. Jika client membutuhkan perbaikan atau pemeliharaan kembali, client dapat memesan paket maintenance baru melalui Dashboard.",
      },
    ],
  },
  {
    id: "tagihan",
    name: "Tagihan, Server & Pembayaran",
    slug: "tagihan",
    items: [
      {
        id: "tagihan-skema",
        question: "Bagaimana skema pembayaran di Appfoundry?",
        answer:
          "Skema pembayaran project menggunakan sistem 50/50: 50% DP (Pembayaran Awal) dilakukan sebelum project memasuki proses development, dan 50% Pelunasan dilakukan ketika project memasuki tahap final setelah client menyetujui hasil pengerjaan, sebelum website dideploy/go-live.",
      },
      {
        id: "tagihan-metode",
        question: "Metode pembayaran apa yang digunakan?",
        answer:
          "Pembayaran dilakukan secara otomatis melalui QRIS Payment Gateway yang terhubung langsung dengan platform Appfoundry.",
      },
      {
        id: "tagihan-server",
        question: "Apa saja opsi server / infrastruktur yang tersedia?",
        answer:
          "Opsi server dihitung secara tahunan dan dapat disesuaikan pada configurator:\\n\\n- Shared Server: Rp350.000/tahun\\n- VPS Entry: Rp1.500.000/tahun\\n- VPS Pro: Rp3.000.000/tahun\\n- Dedicated Basic: Rp7.200.000/tahun\\n- Dedicated Pro: Rp8.400.000/tahun",
      },
      {
        id: "tagihan-refund",
        question: "Bagaimana kebijakan refund jika client membatalkan project?",
        answer:
          "Client tidak dapat melakukan pembatalan project setelah proses development resmi dimulai, karena alokasi sumber daya, waktu, dan proses pengerjaan telah berjalan untuk project tersebut.",
      },
      {
        id: "tagihan-telat",
        question:
          "Apa yang terjadi jika pelunasan terlambat atau tidak dibayarkan?",
        answer:
          "Website atau aplikasi tidak akan dideploy/go-live sebelum pembayaran dilunasi. Apabila tagihan tidak diselesaikan dalam waktu maksimal 1 bulan sejak jatuh tempo, Appfoundry berhak menunda project atau menangguhkan layanan.",
      },
    ],
  },
  {
    id: "dokumen",
    name: "Dokumen, Kontrak & Kepemilikan",
    slug: "dokumen",
    items: [
      {
        id: "dokumen-tersedia",
        question: "Dokumen apa saja yang tersedia bagi client?",
        answer:
          "Dokumen seperti Kontrak Perjanjian, BAST (Berita Acara Serah Terima), Kebijakan Layanan, serta Nota/Invoice tagihan tersedia dan dapat diakses langsung melalui Dashboard Client.",
      },
      {
        id: "dokumen-masa",
        question: "Berapa lama masa berlaku kontrak layanan?",
        answer:
          "Masa berlaku kontrak utama layanan adalah 1 tahun sejak website/app memasuki masa layanan sesuai ketentuan kontrak.",
      },
      {
        id: "dokumen-pemilik",
        question: "Siapa pemilik source code dan database website?",
        answer:
          "Selama masa kontrak aktif (Tahun ke-1), kepemilikan dan pengelolaan teknis source code serta database berada di bawah manajemen Appfoundry. Apabila masa kontrak 1 tahun telah berakhir dan client memutuskan untuk tidak memperpanjang layanan, source code dan database akan diserahkan (handover) kepada client untuk kebutuhan migrasi.",
      },
      {
        id: "dokumen-handover",
        question: "Apakah ada biaya handover / migrasi setelah kontrak habis?",
        answer:
          "Setelah masa kontrak 1 tahun berakhir, proses handover source code dan database tidak dikenakan biaya. Jika client meminta penghentian layanan atau migrasi sebelum masa kontrak berakhir, berlaku ketentuan penalti sebagaimana tercantum dalam kontrak perjanjian.",
      },
    ],
  },
  {
    id: "akun",
    name: "Akun, Dashboard & CMS",
    slug: "akun",
    items: [
      {
        id: "akun-login",
        question: "Bagaimana cara login ke Dashboard Appfoundry?",
        answer:
          "Client login menggunakan autentikasi akun Google. Appfoundry tidak menggunakan sistem password manual untuk alasan keamanan akun client.",
      },
      {
        id: "akun-cms",
        question: "Apakah Dashboard Appfoundry sama dengan CMS Kelola Konten?",
        answer:
          "Tidak. Dashboard Appfoundry berfungsi sebagai Control Center client untuk melihat konfigurasi, status pengerjaan, tagihan & pembayaran, dokumen project, status maintenance, serta mengajukan tiket support. Fitur pengelolaan konten (CMS) tersedia sesuai paket yang dipilih: Dashboard Dinamis (+Rp500.000) atau Dashboard Komplit (+Rp2.500.000).",
      },
    ],
  },
  {
    id: "afiliasi",
    name: "Program Afiliasi",
    slug: "afiliasi",
    items: [
      {
        id: "afiliasi-level",
        question: "Bagaimana tingkat level dan pembagian komisi affiliate?",
        answer:
          "Komisi didasarkan pada jumlah User Referral yang pembayarannya telah berhasil dikonfirmasi (status Paid):\\n\\n- Bronze (0–5 user): 10%\\n- Silver (6–12 user): 12%\\n- Gold (13–24 user): 15%\\n- Platinum (25–30 user): 18%\\n- Diamond (31+ user): 20%",
      },
      {
        id: "afiliasi-cair",
        question: "Kapan komisi affiliate dapat dicairkan?",
        answer:
          "Komisi menjadi dapat dicairkan setelah user baru yang direferensikan telah melakukan pemesanan dan pembayarannya terkonfirmasi lunas (Paid). Minimum pencairan komisi adalah Rp500.000 dan diproses maksimal dalam 2 × 24 jam setelah pengajuan.",
      },
      {
        id: "afiliasi-daftar",
        question:
          "Apakah pendaftaran user tanpa pemesanan menghasilkan komisi?",
        answer:
          "Tidak. User yang mendaftar melalui link referral tetapi belum melakukan pemesanan dan pembayaran tidak menimbulkan efek komisi.",
      },
    ],
  },
];

export const getCategoryBySlug = (slug) => {
  if (slug === "all")
    return { id: "all", name: "Semua", slug: "all", items: [] };
  return faqCategories.find((cat) => cat.slug === slug) || null;
};

export const getAllFaqItems = () => {
  return faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryId: cat.id,
      categoryName: cat.name,
    })),
  );
};
