# Thinking & Reasoning 展示配置

> **Purpose**: 记录前端如何处理 LLM 的内部推理内容（thinking blocks、Plan/Gather/Act 结构等）。

---

## 当前状态：全部推理内容在前端隐藏

LLM 照常 thinking / 输出 Plan/Gather/Act（后端逻辑不变），前端 UI 完全不展示。

---

## 隐藏机制（多层）

### 层 1：原生 API Thinking Block（`type: "thinking"`）

**文件**: `control-ui/src/ui/chat/grouped-render.ts`

```typescript
// extractedThinking 无条件置 null，thinking block 从不渲染
const extractedThinking = null;
```

无论 `chatShowThinking` 设置如何，原生 thinking content block 永不渲染到 UI。

---

### 层 2：文本内推理标签过滤

**文件**: `control-ui/src/shared/text/reasoning-tags.ts`

`extractText`（`message-extract.ts`）在提取 assistant 消息文本时调用 `stripThinkingTags`，后者调用 `stripReasoningTagsFromText`，处理三种格式：

| LLM 实际输出格式 | 触发条件 | 处理方式 |
|-----------------|----------|----------|
| `<think>…</think>` | LLM 遵守了指令 | 标签内整段剥除 |
| `1. Plan / 2. Gather…` | 消息开头匹配 `^(?:###\s*)?1\.` | 整条消息返回 `""`，气泡不渲染 |
| `Reasoning:\n…` | 消息开头是 `Reasoning:` | 剥除推理前缀，保留 `\n\n` 后的结论句 |

**注意**：`^(?:###\s*)?1\.` 只需看到 `1.`（句点）即触发，不等待完整单词 `Plan`，确保流式输出早期 partial token 也被过滤。

---

### 层 3：流式气泡预过滤

**文件**: `control-ui/src/ui/views/chat.ts`（`buildChatItems` 函数）

```typescript
// 用过滤后文本判断是否推 stream 项
const visibleStream = stripThinkingTags(props.stream);
if (visibleStream.trim().length > 0) {
  items.push({ kind: "stream", ... });
} else {
  items.push({ kind: "reading-indicator", key }); // 显示三个点
}
```

当 stream 内容全部是 Plan/Gather/Act 推理时，显示「读取指示器」（三个点）而非空气泡，避免空白区域闪烁。

---

## 整体效果

```
旧体验：推理文本气泡 → 突然切换 → 结果卡  （有顿感）
新体验：读取指示器   → 工具卡片 → SSE 结果卡渐入
```

---

## 修改记录

## 二十、空白气泡修复（Iteration 24+）

### 问题现象

正常回复后，聊天区出现额外的空 assistant 气泡（只有机器人头像，没有文本内容）。原因是 LLM 输出中含 `<think>...` 或 `1. Plan / 2. Gather...` 等纯推理内容，写入 history 后 `extractTextCached` 剥除标签只剩空字符串，但仍作为 assistant 消息被渲染。

### 根因分析

LLM 输出结构：
```
<think>
...thinking content only...

```

流程链：
1. LLM 输出纯 thinking → 历史消息写入 `messages` 数组
2. `buildChatItems` 遍历 history，`extractTextCached` 剥除 `<think>` 标签后得空字符串
3. `isRenderedMarker` 检查失败（内容不是 marker 格式），进入 L989 `items.push`
4. `groupMessages` 渲染为 `MessageGroup(role=assistant)` → 空白气泡 + 机器人头像

### 解决方案

**方案 B（稳健版）：历史消息层过滤 + 流式阶段保留 reading indicator**

在 `buildChatItems` 的历史消息遍历中，新增 `shouldSkipEmptyAssistantMessage` 判断，精准跳过"内容为纯 thinking"的 assistant 消息，不影响有实质内容的消息。

### 关键实现

**文件**：`control-ui/src/ui/views/chat.ts`

**L735–791**：`hasRenderableNonTextBlocks` 函数

保护垫逻辑——若消息含以下任一类型，不跳过（保留渲染）：
- `toolcall` / `tool_use` / `tool_result` 等工具调用块
- `file` 类型附件（含 file_name）
- `image` / `image_url`（含 url 或 base64 source）
- 普通 text 块（`kind === "text"` 时返回 false，走后续可见文本检查）

