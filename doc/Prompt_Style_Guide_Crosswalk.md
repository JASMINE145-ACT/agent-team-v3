# 写作风格指南 × Chat Mode Prompt 对照审计

> **目的**：以仓库外文档《Claude-Code-Prompt写作风格指南》（否定约束、量化、场景例子、原则+原因、结构范式 A–D）为标尺，审计 Agent Team version3 内 **system prompt 三段拼接**与相关二次模型 prompt。  
> **范围**：只读审计与改版路线图；具体改写可在后续 PR 分批执行。  
> **关联架构**：[ChatMode_Prompt_Architecture.md](./ChatMode_Prompt_Architecture.md) 第 2、4、14、18、19 节。

---

## 1. 原则 → 可检验检查项 → 映射表

| 指南条目 | 检查项（可 grep / 人工打分） | 固定前缀 | SKILL（DOC） | SKILL（RULES） | OUTPUT_FORMAT（Loop） | OUTPUT_FORMAT_LEGACY | GLOBAL_HARD |
|----------|------------------------------|----------|--------------|----------------|----------------------|----------------------|-------------|
| **1.1 否定式** | 是否用「禁止/不要/DO NOT/MUST NOT」写清禁止行为 | 仅肯定式身份句，否定少 | 混用「必须」与少量禁止；长说明 | 大量 IF/THEN + DO NOT，符合度高 | Failure 段有 Don't 合并约束 | 有 Failure 简述 | NEVER + MUST，符合 |
| **1.2 量化** | 是否有数字上限（条数、字数、步数） | 无字数上限 | 档位映射等结构化量化多；最终回复字数无统一上限 | 同左，规则更密 | Gather ≤6 条、Verify ≤6 条、每点 ≤1 句 | 无四段上限，仅 ONE tool | N/A |
| **1.3 场景化例子** | 关键路径是否有正例+反例 | 无 | 中文库存链、关键词保护等有 ❌ 反例 | 库存链、Excel、澄清等多组 Correct/Incorrect | Plan 内有示例块 | 无内嵌四段示例 | N/A |
| **1.4 边界+原因** | 规则是否写清违反后果或误导风险 | 「不委托」隐含边界 | Excel 表头/截断、Qty≠库存写清 | Verify 不得误判「只有表头」等 | 与 Failure 呼应 | 简述不得臆造 | Qty≠库存 + 工具边界 |
| **范式 A** 原则+否定+边界 | 技能段是否为可扫列表 | N/A | DOC 偏长叙事 | RULES 分层清晰，更近范式 A | 四段即一种结构化范式 | bullet 列表 | 单段硬约束 |
| **范式 D** 条件激活 | 是否按场景注入，避免一次加载全部 | N/A | Chat 已裁掉 Work 流水线技能 | 同左 | 由 `USE_CLAUDE_LOOP_PROMPT` 切换 Loop/LEGACY | 同左 | 全局常注 |

**高优先级矛盾（需在改版时显式决策）**

1. **selection_reasoning / reasoning**：RULES 与 LEGACY 写明「structured、UI 渲染、模型不要在 think 里复述」；若产品又希望用户从正文中看到「选型理由」，需在 **UI 与 prompt 间二选一并写死**，避免模型与前端各猜一套。
2. **四段式 token 成本**：Loop 版 `OUTPUT_FORMAT` 约 **3207** 字符，LEGACY 约 **703** 字符；整段 system（CHAT_DOC + Loop）约 **8710** 字符（粗估约 **2.2k tokens** 仅 system），RULES + Loop 约 **15.7k** 字符。MiniMax 等模型 completion 预算有限时，四段式易挤占「工具后最终答复」长度。
3. **`_CORE_OUTPUT_FORMAT` 与 `OUTPUT_FORMAT_LEGACY` 文案**：注释称「同构」，实测 **626 vs 703 字符**，且二者在「think 块」说明处写成了**两个闭合标签、缺少开标签**，会误导模型；属 **P0 文档级 prompt bug**。解析侧为 `agent_helpers._extract_tag(content, "think")`，标签名必须为 **think** 且成对出现，与 `skills.py` 中 `OUTPUT_FORMAT` 示例一致。

