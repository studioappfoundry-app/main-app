/**
 * dummy.js
 * Data Dummy Backend SQLite Cache — mengikuti "Standar Database Appfoundry"
 * (Revisi Arsitektur Data — Agustus 2026)
 *
 * Setiap dataset mengikuti format standar dari backend:
 * { table_name, data: [], version, time_updated }
 *
 * Skenario:
 * - gian.prambudi@gmail.com  -> data lengkap di semua tabel KECUALI
 *   support_tickets & ticket_messages
 * - endra.wijaya@gmail.com   -> baru login, baru ada row di tabel users saja
 */

// ==================== ID REFERENCE ====================
const IDS = {
  userGian: 1,
  userEndra: 2,

  profileGian: 1,
  businessGian: 1,

  orderGian: 1,
  itemGian1: 1,
  itemGian2: 2,
  itemGian3: 3,

  projectGian: 1,

  devGian1: 1,
  devGian2: 2,
  devGian3: 3,

  websiteGian: 1,

  maintenanceGian: 1,
  mactGian1: 1,
  mactGian2: 2,

  paymentGian1: 1,
  paymentGian2: 2,

  docGian1: 1,
  docGian2: 2,

  seoSnapshotGian: 1,
};

// ==================== 6.1 users ====================
export const usersCache = {
  table_name: "users",
  data: [
    {
      id: IDS.userGian,
      google_id: "108234981723456789012",
      email: "gian.prambudi@gmail.com",
      role: "client",
      status: "active",
      last_login_at: "2026-08-14T09:12:00Z",
      created_at: "2026-05-02T03:10:00Z",
      updated_at: "2026-08-14T09:12:00Z",
    },
    {
      id: IDS.userEndra,
      google_id: "109887234981723456012",
      email: "endra.wijaya@gmail.com",
      role: "client",
      status: "active",
      last_login_at: "2026-08-14T10:45:00Z",
      created_at: "2026-08-14T10:45:00Z",
      updated_at: "2026-08-14T10:45:00Z",
    },
    {
      id: 3,
      google_id: "2748723498172334596185",
      email: "maeskey19@gmail.com",
      role: "admin",
      status: "active",
      last_login_at: "2026-08-14T10:45:00Z",
      created_at: "2026-08-14T10:45:00Z",
      updated_at: "2026-08-14T10:45:00Z",
    },
  ],
  version: 2,
  time_updated: "2026-08-14T10:45:00Z",
};

// ==================== 6.2 profiles ====================
// Hanya Gian, karena Endra baru login dan belum melengkapi profil
export const profilesCache = {
  table_name: "profiles",
  data: [
    {
      id: IDS.profileGian,
      user_id: IDS.userGian,
      name: "Gian Prambudi",
      avatar_url:
        "https://lh3.googleusercontent.com/a/gian-prambudi-avatar.jpg",
      phone: "081234567890",
      created_at: "2026-05-02T03:15:00Z",
      updated_at: "2026-05-02T03:15:00Z",
    },
  ],
  version: 1,
  time_updated: "2026-05-02T03:15:00Z",
};

// ==================== 6.3 client_businesses ====================
export const clientBusinessesCache = {
  table_name: "client_businesses",
  data: [
    {
      id: IDS.businessGian,
      user_id: IDS.userGian,
      name: "Prambudi Coffee & Roastery",
      email: "admin@prambudicoffee.id",
      phone: "0541998877",
      type: "F&B",
      address: "Jl. Jenderal Sudirman No. 45, Balikpapan, Kalimantan Timur",
      description:
        "Kedai kopi dan roastery lokal dengan 3 cabang di Balikpapan.",
      created_at: "2026-05-02T03:20:00Z",
      updated_at: "2026-05-02T03:20:00Z",
    },
  ],
  version: 1,
  time_updated: "2026-05-02T03:20:00Z",
};

// ==================== 6.4 orders ====================
export const ordersCache = {
  table_name: "orders",
  data: [
    {
      id: IDS.orderGian,
      user_id: IDS.userGian,
      business_id: IDS.businessGian,
      order_number: "ORD-2026-0512",
      total_amount: 18500000,
      status: "in_progress",
      created_at: "2026-05-03T02:00:00Z",
      updated_at: "2026-08-10T04:30:00Z",
    },
  ],
  version: 5,
  time_updated: "2026-08-10T04:30:00Z",
};

