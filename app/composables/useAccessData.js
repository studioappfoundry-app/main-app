import { useAuthStore } from "../stores/auth";
import dummyCache from "../utils/seed";

/**
 * OWNERSHIP_MAP
 * Peta relasi kepemilikan data per tabel — SATU-SATUNYA tempat yang perlu
 * diubah kalau struktur relasi berubah nanti.
 *
 * - { key: "..." }        -> field pada baris itu sendiri yang merujuk ke
 *                            user_id (atau ke id user, khusus tabel "users").
 * - { via: { key, table } } -> field pada baris merujuk ke baris di tabel lain;
 *                            kepemilikan ditentukan secara rekursif dari sana.
 */
const OWNERSHIP_MAP = {
  users: { key: "id" },
  profiles: { key: "user_id" },
  client_businesses: { key: "user_id" },
  orders: { key: "user_id" },
  order_items: { via: { key: "order_id", table: "orders" } },
  projects: { via: { key: "order_id", table: "orders" } },
  development_activities: { via: { key: "project_id", table: "projects" } },
  websites: { via: { key: "project_id", table: "projects" } },
  maintenance: { via: { key: "project_id", table: "projects" } },
  maintenance_activities: {
    via: { key: "maintenance_id", table: "maintenance" },
  },
  payments: { via: { key: "order_id", table: "orders" } },
  documents: { via: { key: "project_id", table: "projects" } },
  // Asumsi: seo_geo_snapshots mengikuti project (satu client = satu project/website).
  seo_geo_snapshots: { via: { key: "project_id", table: "projects" } },
  // Asumsi sementara: support_tickets punya user_id langsung.
  // Kalau skema backend beda, cukup ganti baris ini saja.
  support_tickets: { key: "user_id" },
  ticket_messages: { via: { key: "ticket_id", table: "support_tickets" } },
};

function findRow(tableName, id) {
  const table = dummyCache[tableName];
  if (!table || !Array.isArray(table.data)) return null;
  return table.data.find((row) => row.id === id) ?? null;
}

/**
 * Menentukan user_id pemilik sebuah baris, dengan traversal rekursif
 * kalau tabelnya tidak punya user_id secara langsung.
 */
function resolveOwnerId(tableName, row) {
  if (!row) return null;

  const rule = OWNERSHIP_MAP[tableName];
  if (!rule) {
    console.warn(
      `[useAccessData] Tidak ada ownership rule untuk tabel "${tableName}"`,
    );
    return null;
  }

  if (rule.key) {
    return row[rule.key] ?? null;
  }

  if (rule.via) {
    const parentId = row[rule.via.key];
    if (parentId == null) return null;

    const parentRow = findRow(rule.via.table, parentId);
    return resolveOwnerId(rule.via.table, parentRow);
  }

  return null;
}

export function useAccessData() {
  const auth = useAuthStore();

  /**
   * getScopedData(payload)
   * Mensimulasikan hasil filtering yang seharusnya sudah dilakukan backend.
   *
   * - Belum ada user aktif -> data kosong.
   * - admin  -> payload dikembalikan apa adanya (seluruh data).
   * - client -> payload.data difilter berdasarkan ownership (langsung/relasi).
   * - Metadata (table_name, version, time_updated) selalu dipertahankan.
   */
  function getScopedData(payload = {}) {
    const tableName = payload.table_name;
    const rows = Array.isArray(payload.data) ? payload.data : [];

    if (!auth.items) {
      return { ...payload, data: [] };
    }

    if (auth.items.role === "admin") {
      return payload;
    }

    const userId = auth.items.id;
    const scopedRows = rows.filter(
      (row) => resolveOwnerId(tableName, row) === userId,
    );

    return { ...payload, data: scopedRows };
  }

  return { getScopedData, resolveOwnerId };
}
