import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { normalizeToolName } from "../../agents/tool-policy.ts";
import type {
  AgentInfoTool,
  ReportRecord,
  ReportTask,
  ReportTaskConfig,
  SkillStatusEntry,
  SkillStatusReport,
} from "../types.ts";
import {
  isAllowedByPolicy,
  matchesList,
  PROFILE_OPTIONS,
  resolveAgentConfig,
  resolveToolProfile,
  TOOL_SECTIONS,
} from "./agents-utils.ts";
import type { SkillGroup } from "./skills-grouping.ts";
import { groupSkills } from "./skills-grouping.ts";
import {
  computeSkillMissing,
  computeSkillReasons,
  renderSkillStatusChips,
} from "./skills-shared.ts";

/** 从 GET /api/agent/info 的 tools 列表渲染只读工具清单（名称 + 描述，展开参数）。 */
export function renderAgentTools(params: { tools: AgentInfoTool[] }) {
  const { tools } = params;
  if (tools.length === 0) {
    return html`
      <section class="card">
        <div class="card-title">Tools</div>
        <div class="muted" style="margin-top: 12px;">暂无已注册工具</div>
      </section>
    `;
  }
  return html`
    <section class="card">
      <div class="card-title">Tools</div>
      <div class="card-sub">${tools.length} registered</div>
      <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 4px;">
        ${tools.map((tool) => renderToolRow(tool))}
      </div>
    </section>
  `;
}

function renderToolRow(tool: AgentInfoTool) {
  const paramsJson = JSON.stringify(tool.parameters, null, 2);
  const shortDesc =
    tool.description.length > 80 ? tool.description.slice(0, 80) + "…" : tool.description;
  return html`
    <details class="tool-row">
      <summary class="tool-row-summary">
        <span class="mono" style="font-weight: 600; min-width: 220px; display: inline-block;"
          >${tool.name}</span
        >
        <span class="muted">${shortDesc}</span>
      </summary>
      <pre class="tool-row-params">${paramsJson}</pre>
    </details>
  `;
}

