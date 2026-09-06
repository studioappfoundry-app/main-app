<template>
  <div class="donut-wrapper" :class="{ 'has-legend': showLegend }">
    <div v-if="segments.length && !empty" class="chart-container">
      <!-- Tooltip -->
      <div
        v-if="hovered"
        class="chart-tooltip"
        :style="{
          left: tooltipPos.x,
          top: tooltipPos.y,
        }"
      >
        {{ hovered.label }}:
        <strong>{{ hovered.value }}%</strong>
      </div>

      <svg viewBox="0 0 36 36" class="donut-svg">
        <!-- Background Track -->
        <circle
          class="donut-track"
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke-width="4"
        />

        <!-- Segments -->
        <circle
          v-for="(seg, i) in segments"
          :key="i"
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          :stroke="seg.color"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="`${seg.value} ${100 - seg.value}`"
          :stroke-dashoffset="getOffset(i)"
          class="donut-segment"
          @mouseenter="showTooltip($event, seg)"
          @mouseleave="hideTooltip"
        />
      </svg>

      <!-- Center -->
      <div class="donut-center">
        <strong>{{ centerValue }}</strong>
        <span>{{ centerLabel }}</span>
      </div>
    </div>

    <!-- Legend -->
    <div v-if="showLegend && !empty" class="legend">
      <div v-for="(seg, i) in segments" :key="i" class="legend-item">
        <i class="dot" :style="{ background: seg.color }" />

        <span>{{ seg.label }}</span>

        <strong>{{ seg.value }}%</strong>
      </div>
    </div>

    <div v-else-if="empty" class="empty-state">No data yet</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  segments: {
    type: Array,
    default: () => [],
  },

  empty: {
    type: Boolean,
    default: false,
  },

  showLegend: {
    type: Boolean,
    default: true,
  },

  centerValue: {
    type: [String, Number],
    default: null,
  },

  centerLabel: {
    type: String,
    default: "Total",
  },

  size: {
    type: [String, Number],
    default: 150,
  },
});

const hovered = ref(null);

const tooltipPos = ref({
  x: "0px",
  y: "0px",
});

const total = computed(() =>
  props.segments.reduce((acc, curr) => acc + Number(curr.value || 0), 0),
);

const displayTotal = computed(() => {
  return props.centerValue ?? `${total.value}%`;
});

const getOffset = (index) => {
  let offset = 25;

  for (let i = 0; i < index; i++) {
    offset -= props.segments[i].value;
  }

  return offset;
};

const showTooltip = (e, seg) => {
  const target = e.target;

  const rect = target.getBoundingClientRect();

  const parentRect = target
    .closest(".chart-container")
    ?.getBoundingClientRect();

  if (parentRect) {
    tooltipPos.value = {
      x: `${rect.left - parentRect.left + rect.width / 2}px`,
      y: `${rect.top - parentRect.top}px`,
    };
  }

  hovered.value = seg;
};

const hideTooltip = () => {
  hovered.value = null;
};
</script>

<style scoped>
.donut-wrapper {
  display: flex;
  align-items: center;
}

.donut-wrapper.has-legend {
  gap: 24px;
}

.chart-container {
  position: relative;
  width: v-bind("`${props.size}px`");
  height: v-bind("`${props.size}px`");
  flex-shrink: 0;
}

.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.donut-track {
  stroke: var(--border);
}

.donut-segment {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.donut-segment:hover {
  opacity: 0.8;
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
}

.donut-center strong {
  font-size: 24px;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1.2;
}

.donut-center span {
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--foreground);
}

.legend-item .dot {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 999px;
}

.legend-item strong {
  margin-left: auto;
  color: var(--foreground);
}

.chart-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  padding: 6px 10px;
  border-radius: 6px;
  background: var(--foreground);
  color: var(--background);
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  background: var(--background);
  color: var(--muted);
  font-size: 14px;
}
</style>
