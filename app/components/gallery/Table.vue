<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.key">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in data"
          :key="i"
          :class="{ 'row-selected': i === selectedIndex }"
          @click="selectRow(i, row)"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            class="px-4 py-2 lg:p-4"
          >
            <span
              v-if="header.badge"
              :class="`status status-${row[header.badgeColorKey] || 'default'}`"
            >
              {{ row[header.key] }}
            </span>
            <template v-else>{{ row[header.key] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  headers: { type: Array, default: () => [] }, // [{ key: 'name', label: 'Project' }, { key: 'status', label: 'Status', badge: true }]
  data: { type: Array, default: () => [] },
});

const emit = defineEmits(["select"]);
const selectedIndex = ref(null);

const selectRow = (index, row) => {
  if (selectedIndex.value === index) {
    selectedIndex.value = null;
    emit("select", null);
  } else {
    selectedIndex.value = index;
    emit("select", row);
  }
};
</script>

<style scoped>
.table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--background);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th {
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
td {
  color: var(--foreground);
  border-bottom: 1px solid var(--border);
}
tr {
  cursor: pointer;
  transition: background 0.15s ease;
}
tr:last-child td {
  border-bottom: none;
}
tbody tr:hover {
  background: var(--card);
}
.row-selected {
  background: var(--primary-soft) !important;
}

.status {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.status-0 {
  background: rgba(251, 191, 36, 0.15);
  color: #d97706;
} /* In progress */
.status-1 {
  background: var(--primary-soft);
  color: var(--primary);
} /* Completed */
.status-2 {
  background: rgba(37, 99, 235, 0.15);
  color: #2563eb;
} /* Review */
.status-3 {
  background: var(--danger-soft);
  color: var(--danger);
}
.status-default {
  background: var(--background);
  color: var(--muted);
}
</style>
