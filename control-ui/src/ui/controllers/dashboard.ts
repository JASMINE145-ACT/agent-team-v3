import type { OosByTimeRow, QuotationDraftStats, ShortageByTimeRow } from "../types.ts";

export type DashboardState = {
  basePath: string;
  dashboardLoading: boolean;
  dashboardError: string | null;
  quotationStats: QuotationDraftStats | null;
  dashboardOosByTime: OosByTimeRow[];
  dashboardShortageByTime: ShortageByTimeRow[];
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

export async function fetchDashboard(state: DashboardState): Promise<void> {
  state.dashboardLoading = true;
  state.dashboardError = null;
  try {
    const [quotationRes, oosByTimeRes, shortageByTimeRes] = await Promise.allSettled([
      fetch(apiUrl(state.basePath, "/api/quotation-drafts/stats", { days: 7 })),
      fetch(apiUrl(state.basePath, "/api/oos/by-time", { days: 7 })),
      fetch(apiUrl(state.basePath, "/api/shortage/by-time", { days: 7 })),
    ]);
    const errors: string[] = [];

    if (quotationRes.status === "fulfilled") {
      const quotationJson = await quotationRes.value.json().catch(() => ({}));
      if (quotationJson.success && quotationJson.data) {
        state.quotationStats = quotationJson.data as QuotationDraftStats;
      } else {
        state.quotationStats = null;
        errors.push(quotationJson.detail ?? `quotation/stats: ${quotationRes.value.status}`);
      }
    } else {
      state.quotationStats = null;
      errors.push(`quotation/stats: ${String(quotationRes.reason)}`);
    }

    if (oosByTimeRes.status === "fulfilled") {
      const oosByTimeJson = await oosByTimeRes.value.json().catch(() => ({}));
      state.dashboardOosByTime =
        oosByTimeJson.success && Array.isArray(oosByTimeJson.data)
          ? (oosByTimeJson.data as OosByTimeRow[])
          : [];
      if (!oosByTimeJson.success) {
        errors.push(oosByTimeJson.detail ?? `oos/by-time: ${oosByTimeRes.value.status}`);
      }
    } else {
      state.dashboardOosByTime = [];
      errors.push(`oos/by-time: ${String(oosByTimeRes.reason)}`);
    }

    if (shortageByTimeRes.status === "fulfilled") {
      const shortageByTimeJson = await shortageByTimeRes.value.json().catch(() => ({}));
      state.dashboardShortageByTime =
        shortageByTimeJson.success && Array.isArray(shortageByTimeJson.data)
          ? (shortageByTimeJson.data as ShortageByTimeRow[])
          : [];
      if (!shortageByTimeJson.success) {
        errors.push(shortageByTimeJson.detail ?? `shortage/by-time: ${shortageByTimeRes.value.status}`);
      }
    } else {
      state.dashboardShortageByTime = [];
      errors.push(`shortage/by-time: ${String(shortageByTimeRes.reason)}`);
    }

    state.dashboardError = errors.length > 0 ? errors.join(" | ") : null;
  } catch (err) {
    state.dashboardError = err instanceof Error ? err.message : String(err);
    state.quotationStats = null;
    state.dashboardOosByTime = [];
    state.dashboardShortageByTime = [];
  } finally {
    state.dashboardLoading = false;
  }
}
