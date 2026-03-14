# Agent 推理/执行流程中注入的内容一览

本文档列出所有会塞入主 Agent（ReAct）推理与执行流程的 **system prompt、工具描述、每轮注入文案、会话/上下文注入**，便于排查「最影响推理执行」的配置与文案来源。  
对应代码库：`Agent Team version3`，入口：`CoreAgent.execute_react`。

---

## 1. System prompt 的构成

### 1.1 拼接入口

| 位置 | 说明 |
|------|------|
| `backend/core/agent.py` | `CoreAgent.__init__` 中遍历 extensions，收集 `get_skill_prompt()`（各 extension 结果用 `\n\n` 拼接）与 `get_output_format_prompt()`（**取最后一个 extension 的返回值**，即 last-wins），调用 `build_system_prompt(skill_prompt, output_fmt)` 得到 `self._system_prompt`。 |
| `backend/core/agent_helpers.py` | `build_system_prompt(skill_prompt, output_format)`：固定头 + 技能段 + 输出格式段。 |

### 1.2 固定头部（agent_helpers.build_system_prompt）

- **文案**（约 1 句）：  
  `你是统一业务助手，**一个主 Agent 掌握全部技能**，根据用户意图直接选用下方工具完成目标。无子 Agent，不委托、不转发。`
- 其后拼接：`---`、`## 技能与工具（按目标选用）`、**skill_prompt**、`---`、**output_format**（若为空则用 `_CORE_OUTPUT_FORMAT`）。

### 1.3 技能段（skill_prompt）来源

| 来源 | 变量/常量 | 用途 |
|------|-----------|------|
| `backend/plugins/jagent/extension.py` | `get_skill_prompt()` | 若构造时传入 `PromptProvider`，则委托 provider；否则从 `backend.plugins.jagent.skills` 取 `CHAT_SKILL_PROMPT`。 |
| `backend/prompts/provider.py` | `LocalPromptProvider.get_skill_prompt()` | 返回 `skills.CHAT_SKILL_PROMPT`。 |
| `backend/plugins/jagent/skills.py` | **CHAT_SKILL_PROMPT** | Chat 用：`SKILL_INVENTORY_PRICE` + `SKILL_EXCEL_CHAT` + `SKILL_CLARIFY` + `SKILL_KNOWLEDGE`（不含报价单专用 SKILL_QUOTE/SKILL_FILL、无货 SKILL_OOS）。 |
| 同上 | **ALL_SKILL_PROMPT** | 全量：含 SKILL_QUOTE、SKILL_FILL、SKILL_OOS；供需要时复用，Chat 默认不注入。 |

**各 SKILL_* 常量概要**（完整正文见 `backend/plugins/jagent/skills.py`）：

- **SKILL_INVENTORY_PRICE**：库存与询价/价格——search_inventory、get_inventory_by_code、modify_inventory、match_quotation、match_by_quotation_history、match_wanding_price、select_wanding_match、get_profit_by_price、get_profit_by_price_batch；何时用、查库存调用顺序、keywords 保护、档位与自然语言对应、回复档位全名、needs_selection 行为。
- **SKILL_OOS**：无货——get_oos_list、get_oos_stats、get_oos_by_file、get_oos_by_time、register_oos、register_oos_from_text；Chat 不注入。
- **SKILL_QUOTE**：报价单提取/填表/普适 Excel——parse_excel_smart（统一解析）、fill_quotation_sheet、edit_excel；同一 file_path 同一轮只调一次解析、字段语义、表格必须逐行一致、不得在单元格填「数据被截断」；Chat 不注入。
- **SKILL_FILL**：询价填充整单流水线——run_quotation_fill；Chat 不注入。
- **SKILL_EXCEL_CHAT**：Chat 用 Excel——parse_excel_smart、回复与工具表逐行一致、不得在单元格填「数据被截断」、已截断时说明方式。
- **SKILL_CLARIFY**：澄清——ask_clarification；意图不明确时必用、库存/价格关键词才可跳过。
- **SKILL_KNOWLEDGE**：业务知识记录——append_business_knowledge；用户要求记到知识库时必调。

### 1.4 输出格式段（output_format）来源

