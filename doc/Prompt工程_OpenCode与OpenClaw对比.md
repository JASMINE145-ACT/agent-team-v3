# Prompt 工程：OpenCode / OpenClaw 对比与 version3 可借鉴点

针对 **Agent Team version3** 的 system prompt 设计，对比学习案例 **OpenCode**、**OpenClaw** 的 prompt 工程做法，提炼可落地的借鉴项。

---

## 一、version3 当前做法（基线）

### 1.1 代码结构（agent.py）

| 位置 | 内容 |
|------|------|
| **110-163** | 5 个技能常量（`_SKILL_INVENTORY_PRICE`、`_SKILL_OOS`、`_SKILL_QUOTE`、`_SKILL_FILL`、`_SKILL_CLARIFY`）+ **`_ALL_SKILLS`** 列表（默认顺序）。 |
| **165-173** | **`_PROMPT_OUTPUT_FORMAT`** 常量（输出格式、`<think>`、多轮指代）。 |
| **176-185** | **`_build_system_prompt()`**：用 `"\n\n".join(_ALL_SKILLS)` 拼技能段，再与角色头、`_PROMPT_OUTPUT_FORMAT` 组装；**行为与重构前一致**，生成的 system 字符串不变。 |

纯结构重组，便于后续**按需注入**：下一步只需给 `_build_system_prompt(active_skills=None)` 增加参数，在 `SingleAgent.__init__` 或 `execute_react` 里按 context 决定传哪几个技能块。

### 1.2 按需注入的下一步（未实现）

```python
# 示例：有 file_path 时跳过无货块；或按 session/业务线只带部分技能
def _build_system_prompt(active_skills=None) -> str:
    skills = active_skills if active_skills is not None else _ALL_SKILLS
    skills_section = "\n\n".join(skills)
    # ... 其余组装不变
```

在 `execute_react` 里根据 `context`（如是否有 `file_path`、会话类型）计算 `active_skills` 再传入即可。

### 1.3 维度小结

| 维度 | 做法 |
|------|------|
| **System 来源** | `_build_system_prompt()` 组装；技能与输出格式已拆成**常量 + 列表**，便于按需过滤。 |
| **内容结构** | ① 角色与原则 ② **技能与工具**（5 块，来自 `_ALL_SKILLS`）③ **输出格式**（`_PROMPT_OUTPUT_FORMAT`）。 |
| **技能描述** | 每块独立常量，**何时用**、边界规则均在对应块内。 |
| **思考** | `<think>...</think>` **强制要求**，格式固定（目标/已知/缺失/本步行动）。 |
| **按需/动态** | 结构已就绪；尚未按 context 传 `active_skills`，当前等价于全量 `_ALL_SKILLS`。 |

**优点**：清晰、可读、易维护；规则集中；**已为按需注入预留接口**。  
**待做**：在调用处按 context 决定 `active_skills`，控制 prompt 长度与场景。

---

## 二、OpenCode 的 Prompt 工程

### 2.1 System 分层组装（llm.ts）

System 由**多段拼接**，顺序固定：

```
system = [
  SystemPrompt.header(providerID)           // 可选，如 Anthropic 的 spoof
  + (agent.prompt ?? SystemPrompt.provider(model))  // 按 Agent 或按模型
  + input.system                           // 本次调用传入的 custom
  + (user.system ?? [])                    // 用户消息上挂的 system
]
```

- **Header**：按 provider 注入（如对 Anthropic 用 spoof）。
- **Provider / Agent 二选一**：若有 `agent.prompt` 用 Agent 自己的 prompt；否则用 **按模型** 的模板（`anthropic.txt`、`beast.txt`、`gemini.txt`、`qwen.txt` 等），不同模型不同编辑/输出风格。
- **Custom**：来自本次请求的 `input.system`（见下）。

### 2.2 Custom 来自文件与 URL（system.ts）

`SystemPrompt.custom()` 从多处**动态加载**文本，拼进 system：

| 来源 | 说明 |
|------|------|
| **本地规则文件** | 从项目向上查找 `AGENTS.md`、`CLAUDE.md` 等，取**最先找到**的；全局可配 `~/.claude/CLAUDE.md`、`AGENTS.md`。 |
| **config.instructions** | 配置里可写路径（含 `~/`、绝对路径）或 **URL**；支持多条，每条读文件或 fetch URL，前面加 `"Instructions from: path_or_url"` 再拼入。 |

即：**项目级 / 用户级 / 配置级** 的「额外说明」不写死在代码里，而是**文件 + URL**，便于按项目、按环境切换。

### 2.3 环境信息（system.ts）

`SystemPrompt.environment()` 注入一段**结构化环境**：

