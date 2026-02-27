import { html, nothing } from "lit";
import type {
  OosStats,
  OosRecord,
  OosByFileRow,
  OosByTimeRow,
  ShortageStats,
  ShortageRecord,
  ShortageByFileRow,
  ShortageByTimeRow,
} from "../types.ts";
import type { OosAddRecord, ShortageAddRecord } from "../controllers/oos.ts";

export type OosDashboardProps = {
  loading: boolean;
  error: string | null;
  stats: OosStats | null;
  list: OosRecord[];
  byFile: OosByFileRow[];
  byTime: OosByTimeRow[];
  /** 无货库：postgres | sqlite，sqlite 时显示「当前使用本地数据库」 */
  db?: "postgres" | "sqlite" | null;
  onRefresh: () => void;
  onDelete?: (productKey: string) => void;
  showAddForm?: boolean;
  onOpenAddForm?: () => void;
  onCloseAddForm?: () => void;
  onAdd?: (record: OosAddRecord) => Promise<boolean>;
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
      ${props.db === "sqlite"
        ? html`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`
        : nothing}
      ${props.error ? html`<div class="callout danger" style="margin-top: 12px;">${props.error}</div>` : nothing}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${props.stats ? renderStatsCards(props.stats) : props.loading ? nothing : html`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">无货产品列表</div>
          ${props.onOpenAddForm && !props.showAddForm
            ? html`<button class="btn btn--primary" ?disabled=${props.loading} @click=${props.onOpenAddForm}>手动新增</button>`
            : nothing}
        </div>
        ${props.showAddForm && props.onAdd && props.onCloseAddForm
          ? html`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增无货记录</div>
                <form @submit=${async (e: Event) => {
                  e.preventDefault();
                  const form = (e.target as HTMLFormElement);
                  const name = (form.querySelector('[name="oos_add_name"]') as HTMLInputElement)?.value?.trim() ?? "";
                  if (!name) return;
                  const ok = await props.onAdd!({
                    product_name: name,
                    specification: (form.querySelector('[name="oos_add_spec"]') as HTMLInputElement)?.value?.trim() ?? "",
                    quantity: parseFloat((form.querySelector('[name="oos_add_qty"]') as HTMLInputElement)?.value ?? "0") || 0,
                    unit: (form.querySelector('[name="oos_add_unit"]') as HTMLInputElement)?.value?.trim() ?? "",
                  });
                  if (ok) props.onCloseAddForm!();
                }}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input name="oos_add_name" type="text" placeholder="产品名称（必填）" required style="min-width: 140px;" />
                    <input name="oos_add_spec" type="text" placeholder="规格" style="min-width: 80px;" />
                    <input name="oos_add_qty" type="number" placeholder="数量" min="0" step="1" value="0" style="width: 80px;" />
                    <input name="oos_add_unit" type="text" placeholder="单位" style="width: 60px;" />
                    <button type="submit" class="btn btn--primary">确定</button>
                    <button type="button" class="btn" @click=${props.onCloseAddForm}>取消</button>
                  </div>
                </form>
              </div>
            `
          : nothing}
        <div class="list" style="margin-top: 8px;">
          ${props.list.length === 0
            ? html`<div class="muted">暂无无货产品记录。</div>`
            : props.list.slice(0, 50).map((r) => renderProductRow(r, props.onDelete))}
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

function renderProductRow(r: OosRecord, onDelete?: (productKey: string) => void) {
  const name = r.product_name ?? "";
  const spec = r.specification ?? "";
  const unit = r.unit ?? "";
  const qty = r.quantity ?? "";
  const count = r.count ?? 1;
  const emailSent = (r.email_sent_count ?? 0) > 0 || r.email_status === "sent";
  const emailLabel = emailSent ? "已发送" : "未发";
  const productKey = r.product_key ?? "";
  return html`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${name} ${spec}</div>
        <div class="list-sub">数量: ${String(qty)} ${unit} · 被报无货 ${count} 次 · 邮件: ${emailLabel}</div>
      </div>
      ${onDelete && productKey
        ? html`<button class="btn" style="flex-shrink: 0;" title="删除该无货产品" @click=${() => onDelete(productKey)}>删除</button>`
        : nothing}
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

// ---------- 缺货记录（与无货同一逻辑：统计、列表、按文件、按时间、删除、手动新增） ----------

export type ShortageBlockProps = {
  loading: boolean;
  error: string | null;
  stats: ShortageStats | null;
  list: ShortageRecord[];
  byFile: ShortageByFileRow[];
  byTime: ShortageByTimeRow[];
  /** 缺货库：postgres | sqlite，sqlite 时显示「当前使用本地数据库」 */
  db?: "postgres" | "sqlite" | null;
  onRefresh: () => void;
  onDelete?: (productKey: string) => void;
  showAddForm?: boolean;
  onOpenAddForm?: () => void;
  onCloseAddForm?: () => void;
  onAdd?: (record: ShortageAddRecord) => Promise<boolean>;
};

export function renderShortageBlock(props: ShortageBlockProps) {
  return html`
    <section class="card" style="margin-top: 24px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">缺货记录</div>
          <div class="card-sub">Work 匹配后库存不足会落库，总览与缺货产品列表。</div>
        </div>
        <button class="btn" ?disabled=${props.loading} @click=${props.onRefresh}>
          ${props.loading ? "加载中…" : "刷新"}
        </button>
      </div>
      ${props.db === "sqlite"
        ? html`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`
        : nothing}
      ${props.error ? html`<div class="callout danger" style="margin-top: 12px;">${props.error}</div>` : nothing}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${props.stats ? renderShortageStatsCards(props.stats) : props.loading ? nothing : html`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">缺货产品列表</div>
          ${props.onOpenAddForm && !props.showAddForm
            ? html`<button class="btn btn--primary" ?disabled=${props.loading} @click=${props.onOpenAddForm}>手动新增</button>`
            : nothing}
        </div>
        ${props.showAddForm && props.onAdd && props.onCloseAddForm
          ? html`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增缺货记录（产品名字、规格、需求、供给；差异自动计算）</div>
                <form @submit=${async (e: Event) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.querySelector('[name="shortage_add_name"]') as HTMLInputElement)?.value?.trim() ?? "";
                  if (!name) return;
                  const qty = parseFloat((form.querySelector('[name="shortage_add_qty"]') as HTMLInputElement)?.value ?? "0") || 0;
                  const avail = parseFloat((form.querySelector('[name="shortage_add_avail"]') as HTMLInputElement)?.value ?? "0") || 0;
                  const ok = await props.onAdd!({
                    product_name: name,
                    specification: (form.querySelector('[name="shortage_add_spec"]') as HTMLInputElement)?.value?.trim() ?? "",
                    quantity: qty,
                    available_qty: avail,
                  });
                  if (ok) props.onCloseAddForm!();
                }}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input name="shortage_add_name" type="text" placeholder="产品名字（必填）" required style="min-width: 140px;" />
                    <input name="shortage_add_spec" type="text" placeholder="规格" style="min-width: 80px;" />
                    <input name="shortage_add_qty" type="number" placeholder="需求" min="0" step="1" value="0" style="width: 80px;" title="需求数量" />
                    <input name="shortage_add_avail" type="number" placeholder="供给" min="0" step="1" value="0" style="width: 80px;" title="可用供给" />
                    <span class="muted" style="font-size: 0.9rem;" title="差异 = 需求 - 供给，提交时自动计算">差异：自动计算</span>
                    <button type="submit" class="btn btn--primary">确定</button>
                    <button type="button" class="btn" @click=${props.onCloseAddForm}>取消</button>
                  </div>
                </form>
              </div>
            `
          : nothing}
        <div class="list" style="margin-top: 8px;">
          ${props.list.length === 0
            ? html`<div class="muted">暂无缺货产品记录。</div>`
            : props.list.slice(0, 50).map((r) => renderShortageProductRow(r, props.onDelete))}
        </div>
        ${props.list.length > 50 ? html`<div class="muted" style="margin-top: 8px;">共 ${props.list.length} 个缺货产品，仅展示前 50 个</div>` : nothing}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${props.byFile.length === 0
              ? html`<div class="muted">暂无</div>`
              : props.byFile.slice(0, 10).map((f) => renderShortageByFileRow(f))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${props.byTime.length === 0
              ? html`<div class="muted">暂无</div>`
              : props.byTime.slice(0, 10).map((r) => renderShortageByTimeRow(r))}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderShortageStatsCards(s: ShortageStats) {
  const cards = [
    { label: "总记录数", value: s.total_records },
    { label: "缺货产品数", value: s.shortage_product_count },
    { label: "今日新增", value: s.today_count },
    { label: "被报缺货≥2 次", value: s.reported_ge2_count },
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

function renderShortageProductRow(r: ShortageRecord, onDelete?: (productKey: string) => void) {
  const name = r.product_name ?? "";
  const spec = r.specification ?? "";
  const qty = r.quantity ?? 0;
  const avail = r.available_qty ?? 0;
  const shortfall = r.shortfall ?? 0;
  const count = r.count ?? 1;
  const productKey = r.product_key ?? "";
  return html`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${name} ${spec ? ` · ${spec}` : ""}</div>
        <div class="list-sub">需求: ${qty} · 供给: ${avail} · 差异: ${shortfall} · 被报缺货 ${count} 次</div>
      </div>
      ${onDelete && productKey
        ? html`<button class="btn" style="flex-shrink: 0;" title="删除该缺货产品" @click=${() => onDelete(productKey)}>删除</button>`
        : nothing}
    </div>
  `;
}

function renderShortageByFileRow(f: ShortageByFileRow) {
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

function renderShortageByTimeRow(r: ShortageByTimeRow) {
  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${r.date ?? ""}</div>
        <div class="list-sub">新增: ${r.count ?? 0}</div>
      </div>
    </div>
  `;
}
