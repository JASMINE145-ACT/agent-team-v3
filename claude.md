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

前端：`control-ui/`（Vite + Lit + TypeScript），构建 `cd control-ui && npm run build`，产出 `dist/control-ui/`，存在时由 `app.py` 挂到 `/`。

---

## 架构（与 version2 对比）

| 项目 | version2 | version3 |
|------|----------|----------|
| 结构 | Master + 子 Agent 委托 | **单 Agent**，工具全集一次暴露 |
| 技能说明 | Master prompt 里写 delegate | **按技能分组**写在 system prompt（`skills.py`） |

- **ReAct 引擎**：`backend/core/agent.py` + `ToolRegistry` + `AgentExtension`
- **业务插件**：`backend/plugins/jagent/`（`extension.py` 注册工具，`skills.py` 技能与 `OUTPUT_FORMAT`）
- **对外 Agent**：`backend/agent/agent.py`（`SingleAgent` 薄封装）
- **输出格式开关**：`USE_CLAUDE_LOOP_PROMPT` → Loop 四段式 / Legacy 极简
- **技能风格开关**：`USE_DECISION_RULE_SKILLS` → RULES 版（IF/THEN 强约束）/ DOC 版（说明文档式）

---

## 技能体系（skills.py）

六类技能，`skills.py` 同时提供 `*_DOC` 和 `*_RULES` 双版本。Chat 和 Work 注入的技能不同：

| 技能 | Chat 注入 | Work 注入 | 核心工具 |
|------|-----------|-----------|----------|
| 库存/价格 | ✅ | ✅ | `match_quotation`、`get_inventory_by_code`、`get_inventory_by_code_batch`、`search_inventory`、`get_profit_by_price`、`get_profit_by_price_batch` |
| 无货 | ✅ | ✅ | `get_oos_list`、`get_oos_stats`、`get_oos_by_file`、`get_oos_by_time`、`register_oos`、`register_oos_from_text` |
| Excel（普适） | ✅ | ✅ | `parse_excel_smart`、`edit_excel` |
| 报价单流水线 | — | ✅ | `fill_quotation_sheet`、`run_quotation_fill` |
| 澄清 | ✅ | ✅ | `ask_clarification` |
| 业务知识 | ✅ | ✅ | `append_business_knowledge`（含纠错学习流程） |

### 关键路由规则（库存/价格）

```
中文产品名 + 查库存  →  match_quotation → get_inventory_by_code（3步链）
英文产品名 + 查库存  →  search_inventory（直接）
已知 10位code        →  get_inventory_by_code（直接）
查价格（任意语言）   →  match_quotation（直接）
≥2 产品同询问        →  match_quotation_batch（批量，禁止循环单次）
```

**批量上限**：`match_quotation_batch` ≤20 条/次；`get_inventory_by_code_batch` ≤50 条/次；`get_profit_by_price_batch` ≤50 条/次。

**关键词保护**：中文管件名（直接、弯头、三通、法兰等）必须原样保留在 `keywords`，禁止简化。例如「直接dn50」→ `keywords="直接dn50"`。

---

## 硬约束（GLOBAL_HARD_CONSTRAINTS）

```
- Excel Qty/数量 列 ≠ 库存；库存只能来自 inventory 工具
- 禁止捏造产品编号、价格、库存数量
- 产品编号不得输出为「—」（若 JSON 中有值，必须如实填入）
```

---

## 扩展钩子（AgentExtension）

| 钩子 | 作用 |
|------|------|
| `on_before_prompt` | 英文输入时注入「全英文回答」策略 |
| `on_after_tool` | 拦截 `match_quotation`/`match_quotation_batch`：推送 SSE 卡片 + 返回紧凑摘要给 LLM |
| `get_skill_prompt` | 返回当前技能版本（DOC 或 RULES） |
| `get_output_format_prompt` | 返回 Loop 或 Legacy 输出格式 |

---

## 常用代码路径

