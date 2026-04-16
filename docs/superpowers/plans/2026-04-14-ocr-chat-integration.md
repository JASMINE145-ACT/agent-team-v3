# OCR–Chat 融合体验 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 OCR 识别结果以 SSE 卡片推送给前端，同时过滤用户消息气泡中的 OCR 注入文字，实现图片识别→AI 回答的流畅一体化体验。

**Architecture:** 后端（gateway handler 已有 `send_event`，routes_chat 需将 OCR 移入 `_gen()` 内部以支持 SSE yield）在 OCR 完成后推送 `ocr_result` 事件；前端接收后渲染独立 OCR 卡片，并在历史消息气泡中过滤掉 OCR 注入文字、显示"已识别 ✓"徽章；LLM Prompt 注入规则告知 AI 不重复列出 OCR 内容。

**Tech Stack:** Python (FastAPI/asyncio, SSE), TypeScript (Lit/vanilla TS), 无新依赖

---

## File Map

| 文件 | 变更类型 | 职责 |
|------|---------|------|
| `control-ui/src/ui/chat/message-extract.ts` | Modify | 新增 `hasOcrBlock` / `stripOcrBlock` 纯函数 |
| `control-ui/src/ui/chat/grouped-render.ts` | Modify | 渲染时过滤 OCR 文字 + 插入"已识别 ✓"徽章 |
| `control-ui/src/ui/app-tool-stream.ts` | Modify | 新增 `OcrResultCard` 类型；`resetToolRender` **不**清空 `ocrResultCards`（新发送时在 `app-chat.ts` 清空，卡片保留至本回合结束） |
| `control-ui/src/ui/types/chat-types.ts` | Modify | `ChatItem` 联合类型新增 `ocr-result` kind |
| `control-ui/src/ui/app-view-state.ts` | Modify | `AppViewState` 新增 `ocrResultCards: OcrResultCard[]` |
| `control-ui/src/ui/app.ts` | Modify | 新增 `@state() ocrResultCards` |
| `control-ui/src/ui/app-gateway.ts` | Modify | `handleGatewayEventUnsafe` 处理 `ocr_result` 事件 |
| `control-ui/src/ui/views/chat.ts` | Modify | 队列项显示"识别中…"；`buildChatItems` 插入 OCR 卡片；渲染 `ocr-result` kind |
| `backend/server/gateway/handlers/chat.py` | Modify | OCR 成功后 `send_event` 推送 `ocr_result` |
| `backend/server/api/routes_chat.py` | Modify | 将 OCR 逻辑移入 `_gen()` 内部，yield `ocr_result` SSE 事件 |
| `backend/plugins/jagent/skills.py` | Modify | 添加图片识别行为规则到 Prompt |

---

### Task 1: `message-extract.ts` — OCR 文本工具函数

**Files:**
- Modify: `control-ui/src/ui/chat/message-extract.ts`

- [x] **Step 1: 阅读现有文件**

Run: `cat control-ui/src/ui/chat/message-extract.ts`（或用 Read 工具）

确认现有导出：`extractText`, `extractTextCached`，文件末尾追加即可。

- [x] **Step 2: 追加两个纯函数**

在文件末尾追加：

```typescript
// OCR block detection & stripping
const OCR_MARKER = "【以下为上传图片的识别结果】";

/** Returns true if the message text contains an OCR-injected block. */
export function hasOcrBlock(text: string): boolean {
  return text.includes(OCR_MARKER);
}

/**
 * Returns the user's original text with the OCR block removed.
 * Trims trailing whitespace. Returns the original string unchanged
 * if no OCR marker is found.
 */
export function stripOcrBlock(text: string): string {
  const idx = text.indexOf(OCR_MARKER);
  if (idx === -1) return text;
  return text.slice(0, idx).trim();
}
```

- [x] **Step 3: 在浏览器控制台或 Node REPL 手工验证（无测试框架时）**

如果项目有 Vitest / Jest，创建测试文件 `control-ui/src/ui/chat/message-extract.test.ts`：

