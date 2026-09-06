<template>
  <div ref="containerRef" class="card-stack" :style="{ width, height }">
    <div
      v-for="(slide, i) in slides"
      :key="slide.image || i"
      class="card-wrap"
      :ref="(el) => setWrapRef(el, i)"
    >
      <div class="card" :ref="(el) => setCardRef(el, i)">
        <img :src="slide.image" :alt="slide.alt || ''" draggable="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  slides: { type: Array, required: true },
  interval: { type: Number, default: 3500 },
  autoplay: { type: Boolean, default: true },
  width: { type: String, default: "100%" },
  height: { type: String, default: "100%" },
  duration: { type: Number, default: 0.85 },
  threshold: { type: Number, default: 0.2 },
});

const containerRef = ref(null);
const cardWrapEls = [];
const cardEls = [];
const order = ref([0, 1, 2]);

let timeline = null;
let observer = null;
let cycleTimer = null;
let isMounted = false;
let isAnimating = false;
const prefersReducedMotion = ref(false);

// PERBAIKAN: Hitung jarak proporsional.
// 0.55 dari lebar & 0.22 dari tinggi adalah persis perbandingan 150px & 70px
// pada card berukuran 260px x 320px.
function getSlots() {
  const w = containerRef.value ? containerRef.value.offsetWidth : 260;
  const h = containerRef.value ? containerRef.value.offsetHeight : 320;

  return {
    top: { x: 0, y: 0, rotate: 0, scale: 1 },
    left: { x: -w * 0.55, y: -h * 0.22, rotate: -9, scale: 0.93 },
    right: { x: w * 0.55, y: -h * 0.22, rotate: 9, scale: 0.93 },
  };
}

function setWrapRef(el, index) {
  if (el) cardWrapEls[index] = el;
}
function setCardRef(el, index) {
  if (el) cardEls[index] = el;
}

function setStackZ(top, left, right) {
  if (cardWrapEls[top]) gsap.set(cardWrapEls[top], { zIndex: 30 });
  if (cardWrapEls[left]) gsap.set(cardWrapEls[left], { zIndex: 20 });
  if (cardWrapEls[right]) gsap.set(cardWrapEls[right], { zIndex: 20 });
}

function setInitialLayout() {
  const slots = getSlots();
  order.value.forEach((cardIndex, slotIndex) => {
    const el = cardEls[cardIndex];
    if (!el) return;

    const slotKey =
      slotIndex === 0 ? "top" : slotIndex === 1 ? "left" : "right";
    const slot = slots[slotKey];

    // PERBAIKAN: Gunakan xPercent & yPercent agar titik tengah kartu SELALU 0,0
    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      x: slot.x,
      y: slot.y,
      rotate: slot.rotate,
      scale: slot.scale,
      opacity: 1,
    });
  });

  setStackZ(order.value[0], order.value[1], order.value[2]);
}

