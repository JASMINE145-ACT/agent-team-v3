import { html, nothing } from "lit";
import type { AgentIdentityResult, AgentsListResult, AgentInfo } from "../types.ts";
import { renderAgentTools } from "./agents-panels-tools-skills.ts";
import { agentBadgeText, normalizeAgentLabel, resolveAgentEmoji } from "./agents-utils.ts";

export type AgentsPanel = "overview" | "tools";

export type AgentsProps = {
  loading: boolean;
  error: string | null;
  agentsList: AgentsListResult | null;
  selectedAgentId: string | null;
  activePanel: AgentsPanel;
  agentInfo: AgentInfo | null;
  agentInfoLoading: boolean;
  agentInfoError: string | null;
  agentIdentityLoading: boolean;
  agentIdentityError: string | null;
  agentIdentityById: Record<string, AgentIdentityResult>;
  onRefresh: () => void;
  onSelectAgent: (agentId: string) => void;
  onSelectPanel: (panel: AgentsPanel) => void;
};

export function renderAgents(props: AgentsProps) {
  const agents = props.agentsList?.agents ?? [];
  const defaultId = props.agentsList?.defaultId ?? null;
  const selectedId = props.selectedAgentId ?? defaultId ?? agents[0]?.id ?? null;
  const selectedAgent = selectedId
    ? (agents.find((agent) => agent.id === selectedId) ?? null)
    : null;

  return html`
    <div class="agents-layout">
      <section class="card agents-sidebar">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Agents</div>
            <div class="card-sub">${agents.length} configured.</div>
          </div>
          <button class="btn btn--sm" ?disabled=${props.loading} @click=${props.onRefresh}>
            ${props.loading ? "Loading…" : "Refresh"}
          </button>
        </div>
        ${
          props.error
            ? html`<div class="callout danger" style="margin-top: 12px;">${props.error}</div>`
            : nothing
        }
        <div class="agent-list" style="margin-top: 12px;">
          ${
            agents.length === 0
              ? html`
                  <div class="muted">No agents found.</div>
                `
              : agents.map((agent) => {
                  const badge = agentBadgeText(agent.id, defaultId);
                  const emoji = resolveAgentEmoji(agent, props.agentIdentityById[agent.id] ?? null);
                  return html`
                    <button
                      type="button"
                      class="agent-row ${selectedId === agent.id ? "active" : ""}"
                      @click=${() => props.onSelectAgent(agent.id)}
                    >
                      <div class="agent-avatar">${emoji || normalizeAgentLabel(agent).slice(0, 1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${normalizeAgentLabel(agent)}</div>
                        <div class="agent-sub mono">${agent.id}</div>
                      </div>
                      ${badge ? html`<span class="agent-pill">${badge}</span>` : nothing}
                    </button>
                  `;
                })
          }
        </div>
      </section>
      <section class="agents-main">
        ${
          !selectedAgent
            ? html`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `
            : html`
                ${renderAgentHeader(
                  selectedAgent,
                  defaultId,
                  props.agentIdentityById[selectedAgent.id] ?? null,
                )}
                ${renderAgentTabs(props.activePanel, (panel) => props.onSelectPanel(panel))}
                ${
                  props.activePanel === "overview"
                    ? renderAgentOverview({
                        agentInfo: props.agentInfo,
                        agentInfoLoading: props.agentInfoLoading,
                        agentInfoError: props.agentInfoError,
                      })
                    : nothing
                }
                ${
                  props.activePanel === "tools"
                    ? renderAgentTools({ tools: props.agentInfo?.tools ?? [] })
                    : nothing
                }
              `
        }
      </section>
    </div>
  `;
}

function renderAgentHeader(
  agent: AgentsListResult["agents"][number],
  defaultId: string | null,
  agentIdentity: AgentIdentityResult | null,
) {
  const badge = agentBadgeText(agent.id, defaultId);
  const displayName = normalizeAgentLabel(agent);
  const subtitle = agent.identity?.theme?.trim() || "Agent workspace and routing.";
  const emoji = resolveAgentEmoji(agent, agentIdentity);
  return html`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">${emoji || displayName.slice(0, 1)}</div>
        <div>
          <div class="card-title">${displayName}</div>
          <div class="card-sub">${subtitle}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${agent.id}</div>
        ${badge ? html`<span class="agent-pill">${badge}</span>` : nothing}
      </div>
    </section>
  `;
}

function renderAgentTabs(active: AgentsPanel, onSelect: (panel: AgentsPanel) => void) {
  const tabs: Array<{ id: AgentsPanel; label: string }> = [
    { id: "overview", label: "Overview" },
    { id: "tools", label: "Tools" },
  ];
  return html`
    <div class="agent-tabs">
      ${tabs.map(
        (tab) => html`
          <button
            class="agent-tab ${active === tab.id ? "active" : ""}"
            type="button"
            @click=${() => onSelect(tab.id)}
          >
            ${tab.label}
          </button>
        `,
      )}
    </div>
  `;
}

function renderAgentOverview(params: {
  agentInfo: AgentInfo | null;
  agentInfoLoading: boolean;
  agentInfoError: string | null;
}) {
  const { agentInfo, agentInfoLoading, agentInfoError } = params;

  if (agentInfoLoading) {
    return html`<section class="card"><div class="muted">Loading…</div></section>`;
  }
  if (agentInfoError) {
    return html`<section class="card"><div class="callout danger">${agentInfoError}</div></section>`;
  }
  if (!agentInfo) {
    return html`<section class="card"><div class="muted">No data.</div></section>`;
  }

  const { llm, health, agent } = agentInfo;

  return html`
    <section class="card">
      <div class="card-title">${agent.name}</div>
      <div class="card-sub" style="margin-bottom: 16px;">${agent.version}</div>
      <div class="agents-overview-grid">
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${llm.primary_model}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Provider</div>
          <div class="mono">${llm.primary_provider}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Fallback Model</div>
          ${
            llm.fallback_configured
              ? html`<div class="mono">${llm.fallback_model}</div>`
              : html`<div class="muted">未配置</div>`
          }
        </div>
        <div class="agent-kv">
          <div class="label">Max Tokens</div>
          <div class="mono">${llm.max_tokens.toLocaleString()}</div>
        </div>
        <div class="agent-kv">
          <div class="label">状态</div>
          <div>
            <span style="color: var(--color-success, #22c55e);">●</span>
            ${health.status}
          </div>
        </div>
        <div class="agent-kv">
          <div class="label">工具数</div>
          <div class="mono">${health.tool_count}</div>
        </div>
        <div class="agent-kv">
          <div class="label">活跃 Session</div>
          <div class="mono">${health.active_sessions ?? "—"}</div>
        </div>
      </div>
    </section>
  `;
}
