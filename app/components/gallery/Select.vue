<template>
  <div
    class="input-stack"
    :class="[
      `size-${size}`,
      {
        'has-icon-right': true,
        'has-value': hasValue,
        'is-focused': isFocused,
      },
      `mb-${marginB}`,
    ]"
    :style="{ '--max-width': props.maxWidth }"
  >
    <!-- Desktop Label -->
    <label
      v-if="label || $slots.label"
      :class="`text-${size}`"
      class="desktop-label"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <div class="input-wrapper">
      <!-- ============ DESKTOP SELECT (hidden on mobile) ============ -->
      <div
        class="custom-select-trigger desktop-select shadow-app"
        :class="{ 'is-focus': open }"
        @click="toggleOpen"
      >
        <span :class="{ placeholder: !selectedLabel }">
          {{ selectedLabel || placeholder }}
        </span>
        <component
          :is="ChevronDown"
          class="icon icon-right select-arrow"
          :class="{ open: open }"
          :size="16"
        />
      </div>

      <!-- ============ MOBILE OUTLINED SELECT ============ -->
      <div class="mobile-outlined-wrapper" @click="toggleOpen">
        <!-- Mobile Floating Label -->
        <label v-if="label || $slots.label" class="mobile-floating-label">
          <slot name="label">{{ label }}</slot>
        </label>

        <!-- Mobile Value Display -->
        <div
          class="input-field mobile-select-trigger"
          :class="{ 'placeholder-text': !selectedLabel }"
        >
          {{ selectedLabel || placeholder }}
        </div>

        <!-- Mobile Chevron Icon -->
        <span class="mobile-icon-right" aria-hidden="true">
          <component
            :is="ChevronDown"
            class="select-arrow"
            :class="{ open: open }"
            :size="18"
          />
        </span>
      </div>

      <!-- ============ FLOATING DROPDOWN MENU ============ -->
      <transition name="select-slide">
        <div v-if="open" class="floating-select-container">
          <div class="menu-backdrop" @click="open = false"></div>

          <div class="floating-select-menu">
            <div v-if="searchable" class="search-wrapper" @click.stop>
              <Input
                v-model="searchQuery"
                type="search"
                :placeholder="props.placeholder"
                ref="searchInputRef"
                :max-width="props.maxWidth"
              >
                <template #icon-left>
                  <Search />
                </template>
              </Input>
            </div>

            <div class="select-list">
              <div v-if="filteredOptions.length === 0" class="no-results">
                No results found
              </div>
              <div
                v-for="opt in filteredOptions"
                :key="opt.value"
                class="select-item"
                :class="{ active: modelValue === opt.value }"
                @click="selectOption(opt)"
              >
                {{ opt.label }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <small v-if="hint || $slots.hint">
      <slot name="hint">{{ hint }}</slot>
    </small>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { ChevronDown, Search } from "~/utils/icons";
import Input from "./Input.vue";

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "Select option" },
  hint: { type: String, default: "" },
  options: {
    type: Array,
    default: () => [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
    ],
  },
  maxWidth: { type: String, default: "270px" },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  searchable: { type: Boolean, default: false },
  marginB: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg", "none"].includes(v),
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const open = ref(false);
const searchQuery = ref("");
const searchInputRef = ref(null);
const isFocused = ref(false);

const selectedLabel = computed(() => {
  const selected = props.options.find((o) => o.value === props.modelValue);
  return selected ? selected.label : "";
});

const hasValue = computed(
  () =>
    props.modelValue !== "" &&
    props.modelValue !== null &&
    props.modelValue !== undefined,
);

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  return props.options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const toggleOpen = () => {
  open.value = !open.value;
  isFocused.value = open.value;

  if (open.value && props.searchable) {
    searchQuery.value = "";
    nextTick(() => {
      searchInputRef.value?.focus();
    });
  }
};

const selectOption = (opt) => {
  emit("update:modelValue", opt.value);
  emit("change", opt.value);
  open.value = false;
  isFocused.value = false;
};
</script>

<style scoped>
/* ============================================
   BASE STYLES (Desktop & Tablet)
   ============================================ */
.input-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: min(100%, var(--max-width, 270px));
  font-size: 12px;
  line-height: 1.4;
}

