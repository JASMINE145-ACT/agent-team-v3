# 周报可视化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 后端把销售发票周报格式化为 Markdown 存库（`report_md`），前端新增「周报」Tab 展示历史记录与完整报告正文，支持一键复制。

**Architecture:** 后端新增 `formatter.py` 把 `ReportPayload` → Markdown；`runner.py` 调用后写入 `report_records.report_md`；前端新 Tab `reports` 两栏布局，左栏列表，右栏 `<pre>` + 复制按钮；数据通过新接口 `GET /api/reports/records/{id}` 取回含 `report_md` 的完整记录。

**Tech Stack:** Python (psycopg2, APScheduler), FastAPI, Lit (TypeScript), Neon PostgreSQL, Accurate Online API

---

## File Map

### 后端（修改/新建）
| 文件 | 变更 |
|------|------|
| `backend/reports/models.py` | 加 `StatusStat` dataclass；`ReportPayload` 加 `status_stats`；`ensure_tables()` 加 ALTER COLUMN |
| `backend/reports/accurate_fetcher.py` | 端点改 invoice；加 `fields` 参数；函数改名 |
| `backend/reports/analyzer.py` | 字段映射改为 invoice 真实字段；加状态 groupby |
| `backend/reports/formatter.py` | **新建**：Markdown 生成逻辑 |
| `backend/reports/runner.py` | 调用 formatter；UPDATE 加 `report_md` |
| `backend/server/api/routes_reports.py` | 新增 GET `/records/{id}` 和 POST `/records/{id}/reformat` |
| `tests/test_reports_formatter.py` | **新建**：formatter 单元测试 |
| `tests/test_reports_analyzer.py` | 更新：字段映射测试 |

### 前端（修改/新建）
| 文件 | 变更 |
|------|------|
| `control-ui/src/ui/navigation.ts` | 加 `"reports"` tab |
| `control-ui/src/i18n/locales/en.ts` | 加 `tabs.reports`、`subtitles.reports`、`agents.reports.*` 新键 |
| `control-ui/src/i18n/locales/zh-CN.ts` | 同上中文版 |
| `control-ui/src/ui/types.ts` | `ReportRecord` 加 `report_md?` |
| `control-ui/src/ui/app-view-state.ts` | 加 `reportDetail`、`reportDetailLoading`、`selectedRecordId` |
| `control-ui/src/ui/controllers/reports.ts` | 加 `loadReportDetail`；更新 `ReportsState` |
| `control-ui/src/ui/views/reports-tab.ts` | **新建**：周报 Tab 两栏视图 |
| `control-ui/src/ui/app-render.ts` | import reports-tab；加 `state.tab === "reports"` 分支 |

---

## Task 1: 数据库 migration + StatusStat 数据模型

**Files:**
- Modify: `backend/reports/models.py`

- [ ] **Step 1: 在 `models.py` 加 `StatusStat` dataclass 和扩展 `ReportPayload`**

替换 `models.py` 中对应部分（保留原有内容，仅追加/修改）：

```python
@dataclass
class StatusStat:
    status_name: str       # e.g. "Belum Lunas", "Lunas"
    count: int
    total_amount: float
```

在 `ReportPayload` dataclass 末尾加字段：

```python
@dataclass
class ReportPayload:
    week_start: str
    week_end: str
    total_sales_amount: float
    total_order_count: int
    daily_stats: List[DayStats]
    top_customers: List[CustomerStat]
    status_stats: List["StatusStat"]   # 新增
```

同时在文件顶部 import 处确认 `StatusStat` 在 `List["StatusStat"]` 引用之前已定义（同文件，无需 forward ref，直接写 `List[StatusStat]`）。

- [ ] **Step 2: 在 `ensure_tables()` 末尾加 `report_md` 列**

在 `ensure_tables()` 函数最后、`conn.close()` 之前追加：

```python
cur.execute(
    "ALTER TABLE report_records ADD COLUMN IF NOT EXISTS report_md TEXT NULL;"
)
```

完整 `ensure_tables()` 末尾看起来这样：

```python
def ensure_tables() -> None:
    conn = psycopg2.connect(get_database_url())
    try:
        conn.autocommit = True
        with conn.cursor() as cur:
            for ddl in _DDL:
                cur.execute(ddl)
            cur.execute(
                """
                INSERT INTO report_task_config(task_key, title, enabled, cron_expr, timezone)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (task_key) DO NOTHING
                """,
                ("sales_weekly_basic", "销售发票周报（基础版）", True, "0 9 * * 1", "Asia/Shanghai"),
            )
            cur.execute(
                "ALTER TABLE report_records ADD COLUMN IF NOT EXISTS report_md TEXT NULL;"
            )
    finally:
        conn.close()
```

- [ ] **Step 3: 验证 `to_dict()` 包含新字段**

```python
# 手动验证（不需要写测试，只需运行以下命令确认无导入错误）
Set-Location "d:\Projects\agent-jk\Agent Team version3"
py -c "from backend.reports.models import StatusStat, ReportPayload; print('OK')"
```

Expected output: `OK`

- [ ] **Step 4: Commit**

