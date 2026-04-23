# Pages / Tabs Reference

> 所有前端 Tab 页面的名称、路由、用途和对应文件。
> Tab 定义源码：`ui/navigation.ts`（`TAB_GROUPS` + `Tab` 类型）。国际化文案：`i18n/locales/zh-CN.ts` / `en.ts`。

---

## Tab 总览

| Tab ID | 路由 | 中文名 | English | 功能说明 |
|--------|------|--------|---------|---------|
| `chat` | `/chat` | 聊天 | Chat | 直接网关聊天会话，用于快速干预 |
| `overview` | `/overview` | 概览 | Overview | 网关状态、入口点、快速健康检查 |
| `channels` | `/channels` | 业务知识 | Business Knowledge | 编辑 `wanding_business_knowledge.md`，供选型与匹配使用 |
| `instances` | `/instances` | 无货看板 | Out of Stock | 无货产品总览与列表，无需向 Agent 提问 |
| `sessions` | `/sessions` | 采购 | Procurement | 基于缺货生成采购建议，批准后落库并通知采购员 |
| `work` | `/work` | 报价 | Quotation | 批量报价：上传文件、识别、查价与库存、匹配填写、落库 |
| `cron` | `/cron` | 成单 | Order Fulfill | 待确认报价单列表，确认成单后转订单与锁库 |
| `skills` | `/skills` | 技能 | Skills | 管理技能可用性和 API 密钥注入 |
| `reports` | `/reports` | 周报 | Reports | 销售发票周报历史，点击查看完整报告 |
| `nodes` | `/nodes` | 节点 | Nodes | 配对设备、功能和命令公开 |
| `agents` | `/agents` | 代理 | Agents | 管理 Agent 工作区、工具和身份 |
| `config` | `/config` | 配置 | Config | 安全地编辑 `~/.openclaw/openclaw.json` |
| `debug` | `/debug` | 调试 | Debug | 网关快照、事件和手动 RPC 调用 |
| `logs` | `/logs` | 日志 | Logs | 网关文件日志的实时追踪 |
| `admin-data` | `/admin-data` | 数据管理 | Data | 万鼎价格库与产品映射表（需管理员密码） |
| `usage` | `/usage` | — | Usage | （未在导航菜单中，手动访问） |

---

## Tab 分组（导航栏结构）

```
nav.chat        → chat
nav.control     → overview | channels | instances | sessions | work | cron
nav.agent      → agents | skills | nodes | reports
nav.settings   → config | debug | logs | admin-data
```

---

## 文件对应关系

| Tab | View 文件 | Controller 文件 | 说明 |
|-----|-----------|----------------|------|
| `chat` | `ui/views/chat.ts` | `ui/controllers/chat.ts` | 聊天消息渲染、发送 |
| `overview` | `ui/views/overview.ts` | `ui/controllers/config.ts` | 健康检查、网关连接状态 |
| `channels` | `ui/views/channels.ts` | `ui/controllers/channels.ts` | 业务知识编辑（对应 `wanding_business_knowledge.md`） |
| `instances` | `ui/views/instances.ts` | `ui/controllers/oos.ts` | 无货看板（OOS Dashboard） |
| `sessions` | `ui/views/sessions.ts` | `ui/controllers/procurement.ts` | 采购建议 |
| `work` | `ui/views/work.ts` | — | 批量报价工作流 |
| `cron` | `ui/views/cron.ts` | `ui/controllers/cron.ts` | 待成单报价单 |
| `skills` | `ui/views/skills.ts` | `ui/controllers/skills.ts` | 技能管理 |
| `reports` | `ui/views/reports-tab.ts` | `ui/controllers/reports.ts` | 周报历史 |
| `nodes` | `ui/views/nodes.ts` | `ui/controllers/nodes.ts` | 节点管理 |
| `agents` | `ui/views/agents.ts` | `ui/controllers/agent*.ts` | Agent 工作区管理 |
| `config` | `ui/views/config.ts` | `ui/controllers/config.ts` | 配置表单 |
| `debug` | `ui/views/debug.ts` | `ui/controllers/debug.ts` | 调试快照 |
| `logs` | `ui/views/logs.ts` | `ui/controllers/logs.ts` | 日志追踪 |
| `admin-data` | `ui/views/admin-data.ts` | `ui/controllers/admin-data.ts` | 价格库/产品映射表 CRUD |
| `usage` | `ui/views/usage.ts` | — | Token 用量（需单独入口） |

---

## 关键页面详解

### 聊天（chat）— PVC 澄清 Quick Send

- **触发条件**：最后一条 assistant 消息包含连续编号列表（至少 3 项）且当前无流式输出。
- **交互**：在消息下方渲染 ClarifyCard（选项 chip + `其他类型（输入后按 Enter 发送）` 输入框）。
- **行为链路**：`ui/components/clarify-card.ts` 解析并渲染 → `ui/chat/grouped-render.ts` 注入组件 → `ui/views/chat.ts` 透传 `onQuickSend` → `ui/app-render.ts` 调用 `state.handleSendChat(text)`。
- **范围说明**：仅前端快捷发送，不改 `ask_clarification` 后端 schema，不新增 `match_quotation_batch` 的 per-item `product_type` 字段。

### 业务知识（channels）— `wanding_business_knowledge.md`

- **路径**：`data/wanding_business_knowledge.md`（在 Agent Team version3 根目录）
- **用途**：存放选型纠偏样本，LLM 选型时会参考此文件
- **View**：`ui/views/channels.ts`（实际渲染的是 Business Knowledge 编辑器）
- **Controller**：`ui/controllers/channels.ts`（调用 `loadBusinessKnowledge` / `saveBusinessKnowledge`）
- **API 端点**：`GET/PUT /api/business-knowledge`

### 无货看板（instances）— OOS Dashboard

- **路径**：`data/out_of_stock.db`（本地 SQLite，不通 Neon）
- **用途**：展示无货产品列表和统计数据，不走 Agent 直接查库
- **View**：`ui/views/oos-dashboard.ts`（含 `renderOosDashboard` / `renderShortageBlock`）
- **Controller**：`ui/controllers/oos.ts`（`loadOos` / `deleteOosItem` / `addOosItem`）
- **API 端点**：`GET /api/oos/list` / `GET /api/oos/stats`

### 数据管理（admin-data）— 万鼎价格库 / 产品映射

- **用途**：对 Neon 两张表（价格库、产品映射）做增删改查
- **View**：`ui/views/admin-data.ts`（含 `renderAdminData`）
- **Controller**：`ui/controllers/admin-data.ts`
- **认证**：`X-Admin-Token` header（`ADMIN_PASSWORD`）

---

## 页面入口注册（app.ts）

`ui/app.ts` 是根组件，`OpenClawApp` 在 `@state() tab` 变化时通过 `renderApp(state)` → `app-render.ts` 中的路由分发到对应 `views/` 文件的 `render*` 函数。

```typescript
// ui/navigation.ts — 路由定义
export type Tab =
  | "chat" | "overview" | "channels" | "instances"
  | "sessions" | "work" | "cron" | "skills"
  | "reports" | "nodes" | "agents" | "config"
  | "debug" | "logs" | "admin-data" | "usage"

// ui/app-render.ts — 渲染分发
import { renderChat } from "./views/chat.ts";
import { renderOverview } from "./views/overview.ts";
import { renderBusinessKnowledge } from "./views/channels.ts";
import { renderOosDashboard } from "./views/oos-dashboard.ts";
// ...
```
