/**
 * Work 模式：批量报价计划与执行，调用后端 /api/work/plan 与 /api/work/run。
 */

export type WorkState = {
  basePath: string;
  workFilePaths: string[];
  workPlan: { mode?: string; files?: { path: string; name: string }[]; steps?: { file_index: number; op: string }[] } | null;
  workPlanLoading: boolean;
  workRunning: boolean;
  workResult: { success?: boolean; answer?: string; trace?: unknown[]; plan?: unknown; error?: string } | null;
  workError: string | null;
  workCustomerLevel: string;
  workDoRegisterOos: boolean;
};

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

export async function loadWorkPlan(state: WorkState): Promise<void> {
  if (!state.workFilePaths.length) {
    state.workError = "请先上传至少一个报价单文件";
    return;
  }
  state.workPlanLoading = true;
  state.workError = null;
  state.workResult = null;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/work/plan"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file_paths: state.workFilePaths,
        do_register_oos: state.workDoRegisterOos,
      }),
      credentials: "same-origin",
    });
    const json = await res.json().catch(() => ({}));
    if (json.success && json.plan) {
      state.workPlan = json.plan;
    } else {
      state.workError = json.detail || json.error || "生成计划失败";
    }
  } catch (e) {
    state.workError = e instanceof Error ? e.message : String(e);
  } finally {
    state.workPlanLoading = false;
  }
}

export async function runWork(state: WorkState): Promise<void> {
  if (!state.workFilePaths.length) {
    state.workError = "请先上传至少一个报价单文件";
    return;
  }
  state.workRunning = true;
  state.workError = null;
  state.workResult = null;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/work/run"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file_paths: state.workFilePaths,
        customer_level: state.workCustomerLevel,
        do_register_oos: state.workDoRegisterOos,
        plan: state.workPlan || undefined,
      }),
      credentials: "same-origin",
    });
    const json = await res.json().catch(() => ({}));
    state.workResult = {
      success: json.success,
      answer: json.answer,
      trace: json.trace,
      plan: json.plan,
      error: json.error,
    };
    if (!res.ok) {
      state.workError = json.detail || json.error || "执行失败";
    }
  } catch (e) {
    state.workError = e instanceof Error ? e.message : String(e);
    state.workResult = { success: false, error: state.workError };
  } finally {
    state.workRunning = false;
  }
}
