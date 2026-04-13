# Agent Admin UI Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the OpenClaw-copied Agents admin page with a lean, two-tab UI (Overview + Tools) that reads real data from the backend's `.env`-driven config and live tool registry.

**Architecture:** A new `GET /api/agent/info` HTTP endpoint reads `Config` fields and the `CoreAgent`'s `ToolRegistry` at runtime; the frontend drops the unused tabs and fetches from this endpoint instead of the non-functional WebSocket stub.

**Tech Stack:** FastAPI (Python), Lit (TypeScript), existing `ToolRegistry.get_definitions()`, `Config` class

---

## File Map

| Action | Path |
|--------|------|
| **Create** | `backend/server/api/routes_agent_info.py` |
| **Modify** | `backend/server/api/app.py` |
| **Modify** | `control-ui/src/ui/types.ts` |
| **Modify** | `control-ui/src/ui/app-view-state.ts` |
| **Modify** | `control-ui/src/ui/app.ts` |
| **Modify** | `control-ui/src/ui/app-settings.ts` |
| **Modify** | `control-ui/src/ui/controllers/agents.ts` |
| **Modify** | `control-ui/src/ui/views/agents.ts` |
| **Modify** | `control-ui/src/ui/views/agents-panels-tools-skills.ts` |
| **Modify** | `control-ui/src/ui/app-render.ts` |

---

## Task 1: Backend — `/api/agent/info` endpoint

**Files:**
- Create: `backend/server/api/routes_agent_info.py`
- Modify: `backend/server/api/app.py` (lines 36-44, add include_router)

- [ ] **Step 1: Create `routes_agent_info.py`**

```python
"""Agent info API — exposes model config and live tool registry."""
from __future__ import annotations

from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Request

from backend.config import Config

router = APIRouter()


def _infer_provider() -> str:
    """Infer provider name from Config fields."""
    if Config.PRIMARY_LLM_PROTOCOL == "anthropic":
        return "anthropic"
    base = (Config.OPENAI_BASE_URL or "").lower()
    if "bigmodel.cn" in base:
        return "zhipu"
    if "minimax" in base:
        return "minimax"
    return "openai"


@router.get("/api/agent/info")
async def agent_info(request: Request) -> Dict[str, Any]:
    """Return agent LLM config, health stats, and registered tool list."""
    agent = getattr(request.app.state, "agent", None)

    tool_count = 0
    tools: List[Dict[str, Any]] = []
    if agent is not None:
        try:
            defs = agent._registry.get_definitions()
            tool_count = len(defs)
            tools = [
                {
                    "name": d["function"]["name"],
                    "description": d["function"].get("description", ""),
                    "parameters": d["function"].get("parameters", {}),
                }
                for d in defs
            ]
        except Exception:
            pass

    active_sessions: Optional[int] = None
    try:
        from backend.agent.session import get_session_store
        active_sessions = len(get_session_store().list_sessions())
    except Exception:
        pass

    fallback_model = Config.FALLBACK_LLM_MODEL  # None if not set

    return {
        "agent": {
            "name": "PT Vansting Agent",
            "version": "version3",
        },
        "llm": {
            "primary_model": Config.LLM_MODEL,
            "primary_provider": _infer_provider(),
            "fallback_model": fallback_model,
            "fallback_configured": fallback_model is not None,
            "max_tokens": Config.LLM_MAX_TOKENS,
        },
        "health": {
            "status": "ok",
            "active_sessions": active_sessions,
            "tool_count": tool_count,
        },
        "tools": tools,
    }
```

- [ ] **Step 2: Register router in `app.py`**

Add after line `app.include_router(admin_router)` (line 39):

```python
from backend.server.api.routes_agent_info import router as agent_info_router
app.include_router(agent_info_router)
```

- [ ] **Step 3: Smoke-test the endpoint**

Start the server (`python start.py`) and run:

```bash
curl http://localhost:8000/api/agent/info
```

Expected: JSON with `agent`, `llm`, `health`, `tools` keys. `tools` should be a non-empty list. `health.tool_count` should match `tools` length.

