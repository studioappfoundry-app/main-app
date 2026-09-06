// utils/paymentHelper.js

/**
 * Normalisasi status pembayaran
 */
export function normalizePaymentStatus(payment) {
  const status = String(
    payment?.status ?? payment?.payment_status ?? "",
  ).toLowerCase();

  if (
    [
      "success",
      "successful",
      "paid",
      "lunas",
      "completed",
      "settled",
      "berhasil",
    ].includes(status)
  ) {
    return "successful";
  }

  if (
    [
      "pending",
      "waiting",
      "waiting_payment",
      "menunggu",
      "belum_diproses",
    ].includes(status)
  ) {
    return "pending";
  }

  if (["failed", "failure", "gagal", "rejected"].includes(status)) {
    return "failed";
  }

  if (["refund", "refunded", "dikembalikan"].includes(status)) {
    return "refund";
  }

  return status || "pending";
}

/**
 * Ambil nominal pembayaran
 */
export function getPaymentAmount(payment) {
  return Number(
    payment?.amount ??
      payment?.total_amount ??
      payment?.paid_amount ??
      payment?.grand_total ??
      0,
  );
}

/**
 * Ambil tanggal transaksi
 */
export function getPaymentDate(payment) {
  return (
    payment?.paid_at ??
    payment?.payment_date ??
    payment?.transaction_date ??
    payment?.created_at ??
    null
  );
}

/**
 * Ambil nomor transaksi
 */
export function getPaymentTransactionNumber(payment) {
  return (
    payment?.transaction_number ??
    payment?.transaction_code ??
    payment?.reference_number ??
    payment?.reference ??
    payment?.code ??
    null
  );
}

/**
 * Ambil metode pembayaran
 */
export function getPaymentMethod(payment) {
  const method = String(
    payment?.payment_method ?? payment?.method ?? "",
  ).toLowerCase();

  if (method.includes("qris")) {
    return "qris";
  }

  if (method.includes("bank") || method.includes("transfer")) {
    return "transfer";
  }

  if (method.includes("va") || method.includes("virtual")) {
    return "virtual_account";
  }

  if (
    method.includes("card") ||
    method.includes("credit") ||
    method.includes("debit")
  ) {
    return "card";
  }

  return method || "other";
}

/**
 * Label metode pembayaran
 */
export function getPaymentMethodLabel(payment) {
  const method = getPaymentMethod(payment);

  const labels = {
    qris: "QRIS",

    transfer: "Transfer",

    virtual_account: "Virtual Account",

    card: "Kartu",

    other: "Lainnya",
  };

  return labels[method] ?? method;
}

/**
 * Kategori tab pembayaran
 */
export function getPaymentCategory(payment) {
  const status = normalizePaymentStatus(payment);

  return status;
}

/**
 * Label status pembayaran
 */
export function getPaymentStatusLabel(status) {
  const labels = {
    successful: "Berhasil",

    pending: "Pending",

    failed: "Gagal",

    refund: "Refund",
  };

  return labels[status] ?? status;
}