```bash
git add backend/reports/models.py
git commit -m "feat(reports): add StatusStat model and report_md migration"
```

---

## Task 2: 更新 accurate_fetcher.py

**Files:**
- Modify: `backend/reports/accurate_fetcher.py`

- [ ] **Step 1: 替换整个文件内容**

```python
from __future__ import annotations

from datetime import date
from typing import Any, Dict, List

from backend.tools.inventory.lib.api.client import AccurateOnlineAPIClient

INVOICE_FIELDS = "id,number,transDate,customer,description,statusName,age,totalAmount"


def ping_accurate() -> Dict[str, Any]:
    client = AccurateOnlineAPIClient()
    return client.get_db_list()


def fetch_sales_invoices(week_start: date, week_end: date, page_size: int = 100) -> List[Dict[str, Any]]:
    client = AccurateOnlineAPIClient()
    page = 1
    items: List[Dict[str, Any]] = []

    while True:
        params = {
            "sp.page": page,
            "sp.pageSize": page_size,
            "fields": INVOICE_FIELDS,
            "filter.transDate.startDate": week_start.isoformat(),
            "filter.transDate.endDate": week_end.isoformat(),
        }
        payload = client.get("/api/sales-invoice/list.do", params=params, use_database_url=True)
        rows = payload.get("d", []) if isinstance(payload, dict) else []
        if not isinstance(rows, list) or not rows:
            break
        items.extend(rows)
        if len(rows) < page_size:
            break
        page += 1

    return items
```

> 注意：旧函数 `fetch_sales_orders` 已删除；`runner.py` 和 `analyzer.py` 将在后续 Task 中更新对应引用。

- [ ] **Step 2: 验证 import 无错**

```
py -c "from backend.reports.accurate_fetcher import fetch_sales_invoices; print('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add backend/reports/accurate_fetcher.py
git commit -m "feat(reports): switch to sales-invoice endpoint with field projection"
```

---

## Task 3: 更新 analyzer.py（invoice 字段映射 + 状态汇总）

**Files:**
- Modify: `backend/reports/analyzer.py`
- Modify: `tests/test_reports_analyzer.py`

- [ ] **Step 1: 写失败测试（更新现有测试文件）**

在 `tests/test_reports_analyzer.py` 中**替换/追加**以下测试（保留已有通过的测试）：

```python
def test_analyze_invoice_fields():
    """analyzer 正确处理 invoice 真实字段结构"""
    from datetime import date
    from backend.reports.analyzer import analyze_sales_orders as analyze_sales_invoices
    
    orders = [
        {
            "id": 1,
            "number": "INV/001",
            "transDate": "07/04/2026",
            "customer": {"name": "PT. ABC", "id": 100},
            "description": "LTL-001",
            "statusName": "Belum Lunas",
            "age": -5,
            "totalAmount": 1_000_000.0,
        },
        {
            "id": 2,
            "number": "INV/002",
            "transDate": "08/04/2026",
            "customer": {"name": "PT. XYZ", "id": 200},
            "description": "SO-002",
            "statusName": "Lunas",
            "age": 3,
            "totalAmount": 500_000.0,
        },
    ]
    week_start = date(2026, 4, 7)
    week_end = date(2026, 4, 13)
    payload = analyze_sales_invoices(week_start, week_end, orders)
    
    assert payload.total_order_count == 2
    assert abs(payload.total_sales_amount - 1_500_000.0) < 0.01
    assert any(c.customer_name == "PT. ABC" for c in payload.top_customers)
    assert len(payload.status_stats) == 2
    belum = next(s for s in payload.status_stats if s.status_name == "Belum Lunas")
    assert belum.count == 1
    assert abs(belum.total_amount - 1_000_000.0) < 0.01


def test_analyze_empty_invoices():
    from datetime import date
    from backend.reports.analyzer import analyze_sales_orders as analyze_sales_invoices
    week_start = date(2026, 4, 7)
    week_end = date(2026, 4, 13)
    payload = analyze_sales_invoices(week_start, week_end, [])
    assert payload.total_order_count == 0
    assert payload.status_stats == []
```

- [ ] **Step 2: 运行测试，确认失败**

```
py -m pytest tests/test_reports_analyzer.py::test_analyze_invoice_fields -v
```

Expected: FAIL（`customer_name` 取不到，或 `status_stats` 不存在）

- [ ] **Step 3: 更新 `analyzer.py`**