```
backend/config.py              # 全局配置（LLM、数据库、WeCom、档位映射等）
backend/core/agent.py          # ReAct 循环、超时 fallback、步数上限、context 裁剪
backend/plugins/jagent/        # 技能定义（skills.py）、工具注册（extension.py）
backend/agent/session.py       # 会话注入与持久化
backend/server/api/            # FastAPI 路由（routes*.py）
backend/server/gateway/        # WebSocket /ws（OpenClaw 风格控制台）
backend/wecom_bot/             # 企业微信长连接与文件/OCR
backend/tools/inventory/       # 库存/万鼎匹配/llm_selector/业务知识 MD
backend/tools/quotation/       # Excel 解析/填表/Work 管道
backend/tools/oos/            # 无货 / 告警
```

业务知识（选型注入）：默认 `backend/tools/data/wanding_business_knowledge.md`，可 `WANDING_BUSINESS_KNOWLEDGE_PATH`；API `GET/PUT /api/business-knowledge`。

---

## LLM 与关键环境变量

| 变量 | 说明 |
|------|------|
| `PRIMARY_LLM_PROTOCOL` | `openai`（默认）或 `anthropic`（MiniMax Anthropic 网关） |
| `FALLBACK_MODEL` / `FALLBACK_BASE_URL` / `FALLBACK_API_KEY` | 回退链路（默认智谱 `glm-4.5-air`） |
| `SUMMARY_LLM_*` | 上下文摘要（建议独立 OpenAI 兼容端点） |
| `GLM_OCR_MODEL` | OCR 模型 |
| `USE_CLAUDE_LOOP_PROMPT` | True → Loop 四段式输出；False → Legacy 极简 |
| `USE_DECISION_RULE_SKILLS` | True → RULES 版技能（IF/THEN）；False → DOC 版 |
| `INVENTORY_MODIFY_ENABLED` | 1 → 库存修改真实写入 Accurate |

更全变量表与部署清单：`doc/云端部署准备清单.md`、根目录 `README.md`。

---

## API（极简索引）

| 分类 | 路由 |
|------|------|
| 健康 | `GET /health` |
| Chat | `POST /api/query`、`POST /api/query/stream`；WebSocket `/ws` |
| Work | `POST /api/work/run`、`/api/work/run-stream`、`/api/work/resume`；日志 `GET /api/work/run-logs/{run_id}` |
| 报价上传/下载 | `POST /api/quotation/upload` 等，见 `routes_quotation.py` |
| 无货/缺货 | `GET/POST /api/oos/*`，见 `routes_oos.py` |
| 业务知识 | `GET/PUT /api/business-knowledge` |
| 管理面板 | `routes_admin.py`（价格库/产品映射表，需 `X-Admin-Token`） |

---

## WeCom 集成

- **HTTP 回调**：通过 `wecom_chat_bridge` 接收消息，可对 `allowed_tools` 限流
- **长连接**：`start_wecom_bot.py` → `wecom_bot/handler.py` → `execute_react`
- **告警**：缺货/无货 → `dispatch_out_of_stock_alert()` / `dispatch_shortage_alert()`，按模式发邮件/企微

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
| 确认消息（API / WeCom） | `docs/API_CONFIRMATION_MESSAGE.md` 等 |
| 工具契约与 item_status | `doc/tool-orchestration-and-contract-issues.md` |
| OpenClaw 工作区对齐 | `doc/openclaw/README.md` |
| 万鼎脚本与开盒 skill | `.cursor/skills/wanding-select/SKILL.md`、`scripts/` |
| 项目规范与 Trellis | `.trellis/spec/`、`doc/` |
| 输出格式详细约定 | `backend/plugins/jagent/skills.py`（`_OUTPUT_FORMAT_LOOP_BODY` / `_OUTPUT_FORMAT_LEGACY_INTRO`） |

若某段旧版 `claude.md` 中的「某日修改了某文件」类记录仍需要，已在对应 `doc/` 或提交历史中保留；**以后新增长篇说明请优先写入 `doc/` 或 `.trellis`，此处只加一行链接。**
