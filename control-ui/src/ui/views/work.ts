import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import type { WorkState, WorkPendingChoice } from "../controllers/work.ts";

export type WorkProps = WorkState & {
  onAddFile: (filePath: string, fileName: string) => void;
  onRemoveFile: (index: number) => void;
  onCustomerLevelChange: (level: string) => void;
  onDoRegisterOosChange: (v: boolean) => void;
  onRun: () => void;
  onSelectionChange: (itemId: string, selectedCode: string) => void;
  onResume: () => void;
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

function renderObservationContent(content: string): ReturnType<typeof html> {
  const obj = tryParseJson(content) as Record<string, unknown> | null;
  if (!obj || typeof obj !== "object") {
    const short = content.length > 800 ? content.slice(0, 800) + "\n…（已截断）" : content;
    return html`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap; word-break: break-all;">${short}</pre>`;
  }
  const success = obj.success === true;
  const toFill = Array.isArray(obj.to_fill) ? obj.to_fill : [];
  const shortage = Array.isArray(obj.shortage) ? obj.shortage : [];
  const unmatched = Array.isArray(obj.unmatched) ? obj.unmatched : [];
  const items = Array.isArray(obj.items) ? obj.items : [];
  const fillMerged = Array.isArray(obj.fill_items_merged) ? obj.fill_items_merged : [];
  if (toFill.length || shortage.length || unmatched.length || items.length || fillMerged.length) {
    return html`
      <div style="font-size: 12px;">
        ${success === false && obj.error
          ? html`<p style="color: var(--danger, #c00); margin: 0 0 8px 0;">${String(obj.error)}</p>`
          : nothing}
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-bottom: 8px;">
          ${items.length ? html`<span class="muted">提取行数: ${items.length}</span>` : nothing}
          ${toFill.length ? html`<span style="color: var(--success, #2e7d32);">填充: ${toFill.length}</span>` : nothing}
          ${shortage.length ? html`<span style="color: var(--warning, #ed6c02);">缺货: ${shortage.length}</span>` : nothing}
          ${unmatched.length ? html`<span style="color: var(--muted);">未匹配: ${unmatched.length}</span>` : nothing}
        </div>
        ${unmatched.length
          ? html`
              <details style="margin-top: 6px;">
                <summary>未匹配项 (${unmatched.length})</summary>
                <ul style="margin: 4px 0 0 0; padding-left: 18px; font-size: 11px;">
                  ${unmatched.slice(0, 10).map(
                    (u: Record<string, unknown>) =>
                      html`<li>${[u.product_name, u.specification].filter(Boolean).join(" · ") || u.keywords || "-"}</li>`,
                  )}
                  ${unmatched.length > 10 ? html`<li class="muted">…共 ${unmatched.length} 项</li>` : nothing}
                </ul>
              </details>
            `
          : nothing}
      </div>
    `;
  }
  const extItems = Array.isArray((obj as Record<string, unknown>).items) ? (obj as Record<string, unknown>).items : [];
  if (extItems.length && typeof (obj as Record<string, unknown>).success !== "undefined") {
    return html`
      <div style="font-size: 12px;">
        <span class="muted">提取询价行: ${extItems.length} 条</span>
      </div>
    `;
  }
  const short = content.length > 600 ? content.slice(0, 600) + "\n…" : content;
  return html`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap;">${short}</pre>`;
}

function renderTraceStep(entry: Record<string, unknown>, index: number): ReturnType<typeof html> {
  const type = entry.type as string;
  const step = entry.step as number | undefined;
  const name = entry.name as string | undefined;
  const content = (entry.content as string) ?? "";
  if (type === "response" && content) {
    return html`
      <div style="margin-bottom: 8px; padding: 8px; background: var(--bg-secondary, #f5f5f5); border-radius: 6px;">
        <span class="muted" style="font-size: 11px;">步骤 ${step ?? index + 1} · 回复</span>
        <div style="white-space: pre-wrap; font-size: 12px; margin-top: 4px;">${content}</div>
      </div>
    `;
  }
  if (type === "tool_call" && name) {
    return html`
      <div style="margin-bottom: 4px;">
        <span class="muted" style="font-size: 11px;">步骤 ${step ?? index + 1} · 调用 ${name}</span>
      </div>
    `;
  }
  if (type === "observation" && content) {
    return html`
      <div style="margin-bottom: 12px; padding: 8px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg);">
        <span class="muted" style="font-size: 11px;">观察结果</span>
        <div style="margin-top: 6px;">${renderObservationContent(content)}</div>
      </div>
    `;
  }
  return nothing;
}

const WORK_STAGES = ["识别表数据", "查价格与库存", "填表"] as const;

export function renderWork(props: WorkProps) {
  const {
    basePath,
    workFilePaths,
    workRunning,
    workProgressStage,
    workRunStatus,
    workRunId,
    workPendingChoices,
    workSelections,
    workResult,
    workError,
    workCustomerLevel,
    workDoRegisterOos,
    onAddFile,
    onRemoveFile,
    onCustomerLevelChange,
    onDoRegisterOosChange,
    onRun,
    onSelectionChange,
    onResume,
  } = props;

  const handleFileInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
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
      .catch((err) => console.error("Work upload", err));
    input.value = "";
  };

  return html`
    <section class="card" style="margin-bottom: 16px;">
      <div class="card-title" style="margin-bottom: 8px;">${t("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${t("subtitles.work")}</p>

      <div style="margin-bottom: 12px;">
        <label class="card-title" style="font-size: 13px;">报价单文件（可多选）</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${handleFileInput}
          style="margin-top: 6px;"
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
                      >
                        移除
                      </button>
                    </li>
                  `,
                )}
              </ul>
            `
          : html`<p class="muted" style="margin-top: 6px;">暂无文件，请上传 .xlsx / .xls / .xlsm</p>`}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">客户档位</label>
          <select
            .value=${workCustomerLevel}
            @change=${(e: Event) => onCustomerLevelChange((e.target as HTMLSelectElement).value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text);"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input type="checkbox" ?checked=${workDoRegisterOos} @change=${(e: Event) => onDoRegisterOosChange((e.target as HTMLInputElement).checked)} />
          执行无货登记
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${workRunning
          ? html`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${WORK_STAGES.map(
                  (label, i) => html`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${i === workProgressStage ? "var(--accent)" : "var(--bg-secondary, #eee)"};
                        color: ${i === workProgressStage ? "var(--bg)" : "var(--muted)"};
                        transition: background 0.2s, color 0.2s;
                      "
                    >
                      ${i + 1}. ${label}
                    </span>
                  `,
                )}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">当前阶段：${WORK_STAGES[workProgressStage]}</p>
            `
          : nothing}
        <div style="display: flex; gap: 8px;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${workFilePaths.length === 0 || workRunning}
            @click=${onRun}
          >
            ${workRunning ? "执行中…" : "执行"}
          </button>
        </div>
      </div>

      ${workError ? html`<p style="margin-top: 12px; color: var(--danger, #e53935); font-size: 13px;">${workError}</p>` : nothing}
    </section>

    ${workRunStatus === "awaiting_choices" && workPendingChoices.length
      ? html`
          <section class="card" style="margin-bottom: 16px;">
            <div class="card-title">需要您选择</div>
            <p class="muted" style="margin-bottom: 12px;">以下项无法自动确定唯一型号，请为每项选择一个选项后点击「确认并继续」。</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${workPendingChoices.map(
                (item: WorkPendingChoice) => html`
                  <li style="margin-bottom: 16px; padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary, #f5f5f5);">
                    <div style="font-size: 13px; margin-bottom: 8px;">
                      ${item.product_name ?? item.keywords ?? ""}
                      ${item.specification ? html`<span class="muted"> · ${item.specification}</span>` : nothing}
                      ${item.qty != null ? html`<span class="muted"> · 数量 ${item.qty}</span>` : nothing}
                    </div>
                    <select
                      style="width: 100%; max-width: 400px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); font-size: 13px;"
                      .value=${workSelections[item.id] ?? item.options?.[0]?.code ?? ""}
                      @change=${(e: Event) => onSelectionChange(item.id, (e.target as HTMLSelectElement).value)}
                    >
                      ${(item.options ?? []).map(
                        (opt) =>
                          html`<option value=${opt.code}>${opt.code}${opt.matched_name ? ` · ${opt.matched_name}` : ""}${opt.unit_price != null ? ` · ¥${opt.unit_price}` : ""}</option>`,
                      )}
                    </select>
                  </li>
                `,
              )}
            </ul>
            <button
              class="btn"
              style="margin-top: 12px; background: var(--accent); color: var(--bg);"
              ?disabled=${workRunning}
              @click=${onResume}
            >
              ${workRunning ? "继续中…" : "确认并继续"}
            </button>
          </section>
        `
      : nothing}

    ${workResult
      ? html`
          <section class="card">
            <div class="card-title">执行结果</div>
            ${workFilePaths.length > 1 ? html`<p class="muted" style="font-size: 12px; margin-bottom: 8px;">多文件时为汇总结果，输出文件见下方总结。</p>` : nothing}
            ${workResult.answer ? html`<div style="white-space: pre-wrap; margin-bottom: 12px;">${workResult.answer}</div>` : nothing}
            ${workResult.error ? html`<p style="color: var(--danger, #e53935);">${workResult.error}</p>` : nothing}
            ${workResult.trace?.length
              ? html`
                  <details style="margin-top: 12px;" open>
                    <summary>步骤记录（${workResult.trace.length} 条）</summary>
                    <div style="max-height: 420px; overflow: auto; margin-top: 8px;">
                      ${(workResult.trace as Record<string, unknown>[]).map((entry, i) => renderTraceStep(entry, i))}
                    </div>
                  </details>
                `
              : nothing}
          </section>
        `
      : nothing}
  `;
}
