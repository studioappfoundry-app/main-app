import { defineStore } from "pinia";
import { usersCache } from "../utils/seed";
import { useRoute } from "#app";

const itemsData = (route) => {
  const isAdmin = route.path.startsWith("/admin");

  const user = isAdmin
    ? usersCache.data.find((user) => user.role === "admin")
    : usersCache.data.find((user) => user.role === "client");

  return {
    data: {
      id: user?.id ?? null,
      role: user?.role ?? null,
    },
    version: usersCache.version,
    updatedAt: usersCache.time_updated,
  };
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    items: {},
    loading: false,
    loaded: false,
    error: null,

    version: 0,
    updatedAt: null,
  }),

  getters: {
    data: (state) => state.items,

    isLoggedIn: (state) => !!state.items?.id,

    role: (state) => state.items?.role ?? null,

    isAdmin: (state) => state.items?.role === "admin",

    isClient: (state) => state.items?.role === "client",

    isReady: (state) => state.loaded && !state.loading,

    hasError: (state) => !!state.error,
  },

  actions: {
    async restore(route, force = false) {
      const expectedRole = route.path.startsWith("/admin") ? "admin" : "client";

      if (this.loaded && !force && this.items?.role === expectedRole) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        this.hydrate(itemsData(route));
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    hydrate(payload = {}) {
      this.items = payload?.data ?? {};
      this.version = payload?.version ?? 0;
      this.updatedAt = payload?.updatedAt ?? null;
      this.loaded = true;
    },

    async refresh() {
      await this.restore(true);
    },

    reset() {
      this.items = {};
      this.loading = false;
      this.loaded = false;
      this.error = null;

      this.version = 0;
      this.updatedAt = null;
    },
  },
});