// ==================== 6.5 order_items ====================
export const orderItemsCache = {
  table_name: "order_items",
  data: [
    {
      id: IDS.itemGian1,
      order_id: IDS.orderGian,
      category: "website_package",
      name: "Paket Website Company Profile",
      quantity: 1,
      unit_price: 12000000,
      total_price: 12000000,
      metadata: {
        pages: 6,
        revisions: 3,
      },
      created_at: "2026-05-03T02:00:00Z",
    },
    {
      id: IDS.itemGian2,
      order_id: IDS.orderGian,
      category: "addon",
      name: "Integrasi Sistem Pemesanan Online",
      quantity: 1,
      unit_price: 5000000,
      total_price: 5000000,
      metadata: {
        module: "online_order",
      },
      created_at: "2026-05-03T02:00:00Z",
    },
    {
      id: IDS.itemGian3,
      order_id: IDS.orderGian,
      category: "maintenance",
      name: "Maintenance 6 Bulan",
      quantity: 1,
      unit_price: 1500000,
      total_price: 1500000,
      metadata: {
        duration_months: 6,
      },
      created_at: "2026-05-03T02:00:00Z",
    },
  ],
  version: 1,
  time_updated: "2026-05-03T02:00:00Z",
};

// ==================== 6.6 projects ====================
export const projectsCache = {
  table_name: "projects",
  data: [
    {
      id: IDS.projectGian,
      order_id: IDS.orderGian,
      business_id: IDS.businessGian,
      name: "Website Prambudi Coffee & Roastery",
      status: "development",
      started_at: "2026-05-05T01:00:00Z",
      target_date: "2026-08-30T00:00:00Z",
      completed_at: null,
      created_at: "2026-05-03T02:05:00Z",
      updated_at: "2026-08-10T04:30:00Z",
    },
  ],
  version: 6,
  time_updated: "2026-08-10T04:30:00Z",
};

// ==================== 6.7 development_activities ====================
export const developmentActivitiesCache = {
  table_name: "development_activities",
  data: [
    {
      id: IDS.devGian1,
      project_id: IDS.projectGian,
      title: "Setup Repository & Environment",
      description:
        "Inisialisasi project Nuxt.js, struktur folder, dan environment staging.",
      status: "done",
      progress: 100,
      activity_date: "2026-05-06T01:00:00Z",
      created_at: "2026-05-06T01:00:00Z",
      updated_at: "2026-05-08T03:00:00Z",
    },
    {
      id: IDS.devGian2,
      project_id: IDS.projectGian,
      title: "Desain UI/UX Halaman Utama",
      description: "Pembuatan wireframe dan desain final untuk landing page.",
      status: "done",
      progress: 100,
      activity_date: "2026-05-20T01:00:00Z",
      created_at: "2026-05-20T01:00:00Z",
      updated_at: "2026-06-02T03:00:00Z",
    },
    {
      id: IDS.devGian3,
      project_id: IDS.projectGian,
      title: "Integrasi Sistem Pemesanan Online",
      description:
        "Pengembangan modul pemesanan online dan koneksi ke payment gateway.",
      status: "in_progress",
      progress: 65,
      activity_date: "2026-08-05T01:00:00Z",
      created_at: "2026-08-05T01:00:00Z",
      updated_at: "2026-08-10T04:30:00Z",
    },
  ],
  version: 3,
  time_updated: "2026-08-10T04:30:00Z",
};

// ==================== 6.8 websites ====================
export const websitesCache = {
  table_name: "websites",
  data: [
    {
      id: IDS.websiteGian,
      project_id: IDS.projectGian,
      domain: "prambudicoffee.id",
      url: "https://staging.prambudicoffee.id",
      hosting_package: "Cloud VPS 2GB",
      server: "appfoundry-sg-01",
      server_location: "Singapore",
      ssl_status: "active",
      status: "development",
      live_at: null,
      platform: "Nuxt.js",
      language: "Vue 3 / Node.js",
      database: "MySQL",
      runtime_version: "Node 20 LTS",
      design: "Custom",
      theme: "Modern Minimalist",
      created_at: "2026-05-06T01:30:00Z",
      updated_at: "2026-08-10T04:30:00Z",
    },
  ],
  version: 4,
  time_updated: "2026-08-10T04:30:00Z",
};

