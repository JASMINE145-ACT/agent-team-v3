# OpenClaw 前端一比一复刻方案

目标：把学习案例里的 OpenClaw 控制 UI（`学习案例/openclaw/ui`）原样跑起来，对接到 Agent Team version3 后端，尽量不改 UI 代码。

---

## 〇、已实现（Gateway 适配层）

- **WebSocket**：`/ws` 已挂载在 FastAPI 上，启动后端即可连 `ws://localhost:8000/ws`。
- **握手**：连接后立即推送 `connect.challenge`，客户端发 `connect` 后返回 `hello-ok`。
- **方法**：`connect`、`agent.identity.get`、`agents.list`、`sessions.list`、`sessions.patch`、`sessions.delete`、`chat.history`、`chat.send`（含流式 delta/final）、`chat.abort`，以及所有 stub（`config.get`、`skills.status`、`cron.status` 等）。
- **SessionStore**：已增加 `list_sessions()`、`delete_session(session_id)`。
- **目录**：`backend/ws_gateway/`（`gateway.py`、`run_store.py`、`handlers/`）。

**下一步**：✅ 已完成。已拷贝 UI 至 `control-ui/`，默认 WS 为 `ws://${host}/ws`，构建产出 `dist/control-ui/`，由 `app.py` 挂载到 `/`。

---

## 〇.1 接前端实施计划（Plan）