---

## 2. Prompt 资产盘点

### 2.1 System 拼接（主 Chat ReAct）

| 资产 | 路径 | 说明 |
|------|------|------|
| 固定前缀 + 拼接 | [backend/core/agent_helpers.py](../backend/core/agent_helpers.py) `build_system_prompt` | 身份 + `---` + 技能 + 输出格式 |
| 默认回退 output | 同上 `_CORE_OUTPUT_FORMAT` | `output_format` 为空时使用；应与 LEGACY 对齐维护 |
| 技能与 output 选用 | [backend/plugins/jagent/extension.py](../backend/plugins/jagent/extension.py) | `get_output_format_prompt()`：`USE_CLAUDE_LOOP_PROMPT` 决定 Loop vs LEGACY |
| 技能正文 | [backend/plugins/jagent/skills.py](../backend/plugins/jagent/skills.py) | `CHAT_SKILL_PROMPT_DOC` / `CHAT_SKILL_PROMPT_RULES`；`Config.USE_DECISION_RULE_SKILLS` 切换 |
| 全量技能（含 Work） | 同上 `ALL_SKILL_PROMPT_*` | Chat 不用，供其他入口复用 |

### 2.2 OUTPUT_FORMAT 双轨（字符数实测，本地 `py -3`）

| 常量 | 字符数 |
|------|--------|
| `OUTPUT_FORMAT`（四段式 Loop） | 3207 |
| `OUTPUT_FORMAT_LEGACY` | 703 |
| `_CORE_OUTPUT_FORMAT` | 626 |
| `CHAT_SKILL_PROMPT_DOC` | 5406 |
| `CHAT_SKILL_PROMPT_RULES` | 12415 |
| `build_system_prompt(CHAT_DOC, OUTPUT_FORMAT)` | 8710 |
| `build_system_prompt(CHAT_RULES, OUTPUT_FORMAT)` | 15719 |
| `build_system_prompt(CHAT_DOC, OUTPUT_FORMAT_LEGACY)` | 6206 |

### 2.3 Thinking 标签与解析链

| 环节 | 行为 |
|------|------|
| OpenAI 协议 / fallback | [backend/core/agent.py](../backend/core/agent.py) `_extract_tag(content, "think")`：按标签名 **think** 成对匹配，抽取内容写入 trace 的 thinking |
| Anthropic 协议 | [backend/core/anthropic_react_llm.py](../backend/core/anthropic_react_llm.py) 将原生 thinking block 前置拼入同名字符串，再接文本；文本内可再含 tool_call XML |
| 主 prompt | `OUTPUT_FORMAT` / LEGACY 要求模型使用与 **think** 标签一致的思考块（须与解析器一致） |

### 2.4 二次模型（与主 Agent system 独立）

| 资产 | 路径 | 说明 |
|------|------|------|
| 选型 system + user 模板 | [backend/tools/inventory/services/llm_selector.py](../backend/tools/inventory/services/llm_selector.py) `_system_selector`、用户侧业务规则字符串 | 仅输出 JSON；`reasoning` 已 prompt 约束非空与字数；**无**写作指南中的「范式 A 列表」，但已用否定式+量化 |

### 2.5 其他引用

- [backend/prompts/provider.py](../backend/prompts/provider.py)：`LocalPromptProvider` 默认 output 来源与 extension 可分叉。
- [backend/tools/inventory/services/agent_runner.py](../backend/tools/inventory/services/agent_runner.py)：**独立** `_system_prompt` 路径（架构文档 §9）；改版时勿只改 CoreAgent 而遗漏。

---

## 3. 差距分析（摘要）