// ==================== 6.9 maintenance ====================
export const maintenanceCache = {
  table_name: "maintenance",
  data: [
    {
      id: IDS.maintenanceGian,
      project_id: IDS.projectGian,
      type: "server_monitoring",
      start_date: "2026-09-01T00:00:00Z",
      end_date: "2027-02-28T23:59:59Z",
      status: "active",
      created_at: "2026-08-01T02:00:00Z",
      updated_at: "2026-08-01T02:00:00Z",
    },
  ],
  version: 1,
  time_updated: "2026-08-01T02:00:00Z",
};

// ==================== 6.10 maintenance_activities ====================
export const maintenanceActivitiesCache = {
  table_name: "maintenance_activities",
  data: [
    {
      id: IDS.mactGian1,
      maintenance_id: IDS.maintenanceGian,
      type: "uptime_check",
      title: "Pengecekan Uptime Server Mingguan",
      status: "completed",
      checked_at: "2026-08-08T00:00:00Z",
      created_at: "2026-08-08T00:00:00Z",
    },
    {
      id: IDS.mactGian2,
      maintenance_id: IDS.maintenanceGian,
      type: "backup",
      title: "Backup Database Mingguan",
      status: "completed",
      checked_at: "2026-08-11T00:00:00Z",
      created_at: "2026-08-11T00:00:00Z",
    },
  ],
  version: 2,
  time_updated: "2026-08-11T00:00:00Z",
};

// ==================== 6.11 payments ====================
export const paymentsCache = {
  table_name: "payments",
  data: [
    {
      id: IDS.paymentGian1,
      order_id: IDS.orderGian,
      payment_type: "down_payment",
      transaction_id: "TRX-20260503-0021",
      amount: 9250000,
      due_date: "2026-05-10T23:59:59Z",
      paid_at: "2026-05-04T06:00:00Z",
      status: "paid",
      created_at: "2026-05-03T02:10:00Z",
      updated_at: "2026-05-04T06:00:00Z",
    },
    {
      id: IDS.paymentGian2,
      order_id: IDS.orderGian,
      payment_type: "final_payment",
      transaction_id: null,
      amount: 9250000,
      due_date: "2026-08-31T23:59:59Z",
      paid_at: null,
      status: "pending",
      created_at: "2026-05-03T02:10:00Z",
      updated_at: "2026-05-03T02:10:00Z",
    },
  ],
  version: 3,
  time_updated: "2026-05-04T06:00:00Z",
};

// ==================== 6.12 documents ====================
export const documentsCache = {
  table_name: "documents",
  data: [
    {
      id: IDS.docGian1,
      project_id: IDS.projectGian,
      name: "Invoice Down Payment",
      document_number: "INV-2026-0512-DP",
      document_date: "2026-05-04T00:00:00Z",
      file_url:
        "https://cdn.appfoundry.id/documents/invoice-dp-ord-2026-0512.pdf",
      created_at: "2026-05-04T06:05:00Z",
      updated_at: "2026-05-04T06:05:00Z",
    },
    {
      id: IDS.docGian2,
      project_id: IDS.projectGian,
      name: "Dokumen Proposal & Scope of Work",
      document_number: "SOW-2026-0512",
      document_date: "2026-05-03T00:00:00Z",
      file_url: "https://cdn.appfoundry.id/documents/sow-ord-2026-0512.pdf",
      created_at: "2026-05-03T02:15:00Z",
      updated_at: "2026-05-03T02:15:00Z",
    },
  ],
  version: 2,
  time_updated: "2026-05-04T06:05:00Z",
};

