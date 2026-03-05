/**
 * Work 模式：批量报价固定流程执行。
 */

import {
  asArray,
  asRecord,
  asString,
  buildStandardError,
  extractErrorDetail,
  optionalBoolean,
  optionalNumber,
  optionalString,
  ResponseSchemaError,
} from "./response-schema.ts";

export type WorkRunStatus = "idle" | "running" | "awaiting_choices" | "resuming" | "done" | "error";

export type WorkPendingChoice = {
  id: string;
  row?: number;
  keywords?: string;
  product_name?: string;
  specification?: string;
  qty?: number | string;
  options: Array<{ code: string; matched_name?: string; unit_price?: number; reasoning?: string }>;
};

/** 待确认报价单（match 成功后供前端编辑，后落库） */
export type PendingQuotationDraft = {
  name: string;
  file_path: string | null;
  source: string;
  lines: Array<{
    row_index?: number;
    row?: number;
    product_name?: string;
    specification?: string;
    qty?: number;
    code?: string;
    quote_name?: string;
    unit_price?: number | null;
    amount?: number | null;
    available_qty?: number;
    shortfall?: number;
    is_shortage?: number;
    match_source?: string | null;
  }>;
};

export type WorkQuotationDraftSaveStatus =
  | null
  | { status: "saving" }
  | { status: "ok"; draft_no: string; draft_id: number }
  | { status: "error"; error: string };

export type WorkState = {
  basePath: string;
  workFilePaths: string[];
  workOriginalFileNamesByPath: Record<string, string>;
  workRunning: boolean;
  workProgressStage: number;
  workRunStatus: WorkRunStatus;
  workRunId: string | null;
  workPendingChoices: WorkPendingChoice[];
  workSelections: Record<string, string>;
  workResult: { success?: boolean; answer?: string; trace?: unknown[]; error?: string } | null;
  workError: string | null;
  workCustomerLevel: string;
  workDoRegisterOos: boolean;
  workPendingQuotationDraft: PendingQuotationDraft | null;
  workQuotationDraftSaveStatus: WorkQuotationDraftSaveStatus | null;
};

type WorkRuntime = {
  controller: AbortController | null;
  cancelRequested: boolean;
  timeoutReached: boolean;
};

type WorkApiPayload = {
  status: "awaiting_choices" | "done";
  success: boolean;
  answer: string;
  trace: unknown[];
  error?: string;
  run_id?: string;
  pending_choices?: WorkPendingChoice[];
  pending_quotation_draft?: PendingQuotationDraft;
};

const FALLBACK_DRAFT_NAME = "未命名报价单";
const RUN_TIMEOUT_MS = 240_000;
const RESUME_TIMEOUT_MS = 120_000;
const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 800;

const runtimeByState = new WeakMap<object, WorkRuntime>();

const ALLOWED_TRANSITIONS: Record<WorkRunStatus, readonly WorkRunStatus[]> = {
  idle: ["running"],
  running: ["awaiting_choices", "done", "error", "idle"],
  awaiting_choices: ["resuming", "running", "error", "idle"],
  resuming: ["awaiting_choices", "done", "error", "idle"],
  done: ["running", "idle", "error"],
  error: ["running", "idle", "resuming"],
};

class RetryableWorkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RetryableWorkError";
  }
}

class RunIdInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RunIdInvalidError";
  }
}

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

function runtimeFor(state: WorkState): WorkRuntime {
  let rt = runtimeByState.get(state as object);
  if (!rt) {
    rt = {
      controller: null,
      cancelRequested: false,
      timeoutReached: false,
    };
    runtimeByState.set(state as object, rt);
  }
  return rt;
}

function setWorkStatus(state: WorkState, next: WorkRunStatus): void {
  const current = state.workRunStatus;
  if (current === next) return;
  const allowed = ALLOWED_TRANSITIONS[current] ?? [];
  if (!allowed.includes(next)) {
    throw new Error(`invalid work state transition: ${current} -> ${next}`);
  }
  state.workRunStatus = next;
}

function forceWorkStatus(state: WorkState, next: WorkRunStatus): void {
  state.workRunStatus = next;
}

function clearPendingChoiceContext(state: WorkState): void {
  state.workRunId = null;
  state.workPendingChoices = [];
  state.workSelections = {};
}

function normalizePathKey(p: string): string {
  return (p || "").trim().replace(/\\/g, "/").toLowerCase();
}