| 来源 | 变量/常量 | 用途 |
|------|-----------|------|
| `backend/plugins/jagent/extension.py` | `get_output_format_prompt()` | 若有 PromptProvider 则委托；否则从 skills 取 `OUTPUT_FORMAT`。 |
| `backend/prompts/provider.py` | `LocalPromptProvider.get_output_format_prompt()` | 返回 `skills.OUTPUT_FORMAT`。 |
| `backend/plugins/jagent/skills.py` | **OUTPUT_FORMAT** | 每轮必须：先 <think> 目标/已知/缺失/本步行动；若调工具则紧接 tool_call，结果返回后目标完成则直接最终回答；不调工具则在 <think> 后直接回答；多同类项优先用 *_batch；多轮指代（选哪个→select_wanding_match，那个产品→用上轮完整名称）。 |
| `backend/core/agent_helpers.py` | **_CORE_OUTPUT_FORMAT** | 当 output_format 为空时使用的默认输出格式（与 OUTPUT_FORMAT 语义相近）。 |

---

## 2. 工具定义（Tool descriptions）

所有注册给 CoreAgent 的工具均通过 `ToolRegistry.get_definitions()` 以 **OpenAI function calling** 格式返回（含 `name`、`description`、`parameters` 及各参的 `description`）。以下按模块列出 **name + description 概要**；完整 schema 见对应文件。

### 2.1 报价/Excel（quote_tools + handler）

| 工具名 | description 概要 | 定义位置 |
|--------|------------------|----------|
| parse_excel_smart | 【统一 Excel 解析】按行读全表，最多 500 行；提取/查看报价单或 Excel 均用此工具 | quote_tools.get_quote_tools_openai_format |
| fill_quotation_sheet | 【报价单导向】按 fill_items 写入 G/H/J/L/N/O 等列，交货/报价日期 | 同上 |
| edit_excel | 【普适性】cell+value 单格或 range+values 区域写入 | 同上 |

### 2.2 库存/询价/价格（inventory_agent_tools）

| 工具名 | description 概要 | 定义位置 |
|--------|------------------|----------|
| search_inventory | 按产品名/规格关键词搜库存；适配英文；中文询价优先历史匹配 | inventory_agent_tools.get_inventory_tools_openai_format |
| get_profit_by_price | 万鼎按 code 或产品名+价格查档位利润率，返回所有档位价格/利润率 | 同上 |
| get_profit_by_price_batch | 多组 code+price 一次查利润率；多产品（整表或 5+ 编号）时优先用，单次最多 50 条 | 同上 |
| get_inventory_by_code | 按 10 位物料编号直接查库存 | 同上 |
| match_quotation | 询价匹配：历史+万鼎并集，带 source | 同上 |
| match_by_quotation_history | 仅历史匹配 | 同上 |
| match_wanding_price | 万鼎字段匹配，返回 single/needs_selection/未匹配 | 同上 |
| select_wanding_match | LLM 选型，从 needs_selection 候选中选 1 个，须传 match_source | 同上 |
| modify_inventory | 锁定可售或增补/归零；需 INVENTORY_MODIFY_ENABLED=1 | 同上 |

### 2.3 无货（agent/tools.py + oos handler）

| 工具名 | description 概要 | 定义位置 |
|--------|------------------|----------|
| get_oos_list | 【无货】无货产品列表，含被报无货次数与邮件状态 | backend/agent/tools.py |
| get_oos_stats | 【无货】无货统计 | 同上 |
| get_oos_by_file | 【无货】按文件统计 | 同上 |
| get_oos_by_time | 【无货】按时间统计 | 同上 |
| register_oos | 【无货】从报价单解析无货行落库；须 context.file_path | 同上 |
| register_oos_from_text | 【无货】用户直接说产品无货时落库，无需文件 | 同上 |

### 2.4 询价填充 / 澄清（agent/tools.py）

| 工具名 | description 概要 | 定义位置 |
|--------|------------------|----------|
| run_quotation_fill | 【询价填充】整单流水线；须明确「询价填充/完整报价」且 context.file_path | backend/agent/tools.py |
| ask_clarification | 【澄清】意图不明确时调用；已含库存/价格/万鼎等词可跳过 | 同上 |

