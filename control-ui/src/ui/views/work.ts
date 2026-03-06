import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import type { WorkState, WorkPendingChoice } from "../controllers/work.ts";

/** 价格档位：value 与后端一致，label 与价格库表头/业务一致（中文） */
const PRICE_LEVEL_OPTIONS: { value: string; label: string }[] = [
  { value: "FACTORY_INC_TAX", label: "出厂价_含税" },
  { value: "FACTORY_EXC_TAX", label: "出厂价_不含税" },
  { value: "PURCHASE_EXC_TAX", label: "采购不含税" },
  { value: "A_MARGIN", label: "（二级代理）A级别 利润率" },
  { value: "A_QUOTE", label: "（二级代理）A级别 报单价格" },
  { value: "B_MARGIN", label: "（一级代理）B级别 利润率" },
  { value: "B_QUOTE", label: "（一级代理）B级别 报单价格" },
  { value: "C_MARGIN", label: "（聚万大客户）C级别 利润率" },
  { value: "C_QUOTE", label: "（聚万大客户）C级别 报单价格" },
  { value: "D_MARGIN", label: "（青山大客户）D级别 利润率" },
  { value: "D_QUOTE", label: "（青山大客户）D级别 报单价格" },
  { value: "D_LOW", label: "（青山大客户）D级别 降低利润率" },
  { value: "E_MARGIN", label: "（大唐大客户）E级别（包运费） 利润率" },
  { value: "E_QUOTE", label: "（大唐大客户）E级别（包运费） 报单价格" },
];

export type WorkProps = WorkState & {
  onAddFile: (filePath: string, fileName: string) => void;
  onRemoveFile: (index: number) => void;
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
  for (const entry of trace) {
    const type = (entry as Record<string, unknown>).type;
    const content = (entry as Record<string, unknown>).content;
    if (type !== "observation" || typeof content !== "string") continue;
    const obj = tryParseJson(content) as Record<string, unknown> | null;
    if (!obj || typeof obj !== "object") continue;
    const outPath = obj.output_path;
    if (typeof outPath === "string" && outPath.trim()) {
      const base = outPath.replace(/\\/g, "/").split("/").filter(Boolean).pop() ?? "";
      if (base && !basenames.includes(base)) basenames.push(base);
    }
  }
  return basenames;
}

function renderPendingChoice(item: WorkPendingChoice, selectedCode: string, onChange: (value: string) => void) {
  return html`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${item.product_name ?? item.keywords ?? ""}
        ${item.specification ? html`<span class="muted"> · ${item.specification}</span>` : nothing}
        ${item.qty != null ? html`<span class="muted"> · ${t("work.qty")}: ${item.qty}</span>` : nothing}
      </div>
      <select
        .value=${selectedCode}
        @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}
        aria-label=${t("work.choiceSelect")}
        style="width: 100%; max-width: 460px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
      >
        <option value="__OOS__">${t("work.choiceOos")}</option>
        ${(item.options ?? []).map(
          (opt) => html`<option value=${opt.code}>${opt.code}${opt.matched_name ? ` · ${opt.matched_name}` : ""}${opt.unit_price != null ? ` · ${opt.unit_price}` : ""}</option>`,
        )}
      </select>
    </li>
  `;
}

