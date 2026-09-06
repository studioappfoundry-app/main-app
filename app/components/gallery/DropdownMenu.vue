<template>
  <!-- Trigger tetap di posisi asal -->
  <div class="menu-wrap">
    <div ref="triggerRef" class="menu-trigger" @click="toggle">
      <slot name="trigger">
        <button type="button">
          {{ label }}
        </button>
      </slot>
    </div>
  </div>

  <!-- Menu benar-benar dipindahkan ke body -->
  <Teleport to="body">
    <Transition name="menu-slide">
      <div
        v-if="open"
        ref="menuContainer"
        class="floating-menu-container"
        :style="containerStyle"
      >
        <!-- Click outside -->
        <div class="menu-backdrop" @click="close" />

        <div
          class="floating-menu shadow-lg"
          :style="menuStyle"
          @click="onItemClick"
        >
          <slot name="items" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, nextTick, onBeforeUnmount } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Menu",
  },

  menuWidth: {
    type: String,
    default: "220px",
  },

  menuMaxHeight: {
    type: String,
    default: "auto",
  },

  bgCard: {
    type: String,
    default: "var(--background)",
  },

  topMenu: {
    type: Number,
    default: 0,
  },
});

const open = ref(false);

const triggerRef = ref(null);
const menuContainer = ref(null);

const position = ref({
  top: 0,
  left: 0,
});

const calculatedMaxHeight = ref(props.menuMaxHeight);

const containerStyle = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
}));

const menuStyle = computed(() => ({
  width: props.menuWidth,
  maxWidth: "calc(100vw - 16px)",
  maxHeight: calculatedMaxHeight.value,
  background: props.bgCard,
}));

const toggle = async () => {
  open.value = !open.value;

  if (!open.value) {
    removeListeners();
    return;
  }

  await nextTick();

  // Hitung setelah Teleport dirender
  requestAnimationFrame(() => {
    calculatePosition();
  });

  addListeners();
};

const close = () => {
  open.value = false;
  removeListeners();
};

const calculatePosition = () => {
  if (!triggerRef.value || !menuContainer.value) {
    return;
  }

  const triggerRect = triggerRef.value.getBoundingClientRect();

  const menuRect = menuContainer.value.getBoundingClientRect();

  const viewportWidth = window.innerWidth;

  const viewportHeight = window.innerHeight;

  const gap = 8;
  const offset = 8;

  let left = triggerRect.left;

  let top = triggerRect.bottom + offset + props.topMenu;

  // Keluar sebelah kanan
  if (left + menuRect.width > viewportWidth - gap) {
    left = viewportWidth - menuRect.width - gap;
  }

  // Keluar sebelah kiri
  if (left < gap) {
    left = gap;
  }

  const spaceBelow = viewportHeight - triggerRect.bottom - gap - offset;

  const spaceAbove = triggerRect.top - gap - offset;

  const menuHeight = menuRect.height;

  // Reset terlebih dahulu
  calculatedMaxHeight.value = props.menuMaxHeight;

  // Tidak cukup ruang di bawah
  if (menuHeight > spaceBelow) {
    // Atas lebih lega
    if (spaceAbove > spaceBelow) {
      const availableHeight = Math.max(100, spaceAbove);

      calculatedMaxHeight.value = `${availableHeight}px`;

      top =
        triggerRect.top -
        Math.min(menuHeight, availableHeight) -
        offset -
        props.topMenu;
    } else {
      // Tetap buka bawah
      calculatedMaxHeight.value = `${Math.max(100, spaceBelow)}px`;
    }
  }

  position.value = {
    top,
    left,
  };
};
const onItemClick = (event) => {
  const clicked = event.target.closest(
    "button, a, [role='menuitem'], [data-menu-item]",
  );

  if (clicked) {
    close();
  }
};
const addListeners = () => {
  window.addEventListener("resize", calculatePosition);
  window.addEventListener("scroll", calculatePosition, true);
};

const removeListeners = () => {
  window.removeEventListener("resize", calculatePosition);
  window.removeEventListener("scroll", calculatePosition, true);
};

onBeforeUnmount(() => {
  removeListeners();
});
</script>

<style scoped>
.menu-wrap {
  display: inline-flex;
}

/* Trigger */
.menu-trigger {
  display: inline-flex;
  cursor: pointer;
}

.floating-menu-container {
  position: fixed;
  z-index: 9999;

  display: inline-block;
}

/* Click outside layer */
.menu-backdrop {
  position: fixed;
  inset: 0;

  z-index: -1;
}

/* Actual menu */
.floating-menu {
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  border: 1px solid var(--border);
  border-radius: 10px;

  box-sizing: border-box;
}

/* Scrollbar */
.floating-menu::-webkit-scrollbar {
  width: 6px;
}

.floating-menu::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 999px;
}

/* Animation */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
