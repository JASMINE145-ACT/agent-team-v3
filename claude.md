# Agent Team version3 — 项目说明（Claude 用）

### 企业微信长连接 Bot — 超时与 Excel 绑定补充

- WeCom 长连接通路通过 `backend/wecom_bot/handler.py` 的 `handle_wecom_message` 将文本消息转给 `CoreAgent.execute_react`。
- 为避免单条慢请求长期占用长连接，`handle_wecom_message` 使用 `asyncio.wait_for(_call_agent(), timeout=90)` 做超时保护：超过 **90 秒** 仍未返回时，会在日志中记录 warning，并向企业微信用户回复「处理超时，请稍后重试。」。
- 企业微信长连接接收 Excel 报价单时走 `handle_wecom_file`：先用 `generate_excel_summary` + `put_excel_summary` 生成并缓存**精简摘要**，再在特性开关 `Config.WECHAT_EXCEL_FULL_PARSE_ENABLED` 打开时调用 `parse_excel_full` + `put_excel_context` 生成**完整结构化解析结果**（含每个 sheet 的行数/列名/预览行），并以 `file_id` 为 key 缓存在进程内，供后续工具/MCP skill 通过 `file_id`/`file_path` 访问同一份 Excel。
- `_bind_session_file_path` 会把本次上传的 `file_path` 写入会话（`session.file_path`），`_load_wecom_session_context` 在后续文本消息中读出并返回 `{ file_path, file_id, excel_meta }`，其中 `excel_meta` 至少包含 `sheets_count` 与 `total_rows`，`CoreAgent.execute_react` 会在 user 消息末尾追加 `[Context: 已上传报价单, file_path=...]` 与 `file_id` 说明，并在有摘要时追加一条 `[ExcelSummary]` system 消息，用于提示 LLM 何时调用 Excel 工具而不是直接在 prompt 中展开整表。
**单主 Agent 架构**：无子 Agent 委托，主 Agent 掌握全部技能，根据用户意图直接选用工具完成目标。

## 与 version2 的区别

| 项目 | version2 | version3 |
|------|----------|----------|
| 架构 | MasterAgent + 子 Agent（Inventory / Quote）委托 | 单 Agent，直接调用所有工具 |
| 工具 | Master 仅 4 个（delegate、execute_plan、run_quotation_fill、ask_clarification） | 库存 + 报价单 + 无货 + 询价填充 + 澄清，合并为一套工具列表 |
| 技能描述 | 在 Master 的 prompt 里写「何时 delegate 给谁」 | 在 system prompt 里按**技能**分组写清**目标**与**何时用** |

## 目录结构

（已按 `doc/项目结构规整方案.md` 规整；框架化改造后见 `doc/改造.md`。）

```
Agent Team version3/
├── doc/
│   ├── 项目结构规整方案.md       # 规整方案与 import 替换规则
│   ├── 改造.md                   # 框架化改造计划（core + plugins + Registry）
│   ├── ReAct范式对比.md           # version3 与 OpenCode 的 ReAct 范式对比
│   ├── wecom_excel_逻辑说明.md   # WeCom 接收/解析 Excel 的完整流程与已知缺陷
│   ├── agent-injected-content.md # 影响推理执行的全部注入内容（system prompt、工具描述、每轮注入、会话/工具记忆）
│   ├── tool-orchestration-and-contract-issues.md # 工具编排与结果契约：Codex 反馈的三点问题与思考框架（逐条 item_status、固定文案耦合、双解析工具策略）
│   └── …（其他文档）
├── backend/
│   ├── config.py                 # 后端全局配置（.env 含根目录、backend/tools/oos）
│   ├── core/                     # 纯框架，零业务依赖（改造后）
│   │   ├── registry.py           # ToolRegistry 查表分发
│   │   ├── extension.py          # AgentExtension ABC + ExtensionContext
│   │   ├── agent.py              # CoreAgent（ReAct 引擎，接受 extensions）
│   │   └── tool_utils.py         # tool_error / validate_file_path
│   ├── plugins/
│   │   └── jagent/               # JAgent 业务插件
│   │       ├── skills.py         # 技能描述常量（从 agent 平移）
│   │       └── extension.py      # JAgentExtension（注册工具 + 技能 prompt）
│   ├── agent/                    # 兼容层（薄封装）
│   │   ├── agent.py              # SingleAgent = CoreAgent 子类，extensions=[JAgentExtension()]
│   │   ├── tools.py              # 工具实现与 EXTRA_TOOLS（供 Extension 引用）；execute_tool 仍供 legacy 桥接
│   │   └── session.py            # 会话存储，未动
│   ├── tools/                    # 工具实现层 + 统一工具抽象
│   │   ├── base.py               # BaseTool / ToolResult（统一工具抽象）
│   │   ├── tool_registry.py      # 后端工具注册表（call(name, **kwargs) + metrics）
│   │   ├── inventory_tool.py     # 库存查询封装（inventory_lookup）
│   │   ├── alert_tool.py         # 行情告警服务封装（alert.create/list/delete）
│   │   ├── oos_register_tool.py  # 无货登记封装（文件/文字两种路径）
│   │   ├── inventory/            # 库存与万鼎（领域实现）
│   │   ├── quotation/            # 报价单 + 询价填充（领域实现）
│   │   └── oos/                  # 无货登记/列表/统计（领域实现）
│   └── server/                   # 网络层
│       ├── api/                  # FastAPI；startup 创建 CoreAgent 放入 app.state.agent
│       └── gateway/              # WebSocket；chat 从 ws.app.state.agent 取 agent
├── control-ui/                   # 前端（Vite + Lit），构建产出 dist/control-ui/
├── run_backend.py                # 入口：uvicorn backend.server.api.app:app
├── cli_agent.py                  # 入口：backend.agent.SingleAgent
├── start.py
├── requirements.txt
└── claude.md
```