function resolveDraftNameForSave(state: WorkState, draft: PendingQuotationDraft): string {
  const filePath = (draft.file_path || "").trim();
  if (filePath) {
    const byPath = state.workOriginalFileNamesByPath[normalizePathKey(filePath)];
    if (typeof byPath === "string" && byPath.trim()) return byPath.trim();
  }
  return normalizeDraftName(draft);
}

function normalizeDraftName(draft: Pick<PendingQuotationDraft, "name" | "file_path"> | null | undefined): string {
  const byName = draft?.name?.trim();
  if (byName) return byName;
  const filePath = draft?.file_path?.trim();
  if (filePath) {
    const basename = filePath.replace(/\\/g, "/").split("/").filter(Boolean).pop();
    if (basename) return basename;
  }
  return FALLBACK_DRAFT_NAME;
}

function tryParseJson(s: string): unknown {
  try {
    if (typeof s !== "string" || !s.trim()) return null;
    const t = s.trim();
    if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
      return JSON.parse(t) as unknown;
    }
    return null;
  } catch {
    return null;
  }
}

function isOosCode(code: unknown): boolean {
  if (typeof code !== "string") return false;
  const c = code.trim().toLowerCase();
  if (!c) return false;
  return c === "__oos__" || c === "oos" || c === "无货";
}

function buildDraftFromObservation(obj: Record<string, unknown>): PendingQuotationDraft | null {
  const fillItems = Array.isArray(obj.fill_items_merged) ? (obj.fill_items_merged as Record<string, unknown>[]) : [];
  if (!fillItems.length) return null;
  const items = Array.isArray(obj.items) ? (obj.items as Record<string, unknown>[]) : [];
  const shortage = Array.isArray(obj.shortage) ? (obj.shortage as Record<string, unknown>[]) : [];
  const itemsByRow = new Map<unknown, Record<string, unknown>>();
  for (const it of items) {
    itemsByRow.set(it.row, it);
  }
  const lines = fillItems.map((fi, index) => {
    const row = fi.row;
    const item = itemsByRow.get(row) ?? {};
    const qty = Number(fi.qty ?? 0);
    const unitPriceRaw = fi.unit_price;
    const unitPrice = unitPriceRaw == null ? null : Number(unitPriceRaw);
    const amount = unitPrice == null || Number.isNaN(unitPrice) ? null : unitPrice * qty;
    const code = String(fi.code ?? "");
    const quoteName = String(fi.quote_name ?? "").trim();
    let availableQty = 0;
    let shortfall = 0;
    for (const s of shortage) {
      if (s.row === row) {
        availableQty = Number(s.available_qty ?? 0);
        shortfall = Number(s.shortfall ?? 0);
        break;
      }
    }
    const isShortage = isOosCode(code) || quoteName.includes("库存不足");
    if (!isShortage && shortfall === 0 && availableQty === 0 && code && !isOosCode(code)) {
      availableQty = qty;
    }
    return {
      row_index: index,
      row: typeof row === "number" ? row : undefined,
      product_name: String(item.product_name ?? ""),
      specification: String(fi.specification ?? item.specification ?? ""),
      qty,
      code,
      quote_name: quoteName,
      unit_price: unitPrice,
      amount,
      available_qty: availableQty,
      shortfall,
      is_shortage: isShortage ? 1 : 0,
      match_source: null,
    };
  });
  return {
    name: normalizeDraftName({
      name: typeof obj.name === "string" ? obj.name : "",
      file_path: typeof obj.file_path === "string" ? obj.file_path : null,
    }),
    file_path: typeof obj.file_path === "string" ? obj.file_path : null,
    source: "file",
    lines,
  };
}

function extractPendingQuotationDraftFromTrace(trace: unknown[]): PendingQuotationDraft | null {
  if (!Array.isArray(trace)) return null;
  let last: PendingQuotationDraft | null = null;
  for (const entry of trace) {
    const type = (entry as Record<string, unknown>).type;
    const content = (entry as Record<string, unknown>).content;
    if (type !== "observation" || typeof content !== "string") continue;
    const obj = tryParseJson(content) as Record<string, unknown> | null;
    if (!obj || typeof obj !== "object") continue;
    const draft = obj.pending_quotation_draft as PendingQuotationDraft | undefined;
    if (draft && Array.isArray(draft.lines)) {
      last = { ...draft, name: normalizeDraftName(draft) };
      continue;
    }
    const fallback = buildDraftFromObservation(obj);
    if (fallback) {
      last = fallback;
    }
  }
  return last;
}

