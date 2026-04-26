# 前端过滤 Plan/Gather/Act/Verify 段落标题

## 背景

LLM 回答包含 4 段式（Plan → Gather → Act → Verify）过程，但希望：
- **LLM 内部仍完整使用这些步骤**（不改变思考路径）
- **前端用户看不到这些标题**（只展示干净的最终回答）

当前状态：session 存储的原始文本（含 heading）会出现在刷新后的历史中；流式 SSE delta 直接发送未过滤文本。

## 目标

在 `control-ui/src/ui/chat/grouped-render.ts` 的 `markdown` 变量处加一次正则过滤，对 assistant 角色的 markdown 文本移除以下模式：

```
/(?im)^\s*(?:#+\s*)?(?:\d+\s*[\.\)]\s*)?(?:Plan|Gather(?:\s+Context)?|Act|Verify(?:\s+Results)?)\s*[:：\-]?\s+/
```

## 修改位置

`control-ui/src/ui/chat/grouped-render.ts`，第 317-318 行附近：

```typescript
// 原来：
const markdown =
  ocrPresent && markdownBase ? stripOcrBlock(markdownBase) : markdownBase;

// 改为：
const markdown = (() => {
  const base = ocrPresent && markdownBase ? stripOcrBlock(markdownBase) : markdownBase;
  if (role !== "assistant" || !base) return base;
  return base.replace(
    /(?im)^\s*(?:#+\s*)?(?:\d+\s*[\.\)]\s*)?(?:Plan|Gather(?:\s+Context)?|Act|Verify(?:\s+Results)?)\s*[:：\-]?\s+/g,
    "",
  );
})();
```

## 约束

- **只过滤 `role === "assistant"` 的消息**（用户消息不过滤）
- **不修改 session 存储的原始文本**（LLM 下一轮仍看到完整上下文）
- **不修改后端 normalize**（`_normalize_user_answer` 保持原样）
- 流式 SSE delta 中的文本也经过此过滤（`accumulated[0]` 经过同一个 `markdown` 变量渲染时过滤）
