import type {
  QuotationDraftListItem,
  QuotationDraftDetail,
} from "../types.ts";
import {
  asArray,
  asRecord,
  asString,
  buildStandardError,
  extractErrorDetail,
  optionalNumber,
  optionalString,
  ResponseSchemaError,
} from "./response-schema.ts";

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

const ENDPOINT_DRAFT_LIST = "/api/quotation-drafts";
const ENDPOINT_DRAFT_DETAIL = "/api/quotation-drafts/{id}";
const ENDPOINT_DRAFT_CONFIRM = "/api/quotation-drafts/{id}/confirm";

const confirmInflightByState = new WeakMap<
  object,
  Map<number, Promise<{ order_id?: string; message?: string } | null>>
>();

function apiUrl(basePath: string, path: string, params?: Record<string, string>): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  const base = prefix ? `${prefix}${path}` : path;
  if (!params || Object.keys(params).length === 0) {
    return base;
  }
  const search = new URLSearchParams(params);
  return `${base}?${search.toString()}`;
}

function createIdempotencyKey(prefix: string, id: string): string {
  const g = globalThis as typeof globalThis & { crypto?: { randomUUID?: () => string } };
  const uuid = typeof g.crypto?.randomUUID === "function"
    ? g.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}:${id}:${uuid}`;
}

function getConfirmInflightMap(
  state: FulfillState,
): Map<number, Promise<{ order_id?: string; message?: string } | null>> {
  let map = confirmInflightByState.get(state as object);
  if (!map) {
    map = new Map();
    confirmInflightByState.set(state as object, map);
  }
  return map;
}

function parseDraftListItem(raw: unknown, endpoint: string): QuotationDraftListItem {
  const item = asRecord(raw, endpoint, "data[]");
  const parsedId = optionalNumber(item.id);
  const id = parsedId ?? Number(item.id);
  return {
    id: Number.isFinite(id) ? id : 0,
    draft_no: asString(item.draft_no, endpoint, "data[].draft_no"),
    name: asString(item.name, endpoint, "data[].name"),
    source: optionalString(item.source),
    file_path: typeof item.file_path === "string" ? item.file_path : null,
    created_at: optionalString(item.created_at) ?? null,
    status: asString(item.status, endpoint, "data[].status"),
    confirmed_at: optionalString(item.confirmed_at) ?? null,
  };
}

function parseDraftDetail(raw: unknown, endpoint: string): QuotationDraftDetail {
  const detail = asRecord(raw, endpoint, "data");
  const base = parseDraftListItem(detail, endpoint);
  const linesRaw = asArray(detail.lines, endpoint, "data.lines");
  const lines = linesRaw.map((ln) => {
    const line = asRecord(ln, endpoint, "data.lines[]");
    const warehouseQty = optionalNumber(line.warehouse_qty);
    const availableQty = optionalNumber(line.available_qty);
    return {
      ...line,
      // 旧草稿可能仅有 available_qty；统一映射到 warehouse_qty 供前端库存列使用。
      warehouse_qty: warehouseQty ?? availableQty ?? null,
    };
  }) as QuotationDraftDetail["lines"];
  return {
    ...base,
    lines,
  };
}

function parseConfirmResult(raw: unknown, endpoint: string): { order_id?: string; message?: string } {
  const json = asRecord(raw, endpoint);
  const data = json.data != null ? asRecord(json.data, endpoint, "data") : {};
  const orderId = optionalString(data.order_id) ?? optionalString(json.order_id);
  const message = optionalString(data.message) ?? optionalString(json.message) ?? "已确认成单";
  return {
    order_id: orderId,
    message,
  };
}

export async function loadFulfillDrafts(state: FulfillState): Promise<void> {
  state.fulfillDraftsLoading = true;
  state.fulfillDraftsError = null;
  try {
    const url = apiUrl(state.basePath, ENDPOINT_DRAFT_LIST, {
      status: "pending",
      limit: "50",
    });
    const res = await fetch(url);
    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      state.fulfillDraftsError = buildStandardError(
        "加载待确认报价单列表",
        extractErrorDetail(json, `HTTP ${res.status}`),
        "无法查看最新待确认报价单",
        "点击“重试”重新加载列表",
      );
      state.fulfillDrafts = [];
      return;
    }
    const root = asRecord(json, ENDPOINT_DRAFT_LIST);
    const rows = asArray(root.data, ENDPOINT_DRAFT_LIST, "data");
    state.fulfillDrafts = rows.map((row) => parseDraftListItem(row, ENDPOINT_DRAFT_LIST)).filter((row) => row.id > 0);
  } catch (e) {
    const detail = e instanceof ResponseSchemaError
      ? e.message
      : (e instanceof Error ? e.message : String(e));
    state.fulfillDraftsError = buildStandardError(
      "加载待确认报价单列表",
      detail,
      "列表可能为空或字段错位",
      "检查后端返回字段后重试",
    );
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
    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      state.fulfillDetail = null;
      state.fulfillConfirmResult = {
        message: buildStandardError(
          "加载报价单详情",
          extractErrorDetail(json, `HTTP ${res.status}`),
          "无法确认该报价单",
          "点击“重试”或返回列表后重选",
        ),
      };
      return;
    }
    const root = asRecord(json, ENDPOINT_DRAFT_DETAIL);
    state.fulfillDetail = parseDraftDetail(root.data, ENDPOINT_DRAFT_DETAIL);
  } catch (e) {
    const detail = e instanceof ResponseSchemaError
      ? e.message
      : (e instanceof Error ? e.message : String(e));
    state.fulfillDetail = null;
    state.fulfillConfirmResult = {
      message: buildStandardError(
        "加载报价单详情",
        detail,
        "无法确认该报价单",
        "点击“重试”或返回列表后重选",
      ),
    };
  }
}

export async function confirmFulfillDraft(
  state: FulfillState,
  draftId: number,
): Promise<{ order_id?: string; message?: string } | null> {
  const inflight = getConfirmInflightMap(state);
  const existing = inflight.get(draftId);
  if (existing) return existing;

  const task = (async () => {
    state.fulfillConfirmBusy = true;
    state.fulfillConfirmResult = null;
    try {
      const url = state.basePath?.trim()
        ? `${state.basePath.replace(/\/$/, "")}/api/quotation-drafts/${draftId}/confirm`
        : `/api/quotation-drafts/${draftId}/confirm`;
      const idem = createIdempotencyKey("fulfill-confirm", String(draftId));
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "X-Idempotency-Key": idem,
          "Idempotency-Key": idem,
        },
      });
      const json = await res.json().catch(() => ({} as unknown));
      if (!res.ok) {
        state.fulfillConfirmResult = {
          message: buildStandardError(
            "确认成单",
            extractErrorDetail(json, `HTTP ${res.status}`),
            "该报价单仍为待确认，库存未锁定",
            "点击“重试”再次确认",
          ),
        };
        return state.fulfillConfirmResult;
      }
      const result = parseConfirmResult(json, ENDPOINT_DRAFT_CONFIRM);
      state.fulfillConfirmResult = result;
      state.fulfillDetail = null;
      state.fulfillDetailId = null;
      await loadFulfillDrafts(state);
      return result;
    } catch (e) {
      const detail = e instanceof ResponseSchemaError
        ? e.message
        : (e instanceof Error ? e.message : String(e));
      state.fulfillConfirmResult = {
        message: buildStandardError(
          "确认成单",
          detail,
          "该报价单仍为待确认，库存未锁定",
          "点击“重试”再次确认",
        ),
      };
      return state.fulfillConfirmResult;
    } finally {
      state.fulfillConfirmBusy = false;
      inflight.delete(draftId);
    }
  })();

  inflight.set(draftId, task);
  return task;
}
