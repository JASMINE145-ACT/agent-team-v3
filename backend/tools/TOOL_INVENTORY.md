# 统一工具层 — 工具清单（首批）

本文档列出 Agent Team v3 中首批纳入统一工具层封装的业务能力，及其当前调用位置与协议。

## 1. 库存查询（inventory_lookup）

| 项目 | 说明 |
|------|------|
| 业务能力 | 按物料编码/关键词查库存、万鼎匹配、利润与可售数量 |
| 调用协议 | 内部服务：`AccurateOnlineAPIClient`（HTTP GET）、SQLAgent、Resolver、TableAgent |
| 当前位置 | `backend/tools/inventory/lib/api/client.py`（requests），`backend/tools/inventory/services/inventory_agent_tools.py`（execute_inventory_tool） |
| 入参 | 多种：search_inventory / get_inventory_by_code / match_quotation 等 |
| 出参 | 结构化列表 + 文本展示 |
| 幂等性 | 是（只读） |
| 延迟要求 | 中等（建议 timeout 15–30s） |

## 2. 行情告警 CRUD（alert_create / alert_list / alert_delete）

| 项目 | 说明 |
|------|------|
| 业务能力 | 调用 Go 行情告警服务（ontime-detector-alert）的 /alerts 创建、列表、删除 |
| 调用协议 | HTTP REST（POST/GET/DELETE） |
| 当前位置 | 暂无；计划在 `backend/tools/alert_tool.py` 封装 |
| 入参 | symbol, direction, threshold, user_id, cooldown_seconds 等 |
| 出参 | Alert JSON 或列表 |
| 幂等性 | 创建非幂等；列表/删除幂等 |
| 延迟要求 | 低（建议 timeout 5–10s） |

## 3. 无货登记（oos_register / oos_register_from_text）

| 项目 | 说明 |
|------|------|
| 业务能力 | 从报价单解析无货行落库，或从用户文字解析后落库（Neon/Postgres 或 SQLite） |
| 调用协议 | 内部：DataService（SQLAlchemy）、run_quotation_agent、persist_out_of_stock_records |
| 当前位置 | `backend/agent/tools_oos.py`（_run_register_oos、_run_register_oos_from_text），`backend/tools/oos/services/data_service.py`、`quotation_agent_tool.persist_out_of_stock_records` |
| 入参 | file_path + context + prompt，或 product_name + specification + quantity + unit |
| 出参 | success + result 文本 |
| 幂等性 | 登记为追加，非幂等 |
| 延迟要求 | 中等（含 LLM 解析时较高） |

## 4. 后续可纳入

- **erp_sync**：ERP/订单相关 API（当前代码库中未发现统一 HTTP 客户端，待有接口后再封装）。
- **缺货落库与提醒**：`work_tools._persist_shortage_records_and_alerts` 调用的 DataService.insert_shortage_records + `alert_dispatch.dispatch_shortage_alert`（邮件/企业微信群，见 `OOS_ALERT_MODE`），可单独封装为 shortage_persist 工具。
