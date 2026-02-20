# OpenManus Agent 方面可借鉴点

针对 **version3 单 Agent + ReAct** 架构，从 [OpenManus](https://github.com/FoundationAgents/OpenManus)（FoundationAgents/OpenManus，MetaGPT 团队出品）提炼的可落地的借鉴项。参考：仓库 README、`app/` 目录结构、`main.py` / `run_mcp.py` / `run_flow.py` 入口与 `config/config.toml`。

---

## 1. 入口与模块划分：单 Agent / MCP / 多 Agent 同仓

**OpenManus 做法**

- 根目录多入口：`main.py`（单 Agent 通用）、`run_mcp.py`（MCP 工具版）、`run_flow.py`（多智能体流，含可选 DataAnalysis Agent）。
- `app/` 下按职责拆：`agent/`、`flow/`、`mcp/`、`prompt/`、`sandbox/`、`tool/`、`utils/`；配置统一在 `config/config.toml`。

**当前 version3**

- 单入口：`cli_agent.py`、HTTP `run_backend.py`，无 MCP 入口、无多 Agent flow。

**可借鉴**

- 保持「单主 Agent」为主入口；若以后要接 MCP 或做「按任务路由到不同 Agent」，可参考「同仓多入口 + 共享 agent/tool/prompt」的拆法，避免一个 main 里塞满分支。

**参考**

- 仓库根目录：`main.py`、`run_mcp.py`、`run_flow.py`；`app/` 目录结构。

---

## 2. 工具层与 MCP 统一封装

**OpenManus 做法**

- 内置工具在 `app/tool/`，MCP 通过 `app/mcp/`、`run_mcp.py` 接入，工具可插拔。
- 浏览器自动化依赖 Playwright，致谢 anthropic-computer-use、browser-use、crawl4ai。

**当前 version3**

- 工具在 `backend/core/single_agent/` 下合并为一套列表，无 MCP；有 before/after_tool_call 钩子。

**可借鉴**

- 若企业微信或外部系统要「按 MCP 协议挂工具」：可看 OpenManus 如何把「内置 tool」与「MCP 工具」统一成一套调用接口；version3 的 before/after 钩子可挂在统一工具层，对内置与 MCP 一视同仁。

**参考**

- `app/tool/`、`app/mcp/`、`run_mcp.py`。

---

## 3. 配置驱动 LLM 与可选能力

**OpenManus 做法**

- `config/config.toml`：`[llm]` 全局（model、base_url、api_key、max_tokens、temperature），`[llm.vision]` 等可选块。
- `[runflow]` 里 `use_data_analysis_agent = true/false` 控制是否启用数据分析 Agent。

**当前 version3**

- 用环境变量 / 少量 config 驱动 LLM；技能在 system prompt 里写死。

**可借鉴**

- 换模型、换 endpoint 只改配置不散落代码；若以后加「数据分析/报表」等可选 Agent，用配置开关而非写死分支。

**参考**

- `config/config.example.toml`、README 配置说明。

---

## 4. 浏览器自动化与「真实环境」闭环

**OpenManus 做法**

- 可选安装 `playwright install`，用于网页操作、填表、取数等；与 LLM 决策 loop 结合成完整任务闭环。

**当前 version3**

- 无浏览器自动化；报价单/Excel 等依赖上传文件与后端工具。

**可借鉴**

- 若要做「打开页面、点选、填表、取数」类需求：参考其把浏览器动作封装成工具、与 ReAct 循环配合的方式；可与现有 before_tool_call（如权限/确认）结合。

**参考**

- README「Browser Automation Tool (Optional)」；致谢 browser-use、crawl4ai。

---

## 5. 多 Agent 与 Flow 编排

**OpenManus 做法**

- `run_flow.py` 做多智能体流；通过 config 开关加入 DataAnalysis Agent 等，README 称「不稳定的多智能体版本」。

**当前 version3**

- 单主 Agent，无 flow 编排。

**可借鉴**

- 若将来要「主 Agent + 专用子 Agent（如数据分析、报表）」：可参考其「单 Agent 为主 + 按需多 Agent、用配置开关」的轻量做法，而不是一上来就上重框架。

**参考**

- `app/flow/`、`run_flow.py`；README「Custom Adding Multiple Agents」。

---

## 6. 工具失败时的 LLM 降级

**OpenManus 做法**

- 文档提到：工具执行失败时用 **LLM 做 fallback**（graceful degradation）。

**当前 version3**

- 工具异常会变成 observation 写回 messages，模型可据此再决策；无显式「降级策略」封装。

**可借鉴**

- 与 version3 的 **after_tool_call** 结合：工具超时/报错时，在 after 里把原始报错加工成「精简错误 + 建议下一步」，再交给模型，相当于一次结构化降级。

**参考**

- README / 官方介绍中的 graceful degradation 描述。

---

## 7. 协议与扩展（A2A）

**OpenManus 做法**

- 仓库含 `protocol/a2a/`（Agent-to-Agent 相关）。

**当前 version3**

- 无 Agent 间协议。

**可借鉴**

- 若以后要做「多 Agent 互相调用或与外部 Agent 互通」，可看其 a2a 的抽象与消息格式，再决定是否采纳或简化。

**参考**

- `protocol/a2a/`。

---

## 8. 实现风格与依赖管理

**OpenManus 做法**

- 自称「简洁实现」、3 小时出原型；推荐用 **uv** 做 venv 与依赖安装；有 pre-commit、贡献指南。

**当前 version3**

- Python + requirements.txt，结构清晰。

**可借鉴**

- 保持「简单可读」前提下拆 agent / prompt / tool；若团队多用 uv，可考虑用 uv 管理 version3 环境。

**参考**

- README 安装（conda / uv）、How to contribute、pre-commit。

---

## 工具变多时的处理（学习案例汇总）

工具数量增长后，需要解决：**注册与发现**、**按需加载**（避免一次把几十个工具全塞进 prompt）、**按场景/模型过滤**。学习案例的典型做法如下。

### OpenCode（opencode）

| 机制 | 做法 |
|------|------|
| **工具来源** | **内置列表**（Bash、Read、Edit、Write、Todo、Skill、ApplyPatch 等）+ **目录扫描** `tool/tools/*.{js,ts}` 动态加载 + **插件** `Plugin.list()` 提供的 tool。 |
| **统一入口** | `ToolRegistry.all()` = 内置 + custom（扫描 + 插件）；`ToolRegistry.tools(model, agent)` 再按 **modelID / providerID / agent** 过滤后返回当次可用的工具列表。 |
| **按模型过滤** | 例如：`codesearch`/`websearch` 仅 zen 或开启 ExA 时启用；`apply_patch` 仅部分模型；`todoread`/`todowrite` 对 GPT 系不暴露；`edit`/`write` 与 `apply_patch` 二选一。 |
| **Skill 按需** | 不把全部技能内容写进 system；用 **SkillTool**：prompt 里只给 `<available_skills>` 的 name/description 列表，模型需要时再调 `skill` 工具加载对应 SKILL.md 内容，避免 prompt 爆炸。 |

**参考**：`packages/opencode/src/tool/registry.ts`（all、register、tools 过滤）、`session/prompt.ts`（ToolRegistry.tools + MCP.tools）、`tool/skill.ts`（Skill.all、按 agent 权限过滤后只暴露 name/description）。

### OpenManus（OpenManus）

| 机制 | 做法 |
|------|------|
| **工具注册** | **显式注册**：`MCPServer.tools` 为 `Dict[str, BaseTool]`，初始化时放入 bash、browser、editor、terminate 等；`register_tool(tool)` 统一转成 MCP 的 function 形态。 |
| **统一接口** | 所有工具继承 **BaseTool**（name、description、parameters、execute），`to_param()` 产出 function 描述，便于与 MCP 或 LLM 工具列表一致。 |
| **多入口不同工具集** | `main.py` 用一套工具；`run_mcp.py` 走 MCP 协议可挂不同 server；`run_flow.py` 多 Agent 时每个 Agent 可绑不同 tool 集合（如 DataAnalysis Agent 单独一批）。 |

**参考**：`app/tool/base.py`、`app/mcp/server.py`（register_tool、register_all_tools）、`app/agent/mcp.py`（MCP 工具列表变化检测）。

### OpenClaw（文档）

| 机制 | 做法 |
|------|------|
| **Skills 按需注入** | 技能 = SKILL.md + 门控；**按需加载**进 system prompt，不一次塞满。优先级：工作区 skills → 托管 ~/.openclaw/skills → 内置；插件也可带 skills。 |
| **工具与技能分离** | 工具能力由插件/配置提供；技能描述只注入「当前会话/环境需要的」那几段，控制 prompt 长度与噪音。 |

**参考**：`doc/OpenClaw_agent借鉴.md` 第 7 节；[Skills](https://docs.openclaw.ai/tools/skills)、[Skills 配置](https://docs.openclaw.ai/tools/skills-config)。

### version3 现状与可行演进

| 现状 | 说明 |
|------|------|
| **工具列表** | `get_all_tools()` = 库存工具 + 报价单工具 + EXTRA_TOOLS（无货/询价填充/澄清），**一次全量** 交给 LLM。 |
| **技能 prompt** | `agent.py` 已拆成 5 个技能常量 + `_ALL_SKILLS` + `_PROMPT_OUTPUT_FORMAT`，`_build_system_prompt()` 组装；按需注入时改为 `_build_system_prompt(active_skills=None)` 并在 `execute_react` 里按 context 传参即可。 |
| **问题** | 工具再增加（如按业务线、按客户加工具）会导致：① prompt 过长；② 模型选工具噪音大；③ 难以按会话/权限只暴露部分工具。 |

**可行演进（借鉴学习案例）**

1. **工具注册与过滤**
   - 引入「工具注册表」：内置列表 + 可选目录/模块扫描（或配置里列 tool 模块名），再按 **session/context/config** 过滤出当次可用列表（例如按业务线、按企业微信权限只暴露部分工具）。
   - 参考 OpenCode 的 `ToolRegistry.tools(model, agent)` 过滤逻辑，在 version3 可做成 `get_tools_for_context(session_id, context, config) -> List[dict]`。

2. **技能描述按需注入**
   - version3 已把技能拆成 **5 个常量 + `_ALL_SKILLS`**（`agent.py` 110-163 行）；下一步将 `_build_system_prompt()` 改为 `_build_system_prompt(active_skills=None)`，在 `execute_react` 里按 context 传本次要带的技能块即可（如无 file_path 时少带无货/询价填充）。
   - 参考 OpenClaw Skills 按需加载、OpenCode SkillTool 只给 name/description 列表再按需拉内容。

3. **MCP 与多入口**
   - 若工具进一步增多且来自不同系统：可像 OpenManus 一样接 MCP，工具列表由 MCP server 提供，version3 侧只做「请求时拉取工具列表 + 执行时转发」，before/after 钩子挂在统一执行层。

4. **保持单表 + 分组描述**
   - 若短期不引入注册表：至少把 system 里工具描述按**技能分组**（已做），新增工具时只加一条并归到某组；工具列表仍可全量，但用「分组 + 简短描述」控制单组内数量与表述长度，便于模型选择。

---

## 总结：与 version3 的对照与可借鉴方向

| 维度 | version3 现状 | OpenManus 可借鉴 |
|------|----------------|------------------|
| 入口 | 单 Agent（CLI + HTTP） | 多入口（main / mcp / flow）同仓，按需选用 |
| 工具 | 内置工具 + before/after 钩子 | 工具层 + MCP 统一封装，钩子可挂统一层 |
| 配置 | 环境变量 + 少量配置 | toml 统一 LLM + 可选能力开关 |
| 多 Agent | 无 | 轻量 flow + 配置开关，需要时再上 |
| 浏览器 | 无 | Playwright 闭环，需时再接 |
| 降级 | 异常进 observation | 工具失败时 LLM fallback，可与 after_tool_call 结合 |
| 协议 | 无 | a2a 作扩展参考 |

---

## 参考路径（学习案例）

- 仓库：<https://github.com/FoundationAgents/OpenManus>
- 入口：`main.py`、`run_mcp.py`、`run_flow.py`
- 核心目录：`app/agent/`、`app/tool/`、`app/mcp/`、`app/flow/`、`app/prompt/`
- 配置：`config/config.example.toml`
- 协议：`protocol/a2a/`
