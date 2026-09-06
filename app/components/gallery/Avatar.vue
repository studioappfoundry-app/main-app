<template>
  <div
    class="relative inline-flex items-center justify-center rounded-full font-semibold flex-shrink-0 overflow-hidden"
    :class="[
      sizeClasses[size],
      stacked ? 'ring-2 ring-[var(--background)] -ml-3 first:ml-0' : '',
    ]"
  >
    <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover" />
    <span v-else class="flex items-center justify-center w-full h-full">{{
      initials
    }}</span>

    <span
      v-if="status"
      class="absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--background)]"
      :class="statusClasses[status]"
    ></span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: { type: String, default: "" },
  alt: { type: String, default: "User" },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["xs", "sm", "md", "lg"].includes(v),
  },
  status: {
    type: String,
    default: "",
    validator: (v) => ["", "online", "offline", "busy"].includes(v),
  },
  stacked: { type: Boolean, default: false },
});

// Mapping ukuran ke class Tailwind
const sizeClasses = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

// Mapping status ke class Tailwind
const statusClasses = {
  online: "w-3 h-3 bg-green-500",
  offline: "w-3 h-3 bg-slate-400",
  busy: "w-3 h-3 bg-red-500",
};

const initials = computed(() => {
  if (!props.alt) return "?";
  const words = props.alt.split(" ");
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return props.alt.substring(0, 2).toUpperCase();
});
</script>