- [ ] **Step 4: Commit**

```bash
git add backend/server/api/routes_agent_info.py backend/server/api/app.py
git commit -m "feat(api): add GET /api/agent/info endpoint"
```

---

## Task 2: Frontend types and state

**Files:**
- Modify: `control-ui/src/ui/types.ts`
- Modify: `control-ui/src/ui/app-view-state.ts`
- Modify: `control-ui/src/ui/app.ts`
- Modify: `control-ui/src/ui/app-settings.ts`

- [ ] **Step 1: Add `AgentInfo` type to `types.ts`**

Add anywhere in `control-ui/src/ui/types.ts` (e.g. after the existing channel types block):

```typescript
export type AgentInfoTool = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

export type AgentInfo = {
  agent: { name: string; version: string };
  llm: {
    primary_model: string;
    primary_provider: string;
    fallback_model: string | null;
    fallback_configured: boolean;
    max_tokens: number;
  };
  health: {
    status: string;
    active_sessions: number | null;
    tool_count: number;
  };
  tools: AgentInfoTool[];
};
```

- [ ] **Step 2: Add `agentInfo` fields to `app-view-state.ts`**

In `control-ui/src/ui/app-view-state.ts`, change the `agentsPanel` type (line 176) and add three new fields right after `agentsSelectedId`:

```typescript
// Change:
agentsPanel: "overview" | "files" | "tools" | "skills" | "channels" | "cron";
// To:
agentsPanel: "overview" | "tools";

// Add these three fields after agentsSelectedId (line 175):
agentInfo: import("./types.js").AgentInfo | null;
agentInfoLoading: boolean;
agentInfoError: string | null;
```

- [ ] **Step 3: Update initial state in `app.ts`**

In `control-ui/src/ui/app.ts`, find the `@state() agentsPanel` declaration (around line 277) and update:

```typescript
// Change:
@state() agentsPanel: "overview" | "files" | "tools" | "skills" | "channels" | "cron" = "overview";
// To:
@state() agentsPanel: "overview" | "tools" = "overview";
```

Add these three new `@state()` declarations directly below it:

```typescript
@state() agentInfo: import("./types.js").AgentInfo | null = null;
@state() agentInfoLoading: boolean = false;
@state() agentInfoError: string | null = null;
```

- [ ] **Step 4: Update `app-settings.ts`**

In `control-ui/src/ui/app-settings.ts` (line 69), change the `agentsPanel` type:

```typescript
// Change:
agentsPanel?: "overview" | "files" | "tools" | "skills" | "channels" | "cron";
// To:
agentsPanel?: "overview" | "tools";
```

- [ ] **Step 5: Build check**

```bash
cd "control-ui" && npm run build 2>&1 | head -40
```

Expected: build succeeds or only shows pre-existing errors (not new TypeScript errors related to the type changes above).

- [ ] **Step 6: Commit**

```bash
git add control-ui/src/ui/types.ts control-ui/src/ui/app-view-state.ts control-ui/src/ui/app.ts control-ui/src/ui/app-settings.ts
git commit -m "feat(ui): add AgentInfo type and state fields"
```

---

## Task 3: Frontend controller — `loadAgentInfo()`

**Files:**
- Modify: `control-ui/src/ui/controllers/agents.ts`

- [ ] **Step 1: Add `loadAgentInfo` to `agents.ts`**

Replace the entire contents of `control-ui/src/ui/controllers/agents.ts` with:

