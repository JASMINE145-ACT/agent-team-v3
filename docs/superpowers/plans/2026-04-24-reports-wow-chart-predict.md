# 周报三项增强 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为周报系统添加三项改进：① KPI 卡片显示 WoW 环比百分比；② 柱状图点击联动高亮日期明细行；③ AI 分析 prompt 增加下周预测段落。

**Architecture:** Task 1 在后端 `runner.py` 存储上周对比数据到 `summary_json`，前端读取渲染 delta；Task 2 在 `report-chart.ts` 加 onClick 事件、通过 `AppViewState` 管理选中日期、`reports-tab.ts` 根据选中日期高亮表格行；Task 3 仅修改 `llm_analyzer.py` 中的 prompt 字符串。三个 Task 完全独立，可并行实施，互不干扰。

**Tech Stack:** Python (psycopg2, dataclasses)、TypeScript (Lit Web Components, Chart.js)

---

## 文件改动总览

| 文件 | Task | 改动说明 |
|------|------|---------|
| `backend/reports/runner.py` | 1 | `run_report_task()` 生成报告前查上周 summary，注入 `prev_week` 到 `summary_json` |
| `control-ui/src/ui/views/reports-tab.ts` | 1 | `renderDataTab()` 在两个 KPI 卡下方渲染 WoW delta 行 |
| `control-ui/src/ui/app-view-state.ts` | 2 | 新增 `reportsSelectedDailyDate: string \| null` 字段 |
| `control-ui/src/ui/app-render.ts` | 2 | 向 `renderReportsTab` 传入 `selectedDailyDate` 和 `onDailyDateClick` |
| `control-ui/src/ui/views/reports-tab.ts` | 2 | `ReportsTabParams` 加新回调；`renderDataTab()` 监听图表事件、高亮表格行 |
| `control-ui/src/ui/report-chart.ts` | 2 | `_rebuild()` 加 Chart.js `onClick`，dispatch `chart-bar-click` CustomEvent |
| `backend/reports/llm_analyzer.py` | 3 | `build_analysis_prompt()` 追加第 4 项"下周预测" |

---

## Task 1: WoW 环比 — 后端存储 + 前端展示

**Files:**
- Modify: `backend/reports/runner.py`
- Modify: `control-ui/src/ui/views/reports-tab.ts`

### 背景

`runner.py:46-49` 当前 `summary` 只存两个字段：
```python
summary = {
    "total_order_count": payload.total_order_count,
    "total_sales_amount": payload.total_sales_amount,
}
```

前端 KPI 卡（`reports-tab.ts:83-98`）只展示绝对值，用户无法判断本周好还是坏。

### 实施步骤

- [ ] **Step 1.1: 在 `runner.py` 中添加上周 summary 查询函数**

在 `runner.py` 文件顶部的 import 块之后、`resolve_week_range` 定义之前，添加：

```python
def _fetch_prev_summary(conn, task_key: str, week_start) -> dict | None:
    """返回最近一条 status='success' 且 week_start 早于当前周的 summary_json，无则返回 None。"""
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT summary_json FROM report_records
            WHERE task_key = %s
              AND status = 'success'
              AND week_start < %s
              AND summary_json IS NOT NULL
            ORDER BY week_start DESC
            LIMIT 1
            """,
            (task_key, week_start),
        )
        row = cur.fetchone()
    if not row or not row[0]:
        return None
    return row[0] if isinstance(row[0], dict) else None
```

- [ ] **Step 1.2: 在 `run_report_task()` 中调用并注入 prev_week 数据**

找到 `runner.py:46-49`，将现有的 `summary` 构建块替换为（在 `report_md = format_report_md(payload)` 之后）：

