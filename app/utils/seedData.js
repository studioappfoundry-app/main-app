// ============================================================
// SEED DATA — AppFoundry SaaS Database
// 3 Users: Complete, Partial, Fresh Register
// ============================================================

// --- Helper: deterministic UUID generator (mirror of uuidv5) ---
// In production, use `uuid` package. Here we use pre-computed UUIDs.

const USERS = [
  {
    id: "e063bb16-cc76-558b-9f94-afe212747cda",
    google_id: "google_001_budi_santoso",
    email: "budi.santoso@appfoundry.id",
    role: "client",
    status: "active",
    last_login_at: "2026-09-06T14:30:00Z",
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-09-06T14:30:00Z",
  },
  {
    id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    google_id: "google_002_siti_aminah",
    email: "siti.aminah@appfoundry.id",
    role: "client",
    status: "active",
    last_login_at: "2026-08-20T10:15:00Z",
    created_at: "2026-03-10T09:00:00Z",
    updated_at: "2026-08-20T10:15:00Z",
  },
  {
    id: "19890105-81dd-55fc-a202-914fbf1e88a1",
    google_id: "google_003_ahmad_rizky",
    email: "ahmad.rizky@appfoundry.id",
    role: "client",
    status: "active",
    last_login_at: "2026-09-06T12:00:00Z",
    created_at: "2026-09-06T12:00:00Z",
    updated_at: "2026-09-06T12:00:00Z",
  },
  // Admin user (optional, for admin dashboard testing)
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    google_id: "google_000_admin",
    email: "admin@appfoundry.id",
    role: "admin",
    status: "active",
    last_login_at: "2026-09-06T16:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-09-06T16:00:00Z",
  },
];

const PROFILES = [
  {
    id: "p001-uuid-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    name: "Budi Santoso",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    phone: "+6281234567890",
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-09-06T14:30:00Z",
  },
  {
    id: "p002-uuid-2222-2222-222222222222",
    user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    name: "Siti Aminah",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
    phone: "+6281987654321",
    created_at: "2026-03-10T09:00:00Z",
    updated_at: "2026-08-20T10:15:00Z",
  },
  {
    id: "p003-uuid-3333-3333-333333333333",
    user_id: "19890105-81dd-55fc-a202-914fbf1e88a1",
    name: "Ahmad Rizky",
    avatar_url: null,
    phone: null,
    created_at: "2026-09-06T12:00:00Z",
    updated_at: "2026-09-06T12:00:00Z",
  },
  {
    id: "p000-uuid-0000-0000-000000000000",
    user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Super Admin",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    phone: "+6280000000000",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-09-06T16:00:00Z",
  },
];

const AFFILIATES = [
  {
    id: "aff-001-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    referred_id: null, // Budi adalah affiliate top-level
    status: "active",
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-09-06T14:30:00Z",
  },
  {
    id: "aff-002-2222-2222-222222222222",
    user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    referred_id: "aff-001-1111-1111-111111111111", // Siti direferensikan Budi
    status: "active",
    created_at: "2026-03-10T09:00:00Z",
    updated_at: "2026-03-10T09:00:00Z",
  },
  {
    id: "aff-003-3333-3333-333333333333",
    user_id: "19890105-81dd-55fc-a202-914fbf1e88a1",
    referred_id: "aff-002-2222-2222-222222222222", // Ahmad direferensikan Siti
    status: "non",
    created_at: "2026-09-06T12:00:00Z",
    updated_at: "2026-09-06T12:00:00Z",
  },
];

const AFFILIATE_COMMISSIONS = [
  {
    id: "com-001-1111-1111-111111111111",
    order_id: "ord-002-2222-2222-222222222222", // dari order Siti
    referred_user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    commission_rate: 10.0,
    commission_amount: 1500000.0,
    paid: "2026-04-05T10:00:00Z",
    created_at: "2026-04-01T09:00:00Z",
    updated_at: "2026-04-05T10:00:00Z",
  },
];

