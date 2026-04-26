# Knowledge Graph — Concept Index

> Maps key concepts / terms to relevant documentation files.
> Use this when you know what you want to do but not which file to read.

---

## Core Architecture

| Concept | Files |
|---------|-------|
| ReAct loop / CoreAgent | `spec/backend/index.md`, `claude.md`, `workflow.md` |
| Single-agent vs multi-agent | `claude.md` (架构章节) |
| Skills system (skills.py) | `spec/backend/skills-system.md`, `claude.md` |
| Tool registration (AgentExtension) | `spec/backend/tools-catalog.md`, `spec/backend/directory-structure.md` |
| Session persistence | `spec/backend/database-guidelines.md`, `claude.md` |

---

## LLM / Model Routing

| Concept | Files |
|---------|-------|
| PRIMARY_LLM_PROTOCOL=openai vs anthropic | `spec/backend/index.md` (PRIMARY_LLM_PROTOCOL 章节), `claude.md` |
| Anthropic Messages API routing | `spec/backend/index.md` (1211 fix) |
| Fallback chain (GLM-4.5-air) | `spec/backend/config-reference.md`, `claude.md` |
| GLM / MiniMax thinking model | `claude.md`, `doc/待办事宜.md` |
| LLM selector (match_quotation) | `spec/backend/index.md` (match_quotation 章节) |
| Token budget / max_tokens | `spec/backend/config-reference.md` |

---

## Business Logic

| Concept | Files |
|---------|-------|
| match_quotation (万鼎选型) | `claude.md`, `spec/backend/skills-system.md` |
| get_inventory_by_code (库存查询) | `spec/backend/tools-catalog.md`, `claude.md` |
| 无货 / OOS 登记 | `spec/backend/tools-catalog.md`, `spec/backend/reports-system.md` |
| 报价单流水线 (Work) | `claude.md`, `spec/backend/tools-catalog.md` |
| 业务知识 (wanding_business_knowledge.md) | `claude.md`, `spec/backend/skills-system.md` |
| Rework / 纠错机制 | `spec/backend/index.md` (Rework Mechanism), `workflow.md` |

---

## Data & Storage

| Concept | Files |
|---------|-------|
| Neon Postgres (OOS/Shortage) | `spec/backend/database-guidelines.md`, `README.md` |
| SQLite fallback | `spec/backend/database-guidelines.md` |
| Session store (data/sessions/) | `claude.md`, `README.md` |
| 业务文件 (价格库/映射表) | `README.md`, `claude.md` |

---

## Frontend / UI

| Concept | Files |
|---------|-------|
| Lit Web Components | `spec/frontend/index.md`, `spec/frontend/component-guidelines.md` |
| 16 tabs / pages routing | `spec/frontend/pages.md` |
| GatewayBrowserClient (WebSocket) | `spec/frontend/index.md` |
| Controller pattern | `spec/frontend/index.md` |
| i18n system | `spec/frontend/i18n-guidelines.md` |
| Type safety | `spec/frontend/type-safety.md` |

---

## Thinking Display (Reasoning)

| Concept | Files |
|---------|-------|
| Model Thinking vs Selector Reasoning | `spec/backend/index.md` (Reasoning/Thinking 显示链路) |
| reasoningLevel 渲染 | `spec/frontend/index.md`, `spec/frontend/thinking-display-config.md` |
| save_turn(thinking=...) | `spec/backend/index.md` (会话持久化) |

---

## Control UI / 管理面板

| Concept | Files |
|---------|-------|
| 价格库管理 | `spec/backend/api-routes.md` (routes_admin) |
| 产品映射表 | `spec/backend/api-routes.md` |
| reports 系统 UI | `spec/backend/reports-system.md` |

---

## WeCom Integration

| Concept | Files |
|---------|-------|
| HTTP 回调 | `claude.md`, `doc/wecom_excel_逻辑说明.md` |
| 长连接 Bot | `claude.md`, `start_wecom_bot.py` |
| 告警发送 (dispatch_out_of_stock_alert) | `claude.md` |

---

## Quality & Process

| Concept | Files |
|---------|-------|
| Trellis workflow | `workflow.md` |
| Slash commands (/trellis:*) | `.cursor/commands/trellis-*.md` |
| Cross-layer thinking | `spec/guides/cross-layer-thinking-guide.md` |
| Code reuse | `spec/guides/code-reuse-thinking-guide.md` |
| Lint / test commands | `README.md`, `claude.md` |

---

## Deployment

| Concept | Files |
|---------|-------|
| 云端部署清单 | `doc/云端部署准备清单.md`, `README.md` |
| Render / Railway / Vercel | `README.md` |
| Docker | `README.md`, `Dockerfile` |
| Environment variables | `spec/backend/config-reference.md` |

---

## Recent Changes / Decision History

| Topic | When | Files |
|-------|------|-------|
| Reports Phase-2 daemon restart fix | 2026-04 | `spec/backend/reports-system.md` |
| Neon 库表名/列名修正 | 2026-04-20 | `spec/backend/database-guidelines.md` |
| KnowledgeBackend Neon 主存储 | 2026-04-20 | `spec/backend/index.md` |
| GLM 1211 fix | 2026-04-02 | `spec/backend/index.md` |
| Anthropic Messages API routing | 2026-04-01 | `spec/backend/index.md` |
| Unified reply format | 2026-04-01 | `claude.md` |

---

**Note**: This index is a supplement to the file-based navigation in `spec/` and `workflow.md`.
Search `.trellis/` when you know the concept but not the file.