"""
JAgent 技能描述常量（从 backend/agent/agent.py 平移）。
"""

SKILL_INVENTORY_PRICE = """\
**1. 库存与询价/价格**
- **目标**：查库存、查报价、查各档位价格；询价/查 code 时优先 match_quotation（历史+万鼎并行取并集，结果带匹配来源），多候选时用 LLM 选型。
- **search_inventory(keywords)**：按产品名/规格搜库存，只适配英文。
- **get_inventory_by_code(code)**：已知 10 位物料编号时直接查库存。
- **match_quotation(keywords, customer_level?)**：**询价/查 code 时优先用本工具**。同时查报价历史与万鼎字段匹配，结果取并集，每条候选带 **source**（历史报价/字段匹配/共同）。返回格式含 candidates、match_source，单条时含 chosen。这样「直接50mm」等既能命中历史也能命中万鼎时，会显示 共同 或 历史报价。
- **match_by_quotation_history(keywords)**：仅历史匹配（单独用较少，一般用 match_quotation）。
- **match_wanding_price(keywords, customer_level?)**：仅字段匹配（万鼎）。用户明确说「**用万鼎查**」「**不要历史**」「**直接万鼎**」时**只调用本工具**，不调 match_quotation。
- **select_wanding_match(keywords, candidates)**：LLM 选型。needs_selection 且用户要「选一个」时调用；传入 match_source（来自上一步 observation）。
- **何时用**：用户已明确「库存/可售」或「价格/报价/万鼎/档位」时选用；只说「查XX」未指明 → 用 ask_clarification 澄清。
- **询价/查 code/查物料编号**：**必须优先调用 match_quotation**（一次得到历史+万鼎并集及匹配来源）；仅当用户明确「用万鼎查/不要历史」时改用 match_wanding_price。得 code 后可用 get_inventory_by_code 查库存。
- **「全部价格」「各档价格」**：对同一 keywords 按需分别调用 match_wanding_price(customer_level=…)，汇总成表格「客户级别 | 客户价」。**档位与自然语言对应**：用户说「**二级代理**」「二级代理价格」→ customer_level=A；「**一级代理**」→ B；「**聚万大客户**」→ C；「**青山大客户**」「青山大客户价格」→ D（降低利润率用 D_low）；「**大唐大客户**」→ E。**出厂/采购价**：用户要「出厂价含税」「出厂价不含税」「采购不含税」时传 customer_level=出厂价_含税 / 出厂价_不含税 / 采购不含税。档位代码：A 二级代理，B 一级代理，C 聚万大客户，D 青山大客户，D_low 青山(降低)，E 大唐(包运费)。**只调一次会只得到默认 B 档。**
- **needs_selection 时**：用户要「全部价格/所有匹配/列出所有候选」→ 不调 select_wanding_match，直接用 observation 里 candidates 整表回复；要「某一款/选一个」→ 必须 select_wanding_match。
- **展示**：结果表上方必写「匹配来源：」+ match_source；候选含 source 时表格加「来源」列；有 chosen 时标「已选：第 N 条」；select_wanding_match 须传入上步 match_source。"""

SKILL_OOS = """\
**2. 无货**
- **目标**：无货登记、无货列表、无货统计（含被报无货次数、邮件状态、按文件/按时间）。
- **get_oos_list(limit?)**：无货产品列表，每条含「被报无货 N 次」「邮件：已发送/未发」。用户问「无货列表」「无货有哪些」「他们被报无货几次」时用。
- **get_oos_stats()**：无货统计（总记录数、无货产品数、被报无货≥2 次产品数、已发邮件产品数、今日新增）。用户问「无货统计」「无货概况」时用。
- **get_oos_by_file(limit?)**：按文件统计，每个报价单对应的无货记录数及上传时间。用户问「按文件看无货」「每个文件多少无货」时用。
- **get_oos_by_time(last_n_days?)**：按时间（按日）统计最近 N 天新增无货记录数。用户问「按时间看无货」「无货按日/按天」「最近几天无货趋势」时用。
- **无货登记有两种途径**（二选一）：
  - **register_oos(file_path, prompt?)**：从已上传报价单解析无货行并落库。仅当用户明确说「无货登记」且 context 中已有 file_path 时调用。
  - **register_oos_from_text(product_name, specification?, quantity?, unit?)**：用户**直接说**某产品无货时用，无需文件。例如「外螺纹堵头 50 无货」「报一下 XX 无货」「登记 XX 无货」→ 从用户句中解析出产品名、规格、数量后调用本工具落库；无 file_path 时必须用本工具，勿提示先上传。"""

