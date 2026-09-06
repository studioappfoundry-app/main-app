<template>
  <div class="chart-wrapper">
    <div class="chart-header" v-if="judul">
      <div>
        <p class="eyebrow">{{ title }}</p>
        <strong class="chart-value">{{ value }}</strong>
      </div>
      <div class="chart-header-right">
        <span class="growth-badge" v-if="growth">{{ growth }}</span>
        <div class="legend" v-if="legendSeries.length > 1">
          <span class="legend-item" v-for="s in legendSeries" :key="s.name">
            <span class="legend-dot" :style="{ background: s.color }" />
            {{ s.name }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="chart-container"
      ref="containerRef"
      v-if="hasData"
      @mousemove="onMouseMove"
      @mouseleave="hideTooltip"
    >
      <div
        class="chart-tooltip"
        v-if="hovered"
        :style="{ left: hovered.x + 'px', top: hovered.y + 'px' }"
      >
        <div class="tooltip-label text-sm mb-2" v-if="hovered.label">
          {{ hovered.label }}
        </div>
        <div
          class="tooltip-row"
          :class="{ 'flex-col items-center': props.type }"
          v-for="pt in hovered.points"
          :key="pt.name"
        >
          <span
            class="tooltip-dot"
            v-if="props.type === ''"
            :style="{ background: pt.color }"
          />
          <span class="tooltip-name" v-if="props.type === ''">{{
            pt.name
          }}</span>
          <p class="tooltip-value font-semibold text-lg leading-none">
            {{ pt.value }}
          </p>
          <p class="text-sm text-gray-500">{{ props.type }}</p>
        </div>
      </div>
      <svg
        class="line-svg"
        :viewBox="`0 0 100 ${VH}`"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            v-for="(s, si) in normalizedSeries"
            :key="'grad-' + si"
            :id="gradId(si)"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" :stop-color="s.color" stop-opacity="0.32" />
            <stop offset="100%" :stop-color="s.color" stop-opacity="0" />
          </linearGradient>
        </defs>

        <path
          v-for="(s, si) in normalizedSeries"
          :key="'area-' + si"
          :d="s.areaPath"
          :fill="`url(#${gradId(si)})`"
          stroke="none"
        />

        <path
          v-for="(s, si) in normalizedSeries"
          :key="'line-' + si"
          :d="s.linePath"
          fill="none"
          :stroke="s.color"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="markers-layer">
        <div
          v-if="hoverIndex !== null"
          class="hover-line"
          :style="{ left: hoverX + '%' }"
        />
        <template v-for="(s, si) in normalizedSeries" :key="'marker-set-' + si">
          <span
            v-for="(pt, i) in s.points"
            :key="i"
            class="marker-dot"
            :class="{ active: hoverIndex === i }"
            :style="{
              left: pt.x + '%',
              top: pt.y + '%',
              '--dot-color': s.color,
            }"
          />
        </template>
      </div>
    </div>
    <div v-else class="empty-state">No data yet</div>
  </div>
</template>

<script setup>
import { ref, computed, useId } from "vue";

const props = defineProps({
  data: { type: Array, default: () => [] },
  series: { type: Array, default: () => [] },
  title: { type: String, default: "" },
  value: { type: [String, Number], default: "" },
  growth: { type: String, default: "" },
  color: { type: String, default: "#22c55e" },
  empty: { type: Boolean, default: false },
  judul: { type: Boolean, default: false },
  type: { type: String, default: "" },
});

const VH = 100; // viewBox height, kept square-ish for simple math
const uid = useId();
const gradId = (si) => `chart-grad-${uid}-${si}`;

const rawSeries = computed(() => {
  if (props.series.length) return props.series;
  if (props.data.length) {
    return [
      { name: props.title || "Value", color: props.color, data: props.data },
    ];
  }
  return [];
});

const legendSeries = computed(() =>
  rawSeries.value.map((s) => ({
    name: s.name || "Value",
    color: s.color || props.color,
  })),
);

