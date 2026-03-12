1. 库存 / 报价 / 万鼎价格库（Chat 仍在用）
这些函数型工具都在 `inventory_agent_tools` 里，对应 `SKILL_INVENTORY_PRICE`：

- `search_inventory(keywords)`：英文产品名/规格 → 查库存（Resolver + ACCURATE）。**仅英文询价用**；中文「50三通库存」要走 `match_quotation` + `get_inventory_by_code`。
- `get_inventory_by_code(code)`：已知 10 位物料编号 → 直接查库存。入参 `code: string`，返回 `{success, result: string}`（SQL Agent 生成的表格）。
- `match_quotation(keywords, customer_level?)`：询价/查价/查 code；历史映射表 + 万鼎字段匹配并集，返回统一结构 `{ single | needs_selection | unmatched, candidates[], chosen?, match_source }`。中文询价（「直接50」「完整产品名」）**优先用此工具**。
- `match_by_quotation_history(keywords, customer_level?)`：只走历史映射表 → 万鼎查价，作为 `match_quotation` 的**高级用法**，仅当用户明确「只看历史」时使用。
- `match_wanding_price(keywords, customer_level?)`：只走万鼎字段匹配，不用历史映射表，作为**只看万鼎**场景的高级用法。
- `select_wanding_match(keywords, candidates, match_source?)`：对上一步 `needs_selection` 的候选，用 LLM 选 1 个；`candidates` 必须直接来自上一轮 `match_*` 的 observation。
- `modify_inventory(code, action, quantity, memo?)`：改库存：`lock`（锁定可售）、`supplement`（增补/归零）。**写库操作**，仅在用户明确说「锁库存/增补/归零」时调用，默认不自动使用。
- `get_profit_by_price(code?, product_name?, price)`：根据「编号 or 完整名称 + 成交价」在万鼎价格库里锁定行和档位，算出对应利润率，同时返回所有档位的价格/利润率。至少提供 `code` 或 `product_name` 之一，返回 `data.rows[]`，每行含 `code, name, matched_price_level, matched_price, matched_profit, all_levels[]`。

2. Excel（普适，Chat 用）

- `parse_excel_smart(file_path, sheet_name?, max_rows?)`：解析任意 Excel → Markdown 表。

> 注：`edit_excel` 以及无货相关工具（`get_oos_list` / `get_oos_stats` / `get_oos_by_file` / `get_oos_by_time` / `register_oos*`）只在 Neon Skill / 后端 API 侧使用，**Chat 侧视为弃用**；整单报价填充（`run_quotation_fill` 等）只在 Work 模式提供，不注入 Chat。

3. 澄清 / 业务知识

- `ask_clarification(questions, reasoning?)`：意图不清晰时先问清是要「库存」「价格」「利润率」还是其它。
- `append_business_knowledge(content)`：把某条规则/纠正「记到知识库」里，供以后的匹配/选型使用。

建议：价格类问题优先用 `match_quotation` + `get_profit_by_price`，库存类问题优先用 `match_quotation` + `get_inventory_by_code`。