```python
        prev_summary = _fetch_prev_summary(conn, task_key, week_start)
        prev_week: dict | None = None
        if prev_summary:
            prev_amount = float(prev_summary.get("total_sales_amount") or 0)
            prev_count = int(prev_summary.get("total_order_count") or 0)
            amount_pct = (
                (payload.total_sales_amount - prev_amount) / prev_amount * 100
                if prev_amount
                else 0.0
            )
            count_pct = (
                (payload.total_order_count - prev_count) / prev_count * 100
                if prev_count
                else 0.0
            )
            prev_week = {
                "total_sales_amount": prev_amount,
                "total_order_count": prev_count,
                "amount_pct": round(amount_pct, 1),
                "count_pct": round(count_pct, 1),
            }
        summary = {
            "total_order_count": payload.total_order_count,
            "total_sales_amount": payload.total_sales_amount,
            "prev_week": prev_week,
        }
```

注意：`conn` 在此处已经存在（`conn = psycopg2.connect(db_url)` 在函数顶部），`_fetch_prev_summary` 在第一个 `with conn:` 块之外调用，用同一个 connection 即可。具体来说，把调用放在第二个 `with conn:` 块（即更新 report_records 的块）**之前**：

完整的 `run_report_task()` 逻辑段落应为：
```python
    invoices = fetch_sales_invoices(week_start, week_end)
    payload = analyze_sales_orders(week_start, week_end, invoices)
    report_md = format_report_md(payload)

    prev_summary = _fetch_prev_summary(conn, task_key, week_start)
    prev_week: dict | None = None
    if prev_summary:
        prev_amount = float(prev_summary.get("total_sales_amount") or 0)
        prev_count = int(prev_summary.get("total_order_count") or 0)
        amount_pct = (
            (payload.total_sales_amount - prev_amount) / prev_amount * 100
            if prev_amount else 0.0
        )
        count_pct = (
            (payload.total_order_count - prev_count) / prev_count * 100
            if prev_count else 0.0
        )
        prev_week = {
            "total_sales_amount": prev_amount,
            "total_order_count": prev_count,
            "amount_pct": round(amount_pct, 1),
            "count_pct": round(count_pct, 1),
        }
    summary = {
        "total_order_count": payload.total_order_count,
        "total_sales_amount": payload.total_sales_amount,
        "prev_week": prev_week,
    }

    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE report_records
                SET status='success', ...
                """,
                (Json(summary), Json(payload.to_dict()), ...),
            )
```

- [ ] **Step 1.3: 手动验证后端（无自动化测试，这里用单元测试文件验证逻辑）**

在 `backend/reports/` 下新建 `tests/` 目录（若不存在）和 `test_runner_prev_summary.py`：

```python
# backend/reports/tests/test_runner_prev_summary.py
from backend.reports.runner import _fetch_prev_summary


def test_fetch_prev_summary_returns_none_when_no_conn_data():
    """验证无数据时返回 None（通过 mock conn）。"""
    class FakeCursor:
        def __enter__(self): return self
        def __exit__(self, *a): pass
        def execute(self, *a): pass
        def fetchone(self): return None

    class FakeConn:
        def cursor(self): return FakeCursor()

    result = _fetch_prev_summary(FakeConn(), "sales_weekly_basic", "2026-04-14")
    assert result is None
```

Run: `cd "d:/Projects/agent-jk/Agent Team version3" && python -m pytest backend/reports/tests/test_runner_prev_summary.py -v`
Expected: PASS

- [ ] **Step 1.4: 在 `reports-tab.ts` 的 `renderDataTab` 中展示 WoW delta**

找到 `reports-tab.ts:73-78`（`rj` / `totalAmount` / `totalCount` 定义段落），在其后添加：

```typescript
  const summaryJson = (params.reportDetail.summary_json ?? {}) as Record<string, unknown>;
  const prevWeek = summaryJson.prev_week as
    | { total_sales_amount: number; total_order_count: number; amount_pct: number; count_pct: number }
    | null
    | undefined;
```

然后找到 `reports-tab.ts:83-99`，将两个 KPI 卡替换为：

