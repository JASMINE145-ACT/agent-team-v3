## 文档目标

- **目的**：从本仓库中的 Paperclip 控制平面（`paperclip/server`、`paperclip/ui`、`paperclip/cli` 等）抽取可复用的工程模式，总结哪些设计可以迁移到 Agent Team version3（下文简称 *ATv3*）中，用于后续演进到“多 Agent + 控制面板”架构。
- **范围**：
  - 对比 Paperclip 与 ATv3 在 **Adapter/Agent 注册与治理、运行日志与活动流、实时事件与前端状态同步、配置与部署、CLI/运维工具** 五个方面的做法。
  - 只讨论架构与工程思路，不落具体业务规则。
- **不做的事**：本文件不直接约束最终的 API/表结构，只给出可行的演进方向，具体设计和拆分可按迭代再细化。

---

## 1. 统一的 Adapter / Agent Registry 与配置版本治理

### 1.1 Paperclip 的做法

- **Adapter Registry（适配器注册表）**
  - 位置：`paperclip/server/src/adapters/registry.ts`。
  - 设计要点：
    - 用一个集中注册表 `adaptersByType: Map<string, ServerAdapterModule>` 管理所有适配器（如 `claude_local`、`opencode_local` 等）。
    - 每个 `ServerAdapterModule` 不只是“执行函数”，还同时暴露：
      - `execute`：实际执行一次 run 的入口。
      - `testEnvironment`：环境自检。
      - `sessionCodec`：如何在 DB / 进程之间编码会话状态。
      - `models` / `listModels`：该 adapter 支持的模型及动态发现逻辑。
      - `agentConfigurationDoc`：一份结构化的“配置文档”，前端可据此自动生成配置表单。
    - Registry 提供统一入口：
      - `getServerAdapter(type)`：按类型取 adapter，找不到时回退到默认 `processAdapter`。
      - `listServerAdapters()` / `listAdapterModels(type)`：供 UI/CLI 枚举支持的适配器和模型。

- **Agent 配置与治理（agentService）**
  - 位置：`paperclip/server/src/services/agents.ts`。
  - 核心能力：
    - **配置版本**：`agentConfigRevisions` 记录每次变更的 before/after snapshot + `changedKeys`，提供：
      - `listConfigRevisions` / `getConfigRevision` / `rollbackConfigRevision`。
      - 回滚时自动校验：不能回滚到包含脱敏标记的版本，避免泄露历史敏感配置。
    - **权限模型**：通过 `normalizeAgentPermissions` 把高层角色（如 `operator`、`admin`）翻译成具体能力集，再由 `updatePermissions` 单独修改。
    - **生命周期治理**：
      - `pause/resume/terminate/remove/activatePendingApproval` 严格约束状态迁移（如 terminated 不可恢复；pending_approval 必须走审批）。
    - **组织结构**：`orgForCompany` / `getChainOfCommand` 通过 `reportsTo` 字段计算上下级关系。
    - **引用解析**：`resolveByReference` 支持 URL key / ID / 名称混合引用。

### 1.2 ATv3 现状

- **Adapter / Tool 注册**
  - 有 `ToolRegistry + AgentExtension` 体系（`backend/core/agent.py` / `backend/core/extension.py`），可以在单 Agent 进程内注册多种工具和业务扩展。
  - 目前默认只存在一个 `CoreAgent` 实例（在 `backend/server/api/app.py` 启动时写入 `app.state.agent`），业务角色通过 JAgent Extension 区分，没有“多 adapter、多 Agent 配置表”的显式模型。

- **配置版本**
  - `backend/config.py` 提供集中配置，但更多是“全局进程配置”（LLM、路径、WorkMode 开关等），没有 per-agent 的配置版本与回滚能力。

### 1.3 建议落地路径

- **Phase 1：抽象 Adapter Registry 接口**
  - 新增模块（示例名）`backend/core/adapters.py`：
    - 定义 `AdapterModule` 协议（type、execute()、models、config_schema、test_environment() 等）。
    - 提供 `get_adapter(type)`, `list_adapters()`, `list_adapter_models(type)` 等接口。
    - 把目前散落在 Config 里的 `LLM_MODEL / OPENAI_BASE_URL / FALLBACK_*` 等参数，统一归入默认 `local_openai` adapter 的配置。

