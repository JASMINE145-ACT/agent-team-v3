# 库存查询界面异常字符与闪烁修复计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复两个独立 bug —— Bug1：库存查询结果出现异常字符"1"；Bug2：查询过程消息闪烁与重建。

**Architecture:** Bug1 属后端 token 累积问题，在 `on_tool_calls_ready` 回调中清零 accumulated 解决；Bug2 属前端状态切换时序问题，在 `state=final` 时先 push 消息再清空 stream。

**Tech Stack:** Python (FastAPI/psycopg2) / Lit (TypeScript)

---

## Task 1：Bug1 — 后端 accumulated 跨步骤累积导致异常字符

**Files:**
- Modify: `backend/server/gateway/handlers/chat.py`（注册 `on_tool_calls_ready` 回调）
- Test: `tests/test_gateway_chat.py`（或现有 `test_reports_routes.py` 回归）

- [ ] **Step 1: 找到 agent 调用位置，在 callbakcs 字典里注册 `on_tool_calls_ready`**

找到 `chat.py` 中调用 agent 的位置（约 L329）。当前 `callbacks` 字典只含 `on_token` / `on_event` / `push_event`。在该字典中添加：

```python
def on_tool_calls_ready_callback(n: int):
    # LLM 决定调用工具时，清除本步骤之前产生的中间 token
    # 这些文本是推理过程，不应作为用户可见内容保留
    accumulated[0] = ""
    # 可选：记录工具调用意图日志
    # logger.debug("tool_calls_ready callback triggered, accumulated cleared, n=%d", n)

callbacks = {
    "on_token": on_token,
    "on_event": on_event,
    "push_event": push_event,
    "on_tool_calls_ready": on_tool_calls_ready_callback,  # 新增
}
```

- [ ] **Step 2: 验证 agent.py 中 `on_tool_calls_ready` 签名一致**

确认 `backend/core/agent.py` L171 签名为：
```python
on_tool_calls_ready: Optional[Callable] = None,
```
回调入参为 `n: int`（工具调用数量），与上面定义的回调兼容。

- [ ] **Step 3: 运行后端测试确认无回归**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
py -m pytest tests/test_reports_routes.py tests/test_reports_analyzer.py -v -q --tb=short
```

期望：全部 PASS（7+ 用例）

- [ ] **Step 4: 提交**

```bash
git add backend/server/gateway/handlers/chat.py
git commit -m "fix(chat): clear accumulated text on tool_calls_ready to prevent stray tokens"
```

---

## Task 2：Bug2 — 前端 final 状态时序导致闪烁

**Files:**
- Modify: `control-ui/src/ui/controllers/chat.ts`（L271–274 修复顺序）
- Test: `control-ui/src/ui/controllers/chat.test.ts`

- [ ] **Step 1: 修改 `state === "final"` 处理顺序**

找到 `chat.ts` L271–274：
```typescript
} else if (payload.state === "final") {
    state.chatStream = null;
    state.chatRunId = null;
    state.chatStreamStartedAt = null;
}
```

替换为：
```typescript
} else if (payload.state === "final") {
    // 先把最终消息 push 进去，消除 stream 清空时的内容空白
    if (payload.message) {
      state.chatMessages = [
        ...state.chatMessages,
        { ...payload.message, timestamp: Date.now() },
      ];
    }
    state.chatStream = null;
    state.chatRunId = null;
    state.chatStreamStartedAt = null;
}
```

- [ ] **Step 2: 在 `chat.test.ts` 中添加回归测试**

在 `describe("handleChatEvent")` 中添加：

```typescript
test("final state pushes message before clearing stream to prevent flash", () => {
  const { state } = makeState();
  state.chatStream = "some streamed text";
  state.chatRunId = "run-123";

  const result = handleChatEvent(state, {
    type: "event",
    event: "chat",
    payload: {
      runId: "run-123",
      state: "final",
      message: {
        role: "assistant",
        content: [{ type: "text", text: "final answer" }],
      },
    },
  });

  // 消息应该在 stream 清空前就被 push 进去
  assert(state.chatMessages.length === 1);
  assert(state.chatMessages[0].content?.[0]?.text === "final answer");
  // stream 应该被清空
  assert(state.chatStream === null);
  assert(state.chatRunId === null);
});

test("final state with no message still clears stream cleanly", () => {
  const { state } = makeState();
  state.chatStream = "some streamed text";

  handleChatEvent(state, {
    type: "event",
    event: "chat",
    payload: { runId: "run-123", state: "final", message: null },
  });

  assert(state.chatStream === null);
  assert(state.chatMessages.length === 0); // 无消息不应追加
});
```

- [ ] **Step 3: 运行前端测试**

```bash
cd "d:/Projects/agent-jk/Agent Team version3/control-ui"
npx tsc --noEmit src/ui/controllers/chat.ts
# 若有 playwright: npx playwright test src/ui/controllers/chat.test.ts
```

期望：类型检查通过

- [ ] **Step 4: 提交**

```bash
git add control-ui/src/ui/controllers/chat.ts
git add control-ui/src/ui/controllers/chat.test.ts
git commit -m "fix(chat-ui): push final message before clearing stream to eliminate flash"
```

---

## 自检

### Spec 覆盖

| 要求 | Task |
|------|------|
| Bug1：`on_tool_calls_ready` 时 accumulated 清零 | Task 1 |
| Bug2：`state=final` 时先 push 再清 stream | Task 2 |
| 后端 7+ 回归用例全绿 | Task 1 |
| 前端类型检查通过 | Task 2 |

### 改动独立性与风险

| Task | 风险 | 说明 |
|------|------|------|
| Task 1 | 低 | 纯加回调，不改变现有 token 累积逻辑 |
| Task 2 | 低 | 仅调换操作顺序，不改变数据结构 |

两个 Task 互不依赖，可并行。

### 工作量估算

| Task | 预计时间 |
|------|---------|
| Task 1: Bug1 accumulated | 20 min |
| Task 2: Bug2 闪烁修复 | 15 min |
| **合计** | **~35 min** |

### 验收标准

- [ ] Bug1：GLM 等模型先吐"1"再发 tool_call 时，界面不再出现孤立"1"
- [ ] Bug2：final 状态切换时，工具卡片与最终结果之间无空白闪烁
- [ ] 后端 7+ 回归用例全绿
- [ ] 前端 `npx tsc --noEmit` 无错误

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-30-chat-stream-bugfix.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**