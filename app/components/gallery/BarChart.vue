<template>
  <div class="chart-wrapper">
    <div class="chart-header" v-if="title || value">
      <div>
        <p class="eyebrow">{{ title }}</p>
        <strong class="chart-value">{{ value }}</strong>
      </div>
      <span class="growth-badge" v-if="growth">{{ growth }}</span>
    </div>

    <div class="chart-container" v-if="data.length && !empty">
      <!-- Tooltip -->
      <div
        class="chart-tooltip"
        v-if="hovered"
        :style="{ left: tooltipPos.x, top: tooltipPos.y }"
      >
        {{ hovered.label }}: <strong>{{ hovered.value }}</strong>
      </div>

      <!-- SVG Chart -->
      <svg
        class="bar-svg"
        :viewBox="`0 0 ${data.length * 40} 100`"
        preserveAspectRatio="none"
      >
        <rect
          v-for="(item, i) in data"
          :key="i"
          :x="i * 40 + 10"
          :y="100 - (item.value / maxVal) * 90"
          :width="20"
          :height="(item.value / maxVal) * 90"
          :fill="color"
          rx="4"
          @mouseenter="showTooltip($event, item)"
          @mouseleave="hideTooltip"
        />
      </svg>
    </div>
    <div v-else class="empty-state">No data yet</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: { type: Array },
  title: { type: String, default: "" },
  value: { type: [String, Number], default: "" },
  growth: { type: String, default: "" },
  color: { type: String, default: "var(--primary)" },
  empty: { type: Boolean, default: false },
});

const hovered = ref(null);
const tooltipPos = ref({ x: "0px", y: "0px" });

const maxVal = computed(() => Math.max(...props.data.map((d) => d.value), 1));

const showTooltip = (e, item) => {
  const target = e.target;
  const rect = target.getBoundingClientRect();
  const parentRect = target
    .closest(".chart-container")
    ?.getBoundingClientRect();

  if (parentRect) {
    tooltipPos.value = {
      x: `${rect.left - parentRect.left + rect.width / 2}px`,
      y: `${rect.top - parentRect.top - 10}px`,
    };
  }
  hovered.value = item;
};

const hideTooltip = () => {
  hovered.value = null;
};
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.eyebrow {
  font-size: 12px;
  color: var(--muted);
  margin: 0 0 4px 0;
}
.chart-value {
  font-size: 24px;
  color: var(--foreground);
}
.growth-badge {
  font-size: 12px;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.chart-container {
  position: relative;
  height: 120px;
  width: 100%;
}
.bar-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.bar-svg rect {
  transition: opacity 0.2s;
  cursor: pointer;
}
.bar-svg rect:hover {
  opacity: 0.8;
}

.chart-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  background: var(--foreground);
  color: var(--background);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
}
.empty-state {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 14px;
  background: var(--background);
  border-radius: 8px;
}
</style>
