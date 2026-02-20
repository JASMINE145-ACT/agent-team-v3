# Agent Team version3 — 项目说明（Claude 用）

**单主 Agent 架构**：无子 Agent 委托，主 Agent 掌握全部技能，根据用户意图直接选用工具完成目标。

## 与 version2 的区别

| 项目 | version2 | version3 |
|------|----------|----------|
| 架构 | MasterAgent + 子 Agent（Inventory / Quote）委托 | 单 Agent，直接调用所有工具 |
| 工具 | Master 仅 4 个（delegate、execute_plan、run_quotation_fill、ask_clarification） | 库存 + 报价单 + 无货 + 询价填充 + 澄清，合并为一套工具列表 |
| 技能描述 | 在 Master 的 prompt 里写「何时 delegate 给谁」 | 在 system prompt 里按**技能**分组写清**目标**与**何时用** |

## 目录结构

```
Agent Team version3/
├── doc/
│   ├── ReAct范式对比.md           # version3 与 OpenCode 的 ReAct 范式对比
│   ├── OpenClaw_agent借鉴.md     # OpenClaw 可借鉴点与落地；含「为何不加 tool_result_persist」与工具钩子接入点汇总
│   ├── OpenManus_agent借鉴.md    # OpenManus 可借鉴点；含「工具变多时的处理」学习案例汇总（OpenCode/OpenManus/OpenClaw）
│   ├── 管材支持计划系统_可行性研究报告.md  # CAD图纸+报价自动生成管材支持计划与物流计划的可行性研究
│   └── Prompt工程_OpenCode与OpenClaw对比.md  # Prompt 工程：OpenCode/OpenClaw 分层、按需、可配置做法与 version3 可借鉴点
├── backend/
│   ├── config.py
│   ├── core/
│   │   ├── context_system/        # SessionStore（多轮会话）
│   │   └── single_agent/          # SingleAgent + 合并工具
│   ├── agents/
│   │   ├── quote/                 # 报价单工具（与 v2 同源副本）
│   │   │   └── quote_tools.py
│   │   └── quote_sheet/           # 询价填充流程（与 v2 同源副本）
│   │       ├── flow_orchestrator.py
│   │       └── shortage_report.py
│   └── api/
├── inventory_agent/               # 库存与万鼎工具（与 v2 同源副本）
├── quotation_tracker/            # 无货登记/列表/统计（与 v2 同源副本）
├── src/                          # AOL/缓存等（与 v2 同源副本）
├── config.py                     # 仅做 quotation_tracker 配置的 re-export，供从根目录运行时 quotation_tracker 内 from config 可解析
├── models/                       # 仅做 quotation_tracker.models 的 re-export，供 from models.models import 可解析
├── run_backend.py
├── cli_agent.py
├── requirements.txt
└── claude.md
```

**独立运行**：version3 不依赖 version2。已将 `inventory_agent`、`quotation_tracker`、`src` 及 `backend.agents.quote`、`backend.agents.quote_sheet` 的完整实现复制到本仓库，可直接 `python run_backend.py` 或 `python cli_agent.py`，无需与 version2 同目录或设置 PYTHONPATH。

## 技能与工具（prompt 内描述）

1. **库存与万鼎价格**：search_inventory、get_inventory_by_code、match_wanding_price、select_wanding_match。目标：查库存、万鼎报价、各档位价格/利润率。
2. **无货**：get_oos_list、get_oos_stats、register_oos。目标：无货登记、无货列表、无货统计。
3. **报价单**：extract_quotation_data、fill_quotation_sheet、parse_excel_smart、edit_excel。目标：提取/填表/普适 Excel。
4. **询价填充**：run_quotation_fill。目标：整单流水线（提取→万鼎匹配→库存→回填）。
5. **澄清**：ask_clarification。目标：无法判断意图时向用户提问。

详见 `backend/core/single_agent/agent.py`：5 个技能常量 + `_ALL_SKILLS` + `_PROMPT_OUTPUT_FORMAT`（110-173 行），`_build_system_prompt()` 组装（176-185 行）；按需注入时可改为 `_build_system_prompt(active_skills=None)` 并在 `execute_react` 里按 context 传参。

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

- **后端**：`cd "Agent Team version3"` → `python run_backend.py`（默认 8000）。
- **CLI**：`python cli_agent.py`。
- **环境变量**：与 version2 一致（OPENAI_API_KEY/ZHIPU_API_KEY、OPENAI_BASE_URL、LLM_MODEL、AOL_* 等），.env 可放在 version3 根或 quotation_tracker（version2 下）。
- **万鼎价格库**：优先使用 `PRICE_LIBRARY_PATH`；未设置时先找 version3/data/ 下对应 xlsx，不存在则回退到 **Agent Team version2/data/** 下同名文件，无需在 v3 再拷一份。
- **CLI 流式「卡住」**：当模型返回大量 tool_calls 时，流式只输出文本，之后会长时间无输出（模型在发 tool_calls / 正在执行工具）。`execute_react` 现支持 `on_tool_calls_ready(n)` 与 `on_tool_start(name, index, total)`，CLI 会打印「收到 N 个工具调用，正在执行…」和「[i/N] 执行 xxx…」，避免误以为卡死。

## API

- `GET /health`：健康检查。
- `POST /api/quotation/upload`：上传报价单，返回 file_path、file_name。
- `POST /api/query` 或 `POST /api/master/query`：Body `{ "query": "用户输入", "session_id": "可选", "context": { "file_path": "可选" } }`，返回 `answer`、`trace`、`thinking` 等。
