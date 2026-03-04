/**
 * Work 模式：批量报价固定流程执行，调用后 /api/work/run（无 Plan 阶）? * 攌人工介入：当要型?status=awaiting_choices，仅 Work 页展示待?UI，不影响 Chat? */

export type WorkRunStatus = "idle" | "running" | "awaiting_choices" | "done";

export type WorkPendingChoice = {
  id: string;
  row?: number;
  keywords?: string;
  product_name?: string;
  specification?: string;
  qty?: number | string;
  options: Array<{ code: string; matched_name?: string; unit_price?: number; reasoning?: string }>;
};

/** 待确认报价单（match 成功后供前叼辑，后落库） */
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
  /** 待确认报价单（从 match 步 observation 解析），报价员可编辑后确认落?*/
  workPendingQuotationDraft: PendingQuotationDraft | null;
  workQuotationDraftSaveStatus: WorkQuotationDraftSaveStatus | null;
};

const FALLBACK_DRAFT_NAME = "\u672a\u547d\u540d\u62a5\u4ef7\u5355";

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
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
    const isShortage = code === "无货" || quoteName.includes("库存不足") ? 1 : 0;
    if (!isShortage && shortfall === 0 && availableQty === 0 && code && code !== "无货") {
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
      is_shortage: isShortage,
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

function applyWorkRunResponse(state: WorkState, res: Response, json: Record<string, unknown>): void {
  state.workResult = {
    success: json.success as boolean,
    answer: (json.answer as string) ?? "",
    trace: (json.trace as unknown[]) ?? [],
    error: json.error as string | undefined,
  };
  state.workPendingQuotationDraft = null;
  state.workQuotationDraftSaveStatus = null;
  if (!res.ok) {
    state.workError = (json.detail as string) || (json.error as string) || "\u6267\u884c\u5931\u8d25";
    state.workRunStatus = "done";
    state.workRunId = null;
    state.workPendingChoices = [];
    state.workSelections = {};
    return;
  }
  const status = (json.status as string) ?? "done";
  if (status === "awaiting_choices") {
    state.workRunStatus = "awaiting_choices";
    state.workRunId = (json.run_id as string) ?? null;
    state.workPendingChoices = (json.pending_choices as WorkPendingChoice[]) ?? [];
    const sel: Record<string, string> = {};
    for (const p of state.workPendingChoices) {
      // Work 模式默认“未选即无货”，只有用户显式选择候选 code 才覆盖。
      sel[p.id] = "__OOS__";
    }
    state.workSelections = sel;
  } else {
    state.workRunStatus = "done";
    state.workRunId = null;
    state.workPendingChoices = [];
    state.workSelections = {};
    const directDraft = json.pending_quotation_draft as PendingQuotationDraft | undefined;
    if (directDraft && Array.isArray(directDraft.lines)) {
      state.workPendingQuotationDraft = { ...directDraft, name: normalizeDraftName(directDraft) };
    } else {
      const trace = state.workResult?.trace;
      if (trace) {
        const draft = extractPendingQuotationDraftFromTrace(trace);
        if (draft) state.workPendingQuotationDraft = draft;
      }
    }
  }
}

export async function runWork(state: WorkState): Promise<void> {
  if (!state.workFilePaths.length) {
    state.workError = "\u8bf7\u5148\u4e0a\u4f20\u81f3\u5c11\u4e00\u4e2a\u62a5\u4ef7\u5355\u6587\u4ef6";
    return;
  }
  state.workRunning = true;
  state.workRunStatus = "running";
  state.workError = null;
  state.workResult = null;
  state.workRunId = null;
  state.workPendingChoices = [];
  state.workSelections = {};
  state.workPendingQuotationDraft = null;
  state.workQuotationDraftSaveStatus = null;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/work/run-stream"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file_paths: state.workFilePaths,
        customer_level: state.workCustomerLevel,
        do_register_oos: state.workDoRegisterOos,
      }),
      credentials: "same-origin",
    });
    if (!res.ok || !res.body) {
      const json = await res.json().catch(() => ({})) as Record<string, unknown>;
      applyWorkRunResponse(state, res, json);
      return;
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
        try {
          const item = JSON.parse(raw) as Record<string, unknown>;
          if (item.type === "stage" && typeof item.stage === "number") {
            state.workProgressStage = item.stage;
            // 让出事件徎，便?Lit 重绘；短暂延迟使每阶段可?            await new Promise((r) => setTimeout(r, 80));
          } else if (item.type === "result" && item.payload) {
            applyWorkRunResponse(state, { ok: true } as Response, item.payload as Record<string, unknown>);
            gotResult = true;
            break;
          }
        } catch {
          // ignore parse errors
        }
      }
      if (gotResult) break;
    }
    if (!gotResult && buffer.startsWith("data: ")) {
      try {
        const item = JSON.parse(buffer.slice(6).trim()) as Record<string, unknown>;
        if (item.type === "result" && item.payload) {
          applyWorkRunResponse(state, { ok: true } as Response, item.payload as Record<string, unknown>);
        }
      } catch {
        // ignore
      }
    }
  } catch (e) {
    state.workError = e instanceof Error ? e.message : String(e);
    state.workResult = { success: false, error: state.workError };
    state.workRunStatus = "done";
    state.workRunId = null;
    state.workPendingChoices = [];
    state.workSelections = {};
  } finally {
    state.workRunning = false;
  }
}

export async function resumeWork(state: WorkState): Promise<void> {
  const runId = state.workRunId;
  if (!runId || state.workPendingChoices.length === 0) return;
  // Submit every item; empty or __OOS__ will be treated as out-of-stock by backend.
  const selections = state.workPendingChoices.map((p) => ({
    item_id: p.id,
    selected_code: state.workSelections[p.id] ?? "__OOS__",
  }));
  state.workRunning = true;
  state.workError = null;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/work/resume"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ run_id: runId, selections }),
      credentials: "same-origin",
    });
    const json = await res.json().catch(() => ({})) as Record<string, unknown>;
    applyWorkRunResponse(state, res, json);
  } catch (e) {
    state.workError = e instanceof Error ? e.message : String(e);
    state.workResult = { success: false, error: state.workError };
    state.workRunStatus = "done";
    state.workRunId = null;
    state.workPendingChoices = [];
    state.workSelections = {};
  } finally {
    state.workRunning = false;
  }
}

/** 报价员确认并保存：将待确认报价单 POST ?/api/quotation-drafts，落库后返回 draft_no */
export async function saveQuotationDraft(state: WorkState): Promise<void> {
  const draft = state.workPendingQuotationDraft;
  if (!draft?.lines?.length) {
    state.workQuotationDraftSaveStatus = { status: "error", error: "无报价明细可保存" };
    return;
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
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; data?: { draft_no?: string; draft_id?: number }; detail?: string };
    if (json.success && json.data?.draft_no != null) {
      state.workQuotationDraftSaveStatus = { status: "ok", draft_no: json.data.draft_no, draft_id: json.data.draft_id ?? 0 };
      state.workPendingQuotationDraft = null;
    } else {
      state.workQuotationDraftSaveStatus = { status: "error", error: (json.detail as string) || "保存失败" };
    }
  } catch (e) {
    state.workQuotationDraftSaveStatus = { status: "error", error: e instanceof Error ? e.message : String(e) };
  }
}