| 步 | 内容 | 说明 |
|----|------|------|
| **1** | **拷贝 OpenClaw UI 到 control-ui/** | 从 `学习案例/openclaw/ui`（或 `瀛︿範妗堜緥/openclaw/ui`）完整拷贝到 `Agent Team version3/control-ui/`，保持目录结构（src、package.json、vite.config.ts 等）。 |
| **2** | **修改默认 WS URL（必须）** | `storage.ts` 的 `defaultUrl` 是 `` `${proto}://${location.host}` ``，即 `ws://localhost:8000`——**不含 `/ws` path**，与后端 `/ws` 路由不匹配，必须修复。方案：在 `control-ui/src/ui/storage.ts` 里把 defaultUrl 改为 `` `${proto}://${location.host}/ws` ``（仅加 `/ws`，一行改动）。改动后同源部署零配置直连；或跳过此步，首次打开 UI 时在设置页手动填 `ws://localhost:8000/ws`。 |
| **3** | **安装依赖并构建** | `cd control-ui && npm install && npm run build`。⚠️ **输出目录是 `../dist/control-ui`**（`vite.config.ts` 写死：`outDir: path.resolve(here, "../dist/control-ui")`），即构建产物在项目根的 `dist/control-ui/`，不是 `control-ui/dist/`。 |
| **4** | **FastAPI 挂载静态** | 在 `backend/api/app.py` 末尾追加（`include_router` 之后）：`app.mount("/", StaticFiles(directory=str(Path(__file__).resolve().parent.parent.parent / "dist" / "control-ui"), html=True), name="ui")`。同时在文件顶部 import `StaticFiles` 和 `Path`。路由注册顺序：先 `include_router(router)` → `include_router(ws_router)` → 最后 `mount("/",...)`，避免静态覆盖 API/WS 路由。 |
| **5** | **验证路径** | 启动前确认 `dist/control-ui/index.html` 已存在（即步骤 3 构建成功）。若用绝对路径：`Path(__file__) = backend/api/app.py`，`.parent.parent.parent` = `Agent Team version3/`，所以拼出 `Agent Team version3/dist/control-ui`，正确。 |
| **6** | **端到端验证** | 启动后端 → 浏览器打开 `http://localhost:8000/` → 若已改 defaultUrl 则直连；若未改则在 URL 输入框填 `ws://localhost:8000/ws` → 连接 → 会话列表加载、选会话、发消息、流式回复正常。 |

**顺序小结**：1 拷贝 → 2 改 defaultUrl（+`/ws`，1 行）→ 3 `npm run build`（产出 `dist/control-ui/`）→ 4 追加静态挂载到 `app.py` → 5 验证。

---

## 一、整体架构

```
浏览器
  └─ OpenClaw UI (Lit + Vite, 静态)
       │  WebSocket ws://localhost:8000/ws
       ▼
  Gateway 适配层（FastAPI WebSocket）
       │  Python 调用
       ├─ SingleAgent.execute_react(...)
       ├─ SessionStore.load / save_turn / build_injection
       └─ 文件上传目录（uploads/）
```

**核心原则**：UI 代码零改动，仅改连接 URL 配置（一个 `.env` 或 `vite.config.ts` 里的变量）。

---

## 二、WebSocket 帧协议（完整版）

### 2.1 三种帧类型

```typescript
// 客户端 → 服务端
{ type: "req", id: string, method: string, params?: unknown }

// 服务端 → 客户端（对应 req）
{ type: "res", id: string, ok: boolean, payload?: unknown,
  error?: { code: string, message: string, details?: unknown } }

// 服务端 → 客户端（主动推）
{ type: "event", event: string, payload?: unknown,
  seq?: number,                        // 顺序号，客户端用于检测丢帧
  stateVersion?: { presence: number, health: number } }
```

### 2.2 握手流程（必须实现）

```
服务端建立连接后立即推送：
  {"type":"event","event":"connect.challenge","payload":{"nonce":"<随机字符串>"}}

客户端发送 req：
  {
    "type": "req", "id": "<uuid>", "method": "connect",
    "params": {
      "minProtocol": 3, "maxProtocol": 3,
      "client": { "id": "openclaw-control-ui", "version": "dev",
                  "platform": "web", "mode": "webchat" },
      "role": "operator",
      "scopes": ["operator.admin", "operator.approvals", "operator.pairing"],
      "caps": [],
      "userAgent": "<navigator.userAgent>",
      "locale": "<navigator.language>"
    }
  }
  注意：本地无需校验 device 签名，忽略 params.device 即可。

服务端返回（特殊 res，payload 嵌在顶层）：
  {
    "type": "res", "id": "<同 req.id>", "ok": true,
    "payload": {
      "type": "hello-ok",
      "protocol": 3,
      "features": { "methods": [...已实现的方法名...] },
      "snapshot": {
        "sessionDefaults": {
          "defaultAgentId": "version3",
          "mainKey": "main",
          "mainSessionKey": "main"
        }
      }
    }
  }
```

### 2.3 重连机制

UI 内置指数退避重连：初始 800ms，每次 ×1.7，上限 15s。服务端无需做任何处理，重连后 UI 自动重发 connect req。

---

## 三、方法实现清单

### 3.1 必须实现（最小可运行集）

#### `connect`
见 2.2。本地忽略 device auth，只需返回合法的 hello-ok。

---

#### `agent.identity.get`
```
req.params: { agentId: string }
res.payload: {
  agentId: string,
  name: string,        // 显示名，如 "Version3 助手"
  avatar: string,      // emoji 或 URL，如 "🤖"
  emoji?: string
}
```
直接硬编码固定值返回。

---

#### `sessions.list`
```
req.params: {
  includeGlobal: boolean,
  includeUnknown: boolean,
  activeMinutes?: number,
  limit?: number
}
res.payload: {
  ts: number,                   // Date.now() / 1000
  path: string,                 // sessions 目录路径
  count: number,
  defaults: { model: null, contextTokens: null },
  sessions: GatewaySessionRow[]
}

GatewaySessionRow: {
  key: string,                  // session_id
  kind: "direct",
  label?: string,               // 可用 turns[0].query 前 20 字
  updatedAt: number | null,     // 最后一条 turn 的 ts
  thinkingLevel?: string,       // 可不传
  inputTokens?: number,
  outputTokens?: number
}
```
实现：扫描 `SessionStore._persist_dir/*.json`，读取每份文件的 key + turns[-1].ts + turns[0].query。

---

#### `chat.history`
```
req.params: { sessionKey: string, limit: number }
res.payload: {
  messages: OpenClawMessage[],
  thinkingLevel?: string
}

OpenClawMessage: {
  role: "user" | "assistant",
  content: [{ type: "text", text: string }],
  timestamp?: number          // unix ms
}
```
实现：`SessionStore.load(sessionKey)` → 把每条 `Turn` 展开成两条消息：
```python
for turn in session.turns[-limit//2:]:
    messages.append({ "role": "user",
                       "content": [{"type":"text","text": turn.query}],
                       "timestamp": int(turn.ts * 1000) })
    messages.append({ "role": "assistant",
                       "content": [{"type":"text","text": turn.answer}],
                       "timestamp": int(turn.ts * 1000) })
```

---

#### `chat.send`（核心，含流式）
```
req.params: {
  sessionKey: string,
  message: string,              // 用户输入文本（可与 attachments 二选一，即仅发图也可）
  deliver: boolean,
  idempotencyKey: string,       // UUID，可用于去重
  attachments?: [{
    type: "image",
    mimeType: string,
    content: string             // base64
  }],
  context?: Record<string, any>,  // 可选，会原样传给 agent.execute_react(context=...)
  file_path?: string            // 可选，会并入 context 传给 agent（如报价单 Excel 路径）
}
res.payload: { ok: true, runId: string }    // 立即返回 runId
```
实现说明：`message` 与 `attachments` 至少其一；若有 `context` 或 `file_path`，会传入 agent 的 `execute_react(context=...)`；图片附件当前会在用户输入后追加说明文案，暂不将图片送入模型。

流式推送（在返回 res 之后异步推）：
```
// 每个 on_token 回调时推送：
{ "type": "event", "event": "chat",
  "payload": {
    "runId": "<uuid>",
    "sessionKey": "<key>",
    "state": "delta",
    "message": {
      "role": "assistant",
      "content": [{ "type": "text", "text": "<累积文本>" }]
    }
  }
}

// execute_react 完成（loop_end 事件）时推送：
{ "type": "event", "event": "chat",
  "payload": { "runId": "...", "sessionKey": "...", "state": "final" } }

// 异常时：
{ "type": "event", "event": "chat",
  "payload": { "runId": "...", "sessionKey": "...",
               "state": "error", "errorMessage": "..." } }

// chat.abort 取消时：
{ "type": "event", "event": "chat",
  "payload": { "runId": "...", "sessionKey": "...", "state": "aborted" } }
```

**重要**：`content` 中的 `text` 建议用**累积文本**而不是增量片段，UI 渲染更稳定（取决于 UI 的处理逻辑，如发现重叠可改为增量）。

---

#### `chat.abort`
```
req.params: { sessionKey: string, runId?: string }
res.payload: { ok: true }
```
实现：在 Gateway 层用 `asyncio.Event` 或 `dict` 记录「当前 runId 对应的 cancel flag」；`on_token` 回调里检查 flag，若置位则抛 `CancelledError` 跳出循环，之后推 `state: "aborted"`。

---

### 3.2 中优先级（会话管理完整）

#### `sessions.patch`
```
req.params: { key: string, label?: string | null, thinkingLevel?: string | null }
res.payload: { ok: true }
```
仅 label 有意义时写入 session JSON；其他字段直接 ok。

#### `sessions.delete`
```
req.params: { key: string, deleteTranscript: boolean }
res.payload: { ok: true }
```
实现：删内存 `_mem[key]` + 删对应 JSON 文件。

---

### 3.3 必须 stub（UI 启动时会调用，不实现会报错）

以下方法返回固定空结构即可，不影响聊天核心功能：

| 方法 | 最小合法响应 |
|------|------------|
| `config.get` | `{ path: "", exists: false, raw: "", valid: true, config: {}, issues: [] }` |
| `skills.status` | `{ workspaceDir: "", managedSkillsDir: "", skills: [] }` |
| `cron.status` | `{ enabled: false, jobs: 0 }` |
| `node.list` | `{ nodes: {} }` |
| `models.list` | `{ models: [] }` |
| `health` | `{ ok: true }` |
| `status` | `{ ok: true }` |
| `last-heartbeat` | `{}` |
| `system-presence` | `[]` |
| `agents.list` | `{ defaultId: "version3", mainKey: "main", scope: "global", agents: [{ id: "version3", name: "Version3 助手" }] }` |
| `device.pair.list` | `{ pending: [], paired: [] }` |
| `exec.approvals.get` | `{ path: "", exists: false, hash: "", file: {} }` |

---

## 四、文件上传支持（可选）

OpenClaw UI 支持在 `chat.send` 里带 `attachments`（base64 图片）。**version3 控制台已实现**：聊天输入区有「上传 Excel/PDF」按钮，调用 `POST /api/quotation/upload`（支持 .xlsx/.xls/.xlsm/.pdf），上传后在发送下一条消息时自动带 `params.context: { file_path }`。

```
POST /api/quotation/upload     （version3 已有，支持 Excel + PDF）
  → { file_path, file_name }

控制台：上传后 state.chatUploadedFile 保存路径，sendChatMessage 时传入 chat.send 的 context/file_path。
```

---

## 五、目录结构与构建

### 5.1 目录布局

```
Agent Team version3/
├── backend/
│   └── ws_gateway/
│       ├── __init__.py
│       ├── gateway.py          # FastAPI WebSocket 路由，帧分发
│       ├── handlers/
│       │   ├── connect.py      # 握手
│       │   ├── chat.py         # chat.send / chat.history / chat.abort
│       │   ├── sessions.py     # sessions.list / patch / delete
│       │   ├── agent.py        # agent.identity.get / agents.list
│       │   └── stubs.py        # 所有 stub 方法统一返回
│       └── run_store.py        # 进行中的 runId → cancel_event 映射
├── control-ui/                 # OpenClaw UI 源码（完整拷贝）
│   ├── src/
│   ├── package.json
│   └── vite.config.ts          # 修改 WS_URL 指向 ws://localhost:8000/ws
└── run_backend.py              # 启动时挂载 /ws 路由 + 静态 control-ui/dist
```

### 5.2 UI 构建步骤

```bash
# 1. 拷贝 UI
cp -r "学习案例/openclaw/ui/" "Agent Team version3/control-ui/"

# 2. 修改连接 URL（control-ui/src 里找 GatewayBrowserClientOptions 的 url 配置）
#    通常在 src/config.ts 或 src/gateway-client.ts，改为：
#    url: "ws://localhost:8000/ws"
#    或通过 VITE_GATEWAY_URL 环境变量注入

# 3. 构建
cd "Agent Team version3/control-ui"
npm install
npm run build          # 产出 dist/

# 4. 在 run_backend.py 里挂载静态目录
app.mount("/", StaticFiles(directory="control-ui/dist", html=True), name="ui")
```

### 5.3 run_backend.py 改动

```python
from fastapi.staticfiles import StaticFiles
from backend.ws_gateway.gateway import router as ws_router

app.include_router(ws_router)       # 添加 /ws WebSocket 路由
app.mount("/", StaticFiles(directory="control-ui/dist", html=True), name="ui")
```

---

## 六、Gateway 核心实现骨架

### 6.1 gateway.py

```python
import asyncio, json, uuid
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

@router.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    # 1. 握手：推送 challenge
    await ws.send_text(json.dumps({
        "type": "event", "event": "connect.challenge",
        "payload": {"nonce": str(uuid.uuid4())}
    }))
    try:
        while True:
            raw = await ws.receive_text()
            frame = json.loads(raw)
            if frame.get("type") == "req":
                asyncio.create_task(handle_req(ws, frame))
    except WebSocketDisconnect:
        pass
```

### 6.2 chat.py（chat.send 流式核心）

```python
import asyncio, uuid, json
from backend.core.single_agent.agent import SingleAgent
from backend.ws_gateway.run_store import RunStore   # { run_id: cancel_event }

async def handle_chat_send(ws, params, agent: SingleAgent, run_store: RunStore):
    session_key = params["sessionKey"]
    message = params["message"]
    run_id = str(uuid.uuid4())
    cancel_event = asyncio.Event()
    run_store.register(run_id, cancel_event)

    accumulated = ""

    def on_token(token: str):
        nonlocal accumulated
        if cancel_event.is_set():
            raise asyncio.CancelledError()
        accumulated += token
        asyncio.get_event_loop().call_soon_threadsafe(
            lambda: asyncio.ensure_future(ws.send_text(json.dumps({
                "type": "event", "event": "chat",
                "payload": {
                    "runId": run_id, "sessionKey": session_key,
                    "state": "delta",
                    "message": {
                        "role": "assistant",
                        "content": [{"type": "text", "text": accumulated}]
                    }
                }
            })))
        )

    try:
        result = await agent.execute_react(
            user_input=message,
            session_id=session_key,
            on_token=on_token,
        )
        state = "aborted" if cancel_event.is_set() else "final"
    except asyncio.CancelledError:
        state = "aborted"
    except Exception as e:
        await ws.send_text(json.dumps({
            "type": "event", "event": "chat",
            "payload": {"runId": run_id, "sessionKey": session_key,
                        "state": "error", "errorMessage": str(e)}
        }))
        return
    finally:
        run_store.unregister(run_id)

    await ws.send_text(json.dumps({
        "type": "event", "event": "chat",
        "payload": {"runId": run_id, "sessionKey": session_key, "state": state}
    }))

    return {"ok": True, "runId": run_id}
```

> **注意**：`on_token` 在 `asyncio.to_thread`（流式 LLM 调用）的子线程里触发，不能直接 `await`，需用 `call_soon_threadsafe` 转回事件循环。

### 6.3 stubs.py

```python
STUB_RESPONSES = {
    "config.get":       { "path": "", "exists": False, "valid": True, "config": {}, "issues": [] },
    "skills.status":    { "workspaceDir": "", "managedSkillsDir": "", "skills": [] },
    "cron.status":      { "enabled": False, "jobs": 0 },
    "node.list":        { "nodes": {} },
    "models.list":      { "models": [] },
    "health":           { "ok": True },
    "status":           { "ok": True },
    "last-heartbeat":   {},
    "system-presence":  [],
    "device.pair.list": { "pending": [], "paired": [] },
    "exec.approvals.get": { "path": "", "exists": False, "hash": "", "file": {} },
    "agents.list": {
        "defaultId": "version3", "mainKey": "main", "scope": "global",
        "agents": [{"id": "version3", "name": "Version3 助手",
                    "identity": {"emoji": "🤖", "name": "Version3 助手"}}]
    },
}

def handle_stub(method: str):
    return STUB_RESPONSES.get(method, {})
```

---

## 七、实施顺序

| 步 | 内容 | 预计时间 |
|----|------|---------|
| 1 | 搭 WebSocket 路由骨架 + 握手（connect.challenge → hello-ok） | 1h |
| 2 | 实现所有 stub（返回固定空结构），能让 UI 启动不报错 | 30min |
| 3 | `agent.identity.get` + `agents.list`（硬编码）| 15min |
| 4 | `sessions.list` + `chat.history`（读 SessionStore）| 45min |
| 5 | `chat.send`（核心：on_token 流式推送 delta/final）| 2h |
| 6 | 验证：UI 打开 → 选会话 → 发消息 → 流式显示 | 30min |
| 7 | `chat.abort` + `sessions.delete` + `sessions.patch` | 1h |
| 8 | 拷贝 UI + 配置 URL + npm build + 挂载静态 | 1h |

总计：约 **7 小时**可完成核心可用版本。

---

## 八、已知坑与注意事项

1. **on_token 跨线程**：LLM 流式调用在 `asyncio.to_thread` 里跑，`on_token` 触发时不在事件循环线程，必须用 `loop.call_soon_threadsafe` 或 `asyncio.run_coroutine_threadsafe`，不能直接 `await ws.send_text`。

2. **seq 顺序号**：UI 代码有 gap 检测，如果推送的 event 带了 `seq` 但顺序乱了会触发 `onGap`。简单做法：所有 event **不带 seq 字段**，UI 只在有 seq 时才检测 gap。

3. **hello-ok 格式**：UI 期望 `res.payload.type === "hello-ok"`，且 `features.methods` 里有已实现的方法名，建议把全部已实现方法都列进去，避免 UI 因不认识方法而禁用某些功能。

4. **sessions.list 的 kind 字段**：UI 可能按 `kind: "direct"` 过滤，确保返回正确值。`kind: "global"` 的 session 通常是 main session，会被特殊处理。

5. **chat.history 的 limit**：UI 首次拉历史时 limit 通常较大（50-200），但 version3 的 `SessionStore.MAX_TURNS=8`，直接返回全部 turns 即可，不需要实现分页。

6. **UI 配置 URL**：在 `control-ui/src` 里搜 `GatewayBrowserClient` 的初始化或 `ws://` / `wss://`，改为指向本地。大概率在一个 config/env 文件里，不需要改业务逻辑代码。

7. **CORS / 同源**：如果前端和 WS 在同一端口（FastAPI 同时提供静态 + WS），天然同源无问题。如果开发期间前端用 `vite dev`（5173 端口）而后端在 8000，需在 FastAPI 加 `CORSMiddleware` 并允许 WS upgrade。
