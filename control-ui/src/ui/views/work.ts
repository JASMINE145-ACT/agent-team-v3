import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import type { WorkState, WorkPendingChoice } from "../controllers/work.ts";
import { renderWorkTraceTimeline } from "./work-trace.ts";

/** 浠锋牸妗ｄ綅锛歷alue 涓庡悗绔竴鑷达紝labelKey 瀵瑰簲 i18n key銆?*/
const PRICE_LEVEL_OPTIONS: { value: string; labelKey: string }[] = [
  { value: "FACTORY_INC_TAX", labelKey: "work.priceLevels.FACTORY_INC_TAX" },
  { value: "FACTORY_EXC_TAX", labelKey: "work.priceLevels.FACTORY_EXC_TAX" },
  { value: "PURCHASE_EXC_TAX", labelKey: "work.priceLevels.PURCHASE_EXC_TAX" },
  { value: "A_MARGIN", labelKey: "work.priceLevels.A_MARGIN" },
  { value: "A_QUOTE", labelKey: "work.priceLevels.A_QUOTE" },
  { value: "B_MARGIN", labelKey: "work.priceLevels.B_MARGIN" },
  { value: "B_QUOTE", labelKey: "work.priceLevels.B_QUOTE" },
  { value: "C_MARGIN", labelKey: "work.priceLevels.C_MARGIN" },
  { value: "C_QUOTE", labelKey: "work.priceLevels.C_QUOTE" },
  { value: "D_MARGIN", labelKey: "work.priceLevels.D_MARGIN" },
  { value: "D_QUOTE", labelKey: "work.priceLevels.D_QUOTE" },
  { value: "D_LOW", labelKey: "work.priceLevels.D_LOW" },
  { value: "E_MARGIN", labelKey: "work.priceLevels.E_MARGIN" },
  { value: "E_QUOTE", labelKey: "work.priceLevels.E_QUOTE" },
];

export type WorkProps = WorkState & {
  onAddFile: (filePath: string, fileName: string) => void;
  onRemoveFile: (index: number) => void;
  /** 淇敼褰撳墠 Work 浼氳瘽涓煇涓枃浠剁殑浜虹被鍙鍚嶇О锛堜笉鏀圭墿鐞嗚矾寰勶級銆?*/
  onRenameFileName: (filePath: string, nextName: string) => void;
  onWorkTextChange: (value: string) => void;
  onGenerateFromText: () => void;
  onCustomerLevelChange: (level: string) => void;
  onDoRegisterOosChange: (v: boolean) => void;
  onRun: () => void;
  onCancel: () => void;
  onRetry: () => void;
  onSelectionChange: (itemId: string, selectedCode: string) => void;
  onResume: () => void;
  onQuotationLineChange: (rowIndex: number, field: string, value: unknown) => void;
  onQuotationDraftSave: () => void;
  onQuotationDraftDismiss: () => void;
};

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

function tryParseJson(s: string): unknown {
  try {
    if (typeof s !== "string" || !s.trim()) return null;
    const t = s.trim();
    if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
      return JSON.parse(t) as unknown;
    }
    return null;
  } catch {
    return null;
  }
}

