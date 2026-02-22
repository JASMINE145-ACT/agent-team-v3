# 工具选用说明（与 Agent Team version3 对齐）

供 OpenClaw 基于本仓库配置时，与后端工具选用逻辑一致。后端工具定义在 `backend/agent/tools.py` 与 `backend/tools/inventory/services/inventory_agent_tools.py`。

---

## 1. 库存与询价/价格

- **match_quotation(keywords, customer_level?)**  
  询价/查 code/查物料编号时**优先用本工具**。同时查报价历史与万鼎字段匹配，结果取并集，每条带 source（历史报价/字段匹配/共同）。  
  仅当用户明确说「用万鼎查」「不要历史」「直接万鼎」时改用 match_wanding_price。

- **match_wanding_price(keywords, customer_level?)**  
  万鼎字段匹配。用户明确「用万鼎查/不要历史」时只调本工具；或历史无命中时再调。

- **select_wanding_match(keywords, candidates)**  
  needs_selection 且用户要「选一个」时调用；须传入上步 observation 的 match_source。

- **search_inventory(keywords)**  
  按产品名/规格搜库存，更适配英文关键词。

- **get_inventory_by_code(code)**  
  已知 10 位物料编号时直接查库存。

- **全部价格 / 各档价格**  
  必须对**同一 keywords** 分别调用 **4 次** match_wanding_price：customer_level 依次 A、B、C、D，汇总成「客户级别 | 客户价」表。只调一次只会得到默认 B 档。

- **展示**  
  结果表上方必写「匹配来源：」+ match_source；候选含 source 时表格加「来源」列；有 chosen 时标「已选：第 N 条」。

---

## 2. 无货

- **get_oos_list(limit?)**  
  无货产品列表。用户问「无货列表」「无货有哪些」「被报无货几次」时用。

- **get_oos_stats()**  
  无货统计（总记录数、无货产品数、今日新增、被报≥2 次、已发邮件数）。

- **get_oos_by_file(limit?)** / **get_oos_by_time(last_n_days?)**  
  按文件、按时间统计无货。

- **无货登记两种途径（二选一）**  
  - **register_oos(file_path, prompt?)**：用户说「无货登记」且 context 已有 file_path 时用。  
  - **register_oos_from_text(product_name, specification?, quantity?, unit?)**：用户**直接说**「XX 无货」「报一下 XX 无货」等、且无文件时用，勿提示先上传。

---

## 3. 报价单

- **extract_quotation_data(file_path, sheet_name?)**  
  从报价单提取第 2 行到「Total Excluding PPN」上一行。需 context 有 file_path。

- **fill_quotation_sheet(file_path, fill_items, ...)**  
  将匹配结果按行回填报价单。

- **parse_excel_smart(file_path, sheet_name?, max_rows?)** / **edit_excel(file_path, edits, ...)**  
  普适 Excel 解析与编辑。

- **何时用**  
  用户要「提取报价数据」「看报价单」「填表」「解析/编辑这个 Excel」且 context 有 file_path 时用；**整单询价填充**用 run_quotation_fill。

---

## 4. 询价填充（整单）

- **run_quotation_fill(file_path, customer_level?)**  
  仅当用户明确说「询价填充」「填充报价单」「完整报价」且 context 有 file_path 时调用。customer_level 默认 B。

---

## 5. 澄清

- **ask_clarification(questions, reasoning?)**  
  用户只说「查XX」「帮我查」等**未指明**是查库存还是查价格/报价时**必须**先澄清，例如：「您是想查库存数量，还是查万鼎报价/各档位价格？或两者都要？」  
  只有用户已明确提到「库存」「可售」「价格」「报价」「万鼎」「档位」等之一时，才可直接选库存类或价格类工具。

---

## 6. 业务知识

- **append_business_knowledge(content)**  
  用户要求「记录到知识库」「记在 knowledge」「润色后记下来」等时**必须**调用。content 为润色后的完整一条知识（可多句）。

---

## 多轮指代

- 用户说「选哪个」「帮我选一个」→ 必须调用 **select_wanding_match**（keywords 用上一轮询价关键词，candidates 从上一轮 observation 取）。
- 用户说「那个产品」「查这个的库存」→ 用上一轮表格里的**完整产品名或编号**再查，勿用本句简称或错字。
