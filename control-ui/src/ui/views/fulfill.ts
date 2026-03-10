import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
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
  filterQuery: string;
  sortBy: "created_at" | "draft_no" | "name";
  sortDir: "asc" | "desc";
  page: number;
  pageSize: number;
  onRefresh: () => void;
  onSelectDraft: (draftId: number) => void;
  onConfirm: (draftId: number) => void;
  onClearDetail: () => void;
  onFilterQueryChange: (value: string) => void;
  onSortByChange: (value: "created_at" | "draft_no" | "name") => void;
  onSortDirChange: (value: "asc" | "desc") => void;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
};

function displayDraftName(raw: string | null | undefined): string {
  const name = (raw ?? "").trim();
  if (!name) return "";
  const fallbackEn = "Untitled quotation";
  const fallbackZh = "未命名报价单";
  if (name === fallbackEn || name === fallbackZh) {
    return t("work.fallbackDraftName");
  }
  return name;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso ?? "-";
  }
}

function compareDrafts(
  a: QuotationDraftListItem,
  b: QuotationDraftListItem,
  sortBy: "created_at" | "draft_no" | "name",
  sortDir: "asc" | "desc",
): number {
  const dir = sortDir === "asc" ? 1 : -1;
  if (sortBy === "created_at") {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return (ta - tb) * dir;
  }
  if (sortBy === "name") {
    return (a.name ?? "").localeCompare(b.name ?? "") * dir;
  }
  return (a.draft_no ?? "").localeCompare(b.draft_no ?? "") * dir;
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
    filterQuery,
    sortBy,
    sortDir,
    page,
    pageSize,
    onRefresh,
    onSelectDraft,
    onConfirm,
    onClearDetail,
    onFilterQueryChange,
    onSortByChange,
    onSortDirChange,
    onPageChange,
    onPageSizeChange,
  } = props;

  const q = filterQuery.trim().toLowerCase();
  const filtered = q
    ? drafts.filter((d) => {
        const haystack = `${d.draft_no ?? ""}\n${d.name ?? ""}\n${d.source ?? ""}`.toLowerCase();
        return haystack.includes(q);
      })
    : drafts;

  const sorted = [...filtered].sort((a, b) => compareDrafts(a, b, sortBy, sortDir));
  const total = sorted.length;
  const safePageSize = Math.max(1, pageSize || 10);
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * safePageSize;
  const paged = sorted.slice(start, start + safePageSize);

  return html`
    <section class="grid grid-cols-2" aria-label=${t("tabs.cron")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${t("fulfill.title")}</div>
        <div class="card-sub">${t("fulfill.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${loading} @click=${onRefresh} aria-label=${t("fulfill.refreshList")}>
            ${loading ? t("fulfill.loading") : t("fulfill.refreshList")}
          </button>
          <input
            type="search"
            .value=${filterQuery}
            placeholder=${t("fulfill.filterPlaceholder")}
            @input=${(e: Event) => onFilterQueryChange((e.target as HTMLInputElement).value)}
            aria-label=${t("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${t("fulfill.sortBy")}</span>
            <select
              .value=${sortBy}
              @change=${(e: Event) => onSortByChange((e.target as HTMLSelectElement).value as "created_at" | "draft_no" | "name")}
              aria-label=${t("fulfill.sortBy")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            >
              <option value="created_at">${t("fulfill.sortCreatedAt")}</option>
              <option value="draft_no">${t("fulfill.sortDraftNo")}</option>
              <option value="name">${t("fulfill.sortName")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${t("fulfill.sortDir")}</span>
            <select
              .value=${sortDir}
              @change=${(e: Event) => onSortDirChange((e.target as HTMLSelectElement).value as "asc" | "desc")}
              aria-label=${t("fulfill.sortDir")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
            >
              <option value="desc">${t("fulfill.sortDesc")}</option>
              <option value="asc">${t("fulfill.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${t("fulfill.pageSize")}</span>
            <select
              .value=${String(safePageSize)}
              @change=${(e: Event) => onPageSizeChange(Number((e.target as HTMLSelectElement).value) || 10)}
              aria-label=${t("fulfill.pageSize")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 120px;"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>

      ${error
        ? html`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${t("common.errorTitle")}</div>
              <div class="card-sub">${error}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${onRefresh}>${t("common.retry")}</button>
              </div>
            </div>
          `
        : nothing}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${t("fulfill.listTitle")}</div>
        <div class="card-sub">${t("fulfill.listSubtitle")}</div>

        ${loading && drafts.length === 0
          ? html`<p class="muted" style="margin-top: 12px;">${t("fulfill.loading")}</p>`
          : total === 0
            ? html`<p class="muted" style="margin-top: 12px;">${t("fulfill.noDrafts")}</p>`
            : html`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${t("fulfill.total", { total: String(total) })}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.colDraftNo")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.colName")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.colSource")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.colCreatedAt")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${paged.map(
                        (d) => html`
                          <tr style=${detailId === d.id ? "background: var(--bg-secondary, #f5f5f5);" : ""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${d.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${displayDraftName(d.name)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${d.source ?? "-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${formatDate(d.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${() => onSelectDraft(d.id)}
                                aria-label=${t("fulfill.viewDetail")}
                              >
                                ${t("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${confirmBusy}
                                @click=${() => onConfirm(d.id)}
                                aria-label=${t("fulfill.confirmAction")}
                              >
                                ${confirmBusy && detailId === d.id ? t("fulfill.confirming") : t("fulfill.confirmAction")}
                              </button>
                            </td>
                          </tr>
                        `,
                      )}
                    </tbody>
                  </table>
                </div>

                <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                  <button
                    class="btn btn-sm"
                    ?disabled=${currentPage <= 1}
                    @click=${() => onPageChange(currentPage - 1)}
                    aria-label=${t("common.prev")}
                  >
                    ${t("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${t("fulfill.page", { current: String(currentPage), total: String(totalPages) })}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${currentPage >= totalPages}
                    @click=${() => onPageChange(currentPage + 1)}
                    aria-label=${t("common.next")}
                  >
                    ${t("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${detail
        ? html`
            <div class="card" style="grid-column: 1 / -1;" tabindex="-1">
              <div class="card-title">${t("fulfill.detailTitle", { draftNo: detail.draft_no })}</div>
              <div class="card-sub">${displayDraftName(detail.name)}</div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${onClearDetail}>${t("fulfill.closeDetail")}</button>
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${confirmBusy}
                  @click=${() => onConfirm(detail.id)}
                >
                  ${confirmBusy ? t("fulfill.confirming") : t("fulfill.confirmAction")}
                </button>
              </div>
              <div style="overflow-x: auto; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("fulfill.lineIsShortage")}</th>
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
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.is_shortage ? t("common.yes") : t("common.no")}</td>
                        </tr>
                      `,
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          `
        : nothing}

      ${confirmResult
        ? html`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${t("fulfill.confirmTitle")}</div>
              ${confirmResult.order_id ? html`<p style="margin: 0 0 4px 0; font-weight: 600;">${t("fulfill.orderId")}: ${confirmResult.order_id}</p>` : nothing}
              <div class="card-sub">${confirmResult.message ?? ""}</div>
            </div>
          `
        : nothing}
    </section>
  `;
}