const CLIENT_BUSINESSES = [
  {
    id: "biz-001-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    name: "Warung Kopi Digital",
    type: "Kuliner & F&B",
    address: "Jl. Sudirman No. 45, Jakarta Selatan",
    description:
      "Kedai kopi modern dengan konsep digital-first dan delivery online.",
    created_at: "2026-01-15T08:30:00Z",
    updated_at: "2026-06-10T11:00:00Z",
  },
  {
    id: "biz-002-2222-2222-222222222222",
    user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    name: "Boutique Nusantara",
    type: "Fashion & Retail",
    address: "Jl. Malioboro No. 12, Yogyakarta",
    description: "Butik pakaian tradisional modern dengan penjualan online.",
    created_at: "2026-03-10T09:30:00Z",
    updated_at: "2026-03-10T09:30:00Z",
  },
  // User 3 (Ahmad) belum punya bisnis
];

const ORDERS = [
  {
    id: "ord-001-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    business_id: "biz-001-1111-1111-111111111111",
    order_number: "ORD-2026-0001",
    total_amount: 18500000.0,
    status: "completed",
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-02-10T14:00:00Z",
  },
  {
    id: "ord-002-2222-2222-222222222222",
    user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    business_id: "biz-002-2222-2222-222222222222",
    order_number: "ORD-2026-0042",
    total_amount: 15000000.0,
    status: "completed",
    created_at: "2026-03-15T08:00:00Z",
    updated_at: "2026-04-01T09:00:00Z",
  },
];

const ORDER_ITEMS = [
  // --- Order 1 (Budi — Paket Lengkap + SEO + Maintenance) ---
  {
    id: "oi-001-a111-1111-111111111111",
    order_id: "ord-001-1111-1111-111111111111",
    category: "website",
    name: "Website Bisnis Premium",
    quantity: 1,
    unit_price: 12000000.0,
    total_price: 12000000.0,
    metadata: {
      pondasi: "Next.js 14 + Tailwind",
      dashboard: "Admin Panel Custom",
      design: "Custom UI/UX",
      theme: "Bespoke Design",
      pages: 12,
      responsive: true,
      cms: true,
    },
    created_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "oi-001-b222-2222-222222222222",
    order_id: "ord-001-1111-1111-111111111111",
    category: "seo",
    name: "SEO Premium Package",
    quantity: 1,
    unit_price: 3500000.0,
    total_price: 3500000.0,
    metadata: {
      package_type: "premium",
      duration_months: 6,
      includes: [
        "keyword_research",
        "on_page",
        "technical_seo",
        "monthly_report",
      ],
    },
    created_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "oi-001-c333-3333-333333333333",
    order_id: "ord-001-1111-1111-111111111111",
    category: "maintenance",
    name: "Maintenance 12 Bulan",
    quantity: 1,
    unit_price: 3000000.0,
    total_price: 3000000.0,
    metadata: {
      duration_months: 12,
      includes: [
        "security_updates",
        "backup_weekly",
        "bug_fixes",
        "performance_monitoring",
      ],
    },
    created_at: "2026-02-01T10:00:00Z",
  },
  // --- Order 2 (Siti — Paket Website Saja) ---
  {
    id: "oi-002-a444-4444-444444444444",
    order_id: "ord-002-2222-2222-222222222222",
    category: "website",
    name: "Website E-Commerce Standard",
    quantity: 1,
    unit_price: 15000000.0,
    total_price: 15000000.0,
    metadata: {
      pondasi: "Nuxt 3 + Vuetify",
      dashboard: "Admin Panel Bawaan",
      design: "Template Premium",
      theme: "Nusantara Theme",
      pages: 8,
      responsive: true,
      cms: true,
      ecommerce: true,
    },
    created_at: "2026-03-15T08:00:00Z",
  },
];

