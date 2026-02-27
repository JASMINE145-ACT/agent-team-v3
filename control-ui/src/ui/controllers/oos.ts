import type {
  OosStats,
  OosRecord,
  OosByFileRow,
  OosByTimeRow,
  ShortageStats,
  ShortageRecord,
  ShortageByFileRow,
  ShortageByTimeRow,
} from "../types.ts";

export type OosState = {
  basePath: string;
  oosLoading: boolean;
  oosError: string | null;
  oosStats: OosStats | null;
  oosList: OosRecord[];
  oosByFile: OosByFileRow[];
  oosByTime: OosByTimeRow[];
};

export type ShortageState = {
  basePath: string;
  shortageLoading: boolean;
  shortageError: string | null;
  shortageStats: ShortageStats | null;
  shortageList: ShortageRecord[];
  shortageByFile: ShortageByFileRow[];
  shortageByTime: ShortageByTimeRow[];
};

/** 手动新增缺货记录（需求、供给；差异由后端自动计算） */
export type ShortageAddRecord = {
  product_name: string;
  specification?: string;
  quantity?: number;
  available_qty?: number;
};

/** Overview 页用：仅拉取无货统计，避免加载完整列表 */
export type OosStatsOverviewState = {
  basePath: string;
  overviewOosStats: OosStats | null;
  overviewOosError: string | null;
};

/** Overview 页用：仅拉取缺货统计，避免加载完整列表 */
export type ShortageStatsOverviewState = {
  basePath: string;
  overviewShortageStats: ShortageStats | null;
  overviewShortageError: string | null;
};

function apiUrl(basePath: string, path: string, params?: Record<string, string | number>): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  const base = prefix ? `${prefix}${path}` : path;
  if (!params || Object.keys(params).length === 0) {
    return base;
  }
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    search.set(k, String(v));
  }
  return `${base}?${search.toString()}`;
}

export async function loadOos(state: OosState, options?: { limit?: number; days?: number }) {
  const limit = options?.limit ?? 100;
  const days = options?.days ?? 30;
  state.oosLoading = true;
  state.oosError = null;
  try {
    const [statsRes, listRes, byFileRes, byTimeRes] = await Promise.all([
      fetch(apiUrl(state.basePath, "/api/oos/stats")),
      fetch(apiUrl(state.basePath, "/api/oos/list", { limit })),
      fetch(apiUrl(state.basePath, "/api/oos/by-file", { limit: 50 })),
      fetch(apiUrl(state.basePath, "/api/oos/by-time", { days })),
    ]);

    const statsJson = await statsRes.json().catch(() => ({}));
    const listJson = await listRes.json().catch(() => ({}));
    const byFileJson = await byFileRes.json().catch(() => ({}));
    const byTimeJson = await byTimeRes.json().catch(() => ({}));

    if (statsJson.success && statsJson.data) {
      state.oosStats = statsJson.data as OosStats;
    } else {
      state.oosStats = null;
      if (!statsRes.ok) {
        state.oosError = statsJson.detail ?? `stats: ${statsRes.status}`;
      }
    }
    if (listJson.success && Array.isArray(listJson.data)) {
      state.oosList = listJson.data as OosRecord[];
    } else {
      state.oosList = [];
      if (!state.oosError && !listRes.ok) {
        state.oosError = listJson.detail ?? `list: ${listRes.status}`;
      }
    }
    if (byFileJson.success && Array.isArray(byFileJson.data)) {
      state.oosByFile = byFileJson.data as OosByFileRow[];
    } else {
      state.oosByFile = [];
    }
    if (byTimeJson.success && Array.isArray(byTimeJson.data)) {
      state.oosByTime = byTimeJson.data as OosByTimeRow[];
    } else {
      state.oosByTime = [];
    }
  } catch (err) {
    state.oosError = err instanceof Error ? err.message : String(err);
    state.oosStats = null;
    state.oosList = [];
    state.oosByFile = [];
    state.oosByTime = [];
  } finally {
    state.oosLoading = false;
  }
}

export async function deleteOosItem(state: OosState, productKey: string): Promise<boolean> {
  if (!productKey?.trim()) return false;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/oos/delete"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_key: productKey.trim() }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) {
      await loadOos(state);
      return true;
    }
    state.oosError = json.detail ?? `删除失败: ${res.status}`;
    return false;
  } catch (err) {
    state.oosError = err instanceof Error ? err.message : String(err);
    return false;
  }
}

export type OosAddRecord = {
  product_name: string;
  specification?: string;
  quantity?: number;
  unit?: string;
};

export async function addOosItem(state: OosState, record: OosAddRecord): Promise<boolean> {
  const product_name = (record.product_name || "").trim();
  if (!product_name) return false;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/oos/add"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name,
        specification: (record.specification ?? "").trim(),
        quantity: record.quantity ?? 0,
        unit: (record.unit ?? "").trim(),
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) {
      await loadOos(state);
      return true;
    }
    state.oosError = json.detail ?? `添加失败: ${res.status}`;
    return false;
  } catch (err) {
    state.oosError = err instanceof Error ? err.message : String(err);
    return false;
  }
}

