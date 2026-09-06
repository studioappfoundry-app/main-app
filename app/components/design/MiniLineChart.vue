<script setup lang="ts">
withDefaults(defineProps<{ color?: string }>(), { color: 'var(--mint)' })
</script>

<template>
  <svg class="mini-chart" viewBox="0 0 300 100" role="img" aria-label="Line chart">
    <path
      d="M4 76 C28 69 38 80 58 63 S83 58 102 66 S126 46 143 52 S172 18 190 34 S214 30 234 42 S260 17 296 8"
      fill="none"
      :stroke="color"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M4 76 C28 69 38 80 58 63 S83 58 102 66 S126 46 143 52 S172 18 190 34 S214 30 234 42 S260 17 296 8 V100 H4Z"
      fill="var(--mint-soft)"
    />
  </svg>
</template>