const PAYMENTS = [
  {
    id: "pay-001-1111-1111-111111111111",
    order_id: "ord-001-1111-1111-111111111111",
    payment_type: "dp",
    transaction_id: "TRX-MIDTRANS-001-ABC",
    amount: 9250000.0,
    due_date: "2026-02-01",
    paid_at: "2026-02-01T10:30:00Z",
    status: "paid",
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-02-01T10:30:00Z",
  },
  {
    id: "pay-002-1111-1111-111111111111",
    order_id: "ord-001-1111-1111-111111111111",
    payment_type: "pelunasan",
    transaction_id: "TRX-MIDTRANS-002-DEF",
    amount: 9250000.0,
    due_date: "2026-03-01",
    paid_at: "2026-02-25T09:00:00Z",
    status: "paid",
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-02-25T09:00:00Z",
  },
  {
    id: "pay-003-2222-2222-222222222222",
    order_id: "ord-002-2222-2222-222222222222",
    payment_type: "dp",
    transaction_id: "TRX-MIDTRANS-003-GHI",
    amount: 7500000.0,
    due_date: "2026-03-15",
    paid_at: "2026-03-15T08:30:00Z",
    status: "paid",
    created_at: "2026-03-15T08:00:00Z",
    updated_at: "2026-03-15T08:30:00Z",
  },
  {
    id: "pay-004-2222-2222-222222222222",
    order_id: "ord-002-2222-2222-222222222222",
    payment_type: "pelunasan",
    transaction_id: "TRX-MIDTRANS-004-JKL",
    amount: 7500000.0,
    due_date: "2026-04-15",
    paid_at: "2026-04-01T10:00:00Z",
    status: "paid",
    created_at: "2026-03-15T08:00:00Z",
    updated_at: "2026-04-01T10:00:00Z",
  },
];

const PROJECTS = [
  {
    id: "prj-001-1111-1111-111111111111",
    order_id: "ord-001-1111-1111-111111111111",
    business_id: "biz-001-1111-1111-111111111111",
    name: "Website Warung Kopi Digital",
    status: "in_progress",
    server: "VPS Singapore - DigitalOcean",
    domain: "warungkopidigital.id",
    pondasi: "Next.js 14 + Tailwind",
    dashboard: "Admin Panel Custom",
    design: "Custom UI/UX",
    theme: "Bespoke Design",
    started_at: "2026-02-15T08:00:00Z",
    target_date: "2026-05-15",
    completed_at: null,
    created_at: "2026-02-10T14:00:00Z",
    updated_at: "2026-08-30T16:00:00Z",
  },
  {
    id: "prj-002-2222-2222-222222222222",
    order_id: "ord-002-2222-2222-222222222222",
    business_id: "biz-002-2222-2222-222222222222",
    name: "E-Commerce Boutique Nusantara",
    status: "in_progress",
    server: "VPS Jakarta - IDCloudHost",
    domain: "boutiquenusantara.co.id",
    pondasi: "Nuxt 3 + Vuetify",
    dashboard: "Admin Panel Bawaan",
    design: "Template Premium",
    theme: "Nusantara Theme",
    started_at: "2026-04-05T09:00:00Z",
    target_date: "2026-07-05",
    completed_at: null,
    created_at: "2026-04-01T09:00:00Z",
    updated_at: "2026-08-25T11:00:00Z",
  },
];