function parsePendingChoice(raw: unknown): WorkPendingChoice {
  const item = asRecord(raw, "/api/work", "pending_choices[]");
  const optionsRaw = asArray(item.options, "/api/work", "pending_choices[].options");
  const options = optionsRaw.map((optRaw) => {
    const opt = asRecord(optRaw, "/api/work", "pending_choices[].options[]");
    return {
      code: asString(opt.code, "/api/work", "pending_choices[].options[].code"),
      matched_name: optionalString(opt.matched_name),
      unit_price: optionalNumber(opt.unit_price),
      reasoning: optionalString(opt.reasoning),
    };
  });
  return {
    id: asString(item.id, "/api/work", "pending_choices[].id"),
    row: optionalNumber(item.row),
    keywords: optionalString(item.keywords),
    product_name: optionalString(item.product_name),
    specification: optionalString(item.specification),
    qty: optionalNumber(item.qty) ?? optionalString(item.qty),
    options,
  };
}

function parsePendingDraft(raw: unknown): PendingQuotationDraft {
  const draft = asRecord(raw, "/api/work", "pending_quotation_draft");
  const linesRaw = asArray(draft.lines, "/api/work", "pending_quotation_draft.lines");
  const lines = linesRaw.map((lineRaw, index) => {
    const line = asRecord(lineRaw, "/api/work", "pending_quotation_draft.lines[]");
    const qty = optionalNumber(line.qty) ?? Number(line.qty ?? 0);
    const unitPrice = line.unit_price == null ? null : Number(line.unit_price);
    return {
      row_index: optionalNumber(line.row_index) ?? index,
      row: optionalNumber(line.row),
      product_name: optionalString(line.product_name),
      specification: optionalString(line.specification),
      qty: Number.isFinite(qty) ? qty : 0,
      code: optionalString(line.code),
      quote_name: optionalString(line.quote_name),
      unit_price: unitPrice == null || Number.isNaN(unitPrice) ? null : unitPrice,
      amount: line.amount == null ? null : Number(line.amount),
      available_qty: optionalNumber(line.available_qty) ?? Number(line.available_qty ?? 0),
      shortfall: optionalNumber(line.shortfall) ?? Number(line.shortfall ?? 0),
      is_shortage: optionalNumber(line.is_shortage) ?? (optionalBoolean(line.is_shortage) ? 1 : 0),
      match_source: optionalString(line.match_source) ?? null,
    };
  });
  return {
    name: normalizeDraftName({
      name: optionalString(draft.name) ?? "",
      file_path: optionalString(draft.file_path) ?? null,
    }),
    file_path: optionalString(draft.file_path) ?? null,
    source: optionalString(draft.source) ?? "file",
    lines,
  };
}

function parseWorkPayload(raw: unknown, endpoint: string): WorkApiPayload {
  const root = asRecord(raw, endpoint);
  const statusRaw = optionalString(root.status) ?? "done";
  const status = statusRaw === "awaiting_choices" ? "awaiting_choices" : "done";
  const payload: WorkApiPayload = {
    status,
    success: optionalBoolean(root.success) ?? true,
    answer: optionalString(root.answer) ?? "",
    trace: Array.isArray(root.trace) ? root.trace : [],
    error: optionalString(root.error),
  };

  if (root.pending_quotation_draft != null) {
    payload.pending_quotation_draft = parsePendingDraft(root.pending_quotation_draft);
  }

  if (status === "awaiting_choices") {
    payload.run_id = asString(root.run_id, endpoint, "run_id");
    const choicesRaw = asArray(root.pending_choices, endpoint, "pending_choices");
    payload.pending_choices = choicesRaw.map((item) => parsePendingChoice(item));
  }

  return payload;
}