**框架化改造（概要）**：ReAct 引擎与业务解耦，`CoreAgent` 不 import 业务模块；工具由 `ToolRegistry` 查表分发，替代原 `execute_tool` 内 if/elif 链；业务通过 `AgentExtension` 注册（技能 prompt 在 `plugins/jagent/skills.py`，注册在 `plugins/jagent/extension.py`）。启动时 `app.py` 创建 `CoreAgent(extensions=[JAgentExtension()])` 并写入 `app.state.agent`，`routes.py` 与 `gateway/handlers/chat.py` 从 `request.app.state.agent` / `ws.app.state.agent` 取 agent。功能行为保持不变；详见 `doc/改造.md`。

**独立运行**：从项目根目录执行 `python run_backend.py` 或 `python cli_agent.py` 即可；无根目录 `config.py`/`models/`，配置与模型均用 `backend.tools.oos` 等包内模块。

**云端部署准备**：见 `doc/云端部署准备清单.md`（环境变量、业务文件、前端 dist、持久化、Docker）；详细步骤与平台推荐见根目录 `README.md` 中「部署到云端」。部署时需安装 `requirements.txt` 中的依赖（包括企业微信长连接使用的 `wecom-aibot-sdk`），以便在云端 Web Service 中同时跑 FastAPI HTTP API 与 WeCom 长连接 Bot。

**上下文工程借鉴**：对照 Agent-Skills-for-Context-Engineering 的「可借鉴点」与待思考问题见 `doc/上下文工程借鉴-供思考.md`（context-compression/optimization、context-degradation、tool-design、memory-systems、evaluation）。

## 技能与工具（prompt 内描述）

1. **库存与万鼎价格**：search_inventory、get_inventory_by_code、match_wanding_price、select_wanding_match、get_profit_by_price、get_profit_by_price_batch。目标：查库存、万鼎报价、各档位价格/利润率。**批量利润率** get_profit_by_price_batch 返回 **data.items**（与输入严格 1:1，含 input_index、item_status、name；matched 时有 matched_price/matched_profit/matched_price_level；skipped 时 skip_reason 仅 missing_code|missing_price|invalid_price），见 `doc/tool-orchestration-and-contract-issues.md`。**逻辑与数据源差异**（先万鼎 LLM 选型→code 查库存、有 code 直查、英文直查库存；Accurate 仅英文有库存无价格、万鼎有中英文与价格）见 `doc/库存与万鼎匹配逻辑与数据源差异.md`。
2. **无货**：get_oos_list、get_oos_stats、register_oos（从报价单）、register_oos_from_text（用户直接说「XX 无货」时登记，无需文件）。目标：无货登记（文件/文字两种途径）、无货列表、无货统计。
3. **报价单**：parse_excel_smart（统一 Excel 解析）、fill_quotation_sheet、edit_excel。目标：提取/填表/普适 Excel；仅暴露 parse_excel_smart 做解析，extract_quotation_data 已从工具列表移除（edit_excel 的 tool schema 已修正为二维数组 `values` 明确 inner `items` 类型）。
4. **询价填充**：run_quotation_fill。目标：整单流水线（提取→万鼎匹配→库存→回填）。
5. **澄清**：ask_clarification。目标：无法判断意图时向用户提问。

技能描述现位于 `backend/plugins/jagent/skills.py`（ALL_SKILL_PROMPT、OUTPUT_FORMAT）；`backend/agent/agent.py` 为薄封装，实际逻辑在 `backend/core/agent.py` + JAgentExtension。**OpenClaw 配置**：`doc/openclaw/AGENTS.md`、`doc/openclaw/TOOLS.md` 与上述逻辑对齐，供 OpenClaw 工作区使用或复制到 `~/.openclaw/workspace`；用法见 `doc/openclaw/README.md`。

