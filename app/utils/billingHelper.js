// utils/billingHelper.js

/**
 * Normalisasi status invoice
 */
export function normalizeInvoiceStatus(invoice) {
  const status = String(
    invoice?.status ?? invoice?.payment_status ?? "",
  ).toLowerCase();

  if (["paid", "lunas", "settled", "completed"].includes(status)) {
    return "paid";
  }

  if (["cancelled", "canceled", "dibatalkan", "void"].includes(status)) {
    return "cancelled";
  }

  if (["overdue", "jatuh_tempo", "late"].includes(status)) {
    return "overdue";
  }

  if (
    ["pending", "unpaid", "belum_bayar", "waiting_payment"].includes(status)
  ) {
    return "unpaid";
  }

  return status || "unpaid";
}

/**
 * Ambil nominal invoice.
 *
 * Mendukung beberapa kemungkinan
 * nama kolom nominal.
 */
export function getInvoiceAmount(invoice) {
  return Number(
    invoice?.total_amount ??
      invoice?.amount ??
      invoice?.grand_total ??
      invoice?.total ??
      0,
  );
}

/**
 * Ambil tanggal jatuh tempo invoice.
 */
export function getInvoiceDueDate(invoice) {
  return (
    invoice?.due_date ?? invoice?.deadline ?? invoice?.payment_due_at ?? null
  );
}

/**
 * Ambil tanggal invoice.
 */
export function getInvoiceDate(invoice) {
  return (
    invoice?.invoice_date ?? invoice?.issued_at ?? invoice?.created_at ?? null
  );
}

/**
 * Hitung jumlah hari dari sekarang
 * menuju tanggal tertentu.
 *
 * > 0  = masih beberapa hari
 * = 0  = hari ini
 * < 0  = sudah lewat
 */
export function getDaysUntil(date) {
  if (!date) return null;

  const target = new Date(date);
  const now = new Date();

  target.setHours(0, 0, 0, 0);

  now.setHours(0, 0, 0, 0);

  const diff = target.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Format label status invoice
 */
export function getInvoiceStatusLabel(status) {
  const labels = {
    paid: "Lunas",

    unpaid: "Belum Dibayar",

    overdue: "Terlambat",

    cancelled: "Dibatalkan",
  };

  return labels[status] ?? status;
}

/**
 * Tentukan status tab berdasarkan
 * status invoice + tanggal jatuh tempo.
 */
export function getInvoiceCategory(invoice) {
  const status = normalizeInvoiceStatus(invoice);

  if (status === "paid") {
    return "paid";
  }

  if (status === "cancelled") {
    return "cancelled";
  }

  const dueDate = getInvoiceDueDate(invoice);

  const days = getDaysUntil(dueDate);

  /**
   * Sudah lewat jatuh tempo.
   */
  if (days !== null && days < 0) {
    return "overdue";
  }

  /**
   * Belum jatuh tempo.
   */
  if (status === "unpaid" && days !== null && days >= 0) {
    return "upcoming";
  }

  return status;
}
