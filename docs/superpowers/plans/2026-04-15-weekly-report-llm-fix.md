# Weekly Report LLM Fix & Chart Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix ThinkingBlock pollution in `analysis_md`, fix week-over-week comparison by adding real DB columns, and add Chart.js visualizations to the report detail page.

**Architecture:** Three surgical backend fixes (llm_analyzer.py, models.py, runner.py) followed by a new Lit custom element (`report-chart.ts`) that wraps Chart.js, inserted above existing tables in `reports-tab.ts`.

**Tech Stack:** Python / psycopg2 / Anthropic SDK (backend); Lit 3 / Chart.js 4 / TypeScript (frontend)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `backend/reports/llm_analyzer.py` | Modify | Fix `_message_text()` + fix `fetch_prev_week_payload()` query + update caller |
| `backend/reports/models.py` | Modify | Add `week_start DATE` / `week_end DATE` to DDL + migration |
| `backend/reports/runner.py` | Modify | Write `week_start` / `week_end` in success UPDATE |
| `tests/test_reports_llm_analyzer.py` | Create | Unit tests for `_message_text` and `fetch_prev_week_payload` |
| `tests/test_reports_runner.py` | Create | Unit test verifying runner writes week columns |
| `control-ui/src/ui/report-chart.ts` | Create | Lit custom element wrapping Chart.js |
| `control-ui/src/ui/views/reports-tab.ts` | Modify | Import chart element; insert `<report-chart>` in data tab |

---

## Task 1: Fix `_message_text()` — skip ThinkingBlock

**Files:**
- Modify: `backend/reports/llm_analyzer.py:81-85`
- Create: `tests/test_reports_llm_analyzer.py`

---

- [ ] **Step 1: Create test file with three failing tests**

Create `tests/test_reports_llm_analyzer.py`:

```python
from unittest.mock import MagicMock


def test_message_text_skips_thinking_block_returns_text():
    """content[0] が ThinkingBlock でも TextBlock のテキストを返す。"""
    from backend.reports.llm_analyzer import _message_text

    thinking = MagicMock(spec=[])          # no .text attribute
    text_block = MagicMock()
    text_block.text = "分析結果テキスト"

    msg = MagicMock()
    msg.content = [thinking, text_block]

    assert _message_text(msg) == "分析結果テキスト"


def test_message_text_plain_text_block():
    from backend.reports.llm_analyzer import _message_text

    text_block = MagicMock()
    text_block.text = "Hello"

    msg = MagicMock()
    msg.content = [text_block]

    assert _message_text(msg) == "Hello"


def test_message_text_empty_content_returns_empty_string():
    from backend.reports.llm_analyzer import _message_text

    msg = MagicMock()
    msg.content = []

    assert _message_text(msg) == ""
```

- [ ] **Step 2: Run to confirm tests fail**

```bash
cd "Agent Team version3"
python -m pytest tests/test_reports_llm_analyzer.py::test_message_text_skips_thinking_block_returns_text tests/test_reports_llm_analyzer.py::test_message_text_plain_text_block tests/test_reports_llm_analyzer.py::test_message_text_empty_content_returns_empty_string -v
```

Expected: FAIL — `AssertionError` on the first test (returns `"MagicMock object"` or similar instead of text).

- [ ] **Step 3: Fix `_message_text()` in `backend/reports/llm_analyzer.py`**

Replace lines 81–85:

```python
def _message_text(message: Any) -> str:
    for block in message.content:
        if hasattr(block, "text"):
            return str(block.text)
    return ""
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
python -m pytest tests/test_reports_llm_analyzer.py::test_message_text_skips_thinking_block_returns_text tests/test_reports_llm_analyzer.py::test_message_text_plain_text_block tests/test_reports_llm_analyzer.py::test_message_text_empty_content_returns_empty_string -v
```

Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add backend/reports/llm_analyzer.py tests/test_reports_llm_analyzer.py
git commit -m "fix: skip ThinkingBlock in _message_text, return first TextBlock"
```

---

## Task 2: Add `week_start` / `week_end` columns to `report_records`

**Files:**
- Modify: `backend/reports/models.py`

No TDD for DDL — verified by `ensure_tables()` succeeding at startup.

---

- [ ] **Step 1: Add columns to `CREATE TABLE` definition in `_DDL`**

In `backend/reports/models.py`, locate the `report_records` entry in `_DDL` (second element). Add two lines before the closing `);`:

```sql
        week_start  DATE NULL,
        week_end    DATE NULL
