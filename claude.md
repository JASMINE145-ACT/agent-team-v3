# Agent Team version3 — 项目说明（Claude 用）

**单主 Agent 架构**：无子 Agent 委托，主 Agent 掌握全部技能，根据用户意图直接选用工具完成目标。

## 与 version2 的区别

| 项目 | version2 | version3 |
|------|----------|----------|
| 架构 | MasterAgent + 子 Agent（Inventory / Quote）委托 | 单 Agent，直接调用所有工具 |
| 工具 | Master 仅 4 个（delegate、execute_plan、run_quotation_fill、ask_clarification） | 库存 + 报价单 + 无货 + 询价填充 + 澄清，合并为一套工具列表 |
| 技能描述 | 在 Master 的 prompt 里写「何时 delegate 给谁」 | 在 system prompt 里按**技能**分组写清**目标**与**何时用** |

## 目录结构

（已按 `doc/项目结构规整方案.md` 规整：单 Agent 心智，工具归入 backend/tools，网络层归入 backend/server。）

```
Agent Team version3/
├── doc/
│   ├── 项目结构规整方案.md       # 规整方案与 import 替换规则
│   ├── ReAct范式对比.md           # version3 与 OpenCode 的 ReAct 范式对比
│   └── …（其他文档）
├── backend/
│   ├── config.py                 # 后端全局配置（.env 含根目录、backend/tools/oos）
│   ├── agent/                    # 唯一 Agent（ReAct 主循环 + 工具分发 + 会话）
│   │   ├── agent.py
│   │   ├── tools.py
│   │   └── session.py
│   ├── tools/                    # Agent 的工具实现
│   │   ├── inventory/            # 库存与万鼎（原 inventory_agent + src→lib）
│   │   ├── quotation/            # 报价单 + 询价填充（原 agents/quote + quote_sheet）
│   │   └── oos/                  # 无货登记/列表/统计（原 quotation_tracker）
│   └── server/                   # 网络层
│       ├── api/                  # FastAPI HTTP（原 api/）
│       └── gateway/              # WebSocket Gateway（原 ws_gateway/）
├── control-ui/                   # 前端（Vite + Lit），构建产出 dist/control-ui/
├── run_backend.py                # 入口：uvicorn backend.server.api.app:app
├── cli_agent.py                  # 入口：backend.agent.SingleAgent
├── start.py
├── requirements.txt
└── claude.md
```

**独立运行**：从项目根目录执行 `python run_backend.py` 或 `python cli_agent.py` 即可；无根目录 `config.py`/`models/`，配置与模型均用 `backend.tools.oos` 等包内模块。

## 技能与工具（prompt 内描述）

1. **库存与万鼎价格**：search_inventory、get_inventory_by_code、match_wanding_price、select_wanding_match。目标：查库存、万鼎报价、各档位价格/利润率。
2. **无货**：get_oos_list、get_oos_stats、register_oos。目标：无货登记、无货列表、无货统计。
3. **报价单**：extract_quotation_data、fill_quotation_sheet、parse_excel_smart、edit_excel。目标：提取/填表/普适 Excel。
4. **询价填充**：run_quotation_fill。目标：整单流水线（提取→万鼎匹配→库存→回填）。
5. **澄清**：ask_clarification。目标：无法判断意图时向用户提问。

详见 `backend/agent/agent.py`：5 个技能常量 + `_ALL_SKILLS` + `_PROMPT_OUTPUT_FORMAT`（110-173 行），`_build_system_prompt()` 组装（176-185 行）；按需注入时可改为 `_build_system_prompt(active_skills=None)` 并在 `execute_react` 里按 context 传参。

**工具入参校验**（`backend/agent/tools.py`）：  
- 校验辅助：`_VALID_CUSTOMER_LEVELS`（合法枚举 `{"A","B","C","D"}`）、`_QUOTE_TOOLS_WITH_FILE`（需校验 file_path 的报价单工具集）、`_tool_error(msg)`（统一错误 observation：`{"success": false, "error": "..."}` 便于模型理解）、`_validate_file_path(path, tool_name)`（空路径/文件不存在 → 返回错误字符串，否则 None）。  
- `run_quotation_fill`：文件不存在时立即返回错误、不进入 flow_orchestrator；`customer_level` 不在 `{A,B,C,D}` 时返回清晰错误并列出合法值。  
- 带 `file_path` 的 4 个报价单工具在执行前先经 `_validate_file_path`，失败则直接返回错误 observation。  
- 效果：避免「文件不存在时整段并发匹配流程跑完才报错」；模型收到错误后可自行补 `file_path` 或提示用户上传。

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
- **环境变量**：与 version2 一致（OPENAI_API_KEY/ZHIPU_API_KEY、OPENAI_BASE_URL、LLM_MODEL、AOL_* 等），.env 可放在 version3 根或 quotation_tracker（version2 下）。
- **万鼎价格库**：优先使用 `PRICE_LIBRARY_PATH`；未设置时先找 version3/data/ 下对应 xlsx，不存在则回退到 **Agent Team version2/data/** 下同名文件，无需在 v3 再拷一份。
- **CLI 流式「卡住」**：当模型返回大量 tool_calls 时，流式只输出文本，之后会长时间无输出（模型在发 tool_calls / 正在执行工具）。`execute_react` 现支持 `on_tool_calls_ready(n)` 与 `on_tool_start(name, index, total)`，CLI 会打印「收到 N 个工具调用，正在执行…」和「[i/N] 执行 xxx…」，避免误以为卡死。

## API

- `GET /health`：健康检查。
- `POST /api/quotation/upload`：上传报价单，返回 file_path、file_name。
- `POST /api/query` 或 `POST /api/master/query`：Body `{ "query": "用户输入", "session_id": "可选", "context": { "file_path": "可选" } }`，返回 `answer`、`trace`、`thinking` 等。
- **WebSocket `/ws`（Gateway 适配层）**：供 OpenClaw 控制台 1:1 复刻使用。连接后收 `connect.challenge`，发 `connect` 得 `hello-ok`；支持 `sessions.list`、`chat.history`、`chat.send`、`chat.abort`、`agent.identity.get` 等。`sessions.list` 返回的 `updatedAt` 为毫秒时间戳（前端相对时间展示）；`inputTokens`/`outputTokens`/`totalTokens` 来自 SessionStore 持久化的 `last_input_tokens`、`last_output_tokens`（execute_react 流式/非流式调用后写入）。测试：先 `python run_backend.py`，再 `python backend/server/gateway/test_gateway_manual.py`（需 `pip install websockets`）。

- **Jagent 控制台（前端）**：已接好，界面展示品牌为 **Jagent**（标题、侧栏 LOGO 文案、助手名称）。`control-ui/` 为 OpenClaw UI 拷贝并改品牌展示，默认 WS 为 `ws://${host}/ws`；构建产出 `dist/control-ui/`，由 `backend/server/api/app.py` 在存在时挂载到 `/`。运行 `python run_backend.py` 后访问 `http://localhost:8000/` 即可。若需重构建：`cd control-ui && npm run build`。**SPA 会话直链**：直接打开或刷新 `/chat?session=xxx`、`/sessions` 等前端路由时，后端对无对应静态文件的路径回退为返回 `index.html`，避免 404。**注意**：前端使用 Lit 装饰器，需 Vite 6 + `vite-ts-decorators`（`control-ui/tsconfig.json` 中 `experimentalDecorators: true`），否则构建后浏览器会报 "Unsupported decorator location: field" 导致页面空白。
