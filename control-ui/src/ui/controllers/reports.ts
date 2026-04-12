import type { ReportRecord, ReportTask, ReportTaskConfig } from "../types.ts";

export type ReportsState = {
  basePath: string;
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: ReportTask[];
  reportsRecords: ReportRecord[];
  reportsAdminToken: string;
  reportDetail: ReportRecord | null;
  reportDetailLoading: boolean;
  selectedRecordId: number | null;
  reportsDetailTab: "data" | "analysis";
};

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

function headers(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "x-reports-token": token,
  };
}

async function parseResponse<T>(res: Response): Promise<T> {
  const payload = (await res.json().catch(() => ({}))) as { success?: boolean; data?: T; detail?: string };
  if (!res.ok || !payload.success) {
    const detail = (payload as { detail?: unknown }).detail;
    if (Array.isArray(detail)) {
      throw new Error(detail.map((entry) => JSON.stringify(entry)).join("; "));
    }
    if (typeof detail === "object" && detail !== null) {
      throw new Error(JSON.stringify(detail));
    }
    throw new Error((typeof detail === "string" && detail) || `HTTP ${res.status}`);
  }
  return payload.data as T;
}

export async function loadReports(state: ReportsState): Promise<void> {
  state.reportsLoading = true;
  state.reportsError = null;
  try {
    const [tasksRes, recordsRes] = await Promise.all([
      fetch(apiUrl(state.basePath, "/api/reports/tasks"), { headers: headers(state.reportsAdminToken) }),
      fetch(apiUrl(state.basePath, "/api/reports/records?limit=20"), {
        headers: headers(state.reportsAdminToken),
      }),
    ]);
    state.reportsTasks = await parseResponse<ReportTask[]>(tasksRes);
    state.reportsRecords = await parseResponse<ReportRecord[]>(recordsRes);
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
  } finally {
    state.reportsLoading = false;
  }
}

export async function runReportTask(state: ReportsState, taskKey: string): Promise<void> {
  state.reportsError = null;
  try {
    const res = await fetch(apiUrl(state.basePath, `/api/reports/tasks/${taskKey}/run`), {
      method: "POST",
      headers: headers(state.reportsAdminToken),
    });
    await parseResponse<Record<string, unknown>>(res);
    await loadReports(state);
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
  }
}

export async function saveReportTaskConfig(
  state: ReportsState,
  taskKey: string,
  patch: ReportTaskConfig,
): Promise<void> {
  state.reportsError = null;
  try {
    const res = await fetch(apiUrl(state.basePath, `/api/reports/tasks/${taskKey}`), {
      method: "PATCH",
      headers: headers(state.reportsAdminToken),
      body: JSON.stringify(patch),
    });
    await parseResponse<Record<string, unknown>>(res);
    await loadReports(state);
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
  }
}

export async function loadReportDetail(state: ReportsState, id: number): Promise<void> {
  state.selectedRecordId = id;
  state.reportDetailLoading = true;
  state.reportsError = null;
  const requestedId = id;
  try {
    const res = await fetch(apiUrl(state.basePath, `/api/reports/records/${id}`), {
      headers: headers(state.reportsAdminToken),
    });
    const detail = await parseResponse<ReportRecord>(res);
    if (state.selectedRecordId === requestedId) {
      state.reportDetail = detail;
      const aStatus = detail?.analysis_status;
      if (aStatus === "running" || aStatus === "pending") {
        startAnalysisPoller(state, id);
      } else {
        stopAnalysisPoller();
      }
    }
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
    if (state.selectedRecordId === requestedId) {
      state.reportDetail = null;
    }
  } finally {
    if (state.selectedRecordId === requestedId) {
      state.reportDetailLoading = false;
    }
  }
}

export async function reformatRecord(state: ReportsState, id: number): Promise<void> {
  state.reportsError = null;
  try {
    const res = await fetch(apiUrl(state.basePath, `/api/reports/records/${id}/reformat`), {
      method: "POST",
      headers: headers(state.reportsAdminToken),
    });
    await parseResponse<Record<string, unknown>>(res);
    await loadReportDetail(state, id);
    await loadReports(state);
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
  }
}

let _analysisPoller: ReturnType<typeof window.setInterval> | null = null;
let _analysisPollInFlight = false;

export function stopAnalysisPoller(): void {
  if (_analysisPoller !== null) {
    window.clearInterval(_analysisPoller);
    _analysisPoller = null;
  }
  _analysisPollInFlight = false;
}

export function startAnalysisPoller(state: ReportsState, id: number): void {
  stopAnalysisPoller();
  _analysisPoller = window.setInterval(async () => {
    if (state.selectedRecordId !== id) {
      stopAnalysisPoller();
      return;
    }
    if (_analysisPollInFlight) {
      return;
    }
    _analysisPollInFlight = true;
    try {
      await loadReportDetail(state, id);
      const status = state.reportDetail?.analysis_status;
      if (status === "done" || status === "failed") {
        stopAnalysisPoller();
      }
    } finally {
      _analysisPollInFlight = false;
    }
  }, 3000);
}

export async function reanalyzeRecord(state: ReportsState, id: number): Promise<void> {
  state.reportsError = null;
  try {
    const res = await fetch(apiUrl(state.basePath, `/api/reports/records/${id}/reanalyze`), {
      method: "POST",
      headers: headers(state.reportsAdminToken),
    });
    await parseResponse<Record<string, unknown>>(res);
    await loadReportDetail(state, id);
    startAnalysisPoller(state, id);
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
  }
}