**工具入参校验**：`backend/core/tool_utils.py` 提供 `tool_error(msg)`、`validate_file_path(path, tool_name)`；报价单工具与 run_quotation_fill 的 file_path/customer_level 校验在 `backend/plugins/jagent/extension.py` 各 handler 内（_QUOTE_WITH_FILE、_VALID_CUSTOMER_LEVELS）。`backend/agent/tools.py` 仅保留 EXTRA_TOOLS 定义、_run_oos_* / _run_register_oos 及 get_all_tools（供预热回退）；工具分发已全部在 Registry + JAgentExtension 内完成，无 execute_tool 分发链。  
- **Token 优化**：`session.py` 中 INJECT_TURNS=2（注入最近 2 轮，每轮问+答完整不截断）；**会话存盘与注入**：`save_turn` 与 `build_injection` 均不再对 answer 截断，完整保存并完整注入最近轮次，保证模型能看到上一轮完整表格/明细；若多轮过长可依赖 INJECT_TURNS 或 core/agent 的 _trim_context 做整体压缩。core/agent 中 TOOL_RESULT_MAX_CHARS=8_000（单次工具结果上限）、_CONTEXT_MAX_CHARS=8_000（多轮总上下文超则压缩历史 tool 结果）；`inventory_agent_tools.py` 工具 description 仅保留「做什么」，决策以 system prompt 为准。若几句对话就接近 3 万 token，可优先再降 TOOL_RESULT_MAX_CHARS / _CONTEXT_MAX_CHARS 或 INJECT_*。**单次回复长度**：`Config.LLM_MAX_TOKENS` 默认 **20000**（.env 可设 `LLM_MAX_TOKENS`）；表格/利润率等长回复易截断时可增大该值。**Token 使用日志**：每次 ReAct 调用 LLM 后会在**后端日志/终端**输出 `LLM tokens step=... prompt=... completion=... max_tokens=... finish_reason=...`（仅后端，不加到前端）；若 `finish_reason=length` 会额外打一条 warning 提示因达到 max_tokens 被截断、可增大 LLM_MAX_TOKENS。
- **上下文压缩**：多轮总 context 超 _CONTEXT_MAX_CHARS 时，历史 tool 结果不再整段替换为「已压缩，原长 N 字符」，改为用 **gpt-4o-mini**（或 SUMMARY_LLM_MODEL）生成短摘要（约 400 字）；实现见 `backend/core/context_compression.py`（LLM + 规则 fallback），`_trim_context` 在 core/agent 中调用；配置见 Config.SUMMARY_LLM_MODEL / SUMMARY_LLM_BASE_URL / SUMMARY_LLM_API_KEY（不设则用主 LLM 同 endpoint）。
- **会话上下文绑定**：为避免用户短回复（如「价格」「库存」）被误绑到更早轮次（如上一次查询的其它产品），`session.py` 的 `build_injection` 末尾增加说明「当前用户下一条消息是对上述最近一轮的回复，请以最近一轮的『问』为主题理解」；`core/agent.py` 在注入会话前，若当前用户消息长度 ≤15 字符且存在上一轮，会追加「【当前意图】用户本句是对上一轮「问：…」的回复，请按该主题理解」，减少澄清后短回复与更早轮次混淆。

**ReAct 范式对比**：详见独立文档 `doc/ReAct范式对比.md`（version3 vs OpenCode）。下文为摘要。
## ReAct 范式：与 OpenCode 对比（摘要）

**本仓库（version3）**  
- **显式 ReAct**：在 system prompt 里要求每轮先 `<think>`，若调用工具则收到 observation 后必须输出 `</think>` 且 **Decision: CONTINUE | FINISH**；由代码用正则解析 `</think>`，匹配到 `Decision: FINISH` 则结束。  
- **循环**：`max_steps`（默认 8）步，每步一次 LLM 调用；无 tool_calls 或 FINISH 即停。  
- **思考**：思考内容放在 `<think>...</think>` 中，由模型自由写，代码只做抽取与展示。

**OpenCode**（学习案例/opencode，基于 Vercel AI SDK）  
- **隐式循环**：不要求模型输出「Decision」或「reflect」。由 **provider 的 finish reason** 驱动：若为 `tool-calls` → 执行工具、把 tool result 追加进 messages，再调一次 LLM；若为 `stop`（或其它非 tool-calls）→ 结束。  
- **循环位置**：`session/prompt.ts` 的 `SessionPrompt.loop`：`while (true)` 内取最后 user/assistant、若 lastAssistant.finish 且非 tool-calls/unknown 则 break；否则 step++，调 `SessionProcessor.process()` → `LLM.stream()`，根据返回值 `"stop"` / `"continue"` / `"compact"` 决定 break 或继续。  
- **步数上限**：agent 配置有 `steps`；当 `step >= maxSteps` 时往 messages 里注入 `MAX_STEPS` 提示（禁止再调工具、只允许文本总结），再调一次 LLM 后结束。  
- **思考/推理**：用 SDK 的 `extractReasoningMiddleware({ tagName: "think", startWithReasoning: false })` 解析模型中的 `<think>`；部分模型走原生 reasoning（reasoning-start/delta/end），由 processor 记成 `ReasoningPart`。  
- **消息结构**：assistant 消息由 part 组成：`text`、`reasoning`、`tool`（含 state：pending/running/completed/error）、`step-start`、`step-finish`。`step-start` / `step-finish` 由流式事件产生（start-step / finish-step），不是模型直接输出的文本。  
- **工具**：`ToolRegistry` + MCP，工具执行在 `SessionProcessor.process()` 的 stream 里（tool-call → execute → tool-result），结果写回 assistant 的 tool part，下次 loop 时整段历史交给 LLM。