- **Phase 2：引入 AgentConfig 概念（哪怕暂时只有 1 个实例）**
  - 在 DB 或简单 JSON/YAML 中定义 `AgentConfig`：
    - 字段可包含：`name`、`role`、`adapterType`、`adapterConfig`、`runtimeConfig`、`metadata`、`budgetMonthlyCents` 等。
  - 启动时通过 `AgentConfig` 构造 `CoreAgent`，而不是直接读全局 Config。
  - 每次修改 Agent 配置时：
    - 记录版本快照（before/after + changedKeys），写入 `agent_config_revisions`（表或文件）。
    - 暴露最小 API：`GET /api/agent/config/revisions` 与 `POST /api/agent/config/rollback/{revision_id}`，回滚逻辑可参考 Paperclip。

- **Phase 3：为多 Agent 与角色治理预留空间**
  - 将当前“只有一个 Agent”的常量假设弱化为“至少有一个 default agent”，在模型中为后续多 Agent（如 “报价 Agent”“库存 Agent”“审批 Agent”）预留：
    - `reports_to` / `org_path` / `permissions` 等字段。
  - 初期 UI 不必暴露所有治理功能，只需要能：
    - 查看当前 Agent 的配置快照。
    - 在紧急情况下滚回上一个版本。

---

## 2. 运行日志（Run Log）与活动日志（Activity Feed）

### 2.1 Paperclip 的做法

- **Run Log Store**
  - 位置：`paperclip/server/src/services/run-log-store.ts`。
  - 关键思想：
    - 将「运行元数据」与「大体积 streaming 日志」分离：
      - 元数据保存在 DB（run id、agent、company、status、开始/结束时间等）。
      - 日志内容写在 `data/run-logs/companyId/agentId/runId.ndjson` 中，每行形如 `{ts, stream, chunk}`。
    - API 设计：
      - `begin(companyId, agentId, runId)` 返回 `RunLogHandle`。
      - `append(handle, stream, chunk, ts)` 追加日志。
      - `read(handle, { offset, limitBytes })` 支持**按字节偏移**增量读取，适合前端“向后翻页”。
      - `finalize(handle)` 计算 SHA‑256 + 总字节数，用于审计与完整性校验。

- **Activity Log + Live Events**
  - 位置：`paperclip/server/src/services/activity-log.ts`。
  - 做法：
    - 所有重要业务行为（创建/更新 issue、Agent 状态变化、审批通过、成本事件等）统一通过 `logActivity(db, input)`：
      - 写入 `activityLog` 表（包含 actorType/actorId/action/entityType/entityId/runId/agentId/details）。
      - 通过 live events WS 广播 `activity.logged` 事件。
    - 前端 `LiveUpdatesProvider` 订阅 `activity.logged`：
      - 精准失效对应 React Query 缓存（issues/agents/projects/goals/costs/dashboard/sidebar badges 等）。
      - 调用 `buildActivityToast` 生成上下文很强的 toast（“X 将 ISSUE-123 的状态从 open 改为 in_progress”）。

### 2.2 ATv3 现状

- **Trace / 日志**
  - `CoreAgent.execute_react` 与 `backend/agent/work_executor.py` 都维护了丰富的 `trace`：
    - 包含 step、tool_call、observation、metrics 等。
  - 目前主要通过 HTTP 响应或 SSE 直接返回给前端：
    - 好处：实现简单。
    - 不足：**没有持久化**，事后难以按 run id 回溯；日志体积与 HTTP payload 强耦合。

- **统一 Activity 流**
  - 控制台已有 Work、OOS、Shortage 等页面，但没有统一的“活动流”视图：
    - 各页面列表更新多依靠手工刷新 / 页面重进。
    - 无法一眼看到近期“谁跑了哪次 Work、生成了哪些报价草稿、登记了哪些无货/缺货”等信息。

### 2.3 建议落地路径

