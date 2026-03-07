import type { ShortageRecord, ReplenishmentDraftListItem, ReplenishmentDraftDetail } from "../types.ts";
import {
  asArray,
  asNumber,
  asRecord,
  buildStandardError,
  extractErrorDetail,
  optionalNumber,
  optionalString,
  ResponseSchemaError,
} from "./response-schema.ts";

export function procurementItemKey(s: ShortageRecord): string {
  return `${s.product_key ?? ""}\t${s.specification ?? ""}\t${s.code ?? ""}`;
}

export type ProcurementState = {
  basePath: string;
  procurementLoading: boolean;
  procurementError: string | null;
  procurementSuggestions: ShortageRecord[];
  procurementApproveBusy: boolean;
  procurementApproveResult: { approved_count?: number; message?: string } | null;
  replenishmentDrafts: ReplenishmentDraftListItem[];
  replenishmentDetail: ReplenishmentDraftDetail | null;
  replenishmentDetailId: number | null;
  replenishmentLoading: boolean;
  replenishmentError: string | null;
  replenishmentConfirmBusy: boolean;
  replenishmentConfirmResult: { executed?: number; message?: string } | null;
};

const ENDPOINT_SHORTAGE_LIST = "/api/shortage/list";
const ENDPOINT_APPROVE = "/api/procurement/approve";
const ENDPOINT_REPLENISHMENT_DRAFTS = "/api/replenishment-drafts";

const approveInflightByState = new WeakMap<
  object,
  Map<string, Promise<{ approved_count?: number; message?: string } | null>>
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

function getApproveInflightMap(
  state: ProcurementState,
): Map<string, Promise<{ approved_count?: number; message?: string } | null>> {
  let map = approveInflightByState.get(state as object);
  if (!map) {
    map = new Map();
    approveInflightByState.set(state as object, map);
  }
  return map;
}

function toFiniteNumberOrUndefined(value: unknown): number | undefined {
  const direct = optionalNumber(value);
  if (direct != null) return direct;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseShortageRecord(raw: unknown, endpoint: string): ShortageRecord {
  const item = asRecord(raw, endpoint, "data[]");
  return {
    id: toFiniteNumberOrUndefined(item.id),
    product_name: optionalString(item.product_name),
    specification: optionalString(item.specification),
    quantity: toFiniteNumberOrUndefined(item.quantity),
    available_qty: toFiniteNumberOrUndefined(item.available_qty),
    shortfall: toFiniteNumberOrUndefined(item.shortfall),
    code: optionalString(item.code),
    quote_name: optionalString(item.quote_name),
    unit_price: toFiniteNumberOrUndefined(item.unit_price),
    file_name: optionalString(item.file_name),
    uploaded_at: optionalString(item.uploaded_at) ?? null,
    product_key: optionalString(item.product_key),
    count: toFiniteNumberOrUndefined(item.count),
  };
}

function dedupeSuggestions(items: ShortageRecord[]): ShortageRecord[] {
  const byKey = new Map<string, ShortageRecord>();
  for (const item of items) {
    const key = procurementItemKey(item);
    if (!key.trim()) continue;
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, item);
      continue;
    }
    const prevCount = Number(prev.count ?? 0);
    const nextCount = Number(item.count ?? 0);
    const prevTime = prev.uploaded_at ? new Date(prev.uploaded_at).getTime() : 0;
    const nextTime = item.uploaded_at ? new Date(item.uploaded_at).getTime() : 0;
    if (nextCount > prevCount || (nextCount === prevCount && nextTime >= prevTime)) {
      byKey.set(key, item);
    }
  }
  return Array.from(byKey.values());
}

function parseApproveResult(raw: unknown): { approved_count?: number; message?: string } {
  const json = asRecord(raw, ENDPOINT_APPROVE);
  const data = json.data != null ? asRecord(json.data, ENDPOINT_APPROVE, "data") : {};
  const approvedCount = optionalNumber(json.approved_count)
    ?? optionalNumber(data.approved_count)
    ?? (json.approved_count != null ? asNumber(json.approved_count, ENDPOINT_APPROVE, "approved_count") : undefined);
  const message = optionalString(json.message) ?? optionalString(data.message) ?? "已批准并通知采购员。";
  return {
    approved_count: approvedCount,
    message,
  };
}

