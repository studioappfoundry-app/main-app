<script setup lang="ts">
defineEmits<{ click: [] }>()
</script>

<template>
  <button class="close-button" aria-label="Close" @click="$emit('click')">×</button>
</template>
