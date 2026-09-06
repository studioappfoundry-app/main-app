<script setup>
import lottie from "lottie-web";

const props = defineProps({
  animation: {
    type: String,
    required: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});

const container = ref(null);
let animationInstance = null;

onMounted(() => {
  animationInstance = lottie.loadAnimation({
    container: container.value,
    renderer: "svg",
    loop: props.loop,
    autoplay: props.autoplay,
    path: props.animation,
  });
});

onBeforeUnmount(() => {
  animationInstance?.destroy();
});
</script>

<template>
  <div ref="container"></div>
</template>