```

Full table definition after edit:

```python
    """
    CREATE TABLE IF NOT EXISTS report_records (
        id BIGSERIAL PRIMARY KEY,
        task_key TEXT NOT NULL,
        status TEXT NOT NULL,
        trigger_type TEXT NOT NULL,
        started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        finished_at TIMESTAMPTZ NULL,
        error_message TEXT NULL,
        summary_json JSONB NULL,
        report_json JSONB NULL,
        analysis_md TEXT NULL,
        analysis_status TEXT NOT NULL DEFAULT 'pending',
        week_start DATE NULL,
        week_end DATE NULL
    );
    """,
```

- [ ] **Step 2: Add `ALTER TABLE` migrations to `ensure_tables()`**

In `ensure_tables()`, after the existing `ALTER TABLE` lines (around line 136–139), add:

```python
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_start DATE NULL;")
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_end DATE NULL;")
```

The full `ensure_tables()` ALTER block should now look like:

```python
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS report_md TEXT NULL;")
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS analysis_md TEXT NULL;")
cur.execute(
    "ALTER TABLE report_records ADD COLUMN IF NOT EXISTS analysis_status TEXT NOT NULL DEFAULT 'pending';"
)
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_start DATE NULL;")
cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_end DATE NULL;")
```

- [ ] **Step 3: Commit**

```bash
git add backend/reports/models.py
git commit -m "feat: add week_start/week_end DATE columns to report_records"
```

---

## Task 3: Write `week_start` / `week_end` in runner.py success UPDATE

**Files:**
- Create: `tests/test_reports_runner.py`
- Modify: `backend/reports/runner.py`

---

- [ ] **Step 1: Write failing test**

Create `tests/test_reports_runner.py`:

```python
from unittest.mock import MagicMock, patch


def _make_mock_conn():
    """Return a mock psycopg2 connection whose cursor supports context manager."""
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = (99,)   # record_id = 99

    mock_ctx = MagicMock()
    mock_ctx.__enter__ = MagicMock(return_value=mock_cursor)
    mock_ctx.__exit__ = MagicMock(return_value=False)

    mock_conn = MagicMock()
    mock_conn.__enter__ = MagicMock(return_value=mock_conn)
    mock_conn.__exit__ = MagicMock(return_value=False)
    mock_conn.cursor.return_value = mock_ctx

    return mock_conn, mock_cursor


def test_run_report_task_writes_week_start_and_week_end():
    """成功 UPDATE に week_start と week_end が含まれることを確認する。"""
    from backend.reports.runner import run_report_task

    mock_conn, mock_cursor = _make_mock_conn()

    mock_payload = MagicMock()
    mock_payload.total_order_count = 3
    mock_payload.total_sales_amount = 300.0
    mock_payload.to_dict.return_value = {}

    with patch("psycopg2.connect", return_value=mock_conn), \
         patch("backend.reports.runner.get_database_url", return_value="postgresql://test"), \
         patch("backend.reports.runner.fetch_sales_invoices", return_value=[]), \
         patch("backend.reports.runner.analyze_sales_orders", return_value=mock_payload), \
         patch("backend.reports.runner.format_report_md", return_value="# md"), \
         patch("threading.Thread"):

        run_report_task()

    all_sql = [str(c.args[0]) for c in mock_cursor.execute.call_args_list]
    success_update = next((s for s in all_sql if "status='success'" in s), None)

    assert success_update is not None, "No success UPDATE found in execute calls"
    assert "week_start" in success_update, "week_start missing from UPDATE"
    assert "week_end" in success_update, "week_end missing from UPDATE"