**对比小结**

| 维度 | version3（本仓） | OpenCode |
|------|------------------|----------|
| 结束条件 | 解析 `</think>` 中的 Decision: FINISH，或无 tool_calls | provider finish reason ≠ tool-calls 即结束 |
| 思考 | prompt 要求 `<think>`，代码正则抽取 | SDK 的 think 标签或原生 reasoning，不要求「先 think 再 act」 |
| Reflect | 要求 observation 后写 `</think>` + Decision | 无；靠「有无 tool_calls + finish reason」决定是否继续 |
| 步数 | 固定 max_steps 次 LLM 调用 | 有 steps 上限，达限时注入「仅文本」提示再跑一轮 |

## 运行

- **一键启动**：双击 `启动 Jagent.bat` 或执行 `python start.py`，会在新窗口启动后端并自动打开浏览器。
- **后端**：`cd "Agent Team version3"` → `python run_backend.py`（默认 8000）。
- **CLI**：`python cli_agent.py`。
- **调试日志（本次会话）**：为配合 Cursor debug mode，在 `start.py` 中插入了少量调试日志，运行一键启动时会将环境与启动信息写入项目根目录 `debug-9e751f.log`，问题确认后可随时删除对应代码。
- **环境变量**：与 version2 一致（OPENAI_API_KEY/ZHIPU_API_KEY、OPENAI_BASE_URL、LLM_MODEL、AOL_* 等），.env 可放在 version3 根或 quotation_tracker（version2 下）。
- **数据库（本地 SQLite / 云端 Neon）**：**本地测试**可不设 `DATABASE_URL`，使用本地 SQLite（无货/缺货/报价单/补货单等均落 `data/out_of_stock.db`）。**云端部署（如 Render）**请设置环境变量 `DATABASE_URL` 为 Neon（或其它 Postgres）连接串，以使用云端数据库；若在 RENDER 环境下未设置 `DATABASE_URL`，启动时会打 warning 提示使用云端库。`backend/tools/oos/config.py` 中读取 `DATABASE_URL`，有则用 Postgres（含 Neon），无则用 SQLite。无货/缺货等与 Supabase 的镜像逻辑仍可并存（见 `oos_repository.py`）。
- **万鼎价格库**：**version3 不依赖 version2**，数据已放在 version3/data/。优先使用环境变量 `PRICE_LIBRARY_PATH`；未设置时先找 version3/data/ 下 `万鼎价格库_管材与国标管件_标准格式.xlsx`，不存在则用同目录下 `Copy of 万鼎...20250814.xlsx`。**新价格库整理**：若使用新版 `NEW PRICE(T) 万鼎...20251106.xlsx`，在 version3 下运行 `python scripts/build_wanding_standard_price_library.py`（脚本读 version2/data/ 下的源文件），**直接输出到 version3/data/万鼎价格库_管材与国标管件_标准格式.xlsx**；加 `--verify` 可生成后自动核对内容。管材 sheet 含 A–X 列，其中 U=相关体积、V=%、W=EXC TAX（LOCAL 不含税）、X=INC TAX（LOCAL 含税 Rp），仅管材有 U–X，国标管件仍为 A–T。
- **CLI 流式「卡住」**：当模型返回大量 tool_calls 时，流式只输出文本，之后会长时间无输出（模型在发 tool_calls / 正在执行工具）。`execute_react` 现支持 `on_tool_calls_ready(n)` 与 `on_tool_start(name, index, total)`，CLI 会打印「收到 N 个工具调用，正在执行…」和「[i/N] 执行 xxx…」，避免误以为卡死。
- **万鼎选型 Skill（开盒即用）**：详见 `.cursor/skills/wanding-select/SKILL.md`。前置：Python、version3 目录、价格库 `data/万鼎价格库_管材与国标管件_标准格式.xlsx`；首次检查：`python scripts/get_wanding_candidates.py "90度弯头" --json` 有候选即正常。单条：取候选 → 选型 → 写 log（`append_wanding_log.py`）；批量：`run_skill_lookup_batch.py > logs/batch_candidates.json` 再 `run_skill_batch_to_log.py logs/batch_candidates.json`。Windows 中文乱码时用 Python 内调用或批量脚本。
- **业务知识与「记住」命令（借鉴 OpenClaw 学习/记忆）**：万鼎 LLM selector 的业务知识存放在**单独 MD 文件**中，默认 `backend/tools/data/wanding_business_knowledge.md`（可通过环境变量 `WANDING_BUSINESS_KNOWLEDGE_PATH` 覆盖）。LLM 每次选型都会使用该文件内容（`_load_business_knowledge()`）；同一路径且文件 mtime 未变时使用内存缓存，避免重复读盘；用户执行「记住」后会自动失效缓存并重读。用户可通过「你要记住」「请记住」「记住：」「/记住」等句式追加新业务知识。**Control UI**：原侧栏「Channels」已改为「业务知识」；该页从 GET/PUT `/api/business-knowledge` 读写上述 MD，提供可编辑文本框与保存/重新加载按钮；并展示「相关数据文件」指引（询价映射表、万鼎价格库的 Excel 路径，可复制路径后打开编辑，实现方式参考无货看板）。实现见 `backend/agent/remember.py`、`backend/tools/inventory/services/llm_selector.py`、`backend/server/api/routes.py`（GET/PUT `/api/business-knowledge`）、control-ui 的 `controllers/business-knowledge.ts` 与 `views/business-knowledge.ts`；方案说明见 `doc/业务知识记忆方案_借鉴OpenClaw.md`。
- **询价映射表优先（整理产品(2).xlsx）**：match_wanding_price 先按「字段名+规格」查映射表（A=询价货物名称、B=规格、C=产品编号、D=报价名称），逻辑与万鼎相同（token+同义词+规格等价），取 top3 后由 LLM 选 1 个；若映射表无命中或 LLM 判定不匹配，再走万鼎价格库。配置 `MAPPING_TABLE_PATH` 默认 `version3/data/整理产品(2).xlsx`。实现见 `backend/tools/inventory/services/mapping_table_matcher.py`、`inventory_agent_tools._execute_match_wanding_price`。
- **万鼎匹配只查管材导致国标管件查不到**：已改为 `load_wanding_df` 同时加载「管材」+「国标管件」两表并合并后再做模糊匹配。
- **国标管件仍无候选**：1）同义词增加「堵头」↔「管帽」；2）询价「90度」与品名「90°」等价（text_hits 中 度→°）；3）长中文整段（如「度弯头带检查口」）拆成单字再匹配，避免整段与品名「°弯头(带检查口)」对不上。批量脚本可显式传 `price_library_path`，并支持 `-o logs/batch_candidates.json` 直接写文件。