```typescript
import { hasOcrBlock, stripOcrBlock } from "./message-extract";

const MARKER = "【以下为上传图片的识别结果】";

describe("hasOcrBlock", () => {
  it("returns true when OCR marker present", () => {
    expect(hasOcrBlock(`你好\n\n${MARKER}\nsome ocr text`)).toBe(true);
  });
  it("returns false when no marker", () => {
    expect(hasOcrBlock("plain message")).toBe(false);
  });
  it("returns false for empty string", () => {
    expect(hasOcrBlock("")).toBe(false);
  });
});

describe("stripOcrBlock", () => {
  it("removes marker and everything after", () => {
    const input = `user message\n\n${MARKER}\nocr line 1\nocr line 2`;
    expect(stripOcrBlock(input)).toBe("user message");
  });
  it("returns original when no marker", () => {
    expect(stripOcrBlock("no marker")).toBe("no marker");
  });
  it("returns empty string when message is only the marker", () => {
    expect(stripOcrBlock(`${MARKER}\nocr text`)).toBe("");
  });
  it("trims trailing whitespace from user text", () => {
    expect(stripOcrBlock(`hello   \n\n${MARKER}\nocr`)).toBe("hello");
  });
});
```

Run: `cd control-ui && npx vitest run src/ui/chat/message-extract.test.ts`  
Expected: all tests PASS (if no test runner skip this step, verify manually in Step 4)

- [x] **Step 4: 确认 TypeScript 编译无错误**

Run: `cd control-ui && npx tsc --noEmit`  
Expected: 0 errors

- [x] **Step 5: Commit**

```bash
git add control-ui/src/ui/chat/message-extract.ts
git add control-ui/src/ui/chat/message-extract.test.ts 2>/dev/null || true
git commit -m "feat: add hasOcrBlock/stripOcrBlock pure functions to message-extract"
```

---

### Task 2: `grouped-render.ts` — 过滤 OCR 文字 + "已识别 ✓" 徽章

**Files:**
- Modify: `control-ui/src/ui/chat/grouped-render.ts`

- [x] **Step 1: 阅读文件，定位渲染入口**

Read `control-ui/src/ui/chat/grouped-render.ts`。

找到 `renderMessageContent()` 函数（约 280 行）。识别：
- 提取 message text 的位置
- `renderMessageImages()` 调用的位置
- 向 Markdown 渲染传入 text 的位置

- [x] **Step 2: 添加 import**

在文件顶部 import 区域追加（确保与现有 import 风格一致）：

```typescript
import { hasOcrBlock, stripOcrBlock } from "./message-extract";
```

- [x] **Step 3: 修改 `renderMessageContent()` 中的 user role 分支**

在 user message 的文字渲染处，将原来直接使用 `text` 替换为过滤后的版本，并添加徽章：

```typescript
// 在 renderMessageContent() 内，role === "user" 分支：
// 原来:
//   const displayText = text;
// 改为：
const ocrPresent = hasOcrBlock(text);
const displayText = ocrPresent ? stripOcrBlock(text) : text;

// 在 renderMessageImages(...) 调用之后，追加徽章（仅当有图片且有 OCR 块时）：
// 将：
//   ${renderMessageImages(images)}
//   ${markdownHtml}
// 改为：
//   ${renderMessageImages(images)}
//   ${ocrPresent && images.length > 0
//       ? html`<span class="chat-ocr-badge">已识别 ✓</span>`
//       : ""}
//   ${markdownHtml}  // 此处 markdownHtml 使用 displayText 而非原始 text
```

**注意**：实际修改时要看清楚函数内的变量名和模板语法，下面是完整的修改意图：
1. 计算 `ocrPresent` 和 `displayText`
2. 把 `displayText` 传给 Markdown 渲染（替换原来的 `text`）
3. 在图片之后，Markdown 之前，条件渲染徽章

- [x] **Step 4: 确认 TypeScript 编译**

Run: `cd control-ui && npx tsc --noEmit`  
Expected: 0 errors

- [x] **Step 5: Commit**

