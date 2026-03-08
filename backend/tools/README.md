# backend/tools — 领域服务（库存、报价单、无货/缺货）

## Purpose

承载与业务领域相关的逻辑与外部系统调用：库存/万鼎询价、报价单解析与填表、无货/缺货登记与统计。对外作为「服务层」被 plugins 与 api 调用；内部包含 DB、ERP/ACCURATE、邮件等集成。

## Public API（按子模块）

- **inventory**: 库存查询、万鼎匹配与选型、改库存。入口见 `inventory_agent_tools.get_inventory_tools_openai_format()` 及各处 service 函数.
- **quotation**: 报价单提取、填表、from-text、整单流水线。入口见 `quote_tools.get_quote_tools_openai_format()`、`flow_orchestrator`、`text_to_inquiry` 等.
- **oos**: 无货/缺货 CRUD、邮件、DataService（SQLite/Postgres）。入口见 `data_service.DataService`、`email_service`，配置见 `oos/config.py`.

## Dependencies

- **inventory**: AOL/ACCURATE API、价格库与映射表路径（Config）、OpenAI 用于选型与摘要.
- **quotation**: Excel 解析与写入、Config 中的模板与上传路径、inventory 与 oos 用于匹配与无货登记.
- **oos**: SQLAlchemy、DATABASE_URL 或本地 SQLite、邮件配置（Gmail/SMTP）.

## Example usage

- Plugins 通过 `backend.agent.tools` 或直接 import 本层函数注册为 Agent 工具 handler.
- API 层（如 routes）直接调用 DataService、报价单 from-text、补货预览等.

## How it interacts with the agent system

- JAgentExtension 在 register 时注册的工具，其 handler 内部调用本层（如 `_run_oos_list`、inventory_agent_tools、quote_tools）.
- 不反向依赖 agent 或 core；仅被 plugins 与 server/api 调用.