### 2.5 业务知识（handler 注册）

| 工具名 | description 概要 | 定义位置 |
|--------|------------------|----------|
| append_business_knowledge | 用户要求记到知识库时调用，content 为润色后一条知识 | `backend/agent/tools.py`（EXTRA_TOOLS）；handler 在 `backend/tools/quotation/handler.py` 注册 |

---

## 3. 每轮或关键步骤注入的文案

### 3.1 首轮 user 前的 system 追加

| 内容 | 条件 | 位置 |
|------|------|------|
| **[ExcelSummary]** 段 | context 含 file_id 或 file_path，且 `get_excel_summary_for_context(ctx)` 返回非空 | agent.py：`format_excel_summary_for_prompt(entry)` 生成；`messages.append({"role": "system", "content": summary_text})` |
| 格式 | 见 `excel_summary.format_excel_summary_for_prompt`：`[ExcelSummary]` + header(file_id, file_path, rows_count, preview_count, truncated) + 关键信息条目预览（最多 max_items=20，总长 max_chars=2000） | backend/tools/quotation/excel_summary.py |

### 3.2 首轮 user 消息内的追加（user_content）

| 内容 | 条件 | 位置 |
|------|------|------|
| `[Context: 已上传报价单，file_path=...]` | context 有 file_path | agent.py |
| `[Context] file_id=...（用于在工具中定位同一份 Excel...）` | context 有 file_id | agent.py |
| **build_injection(session)** | session_id 存在、store 能 load 到 session，且 build_injection 非空（session 有 turns） | agent.py；内容见下节「会话/上下文注入」 |
| **【当前意图】用户本句是对上一轮「问：…」的回复...** | session 有 turns 且 user_input 长度 ≤15 | agent.py |
| **build_tool_memory_injection(session, max_items=3)** | 有 turns、user_input 长度 ≤20、且当前轮**未**绑定 file_path/file_id | agent.py；内容见下节 |
| **【当前主题】上一轮问：…。用户本句：…。请据此理解意图与所指产品。** | session 有 turns | agent.py |

### 3.3 扩展对 user 的修改

| 内容 | 位置 |
|------|------|
| `user_content = ext.on_before_prompt(user_content, ctx)` | agent.py 中在构建 excel_summary / injection 之前，对每条 extension 调用 |

### 3.4 步数达上限时的注入

| 内容 | 条件 | 位置 |
|------|------|------|
| **_MAX_STEPS_HINT** | 当前步为最后一步（step == max_steps - 1）时，追加一条 user 消息 | agent.py |
| 文案 | 「（本轮推理步数已达上限。）请根据目前已获取的信息直接给出最终回答，不再调用任何工具。若尚有未处理完的项目...」不向用户展示「步数限制」等系统术语 | agent.py 常量 |

### 3.5 工具结果截断时的后缀

| 内容 | 条件 | 位置 |
|------|------|------|
| 通用工具 | `len(obs) > TOOL_RESULT_MAX_CHARS`（8_000） | agent.py：obs 截断后追加「…（以上结果因长度限制已截断。行数已按解析结果完整计算，请基于已有内容回答，勿重复调用解析工具。）」 |
| Excel 类工具 | `len(obs) > TOOL_RESULT_EXCEL_MAX_CHARS`（默认 48_000） | 同上，仅对 parse_excel_smart 使用更高上限 |

### 3.6 工具缓存命中时的“假” observation

| 内容 | 条件 | 位置 |
|------|------|------|
| 同一工具+同参已调用过 | tool_obs_cache 已有该 key | agent.py：返回缓存 obs +「提示：同一工具和参数在本轮已调用过，请直接基于已有结果继续，不要重复调用。」 |
| Excel 解析类 + 刚完成批量利润率（≥20 条） | name 为 parse_excel_smart，且 last_profit_batch_items>=20 且有 last_profit_batch_obs | agent.py：直接返回 last_profit_batch_obs + 提示不要再次调用 Excel 解析工具 |

### 3.7 扩展对工具结果的后处理