```bash
git add control-ui/src/ui/chat/grouped-render.ts
git commit -m "feat: filter OCR block from user bubble and add 已识别✓ badge"
```

---

### Task 3: 队列项"识别中…"状态

**Files:**
- Modify: `control-ui/src/ui/views/chat.ts`

- [x] **Step 1: 找到队列项渲染代码**

在 `chat.ts` 中搜索 `ChatQueueItem` 或 queue 渲染部分（`item.text` 或 `attachments`）。

队列项结构：`{ text?: string; attachments?: ChatAttachment[] }`

- [x] **Step 2: 修改队列项文字显示**

找到渲染 queue item 文字的地方，改为：

```typescript
// 原来：item.text || ""
// 改为：
item.attachments?.length
  ? html`<span class="chat-queue__ocr-status">🔍 识别中…</span>`
  : item.text || ""
```

- [x] **Step 3: 确认 TypeScript 编译**

Run: `cd control-ui && npx tsc --noEmit`  
Expected: 0 errors

- [x] **Step 4: Commit**

```bash
git add control-ui/src/ui/views/chat.ts
git commit -m "feat: show 识别中… spinner on queue items with image attachments"
```

---

### Task 4: 类型基础设施 — `OcrResultCard` + `ChatItem` + `AppViewState` + `app.ts` state

**Files:**
- Modify: `control-ui/src/ui/app-tool-stream.ts`
- Modify: `control-ui/src/ui/types/chat-types.ts`
- Modify: `control-ui/src/ui/app-view-state.ts`
- Modify: `control-ui/src/ui/app.ts`

- [x] **Step 1: 在 `app-tool-stream.ts` 添加 `OcrResultCard` 类型；`resetToolRender` 行为说明**

阅读 `app-tool-stream.ts`，找到 `resetToolRender` 函数（约 line 167）和类型定义区域。

在现有类型定义区域（靠近 `CandidatesPreviewItem` 等）添加：

```typescript
export type OcrResultCard = {
  id: string;        // unique key for repeat rendering
  text: string;      // raw OCR text (Markdown)
  createdAt: number; // Date.now() timestamp
};
```

**实现说明（与初版 plan 差异）**：`resetToolRender()` **不**清空 `ocrResultCards`（避免回合结束时卡片被抹掉）；清空发生在用户**新发送**（`app-chat.ts`）、**重连 hello**（`app-gateway.ts`）、**/new 会话** 等时机。`resetToolRender` 内保留注释说明即可。

- [x] **Step 2: 在 `chat-types.ts` 扩展 `ChatItem` 联合类型**

阅读 `control-ui/src/ui/types/chat-types.ts`，找到 `ChatItem` 类型定义。

在联合类型末尾添加：

```typescript
| { kind: "ocr-result"; key: string; card: OcrResultCard }
```

确保 `OcrResultCard` 从 `app-tool-stream.ts` 导入（或将类型移到 `chat-types.ts`，保持与项目现有模式一致）。

- [x] **Step 3: 在 `app-view-state.ts` 添加 `ocrResultCards` 字段**

阅读 `app-view-state.ts`，找到 `AppViewState` 接口/类型（含 `candidatePreviews` 的那行）。

添加：

```typescript
ocrResultCards: OcrResultCard[];
```

同时确保初始值（`initialAppViewState` 或等效的初始化对象）中设置：

```typescript
ocrResultCards: [],
```

- [x] **Step 4: 在 `app.ts` 添加 `@state()` 装饰器字段**

阅读 `app.ts`，找到 `@state() candidatePreviews` 所在位置（约 line 487-490）。

紧跟其后添加：

```typescript
@state() ocrResultCards: OcrResultCard[] = [];
```

确认 `OcrResultCard` 已从正确路径导入。

- [x] **Step 5: 确认 TypeScript 编译**

Run: `cd control-ui && npx tsc --noEmit`  
Expected: 0 errors（此步骤后 `app-gateway.ts` 和 `chat.ts` 的后续修改可能报错，若有先记录，Task 5 会修复）

