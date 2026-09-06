// utils/supportHelper.js

/**
 * Normalize ticket status
 */
export function normalizeTicketStatus(status) {
  const value = String(status ?? "").toLowerCase();

  const map = {
    open: "open",
    opened: "open",
    baru: "open",

    in_progress: "in_progress",
    progress: "in_progress",
    processing: "in_progress",
    diproses: "in_progress",

    waiting: "waiting",
    pending: "waiting",
    menunggu: "waiting",

    resolved: "resolved",
    selesai: "resolved",

    closed: "closed",
    ditutup: "closed",
  };

  return map[value] ?? value ?? "open";
}

/**
 * Label status ticket
 */
export function getTicketStatusLabel(status) {
  const labels = {
    open: "Menunggu Diproses",
    in_progress: "Sedang Diproses",
    waiting: "Menunggu Balasan",
    resolved: "Selesai",
    closed: "Ditutup",
  };

  return labels[status] ?? "Menunggu Diproses";
}

/**
 * Apakah ticket masih aktif?
 */
export function isTicketActive(status) {
  return ["open", "in_progress", "waiting"].includes(status);
}

/**
 * Apakah ticket sudah selesai?
 */
export function isTicketCompleted(status) {
  return ["resolved", "closed"].includes(status);
}

/**
 * Label priority
 */
export function getTicketPriorityLabel(priority) {
  const labels = {
    low: "Rendah",
    medium: "Normal",
    high: "Tinggi",
    urgent: "Mendesak",
  };

  return labels[String(priority ?? "").toLowerCase()] ?? "Normal";
}

/**
 * Hitung progress ticket.
 *
 * Ini bukan progress pekerjaan teknis,
 * tetapi progress lifecycle ticket.
 */
export function getTicketProgress(status) {
  const progress = {
    open: 25,
    in_progress: 60,
    waiting: 80,
    resolved: 100,
    closed: 100,
  };

  return progress[status] ?? 0;
}

/**
 * Ambil timestamp terbaru dari ticket/messages
 */
export function getLatestTicketActivity(ticket, messages = []) {
  const ticketUpdated = ticket?.updated_at
    ? new Date(ticket.updated_at).getTime()
    : 0;

  const latestMessage = messages.reduce((latest, message) => {
    const time = message?.created_at
      ? new Date(message.created_at).getTime()
      : 0;

    return Math.max(latest, time);
  }, 0);

  const latest = Math.max(ticketUpdated, latestMessage);

  return latest ? new Date(latest).toISOString() : null;
}

/**
 * Sort ticket berdasarkan aktivitas terbaru
 */
export function sortTicketsByActivity(tickets) {
  return [...tickets].sort((a, b) => {
    const aTime = a.latestActivity ? new Date(a.latestActivity).getTime() : 0;

    const bTime = b.latestActivity ? new Date(b.latestActivity).getTime() : 0;

    return bTime - aTime;
  });
}