```typescript
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;">
            ${t("agents.reports.metricTotal")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${rp(totalAmount)}</div>
          ${prevWeek != null
            ? html`<div style="font-size:11px;margin-top:4px;color:${prevWeek.amount_pct >= 0 ? "var(--color-success,#22c55e)" : "var(--color-danger,#ef4444)"};">
                ${prevWeek.amount_pct >= 0 ? "▲" : "▼"} ${Math.abs(prevWeek.amount_pct)}% vs 上周
              </div>`
            : nothing}
        </div>
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;">
            ${t("agents.reports.metricCount")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${totalCount}</div>
          ${prevWeek != null
            ? html`<div style="font-size:11px;margin-top:4px;color:${prevWeek.count_pct >= 0 ? "var(--color-success,#22c55e)" : "var(--color-danger,#ef4444)"};">
                ${prevWeek.count_pct >= 0 ? "▲" : "▼"} ${Math.abs(prevWeek.count_pct)}% vs 上周
              </div>`
            : nothing}
        </div>
      </div>
```

- [ ] **Step 1.5: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add backend/reports/runner.py backend/reports/tests/ control-ui/src/ui/views/reports-tab.ts
git commit -m "feat: add WoW week-over-week delta to report KPI cards"
```

---

## Task 2: 图表点击联动日期高亮

**Files:**
- Modify: `control-ui/src/ui/report-chart.ts`
- Modify: `control-ui/src/ui/app-view-state.ts`
- Modify: `control-ui/src/ui/app-render.ts`
- Modify: `control-ui/src/ui/views/reports-tab.ts`

### 背景

`report-chart.ts` 使用 Chart.js 渲染柱状图，无 click 回调。`renderDataTab` 的每日明细表和图表是独立的，点击柱状图不会影响表格。

### 实施步骤

- [ ] **Step 2.1: 在 `report-chart.ts` 中添加 Chart.js onClick 并 dispatch CustomEvent**

找到 `report-chart.ts:75-101`（daily 图表的 `options` 对象），将整个 `options:` 块替换为（含 `onClick`，注意 `plugins` 块必须完整展开，不能用 `...` 省略）：

```typescript
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onClick: (_evt, elements) => {
            if (elements.length === 0) return;
            const idx = elements[0].index;
            const label = (this.data as DailyStat[])[idx]?.date ?? "";
            this.dispatchEvent(
              new CustomEvent("chart-bar-click", {
                detail: { date: label },
                bubbles: true,
                composed: true,
              }),
            );
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `Rp ${Number(ctx.raw).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                afterLabel: (ctx) => `订单数: ${(rows[ctx.dataIndex] as DailyStat).order_count}`,
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: (val) =>
                  `Rp ${Number(val).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                maxTicksLimit: 5,
              },
            },
          },
        },
```

> **注意**：`report-chart.ts` 是 `@customElement` 定义的 Lit 组件，Chart.js 渲染在 shadow DOM 内部。`CustomEvent` 必须传 `bubbles: true, composed: true` 才能跨 shadow DOM 边界冒泡到 `reports-tab.ts` 的监听器。

- [ ] **Step 2.2: 在 `app-view-state.ts` 中新增 `reportsSelectedDailyDate` 字段**

找到 `app-view-state.ts:329`（`reportsDetailTab` 行），在其后添加：

```typescript
  reportsSelectedDailyDate: string | null;
```

- [ ] **Step 2.3: 在 `app-view-state.ts` 的初始值处设置为 null**

找到 `reportsDetailTab` 字段的初始值（在同文件的 `createInitialState()` 或字面量对象处），添加：

```typescript
  reportsSelectedDailyDate: null,
```

如果该文件是接口定义而无初始值，则在 `app-render.ts` 中的 state 初始化处处理（见 Step 2.4）。

- [ ] **Step 2.4: 在 `app-render.ts` 中传入新 props**

找到 `app-render.ts:676-729`（`renderReportsTab({...})` 调用块），在最后一个 prop 之前加入：

```typescript
                selectedDailyDate: state.reportsSelectedDailyDate ?? null,
                onDailyDateClick: (date) => {
                  state.reportsSelectedDailyDate = date;
                },
```

- [ ] **Step 2.5: 在 `reports-tab.ts` 的 `ReportsTabParams` 中添加新字段**

找到 `reports-tab.ts:42-64`（`ReportsTabParams` type），在 `onReanalyze` 之后添加：

```typescript
  selectedDailyDate: string | null;
  onDailyDateClick: (date: string | null) => void;