- 工作目录、是否 git 仓库、平台、**当前日期**
- 可选：ripgrep 扫文件树（默认关）

便于模型知道「当前在哪、今天几号」等上下文。

### 2.4 Session 里再拼一段 system（prompt.ts）

调用 LLM 时传入的 `system` 参数为：

```ts
system: [
  ...(await SystemPrompt.environment()),
  ...(await SystemPrompt.custom()),
]
```

即：**每轮请求**的 system = **环境** + **custom 文件/URL**；前面的 header + provider/agent 在 `LLM.stream()` 里再拼到更前面。  
**Agent 的 prompt** 来自配置：每个 Agent（build / plan / general 等）可有自己的 `prompt` 字段（如从 md 读入），实现**按 Agent 换一套行为说明**。

### 2.5 Skill：按需加载，不塞满 system（skill.ts）

- **Skill 内容不进 system**。System 里只有「有一批 available_skills」的约定；具体技能是 **Skill 工具** 的 **description** 里列出的 `<name>` + `<description>`（即技能列表的简短摘要）。
- 模型需要某技能时**调 `skill` 工具**，传入 `name`；工具内再 **ConfigMarkdown.parse(skill.location)** 读 SKILL.md，返回完整内容给模型。
- 效果：system 不膨胀，**按需拉取**长文档；且可按 **agent.permission** 过滤掉部分 skill（如 deny 的 skill 不出现在列表里）。

### 2.6 按模型用不同「行为模板」（prompt/*.txt）

- **codex_header.txt**：通用身份与编辑/工具/输出规范（You are OpenCode... Editing constraints, Tool usage, Git hygiene, Frontend tasks, Final answer structure）。
- **anthropic.txt / beast.txt / gemini.txt / qwen.txt**：按**模型/提供商**切换，用于不同推理/输出风格（如有无 todo、是否强调 apply_patch）。
- **max-steps.txt**：步数到顶时注入「只许总结、不许再调工具」的提醒。

### 2.7 插入式提醒（insertReminders）

- 在**用户消息**后追加 **synthetic** 的 text part，用于「模式切换」或「约束强化」：
  - 例如进入 **plan 模式**时，追加一段「禁止执行、只能写 plan 文件」的 system-reminder；
  - 从 plan 切到 **build** 时，追加「按 plan 文件执行」的提醒。
- 这样**同一套 system**，通过**消息内插入**实现不同阶段的强约束，而不必改 system 本身。

---

## 三、OpenClaw 的 Prompt 工程（文档摘要）

（依据 `doc/OpenClaw_agent借鉴.md` 与官方文档。）

| 维度 | 做法 |
|------|------|
| **思考级别** | 用户/会话可设 **thinking level**：off \| minimal \| low \| medium \| high \| xhigh；对应不同推理预算、是否流式出 reasoning。解析优先：**消息内联指令 → 会话覆盖 → 全局默认 → 回退**。 |
| **Skills** | 技能 = SKILL.md + 门控；**按需加载**进 system，不一次塞满。优先级：**工作区 skills → 托管 ~/.openclaw/skills → 内置**；插件也可带 skills。 |
| **对外输出** | 对 IM 不直接发流式 delta，只在 **lifecycle end** 后发一条最终回复；流式仅在内部用。 |

可借鉴点：**思考可配置**、**技能按需注入**、**system 与渠道策略分离**。

---

## 四、对比小结

| 维度 | version3 | OpenCode | OpenClaw |
|------|----------|----------|----------|
| **System 来源** | 单函数写死 | 分层：header + provider/agent + custom 文件/URL + environment | 技能按需 + 层级目录 |
| **技能描述** | 全在 system 里 | System 只定风格；技能列表在 Skill 工具 description；内容**按需**用 skill 工具拉 | 按需注入 system，不塞满 |
| **按模型/Agent** | 无 | 按模型用不同 .txt；按 Agent 用 agent.prompt | 思考级别等可配置 |
| **额外说明** | 无 | AGENTS.md / CLAUDE.md / config.instructions（文件+URL） | 工作区/托管/内置 skills |
| **思考** | 固定 `<think>` | 有 reasoning 流（reasoning-start/delta/end），不强制 think 标签 | **可配置** off～xhigh |
| **约束注入** | 无 | insertReminders（plan/build 等 synthetic 提醒） | lifecycle 等 |

---

## 五、version3 可借鉴的 Prompt 工程点

### 5.1 技能按需注入（高价值）

