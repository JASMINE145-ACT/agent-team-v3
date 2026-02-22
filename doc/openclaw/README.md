# OpenClaw 配置说明（基于 Agent Team version3）

本目录提供与 version3 单主 Agent 逻辑一致的 **AGENTS.md** 与 **TOOLS.md**，供 OpenClaw 在「基于本仓库」配置时使用，使工具选用与后端一致。

## 文件作用

| 文件 | 作用 |
|------|------|
| **AGENTS.md** | Agent 身份与职责：统一业务助手（Jagent）、单主 Agent、六类技能范围。OpenClaw 会将其作为 Agent 身份/上下文注入。 |
| **TOOLS.md** | 工具选用说明：何时用哪个工具、澄清/无货两种途径/全部价格 4 次等规则，与 `backend/agent/agent.py` 中 `_SKILL_*` 对齐。 |

## 使用方式

1. **复制到 OpenClaw 工作区**  
   OpenClaw 默认工作区为 `~/.openclaw/workspace`。将本目录下 `AGENTS.md`、`TOOLS.md` 复制到该目录，例如：
   ```bash
   cp "Agent Team version3/doc/openclaw/AGENTS.md" ~/.openclaw/workspace/
   cp "Agent Team version3/doc/openclaw/TOOLS.md"   ~/.openclaw/workspace/
   ```

2. **或将工作区指向本仓库**  
   在 `~/.openclaw/openclaw.json` 中设置：
   ```json5
   {
     "agents": {
       "defaults": {
         "workspace": "/绝对路径/到/Agent Team version3/doc/openclaw"
       }
     }
   }
   ```
   这样 OpenClaw 会直接读取本仓库内的 AGENTS.md / TOOLS.md。

3. **与 version3 后端配合**  
   - 实际对话与工具调用由 **version3 后端**（`run_backend.py` + WebSocket Gateway）执行，工具列表与实现以 `backend/agent/tools.py` 等为准。  
   - AGENTS.md / TOOLS.md 用于让 OpenClaw 侧对「谁在干活、怎么选工具」的描述与后端一致，避免行为偏差。

## 注意

- 若 OpenClaw 连接的是 version3 的 Gateway，**工具名与参数**以 version3 后端为准；TOOLS.md 仅作选用规则说明，不改变后端已注册的工具定义。
- 更新 version3 的 `_SKILL_*` 或工具后，建议同步更新本目录下 TOOLS.md（及必要时 AGENTS.md），再按上述方式更新 OpenClaw 工作区或工作区路径。
