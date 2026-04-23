# Claude Code Thinking 展示配置

> **Purpose**: 记录 Claude Code 前端展示行为的定制配置

---

## Thinking 显示配置

### 当前状态: 已关闭 Thinking 展示

**生效日期**: 2026-04-22

LLM 照常 thinking（API 请求中 thinking 功能保持开启），但前端 UI 不显示 thinking 内容。

---

## 修改记录

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