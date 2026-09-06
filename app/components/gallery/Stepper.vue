<template>
  <div
    class="stepper"
    :class="[
      direction === 'vertical' ? 'stepper-vertical' : 'stepper-horizontal',
      sizeClass,
    ]"
  >
    <div
      v-for="(step, idx) in stepsWithStatus"
      :key="idx"
      class="stepper-item"
      :class="`stepper-item--${step.status}`"
    >
      <!-- Connector Line -->
      <div
        v-if="idx !== stepsWithStatus.length - 1"
        class="stepper-connector"
        :class="`stepper-connector--${step.status}`"
      />

      <!-- Node / Indicator -->
      <div class="stepper-node-wrapper">
        <div
          class="stepper-node"
          :class="{
            'stepper-node--pulsing': step.status === 'current',
          }"
        >
          <!-- Completed -->
          <Check
            v-if="step.status === 'completed'"
            class="stepper-icon"
            :stroke-width="3"
          />

          <!-- Custom Icon -->
          <component
            :is="step.icon"
            v-else-if="step.icon"
            class="stepper-icon"
          />

          <!-- Default Number -->
          <span v-else class="stepper-number">
            {{ String(idx + 1).padStart(2, "0") }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="stepper-content">
        <h3 class="stepper-title">
          {{ step.title }}
        </h3>

        <p v-if="step.description" class="stepper-description">
          {{ step.description }}
        </p>

        <div v-if="step.meta" class="stepper-meta">
          {{ step.meta }}
        </div>

        <slot :name="`step-${idx}`" :step="step" :index="idx" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Check } from "lucide-vue-next";

const props = defineProps({
  /**
   * Array step.
   *
   * Tidak perlu lagi memberikan `status`.
   *
   * Contoh:
   * [
   *   {
   *     title: "Data Diri",
   *     description: "Lengkapi data diri"
   *   },
   *   {
   *     title: "Pembayaran",
   *     description: "Lakukan pembayaran"
   *   }
   * ]
   */
  steps: {
    type: Array,
    required: true,

    validator: (val) =>
      val.every(
        (step) =>
          typeof step === "object" &&
          step !== null &&
          typeof step.title === "string" &&
          step.title.length > 0,
      ),
  },

  /**
   * Direction:
   * vertical | horizontal
   */
  direction: {
    type: String,
    default: "vertical",

    validator: (value) => ["vertical", "horizontal"].includes(value),
  },

  /**
   * Size:
   * sm | md | lg
   */
  size: {
    type: String,
    default: "md",

    validator: (value) => ["sm", "md", "lg"].includes(value),
  },

  /**
   * Index step yang sedang aktif.
   *
   * 0 = step pertama
   * 1 = step kedua
   * dst.
   *
   * null = semua step neutral
   */
  currentStep: {
    type: Number,
    default: null,

    validator: (value) => value === null || Number.isInteger(value),
  },
});

/**
 * Generate status berdasarkan currentStep.
 *
 * currentStep = null
 * → semua neutral
 *
 * currentStep = 0
 * → current, upcoming, upcoming
 *
 * currentStep = 1
 * → completed, current, upcoming
 *
 * currentStep = 2
 * → completed, completed, current
 */
const stepsWithStatus = computed(() => {
  return props.steps.map((step, idx) => {
    let status = "neutral";

    if (props.currentStep !== null) {
      if (idx < props.currentStep) {
        status = "completed";
      } else if (idx === props.currentStep) {
        status = "current";
      } else {
        status = "upcoming";
      }
    }

    return {
      ...step,
      status,
    };
  });
});

const sizeClass = computed(() => {
  return `stepper--${props.size}`;
});
</script>

<style scoped>
/* ============================================
   STEPPER — Premium SaaS Component
   ============================================ */

.stepper {
  display: flex;
  width: 100%;
}

/* ---------- Direction: Vertical ---------- */

.stepper-vertical {
  flex-direction: column;
}

.stepper-vertical .stepper-item {
  display: flex;
  align-items: flex-start;
  position: relative;
  padding-bottom: 1.5rem;
}

.stepper-vertical .stepper-item:last-child {
  padding-bottom: 0;
}

/* ---------- Connector — Vertical ---------- */

.stepper-vertical .stepper-connector {
  position: absolute;
  left: 1.25rem;
  top: 2.5rem;
  bottom: 0;
  width: 2px;
  border-radius: 1px;
  transition: all 0.4s ease;
}

/* ---------- Direction: Horizontal ---------- */

.stepper-horizontal {
  flex-direction: row;
}

.stepper-horizontal .stepper-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding-right: 0.5rem;
}

.stepper-horizontal .stepper-item:last-child {
  padding-right: 0;
}

/* ---------- Connector — Horizontal ---------- */

.stepper-horizontal .stepper-connector {
  position: absolute;
  left: calc(50% + 1.25rem);
  right: calc(-50% + 1.25rem);
  top: 1.25rem;
  height: 2px;
  border-radius: 1px;
  transition: all 0.4s ease;
}

/* ---------- Connector Status ---------- */

.stepper-connector--completed {
  background-color: var(--success);
}

.stepper-connector--current {
  background: repeating-linear-gradient(
    90deg,
    var(--border),
    var(--border) 6px,
    transparent 6px,
    transparent 12px
  );
}

.stepper-connector--upcoming,
.stepper-connector--neutral {
  background-color: var(--border);
}

/* ---------- Vertical Current Connector ---------- */

