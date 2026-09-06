<template>
  <div
    class="input-stack"
    :class="[
      `size-${size}`,
      {
        'has-icon-left': hasIconLeft,
        'has-icon-right': hasIconRight,
        'has-error': !!error,
        'is-disabled': disabled,
        'is-textarea': isTextarea,
        'is-date': isDateType,
        'is-currency': isCurrency,
        'has-value': hasValue,
        'is-focused': isFocused,
        'has-no-label': !hasLabel,
      },
      `mb-${marginB}`,
    ]"
    :style="{ '--max-width': maxWidth }"
  >
    <!-- Desktop / Tablet Label (default, hidden on mobile when outlined) -->
    <label
      v-if="label || $slots.label"
      :for="inputId"
      :class="`text-${size}`"
      class="desktop-label"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <div class="input-wrapper">
      <!-- Currency prefix (desktop) -->
      <span
        v-if="isCurrency"
        class="icon icon-left currency-prefix desktop-currency"
        aria-hidden="true"
      >
        {{ currencyPrefix }}
      </span>
      <!-- Icon left (desktop) -->
      <span
        v-else-if="hasIconLeft"
        class="icon icon-left desktop-icon-left"
        aria-hidden="true"
      >
        <slot name="icon-left" />
      </span>

      <!-- Mobile Outlined Wrapper -->
      <div class="mobile-outlined-wrapper">
        <!-- Mobile Label (floating inside border) -->
        <label
          v-if="label || $slots.label"
          :for="inputId"
          class="mobile-floating-label"
        >
          <slot name="label">{{ label }}</slot>
        </label>

        <!-- Mobile Currency Prefix -->
        <span
          v-if="isCurrency"
          class="mobile-currency-prefix"
          aria-hidden="true"
        >
          {{ currencyPrefix }}
        </span>

        <!-- Mobile Icon Left -->
        <span
          v-if="slots['icon-left'] && !isCurrency"
          class="mobile-icon-left"
          aria-hidden="true"
        >
          <slot name="icon-left" />
        </span>

        <component
          :is="isTextarea ? 'textarea' : 'input'"
          :id="inputId"
          :class="[
            attrs.class ? attrs.class : 'bg-background shadow-app',
            'input-field',
          ]"
          :type="isTextarea || isDateType || isCurrency ? 'text' : type"
          :inputmode="isCurrency ? 'numeric' : undefined"
          :value="displayValue"
          :placeholder="mobilePlaceholder"
          :disabled="disabled"
          :readonly="isDateType || readonly"
          :rows="isTextarea ? rows : undefined"
          :cols="isTextarea ? cols : undefined"
          v-bind="$attrs"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @change="onChange"
        />

        <!-- Mobile Icon Right / Clear / Calendar -->
        <span
          v-if="isDateType"
          class="mobile-icon-right calendar-icon"
          aria-hidden="true"
          @click="onFocus($event)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>

        <button
          v-else-if="showClearButton"
          type="button"
          class="mobile-icon-right clear-btn"
          aria-label="Clear input"
          @click="clearInput"
          @mousedown.prevent="clearInput"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <span
          v-else-if="hasIconRight"
          class="mobile-icon-right"
          aria-hidden="true"
        >
          <slot name="icon-right" />
        </span>
      </div>

      <!-- Desktop Input (hidden on mobile) -->
      <component
        :is="isTextarea ? 'textarea' : 'input'"
        :id="inputId + '-desktop'"
        :class="[
          attrs.class ? attrs.class : 'bg-background shadow-app',
          'desktop-input',
        ]"
        :type="isTextarea || isDateType || isCurrency ? 'text' : type"
        :inputmode="isCurrency ? 'numeric' : undefined"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="isDateType || readonly"
        :rows="isTextarea ? rows : undefined"
        :cols="isTextarea ? cols : undefined"
        v-bind="$attrs"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />

      <!-- Desktop Right Icons -->
      <span
        v-if="isDateType"
        class="icon icon-right calendar-icon desktop-calendar"
        aria-hidden="true"
        @click="onFocus($event)"
      >
        📅
      </span>

      <button
        v-else-if="showClearButton"
        type="button"
        class="icon icon-right clear-btn desktop-clear"
        aria-label="Clear input"
        @click="clearInput"
        @mousedown.prevent="clearInput"
      >
        ✕
      </button>

      <span
        v-else-if="hasIconRight"
        class="icon icon-right desktop-icon-right"
        aria-hidden="true"
      >
        <slot name="icon-right" />
      </span>

      <Datepicker
        v-if="isDateType && showDatepicker"
        :modelValue="modelValue"
        @update:modelValue="onDateSelect"
        @close="showDatepicker = false"
      />
    </div>

    <small v-if="dynamicHint || $slots.hint">
      <slot name="hint">{{ dynamicHint }}</slot>
    </small>
  </div>