- **现状**：技能已拆成 **5 个常量 + `_ALL_SKILLS`**（见 1.1）；`_build_system_prompt()` 目前用全量 `_ALL_SKILLS`，生成结果与重构前一致。
- **下一步**：
  - 将 `_build_system_prompt()` 改为 **`_build_system_prompt(active_skills=None)`**，`active_skills is None` 时用 `_ALL_SKILLS`，否则用传入的列表（保持顺序）。
  - 在 **`SingleAgent.__init__`** 或 **`execute_react`** 里根据 **context**（如 `context.get("file_path")`、会话类型、业务线）计算本次要带的技能块列表，传入即可。例如：无 file_path 时可省略无货/询价填充块；只做报价的会话可只带库存+报价单+澄清。
  - 可选：引入**类似 Skill 的工具**，system 里只列技能 name+简介，需要时调工具拉取对应段落，进一步省 token。

### 5.2 从文件/URL 读「额外说明」（中价值）

- **现状**：无项目级/用户级覆盖。
- **借鉴 OpenCode**：
  - 在构造 system 时，除 `_build_system_prompt()` 外，再读**可选**的「项目 AGENTS.md / 某路径下的 CLAUDE.md」或 **config 里 instructions（文件路径或 URL）**，拼到 system 末尾。
  - 这样不同项目、不同部署可挂不同说明，无需改代码。

### 5.3 思考级别可配置（中价值）

- **现状**：`<think>` 写死，且流式时整段打出。
- **借鉴 OpenClaw**：
  - 在 session 或请求里加 **thinking_level**（off \| minimal \| full）；prompt 里按 level 写：
    - off：不要求 `<think>`，直接 Act 或回复；
    - minimal：简短 think；
    - full：保持现有「目标/已知/缺失/本步行动」。
  - 流式可做成：仅当 level=full 或 verbose 时把 `<think>` 推到前端，否则只推最终答案，减少噪音与 token。

### 5.4 按模型或「场景」切换行为模板（低～中价值）

- **现状**：同一套 prompt 打所有模型。
- **借鉴 OpenCode**：
  - 若未来支持多模型（如 GPT-4o + 智谱）：可像 OpenCode 一样按 **model_id 或 provider** 选不同 .txt 模板（编辑风格、输出格式、是否强调某些工具），再与公共部分拼接。
  - 或按「场景」：如企业微信入口用「简短回复」模板，CLI 用「详细+think」模板。

### 5.5 环境信息注入（低价值）

- **借鉴 OpenCode**：在 system 中加一小段 `<env>`：当前日期、工作目录（若适用）、是否带 file_path 等，便于模型做时间/上下文相关判断。

### 5.6 插入式提醒（低价值，按需）

- 若以后有「模式」（如只读模式、确认模式）：可在**当轮用户消息后**追加一段 synthetic 的 system-reminder，而不是改整段 system；参考 OpenCode 的 insertReminders。

---

## 六、实施优先级建议

| 优先级 | 项 | 做法 |
|--------|----|------|
| **高** | 技能按需注入 | 拆技能为多段；按 session/request 或 Skill 工具按需拉取，控制 prompt 长度。 |
| **中** | 文件/URL 额外说明 | 支持可选的 AGENTS.md / instructions 路径或 URL，拼到 system 尾。 |
| **中** | 思考级别可配置 | thinking_level（off/minimal/full）；流式按 level 决定是否推 think。 |
| **低** | 按模型/场景模板 | 多模型或多入口时，不同 .txt 模板与公共部分拼接。 |
| **低** | 环境信息 | system 中加日期、工作目录等 `<env>` 段。 |

---

## 七、参考路径

- **OpenCode**  
  - System 组装：`packages/opencode/src/session/llm.ts`（system 拼接）  
  - Custom/环境：`packages/opencode/src/session/system.ts`  
  - Session 传入的 system：`packages/opencode/src/session/prompt.ts`（environment + custom）  
  - Skill 按需：`packages/opencode/src/tool/skill.ts`、`packages/opencode/src/skill/skill.ts`  
  - 模板：`packages/opencode/src/session/prompt/*.txt`  
  - 插入提醒：`packages/opencode/src/session/prompt.ts`（insertReminders）  
- **OpenClaw**  
  - 见 `doc/OpenClaw_agent借鉴.md` 第 6、7 节；[思考级别](https://docs.openclaw.ai/tools/thinking)、[Skills](https://docs.openclaw.ai/tools/skills)  
- **version3**  
  - 技能与输出格式：`backend/core/single_agent/agent.py` 第 110-173 行（5 个技能常量、`_ALL_SKILLS`、`_PROMPT_OUTPUT_FORMAT`）。  
  - 组装：第 176-185 行 `_build_system_prompt()`；按需注入时改为 `_build_system_prompt(active_skills=None)` 并在调用处传参。
