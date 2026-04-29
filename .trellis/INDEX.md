# Agent Team version3 — 项目总索引

> 一个文件找到所有东西：启动方式、脚本、spec、数据文件、导航。  
> 更新原则：改了文件/脚本就来这里同步一行。

---

## 快速启动

| 场景 | 命令 |
|------|------|
| **本地完整启动**（前后端 + 浏览器） | `python start.py` |
| **只启动后端 API** | `python run_backend.py` |
| **企业微信 Bot** | `python start_wecom_bot.py` |
| **Vercel 部署入口** | `index.py`（Vercel Serverless，不手动运行） |
| **跑单元/集成测试** | `py -m pytest tests/ -k "not live" -q` |

环境变量：见 `.env`（本地）/ `spec/backend/config-reference.md`（完整说明）

---

## Spec 文档

### 后端

| 文件 | 内容摘要 |
|------|---------|
| `spec/backend/index.md` | 后端全局入口：PRIMARY_LLM_PROTOCOL、match_quotation 选型链路、Rework 机制、会话持久化 |
| `spec/backend/llm-selector-architecture.md` | **LLM 选型架构**：规则归编码（`_apply_candidate_pre_filter`）、判断归 LLM（wanding_business_knowledge.md），含 9 类打分规则全表 |
| `spec/backend/memory-context.md` | Session 上下文注入机制：7 步注入流程、自动摘要、tool_memory/card_refs 写入 |
| `spec/backend/tools-catalog.md` | 所有工具清单（match_quotation、get_inventory、fill_quotation_sheet 等），含 schema 和返回格式 |
| `spec/backend/core-react-loop.md` | CoreAgent ReAct 循环实现细节 |
| `spec/backend/skills-system.md` | Skills 系统（skills.py）与 wanding_business_knowledge.md 关系 |
| `spec/backend/api-routes.md` | FastAPI 路由总表（routes_admin / routes_work / routes_procurement 等） |
| `spec/backend/config-reference.md` | 所有环境变量说明与默认值 |
| `spec/backend/database-guidelines.md` | Neon Postgres + SQLite fallback，表结构与迁移规范 |
| `spec/backend/directory-structure.md` | 后端目录结构与职责划分 |
| `spec/backend/error-handling.md` | 错误处理规范 |
| `spec/backend/logging-guidelines.md` | 日志规范 |
| `spec/backend/quality-guidelines.md` | 代码质量标准 |
| `spec/backend/quotation-inventory-flow.md` | 报价单→库存查询端到端流程 |
| `spec/backend/work-pipeline-core.md` | Work 执行生命周期 |
| `spec/backend/oos-shortage-lifecycle.md` | 无货/短缺登记生命周期 |
| `spec/backend/reports-system.md` | 报表系统（含 Phase-2 daemon 修复记录） |
| `spec/backend/weekly-report-history-gap.md` | 周报历史数据补全问题 |

### 前端

| 文件 | 内容摘要 |
|------|---------|
| `spec/frontend/index.md` | 前端全局入口：Lit Web Components、GatewayBrowserClient、Controller 模式 |
| `spec/frontend/overview.md` | 前端架构概览 |
| `spec/frontend/pages.md` | 16 个 Tab/页面路由 |
| `spec/frontend/component-guidelines.md` | Lit 组件开发规范 |
| `spec/frontend/core-interaction-flow.md` | 核心交互流程（消息发送→流式响应→渲染） |
| `spec/frontend/directory-structure.md` | 前端目录结构 |
| `spec/frontend/i18n-guidelines.md` | 国际化规范 |
| `spec/frontend/type-safety.md` | TypeScript 类型安全规范 |
| `spec/frontend/testing-guidelines.md` | 前端测试规范 |
| `spec/frontend/thinking-display-config.md` | reasoningLevel 渲染与 Thinking 显示配置 |

### 通用指南

| 文件 | 内容摘要 |
|------|---------|
| `spec/tech-framework-guidelines.md` | 技术框架基线（技术选型约束） |
| `spec/guides/cross-layer-thinking-guide.md` | 跨层思考指南（前后端联动设计） |
| `spec/guides/code-reuse-thinking-guide.md` | 代码复用思考指南 |
| `spec/agent-fast-path.md` | Agent 快速入手路径（任务导向） |
| `spec/agent-onboarding-checklist.md` | Agent 接手项目检查清单 |
| `spec/role-based-reading-paths.md` | 按角色的阅读计划（开发 / 设计 / 维护） |
| `spec/time-budget-reading.md` | 按时间预算的阅读指南（5min / 30min / 1h） |
| `spec/secondary-modules-quick-reference.md` | 次要模块速查 |
| `spec/index.md` | Spec 主目录（文件级索引） |

---

## 项目脚本（`scripts/`）

### 匹配/选型测试