```

- [ ] **Step 2.6: 在 `renderDataTab` 中监听图表事件并高亮表格行**

找到 `reports-tab.ts:101-130`（渲染 `report-chart` 和 daily 表格的段落），将整个 `${daily.length > 0 ? html\`...\` : nothing}` 块替换为：

```typescript
      ${daily.length > 0
        ? html`
            <report-chart
              type="daily"
              .data=${daily}
              @chart-bar-click=${(e: CustomEvent<{ date: string }>) => {
                const clicked = e.detail.date;
                params.onDailyDateClick(
                  clicked === params.selectedDailyDate ? null : clicked,
                );
              }}
            ></report-chart>
            ${params.selectedDailyDate
              ? html`<div style="font-size:11px;color:var(--text-muted);text-align:right;margin-top:-8px;">
                  已选 ${params.selectedDailyDate} — <button
                    style="border:none;background:none;color:var(--accent,#6366f1);cursor:pointer;font-size:11px;padding:0;"
                    @click=${() => params.onDailyDateClick(null)}
                  >清除</button>
                </div>`
              : nothing}
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${t("agents.reports.tableDaily")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colDate")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${t("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${daily.map(
                    (row) => {
                      const isSelected = row.date === params.selectedDailyDate;
                      return html`
                        <tr style="
                          border-bottom:1px solid var(--border);
                          background:${isSelected ? "var(--accent-soft,rgba(99,102,241,.10))" : "transparent"};
                          font-weight:${isSelected ? "600" : "400"};
                        ">
                          <td style="padding:6px 8px;" class="mono">${row.date}</td>
                          <td style="padding:6px 8px;text-align:right;">${row.order_count}</td>
                          <td style="padding:6px 8px;text-align:right;">${rp(row.sales_amount)}</td>
                        </tr>
                      `;
                    },
                  )}
                </tbody>
              </table>
            </div>
          `
        : nothing}
```

- [ ] **Step 2.7: 当切换 selectedRecordId 时重置 selectedDailyDate**

在 `app-render.ts:695-698`（`onSelectRecord` 回调处），追加重置：

```typescript
                onSelectRecord: (recordId) => {
                  stopAnalysisPoller();
                  state.reportsSelectedDailyDate = null;   // 切换报告时清除选中日期
                  void loadReportDetail(state, recordId);
                },
```

- [ ] **Step 2.8: 检查 TypeScript 是否编译通过**

Run: `cd "d:/Projects/agent-jk/Agent Team version3/control-ui" && npx tsc --noEmit 2>&1 | head -30`
Expected: 无错误输出

- [ ] **Step 2.9: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/report-chart.ts \
        control-ui/src/ui/app-view-state.ts \
        control-ui/src/ui/app-render.ts \
        control-ui/src/ui/views/reports-tab.ts
git commit -m "feat: chart bar click highlights matching daily table row"
```

---

## Task 3: AI Prompt 增加下周预测段落

**Files:**
- Modify: `backend/reports/llm_analyzer.py`

### 背景

当前 `build_analysis_prompt()` 的输出要求为 3 项：趋势 / 环比 / 问题与建议（`llm_analyzer.py:112-123`）。AI 只能"总结过去"，不做预测。

### 实施步骤

- [ ] **Step 3.1: 修改 `build_analysis_prompt()` 的输出要求**

找到 `llm_analyzer.py:112-124`（`return (...)` 字符串），将以下内容：

```python
    return (
        "你是销售分析师。以下是本周的销售原始数据（JSON 格式，数字绝对准确）。\n"
        "请输出 Markdown 分析报告，包含：\n"
        "1. 本周趋势：最强/最弱日，整体走势，简要原因推测\n"
        f"{compare_instruction}\n"
        "3. 问题与建议：数据异常或模式异常时给出提示\n\n"
        "严格规则：\n"
        "- 所有数字必须来自原始 JSON，禁止编造或估算\n"
        "- 输出纯 Markdown，不要 JSON 或代码块包裹\n\n"
        f"【本周数据（{current.week_start} ~ {current.week_end}）】\n"
        f"{current_json}"
        f"{prev_section}"
    )
```

替换为：

```python
    return (
        "你是销售分析师。以下是本周的销售原始数据（JSON 格式，数字绝对准确）。\n"
        "请输出 Markdown 分析报告，包含：\n"
        "1. 本周趋势：最强/最弱日，整体走势，简要原因推测\n"
        f"{compare_instruction}\n"
        "3. 问题与建议：数据异常或模式异常时给出提示\n"
        "4. 下周预测：基于本周及上周趋势，给出下周销售额的预估区间（低/中/高估），并简要说明推断依据\n\n"
        "严格规则：\n"
        "- 所有数字必须来自原始 JSON，禁止编造或估算\n"
        "- 预测数字必须基于已有趋势外推，并明确标注「预测」字样\n"
        "- 输出纯 Markdown，不要 JSON 或代码块包裹\n\n"
        f"【本周数据（{current.week_start} ~ {current.week_end}）】\n"
        f"{current_json}"
        f"{prev_section}"
    )
```

- [ ] **Step 3.2: 验证 prompt 生成逻辑（单元测试）**

新建 `backend/reports/tests/test_llm_prompt.py`：

```python
# backend/reports/tests/test_llm_prompt.py
from backend.reports.models import ReportPayload, DayStats, CustomerStat, StatusStat
from backend.reports.llm_analyzer import build_analysis_prompt


def _make_payload(week_start="2026-04-14", week_end="2026-04-20"):
    return ReportPayload(
        week_start=week_start,
        week_end=week_end,
        total_sales_amount=1_000_000.0,
        total_order_count=50,
        daily_stats=[DayStats(date="2026-04-14", order_count=10, sales_amount=200_000.0)],
        top_customers=[CustomerStat(customer_name="ACME", sales_amount=400_000.0, order_count=20)],
        status_stats=[StatusStat(status_name="Delivered", count=45, total_amount=950_000.0)],
    )


def test_prompt_contains_prediction_section():
    prompt = build_analysis_prompt(_make_payload(), prev=None)
    assert "下周预测" in prompt
    assert "预测" in prompt


def test_prompt_with_prev_contains_comparison():
    current = _make_payload()
    prev = _make_payload(week_start="2026-04-07", week_end="2026-04-13")
    prompt = build_analysis_prompt(current, prev=prev)
    assert "环比" in prompt
    assert "下周预测" in prompt
```

Run: `cd "d:/Projects/agent-jk/Agent Team version3" && python -m pytest backend/reports/tests/test_llm_prompt.py -v`
Expected: 2 tests PASS

- [ ] **Step 3.3: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add backend/reports/llm_analyzer.py backend/reports/tests/test_llm_prompt.py
git commit -m "feat: add next-week prediction section to LLM analysis prompt"
```

---

## Self-Review

**Spec coverage check:**

| 需求 | Task | 已覆盖 |
|------|------|--------|
| KPI 卡显示 WoW 环比百分比 | 1 | ✅ Step 1.1–1.4 |
| 图表点击联动高亮表格行 | 2 | ✅ Step 2.1–2.6 |
| 切换记录时清除选中日期 | 2 | ✅ Step 2.7 |
| AI prompt 增加下周预测 | 3 | ✅ Step 3.1 |
| 预测结果需标注「预测」字样 | 3 | ✅ Step 3.1（严格规则已注入） |

**Placeholder scan:** 无 TBD / TODO / "similar to" 等占位符。

**Type consistency:**
- `selectedDailyDate: string | null` 在 `app-view-state.ts`、`app-render.ts`、`ReportsTabParams` 三处命名一致。
- `onDailyDateClick: (date: string | null) => void` 签名在 `ReportsTabParams` 和 `app-render.ts` 的传入回调中一致。
- `chart-bar-click` CustomEvent detail 类型 `{ date: string }` 在 dispatch 端（`report-chart.ts`）和监听端（`reports-tab.ts`）一致。
- `prev_week` 的 Python dict 键（`amount_pct`, `count_pct`）与前端读取的 TypeScript 类型字段一致。
