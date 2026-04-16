import { html, nothing } from "lit";
import type {
  AdminDataHost,
  AdminDataState,
  LibraryMeta,
  MappingRow,
  PriceRow,
} from "../controllers/admin-data.types.ts";

export type AdminDataViewProps = {
  host: AdminDataHost;
  onLogin: (password: string) => void;
  onLogout: () => void;
  onSubTab: (tab: "price" | "mapping" | "library") => void;
  onLibraryTab: () => void;
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
  onLibraryUpload: (file: File, name: string) => void;
  onLibraryView: (id: number) => void;
  onLibraryBack: () => void;
  onLibraryQueryInput: (q: string) => void;
  onLibraryQueryApply: (libId: number) => void;
  onLibraryRefresh: (libId: number) => void;
  onLibraryFieldChange: (index: number, key: string, value: unknown) => void;
  onLibrarySave: (libId: number, index: number) => void;
  onLibraryDeleteRow: (libId: number, rowId: number) => void;
  onLibraryAddRow: (libId: number) => void;
  onLibraryDrop: (libId: number) => void;
  onLibraryWarningsDismiss: () => void;
};

function numOrNull(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function renderLogin(props: AdminDataViewProps) {
  const s = props.host.adminData;
  return html`
    <form
      class="admin-login"
      @submit=${(e: Event) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const pw = (form.elements.namedItem("admin-password") as HTMLInputElement | null)?.value ?? "";
        props.onLogin(pw);
      }}
    >
      <h2 class="admin-login__title">数据管理 — 登录</h2>
      <input
        name="admin-password"
        type="password"
        class="admin-input"
        placeholder="管理员密码"
      />
      ${s.loginError ? html`<p class="admin-err">${s.loginError}</p>` : nothing}
      <button type="submit" class="admin-btn admin-btn--primary" ?disabled=${s.loginLoading}>
        ${s.loginLoading ? "登录中…" : "登录"}
      </button>
    </form>
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
        <button
          type="button"
          class="admin-subtab ${s.activeSubTab === "library" ? "is-active" : ""}"
          @click=${props.onLibraryTab}
        >
          自定义库
        </button>
      </div>
      ${s.activeSubTab === "price"
        ? renderPrice(props)
        : s.activeSubTab === "mapping"
          ? renderMapping(props)
          : renderCustomLibraries(props)}
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
        ${renderUpload("上传 Excel（全表替换）", s.priceUploading, (file) => {
          if (confirm("将用上传文件全表替换万鼎价格库，确认？")) props.onPriceUpload(file);
        })}
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
        ${renderUpload("上传 Excel（全表替换）", s.mappingUploading, (file) => {
          if (confirm("将用上传文件全表替换产品映射表，确认？")) props.onMappingUpload(file);
        })}
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

function renderUploadLibraryDialog(props: AdminDataViewProps) {
  const s = props.host.adminData;
  return html`
    <div class="admin-row" style="gap:8px;flex-wrap:wrap;">
      <input
        data-library-name-input="true"
        type="text"
        class="admin-input"
        placeholder="库名（可选，默认文件名）"
        style="width:180px"
      />
      <label class="admin-upload">
        <input
          type="file"
          accept=".xlsx,.csv"
          ?disabled=${s.libraryUploading}
          @change=${(e: Event) => {
            const input = e.target as HTMLInputElement;
            const f = input.files?.[0];
            const row = input.closest(".admin-row");
            const nameInput = row?.querySelector<HTMLInputElement>('[data-library-name-input="true"]');
            const libName = nameInput?.value?.trim() ?? "";
            if (f) props.onLibraryUpload(f, libName || f.name.replace(/\.[^.]+$/, ""));
            input.value = "";
          }}
        />
        <span>${s.libraryUploading ? "上传中…" : "上传新库 (.xlsx/.csv)"}</span>
      </label>
    </div>
  `;
}

function renderCustomLibraries(props: AdminDataViewProps) {
  const s = props.host.adminData;
  const activeLib =
    s.activeLibraryId != null ? s.libraries.find((l) => l.id === s.activeLibraryId) ?? null : null;

  return html`
    <div class="admin-block">
      ${s.libraryUploadWarnings.length > 0
        ? html`<div class="admin-warn-bar">
            <strong>上传警告（数据已导入）：</strong>
            <ul>
              ${s.libraryUploadWarnings.map((w) => html`<li>${w}</li>`)}
            </ul>
            <button type="button" class="admin-btn admin-btn--sm" @click=${props.onLibraryWarningsDismiss}>
              知道了
            </button>
          </div>`
        : nothing}
      ${s.librariesError ? html`<p class="admin-err">${s.librariesError}</p>` : nothing}

      ${activeLib == null ? renderLibraryList(props) : renderLibraryDetail(props, activeLib)}
    </div>
  `;
}

function renderLibraryList(props: AdminDataViewProps) {
  const s = props.host.adminData;
  return html`
    <div class="admin-row" style="margin-bottom:12px;">
      ${renderUploadLibraryDialog(props)}
    </div>
    ${s.librariesLoading ? html`<p class="admin-muted">加载中…</p>` : nothing}
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>库名</th>
            <th>列数</th>
            <th>行数</th>
            <th>上传时间</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${s.libraries.length === 0 && !s.librariesLoading
            ? html`<tr>
                <td colspan="5" class="admin-muted" style="text-align:center">暂无自定义库，点击上传新库</td>
              </tr>`
            : s.libraries.map(
                (lib) => html`
                  <tr>
                    <td>${lib.name}</td>
                    <td>${lib.columns.length}</td>
                    <td>${lib.row_count.toLocaleString()}</td>
                    <td>${lib.created_at.slice(0, 10)}</td>
                    <td class="admin-actions">
                      <button type="button" class="admin-btn admin-btn--sm" @click=${() => props.onLibraryView(lib.id)}>
                        查看
                      </button>
                      <button
                        type="button"
                        class="admin-btn admin-btn--sm admin-btn--danger"
                        @click=${() => {
                          if (confirm(`确认删除库「${lib.name}」及其所有数据？此操作不可恢复。`)) {
                            props.onLibraryDrop(lib.id);
                          }
                        }}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                `,
              )}
        </tbody>
      </table>
    </div>
  `;
}

function renderLibraryDetail(props: AdminDataViewProps, lib: LibraryMeta) {
  const s = props.host.adminData;
  return html`
    <div class="admin-row" style="margin-bottom:8px;">
      <button type="button" class="admin-btn admin-btn--ghost" @click=${props.onLibraryBack}>← 返回</button>
      <strong style="margin-left:8px;">${lib.name}</strong>
      <span class="admin-muted" style="margin-left:8px;">${lib.columns.length} 列 · ${s.libraryDataTotal} 行</span>
      <input
        type="search"
        class="admin-input admin-input--grow"
        style="margin-left:auto;"
        placeholder="搜索（仅文本列）"
        .value=${s.libraryDataQuery}
        @input=${(e: Event) => props.onLibraryQueryInput((e.target as HTMLInputElement).value)}
      />
      <button type="button" class="admin-btn" @click=${() => props.onLibraryQueryApply(lib.id)}>应用筛选</button>
      <button type="button" class="admin-btn" @click=${() => props.onLibraryRefresh(lib.id)}>刷新</button>
      <button type="button" class="admin-btn admin-btn--primary" @click=${() => props.onLibraryAddRow(lib.id)}>
        + 新增一行
      </button>
    </div>
    ${s.libraryDataError ? html`<p class="admin-err">${s.libraryDataError}</p>` : nothing}
    ${s.libraryDataLoading ? html`<p class="admin-muted">加载中…</p>` : nothing}
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            ${lib.columns.map((col) => html`<th title=${col.original_name}>${col.name}</th>`)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${s.libraryData.map(
            (row, index) => html`
              <tr>
                ${lib.columns.map(
                  (col) => html`
                    <td>
                      <input
                        class="admin-cell ${col.type === "NUMERIC" ? "admin-cell--num" : ""}"
                        .value=${row[col.name] != null ? String(row[col.name]) : ""}
                        @input=${(e: Event) =>
                          props.onLibraryFieldChange(
                            index,
                            col.name,
                            col.type === "NUMERIC"
                              ? numOrNull((e.target as HTMLInputElement).value)
                              : (e.target as HTMLInputElement).value,
                          )}
                      />
                    </td>
                  `,
                )}
                <td class="admin-actions">
                  <button type="button" class="admin-btn admin-btn--sm" @click=${() => props.onLibrarySave(lib.id, index)}>
                    保存
                  </button>
                  ${row.id != null
                    ? html`<button
                        type="button"
                        class="admin-btn admin-btn--sm admin-btn--danger"
                        @click=${() => {
                          if (confirm("确认删除此行？")) props.onLibraryDeleteRow(lib.id, row.id as number);
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
  `;
}
