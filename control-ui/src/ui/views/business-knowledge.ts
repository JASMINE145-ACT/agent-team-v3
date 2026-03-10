/**
 * 业务知识页：可编辑 wanding_business_knowledge.md，供万鼎选型与匹配使用。
 * 布局与交互参考 oos-dashboard（无货看板）：单卡、标题、副标题、刷新/保存按钮。
 * 含「相关数据文件」指引：历史报价/选型依赖的 Excel 路径，可复制后打开编辑。
 */
import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";

export type DependentFiles = {
  mapping_table: string;
  price_library: string;
};

export type BusinessKnowledgeProps = {
  loading: boolean;
  saving: boolean;
  error: string | null;
  content: string;
  lastSuccessAt: number | null;
  dependentFiles: DependentFiles | null;
  onReload: () => void;
  onSave: (content: string) => void;
  onContentChange: (content: string) => void;
};

function copyPath(path: string): void {
  if (!path) return;
  navigator.clipboard?.writeText(path).catch(() => {});
}

export function renderBusinessKnowledge(props: BusinessKnowledgeProps) {
  const {
    loading,
    saving,
    error,
    content,
    lastSuccessAt,
    dependentFiles,
    onReload,
    onSave,
    onContentChange,
  } = props;

  const lastSuccessStr =
    lastSuccessAt != null
      ? new Date(lastSuccessAt).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "";

  return html`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">${t("businessKnowledge.title")}</div>
          <div class="card-sub">
            ${t("businessKnowledge.subtitle")}
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${lastSuccessStr
            ? html`<span class="muted">
                ${t("businessKnowledge.lastSavedAt", { time: lastSuccessStr })}
              </span>`
            : nothing}
          <button class="btn" ?disabled=${loading} @click=${onReload}>
            ${loading ? t("businessKnowledge.actions.reloading") : t("businessKnowledge.actions.reload")}
          </button>
          <button class="btn btn--primary" ?disabled=${loading || saving} @click=${() => onSave(content)}>
            ${saving ? t("businessKnowledge.actions.saving") : t("businessKnowledge.actions.save")}
          </button>
        </div>
      </div>
      ${error ? html`<div class="callout danger" style="margin-top: 12px;">${error}</div>` : nothing}
      ${dependentFiles && (dependentFiles.mapping_table || dependentFiles.price_library)
        ? html`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">
                ${t("businessKnowledge.relatedFiles.title")}
              </div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                ${t("businessKnowledge.relatedFiles.hint")}
              </p>
              ${dependentFiles.mapping_table
                ? html`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${t("businessKnowledge.relatedFiles.mappingTableLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${dependentFiles.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${() => copyPath(dependentFiles.mapping_table)}
                        title=${t("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${t("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `
                : nothing}
              ${dependentFiles.price_library
                ? html`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${t("businessKnowledge.relatedFiles.priceLibraryLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${dependentFiles.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${() => copyPath(dependentFiles.price_library)}
                        title=${t("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${t("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `
                : nothing}
            </div>
          `
        : nothing}
      <div style="margin-top: 16px;">
        <textarea
          class="code-block"
          style="width: 100%; min-height: 360px; font-family: var(--font-mono, monospace); font-size: 0.9rem; padding: 12px; resize: vertical; box-sizing: border-box;"
          .value=${content}
          ?disabled=${loading}
          @input=${(e: Event) => {
            const t = (e.target as HTMLTextAreaElement);
            onContentChange(t?.value ?? "");
          }}
          placeholder=${t("businessKnowledge.editor.placeholder")}
        ></textarea>
      </div>
    </section>
  `;
}