## API

- `GET /health`：健康检查。
- `POST /api/quotation/upload`：上传报价单，返回 file_path、file_name。
- **Work 批量报价 HTTP**：`POST /api/work/run`（一次性执行：识别表数据→匹配+选型→填表→缺货报告→无货登记）、`POST /api/work/run-stream`（SSE 流式返回阶段进度与最终 result）、`POST /api/work/resume`（处理多候选时的人工选型，Body `{ run_id, selections }`）。后端默认走**管道式执行器**（不再由 LLM 选工具，只在匹配内部用 LLM 做选型），可通过 `WORK_USE_PIPELINE=false` 回退旧 ReAct 实现；`WORK_RUN_ID_TTL_SECONDS` 控制 run_id 有效期（默认 1 小时），`WORK_SINGLE_CAND_USE_LLM` 控制「单候选是否仍走一次 LLM 兜底」，`WORK_MATCH_MAX_WORKERS` 控制单文件匹配阶段的行级并发度。Work trace 中附带 `type=metrics` 的阶段耗时与 to_fill/shortage/unmatched/pending_choices 统计，便于回归评估。
- **无货看板 HTTP**：`GET /api/oos/stats`、`GET /api/oos/list`、`GET /api/oos/by-file`、`GET /api/oos/by-time`；`POST /api/oos/delete`（Body `{ "product_key": "..." }` 软删除该产品所有记录）、`POST /api/oos/add`（Body `{ "product_name", "specification?", "quantity?", "unit?" }` 手动新增一条），供 control-ui 无货看板删除/手动新增，与 Agent 工具共用 DataService。
- **缺货记录 HTTP**：`GET /api/shortage/stats`、`GET /api/shortage/list`、`GET /api/shortage/by-file`、`GET /api/shortage/by-time`；`POST /api/shortage/delete`（Body `{ "product_key": "..." }` 软删除）、`POST /api/shortage/add`（Body `{ "product_name", "specification?", "quantity?", "available_qty?" }` 手动新增，差异 shortfall 自动计算为 max(0, quantity - available_qty)）。缺货由 Work 匹配后库存不足写入或看板手动添加，供 control-ui「实例」页缺货区块展示（含手动新增）。
- **业务知识 HTTP**：`GET /api/business-knowledge`（读取 wanding_business_knowledge.md 内容）、`PUT /api/business-knowledge`（Body `{ "content": "..." }` 保存，保存后会使 LLM selector 缓存失效）、`GET /api/business-knowledge/dependent-files`（返回选型与历史报价依赖的 Excel 路径：mapping_table、price_library），供 control-ui「业务知识」页编辑及「相关数据文件」指引（复制路径后可在资源管理器中打开或用 Excel 编辑）。
- `POST /api/query` 或 `POST /api/master/query`：Body `{ "query": "用户输入", "session_id": "可选", "context": { "file_path": "可选" } }`，返回 `answer`、`trace`、`thinking` 等。Chat 入口会做轻量语言检测：英文问题会在 `context.preferred_lang=\"en\"` 下进入 ReAct 循环，`JAgentExtension` 会在 prompt 中注入「必须全英文回答」策略，并在工具 observation 为中文时附加英文翻译提示；中文问题保持 `preferred_lang=\"zh\"`，行为与之前一致。WebSocket `/ws` 控制台与企业微信 Bot 也会在调用 `CoreAgent.execute_react` 前根据用户输入设置 `context.preferred_lang`，并在缺省时由 `CoreAgent` 自行兜底一次检测，保证所有入口的英文问题都得到英文回答。
- **WebSocket `/ws`（Gateway 适配层）**：供 OpenClaw 控制台 1:1 复刻使用。连接后收 `connect.challenge`，发 `connect` 得 `hello-ok`；支持 `sessions.list`、`sessions.patch`、`chat.history`、`chat.send`、`chat.abort`、`agent.identity.get` 等。`sessions.list` 返回的 `label` 为会话标题（LLM 生成或首条消息截断），`updatedAt` 为毫秒时间戳；`inputTokens`/`outputTokens`/`totalTokens` 来自 SessionStore。**会话标题**：首轮对话结束后，后端用 LLM 根据首轮内容生成 5–10 字标题并写回 session（`backend/server/gateway/handlers/chat.py`）；可选环境变量 `SESSION_TITLE_MODEL` 指定标题用模型，默认与 `LLM_MODEL` 相同。`sessions.patch` 支持传 `key`+`label` 由前端或用户编辑标题。测试：先 `python run_backend.py`，再 `python backend/server/gateway/test_gateway_manual.py`（需 `pip install websockets`）。