// ==================== 8. Data SEO & GEO ====================
// Data disimpan sebagai snapshot per project/website.
// Backend memberikan data mentah hasil cache Google Search Console.
// Mapping ke metricsSummary, lineChartData, topQueries,
// topPages, dan geoReadiness dilakukan parser di frontend.
//
// Selama snapshot_date masih berada pada hari yang sama,
// frontend menggunakan Browser SQLite dan tidak perlu fetch ulang.
//
// ID snapshot bersifat integer seperti tabel database lainnya.
export const seoGeoSnapshotsCache = {
  table_name: "seo_geo_snapshots",
  data: [
    {
      id: IDS.seoSnapshotGian,
      project_id: IDS.projectGian,
      website_id: IDS.websiteGian,
      domain: "prambudicoffee.id",
      snapshot_date: "2026-08-14T00:00:00Z",
      raw: {
        metricsSummary: {
          clicks: {
            value: 842,
            previousValue: 690,
            changePercent: 22.03,
          },
          impressions: {
            value: 31500,
            previousValue: 27800,
            changePercent: 13.31,
          },
          ctr: {
            value: 2.67,
            previousValue: 2.48,
            changePercent: 7.66,
          },
          position: {
            value: 11.6,
            previousValue: 13.9,
            changeDiff: 2.3,
          },
        },

        lineChartData: {
          dates: [
            "2026-08-01T00:00:00Z",
            "2026-08-02T00:00:00Z",
            "2026-08-03T00:00:00Z",
            "2026-08-04T00:00:00Z",
            "2026-08-05T00:00:00Z",
            "2026-08-06T00:00:00Z",
            "2026-08-07T00:00:00Z",
            "2026-08-08T00:00:00Z",
            "2026-08-09T00:00:00Z",
            "2026-08-10T00:00:00Z",
            "2026-08-11T00:00:00Z",
            "2026-08-12T00:00:00Z",
            "2026-08-13T00:00:00Z",
            "2026-08-14T00:00:00Z",
          ],

          clicks: [48, 52, 55, 61, 58, 63, 67, 60, 64, 70, 68, 74, 76, 79],

          impressions: [
            1980, 2020, 2105, 2260, 2190, 2310, 2405, 2260, 2330, 2480, 2410,
            2560, 2610, 2680,
          ],

          ctr: [
            2.42, 2.57, 2.61, 2.7, 2.65, 2.73, 2.79, 2.65, 2.75, 2.82, 2.82,
            2.89, 2.91, 2.95,
          ],

          position: [
            14.2, 13.9, 13.6, 13.1, 13.3, 12.8, 12.4, 12.6, 12.2, 11.9, 12.0,
            11.7, 11.6, 11.6,
          ],
        },

        topQueries: [
          {
            query: "kopi balikpapan",
            clicks: 186,
            impressions: 3200,
            ctr: 5.81,
            position: 3.2,
          },
          {
            query: "roastery kopi kalimantan timur",
            clicks: 124,
            impressions: 2100,
            ctr: 5.9,
            position: 4.1,
          },
          {
            query: "kedai kopi balikpapan sudirman",
            clicks: 97,
            impressions: 1450,
            ctr: 6.69,
            position: 2.8,
          },
          {
            query: "biji kopi lokal balikpapan",
            clicks: 61,
            impressions: 1980,
            ctr: 3.08,
            position: 7.4,
          },
          {
            query: "prambudi coffee",
            clicks: 58,
            impressions: 620,
            ctr: 9.35,
            position: 1.4,
          },
        ],

        topPages: [
          {
            page: "https://prambudicoffee.id/",
            clicks: 312,
            impressions: 9800,
            ctr: 3.18,
            position: 6.7,
          },
          {
            page: "https://prambudicoffee.id/menu",
            clicks: 198,
            impressions: 6400,
            ctr: 3.09,
            position: 8.2,
          },
          {
            page: "https://prambudicoffee.id/tentang-kami",
            clicks: 121,
            impressions: 4100,
            ctr: 2.95,
            position: 9.6,
          },
          {
            page: "https://prambudicoffee.id/cabang/sudirman",
            clicks: 89,
            impressions: 3200,
            ctr: 2.78,
            position: 10.4,
          },
          {
            page: "https://prambudicoffee.id/blog/proses-roasting-kopi",
            clicks: 67,
            impressions: 2900,
            ctr: 2.31,
            position: 12.9,
          },
        ],

        geoReadiness: {
          googleSearchConsole: "connected",
          sitemap: "submitted",
          metaTitle: "complete",
          structuredData: "partial",
          robotsTxt: "complete",
          geoReadinessScore: 82,
        },
      },

      fetched_from: "cache",

      created_at: "2026-08-14T07:00:00Z",
      updated_at: "2026-08-14T07:00:00Z",
    },
  ],

  version: 14,
  time_updated: "2026-08-14T07:00:00Z",
};

