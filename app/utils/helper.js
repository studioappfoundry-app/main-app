// utils/dashboard/helper.js

export function findById(items = [], id) {
  if (!id) return null;

  return items.find((item) => item.id === id) ?? null;
}

export function findBy(items = [], field, value) {
  return items.find((item) => item[field] === value) ?? null;
}

export function filterBy(items = [], field, value) {
  return items.filter((item) => item[field] === value);
}

export function filterByIds(items = [], field, ids = []) {
  if (!ids.length) return [];

  return items.filter((item) => ids.includes(item[field]));
}

export function sortByDateDesc(items = [], field = "created_at") {
  return [...items].sort((a, b) => {
    return new Date(b[field] || 0) - new Date(a[field] || 0);
  });
}

export function sortByDateAsc(items = [], field = "created_at") {
  return [...items].sort((a, b) => {
    return new Date(a[field] || 0) - new Date(b[field] || 0);
  });
}

export function countBy(items = [], field, value) {
  return items.filter((item) => item[field] === value).length;
}

export function unique(items = []) {
  return [...new Set(items)];
}

export function groupBy(items = [], field) {
  return items.reduce((groups, item) => {
    const key = item[field];

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {});
}

export function percentage(value, total, decimals = 0) {
  if (!total) return 0;

  const result = (value / total) * 100;

  return Number(result.toFixed(decimals));
}

export function first(items = []) {
  return items[0] ?? null;
}

export function last(items = []) {
  return items[items.length - 1] ?? null;
}

export function isEmpty(items) {
  return !Array.isArray(items) || items.length === 0;
}
const bulanIndo = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
export function formatTanggalIndo(date) {
  if (!date) return "-";

  const tanggal = new Date(date);

  if (isNaN(tanggal.getTime())) return "-";

  return `${tanggal.getDate()} ${
    bulanIndo[tanggal.getMonth()]
  } ${tanggal.getFullYear()}`;
}