- **Jagent 控制台（前端）**：已接好，界面展示品牌为 **Jagent**（标题、侧栏 LOGO 文案、助手名称）。`control-ui/` 为 OpenClaw UI 拷贝并改品牌展示，默认 WS 为 `ws://${host}/ws`；构建产出 `dist/control-ui/`，由 `backend/server/api/app.py` 在存在时挂载到 `/`。运行 `python run_backend.py` 后访问 `http://localhost:8000/` 即可。若需重构建：`cd control-ui && npm run build`。**概览页（Overview）**：顶端新增「系统健康状态」卡片（一眼看在线/离线、实例数、会话数、定时任务开关与下次运行时间，并展示最近错误摘要），下方保留连接信息与网关 Snapshot、注意事项；健康区文案通过 i18n key（`overview.health.*`）管理，前端不再内联默认中文字符串。**无货看板与缺货记录**：Control 侧栏「实例 / Instances」页同时展示**无货看板**与**缺货记录**。无货看板通过 `/api/oos/*` 展示统计与无货产品列表、按文件/按时间统计，支持**删除**与**手动新增**；缺货记录通过 `/api/shortage/*` 展示 Work 匹配后库存不足落库或看板手动添加的统计/列表/按文件/按时间，支持**删除**与**手动新增**。手动新增缺货需填产品名字、规格、需求、供给，**差异**由后端自动计算（需求 − 供给）；列表展示需求/供给/差异及被报缺货次数。**采购页补货**：Control 侧栏「采购 / Sessions」页含缺货申报与**补货**区块。补货区提供**输入表**：多行「产品名或编码」+「新购数量」、添加/删除行、「生成补货单」按钮；生成后调用 `POST /api/replenishment-drafts`（body: `{ lines: [{ product_or_code, quantity }] }`），**成功后自动刷新列表**并展开新 draft；下方补货单列表支持查看明细、确认执行（`PATCH .../confirm`）、**删除**（`DELETE /api/replenishment-drafts/{draft_id}`，删除前二次确认）。**补货确认占位开关**：默认**占位**（仅更新补货单状态为 confirmed，不调用 `modify_inventory` 写 ACCURATE）；需真实写库存时设置环境变量 `REPLENISHMENT_CONFIRM_REAL_INVENTORY=1`（或 true/yes）后重启后端即可改为真实调用。方案与数据流见 `补货前端与云端落库` 方案文档。**SPA 会话直链**：直接打开或刷新 `/chat?session=xxx`、`/sessions` 等前端路由时，后端对无对应静态文件的路径回退为返回 `index.html`，避免 404。**注意**：前端使用 Lit 装饰器，需 Vite 6 + `vite-ts-decorators`（`control-ui/tsconfig.json` 中 `experimentalDecorators: true`），否则构建后浏览器会报 "Unsupported decorator location: field" 导致页面空白。

### 企业微信长连接 Bot（长连接模式概览）