- **最小版 Run Log Store**
  - 在 backend 新增 `backend/server/run_log_store.py`，抽象类似接口：
    - `begin(run_id: str, kind: str, context: dict) -> RunLogHandle`
    - `append(handle, stream: str, chunk: str, ts: datetime)`。
    - `read(handle, offset: int, limit_bytes: int) -> Iterator[str]`。
    - `finalize(handle) -> { size_bytes, sha256 }`。
  - 存储布局可以直接借鉴 Paperclip：
    - 根目录 `data/run-logs/`，再按 `company_id / agent_id / run_id.ndjson` 分层；若暂时无 company/agent 概念，可先用 `default/agent`。
  - Work 流集成：
    - 在 `run_work_flow` 或 `_process_files_pipeline` 里，在进入每个文件时 `begin()` 一个 run log。
    - 对 `tool_call` / `observation` / `metrics` 事件追加简化日志（可只写阶段、tool 名称与关键信息，避免输出用户敏感内容）。
    - 在 `/api/work/run-stream` 结果中回传 `run_log_ref`，供后续“Run 详情”页读取。

- **简化版 Activity Log**
  - 新建表（或 SQLite 表）`activity_log`，先覆盖高价值事件：
    - Work 执行（开始、成功、失败）。
    - 报价草稿保存成功（含 `draft_no` 和文件名）。
    - 无货/缺货记录新增。
  - 提供一个通用函数 `log_activity(kind, entity, details)`，在对应 FastAPI 路由里调用：
    - `routes_work.py`、`routes_quotation_drafts.py`、`routes_oos.py`、`routes_shortage.py` 等。
  - 前端增加“最近活动”列表组件：
    - 初期用 `GET /api/activity?limit=50` 轮询即可。
    - 以后再接入 WebSocket 事件（见下一节）。

---

## 3. WebSocket 实时事件与前端状态同步模式

### 3.1 Paperclip 的做法

- **统一的 Live Events WebSocket**
  - 位置：`paperclip/server/src/realtime/live-events-ws.ts`。
  - 特点：
    - 单一 WS 入口：`/api/companies/{companyId}/events/ws`。
    - Auth 兼容：
      - 浏览器 board 会话：从 Cookie / header 中解析 session，校验公司权限。
      - Agent API Key：验证 key 哈希，更新 `lastUsedAt`。
    - 心跳机制：定期 `ping`，客户端必须 `pong`，否则断开。
    - 与内部事件总线解耦：对外提供 `subscribeCompanyLiveEvents(companyId, callback)`，业务侧只需调用 `publishLiveEvent`。

- **前端 LiveUpdatesProvider**
  - 位置：`paperclip/ui/src/context/LiveUpdatesProvider.tsx`。
  - 做法：
    - 打开 WS，自动重连（带退避与 toast 节流）。
    - 将所有收到的 `LiveEvent` 统一交给 `handleLiveEvent(event)`：
      - 按事件类型（`heartbeat.run.*`、`agent.status`、`activity.logged` 等）：
        - 精准失效对应的 React Query key。
        - 选择性弹 toaster 通知。
      - 这样每个业务页面不需要自己管理 WS，只关心订阅缓存 key。

### 3.2 ATv3 现状

- **已有 WebSocket 网关**
  - ATv3 已有一套 Gateway WS（`backend/server/gateway` + Control UI `app-gateway.ts`），主要用于 Chat/Session 控制台，不直接服务 Work 页。

- **Work 页使用 SSE**
  - Work 页使用 `/api/work/run-stream` + SSE：
    - 事件类型只包括 `stage` 与最终 `result`。
    - 状态更新完全由 `controllers/work.ts` 里的 `executeRunStreamOnce` 消费，不透出给全局其他视图。

### 3.3 建议落地路径

