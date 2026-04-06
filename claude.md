# Agent Team version3 — Claude / 协作者速查

本文件刻意**短**：只保留日常开发最常用的事实；细节、变更史与验收说明在 `doc/`、`.trellis/spec/` 与对应源码中。

---

## 启动与入口

| 方式 | 命令 / 说明 |
|------|-------------|
| 一键 | `python start.py` 或 `启动 Jagent.bat`（后端 + 浏览器） |
| 仅 API | `python run_backend.py`（默认 `http://localhost:8000`） |
| CLI Agent | `python cli_agent.py` |
| 企业微信长连接 | `python start_wecom_bot.py`（与后端共用 `Config` / `CoreAgent`） |

前端：`control-ui/`（Vite + Lit），构建 `cd control-ui && npm run build`，产出 `dist/control-ui/`，存在时由 `app.py` 挂到 `/`。

---

## LLM 与关键环境变量

- **主链路**：`PRIMARY_LLM_PROTOCOL` — `openai`（默认，`chat.completions`）或 `anthropic`（MiniMax Anthropic 网关）；密钥与 Base URL 见 `.env` / `backend/config.py`。
- **回退**：`FALLBACK_MODEL` / `FALLBACK_BASE_URL` / `FALLBACK_API_KEY`（默认智谱 `glm-4.5-air`）。
- **上下文摘要**：`SUMMARY_LLM_*`（建议独立 OpenAI 兼容端点）；实现 `backend/core/context_compression.py`。
- **OCR**：智谱 `files/ocr` + `GLM_OCR_MODEL`；勿用 chat vision 冒充 OCR。
- **向量 / 万鼎**：Embeddings 与 chat 分离；`INVENTORY_OPENAI_EMBEDDING_MODEL`、`ENABLE_WANDING_VECTOR` 等见 `config.py`。

更全的变量表与部署清单：`doc/云端部署准备清单.md`、根目录 `README.md`。

---

## 架构（与 version2 对比）

| 项目 | version2 | version3 |
|------|----------|----------|
| 结构 | Master + 子 Agent 委托 | **单 Agent**，工具全集一次暴露 |
| 技能说明 | Master prompt 里写 delegate | **按技能分组**写在 system prompt（`skills.py`） |

- **ReAct 引擎**：`backend/core/agent.py` + `ToolRegistry` + `AgentExtension`。
- **业务插件**：`backend/plugins/jagent/`（`extension.py` 注册工具，`skills.py` 技能与 `OUTPUT_FORMAT`）。
- **对外 Agent**：`backend/agent/agent.py`（`SingleAgent` 薄封装）。

输出格式与 Claude Loop 开关：`USE_CLAUDE_LOOP_PROMPT`；**完整 thinking / tool_call 约   定以 `skills.py` 与 `backend/core/agent_helpers.py` 为准**，不必在本文件重复粘贴。

技能风格双模式：`Config.USE_DECISION_RULE_SKILLS` → `CHAT_SKILL_PROMPT_DOC` vs `CHAT_SKILL_PROMPT_RULES`。

---

## 常用代码路径

```
backend/config.py              # 全局配置
backend/core/agent.py          # ReAct 循环、allowed_tools、上下文裁剪
backend/plugins/jagent/        # 业务工具与技能文案
backend/agent/session.py       # 会话注入与持久化
backend/server/api/            # FastAPI
backend/server/gateway/        # WebSocket /ws（OpenClaw 风格控制台）
backend/wecom_bot/             # 企业微信长连接与文件/OCR
backend/tools/inventory/       # 库存、万鼎匹配、llm_selector、业务知识 MD
backend/tools/quotation/       # Excel、填表、Work 管道相关
backend/tools/oos/             # 无货 / 告警
```

**业务知识（选型注入）**：默认 `backend/tools/data/wanding_business_knowledge.md`，可 `WANDING_BUSINESS_KNOWLEDGE_PATH`；API `GET/PUT /api/business-knowledge`。

**目录树与框架化说明**：`doc/项目结构规整方案.md`、`doc/改造.md`。  
**注入内容总览**：`doc/agent-injected-content.md`。  
**ReAct vs OpenCode**：`doc/ReAct范式对比.md`。

---

## 工具与行为（摘要）

具体工具名、参数与编排细节以 **`backend/plugins/jagent/extension.py` + `skills.py`** 及 OpenAPI/注册表为准。概念上：

1. **库存 / 万鼎**：`search_inventory`、`match_quotation`、`match_wanding_price`、`select_wanding_match`、`get_profit_by_price_batch` 等；`match_quotation` 多候选内置 `llm_select_best`，`match_wanding_price` 多候选常需再调 `select_wanding_match`。
2. **无货**：列表/统计/登记（schema 聚合见 `oos_tools.py`）。
3. **报价 / Excel**：`parse_excel_smart` 等；Work 管道默认非 LLM 选工具（见 `WORK_USE_PIPELINE`）。
4. **澄清**：`ask_clarification`。

**WeCom HTTP 回调**（`wecom_chat_bridge`）可对 `allowed_tools` 限流；**长连接**走 `wecom_bot/handler.py` → `execute_react`（超时、Excel 绑定见该模块与 `Config`）。

**上限类配置**（工具结果长度、context、ReAct 步数、批量条数）：默认值在 `backend/config.py` / `core/agent.py` / 各工具模块，可用环境变量覆盖 — 曾整理的「一览」若需可搜 `TOOL_RESULT_MAX_CHARS`、`CONTEXT_MAX_CHARS`、`REACT_MAX_STEPS`。

---

## API（极简索引）

- `GET /health`
- Chat：`POST /api/query`、`POST /api/query/stream`；WebSocket `/ws`
- Work：`POST /api/work/run`、`/api/work/run-stream`、`/api/work/resume`；run 日志 `GET /api/work/run-logs/{run_id}`
- 报价上传/下载、草稿、无货/缺货、采购/补货、业务知识 — 见 `backend/server/api/routes*.py` 与 `README.md`

---

## 测试

```bash
py -m pytest tests/ -v
# 结构级集成（无 live）：pytest tests/test_integration_agent_react.py -m "not live"
# Core + 智谱（需 Key）：py -3 tests/test_core_glm_query.py
```

---

## 延伸阅读（按需打开）

| 主题 | 文档 |
|------|------|
| 上下文压缩/截断机制与风险 | `doc/待办事宜.md`、代码 `_trim_context` |
| 企业微信 Excel / 告警 | `doc/wecom_excel_逻辑说明.md`、`doc/oos-email-wecom-alerts.md` |
| 确认消息（API / WeCom） | `docs/API_CONFIRMATION_MESSAGE.md` 等 `docs/*CONFIRMATION*` |
| 工具契约与 item_status | `doc/tool-orchestration-and-contract-issues.md` |
| OpenClaw 工作区对齐 | `doc/openclaw/README.md` |
| 万鼎脚本与开盒 skill | `.cursor/skills/wanding-select/SKILL.md`、`scripts/` |
| 项目规范与 Trellis | `.trellis/spec/`、`doc/` |

若某段旧版 `claude.md` 中的「某日修改了某文件」类记录仍需要，已在对应 `doc/` 或提交历史中保留；**以后新增长篇说明请优先写入 `doc/` 或 `.trellis`，此处只加一行链接。**