// ==================== 6.13 support_tickets ====================
// Kosong — sesuai skenario, belum ada data support sama sekali
export const supportTicketsCache = {
  table_name: "support_tickets",
  data: [],
  version: 0,
  time_updated: null,
};

// ==================== 6.14 ticket_messages ====================
// Kosong — mengikuti support_tickets yang masih kosong
export const ticketMessagesCache = {
  table_name: "ticket_messages",
  data: [],
  version: 0,
  time_updated: null,
};

// ==================== SYNC MANIFEST ====================
// Manifest digunakan frontend untuk membandingkan versi cache lokal
// dengan versi data dari backend.
export const syncManifest = {
  time_updated: "2026-08-14T10:45:00Z",

  tables: [
    {
      table_name: "users",
      version: usersCache.version,
      time_updated: usersCache.time_updated,
    },
    {
      table_name: "profiles",
      version: profilesCache.version,
      time_updated: profilesCache.time_updated,
    },
    {
      table_name: "client_businesses",
      version: clientBusinessesCache.version,
      time_updated: clientBusinessesCache.time_updated,
    },
    {
      table_name: "orders",
      version: ordersCache.version,
      time_updated: ordersCache.time_updated,
    },
    {
      table_name: "order_items",
      version: orderItemsCache.version,
      time_updated: orderItemsCache.time_updated,
    },
    {
      table_name: "projects",
      version: projectsCache.version,
      time_updated: projectsCache.time_updated,
    },
    {
      table_name: "development_activities",
      version: developmentActivitiesCache.version,
      time_updated: developmentActivitiesCache.time_updated,
    },
    {
      table_name: "websites",
      version: websitesCache.version,
      time_updated: websitesCache.time_updated,
    },
    {
      table_name: "maintenance",
      version: maintenanceCache.version,
      time_updated: maintenanceCache.time_updated,
    },
    {
      table_name: "maintenance_activities",
      version: maintenanceActivitiesCache.version,
      time_updated: maintenanceActivitiesCache.time_updated,
    },
    {
      table_name: "payments",
      version: paymentsCache.version,
      time_updated: paymentsCache.time_updated,
    },
    {
      table_name: "documents",
      version: documentsCache.version,
      time_updated: documentsCache.time_updated,
    },
    {
      table_name: "seo_geo_snapshots",
      version: seoGeoSnapshotsCache.version,
      time_updated: seoGeoSnapshotsCache.time_updated,
    },
    {
      table_name: "support_tickets",
      version: supportTicketsCache.version,
      time_updated: supportTicketsCache.time_updated,
    },
    {
      table_name: "ticket_messages",
      version: ticketMessagesCache.version,
      time_updated: ticketMessagesCache.time_updated,
    },
  ],
};

// ==================== EXPORT GABUNGAN ====================
// Dipakai untuk seed Browser SQLite Cache / Pinia Store sekaligus
export const dummyCache = {
  users: usersCache,
  profiles: profilesCache,
  client_businesses: clientBusinessesCache,
  orders: ordersCache,
  order_items: orderItemsCache,
  projects: projectsCache,
  development_activities: developmentActivitiesCache,
  websites: websitesCache,
  maintenance: maintenanceCache,
  maintenance_activities: maintenanceActivitiesCache,
  payments: paymentsCache,
  documents: documentsCache,
  seo_geo_snapshots: seoGeoSnapshotsCache,
  support_tickets: supportTicketsCache,
  ticket_messages: ticketMessagesCache,
};

export default dummyCache;