export function renderAgentSkills(params: {
  agentId: string;
  report: SkillStatusReport | null;
  loading: boolean;
  error: string | null;
  activeAgentId: string | null;
  configForm: Record<string, unknown> | null;
  configLoading: boolean;
  configSaving: boolean;
  configDirty: boolean;
  filter: string;
  onFilterChange: (next: string) => void;
  onRefresh: () => void;
  onToggle: (agentId: string, skillName: string, enabled: boolean) => void;
  onClear: (agentId: string) => void;
  onDisableAll: (agentId: string) => void;
  onConfigReload: () => void;
  onConfigSave: () => void;
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: ReportTask[];
  reportsRecords: ReportRecord[];
  reportsAdminToken: string;
  reportsEditingTaskId: string | null;
  reportsEditForm: ReportTaskConfig;
  onReportsTokenChange: (token: string) => void;
  onReportsRefresh: () => void;
  onReportsRun: (taskKey: string) => void;
  onReportsEditStart: (task: ReportTask) => void;
  onReportsEditCancel: () => void;
  onReportsEditChange: (patch: ReportTaskConfig) => void;
  onReportsEditSave: (taskKey: string) => void;
}) {
  const editable = Boolean(params.configForm) && !params.configLoading && !params.configSaving;
  const config = resolveAgentConfig(params.configForm, params.agentId);
  const allowlist = Array.isArray(config.entry?.skills) ? config.entry?.skills : undefined;
  const allowSet = new Set((allowlist ?? []).map((name) => name.trim()).filter(Boolean));
  const usingAllowlist = allowlist !== undefined;
  const reportReady = Boolean(params.report && params.activeAgentId === params.agentId);
  const rawSkills = reportReady ? (params.report?.skills ?? []) : [];
  const filter = params.filter.trim().toLowerCase();
  const filtered = filter
    ? rawSkills.filter((skill) =>
        [skill.name, skill.description, skill.source].join(" ").toLowerCase().includes(filter),
      )
    : rawSkills;
  const groups = groupSkills(filtered);
  const enabledCount = usingAllowlist
    ? rawSkills.filter((skill) => allowSet.has(skill.name)).length
    : rawSkills.length;
  const totalCount = rawSkills.length;

  return html`
    <section class="card" style="margin-bottom: 12px;">
      <div class="callout info" style="margin-bottom: 12px;">
        ${t("agents.reports.whereHint")}
      </div>
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${t("agents.reports.title")}</div>
          <div class="card-sub">${t("agents.reports.subtitle")}</div>
        </div>
        <button class="btn btn--sm" ?disabled=${params.reportsLoading} @click=${params.onReportsRefresh}>
          ${params.reportsLoading ? t("common.loading") : t("common.refresh")}
        </button>
      </div>
      <div class="filters" style="margin-top: 12px;">
        <label class="field" style="flex: 1;">
          <span>${t("agents.reports.tokenLabel")}</span>
          <input
            .value=${params.reportsAdminToken}
            placeholder="x-reports-token"
            @input=${(e: Event) => params.onReportsTokenChange((e.target as HTMLInputElement).value)}
          />
        </label>
      </div>
      ${
        params.reportsError
          ? html`<div class="callout danger" style="margin-top: 12px;">${params.reportsError}</div>`
          : nothing
      }
      <div style="margin-top: 12px;">
        <div class="label">${t("agents.reports.tasks")}</div>
        ${
          params.reportsTasks.length === 0
            ? html`<div class="muted">${t("agents.reports.noTasks")}</div>`
            : html`
                <div class="list">
                  ${params.reportsTasks.map((task) => {
                    const editing = params.reportsEditingTaskId === task.task_key;
                    const form = editing ? params.reportsEditForm : {};
                    return html`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${task.title} <span class="mono">(${task.task_key})</span></div>
                          <div class="list-sub">
                            enabled=${String(editing ? Boolean(form.enabled ?? task.enabled) : task.enabled)},
                            cron=${editing ? form.cron_expr ?? task.cron_expr : task.cron_expr},
                            tz=${editing ? form.timezone ?? task.timezone : task.timezone}
                          </div>
                          ${
                            editing
                              ? html`
                                  <div class="row" style="gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                                    <label class="field" style="min-width: 170px;">
                                      <span>${t("agents.reports.enabled")}</span>
                                      <select
                                        .value=${String(Boolean(form.enabled ?? task.enabled))}
                                        @change=${(e: Event) =>
                                          params.onReportsEditChange({
                                            ...form,
                                            enabled: (e.target as HTMLSelectElement).value === "true",
                                          })}
                                      >
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                      </select>
                                    </label>
                                    <label class="field" style="min-width: 220px;">
                                      <span>${t("agents.reports.cron")}</span>
                                      <input
                                        .value=${form.cron_expr ?? task.cron_expr}
                                        @input=${(e: Event) =>
                                          params.onReportsEditChange({
                                            ...form,
                                            cron_expr: (e.target as HTMLInputElement).value,
                                          })}
                                      />
                                    </label>
                                    <label class="field" style="min-width: 180px;">
                                      <span>${t("agents.reports.timezone")}</span>
                                      <input
                                        .value=${form.timezone ?? task.timezone}
                                        @input=${(e: Event) =>
                                          params.onReportsEditChange({
                                            ...form,
                                            timezone: (e.target as HTMLInputElement).value,
                                          })}
                                      />
                                    </label>
                                  </div>
                                `
                              : nothing
                          }
                        </div>
                        <div class="list-meta row" style="gap: 6px;">
                          <button class="btn btn--sm" @click=${() => params.onReportsRun(task.task_key)}>
                            ${t("agents.reports.run")}
                          </button>
                          ${
                            editing
                              ? html`
                                  <button class="btn btn--sm primary" @click=${() => params.onReportsEditSave(task.task_key)}>${t("common.save")}</button>
                                  <button class="btn btn--sm" @click=${params.onReportsEditCancel}>${t("common.cancel")}</button>
                                `
                              : html`<button class="btn btn--sm" @click=${() => params.onReportsEditStart(task)}>${t("common.edit")}</button>`
                          }
                        </div>
                      </div>
                    `;
                  })}
                </div>
              `
        }
      </div>
      <div style="margin-top: 12px;">
        <div class="label">${t("agents.reports.latestRecords")}</div>
        ${
          params.reportsRecords.length === 0
            ? html`<div class="muted">${t("agents.reports.noRecords")}</div>`
            : html`
                <div class="list">
                  ${params.reportsRecords.map(
                    (r) => html`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">
                            #${r.id} ${r.task_key} - <span class="mono">${r.status}</span>
                          </div>
                          <div class="list-sub">${r.started_at}${r.finished_at ? ` -> ${r.finished_at}` : ""}</div>
                          ${r.error_message ? html`<div class="muted">error: ${r.error_message}</div>` : nothing}
                        </div>
                      </div>
                    `,
                  )}
                </div>
              `
        }
      </div>
    </section>
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${
              totalCount > 0
                ? html`<span class="mono">${enabledCount}/${totalCount}</span>`
                : nothing
            }
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!editable} @click=${() => params.onClear(params.agentId)}>
            Use All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!editable}
            @click=${() => params.onDisableAll(params.agentId)}
          >
            Disable All
          </button>
          <button class="btn btn--sm" ?disabled=${params.configLoading} @click=${params.onConfigReload}>
            Reload Config
          </button>
          <button class="btn btn--sm" ?disabled=${params.loading} @click=${params.onRefresh}>
            ${params.loading ? "Loading…" : "Refresh"}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${params.configSaving || !params.configDirty}
            @click=${params.onConfigSave}
          >
            ${params.configSaving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      ${
        !params.configForm
          ? html`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to set per-agent skills.
              </div>
            `
          : nothing
      }
      ${
        usingAllowlist
          ? html`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `
          : html`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `
      }
      ${
        !reportReady && !params.loading
          ? html`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `
          : nothing
      }
      ${
        params.error
          ? html`<div class="callout danger" style="margin-top: 12px;">${params.error}</div>`
          : nothing
      }

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${params.filter}
            @input=${(e: Event) => params.onFilterChange((e.target as HTMLInputElement).value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${filtered.length} shown</div>
      </div>

      ${
        filtered.length === 0
          ? html`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `
          : html`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${groups.map((group) =>
                  renderAgentSkillGroup(group, {
                    agentId: params.agentId,
                    allowSet,
                    usingAllowlist,
                    editable,
                    onToggle: params.onToggle,
                  }),
                )}
              </div>
            `
      }
    </section>
  `;
}

