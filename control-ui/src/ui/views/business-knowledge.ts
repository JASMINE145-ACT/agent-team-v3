/**
 * 业务知识页：可编辑 wanding_business_knowledge.md，供万鼎选型与匹配使用。
 * 布局与交互参考 oos-dashboard（无货看板）：单卡、标题、副标题、刷新/保存按钮。
 */
import { html, nothing } from "lit";

export type BusinessKnowledgeProps = {
  loading: boolean;
  saving: boolean;
  error: string | null;
  content: string;
  lastSuccessAt: number | null;
  onReload: () => void;
  onSave: (content: string) => void;
  onContentChange: (content: string) => void;
};

export function renderBusinessKnowledge(props: BusinessKnowledgeProps) {
  const { loading, saving, error, content, lastSuccessAt, onReload, onSave, onContentChange } =
    props;

  const lastSuccessStr =
    lastSuccessAt != null
      ? new Date(lastSuccessAt).toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "";

  return html`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">业务知识</div>
          <div class="card-sub">
            编辑万鼎业务知识（wanding_business_knowledge.md），供选型与匹配使用。保存后 LLM 将使用最新内容。
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${lastSuccessStr ? html`<span class="muted">已保存 ${lastSuccessStr}</span>` : nothing}
          <button class="btn" ?disabled=${loading} @click=${onReload}>
            ${loading ? "加载中…" : "重新加载"}
          </button>
          <button class="btn btn--primary" ?disabled=${loading || saving} @click=${() => onSave(content)}>
            ${saving ? "保存中…" : "保存"}
          </button>
        </div>
      </div>
      ${error ? html`<div class="callout danger" style="margin-top: 12px;">${error}</div>` : nothing}
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
          placeholder="【业务知识】&#10;1. …"
        ></textarea>
      </div>
    </section>
  `;
}