| 脚本 | 用途 |
|------|------|
| `scripts/test_wanding_select.py` | 名称→候选 list 匹配测试（不校验价格） |
| `scripts/run_one_wanding_test.py` | 跑单条万鼎选型测试 |
| `scripts/run_3test_wanding.py` | 跑 3 条万鼎选型批量测试 |
| `scripts/run_5test_wanding.py` | 跑 5 条万鼎选型批量测试 |
| `scripts/run_skill_lookup_5test.py` | 用 skill lookup 方式跑 5 条测试 |
| `scripts/run_skill_lookup_batch.py` | skill lookup 批量查询，输出 JSON |
| `scripts/run_skill_batch_to_log.py` | 读 batch JSON，两工具选型，写入 log |
| `scripts/run_cursor_selections_to_log.py` | 从 batch_5test.json 读候选，按业务规则选型写 log |
| `scripts/get_wanding_candidates.py` | 输出候选 JSON，供 Cursor 模型手工选型 |

### 价格库维护

| 脚本 | 用途 |
|------|------|
| `scripts/build_wanding_standard_price_library.py` | 从原始 Excel 生成标准格式价格库（保留 LESSO管材、国标管件两 sheet） |
| `scripts/upload_price_library_to_neon.py` | 上传价格库到 Neon Postgres |
| `scripts/check_wanding_library.py` | 检查价格库完整性 |
| `scripts/append_wanding_log.py` | 手工追加选型日志（供 Cursor Skill 调用） |

### 调试/验证

| 脚本 | 用途 |
|------|------|
| `scripts/test_glm_ocr_trigger.py` | 验证 GLM OCR 配置是否生效 |
| `scripts/smoke_glm_vision_ocr.py` | GLM Vision OCR 冒烟测试 |
| `scripts/test_mapping_tool.py` | 映射表工具测试 |
| `scripts/test_modify_inventory_llm.py` | LLM 驱动库存修改测试 |
| `scripts/check_trellis.py` | Trellis 配置检查 |

---

## Trellis 脚本（`.trellis/scripts/`）

| 脚本 | 用途 |
|------|------|
| `scripts/task.py` | Task 管理（创建、更新、查询） |
| `scripts/get_context.py` | 获取当前项目上下文 |
| `scripts/get_developer.py` | 获取开发者信息 |
| `scripts/init_developer.py` | 初始化开发者配置 |
| `scripts/create_bootstrap.py` | 创建 Bootstrap 上下文 |
| `scripts/add_session.py` | 添加会话记录 |
| `scripts/multi_agent/start.py` | 启动多 Agent 任务 |
| `scripts/multi_agent/status.py` | 查看多 Agent 任务状态 |
| `scripts/multi_agent/plan.py` | 多 Agent 任务规划 |
| `scripts/multi_agent/create_pr.py` | 多 Agent 创建 PR |
| `scripts/multi_agent/cleanup.py` | 清理多 Agent worktree |

---

## 关键数据文件

| 文件 | 说明 |
|------|------|
| `backend/tools/data/wanding_business_knowledge.md` | LLM 选型知识库（语义判断规则，≤70 行）；确定性规则在代码层，见 `spec/backend/llm-selector-architecture.md` |
| `backend/tools/data/wanding_standard_price_library.xlsx` | 万鼎标准价格库（含管材、国标管件 sheet） |
| `data/sessions/` | 本地会话存储（FileBackend 模式） |
| `.env` | 本地环境变量（不提交） |
| `requirements.txt` | Python 依赖 |

---

## 概念快查

> 知道要找什么概念但不知道看哪个文件时用这里。

### 核心架构

| 概念 | 文件 |
|------|------|
| 整体后端架构 / 项目入口 | `spec/backend/index.md` · `spec/tech-framework-guidelines.md` |
| ReAct 循环 / CoreAgent | `spec/backend/index.md` · `spec/backend/core-react-loop.md` · `workflow.md` |
| 单 Agent vs 多 Agent | `claude.md`（架构章节） |
| Skills 系统（skills.py） | `spec/backend/skills-system.md` · `claude.md` |
| 工具注册（AgentExtension / Extension 钩子） | `spec/backend/tools-catalog.md` · `spec/backend/directory-structure.md` |
| Session 持久化 | `spec/backend/memory-context.md` · `spec/backend/database-guidelines.md` |

### LLM / 模型路由

| 概念 | 文件 |
|------|------|
| PRIMARY_LLM_PROTOCOL（openai vs anthropic） | `spec/backend/index.md` · `claude.md` |
| Anthropic Messages API 路由 | `spec/backend/index.md`（1211 fix 章节） |
| 降级链（GLM-4.5-air fallback） | `spec/backend/config-reference.md` · `claude.md` |
| GLM / MiniMax thinking 模型 | `claude.md` · `doc/待办事宜.md` |
| Token budget / max_tokens | `spec/backend/config-reference.md` |

### 业务逻辑