| 内容 | 位置 |
|------|------|
| `ext.on_after_tool(name, args, obs, ctx)` | agent.py 在把 observation 写入 messages 前，对每条 extension 调用；可修改 obs 再交给模型。例如 JAgentExtension 对 run_quotation_fill 结果截断、英文场景下为中文 obs 附加翻译提示。 |

---

## 4. 会话/上下文注入（Session store）

### 4.1 build_injection(session) 产出

- **[会话摘要]**：`session.summary`（若存在）。
- **[会话上下文 — 最近 N 轮]**：最近 `INJECT_TURNS`（默认 4）轮，每轮：轮次、时间、agent、问、答（答截断到 `INJECT_ANSWER_TRIM`=2000 字，超出加「…（已截断）」）。
- **[已上传文件]**：`session.file_path` 的文件名与路径。
- **[用户偏好]**：`session.user_facts` 中非 `_` 开头的 key=value。
- 结尾一句：**【说明】当前用户下一条消息是对上述「最近一轮」的回复...**

### 4.2 build_tool_memory_injection(session, max_items=3) 产出

- **[最近工具调用]**：最近 3 条 `tool_memory.recent_tools`，每条：工具名 + summary（summary 超 160 字截断）。
- 仅在「有 session.turns、本句长度≤20、且本轮未绑定 file_path/file_id」时追加到 user_content。

### 4.3 Tool Memory 的写入

- 每次工具执行后：`append_tool_memory(session_id, record)`，record 含 tool、args、summary（从 obs 抽取或 180 字摘要）、可选 data。
- 最近保留条数 limit=50。

---

## 5. 配置与常量速查

| 项 | 默认/来源 | 说明 |
|----|-----------|------|
| REACT_MAX_STEPS | Config.REACT_MAX_STEPS，默认 12 | 每轮 ReAct 最大步数 |
| LLM_MAX_TOKENS | Config.LLM_MAX_TOKENS，默认 20000 | 单次回复最大 token |
| TOOL_RESULT_MAX_CHARS | 8_000 | 单次工具结果最大字符（非 Excel） |
| TOOL_RESULT_EXCEL_MAX_CHARS | 48_000（可环境变量） | Excel 解析类工具结果上限 |
| _CONTEXT_MAX_CHARS | agent.py，8_000 | 多轮总上下文超此值时压缩历史 tool 结果（_trim_context） |
| INJECT_TURNS | SessionStore，默认 4 | 注入的最近轮次数 |
| INJECT_ANSWER_TRIM | SessionStore，默认 2000 | 每轮「答」注入时的最大字符 |
| format_excel_summary max_items / max_chars | 20 / 2000 | Excel 摘要条数与总长 |

---

## 6. 文件索引（便于改 prompt / 工具描述）

| 用途 | 文件路径 |
|------|----------|
| 技能正文（SKILL_*、OUTPUT_FORMAT） | `backend/plugins/jagent/skills.py` |
| system 固定头 + 默认输出格式 | `backend/core/agent_helpers.py` |
| 报价/Excel 工具定义与 description | `backend/tools/quotation/quote_tools.py`（get_quote_tools_openai_format） |
| 库存/询价/利润率工具定义 | `backend/tools/inventory/services/inventory_agent_tools.py`（get_inventory_tools_openai_format） |
| 无货/询价填充/澄清 工具定义 | `backend/agent/tools.py` |
| Excel 摘要格式化（[ExcelSummary]） | `backend/tools/quotation/excel_summary.py`（format_excel_summary_for_prompt） |
| 会话注入（build_injection、build_tool_memory_injection） | `backend/agent/session.py` |
| 步数上限提示、工具截断与缓存逻辑、多轮上下文压缩（_trim_context） | `backend/core/agent.py` |
| Chat 使用的 skill 组合 | `backend/plugins/jagent/skills.py`（CHAT_SKILL_PROMPT） |
| Prompt 提供方（若用 provider） | `backend/prompts/provider.py` |

以上内容均会直接或间接影响主 Agent 的推理与执行；修改时建议优先关注 **skills.py**（技能+输出格式）和 **各工具 definition 的 description**，其次为 **agent.py** 中的注入与截断逻辑、**session.py** 中的会话/工具记忆注入。