```typescript
import type { GatewayBrowserClient } from "../gateway.ts";
import type { AgentInfo, AgentsListResult } from "../types.ts";

export type AgentsState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  agentsLoading: boolean;
  agentsError: string | null;
  agentsList: AgentsListResult | null;
  agentsSelectedId: string | null;
  agentInfo: AgentInfo | null;
  agentInfoLoading: boolean;
  agentInfoError: string | null;
};

export async function loadAgents(state: AgentsState) {
  if (!state.client || !state.connected) {
    return;
  }
  if (state.agentsLoading) {
    return;
  }
  state.agentsLoading = true;
  state.agentsError = null;
  try {
    const res = await state.client.request<AgentsListResult>("agents.list", {});
    if (res) {
      state.agentsList = res;
      const selected = state.agentsSelectedId;
      const known = res.agents.some((entry) => entry.id === selected);
      if (!selected || !known) {
        state.agentsSelectedId = res.defaultId ?? res.agents[0]?.id ?? null;
      }
    }
  } catch (err) {
    state.agentsError = String(err);
  } finally {
    state.agentsLoading = false;
  }
}

export async function loadAgentInfo(state: AgentsState) {
  if (state.agentInfoLoading) return;
  state.agentInfoLoading = true;
  state.agentInfoError = null;
  try {
    const res = await fetch("/api/agent/info");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.agentInfo = (await res.json()) as AgentInfo;
  } catch (err) {
    state.agentInfoError = String(err);
  } finally {
    state.agentInfoLoading = false;
  }
}
```

- [ ] **Step 2: Build check**

```bash
cd "control-ui" && npm run build 2>&1 | head -40
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add control-ui/src/ui/controllers/agents.ts
git commit -m "feat(ui): add loadAgentInfo controller"
```

---

## Task 4: Frontend view — agents.ts (tabs + overview)

**Files:**
- Modify: `control-ui/src/ui/views/agents.ts`

- [ ] **Step 1: Simplify `AgentsPanel` type (line 34)**

```typescript
// Change:
export type AgentsPanel = "overview" | "files" | "tools" | "skills" | "channels" | "cron";
// To:
export type AgentsPanel = "overview" | "tools";
```

- [ ] **Step 2: Simplify `AgentsProps` — add `agentInfo`, remove unused handlers**

In `AgentsProps` (lines 36–104), add `agentInfo` and remove the handlers for files/skills/channels/cron that are no longer needed. Replace the `AgentsProps` type with:

```typescript
export type AgentsProps = {
  loading: boolean;
  error: string | null;
  agentsList: AgentsListResult | null;
  selectedAgentId: string | null;
  activePanel: AgentsPanel;
  agentInfo: import("../types.js").AgentInfo | null;
  agentInfoLoading: boolean;
  agentInfoError: string | null;
  agentIdentityLoading: boolean;
  agentIdentityError: string | null;
  agentIdentityById: Record<string, AgentIdentityResult>;
  onRefresh: () => void;
  onSelectAgent: (agentId: string) => void;
  onSelectPanel: (panel: AgentsPanel) => void;
};
```

- [ ] **Step 3: Simplify `renderAgentTabs` (lines 345–369)**

```typescript
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
```

- [ ] **Step 4: Rewrite `renderAgentOverview` (lines 371–521)**

Replace the entire `renderAgentOverview` function with:

```typescript
function renderAgentOverview(params: {
  agentInfo: import("../types.js").AgentInfo | null;
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
        <!-- LLM 配置 -->
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
          ${llm.fallback_configured
            ? html`<div class="mono">${llm.fallback_model}</div>`
            : html`<div class="muted">未配置</div>`}
        </div>
        <div class="agent-kv">
          <div class="label">Max Tokens</div>
          <div class="mono">${llm.max_tokens.toLocaleString()}</div>
        </div>
        <!-- 健康状态 -->
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
```

- [ ] **Step 5: Update `renderAgents` — wire up new panel rendering (lines 115–317)**

In the `renderAgents` function body, replace the `props.activePanel === "overview"` block:

```typescript
// Change:
props.activePanel === "overview"
  ? renderAgentOverview({
      agent: selectedAgent,
      defaultId,
      configForm: props.configForm,
      // ...many params...
    })
  : nothing
// To:
props.activePanel === "overview"
  ? renderAgentOverview({
      agentInfo: props.agentInfo,
      agentInfoLoading: props.agentInfoLoading,
      agentInfoError: props.agentInfoError,
    })
  : nothing
```

And replace the `props.activePanel === "tools"` block:

