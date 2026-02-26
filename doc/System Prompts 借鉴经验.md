# System Prompts 借鉴经验

基于 [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) 中 Cursor、VSCode Agent、Cline 等产品的 system prompt，整理与 **Agent Team version3** 当前 prompt 的对比，以及可直接借鉴的写法与结构，用于提升对「自己项目 prompt」的认知与改进方向。

---

## 1. 该仓库里有什么

- **来源**：`学习案例/system-prompts-and-models-of-ai-tools`（或 GitHub 上 x1xhlol/system-prompts-and-models-of-ai-tools）。
- **内容**：各产品 **system prompt 与工具定义** 的合集，覆盖 Cursor、Devin、Windsurf、VSCode Agent、v0、Replit、Perplexity、Cline、Bolt 等 30+ 目录，README 自称「30,000+ 行」。
- **与 version3 最相关的子目录**：
  - **Cursor Prompts**：Agent Prompt 2.0 / v1.x、Agent Tools（工具 schema + When to Use/Not Use + 示例）。
  - **VSCode Agent**：Prompt.txt（身份 + 工具使用规则 + JSON 工具列表）、各模型变体。
  - **Open Source prompts**：Cline、Bolt、Codex CLI 等，偏「一步步用工具、少猜多查」的风格。

---

## 2. version3 当前 prompt 结构（对照用）

| 部分 | 现状 |
|------|------|
| **系统身份** | 一句：「你是统一业务助手，**一个主 Agent 掌握全部技能**，根据用户意图直接选用下方工具完成目标。无子 Agent，不委托、不转发。」 |
| **技能与工具** | 由各 Extension 的 `get_skill_prompt()` 拼成，多为「工具名 + 简短说明 + 参数」，**几乎没有**「何时用 / 何时不用」的成段说明。 |
| **输出格式** | `_CORE_OUTPUT_FORMAT`：<think>、tool_call、最终回答；**多轮指代**（选哪个→select_wanding_match、那个产品→上轮名称）。 |
| **工具使用规则** | 未在 system 里集中写「先读再改」「改完要校验」「别对用户说工具名」等。 |

也就是说：**身份 + 工具列表 + 输出格式** 有，但**工具选用边界、探索策略、编辑/校验纪律、对用户话术** 在 prompt 里几乎没写，更多靠模型自己发挥。

---

## 3. 可借鉴经验（按条）

### 3.1 每个工具写清「When to Use」/「When NOT to Use」

**Cursor 做法**：每个工具下都有「When to Use This Tool」「When NOT to Use」，并配简短例子。

- **例子（codebase_search）**：  
  - Use：探索陌生代码库、问「how/where/what」、按语义找代码。  
  - NOT Use：精确字符串用 grep、已知文件用 read_file、找文件名用 file_search、单符号用 grep；并写明「Query: "AuthService" → BAD: 单词搜索应用 grep」。  

**对 version3**：在技能 prompt 里，对「易混」工具成对写清边界，例如：

- `match_wanding_price`：何时用（按名称/规格查万鼎价格）、何时不用（已知 code 查单价用 get_wanding_price_by_code；要历史报价用 match_by_quotation_history）。
- `select_wanding_match`：何时用（已有候选要选型）、何时不用（还没有候选时先 match_*）。

这样能减少「该用 A 却调了 B」的情况。

---

### 3.2 探索策略：先广后窄、语义优先

**Cursor 做法**：  
- 「Semantic search is your MAIN exploration tool」；  
- 「Start with a broad, high-level query」再根据结果缩小目录；  
- 「Break multi-part questions into focused sub-queries」；  
- 「TRACE every symbol」「EXPLORE alternative implementations」。  

**VSCode Agent**：  
- 「Prefer using the semantic_search tool unless you know the exact string or filename pattern」；  
- 「Don't make assumptions - gather context first, then perform the task」。  

**对 version3**：version3 没有 codebase_search，但有「选型 / 报价 / 库存」等多工具。可借鉴的点：

- 在 system 里加**探索顺序**：① 先确认产品/规格再查价；不确定型号时先用 match 类工具拿候选，再用 select_wanding_match 选型，不要跳过候选直接猜。② **查库存**：若用户未提供 code 且非英文产品名，**先**用 match_quotation 找出产品得 code，**再**用 get_inventory_by_code 查库存；不要跳过 match 直接用 search_inventory（search 更适配英文关键词）。已落地在 `backend/plugins/jagent/skills.py` 的「查库存探索顺序」。
- 对「多步任务」：明确「先查再填」「先匹配再选型再查库存」的顺序，避免一上来就调错工具。