```python
from __future__ import annotations

from datetime import date
from typing import Any, Dict, List

import pandas as pd

from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat


def _to_float(v: Any) -> float:
    try:
        return float(v or 0)
    except (TypeError, ValueError):
        return 0.0


def _parse_trans_date(v: Any):
    """Parse DD/MM/YYYY string to date; returns None on failure."""
    if not v or not isinstance(v, str):
        return None
    try:
        from datetime import datetime
        return datetime.strptime(v, "%d/%m/%Y").date()
    except ValueError:
        return None


def analyze_sales_orders(week_start: date, week_end: date, orders: List[Dict[str, Any]]) -> ReportPayload:
    if not orders:
        return ReportPayload(
            week_start=week_start.isoformat(),
            week_end=week_end.isoformat(),
            total_sales_amount=0.0,
            total_order_count=0,
            daily_stats=[],
            top_customers=[],
            status_stats=[],
        )

    df = pd.DataFrame(orders)

    # --- customer name: nested dict customer.name ---
    def _customer_name(row: Any) -> str:
        if isinstance(row, dict):
            return str(row.get("name") or "Unknown")
        return str(row) if row else "Unknown"

    df["_customer_name"] = df["customer"].apply(_customer_name) if "customer" in df.columns else "Unknown"
    df["_amount"] = df["totalAmount"].apply(_to_float) if "totalAmount" in df.columns else 0.0
    df["_status"] = df["statusName"].fillna("Unknown") if "statusName" in df.columns else "Unknown"
    df["_date"] = df["transDate"].apply(_parse_trans_date) if "transDate" in df.columns else None
    if "id" not in df.columns:
        df["id"] = range(1, len(df) + 1)

    # Daily stats
    day_group = (
        df[df["_date"].notna()]
        .groupby("_date")
        .agg(order_count=("id", "count"), sales_amount=("_amount", "sum"))
        .reset_index()
        .sort_values("_date")
    )
    daily_stats = [
        DayStats(
            date=row["_date"].isoformat(),
            order_count=int(row["order_count"]),
            sales_amount=float(row["sales_amount"]),
        )
        for _, row in day_group.iterrows()
    ]

    # Top 10 customers
    customer_group = (
        df.groupby("_customer_name")
        .agg(order_count=("id", "count"), sales_amount=("_amount", "sum"))
        .reset_index()
        .sort_values("sales_amount", ascending=False)
        .head(10)
    )
    top_customers = [
        CustomerStat(
            customer_name=str(row["_customer_name"]),
            sales_amount=float(row["sales_amount"]),
            order_count=int(row["order_count"]),
        )
        for _, row in customer_group.iterrows()
    ]

    # Status stats
    status_group = (
        df.groupby("_status")
        .agg(count=("id", "count"), total_amount=("_amount", "sum"))
        .reset_index()
        .sort_values("total_amount", ascending=False)
    )
    status_stats = [
        StatusStat(
            status_name=str(row["_status"]),
            count=int(row["count"]),
            total_amount=float(row["total_amount"]),
        )
        for _, row in status_group.iterrows()
    ]

    return ReportPayload(
        week_start=week_start.isoformat(),
        week_end=week_end.isoformat(),
        total_sales_amount=float(df["_amount"].sum()),
        total_order_count=int(len(df)),
        daily_stats=daily_stats,
        top_customers=top_customers,
        status_stats=status_stats,
    )
```

- [ ] **Step 4: 运行测试，确认通过**

```
py -m pytest tests/test_reports_analyzer.py -v
```

Expected: 全部 PASS

- [ ] **Step 5: Commit**

```bash
git add backend/reports/analyzer.py tests/test_reports_analyzer.py
git commit -m "feat(reports): remap analyzer to invoice fields, add status_stats"
```

---

## Task 4: 新建 formatter.py

**Files:**
- Create: `backend/reports/formatter.py`
- Create: `tests/test_reports_formatter.py`

- [ ] **Step 1: 写失败测试**

```python
# tests/test_reports_formatter.py
from datetime import date
from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat
from backend.reports.formatter import format_report_md


def _sample_payload() -> ReportPayload:
    return ReportPayload(
        week_start="2026-04-07",
        week_end="2026-04-13",
        total_sales_amount=1_500_000.0,
        total_order_count=2,
        daily_stats=[
            DayStats(date="2026-04-07", order_count=1, sales_amount=1_000_000.0),
            DayStats(date="2026-04-08", order_count=1, sales_amount=500_000.0),
        ],
        top_customers=[
            CustomerStat(customer_name="PT. ABC", sales_amount=1_000_000.0, order_count=1),
            CustomerStat(customer_name="PT. XYZ", sales_amount=500_000.0, order_count=1),
        ],
        status_stats=[
            StatusStat(status_name="Belum Lunas", count=1, total_amount=1_000_000.0),
            StatusStat(status_name="Lunas", count=1, total_amount=500_000.0),
        ],
    )


def test_format_contains_header():
    md = format_report_md(_sample_payload())
    assert "2026-04-07" in md
    assert "2026-04-13" in md


def test_format_contains_totals():
    md = format_report_md(_sample_payload())
    assert "1,500,000" in md
    assert "2" in md


def test_format_contains_customer():
    md = format_report_md(_sample_payload())
    assert "PT. ABC" in md


def test_format_contains_status():
    md = format_report_md(_sample_payload())
    assert "Belum Lunas" in md
    assert "Lunas" in md


def test_format_empty_status_stats():
    """空状态列表时不输出状态汇总段"""
    payload = _sample_payload()
    payload.status_stats = []
    md = format_report_md(payload)
    assert "状态汇总" not in md
```

- [ ] **Step 2: 运行，确认失败**

```
py -m pytest tests/test_reports_formatter.py -v
```

Expected: ImportError / FAIL

- [ ] **Step 3: 创建 `backend/reports/formatter.py`**

