<template>
  <div class="chart-wrapper">
    <!-- Header -->
    <div v-if="judul && (title || value || growth)" class="chart-header">
      <div>
        <p v-if="title" class="eyebrow">
          {{ title }}
        </p>

        <strong v-if="value !== ''" class="chart-value">
          {{ value }}
        </strong>
      </div>

      <div v-if="growth" class="chart-header-right">
        <span class="growth-badge">
          {{ growth }}
        </span>
      </div>
    </div>

    <!-- Legend -->
    <div
      v-if="legendSeries.length"
      class="legend"
      :class="judul ? 'justify-end' : 'justify-start'"
    >
      <div
        v-for="(s, si) in legendSeries"
        :key="s.name"
        class="legend-item"
        @mouseenter="hoveredSeriesIndex = si"
        @mouseleave="hoveredSeriesIndex = null"
      >
        <span class="legend-dot" :style="{ background: s.color }" />

        {{ s.name }}
      </div>
    </div>

    <!-- Chart -->
    <div
      v-if="hasData"
      ref="containerRef"
      class="chart-container"
      @mousemove="onMouseMove"
      @mouseleave="hideTooltip"
    >
      <!-- Tooltip -->
      <div
        v-if="hovered"
        class="chart-tooltip"
        :style="{
          left: hovered.x + 'px',
          top: hovered.y + 'px',
        }"
      >
        <div v-if="hovered.label" class="tooltip-label text-sm mb-2">
          {{ hovered.label }}
        </div>

        <div
          v-for="pt in hovered.points"
          :key="pt.name"
          class="tooltip-row"
          :class="{
            active: hoveredSeriesIndex === pt.si,
          }"
        >
          <span class="tooltip-dot" :style="{ background: pt.color }" />

          <span class="tooltip-name">
            {{ pt.name }}
          </span>

          <p class="tooltip-value font-semibold text-lg leading-none ml-auto">
            {{ pt.value }}
          </p>
        </div>
      </div>

      <!-- SVG -->
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

        <!-- Area -->
        <path
          v-for="(s, si) in normalizedSeries"
          :key="'area-' + si"
          :d="s.areaPath"
          :fill="`url(#${gradId(si)})`"
          stroke="none"
          :style="{
            opacity: hoveredSeriesIndex === si ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }"
        />

        <!-- Line -->
        <path
          v-for="(s, si) in normalizedSeries"
          :key="'line-' + si"
          :d="s.linePath"
          fill="none"
          :stroke="s.color"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          :style="{
            opacity:
              hoveredSeriesIndex === null
                ? 1
                : hoveredSeriesIndex === si
                  ? 1
                  : 0.2,
            transition: 'opacity 0.2s ease',
          }"
        />
      </svg>

      <!-- Markers -->
      <div class="markers-layer">
        <div
          v-if="hoverIndex !== null"
          class="hover-line"
          :style="{
            left: hoverX + '%',
          }"
        />

        <template v-for="(s, si) in normalizedSeries" :key="'marker-set-' + si">
          <span
            v-for="(pt, i) in s.points"
            :key="i"
            class="marker-dot"
            :class="{
              active: hoverIndex === i,
            }"
            :style="{
              left: pt.x + '%',
              top: pt.y + '%',
              '--dot-color': s.color,
              opacity:
                hoveredSeriesIndex === null
                  ? 1
                  : hoveredSeriesIndex === si
                    ? 1
                    : 0.2,
            }"
          />
        </template>
      </div>
    </div>

    <!-- Categories -->
    <div
      v-if="hasData && categories.length"
      class="flex w-full justify-between text-xs text-muted"
    >
      <span
        v-for="(category, index) in categories"
        :key="index"
        class="truncate"
        :class="{
          'text-left': index === 0,
          'text-center': index > 0 && index < categories.length - 1,
          'text-right': index === categories.length - 1,
        }"
      >
        {{ category }}
      </span>
    </div>

    <!-- Empty -->
    <div v-else-if="!hasData" class="empty-state">Belum ada datanya!</div>
  </div>
</template>

<script setup>
import { ref, computed, useId } from "vue";

const props = defineProps({
  // Array label untuk sumbu X (contoh: ['Jan', 'Feb', 'Mar'])
  categories: { type: Array, default: () => [] },
  // Array berisi nama dan data (array of numbers) tiap legend
  series: { type: Array, default: () => [] },
  title: { type: String, default: "" },
  value: { type: [String, Number], default: "" },
  growth: { type: String, default: "" },
  // Array warna dari parent (memiliki default jika tidak diisi)
  colors: {
    type: Array,
    default: () => [
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
      "#f59e0b",
      "#10b981",
      "#ef4444",
    ],
  },
  empty: { type: Boolean, default: false },
  judul: { type: Boolean, default: false },
});

