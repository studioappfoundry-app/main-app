<template>
  <div class="datepicker-panel">
    <div class="datepicker-backdrop" @click="$emit('close')"></div>

    <div class="datepicker-content">
      <div class="date-head">
        <button @click="prevPeriod">‹</button>

        <div class="head-labels">
          <button
            class="label-btn"
            :class="{ active: viewMode === 'months' }"
            @click="toggleView('months')"
          >
            {{ monthLabels[currentViewDate.getMonth()].slice(0, 3) }}
          </button>
          <button
            class="label-btn"
            :class="{ active: viewMode === 'years' }"
            @click="toggleView('years')"
          >
            {{ currentViewDate.getFullYear() }}
          </button>
        </div>

        <button @click="nextPeriod">›</button>
      </div>

      <template v-if="viewMode === 'days'">
        <div class="week-row">
          <span v-for="day in weekLabels" :key="day">{{ day }}</span>
        </div>
        <div class="date-grid">
          <button
            v-for="(date, i) in calendarDays"
            :key="i"
            :disabled="!date"
            :class="{ selected: isSelected(date), today: isToday(date) }"
            @click="selectDate(date)"
          >
            {{ date ? date.getDate() : "" }}
          </button>
        </div>
      </template>

      <div v-else-if="viewMode === 'months'" class="month-year-grid">
        <button
          v-for="(month, i) in monthLabels"
          :key="month"
          :class="{
            selected:
              i === currentViewDate.getMonth() &&
              currentViewDate.getFullYear() === selectedDate?.getFullYear(),
          }"
          @click="selectMonth(i)"
        >
          {{ month.slice(0, 3) }}
        </button>
      </div>

      <div v-else-if="viewMode === 'years'" class="month-year-grid">
        <button
          v-for="year in yearsToDisplay"
          :key="year"
          :class="{ selected: year === selectedDate?.getFullYear() }"
          @click="selectYear(year)"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: { type: [String, Date], default: null },
});

const emit = defineEmits(["update:modelValue", "close"]);

const weekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentViewDate = ref(new Date());
const viewMode = ref("days");

const selectedDate = computed(() =>
  props.modelValue ? new Date(props.modelValue) : null,
);

const calendarDays = computed(() => {
  const year = currentViewDate.value.getFullYear();
  const month = currentViewDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  return days;
});

const yearsToDisplay = computed(() => {
  const currentYear = currentViewDate.value.getFullYear();
  const startYear = currentYear - 4;
  return Array.from({ length: 12 }, (_, i) => startYear + i);
});

const toggleView = (mode) => {
  viewMode.value = viewMode.value === mode ? "days" : mode;
};

const prevPeriod = () => {
  const d = new Date(currentViewDate.value);
  if (viewMode.value === "days") d.setMonth(d.getMonth() - 1);
  else if (viewMode.value === "months") d.setFullYear(d.getFullYear() - 1);
  else if (viewMode.value === "years") d.setFullYear(d.getFullYear() - 12);
  currentViewDate.value = d;
};

const nextPeriod = () => {
  const d = new Date(currentViewDate.value);
  if (viewMode.value === "days") d.setMonth(d.getMonth() + 1);
  else if (viewMode.value === "months") d.setFullYear(d.getFullYear() + 1);
  else if (viewMode.value === "years") d.setFullYear(d.getFullYear() + 12);
  currentViewDate.value = d;
};

const isSelected = (date) => {
  if (!date || !selectedDate.value) return false;
  return date.toDateString() === selectedDate.value.toDateString();
};

const isToday = (date) => {
  if (!date) return false;
  return date.toDateString() === new Date().toDateString();
};

const selectDate = (date) => {
  if (!date) return;
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - tzOffset)
    .toISOString()
    .slice(0, 10);
  emit("update:modelValue", localISOTime);
  emit("close");
};

const selectMonth = (monthIndex) => {
  const d = new Date(currentViewDate.value);
  d.setMonth(monthIndex);
  currentViewDate.value = d;
  viewMode.value = "days";
};

const selectYear = (year) => {
  const d = new Date(currentViewDate.value);
  d.setFullYear(year);
  currentViewDate.value = d;
  viewMode.value = "months";
};
</script>

<style scoped>
.datepicker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  z-index: 100;
  width: 100%;
  min-width: 280px;
}

.datepicker-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.datepicker-content {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: inherit;
  user-select: none;
}

.date-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
}

.date-head button {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  color: var(--foreground);
}
.date-head button:hover {
  background: var(--background);
}

.head-labels {
  display: flex;
  gap: 4px;
}

.label-btn {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s ease;
}
.label-btn:hover {
  background: var(--background);
}
.label-btn.active {
  background: var(--primary-soft);
  color: var(--primary);
}

.week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
}
.week-row span {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
}

.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.date-grid button {
  aspect-ratio: 1;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  font-size: 12px;
  color: var(--foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
}
.date-grid button:disabled {
  cursor: default;
  visibility: hidden;
}
.date-grid button:not(.selected):not(:disabled):hover {
  background: var(--background);
}

.date-grid button.today {
  font-weight: bold;
  color: var(--primary);
  text-decoration: underline;
}
.date-grid button.selected {
  background: var(--primary);
  color: var(--card);
  font-weight: bold;
}

.month-year-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 8px 0;
}
.month-year-grid button {
  padding: 12px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  font-size: 12px;
  color: var(--foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
}
.month-year-grid button:not(.selected):hover {
  background: var(--background);
}
.month-year-grid button.selected {
  background: var(--primary);
  color: var(--card);
  font-weight: bold;
}
</style>