const DEVELOPMENT_ACTIVITIES = [
  // --- Project 1 (Budi) ---
  {
    id: "da-001-a111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    title: "Discovery & Brainstorming",
    description:
      "Mengumpulkan kebutuhan bisnis, target audience, dan fitur utama website.",
    type: "idea",
    status: "completed",
    progress: 100,
    activity_date: "2026-02-15T08:00:00Z",
    created_at: "2026-02-15T08:00:00Z",
    updated_at: "2026-02-20T17:00:00Z",
  },
  {
    id: "da-001-b222-2222-222222222222",
    project_id: "prj-001-1111-1111-111111111111",
    title: "Wireframe & UX Design",
    description:
      "Pembuatan wireframe low-fidelity dan user flow untuk 12 halaman.",
    type: "design",
    status: "completed",
    progress: 100,
    activity_date: "2026-02-25T09:00:00Z",
    created_at: "2026-02-25T09:00:00Z",
    updated_at: "2026-03-10T15:00:00Z",
  },
  {
    id: "da-001-c333-3333-333333333333",
    project_id: "prj-001-1111-1111-111111111111",
    title: "UI Design — High Fidelity",
    description: "Desain visual final dengan branding Warung Kopi Digital.",
    type: "design",
    status: "completed",
    progress: 100,
    activity_date: "2026-03-12T08:00:00Z",
    created_at: "2026-03-12T08:00:00Z",
    updated_at: "2026-03-25T14:00:00Z",
  },
  {
    id: "da-001-d444-4444-444444444444",
    project_id: "prj-001-1111-1111-111111111111",
    title: "Frontend Development",
    description:
      "Implementasi Next.js 14 dengan Tailwind CSS dan komponen reusable.",
    type: "dev",
    status: "completed",
    progress: 100,
    activity_date: "2026-03-28T08:00:00Z",
    created_at: "2026-03-28T08:00:00Z",
    updated_at: "2026-05-10T16:00:00Z",
  },
  {
    id: "da-001-e555-5555-555555555555",
    project_id: "prj-001-1111-1111-111111111111",
    title: "Backend & API Integration",
    description:
      "Pengembangan API, database schema, dan integrasi payment gateway.",
    type: "dev",
    status: "completed",
    progress: 100,
    activity_date: "2026-04-15T09:00:00Z",
    created_at: "2026-04-15T09:00:00Z",
    updated_at: "2026-05-20T11:00:00Z",
  },
  {
    id: "da-001-f666-6666-666666666666",
    project_id: "prj-001-1111-1111-111111111111",
    title: "QA & User Acceptance Testing",
    description: "Pengujian fungsional, responsivitas, dan UAT bersama client.",
    type: "testing",
    status: "in_progress",
    progress: 75,
    activity_date: "2026-06-01T08:00:00Z",
    created_at: "2026-06-01T08:00:00Z",
    updated_at: "2026-08-30T16:00:00Z",
  },
  {
    id: "da-001-g777-7777-777777777777",
    project_id: "prj-001-1111-1111-111111111111",
    title: "Deployment & Go Live",
    description:
      "Deploy ke production server, konfigurasi SSL, dan DNS propagation.",
    type: "launch",
    status: "pending",
    progress: 0,
    activity_date: "2026-09-10T08:00:00Z",
    created_at: "2026-06-01T08:00:00Z",
    updated_at: "2026-06-01T08:00:00Z",
  },
  // --- Project 2 (Siti) ---
  {
    id: "da-002-a111-1111-111111111111",
    project_id: "prj-002-2222-2222-222222222222",
    title: "Discovery & Brainstorming",
    description:
      "Mengumpulkan kebutuhan e-commerce, katalog produk, dan fitur checkout.",
    type: "idea",
    status: "completed",
    progress: 100,
    activity_date: "2026-04-05T09:00:00Z",
    created_at: "2026-04-05T09:00:00Z",
    updated_at: "2026-04-10T17:00:00Z",
  },
  {
    id: "da-002-b222-2222-222222222222",
    project_id: "prj-002-2222-2222-222222222222",
    title: "UI/UX Design",
    description: "Desain interface toko online dengan nuansa batik modern.",
    type: "design",
    status: "completed",
    progress: 100,
    activity_date: "2026-04-15T08:00:00Z",
    created_at: "2026-04-15T08:00:00Z",
    updated_at: "2026-05-01T14:00:00Z",
  },
  {
    id: "da-002-c333-3333-333333333333",
    project_id: "prj-002-2222-2222-222222222222",
    title: "Development — Frontend & Backend",
    description: "Pengembangan Nuxt 3 frontend dan API e-commerce.",
    type: "dev",
    status: "in_progress",
    progress: 60,
    activity_date: "2026-05-10T09:00:00Z",
    created_at: "2026-05-10T09:00:00Z",
    updated_at: "2026-08-25T11:00:00Z",
  },
  {
    id: "da-002-d444-4444-444444444444",
    project_id: "prj-002-2222-2222-222222222222",
    title: "Testing & Launch",
    description: "QA, load testing, dan deployment ke production.",
    type: "testing",
    status: "pending",
    progress: 0,
    activity_date: "2026-08-01T08:00:00Z",
    created_at: "2026-05-10T09:00:00Z",
    updated_at: "2026-05-10T09:00:00Z",
  },
];