```typescript
// Change:
props.activePanel === "tools"
  ? renderAgentTools({
      agentId: selectedAgent.id,
      configForm: props.configForm,
      configLoading: props.configLoading,
      configSaving: props.configSaving,
      configDirty: props.configDirty,
      onProfileChange: props.onToolsProfileChange,
      onOverridesChange: props.onToolsOverridesChange,
      onConfigReload: props.onConfigReload,
      onConfigSave: props.onConfigSave,
    })
  : nothing
// To:
props.activePanel === "tools"
  ? renderAgentTools({ tools: props.agentInfo?.tools ?? [] })
  : nothing
```

Remove all other panel conditionals (`files`, `skills`, `channels`, `cron`).

- [ ] **Step 6: Clean up unused imports in `agents.ts`**

Remove these imports that are no longer used (trace each one — only remove what's genuinely orphaned after the changes above):
- `renderAgentFiles`, `renderAgentChannels`, `renderAgentCron` from `./agents-panels-status-files.ts`
- `renderAgentSkills` from `./agents-panels-tools-skills.ts`
- `AgentsFilesListResult`, `ChannelsStatusSnapshot`, `CronJob`, `CronStatus`, `ReportRecord`, `ReportTask`, `ReportTaskConfig`, `SkillStatusReport` from `../types.ts`
- Unused utils: `agentBadgeText`, `buildAgentContext`, `buildModelOptions`, `normalizeModelValue`, `parseFallbackList`, `resolveModelFallbacks`, `resolveModelLabel`, `resolveModelPrimary` from `./agents-utils.ts` — only remove if not used elsewhere in this file

- [ ] **Step 7: Build check**

```bash
cd "control-ui" && npm run build 2>&1 | head -60
```

Expected: no errors related to the changes above.

- [ ] **Step 8: Commit**

```bash
git add control-ui/src/ui/views/agents.ts
git commit -m "feat(ui): simplify agents page to overview + tools tabs"
```

---

## Task 5: Frontend view — agents-panels-tools-skills.ts

**Files:**
- Modify: `control-ui/src/ui/views/agents-panels-tools-skills.ts`

- [ ] **Step 1: Replace `renderAgentTools` with simple expandable list**

Replace the entire `renderAgentTools` function (lines 27 onward) with the following. Leave `renderAgentSkills` in the file — just don't export or import it; do NOT delete the file.

```typescript
import { html, nothing } from "lit";
import type { AgentInfoTool } from "../types.ts";

// Simple expandable tool list — reads from /api/agent/info
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
  // Use a details/summary element for native expand/collapse — no state needed
  const paramsJson = JSON.stringify(tool.parameters, null, 2);
  const shortDesc = tool.description.length > 80
    ? tool.description.slice(0, 80) + "…"
    : tool.description;
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
```

Note: The `<details>/<summary>` elements provide native expand/collapse without JS state. Existing CSS classes `card`, `card-title`, `card-sub`, `mono`, `muted` match the app's design system. Two new CSS classes `tool-row`, `tool-row-summary`, `tool-row-params` need to be added in Task 6.

- [ ] **Step 2: Remove now-unused imports at the top of the file**

Delete all old imports that the new code doesn't reference. The new file top should be exactly:

```typescript
import { html, nothing } from "lit";
import type { AgentInfoTool } from "../types.ts";
```

(The `nothing` import can be kept; it's used by Lit templates.)

- [ ] **Step 3: Build check**

```bash
cd "control-ui" && npm run build 2>&1 | head -60
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add control-ui/src/ui/views/agents-panels-tools-skills.ts
git commit -m "feat(ui): replace tools panel with simple expandable list"
```

---

## Task 6: CSS — tool-row styles

**Files:**
- Find and modify the main CSS file (check `control-ui/src/` for a `.css` or style import file)

- [ ] **Step 1: Locate the main stylesheet**

```bash
ls control-ui/src/
```

Look for a `.css` file or a style-related import. Common locations: `control-ui/src/styles.css`, `control-ui/src/ui/styles.css`, or imported in `control-ui/src/index.ts`.

- [ ] **Step 2: Add tool-row styles**

In the main CSS file, append:

```css
/* Tool list in Agents > Tools tab */
.tool-row {
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 6px;
  overflow: hidden;
}

.tool-row-summary {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  list-style: none;
  background: var(--color-surface, #fff);
}

.tool-row-summary::-webkit-details-marker {
  display: none;
}

.tool-row-summary::before {
  content: "▶";
  font-size: 10px;
  color: var(--color-muted, #6b7280);
  transition: transform 0.15s;
  flex-shrink: 0;
}

details[open] > .tool-row-summary::before {
  transform: rotate(90deg);
}

.tool-row-params {
  margin: 0;
  padding: 12px;
  background: var(--color-code-bg, #f9fafb);
  font-size: 12px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
  border-top: 1px solid var(--color-border, #e5e7eb);
}
```

- [ ] **Step 3: Build check**

```bash
cd "control-ui" && npm run build 2>&1 | head -20
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add control-ui/src/
git commit -m "feat(ui): add tool-row CSS for expandable tool list"
```

---

## Task 7: Wire up `app-render.ts`

**Files:**
- Modify: `control-ui/src/ui/app-render.ts`

- [ ] **Step 1: Add `loadAgentInfo` import**

At the top of `app-render.ts`, add to the agents import line:

```typescript
// Change:
import { loadAgents } from "./controllers/agents.ts";
// To:
import { loadAgents, loadAgentInfo } from "./controllers/agents.ts";
```

- [ ] **Step 2: Pass `agentInfo` fields to `renderAgents`**

In the `renderAgents({...})` call (around line 544), replace all the old props with the new minimal set:

```typescript
renderAgents({
  loading: state.agentsLoading,
  error: state.agentsError,
  agentsList: state.agentsList,
  selectedAgentId: resolvedAgentId,
  activePanel: state.agentsPanel,
  agentInfo: state.agentInfo,
  agentInfoLoading: state.agentInfoLoading,
  agentInfoError: state.agentInfoError,
  agentIdentityLoading: state.agentIdentityLoading,
  agentIdentityError: state.agentIdentityError,
  agentIdentityById: state.agentIdentityById,
  onRefresh: async () => {
    await loadAgents(state);
    void loadAgentInfo(state);
    const agentIds = state.agentsList?.agents?.map((entry) => entry.id) ?? [];
    if (agentIds.length > 0) {
      void loadAgentIdentities(state, agentIds);
    }
  },
  onSelectAgent: (agentId) => {
    if (state.agentsSelectedId === agentId) return;
    state.agentsSelectedId = agentId;
  },
  onSelectPanel: (panel) => {
    state.agentsPanel = panel;
  },
})
```

- [ ] **Step 3: Call `loadAgentInfo` when the agents tab is opened**

Find where `state.tab === "agents"` triggers initial loading (search for the `loadAgents` call in the tab-switch handler, around line 585). Add `void loadAgentInfo(state);` alongside the existing `loadAgents` call:

```typescript
// Add after: await loadAgents(state);
void loadAgentInfo(state);
```

- [ ] **Step 4: Build check**

```bash
cd "control-ui" && npm run build 2>&1 | head -60
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add control-ui/src/ui/app-render.ts
git commit -m "feat(ui): wire loadAgentInfo into agents tab render"
```

---

## Task 8: End-to-end smoke test

- [ ] **Step 1: Start the backend**

```bash
python start.py
```

Expected: server starts on port 8000, no import errors.

- [ ] **Step 2: Verify `/api/agent/info`**

```bash
curl http://localhost:8000/api/agent/info
```

Expected: JSON with `tools` array non-empty, `llm.primary_model` matching what's in `.env`.

- [ ] **Step 3: Open the UI**

Navigate to `http://localhost:8000` → click **代理** tab.

Expected:
- Overview tab shows Primary Model, Provider, Fallback (or "未配置"), Max Tokens, status ● ok, tool count, session count.
- Tools tab shows a list of tool names with one-line descriptions; clicking ▶ expands the JSON schema.
- No "Files", "Skills", "Channels", "成单" tabs visible.

- [ ] **Step 4: Final commit and push**

```bash
git push origin main
```