```

- [ ] **Step 2: Run to confirm it fails**

```bash
python -m pytest tests/test_reports_runner.py::test_run_report_task_writes_week_start_and_week_end -v
```

Expected: FAIL — `AssertionError: week_start missing from UPDATE`.

- [ ] **Step 3: Modify the success UPDATE in `runner.py`**

In `backend/reports/runner.py`, locate the `UPDATE report_records SET status='success'` block (around line 52). Replace it:

```python
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE report_records
                    SET status='success',
                        finished_at=NOW(),
                        summary_json=%s,
                        report_json=%s,
                        report_md=%s,
                        analysis_status='pending',
                        week_start=%s,
                        week_end=%s
                    WHERE id=%s
                    """,
                    (Json(summary), Json(payload.to_dict()), report_md, week_start, week_end, record_id),
                )
```

`week_start` and `week_end` are already in scope (returned by `resolve_week_range()` at line 27).

- [ ] **Step 4: Run test — expect PASS**

```bash
python -m pytest tests/test_reports_runner.py::test_run_report_task_writes_week_start_and_week_end -v
```

Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add backend/reports/runner.py tests/test_reports_runner.py
git commit -m "feat: write week_start/week_end into report_records on success"
```

---

## Task 4: Fix `fetch_prev_week_payload()` — use `week_start` column

**Files:**
- Modify: `backend/reports/llm_analyzer.py` (lines 19–48 and the call at line 129)
- Modify: `tests/test_reports_llm_analyzer.py` (add two more tests)

---

- [ ] **Step 1: Add failing tests to `tests/test_reports_llm_analyzer.py`**

Append to the existing file:

```python
import json


def _prev_payload_dict():
    return {
        "week_start": "2026-03-30",
        "week_end": "2026-04-05",
        "total_sales_amount": 800.0,
        "total_order_count": 10,
        "daily_stats": [],
        "top_customers": [],
        "status_stats": [],
    }


def _make_cursor_conn(row):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = row

    mock_ctx = MagicMock()
    mock_ctx.__enter__ = MagicMock(return_value=mock_cursor)
    mock_ctx.__exit__ = MagicMock(return_value=False)

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_ctx

    return mock_conn, mock_cursor


def test_fetch_prev_week_payload_queries_week_start_column():
    """SQL must filter by week_start < %s, not id != %s."""
    from unittest.mock import patch
    from backend.reports.llm_analyzer import fetch_prev_week_payload

    mock_conn, mock_cursor = _make_cursor_conn((_prev_payload_dict(),))

    with patch("psycopg2.connect", return_value=mock_conn):
        result = fetch_prev_week_payload("postgresql://test", "sales_weekly_basic", "2026-04-06")

    sql = mock_cursor.execute.call_args[0][0]
    assert "week_start < %s" in sql, f"Expected 'week_start < %s' in SQL, got: {sql}"
    assert "id !=" not in sql, "Old id != pattern should be removed"


def test_fetch_prev_week_payload_reconstructs_report_payload():
    from unittest.mock import patch
    from backend.reports.llm_analyzer import fetch_prev_week_payload

    mock_conn, _ = _make_cursor_conn((_prev_payload_dict(),))

    with patch("psycopg2.connect", return_value=mock_conn):
        result = fetch_prev_week_payload("postgresql://test", "sales_weekly_basic", "2026-04-06")

    assert result is not None
    assert result.week_start == "2026-03-30"
    assert result.total_sales_amount == 800.0


def test_fetch_prev_week_payload_returns_none_when_no_row():
    from unittest.mock import patch
    from backend.reports.llm_analyzer import fetch_prev_week_payload

    mock_conn, _ = _make_cursor_conn(None)

    with patch("psycopg2.connect", return_value=mock_conn):
        result = fetch_prev_week_payload("postgresql://test", "sales_weekly_basic", "2026-04-06")

    assert result is None
```

- [ ] **Step 2: Run to confirm they fail**

```bash
python -m pytest tests/test_reports_llm_analyzer.py::test_fetch_prev_week_payload_queries_week_start_column tests/test_reports_llm_analyzer.py::test_fetch_prev_week_payload_reconstructs_report_payload tests/test_reports_llm_analyzer.py::test_fetch_prev_week_payload_returns_none_when_no_row -v
```

Expected: FAIL — SQL assertion fails because old query uses `id !=`.

- [ ] **Step 3: Fix `fetch_prev_week_payload()` signature and query**

In `backend/reports/llm_analyzer.py`, replace the entire `fetch_prev_week_payload` function (lines 19–48):

```python
def fetch_prev_week_payload(db_url: str, task_key: str, current_week_start: str) -> Optional[ReportPayload]:
    """Return the most recent successful ReportPayload whose week_start < current_week_start."""
    conn = psycopg2.connect(db_url)
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT report_json FROM report_records
                WHERE task_key = %s
                  AND status = 'success'
                  AND week_start < %s
                  AND report_json IS NOT NULL
                ORDER BY week_start DESC
                LIMIT 1
                """,
                (task_key, current_week_start),
            )
            row = cur.fetchone()
        if not row or not row[0]:
            return None
        rj = row[0] if isinstance(row[0], dict) else json.loads(row[0])
        return ReportPayload(
            week_start=str(rj.get("week_start", "")),
            week_end=str(rj.get("week_end", "")),
            total_sales_amount=float(rj.get("total_sales_amount", 0)),
            total_order_count=int(rj.get("total_order_count", 0)),
            daily_stats=[DayStats(**item) for item in (rj.get("daily_stats") or [])],
            top_customers=[CustomerStat(**item) for item in (rj.get("top_customers") or [])],
            status_stats=[StatusStat(**item) for item in (rj.get("status_stats") or [])],
        )
    finally:
        conn.close()