const WEBSITES = [
  {
    id: "web-001-1111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    url: "https://warungkopidigital.id",
    server_location: "Singapore",
    ssl_status: "active",
    status: "development",
    live_at: null,
    platform: "Next.js",
    language: "TypeScript",
    database: "PostgreSQL",
    runtime_version: "Node.js 20",
    created_at: "2026-02-15T08:00:00Z",
    updated_at: "2026-08-30T16:00:00Z",
  },
  {
    id: "web-002-2222-2222-222222222222",
    project_id: "prj-002-2222-2222-222222222222",
    url: "https://boutiquenusantara.co.id",
    server_location: "Jakarta",
    ssl_status: "active",
    status: "development",
    live_at: null,
    platform: "Nuxt 3",
    language: "TypeScript",
    database: "PostgreSQL",
    runtime_version: "Node.js 20",
    created_at: "2026-04-05T09:00:00Z",
    updated_at: "2026-08-25T11:00:00Z",
  },
];

const SEO = [
  // Hanya untuk Project 1 (Budi) — Paket Premium
  {
    id: "seo-001-1111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    package: "premium",
    status: "active",
    meta_title: "Warung Kopi Digital — Kopi Pilihan, Rasa Autentik",
    meta_description:
      "Temukan pengalaman kopi terbaik dengan biji pilihan dari petani lokal. Pesan online dan nikmati promo spesial.",
    meta_keywords:
      "kopi digital, kopi online, kopi jakarta, kedai kopi, kopi arabika",
    canonical_url: "https://warungkopidigital.id",
    robots_index: true,
    robots_follow: true,
    sitemap_enabled: true,
    schema_enabled: true,
    google_site_verification: "abc123def456",
    og_title: "Warung Kopi Digital",
    og_description: "Kopi pilihan dengan pengalaman digital terbaik.",
    og_image: "https://warungkopidigital.id/og-image.jpg",
    twitter_card: "summary_large_image",
    twitter_title: "Warung Kopi Digital",
    twitter_description: "Kopi pilihan dengan pengalaman digital terbaik.",
    twitter_image: "https://warungkopidigital.id/twitter-image.jpg",
    geo_enabled: true,
    geo_business_name: "Warung Kopi Digital",
    geo_address: "Jl. Sudirman No. 45, Jakarta Selatan",
    geo_city: "Jakarta Selatan",
    geo_region: "DKI Jakarta",
    geo_country: "Indonesia",
    geo_latitude: -6.2088,
    geo_longitude: 106.8456,
    started_at: "2026-06-01T00:00:00Z",
    expired_at: "2026-12-01T00:00:00Z",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-08-30T16:00:00Z",
  },
];

const MAINTENANCE = [
  // Hanya untuk Project 1 (Budi)
  {
    id: "mnt-001-1111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    type: "Full Maintenance 12 Bulan",
    start_date: "2026-06-01",
    end_date: "2027-06-01",
    status: "active",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-08-30T16:00:00Z",
  },
];