</template>

<script setup>
import { computed, ref, useSlots, useAttrs, useId } from "vue";
import Datepicker from "./Datepicker.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  type: {
    type: String,
    default: "text",
    validator: (v) =>
      [
        "text",
        "date",
        "number",
        "search",
        "password",
        "email",
        "tel",
        "url",
        "textarea",
      ].includes(v),
  },
  label: { type: String, default: "" },
  hint: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  id: { type: String, default: null },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  rows: { type: [String, Number], default: 4 },
  cols: { type: [String, Number], default: undefined },
  maxWidth: { type: String, default: "270px" },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  currencyPrefix: { type: String, default: "" },
  marginB: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg", "none"].includes(v),
  },
});

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "change",
  "input",
  "keydown",
  "keyup",
]);
const slots = useSlots();
const attrs = useAttrs();

const showDatepicker = ref(false);
const isFocused = ref(false);

const hasLabel = computed(() => !!props.label || !!slots.label);

const inputId = useId();
const isTextarea = computed(() => props.type === "textarea");
const isDateType = computed(() => props.type === "date");
const isSearchType = computed(() => props.type === "search");
const isCurrency = computed(() => !!props.currencyPrefix);

const hasValue = computed(
  () =>
    props.modelValue !== "" &&
    props.modelValue !== null &&
    props.modelValue !== undefined,
);
const showClearButton = computed(
  () => isSearchType.value && hasValue.value && !props.disabled,
);

const hasIconLeft = computed(() => !!slots["icon-left"] || isCurrency.value);
const hasIconRight = computed(
  () => !!slots["icon-right"] || isDateType.value || showClearButton.value,
);

const displayValue = computed(() => {
  if (isDateType.value && props.modelValue) {
    const date = new Date(props.modelValue);
    if (!isNaN(date.getTime()))
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  }
  if (
    isCurrency.value &&
    props.modelValue !== "" &&
    props.modelValue !== null
  ) {
    const rawNum = String(props.modelValue).replace(/\D/g, "");
    if (rawNum === "") return "";
    return new Intl.NumberFormat("de-DE").format(Number(rawNum));
  }
  return props.modelValue;
});

const dynamicHint = computed(() => props.error || props.hint || "");

// Mobile placeholder: hide placeholder on mobile outlined when empty to avoid clutter
const mobilePlaceholder = computed(() => {
  // On mobile outlined, we show placeholder only when focused or has value
  // to keep the floating label clean
  return props.placeholder;
});

const onInput = (e) => {
  if (isDateType.value) return;
  let val = e.target.value;
  if (isCurrency.value) val = val.replace(/\D/g, "");
  emit("update:modelValue", val);
  emit("input", e);
};

const clearInput = () => {
  emit("update:modelValue", "");
  emit("input", { target: { value: "" } });
};

const onFocus = (e) => {
  isFocused.value = true;
  emit("focus", e);
  if (isDateType.value) showDatepicker.value = true;
};

const onBlur = (e) => {
  isFocused.value = false;
  setTimeout(() => {
    if (!e.target.parentElement.contains(document.activeElement))
      emit("blur", e);
  }, 150);
};

