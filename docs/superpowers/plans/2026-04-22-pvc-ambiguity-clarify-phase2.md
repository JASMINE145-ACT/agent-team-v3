# PVC 品类歧义澄清 Phase 2 — ClarifyCard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 当 Agent 回复 PVC 类型澄清问题（含编号列表 1-6 项）时，前端自动解析选项并渲染可点击的 chip 按钮 + 「其他类型手动输入」输入框，用户点击即直接发送，无需手动打字。

**Architecture:** 纯前端改动，3 层：①新建 `clarify-card.ts`（解析 + 渲染逻辑）；②扩展 `renderMessageGroup` 的 opts 加 `onQuickSend` 和 `isLastGroup`，在最后一条 assistant 消息后注入 ClarifyCard；③将 `onQuickSend` 从 `app-render.ts` → `chat.ts` → `grouped-render.ts` 打通。不改后端，不改 API，不改 `ask_clarification` 工具。`batch-per-item product_type` 不在本计划范围（keywords 已自然携带类型词，无需额外字段）。

**Tech Stack:** TypeScript, Lit (`html` template), Vitest

---

## 背景

Phase 1 完成后，Agent 在收到 "pvc 价格" 时会调用 `ask_clarification`，LLM 以普通文本回复包含 6 个编号选项的消息。该消息当前渲染为纯 markdown。Phase 2 目标：解析这段文本，在消息下方追加可点击 chip 行，点击后直接调用 `state.handleSendChat(optionText)`。

**触发条件**：assistant 消息文本中含有连续编号列表（`1. ... 2. ... 3. ...` 至少 3 项），且该 group 是当前对话最后一个 assistant group、非流式状态。

---

## File Map

| 文件 | 改动类型 | 内容 |
|------|---------|------|
| `control-ui/src/ui/components/clarify-card.ts` | **新建** | `parseClarifyOptions` + `renderClarifyCard` |
| `control-ui/src/ui/components/clarify-card.test.ts` | **新建** | `parseClarifyOptions` 单元测试（Vitest） |
| `control-ui/src/styles/chat/clarify-card.css` | **新建** | chip 与 other-input 样式 |
| `control-ui/src/ui/chat/grouped-render.ts` | **修改** | `renderMessageGroup` opts 加 `onQuickSend` + `isLastGroup` |
| `control-ui/src/ui/views/chat.ts` | **修改** | `ChatProps` 加 `onQuickSend`；`buildChatItems` 标记 `isLastGroup`；`renderMessageGroup` 调用传参 |
| `control-ui/src/ui/app-render.ts` | **修改** | `renderChat` 调用加 `onQuickSend` prop |

---

## Task 1: `parseClarifyOptions` — 纯函数 + 测试（TDD）

**Files:**
- Create: `control-ui/src/ui/components/clarify-card.ts`
- Create: `control-ui/src/ui/components/clarify-card.test.ts`

- [ ] **Step 1: 写失败测试**

新建 `control-ui/src/ui/components/clarify-card.test.ts`：