function animateCycle() {
  if (
    !isMounted ||
    !props.autoplay ||
    prefersReducedMotion.value ||
    order.value.length !== 3 ||
    isAnimating
  )
    return;

  isAnimating = true;
  const topIndex = order.value[0];
  const leftIndex = order.value[1];
  const rightIndex = order.value[2];

  const top = cardEls[topIndex];
  const left = cardEls[leftIndex];
  const right = cardEls[rightIndex];

  const topWrap = cardWrapEls[topIndex];
  const leftWrap = cardWrapEls[leftIndex];
  const rightWrap = cardWrapEls[rightIndex];

  if (!top || !left || !right) {
    isAnimating = false;
    return;
  }

  gsap.killTweensOf([top, left, right, topWrap, leftWrap, rightWrap]);
  timeline?.kill();

  timeline = gsap.timeline({
    onComplete: () => {
      order.value = [rightIndex, topIndex, leftIndex];
      setStackZ(order.value[0], order.value[1], order.value[2]);
      isAnimating = false;
      scheduleNext();
    },
  });

  gsap.set(rightWrap, { zIndex: 40 });
  gsap.set(topWrap, { zIndex: 20 });
  gsap.set(leftWrap, { zIndex: 10 });

  const slots = getSlots();
  const w = containerRef.value.offsetWidth;
  const h = containerRef.value.offsetHeight;

  // Top -> Left
  timeline.to(
    top,
    {
      x: slots.left.x,
      y: slots.left.y,
      rotate: slots.left.rotate,
      scale: slots.left.scale,
      duration: props.duration,
      ease: "power2.inOut",
    },
    0,
  );

  // Left -> Right
  timeline.to(
    left,
    {
      keyframes: [
        {
          x: -w * 0.3,
          y: -h * 0.03,
          rotate: -3,
          scale: 0.95,
          duration: props.duration * 0.35,
        },
        {
          x: w * 0.19,
          y: -h * 0.11,
          rotate: 4,
          scale: 0.94,
          duration: props.duration * 0.25,
        },
        {
          x: slots.right.x,
          y: slots.right.y,
          rotate: slots.right.rotate,
          scale: slots.right.scale,
          duration: props.duration * 0.4,
        },
      ],
      ease: "power2.inOut",
    },
    0,
  );

  // Right -> Top
  timeline.to(
    right,
    {
      keyframes: [
        {
          x: w * 0.46,
          y: -h * 0.15,
          rotate: 6,
          scale: 0.96,
          duration: props.duration * 0.25,
        },
        {
          x: w * 0.23,
          y: -h * 0.08,
          rotate: 3,
          scale: 0.98,
          duration: props.duration * 0.25,
        },
        {
          x: slots.top.x,
          y: slots.top.y,
          rotate: slots.top.rotate,
          scale: slots.top.scale,
          duration: props.duration * 0.5,
        },
      ],
      ease: "power2.out",
    },
    0,
  );
}

function scheduleNext() {
  clearTimeout(cycleTimer);
  if (!isMounted || !props.autoplay || prefersReducedMotion.value) return;
  cycleTimer = setTimeout(() => {
    animateCycle();
  }, props.interval);
}

function startAnimation() {
  if (!isMounted || !props.autoplay || prefersReducedMotion.value) return;
  if (isAnimating) {
    timeline?.play();
    return;
  }
  scheduleNext();
}

function pauseAnimation() {
  clearTimeout(cycleTimer);
  cycleTimer = null;
  if (timeline && isAnimating) timeline.pause();
}

function checkReducedMotion() {
  if (typeof window === "undefined") return;
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

function setupObserver() {
  if (typeof window === "undefined" || !containerRef.value) return;
  observer?.disconnect();
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting && entry.intersectionRatio >= props.threshold) {
        if (timeline && isAnimating) timeline.resume();
        else startAnimation();
      } else {
        pauseAnimation();
      }
    },
    { threshold: [props.threshold] },
  );
  observer.observe(containerRef.value);
}

function handleResize() {
  if (!isAnimating) setInitialLayout();
}

onMounted(async () => {
  isMounted = true;
  await nextTick();
  if (props.slides.length !== 3) {
    console.warn("[CardStack] slides harus berjumlah 3.");
    return;
  }
  checkReducedMotion();
  order.value = [0, 1, 2];
  setInitialLayout();
  setupObserver();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  isMounted = false;
  clearTimeout(cycleTimer);
  window.removeEventListener("resize", handleResize);
  observer?.disconnect();
  observer = null;
  timeline?.kill();
  timeline = null;
  cardEls.forEach((el) => {
    if (el) gsap.killTweensOf(el);
  });
  cardWrapEls.forEach((el) => {
    if (el) gsap.killTweensOf(el);
  });
});
</script>

<style scoped>
.card-stack {
  position: relative;
  overflow: visible;
  perspective: 1000px;
  user-select: none;
}

.card-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  /* Hapus transform translate di sini, biarkan GSAP yang urus pakai xPercent/yPercent */
  will-change: transform;
  pointer-events: none;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.25);
  will-change: transform;
  transform-origin: center;
  backface-visibility: hidden;
}

.card img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: top center;
  background: #ffffff;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card-wrap {
    transition: none !important;
  }
}
</style>
