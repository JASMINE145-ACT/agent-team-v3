import { html, nothing } from "lit";
import type { ShortageRecord } from "../types.ts";

export type ProcurementProps = {
  basePath: string;
  loading: boolean;
  error: string | null;
  suggestions: ShortageRecord[];
  approveBusy: boolean;
  approveResult: { approved_count?: number; message?: string } | null;
  onRefresh: () => void;
  onApprove: (item: ShortageRecord) => void;
};

export function renderProcurement(props: ProcurementProps) {
  const {
    loading,
    error,
    suggestions,
    approveBusy,
    approveResult,
    onRefresh,
    onApprove,
  } = props;

  return html`
    <section class="grid grid-cols-2">
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">采购建议</div>
        <div class="card-sub">基于缺货数据库生成采购建议，批准后落库并发送邮件给采购员。</div>
        <div style="margin-top: 12px;">
          <button class="btn" ?disabled=${loading} @click=${onRefresh}>
            ${loading ? "加载中…" : "刷新列表"}
          </button>
          ${error ? html`<span class="muted" style="margin-left: 8px;">${error}</span>` : nothing}
        </div>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">缺货产品列表（可批准为采购）</div>
        <div class="card-sub">点击「批准」将该项写入采购批准并通知采购员。</div>
        ${loading && suggestions.length === 0
          ? html`<p class="muted" style="margin-top: 12px;">加载中…</p>`
          : suggestions.length === 0
            ? html`<p class="muted" style="margin-top: 12px;">暂无缺货产品，无采购建议。</p>`
            : html`
                <div style="overflow-x: auto; margin-top: 12px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">产品名称</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">规格</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">缺口</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">物料编号</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">被报缺货次数</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${suggestions.map(
                        (s) => html`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.product_name ?? "—"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.specification ?? "—"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.shortfall ?? 0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.code ?? "—"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.count ?? 0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${approveBusy}
                                @click=${() => onApprove(s)}
                              >
                                ${approveBusy ? "批准中…" : "批准"}
                              </button>
                            </td>
                          </tr>
                        `,
                      )}
                    </tbody>
                  </table>
                </div>
              `}
      </div>

      ${approveResult
        ? html`
            <div class="card" style="grid-column: 1 / -1;">
              <div class="card-sub">${approveResult.approved_count != null ? `已批准 ${approveResult.approved_count} 条。` : ""} ${approveResult.message ?? ""}</div>
            </div>
          `
        : nothing}
    </section>
  `;
}