```python
from __future__ import annotations

from backend.reports.models import ReportPayload


def _rp(amount: float) -> str:
    """Format Rp amount with thousand separators, no decimals."""
    return f"Rp {amount:,.0f}"


def format_report_md(payload: ReportPayload) -> str:
    lines: list[str] = []

    lines.append(f"# 销售发票周报｜{payload.week_start} ~ {payload.week_end}")
    lines.append("")
    lines.append(f"**本周开票数**：{payload.total_order_count} 张")
    lines.append(f"**本周开票总额**：{_rp(payload.total_sales_amount)}")
    lines.append("")

    # Daily trend
    if payload.daily_stats:
        lines.append("## 每日开票趋势")
        lines.append("")
        lines.append("| 日期 | 发票数 | 金额 |")
        lines.append("|------|--------|------|")
        for d in payload.daily_stats:
            lines.append(f"| {d.date} | {d.order_count} | {_rp(d.sales_amount)} |")
        lines.append("")

    # Top customers
    if payload.top_customers:
        lines.append("## 客户明细（Top 10）")
        lines.append("")
        lines.append("| 排名 | 客户名称 | 发票数 | 金额 |")
        lines.append("|------|----------|--------|------|")
        for i, c in enumerate(payload.top_customers, 1):
            lines.append(f"| {i} | {c.customer_name} | {c.order_count} | {_rp(c.sales_amount)} |")
        lines.append("")

    # Status summary
    if payload.status_stats:
        lines.append("## 状态汇总")
        lines.append("")
        lines.append("| 状态 | 张数 | 金额 |")
        lines.append("|------|------|------|")
        for s in payload.status_stats:
            lines.append(f"| {s.status_name} | {s.count} | {_rp(s.total_amount)} |")
        lines.append("")

    return "\n".join(lines)
```

- [ ] **Step 4: 运行测试，确认全部通过**

```
py -m pytest tests/test_reports_formatter.py -v
```

Expected: 5 passed

- [ ] **Step 5: Commit**

```bash
git add backend/reports/formatter.py tests/test_reports_formatter.py
git commit -m "feat(reports): add markdown formatter with daily/customer/status sections"
```

---

## Task 5: 更新 runner.py（调用 formatter，写 report_md）

**Files:**
- Modify: `backend/reports/runner.py`

- [ ] **Step 1: 替换整个文件**

```python
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any, Dict, Tuple

import psycopg2
from psycopg2.extras import Json

from backend.reports.accurate_fetcher import fetch_sales_invoices
from backend.reports.analyzer import analyze_sales_orders
from backend.reports.formatter import format_report_md
from backend.reports.models import get_database_url


def resolve_week_range(now: datetime | None = None) -> Tuple[Any, Any]:
    now = now or datetime.now()
    this_monday = now.date() - timedelta(days=now.weekday())
    week_start = this_monday - timedelta(days=7)
    week_end = this_monday - timedelta(days=1)
    return week_start, week_end


def run_report_task(task_key: str = "sales_weekly_basic", trigger_type: str = "manual") -> Dict[str, Any]:
    db_url = get_database_url()
    week_start, week_end = resolve_week_range()
    conn = psycopg2.connect(db_url)
    record_id = None
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO report_records(task_key, status, trigger_type, started_at)
                    VALUES (%s, 'running', %s, NOW())
                    RETURNING id
                    """,
                    (task_key, trigger_type),
                )
                record_id = cur.fetchone()[0]

        invoices = fetch_sales_invoices(week_start, week_end)
        payload = analyze_sales_orders(week_start, week_end, invoices)
        report_md = format_report_md(payload)
        summary = {
            "total_order_count": payload.total_order_count,
            "total_sales_amount": payload.total_sales_amount,
        }

        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE report_records
                    SET status='success',
                        finished_at=NOW(),
                        summary_json=%s,
                        report_json=%s,
                        report_md=%s
                    WHERE id=%s
                    """,
                    (Json(summary), Json(payload.to_dict()), report_md, record_id),
                )
        return {"record_id": record_id, "status": "success", "summary": summary}
    except Exception as e:
        if record_id is not None:
            with conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE report_records
                        SET status='failed',
                            finished_at=NOW(),
                            error_message=%s
                        WHERE id=%s
                        """,
                        (str(e), record_id),
                    )
        raise
    finally:
        conn.close()
```

- [ ] **Step 2: 验证 import 无错**

```
py -c "from backend.reports.runner import run_report_task; print('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add backend/reports/runner.py
git commit -m "feat(reports): write report_md to db after formatter call"
```

---

## Task 6: 新增 API 接口（records/{id} + reformat）

**Files:**
- Modify: `backend/server/api/routes_reports.py`

- [ ] **Step 1: 在文件末尾追加两个接口**

在 `routes_reports.py` 末尾（`list_records` 函数之后）追加：

