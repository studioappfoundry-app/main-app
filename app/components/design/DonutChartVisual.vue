<script setup lang="ts">
const props = withDefaults(defineProps<{ value?: number }>(), { value: 68 })
</script>

<template>
  <div class="donut" :style="{ '--value': `${props.value * 3.6}deg` }">
    <div>
      <strong>{{ props.value }}%</strong>
      <span>complete</span>
    </div>
  </div>
</template>
