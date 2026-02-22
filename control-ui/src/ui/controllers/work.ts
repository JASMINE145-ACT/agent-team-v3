/**
 * Work 模式：批量报价固定流程执行，调用后端 /api/work/run（无 Plan 阶段）。
 * 支持人工介入：当需要选型时 status=awaiting_choices，仅 Work 页展示待选 UI，不影响 Chat。
 */

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

export type WorkState = {
  basePath: string;
  workFilePaths: string[];
  workRunning: boolean;
  /** 0=识别表 1=查价格与库存 2=填表，执行中循环展示 */
  workProgressStage: number;
  workRunStatus: WorkRunStatus;
  workRunId: string | null;
  workPendingChoices: WorkPendingChoice[];
  workSelections: Record<string, string>;
  workResult: { success?: boolean; answer?: string; trace?: unknown[]; error?: string } | null;
  workError: string | null;
  workCustomerLevel: string;
  workDoRegisterOos: boolean;
};

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

function applyWorkRunResponse(state: WorkState, res: Response, json: Record<string, unknown>): void {
  state.workResult = {
    success: json.success as boolean,
    answer: (json.answer as string) ?? "",
    trace: (json.trace as unknown[]) ?? [],
    error: json.error as string | undefined,
  };
  if (!res.ok) {
    state.workError = (json.detail as string) || (json.error as string) || "执行失败";
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
      if (p.options?.length) sel[p.id] = p.options[0].code;
    }
    state.workSelections = sel;
  } else {
    state.workRunStatus = "done";
    state.workRunId = null;
    state.workPendingChoices = [];
    state.workSelections = {};
  }
}

export async function runWork(state: WorkState): Promise<void> {
  if (!state.workFilePaths.length) {
    state.workError = "请先上传至少一个报价单文件";
    return;
  }
  state.workRunning = true;
  state.workRunStatus = "running";
  state.workError = null;
  state.workResult = null;
  state.workRunId = null;
  state.workPendingChoices = [];
  state.workSelections = {};
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/work/run"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file_paths: state.workFilePaths,
        customer_level: state.workCustomerLevel,
        do_register_oos: state.workDoRegisterOos,
      }),
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

export async function resumeWork(state: WorkState): Promise<void> {
  const runId = state.workRunId;
  if (!runId || state.workPendingChoices.length === 0) return;
  const selections = state.workPendingChoices.map((p) => ({
    item_id: p.id,
    selected_code: state.workSelections[p.id] ?? p.options?.[0]?.code ?? "",
  })).filter((s) => s.selected_code);
  if (selections.length !== state.workPendingChoices.length) {
    state.workError = "请为每项选择一个型号";
    return;
  }
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