```python
@router.get("/api/reports/records/{record_id}")
async def get_record_detail(
    record_id: int, x_reports_token: str | None = Header(default=None)
) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)

    def _get_sync() -> Dict[str, Any] | None:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, task_key, status, trigger_type, started_at, finished_at,
                           error_message, summary_json, report_md
                    FROM report_records
                    WHERE id = %s
                    """,
                    (record_id,),
                )
                row = cur.fetchone()
            if not row:
                return None
            return {
                "id": row[0],
                "task_key": row[1],
                "status": row[2],
                "trigger_type": row[3],
                "started_at": row[4].isoformat() if row[4] else None,
                "finished_at": row[5].isoformat() if row[5] else None,
                "error_message": row[6],
                "summary_json": row[7],
                "report_md": row[8],
            }
        finally:
            conn.close()

    data = await asyncio.to_thread(_get_sync)
    if data is None:
        raise HTTPException(status_code=404, detail=f"record not found: {record_id}")
    return {"success": True, "data": data}


@router.post("/api/reports/records/{record_id}/reformat")
async def reformat_record(
    record_id: int, x_reports_token: str | None = Header(default=None)
) -> Dict[str, Any]:
    """Regenerate report_md from existing report_json for old records."""
    _require_reports_token(x_reports_token)
    import json as _json
    from backend.reports.analyzer import analyze_sales_orders
    from backend.reports.formatter import format_report_md
    from backend.reports.models import ReportPayload, CustomerStat, DayStats, StatusStat

    def _reformat_sync() -> bool:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT report_json FROM report_records WHERE id=%s", (record_id,))
                row = cur.fetchone()
                if not row or not row[0]:
                    return False
                rj = row[0] if isinstance(row[0], dict) else _json.loads(row[0])
                # Reconstruct ReportPayload from stored report_json
                payload = ReportPayload(
                    week_start=rj.get("week_start", ""),
                    week_end=rj.get("week_end", ""),
                    total_sales_amount=float(rj.get("total_sales_amount", 0)),
                    total_order_count=int(rj.get("total_order_count", 0)),
                    daily_stats=[DayStats(**d) for d in rj.get("daily_stats", [])],
                    top_customers=[CustomerStat(**c) for c in rj.get("top_customers", [])],
                    status_stats=[StatusStat(**s) for s in rj.get("status_stats", [])],
                )
                md = format_report_md(payload)
            with conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "UPDATE report_records SET report_md=%s WHERE id=%s",
                        (md, record_id),
                    )
            return True
        finally:
            conn.close()

    ok = await asyncio.to_thread(_reformat_sync)
    if not ok:
        raise HTTPException(status_code=404, detail=f"record not found or has no report_json: {record_id}")
    return {"success": True}
```

- [ ] **Step 2: 验证服务器启动无错（仅检查 import）**

```
py -c "from backend.server.api.routes_reports import router; print('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add backend/server/api/routes_reports.py
git commit -m "feat(reports): add GET /records/{id} and POST /records/{id}/reformat endpoints"
```

---

## Task 7: 前端 navigation + i18n

**Files:**
- Modify: `control-ui/src/ui/navigation.ts`
- Modify: `control-ui/src/i18n/locales/en.ts`
- Modify: `control-ui/src/i18n/locales/zh-CN.ts`

- [ ] **Step 1: 更新 `navigation.ts`**

在 `navigation.ts` 中做 4 处修改：

**(a) TAB_GROUPS**
```ts
// 改前
{ label: "agent", tabs: ["agents", "skills", "nodes"] },
// 改后
{ label: "agent", tabs: ["agents", "skills", "nodes", "reports"] },
```

**(b) Tab 类型**
```ts
// 在 "nodes" 后面加
  | "reports"
```

**(c) TAB_PATHS**
```ts
// 在 nodes: "/nodes", 后面加
  reports: "/reports",
```

**(d) iconForTab switch**
```ts
// 在 case "nodes": return "monitor"; 后面加
    case "reports":
      return "barChart2";
```

> `barChart2` 已在 icons.ts 中存在（同其他 barChart 图标）；若不存在，改用 `"barChart"` 即可。

- [ ] **Step 2: 确认 barChart2 存在**

```
Set-Location "control-ui"
findstr /C:"barChart2" src\ui\icons.ts
```

若无结果，把 `"barChart2"` 改为 `"barChart"`。

- [ ] **Step 3: 更新 `en.ts`**

在 `tabs` 对象末尾 `logs: "Logs",` 后加：
```ts
reports: "Reports",
```

在 `subtitles` 对象末尾加：
```ts
reports: "Weekly sales invoice reports. Click a record to view full content.",
```

在 `agents.reports` 对象（已有 `whereHint` 等键）末尾追加：
```ts
detailLoading: "Loading report…",
detailEmpty: "Select a record on the left to view the report.",
copyBtn: "Copy",
copiedBtn: "Copied!",
reformatBtn: "Regenerate text",
```

- [ ] **Step 4: 更新 `zh-CN.ts`**

在 `tabs` 对象 `logs: "日志",` 后加：
```ts
reports: "周报",
```

在 `subtitles` 对象末尾加：
```ts
reports: "销售发票周报历史。点击记录查看完整报告。",
```

在 `agents.reports` 对象末尾追加：
```ts
detailLoading: "加载报告中…",
detailEmpty: "选择左侧记录查看报告正文。",
copyBtn: "复制",
copiedBtn: "已复制！",
reformatBtn: "重新生成报告文本",
```

