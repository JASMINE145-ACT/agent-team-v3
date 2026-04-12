# Work 报价执行步骤 — 前端可读时间线（方案 1）

**日期**：2026-04-12  
**状态**：已批准并实现  
**范围**：控制台前端的 **Work 结果区**；在 **不修改后端 trace 契约** 的前提下，将 `workResult.trace` 从「整段 JSON」改为 **可读时间线**，并 **保留原始 JSON 供调试**。

---

## 1. 目标

- 用户完成报价流程后，在「执行结果」卡片内看到 **步骤时间线**（与 `trace` 数组顺序一致），而非仅 `<pre>` JSON。
- **原始 trace** 仍可通过 **「原始 trace（调试用）」** 折叠查看，默认收起。
- `observation.content` 为 JSON 字符串时解析后展示摘要；若含 **`markdown`**（如缺货报告），使用项目既有 **Markdown 安全渲染**。

---

## 2. 非目标

- 不新增后端 `steps_ui` 字段（方案 2 留作后续）。
- 不修改 Gateway **聊天** 里的消息展示（仅 Work 结果区）。
- 双栏布局等非 trace 相关 UI 不在此 spec。

---

## 3. 展示规则（与「上述 6 条」一致）

1. **主区域**：纵向时间线，一步一条。
2. **`tool_call`**：展示工具中文短标题（i18n）+ 参数摘要（JSON 格式化，可滚动）。
3. **`observation`**：解析 `content` → 摘要字段（success、行数、输出路径、错误等）；存在 **`markdown`** 时渲染为 HTML。
4. **`metrics`**：展示 `stage` 与 `duration_ms`（人类可读时长）。
5. **原始数据**：独立 `<details>`，内为 `JSON.stringify(trace, null, 2)`。
6. **解析失败**：回退为预格式化文本，避免空白。

---

## 4. 涉及文件

| 文件 | 说明 |
|------|------|
| `control-ui/src/ui/views/work-trace.ts` | 时间线渲染与解析辅助 |
| `control-ui/src/ui/views/work.ts` | 引用时间线，替换原仅 JSON 的 `details` |
| `control-ui/src/styles/components.css` | `.work-trace*` 样式 |
| `control-ui/src/i18n/locales/zh-CN.ts` / `en.ts` | 步骤标题、工具名、调试用文案 |

---

## 5. 验收

- 含 `tool_call` / `observation` / `metrics` 的典型 trace 能显示为时间线。
- 缺货报告类 observation 含 `markdown` 时能正确渲染。
- 原始 JSON 仍在折叠内完整可查。