function applyWorkPayload(state: WorkState, payload: WorkApiPayload): void {
  state.workResult = {
    success: payload.success,
    answer: payload.answer,
    trace: payload.trace,
    error: payload.error,
  };
  state.workPendingQuotationDraft = null;
  state.workQuotationDraftSaveStatus = null;

  if (payload.status === "awaiting_choices") {
    setWorkStatus(state, "awaiting_choices");
    state.workRunId = payload.run_id ?? null;
    state.workPendingChoices = payload.pending_choices ?? [];
    const sel: Record<string, string> = {};
    for (const p of state.workPendingChoices) {
      // 默认“未选即无货”，只有显式选择候选 code 才覆盖。
      sel[p.id] = "__OOS__";
    }
    state.workSelections = sel;
    return;
  }

  clearPendingChoiceContext(state);
  if (payload.pending_quotation_draft && Array.isArray(payload.pending_quotation_draft.lines)) {
    state.workPendingQuotationDraft = {
      ...payload.pending_quotation_draft,
      name: normalizeDraftName(payload.pending_quotation_draft),
    };
  } else {
    const draft = extractPendingQuotationDraftFromTrace(payload.trace);
    if (draft) state.workPendingQuotationDraft = draft;
  }

  if (payload.success === false || (payload.error && payload.error.trim())) {
    forceWorkStatus(state, "error");
    state.workError = buildStandardError(
      "执行报价流程",
      payload.error ?? "后端返回失败状态",
      "本次报价流程未完成",
      "点击“重试”重新运行，或检查后端日志",
    );
  } else {
    setWorkStatus(state, "done");
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function openRequest(state: WorkState, timeoutMs: number): { signal: AbortSignal; close: () => void } {
  const rt = runtimeFor(state);
  const controller = new AbortController();
  rt.controller = controller;
  rt.timeoutReached = false;
  const timeoutId = setTimeout(() => {
    rt.timeoutReached = true;
    controller.abort("timeout");
  }, timeoutMs);
  return {
    signal: controller.signal,
    close: () => {
      clearTimeout(timeoutId);
      if (rt.controller === controller) {
        rt.controller = null;
      }
    },
  };
}

function isAbortError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return error.name === "AbortError" || /aborted/i.test(error.message);
}

function handleFinalRunError(state: WorkState, detail: string): void {
  forceWorkStatus(state, "error");
  clearPendingChoiceContext(state);
  state.workResult = { success: false, error: detail };
  state.workError = buildStandardError(
    "执行报价流程",
    detail,
    "流程被中断，未产出有效结果",
    "点击“重试”再次执行",
  );
}

function handleCancelled(state: WorkState): void {
  forceWorkStatus(state, "idle");
  state.workError = "已取消当前流程。";
  state.workResult = null;
}

async function executeRunStreamOnce(state: WorkState, endpoint: string): Promise<void> {
  const req = {
    file_paths: state.workFilePaths,
    customer_level: state.workCustomerLevel,
    do_register_oos: state.workDoRegisterOos,
  };
  const { signal, close } = openRequest(state, RUN_TIMEOUT_MS);
  try {
    const res = await fetch(apiUrl(state.basePath, endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
      credentials: "same-origin",
      signal,
    });

    if (!res.ok || !res.body) {
      const json = await res.json().catch(() => ({} as unknown));
      const detail = extractErrorDetail(json, `HTTP ${res.status}`);
      if (isRetryableStatus(res.status)) {
        throw new RetryableWorkError(detail);
      }
      throw new Error(detail);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let gotResult = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (!raw) continue;
        const event = asRecord(JSON.parse(raw), endpoint, "stream_event");
        const eventType = asString(event.type, endpoint, "stream_event.type");
        if (eventType === "stage") {
          const stage = optionalNumber(event.stage) ?? Number(event.stage);
          if (!Number.isFinite(stage)) {
            throw new ResponseSchemaError(endpoint, "stage must be a number");
          }
          state.workProgressStage = stage;
          await wait(80);
        } else if (eventType === "result") {
          const payload = parseWorkPayload(event.payload, endpoint);
          applyWorkPayload(state, payload);
          gotResult = true;
          break;
        }
      }

      if (gotResult) break;
    }

    if (!gotResult && buffer.startsWith("data: ")) {
      const raw = buffer.slice(6).trim();
      if (raw) {
        const event = asRecord(JSON.parse(raw), endpoint, "stream_event_tail");
        if (event.type === "result") {
          const payload = parseWorkPayload(event.payload, endpoint);
          applyWorkPayload(state, payload);
          gotResult = true;
        }
      }
    }

    if (!gotResult) {
      throw new ResponseSchemaError(endpoint, "stream ended without result event");
    }
  } catch (e) {
    const rt = runtimeFor(state);
    if (rt.cancelRequested) {
      throw new Error("__WORK_CANCELLED__");
    }
    if (isAbortError(e) && rt.timeoutReached) {
      throw new RetryableWorkError("请求超时");
    }
    if (isAbortError(e)) {
      throw new Error("请求已中断");
    }
    if (e instanceof ResponseSchemaError) {
      throw e;
    }
    if (e instanceof RetryableWorkError) {
      throw e;
    }
    if (e instanceof Error && /network|failed to fetch|load failed/i.test(e.message)) {
      throw new RetryableWorkError(e.message);
    }
    throw e;
  } finally {
    close();
  }
}