```typescript
import { describe, expect, it } from "vitest";
import { parseClarifyOptions } from "./clarify-card.ts";

const PVC_TEXT = `PVC 产品有以下类型，请问您要的是哪种？
1. PVC-U 排水管（建筑排水用，管身直管，含 D排水系列）
2. PVC-U 排水管件（排水用弯头/三通/直接等管件）
3. PVC-U 给水管（AW 给水系列，管身/管件均可）
4. PVC 电线管/线管（电气安装用，B管/A管）
5. PVC 阀门（球阀等）
6. PVC 胶水/辅材（清扫口等）
请回复序号或类型名称，或说明其他类型。`;

describe("parseClarifyOptions", () => {
  it("parses 6 numbered options from PVC clarification text", () => {
    const result = parseClarifyOptions(PVC_TEXT);
    expect(result).toHaveLength(6);
    expect(result[0]).toBe("PVC-U 排水管（建筑排水用，管身直管，含 D排水系列）");
    expect(result[5]).toBe("PVC 胶水/辅材（清扫口等）");
  });

  it("returns empty array for plain text without numbered list", () => {
    expect(parseClarifyOptions("这是普通回复，没有编号列表。")).toEqual([]);
  });

  it("returns empty array when fewer than 3 consecutive items", () => {
    const text = "请选择：\n1. 选项A\n2. 选项B\n然后联系我们。";
    expect(parseClarifyOptions(text)).toEqual([]);
  });

  it("handles dot and 、and ) as item separators", () => {
    const text = "请选择：\n1. A型\n2、B型\n3) C型\n4. D型";
    const result = parseClarifyOptions(text);
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("A型");
    expect(result[1]).toBe("B型");
    expect(result[2]).toBe("C型");
  });

  it("tolerates blank lines between numbered items", () => {
    const text = "请选择：\n1. 选项A\n\n2. 选项B\n\n3. 选项C";
    expect(parseClarifyOptions(text)).toHaveLength(3);
  });

  it("stops at first non-sequential item after list starts", () => {
    const text = "1. A\n2. B\n3. C\n（请回复序号）\n5. E";
    const result = parseClarifyOptions(text);
    // 4 is skipped so list ends at 3
    expect(result).toHaveLength(3);
  });

  it("returns empty array for empty string", () => {
    expect(parseClarifyOptions("")).toEqual([]);
  });
});
```

- [ ] **Step 2: 运行，确认全部 FAIL**

```bash
cd "D:/Projects/agent-jk/Agent Team version3/control-ui"
npx vitest run src/ui/components/clarify-card.test.ts 2>&1 | tail -20
```

预期：`Error: Failed to resolve import "./clarify-card.ts"`

- [ ] **Step 3: 实现 `parseClarifyOptions`**

新建 `control-ui/src/ui/components/clarify-card.ts`：

```typescript
import { html, nothing } from "lit";
import type { TemplateResult } from "lit";

/**
 * 从 assistant 消息文本中解析连续编号列表（1. / 2、/ 3) 格式）。
 * 返回选项文本数组；少于 3 项时返回空数组（不渲染 chip）。
 */
export function parseClarifyOptions(text: string): string[] {
  if (!text) return [];
  const lines = text.split("\n");
  const options: string[] = [];
  let expecting = 1;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      // 允许列表内空行
      if (expecting > 1) continue;
      else continue;
    }
    const m = trimmed.match(/^(\d+)[.、)]\s+(.+)/);
    if (m && parseInt(m[1], 10) === expecting) {
      options.push(m[2].trim());
      expecting++;
    } else if (expecting > 1) {
      // 序号不连续或非编号行，结束解析
      break;
    }
  }

  return options.length >= 3 ? options : [];
}

/**
 * 渲染澄清卡片：可点击 chip 行 + 「其他类型」手动输入框。
 * 只在确认有效选项（parseClarifyOptions 非空）后调用。
 */
export function renderClarifyCard(
  options: string[],
  onPickOption: (text: string) => void,
): TemplateResult {
  const handleOtherKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    const input = e.target as HTMLInputElement;
    const val = input.value.trim();
    if (val) {
      onPickOption(val);
      input.value = "";
    }
  };

  return html`
    <div class="clarify-card">
      <div class="clarify-card__chips">
        ${options.map(
          (opt, i) => html`
            <button
              type="button"
              class="clarify-chip"
              @click=${() => onPickOption(opt)}
            >
              ${i + 1}. ${opt}
            </button>
          `,
        )}
      </div>
      <div class="clarify-card__other">
        <input
          class="clarify-other-input"
          type="text"
          placeholder="其他类型（输入后按 Enter 发送）"
          @keydown=${handleOtherKeydown}
        />
      </div>
    </div>
  `;
}
```

- [ ] **Step 4: 运行，确认全部通过**

```bash
npx vitest run src/ui/components/clarify-card.test.ts 2>&1 | tail -10
```

预期：`7 passed`