/** Overview：只拉无货统计，避免加载完整列表 */
export async function loadOosStatsForOverview(state: OosStatsOverviewState): Promise<void> {
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/oos/stats"));
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success && json.data) {
      state.overviewOosStats = json.data as OosStats;
      state.overviewOosError = null;
    } else {
      state.overviewOosStats = null;
      const msg =
        typeof json.detail === "string" ? json.detail : json.message ?? json.error ?? `oos stats: ${res.status}`;
      state.overviewOosError = msg;
    }
  } catch (err) {
    state.overviewOosStats = null;
    state.overviewOosError = err instanceof Error ? err.message : String(err);
  }
}

// ---------- 缺货记录（与无货同一逻辑） ----------

export async function loadShortage(state: ShortageState, options?: { limit?: number; days?: number }) {
  const limit = options?.limit ?? 100;
  const days = options?.days ?? 30;
  state.shortageLoading = true;
  state.shortageError = null;
  try {
    const [statsRes, listRes, byFileRes, byTimeRes] = await Promise.all([
      fetch(apiUrl(state.basePath, "/api/shortage/stats"), { method: "GET" }),
      fetch(apiUrl(state.basePath, "/api/shortage/list", { limit }), { method: "GET" }),
      fetch(apiUrl(state.basePath, "/api/shortage/by-file"), { method: "GET" }),
      fetch(apiUrl(state.basePath, "/api/shortage/by-time", { days }), { method: "GET" }),
    ] as const);
    const statsJson = await statsRes.json().catch(() => ({}));
    const listJson = await listRes.json().catch(() => ({}));
    const byFileJson = await byFileRes.json().catch(() => ({}));
    const byTimeJson = await byTimeRes.json().catch(() => ({}));
    if (statsJson.success && statsJson.data) {
      state.shortageStats = statsJson.data as ShortageStats;
    } else {
      state.shortageStats = null;
      if (!state.shortageError && !statsRes.ok) {
        const msg = typeof statsJson.detail === "string" ? statsJson.detail : statsJson.message ?? statsJson.error;
        state.shortageError = msg ?? `stats: ${statsRes.status} ${statsRes.statusText}`;
      }
    }
    if (listJson.success && Array.isArray(listJson.data)) {
      state.shortageList = listJson.data as ShortageRecord[];
    } else {
      state.shortageList = [];
      if (!state.shortageError && !listRes.ok) {
        const msg = typeof listJson.detail === "string" ? listJson.detail : listJson.message ?? listJson.error;
        state.shortageError = msg ?? `list: ${listRes.status} ${listRes.statusText}`;
      }
    }
    if (byFileJson.success && Array.isArray(byFileJson.data)) {
      state.shortageByFile = byFileJson.data as ShortageByFileRow[];
    } else {
      state.shortageByFile = [];
      if (!state.shortageError && !byFileRes.ok) {
        const msg = typeof byFileJson.detail === "string" ? byFileJson.detail : byFileJson.message ?? byFileJson.error;
        state.shortageError = msg ?? `by-file: ${byFileRes.status} ${byFileRes.statusText}`;
      }
    }
    if (byTimeJson.success && Array.isArray(byTimeJson.data)) {
      state.shortageByTime = byTimeJson.data as ShortageByTimeRow[];
    } else {
      state.shortageByTime = [];
      if (!state.shortageError && !byTimeRes.ok) {
        const msg = typeof byTimeJson.detail === "string" ? byTimeJson.detail : byTimeJson.message ?? byTimeJson.error;
        state.shortageError = msg ?? `by-time: ${byTimeRes.status} ${byTimeRes.statusText}`;
      }
    }
  } catch (err) {
    state.shortageError = err instanceof Error ? err.message : String(err);
    state.shortageStats = null;
    state.shortageList = [];
    state.shortageByFile = [];
    state.shortageByTime = [];
  } finally {
    state.shortageLoading = false;
  }
}

export async function deleteShortageItem(state: ShortageState, productKey: string): Promise<boolean> {
  if (!productKey?.trim()) return false;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/shortage/delete"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_key: productKey.trim() }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) {
      await loadShortage(state);
      return true;
    }
    state.shortageError = json.detail ?? `删除失败: ${res.status}`;
    return false;
  } catch (err) {
    state.shortageError = err instanceof Error ? err.message : String(err);
    return false;
  }
}

export async function addShortageItem(state: ShortageState, record: ShortageAddRecord): Promise<boolean> {
  const product_name = (record.product_name || "").trim();
  if (!product_name) return false;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/shortage/add"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name,
        specification: (record.specification ?? "").trim(),
        quantity: record.quantity ?? 0,
        available_qty: record.available_qty ?? 0,
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) {
      await loadShortage(state);
      return true;
    }
    state.shortageError = json.detail ?? `添加失败: ${res.status}`;
    return false;
  } catch (err) {
    state.shortageError = err instanceof Error ? err.message : String(err);
    return false;
  }
}

/** Overview：只拉缺货统计，避免加载完整列表 */
export async function loadShortageStatsForOverview(
  state: ShortageStatsOverviewState,
): Promise<void> {
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/shortage/stats"), { method: "GET" });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success && json.data) {
      state.overviewShortageStats = json.data as ShortageStats;
      state.overviewShortageError = null;
    } else {
      state.overviewShortageStats = null;
      const msg =
        typeof json.detail === "string" ? json.detail : json.message ?? json.error ?? `shortage stats: ${res.status}`;
      state.overviewShortageError = msg;
    }
  } catch (err) {
    state.overviewShortageStats = null;
    state.overviewShortageError = err instanceof Error ? err.message : String(err);
  }
}
