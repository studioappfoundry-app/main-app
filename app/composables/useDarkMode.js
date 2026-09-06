import { ref, watch, onMounted } from "vue";

const isDark = ref(false);

export function useDarkMode() {
  const applyDarkMode = (val) => {
    document.body.classList.toggle("dark", val);
  };

  onMounted(() => {
    const saved = localStorage.getItem("theme") === "true";

    isDark.value = saved;
    applyDarkMode(saved);
  });

  watch(isDark, (val) => {
    applyDarkMode(val);
    localStorage.setItem("theme", val);
  });

  return {
    isDark,
  };
}