const onChange = (e) => emit("change", e);
const onDateSelect = (val) => {
  emit("update:modelValue", val);
  showDatepicker.value = false;
};
</script>

<style scoped>
/* ============================================
   BASE STYLES (Desktop & Tablet — unchanged)
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

/* Desktop input */
.desktop-input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 10px 11px;
  font: inherit;
  outline: none;
  color: var(--foreground);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  box-sizing: border-box;
  background: var(--background);
}

.desktop-input::placeholder {
  color: var(--muted);
}

/* Textarea desktop */
.input-stack textarea.desktop-input {
  resize: none;
  min-height: 80px;
  max-height: 200px;
  overflow-y: auto;
}
.input-stack textarea.desktop-input::-webkit-scrollbar {
  width: 6px;
}
.input-stack textarea.desktop-input::-webkit-scrollbar-track {
  background: transparent;
}
.input-stack textarea.desktop-input::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}
.input-stack textarea.desktop-input::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

/* Desktop icons */
.icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--muted);
  pointer-events: none;
  z-index: 1;
}
.icon-left {
  left: 11px;
}
.icon-right {
  right: 11px;
}

/* Desktop currency prefix */
.currency-prefix {
  font-weight: 600;
  color: var(--foreground);
  pointer-events: none;
  width: auto;
}

/* Desktop clear button */
.clear-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  color: var(--muted);
  pointer-events: auto;
  transition: color 0.15s ease;
}
.clear-btn:hover {
  color: #e74c3c;
}

/* Desktop focus */
.desktop-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

/* Desktop error */
.input-stack.has-error .desktop-input {
  border-color: #e74c3c;
}
.input-stack.has-error .desktop-input:focus {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}

/* Desktop disabled */
.input-stack.is-disabled .desktop-input {
  background: var(--background);
  color: var(--muted);
  cursor: not-allowed;
  border-color: var(--border);
}

/* Desktop date */
.input-stack.is-date .desktop-input {
  cursor: pointer;
}
.input-stack.is-date .calendar-icon {
  cursor: pointer;
  pointer-events: auto;
}

/* Desktop icon padding */
.input-stack.has-icon-left .desktop-input {
  padding-left: 36px;
}
.input-stack.has-icon-right .desktop-input {
  padding-right: 36px;
}

/* Desktop search reset */
.desktop-input[type="search"]::-webkit-search-decoration,
.desktop-input[type="search"]::-webkit-search-cancel-button,
.desktop-input[type="search"]::-webkit-search-results-button,
.desktop-input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}
.desktop-input[type="search"] {
  -webkit-appearance: textfield;
  appearance: textfield;
}

/* Desktop number spinners */
.desktop-input[type="number"]::-webkit-inner-spin-button,
.desktop-input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.desktop-input[type="number"] {
  -moz-appearance: textfield;
}

/* Desktop date indicator */
.desktop-input[type="date"]::-webkit-calendar-picker-indicator,
.desktop-input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
}

/* Hint */
.input-stack small {
  color: var(--muted);
  font-size: 11px;
  min-height: 16px;
}
.input-stack.has-error small {
  color: #e74c3c;
}

/* Desktop label disabled */
.input-stack.is-disabled .desktop-label {
  color: var(--muted);
  cursor: not-allowed;
}

/* ============================================
   MOBILE OUTLINED FLOATING LABEL
   Premium SaaS Style — Active below 640px
   ============================================ */

/* Hide desktop elements on mobile */
@media (max-width: 639px) {
  .desktop-label,
  .desktop-input,
  .desktop-icon-left,
  .desktop-icon-right,
  .desktop-calendar,
  .desktop-clear,
  .desktop-currency {
    display: none !important;
  }
}

/* Hide mobile elements on desktop/tablet */
@media (min-width: 640px) {
  .mobile-outlined-wrapper,
  .mobile-floating-label,
  .mobile-icon-left,
  .mobile-icon-right,
  .mobile-currency-prefix {
    display: none !important;
  }
}