---

### 3.3 编辑与校验纪律

**VSCode Agent**：  
- 「Don't try to edit an existing file without reading it first」；  
- 「After editing a file, you MUST call get_errors to validate the change」。  

**Cursor**：  
- 「If you fail to edit a file, read the file again with a tool before trying to edit again」。  

**对 version3**：当前主要是「业务工具」（询价、填表、无货登记），没有「改代码 + get_errors」。但若有「写文件/改表格」类工具，可借鉴：

- 规则：「修改前先读取当前内容；修改后若有校验工具（如检查必填、格式）必须调用并根据结果修正」。

---

### 3.4 对用户：不说工具名，用自然语言描述动作

**Cursor / VSCode Agent**：  
- 「NEVER refer to tool names when speaking to the USER」；  
- 例如：不说「我会用 run_in_terminal」，而说「我会在终端里运行这条命令」。  

**对 version3**：  
- 在 system 或 output_format 里加一条：**回复用户时用业务语言**（如「正在查万鼎价格」「正在根据历史报价匹配」），**不要出现工具函数名**（如 match_wanding_price、select_wanding_match），避免用户看到技术细节。

---

### 3.5 输出格式：用「省略占位」减少冗余（若将来有编辑类工具）

**Cursor / VSCode Agent**：  
- 编辑时用 `// ... existing code ...` 表示未改动区域，只写出要改的片段。  

**对 version3**：  
- 当前没有「代码编辑」工具，若以后有「表格/模板填充」类工具，可约定：只传「有变动的单元格/行」，用占位表示「其余不变」，减少 token 与歧义。

---

### 3.6 可选：PLAN 与 ACT 分离（Cline）

**Cline**：  
- PLAN 模式：只做搜集信息、出计划，不执行写/跑。  
- ACT 模式：按计划执行工具。  

**对 version3**：  
- 当前是「单 ReAct 循环」，没有显式 PLAN/ACT。若希望「复杂询价/多行填表前先给步骤再执行」，可在 prompt 里约定：  
  - 用户明确说「先给个方案」或「先别动表」时，**只输出 <think> 中的步骤与工具调用顺序，不实际调工具**；  
  - 用户说「执行」或直接发需求时，再按步骤调工具。  
  实现上可不改架构，仅用 prompt 约束「何时只计划、何时真调工具」。

---

## 4. 落地优先级建议

| 优先级 | 内容 | 说明 |
|--------|------|------|
| **高** | 工具「When to Use / When NOT to Use」 | 在现有技能 prompt 里为万鼎三工具、询价、无货等补 1～3 句边界，减少误用。 |
| **高** | 对用户不说工具名 | 在 system 或输出格式中加一条「回复用业务用语，不暴露工具名」。 |
| **中** | 探索/选型顺序 | 用 1～2 句约定「先 match 再 select」「先确认产品再查价/库存」。 |
| **中** | 多轮指代 | 已有「选哪个→select、那个产品→上轮名称」，可再补「档位/客户级别」等若用户说「还是 A 档」时的绑定规则。 |
| **低** | 编辑前读、编辑后校验 | 有「改文件/表」类工具时再加。 |
| **低** | PLAN/ACT 分离 | 若有「先给方案再执行」的需求再在 prompt 里约定。 |

---

## 5. 小结

- **该仓库**适合用来**对照大厂/开源产品的 prompt 长度、结构和纪律**，而不是照抄全文；version3 是业务 Agent（询价/选型/填表），和纯编程 Agent 场景不同，但**工具边界、话术、探索顺序**的写法可直接借鉴。
- **提升「对自己项目 prompt 的认知」**：当前 version3 强在「身份 + 工具列表 + 输出格式」，弱在「工具选用边界、探索顺序、对用户话术、编辑/校验纪律」；按上表补几段短规则，就能在不大改架构的前提下明显改善表现。
- **参考文件**（仓库内）：  
  - `Cursor Prompts/Agent Prompt 2.0.txt`（工具 When/Not When、探索策略、edit 占位）；  
  - `VSCode Agent/Prompt.txt`（工具规则、get_errors、不说工具名）；  
  - `Open Source prompts/Cline/Prompt.txt`（PLAN/ACT、一步步用工具）。