- **统一“控制面实时事件”的思路**
  - 不必完全照搬 Paperclip 的公司维度 live events，可以按当前架构定义一条“控制面事件总线”：
    - 事件类型示例：
      - `work.run.status`（含 run_id、文件名、状态、耗时）。
      - `quotation.draft.saved`（含 draft_no、draft_id、来源 Work run）。
      - `oos.record.created` / `shortage.record.created` 等。
  - 服务端：
    - 复用 Gateway WS，增加一个简单的 `publish_control_event(event)` 函数，在相关路由结束后调用。
  - 前端：
    - 为 Lit 写一个 `LiveEventsController`：
      - 监听 Gateway 的事件流。
      - 对应事件类型，调用各 controller（如 Work/OOS/Shortage/Overview）的 `reloadXxx()`。
      - 同时生成 toast 提示（运行成功/失败、草稿保存成功等）。

- **与现有 SSE 的关系**
  - 短期内可以保留 `/api/work/run-stream` 作为“单 run 的细粒度进度流”，而 WS 控制面事件仅负责：
    - 通知别的页面“某次 Work 完成/失败”。
    - 通知“有新的报价草稿 / 新的缺货记录”。
  - 长期可以视需要将 Work 流主循环迁移到 WS 模式，但不是近期必要条件。

---

## 4. 配置与部署模式（Config / Env 工程化）

### 4.1 Paperclip 的做法

- **强类型 Config + 部署模式**
  - 位置：`paperclip/server/src/config.ts`。
  - 特点：
    - 使用枚举与受限字符串集描述关键模式：
      - `DeploymentMode`（本地开发 / 受信环境 / 公开 SaaS）。
      - `DeploymentExposure`（private / public）决定 HTTP 层的 hostname/Origin 守卫。
      - `AuthBaseUrlMode`、`SecretProvider`、`StorageProvider` 等。
    - `.paperclip-env` 提供项目级 env 文件，优先于系统 env。
    - 对配置值做边界校验：如 TTL/间隔下限/上限，避免“写错一个 0”造成灾难。

- **路径与资源 home-aware 化**
  - 通过 `home-paths.ts` 将嵌入式 Postgres、备份目录、run-logs、存储根目录等都映射到“用户 home 下的某个路径”，在不同操作系统和部署环境下保持一致的结构。

### 4.2 ATv3 现状

- 已有较完善的 `backend/config.py`：
  - 多层 `.env` 合并逻辑（version3 根目录、repo 根目录、oos 子模块）。
  - 区分本地与 Vercel/Render 环境的默认路径（如 `/tmp`）。
  - 提供 Work 模式开关（`WORK_USE_PIPELINE`）与 run id TTL（`WORK_RUN_ID_TTL_SECONDS`）。
- 不足主要在于：
  - 没有“部署模式/暴露模式”概念，所有环境视为等价。
  - 部分与可靠性/运维有关的参数仍然硬编码在代码中（Work 超时、重试策略、context 上限等）。

### 4.3 建议落地路径

- **引入 DeploymentMode / Exposure 概念**
  - 在 `Config` 中增加字段：
    - `DEPLOYMENT_MODE`：`"local_trusted" | "authenticated" | "public_saas"`。
    - `DEPLOYMENT_EXPOSURE`：`"private" | "public"`。
  - 在如下位置读取并控制行为：
    - Gateway WebSocket：是否允许跨域 / 未认证访问。
    - WeCom 回调：生产环境默认要求 HTTPS 与签名校验；本地 DEV 允许简化。
    - 控制 UI 挂载：是否允许直接在根路径暴露 UI。

- **将 Work / Gateway 的关键参数集中到 Config**
  - 抽取以下参数到 Config + 校验：
    - Work 前端的 run 超时时间 / resume 超时（现定义在 `controllers/work.ts` 中的 `RUN_TIMEOUT_MS` 等）。
    - Work pipeline 的最大步数 / context 上限（`_WORK_CONTEXT_MAX_CHARS` / `_CONTEXT_MAX_CHARS`）。
    - Gateway 侧的最大会话 TTL、消息大小上限等。

- **上传 / 临时文件 / 报价模板路径统一管理**
  - 为 Work 相关数据定义统一前缀，例如：
    - `WORK_DATA_DIR`（默认 `data/work/`）。
    - `UPLOAD_DIR`（已存在，可与 WorkDataDir 组合使用）。
  - 所有 Excel 模板/填充中间产物/运行输出路径都相对这个目录，便于跨平台/云环境迁移。

---

## 5. CLI Context Profile 与本地运维工具模式

