import type { ShortageRecord } from "../types.ts";

export type ProcurementState = {
  basePath: string;
  procurementLoading: boolean;
  procurementError: string | null;
  procurementSuggestions: ShortageRecord[];
  procurementApproveBusy: boolean;
  procurementApproveResult: { approved_count?: number; message?: string } | null;
};

function apiUrl(basePath: string, path: string, params?: Record<string, string>): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  const base = prefix ? `${prefix}${path}` : path;
  if (!params || Object.keys(params).length === 0) {
    return base;
  }
  const search = new URLSearchParams(params);
  return `${base}?${search.toString()}`;
}

export async function loadProcurementSuggestions(state: ProcurementState): Promise<void> {
  state.procurementLoading = true;
  state.procurementError = null;
  try {
    const url = apiUrl(state.basePath, "/api/shortage/list", { limit: "100" });
    const res = await fetch(url);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      state.procurementError = json.detail ?? `HTTP ${res.status}`;
      state.procurementSuggestions = [];
      return;
    }
    state.procurementSuggestions = (json.data ?? []) as ShortageRecord[];
  } catch (e) {
    state.procurementError = e instanceof Error ? e.message : String(e);
    state.procurementSuggestions = [];
  } finally {
    state.procurementLoading = false;
  }
}

export async function approveProcurement(
  state: ProcurementState,
  items: Array<{ product_key?: string; product_name?: string; specification?: string; shortfall?: number; code?: string }>,
): Promise<{ approved_count?: number; message?: string } | null> {
  if (!items.length) {
    return null;
  }
  state.procurementApproveBusy = true;
  state.procurementApproveResult = null;
  try {
    const url = state.basePath?.trim()
      ? `${state.basePath.replace(/\/$/, "")}/api/procurement/approve`
      : "/api/procurement/approve";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      state.procurementApproveResult = {
        message: json.detail ?? `HTTP ${res.status}`,
      };
      return state.procurementApproveResult;
    }
    const result = {
      approved_count: json.approved_count ?? json.data?.approved_count,
      message: json.message ?? json.data?.message ?? "已批准并通知采购员。",
    };
    state.procurementApproveResult = result;
    await loadProcurementSuggestions(state);
    return result;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    state.procurementApproveResult = { message: msg };
    return state.procurementApproveResult;
  } finally {
    state.procurementApproveBusy = false;
  }
}
