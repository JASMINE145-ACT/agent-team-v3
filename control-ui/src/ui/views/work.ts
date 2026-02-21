import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import type { WorkState } from "../controllers/work.ts";

export type WorkProps = WorkState & {
  onAddFile: (filePath: string, fileName: string) => void;
  onRemoveFile: (index: number) => void;
  onCustomerLevelChange: (level: string) => void;
  onDoRegisterOosChange: (v: boolean) => void;
  onGeneratePlan: () => void;
  onRun: () => void;
};

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

export function renderWork(props: WorkProps) {
  const {
    basePath,
    workFilePaths,
    workPlan,
    workPlanLoading,
    workRunning,
    workResult,
    workError,
    workCustomerLevel,
    workDoRegisterOos,
    onAddFile,
    onRemoveFile,
    onCustomerLevelChange,
    onDoRegisterOosChange,
    onGeneratePlan,
    onRun,
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

      <div style="display: flex; gap: 8px;">
        <button
          class="btn"
          style="background: var(--accent); color: var(--bg);"
          ?disabled=${workFilePaths.length === 0 || workPlanLoading}
          @click=${onGeneratePlan}
        >
          ${workPlanLoading ? "生成中…" : "生成计划"}
        </button>
        <button
          class="btn"
          ?disabled=${workFilePaths.length === 0 || workRunning}
          @click=${onRun}
        >
          ${workRunning ? "执行中…" : "执行"}
        </button>
      </div>

      ${workError ? html`<p style="margin-top: 12px; color: var(--danger, #e53935); font-size: 13px;">${workError}</p>` : nothing}
    </section>

    ${workPlan?.steps?.length
      ? html`
          <section class="card" style="margin-bottom: 16px;">
            <div class="card-title">计划（${workPlan.steps.length} 步）</div>
            <pre style="font-size: 12px; overflow-x: auto; max-height: 200px; white-space: pre-wrap;">${JSON.stringify(workPlan, null, 2)}</pre>
          </section>
        `
      : nothing}

    ${workResult
      ? html`
          <section class="card">
            <div class="card-title">执行结果</div>
            ${workResult.answer ? html`<div style="white-space: pre-wrap; margin-bottom: 12px;">${workResult.answer}</div>` : nothing}
            ${workResult.error ? html`<p style="color: var(--danger, #e53935);">${workResult.error}</p>` : nothing}
            ${workResult.trace?.length
              ? html`
                  <details style="margin-top: 12px;">
                    <summary>步骤记录（${workResult.trace.length} 条）</summary>
                    <pre style="font-size: 11px; max-height: 300px; overflow: auto; white-space: pre-wrap;">${JSON.stringify(workResult.trace, null, 2)}</pre>
                  </details>
                `
              : nothing}
          </section>
        `
      : nothing}
  `;
}
