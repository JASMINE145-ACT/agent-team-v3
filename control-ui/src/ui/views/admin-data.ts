import { html, nothing } from "lit";
import type { AdminDataHost, AdminDataState, PriceRow } from "../controllers/admin-data.types.ts";

export type AdminDataViewProps = {
  host: AdminDataHost;
  onLogin: (password: string) => void;
  onLogout: () => void;
  onSubTab: (tab: "price" | "mapping") => void;
  onPriceQueryApply: () => void;
  onPriceQueryInput: (q: string) => void;
  onPriceRefresh: () => void;
  onPriceFieldChange: (index: number, patch: Partial<PriceRow>) => void;
  onPriceSave: (index: number) => void;
  onPriceDelete: (id: number) => void;
  onPriceUpload: (file: File) => void;
  onPriceAddRow: () => void;
  onMappingQueryApply: () => void;
  onMappingQueryInput: (q: string) => void;
  onMappingRefresh: () => void;
  onMappingFieldChange: (index: number, patch: Partial<MappingRow>) => void;
  onMappingSave: (index: number) => void;
  onMappingDelete: (id: number) => void;
  onMappingUpload: (file: File) => void;
  onMappingAddRow: () => void;
};

function numOrNull(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function renderLogin(props: AdminDataViewProps) {
  const s = props.host.adminData;
  let pw = "";
  return html`
    <div class="admin-login">
      <h2 class="admin-login__title">数据管理 — 登录</h2>
      <input
        type="password"
        class="admin-input"
        placeholder="管理员密码"
        @input=${(e: Event) => {
          pw = (e.target as HTMLInputElement).value;
        }}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter") props.onLogin(pw);
        }}
      />
      ${s.loginError ? html`<p class="admin-err">${s.loginError}</p>` : nothing}
      <button
        class="admin-btn admin-btn--primary"
        ?disabled=${s.loginLoading}
        @click=${() => props.onLogin(pw)}
      >
        ${s.loginLoading ? "登录中…" : "登录"}
      </button>
    </div>
  `;
}

function renderUpload(label: string, busy: boolean, onFile: (f: File) => void) {
  return html`
    <label class="admin-upload">
      <input
        type="file"
        accept=".xlsx"
        ?disabled=${busy}
        @change=${(e: Event) => {
          const f = (e.target as HTMLInputElement).files?.[0];
          if (f) onFile(f);
          (e.target as HTMLInputElement).value = "";
        }}
      />
      <span>${busy ? "上传中…" : label}</span>
    </label>
  `;
}

export function renderAdminData(props: AdminDataViewProps) {
  const s = props.host.adminData;
  if (!s.token) {
    return html`<section class="admin-panel">${renderLogin(props)}</section>`;
  }

  return html`
    <section class="admin-panel">
      <div class="admin-toolbar">
        <h2 class="admin-title">数据管理</h2>
        <button class="admin-btn admin-btn--ghost" type="button" @click=${props.onLogout}>退出登录</button>
      </div>
      <div class="admin-subtabs" role="tablist">
        <button
          type="button"
          class="admin-subtab ${s.activeSubTab === "price" ? "is-active" : ""}"
          @click=${() => props.onSubTab("price")}
        >
          万鼎价格库
        </button>
        <button
          type="button"
          class="admin-subtab ${s.activeSubTab === "mapping" ? "is-active" : ""}"
          @click=${() => props.onSubTab("mapping")}
        >
          产品映射表
        </button>
      </div>
      ${s.activeSubTab === "price" ? renderPrice(props) : renderMapping(props)}
    </section>
  `;
}

function renderPrice(props: AdminDataViewProps) {
  const s = props.host.adminData;
  return html`
    <div class="admin-block">
      <div class="admin-row">
        <input
          type="search"
          class="admin-input admin-input--grow"
          placeholder="搜索料号 / 描述"
          .value=${s.priceQuery}
          @input=${(e: Event) => props.onPriceQueryInput((e.target as HTMLInputElement).value)}
        />
        <button type="button" class="admin-btn" @click=${props.onPriceQueryApply}>应用筛选</button>
        <button type="button" class="admin-btn" @click=${props.onPriceRefresh}>刷新</button>
        ${renderUpload("上传 Excel（全表替换）", s.priceUploading, props.onPriceUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${props.onPriceAddRow}>+ 新增一行</button>
      </div>
      ${s.priceError ? html`<p class="admin-err">${s.priceError}</p>` : nothing}
      ${s.priceLoading ? html`<p class="admin-muted">加载中…</p>` : nothing}
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>料号</th>
              <th>描述</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${s.priceItems.map(
              (row, index) => html`
                <tr>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${row.material}
                      @input=${(e: Event) =>
                        props.onPriceFieldChange(index, {
                          material: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${row.description}
                      @input=${(e: Event) =>
                        props.onPriceFieldChange(index, {
                          description: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </td>
                  ${(["price_a", "price_b", "price_c", "price_d"] as const).map(
                    (k) => html`
                      <td>
                        <input
                          class="admin-cell admin-cell--num"
                          .value=${row[k] ?? ""}
                          @input=${(e: Event) =>
                            props.onPriceFieldChange(index, {
                              [k]: numOrNull((e.target as HTMLInputElement).value),
                            } as Partial<PriceRow>)}
                        />
                      </td>
                    `,
                  )}
                  <td class="admin-actions">
                    <button type="button" class="admin-btn admin-btn--sm" @click=${() => props.onPriceSave(index)}>
                      保存
                    </button>
                    ${row.id != null
                      ? html`<button
                          type="button"
                          class="admin-btn admin-btn--sm admin-btn--danger"
                          @click=${() => {
                            if (confirm("确认删除此行？")) props.onPriceDelete(row.id!);
                          }}
                        >
                          删除
                        </button>`
                      : nothing}
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${s.priceTotal} 行（当前页 ${s.priceItems.length} 条）</p>
    </div>
  `;
}

function renderMapping(props: AdminDataViewProps) {
  const s = props.host.adminData;
  return html`
    <div class="admin-block">
      <div class="admin-row">
        <input
          type="search"
          class="admin-input admin-input--grow"
          placeholder="搜索询价名称 / 编号 / 报价名"
          .value=${s.mappingQuery}
          @input=${(e: Event) => props.onMappingQueryInput((e.target as HTMLInputElement).value)}
        />
        <button type="button" class="admin-btn" @click=${props.onMappingQueryApply}>应用筛选</button>
        <button type="button" class="admin-btn" @click=${props.onMappingRefresh}>刷新</button>
        ${renderUpload("上传 Excel（全表替换）", s.mappingUploading, props.onMappingUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${props.onMappingAddRow}>+ 新增一行</button>
      </div>
      ${s.mappingError ? html`<p class="admin-err">${s.mappingError}</p>` : nothing}
      ${s.mappingLoading ? html`<p class="admin-muted">加载中…</p>` : nothing}
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>询价名称</th>
              <th>规格</th>
              <th>产品编号</th>
              <th>报价名称</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${s.mappingItems.map(
              (row, index) => html`
                <tr>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${row.inquiry_name}
                      @input=${(e: Event) =>
                        props.onMappingFieldChange(index, {
                          inquiry_name: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${row.spec}
                      @input=${(e: Event) =>
                        props.onMappingFieldChange(index, { spec: (e.target as HTMLInputElement).value })}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${row.product_code}
                      @input=${(e: Event) =>
                        props.onMappingFieldChange(index, {
                          product_code: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${row.quotation_name}
                      @input=${(e: Event) =>
                        props.onMappingFieldChange(index, {
                          quotation_name: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </td>
                  <td class="admin-actions">
                    <button type="button" class="admin-btn admin-btn--sm" @click=${() => props.onMappingSave(index)}>
                      保存
                    </button>
                    ${row.id != null
                      ? html`<button
                          type="button"
                          class="admin-btn admin-btn--sm admin-btn--danger"
                          @click=${() => {
                            if (confirm("确认删除此行？")) props.onMappingDelete(row.id!);
                          }}
                        >
                          删除
                        </button>`
                      : nothing}
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${s.mappingTotal} 行（当前页 ${s.mappingItems.length} 条）</p>
    </div>
  `;
}
