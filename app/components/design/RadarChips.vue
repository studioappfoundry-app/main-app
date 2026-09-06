<template>
  <div class="radar-card" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- gradient glow: static position, subtle breathing pulse -->
    <div class="radar-glow" ref="glowRef"></div>

    <!-- radar background: concentric rings + crosshair -->
    <div class="radar-circle">
      <div
        v-for="ring in rings"
        :key="ring"
        class="ring"
        :style="{ width: ring * 100 + '%', height: ring * 100 + '%' }"
      ></div>
      <div class="axis axis-h"></div>
      <div class="axis axis-v"></div>
      <div class="center-dot"></div>

      <!-- rotating sweep beam -->
      <div class="sweep" ref="sweepRef"></div>
    </div>

    <!-- floating security chips, each looping independently with its own delay -->
    <div
      v-for="chip in chips"
      :key="chip.label"
      class="chip"
      :ref="(el) => setChipRef(el, chip.label)"
      :style="{ '--chip-color': chip.color }"
      style="color: var(--foreground)"
    >
      <span class="dot" :style="{ background: chip.color }"></span>

      {{ chip.label }}
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  size: {
    type: Number,
    default: 220,
  },
  sweepDuration: {
    type: Number,
    default: 3.5,
  },
  chips: {
    type: Array,
    default: () => [
      { label: "Firewall", color: "#ef4444" },
      { label: "Backup", color: "#3b82f6" },
      { label: "Update", color: "#f59e0b" },
      { label: "SSL", color: "#10b981" },
    ],
  },
  glowIntensity: {
    type: Number,
    default: 1,
  },
});

const rings = [1, 0.75, 0.5, 0.25];

const sweepRef = ref(null);
const glowRef = ref(null);

const chipRefs = {};

function setChipRef(el, label) {
  if (el) {
    chipRefs[label] = el;
  } else {
    // Bersihkan ref jika elemen di-unmount agar tidak memory leak
    delete chipRefs[label];
  }
}

let timelines = [];

onMounted(() => {
  /*
   * RADAR SWEEP
   */
  const sweepTween = gsap.to(sweepRef.value, {
    rotation: 360,
    duration: props.sweepDuration,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%",
  });
  timelines.push(sweepTween);

  /*
   * RADAR GLOW
   */
  const glowTween = gsap.to(glowRef.value, {
    opacity: props.glowIntensity,
    scale: 1.04,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
  timelines.push(glowTween);

  /*
   * FLOATING CHIPS
   */
  const travelDuration = 3;

  // PERBAIKAN: Hitung interval otomatis agar tabrakan tidak terjadi.
  // Jika travelDuration = 3 dan ada 4 chip, interval = 0.75 detik.
  // Jika Anda ingin jarak 1.5 detik, berarti travelDuration harus 6 detik.
  const spawnInterval = travelDuration / props.chips.length;

  function randomizeChipPosition(el) {
    const isLeft = Math.random() < 0.5;

    gsap.set(el, {
      left: isLeft ? "8px" : "auto",
      right: isLeft ? "auto" : "8px",
      x: gsap.utils.random(-4, 4),
    });
  }

  props.chips.forEach((chip, index) => {
    const el = chipRefs[chip.label];
    if (!el) return;

    randomizeChipPosition(el);

    const tl = gsap.timeline({
      delay: index * spawnInterval,
      repeat: -1,
      onRepeat: () => {
        randomizeChipPosition(el);
      },
    });

    // MUNCUL DARI BAWAH
    tl.fromTo(
      el,
      {
        y: props.size * 0.28,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      },
    );

    // NAIK MELALUI RADAR
    tl.to(el, {
      y: -props.size * 0.55,
      opacity: 1,
      duration: travelDuration - 1.1,
      ease: "none",
    });

    // HILANG DI BAGIAN ATAS
    tl.to(el, {
      y: -props.size * 0.72,
      opacity: 0,
      duration: 0.65,
      ease: "power2.in",
    });

    timelines.push(tl);
  });
});

onBeforeUnmount(() => {
  timelines.forEach((timeline) => {
    timeline.kill();
  });
  timelines = [];

  Object.keys(chipRefs).forEach((key) => {
    gsap.killTweensOf(chipRefs[key]);
  });
});
</script>

<style scoped>
.radar-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}

.radar-glow {
  position: absolute;
  inset: 5%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.45) 0%,
    rgba(34, 197, 94, 0.22) 35%,
    rgba(34, 197, 94, 0.08) 60%,
    rgba(34, 197, 94, 0) 75%
  );
  filter: blur(8px);
  transform: scale(0.96);
  opacity: 0.55;
  pointer-events: none;
}

.radar-circle {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  border: 1px solid rgba(22, 163, 74, 0.5);
  overflow: hidden;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(22, 163, 74, 0.3);
}

.axis {
  position: absolute;
  background-color: rgba(22, 163, 74, 0.35);
}
.axis-h {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-50%);
}
.axis-v {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
}

.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #16a34a;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.sweep {
  position: absolute;
  inset: 0;
  background: conic-gradient(
    from 0deg,
    rgba(22, 163, 74, 0.55) 0deg,
    rgba(22, 163, 74, 0.15) 30deg,
    rgba(22, 163, 74, 0) 60deg,
    transparent 360deg
  );
  /* Tambahkan ini agar rotasi dari GSAP mulus dari awal */
  transform-origin: 50% 50%;
}

.chip {
  position: absolute;
  top: 50%; /* PERBAIKAN: Patokan vertika; di tengah agar animasi y akurat */
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--chip-color) 9%, transparent);
  border: 1px solid color-mix(in srgb, var(--chip-color) 35%, transparent);
  box-shadow:
    0 4px 12px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  font-size: 12px;
  font-weight: 600;
  color: #2b2b2b;
  white-space: nowrap;
  pointer-events: none;
  z-index: 3;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