function approvalSignature(
  items: Array<{ product_key?: string; product_name?: string; specification?: string; shortfall?: number; code?: string }>,
): string {
  const parts = items
    .map((it) => `${it.product_key ?? ""}|${it.product_name ?? ""}|${it.specification ?? ""}|${it.code ?? ""}|${it.shortfall ?? 0}`)
    .sort();
  return parts.join(";");
}

export async function loadProcurementSuggestions(state: ProcurementState): Promise<void> {
  state.procurementLoading = true;
  state.procurementError = null;
  try {
    const url = apiUrl(state.basePath, ENDPOINT_SHORTAGE_LIST, {
      limit: "200",
      unapproved_only: "1",
    });
    const res = await fetch(url);
    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      state.procurementError = buildStandardError(
        "加载采购建议列表",
        extractErrorDetail(json, `HTTP ${res.status}`),
        "无法查看最新缺货采购建议",
        "点击“重试”重新加载列表",
      );
      state.procurementSuggestions = [];
      return;
    }
    const root = asRecord(json, ENDPOINT_SHORTAGE_LIST);
    const rows = asArray(root.data, ENDPOINT_SHORTAGE_LIST, "data");
    state.procurementSuggestions = dedupeSuggestions(
      rows.map((row) => parseShortageRecord(row, ENDPOINT_SHORTAGE_LIST)),
    );
  } catch (e) {
    const detail = e instanceof ResponseSchemaError
      ? e.message
      : (e instanceof Error ? e.message : String(e));
    state.procurementError = buildStandardError(
      "加载采购建议列表",
      detail,
      "列表可能为空或字段错位",
      "检查后端返回字段后重试",
    );
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

  const signature = approvalSignature(items);
  const inflight = getApproveInflightMap(state);
  const existing = inflight.get(signature);
  if (existing) return existing;

  const task = (async () => {
    state.procurementApproveBusy = true;
    state.procurementApproveResult = null;
    try {
      const url = state.basePath?.trim()
        ? `${state.basePath.replace(/\/$/, "")}${ENDPOINT_APPROVE}`
        : ENDPOINT_APPROVE;
      const idem = createIdempotencyKey("procurement-approve", signature || "single");
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": idem,
          "Idempotency-Key": idem,
        },
        body: JSON.stringify({ items }),
      });
      const json = await res.json().catch(() => ({} as unknown));
      if (!res.ok) {
        state.procurementApproveResult = {
          message: buildStandardError(
            "采购批准",
            extractErrorDetail(json, `HTTP ${res.status}`),
            "这些缺货项仍待批准，采购员未收到通知",
            "点击“重试”再次批准",
          ),
        };
        return state.procurementApproveResult;
      }
      const result = parseApproveResult(json);
      state.procurementApproveResult = result;
      await loadProcurementSuggestions(state);
      return result;
    } catch (e) {
      const detail = e instanceof ResponseSchemaError
        ? e.message
        : (e instanceof Error ? e.message : String(e));
      state.procurementApproveResult = {
        message: buildStandardError(
          "采购批准",
          detail,
          "这些缺货项仍待批准，采购员未收到通知",
          "点击“重试”再次批准",
        ),
      };
      return state.procurementApproveResult;
    } finally {
      state.procurementApproveBusy = false;
      inflight.delete(signature);
    }
  })();

  inflight.set(signature, task);
  return task;
}

