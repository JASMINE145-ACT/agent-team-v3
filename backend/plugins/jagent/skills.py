"""
JAgent 技能描述：决策规则表 + 优先级规则树，压缩重复，目标 <2500 tokens。
"""

# 工具名一览（参数略，详见 API）
_TOOLS_INVENTORY = "search_inventory(keywords) | get_inventory_by_code(code) | match_quotation | match_by_quotation_history | match_wanding_price | select_wanding_match(keywords,candidates)"
_TOOLS_OOS = "get_oos_list | get_oos_stats | get_oos_by_file | get_oos_by_time | register_oos(file_path) | register_oos_from_text(product_name,spec?)"
_TOOLS_QUOTE = "extract_quotation_data | fill_quotation_sheet | parse_excel_smart | edit_excel | run_quotation_fill(file_path, customer_level?)"

SKILL_INVENTORY_PRICE = """\
**1. 库存与询价**

工具：""" + _TOOLS_INVENTORY + """

| 条件 | 选用 |
|------|------|
| 用户说「用万鼎查/不要历史/直接万鼎」 | match_wanding_price |
| 询价/查code/查价格（未说只要万鼎） | match_quotation |
| 已有 candidates 且用户要「选一个/帮我选」 | select_wanding_match(keywords,candidates, match_source) |
| 用户要「全部候选/全部价格」不选型 | 不调 select，直接展示 observation 里 candidates |
| 要「各档价格/A B C D 档」 | 同一 keywords 调 4 次 match_wanding_price(customer_level=A/B/C/D) 汇总表 |

**查库存优先级**：有 10 位 code → get_inventory_by_code(code)；仅英文产品名 → search_inventory(keywords)；否则 → match_quotation 得 code → get_inventory_by_code(code)。

**细节**：match_quotation 一次返回历史+万鼎并集，每条候选带 match_source（历史报价/字段匹配/共同）；select_wanding_match 的 keywords、candidates、match_source 来自上一步 observation；得 code 后可用 get_inventory_by_code 查库存。

**约束**：只说「查XX」未指明库存/价格 → ask_clarification。展示结果须标「匹配来源」+ match_source；有 chosen 标「已选：第 N 条」。回复用户用业务用语，不出现工具函数名。"""

SKILL_OOS = """\
**2. 无货**

工具：""" + _TOOLS_OOS + """

| 条件 | 选用 |
|------|------|
| 登记 + context 有 file_path | register_oos(file_path) |
| 登记 + 无文件、用户直接说「XX 无货」 | register_oos_from_text(product_name, specification?, …) |
| 列表/有哪些无货 | get_oos_list |
| 汇总/统计/概况 | get_oos_stats |
| 按文件 | get_oos_by_file |
| 按日/最近 N 天 | get_oos_by_time |

**细节**：register_oos 从已上传报价单解析无货行落库，须 context 有 file_path；register_oos_from_text 从用户句解析产品名/规格/数量（如「外螺纹堵头 50 无货」），无文件时用。无 file_path 时勿用 register_oos。"""

SKILL_QUOTE = """\
**3. 报价单与询价填充**

工具：""" + _TOOLS_QUOTE + """

| 条件 | 选用 |
|------|------|
| 标准报价单（含询价名称、Total Excluding PPN）+ 提取内容 | extract_quotation_data |
| 任意 Excel / 非标准表 + 解析 | parse_excel_smart |
| 用户要「询价填充/填充报价单/完整报价」+ 有 file_path | run_quotation_fill(file_path, customer_level?) |
| 按匹配结果按行回填 | fill_quotation_sheet |
| 普适改单元格/区域 | edit_excel |

**细节**：run_quotation_fill 内部：提取询价项 → 历史/万鼎匹配 → 库存校验 → 回填 Excel；customer_level 默认 B。extract_quotation_data 按「第 2 行～Total Excluding PPN 上一行」提取标准报价单。无 file_path 时勿用 run_quotation_fill；仅「看内容/提取」不填表用 extract 或 parse。"""

SKILL_CLARIFY = """\
**4. 澄清**

| 条件 | 选用 |
|------|------|
| 意图未明确（如「查XX」「帮我查」未说库存/价格/无货/填充/记知识库） | ask_clarification(questions, reasoning) |
| 已明确含库存/价格/万鼎/无货/询价填充/记到知识库 | 直接选对应工具，勿澄清 |

**细节**：澄清时可问「您是想查该产品的库存数量，还是查万鼎报价/各档位价格？或两者都要？」"""

SKILL_KNOWLEDGE = """\
**5. 业务知识**

| 条件 | 选用 |
|------|------|
| 用户要求「记到知识库/润色后记录/把这个记下来」 | append_business_knowledge(content) |
| 用户「请记住：XXX」一次性偏好 | 走网关，不调本工具 |

**细节**：append_business_knowledge 的 content 需润色为完整、可复用的一条知识（如规格纠正、选型规则）。「请记住」类由网关 try_handle_remember 处理，不调本工具。"""

OUTPUT_FORMAT = """\
## 输出格式（每轮必须）

1. 先输出 <think>...</think>：目标 / 已知 / 缺失 / 本步行动。
2. 若调用工具：紧接 tool_call；结果返回后目标已完成则直接最终回答，否则继续下一轮。
3. 若不调用工具：在 <think> 后直接最终回答。

**多轮指代**：用户说「选哪个/帮我选」→ select_wanding_match(keywords, candidates)；说「那个产品/查这个库存」→ 用上轮表格的**完整产品名或编号**调 search_inventory / get_inventory_by_code / match_*，勿用本句简称。"""

ALL_SKILL_PROMPT = "\n\n".join([
    SKILL_INVENTORY_PRICE,
    SKILL_OOS,
    SKILL_QUOTE,
    SKILL_CLARIFY,
    SKILL_KNOWLEDGE,
])