- [x] **Step 6: Commit**

```bash
git add control-ui/src/ui/app-tool-stream.ts \
        control-ui/src/ui/types/chat-types.ts \
        control-ui/src/ui/app-view-state.ts \
        control-ui/src/ui/app.ts
git commit -m "feat: add OcrResultCard type, ChatItem kind, AppViewState field and @state"
```

---

### Task 5: Gateway 事件处理 + OCR 卡片渲染

**Files:**
- Modify: `control-ui/src/ui/app-gateway.ts`
- Modify: `control-ui/src/ui/views/chat.ts`

- [x] **Step 1: 在 `app-gateway.ts` 中处理 `ocr_result` 事件**

阅读 `app-gateway.ts`，找到 `handleGatewayEventUnsafe()` 函数（约 line 223）中的事件分发 switch/if 链（`evt.event` 的判断）。

在现有 case 之后（如 `"cron"` 处理之后）添加：

```typescript
if (evt.event === "ocr_result") {
  const text = (evt.payload?.text ?? "") as string;
  if (text) {
    host.ocrResultCards = [
      ...host.ocrResultCards,
      { id: `ocr-${Date.now()}`, text, createdAt: Date.now() },
    ];
    host.requestUpdate();
  }
  return;
}
```

**注意**：同时处理 SSE 直接事件格式（`type === "ocr_result"`），如果 routes_chat.py 的 SSE 流也通过 gateway 路由：

```typescript
// 如果 SSE 事件格式是 { type: "ocr_result", text: "..." }
if (eventType === "ocr_result") {
  const text = (payload?.text ?? "") as string;
  if (text) {
    host.ocrResultCards = [
      ...host.ocrResultCards,
      { id: `ocr-${Date.now()}`, text, createdAt: Date.now() },
    ];
    host.requestUpdate();
  }
  return;
}
```

根据实际代码结构选择正确的分支（可能两者都需要）。

- [x] **Step 2: 在 `views/chat.ts` 中更新 `ChatProps`**

找到 `ChatProps` 接口（或等效的 props 定义），添加：

```typescript
ocrResultCards?: OcrResultCard[];
```

- [x] **Step 3: 在 `buildChatItems()` 中插入 OCR 卡片**

阅读 `buildChatItems()`（约 line 703），找到 `candidatePreviews` 插入逻辑（约 line 952-959，位于 stream/reading-indicator 之前）。

在 candidatePreviews 插入之后、streaming indicator 之前，追加 OCR 卡片：

```typescript
// 在 candidatePreviews 插入逻辑之后：
for (const card of props.ocrResultCards ?? []) {
  items.push({ kind: "ocr-result", key: card.id, card });
}
```

- [x] **Step 4: 渲染 `ocr-result` kind**

在渲染函数（`renderChatItem()` 或等效函数）中，添加 `ocr-result` 分支：

```typescript
if (item.kind === "ocr-result") {
  return html`
    <div class="chat-ocr-card">
      <div class="chat-ocr-card__label">📄 图片识别结果</div>
      <div class="chat-ocr-card__body">
        ${unsafeHTML(toSanitizedMarkdownHtml(item.card.text))}
      </div>
    </div>
  `;
}
```

确认 `toSanitizedMarkdownHtml` 和 `unsafeHTML` 已在文件中导入（参照现有 `candidates-preview` 的渲染方式）。

- [x] **Step 5: 在调用 `buildChatItems()` / `<chat-view>` 的地方传入 `ocrResultCards`**

找到调用 `buildChatItems(props)` 或 `<chat-view .ocrResultCards=...>` 的地方，传入 `this.ocrResultCards`：

```typescript
// 在 app.ts 或 chat 视图的 render() 中：
ocrResultCards: this.ocrResultCards,
```

- [x] **Step 6: 确认 TypeScript 编译**

Run: `cd control-ui && npx tsc --noEmit`  
Expected: 0 errors

- [x] **Step 7: Commit**

