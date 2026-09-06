export function useParsedData({
  stores = [],
  parser,
  deps = [],
  defaultValue = null,
  immediate = true,
}) {
  const data = ref(defaultValue);

  const parsing = ref(false);

  const error = ref(null);

  let requestId = 0;

  const storesLoading = computed(() => {
    return stores.some((store) => store.loading);
  });

  const storesNotLoaded = computed(() => {
    return stores.some((store) => !store.loaded);
  });

  const sourceError = computed(() => {
    const store = stores.find((store) => store.error);

    return store?.error || null;
  });

  const ready = computed(() => {
    return !storesLoading.value && !storesNotLoaded.value;
  });

  const loading = computed(() => {
    return storesLoading.value || storesNotLoaded.value || parsing.value;
  });

  const hasError = computed(() => {
    return !!sourceError.value || !!error.value;
  });
  async function refresh() {
    if (!ready.value) {
      return;
    }

    const currentRequestId = ++requestId;

    parsing.value = true;
    error.value = null;

    try {
      await nextTick();

      await new Promise((resolve) => {
        requestAnimationFrame(resolve);
      });

      const result = await parser();

      if (currentRequestId !== requestId) {
        return;
      }

      data.value = result;

      await nextTick();
    } catch (err) {
      if (currentRequestId !== requestId) {
        return;
      }

      error.value = err;

      console.error("[useParsedData] Failed to parse data:", err);
    } finally {
      if (currentRequestId === requestId) {
        parsing.value = false;
      }
    }
  }

  const storeDependencies = computed(() => {
    return stores.map((store) => [store.loaded, store.loading, store.version]);
  });

  const dependencies = [storeDependencies, ...deps];

  watch(
    dependencies,
    () => {
      if (!ready.value) {
        return;
      }

      refresh();
    },
    {
      immediate,
    },
  );
  return {
    data,
    loading,
    ready,
    hasError,
    parsing,
    storesLoading,
    storesNotLoaded,
    error,
    sourceError,
    refresh,
  };
}
