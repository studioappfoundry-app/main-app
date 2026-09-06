// utils/profileHelper.js

/**
 * Cari item berdasarkan foreign key
 */
export function findByForeignKey(items = [], field, value) {
  if (!value) return null;

  return items.find((item) => item?.[field] === value) ?? null;
}

/**
 * Cari semua item berdasarkan foreign key
 */
export function findAllByForeignKey(items = [], field, value) {
  if (!value) return [];

  return items.filter((item) => item?.[field] === value);
}

/**
 * Pilih project yang paling relevan.
 *
 * Prioritas:
 * 1. projectId eksplisit
 * 2. project yang masih aktif
 * 3. project terbaru
 */
export function selectProfileProject(
  projects = [],
  { projectId = null, businessId = null } = {},
) {
  let candidates = projects;

  /**
   * Filter business
   */
  if (businessId) {
    candidates = candidates.filter(
      (project) => project?.business_id === businessId,
    );
  }

  /**
   * Project eksplisit
   */
  if (projectId) {
    return candidates.find((project) => project?.id === projectId) ?? null;
  }

  if (!candidates.length) {
    return null;
  }

  /**
   * Prioritaskan project yang sedang aktif
   */
  const activeStatuses = [
    "live",
    "in_progress",
    "revision",
    "testing",
    "confirmed",
  ];

  const activeProject = candidates.find((project) =>
    activeStatuses.includes(project?.status),
  );

  if (activeProject) {
    return activeProject;
  }

  /**
   * Fallback project terbaru
   */
  return (
    [...candidates].sort((a, b) => {
      const aTime = a?.created_at ? new Date(a.created_at).getTime() : 0;

      const bTime = b?.created_at ? new Date(b.created_at).getTime() : 0;

      return bTime - aTime;
    })[0] ?? null
  );
}

/**
 * Ambil website berdasarkan project
 */
export function selectProfileWebsite(websites = [], projectId = null) {
  if (!projectId) {
    return null;
  }

  const projectWebsites = findAllByForeignKey(
    websites,
    "project_id",
    projectId,
  );

  if (!projectWebsites.length) {
    return null;
  }

  /**
   * Prioritaskan website live
   */
  return (
    projectWebsites.find((website) => website?.status === "live") ??
    projectWebsites[0]
  );
}
