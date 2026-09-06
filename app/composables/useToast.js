import { ref } from "vue";

// State global di luar komponen agar shared di seluruh app
const toasts = ref([]);
let toastId = 0;

export function useToast() {
  const addToast = ({
    title,
    message = "",
    variant = "success",
    duration = 3000,
  }) => {
    const id = toastId++;

    // MAX 5 TOASTS: Jika sudah ada 5, buang toast yang paling lama (index 0)
    if (toasts.value.length >= 5) {
      toasts.value.shift();
    }

    // Tambahkan toast baru ke array (akan muncul di paling bawah)
    toasts.value.push({
      id,
      title,
      message,
      variant,
      duration,
    });

    // Auto hide
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    // Cari index toast yang mau dihapus, lalu splice
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
}
