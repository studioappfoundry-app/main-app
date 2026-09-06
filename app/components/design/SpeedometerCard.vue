<template>
  <div class="gauge" ref="rootRef" :style="{ width: size + 'px' }">
    <svg :viewBox="`0 0 ${vbW} ${vbH}`" class="gauge-svg">
      <path
        v-for="band in bands"
        :key="band.color"
        :d="band.d"
        :fill="band.color"
      />
      <g ref="needleRef">
        <path :d="needlePath" class="needle" />
      </g>
      <circle :cx="cx" :cy="cy" r="10" class="hub-outer" />
      <circle :cx="cx" :cy="cy" r="6" class="hub-inner" />
    </svg>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  value: {
    type: Number,
    default: 95,
  },
  size: {
    type: Number,
    default: 220,
  },
  triggerOnce: {
    type: Boolean,
    default: true,
  },
  jitterRange: {
    type: Number,
    default: 3,
  },
});

const rootRef = ref(null);
const needleRef = ref(null);

const vbW = 220;
const vbH = 125;

const cx = 110;
const cy = 110;

const outerR = 110;
const innerR = 72;

const bandColors = ["#8FD000", "#FFF033", "#FFD238", "#FF7427", "#E51F26"];

const segmentCount = bandColors.length;

function pointOnCircle(cx, cy, radius, angle) {
  const rad = (angle * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(rad),
    y: cy - radius * Math.sin(rad),
  };
}
const r = 88;

const needleLength = 78;
const needleWidth = 2.8;

const needlePath = computed(() => {
  const tipY = cy - needleLength;

  return `
    M ${cx - needleWidth / 2} ${cy}
    L ${cx} ${tipY}
    L ${cx + needleWidth / 2} ${cy}
    Z
  `;
});

const arcStart = 165;
const arcEnd = 15;

const arcSpan = arcStart - arcEnd;
// value 0 -> points toward the right tip (red). value 100 -> left tip (green).
function angleFor(v) {
  const half = arcSpan / 2; // distance from vertical to each tip, in degrees
  return half - (v / 100) * arcSpan;
}

// five rounded segments, left (green) to right (red), with a small gap
// carved out of each slot so they read as separate pills, not one solid ring
// const bandColors = ["#4ADE80", "#A3E635", "#FACC15", "#F97316", "#EF4444"];
const bands = computed(() => {
  const start = 180;
  const step = 180 / segmentCount;

  return bandColors.map((color, i) => {
    const a1 = start - i * step;
    const a2 = start - (i + 1) * step;

    const outerStart = pointOnCircle(cx, cy, outerR, a1);
    const outerEnd = pointOnCircle(cx, cy, outerR, a2);

    const innerEnd = pointOnCircle(cx, cy, innerR, a2);
    const innerStart = pointOnCircle(cx, cy, innerR, a1);

    return {
      color,

      d: `
        M ${outerStart.x} ${outerStart.y}
        A ${outerR} ${outerR} 0 0 1
          ${outerEnd.x} ${outerEnd.y}

        L ${innerEnd.x} ${innerEnd.y}

        A ${innerR} ${innerR} 0 0 0
          ${innerStart.x} ${innerStart.y}

        Z
      `,
    };
  });
});
// SVG transform attribute, so the pivot never drifts
const needleState = { deg: angleFor(0) };
function renderNeedle() {
  needleRef.value.setAttribute(
    "transform",
    `rotate(${needleState.deg} ${cx} ${cy})`,
  );
}

let jitterTween = null;
let started = false;

function playIntro() {
  if (started) return;
  started = true;

  const tl = gsap.timeline({ onComplete: startJitter });

  // checkpoints the needle passes through as it sweeps from red toward its
  // resting spot near green, slowing down like a real gauge settling
  const checkpoints = [0, 15, 35, 60, 80, 95, props.value];
  const durations = [0, 0.18, 0.22, 0.26, 0.3, 0.32, 0.28];

  checkpoints.forEach((v, i) => {
    if (i === 0) return;
    tl.to(needleState, {
      deg: angleFor(v),
      duration: durations[i],
      ease: i === checkpoints.length - 1 ? "back.out(1.6)" : "power1.inOut",
      onUpdate: renderNeedle,
    });
  });
}

function startJitter() {
  const wander = () => {
    const target =
      props.value + gsap.utils.random(-props.jitterRange, props.jitterRange);
    jitterTween = gsap.to(needleState, {
      deg: angleFor(target),
      duration: gsap.utils.random(0.45, 0.9),
      ease: "sine.inOut",
      onUpdate: renderNeedle,
      onComplete: wander,
    });
  };
  wander();
}

let observer = null;

onMounted(() => {
  // resting state before the card is on screen: needle parked in the red
  renderNeedle();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playIntro();
          if (props.triggerOnce) observer.disconnect();
        }
      });
    },
    { threshold: 0.4 },
  );
  observer.observe(rootRef.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  if (jitterTween) jitterTween.kill();
  gsap.killTweensOf(needleState);
});
</script>

<style scoped>
.gauge {
  position: relative;
  display: inline-block;
}

.gauge-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.gauge-band {
  opacity: 0.95;
}

.needle-group {
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.12))
    drop-shadow(0 5px 7px rgba(0, 0, 0, 0.08));
}

.needle {
  stroke: var(--foreground);
  stroke-width: 3;
  stroke-linecap: round;
}

.hub-outer {
  fill: var(--background);
  stroke: var(--foreground);
  stroke-width: 3;
}

.hub-inner {
  fill: var(--foreground);
}

.hub-shadow {
  fill: rgba(0, 0, 0, 0.08);
  filter: blur(1px);
}
.hub-dot {
  fill: #18181b;
}
</style>