```bash
git add control-ui/src/ui/app-gateway.ts \
        control-ui/src/ui/views/chat.ts
git commit -m "feat: handle ocr_result gateway event and render OCR card in chat thread"
```

---

### Task 6: 后端推送 — Gateway Handler + Routes Chat `_gen()` 重构

**Files:**
- Modify: `backend/server/gateway/handlers/chat.py`
- Modify: `backend/server/api/routes_chat.py`

- [x] **Step 1: 阅读 `gateway/handlers/chat.py` 中的 OCR 逻辑**

阅读文件，找到 `handle_chat_send()` 函数（约 line 113）。
定位 OCR 代码块（约 line 148-184）和 `send_event` 已有的调用方式。

- [x] **Step 2: 在 `chat.py` OCR 成功后添加 `send_event` 推送**

在 `user_input` 的 OCR 注入赋值之后（原 line 184 附近），找到 `ocr_text` 变量赋值完成的位置，添加：

```python
# 紧接 user_input OCR 注入之后，language detection 之前：
await send_event({
    "type": "event",
    "event": "ocr_result",
    "payload": {
        "runId": run_id,
        "sessionKey": session_key,
        "text": ocr_text,
    },
})
```

确认 `run_id`, `session_key`, `ocr_text` 在此作用域内均已定义。

- [x] **Step 3: 阅读 `routes_chat.py` — 定位 OCR 代码块和 `_gen()` 边界**

阅读 `backend/server/api/routes_chat.py`。

确认：
- OCR 代码块位置（约 line 182-205）：在 `_gen()` 函数启动之前
- `_gen()` 函数定义开始位置（约 line 209）
- `_gen()` 内部 confirmation yield 的位置
- `_gen()` 内部调用 LLM 之前的位置

- [x] **Step 4: 将 OCR 逻辑移入 `_gen()` 内部**

**删除**：`_gen()` 之前的整个 OCR 代码块（约 line 182-205）

**在 `_gen()` 内部**，在 confirmation yield 之后、LLM 调用之前，插入：

```python
# 在 _gen() 内部，yield confirmation 之后：
if image_attachments_stream:
    ocr_text, ocr_err = await asyncio.to_thread(
        run_ocr_for_attachments, image_attachments_stream, max_size, api_key, base_url, ocr_model
    )
    if ocr_err:
        yield f'data: {json.dumps({"type": "error", "message": ocr_err}, ensure_ascii=False)}\n\n'
        return
    # 推送 OCR 结果卡片（不经过 LLM）
    yield f'data: {json.dumps({"type": "ocr_result", "text": ocr_text}, ensure_ascii=False)}\n\n'
    # 构建注入后 user message（保持原格式）
    query_text = (
        f"{query_text}\n\n【以下为上传图片的识别结果】\n{ocr_text}"
        if query_text
        else f"【以下为上传图片的识别结果】\n{ocr_text}"
    )
```

**注意**：
- `image_attachments_stream`、`max_size`、`api_key`、`base_url`、`ocr_model` 必须在 `_gen()` 的闭包或参数中可访问（通过 Python 闭包捕获外层变量，通常已满足）
- 检查这些变量是否在 `_gen()` 外层函数中定义，若是则闭包自动捕获，无需额外传参
- 原来在 `_gen()` 之前的 API Key 未配置等错误处理也应保留（可提前到外层进行参数验证，不影响 `_gen()` 内部逻辑）

- [x] **Step 5: 验证后端启动无错误**

Run: `cd "backend" && python -c "from server.api.routes_chat import router; print('OK')"`  
或启动 dev server 确认无 import 错误。

Expected: 无 syntax error / import error

- [x] **Step 6: 手工测试（如果有本地环境）**

1. 启动后端
2. 前端发送带图片的消息
3. 确认：
   - SSE 流中出现 `ocr_result` 事件
   - 用户消息气泡只显示缩略图 + 原始文字（无 OCR 文字）
   - 聊天线程中出现"📄 图片识别结果"卡片
   - "已识别 ✓"徽章出现在图片旁

- [x] **Step 7: Commit**