function isRunIdInvalidResponse(status: number, json: unknown): boolean {
  if (status === 404 || status === 410) return true;
  const detail = extractErrorDetail(json, "").toLowerCase();
  return detail.includes("run_id") || detail.includes("run id");
}

async function executeResumeOnce(state: WorkState, runId: string, selections: Array<{ item_id: string; selected_code: string }>): Promise<void> {
  const endpoint = "/api/work/resume";
  const { signal, close } = openRequest(state, RESUME_TIMEOUT_MS);
  try {
    const res = await fetch(apiUrl(state.basePath, endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ run_id: runId, selections }),
      credentials: "same-origin",
      signal,
    });

    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      if (isRunIdInvalidResponse(res.status, json)) {
        throw new RunIdInvalidError(extractErrorDetail(json, "run_id 已失效"));
      }
      const detail = extractErrorDetail(json, `HTTP ${res.status}`);
      if (isRetryableStatus(res.status)) {
        throw new RetryableWorkError(detail);
      }
      throw new Error(detail);
    }

    const payload = parseWorkPayload(json, endpoint);
    applyWorkPayload(state, payload);
  } catch (e) {
    const rt = runtimeFor(state);
    if (rt.cancelRequested) {
      throw new Error("__WORK_CANCELLED__");
    }
    if (e instanceof RunIdInvalidError) {
      throw e;
    }
    if (isAbortError(e) && rt.timeoutReached) {
      throw new RetryableWorkError("请求超时");
    }
    if (isAbortError(e)) {
      throw new Error("请求已中断");
    }
    if (e instanceof ResponseSchemaError || e instanceof RetryableWorkError) {
      throw e;
    }
    if (e instanceof Error && /network|failed to fetch|load failed/i.test(e.message)) {
      throw new RetryableWorkError(e.message);
    }
    throw e;
  } finally {
    close();
  }
}

export function cancelWork(state: WorkState): void {
  const rt = runtimeFor(state);
  rt.cancelRequested = true;
  rt.controller?.abort("user_cancel");
  handleCancelled(state);
  state.workRunning = false;
}

export async function runWork(state: WorkState): Promise<void> {
  if (!state.workFilePaths.length) {
    state.workError = "请先上传至少一个报价单文件";
    return;
  }

  const rt = runtimeFor(state);
  rt.cancelRequested = false;
  state.workRunning = true;
  state.workError = null;
  state.workResult = null;
  state.workRunId = null;
  state.workPendingChoices = [];
  state.workSelections = {};
  state.workPendingQuotationDraft = null;
  state.workQuotationDraftSaveStatus = null;
  setWorkStatus(state, "running");

  let attempt = 0;
  try {
    while (true) {
      attempt += 1;
      try {
        await executeRunStreamOnce(state, "/api/work/run-stream");
        break;
      } catch (e) {
        if (e instanceof Error && e.message === "__WORK_CANCELLED__") {
          handleCancelled(state);
          break;
        }
        if (e instanceof RetryableWorkError && attempt <= MAX_RETRIES) {
          await wait(RETRY_DELAY_MS * attempt);
          continue;
        }
        const detail = e instanceof ResponseSchemaError
          ? e.message
          : (e instanceof Error ? e.message : String(e));
        handleFinalRunError(state, detail);
        break;
      }
    }
  } finally {
    state.workRunning = false;
  }
}

