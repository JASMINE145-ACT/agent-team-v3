# 周报系统修复与图表增强设计

**日期**: 2026-04-15
**状态**: 待实现
**范围**: 后端 3 处 bug 修复 + 前端 Chart.js 图表增强

---

## 问题描述

1. **ThinkingBlock 污染**：`llm_analyzer.py` 的 `_message_text()` 取 `content[0]`，当模型返回 `ThinkingBlock` 时没有 `.text` 属性，fallback 成 `str(block)`，导致 `analysis_md` 存入原始 Python 对象文本。
2. **上周数据查询不可靠**：`fetch_prev_week_payload()` 用 `id != current_record_id ORDER BY started_at DESC` 定位上周记录，同一周多次运行时会错误地取到本周的早期记录，而非上周数据。
3. **前端无图表**：Data 标签页只有表格，缺少趋势可视化。

---

## 架构概览

```
backend/reports/
  llm_analyzer.py   ← 修复 _message_text() + fetch_prev_week_payload()
  models.py         ← DDL 加 week_start/week_end 列 + ensure_tables() 加迁移
  runner.py         ← UPDATE 时写入 week_start / week_end

control-ui/src/ui/
  report-chart.ts   ← 新建：Lit 自定义元素，管理 Chart.js 生命周期
  views/reports-tab.ts  ← 在 renderDataTab 插入 <report-chart>
```

---

## 后端设计

### 1. `llm_analyzer.py` — 修复 `_message_text()`

**位置**：第 81–85 行

**改前**：
```python
def _message_text(message: Any) -> str:
    block = message.content[0]
    if hasattr(block, "text"):
        return str(block.text)
    return str(block)
```

**改后**：
```python
def _message_text(message: Any) -> str:
    for block in message.content:
        if hasattr(block, "text"):
            return str(block.text)
    return ""
```

**原因**：遍历所有 content block，返回第一个 `TextBlock`（有 `.text` 属性），跳过 `ThinkingBlock`。

---

### 2. `models.py` — 加列

**DDL（`_DDL` 列表中 `report_records` 的 `CREATE TABLE`）**：末尾加两列：
```sql
week_start  DATE NULL,
week_end    DATE NULL
```

**`ensure_tables()` 迁移**（跟随现有 `ALTER TABLE` 模式）：
```python
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_start DATE NULL;")
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_end DATE NULL;")
```

**兼容性**：存量记录 `week_start = NULL`，不满足 `< current_week_start` 条件，自动视为"无上周数据"，行为与当前一致。

---

### 3. `runner.py` — 写入新列

在 `UPDATE report_records SET status='success' ...` 语句中加：
```sql
week_start = %s,
week_end   = %s
```

对应参数追加 `week_start`、`week_end`（已是函数内的本地变量 `datetime.date`）。

---

### 4. `llm_analyzer.py` — 修复 `fetch_prev_week_payload()`

**函数签名变更**：
```python
# 改前
def fetch_prev_week_payload(db_url, task_key, current_record_id: int)
# 改后
def fetch_prev_week_payload(db_url, task_key, current_week_start: str)
```

**查询变更**：
```sql
-- 改前
WHERE task_key = %s AND status = 'success' AND id != %s AND report_json IS NOT NULL
ORDER BY started_at DESC LIMIT 1

-- 改后
WHERE task_key = %s AND status = 'success'
  AND week_start < %s AND report_json IS NOT NULL
ORDER BY week_start DESC LIMIT 1
```

**`run_llm_analysis()` 调用处**：
```python
# 改前
prev_payload = fetch_prev_week_payload(db_url, task_key, record_id)
# 改后
prev_payload = fetch_prev_week_payload(db_url, task_key, current_payload.week_start)
```

---

## 前端设计

### 1. 新建 `control-ui/src/ui/report-chart.ts`

Lit 自定义元素，封装 Chart.js 生命周期：

**属性**：
- `type: "daily" | "customers"` — 图表类型
- `data: DailyStat[] | CustomerStat[]` — 数据数组

**生命周期**：
- `updated()` — 销毁旧实例 → 用新数据重建
- `disconnectedCallback()` — 销毁实例，防止内存泄漏

**图表规格**：

| 属性 | daily（每日趋势） | customers（Top 客户） |
|------|------------------|----------------------|
| 类型 | 竖向柱状图 | 横向柱状图 |
| x/y 轴 | x: 日期，y: 销售额 | y: 客户名（超长截断），x: 销售额 |
| 额外信息 | 柱顶 tooltip 显示订单数 | tooltip 显示订单数 |
| 配色 | `var(--accent, #6366f1)` | `var(--accent, #6366f1)` |
| 高度 | 200px | 240px（按客户数动态） |

`chart.js` 已在 `package.json` 中（`^4.5.1`），无需新增依赖。

使用 `Chart.register(...registerables)` 一次性注册所有内置组件。

---

### 2. `reports-tab.ts` — `renderDataTab` 插入图表

在文件顶部添加：
```typescript
import "../report-chart.ts";
```

在 `renderDataTab` 内，两张表格上方各插一个 `<report-chart>`：

```
[总额卡片] [订单数卡片]

<report-chart type="daily" .data=${daily}>      ← 新增，在每日表格上方
每日开票趋势表格                                 ← 保留

<report-chart type="customers" .data=${customers}>  ← 新增，在客户表格上方
客户明细（Top 10）表格                           ← 保留

状态汇总表格                                     ← 保留，不加图表
```

当 `daily.length === 0` 或 `customers.length === 0` 时不渲染对应图表（与表格条件一致）。

---

## 数据流

```
run_report_task()
  → analyze_sales_orders()   → ReportPayload (含 week_start/week_end)
  → UPDATE report_records    → 写入 week_start, week_end, report_json, report_md
  → Thread: run_llm_analysis(current_payload.week_start)
      → fetch_prev_week_payload(week_start < current)  ← 用新列精确定位上周
      → build_analysis_prompt(current, prev)
      → call_llm_for_analysis()
      → _message_text()  ← 跳过 ThinkingBlock，取第一个 TextBlock
      → UPDATE analysis_md, analysis_status='done'
```

---

## 不在本次范围内

- 状态分布饼图 — 现有表格已够直观，后续迭代
- LLM prompt 结构化约束（方案 C）— 可选，不是 blocker
- 分析 tab 内嵌图表 — 分析结果是 Markdown 文本，不含结构化数据
