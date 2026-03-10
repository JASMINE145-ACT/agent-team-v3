# Neon 业务 Skill 与后端/表映射（梳理结果）

供 Cursor 四大 Skill 与文档对齐使用。所有写入均通过既有 DataService / 路由完成，目标为 Neon（DATABASE_URL 配置时）或本地 SQLite。

| Skill | 后端模块/入口 | Neon/SQLite 表 |
|-------|----------------|-----------------|
| inventory-price-query | inventory_agent（opencode_agent/data_platform）+ wanding_fuzzy_matcher | 只读 ACCURATE + 价格库，不写 Neon |
| oos-shortage-register | routes_oos（POST /api/oos/add、POST /api/shortage/add）、quotation_agent_tool.persist_out_of_stock_records、DataService.insert_record / insert_shortage_records、oos_repository.insert_oos_record | out_of_stock_records、shortage_records；oos_repository 写 oos_records（Supabase/Neon 镜像） |
| quotation-register-from-dialog | routes_quotation（POST /api/quotation-drafts）、DataService.insert_quotation_draft | quotation_drafts、quotation_draft_lines |
| replenishment-register | routes_quotation（POST /api/replenishment-drafts；补货 API 实现在 routes_quotation，非 routes_procurement）、preview_replenishment_lines、DataService.insert_replenishment_draft | replenishment_drafts、replenishment_draft_lines |

## 关键函数与 API

- **无货**：`persist_out_of_stock_records(file_name, records, sheet_name="", file_path="")` → DataService.insert_record + oos_repository.insert_oos_record；或 POST /api/oos/add Body `{ product_name, specification?, quantity?, unit? }`。
- **缺货**：`DataService.insert_shortage_records(file_name, shortage_items, max_rows, file_path)`；或 POST /api/shortage/add Body `{ product_name, specification?, quantity?, available_qty?, ... }`。
- **报价草稿**：POST /api/quotation-drafts Body `{ name, source?, file_path?, lines: [{ product_name, specification, qty, code, ... }] }` → DataService.insert_quotation_draft。
- **补货草稿**：POST /api/replenishment-drafts Body `{ lines: [{ product_or_code, quantity }], name? }` → preview_replenishment_lines 后 DataService.insert_replenishment_draft。
