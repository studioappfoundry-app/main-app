<script setup lang="ts">
const heights = [52, 78, 42, 93, 64, 84, 58, 72, 48]
</script>

<template>
  <div class="bars" aria-label="Bar chart">
    <i v-for="(h, i) in heights" :key="i" :style="{ height: `${h}%` }" />
  </div>
</template>
