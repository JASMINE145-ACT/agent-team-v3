import type {
  QuotationDraftListItem,
  QuotationDraftDetail,
} from "../types.ts";

export type FulfillState = {
  basePath: string;
  fulfillDraftsLoading: boolean;
  fulfillDraftsError: string | null;
  fulfillDrafts: QuotationDraftListItem[];
  fulfillDetail: QuotationDraftDetail | null;
  fulfillDetailId: number | null;
  fulfillConfirmBusy: boolean;
  fulfillConfirmResult: { order_id?: string; message?: string } | null;
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

export async function loadFulfillDrafts(state: FulfillState): Promise<void> {
  state.fulfillDraftsLoading = true;
  state.fulfillDraftsError = null;
  try {
    const url = apiUrl(state.basePath, "/api/quotation-drafts", {
      status: "pending",
      limit: "50",
    });
    const res = await fetch(url);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      state.fulfillDraftsError = json.detail ?? `HTTP ${res.status}`;
      state.fulfillDrafts = [];
      return;
    }
    state.fulfillDrafts = (json.data ?? []) as QuotationDraftListItem[];
  } catch (e) {
    state.fulfillDraftsError = e instanceof Error ? e.message : String(e);
    state.fulfillDrafts = [];
  } finally {
    state.fulfillDraftsLoading = false;
  }
}

export async function loadFulfillDraftDetail(
  state: FulfillState,
  draftId: number,
): Promise<void> {
  state.fulfillDetailId = draftId;
  try {
    const url = state.basePath?.trim()
      ? `${state.basePath.replace(/\/$/, "")}/api/quotation-drafts/${draftId}`
      : `/api/quotation-drafts/${draftId}`;
    const res = await fetch(url);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      state.fulfillDetail = null;
      return;
    }
    state.fulfillDetail = (json.data ?? null) as QuotationDraftDetail | null;
  } catch {
    state.fulfillDetail = null;
  }
}

export async function confirmFulfillDraft(
  state: FulfillState,
  draftId: number,
): Promise<{ order_id?: string; message?: string } | null> {
  state.fulfillConfirmBusy = true;
  state.fulfillConfirmResult = null;
  try {
    const url = state.basePath?.trim()
      ? `${state.basePath.replace(/\/$/, "")}/api/quotation-drafts/${draftId}/confirm`
      : `/api/quotation-drafts/${draftId}/confirm`;
    const res = await fetch(url, { method: "PATCH" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      state.fulfillConfirmResult = {
        message: json.detail ?? `HTTP ${res.status}`,
      };
      return state.fulfillConfirmResult;
    }
    const result = {
      order_id: json.data?.order_id ?? json.order_id,
      message: json.data?.message ?? json.message ?? "已确认成单",
    };
    state.fulfillConfirmResult = result;
    state.fulfillDetail = null;
    state.fulfillDetailId = null;
    await loadFulfillDrafts(state);
    return result;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    state.fulfillConfirmResult = { message: msg };
    return state.fulfillConfirmResult;
  } finally {
    state.fulfillConfirmBusy = false;
  }
}
