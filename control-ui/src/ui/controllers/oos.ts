import type {
  OosStats,
  OosRecord,
  OosByFileRow,
  OosByTimeRow,
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