.stepper-vertical .stepper-connector--current {
  background: repeating-linear-gradient(
    180deg,
    var(--border),
    var(--border) 6px,
    transparent 6px,
    transparent 12px
  );
}

/* ---------- Node Wrapper ---------- */

.stepper-node-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.stepper-vertical .stepper-node-wrapper {
  margin-right: 1rem;
}

.stepper-horizontal .stepper-node-wrapper {
  margin-bottom: 0.75rem;
}

/* ---------- Node ---------- */

.stepper-node {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

/* ---------- Completed ---------- */

.stepper-item--completed .stepper-node {
  background-color: var(--success);
  color: white;
  border-color: var(--success);
  box-shadow: 0 0 0 4px var(--success-soft);
}

/* ---------- Current ---------- */

.stepper-item--current .stepper-node {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
}

/* ---------- Upcoming ---------- */

.stepper-item--upcoming .stepper-node {
  background-color: var(--surface);
  color: var(--muted);
  border-color: var(--border);
}

/* ---------- Neutral ---------- */

.stepper-item--neutral .stepper-node {
  background-color: var(--surface);
  color: var(--foreground);
  border-color: var(--border);
}

/* ---------- Pulse ---------- */

.stepper-node--pulsing {
  animation: stepper-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes stepper-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0px var(--primary-soft);
  }

  50% {
    box-shadow: 0 0 0 8px transparent;
  }
}

/* ---------- Icon / Number ---------- */

.stepper-icon {
  width: 1rem;
  height: 1rem;
}

.stepper-number {
  font-size: 0.75rem;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

/* ---------- Content ---------- */

.stepper-content {
  flex: 1;
  min-width: 0;
}

.stepper-horizontal .stepper-content {
  padding: 0 0.5rem;
}

.stepper-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--foreground);
  line-height: 1.4;
  transition: color 0.2s ease;
}

.stepper-item--current .stepper-title {
  color: var(--primary);
}

.stepper-item--upcoming .stepper-title {
  color: var(--muted);
}

.stepper-item--neutral .stepper-title {
  color: var(--foreground);
}

.stepper-description {
  font-size: 0.75rem;
  color: var(--secondary);
  margin-top: 0.25rem;
  line-height: 1.5;
}

.stepper-item--upcoming .stepper-description {
  color: var(--muted);
  opacity: 0.7;
}

.stepper-item--neutral .stepper-description {
  color: var(--secondary);
  opacity: 1;
}

.stepper-meta {
  font-size: 0.6875rem;
  color: var(--muted);
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--surface-soft);
  border-radius: 0.375rem;
  display: inline-block;
}

/* ============================================
   SIZE VARIANTS
   ============================================ */

/* ---------- Small ---------- */

.stepper--sm .stepper-node {
  width: 1.75rem;
  height: 1.75rem;
}

.stepper--sm.stepper-vertical .stepper-connector {
  left: 0.875rem;
  top: 1.75rem;
}

.stepper--sm.stepper-horizontal .stepper-connector {
  top: 0.875rem;
}

.stepper--sm .stepper-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.stepper--sm .stepper-number {
  font-size: 0.6875rem;
}

.stepper--sm.stepper-vertical .stepper-item {
  padding-bottom: 1rem;
}

.stepper--sm .stepper-title {
  font-size: var(--text-sm);
}

/* ---------- Medium ---------- */

.stepper--md .stepper-node {
  width: 2.5rem;
  height: 2.5rem;
}

.stepper--md.stepper-vertical .stepper-connector {
  left: 1.25rem;
  top: 2.5rem;
}

.stepper--md.stepper-horizontal .stepper-connector {
  top: 1.25rem;
}

.stepper--md .stepper-icon {
  width: 1rem;
  height: 1rem;
}

.stepper--md .stepper-number {
  font-size: 0.75rem;
}

.stepper--md.stepper-vertical .stepper-item {
  padding-bottom: 1.5rem;
}

/* ---------- Large ---------- */

.stepper--lg .stepper-node {
  width: 3rem;
  height: 3rem;
}

.stepper--lg.stepper-vertical .stepper-connector {
  left: 1.5rem;
  top: 3rem;
}

.stepper--lg.stepper-horizontal .stepper-connector {
  top: 1.5rem;
}

.stepper--lg .stepper-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.stepper--lg .stepper-number {
  font-size: 0.875rem;
}

.stepper--lg.stepper-vertical .stepper-item {
  padding-bottom: 2rem;
}

.stepper--lg .stepper-title {
  font-size: var(--text-lg);
}

.stepper--lg .stepper-description {
  font-size: 0.8125rem;
}

/* ---------- Interaction ---------- */

.stepper-item {
  transition: opacity 0.2s ease;
}

.stepper-item--upcoming {
  opacity: 0.85;
}

.stepper-item--upcoming:hover {
  opacity: 1;
}

/* ---------- Responsive ---------- */

@media (max-width: 640px) {
  .stepper-horizontal {
    flex-direction: column;
  }

  .stepper-horizontal .stepper-item {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    padding-right: 0;
    padding-bottom: 1.5rem;
  }

  .stepper-horizontal .stepper-item:last-child {
    padding-bottom: 0;
  }

  .stepper-horizontal .stepper-connector {
    left: 1.25rem;
    top: 2.5rem;
    bottom: 0;
    right: auto;
    width: 2px;
    height: auto;
  }

  .stepper-horizontal .stepper-node-wrapper {
    margin-right: 1rem;
    margin-bottom: 0;
  }

  .stepper-horizontal .stepper-content {
    padding: 0;
  }
}
</style>