export async function resumeWork(state: WorkState): Promise<void> {
  const runId = state.workRunId;
  if (!runId || state.workPendingChoices.length === 0) {
    state.workError = "缺少可继续的 run_id，请重新执行。";
    forceWorkStatus(state, "error");
    return;
  }

  const selections = state.workPendingChoices.map((p) => ({
    item_id: p.id,
    selected_code: state.workSelections[p.id] ?? "__OOS__",
  }));

  const rt = runtimeFor(state);
  rt.cancelRequested = false;
  state.workRunning = true;
  state.workError = null;
  setWorkStatus(state, "resuming");

  let attempt = 0;
  try {
    while (true) {
      attempt += 1;
      try {
        await executeResumeOnce(state, runId, selections);
        break;
      } catch (e) {
        if (e instanceof Error && e.message === "__WORK_CANCELLED__") {
          handleCancelled(state);
          break;
        }
        if (e instanceof RunIdInvalidError) {
          clearPendingChoiceContext(state);
          state.workResult = { success: false, error: e.message };
          state.workError = buildStandardError(
            "继续流程",
            e.message,
            "当前待选项无法继续提交",
            "请重新执行一次 Work 流程",
          );
          forceWorkStatus(state, "error");
          break;
        }
        if (e instanceof RetryableWorkError && attempt <= MAX_RETRIES) {
          await wait(RETRY_DELAY_MS * attempt);
          continue;
        }
        const detail = e instanceof ResponseSchemaError
          ? e.message
          : (e instanceof Error ? e.message : String(e));
        state.workResult = { success: false, error: detail };
        state.workError = buildStandardError(
          "继续流程",
          detail,
          "本次续跑失败，尚未生成完整结果",
          "点击“重试”继续，或重新执行 Work",
        );
        forceWorkStatus(state, "error");
        break;
      }
    }
  } finally {
    state.workRunning = false;
  }
}

export async function retryWork(state: WorkState): Promise<void> {
  if (state.workRunId && state.workPendingChoices.length > 0) {
    await resumeWork(state);
    return;
  }
  await runWork(state);
}

/** 报价员确认并保存：将待确认报价单 POST 到 /api/quotation-drafts，落库后返回 draft_no */
export async function saveQuotationDraft(state: WorkState): Promise<boolean> {
  const draft = state.workPendingQuotationDraft;
  if (!draft?.lines?.length) {
    state.workQuotationDraftSaveStatus = { status: "error", error: "无报价明细可保存" };
    return false;
  }

  state.workQuotationDraftSaveStatus = { status: "saving" };
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/quotation-drafts"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: resolveDraftNameForSave(state, draft),
        source: draft.source || "file",
        file_path: draft.file_path ?? undefined,
        lines: draft.lines.map((ln) => ({
          product_name: ln.product_name ?? "",
          specification: ln.specification ?? "",
          qty: Number(ln.qty) || 0,
          code: ln.code ?? "",
          quote_name: ln.quote_name ?? "",
          unit_price: ln.unit_price != null ? Number(ln.unit_price) : null,
          amount: ln.amount != null ? Number(ln.amount) : null,
          available_qty: Number(ln.available_qty) || 0,
          shortfall: Number(ln.shortfall) || 0,
          is_shortage: ln.is_shortage ? 1 : 0,
          match_source: ln.match_source ?? null,
        })),
      }),
      credentials: "same-origin",
    });
    const json = await res.json().catch(() => ({} as unknown));
    if (!res.ok) {
      state.workQuotationDraftSaveStatus = {
        status: "error",
        error: buildStandardError(
          "保存报价单",
          extractErrorDetail(json, `HTTP ${res.status}`),
          "报价单仍停留在待保存状态",
          "点击“重试”再次保存",
        ),
      };
      return false;
    }

    const root = asRecord(json, "/api/quotation-drafts");
    const ok = optionalBoolean(root.success);
    const data = asRecord(root.data, "/api/quotation-drafts", "data");
    const draftNo = asString(data.draft_no, "/api/quotation-drafts", "data.draft_no");
    const parsedDraftId = optionalNumber(data.draft_id) ?? Number(data.draft_id);
    const draftId = Number.isFinite(parsedDraftId) ? parsedDraftId : 0;
    if (ok === false) {
      throw new ResponseSchemaError("/api/quotation-drafts", "success is false");
    }

    state.workQuotationDraftSaveStatus = { status: "ok", draft_no: draftNo, draft_id: draftId };
    state.workPendingQuotationDraft = null;
    return true;
  } catch (e) {
    const detail = e instanceof ResponseSchemaError
      ? e.message
      : (e instanceof Error ? e.message : String(e));
    state.workQuotationDraftSaveStatus = {
      status: "error",
      error: buildStandardError(
        "保存报价单",
        detail,
        "报价单仍停留在待保存状态",
        "检查数据后重试",
      ),
    };
    return false;
  }
}
