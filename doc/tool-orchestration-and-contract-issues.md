# 工具编排与结果契约：Codex 提出的三个问题与思考框架

本文档针对 Codex 反馈的「工具编排和结果契约」相关三点，给出**问题本质、影响**和**思考/改进方向**。与 `agent-injected-content.md` 互补：后者描述「塞入 agent 的内容」，本文档聚焦「工具返回形态 + 编排策略」对推理的影响。

---

## 1. 高优先级：批量利润率「逐条结构化分类」输出（已落地）

### 约定

- **data.items**：与输入 **严格 1:1**，**len(data.items) === len(input.items)**；每条输入对应一项（skipped 也占位），**输出顺序 = 输入顺序**。
- **每项字段**：**input_index**（0-based）、**code**、**price**（null 表跳过）、**item_status**（`matched` | `price_miss` | `code_not_found` | `skipped`）、**name**（必填，有则从价格库带出，无则 `""`）。matched 时增加 matched_price、matched_profit、matched_price_level；skipped 时增加 **skip_reason**，仅三种枚举：`missing_code` | `missing_price` | `invalid_price`（不写自然语言，便于 LLM/前端解析）。
- **Observation**：本阶段不把 data.items 拼进 observation，避免 token 爆炸；data.items 仅通过 API 返回，前端/后续 LLM 可按需使用。

### 实现

- `_execute_get_profit_by_price_batch` 在循环中维护 `items_with_status`，每条输入必产出一条并 append；返回 `data.items` 与现有 `data.rows`、`data.stats`、`result` 并存。空处理场景也返回 `data.items`，长度与输入一致。

**参考代码**：`backend/tools/inventory/services/inventory_agent_tools.py` 中 `_execute_get_profit_by_price_batch`、常量 `SKIP_REASON_*`。

---

## 2. 高优先级：用「固定文案子串」判断批量利润率结果，耦合脆弱

### 问题本质

- **现状**：`backend/core/agent.py` 里用 `if "三类统计（按输入条目分类）" in obs` 判断「这次工具返回是否是批量利润率的三类统计结果」，从而决定是否缓存 `last_profit_batch_obs`、以及是否在后续拦截「再调 Excel 解析」时注入该结果。
  - 一旦 `inventory_agent_tools.py` 里把这句文案改掉（例如改成「统计（按条目）」或英文），agent 侧逻辑立刻失效，且无编译/测试层面的保护。
- **后果**：维护成本高、易在改文案时引入隐性 bug；逻辑依赖「魔术字符串」而非稳定契约。

### 思考框架

- **契约维度**：不应依赖「某段自然语言是否出现」来做**控制逻辑**（是否缓存、是否拦截）。应依赖**结构化信号**（例如工具名 + 返回结构中的明确字段）。
- **改进方向**：
  - **方案 A**：工具返回中增加一个**稳定字段**，例如 `data.batch_profit_summary = true` 或 `result_type: "get_profit_by_price_batch"`，Agent 只根据 `name == "get_profit_by_price_batch"` 且该字段存在/为 true 来设置 `last_profit_batch_obs`，不再用 `in obs` 的字符串包含判断。实施时需让该工具的 observation 包含该信号（当前 `tool_utils.unwrap_tool_result` 只传 `result` 给 Agent，可对本工具在 handler 中返回完整 JSON 或 result + 结构化片段，Agent 解析后判断）。
  - **方案 B**：若暂时不能改工具返回结构，至少把「判断是否批量利润率结果」收口到**一处**（例如 helper：`is_profit_batch_result(tool_name, obs)`），内部再读 `obs` 或解析 `data`，这样文案变更只需改这一处，且便于单测。

**参考代码**：`backend/core/agent.py` 约 425–431 行（对 `get_profit_by_price_batch` 的观测缓存）、约 334–345 行（用 `last_profit_batch_obs` 拦截 Excel 解析）。

---

## 3. 中优先级：已收口为只用 parse_excel_smart（已落地）

### 当前策略

- **已做**：Agent 仅暴露 **parse_excel_smart** 作为 Excel/报价单解析工具，**不再暴露 extract_quotation_data**。模型无需在两种解析工具间选择，从根上避免「先 extract 再 parse」或同一轮内反复切换。
- **实现**：
  - `get_quote_tools_openai_format()` 已移除 extract_quotation_data 的 tool 定义；`extract_quotation_data` 函数与 `execute_quote_tool` 内对应分支保留，供内部/测试调用。
  - skills 中报价单段只描述 parse_excel_smart，规则简化为「同一 file_path 同一轮只调一次；有已截断则基于已有内容回答」。
  - `backend/core/agent.py` 的缓存与拦截只针对 `parse_excel_smart`；`_QUOTE_WITH_FILE` 已去掉 extract_quotation_data。

### 若仍需「仅报价区」逻辑

- 内部流程（如 run_quotation_fill）使用 `extract_inquiry_items`，不依赖 extract_quotation_data。若未来有需求「只要第 2 行～Total 上一行」，可在后端封装为单工具内部策略（对模型仍只暴露 parse_excel_smart），或由 parse_excel_smart 的 max_rows/表结构约定覆盖。

**参考代码**：`backend/tools/quotation/quote_tools.py`（get_quote_tools_openai_format）、`backend/plugins/jagent/skills.py`（SKILL_QUOTE）、`backend/core/agent.py`（parse_excel_smart 的缓存与 ≥20 条拦截）、`backend/tools/quotation/handler.py`（_QUOTE_WITH_FILE）。

---

## 小结：如何用这三个问题驱动改动

| 问题 | 核心矛盾 | 建议优先做 |
|------|----------|------------|
| 1. 缺逐条 item_status | 契约偏「人读」缺「机读」 | 在 `get_profit_by_price_batch` 的 `data` 中增加按输入条目的 `items`（含 `item_status`），并保持 result/stats 兼容 |
| 2. 固定文案子串判断 | 控制逻辑绑在易变的文案上 | 用「工具名 + 返回结构字段」替代 `"三类统计（按输入条目分类）" in obs`，或收口到单一判断函数 |
| 3. 双解析工具靠提示词 | 编排依赖模型自律 | **已落地**：仅暴露 parse_excel_smart，不再暴露 extract_quotation_data |

三者都围绕「**契约清晰、行为可预期、少依赖自然语言歧义**」：1 是结果契约，2 是控制契约，3 是编排策略。按上表顺序落地，能最大程度减少「模型误解三类统计」「文案一改就坏」「解析工具来回调」等问题。
