// utils/documentHelper.js

/**
 * Normalisasi kategori dokumen
 */
export function normalizeDocumentCategory(document) {
  const category = String(
    document?.category ?? document?.type ?? document?.document_type ?? "",
  ).toLowerCase();

  if (["contract", "kontrak", "agreement", "perjanjian"].includes(category)) {
    return "contract";
  }

  if (["invoice", "tagihan"].includes(category)) {
    return "invoice";
  }

  if (
    [
      "payment",
      "receipt",
      "payment_receipt",
      "nota",
      "nota_pembayaran",
    ].includes(category)
  ) {
    return "payment_receipt";
  }

  return "other";
}

/**
 * Label kategori dokumen
 */
export function getDocumentCategoryLabel(category) {
  const labels = {
    contract: "Kontrak",

    invoice: "Invoice",

    payment_receipt: "Nota Pembayaran",

    other: "Dokumen Lain",
  };

  return labels[category] ?? "Dokumen Lain";
}

/**
 * Normalisasi status dokumen
 */
export function normalizeDocumentStatus(document) {
  const status = String(document?.status ?? "").toLowerCase();

  if (["active", "aktif"].includes(status)) {
    return "active";
  }

  if (["paid", "lunas"].includes(status)) {
    return "paid";
  }

  if (["expired", "kadaluarsa", "kedaluwarsa"].includes(status)) {
    return "expired";
  }

  if (["cancelled", "canceled", "dibatalkan"].includes(status)) {
    return "cancelled";
  }

  return status || "active";
}

/**
 * Label status dokumen
 */
export function getDocumentStatusLabel(status) {
  const labels = {
    active: "Aktif",

    paid: "Lunas",

    expired: "Kadaluarsa",

    cancelled: "Dibatalkan",
  };

  return labels[status] ?? status;
}

/**
 * Ambil tanggal dokumen
 */
export function getDocumentDate(document) {
  return (
    document?.document_date ??
    document?.issued_at ??
    document?.created_at ??
    null
  );
}

/**
 * Ambil nomor dokumen
 */
export function getDocumentNumber(document) {
  return (
    document?.document_number ?? document?.number ?? document?.code ?? null
  );
}

/**
 * Ambil nama/judul dokumen
 */
export function getDocumentTitle(document) {
  return (
    document?.title ?? document?.name ?? document?.document_name ?? "Dokumen"
  );
}

/**
 * Ambil URL file dokumen
 */
export function getDocumentUrl(document) {
  return document?.file_url ?? document?.document_url ?? document?.url ?? null;
}

/**
 * Ambil tipe file
 */
export function getDocumentFileType(document) {
  return document?.file_type ?? document?.mime_type ?? null;
}