function renderAgentSkillGroup(
  group: SkillGroup,
  params: {
    agentId: string;
    allowSet: Set<string>;
    usingAllowlist: boolean;
    editable: boolean;
    onToggle: (agentId: string, skillName: string, enabled: boolean) => void;
  },
) {
  const collapsedByDefault = group.id === "workspace" || group.id === "built-in";
  return html`
    <details class="agent-skills-group" ?open=${!collapsedByDefault}>
      <summary class="agent-skills-header">
        <span>${group.label}</span>
        <span class="muted">${group.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${group.skills.map((skill) =>
          renderAgentSkillRow(skill, {
            agentId: params.agentId,
            allowSet: params.allowSet,
            usingAllowlist: params.usingAllowlist,
            editable: params.editable,
            onToggle: params.onToggle,
          }),
        )}
      </div>
    </details>
  `;
}

function renderAgentSkillRow(
  skill: SkillStatusEntry,
  params: {
    agentId: string;
    allowSet: Set<string>;
    usingAllowlist: boolean;
    editable: boolean;
    onToggle: (agentId: string, skillName: string, enabled: boolean) => void;
  },
) {
  const enabled = params.usingAllowlist ? params.allowSet.has(skill.name) : true;
  const missing = computeSkillMissing(skill);
  const reasons = computeSkillReasons(skill);
  return html`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${skill.emoji ? `${skill.emoji} ` : ""}${skill.name}</div>
        <div class="list-sub">${skill.description}</div>
        ${renderSkillStatusChips({ skill })}
        ${
          missing.length > 0
            ? html`<div class="muted" style="margin-top: 6px;">Missing: ${missing.join(", ")}</div>`
            : nothing
        }
        ${
          reasons.length > 0
            ? html`<div class="muted" style="margin-top: 6px;">Reason: ${reasons.join(", ")}</div>`
            : nothing
        }
      </div>
      <div class="list-meta">
        <label class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${enabled}
            ?disabled=${!params.editable}
            @change=${(e: Event) =>
              params.onToggle(params.agentId, skill.name, (e.target as HTMLInputElement).checked)}
          />
          <span class="cfg-toggle__track"></span>
        </label>
      </div>
    </div>
  `;
}
