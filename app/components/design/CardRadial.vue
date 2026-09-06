<script setup>
/**
 * RadialLayout.vue
 * Model mikirnya PERSIS kayak gambar lingkaran yang kamu kasih:
 * - ada "circleCenter" = titik pusat lingkaran raksasa (boleh di luar frame!)
 * - kita ambil SEPOTONG sudut aja dari lingkaran itu (startAngle sampai startAngle+arcSpan)
 * - sudut dihitung standar jam: 0° = atas (12), 90° = kanan (3), 180° = bawah (6), 270° = kiri (9)
 *
 * Contoh biar kebayang, buat nampilin quarter KIRI-BAWAH kayak di gambar kamu:
 *   circleCenterX = 100  (titik pusat di kanan frame)
 *   circleCenterY = 0    (titik pusat di atas frame)
 *   startAngle    = 180  (mulai dari arah bawah)
 *   arcSpan       = 90   (sapu sampai 270°, arah kiri) -> hasil: quarter kiri-bawah
 */
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      "https://picsum.photos/id/1015/500/650",
      "https://picsum.photos/id/1016/500/650",
      "https://picsum.photos/id/1018/500/650",
      "https://picsum.photos/id/1019/500/650",
      "https://picsum.photos/id/1020/500/650",
      "https://picsum.photos/id/1021/500/650",
      "https://picsum.photos/id/1022/500/650",
      "https://picsum.photos/id/1024/500/650",
    ],
  },
  // radius proporsional ke lebar frame asli (biar responsive, lihat ResizeObserver di bawah)
  radiusRatio: { type: Number, default: 3.3 },
  // TITIK PUSAT lingkaran raksasa, dalam % relatif ke frame — BOLEH di luar 0-100
  // (misal -20 atau 120), karena lingkarannya emang gede banget & center-nya sering
  // memang di luar area yang keliatan
  circleCenterX: { type: Number, default: 100 },
  circleCenterY: { type: Number, default: 0 },
  // sudut mulai (derajat, 0=atas/12, 90=kanan/3, 180=bawah/6, 270=kiri/9, searah jarum jam)
  startAngle: { type: Number, default: 180 },
  // seberapa jauh sudut itu "disapu" dari startAngle. 90 = satu quarter lingkaran.
  // Buat efek tilt halus kayak durable, pakai angka kecil (50-70) bukan 90.
  arcSpan: { type: Number, default: 70 },
  gapDeg: { type: Number, default: 1.5 },
  frameHeight: { type: Number, default: 480 },
  baseSpeed: { type: Number, default: 6 },
  hoverSpeedFactor: { type: Number, default: 0.12 },
  // true = tampilin titik hitam di posisi circleCenter, buat bantu kamu nge-tune posisinya
  showDebugCenter: { type: Boolean, default: false },
});

const frameEl = ref(null);
const measuredWidth = ref(0);
let resizeObserver = null;

const rotation = ref(0);
const currentSpeed = ref(props.baseSpeed);
let targetSpeed = props.baseSpeed;
let rafId = null;
let lastTime = null;

const total = computed(() => props.images.length);
const tiltStep = computed(() => props.arcSpan / total.value);
const effectiveRadius = computed(() => measuredWidth.value * props.radiusRatio);

const positionedItems = computed(() => {
  return props.images.map((src, i) => {
    // loop terus dalam rentang [0, arcSpan), lalu ditambah startAngle biar mulai dari sudut yg dipilih
    let localAngle = (rotation.value + i * tiltStep.value) % props.arcSpan;
    if (localAngle < 0) localAngle += props.arcSpan;
    const angle = props.startAngle + localAngle;

    const radian = (angle * Math.PI) / 180;
    // rumus lingkaran STANDAR (bukan yang "simetris" kayak sebelumnya):
    // 0° tepat di atas circleCenter, muter searah jarum jam
    const x = effectiveRadius.value * Math.sin(radian);
    const y = -effectiveRadius.value * Math.cos(radian);

    return {
      src,
      style: {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
      },
    };
  });
});

function loop(time) {
  if (lastTime == null) lastTime = time;
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  currentSpeed.value +=
    (targetSpeed - currentSpeed.value) * Math.min(1, dt * 3);
  rotation.value += currentSpeed.value * dt;
  rafId = requestAnimationFrame(loop);
}

function onEnter() {
  targetSpeed = props.baseSpeed * props.hoverSpeedFactor;
}
function onLeave() {
  targetSpeed = props.baseSpeed;
}

onMounted(() => {
  if (frameEl.value) {
    measuredWidth.value = frameEl.value.clientWidth;
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries)
        measuredWidth.value = entry.contentRect.width;
    });
    resizeObserver.observe(frameEl.value);
  }
  lastTime = null;
  rafId = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<template>
  <div
    ref="frameEl"
    class="radial-frame w-full"
    :style="{ height: `${frameHeight}px` }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <!-- titik pusat lingkaran, cuma buat bantu nge-tune posisi (matiin di production) -->
    <div
      v-if="showDebugCenter"
      class="radial-frame__debug-dot"
      :style="{ top: `${circleCenterY}%`, left: `${circleCenterX}%` }"
    />

    <div
      v-for="(item, i) in positionedItems"
      :key="images[i] + i"
      class="radial-frame__item"
      :style="{
        ...item.style,
        top: `${circleCenterY}%`,
        left: `${circleCenterX}%`,
      }"
    >
      <img :src="item.src" :alt="`radial-item-${i}`" draggable="false" />
    </div>
  </div>
</template>

<style scoped>
.radial-frame {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: #f1f1f1;
  margin: 0 auto;
  container-type: inline-size;
}

.radial-frame__debug-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #e11;
  transform: translate(-50%, -50%);
  z-index: 50;
}

.radial-frame__item {
  position: absolute;
  width: var(--radial-item-width, 34cqw);
  aspect-ratio: 500 / 650;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
  background: #fff;
}

.radial-frame__item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