```bash
git add backend/server/gateway/handlers/chat.py \
        backend/server/api/routes_chat.py
git commit -m "feat: move OCR into _gen() for SSE push, add ocr_result event in gateway handler"
```

---

### Task 7: Agent Prompt 规则 — `skills.py`

**Files:**
- Modify: `backend/plugins/jagent/skills.py`

- [x] **Step 1: 阅读文件，找到 `CHAT_SKILL_PROMPT_DOC` 组装位置**

阅读 `backend/plugins/jagent/skills.py`，找到 `CHAT_SKILL_PROMPT_DOC`（约 line 411）。

确认现有 section 的格式（`## SectionName\n...`），以便保持一致。

- [x] **Step 2: 追加图片识别规则 section**

在 `CHAT_SKILL_PROMPT_DOC` 字符串的适当位置（建议在文件末尾的 section 中，或紧接现有图片/工具相关规则之后）添加：

```python
# 在 CHAT_SKILL_PROMPT_DOC 的 section 列表中追加：
"""
## 图片识别
用户消息中出现【以下为上传图片的识别结果】时，识别内容已通过卡片单独展示给用户，无需重复列出。
- 消息含用户意图（如"查库存"、"报价"、"帮我找"）→ 直接执行，忽略上方 OCR 文字的格式
- 消息无用户文字（只有识别结果）→ 用一句话询问"您想对以上内容做什么？"
- 禁止将 OCR 原始文字原样回显
"""
```

- [x] **Step 3: 验证 Python import 无错误**

Run: `python -c "from backend.plugins.jagent.skills import CHAT_SKILL_PROMPT_DOC; print(len(CHAT_SKILL_PROMPT_DOC), 'chars')"`  
Expected: 打印字符数，无 SyntaxError

- [x] **Step 4: Commit**

```bash
git add backend/plugins/jagent/skills.py
git commit -m "feat: add OCR image recognition behavior rules to jagent prompt"
```

---

## Self-Review

### Spec coverage check

| Spec 要求 | 对应 Task |
|-----------|----------|
| 用户气泡极简（OCR 文字不可见） | Task 2: `stripOcrBlock` in `grouped-render.ts` |
| OCR 结果卡片推送（SSE，不经过 LLM） | Task 5 (gateway 接收) + Task 6 (backend 推送) |
| 发送中"识别中…"状态 | Task 3: queue item 渲染 |
| LLM 不重复列出 OCR 内容 | Task 7: `skills.py` prompt 规则 |
| "已识别 ✓"徽章 | Task 2: `grouped-render.ts` |
| `OcrResultCard` 类型 | Task 4: 类型基础设施 |
| `ocrResultCards` 清空时机 | Task 4 + `app-chat.ts`：新发送/重连/新会话清空；`resetToolRender` 不清空 |
| Gateway WebSocket 通道支持 | Task 6: `handlers/chat.py` |
| Routes SSE 通道支持（`_gen()` 内部） | Task 6: `routes_chat.py` |
| 纯函数 `hasOcrBlock` / `stripOcrBlock` | Task 1: `message-extract.ts` |

### Placeholder scan

无 TBD / TODO / "实现后续再填"。所有步骤包含完整代码片段。

### Type consistency

- `OcrResultCard` 在 Task 4 定义，Task 5 使用 — 类型名一致
- `kind: "ocr-result"` 在 Task 4 (`chat-types.ts`) 定义，Task 5 (`buildChatItems`/渲染) 使用 — 字符串一致
- `hasOcrBlock` / `stripOcrBlock` 在 Task 1 导出，Task 2 导入 — 函数名一致
- `ocrResultCards` 在 Task 4 (`AppViewState`, `@state()`) 定义，Task 5 传入 `ChatProps`；清空在新发送（`app-chat.ts`）等处，非 `resetToolRender` — 字段名一致

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-14-ocr-chat-integration.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - 每个 Task 派发独立子 Agent，任务间审查，快速迭代

**2. Inline Execution** - 在当前会话中用 executing-plans skill 执行，分批检查点

**Which approach?**