.input-stack label {
  font-weight: 500;
  color: var(--foreground);
  cursor: pointer;
  user-select: none;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Desktop select trigger */
.desktop-select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 10px 11px;
  font: inherit;
  background: var(--background);
  outline: none;
  color: var(--foreground);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  box-sizing: border-box;
  cursor: pointer;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.desktop-select.is-focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.placeholder {
  color: var(--muted);
}

.select-arrow {
  transition: transform 0.2s ease;
  pointer-events: none;
  color: var(--muted);
}
.select-arrow.open {
  transform: rotate(180deg);
}

.floating-select-container {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  z-index: 100;
}

.menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.floating-select-menu {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 9px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 6px;
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow: hidden;
}

.search-wrapper {
  position: relative;
  border-bottom: 1px solid var(--border);
  width: 100%;
  padding-bottom: 6px;
}

.select-list {
  overflow-y: auto;
  flex: 1;
}
.select-list::-webkit-scrollbar {
  width: 6px;
}
.select-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

.select-item {
  padding: 8px 11px;
  font-size: 12px;
  color: var(--foreground);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.select-item:hover {
  background: var(--primary);
  color: var(--background);
}
.select-item.active {
  background: var(--primary);
  color: var(--card);
}

.no-results {
  padding: 12px;
  text-align: center;
  font-size: 12px;
  color: var(--muted);
}

/* Hint */
.input-stack small {
  color: var(--muted);
  font-size: 11px;
  min-height: 16px;
}

/* ============================================
   MOBILE OUTLINED FLOATING LABEL
   Premium SaaS Style — Active below 640px
   ============================================ */

/* Hide desktop elements on mobile */
@media (max-width: 639px) {
  .desktop-label,
  .desktop-select {
    display: none !important;
  }
}

/* Hide mobile elements on desktop/tablet */
@media (min-width: 640px) {
  .mobile-outlined-wrapper,
  .mobile-floating-label,
  .mobile-icon-right,
  .mobile-select-trigger {
    display: none !important;
  }
}

/* Mobile wrapper */
.mobile-outlined-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* Mobile select trigger (looks like input) */
.mobile-select-trigger {
  width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 16px 40px 8px 14px;
  font-size: 15px;
  font-weight: 450;
  outline: none;
  color: var(--foreground);
  background: var(--background);
  transition:
    border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.2s ease;
  box-sizing: border-box;
  min-height: 52px;
  display: flex;
  align-items: center;
}

.mobile-select-trigger.placeholder-text {
  color: var(--muted);
}

/* Mobile focus state */
.input-stack.is-focused .mobile-select-trigger {
  border-color: var(--primary, #65a30d);
  box-shadow:
    0 0 0 3px rgba(101, 163, 13, 0.12),
    0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

/* Mobile floating label */
.mobile-floating-label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  font-weight: 450;
  color: var(--muted) !important;
  pointer-events: none;
  background: var(--background);
  padding: 0 4px;
  border-radius: 4px;
  transition:
    top 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    font-size 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.25s ease,
    left 0.2s ease;
  z-index: 2;
  line-height: 1;
  letter-spacing: -0.01em;
}

/* Float label up when focused or has value */
.input-stack.is-focused .mobile-floating-label,
.input-stack.has-value .mobile-floating-label {
  top: 0;
  transform: translateY(-50%) scale(0.78);
  left: 0px;
  color: var(--primary, #4ade80) !important;
  font-weight: 600;
}

/* Mobile icon right (chevron) */
.mobile-icon-right {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--muted);
  z-index: 2;
  transition: color 0.15s ease;
  pointer-events: none;
}

/* ============================================
   SIZE VARIANTS (Desktop)
   ============================================ */
.size-sm .desktop-select {
  padding: 7px 30px 7px 9px;
  font-size: 11px;
  border-radius: 7px;
}
.size-lg .desktop-select {
  padding: 13px 42px 13px 14px;
  font-size: 14px;
  border-radius: 11px;
}

/* ============================================
   SIZE VARIANTS (Mobile)
   ============================================ */
.size-sm .mobile-outlined-wrapper .mobile-select-trigger {
  min-height: 44px;
  padding: 14px 36px 6px 12px;
  font-size: 14px;
  border-radius: 10px;
}
.size-sm .mobile-floating-label {
  font-size: 14px;
  left: 13px;
}
.size-sm.is-focused .mobile-floating-label,
.size-sm.has-value .mobile-floating-label {
  left: 9px;
}
.size-sm .mobile-icon-right {
  right: 10px;
}

.size-lg .mobile-outlined-wrapper .mobile-select-trigger {
  min-height: 60px;
  padding: 20px 44px 10px 16px;
  font-size: 16px;
  border-radius: 14px;
}
.size-lg .mobile-floating-label {
  font-size: 16px;
  left: 17px;
}
.size-lg.is-focused .mobile-floating-label,
.size-lg.has-value .mobile-floating-label {
  left: 13px;
}
.size-lg .mobile-icon-right {
  right: 14px;
}

/* ============================================
   TYPOGRAPHY & SPACING UTILITIES
   ============================================ */
.text-md {
  font-size: 15px;
}
.text-sm {
  font-size: var(--text-sm);
}
.text-lg {
  font-size: var(--text-lg);
}
.mb-sm {
  margin-bottom: 0.5rem;
}
.mb-md {
  margin-bottom: 1rem;
}
.mb-lg {
  margin-bottom: 1.5rem;
}
.mb-none {
  margin-bottom: 0;
}

/* ============================================
   SUBTLE ENTRANCE ANIMATION
   ============================================ */
@keyframes inputFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-outlined-wrapper {
  animation: inputFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Slide transition for dropdown */
.select-slide-enter-active,
.select-slide-leave-active {
  transition: all 0.2s ease;
}
.select-slide-enter-from,
.select-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