- **URL 回调（已接入 Phase 1）**：`backend/server/api/routes_wecom.py` 暴露 `GET/POST /api/wecom/callback`，由 `backend/server/services/wecom_service.py` 做 URL 验证与明文 XML 解析，`wecom_chat_bridge.py` 将 WeCom 文本映射为 `session_id="wecom:{FromUserName}"` 并调用现有 `CoreAgent.execute_react`，再把结果包装为企业微信要求的 XML 文本回复；相关配置为 `.env` 中的 `WECOM_TOKEN/WECOM_AES_KEY/WECOM_CORP_ID/WECOM_AGENT_ID`。
- **长连接 Bot（当前为 Dummy 骨架，可平滑替换为官方 SDK）**：
  - 模块位置：`backend/wecom_bot/`，包含：
    - `config.py`：`load_wecom_bot_config()` 从环境变量读取 `WECOM_BOT_ID/WECOM_BOT_SECRET/WECOM_BOT_PROXY_URL`，并在缺少关键配置时仅发出 warning（允许本地 Dummy 模式运行）；
    - `handler.py`：定义 `handle_wecom_message(agent, msg)`，将标准化 WeCom 消息（`msg_id/from_user/to_user/msg_type/content/raw`）转成 `session_id="wecom:{from_user}"` 调用 `CoreAgent.execute_react`，带 60s 超时与异常兜底，始终返回一段可落地给用户的文本。
    - `client.py`：当前实现 `DummyWeComBotClient`，通过命令行 stdin 模拟 WeCom 文本消息，`run_wecom_bot(agent)` 负责加载配置并启动 Dummy 客户端；未来接入企业微信长连接 SDK 时，只需在此处用真实 WeComBotClient 替换 Dummy 即可。
  - 启动入口：`start_wecom_bot.py`，与 HTTP 后端保持同一套 `Config` 与 `CoreAgent` 初始化逻辑，启动后会提示「当前为 Dummy 模式，使用命令行模拟 WeCom 消息」，支持在本地直接输入文本观察 `session_id="wecom:debug-user"` 下的对话行为。Render 等平台上可将该脚本作为单独 worker 进程运行，后续接上真实长连接实现即可对接企业微信 Bot。

### 前端 Work 页测试与下载按钮补充

- 在 `control-ui/src/ui/work.test.ts` 中新增 Vitest 浏览器测试，用于回归验证 Work 页结果区的 Excel 下载按钮行为：当 `workResult.trace` 中包含 Excel 输出路径时，会渲染 `/api/quotation/download?path=...` 的下载按钮；当 trace 中不存在输出路径时，不应渲染该按钮，避免误导用户。
- 为兼容不同后端 trace 结构与字段命名，`control-ui/src/ui/views/work.ts` 中的 `getOutputFileBasenamesFromTrace` 现除了优先解析 JSON 内的 `output_path`/`filled_path` 字段外，还会在 observation 文本中用正则兜底扫描任意 `*.xlsx` 子串，从而在后端仅返回原始字符串路径时也能识别出可下载的 Excel 文件名并展示按钮。

### Paperclip 工程模式借鉴文档

- 在 `doc/AgentTeamV3_借鉴Paperclip思路.md` 中整理了从本仓库 Paperclip 子项目可迁移到 Agent Team version3 的工程模式与演进建议，涵盖：统一 Adapter/Agent registry 与配置版本治理、Run Log + Activity Log 观测体系、WebSocket 控制面实时事件与前端状态同步、配置/部署模式工程化以及 CLI context/profile 与运维工具等，供后续大规模重构或多 Agent 化时参考。 

### Run Log + Activity Log 改造补充

- 新增 `backend/server/run_log_store.py` 与 `Config.RUN_LOG_BASE_DIR`，以 NDJSON 形式将 Work 流等长流程的运行日志按 run_id 落到 `data/run-logs/work/`，`run_work_flow` 会在开始/结束时记录 meta 与 summary，并根据 trace 中的 `type=metrics` 事件追加阶段摘要；`/api/work/run` 与 `/api/work/run-stream` 现会生成 `work_run_id` 并传入执行器，同时通过 `GET /api/work/run-logs/{run_id}` 暴露只读查询接口，支持 offset/limit 简单分页。
- 在 `backend/tools/oos/services/data_service.py` 中引入 `ActivityLogDB` 表与 `DataService.log_activity/list_activity`，并在 `backend/server/services/activity_log.py` 封装为简洁的 `log_activity/list_activity` 服务；关键业务路由（`routes_work.py`、`routes_quotation.py`、`routes_oos.py`）在 Work 运行、报价草稿保存、无货/缺货手动新增等节点调用 `log_activity` 写入活动流水。
- 新增 `backend/server/api/routes_activity.py` 并在 `routes.py` 聚合为 `GET /api/activity` 接口，按时间倒序返回最近的 Activity Log（可按 kind 过滤），为后续 Control UI 加“最近活动”视图或接入 WebSocket 实时事件打基础。

### 报价 Excel 填充样式测试补充

- 在 `tests/test_quotation_pipeline.py` 的 `test_fill_quotation_writes_dates_and_spec_fallback` 中增加了 1 条轻量断言：在 `fill_quotation` 运行后，数据行的某个非 G/H/J/L/N/O 列（当前选 E 列）的 `border` 与 `fill` 与模板行保持一致，用于回归保护「整行样式复制」行为（避免未来只复制少数数据列导致样式退化），不依赖具体颜色或边框配置。

