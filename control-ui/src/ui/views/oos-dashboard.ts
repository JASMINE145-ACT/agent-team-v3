import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
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
          <div class="card-title">${t("oos.title")}</div>
          <div class="card-sub">${t("oos.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${props.loading} @click=${props.onRefresh}>
          ${props.loading ? t("oos.actions.loading") : t("oos.actions.refresh")}
        </button>
      </div>
      ${props.db === "sqlite"
        ? html`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${t("oos.db.local")}
          </div>`
        : nothing}
      ${props.error ? html`<div class="callout danger" style="margin-top: 12px;">${props.error}</div>` : nothing}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${props.stats
          ? renderStatsCards(props.stats)
          : props.loading
            ? nothing
            : html`<div class="muted">${t("oos.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${t("oos.list.title")}</div>
          ${props.onOpenAddForm && !props.showAddForm
            ? html`<button class="btn btn--primary" ?disabled=${props.loading} @click=${props.onOpenAddForm}>${t(
                "oos.actions.addManual",
              )}</button>`
            : nothing}
        </div>
        ${props.showAddForm && props.onAdd && props.onCloseAddForm
          ? html`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">${t("oos.addForm.title")}</div>
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
                    <input
                      name="oos_add_name"
                      type="text"
                      placeholder=${t("oos.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="oos_add_spec"
                      type="text"
                      placeholder=${t("oos.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="oos_add_qty"
                      type="number"
                      placeholder=${t("oos.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                    />
                    <input
                      name="oos_add_unit"
                      type="text"
                      placeholder=${t("oos.addForm.unitPlaceholder")}
                      style="width: 60px;"
                    />
                    <button type="submit" class="btn btn--primary">
                      ${t("oos.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${props.onCloseAddForm}>
                      ${t("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `
          : nothing}
        <div class="list" style="margin-top: 8px;">
          ${props.list.length === 0
            ? html`<div class="muted">${t("oos.empty.list")}</div>`
            : props.list.slice(0, 50).map((r) => renderProductRow(r, props.onDelete))}
        </div>
        ${props.list.length > 50
          ? html`<div class="muted" style="margin-top: 8px;">
              ${t("oos.list.more", { count: String(props.list.length) })}
            </div>`
          : nothing}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${t("oos.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${props.byFile.length === 0
              ? html`<div class="muted">${t("oos.byFile.empty")}</div>`
              : props.byFile.slice(0, 10).map((f) => renderByFileRow(f))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${t("oos.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${props.byTime.length === 0
              ? html`<div class="muted">${t("oos.byTime.empty")}</div>`
              : props.byTime.slice(0, 10).map((r) => renderByTimeRow(r))}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStatsCards(s: OosStats) {
  const cards = [
    { label: t("oos.stats.totalRecords"), value: s.total_records },
    { label: t("oos.stats.outOfStockCount"), value: s.out_of_stock_count },
    { label: t("oos.stats.today"), value: s.today_count },
    { label: t("oos.stats.reportedGe2"), value: s.notified_count },
    { label: t("oos.stats.emailSentProductCount"), value: s.email_sent_product_count },
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
  const emailLabel = emailSent ? t("oos.email.sent") : t("oos.email.notSent");
  const productKey = r.product_key ?? "";
  return html`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${name} ${spec}</div>
        <div class="list-sub">
          ${t("oos.list.meta", {
            qty: String(qty),
            unit,
            count: String(count),
            email: emailLabel,
          })}
        </div>
      </div>
      ${onDelete && productKey
        ? html`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${t("oos.actions.deleteHint")}
            @click=${() => onDelete(productKey)}
          >
            ${t("oos.actions.delete")}
          </button>`
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
        <div class="list-sub">
          ${t("oos.byFile.count", { count: String(total) })}${at ? ` · ${at}` : ""}
        </div>
      </div>
    </div>
  `;
}

function renderByTimeRow(r: OosByTimeRow) {
  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${r.date ?? ""}</div>
        <div class="list-sub">
          ${t("oos.byTime.count", { count: String(r.count ?? 0) })}
        </div>
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
          <div class="card-title">${t("shortage.title")}</div>
          <div class="card-sub">${t("shortage.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${props.loading} @click=${props.onRefresh}>
          ${props.loading ? t("shortage.actions.loading") : t("shortage.actions.refresh")}
        </button>
      </div>
      ${props.db === "sqlite"
        ? html`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${t("shortage.db.local")}
          </div>`
        : nothing}
      ${props.error ? html`<div class="callout danger" style="margin-top: 12px;">${props.error}</div>` : nothing}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${props.stats
          ? renderShortageStatsCards(props.stats)
          : props.loading
            ? nothing
            : html`<div class="muted">${t("shortage.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${t("shortage.list.title")}</div>
          ${props.onOpenAddForm && !props.showAddForm
            ? html`<button class="btn btn--primary" ?disabled=${props.loading} @click=${props.onOpenAddForm}>${t(
                "shortage.actions.addManual",
              )}</button>`
            : nothing}
        </div>
        ${props.showAddForm && props.onAdd && props.onCloseAddForm
          ? html`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">
                  ${t("shortage.addForm.title")}
                </div>
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
                    <input
                      name="shortage_add_name"
                      type="text"
                      placeholder=${t("shortage.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="shortage_add_spec"
                      type="text"
                      placeholder=${t("shortage.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="shortage_add_qty"
                      type="number"
                      placeholder=${t("shortage.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${t("shortage.addForm.qtyTitle")}
                    />
                    <input
                      name="shortage_add_avail"
                      type="number"
                      placeholder=${t("shortage.addForm.availPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${t("shortage.addForm.availTitle")}
                    />
                    <span
                      class="muted"
                      style="font-size: 0.9rem;"
                      title=${t("shortage.addForm.diffTitle")}
                    >
                      ${t("shortage.addForm.diffText")}
                    </span>
                    <button type="submit" class="btn btn--primary">
                      ${t("shortage.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${props.onCloseAddForm}>
                      ${t("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `
          : nothing}
        <div class="list" style="margin-top: 8px;">
          ${props.list.length === 0
            ? html`<div class="muted">${t("shortage.empty.list")}</div>`
            : props.list.slice(0, 50).map((r) => renderShortageProductRow(r, props.onDelete))}
        </div>
        ${props.list.length > 50
          ? html`<div class="muted" style="margin-top: 8px;">
              ${t("shortage.list.more", { count: String(props.list.length) })}
            </div>`
          : nothing}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${t("shortage.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${props.byFile.length === 0
              ? html`<div class="muted">${t("shortage.byFile.empty")}</div>`
              : props.byFile.slice(0, 10).map((f) => renderShortageByFileRow(f))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${t("shortage.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${props.byTime.length === 0
              ? html`<div class="muted">${t("shortage.byTime.empty")}</div>`
              : props.byTime.slice(0, 10).map((r) => renderShortageByTimeRow(r))}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderShortageStatsCards(s: ShortageStats) {
  const cards = [
    { label: t("shortage.stats.totalRecords"), value: s.total_records },
    { label: t("shortage.stats.shortageProductCount"), value: s.shortage_product_count },
    { label: t("shortage.stats.today"), value: s.today_count },
    { label: t("shortage.stats.reportedGe2"), value: s.reported_ge2_count },
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
        <div class="list-sub">
          ${t("shortage.list.meta", {
            qty: String(qty),
            avail: String(avail),
            diff: String(shortfall),
            count: String(count),
          })}
        </div>
      </div>
      ${onDelete && productKey
        ? html`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${t("shortage.actions.deleteHint")}
            @click=${() => onDelete(productKey)}
          >
            ${t("shortage.actions.delete")}
          </button>`
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
        <div class="list-sub">
          ${t("shortage.byFile.count", { count: String(total) })}${at ? ` · ${at}` : ""}
        </div>
      </div>
    </div>
  `;
}

function renderShortageByTimeRow(r: ShortageByTimeRow) {
  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${r.date ?? ""}</div>
        <div class="list-sub">
          ${t("shortage.byTime.count", { count: String(r.count ?? 0) })}
        </div>
      </div>
    </div>
  `;
}
