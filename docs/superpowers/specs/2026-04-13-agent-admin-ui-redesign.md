# Agent Admin UI Redesign — Design Spec

**Date:** 2026-04-13  
**Status:** Approved  
**Scope:** `control-ui` 代理页面 + 后端新增一个 HTTP 接口

---

## 背景

当前"代理"管理页面照搬自 OpenClaw，包含 6 个 tab：Overview、Files、Tools、Skills、Channels、成单（Cron）。其中大部分 tab 所依赖的 WebSocket 方法在 version3 gateway 中只有空 stub，实际无法工作。本次改造目标是裁剪至只保留 **Overview** 和 **Tools** 两个有意义的 tab，内容真实反映项目当前状态。

---

## 目标

1. 只保留 **Overview** 和 **Tools** 两个 tab，其余 tab 暂时隐藏。
2. Overview 展示：Primary Model、Fallback Model（来自 `.env`）+ 简单健康状态（工具数、活跃 Session 数、运行状态）。
3. Tools 展示：已注册工具的简洁列表，点击展开参数 JSON Schema，只读。
4. 不引入编辑/保存功能，所有数据只读。
5. 对未来多 agent 扩展无破坏性影响。

---

## 方案选择

采用 **方案 A：新增 HTTP 接口，前端直接 fetch**。

理由：完全绕开现有的空 WebSocket stub（`config.get` 当前返回 `{}`），改动范围小且清晰，无需触碰 gateway 层。

---

## 后端设计

### 新文件：`backend/server/api/routes_agent_info.py`

新增 `GET /api/agent/info` 端点，注册到 `api_router`（与 `/api/tools/metrics`、`/api/reports/` 同级，无需额外鉴权）。

**响应体结构：**

```json
{
  "agent": {
    "name": "PT Vansting Agent",
    "version": "version3"
  },
  "llm": {
    "primary_model": "claude-3-5-sonnet-20241022",
    "primary_provider": "anthropic",
    "fallback_model": "gpt-4o",
    "fallback_configured": true,
    "max_tokens": 4096
  },
  "health": {
    "status": "ok",
    "active_sessions": 3,
    "tool_count": 12
  },
  "tools": [
    {
      "name": "match_quotation",
      "description": "【价格查询】...",
      "parameters": { }
    }
  ]
}
```

**数据来源：**

| 字段 | 来源 |
|------|------|
| `agent.name/version` | 硬编码（当前单 agent） |
| `llm.primary_model` | `Config.LLM_MODEL` |
| `llm.primary_provider` | 根据 `Config.PRIMARY_LLM_PROTOCOL` / API key 推断 |
| `llm.fallback_model` | `Config.FALLBACK_LLM_MODEL`（若未配置则 `null`） |
| `llm.fallback_configured` | `bool(Config.FALLBACK_LLM_MODEL)` |
| `llm.max_tokens` | `Config.LLM_MAX_TOKENS` |
| `health.status` | 固定 `"ok"`（进程能响应即 ok） |
| `health.active_sessions` | `SessionStore` 统计，失败则返回 `null` |
| `health.tool_count` | `len(registry.get_definitions())` |
| `tools[]` | `registry.get_definitions()`（完整 OpenAI 格式） |

**注册：** 在 `backend/server/api/app.py` 的 `api_router` 中 include 新路由模块。

### 未来扩展路径

当前使用 `/api/agent/info`（无 ID，单 agent）。未来多 agent 时升级为 `/api/agents/{agent_id}/info`，改动仅限该端点，前端加 `agent_id` 参数即可。

---

## 前端设计

### Tab 裁剪

```typescript
// agents.ts
export type AgentsPanel = "overview" | "tools";
// 删除: "files" | "skills" | "channels" | "cron"
```

`renderAgentTabs` 只渲染 Overview 和 Tools 两个 tab。

### 新增数据类型

```typescript
// types.ts 新增
interface AgentInfo {
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
  tools: Array<{
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  }>;
}
```

### 改动文件清单

| 文件 | 改动 |
|------|------|
| `backend/server/api/routes_agent_info.py` | **新建**，实现 `/api/agent/info` |
| `backend/server/api/app.py` | include 新路由 |
| `control-ui/src/ui/types.ts` | 新增 `AgentInfo` 类型 |
| `control-ui/src/ui/views/agents.ts` | `AgentsPanel` 裁剪；`renderAgentTabs` 裁剪；`AgentsProps` 新增 `agentInfo`；重写 `renderAgentOverview` |
| `control-ui/src/ui/views/agents-panels-tools-skills.ts` | `renderAgentTools` 改为读 `agentInfo.tools`，删除 Skills 相关代码 |
| `control-ui/src/ui/controllers/agents.ts` | 删除 files/skills/channels/cron 加载逻辑；新增 `loadAgentInfo()` |
| `control-ui/src/ui/app-render.ts` | 删除对应 tab 事件绑定 |

### Overview 布局

```
┌─────────────────────────────────────────┐
│ PT Vansting Agent          [version3]   │
├──────────────┬──────────────────────────┤
│ LLM 配置     │ 健康状态                  │
│ Primary:     │ 状态: ● OK               │
│   claude-... │ 工具数: 12               │
│ Fallback:    │ 活跃 Session: 3          │
│   gpt-4o     │                         │
│ Max Tokens:  │                         │
│   4096       │                         │
└──────────────┴──────────────────────────┘
```

- `fallback_configured: false` → Fallback 行显示"未配置"（灰色）
- `active_sessions: null` → 显示"—"

### Tools 列表

```
▶ match_quotation          【价格查询】单品价格匹配...
▶ match_quotation_batch    【批量价格查询】并行执行...
▶ get_inventory_by_code    【库存查询】按编码查库存...
```

点击 `▶` 展开显示参数 JSON Schema（`<pre>` 格式，只读）。列表为空时显示"暂无已注册工具"。

---

## 边界处理

- `/api/agent/info` 请求失败：显示 inline error，与现有 error 风格一致
- `active_sessions` 统计失败：字段返回 `null`，UI 显示"—"
- `tools` 为空数组：显示"暂无已注册工具"

## 不改动的部分

- WebSocket gateway 不改动
- `agents-panels-status-files.ts` 文件保留（不再 import，未来可复用）
- `AgentsProps` 中 cron/channels/files/skills 相关字段类型定义保留，只不再传值（减少 diff 风险，避免引入 TS 错误）
- `selectedAgentId` 逻辑保留，支持未来多 agent 切换
