# Claude Code Thinking 展示配置

> **Purpose**: 记录 Claude Code 前端展示行为的定制配置

---

## Thinking 显示配置

### 当前状态: 已关闭 Thinking 展示

**生效日期**: 2026-04-22

LLM 照常 thinking（API 请求中 thinking 功能保持开启），但前端 UI 不显示 thinking 内容。

---

## 修改记录

### 2026-04-30: Reasoning Tags 过滤规则

**文件**: `control-ui/src/shared/text/reasoning-tags.ts`

前端渲染层过滤 LLM 输出的内部推理文本，只展示用户可见结论。

| LLM 实际输出格式 | 触发条件 | 处理方式 |
|-----------------|----------|----------|
| `<think>…` | 已有逻辑（LLM 遵守了指令） | 标签内容剥除 |
| `1. Plan / 2. Gather / 3. Act…` | 消息开头是 `(### )?1\. Plan` | 整条消息返回空字符串，泡泡不渲染 |
| `Reasoning:\n…` | 消息开头是 `Reasoning:` | 剥除前缀推理块，只保留空行后的结论句 |

**核心函数**:
```typescript
export function stripReasoningTagsFromText(text: string): string
// 1. 剥除 <think>...  标签
// 2. Plan/Gather/Act 编号结构 → 返回 ""
// 3. Reasoning:\n 前缀 → 保留 \n\n 后的结论
```

**过渡效果**: 隐藏"查询过程"气泡后，过渡变为：
```
读取指示器（三个点）→ 工具卡片出现 → SSE 结果卡渐入
```
不再有"推理文本 → 突然切到结果卡"的跳跃感。

**涉及文件**:
| 文件 | 说明 |
|------|------|
| `control-ui/src/shared/text/reasoning-tags.ts` | 前端过滤规则核心 |
| `backend/tools/inventory/lib/shared/text/reasoning-tags.ts` | 后端同款实现 |
| `backend/tools/inventory/lib/shared/text/reasoning-tags.test.ts` | 后端测试 |

---

### 2026-04-22: 关闭 Thinking 展示

**文件**: `src/components/Message.tsx` L449-451

**修改前**:
```typescript
case 'thinking': {
  if (!isTranscriptMode && !verbose) {
    return null
  }
  const isLastThinking = !lastThinkingBlockId || thinkingBlockId === lastThinkingBlockId
  return <AssistantThinkingMessage ... />
}
```

**修改后**:
```typescript
case 'thinking': {
  // Thinking content is hidden from display
  return null
}
```

---

## 恢复方法

如需恢复 thinking 展示，将 `src/components/Message.tsx` L449-451 改回修改前的版本即可。

---

## 相关代码位置

| 文件 | 行号 | 说明 |
|------|------|------|
| `src/components/Message.tsx` | 449-451 | thinking case 处理（主开关） |
| `src/components/messages/AssistantThinkingMessage.tsx` | - | thinking 展示组件本体 |
| `src/components/Messages.tsx` | 999-1012 | 流式 thinking 渲染 |

---

## 配置选项参考

如只想调整显示逻辑而非完全隐藏，可通过以下方式：

- **环境变量**: `MAX_THINKING_TOKENS=0` — 完全禁用 thinking（LLM 不 thinking）
- **命令行**: `claude --thinking disabled` — 同上
- **verbose 模式**: transcript 模式下 thinking 会在 verbose=true 时显示