```typescript
function hasRenderableNonTextBlocks(message: unknown): boolean {
  const m = message as Record<string, unknown>;
  const content = m.content;
  if (!Array.isArray(content)) return false;
  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    const item = block as Record<string, unknown>;
    const kind = typeof item.type === "string" ? item.type.toLowerCase() : "";
    if (
      kind === "toolcall" || kind === "tool_call" || kind === "tooluse" ||
      kind === "tool_use" || kind === "toolresult" || kind === "tool_result"
    ) return true;
    if (typeof item.name === "string" && item.arguments != null) return true;
    if (kind === "file" && typeof item.file_name === "string" && item.file_name.trim()) return true;
    if (kind === "image") { /* url / base64 检查 */ return true; }
    if (kind === "image_url") { /* imageUrl 检查 */ return true; }
  }
  return false;
}
```

**L793–802**：`shouldSkipEmptyAssistantMessage` 函数

```typescript
function shouldSkipEmptyAssistantMessage(message: unknown, normalizedRole: string): boolean {
  if (normalizedRole.toLowerCase() !== "assistant") return false;
  if (hasRenderableNonTextBlocks(message)) return false;
  const visibleText = (extractTextCached(message) ?? "").trim();
  return visibleText.length === 0;
}
```

**L1058**：在 `items.push` 之前插入 guard

```typescript
if (shouldSkipEmptyAssistantMessage(msg, normalized.role)) {
  continue;
}
items.push({ kind: "message", key: messageKey(msg, i), message: msg });
```

### 设计原则

| 原则 | 说明 |
|------|------|
| **保守跳过** | 仅对 assistant 生效，tool/user 消息不受影响 |
| **精确保护** | `hasRenderableNonTextBlocks` 确保含图片/文件/工具调用的消息不会被误杀 |
| **流式独立** | 流式阶段（`props.stream`）仍走 `stripThinkingTags` + reading indicator 逻辑，不受此改动影响 |
| **历史优先** | 修复点在 history 遍历层，从源头阻止空白气泡进入渲染队列 |

### 涉及文件

| 文件 | 改动 |
|------|------|
| `control-ui/src/ui/views/chat.ts` | 新增 `hasRenderableNonTextBlocks` + `shouldSkipEmptyAssistantMessage`，L1058 guard |
| `control-ui/src/ui/views/chat.test.ts` | 新增回归测试覆盖 thinking-only assistant 场景 |

### 验证情况

- `npm run build` 通过
- 手动测试：正常回复后不再出现空白气泡
- 回归测试：需 `npx playwright install` 后验证 `chat.test.ts`

### 相关已有逻辑（不冲突）

| 位置 | 逻辑 |
|------|------|
| `views/chat.ts` L1046–1062 | 流式阶段 `props.stream` 的 `stripThinkingTags` + reading indicator |
| `grouped-render.ts` L18 | `extractedThinking = null`（原生 thinking block 无条件不渲染） |
| `reasoning-tags.ts` | 三层过滤：thinking block / Plan-Gather-Act / Reasoning 前缀 |

---

### 2026-04-30：Plan/Gather 流式早期拦截 + 空气泡消除

- `reasoning-tags.ts`：`startsWithPlanBlock` 改为 `/^(?:###\s*)?1\./`（句点即触发）
- `views/chat.ts`：`buildChatItems` 引入 `stripThinkingTags` 预过滤流式文本

### 2026-04-30：Plan/Gather/Act 文本过滤规则（初版）

- `reasoning-tags.ts`：新增 Plan/Gather/Act 和 Reasoning: 模式检测
- `grouped-render.ts`：`extractedThinking = null`（无条件隐藏原生 thinking block）

### 2026-04-22：关闭 Thinking 展示（旧记录，针对 Claude Code 自身 UI）

**注**：以下内容针对 Claude Code CLI 的 Message 组件，与本项目 control-ui 无关，仅作历史存档。

```typescript
// src/components/Message.tsx L449-451
case 'thinking': {
  // Thinking content is hidden from display
  return null
}
```

---

## 恢复方法

| 层级 | 恢复操作 |
|------|----------|
| 原生 thinking block | `grouped-render.ts` 中恢复 `extractedThinking = opts.showReasoning && ...` |
| 文本推理过滤 | `reasoning-tags.ts` 中移除 `startsWithPlanBlock` / `startsWithReasoningPrefix` 分支 |
| 流式预过滤 | `views/chat.ts` 中将 `visibleStream` 判断改回 `props.stream.trim()` |

---

## 关键文件

| 文件 | 作用 |
|------|------|
| `control-ui/src/shared/text/reasoning-tags.ts` | 推理文本过滤规则核心 |
| `control-ui/src/ui/chat/grouped-render.ts` | 原生 thinking block 渲染入口（层 1） |
| `control-ui/src/ui/chat/message-extract.ts` | `extractText` 调用 `stripThinkingTags` |
| `control-ui/src/ui/views/chat.ts` | 流式气泡预过滤（层 3） |