export function renderWork(props: WorkProps) {
  const {
    basePath,
    workFilePaths,
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
    onAddFile,
    onRemoveFile,
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

  const uploadFile = (file: File) => {
    const url = apiUrl(basePath, "/api/quotation/upload");
    const form = new FormData();
    form.append("file", file);
    fetch(url, { method: "POST", body: form, credentials: "same-origin" })
      .then((res) => res.json())
      .then((data: { file_path?: string; file_name?: string }) => {
        if (typeof data.file_path === "string") {
          onAddFile(data.file_path, data.file_name ?? file.name);
        }
      })
      .catch(() => {
        // ignore upload error in view layer
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
    <section class="card" style="margin-bottom: 16px;" aria-label=${t("tabs.work")}>
      <div class="card-title" style="margin-bottom: 8px;">${t("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${t("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${handleDragOver}
        @dragenter=${handleDragOver}
        @drop=${handleDrop}
      >
        <label class="card-title" style="font-size: 13px;">${t("work.uploadTitle")}</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${handleFileInput}
          style="margin-top: 6px;"
          aria-label=${t("work.uploadTitle")}
        />
        ${workFilePaths.length
          ? html`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${workFilePaths.map(
                  (path, i) => html`
                    <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <span style="word-break: break-all;">${path.split(/[/\\]/).pop() ?? path}</span>
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
                  `,
                )}
              </ul>
            `
          : html`<p class="muted" style="margin-top: 6px;">${t("work.noFiles")}</p>`}
      </div>

      <div style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary, #fafafa);">
        <label class="card-title" style="font-size: 13px;">${t("work.textInputTitle")}</label>
        <p class="muted" style="font-size: 12px; margin: 4px 0 8px 0;">${t("work.textInputHint")}</p>
        <textarea
          .value=${workTextInput}
          @input=${(e: Event) => onWorkTextChange((e.target as HTMLTextAreaElement).value)}
          placeholder=${t("work.textInputPlaceholder")}
          rows="4"
          style="width: 100%; max-width: 560px; padding: 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 13px; resize: vertical;"
          ?disabled=${workTextGenerating}
          aria-label=${t("work.textInputTitle")}
       ></textarea>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
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

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">${t("work.customerLevel")}</label>
          <select
            .value=${workCustomerLevel}
            @change=${(e: Event) => onCustomerLevelChange((e.target as HTMLSelectElement).value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            aria-label=${t("work.customerLevel")}
          >
            ${PRICE_LEVEL_OPTIONS.map((opt) => html`<option value=${opt.value}>${opt.label}</option>`)}
          </select>
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

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${workRunning
          ? html`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
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

        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
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
          ${workFilePaths.length === 0 ? html`<span class="muted" style="font-size: 12px;">${t("work.runHint")}</span>` : nothing}
          <span class="muted" style="font-size: 12px;">${t("work.statusLabel")}: ${workRunStatus}</span>
        </div>
      </div>

      ${workError
        ? html`
            <div style="margin-top: 12px; padding: 10px; border: 1px solid var(--danger, #e53935); border-radius: 8px;" role="alert" aria-live="assertive">
              <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${workError}</p>
            </div>
          `
        : nothing}
    </section>

    ${workRunStatus === "awaiting_choices" && workPendingChoices.length
      ? html`
          <section class="card" style="margin-bottom: 16px;" aria-live="polite">
            <div class="card-title">${t("work.awaitingTitle")}</div>
            <p class="muted" style="margin-bottom: 12px;">${t("work.awaitingHint")}</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${workPendingChoices.map((item) =>
                renderPendingChoice(item, workSelections[item.id] ?? "__OOS__", (value) => onSelectionChange(item.id, value))
              )}
            </ul>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${workRunning} @click=${onResume}>
                ${workRunning || workRunStatus === "resuming" ? t("work.resuming") : t("work.resume")}
              </button>
              ${workRunStatus === "error" ? html`<button class="btn btn-sm" @click=${onRetry}>${t("common.retry")}</button>` : nothing}
            </div>
          </section>
        `
      : nothing}

    ${workQuotationDraftSaveStatus?.status === "ok"
      ? html`
          <section class="card" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${t("work.savedDraftNo", { no: workQuotationDraftSaveStatus.draft_no })}</p>
            <p class="muted" style="margin: 0 0 8px 0; font-size: 12px;">${t("work.saveSuccessHint")}</p>
            <button class="btn btn-sm" @click=${onQuotationDraftDismiss}>${t("common.close")}</button>
          </section>
        `
      : workPendingQuotationDraft?.lines?.length
        ? html`
            <section class="card" style="margin-bottom: 16px;">
              <div class="card-title">${t("work.pendingDraftTitle")}</div>
              <p class="muted" style="margin-bottom: 10px;">${t("work.pendingDraftHint")}</p>
              <div style="overflow-x: auto; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${t("work.lineQuoteName")}</th>
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
                            <input type="number" min="0" step="0.01" .value=${line.unit_price != null ? String(line.unit_price) : ""} @change=${(e: Event) => onQuotationLineChange(i, "unit_price", (e.target as HTMLInputElement).value)} style="width: 90px;" aria-label=${t("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.amount != null ? line.amount : ""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${line.available_qty ?? ""}</td>
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

              <div style="display: flex; gap: 8px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${workQuotationDraftSaveStatus?.status === "saving"} @click=${onQuotationDraftSave}>
                  ${workQuotationDraftSaveStatus?.status === "saving" ? t("work.saving") : t("work.saveDraft")}
                </button>
                <button class="btn btn-sm" ?disabled=${workQuotationDraftSaveStatus?.status === "saving"} @click=${onQuotationDraftDismiss}>
                  ${t("common.cancel")}
                </button>
              </div>
            </section>
          `
        : nothing}

    ${workResult && !workPendingQuotationDraft?.lines?.length
      ? html`
          <section class="card">
            <div class="card-title">${t("work.resultTitle")}</div>
            ${((): ReturnType<typeof html> => {
              const basenames = getOutputFileBasenamesFromTrace(workResult.trace as unknown[] | undefined);
              return basenames.length
                ? html`
                    <div style="margin-bottom: 12px;">
                      ${basenames.map(
                        (name) => html`
                          <a href=${apiUrl(basePath, `/api/quotation/download?path=${encodeURIComponent(name)}`)} download=${name} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${t("work.download", { name })}
                          </a>
                        `,
                      )}
                    </div>
                  `
                : nothing;
            })()}

            ${workResult.answer ? html`<div style="white-space: pre-wrap; margin-bottom: 12px;">${workResult.answer}</div>` : nothing}
            ${workResult.error ? html`<p style="color: var(--danger, #e53935);">${workResult.error}</p>` : nothing}

            ${workResult.trace?.length
              ? html`
                  <details style="margin-top: 12px;">
                    <summary>${t("work.trace", { count: String(workResult.trace.length) })}</summary>
                    <pre style="max-height: 420px; overflow: auto; margin-top: 8px; font-size: 11px; white-space: pre-wrap;">${JSON.stringify(workResult.trace, null, 2)}</pre>
                  </details>
                `
              : nothing}
          </section>
        `
      : nothing}
  `;
}
