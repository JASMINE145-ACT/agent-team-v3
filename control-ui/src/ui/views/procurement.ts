import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import type { ShortageRecord } from "../types.ts";
import { procurementItemKey } from "../controllers/procurement.ts";

export type ProcurementProps = {
  basePath: string;
  loading: boolean;
  error: string | null;
  suggestions: ShortageRecord[];
  selectedKeys: string[];
  approvedKeys: string[];
  approveBusy: boolean;
  approveResult: { approved_count?: number; message?: string } | null;
  filterQuery: string;
  sortBy: "uploaded_at" | "shortfall" | "count" | "product_name";
  sortDir: "asc" | "desc";
  page: number;
  pageSize: number;
  onRefresh: () => void;
  onToggleSelect: (key: string) => void;
  onApprove: (item: ShortageRecord) => void;
  onApproveBatch: () => void;
  onFilterQueryChange: (value: string) => void;
  onSortByChange: (value: "uploaded_at" | "shortfall" | "count" | "product_name") => void;
  onSortDirChange: (value: "asc" | "desc") => void;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
};

function compareSuggestions(
  a: ShortageRecord,
  b: ShortageRecord,
  sortBy: "uploaded_at" | "shortfall" | "count" | "product_name",
  sortDir: "asc" | "desc",
): number {
  const dir = sortDir === "asc" ? 1 : -1;
  if (sortBy === "uploaded_at") {
    const ta = a.uploaded_at ? new Date(a.uploaded_at).getTime() : 0;
    const tb = b.uploaded_at ? new Date(b.uploaded_at).getTime() : 0;
    return (ta - tb) * dir;
  }
  if (sortBy === "shortfall") {
    return ((Number(a.shortfall ?? 0) - Number(b.shortfall ?? 0)) * dir);
  }
  if (sortBy === "count") {
    return ((Number(a.count ?? 0) - Number(b.count ?? 0)) * dir);
  }
  return (a.product_name ?? "").localeCompare(b.product_name ?? "") * dir;
}