- [ ] **Step 5: Commit**

```bash
git add control-ui/src/ui/navigation.ts control-ui/src/i18n/locales/en.ts control-ui/src/i18n/locales/zh-CN.ts
git commit -m "feat(reports-ui): add reports tab to navigation and i18n keys"
```

---

## Task 8: 更新 types.ts + app-view-state.ts

**Files:**
- Modify: `control-ui/src/ui/types.ts`
- Modify: `control-ui/src/ui/app-view-state.ts`

- [ ] **Step 1: `types.ts` — 给 `ReportRecord` 加 `report_md`**

找到：
```ts
export type ReportRecord = {
  id: number;
  task_key: string;
  status: "running" | "success" | "failed";
  trigger_type: string;
  started_at: string;
  finished_at?: string | null;
  error_message?: string | null;
  summary_json?: Record<string, unknown> | null;
};
```

改为：
```ts
export type ReportRecord = {
  id: number;
  task_key: string;
  status: "running" | "success" | "failed";
  trigger_type: string;
  started_at: string;
  finished_at?: string | null;
  error_message?: string | null;
  summary_json?: Record<string, unknown> | null;
  report_md?: string | null;  // only present in detail responses
};
```

- [ ] **Step 2: `app-view-state.ts` — 加三个字段**

找到：
```ts
  reportsEditingTaskId: string | null;
  reportsEditForm: import("./types.js").ReportTaskConfig;
```

改为：
```ts
  reportsEditingTaskId: string | null;
  reportsEditForm: import("./types.js").ReportTaskConfig;
  reportDetail: import("./types.js").ReportRecord | null;
  reportDetailLoading: boolean;
  selectedRecordId: number | null;
```

- [ ] **Step 3: Commit**

```bash
git add control-ui/src/ui/types.ts control-ui/src/ui/app-view-state.ts
git commit -m "feat(reports-ui): add report_md to ReportRecord, detail state fields"
```

---

## Task 9: 更新 controllers/reports.ts

**Files:**
- Modify: `control-ui/src/ui/controllers/reports.ts`

- [ ] **Step 1: 扩展 `ReportsState` 和加 `loadReportDetail`**

在文件顶部的 `ReportsState` 类型定义末尾加三个字段：

```ts
export type ReportsState = {
  basePath: string;
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: ReportTask[];
  reportsRecords: ReportRecord[];
  reportsAdminToken: string;
  reportDetail: ReportRecord | null;        // 新增
  reportDetailLoading: boolean;             // 新增
  selectedRecordId: number | null;          // 新增
};
```

在文件末尾（`saveReportTaskConfig` 之后）追加：

```ts
export async function loadReportDetail(state: ReportsState, id: number): Promise<void> {
  state.selectedRecordId = id;
  state.reportDetailLoading = true;
  state.reportDetail = null;
  try {
    const res = await fetch(apiUrl(state.basePath, `/api/reports/records/${id}`), {
      headers: headers(state.reportsAdminToken),
    });
    state.reportDetail = await parseResponse<ReportRecord>(res);
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
  } finally {
    state.reportDetailLoading = false;
  }
}

export async function reformatRecord(state: ReportsState, id: number): Promise<void> {
  state.reportsError = null;
  try {
    const res = await fetch(apiUrl(state.basePath, `/api/reports/records/${id}/reformat`), {
      method: "POST",
      headers: headers(state.reportsAdminToken),
    });
    await parseResponse<Record<string, unknown>>(res);
    await loadReportDetail(state, id);
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
    throw err;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add control-ui/src/ui/controllers/reports.ts
git commit -m "feat(reports-ui): add loadReportDetail and reformatRecord to controller"
```

---

## Task 10: 新建 views/reports-tab.ts

**Files:**
- Create: `control-ui/src/ui/views/reports-tab.ts`

- [ ] **Step 1: 创建文件**