```

- [ ] **Step 4: Update the call inside `run_llm_analysis()`**

In `backend/reports/llm_analyzer.py`, line 129, change:

```python
# Before
prev_payload = fetch_prev_week_payload(db_url, task_key, record_id)

# After
prev_payload = fetch_prev_week_payload(db_url, task_key, current_payload.week_start)
```

- [ ] **Step 5: Run all llm_analyzer tests — expect PASS**

```bash
python -m pytest tests/test_reports_llm_analyzer.py -v
```

Expected: 6 passed.

- [ ] **Step 6: Commit**

```bash
git add backend/reports/llm_analyzer.py tests/test_reports_llm_analyzer.py
git commit -m "fix: fetch_prev_week_payload uses week_start column for correct week comparison"
```

---

## Task 5: Create `<report-chart>` Lit custom element

**Files:**
- Create: `control-ui/src/ui/report-chart.ts`

No unit tests — verified by TypeScript build check + visual inspection.

---

- [ ] **Step 1: Create `control-ui/src/ui/report-chart.ts`**

```typescript
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type DailyStat = { date: string; order_count: number; sales_amount: number };
type CustomerStat = { customer_name: string; sales_amount: number; order_count: number };

@customElement("report-chart")
export class ReportChart extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .chart-wrap {
      position: relative;
      width: 100%;
    }
  `;

  @property({ type: Array }) data: (DailyStat | CustomerStat)[] = [];
  @property({ type: String }) type: "daily" | "customers" = "daily";

  private _chart: Chart | null = null;

  render() {
    const h =
      this.type === "customers"
        ? Math.max(220, this.data.length * 30)
        : 200;
    return html`
      <div class="chart-wrap" style="height:${h}px;">
        <canvas></canvas>
      </div>
    `;
  }

  updated() {
    this._rebuild();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._chart?.destroy();
    this._chart = null;
  }

  private _rebuild(): void {
    this._chart?.destroy();
    this._chart = null;

    const canvas = this.renderRoot.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas || !this.data.length) return;

    const bg = "rgba(99,102,241,0.72)";
    const border = "rgba(99,102,241,1)";

    if (this.type === "daily") {
      const rows = this.data as DailyStat[];
      this._chart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: rows.map((r) => r.date),
          datasets: [
            {
              label: "销售额",
              data: rows.map((r) => r.sales_amount),
              backgroundColor: bg,
              borderColor: border,
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `Rp ${Number(ctx.raw).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                afterLabel: (ctx) =>
                  `订单数: ${(rows[ctx.dataIndex] as DailyStat).order_count}`,
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
      });
    } else {
      const rows = [...(this.data as CustomerStat[])].reverse();
      this._chart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: rows.map((r) =>
            r.customer_name.length > 24
              ? r.customer_name.slice(0, 24) + "…"
              : r.customer_name,
          ),
          datasets: [
            {
              label: "销售额",
              data: rows.map((r) => r.sales_amount),
              backgroundColor: bg,
              borderColor: border,
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          indexAxis: "y" as const,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `Rp ${Number(ctx.raw).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                afterLabel: (ctx) =>
                  `订单数: ${(rows[ctx.dataIndex] as CustomerStat).order_count}`,
              },
            },
          },
          scales: {
            x: {
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
      });
    }
  }
}
```

- [ ] **Step 2: TypeScript build check**

```bash
cd "Agent Team version3/control-ui"
npx tsc --noEmit
```

Expected: no errors. If `Property 'type' does not exist on type 'HTMLElement'` appears, add `declare module "*.ts"` or check that `vite-ts-decorators` is active in `vite.config.ts`.

- [ ] **Step 3: Commit**

```bash
cd ..
git add control-ui/src/ui/report-chart.ts
git commit -m "feat: add report-chart Lit element with Chart.js daily and customer charts"
```

---

## Task 6: Add charts to `reports-tab.ts` data tab

**Files:**
- Modify: `control-ui/src/ui/views/reports-tab.ts`

---

- [ ] **Step 1: Add import at top of `reports-tab.ts`**

After the existing imports (around line 6), add:

```typescript
import "../report-chart.ts";
```

- [ ] **Step 2: Insert daily chart above daily table**

In `renderDataTab`, locate the `daily.length > 0` block (around line 100). Insert `<report-chart>` as the **first child** inside the template:

Replace:
```typescript
${daily.length > 0
  ? html`
      <div>
        <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
          ${t("agents.reports.tableDaily")}
        </div>
```

With:
```typescript
${daily.length > 0
  ? html`
      <report-chart type="daily" .data=${daily}></report-chart>
      <div>
        <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
          ${t("agents.reports.tableDaily")}
        </div>
```

- [ ] **Step 3: Insert customers chart above customers table**

Locate the `customers.length > 0` block (around line 131). Same pattern — insert `<report-chart>` as first child:

Replace:
```typescript
${customers.length > 0
  ? html`
      <div>
        <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
          ${t("agents.reports.tableCustomers")}
        </div>
```

With:
```typescript
${customers.length > 0
  ? html`
      <report-chart type="customers" .data=${customers}></report-chart>
      <div>
        <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
          ${t("agents.reports.tableCustomers")}
        </div>
```

- [ ] **Step 4: TypeScript build check**

```bash
cd "Agent Team version3/control-ui"
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd ..
git add control-ui/src/ui/views/reports-tab.ts
git commit -m "feat: add daily and customer charts to report data tab"
```

---

## Verification Checklist

After all tasks complete:

- [ ] Run full backend test suite: `python -m pytest tests/test_reports_llm_analyzer.py tests/test_reports_runner.py -v` — all green
- [ ] Start backend: `python run_backend.py` — `ensure_tables()` runs without error (new columns created)
- [ ] Trigger a report via `POST /api/reports/tasks/sales_weekly_basic/run` with `x-reports-token`
- [ ] Confirm `analysis_md` in DB contains clean Markdown (no `ThinkingBlock(...)`)
- [ ] Confirm `week_start` / `week_end` columns populated in the new row
- [ ] Open frontend → Agents → Reports tab → select a record → Data tab → verify two charts render above their respective tables
