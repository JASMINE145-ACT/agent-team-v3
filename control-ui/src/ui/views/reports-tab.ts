import { html, nothing } from "lit";

import { t } from "../../i18n/index.ts";
import type { ReportRecord, ReportTask } from "../types.ts";

type ReportsTabParams = {
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: ReportTask[];
  reportsRecords: ReportRecord[];
  reportsAdminToken: string;
  selectedRecordId: number | null;
  reportDetailLoading: boolean;
  reportDetail: ReportRecord | null;
  reportsCopyJustDone: boolean;
  onTokenChange: (token: string) => void;
  onRefresh: () => void;
  onRun: (taskKey: string) => void;
  onSelectRecord: (recordId: number) => void;
  onCopy: () => void;
  onReformat: (recordId: number) => void;
};

function renderDetail(params: ReportsTabParams) {
  if (params.reportDetailLoading) {
    return html`<div class="muted">${t("agents.reports.detailLoading")}</div>`;
  }
  if (!params.reportDetail) {
    return html`<div class="muted">${t("agents.reports.detailEmpty")}</div>`;
  }
  if (!params.reportDetail.report_md) {
    return html`
      <div class="callout info">
        <div>${t("agents.reports.detailNoMd")}</div>
        <div style="margin-top: 8px;">
          <button class="btn btn--sm" @click=${() => params.onReformat(params.reportDetail!.id)}>
            ${t("agents.reports.reformatBtn")}
          </button>
        </div>
      </div>
    `;
  }
  return html`
    <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
      <button class="btn btn--sm primary" @click=${params.onCopy}>
        ${params.reportsCopyJustDone ? t("agents.reports.copiedBtn") : t("agents.reports.copyBtn")}
      </button>
    </div>
    <pre
      style="white-space: pre-wrap; word-break: break-word; font-size: 13px; line-height: 1.55; background: var(--surface-2); padding: 12px; border-radius: 8px;"
    >${params.reportDetail.report_md}</pre>
  `;
}

export function renderReportsTab(params: ReportsTabParams) {
  return html`
    <section class="card" style="padding: 0; overflow: hidden;">
      <div style="display: grid; grid-template-columns: minmax(280px, 34%) 1fr; min-height: 520px;">
        <div style="border-right: 1px solid var(--border); display: flex; flex-direction: column;">
          <div style="padding: 12px; border-bottom: 1px solid var(--border);">
            <label class="field" style="margin-bottom: 8px;">
              <span>${t("agents.reports.tokenLabel")}</span>
              <input
                .value=${params.reportsAdminToken}
                placeholder="x-reports-token"
                @input=${(e: Event) => params.onTokenChange((e.target as HTMLInputElement).value)}
              />
            </label>
            <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
              <button class="btn btn--sm" ?disabled=${params.reportsLoading} @click=${params.onRefresh}>
                ${params.reportsLoading ? t("common.loading") : t("common.refresh")}
              </button>
            </div>
            <div style="margin-top: 10px;">
              <div class="label" style="font-size: 12px; margin-bottom: 6px;">${t("agents.reports.tasks")}</div>
              ${
                params.reportsTasks.length === 0
                  ? html`<div class="muted" style="font-size: 13px;">${t("agents.reports.noTasks")}</div>`
                  : html`
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${params.reportsTasks.map(
                          (task) => html`
                            <div
                              class="row"
                              style="justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;"
                            >
                              <span style="font-size: 13px;"
                                >${task.title}
                                <span class="mono" style="opacity: 0.85;">(${task.task_key})</span></span
                              >
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${params.reportsLoading}
                                @click=${() => params.onRun(task.task_key)}
                              >
                                ${t("agents.reports.run")}
                              </button>
                            </div>
                          `,
                        )}
                      </div>
                    `
              }
            </div>
            ${params.reportsError
              ? html`<div class="callout danger" style="margin-top: 8px;">${params.reportsError}</div>`
              : nothing}
          </div>
          <div class="list" style="padding: 8px; overflow: auto;">
            ${params.reportsRecords.length === 0
              ? html`<div class="muted">${t("agents.reports.noRecords")}</div>`
              : params.reportsRecords.map((record) => {
                  const selected = record.id === params.selectedRecordId;
                  const summary = (record.summary_json ?? {}) as Record<string, unknown>;
                  const totalCount = Number(summary.total_order_count ?? 0);
                  const totalAmount = Number(summary.total_sales_amount ?? 0);
                  return html`
                    <button
                      class="list-item"
                      style="text-align: left; width: 100%; border: 1px solid var(--border); margin-bottom: 8px; background: ${selected
                        ? "var(--accent-soft)"
                        : "var(--surface-1)"};"
                      @click=${() => params.onSelectRecord(record.id)}
                    >
                      <div class="list-title">#${record.id} <span class="mono">${record.task_key}</span></div>
                      <div class="list-sub">
                        ${record.started_at?.slice(0, 19) ?? "-"} | ${record.status}
                      </div>
                      <div class="list-sub">
                        ${totalCount} · Rp ${Number.isFinite(totalAmount) ? totalAmount.toLocaleString() : "0"}
                      </div>
                    </button>
                  `;
                })}
          </div>
        </div>
        <div style="padding: 12px; overflow: auto;">${renderDetail(params)}</div>
      </div>
    </section>
  `;
}