| 概念 | 文件 |
|------|------|
| match_quotation 选型链路（万鼎） | `spec/backend/index.md` · `spec/backend/skills-system.md` |
| 为什么选了错误的产品 / 选型架构 | `spec/backend/llm-selector-architecture.md` |
| 新增业务规则：加代码还是加 md | `spec/backend/llm-selector-architecture.md` 第 7 节 |
| get_inventory_by_code（库存查询） | `spec/backend/tools-catalog.md` · `claude.md` |
| 无货 / OOS 登记 | `spec/backend/tools-catalog.md` · `spec/backend/oos-shortage-lifecycle.md` |
| 报价单填充流水线（Work） | `spec/backend/work-pipeline-core.md` · `spec/backend/tools-catalog.md` |
| 业务知识文件（wanding_business_knowledge.md） | `spec/backend/llm-selector-architecture.md` · `spec/backend/skills-system.md` |
| Rework / 纠错机制 | `spec/backend/index.md`（Rework 章节） · `workflow.md` |
| 报价单→库存端到端流程 | `spec/backend/quotation-inventory-flow.md` |
| 所有工具参数格式 | `spec/backend/tools-catalog.md` |

### 会话上下文 & 存储

| 概念 | 文件 |
|------|------|
| 会话上下文注入（7步流程） | `spec/backend/memory-context.md` |
| Neon Postgres（OOS/Shortage） | `spec/backend/database-guidelines.md` · `README.md` |
| SQLite fallback | `spec/backend/database-guidelines.md` |
| Session store（data/sessions/） | `spec/backend/memory-context.md` · `README.md` |
| 数据库表结构 | `spec/backend/database-guidelines.md` |
| 环境变量配置 | `spec/backend/config-reference.md` |
| 业务文件（价格库/映射表）位置 | `README.md` · `claude.md` |

### 前端 / UI

| 概念 | 文件 |
|------|------|
| Lit Web Components 规范 | `spec/frontend/index.md` · `spec/frontend/component-guidelines.md` |
| 前端核心交互流程（消息→流式→渲染） | `spec/frontend/core-interaction-flow.md` |
| 16 个 Tab / 页面路由 | `spec/frontend/pages.md` |
| GatewayBrowserClient（WebSocket） | `spec/frontend/index.md` |
| Controller 模式 | `spec/frontend/index.md` |
| i18n 国际化 | `spec/frontend/i18n-guidelines.md` |
| TypeScript 类型安全 | `spec/frontend/type-safety.md` |

### Thinking 显示（推理链路）

| 概念 | 文件 |
|------|------|
| Model Thinking vs Selector Reasoning | `spec/backend/index.md`（Reasoning/Thinking 显示链路） |
| reasoningLevel 渲染 | `spec/frontend/thinking-display-config.md` · `spec/frontend/index.md` |
| save_turn(thinking=...) | `spec/backend/index.md`（会话持久化） |

### 管理面板 / Control UI

| 概念 | 文件 |
|------|------|
| 价格库管理 API | `spec/backend/api-routes.md`（routes_admin） |
| 产品映射表管理 | `spec/backend/api-routes.md` |
| 报表系统 UI | `spec/backend/reports-system.md` |

### 企业微信集成

| 概念 | 文件 |
|------|------|
| HTTP 回调接入 | `claude.md` · `doc/wecom_excel_逻辑说明.md` |
| 长连接 Bot | `claude.md` · `start_wecom_bot.py` |
| 告警发送（dispatch_out_of_stock_alert） | `claude.md` |

### 质量 & 流程

| 概念 | 文件 |
|------|------|
| 技术框架基线 / 技术选型约束 | `spec/tech-framework-guidelines.md` |
| Agent 快速入手（任务导向） | `spec/agent-fast-path.md` |
| Agent 接手检查清单 | `spec/agent-onboarding-checklist.md` |
| 索引维护规范 | `spec/index-maintenance.md` |
| 按角色阅读计划 | `spec/role-based-reading-paths.md` |
| 按时间预算阅读 | `spec/time-budget-reading.md` |
| Trellis 工作流规范 | `workflow.md` |
| Slash 命令（/trellis:*） | `.cursor/commands/trellis-*.md` |
| 跨层思考指南 | `spec/guides/cross-layer-thinking-guide.md` |
| 代码复用思考指南 | `spec/guides/code-reuse-thinking-guide.md` |
| Lint / 测试命令 | `README.md` · `claude.md` |

### 部署

| 概念 | 文件 |
|------|------|
| 云端部署清单 | `doc/云端部署准备清单.md` · `README.md` |
| Render / Railway / Vercel | `README.md` |
| Docker | `README.md` · `Dockerfile` |
| 环境变量（部署用） | `spec/backend/config-reference.md` |

---

## 近期重要变更

| 时间 | 变更 | 相关文件 |
|------|------|---------|
| 2026-04-29 | 规则/判断分层：新增 `_apply_candidate_pre_filter`，md 瘦身至 70 行 | `spec/backend/llm-selector-architecture.md` |
| 2026-04-29 | OD→DN 日标外径映射（110→DN100、160→DN150） | `backend/tools/inventory/services/wanding_fuzzy_matcher.py` |
| 2026-04-29 | `spec/backend/memory-context.md` 重写（基于实际 Python 实现） | `spec/backend/memory-context.md` |
| 2026-04-27 | Agent Core 抽离（业务逻辑迁入 JAgentExtension 钩子） | `spec/backend/core-react-loop.md` |
| 2026-04-20 | KnowledgeBackend Neon 主存储 | `spec/backend/database-guidelines.md` |