const VH = 100;
const uid = useId();
const gradId = (si) => `chart-grad-${uid}-${si}`;

const rawSeries = computed(() => {
  if (props.series.length) {
    return props.series.map((s, i) => ({
      name: s.name || `Series ${i + 1}`,
      data: s.data || [],
      color: s.color || props.colors[i % props.colors.length],
    }));
  }
  return [];
});

const legendSeries = computed(() =>
  rawSeries.value.map((s) => ({
    name: s.name,
    color: s.color,
  })),
);

const hasData = computed(
  () => !props.empty && rawSeries.value.some((s) => s.data.length > 1),
);

const maxLength = computed(() =>
  Math.max(0, ...rawSeries.value.map((s) => s.data.length)),
);

const bounds = computed(() => {
  const all = rawSeries.value.flatMap((s) => s.data);
  if (!all.length) return { min: 0, max: 1 };

  let min = Math.min(...all);
  let max = Math.max(...all);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const pad = (max - min) * 0.12;
  return { min: min - pad, max: max + pad };
});

// Catmull-Rom -> cubic bezier
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
    const points = s.data.map((val, i) => ({
      x: n > 1 ? (i / (n - 1)) * 100 : 50,
      y: VH - ((val - min) / range) * VH,
      value: val,
      label: props.categories[i] || `Item ${i + 1}`,
    }));
    const linePath = smoothPath(points);
    const areaPath = points.length
      ? `${linePath} L ${points[points.length - 1].x} ${VH} L ${points[0].x} ${VH} Z`
      : "";
    return {
      color: s.color,
      name: s.name,
      points,
      linePath,
      areaPath,
      si,
    };
  });
});

const containerRef = ref(null);
const hoverIndex = ref(null);
const hoveredSeriesIndex = ref(null);
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
  const fractionX = Math.min(
    1,
    Math.max(0, (e.clientX - rect.left) / rect.width),
  );
  const fractionY = (e.clientY - rect.top) / rect.height;

  hoverIndex.value = Math.round(fractionX * (maxLength.value - 1));

  // Mencari garis (series) terdekat dengan Y cursor untuk hover effect
  let closestSeries = 0;
  let minDist = Infinity;
  normalizedSeries.value.forEach((s, si) => {
    const pt = s.points[hoverIndex.value];
    if (pt) {
      const ptFracY = pt.y / VH;
      const dist = Math.abs(ptFracY - fractionY);
      if (dist < minDist) {
        minDist = dist;
        closestSeries = si;
      }
    }
  });

  hoveredSeriesIndex.value = closestSeries;
  hoverPos.value = {
    x: fractionX * rect.width,
    y: Math.max(0, e.clientY - rect.top - 14),
  };
};

const hideTooltip = () => {
  hoverIndex.value = null;
  hoveredSeriesIndex.value = null;
};

const hovered = computed(() => {
  if (hoverIndex.value === null) return null;
  const points = normalizedSeries.value
    .map((s) => {
      const pt = s.points[hoverIndex.value];
      if (!pt) return null;
      return {
        si: s.si,
        name: s.name,
        color: s.color,
        value: pt.value,
      };
    })
    .filter(Boolean);

  if (!points.length) return null;

  const label =
    props.categories[hoverIndex.value] ||
    normalizedSeries.value[0]?.points[hoverIndex.value]?.label;
  return { x: hoverPos.value.x, y: hoverPos.value.y, points, label };
});
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  font-family: sans-serif;
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
  color: #6b7280;
  margin: 0 0 4px 0;
}
.chart-value {
  font-size: 24px;
  color: #111827;
}
.growth-badge {
  font-size: 12px;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.legend-item:hover {
  opacity: 0.7;
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
  border-left: 1px dashed #ccc;
  opacity: 0.6;
  transform: translateX(-0.5px);
}
.marker-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  border: 1.5px solid var(--dot-color);
  transform: translate(-50%, -50%);
  transition: all 0.15s ease;
}
.marker-dot.active {
  width: 11px;
  height: 11px;
  background: var(--dot-color);
  border-width: 2.5px;
  border-color: #fff;
  box-shadow: 0 0 0 1.5px var(--dot-color);
}

.chart-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  background: #111827;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  pointer-events: none;
  z-index: 10;
  min-width: 140px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}
.tooltip-label {
  opacity: 0.7;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 4px;
  margin-bottom: 4px;
}
.tooltip-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}
.tooltip-row.active {
  opacity: 1;
}
.tooltip-row.active .tooltip-value {
  font-size: 18px;
}
.tooltip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.tooltip-name {
  opacity: 0.9;
}
.tooltip-value {
  margin-left: auto;
}

.empty-state {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 14px;
  background: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 8px;
}
</style>