| 维度 | 结论 |
|------|------|
| **否定式** | RULES 与 OUTPUT_FORMAT 的 Failure 段较好；固定前缀与 DOC 技能仍偏「说明体」，可改为「身份 1 句 + Don't 短列表」对齐指南 3.1。 |
| **量化** | Loop 内 Gather/Verify 已量化；**最终用户可见回答**无统一字数/条数上限，易出现有时极简、有时长表。 |
| **例子** | 库存/Excel/澄清 RULES 正反面齐全；DOC 有关键词 ❌ 例，整体达标。 |
| **DOC vs RULES 语义** | 大段规则在两侧均有覆盖，但 **表述长度与语气不同**；长期维护易出现漂移，适合「单一真源 + 摘要」策略（见下阶段 roadmap）。 |
| **双轨 Loop vs LEGACY** | Loop 强调四段与 Act 前「自然语言说明再 tool_call」；LEGACY 强调「可直接 tool_call」。行为差异会影响 **首包展示、completion 长度、是否截断**；需在 General/运营文档写清 **何时 True/False**。 |
| **测试耦合** | [test_claude_loop.py](../test_claude_loop.py) 断言 `Gather Context`、`Take Action`、`Verify Results` 等 **字符串存在**；[tests/test_integration_agent_react.py](../tests/test_integration_agent_react.py) 断言 system 含 `Plan` 或 `Gather` 或 `技能`。改版 OUTPUT_FORMAT 时必须同步改测试或改为语义化断言（例如「含 tool_call 约定」）。 |

---

## 4. 分批改版路线图与验证矩阵

### 4.1 推荐顺序（每步可独立 PR）

1. **P0 文案修复**：修正 `_CORE_OUTPUT_FORMAT` 与 `OUTPUT_FORMAT_LEGACY` 中 think 标签说明（开闭标签成对）；对齐 `_CORE_OUTPUT_FORMAT` 与 LEGACY 差异或注明「故意不同」。
2. **前缀小改**：`build_system_prompt` 内联前缀增加 3–5 条 Don't / Only（不委托子 Agent、不臆造 observation、ONE step ONE tool 等），与 OUTPUT_FORMAT 不重复即可。
3. **DRY Tool 全局规则**：将 `OUTPUT_FORMAT` 与 `OUTPUT_FORMAT_LEGACY` 末尾共享的 **Tool Call Global Rules** 抽为单常量拼接，减少双轨漂移。
4. **Loop 内部重写**：保留四段骨架，每段改为「Don't / Only / 数字上限 + 一条短例」，贴近写作指南 §1–2。
5. **单一真源技能**：以 RULES 为机器可读主文本，DOC 改为短摘要 + 锚点；工作量大，需同步 [ChatMode_Prompt_Architecture.md](./ChatMode_Prompt_Architecture.md) 第 3 节。
6. **范式 D 条件注入**：按意图仅追加最长段落（如管件关键词），依赖 hook 或 session 元数据，工程改造最大。

### 4.2 验证矩阵（改版后回归）

| 场景 | `USE_CLAUDE_LOOP_PROMPT` | 期望信号 |
|------|--------------------------|----------|
| 中文查价「直接 50」 | True / False 各跑 | 单次 `match_quotation`，keywords 保留「直接」 |
| 中文查库存链 | True / False | `match_quotation` → `get_inventory_by_code`，不直跳 `search_inventory` |
| Excel 多行 | True | 不声称「仅表头」；与 observation 行数一致 |
| 澄清 | True | 意图不明时 `ask_clarification` |
| 低置信 options | True | 优先展示 `options` 小表，非全量 candidates |
| thinking 抽取 | True | 日志/trace 中 `thinking` 与模型输出的 think 块内容一致、无整段泄漏进 tool 消息（依协议路径验证） |

---

## 5. 与架构文档的同步约定

- 本文档为 **V1 审计快照**；修改 `skills.py` / `agent_helpers.py` 大段 prompt 后，应更新本节「字符数表」与第 3 节结论。
- [ChatMode_Prompt_Architecture.md](./ChatMode_Prompt_Architecture.md) §18–§19 指向本文；OUTPUT_FORMAT 大改时需同步 §4 原文或版本号。

---

## 6. 参考阅读

- 项目外：`学习总结文档/Claude-Code-Prompt写作风格指南.md`（原则与句式库）。
- 项目内：`doc/ChatMode_Prompt_Architecture.md`（构建链路与时序）。
