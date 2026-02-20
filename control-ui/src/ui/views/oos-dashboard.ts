import { html, nothing } from "lit";
import type { OosStats, OosRecord, OosByFileRow, OosByTimeRow } from "../types.ts";

export type OosDashboardProps = {
  loading: boolean;
  error: string | null;
  stats: OosStats | null;
  list: OosRecord[];
  byFile: OosByFileRow[];
  byTime: OosByTimeRow[];
  onRefresh: () => void;
};

export function renderOosDashboard(props: OosDashboardProps) {
  return html`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">无货看板</div>
          <div class="card-sub">总览与无货产品列表，无需向 Agent 提问即可查看。</div>
        </div>
        <button class="btn" ?disabled=${props.loading} @click=${props.onRefresh}>
          ${props.loading ? "加载中…" : "刷新"}
        </button>
      </div>
      ${props.error ? html`<div class="callout danger" style="margin-top: 12px;">${props.error}</div>` : nothing}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${props.stats ? renderStatsCards(props.stats) : props.loading ? nothing : html`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="card-title" style="font-size: 1rem;">无货产品列表</div>
        <div class="list" style="margin-top: 8px;">
          ${props.list.length === 0
            ? html`<div class="muted">暂无无货产品记录。</div>`
            : props.list.slice(0, 50).map((r) => renderProductRow(r))}
        </div>
        ${props.list.length > 50 ? html`<div class="muted" style="margin-top: 8px;">共 ${props.list.length} 个无货产品，仅展示前 50 个</div>` : nothing}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${props.byFile.length === 0
              ? html`<div class="muted">暂无</div>`
              : props.byFile.slice(0, 10).map((f) => renderByFileRow(f))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${props.byTime.length === 0
              ? html`<div class="muted">暂无</div>`
              : props.byTime.slice(0, 10).map((r) => renderByTimeRow(r))}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStatsCards(s: OosStats) {
  const cards = [
    { label: "总记录数", value: s.total_records },
    { label: "无货产品数", value: s.out_of_stock_count },
    { label: "今日新增", value: s.today_count },
    { label: "被报无货≥2 次", value: s.notified_count },
    { label: "已发邮件产品数", value: s.email_sent_product_count },
  ];
  return cards.map(
    (c) => html`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${c.value}</div>
        <div class="stat-label">${c.label}</div>
      </div>
    `,
  );
}

function renderProductRow(r: OosRecord) {
  const name = r.product_name ?? "";
  const spec = r.specification ?? "";
  const unit = r.unit ?? "";
  const qty = r.quantity ?? "";
  const count = r.count ?? 1;
  const emailSent = (r.email_sent_count ?? 0) > 0 || r.email_status === "sent";
  const emailLabel = emailSent ? "已发送" : "未发";
  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${name} ${spec}</div>
        <div class="list-sub">数量: ${String(qty)} ${unit} · 被报无货 ${count} 次 · 邮件: ${emailLabel}</div>
      </div>
    </div>
  `;
}

function renderByFileRow(f: OosByFileRow) {
  const name = f.file_name ?? "";
  const total = f.total_records ?? 0;
  const at = f.uploaded_at ? (String(f.uploaded_at).length > 19 ? String(f.uploaded_at).slice(0, 10) + " " + String(f.uploaded_at).slice(11, 19) : String(f.uploaded_at)) : "";
  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${name}</div>
        <div class="list-sub">记录数: ${total}${at ? ` · ${at}` : ""}</div>
      </div>
    </div>
  `;
}

function renderByTimeRow(r: OosByTimeRow) {
  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${r.date ?? ""}</div>
        <div class="list-sub">新增: ${r.count ?? 0}</div>
      </div>
    </div>
  `;
}
