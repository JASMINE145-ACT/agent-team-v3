import { html, nothing } from "lit";
import type { QuotationDraftListItem, QuotationDraftDetail } from "../types.ts";

export type FulfillProps = {
  basePath: string;
  loading: boolean;
  error: string | null;
  drafts: QuotationDraftListItem[];
  detail: QuotationDraftDetail | null;
  detailId: number | null;
  confirmBusy: boolean;
  confirmResult: { order_id?: string; message?: string } | null;
  onRefresh: () => void;
  onSelectDraft: (draftId: number) => void;
  onConfirm: (draftId: number) => void;
  onClearDetail: () => void;
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso ?? "—";
  }
}

export function renderFulfill(props: FulfillProps) {
  const {
    loading,
    error,
    drafts,
    detail,
    detailId,
    confirmBusy,
    confirmResult,
    onRefresh,
    onSelectDraft,
    onConfirm,
    onClearDetail,
  } = props;

  return html`
    <section class="grid grid-cols-2">
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">待确认报价单</div>
        <div class="card-sub">从云端拉取已落库的待确认报价单，确认成单后转订单与锁库。</div>
        <div style="margin-top: 12px;">
          <button class="btn" ?disabled=${loading} @click=${onRefresh}>
            ${loading ? "加载中…" : "刷新列表"}
          </button>
          ${error ? html`<span class="muted" style="margin-left: 8px;">${error}</span>` : nothing}
        </div>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">列表</div>
        <div class="card-sub">点击一行查看明细，再点击「确认成单」完成闭环。</div>
        ${loading && drafts.length === 0
          ? html`<p class="muted" style="margin-top: 12px;">加载中…</p>`
          : drafts.length === 0
            ? html`<p class="muted" style="margin-top: 12px;">暂无待确认报价单。</p>`
            : html`
                <div style="overflow-x: auto; margin-top: 12px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">编号</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">名称</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">来源</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">创建时间</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${drafts.map(
                        (d) => html`
                          <tr
                            style="cursor: pointer; ${detailId === d.id ? "background: var(--bg-secondary, #f5f5f5);" : ""}"
                            @click=${() => onSelectDraft(d.id)}
                          >
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${d.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${d.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${d.source ?? "—"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${formatDate(d.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${confirmBusy}
                                @click=${(e: Event) => {
                                  e.stopPropagation();
                                  onConfirm(d.id);
                                }}
                              >
                                ${confirmBusy && detailId === d.id ? "确认中…" : "确认成单"}
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

      ${detail
        ? html`
            <div class="card" style="grid-column: 1 / -1;">
              <div class="card-title">报价单明细 · ${detail.draft_no}</div>
              <div class="card-sub">${detail.name}</div>
              <div style="margin-top: 8px;">
                <button class="btn" style="font-size: 12px;" @click=${onClearDetail}>关闭明细</button>
              </div>
              <div style="overflow-x: auto; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">序号</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">产品名称</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">规格</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">数量</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">物料编号</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">报价名称</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">单价</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">金额</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">可用库存</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">缺口</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">缺货</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(detail.lines ?? []).map(
                      (line, i) => html`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${i + 1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.product_name ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.specification ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.qty ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.code ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.quote_name ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.unit_price ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.amount ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.available_qty ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.shortfall ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.is_shortage ? "是" : "否"}</td>
                        </tr>
                      `,
                    )}
                  </tbody>
                </table>
              </div>
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${confirmBusy}
                  @click=${() => onConfirm(detail.id)}
                >
                  ${confirmBusy ? "确认中…" : "确认成单"}
                </button>
              </div>
            </div>
          `
        : nothing}

      ${confirmResult
        ? html`
            <div class="card" style="grid-column: 1 / -1;">
              <div class="card-sub">${confirmResult.order_id ? `订单号：${confirmResult.order_id}` : ""} ${confirmResult.message ?? ""}</div>
            </div>
          `
        : nothing}
    </section>
  `;
}
