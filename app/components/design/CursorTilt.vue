<template>
  <div
    class="tilt-card"
    ref="cardRef"
    :style="{ width, height }"
    @mousemove="handleMove"
    @mouseleave="handleLeave"
  >
    <div class="stage">
      <div class="image desktop" ref="desktopRef">
        <img :src="desktopImage" alt="desktop preview" draggable="false" />
      </div>
      <div class="image mobile" ref="mobileRef">
        <img :src="mobileImage" alt="mobile preview" draggable="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  desktopImage: {
    type: String,
    required: true,
  },
  mobileImage: {
    type: String,
    required: true,
  },
  maxTilt: {
    type: Number,
    default: 20,
  },
  // Ubah default ke 100% agar mengikuti parent container
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
});

const cardRef = ref(null);
const desktopRef = ref(null);
const mobileRef = ref(null);

function handleMove(e) {
  if (!cardRef.value) return;

  // Hitung 11% dari lebar container (50px / 460px = ~0.108)
  // Jadi jika container diperkecil, jarak gesernya ikut mengecil
  const moveX = cardRef.value.offsetWidth * 0.07;

  gsap.to(desktopRef.value, {
    rotateZ: props.maxTilt,
    x: moveX, // Gunakan 'x' (shorthand GSAP) alih-alih translateX string
    duration: 0.35,
    ease: "power3.out",
    overwrite: "auto",
  });

  gsap.to(mobileRef.value, {
    rotateZ: -props.maxTilt,
    x: -moveX,
    duration: 0.35,
    ease: "power3.out",
    overwrite: "auto",
  });
}

function handleLeave() {
  gsap.to([desktopRef.value, mobileRef.value], {
    rotateZ: 0,
    x: 0,
    duration: 0.4,
    ease: "power3.out",
    overwrite: "auto",
  });
}
</script>

<style scoped>
.tilt-card {
  position: relative;
  perspective: 1200px;
}

.stage {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.image {
  position: absolute;
  transform-style: preserve-3d;
  transform-origin: center center;
  will-change: transform;
  border-radius: 12px;
  overflow: hidden;
}

.image img {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
  pointer-events: none;
}

.desktop {
  bottom: 0;
  right: 0;
  width: 80%;
  height: 78%;
  z-index: 1;
}

.mobile {
  bottom: 0;
  /* Ubah dari 60px menjadi 13% agar responsif terhadap perubahan ukuran */
  left: 13%;
  width: 20%;
  height: 60%;
  z-index: 2;
}
</style>
