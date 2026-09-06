<!-- components/ui/Breadcrumb.vue -->
<template>
  <div
    class="flex items-center space-x-2 text-sm text-secondary mb-3"
    aria-label="Breadcrumb"
  >
    <template v-for="(item, index) in items" :key="item.label">
      <!-- Breadcrumb Item -->
      <component
        :is="item.to ? 'RouterLink' : 'span'"
        :to="item.to"
        class="flex items-center gap-1.5 transition-colors"
        :class="
          index === items.length - 1
            ? 'text-foreground font-medium cursor-default'
            : 'hover:text-foreground cursor-pointer'
        "
        @click="handleClick(item, index)"
      >
        <span>{{ item.label }}</span>
      </component>

      <!-- Separator -->
      <ChevronRight
        v-if="index < items.length - 1"
        class="w-4 h-4 text-muted shrink-0"
      />
    </template>
  </div>
</template>

<script setup>
import { ChevronRight } from "~/utils/icons";

defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["click"]);

const handleClick = (item, index) => {
  emit("click", {
    item,
    index,
  });
};
</script>
