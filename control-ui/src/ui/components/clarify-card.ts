import { html } from "lit";
import type { TemplateResult } from "lit";

/**
 * Parse consecutive numbered list items (1. / 2、/ 3) from assistant text.
 * Returns [] when fewer than 3 sequential items are found.
 */
export function parseClarifyOptions(text: string): string[] {
  if (!text) return [];
  const lines = text.split("\n");
  const options: string[] = [];
  let expecting = 1;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (expecting > 1) continue;
      continue;
    }

    const m = trimmed.match(/^(\d+)[.、)]\s*(.+)/);
    if (m) {
      const idx = parseInt(m[1], 10);
      if (idx === expecting) {
        options.push(m[2].trim());
        expecting++;
        continue;
      }
      if (expecting > 1) {
        break;
      }
      continue;
    }

    if (expecting > 1) {
      // Stop on explicit instruction/footer lines.
      if (/^(请回复|回复序号|说明其他类型)/.test(trimmed) || /^[（(]/.test(trimmed)) {
        break;
      }
      // Treat wrapped lines as continuation of current option.
      const lastIndex = options.length - 1;
      options[lastIndex] = `${options[lastIndex]} ${trimmed}`.trim();
    }
  }

  return options.length >= 3 ? options : [];
}

/**
 * Render clarify card: quick-pick chips + custom "other type" input.
 */
export function renderClarifyCard(
  options: string[],
  onPickOption: (text: string) => void,
): TemplateResult {
  const handleOtherKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    const input = e.target as HTMLInputElement;
    const val = input.value.trim();
    if (!val) return;
    onPickOption(val);
    input.value = "";
  };

  return html`
    <div class="clarify-card">
      <div class="clarify-card__chips">
        ${options.map(
          (opt, i) => html`
            <button
              type="button"
              class="clarify-chip"
              @click=${() => onPickOption(opt)}
            >
              ${i + 1}. ${opt}
            </button>
          `,
        )}
      </div>
      <div class="clarify-card__other">
        <input
          class="clarify-other-input"
          type="text"
          placeholder="其他类型（输入后按 Enter 发送）"
          @keydown=${handleOtherKeydown}
        />
      </div>
    </div>
  `;
}
