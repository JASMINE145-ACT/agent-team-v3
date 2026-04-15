# OCR–Chat 融合体验 — Design Spec

**Date:** 2026-04-14  
**Status:** Approved  
**Files affected:**
- `backend/server/api/routes_chat.py`
- `backend/server/gateway/handlers/chat.py`
- `backend/plugins/jagent/skills.py`
- `control-ui/src/ui/chat/message-extract.ts`
- `control-ui/src/ui/chat/grouped-render.ts`
- `control-ui/src/ui/views/chat.ts`
- `control-ui/src/ui/app-gateway.ts`
- `control-ui/src/ui/app-view-state.ts`

---

## 1. Problem

当前图片识别流程在前端产生四种割裂感：

| 层面 | 现状 |
|------|------|
| **视觉** | 用户消息气泡同时显示图片缩略图 + 大段原始 OCR 文字 dump，排版混乱 |
| **交互** | OCR 在后端同步执行，前端没有任何"识别中…"反馈，像黑盒 |
| **认知** | 用户看不到 OCR 卡片，无法确认识别是否准确 |
| **AI 行为** | LLM 固定先列出识别内容再询问意图，即使用户已附带明确指令 |

根本原因：OCR 文字被直接注入 user message，既污染了用户气泡，又让 LLM 不得不"先描述后行动"。

---

## 2. Goal

- 用户气泡：极简（图片 + 用户文字，OCR 文字不可见）
- OCR 结果：以独立卡片形式推送给用户（SSE push，不经过 LLM）
- 发送中状态：有图片时显示"识别中…"
- LLM 行为：卡片已展示内容，LLM 专注于行动，不重复列出识别内容

---

## 3. Architecture

```
用户发图片（有/无文字）
    ↓ frontend: queue item 显示 🔍 识别中…
    ↓ backend: OCR 完成（在 _gen() / 主处理器内部）
    → SSE emit: { type: "ocr_result", text: "<OCR文本>" }
    → frontend: 渲染 OCR 结果卡片（Markdown，独立于消息气泡）
    ↓ backend: 构建注入后 user message → 调用 LLM（不变）
    → LLM 有意图 → 直接执行
    → LLM 无意图 → 一句话询问下一步
前端消息气泡: 图片缩略图 + "已识别 ✓" 徽章 + 用户文字（OCR 部分隐藏）
```

---

## 4. Design

### 4.1 后端：OCR 结果 SSE 推送

#### `backend/server/api/routes_chat.py` — 流式端点

**当前问题**：OCR 在 `_gen()` 启动前执行，无法 yield SSE 事件。

**修改**：将 OCR 逻辑整体移进 `_gen()` 内部，在 OCR 完成后 yield `ocr_result` 事件，再构建 user message、调用 LLM。

```python
# 在 _gen() 内部，位于 yield confirmation 之后、执行 LLM 之前：
if image_attachments_stream:
    ocr_text, ocr_err = await asyncio.to_thread(
        run_ocr_for_attachments, image_attachments_stream, max_size, api_key, base_url, ocr_model
    )
    if ocr_err:
        yield f'data: {json.dumps({"type": "error", "message": ocr_err}, ensure_ascii=False)}\n\n'
        return
    # 推送 OCR 结果卡片
    yield f'data: {json.dumps({"type": "ocr_result", "text": ocr_text}, ensure_ascii=False)}\n\n'
    # 构建注入后 user message（不变）
    query_text = f"{query_text}\n\n【以下为上传图片的识别结果】\n{ocr_text}" if query_text else f"【以下为上传图片的识别结果】\n{ocr_text}"
# 正常调用 LLM...
```

原 `_gen()` 之前的 OCR 代码段删除；原有错误返回逻辑（未配置 API Key 等）保留，移至 `_gen()` 内。

#### `backend/server/gateway/handlers/chat.py` — WebSocket/Gateway 通道

Gateway handler 已有 `send_event` 可直接推事件，不需要移动 OCR 位置。在现有 OCR 成功逻辑后添加：

```python
# 在 user_input 注入赋值之前：
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

---

### 4.2 前端：OCR 文字过滤 + 已识别徽章

#### `control-ui/src/ui/chat/message-extract.ts`

新增两个纯函数（无副作用，易测试）：

```typescript
const OCR_MARKER = "【以下为上传图片的识别结果】";

/** 判断消息文本是否包含 OCR 注入块 */
export function hasOcrBlock(text: string): boolean {
  return text.includes(OCR_MARKER);
}