const hasData = computed(
  () =>
    !props.empty && rawSeries.value.some((s) => s.data && s.data.length > 1),
);

const maxLength = computed(() =>
  Math.max(0, ...rawSeries.value.map((s) => s.data.length)),
);

const bounds = computed(() => {
  const all = rawSeries.value.flatMap((s) => s.data.map((d) => d.value));
  let min = Math.min(...all);
  let max = Math.max(...all);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  // small headroom so peaks/troughs don't touch the edges
  const pad = (max - min) * 0.12;
  return { min: min - pad, max: max + pad };
});

// Catmull-Rom -> cubic bezier, for a smooth, non-jagged line
function smoothPath(points) {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
  }
  return d;
}

const normalizedSeries = computed(() => {
  const { min, max } = bounds.value;
  const range = max - min || 1;

  return rawSeries.value.map((s, si) => {
    const n = s.data.length;
    const points = s.data.map((d, i) => ({
      x: n > 1 ? (i / (n - 1)) * 100 : 50,
      y: VH - ((d.value - min) / range) * VH,
      value: d.value,
      label: d.label,
    }));
    const linePath = smoothPath(points);
    const areaPath = points.length
      ? `${linePath} L ${points[points.length - 1].x} ${VH} L ${points[0].x} ${VH} Z`
      : "";
    return {
      color: s.color || props.color,
      name: s.name || "Value",
      points,
      linePath,
      areaPath,
    };
  });
});

const containerRef = ref(null);
const hoverIndex = ref(null);
const hoverPos = ref({ x: 0, y: 0 });

const hoverX = computed(() =>
  hoverIndex.value !== null && maxLength.value > 1
    ? (hoverIndex.value / (maxLength.value - 1)) * 100
    : 0,
);

const onMouseMove = (e) => {
  const el = containerRef.value;
  if (!el || maxLength.value < 2) return;
  const rect = el.getBoundingClientRect();
  const fraction = Math.min(
    1,
    Math.max(0, (e.clientX - rect.left) / rect.width),
  );
  hoverIndex.value = Math.round(fraction * (maxLength.value - 1));
  hoverPos.value = {
    x: fraction * rect.width,
    y: Math.max(0, e.clientY - rect.top - 14),
  };
};

const hideTooltip = () => {
  hoverIndex.value = null;
};

const hovered = computed(() => {
  if (hoverIndex.value === null) return null;
  const points = normalizedSeries.value
    .filter((s) => s.points[hoverIndex.value])
    .map((s) => ({
      name: s.name,
      color: s.color,
      value: s.points[hoverIndex.value].value,
    }));
  if (!points.length) return null;
  const label = normalizedSeries.value[0]?.points[hoverIndex.value]?.label;
  return { x: hoverPos.value.x, y: hoverPos.value.y, points, label };
});
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
  gap: 12px;
}
.chart-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
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
.legend {
  display: flex;
  gap: 12px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.chart-container {
  position: relative;
  height: 150px;
  width: 100%;
}
.line-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
}
.markers-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hover-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px dashed var(--muted, #ccc);
  opacity: 0.6;
  transform: translateX(-0.5px);
}
.marker-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--background, #fff);
  border: 1.5px solid var(--dot-color);
  transform: translate(-50%, -50%);
  transition:
    width 0.15s ease,
    height 0.15s ease,
    background 0.15s ease;
}
.marker-dot.active {
  width: 11px;
  height: 11px;
  background: var(--dot-color);
  border-width: 2.5px;
  border-color: var(--background, #fff);
  box-shadow: 0 0 0 1.5px var(--dot-color);
}

.chart-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  background: var(--foreground);
  color: var(--background);
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 12px;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}
.tooltip-label {
  opacity: 0.7;
}
.tooltip-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.tooltip-row + .tooltip-row {
  margin-top: 2px;
}
.tooltip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.tooltip-name {
  opacity: 0.75;
}

.empty-state {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 14px;
  background: var(--background);
  border-radius: 8px;
}
</style>