- [ ] **Step 5: Commit**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/components/clarify-card.ts control-ui/src/ui/components/clarify-card.test.ts
git commit -m "feat: parseClarifyOptions + renderClarifyCard 组件"
```

---

## Task 2: CSS 样式

**Files:**
- Create: `control-ui/src/styles/chat/clarify-card.css`

- [ ] **Step 1: 新建样式文件**

新建 `control-ui/src/styles/chat/clarify-card.css`：

```css
/* ClarifyCard — PVC 类型澄清 chip 行 */

.clarify-card {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clarify-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.clarify-chip {
  padding: 5px 12px;
  border: 1px solid var(--border, #d1d5db);
  border-radius: 16px;
  background: var(--bg, #ffffff);
  color: var(--text, #111827);
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;
  text-align: left;
  white-space: normal;
  word-break: break-word;
  max-width: 320px;
}

.clarify-chip:hover {
  background: var(--bg-hover, #f3f4f6);
  border-color: var(--border-strong, #9ca3af);
}

.clarify-chip:active {
  background: var(--bg-active, #e5e7eb);
}

.clarify-card__other {
  display: flex;
  align-items: center;
  gap: 6px;
}

.clarify-other-input {
  flex: 1;
  max-width: 320px;
  padding: 5px 10px;
  border: 1px solid var(--border, #d1d5db);
  border-radius: 8px;
  font-size: 0.85rem;
  background: var(--bg, #ffffff);
  color: var(--text, #111827);
  outline: none;
}

.clarify-other-input:focus {
  border-color: var(--accent, #6366f1);
  box-shadow: 0 0 0 2px var(--accent-ring, rgba(99, 102, 241, 0.2));
}

.clarify-other-input::placeholder {
  color: var(--text-muted, #9ca3af);
}
```

- [ ] **Step 2: 在主 CSS 入口引入**

找到主 CSS 文件（搜索哪里 `@import` 了 `tool-cards.css`）：

```bash
grep -rn "tool-cards.css\|@import.*chat" "D:/Projects/agent-jk/Agent Team version3/control-ui/src/" --include="*.css" | head -5
```

在同一位置加：

```css
@import "./chat/clarify-card.css";
```

- [ ] **Step 3: 确认样式文件可被 Vite 构建**

```bash
cd "D:/Projects/agent-jk/Agent Team version3/control-ui"
npx vite build 2>&1 | tail -5
```

预期：build 成功，无 CSS import 错误。

- [ ] **Step 4: Commit**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/styles/chat/clarify-card.css
git add $(grep -rl "tool-cards.css" control-ui/src/ --include="*.css" | head -1)
git commit -m "feat: ClarifyCard CSS — chip 行与手动输入样式"
```

---

## Task 3: 扩展 `renderMessageGroup` — 注入 ClarifyCard

**Files:**
- Modify: `control-ui/src/ui/chat/grouped-render.ts`

- [ ] **Step 1: 在 `renderMessageGroup` 的 opts 类型加两个字段**

找到 `grouped-render.ts` 第 140 行 `renderMessageGroup` 函数签名，将 `opts` 类型从：

```typescript
opts: {
  onOpenSidebar?: (content: string) => void;
  showReasoning: boolean;
  assistantName?: string;
  assistantAvatar?: string | null;
},
```

改为：

```typescript
opts: {
  onOpenSidebar?: (content: string) => void;
  showReasoning: boolean;
  assistantName?: string;
  assistantAvatar?: string | null;
  onQuickSend?: (text: string) => void;
  isLastGroup?: boolean;
},
```

- [ ] **Step 2: 在 `renderMessageGroup` 末尾注入 ClarifyCard**

在函数顶部加 import（文件头部）：

```typescript
import { parseClarifyOptions, renderClarifyCard } from "../components/clarify-card.ts";
import { extractTextCached } from "./message-extract.ts";
```

（`extractTextCached` 已经在文件中 import，确认不重复）

在 `renderMessageGroup` 函数体内，`return html`...`` 模板里，在 `</div>` 闭合 `chat-group-messages` 之前，追加 ClarifyCard 渲染：

```typescript
// 在模板内，找到 <div class="chat-group-messages"> 的末尾（</div> 前），加：
${opts.isLastGroup && opts.onQuickSend && group.role === "assistant" && !group.isStreaming
  ? (() => {
      // 取最后一条消息的文本
      const lastMsg = group.messages[group.messages.length - 1];
      const text = lastMsg ? (extractTextCached(lastMsg.message) ?? "") : "";
      const options = parseClarifyOptions(text);
      return options.length > 0
        ? renderClarifyCard(options, opts.onQuickSend)
        : nothing;
    })()
  : nothing}
```

完整修改后的 `renderMessageGroup` 函数 `return html` 块（只修改 `chat-group-messages` div，其余保持不变）：

```typescript
return html`
  <div class="chat-group ${roleClass}">
    ${renderAvatar(group.role, {
      name: assistantName,
      avatar: opts.assistantAvatar ?? null,
    })}
    <div class="chat-group-messages">
      ${group.messages.map((item, index) =>
        renderGroupedMessage(
          item.message,
          {
            isStreaming: group.isStreaming && index === group.messages.length - 1,
            showReasoning: opts.showReasoning,
          },
          opts.onOpenSidebar,
        ),
      )}
      ${opts.isLastGroup && opts.onQuickSend && group.role === "assistant" && !group.isStreaming
        ? (() => {
            const lastMsg = group.messages[group.messages.length - 1];
            const text = lastMsg ? (extractTextCached(lastMsg.message) ?? "") : "";
            const options = parseClarifyOptions(text);
            return options.length > 0 ? renderClarifyCard(options, opts.onQuickSend) : nothing;
          })()
        : nothing}
      <div class="chat-group-footer">
        <span class="chat-sender-name">${who}</span>
        <span class="chat-group-timestamp">${timestamp}</span>
      </div>
    </div>
  </div>
`;
```

- [ ] **Step 3: 确认 TypeScript 编译无错误**

```bash
cd "D:/Projects/agent-jk/Agent Team version3/control-ui"
npx tsc --noEmit 2>&1 | head -20
```

预期：无错误（或仅有已有的 pre-existing 警告）。

- [ ] **Step 4: Commit**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/chat/grouped-render.ts
git commit -m "feat: renderMessageGroup 支持 onQuickSend + isLastGroup，末尾注入 ClarifyCard"
```

---

## Task 4: 打通 `ChatProps.onQuickSend` — chat.ts + app-render.ts

**Files:**
- Modify: `control-ui/src/ui/views/chat.ts:36-95`（`ChatProps`）
- Modify: `control-ui/src/ui/views/chat.ts:433`（`renderMessageGroup` 调用）
- Modify: `control-ui/src/ui/app-render.ts:800-820`（`renderChat` 调用）

- [ ] **Step 1: 在 `ChatProps` 加 `onQuickSend`**

在 `control-ui/src/ui/views/chat.ts` 的 `ChatProps` 类型定义（约第 92 行 `onSend` 附近）加：

```typescript
onSend: () => void;
onQuickSend?: (text: string) => void;  // 新增：点击 ClarifyCard chip 时调用
```

- [ ] **Step 2: 在 `buildChatItems` / items 渲染处标记 `isLastGroup`**

在 `chat.ts` 中找到 `renderMessageGroup(item, {...})` 调用（约第 434 行）。

该调用位于 `items.map()` 的循环体内。需要知道当前 item 是否是最后一个 assistant group。

将调用修改为：

```typescript
if (item.kind === "group") {
  // 判断是否为最后一个 assistant group
  const allGroups = items.filter(
    (x) => x.kind === "group" && (x as MessageGroup).role === "assistant",
  );
  const isLastAssistantGroup =
    (item as MessageGroup).role === "assistant" &&
    allGroups.length > 0 &&
    allGroups[allGroups.length - 1] === item;

  return renderMessageGroup(item, {
    onOpenSidebar: props.onOpenSidebar,
    showReasoning,
    assistantName: props.assistantName,
    assistantAvatar: assistantIdentity.avatar,
    onQuickSend: props.onQuickSend,
    isLastGroup: isLastAssistantGroup,
  });
}
```

- [ ] **Step 3: 在 `app-render.ts` 的 `renderChat` 调用加 `onQuickSend`**

找到 `app-render.ts` 中 `renderChat({...})` 调用（约第 790-820 行），在 `onSend: () => state.handleSendChat()` 之后加：

```typescript
onQuickSend: (text: string) => void state.handleSendChat(text),
```

- [ ] **Step 4: TypeScript 全量检查**

```bash
cd "D:/Projects/agent-jk/Agent Team version3/control-ui"
npx tsc --noEmit 2>&1 | head -20
```

预期：无新增错误。

- [ ] **Step 5: Commit**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/views/chat.ts control-ui/src/ui/app-render.ts
git commit -m "feat: ChatProps 加 onQuickSend，打通 chip 点击 → handleSendChat 链路"
```

---

## Task 5: 端到端验证

_此任务为手工验证，无自动化测试。_

- [ ] **Step 1: 构建前端**

```bash
cd "D:/Projects/agent-jk/Agent Team version3/control-ui"
npm run build 2>&1 | tail -10
```

预期：build 成功，`dist/` 有产出。

- [ ] **Step 2: 启动后端**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
python run_backend.py
```

- [ ] **Step 3: 发送「pvc 价格」**

在 Chat UI 中输入并发送 `pvc 价格`。

预期：
1. Agent 回复包含 6 项编号选项的文本
2. 消息下方出现 6 个可点击 chip 按钮（`1. PVC-U 排水管...` 等）
3. chip 下方有一个 placeholder 为「其他类型（输入后按 Enter 发送）」的输入框

- [ ] **Step 4: 点击 chip**

点击「1. PVC-U 排水管（建筑排水用...）」chip。

预期：
1. 输入框自动填入并发送该文本
2. Agent 收到「PVC-U 排水管（...）」并继续匹配流程（调用 `match_quotation(keywords="pvc排水管")`）

- [ ] **Step 5: 手动输入「其他类型」**

在 clarify-other-input 中输入 `pvc胶球阀` 并按 Enter。

预期：发送该文本，Agent 继续查询。

- [ ] **Step 6: 验证 chip 不出现在非澄清消息**

发送一条普通询价消息（如 `直接50 价格`）。

预期：回复消息下方**无 chip 行**出现（因为回复不含 3+ 项编号列表）。

- [ ] **Step 7: 验证历史消息不显示 chip**

发送新一轮消息后，查看之前的 PVC 澄清消息。

预期：历史消息下方**不显示 chip**（`isLastGroup=false`），只有最新助手消息显示。

- [ ] **Step 8: 最终 commit**

```bash
git add .
git commit -m "chore: PVC 品类歧义澄清 Phase 2 端到端验证通过"
```

---

## Self-Review

**Spec coverage（对照 `ambiguous-product-clarify-plan`）：**

| Todo | 覆盖情况 |
|------|---------|
| `clarify-card`（前端可点击选项） | ✅ Task 1-4 |
| `other-input`（其他类型手动输入） | ✅ Task 1（`renderClarifyCard` 内含 input） |
| `batch-per-item`（每条 product_type） | ❌ 不做：keywords 已自然携带类型词，无需额外字段；`product_type` 字段已用于国标/日标，语义冲突 |
| `verify-gates` | ✅ Task 5 |

**Placeholder scan:** 无 TBD/TODO，所有代码块完整。

**Type consistency:**
- `parseClarifyOptions(text: string): string[]` — Task 1 定义，Task 3 调用 ✅
- `renderClarifyCard(options: string[], onPickOption: (text: string) => void)` — Task 1 定义，Task 3 调用 ✅
- `onQuickSend?: (text: string) => void` — Task 3 定义，Task 4 全链路传递 ✅
- `isLastGroup?: boolean` — Task 3 定义，Task 4 调用时计算传入 ✅