```ts
import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import type { ReportRecord, ReportTask, ReportTaskConfig } from "../types.ts";

export type ReportsTabParams = {
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: ReportTask[];
  reportsRecords: ReportRecord[];
  reportsAdminToken: string;
  reportDetail: ReportRecord | null;
  reportDetailLoading: boolean;
  selectedRecordId: number | null;
  reportsEditingTaskId: string | null;
  reportsEditForm: ReportTaskConfig;
  onTokenChange: (token: string) => void;
  onRefresh: () => void;
  onSelectRecord: (id: number) => void;
  onCopy: () => void;
  onReformat: (id: number) => void;
  onReportsRun: (taskKey: string) => void;
  onReportsEditStart: (task: ReportTask) => void;
  onReportsEditCancel: () => void;
  onReportsEditChange: (patch: ReportTaskConfig) => void;
  onReportsEditSave: (taskKey: string) => void;
  copyJustDone: boolean;
};

export function renderReportsTab(params: ReportsTabParams) {
  const { reportsRecords, reportDetail, selectedRecordId, reportDetailLoading } = params;

  const renderDetail = () => {
    if (reportDetailLoading) {
      return html`<div class="muted">${t("agents.reports.detailLoading")}</div>`;
    }
    if (!reportDetail) {
      return html`<div class="muted">${t("agents.reports.detailEmpty")}</div>`;
    }
    if (!reportDetail.report_md) {
      return html`
        <div class="callout info" style="margin-bottom: 12px;">
          暂无报告文本。
          <button
            class="btn btn--sm"
            style="margin-left: 8px;"
            @click=${() => params.onReformat(reportDetail.id)}
          >${t("agents.reports.reformatBtn")}</button>
        </div>
      `;
    }
    return html`
      <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
        <button class="btn btn--sm primary" @click=${params.onCopy}>
          ${params.copyJustDone ? t("agents.reports.copiedBtn") : t("agents.reports.copyBtn")}
        </button>
      </div>
      <pre style="white-space: pre-wrap; word-break: break-word; font-size: 13px; line-height: 1.6; background: var(--surface-2, #f5f5f5); padding: 12px; border-radius: 6px; overflow: auto;">${reportDetail.report_md}</pre>
    `;
  };

  return html`
    <div style="display: flex; gap: 0; height: 100%; overflow: hidden;">
      <!-- Left panel: record list -->
      <div style="width: 35%; min-width: 220px; border-right: 1px solid var(--border, #e0e0e0); display: flex; flex-direction: column; overflow: hidden;">
        <div style="padding: 12px; border-bottom: 1px solid var(--border, #e0e0e0);">
          <label class="field" style="margin-bottom: 8px;">
            <span>${t("agents.reports.tokenLabel")}</span>
            <input
              .value=${params.reportsAdminToken}
              placeholder="x-reports-token"
              @input=${(e: Event) => params.onTokenChange((e.target as HTMLInputElement).value)}
            />
          </label>
          <button
            class="btn btn--sm"
            ?disabled=${params.reportsLoading}
            @click=${params.onRefresh}
            style="width: 100%;"
          >
            ${params.reportsLoading ? t("common.loading") : t("common.refresh")}
          </button>
          ${params.reportsError
            ? html`<div class="callout danger" style="margin-top: 8px; font-size: 12px;">${params.reportsError}</div>`
            : nothing}
        </div>
        <div style="flex: 1; overflow-y: auto;">
          ${reportsRecords.length === 0
            ? html`<div class="muted" style="padding: 12px;">${t("agents.reports.noRecords")}</div>`
            : reportsRecords.map((r) => {
                const selected = r.id === selectedRecordId;
                const summary = r.summary_json as { total_order_count?: number; total_sales_amount?: number } | null;
                return html`
                  <div
                    class="list-item ${selected ? "active" : ""}"
                    style="cursor: pointer; padding: 10px 12px; border-bottom: 1px solid var(--border, #eee); background: ${selected ? "var(--accent-subtle, #e8f4ff)" : "transparent"};"
                    @click=${() => params.onSelectRecord(r.id)}
                  >
                    <div style="font-size: 12px; font-weight: 600;">#${r.id} · ${r.task_key}</div>
                    <div style="font-size: 11px; color: var(--text-muted, #888); margin-top: 2px;">${r.started_at?.slice(0, 10) ?? ""}</div>
                    <div style="margin-top: 4px; display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                      <span class="badge ${r.status === "success" ? "green" : r.status === "failed" ? "red" : "yellow"}">${r.status}</span>
                      ${summary ? html`<span style="font-size: 11px; color: var(--text-muted, #888);">${summary.total_order_count ?? 0} 张</span>` : nothing}
                    </div>
                  </div>
                `;
              })}
        </div>
      </div>

      <!-- Right panel: report detail -->
      <div style="flex: 1; padding: 16px; overflow-y: auto;">
        ${renderDetail()}
      </div>
    </div>
  `;
}
```

- [ ] **Step 2: Commit**

```bash
git add control-ui/src/ui/views/reports-tab.ts
git commit -m "feat(reports-ui): add reports-tab view with two-panel layout and copy button"
```

---

## Task 11: 接入 app-render.ts + app-view-state 初始值 + build

**Files:**
- Modify: `control-ui/src/ui/app-render.ts`
- Modify: `control-ui/src/ui/app-view-state.ts` (初始值)

- [ ] **Step 1: `app-render.ts` — import + 新 tab 分支**

在 import 块中加（与其他 views import 放一起）：

```ts
import { renderReportsTab } from "./views/reports-tab.ts";
import { loadReportDetail, reformatRecord } from "./controllers/reports.ts";
```

在 `state.tab === "nodes"` 的 `nothing` 之后（约 1000 行附近），加：

