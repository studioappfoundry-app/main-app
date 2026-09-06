<template>
  <div
    class="radial-gallery"
    :style="containerStyle"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <!-- fixed center point: always exactly 50%/50% of the container,
         never influenced by rotation, transform-origin tricks, or CSS
         reset differences -->
    <div class="radial-gallery__hub" aria-hidden="true" />

    <div
      v-for="(item, i) in items"
      :key="i"
      class="radial-gallery__item"
      :style="itemStyle(item.angle)"
    >
      <img
        class="radial-gallery__img"
        :src="item.src"
        :alt="`radial-image-${i}`"
        draggable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      "/slide/web-1.png",
      "/slide/web-2.png",
      "/slide/web-3.png",
      "/slide/web-4.png",
      "/slide/web-5.png",
    ],
  },
  radius: { type: Number, default: 220 },
  itemSize: { type: Number, default: 110 },
  angleStep: { type: Number, default: 38 },
  speed: { type: Number, default: 1 },
  hoverSpeedFactor: { type: Number, default: 0.2 },
});

const slotCount = computed(() => {
  const desired = Math.max(3, Math.round(360 / props.angleStep));
  return Math.max(desired, props.images.length);
});

const actualAngleStep = computed(() => 360 / slotCount.value);

const items = computed(() =>
  Array.from({ length: slotCount.value }, (_, i) => ({
    src: props.images[i % props.images.length],
    angle: i * actualAngleStep.value,
  })),
);

const rotation = ref(0);
const isHover = ref(false);
let rafId = null;
let lastTime = null;

function tick(time) {
  if (lastTime === null) lastTime = time;
  const deltaSec = (time - lastTime) / 1000;
  lastTime = time;

  const degPerSecond = props.speed * 10; // base pace tuning
  const factor = isHover.value ? props.hoverSpeedFactor : 1;

  rotation.value = (rotation.value + degPerSecond * factor * deltaSec) % 360;
  rafId = requestAnimationFrame(tick);
}

onMounted(() => {
  rafId = requestAnimationFrame(tick);
});
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});

// --- styles ---
const containerStyle = computed(() => ({
  "--radius": `${props.radius}px`,
  "--item-size": `${props.itemSize}px`,
}));

function itemStyle(baseAngle) {
  const total = rotation.value + baseAngle;
  const imageTilt = 90;

  const rad = (total * Math.PI) / 180;
  const x = (Math.sin(rad) * props.radius).toFixed(2);
  const y = (-Math.cos(rad) * props.radius).toFixed(2);
  return {
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${(total + imageTilt).toFixed(2)}deg)`,
  };
}
</script>

<style scoped>
.radial-gallery {
  position: relative;
  width: calc(var(--radius) * 2 + var(--item-size));
  height: calc(var(--radius) * 2 + var(--item-size));
  margin: 0 auto;
}

.radial-gallery__hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(var(--radius) * 0.7);
  height: calc(var(--radius) * 0.7);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(120, 200, 160, 0.18),
    transparent 70%
  );
  filter: blur(2px);
  pointer-events: none;
}

.radial-gallery__item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--item-size);
  height: var(--item-size);
  will-change: transform;
}

.radial-gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  user-select: none;
  pointer-events: none;
  display: block;
}
</style>