function getOutputFileBasenamesFromTrace(trace: unknown[] | undefined): string[] {
  if (!Array.isArray(trace)) return [];
  const basenames: string[] = [];
  const pushBasename = (p: unknown) => {
    if (typeof p !== "string" || !p.trim()) return;
    const base = p.replace(/\\/g, "/").split("/").filter(Boolean).pop() ?? "";
    if (base && !basenames.includes(base)) basenames.push(base);
  };

  for (const entry of trace) {
    // Use loose typing to avoid compile failures when backend trace shape changes.
    const rec = entry as { [key: string]: unknown };
    const type = rec.type as unknown;
    const content = rec.content as unknown;

    // 1) Backward compatibility: observation.content JSON string.
    if (type === "observation" && typeof content === "string") {
      const obj = tryParseJson(content) as Record<string, unknown> | null;
      if (obj && typeof obj === "object") {
        // Direct output path fields.
        pushBasename(obj.output_path ?? obj.filled_path);

        // Some tools wrap output info under result (JSON string or object).
        const rawResult = obj.result as unknown;
        const inner =
          typeof rawResult === "string"
            ? (tryParseJson(rawResult) as Record<string, unknown> | null)
            : rawResult && typeof rawResult === "object"
              ? (rawResult as Record<string, unknown>)
              : null;
        if (inner && typeof inner === "object") {
          pushBasename(inner.output_path ?? inner.filled_path);
        }
      }

      // 1b) Fallback: heuristic scan for any *.xlsx substring inside observation.content,
      //     in case backend output doesn't use output_path/filled_path keys or JSON parsing fails.
      const m = content.match(/[A-Za-z]:[^\s"]+\.xlsx|\/[^\s"]+\.xlsx|[^\s"']+\.xlsx/);
      if (m && m[0]) {
        pushBasename(m[0]);
      }
    }

    // 2) Future compatibility: output path directly on trace entry.
    pushBasename(rec.output_path ?? rec.filled_path);
  }

  return basenames;
}

function renderPendingChoice(item: WorkPendingChoice, selectedCode: string, onChange: (value: string) => void) {
  return html`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${item.product_name ?? item.keywords ?? ""}
        ${item.specification ? html`<span class="muted"> 路 ${item.specification}</span>` : nothing}
        ${item.qty != null ? html`<span class="muted"> 路 ${t("work.qty")}: ${item.qty}</span>` : nothing}
      </div>
      <select
        .value=${selectedCode}
        @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}
        aria-label=${t("work.choiceSelect")}
        style="width: 100%; max-width: 460px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
      >
        <option value="__OOS__">${t("work.choiceOos")}</option>
        ${(item.options ?? []).map(
          (opt) => html`<option value=${opt.code}>${opt.code}${opt.matched_name ? ` 路 ${opt.matched_name}` : ""}${opt.unit_price != null ? ` 路 ${opt.unit_price}` : ""}</option>`,
        )}
      </select>
    </li>
  `;
}

function normalizePathKey(p: string): string {
  return (p || "").trim().replace(/\\/g, "/").toLowerCase();
}

export function renderWork(props: WorkProps) {
  const {
    basePath,
    workFilePaths,
    workOriginalFileNamesByPath,
    workRunning,
    workProgressStage,
    workRunStatus,
    workPendingChoices,
    workSelections,
    workResult,
    workError,
    workCustomerLevel,
    workDoRegisterOos,
    workPendingQuotationDraft,
    workQuotationDraftSaveStatus,
    workTextInput,
    workTextGenerating,
    workTextError,
    workPriceLevelOptions,
    onAddFile,
    onRemoveFile,
    onRenameFileName,
    onWorkTextChange,
    onGenerateFromText,
    onCustomerLevelChange,
    onDoRegisterOosChange,
    onRun,
    onCancel,
    onRetry,
    onSelectionChange,
    onResume,
    onQuotationLineChange,
    onQuotationDraftSave,
    onQuotationDraftDismiss,
  } = props;
  const workStages = [t("work.stageExtract"), t("work.stageMatch"), t("work.stageFill")];

  const statusLabel = (() => {
    switch (workRunStatus) {
      case "idle":
        return t("work.status.idle");
      case "running":
        return t("work.status.running");
      case "awaiting_choices":
        return t("work.status.awaitingChoices");
      case "resuming":
        return t("work.status.resuming");
      case "done":
        return t("work.status.done");
      case "error":
      default:
        return t("work.status.error");
    }
  })();

  const uploadFile = (file: File) => {
    // Work page only needs file path quickly; skip summary generation on upload.
    const url = apiUrl(basePath, "/api/quotation/upload?with_summary=0");
    const form = new FormData();
    form.append("file", file);
    fetch(url, { method: "POST", body: form, credentials: "same-origin" })
      .then((res) => res.json())
      .then((data: { success?: boolean; data?: { file_path?: string; file_name?: string }; file_path?: string; file_name?: string }) => {
        if (data?.success === false) return;
        const payload = data.data ?? data;
        if (typeof payload.file_path === "string") {
          onAddFile(payload.file_path, payload.file_name ?? file.name);
        }
      })
      .catch((err) => {
        console.warn("[work] upload failed", err);
      });
  };

  const handleFileInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    uploadFile(file);
    input.value = "";
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (!files || !files.length) return;
    for (let i = 0; i < files.length; i += 1) {
      const f = files.item(i);
      if (f) uploadFile(f);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  return html`
    <section class="card work-quotation" style="margin-bottom: 16px;" aria-label=${t("tabs.work")}>
      <div class="work-quotation__inner">
        <header class="work-quotation__head">
          <div class="card-title">${t("tabs.work")}</div>
          <p class="muted">${t("subtitles.work")}</p>
        </header>

        <div
          class="work-quotation__panel work-quotation__panel--upload"
          @dragover=${handleDragOver}
          @dragenter=${handleDragOver}
          @drop=${handleDrop}
        >
          <label class="work-quotation__panel-label">${t("work.uploadTitle")}</label>
          <input
            type="file"
            accept=".xlsx,.xls,.xlsm"
            class="work-quotation__file-input"
            @change=${handleFileInput}
            aria-label=${t("work.uploadTitle")}
          />
          ${workFilePaths.length
            ? html`
                <ul class="work-quotation__file-list">
                  ${workFilePaths.map(
                    (path, i) => {
                      const key = normalizePathKey(path);
                      const basename = path.split(/[/\\]/).pop() ?? path;
                      const displayName = (key && workOriginalFileNamesByPath[key]) || basename;
                      return html`
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                          <input
                            type="text"
                            .value=${displayName}
                            @change=${(e: Event) =>
                              onRenameFileName(path, (e.target as HTMLInputElement).value)}
                            style="flex: 1 1 auto; min-width: 0; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); font-size: 13px; word-break: break-all;"
                            aria-label=${t("work.fileDisplayName")}
                          />
                          <button
                            type="button"
                            class="btn btn-sm"
                            style="padding: 2px 8px;"
                            @click=${() => onRemoveFile(i)}
                            aria-label=${t("work.removeFile")}
                          >
                            ${t("work.removeFile")}
                          </button>
                        </li>
                      `;
                    },
                  )}
                </ul>
              `
            : html`<p class="muted" style="margin-top: 8px;">${t("work.noFiles")}</p>`}
        </div>

        <div class="work-quotation__panel">
          <label class="work-quotation__panel-label">${t("work.textInputTitle")}</label>
          <p class="muted work-quotation__panel-hint">${t("work.textInputHint")}</p>
          <textarea
            class="work-quotation__textarea"
            .value=${workTextInput}
            @input=${(e: Event) => onWorkTextChange((e.target as HTMLTextAreaElement).value)}
            placeholder=${t("work.textInputPlaceholder")}
            rows="6"
            ?disabled=${workTextGenerating}
            aria-label=${t("work.textInputTitle")}
          ></textarea>
          <div class="work-quotation__text-actions">
            <button
              type="button"
              class="btn"
              style="background: var(--accent); color: var(--bg);"
              ?disabled=${!workTextInput.trim() || workTextGenerating}
              @click=${onGenerateFromText}
              aria-label=${t("work.generateFromText")}
            >
              ${workTextGenerating ? t("work.textGenerating") : t("work.generateFromText")}
            </button>
            ${workTextError ? html`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${workTextError}</span>` : nothing}
          </div>
        </div>

        <div class="work-quotation__options">
          <div class="work-quotation__customer-level">
            <label>${t("work.customerLevel")}</label>
            ${(() => {
              const options =
                workPriceLevelOptions && workPriceLevelOptions.length > 0
                  ? workPriceLevelOptions
                  : PRICE_LEVEL_OPTIONS.map((opt) => ({
                      value: opt.value,
                      label: t(opt.labelKey),
                    }));
              return html`<select
                .value=${workCustomerLevel}
                @change=${(e: Event) => onCustomerLevelChange((e.target as HTMLSelectElement).value)}
                style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
                aria-label=${t("work.customerLevel")}
              >
                ${options.map((opt) => html`<option value=${opt.value}>${opt.label}</option>`)}
              </select>`;
            })()}
          </div>
          <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
            <input
              type="checkbox"
              ?checked=${workDoRegisterOos}
              @change=${(e: Event) => onDoRegisterOosChange((e.target as HTMLInputElement).checked)}
              aria-label=${t("work.registerOos")}
            />
            ${t("work.registerOos")}
          </label>
        </div>

        <div class="work-quotation__run-block">
          ${workRunning
            ? html`
                <div class="work-quotation__stages">
                  ${workStages.map(
                    (label, i) => html`
                      <span
                        style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${workProgressStage >= 0 && i === workProgressStage ? "var(--accent)" : "var(--bg-secondary, #eee)"};
                        color: ${workProgressStage >= 0 && i === workProgressStage ? "var(--bg)" : "var(--muted)"};
                      "
                      >
                        ${i + 1}. ${label}
                      </span>
                    `,
                  )}
                </div>
                <p class="muted" style="font-size: 12px; margin: 0;">
                  ${t("work.currentStage")}: ${workProgressStage >= 0 && workProgressStage < workStages.length ? workStages[workProgressStage] : t("work.running")}
                </p>
              `
            : nothing}

          <div class="work-quotation__actions">
            <div class="work-quotation__action-row">
              <button
                class="btn"
                style="background: var(--accent); color: var(--bg);"
                ?disabled=${workFilePaths.length === 0 || workRunning}
                @click=${onRun}
                aria-label=${t("work.run")}
              >
                ${workRunning ? t("work.running") : t("work.run")}
              </button>
              ${workRunning
                ? html`<button class="btn btn-sm" @click=${onCancel} aria-label=${t("work.cancel")}>${t("work.cancel")}</button>`
                : nothing}
              ${workRunStatus === "error"
                ? html`<button class="btn btn-sm" @click=${onRetry} aria-label=${t("common.retry")}>${t("common.retry")}</button>`
                : nothing}
            </div>
            ${workFilePaths.length === 0
              ? html`<span class="muted work-quotation__status-line">${t("work.runHint")}</span>`
              : nothing}
            <span class="muted work-quotation__status-line">${t("work.statusLabel")}: ${statusLabel}</span>
          </div>
        </div>

        ${workError
          ? html`
              <div class="work-quotation__error-banner" role="alert" aria-live="assertive">
                <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${workError}</p>
              </div>
            `
          : nothing}
      </div>
    </section>

    ${workRunStatus === "awaiting_choices" && workPendingChoices.length
      ? (() => {
          // Capture status as a plain string so TypeScript doesn't narrow it inside the template.
          const s: string = workRunStatus;
          return html`
            <section class="card work-quotation--follow" style="margin-bottom: 16px;" aria-live="polite">
              <div class="work-quotation__inner">
                <div class="card-title">${t("work.awaitingTitle")}</div>
                <p class="muted" style="margin-bottom: 14px;">${t("work.awaitingHint")}</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${workPendingChoices.map((item) =>
                    renderPendingChoice(item, workSelections[item.id] ?? "__OOS__", (value) => onSelectionChange(item.id, value))
                  )}
                </ul>
                <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${workRunning} @click=${onResume}>
                    ${workRunning || s === "resuming" ? t("work.resuming") : t("work.resume")}
                  </button>
                  ${s === "error" ? html`<button class="btn btn-sm" @click=${onRetry}>${t("common.retry")}</button>` : nothing}
                </div>
              </div>
            </section>
          `;
        })()
      : nothing}

    ${workQuotationDraftSaveStatus?.status === "ok"
      ? html`
          <section class="card work-quotation--follow" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <div class="work-quotation__inner">
              <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${t("work.savedDraftNo", { no: workQuotationDraftSaveStatus.draft_no })}</p>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 12px;">${t("work.saveSuccessHint")}</p>
              <button class="btn btn-sm" @click=${onQuotationDraftDismiss}>${t("common.close")}</button>
            </div>
          </section>
        `
      : workPendingQuotationDraft?.lines?.length
        ? html`
            <section class="card work-quotation--follow" style="margin-bottom: 16px;">
              <div class="work-quotation__inner">
                <div class="card-title">${t("work.pendingDraftTitle")}</div>
                <p class="muted" style="margin-bottom: 12px;">${t("work.pendingDraftHint")}</p>
                <div style="overflow-x: auto; margin-bottom: 14px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineQuoteSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${workPendingQuotationDraft.lines.map(
                      (line, i) => html`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${i + 1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.product_name ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.specification ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(line.qty ?? "")} @change=${(e: Event) => onQuotationLineChange(i, "qty", (e.target as HTMLInputElement).value)} style="width: 72px;" aria-label=${t("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${line.code ?? ""} @change=${(e: Event) => onQuotationLineChange(i, "code", (e.target as HTMLInputElement).value)} style="width: 90px;" aria-label=${t("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${line.quote_name ?? ""} @change=${(e: Event) => onQuotationLineChange(i, "quote_name", (e.target as HTMLInputElement).value)} style="width: 120px;" aria-label=${t("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${line.quote_spec ?? ""} @change=${(e: Event) => onQuotationLineChange(i, "quote_spec", (e.target as HTMLInputElement).value)} style="width: 120px;" aria-label=${t("work.lineQuoteSpec")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${line.unit_price != null ? String(line.unit_price) : ""} @change=${(e: Event) => onQuotationLineChange(i, "unit_price", (e.target as HTMLInputElement).value)} style="width: 90px;" aria-label=${t("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.amount != null ? line.amount : ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.warehouse_qty ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.shortfall ?? ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.is_shortage ? t("common.yes") : t("common.no")}</td>
                        </tr>
                      `,
                    )}
                  </tbody>
                </table>
              </div>

              ${workQuotationDraftSaveStatus?.status === "error"
                ? html`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${workQuotationDraftSaveStatus.error}</p>`
                : nothing}

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${workQuotationDraftSaveStatus?.status === "saving"} @click=${onQuotationDraftSave}>
                    ${workQuotationDraftSaveStatus?.status === "saving" ? t("work.saving") : t("work.saveDraft")}
                  </button>
                  <button class="btn btn-sm" ?disabled=${workQuotationDraftSaveStatus?.status === "saving"} @click=${onQuotationDraftDismiss}>
                    ${t("common.cancel")}
                  </button>
                </div>
              </div>
            </section>
          `
        : nothing}

    ${workResult && !workPendingQuotationDraft?.lines?.length
      ? html`
          <section class="card work-quotation--follow">
            <div class="work-quotation__inner">
              <div class="card-title">${t("work.resultTitle")}</div>
              ${getOutputFileBasenamesFromTrace(workResult.trace as unknown[] | undefined).length
                ? html`
                    <div style="margin-bottom: 14px;">
                      ${getOutputFileBasenamesFromTrace(workResult.trace as unknown[] | undefined).map(
                        (name) => html`
                          <a href=${apiUrl(basePath, `/api/quotation/download?path=${encodeURIComponent(name)}`)} download=${name} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${t("work.download", { name })}
                          </a>
                        `,
                      )}
                    </div>
                  `
                : nothing}

              ${workResult.answer ? html`<div style="white-space: pre-wrap; margin-bottom: 14px;">${workResult.answer}</div>` : nothing}
              ${workResult.error ? html`<p style="color: var(--danger, #e53935);">${workResult.error}</p>` : nothing}

              ${workResult.trace?.length ? html`<div style="margin-top: 16px;">${renderWorkTraceTimeline(workResult.trace)}</div>` : nothing}
            </div>
          </section>
        `
      : nothing}
  `;
}