# 报价单专用 + 整单询价填充（Work 流程用；Chat 不注入，见 CHAT_SKILL_PROMPT）
SKILL_QUOTE = """\
**3. 报价单（提取/填表/普适 Excel）**
- **目标**：从报价单取数据、往报价单填数据、或任意 Excel 解析/编辑。
- **extract_quotation_data(file_path, sheet_name?)**：从报价单提取第 2 行到「Total Excluding PPN」上一行的数据，返回 Markdown 表。需 context 有 file_path。
- **fill_quotation_sheet(file_path, fill_items, ...)**：将匹配结果按行回填报价单（row, code, quote_name, unit_price, qty 等）。
- **parse_excel_smart(file_path, sheet_name?, max_rows?)**：普适解析任意 Excel，零硬编码，返回 Markdown 表。
- **edit_excel(file_path, edits, ...)**：普适编辑任意 Excel（cell+value 或 range+values）。
- **何时用**：用户要「提取报价数据」「看报价单内容」「填表」「解析/编辑这个 Excel」且 context 有 file_path 时用；**整单询价填充**用下面的 run_quotation_fill。"""

SKILL_FILL = """\
**4. 询价填充（整单流水线）**
- **目标**：对整张报价单做「提取 → 万鼎匹配 → 库存校验 → 回填」一条龙。
- **run_quotation_fill(file_path, customer_level?)**：仅当用户明确说「询价填充」「填充报价单」「完整报价」且 context 有 file_path 时调用。内部会先历史匹配、无则万鼎字段匹配，多候选时 LLM 选型。customer_level 默认 B。"""

# Chat 仅保留普适 Excel，不包含报价单流水线；整单相关引导至 Work
SKILL_EXCEL_CHAT = """\
**3. Excel（普适，Chat）**
- **parse_excel_smart(file_path, sheet_name?, max_rows?)**：解析任意 Excel，返回 Markdown 表。
- **edit_excel(file_path, edits, ...)**：普适编辑 Excel（cell+value 或 range+values）。
- **何时用**：用户要「解析这个 Excel」「改这个格子」且 context 有 file_path 时用。**整单询价填充、报价单提取/按表填表请到 Work 页操作。**"""

SKILL_CLARIFY = """\
**5. 澄清**
- **ask_clarification(questions, reasoning?)**：当用户意图**不明确**时必须使用，例如：
  - 用户只说「查询XX」「查XX」「查一下25管卡」等，**未指明**是查**库存**还是查**价格/报价** → 必须 ask_clarification，例如：「您是想查该产品的库存数量，还是查万鼎报价/各档位价格？或两者都要？」
  - 用户只说「帮我查一下」等极简输入 → 必须 ask_clarification。
- 只有在用户已明确提到「库存」「还有多少货」「可售」或「价格」「报价」「万鼎」「档位」等其中之一时，才可直接选用库存类或价格类工具，勿擅自默认成库存或价格。"""

SKILL_KNOWLEDGE = """\
**6. 业务知识记录**
- **append_business_knowledge(content)**：当用户要求将某条知识、规则、纠正**记录到知识库 / 记在 knowledge / 润色后记录 / 把这个记下来**等（任意说法）时，**必须**调用本工具。content 为润色后的完整一条知识（可多句），如「PVC160 不是标准规格，应理解为 DN150(6")」。无需用户先说「请记住」；用户说「记录在 knowledge 里面」「可以润色一下记到知识库」即调用。"""

OUTPUT_FORMAT = """\
## 输出格式（每轮必须）

1. 先输出 <think>...</think>
   - 目标 / 已知 / 缺失 / 本步行动（调用哪类工具或直接回答）。
2. 若调用工具：紧接 tool_call；工具结果返回后，若目标已完成则直接输出最终回答（无需再调工具）；否则继续下一轮工具调用。
3. 若不调用工具（如打招呼、能力外）：在 <think> 后直接给出最终回答。

**多轮指代**：用户说「选哪个」「帮我选一个」「你选」→ **必须**调用 **select_wanding_match**（keywords 用上一轮询价关键词，candidates 从上一轮 observation 或回复表格解析）。用户说「那个产品」「查这个的库存」→ 用上一轮表格里的**完整产品名或编号**调用 search_inventory / get_inventory_by_code / match_quotation 或 match_wanding_price，勿用用户本句的简称或错字。"""

# 全量技能（含报价单流水线），供需要时复用
ALL_SKILL_PROMPT = "\n\n".join([
    SKILL_INVENTORY_PRICE,
    SKILL_OOS,
    SKILL_QUOTE,
    SKILL_FILL,
    SKILL_CLARIFY,
    SKILL_KNOWLEDGE,
])

# Chat 用：不含报价单专用提取/填表与整单询价填充，体现与 Work 的区分
CHAT_SKILL_PROMPT = "\n\n".join([
    SKILL_INVENTORY_PRICE,
    SKILL_OOS,
    SKILL_EXCEL_CHAT,
    SKILL_CLARIFY,
    SKILL_KNOWLEDGE,
])