```ts
${state.tab === "reports"
  ? renderReportsTab({
      reportsLoading: state.reportsLoading,
      reportsError: state.reportsError,
      reportsTasks: state.reportsTasks,
      reportsRecords: state.reportsRecords,
      reportsAdminToken: state.reportsAdminToken,
      reportDetail: state.reportDetail,
      reportDetailLoading: state.reportDetailLoading,
      selectedRecordId: state.selectedRecordId,
      reportsEditingTaskId: state.reportsEditingTaskId,
      reportsEditForm: state.reportsEditForm,
      copyJustDone: state.reportsCopyJustDone ?? false,
      onTokenChange: (token) => (state.reportsAdminToken = token),
      onRefresh: () => loadReports(state),
      onSelectRecord: (id) => loadReportDetail(state, id),
      onCopy: () => {
        if (state.reportDetail?.report_md) {
          void navigator.clipboard.writeText(state.reportDetail.report_md);
          state.reportsCopyJustDone = true;
          setTimeout(() => { state.reportsCopyJustDone = false; }, 2000);
        }
      },
      onReformat: (id) => reformatRecord(state, id),
      onReportsRun: (taskKey) => runReportTask(state, taskKey),
      onReportsEditStart: (task) => {
        state.reportsEditingTaskId = task.task_key;
        state.reportsEditForm = {};
      },
      onReportsEditCancel: () => { state.reportsEditingTaskId = null; },
      onReportsEditChange: (patch) => { state.reportsEditForm = patch; },
      onReportsEditSave: (taskKey) => saveReportTaskConfig(state, taskKey, state.reportsEditForm),
    })
  : nothing}
```

- [ ] **Step 2: 给 `app-view-state.ts` 加初始值（AppViewState 的初始化器）**

找到 state 初始化的地方（通常是 `createInitialState()` 或对象字面量赋值），在 `reportsEditForm: {}` 之后加：

```ts
reportDetail: null,
reportDetailLoading: false,
selectedRecordId: null,
reportsCopyJustDone: false,
```

同时在 `AppViewState` 类型定义中加：
```ts
reportsCopyJustDone: boolean;
```

- [ ] **Step 3: 加载时机 — 切换到 reports tab 时自动 loadReports**

在 `app-render.ts` 中找到 tab 切换的 `onTabChange` 或 `handleTabChange` 逻辑，在切换到 `"reports"` 时加：

```ts
if (tab === "reports") {
  void loadReports(state);
}
```

- [ ] **Step 4: Build 并确认无 TypeScript 错误**

```
Set-Location "control-ui"
npm run build
```

Expected: `✓ built in X.XXs` 无 error

- [ ] **Step 5: Commit**

```bash
git add control-ui/src/ui/app-render.ts control-ui/src/ui/app-view-state.ts
git commit -m "feat(reports-ui): wire reports tab into app-render"
```

---

## Task 12: 端到端验证

- [ ] **Step 1: 确认 `REPORTS_ADMIN_TOKEN` 已在 `.env` 中设置（非空字符串）**

```
py -c "import os; from dotenv import load_dotenv; load_dotenv(); print('TOKEN:', bool(os.getenv('REPORTS_ADMIN_TOKEN')))"
```

Expected: `TOKEN: True`

- [ ] **Step 2: 确认 DB migration 生效**

```
py -c "
from backend.reports.models import ensure_tables
ensure_tables()
print('Migration OK')
"
```

Expected: `Migration OK`（Neon 上 `report_md` 列已存在，`IF NOT EXISTS` 幂等）

- [ ] **Step 3: 手动触发一次任务**

```
py -c "
from backend.reports.runner import run_report_task
result = run_report_task('sales_weekly_basic', 'manual')
print(result)
"
```

Expected: `{'record_id': N, 'status': 'success', 'summary': {...}}`

- [ ] **Step 4: 验证 report_md 写入 DB**

```
py -c "
import psycopg2, os
from dotenv import load_dotenv; load_dotenv()
conn = psycopg2.connect(os.getenv('DATABASE_URL'))
with conn.cursor() as cur:
    cur.execute('SELECT id, status, report_md IS NOT NULL as has_md FROM report_records ORDER BY id DESC LIMIT 3')
    for row in cur.fetchall():
        print(row)
conn.close()
"
```

Expected: 最新一行 `has_md = True`

- [ ] **Step 5: 启动服务，在控制台打开「周报」Tab，选中记录，验证报告正文显示**

- 侧边栏应出现「周报」菜单项
- 填写 Token，点刷新，左栏出现记录列表
- 点击最新记录，右栏显示 Markdown 格式报告
- 点「复制」，粘贴到文本编辑器验证内容正确

- [ ] **Step 6: 最终 commit（更新 trellis journal）**

```bash
git add .
git commit -m "feat(reports): weekly invoice report view complete — backend formatter + frontend reports tab"
```

---

## 自检结果

| Spec 要求 | 对应 Task |
|-----------|----------|
| DB migration `report_md` | Task 1 |
| `fetch_sales_invoices` + `fields` 投影 | Task 2 |
| Invoice 字段映射 + 状态 groupby | Task 3 |
| `formatter.py` Markdown 输出 | Task 4 |
| `runner.py` 写 `report_md` | Task 5 |
| `GET /records/{id}` + `POST /reformat` | Task 6 |
| navigation + i18n | Task 7 |
| `types.ts` + `app-view-state.ts` | Task 8 |
| `loadReportDetail` + `reformatRecord` | Task 9 |
| `reports-tab.ts` 两栏布局 + 复制 | Task 10 |
| `app-render.ts` 接入 + 初始值 + build | Task 11 |
| 端到端验证 | Task 12 |

所有 Spec 要求均有对应 Task，无遗漏。
