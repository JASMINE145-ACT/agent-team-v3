import { html, nothing, type TemplateResult } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { t } from "../../i18n/index.ts";
import { toSanitizedMarkdownHtml } from "../markdown.ts";

function toolTitle(name: string): string {
  const map: Record<string, string> = {
    work_quotation_extract: "work.traceToolExtract",
    work_quotation_match: "work.traceToolMatch",
    work_quotation_fill: "work.traceToolFill",
    work_quotation_shortage_report: "work.traceToolShortageReport",
  };
  const key = map[name];
  return key ? t(key) : t("work.traceToolFallback", { name });
}

function formatDurationMs(ms: unknown): string {
  const n = typeof ms === "number" ? ms : Number(ms);
  if (!Number.isFinite(n) || n < 0) {
    return "—";
  }
  if (n < 1000) {
    return `${Math.round(n)} ms`;
  }
  const s = n / 1000;
  return s >= 10 ? `${Math.round(s)} s` : `${s.toFixed(1)} s`;
}

function basenamePath(p: unknown): string {
  if (typeof p !== "string" || !p.trim()) {
    return "";
  }
  const s = p.replace(/\\/g, "/");
  const parts = s.split("/").filter(Boolean);
  return parts.length ? (parts[parts.length - 1] as string) : s;
}

function parseObservationContent(content: unknown): Record<string, unknown> | null {
  if (content && typeof content === "object" && !Array.isArray(content)) {
    return content as Record<string, unknown>;
  }
  if (typeof content !== "string" || !content.trim()) {
    return null;
  }
  try {
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function formatArgs(args: unknown): string {
  try {
    return JSON.stringify(args ?? {}, null, 2);
  } catch {
    return String(args);
  }
}

function renderObservationBody(parsed: Record<string, unknown> | null, rawContent: unknown): TemplateResult {
  if (!parsed) {
    const raw =
      typeof rawContent === "string"
        ? rawContent
        : (() => {
            try {
              return JSON.stringify(rawContent, null, 2);
            } catch {
              return String(rawContent);
            }
          })();
    return html`
      <p class="muted work-trace__parse-fail">${t("work.traceParseError")}</p>
      <pre class="work-trace__fallback-pre">${raw}</pre>
    `;
  }

  const md = parsed.markdown;
  const rows: TemplateResult[] = [];

  if (parsed.success !== undefined) {
    rows.push(html`<div><span class="work-trace__k">${t("work.traceFieldSuccess")}</span> ${String(parsed.success)}</div>`);
  }
  if (parsed.rows_count !== undefined) {
    rows.push(html`<div><span class="work-trace__k">${t("work.traceFieldRows")}</span> ${String(parsed.rows_count)}</div>`);
  }
  if (parsed.filled_count !== undefined) {
    rows.push(html`<div><span class="work-trace__k">${t("work.traceFieldFilled")}</span> ${String(parsed.filled_count)}</div>`);
  }
  if (parsed.output_path !== undefined) {
    rows.push(html`
      <div>
        <span class="work-trace__k">${t("work.traceFieldOutput")}</span>
        ${basenamePath(parsed.output_path)}
      </div>
    `);
  }
  if (parsed.summary !== undefined && typeof parsed.summary === "string") {
    rows.push(html`<div><span class="work-trace__k">${t("work.traceFieldSummary")}</span> ${parsed.summary}</div>`);
  }
  if (parsed.error != null && String(parsed.error).trim()) {
    rows.push(html`<div class="work-trace__err"><span class="work-trace__k">${t("work.traceFieldError")}</span> ${String(parsed.error)}</div>`);
  }

  const hasMd = typeof md === "string" && md.trim().length > 0;
  const hasRows = rows.length > 0;

  return html`
    ${hasRows ? html`<div class="work-trace__summary">${rows}</div>` : nothing}
    ${hasMd
      ? html`
          <div class="work-trace__md markdown-body">${unsafeHTML(toSanitizedMarkdownHtml(md))}</div>
        `
      : nothing}
    ${!hasRows && !hasMd
      ? html`<pre class="work-trace__json-pre">${JSON.stringify(parsed, null, 2)}</pre>`
      : nothing}
  `;
}

function renderTraceStep(entry: unknown, stepNo: number): TemplateResult {
  if (!entry || typeof entry !== "object") {
    return html`
      <div class="work-trace__card work-trace__card--unknown">
        <span class="work-trace__step-num">${t("work.traceStep", { n: String(stepNo) })}</span>
        <pre class="work-trace__fallback-pre">${JSON.stringify(entry)}</pre>
      </div>
    `;
  }

  const e = entry as Record<string, unknown>;
  const type = e.type;

  if (type === "tool_call") {
    const name = String(e.name ?? "");
    return html`
      <div class="work-trace__card work-trace__card--tool">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${t("work.traceStep", { n: String(stepNo) })}</span>
          <span class="work-trace__type-tag">${t("work.traceTypeToolCall")}</span>
          <span class="work-trace__tool-name">${toolTitle(name)}</span>
        </div>
        <pre class="work-trace__args-pre">${formatArgs(e.arguments)}</pre>
      </div>
    `;
  }

  if (type === "observation") {
    const rawContent = e.content;
    const parsed = parseObservationContent(rawContent);
    return html`
      <div class="work-trace__card work-trace__card--obs">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${t("work.traceStep", { n: String(stepNo) })}</span>
          <span class="work-trace__type-tag">${t("work.traceTypeObservation")}</span>
        </div>
        ${renderObservationBody(parsed, rawContent)}
      </div>
    `;
  }

  if (type === "metrics") {
    const stage = e.stage != null ? String(e.stage) : "—";
    const d = formatDurationMs(e.duration_ms);
    return html`
      <div class="work-trace__card work-trace__card--metrics">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${t("work.traceStep", { n: String(stepNo) })}</span>
          <span class="work-trace__type-tag">${t("work.traceTypeMetrics")}</span>
        </div>
        <div class="work-trace__metrics-row">
          <span class="work-trace__badge">${stage}</span>
          <span class="work-trace__duration">${d}</span>
        </div>
      </div>
    `;
  }

  return html`
    <div class="work-trace__card work-trace__card--unknown">
      <span class="work-trace__step-num">${t("work.traceStep", { n: String(stepNo) })}</span>
      <pre class="work-trace__fallback-pre">${JSON.stringify(entry, null, 2)}</pre>
    </div>
  `;
}

export function renderWorkTraceTimeline(trace: unknown[] | undefined): TemplateResult {
  if (!Array.isArray(trace) || trace.length === 0) {
    return html``;
  }

  return html`
    <div class="work-trace" aria-label=${t("work.traceTimelineTitle")}>
      <div class="work-trace__heading">${t("work.traceTimelineTitle")}</div>
      <ol class="work-trace__list">
        ${trace.map((entry, i) => html`<li class="work-trace__li">${renderTraceStep(entry, i + 1)}</li>`)}
      </ol>
      <details class="work-trace__raw">
        <summary class="work-trace__raw-summary">${t("work.traceRawDebug")}</summary>
        <pre class="work-trace__raw-pre">${JSON.stringify(trace, null, 2)}</pre>
      </details>
    </div>
  `;
}
