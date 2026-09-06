<template>
  <div ref="menuWrap" class="menu-wrap">
    <!-- Trigger -->
    <button
      ref="triggerRef"
      type="button"
      class="control-button text-secondary"
      :class="`text-${props.size}`"
      @click="toggle"
    >
      {{ currentTriggerText }}

      <span class="arrow" :class="{ open }">
        <ChevronDown :size="16" />
      </span>
    </button>

    <!-- Teleport -->
    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="pop-fade">
        <div v-if="open" class="menu-backdrop" @click="close" />
      </Transition>

      <!-- Popover -->
      <Transition name="pop-slide">
        <div
          v-if="open"
          ref="popoverRef"
          class="floating-popover-container"
          :style="popoverStyle"
        >
          <div class="floating-popover">
            <p v-if="title" class="eyebrow p-4 mb-0 border-bottom">
              {{ title }}
            </p>

            <label
              v-for="(item, index) in options"
              :key="item + index"
              class="popover-item py-3 px-4"
            >
              <input
                class="hidden"
                type="radio"
                :checked="selectedValue === item"
                @change="selectItem(item)"
              />

              <span :class="`text-${props.size}`">
                {{ item }}
              </span>
            </label>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ChevronDown } from "~/utils/icons";
import {
  ref,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  triggerText: {
    type: String,
    default: "",
  },

  title: {
    type: String,
    default: "",
  },

  options: {
    type: Array,
    default: () => [],
  },

  size: {
    type: String,
    default: "base",
    validator: (v) => ["sm", "base"].includes(v),
  },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

const triggerRef = ref(null);
const popoverRef = ref(null);

const position = ref({
  top: 0,
  left: 0,
});

const selectedValue = computed(() => {
  return props.modelValue || props.options[0] || "";
});

const currentTriggerText = computed(() => {
  return `${props.triggerText} ${selectedValue.value}`;
});

const popoverStyle = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
}));

const updatePosition = async () => {
  if (!triggerRef.value || !popoverRef.value) return;

  const gap = 8;
  const triggerRect = triggerRef.value.getBoundingClientRect();

  // Ambil ukuran asli popover berdasarkan kontennya
  const popoverRect = popoverRef.value.getBoundingClientRect();

  const popoverWidth = popoverRect.width;

  // Posisi vertikal
  let top = triggerRect.bottom + gap;

  // Pojok kanan popover sejajar dengan pojok kanan trigger
  let left = triggerRect.right - popoverWidth;

  // Jangan keluar viewport kiri
  if (left < gap) {
    left = gap;
  }

  // Jangan keluar viewport kanan
  if (left + popoverWidth > window.innerWidth - gap) {
    left = window.innerWidth - popoverWidth - gap;
  }

  position.value = {
    top,
    left,
  };
};

const toggle = async () => {
  open.value = !open.value;

  if (open.value) {
    await nextTick();
    await updatePosition();
  }
};

const close = () => {
  open.value = false;
};

const selectItem = (item) => {
  emit("update:modelValue", item);
  open.value = false;
};

const handleResize = () => {
  if (open.value) {
    updatePosition();
  }
};

const handleScroll = () => {
  if (open.value) {
    updatePosition();
  }
};

watch(
  () => props.options,
  (options) => {
    if (!props.modelValue && options.length) {
      emit("update:modelValue", options[0]);
    }
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll, true);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll, true);
});
</script>

<style scoped>
.menu-wrap {
  display: inline-block;
  width: max-content;
}

.control-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  width: max-content;
}

.control-button:hover {
  background: var(--background);
}

.arrow {
  display: flex;
}

.arrow svg {
  transition: transform 0.2s ease;
}

.arrow.open svg {
  transform: rotate(180deg);
}

/* Backdrop */
.menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}

/* Container hanya sebagai positioning */
.floating-popover-container {
  position: fixed;
  z-index: 9999;
}

/* Ukuran mengikuti konten */
.floating-popover {
  width: max-content;
  max-width: calc(100vw - 16px);

  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 10px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  overflow: hidden;
}

/* Title */
.eyebrow {
  font-size: 11px;
  font-weight: 600;

  color: var(--muted);

  text-transform: uppercase;
}

/* Item */
.popover-item {
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
  color: var(--foreground);
  white-space: nowrap;
}

.popover-item:hover {
  background: var(--card);
}

/* Animation */
.pop-slide-enter-active,
.pop-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.pop-slide-enter-from,
.pop-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.pop-fade-enter-active,
.pop-fade-leave-active {
  transition: opacity 0.15s ease;
}

.pop-fade-enter-from,
.pop-fade-leave-to {
  opacity: 0;
}
</style>