export async function loadReplenishmentDrafts(state: ProcurementState): Promise<void> {
  state.replenishmentLoading = true;
  state.replenishmentError = null;
  try {
    const base = state.basePath?.trim() ? state.basePath.replace(/\/$/, "") : "";
    const url = base ? `${base}${ENDPOINT_REPLENISHMENT_DRAFTS}` : ENDPOINT_REPLENISHMENT_DRAFTS;
    const res = await fetch(url);
    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      state.replenishmentError = buildStandardError(
        "加载补货单列表",
        extractErrorDetail(json, `HTTP ${res.status}`),
        "无法查看补货单列表",
        "点击“重试”重新加载列表",
      );
      state.replenishmentDrafts = [];
      return;
    }
    const root = asRecord(json, ENDPOINT_REPLENISHMENT_DRAFTS);
    const rows = asArray(root.data, ENDPOINT_REPLENISHMENT_DRAFTS, "data");
    state.replenishmentDrafts = rows.map((row) => {
      const item = asRecord(row, ENDPOINT_REPLENISHMENT_DRAFTS, "data[]");
      return {
        id: asNumber(item.id, ENDPOINT_REPLENISHMENT_DRAFTS, "id"),
        draft_no: optionalString(item.draft_no) ?? "",
        name: optionalString(item.name) ?? "",
        source: optionalString(item.source) ?? undefined,
        created_at: optionalString(item.created_at),
        status: optionalString(item.status) ?? "",
        confirmed_at: optionalString(item.confirmed_at),
      } as ReplenishmentDraftListItem;
    });
  } catch (e) {
    const detail = e instanceof ResponseSchemaError ? e.message : (e instanceof Error ? e.message : String(e));
    state.replenishmentError = buildStandardError(
      "加载补货单列表",
      detail,
      "补货单列表可能为空或字段错位",
      "检查后端返回字段后重试",
    );
    state.replenishmentDrafts = [];
  } finally {
    state.replenishmentLoading = false;
  }
}

export async function loadReplenishmentDraftDetail(
  state: ProcurementState,
  draftId: number,
): Promise<void> {
  state.replenishmentLoading = true;
  state.replenishmentError = null;
  try {
    const base = state.basePath?.trim() ? state.basePath.replace(/\/$/, "") : "";
    const url = base ? `${base}${ENDPOINT_REPLENISHMENT_DRAFTS}/${draftId}` : `${ENDPOINT_REPLENISHMENT_DRAFTS}/${draftId}`;
    const res = await fetch(url);
    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      state.replenishmentError = buildStandardError(
        "加载补货单详情",
        extractErrorDetail(json, `HTTP ${res.status}`),
        "无法查看补货单详情",
        "稍后重试",
      );
      state.replenishmentDetail = null;
      state.replenishmentDetailId = null;
      return;
    }
    const root = asRecord(json, ENDPOINT_REPLENISHMENT_DRAFTS, "detail");
    const data = asRecord(root.data, ENDPOINT_REPLENISHMENT_DRAFTS, "data");
    const linesRaw = asArray(data.lines, ENDPOINT_REPLENISHMENT_DRAFTS, "data.lines");
    const lines: ReplenishmentDraftDetail["lines"] = linesRaw.map((row) => {
      const item = asRecord(row, ENDPOINT_REPLENISHMENT_DRAFTS, "data.lines[]");
      return {
        id: toFiniteNumberOrUndefined(item.id),
        row_index: toFiniteNumberOrUndefined(item.row_index),
        code: optionalString(item.code),
        product_name: optionalString(item.product_name),
        specification: optionalString(item.specification),
        quantity: toFiniteNumberOrUndefined(item.quantity) ?? 0,
        current_qty: toFiniteNumberOrUndefined(item.current_qty),
        memo: optionalString(item.memo),
      };
    });
    state.replenishmentDetail = {
      id: asNumber(data.id, ENDPOINT_REPLENISHMENT_DRAFTS, "id"),
      draft_no: optionalString(data.draft_no) ?? "",
      name: optionalString(data.name) ?? "",
      source: optionalString(data.source) ?? undefined,
      created_at: optionalString(data.created_at),
      status: optionalString(data.status) ?? "",
      confirmed_at: optionalString(data.confirmed_at),
      lines,
    };
    state.replenishmentDetailId = state.replenishmentDetail.id;
  } catch (e) {
    const detail = e instanceof ResponseSchemaError ? e.message : (e instanceof Error ? e.message : String(e));
    state.replenishmentError = buildStandardError(
      "加载补货单详情",
      detail,
      "无法查看补货单详情",
      "稍后重试",
    );
    state.replenishmentDetail = null;
    state.replenishmentDetailId = null;
  } finally {
    state.replenishmentLoading = false;
  }
}

export type ReplenishmentInputLine = { product_or_code: string; quantity: number };

