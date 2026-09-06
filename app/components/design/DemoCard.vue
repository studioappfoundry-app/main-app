<script setup lang="ts">
const props = defineProps<{
  title: string;
  note?: string;
  /** Raw source code of the calling component, copied when the copy button is pressed. */
  code: string;
}>();

const { copied, copy } = useCopyCode();
</script>

<template>
  <section class="gallery-card">
    <div class="gallery-card-head">
      <div>
        <p class="eyebrow">Component</p>
        <h2>{{ title }}</h2>
      </div>
      <div class="card-actions">
        <span v-if="note" class="state-note">{{ note }}</span>
        <button
          type="button"
          class="copy-button"
          :class="{ copied }"
          :aria-label="`Copy ${title} source`"
          @click="copy(props.code)"
        >
          {{ copied ? "Copied" : "Copy" }}
        </button>
      </div>
    </div>
    <div class="demo-surface">
      <slot />
    </div>
  </section>
</template>
<style scoped>
.gallery-card {
  width: 100%;
  max-width: 100%;
  min-width: 0; /* Penting agar bisa shrink di dalam grid */
  box-sizing: border-box;
  overflow: hidden;
}

.demo-surface {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  overflow: auto;
}

.demo-surface > * {
  min-width: 0;
  max-width: 100%;
  width: 100%;
}
</style>
