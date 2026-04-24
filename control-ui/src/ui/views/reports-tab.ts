import { html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { t } from "../../i18n/index.ts";
import { toSanitizedMarkdownHtml } from "../markdown.ts";
import "../report-chart.ts";
import type { ReportRecord, ReportTask, ReportTaskConfig } from "../types.ts";

function rp(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

type AnalysisStatus = "pending" | "running" | "done" | "failed" | null | undefined;

function statusBadge(s: AnalysisStatus) {
  if (s === "done") {
    return html`<span style="color: var(--color-success, #22c55e); font-size: 11px; font-weight: 600;">✓ 已分析</span>`;
  }
  if (s === "running" || s === "pending") {
    return html`<span style="color: #f59e0b; font-size: 11px; font-weight: 600;">⏳ 分析中</span>`;
  }
  if (s === "failed") {
    return html`<span style="color: var(--color-danger, #ef4444); font-size: 11px; font-weight: 600;">✗ 失败</span>`;
  }
  return html`<span style="color: var(--text-muted, #888); font-size: 11px;">—</span>`;
}

type DailyStat = { date: string; order_count: number; sales_amount: number };
type CustomerStat = { customer_name: string; sales_amount: number; order_count: number };
type StatusStat = { status_name: string; count: number; total_amount: number };

type ReportJson = {
  week_start?: string;
  week_end?: string;
  total_sales_amount?: number;
  total_order_count?: number;
  daily_stats?: DailyStat[];
  top_customers?: CustomerStat[];
  status_stats?: StatusStat[];
};

export type ReportsTabParams = {
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: ReportTask[];
  reportsRecords: ReportRecord[];
  reportsAdminToken: string;
  selectedRecordId: number | null;
  reportDetailLoading: boolean;
  reportDetail: ReportRecord | null;
  reportsDetailTab: "data" | "analysis";
  reportsEditingTaskId: string | null;
  reportsEditForm: ReportTaskConfig;
  onTokenChange: (token: string) => void;
  onRefresh: () => void;
  onRun: (taskKey: string) => void;
  onSelectRecord: (recordId: number) => void;
  onDetailTabChange: (tab: "data" | "analysis") => void;
  onReanalyze: (recordId: number) => void;
  selectedDailyDate: string | null;
  onDailyDateClick: (date: string | null) => void;
  onEditTask: (task: ReportTask) => void;
  onCancelEdit: () => void;
  onEditFormChange: (patch: ReportTaskConfig) => void;
  onSaveEdit: (taskKey: string) => void;
};

function renderDataTab(params: ReportsTabParams) {
  if (params.reportDetailLoading) {
    return html`<div class="muted" style="padding:24px;">${t("agents.reports.detailLoading")}</div>`;
  }
  if (!params.reportDetail) {
    return html`<div class="muted" style="padding:24px;">${t("agents.reports.detailEmpty")}</div>`;
  }
  const rj = (params.reportDetail.report_json ?? {}) as ReportJson;
  const totalAmount = rj.total_sales_amount ?? 0;
  const totalCount = rj.total_order_count ?? 0;
  const summaryJson = (params.reportDetail.summary_json ?? {}) as Record<string, unknown>;
  const prevWeek = summaryJson.prev_week as
    | { total_sales_amount: number; total_order_count: number; amount_pct: number; count_pct: number }
    | null
    | undefined;
  const daily = rj.daily_stats ?? [];
  const customers = rj.top_customers ?? [];
  const statuses = rj.status_stats ?? [];

  return html`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div
            style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;"
          >
            ${t("agents.reports.metricTotal")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${rp(totalAmount)}</div>
          ${prevWeek != null
            ? html`<div style="font-size:11px;margin-top:4px;color:${prevWeek.amount_pct >= 0 ? "var(--color-success,#22c55e)" : "var(--color-danger,#ef4444)"};">
                ${prevWeek.amount_pct >= 0 ? "▲" : "▼"} ${Math.abs(prevWeek.amount_pct)}% vs 上周
              </div>`
            : nothing}
        </div>
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div
            style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;"
          >
            ${t("agents.reports.metricCount")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${totalCount}</div>
          ${prevWeek != null
            ? html`<div style="font-size:11px;margin-top:4px;color:${prevWeek.count_pct >= 0 ? "var(--color-success,#22c55e)" : "var(--color-danger,#ef4444)"};">
                ${prevWeek.count_pct >= 0 ? "▲" : "▼"} ${Math.abs(prevWeek.count_pct)}% vs 上周
              </div>`
            : nothing}
        </div>
      </div>

      ${daily.length > 0
        ? html`
            <report-chart
              type="daily"
              .data=${daily}
              @chart-bar-click=${(e: CustomEvent<{ date: string }>) => {
                const clicked = e.detail.date;
                params.onDailyDateClick(clicked === params.selectedDailyDate ? null : clicked);
              }}
            ></report-chart>
            ${params.selectedDailyDate
              ? html`<div style="font-size:11px;color:var(--text-muted);text-align:right;margin-top:-8px;">
                  已选 ${params.selectedDailyDate} —
                  <button
                    style="border:none;background:none;color:var(--accent,#6366f1);cursor:pointer;font-size:11px;padding:0;"
                    @click=${() => params.onDailyDateClick(null)}
                  >清除</button>
                </div>`
              : nothing}
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${t("agents.reports.tableDaily")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colDate")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${daily.map((row) => {
                    const isSelected = row.date === params.selectedDailyDate;
                    return html`
                      <tr
                        style="
                          border-bottom:1px solid var(--border);
                          background:${isSelected
                            ? "var(--accent-soft,rgba(99,102,241,.10))"
                            : "transparent"};
                          font-weight:${isSelected ? "600" : "400"};
                        "
                      >
                        <td style="padding:6px 8px;" class="mono">${row.date}</td>
                        <td style="padding:6px 8px;text-align:right;">${row.order_count}</td>
                        <td style="padding:6px 8px;text-align:right;">${rp(row.sales_amount)}</td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            </div>
          `
        : nothing}

      ${customers.length > 0
        ? html`
            <report-chart type="customers" .data=${customers}></report-chart>
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${t("agents.reports.tableCustomers")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colRank")}</th>
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colCustomer")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${customers.map(
                    (row, i) => html`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;color:var(--text-muted);">${i + 1}</td>
                        <td style="padding:6px 8px;">${row.customer_name}</td>
                        <td style="padding:6px 8px;text-align:right;">${row.order_count}</td>
                        <td style="padding:6px 8px;text-align:right;">${rp(row.sales_amount)}</td>
                      </tr>
                    `,
                  )}
                </tbody>
              </table>
            </div>
          `
        : nothing}

      ${statuses.length > 0
        ? html`
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${t("agents.reports.tableStatus")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colStatus")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${statuses.map(
                    (row) => html`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;">${row.status_name}</td>
                        <td style="padding:6px 8px;text-align:right;">${row.count}</td>
                        <td style="padding:6px 8px;text-align:right;">${rp(row.total_amount)}</td>
                      </tr>
                    `,
                  )}
                </tbody>
              </table>
            </div>
          `
        : nothing}
    </div>
  `;
}

function renderAnalysisTab(params: ReportsTabParams) {
  if (params.reportDetailLoading) {
    return html`<div class="muted" style="padding:24px;">${t("agents.reports.detailLoading")}</div>`;
  }
  if (!params.reportDetail) {
    return html`<div class="muted" style="padding:24px;">${t("agents.reports.detailEmpty")}</div>`;
  }

  const aStatus = params.reportDetail.analysis_status;
  const amd = params.reportDetail.analysis_md;

  if (aStatus === "running") {
    return html`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="font-size:24px;">⏳</div>
        <div style="color:var(--text-muted);">${t("agents.reports.analysisLoading")}</div>
      </div>
    `;
  }
  if (aStatus === "pending") {
    return html`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="font-size:24px;">🕐</div>
        <div style="color:var(--text-muted);">${t("agents.reports.analysisPending")}</div>
      </div>
    `;
  }
  if (aStatus === "failed") {
    return html`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="color:var(--color-danger,#ef4444);">${t("agents.reports.analysisFailed")}</div>
        <button class="btn btn--sm" @click=${() => params.onReanalyze(params.reportDetail!.id)}>${t("agents.reports.reanalyzeBtn")}</button>
      </div>
    `;
  }
  if (!amd) {
    return html`<div class="muted" style="padding:24px;">${t("agents.reports.analysisEmpty")}</div>`;
  }

  return html`
    <div style="padding:16px;">
      <div class="markdown-body" style="font-size:13px;line-height:1.65;">${unsafeHTML(toSanitizedMarkdownHtml(amd))}</div>
    </div>
  `;
}

function renderTaskConfig(params: ReportsTabParams) {
  if (params.reportsTasks.length === 0) return nothing;
  return html`
    <details style="margin-top:8px;">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-muted);padding:8px 0;">任务配置</summary>
      <div style="padding:8px 0;display:flex;flex-direction:column;gap:10px;">
        ${params.reportsTasks.map((task) => {
          const editing = params.reportsEditingTaskId === task.task_key;
          return html`
            <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${editing ? "10px" : "0"};">
                <span style="font-size:13px;font-weight:600;">${task.title}</span>
                ${!editing ? html`<button class="btn btn--sm" @click=${() => params.onEditTask(task)}>编辑</button>` : nothing}
              </div>
              ${editing
                ? html`
                    <div style="display:flex;flex-direction:column;gap:8px;">
                      <label class="field">
                        <span style="font-size:12px;">${t("agents.reports.cron")}</span>
                        <input
                          .value=${params.reportsEditForm.cron_expr ?? task.cron_expr}
                          @input=${(e: Event) =>
                            params.onEditFormChange({
                              ...params.reportsEditForm,
                              cron_expr: (e.target as HTMLInputElement).value,
                            })}
                        />
                      </label>
                      <label class="field">
                        <span style="font-size:12px;">${t("agents.reports.timezone")}</span>
                        <input
                          .value=${params.reportsEditForm.timezone ?? task.timezone}
                          @input=${(e: Event) =>
                            params.onEditFormChange({
                              ...params.reportsEditForm,
                              timezone: (e.target as HTMLInputElement).value,
                            })}
                        />
                      </label>
                      <div style="display:flex;align-items:center;gap:8px;">
                        <input
                          type="checkbox"
                          .checked=${params.reportsEditForm.enabled ?? task.enabled}
                          @change=${(e: Event) =>
                            params.onEditFormChange({
                              ...params.reportsEditForm,
                              enabled: (e.target as HTMLInputElement).checked,
                            })}
                        />
                        <span style="font-size:12px;">${t("agents.reports.enabled")}</span>
                      </div>
                      <div style="display:flex;gap:8px;margin-top:4px;">
                        <button class="btn btn--sm primary" @click=${() => params.onSaveEdit(task.task_key)}>保存</button>
                        <button class="btn btn--sm" @click=${params.onCancelEdit}>取消</button>
                      </div>
                    </div>
                  `
                : html`
                    <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">
                      ${task.cron_expr} · ${task.timezone} · ${task.enabled ? "启用" : "禁用"}
                    </div>
                  `}
            </div>
          `;
        })}
      </div>
    </details>
  `;
}

export function renderReportsTab(params: ReportsTabParams) {
  return html`
    <section class="card" style="padding:0;overflow:hidden;">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:15px;font-weight:700;">周报管理</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">销售发票周报 — 数据与 AI 分析</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input
            style="width:160px;font-size:12px;padding:4px 8px;"
            .value=${params.reportsAdminToken}
            placeholder="x-reports-token"
            @input=${(e: Event) => params.onTokenChange((e.target as HTMLInputElement).value)}
          />
          ${params.reportsTasks.map(
            (task) => html`
              <button class="btn btn--sm primary" ?disabled=${params.reportsLoading} @click=${() => params.onRun(task.task_key)}>
                立即运行
              </button>
            `,
          )}
          <button class="btn btn--sm" ?disabled=${params.reportsLoading} @click=${params.onRefresh}>
            ${params.reportsLoading ? t("common.loading") : t("common.refresh")}
          </button>
        </div>
      </div>

      ${params.reportsError ? html`<div class="callout danger" style="margin:8px 12px;">${params.reportsError}</div>` : nothing}

      <div style="display:grid;grid-template-columns:260px 1fr;min-height:540px;">
        <div style="border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;">
          <div
            style="font-size:11px;color:var(--text-muted);padding:10px 12px 6px;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border);"
          >
            历史记录
          </div>
          <div style="overflow-y:auto;flex:1;padding:8px;">
            ${params.reportsRecords.length === 0
              ? html`<div class="muted" style="font-size:13px;padding:8px;">${t("agents.reports.noRecords")}</div>`
              : params.reportsRecords.map((record) => {
                  const selected = record.id === params.selectedRecordId;
                  const summary = (record.summary_json ?? {}) as Record<string, unknown>;
                  const totalCount = Number(summary.total_order_count ?? 0);
                  const totalAmount = Number(summary.total_sales_amount ?? 0);
                  const dateLabel = record.started_at?.slice(0, 10) ?? "—";
                  return html`
                    <button
                      style="
                          width:100%;text-align:left;padding:10px 12px;margin-bottom:6px;
                          border:1px solid ${selected ? "var(--accent,#6366f1)" : "var(--border)"};
                          border-radius:8px;
                          background:${selected ? "var(--accent-soft,rgba(99,102,241,.08))" : "var(--surface-1)"};
                          cursor:pointer;transition:border-color .15s;
                        "
                      @click=${() => params.onSelectRecord(record.id)}
                    >
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                        <span style="font-size:13px;font-weight:600;" class="mono">${dateLabel}</span>
                        ${statusBadge(record.analysis_status)}
                      </div>
                      <div style="font-size:12px;color:var(--text-muted);">${totalCount} 张 · ${rp(totalAmount)}</div>
                      ${record.analysis_status === "failed"
                        ? html`
                            <button
                              class="btn btn--sm"
                              style="margin-top:6px;font-size:11px;"
                              @click=${(e: Event) => {
                                e.stopPropagation();
                                params.onReanalyze(record.id);
                              }}
                            >
                              ${t("agents.reports.reanalyzeBtn")}
                            </button>
                          `
                        : nothing}
                    </button>
                  `;
                })}
          </div>

          <div style="padding:8px 12px;border-top:1px solid var(--border);">${renderTaskConfig(params)}</div>
        </div>

        <div style="display:flex;flex-direction:column;overflow:hidden;">
          <div style="display:flex;border-bottom:1px solid var(--border);padding:0 16px;">
            ${(["data", "analysis"] as const).map((tab) => {
              const label = tab === "data" ? t("agents.reports.tabData") : t("agents.reports.tabAnalysis");
              const active = params.reportsDetailTab === tab;
              return html`
                <button
                  style="
                      padding:10px 14px;font-size:13px;font-weight:${active ? "700" : "400"};
                      border:none;background:none;cursor:pointer;
                      border-bottom:2px solid ${active ? "var(--accent,#6366f1)" : "transparent"};
                      color:${active ? "var(--text-primary)" : "var(--text-muted)"};
                      margin-right:4px;
                    "
                  @click=${() => params.onDetailTabChange(tab)}
                >
                  ${label}
                </button>
              `;
            })}
          </div>

          <div style="flex:1;overflow-y:auto;">
            ${params.reportsDetailTab === "data" ? renderDataTab(params) : renderAnalysisTab(params)}
          </div>
        </div>
      </div>
    </section>
  `;
}