export async function createReplenishmentDraft(
  state: ProcurementState,
  lines: ReplenishmentInputLine[],
): Promise<{ id: number } | null> {
  const valid = lines.filter((l) => {
    const code = typeof l.product_or_code === "string" ? l.product_or_code.trim() : "";
    const qty = Number(l.quantity);
    return code.length > 0 && qty > 0;
  });
  if (valid.length === 0) return null;

  const body = {
    lines: valid.map((l) => ({
      product_or_code: typeof l.product_or_code === "string" ? l.product_or_code.trim() : "",
      quantity: Number(l.quantity),
    })),
  };

  const base = state.basePath?.trim() ? state.basePath.replace(/\/$/, "") : "";
  const url = base ? `${base}${ENDPOINT_REPLENISHMENT_DRAFTS}` : ENDPOINT_REPLENISHMENT_DRAFTS;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({} as unknown));
  if (!res.ok) {
    state.replenishmentError = buildStandardError(
      "生成补货单",
      extractErrorDetail(json, `HTTP ${res.status}`),
      "补货单未创建",
      "请检查输入后重试",
    );
    return null;
  }
  const root = asRecord(json, ENDPOINT_REPLENISHMENT_DRAFTS);
  const data = root.data != null ? asRecord(root.data, ENDPOINT_REPLENISHMENT_DRAFTS, "data") : {};
  const id = asNumber(data.id, ENDPOINT_REPLENISHMENT_DRAFTS, "data.id");
  await loadReplenishmentDrafts(state);
  return { id };
}

export async function confirmReplenishmentDraft(
  state: ProcurementState,
  draftId: number,
): Promise<void> {
  state.replenishmentConfirmBusy = true;
  state.replenishmentConfirmResult = null;
  try {
    const base = state.basePath?.trim() ? state.basePath.replace(/\/$/, "") : "";
    const url = base
      ? `${base}${ENDPOINT_REPLENISHMENT_DRAFTS}/${draftId}/confirm`
      : `${ENDPOINT_REPLENISHMENT_DRAFTS}/${draftId}/confirm`;
    const res = await fetch(url, { method: "PATCH" });
    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      state.replenishmentConfirmResult = {
        message: buildStandardError(
          "确认补货单",
          extractErrorDetail(json, `HTTP ${res.status}`),
          "补货未执行",
          "稍后重试",
        ),
      };
      return;
    }
    const root = asRecord(json, ENDPOINT_REPLENISHMENT_DRAFTS, "confirm");
    const data = asRecord(root.data, ENDPOINT_REPLENISHMENT_DRAFTS, "data");
    const executed = optionalNumber(data.executed);
    const apiMessage = optionalString(data.message);
    state.replenishmentConfirmResult = {
      executed: executed ?? undefined,
      message: apiMessage || `已执行 ${executed ?? 0} 条补货操作。`,
    };
    await loadReplenishmentDrafts(state);
  } catch (e) {
    const detail = e instanceof ResponseSchemaError ? e.message : (e instanceof Error ? e.message : String(e));
    state.replenishmentConfirmResult = {
      message: buildStandardError(
        "确认补货单",
        detail,
        "补货未执行",
        "稍后重试",
      ),
    };
  } finally {
    state.replenishmentConfirmBusy = false;
  }
}

export async function deleteReplenishmentDraft(
  state: ProcurementState,
  draftId: number,
): Promise<boolean> {
  const base = state.basePath?.trim() ? state.basePath.replace(/\/$/, "") : "";
  const url = base
    ? `${base}${ENDPOINT_REPLENISHMENT_DRAFTS}/${draftId}`
    : `${ENDPOINT_REPLENISHMENT_DRAFTS}/${draftId}`;
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    const json = await res.json().catch(() => ({} as unknown));
    state.replenishmentError = buildStandardError(
      "删除补货单",
      extractErrorDetail(json, `HTTP ${res.status}`),
      "补货单未删除",
      "请重试",
    );
    return false;
  }
  if (state.replenishmentDetailId === draftId) {
    state.replenishmentDetail = null;
    state.replenishmentDetailId = null;
  }
  await loadReplenishmentDrafts(state);
  return true;
}