### 5.1 Paperclip 的做法

- **CLI Context（多环境 Profile）**
  - 位置：`paperclip/cli/src/client/context.ts`。
  - 能力：
    - 通过 `.paperclip/context.json` 维护多个 profile：
      - 每个 profile 包含 `apiBase`、`companyId`、`apiKeyEnvVarName` 等。
    - 提供 `readContext/writeContext/upsertProfile/setCurrentProfile/resolveProfile`：
      - CLI 命令不直接读 env，而是先解析当前 profile，再从指定的 env 变量取 key。

- **统一 HTTP Client**
  - 位置：`paperclip/cli/src/client/http.ts` `PaperclipApiClient`。
  - 做法：
    - 封装常用 HTTP 行为：构建 URL、附加 Bearer token、设置 `x-paperclip-run-id` header。
    - 错误统一包装成 `ApiRequestError`，内含 status/body/details，命令实现可以做更好的提示。

### 5.2 ATv3 现状

- 当前主要依赖：
  - FastAPI HTTP + 浏览器 UI 作为主要操作入口。
  - 若干测试脚本/pytest 直接 import Python 代码调用（如 `tests/test_quotation_pipeline.py`），但没有统一 CLI 工具和 profile。
- 对于“运维/批量调用”场景（如批量跑 Work、导出最近 N 次报价草稿、巡检缺货/OOS 数据），需要工程师手写 ad‑hoc 脚本或在控制 UI 上点操作，效率较低。

### 5.3 建议落地路径

- **引入 `.agent-jk/context.json`（命名可调整）**
  - 结构可参考 Paperclip：
    - `version`、`currentProfile`、`profiles: { local, staging, prod, ... }`。
  - 每个 profile 至少要包含：
    - `apiBase`（如 `http://localhost:8000`、内网地址、公网网关）。
    - `apiKeyEnvVarName`（若未来引入 API Key / Token 的话）。

- **实现最小 CLI 用例**
  - 可以从 Python 开始，在根目录下提供 `cli/`（或 `scripts/cli_*.py`），封装：
    - `work run`：对给定文件/目录批量触发 `/api/work/run` 或 `/api/work/run-stream`，打印 run id / 状态 / 报价草稿编号。
    - `work list-runs`：调用新的 run log / activity API，列出最近 N 次 Work 执行及错误摘要。
    - `oos/shortage inspect`：查询指定时间窗口/文件的无货/缺货统计。
  - 这些命令都只依赖一个小的 HTTP client 封装（类似 `PaperclipApiClient`），重用 context profile 解析逻辑。

---

## 6. 优先级建议

基于当前 ATv3 的成熟度与改造成本，建议按下面顺序逐步引入上述思路：

1. **Run Log + Activity Log（可观测性优先）**
   - 先实现轻量的 run 日志存储和统一活动流：
     - 有助于排查 Work 流/报价 Excel 问题，也为后续 UI 改造打基础。
2. **Adapter / Agent Registry + 配置版本**
   - 把“只有一个 Agent + 一份 config.py”的隐含模型，升级为“有 AgentConfig + adapterType + 版本快照”的显式模型。
   - 在不改变现有业务行为的前提下，为未来多 Agent/多适配器打开空间。
3. **WebSocket 控制面事件 + 前端 Live 更新**
   - 用极少量事件类型（Work 运行状态 + 草稿保存 + OOS/Shortage 变化）打通 Gateway WS 与控制 UI 的实时反馈：
     - 直接改善“看板刷新”与“长流程反馈”的体验。
4. **配置与部署模式工程化**
   - 引入 DeploymentMode/Exposure 等枚举，并将 Work/Gateway/上下文压缩相关的关键参数集中到 Config。
   - 便于 Render/自建/本地三种场景下做有区别的安全与性能策略。
5. **CLI Context 与运维工具**
   - 当上面几步稳定后，再引入 CLI context/profile 与统一 HTTP client，提升运维人员批量操作和巡检体验。

以上各项既可以逐步独立实施，也可以在后续大版本 refactor 中统一规划；本文件可作为“对齐 Paperclip 经验”的参考清单。