/** 去除 OCR 注入块，返回用户原始文字（trimmed） */
export function stripOcrBlock(text: string): string {
  const idx = text.indexOf(OCR_MARKER);
  if (idx === -1) return text;
  return text.slice(0, idx).trim();
}
```

#### `control-ui/src/ui/chat/grouped-render.ts`

在 `renderMessageContent()` 中，对 role=user 的消息：

1. 提取原始 text → 检测 `hasOcrBlock`
2. 传给 Markdown 渲染的文字改为 `stripOcrBlock(text)`
3. 若 `hasOcrBlock && images.length > 0`，在图片旁渲染"已识别 ✓"小徽章：

```typescript
// 在 renderMessageImages 后插入（仅 user role 且 hasOcrBlock）
html`<span class="chat-ocr-badge">已识别 ✓</span>`
```

---

### 4.3 前端：发送中"识别中…"状态

#### `control-ui/src/ui/views/chat.ts`

`ChatQueueItem` 已有 `attachments?: ChatAttachment[]`。在 queue item 渲染时：

```typescript
// 原来：显示 item.text
// 改为：
item.attachments?.length
  ? html`<span class="chat-queue__ocr-status">🔍 识别中…</span>`
  : item.text || ""
```

---

### 4.4 前端：接收 `ocr_result` SSE 事件

#### `control-ui/src/ui/app-view-state.ts`

新增状态字段：

```typescript
export type OcrResultCard = {
  id: string;        // 唯一 ID（用于 repeat key）
  text: string;      // OCR 原始文本（Markdown 格式）
  createdAt: number; // timestamp
};

// 在 AppViewState 中添加：
ocrResultCards: OcrResultCard[];
```

初始值：`ocrResultCards: []`

#### `control-ui/src/ui/app-gateway.ts`

在 SSE/WebSocket 事件处理中识别 `ocr_result`：

```typescript
// 在现有 event 分发逻辑中添加：
if (eventType === "ocr_result" || payload?.event === "ocr_result") {
  const text = (payload.text || payload.payload?.text || "") as string;
  if (text) {
    state.ocrResultCards = [
      ...state.ocrResultCards,
      { id: `ocr-${Date.now()}`, text, createdAt: Date.now() },
    ];
    host.requestUpdate();
  }
}
```

新 run 开始时清空 `ocrResultCards`（与 `toolRenderItems` 的清理时机一致）。

#### `control-ui/src/ui/views/chat.ts`

在 `buildChatItems()` 中，将 `ocrResultCards` 插入 chat thread，位于当前 streaming indicator 之前：

```typescript
// OcrResultCard 作为独立 chat item 类型
{ kind: "ocr-result", card: OcrResultCard, key: card.id }
```

渲染：

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

---

### 4.5 Agent Prompt 规则

#### `backend/plugins/jagent/skills.py`

在图片/OCR 相关技能段（或通用规则段）添加：

```
## 图片识别
用户消息中出现【以下为上传图片的识别结果】时，识别内容已通过卡片单独展示给用户，无需重复列出。
- 消息含用户意图（如"查库存"、"报价"、"帮我找"）→ 直接执行，忽略上方 OCR 文字的格式
- 消息无用户文字（只有识别结果）→ 用一句话询问"您想对以上内容做什么？"
- 禁止将 OCR 原始文字原样回显
```

---

## 5. What Does NOT Change

- `backend/core/glm_ocr.py` — 不改（OCR 函数本身不变）
- `backend/wecom_bot/client.py` — 不改（WeCom 通道无 SSE，保持原注入逻辑）
- `/api/query`（非流式端点）— 不改（不支持 SSE，OcrResultCard 仅适用于流式）
- `call_zhipu_ocr()` / `call_zhipu_vision_ocr()` — 不改
- OCR 注入格式 `【以下为上传图片的识别结果】` — 保留（LLM 侧仍依赖此格式）
- Session 历史中 user message 包含 OCR 文字 — 保留（仅前端显示过滤）

---

## 6. Rollback

- **前端**：删除 `stripOcrBlock` 调用，恢复原始文字渲染即可
- **后端 routes_chat.py**：将 OCR 逻辑移回 `_gen()` 之前（git revert 即可）
- **skills.py**：删除图片识别规则段

---

## 7. Out of Scope

- WeCom 通道的 OCR 卡片展示（WeCom 无 SSE，需单独设计）
- `/api/query` 非流式端点的 OCR 卡片（不支持 SSE push）
- OCR 结果的结构化解析（目前 push 原始 Markdown 文本，前端 Markdown 渲染处理表格）
- 用户可编辑/纠正 OCR 结果（可作为后续功能）
- OCR 失败时的优雅降级 UI（当前保持 error SSE 逻辑不变）
