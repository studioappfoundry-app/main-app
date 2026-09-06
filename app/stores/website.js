import { defineStore } from "pinia";
import { websitesCache } from "../utils/seed";
import { useAccessData } from "../composables/useAccessData";

export const useWebsiteStore = defineStore("website", {
  state: () => ({
    items: [],
    loading: false,
    loaded: false,
    error: null,

    // Metadata cache / sinkronisasi
    version: 0,
    updatedAt: null,
  }),

  getters: {
    data: (state) => state.items,

    total: (state) => state.items.length,

    isEmpty: (state) => state.items.length === 0,

    isReady: (state) => state.loaded && !state.loading,

    hasError: (state) => !!state.error,

    byId: (state) => {
      return (id) => state.items.find((item) => item.id === id);
    },
  },
  actions: {
    async init(force = false) {
      if (this.loaded && !force) return;

      this.loading = true;
      this.error = null;

      try {
        // const result = await projectService.getAll();
        const { getScopedData } = useAccessData();
        const result = getScopedData(websitesCache);
        this.hydrate(result);
      } catch (err) {
        this.error = err?.message || "Gagal memuat data project";

        console.error("[ProjectStore] Failed to initialize:", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Terapkan payload dari cache / sync.
     */
    hydrate(payload = {}) {
      this.items = Array.isArray(payload.data) ? payload.data : [];
      this.version = payload.version ?? 0;
      this.updatedAt = payload.time_updated ?? null;
      this.loaded = true;
    },

    /**
     * Reload data.
     */
    async refresh() {
      await this.init(true);
    },

    /**
     * Reset seluruh state.
     */
    reset() {
      this.items = [];
      this.loading = false;
      this.loaded = false;
      this.error = null;

      this.version = 0;
      this.updatedAt = null;
    },
  },
});