### 报价 Excel 合并单元格安全写入补充

- 为避免在含合并单元格的模板上回填时报出 `'MergedCell' object attribute 'value' is read-only`，在 `backend/tools/quotation/quote_tools.py` 中新增 `_set_cell_value_merged_safe` 工具函数：若目标单元格为合并区域中的非左上角 `MergedCell`，则自动改为向该合并区域左上角单元格写入值。
- `fill_quotation` 里所有写值的位置（产品编号、报价名称、规格、数量、单价、总价、交货日期、下方合计 4 行金额以及报价日期）均改用该安全写入函数，保证在「文字 → Excel 模板 → Work 填表」链路中即便模板存在合并单元格也不会因只写到合并区域内部单元格而抛错。

### 报价产出格式与规格解析（对齐第二张图、无图片、规格解析）

- **产出格式**：待确认报价草稿表格已按「第二张图」样式对齐：列顺序为 序、询价货物名称、询价规格型号、数量、产品编号、报价名称、**报价产品规**、单价、总价、可用、缺口、缺货；**不含图片列**。表头文案在 i18n 中为 `work.lineProduct`（询价货物名称）、`work.lineSpec`（询价规格型号）、`work.lineQuoteSpec`（报价产品规）等。
- **规格解析**：  
  - **文字→询价行**：`backend/tools/quotation/text_to_inquiry.py` 优先用 **LLM** 解析 product_name / specification / qty，prompt 已加强「规格尽量单独放入 specification」；**规则兜底** `_text_to_inquiry_fallback` 会按行/分号拆分，并从每段用正则拆出规格（dn/DN、20/56、3*2.5、4M/根、Φ25 等）到 `specification`，避免整段堆在 product_name。  
  - **报价名称→报价产品规**：Match 后若仅有长 `quote_name` 而无 specification，会用 `backend/tools/quotation/spec_extract.py` 的 `extract_spec_from_quote_name`（规则：DN、英寸、4M/根、Φ 等）抽出「报价产品规」写入 draft 行的 `quote_spec`，供前端单独列展示；可选 `extract_spec_from_quote_name_llm` 可在需要时用 LLM 再提稳定性。
- **是否用 LLM 提升解析稳定性**：  
  - **文字解析**：当前已用 LLM 为主、规则兜底，建议**保留并优先 LLM**；若遇多语言/表述差异大，可再加强 prompt 或对少数语种单独示例。  
  - **报价产品规**：默认规则抽取即可；若发现长报价名称中规格形式多样、规则漏提多，可**在关键路径开启** `extract_spec_from_quote_name_llm`（或配置开关），用一次短 LLM 调用从 quote_name 抽规格，失败时退回规则结果。
- **数据库**：`QuotationDraftLineDB` 新增 `quote_spec` 列（VARCHAR(500)）。**已有库需手动迁移**：  
  `ALTER TABLE quotation_draft_lines ADD COLUMN quote_spec VARCHAR(500);`  
  新建库由 SQLAlchemy 建表时自动包含该列。
- **规格双列一次 LLM 批量提取**：当 `Config.QUOTATION_SPEC_LLM=true`（默认）时，在构造待确认报价草稿的两处（merge 分支与 work_quotation_match 成功且非 needs_human_choice 分支）会调用 `extract_specs_batch_llm(lines)`，一次请求为整表产出 `requested_spec` 与 `quoted_spec`，并仅用非空结果写回 `specification`/`quote_spec`；规则仍作未启用或失败时的兜底。行数超过 50 时跳过 LLM。关闭方式：环境变量 `QUOTATION_SPEC_LLM=false`。

### 报价/规格与 Work 执行器测试

- **run_id 与 pipeline 状态**：`tests/test_work_executor_run_id.py` 验证当 match 结果含 `needs_human_choice` 与 `pending_choices` 时，`_process_files_pipeline` 返回的 dict 包含有效 `run_id`，且 `_work_pipeline_state[run_id]` 已写入，避免 NameError 并保证 resume 可用。
- **报价产品规规则抽取**：`tests/test_spec_extract.py` 对 `extract_spec_from_quote_name` 做单元测试，覆盖「直通(管径)PVC-UH」「直通(管酒)PVC-U排水」「罩(PVC-H)」「30°异径三级配」、含 DN200/(8")/4M/根 的长名称等输入，断言在预期有规格时返回非空字符串。
- **批量 LLM 规格提取**：同文件内对 `extract_specs_batch_llm` 做 mock 测试：`QUOTATION_SPEC_LLM=false` 或 API 返回非法 JSON 时返回空列表；mock 返回合法 JSON 数组时返回与行数一致的 `requested_spec`/`quoted_spec` 列表。运行：在 version3 根目录执行 `py -m pytest tests/test_spec_extract.py tests/test_work_executor_run_id.py -v`。