const MAINTENANCE_ACTIVITIES = [
  {
    id: "ma-001-a111-1111-111111111111",
    maintenance_id: "mnt-001-1111-1111-111111111111",
    type: "security_update",
    title: "Security Patch — Next.js & Dependencies",
    status: "completed",
    checked_at: "2026-06-15T10:00:00Z",
    created_at: "2026-06-15T10:00:00Z",
  },
  {
    id: "ma-001-b222-2222-222222222222",
    maintenance_id: "mnt-001-1111-1111-111111111111",
    type: "backup",
    title: "Weekly Full Backup",
    status: "completed",
    checked_at: "2026-06-22T08:00:00Z",
    created_at: "2026-06-22T08:00:00Z",
  },
  {
    id: "ma-001-c333-3333-333333333333",
    maintenance_id: "mnt-001-1111-1111-111111111111",
    type: "performance",
    title: "Performance Audit & Image Optimization",
    status: "completed",
    checked_at: "2026-07-10T14:00:00Z",
    created_at: "2026-07-10T14:00:00Z",
  },
  {
    id: "ma-001-d444-4444-444444444444",
    maintenance_id: "mnt-001-1111-1111-111111111111",
    type: "bug_fix",
    title: "Fix Mobile Navigation Menu Glitch",
    status: "completed",
    checked_at: "2026-08-05T11:00:00Z",
    created_at: "2026-08-05T11:00:00Z",
  },
  {
    id: "ma-001-e555-5555-555555555555",
    maintenance_id: "mnt-001-1111-1111-111111111111",
    type: "backup",
    title: "Weekly Full Backup — Agustus",
    status: "completed",
    checked_at: "2026-08-20T08:00:00Z",
    created_at: "2026-08-20T08:00:00Z",
  },
];

const DOCUMENTS = [
  {
    id: "doc-001-1111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    name: "Surat Kontrak Kerja",
    document_number: "DOC-2026-0001",
    document_date: "2026-02-01",
    file_url: "https://cdn.appfoundry.id/docs/kontrak-001.pdf",
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "doc-002-1111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    name: "Laporan Progress Bulan Juli",
    document_number: "DOC-2026-0008",
    document_date: "2026-07-31",
    file_url: "https://cdn.appfoundry.id/docs/progress-juli-001.pdf",
    created_at: "2026-07-31T17:00:00Z",
    updated_at: "2026-07-31T17:00:00Z",
  },
  {
    id: "doc-003-2222-2222-222222222222",
    project_id: "prj-002-2222-2222-222222222222",
    name: "Surat Kontrak Kerja",
    document_number: "DOC-2026-0042",
    document_date: "2026-04-01",
    file_url: "https://cdn.appfoundry.id/docs/kontrak-042.pdf",
    created_at: "2026-04-01T09:00:00Z",
    updated_at: "2026-04-01T09:00:00Z",
  },
];

const SUPPORT_TICKETS = [
  {
    id: "tkt-001-1111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    subject: "Request fitur reservasi meja online",
    category: "feature_request",
    priority: "medium",
    status: "open",
    created_at: "2026-08-10T09:00:00Z",
    updated_at: "2026-08-25T14:00:00Z",
  },
  {
    id: "tkt-002-1111-1111-111111111111",
    project_id: "prj-001-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    subject: "Perubahan warna brand logo",
    category: "design",
    priority: "low",
    status: "closed",
    created_at: "2026-05-20T10:00:00Z",
    updated_at: "2026-06-01T16:00:00Z",
  },
  {
    id: "tkt-003-2222-2222-222222222222",
    project_id: "prj-002-2222-2222-222222222222",
    user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    subject: "Integrasi payment gateway baru",
    category: "technical",
    priority: "high",
    status: "in_progress",
    created_at: "2026-08-01T08:00:00Z",
    updated_at: "2026-08-28T11:00:00Z",
  },
];