export function renderProcurement(props: ProcurementProps) {
  const {
    loading,
    error,
    suggestions,
    selectedKeys,
    approvedKeys,
    approveBusy,
    approveResult,
    filterQuery,
    sortBy,
    sortDir,
    page,
    pageSize,
    onRefresh,
    onToggleSelect,
    onApprove,
    onApproveBatch,
    onFilterQueryChange,
    onSortByChange,
    onSortDirChange,
    onPageChange,
    onPageSizeChange,
  } = props;

  const baseVisible = suggestions.filter((s) => !approvedKeys.includes(procurementItemKey(s)));
  const q = filterQuery.trim().toLowerCase();
  const filtered = q
    ? baseVisible.filter((s) => {
        const haystack = `${s.product_name ?? ""}\n${s.specification ?? ""}\n${s.code ?? ""}\n${s.product_key ?? ""}`.toLowerCase();
        return haystack.includes(q);
      })
    : baseVisible;

  const sorted = [...filtered].sort((a, b) => compareSuggestions(a, b, sortBy, sortDir));
  const total = sorted.length;
  const safePageSize = Math.max(1, pageSize || 10);
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * safePageSize;
  const paged = sorted.slice(start, start + safePageSize);

  const selectedCount = filtered.filter((s) => selectedKeys.includes(procurementItemKey(s))).length;
  const allFilteredSelected = filtered.length > 0 && filtered.every((s) => selectedKeys.includes(procurementItemKey(s)));

  return html`
    <section class="grid grid-cols-2" aria-label=${t("tabs.sessions")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${t("procurement.title")}</div>
        <div class="card-sub">${t("procurement.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${loading} @click=${onRefresh} aria-label=${t("procurement.refreshList")}>
            ${loading ? t("procurement.loading") : t("procurement.refreshList")}
          </button>
          <input
            type="search"
            .value=${filterQuery}
            placeholder=${t("procurement.filterPlaceholder")}
            @input=${(e: Event) => onFilterQueryChange((e.target as HTMLInputElement).value)}
            aria-label=${t("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${t("procurement.sortBy")}</span>
            <select
              .value=${sortBy}
              @change=${(e: Event) => onSortByChange((e.target as HTMLSelectElement).value as "uploaded_at" | "shortfall" | "count" | "product_name")}
              aria-label=${t("procurement.sortBy")}
            >
              <option value="uploaded_at">${t("procurement.sortUploadedAt")}</option>
              <option value="shortfall">${t("procurement.sortShortfall")}</option>
              <option value="count">${t("procurement.sortCount")}</option>
              <option value="product_name">${t("procurement.sortProduct")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${t("procurement.sortDir")}</span>
            <select
              .value=${sortDir}
              @change=${(e: Event) => onSortDirChange((e.target as HTMLSelectElement).value as "asc" | "desc")}
              aria-label=${t("procurement.sortDir")}
            >
              <option value="desc">${t("procurement.sortDesc")}</option>
              <option value="asc">${t("procurement.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${t("procurement.pageSize")}</span>
            <select
              .value=${String(safePageSize)}
              @change=${(e: Event) => onPageSizeChange(Number((e.target as HTMLSelectElement).value) || 10)}
              aria-label=${t("procurement.pageSize")}
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
        <div class="card-title">${t("procurement.listTitle")}</div>
        <div class="card-sub">${t("procurement.listHint")}</div>

        ${selectedCount > 0
          ? html`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${approveBusy}
                  @click=${onApproveBatch}
                  aria-label=${t("procurement.batchApprove")}
                >
                  ${approveBusy ? t("procurement.approving") : `${t("procurement.batchApprove")} (${selectedCount})`}
                </button>
              </div>
            `
          : nothing}

        ${loading && suggestions.length === 0
          ? html`<p class="muted" style="margin-top: 12px;">${t("procurement.loading")}</p>`
          : filtered.length === 0
            ? html`<p class="muted" style="margin-top: 12px;">${suggestions.length === 0 ? t("procurement.noSuggestions") : t("procurement.noPending")}</p>`
            : html`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${t("procurement.total", { total: String(total) })}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${allFilteredSelected}
                            .indeterminate=${selectedCount > 0 && selectedCount < filtered.length}
                            aria-label=${t("procurement.selectAll")}
                            @change=${() => {
                              if (allFilteredSelected) {
                                filtered.forEach((s) => onToggleSelect(procurementItemKey(s)));
                              } else {
                                filtered.forEach((s) => {
                                  const key = procurementItemKey(s);
                                  if (!selectedKeys.includes(key)) onToggleSelect(key);
                                });
                              }
                            }}
                          />
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("procurement.colProduct")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("procurement.colSpec")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("procurement.colShortfall")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("procurement.colCode")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("procurement.colCount")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("procurement.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${paged.map(
                        (s) => html`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${selectedKeys.includes(procurementItemKey(s))}
                                aria-label=${t("procurement.selectItem")}
                                @change=${() => onToggleSelect(procurementItemKey(s))}
                              />
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.product_name ?? "-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.specification ?? "-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.shortfall ?? 0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.code ?? "-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${s.count ?? 0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${approveBusy}
                                @click=${() => onApprove(s)}
                                aria-label=${t("procurement.approveSingle")}
                              >
                                ${approveBusy ? t("procurement.approving") : t("procurement.approveSingle")}
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
                  <span class="muted" style="font-size: 12px;">${t("procurement.page", { current: String(currentPage), total: String(totalPages) })}</span>
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

      ${approveResult
        ? html`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${approveResult.approved_count != null ? `${t("procurement.approvedCount", { count: String(approveResult.approved_count) })} ` : ""}${approveResult.message ?? ""}</div>
            </div>
          `
        : nothing}
    </section>
  `;
}
