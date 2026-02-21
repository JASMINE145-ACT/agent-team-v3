# 业务知识记忆方案（借鉴 OpenClaw）

针对 **万鼎 LLM selector** 中大量业务知识需可维护、且希望用户通过自然语言「你要记住」等命令动态追加，参考 OpenClaw 的 memory/学习机制给出的实现方案与落地说明。

---

## 1. 背景与目标

- **现状**：`backend/tools/inventory/services/llm_selector.py` 内业务知识原为代码内常量 `_BUSINESS_KNOWLEDGE`，供万鼎多候选选型时注入 LLM prompt。
- **目标**：
  1. 业务知识单独放在一个 **MD 文件** 中，便于编辑与版本管理。
  2. 用户可通过 **「你要记住」「请记住」「记住：」等命令** 让系统记住新知识并追加到该 MD，后续选型自动生效。

---

## 2. OpenClaw 可借鉴点

（参考 `doc/OpenClaw_agent借鉴.md` 及学习案例 `openclaw`）

- **Session Memory Hook**：在 `/new` 时把会话内容写入 `memory/YYYY-MM-DD-slug.md`，形成持久化记忆。
- **Memory 工具**：`memory_search` + `memory_get` 读工作区 `MEMORY.md` 与 `memory/*.md`，供 Agent 回答「之前做过什么」类问题。
- **理念**：记忆 = 文件化 + 按需注入；用户/会话可间接或直接往「记忆文件」里写内容。

本方案不引入完整 memory 插件与向量检索，只做 **单文件业务知识 MD + 用户命令追加**，与 LLM selector 现有「整段 knowledge 注入 prompt」一致。

---

## 3. 实现方案概要

| 项 | 说明 |
|----|------|
| **业务知识文件** | 默认路径：`backend/tools/data/wanding_business_knowledge.md`（由 `backend/tools/inventory/config.py` 的 `WANDING_BUSINESS_KNOWLEDGE_PATH` 决定，可用环境变量覆盖）。 |
| **首次使用** | 若路径已配置但文件不存在，`llm_selector._load_business_knowledge()` 会用内置常量内容初始化该文件。 |
| **记住命令（前缀）** | 用户输入**以**「你要记住」「请记住」「记住：」「/记住」「帮我记住」「记一下」等开头时，在 ReAct 前走 `try_handle_remember`，截取其后内容追加到 MD。 |
| **记住（Agent 工具）** | 用户说「记录到知识库」「记在 knowledge」「润色后记录」等**任意说法**时，由 Agent 调用 **append_business_knowledge(content)**，content 为润色后的完整一条知识；不要求用户先说「请记住」。与 OpenClaw 一致：由 Agent 按意图决定何时写入。 |
| **入口** | 前缀命中：`try_handle_remember` 在 `execute_react` 前执行，命中则直接返回。工具：ReAct 中 Agent 调用 `append_business_knowledge`，由 `execute_tool` 执行。 |
| **接入点** | HTTP `POST /api/query`、`POST /api/query/stream`；WebSocket Gateway `chat.send`；CLI `cli_agent.py`。 |

---

## 4. 触发句式与追加格式

- **触发前缀**（正则，取第一个匹配）：  
  `你要记住[：:\s]+`、`请记住[：:\s]+`、`记住[：:\s]+`、`[/／]记住[：:\s]*`、`帮我记住[：:\s]+`、`记一下[：:\s]+`
- **追加格式**：  
  `\n\n- [用户添加 YYYY-MM-DD HH:MM] <用户输入内容>\n`  
  保证可读、可追溯，且不破坏原有 MD 结构。

---

## 5. 配置与环境变量

- **WANDING_BUSINESS_KNOWLEDGE_PATH**：业务知识 MD 的绝对或相对路径。未设置时使用默认 `backend/tools/data/wanding_business_knowledge.md`（相对项目运行目录解析）。

---

## 6. 文件与职责

| 文件 | 职责 |
|------|------|
| `backend/tools/inventory/config.py` | 定义 `WANDING_BUSINESS_KNOWLEDGE_PATH`。 |
| `backend/tools/inventory/services/llm_selector.py` | `_load_business_knowledge()` 从该路径读 MD（LLM 每次选型都用此内容）；若不存在则用内置内容创建。**防重复读取**：按「路径 + 文件 mtime」做内存缓存，同进程内文件未改则直接返回缓存；`invalidate_business_knowledge_cache()` 供「记住」命令在追加后调用，使下次选型重读 MD。 |
| `backend/agent/remember.py` | `try_handle_remember(user_input)`：检测「记住」指令、解析内容、追加到 MD、返回回复文案或 None。 |
| `backend/server/api/routes.py` | query / query_stream 在 `execute_react` 前调用 `try_handle_remember`，命中则直接返回。 |
| `backend/server/gateway/handlers/chat.py` | chat.send 前调用 `try_handle_remember`，命中则写 session、发最终回复并 return。 |
| `cli_agent.py` | 主循环中在 `execute_react` 前调用 `try_handle_remember`，命中则打印回复并 continue。 |

---

## 7. 参考

- OpenClaw Session Memory：`src/hooks/bundled/session-memory/HOOK.md`
- OpenClaw Memory 工具：`src/agents/tools/memory-tool.ts`（memory_search / memory_get）
- 本仓 OpenClaw 借鉴总览：`doc/OpenClaw_agent借鉴.md`