const TICKET_MESSAGES = [
  {
    id: "tm-001-a111-1111-111111111111",
    ticket_id: "tkt-001-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    message:
      "Halo, saya ingin menambahkan fitur reservasi meja untuk pelanggan yang ingin dine-in. Apakah bisa diimplementasikan sebelum go-live?",
    created_at: "2026-08-10T09:00:00Z",
  },
  {
    id: "tm-001-b222-2222-222222222222",
    ticket_id: "tkt-001-1111-1111-111111111111",
    user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    message:
      "Halo Pak Budi, fitur reservasi meja bisa kami tambahkan. Kami akan kirimkan estimasi waktu dan biaya tambahan dalam 1x24 jam.",
    created_at: "2026-08-10T14:00:00Z",
  },
  {
    id: "tm-001-c333-3333-333333333333",
    ticket_id: "tkt-001-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    message: "Baik, terima kasih. Saya tunggu estimasinya.",
    created_at: "2026-08-11T08:00:00Z",
  },
  {
    id: "tm-002-a111-1111-111111111111",
    ticket_id: "tkt-002-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    message:
      "Tim, kami sudah update warna brand menjadi emerald green. Mohon disesuaikan di seluruh halaman.",
    created_at: "2026-05-20T10:00:00Z",
  },
  {
    id: "tm-002-b222-2222-2222-222222222222",
    ticket_id: "tkt-002-1111-1111-111111111111",
    user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    message:
      "Noted, perubahan warna sudah kami terapkan di Figma dan akan masuk ke development sprint minggu ini.",
    created_at: "2026-05-20T16:00:00Z",
  },
  {
    id: "tm-002-c333-3333-333333333333",
    ticket_id: "tkt-002-1111-1111-111111111111",
    user_id: "e063bb16-cc76-558b-9f94-afe212747cda",
    message:
      "Sudah saya cek di staging, warnanya sudah sesuai. Ticket bisa ditutup.",
    created_at: "2026-06-01T16:00:00Z",
  },
  {
    id: "tm-003-a111-1111-111111111111",
    ticket_id: "tkt-003-2222-2222-222222222222",
    user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    message:
      "Saya ingin menambahkan opsi pembayaran via QRIS selain transfer bank. Bisa dibantu?",
    created_at: "2026-08-01T08:00:00Z",
  },
  {
    id: "tm-003-b222-2222-2222-222222222222",
    ticket_id: "tkt-003-2222-2222-222222222222",
    user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    message:
      "Bisa, kami sedang integrasi dengan Midtrans untuk mendukung QRIS. Estimasi selesai minggu depan.",
    created_at: "2026-08-02T09:00:00Z",
  },
  {
    id: "tm-003-c333-3333-333333333333",
    ticket_id: "tkt-003-2222-2222-222222222222",
    user_id: "7357d28a-a611-5efd-ae6e-a550a5b95487",
    message: "Baik, saya tunggu update selanjutnya.",
    created_at: "2026-08-28T11:00:00Z",
  },
];

// ============================================================
// EXPORT — Gunakan untuk seed Pinia Store / Browser SQLite
// ============================================================

export const seedData = {
  users: USERS,
  profiles: PROFILES,
  affiliates: AFFILIATES,
  affiliate_commissions: AFFILIATE_COMMISSIONS,
  client_businesses: CLIENT_BUSINESSES,
  orders: ORDERS,
  order_items: ORDER_ITEMS,
  payments: PAYMENTS,
  projects: PROJECTS,
  development_activities: DEVELOPMENT_ACTIVITIES,
  websites: WEBSITES,
  seo: SEO,
  maintenance: MAINTENANCE,
  maintenance_activities: MAINTENANCE_ACTIVITIES,
  documents: DOCUMENTS,
  support_tickets: SUPPORT_TICKETS,
  ticket_messages: TICKET_MESSAGES,
};

export default seedData;
