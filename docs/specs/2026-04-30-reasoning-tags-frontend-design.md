# Frontend Spec - Reasoning Tags Display

> Date: 2026-04-30
> Status: Implemented

## 1. Scope / Trigger

- **Trigger**: LLM 输出 reasoning/thinking 标签时，前端需要过滤掉这些内部推理文本，只展示用户可见的结论
- **文件**: `control-ui/src/shared/text/reasoning-tags.ts`

## 2. 实现内容

### 三种过滤格式

| LLM 实际输出格式 | 触发条件 | 处理方式 |
|-----------------|----------|----------|
| `<think>…` | 已有逻辑（LLM 遵守了指令） | 标签内容剥除 |
| `1. Plan / 2. Gather / 3. Act…` | 消息开头是 `(### )?1\. Plan` | 整条消息返回空字符串，泡泡不渲染 |
| `Reasoning:\n…` | 消息开头是 `Reasoning:` | 剥除前缀推理块，只保留空行后的结论句 |

### 核心函数

```typescript
// 入口
export function stripReasoningTagsFromText(text: string): string

// 辅助
function startsWithPlanBlock(text: string): boolean   // /^(:?###\s*)?1\.\s*Plan\b/i
function startsWithReasoningPrefix(text: string): boolean  // /^Reasoning:\s*\n/i
function extractAfterReasoningBlock(text: string): string  // 取 \n\n 后的内容
```

### 过滤规则优先级

1. 空值/非字符串 → 返回 `""`
2. 显式 `<think>...` 标签 → 剥除
3. Plan/Gather/Act 编号结构（开头匹配）→ 整条返回 `""`
4. `Reasoning:\n` 前缀 → 剥除前缀，保留空行后的结论

## 3. 设计决策

### 为什么返回空字符串而不是删除整条消息？

对于 `1. Plan / 2. Gather...` 格式，这种消息本质上全是推理过程，用户最终看到的是 SSE 的 tool_render 卡片（工具执行结果）。推理文本本身不应该展示给用户。

返回空字符串让上层组件（如气泡渲染逻辑）识别到这是"无需渲染"的状态，而不是"出错"。

### 为什么 `Reasoning:\n` 要保留空行后的内容？

这种格式是 LLM 未完全遵守指令时的降级输出。格式为：
```
Reasoning:\n...（推理过程）\n\n...（正式回复）
```

空行后的内容才是真正需要展示给用户的结论，所以保留。

## 4. 过渡效果

隐藏"查询过程"气泡后，过渡变为：
```
读取指示器（三个点）→ 工具卡片出现 → SSE 结果卡渐入
```

不再有"推理文本 → 突然切到结果卡"的跳跃感。

## 5. 涉及文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `control-ui/src/shared/text/reasoning-tags.ts` | 已实现 | 过滤规则核心逻辑 |
| `backend/tools/inventory/lib/shared/text/reasoning-tags.test.ts` | 已存在 | 后端对应测试 |
| `backend/tools/inventory/lib/shared/text/reasoning-tags.ts` | 已存在 | 后端同款实现 |