/* Mobile wrapper */
.mobile-outlined-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

/* Mobile input field */
.mobile-outlined-wrapper .input-field {
  width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 16px 14px 8px 14px;
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
}

/* Mobile textarea */
.input-stack.is-textarea .mobile-outlined-wrapper .input-field {
  min-height: 100px;
  padding-top: 20px;
  resize: vertical;
  max-height: 240px;
}

/* Mobile placeholder */
.mobile-outlined-wrapper .input-field::placeholder {
  color: transparent;
  transition: color 0.2s ease;
}

/* Show placeholder on focus for mobile */
.input-stack.is-focused .mobile-outlined-wrapper .input-field::placeholder,
.input-stack.has-value .mobile-outlined-wrapper .input-field::placeholder {
  color: var(--muted);
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
.mobile-floating-label:has(+ textarea) {
  top: 22px;
}
.mobile-floating-label:has(+ .mobile-icon-left) {
  left: 35px;
}
.input-stack.is-focused .mobile-floating-label:has(+ .mobile-icon-left),
.input-stack.has-value .mobile-floating-labe:has(+ .mobile-icon-left) {
  left: 20px;
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

/* Error state mobile label */
.input-stack.has-error .mobile-floating-label {
  color: #e74c3c;
}
.input-stack.has-error.is-focused .mobile-floating-label {
  color: #e74c3c;
}

/* Mobile focus state — Premium green border */
.mobile-outlined-wrapper .input-field:focus {
  border-color: var(--primary, #65a30d);
  box-shadow:
    0 0 0 3px rgba(101, 163, 13, 0.12),
    0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

/* Mobile error state */
.input-stack.has-error .mobile-outlined-wrapper .input-field {
  border-color: #e74c3c;
}
.input-stack.has-error .mobile-outlined-wrapper .input-field:focus {
  border-color: #e74c3c;
  box-shadow:
    0 0 0 3px rgba(231, 76, 60, 0.12),
    0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

/* Mobile disabled state */
.input-stack.is-disabled .mobile-outlined-wrapper .input-field {
  background: rgba(248, 248, 248, 0.6);
  color: var(--muted);
  cursor: not-allowed;
  border-color: var(--border);
}
.input-stack.is-disabled .mobile-floating-label {
  color: var(--muted);
  background: transparent;
}

/* Mobile currency prefix */
.mobile-currency-prefix {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  font-size: 15px;
  color: var(--foreground);
  pointer-events: none;
  z-index: 2;
  transition:
    top 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    font-size 0.25s ease;
}

/* Adjust currency prefix when label floats */
.input-stack.is-focused.has-icon-left .mobile-currency-prefix,
.input-stack.has-value.has-icon-left .mobile-currency-prefix {
  top: 26px;
  transform: translateY(0);
  font-size: 15px;
}

/* Mobile icon left */
.mobile-icon-left {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--muted);
  pointer-events: none;
  z-index: 2;
  transition:
    top 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Float icon left when label floats */
.input-stack.is-focused.has-icon-left:not(.has-no-label) .mobile-icon-left,
.input-stack.has-value.has-icon-left:not(.has-no-label) .mobile-icon-left {
  top: 60%;
  transform: translateY(-50%);
}

/* Mobile icon right */
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
}

/* Mobile clear button */
.mobile-icon-right.clear-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  pointer-events: auto;
  transition: all 0.15s ease;
}
.mobile-icon-right.clear-btn:hover {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.08);
}

/* Mobile calendar icon */
.mobile-icon-right.calendar-icon {
  cursor: pointer;
  pointer-events: auto;
  color: var(--muted);
}

/* Mobile padding adjustments with icons */
.input-stack.has-icon-left .mobile-outlined-wrapper .input-field {
  padding-left: 40px;
}
.input-stack.has-icon-right .mobile-outlined-wrapper .input-field {
  padding-right: 40px;
}

/* Mobile date cursor */
.input-stack.is-date .mobile-outlined-wrapper .input-field {
  cursor: pointer;
}

/* Mobile search reset */
.mobile-outlined-wrapper .input-field[type="search"]::-webkit-search-decoration,
.mobile-outlined-wrapper
  .input-field[type="search"]::-webkit-search-cancel-button,
.mobile-outlined-wrapper
  .input-field[type="search"]::-webkit-search-results-button,
.mobile-outlined-wrapper
  .input-field[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

/* Mobile number spinners */
.mobile-outlined-wrapper .input-field[type="number"]::-webkit-inner-spin-button,
.mobile-outlined-wrapper
  .input-field[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.mobile-outlined-wrapper .input-field[type="number"] {
  -moz-appearance: textfield;
}

/* Mobile date indicator hide */
.mobile-outlined-wrapper
  .input-field[type="date"]::-webkit-calendar-picker-indicator,
.mobile-outlined-wrapper
  .input-field[type="datetime-local"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
}

/* ============================================
   SIZE VARIANTS (Desktop)
   ============================================ */
.size-sm .desktop-input {
  padding: 7px 9px;
  font-size: 11px;
  border-radius: 7px;
}
.size-sm.has-icon-left .desktop-input {
  padding-left: 30px;
}
.size-sm.has-icon-right .desktop-input {
  padding-right: 30px;
}
.size-sm .icon {
  width: 14px;
  height: 14px;
}
.size-sm .icon-left {
  left: 9px;
}
.size-sm .icon-right {
  right: 9px;
}

.size-lg .desktop-input {
  padding: 13px 14px;
  font-size: 14px;
  border-radius: 11px;
}
.size-lg.has-icon-left .desktop-input {
  padding-left: 42px;
}
.size-lg.has-icon-right .desktop-input {
  padding-right: 42px;
}
.size-lg .icon {
  width: 18px;
  height: 18px;
}
.size-lg .icon-left {
  left: 14px;
}
.size-lg .icon-right {
  right: 14px;
}

/* ============================================
   SIZE VARIANTS (Mobile)
   ============================================ */
.size-sm .mobile-outlined-wrapper .input-field {
  min-height: 44px;
  padding: 14px 12px 6px 12px;
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
.size-sm .mobile-icon-left,
.size-sm .mobile-currency-prefix {
  left: 12px;
}
.size-sm.has-icon-left .mobile-outlined-wrapper .input-field {
  padding-left: 36px;
}
.size-sm.has-icon-right .mobile-outlined-wrapper .input-field {
  padding-right: 36px;
}
.size-sm .mobile-icon-right {
  right: 10px;
}

.size-lg .mobile-outlined-wrapper .input-field {
  min-height: 60px;
  padding: 20px 16px 10px 16px;
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
.size-lg .mobile-icon-left,
.size-lg .mobile-currency-prefix {
  left: 16px;
}
.size-lg.has-icon-left .mobile-outlined-wrapper .input-field {
  padding-left: 44px;
}
.size-lg.has-icon-right .mobile-outlined-wrapper .input-field {
  padding-right: 44px;
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
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}
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
.input-stack.has-no-label .mobile-outlined-wrapper .input-field::placeholder {
  color: var(--muted);
}

/* Kecilkan padding-top & min-height karena tidak ada floating label */
.input-stack.has-no-label .mobile-outlined-wrapper .input-field {
  padding-top: 12px;
  padding-bottom: 12px;
  min-height: 44px;
}

/* Ukuran sm tanpa label */
.input-stack.has-no-label.size-sm .mobile-outlined-wrapper .input-field {
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 38px;
}

/* Ukuran lg tanpa label */
.input-stack.has-no-label.size-lg .mobile-outlined-wrapper .input-field {
  padding-top: 14px;
  padding-bottom: 14px;
  min-height: 52px;
}

/* Textarea tetap perlu ruang vertikal walau tanpa label */
.input-stack.has-no-label.is-textarea .mobile-outlined-wrapper .input-field {
  padding-top: 14px;
  min-height: 100px;
}
</style>
