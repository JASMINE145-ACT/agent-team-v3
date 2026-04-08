# 销售周报自动化系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 每周自动从 Accurate Online 拉取 sales-order 数据，用 pandas 聚合分析，将报告存入 Neon PostgreSQL，通过企微/邮件推送，并在前端 Agents > Reports 面板展示任务配置与历史。

**Architecture:** 后端新增 `backend/reports/` 模块，含 APScheduler 调度器（随 FastAPI 启动）、Accurate 数据拉取、pandas 分析、Neon 存储四层。前端在 `AgentsPanel` 新增 `"reports"` tab，通过 `controllers/reports.ts` 与新 API 通信。

**Tech Stack:** Python, FastAPI, APScheduler 3.x, pandas, asyncpg/psycopg2, Lit 3, TypeScript

---

## 文件清单

**后端新建：**
- `backend/reports/__init__.py`
- `backend/reports/models.py` — Pydantic 数据模型
- `backend/reports/accurate_fetcher.py` — Accurate API 分页拉取
- `backend/reports/analyzer.py` — pandas 聚合（纯函数）
- `backend/reports/notifier.py` — 企微 + 邮件推送
- `backend/reports/runner.py` — 执行链编排
- `backend/reports/service.py` — APScheduler 生命周期
- `backend/server/api/routes_reports.py` — REST 路由

**后端修改：**
- `backend/server/api/app.py` — 注册路由 + 启动 service
- `.env.example` — 新环境变量

**测试新建：**
- `tests/test_reports_analyzer.py`
- `tests/test_reports_runner.py`
- `tests/test_reports_routes.py`

**前端新建：**
- `control-ui/src/ui/controllers/reports.ts`
- `control-ui/src/ui/views/agents-panels-reports.ts`

**前端修改：**
- `control-ui/src/ui/types.ts` — 新增类型
- `control-ui/src/ui/views/agents.ts` — 新增 "reports" panel + tab
- `control-ui/src/ui/app-view-state.ts` — 新增 state 字段
- `control-ui/src/ui/app.ts` — 新增 @state 属性
- `control-ui/src/ui/app-settings.ts` — 加载报告数据
- `control-ui/src/ui/app-render.ts` — 传递 props

---

## Task 1: 数据库表 + Pydantic 模型

**Files:**
- Create: `backend/reports/__init__.py`
- Create: `backend/reports/models.py`
- Create: `tests/test_reports_analyzer.py` (stub，后续填充)

- [ ] **Step 1: 创建 `backend/reports/__init__.py`（空文件）**

```python
```

- [ ] **Step 2: 创建 `backend/reports/models.py`**

```python
"""
销售周报：Pydantic 数据模型。
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any

from pydantic import BaseModel


# ── 报告内容模型（分析结果）────────────────────────────────────────────────

@dataclass
class DayStats:
    date: str           # "2026-04-07"
    order_count: int
    total_amount: float


@dataclass
class CustomerStat:
    customer_name: str
    order_count: int
    total_amount: float


@dataclass
class ReportPayload:
    week_label: str              # "2026-W14"
    week_start: str              # "2026-03-31"
    week_end: str                # "2026-04-06"
    total_orders: int
    total_amount: float
    avg_order_value: float
    daily_trend: list[DayStats]         # 7 条，oldest first
    top_customers: list[CustomerStat]   # TOP 10，按 total_amount 降序
    status_distribution: dict[str, int] # QUEUE/WAITING/PROCEED/CLOSED
    generated_at: str            # ISO8601


# ── 任务配置模型（API 输入/输出）─────────────────────────────────────────

class TaskConfigPatch(BaseModel):
    cron_expr: str | None = None
    enabled: bool | None = None
    notify_wecom_group: str | None = None
    notify_emails: list[str] | None = None


# ── API 响应模型 ──────────────────────────────────────────────────────────

class ReportTaskResponse(BaseModel):
    id: str
    name: str
    description: str | None
    cron_expr: str
    enabled: bool
    notify_wecom_group: str | None
    notify_emails: list[str]
    last_run_at: str | None
    last_run_status: str | None   # success | failed | running | null
    last_week_label: str | None


class ReportRecordResponse(BaseModel):
    id: int
    task_id: str
    week_label: str
    week_start: str
    week_end: str
    status: str             # success | failed | running
    triggered_by: str       # scheduler | manual
    created_at: str
    error_msg: str | None
    payload: dict[str, Any] | None = None   # 仅 detail 接口返回
```

- [ ] **Step 3: 编写 DB 初始化函数（写在 `models.py` 底部）**

在 `models.py` 末尾追加：

```python
# ── 数据库建表 ────────────────────────────────────────────────────────────

_DDL = """
CREATE TABLE IF NOT EXISTS report_task_config (
    id                  TEXT PRIMARY KEY,
    name                TEXT NOT NULL,
    description         TEXT,
    cron_expr           TEXT NOT NULL DEFAULT '0 8 * * 1',
    enabled             BOOLEAN NOT NULL DEFAULT true,
    notify_wecom_group  TEXT,
    notify_emails       TEXT[] DEFAULT '{}',
    extra_config        JSONB DEFAULT '{}',
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS report_records (
    id              BIGSERIAL PRIMARY KEY,
    task_id         TEXT NOT NULL REFERENCES report_task_config(id),
    week_label      TEXT NOT NULL,
    week_start      DATE NOT NULL,
    week_end        DATE NOT NULL,
    status          TEXT NOT NULL DEFAULT 'running',
    payload         JSONB,
    error_msg       TEXT,
    triggered_by    TEXT NOT NULL DEFAULT 'scheduler',
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_report_records_task_week
    ON report_records(task_id, week_start DESC);

INSERT INTO report_task_config (id, name, description, cron_expr)
VALUES ('sales_weekly', '销售周报', '每周销售额/客户分布/趋势分析', '0 8 * * 1')
ON CONFLICT (id) DO NOTHING;
"""


def ensure_tables(database_url: str) -> None:
    """同步建表（服务启动时调用一次）。使用 psycopg2 兼容 Neon。"""
    import psycopg2

    conn = psycopg2.connect(database_url)
    try:
        with conn.cursor() as cur:
            cur.execute(_DDL)
        conn.commit()
    finally:
        conn.close()
```

- [ ] **Step 4: 验证 models.py 语法**

```bash
cd "Agent Team version3"
python -c "from backend.reports.models import ReportPayload, TaskConfigPatch, ensure_tables; print('OK')"
```

Expected: `OK`

- [ ] **Step 5: commit**

```bash
git add backend/reports/
git commit -m "feat(reports): add db schema and Pydantic models"
```

---

## Task 2: Accurate 数据拉取

**Files:**
- Create: `backend/reports/accurate_fetcher.py`

- [ ] **Step 1: 创建 `backend/reports/accurate_fetcher.py`**

```python
"""
从 Accurate Online 拉取指定日期范围的销售订单列表。
不落库，返回 list[dict]（原始 API 字段）。
"""
from __future__ import annotations

import logging
import os
from datetime import date
from typing import Any

logger = logging.getLogger(__name__)

# 每页条数（Accurate 限制通常 100）
_PAGE_SIZE = 100
# 拉取的字段（减少传输量）
_FIELDS = "id,number,transDate,customerName,totalAmount,status"


def _get_client():
    """获取 AccurateOnlineAPIClient 实例。"""
    from backend.tools.inventory.lib.api.client import AccurateOnlineAPIClient  # noqa: PLC0415
    return AccurateOnlineAPIClient()


def fetch_sales_orders(week_start: date, week_end: date) -> list[dict[str, Any]]:
    """
    拉取 week_start ~ week_end（含首尾）的全部销售订单。
    分页处理，自动循环直到拿完。
    返回 list[dict]，每项含 id/number/transDate/customerName/totalAmount/status。
    """
    client = _get_client()
    database_id = os.environ.get("AOL_DATABASE_ID", "")
    if not database_id:
        raise RuntimeError("AOL_DATABASE_ID 未配置")

    start_str = week_start.strftime("%d/%m/%Y")   # Accurate 日期格式
    end_str = week_end.strftime("%d/%m/%Y")

    all_records: list[dict[str, Any]] = []
    page = 1

    while True:
        params = {
            "filter.transDate.op": "BETWEEN",
            "filter.transDate.val[0]": start_str,
            "filter.transDate.val[1]": end_str,
            "fields": _FIELDS,
            "sp.page": page,
            "sp.pageSize": _PAGE_SIZE,
        }
        resp = client.get(
            f"https://{database_id}.accurate.id/accurate/api/sales-order/list.do",
            params=params,
        )
        data = resp.json() if hasattr(resp, "json") else resp

        if not data.get("s"):
            logger.warning("sales-order/list.do 返回失败: %s", data)
            break

        records: list[dict] = data.get("d", [])
        all_records.extend(records)

        total = int(data.get("total", 0) or 0)
        if page * _PAGE_SIZE >= total or not records:
            break
        page += 1

    logger.info(
        "fetch_sales_orders %s~%s: %d 条",
        week_start.isoformat(), week_end.isoformat(), len(all_records),
    )
    return all_records
```

- [ ] **Step 2: 语法验证**

```bash
python -c "from backend.reports.accurate_fetcher import fetch_sales_orders; print('OK')"
```

Expected: `OK`

- [ ] **Step 3: commit**

```bash
git add backend/reports/accurate_fetcher.py
git commit -m "feat(reports): add Accurate sales-order fetcher"
```

---

## Task 3: pandas 分析层（含单元测试）

**Files:**
- Create: `backend/reports/analyzer.py`
- Create: `tests/test_reports_analyzer.py`

- [ ] **Step 1: 编写测试（先写测试）**

创建 `tests/test_reports_analyzer.py`：

```python
"""单元测试：reports/analyzer.py"""
import sys
from datetime import date
from pathlib import Path

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

from backend.reports.analyzer import analyze


def _make_orders(rows: list[dict]) -> list[dict]:
    return rows


def test_analyze_empty_orders():
    """空列表时返回全零报告。"""
    result = analyze([], date(2026, 3, 31), date(2026, 4, 6))
    assert result.total_orders == 0
    assert result.total_amount == 0.0
    assert len(result.daily_trend) == 7
    assert all(d.order_count == 0 for d in result.daily_trend)
    assert result.top_customers == []
    assert result.week_label == "2026-W14"


def test_analyze_aggregates_correctly():
    """基础聚合：订单数/金额/客户排名。"""
    orders = [
        {"transDate": "2026-04-01", "customerName": "客户A", "totalAmount": 1000, "status": "CLOSED"},
        {"transDate": "2026-04-01", "customerName": "客户B", "totalAmount": 2000, "status": "PROCEED"},
        {"transDate": "2026-04-02", "customerName": "客户A", "totalAmount": 500, "status": "CLOSED"},
    ]
    result = analyze(orders, date(2026, 3, 31), date(2026, 4, 6))
    assert result.total_orders == 3
    assert result.total_amount == 3500.0
    assert abs(result.avg_order_value - 3500 / 3) < 0.01
    assert result.top_customers[0].customer_name == "客户A"   # 1500 > 2000? 不对，客户B 2000最高
    assert result.top_customers[0].customer_name == "客户B"
    assert result.status_distribution["CLOSED"] == 2
    assert result.status_distribution["PROCEED"] == 1


def test_analyze_daily_trend_7_days():
    """每日趋势严格 7 条，缺失日期补 0。"""
    orders = [
        {"transDate": "2026-04-03", "customerName": "X", "totalAmount": 100, "status": "CLOSED"},
    ]
    result = analyze(orders, date(2026, 3, 31), date(2026, 4, 6))
    assert len(result.daily_trend) == 7
    dates = [d.date for d in result.daily_trend]
    assert dates[0] == "2026-03-31"
    assert dates[-1] == "2026-04-06"
    day3 = next(d for d in result.daily_trend if d.date == "2026-04-03")
    assert day3.order_count == 1
    assert day3.total_amount == 100.0
    day1 = next(d for d in result.daily_trend if d.date == "2026-03-31")
    assert day1.order_count == 0
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
cd "Agent Team version3"
python -m pytest tests/test_reports_analyzer.py -v
```

Expected: `ImportError` 或 `ModuleNotFoundError`（analyzer.py 未创建）

- [ ] **Step 3: 创建 `backend/reports/analyzer.py`**

```python
"""
pandas 聚合分析：纯函数，无副作用，易单元测试。
输入：list[dict]（Accurate API 原始字段）+ 周起止日期
输出：ReportPayload dataclass
"""
from __future__ import annotations

import logging
from datetime import date, timedelta
from typing import Any

logger = logging.getLogger(__name__)


def analyze(
    orders: list[dict[str, Any]],
    week_start: date,
    week_end: date,
) -> "ReportPayload":
    """
    对 orders 做全部聚合，返回 ReportPayload。
    orders 为空时返回全零报告（不抛异常）。
    """
    from backend.reports.models import DayStats, CustomerStat, ReportPayload  # noqa: PLC0415
    import pandas as pd  # noqa: PLC0415

    from datetime import datetime  # noqa: PLC0415

    week_label = week_start.strftime("%G-W%V")

    if not orders:
        daily_trend = [
            DayStats(
                date=(week_start + timedelta(days=i)).isoformat(),
                order_count=0,
                total_amount=0.0,
            )
            for i in range(7)
        ]
        return ReportPayload(
            week_label=week_label,
            week_start=week_start.isoformat(),
            week_end=week_end.isoformat(),
            total_orders=0,
            total_amount=0.0,
            avg_order_value=0.0,
            daily_trend=daily_trend,
            top_customers=[],
            status_distribution={},
            generated_at=datetime.utcnow().isoformat() + "Z",
        )

    df = pd.DataFrame(orders)

    # ── 金额列标准化 ──
    df["totalAmount"] = pd.to_numeric(df.get("totalAmount", 0), errors="coerce").fillna(0.0)

    # ── 日期列标准化（Accurate 返回 dd/MM/yyyy 或 yyyy-MM-dd，兼容两种） ──
    def _parse_date(s: str) -> str:
        s = str(s or "").strip()
        if not s:
            return ""
        for fmt in ("%d/%m/%Y", "%Y-%m-%d", "%Y/%m/%d"):
            try:
                return pd.Timestamp(s, dayfirst=fmt.startswith("%d")).date().isoformat()
            except Exception:
                pass
        return s

    df["date"] = df["transDate"].apply(_parse_date)

    # ── 基础汇总 ──
    total_orders = len(df)
    total_amount = float(df["totalAmount"].sum())
    avg_order_value = total_amount / total_orders if total_orders else 0.0

    # ── 每日趋势（严格 7 天，缺失补 0） ──
    day_group = df.groupby("date").agg(
        order_count=("totalAmount", "count"),
        total_amount=("totalAmount", "sum"),
    ).reset_index()
    day_map = {
        row["date"]: (int(row["order_count"]), float(row["total_amount"]))
        for _, row in day_group.iterrows()
    }
    daily_trend = []
    for i in range(7):
        d = (week_start + timedelta(days=i)).isoformat()
        cnt, amt = day_map.get(d, (0, 0.0))
        daily_trend.append(DayStats(date=d, order_count=cnt, total_amount=amt))

    # ── Top 10 客户 ──
    cust_col = next((c for c in df.columns if "customer" in c.lower()), None)
    if cust_col:
        cust_group = df.groupby(cust_col).agg(
            order_count=("totalAmount", "count"),
            total_amount=("totalAmount", "sum"),
        ).reset_index().sort_values("total_amount", ascending=False).head(10)
        top_customers = [
            CustomerStat(
                customer_name=str(row[cust_col]),
                order_count=int(row["order_count"]),
                total_amount=float(row["total_amount"]),
            )
            for _, row in cust_group.iterrows()
        ]
    else:
        top_customers = []

    # ── 状态分布 ──
    status_col = next((c for c in df.columns if c.lower() == "status"), None)
    if status_col:
        status_distribution = df[status_col].value_counts().to_dict()
        status_distribution = {k: int(v) for k, v in status_distribution.items()}
    else:
        status_distribution = {}

    return ReportPayload(
        week_label=week_label,
        week_start=week_start.isoformat(),
        week_end=week_end.isoformat(),
        total_orders=total_orders,
        total_amount=total_amount,
        avg_order_value=avg_order_value,
        daily_trend=daily_trend,
        top_customers=top_customers,
        status_distribution=status_distribution,
        generated_at=datetime.utcnow().isoformat() + "Z",
    )
```

- [ ] **Step 4: 修复测试中的断言错误（客户B金额2000最高）**

`test_analyze_aggregates_correctly` 里删掉这两行（互相矛盾）：
```python
# 删掉这一行：
assert result.top_customers[0].customer_name == "客户A"   # 1500 > 2000? 不对，客户B 2000最高
# 保留这一行：
assert result.top_customers[0].customer_name == "客户B"
```

- [ ] **Step 5: 运行测试，确认通过**

```bash
python -m pytest tests/test_reports_analyzer.py -v
```

Expected: 3 个测试全部 PASS

- [ ] **Step 6: commit**

```bash
git add backend/reports/analyzer.py tests/test_reports_analyzer.py
git commit -m "feat(reports): add pandas analyzer with unit tests"
```

---

## Task 4: 通知层（企微 + 邮件）

**Files:**
- Create: `backend/reports/notifier.py`

- [ ] **Step 1: 创建 `backend/reports/notifier.py`**

```python
"""
报告推送：企业微信群机器人 + SMTP 邮件。
复用现有 wecom_group_service 发送逻辑，邮件复用 email_service 的 SMTP 配置。
notify() 失败时记录日志，不抛异常（报告已生成，推送失败不影响 status=success）。
"""
from __future__ import annotations

import logging
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from backend.reports.models import ReportPayload

logger = logging.getLogger(__name__)


def _format_wecom_text(payload: "ReportPayload") -> str:
    """生成企微 Markdown 文本（限 2048 字节）。"""
    lines = [
        f"📊 **销售周报 {payload.week_label}**（{payload.week_start} ~ {payload.week_end}）",
        "",
        "**本周汇总**",
        f"• 订单数：{payload.total_orders} 单",
        f"• 销售额：¥ {payload.total_amount:,.0f}",
        f"• 客单价：¥ {payload.avg_order_value:,.0f}",
        "",
        "**每日趋势**",
    ]
    for d in payload.daily_trend:
        lines.append(f"  {d.date}  {d.order_count}单  ¥{d.total_amount:,.0f}")

    if payload.top_customers:
        lines.append("")
        lines.append(f"**Top {min(5, len(payload.top_customers))} 客户**")
        for i, c in enumerate(payload.top_customers[:5], 1):
            lines.append(f"  {i}. {c.customer_name}  {c.order_count}单  ¥{c.total_amount:,.0f}")

    if payload.status_distribution:
        parts = "  ·  ".join(f"{k} {v}" for k, v in payload.status_distribution.items())
        lines += ["", f"**状态分布**  {parts}"]

    return "\n".join(lines)


def send_wecom(payload: "ReportPayload", robot_key: str) -> bool:
    """
    发送企微群机器人消息（markdown 类型）。
    robot_key：企微群机器人 Webhook Key（非完整 URL）。
    """
    import requests  # noqa: PLC0415

    url = f"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={robot_key}"
    text = _format_wecom_text(payload)
    body = {"msgtype": "markdown", "markdown": {"content": text[:4096]}}
    try:
        resp = requests.post(url, json=body, timeout=10)
        data = resp.json()
        if data.get("errcode") == 0:
            logger.info("WeCom report sent: %s", payload.week_label)
            return True
        logger.warning("WeCom send failed: %s", data)
        return False
    except Exception as e:
        logger.warning("WeCom send error: %s", e)
        return False


def send_email(payload: "ReportPayload", recipients: list[str]) -> bool:
    """发送邮件（SMTP），复用 oos email_service 的环境变量。"""
    smtp_host = os.environ.get("EMAIL_SMTP_HOST", "")
    smtp_port = int(os.environ.get("EMAIL_SMTP_PORT", "587"))
    from_addr = os.environ.get("EMAIL_FROM", "")
    username = os.environ.get("EMAIL_USERNAME", "")
    password = os.environ.get("EMAIL_PASSWORD", "")

    if not smtp_host or not from_addr or not recipients:
        logger.debug("Email skipped: SMTP not configured or no recipients")
        return False

    subject = f"[销售周报] {payload.week_label} — {payload.total_orders}单 / ¥{payload.total_amount:,.0f}"
    body_text = _format_wecom_text(payload)  # 复用纯文本格式

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = from_addr
    msg["To"] = ", ".join(recipients)
    msg.attach(MIMEText(body_text, "plain", "utf-8"))

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as server:
            server.ehlo()
            server.starttls()
            if username and password:
                server.login(username, password)
            server.sendmail(from_addr, recipients, msg.as_string())
        logger.info("Email report sent to %d recipients: %s", len(recipients), payload.week_label)
        return True
    except Exception as e:
        logger.warning("Email send error: %s", e)
        return False


def notify(payload: "ReportPayload", wecom_group: str | None, emails: list[str]) -> None:
    """发送所有配置的通知渠道（失败不抛异常）。"""
    if wecom_group and wecom_group.strip():
        send_wecom(payload, wecom_group.strip())
    if emails:
        send_email(payload, [e for e in emails if e and e.strip()])
```

- [ ] **Step 2: 语法验证**

```bash
python -c "from backend.reports.notifier import notify; print('OK')"
```

Expected: `OK`

- [ ] **Step 3: commit**

```bash
git add backend/reports/notifier.py
git commit -m "feat(reports): add WeChat/email notifier"
```

---

## Task 5: runner + service + routes + app.py 集成

**Files:**
- Create: `backend/reports/runner.py`
- Create: `backend/reports/service.py`
- Create: `backend/server/api/routes_reports.py`
- Modify: `backend/server/api/app.py`
- Modify: `.env.example`
- Create: `tests/test_reports_runner.py`
- Create: `tests/test_reports_routes.py`

- [ ] **Step 1: 创建 `backend/reports/runner.py`**

```python
"""
执行单次报告：fetch → analyze → store → notify。
DB 操作同步（psycopg2），保持与现有项目一致。
"""
from __future__ import annotations

import json
import logging
import os
from dataclasses import asdict
from datetime import date, timedelta

logger = logging.getLogger(__name__)


def _get_db_url() -> str:
    url = os.environ.get("DATABASE_URL", "")
    if not url:
        raise RuntimeError("DATABASE_URL 未配置")
    return url


def resolve_week_range() -> tuple[date, date]:
    """返回上周一到上周日（UTC today 为基准）。"""
    from datetime import datetime  # noqa: PLC0415
    today = datetime.utcnow().date()
    # weekday(): Monday=0, Sunday=6
    days_since_monday = today.weekday()
    last_monday = today - timedelta(days=days_since_monday + 7)
    last_sunday = last_monday + timedelta(days=6)
    return last_monday, last_sunday


def _insert_running(task_id: str, week_start: date, week_end: date, triggered_by: str) -> int:
    import psycopg2  # noqa: PLC0415
    from psycopg2.extras import RealDictCursor  # noqa: PLC0415

    week_label = week_start.strftime("%G-W%V")
    sql = """
        INSERT INTO report_records (task_id, week_label, week_start, week_end, status, triggered_by)
        VALUES (%s, %s, %s, %s, 'running', %s)
        RETURNING id
    """
    conn = psycopg2.connect(_get_db_url())
    try:
        with conn.cursor() as cur:
            cur.execute(sql, (task_id, week_label, week_start, week_end, triggered_by))
            record_id = cur.fetchone()[0]
        conn.commit()
    finally:
        conn.close()
    return record_id


def _update_record(record_id: int, status: str, payload_dict: dict | None, error_msg: str | None) -> None:
    import psycopg2  # noqa: PLC0415
    from psycopg2.extras import Json  # noqa: PLC0415

    sql = """
        UPDATE report_records
        SET status = %s, payload = %s, error_msg = %s
        WHERE id = %s
    """
    conn = psycopg2.connect(_get_db_url())
    try:
        with conn.cursor() as cur:
            cur.execute(sql, (status, Json(payload_dict) if payload_dict else None, error_msg, record_id))
        conn.commit()
    finally:
        conn.close()


def _load_task_config(task_id: str) -> dict:
    import psycopg2  # noqa: PLC0415
    from psycopg2.extras import RealDictCursor  # noqa: PLC0415

    sql = "SELECT * FROM report_task_config WHERE id = %s"
    conn = psycopg2.connect(_get_db_url())
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql, (task_id,))
            row = cur.fetchone()
    finally:
        conn.close()
    if not row:
        raise RuntimeError(f"task_id {task_id!r} 不存在")
    return dict(row)


def run_report(task_id: str, triggered_by: str = "scheduler") -> int:
    """
    执行完整报告流程。返回 record_id。
    失败时写 status=failed + error_msg，不抛异常（方便调度器继续运行）。
    """
    from backend.reports.accurate_fetcher import fetch_sales_orders  # noqa: PLC0415
    from backend.reports.analyzer import analyze  # noqa: PLC0415
    from backend.reports.notifier import notify  # noqa: PLC0415

    config = _load_task_config(task_id)
    week_start, week_end = resolve_week_range()
    record_id = _insert_running(task_id, week_start, week_end, triggered_by)

    try:
        orders = fetch_sales_orders(week_start, week_end)
        payload = analyze(orders, week_start, week_end)
        payload_dict = asdict(payload)
        _update_record(record_id, "success", payload_dict, None)
        logger.info("Report %s generated: record_id=%d", payload.week_label, record_id)
        try:
            notify(
                payload,
                wecom_group=config.get("notify_wecom_group"),
                emails=list(config.get("notify_emails") or []),
            )
        except Exception as e:
            logger.warning("notify failed (report still saved): %s", e)
    except Exception as e:
        logger.exception("run_report failed for task_id=%s", task_id)
        _update_record(record_id, "failed", None, str(e))

    return record_id
```

- [ ] **Step 2: 创建 `backend/reports/service.py`**

```python
"""
ReportService: APScheduler 生命周期管理 + 任务注册。
Render 单进程部署，使用 AsyncIOScheduler（内存 jobstore）。
"""
from __future__ import annotations

import logging
import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

logger = logging.getLogger(__name__)

_scheduler: AsyncIOScheduler | None = None


def get_scheduler() -> AsyncIOScheduler:
    global _scheduler
    if _scheduler is None:
        _scheduler = AsyncIOScheduler(timezone="Asia/Shanghai")
    return _scheduler


def _make_cron_trigger(cron_expr: str) -> CronTrigger:
    """把 '0 8 * * 1' 解析为 CronTrigger。"""
    parts = cron_expr.strip().split()
    if len(parts) != 5:
        raise ValueError(f"无效 cron 表达式: {cron_expr!r}")
    minute, hour, day, month, dow = parts
    return CronTrigger(
        minute=minute, hour=hour, day=day, month=month, day_of_week=dow
    )


def _run_task_sync(task_id: str) -> None:
    """APScheduler 同步回调，内部调用 run_report。"""
    from backend.reports.runner import run_report  # noqa: PLC0415
    logger.info("Scheduler triggered task: %s", task_id)
    run_report(task_id, triggered_by="scheduler")


def start_report_service() -> None:
    """建表 + 加载任务配置 + 启动 APScheduler。在 app lifespan 中调用。"""
    database_url = os.environ.get("DATABASE_URL", "")
    if not database_url:
        logger.warning("DATABASE_URL 未配置，ReportService 跳过初始化")
        return

    from backend.reports.models import ensure_tables  # noqa: PLC0415
    try:
        ensure_tables(database_url)
        logger.info("report_task_config / report_records 表已就绪")
    except Exception as e:
        logger.warning("建表失败（非致命）: %s", e)
        return

    import psycopg2  # noqa: PLC0415
    from psycopg2.extras import RealDictCursor  # noqa: PLC0415

    scheduler = get_scheduler()
    try:
        conn = psycopg2.connect(database_url)
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT id, cron_expr, enabled FROM report_task_config WHERE enabled = true")
            tasks = [dict(row) for row in cur.fetchall()]
        conn.close()
    except Exception as e:
        logger.warning("加载任务配置失败: %s", e)
        tasks = []

    for task in tasks:
        try:
            trigger = _make_cron_trigger(task["cron_expr"])
            scheduler.add_job(
                _run_task_sync,
                trigger=trigger,
                id=f"report_{task['id']}",
                args=[task["id"]],
                replace_existing=True,
                misfire_grace_time=3600,
            )
            logger.info("Scheduled task '%s' with cron '%s'", task["id"], task["cron_expr"])
        except Exception as e:
            logger.warning("注册任务 %s 失败: %s", task["id"], e)

    if not scheduler.running:
        scheduler.start()
        logger.info("APScheduler started (%d jobs)", len(scheduler.get_jobs()))


def reload_task(task_id: str, cron_expr: str, enabled: bool) -> None:
    """更新单个任务的调度（PATCH config 后调用）。"""
    scheduler = get_scheduler()
    job_id = f"report_{task_id}"
    scheduler.remove_job(job_id, jobstore=None)
    if enabled:
        trigger = _make_cron_trigger(cron_expr)
        scheduler.add_job(
            _run_task_sync,
            trigger=trigger,
            id=job_id,
            args=[task_id],
            replace_existing=True,
            misfire_grace_time=3600,
        )
        logger.info("Reloaded task '%s' with cron '%s'", task_id, cron_expr)
    else:
        logger.info("Task '%s' disabled, removed from scheduler", task_id)


def stop_report_service() -> None:
    """关闭 APScheduler（app lifespan shutdown）。"""
    global _scheduler
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
        logger.info("APScheduler stopped")
    _scheduler = None
```

- [ ] **Step 3: 创建 `backend/server/api/routes_reports.py`**

```python
"""
报告相关 REST 路由：
  GET  /api/reports/tasks
  POST /api/reports/tasks/{task_id}/run
  GET  /api/reports/tasks/{task_id}/run/{record_id}/status
  PATCH /api/reports/tasks/{task_id}/config
  GET  /api/reports/records
  GET  /api/reports/records/{record_id}
"""
from __future__ import annotations

import asyncio
import logging
import os
from typing import Any

from fastapi import APIRouter, HTTPException

from backend.reports.models import ReportTaskResponse, ReportRecordResponse, TaskConfigPatch

router = APIRouter()
logger = logging.getLogger(__name__)


def _get_db():
    import psycopg2  # noqa: PLC0415
    from psycopg2.extras import RealDictCursor  # noqa: PLC0415

    url = os.environ.get("DATABASE_URL", "")
    if not url:
        raise HTTPException(status_code=503, detail="DATABASE_URL 未配置")
    return psycopg2.connect(url), RealDictCursor


@router.get("/api/reports/tasks")
def list_tasks() -> list[dict[str, Any]]:
    """列出所有任务及上次运行状态。"""
    conn, Cursor = _get_db()
    try:
        with conn.cursor(cursor_factory=Cursor) as cur:
            cur.execute("""
                SELECT
                    t.id, t.name, t.description, t.cron_expr, t.enabled,
                    t.notify_wecom_group, t.notify_emails,
                    r.created_at  AS last_run_at,
                    r.status      AS last_run_status,
                    r.week_label  AS last_week_label
                FROM report_task_config t
                LEFT JOIN LATERAL (
                    SELECT created_at, status, week_label
                    FROM report_records
                    WHERE task_id = t.id
                    ORDER BY created_at DESC LIMIT 1
                ) r ON true
                ORDER BY t.id
            """)
            rows = cur.fetchall()
    finally:
        conn.close()
    return [
        {
            "id": r["id"],
            "name": r["name"],
            "description": r["description"],
            "cron_expr": r["cron_expr"],
            "enabled": r["enabled"],
            "notify_wecom_group": r["notify_wecom_group"],
            "notify_emails": list(r["notify_emails"] or []),
            "last_run_at": r["last_run_at"].isoformat() if r["last_run_at"] else None,
            "last_run_status": r["last_run_status"],
            "last_week_label": r["last_week_label"],
        }
        for r in rows
    ]


@router.post("/api/reports/tasks/{task_id}/run")
def trigger_run(task_id: str) -> dict[str, Any]:
    """手动触发（异步后台执行，立即返回 record_id 占位）。"""
    from backend.reports.runner import run_report  # noqa: PLC0415

    def _bg():
        run_report(task_id, triggered_by="manual")

    asyncio.get_event_loop().run_in_executor(None, _bg)
    return {"success": True, "task_id": task_id, "message": "触发成功，后台执行中"}


@router.get("/api/reports/tasks/{task_id}/run/{record_id}/status")
def run_status(task_id: str, record_id: int) -> dict[str, Any]:
    """查询运行状态（轮询用）。"""
    conn, Cursor = _get_db()
    try:
        with conn.cursor(cursor_factory=Cursor) as cur:
            cur.execute(
                "SELECT status, error_msg, created_at FROM report_records WHERE id = %s AND task_id = %s",
                (record_id, task_id),
            )
            row = cur.fetchone()
    finally:
        conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="record not found")
    return {
        "record_id": record_id,
        "status": row["status"],
        "error_msg": row["error_msg"],
        "created_at": row["created_at"].isoformat() if row["created_at"] else None,
    }


@router.patch("/api/reports/tasks/{task_id}/config")
def update_config(task_id: str, body: TaskConfigPatch) -> dict[str, Any]:
    """更新任务配置，并重新注册调度。"""
    from backend.reports.service import reload_task  # noqa: PLC0415

    conn, Cursor = _get_db()
    try:
        with conn.cursor(cursor_factory=Cursor) as cur:
            cur.execute("SELECT * FROM report_task_config WHERE id = %s", (task_id,))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="task not found")

            updates: list[str] = []
            params: list[Any] = []
            if body.cron_expr is not None:
                updates.append("cron_expr = %s")
                params.append(body.cron_expr)
            if body.enabled is not None:
                updates.append("enabled = %s")
                params.append(body.enabled)
            if body.notify_wecom_group is not None:
                updates.append("notify_wecom_group = %s")
                params.append(body.notify_wecom_group)
            if body.notify_emails is not None:
                updates.append("notify_emails = %s")
                params.append(body.notify_emails)

            if updates:
                updates.append("updated_at = now()")
                params.append(task_id)
                cur.execute(
                    f"UPDATE report_task_config SET {', '.join(updates)} WHERE id = %s",
                    params,
                )
        conn.commit()
        # 重新加载调度器中该任务
        new_cron = body.cron_expr or row["cron_expr"]
        new_enabled = body.enabled if body.enabled is not None else row["enabled"]
        reload_task(task_id, new_cron, new_enabled)
    finally:
        conn.close()
    return {"success": True}


@router.get("/api/reports/records")
def list_records(task_id: str | None = None, limit: int = 20, offset: int = 0) -> list[dict[str, Any]]:
    """历史报告列表（不含 payload）。"""
    conn, Cursor = _get_db()
    try:
        with conn.cursor(cursor_factory=Cursor) as cur:
            if task_id:
                cur.execute(
                    "SELECT id, task_id, week_label, week_start, week_end, status, triggered_by, created_at, error_msg "
                    "FROM report_records WHERE task_id = %s ORDER BY created_at DESC LIMIT %s OFFSET %s",
                    (task_id, limit, offset),
                )
            else:
                cur.execute(
                    "SELECT id, task_id, week_label, week_start, week_end, status, triggered_by, created_at, error_msg "
                    "FROM report_records ORDER BY created_at DESC LIMIT %s OFFSET %s",
                    (limit, offset),
                )
            rows = cur.fetchall()
    finally:
        conn.close()
    return [
        {
            "id": r["id"],
            "task_id": r["task_id"],
            "week_label": r["week_label"],
            "week_start": str(r["week_start"]),
            "week_end": str(r["week_end"]),
            "status": r["status"],
            "triggered_by": r["triggered_by"],
            "created_at": r["created_at"].isoformat() if r["created_at"] else None,
            "error_msg": r["error_msg"],
        }
        for r in rows
    ]


@router.get("/api/reports/records/{record_id}")
def get_record(record_id: int) -> dict[str, Any]:
    """查看单份报告（含 payload）。"""
    conn, Cursor = _get_db()
    try:
        with conn.cursor(cursor_factory=Cursor) as cur:
            cur.execute("SELECT * FROM report_records WHERE id = %s", (record_id,))
            row = cur.fetchone()
    finally:
        conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="record not found")
    return {
        "id": row["id"],
        "task_id": row["task_id"],
        "week_label": row["week_label"],
        "week_start": str(row["week_start"]),
        "week_end": str(row["week_end"]),
        "status": row["status"],
        "triggered_by": row["triggered_by"],
        "created_at": row["created_at"].isoformat() if row["created_at"] else None,
        "error_msg": row["error_msg"],
        "payload": row["payload"],
    }
```

- [ ] **Step 4: 修改 `backend/server/api/app.py`，注册路由 + 启动 service**

在 `app.py` 顶部 import 区域末尾加：

```python
from backend.server.api.routes_reports import router as reports_router
```

在 `app.include_router(wecom_router)` 后面加：

```python
app.include_router(reports_router)
```

在文件末尾（`_warmup_sync` 函数之前）加：

```python
@app.on_event("startup")
async def _start_report_service():
    """启动报告调度服务（非阻塞）。"""
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, _start_reports_bg)


def _start_reports_bg():
    try:
        from backend.reports.service import start_report_service
        start_report_service()
    except Exception as e:
        logger.warning("ReportService 启动失败（非致命）: %s", e)


@app.on_event("shutdown")
async def _stop_report_service():
    try:
        from backend.reports.service import stop_report_service
        stop_report_service()
    except Exception:
        pass
```

- [ ] **Step 5: 在 `.env.example` 末尾追加新环境变量**

```
# -------------------- 销售周报（可选，不配置则跳过推送）--------------------
REPORT_NOTIFY_WECOM_GROUP=your-robot-key
REPORT_NOTIFY_EMAILS=a@example.com,b@example.com
```

- [ ] **Step 6: 编写路由测试**

创建 `tests/test_reports_routes.py`：

```python
"""路由层测试：mock DB，验证端点行为。"""
import sys
import asyncio
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

from backend.server.api.routes_reports import list_tasks, list_records, update_config
from backend.reports.models import TaskConfigPatch


def _mock_conn_ctx(rows):
    """返回可用作 psycopg2 connect() 返回值的 Mock。"""
    mock_cur = MagicMock()
    mock_cur.__enter__ = lambda s: s
    mock_cur.__exit__ = MagicMock(return_value=False)
    mock_cur.fetchall.return_value = rows
    mock_cur.fetchone.return_value = rows[0] if rows else None

    mock_conn = MagicMock()
    mock_conn.__enter__ = lambda s: s
    mock_conn.__exit__ = MagicMock(return_value=False)
    mock_conn.cursor.return_value = mock_cur
    return mock_conn


def test_list_tasks_returns_list():
    """list_tasks 正常返回列表。"""
    row = {
        "id": "sales_weekly", "name": "销售周报", "description": None,
        "cron_expr": "0 8 * * 1", "enabled": True,
        "notify_wecom_group": None, "notify_emails": [],
        "last_run_at": None, "last_run_status": None, "last_week_label": None,
    }
    with patch("backend.server.api.routes_reports._get_db") as mock_db:
        conn = _mock_conn_ctx([row])
        mock_db.return_value = (conn, MagicMock())
        result = list_tasks()
    assert isinstance(result, list)
    assert result[0]["id"] == "sales_weekly"


def test_list_records_empty():
    """list_records 空表返回空列表。"""
    with patch("backend.server.api.routes_reports._get_db") as mock_db:
        conn = _mock_conn_ctx([])
        mock_db.return_value = (conn, MagicMock())
        result = list_records()
    assert result == []
```

- [ ] **Step 7: 运行路由测试**

```bash
python -m pytest tests/test_reports_routes.py -v
```

Expected: 2 tests PASS

- [ ] **Step 8: commit**

```bash
git add backend/reports/runner.py backend/reports/service.py \
        backend/server/api/routes_reports.py \
        backend/server/api/app.py .env.example \
        tests/test_reports_runner.py tests/test_reports_routes.py
git commit -m "feat(reports): runner, APScheduler service, REST routes, app integration"
```

---

## Task 6: 前端类型 + controller

**Files:**
- Modify: `control-ui/src/ui/types.ts`
- Create: `control-ui/src/ui/controllers/reports.ts`

- [ ] **Step 1: 在 `control-ui/src/ui/types.ts` 末尾追加新类型**

```typescript
// ── Reports ──────────────────────────────────────────────────────────────

export type ReportTask = {
  id: string;
  name: string;
  description: string | null;
  cronExpr: string;
  enabled: boolean;
  notifyWecomGroup: string | null;
  notifyEmails: string[];
  lastRunAt: string | null;
  lastRunStatus: "success" | "failed" | "running" | null;
  lastWeekLabel: string | null;
};

export type ReportRecord = {
  id: number;
  taskId: string;
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  status: "success" | "failed" | "running";
  triggeredBy: "scheduler" | "manual";
  createdAt: string;
  errorMsg: string | null;
};

export type ReportRecordDetail = ReportRecord & {
  payload: Record<string, unknown> | null;
};
```

- [ ] **Step 2: 创建 `control-ui/src/ui/controllers/reports.ts`**

```typescript
import type { ReportRecord, ReportTask } from "../types.ts";

export type ReportsState = {
  basePath: string;
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: ReportTask[];
  reportsRecords: ReportRecord[];
};

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/?$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

function snakeToCamel(row: Record<string, unknown>): ReportTask {
  return {
    id: row["id"] as string,
    name: row["name"] as string,
    description: (row["description"] as string | null) ?? null,
    cronExpr: row["cron_expr"] as string,
    enabled: row["enabled"] as boolean,
    notifyWecomGroup: (row["notify_wecom_group"] as string | null) ?? null,
    notifyEmails: (row["notify_emails"] as string[]) ?? [],
    lastRunAt: (row["last_run_at"] as string | null) ?? null,
    lastRunStatus: (row["last_run_status"] as ReportTask["lastRunStatus"]) ?? null,
    lastWeekLabel: (row["last_week_label"] as string | null) ?? null,
  };
}

function snakeRecordToCamel(row: Record<string, unknown>): ReportRecord {
  return {
    id: row["id"] as number,
    taskId: row["task_id"] as string,
    weekLabel: row["week_label"] as string,
    weekStart: row["week_start"] as string,
    weekEnd: row["week_end"] as string,
    status: row["status"] as ReportRecord["status"],
    triggeredBy: row["triggered_by"] as ReportRecord["triggeredBy"],
    createdAt: row["created_at"] as string,
    errorMsg: (row["error_msg"] as string | null) ?? null,
  };
}

export async function fetchReports(state: ReportsState): Promise<void> {
  state.reportsLoading = true;
  state.reportsError = null;
  try {
    const [tasksRes, recordsRes] = await Promise.allSettled([
      fetch(apiUrl(state.basePath, "/api/reports/tasks")),
      fetch(apiUrl(state.basePath, "/api/reports/records?limit=20")),
    ]);

    if (tasksRes.status === "fulfilled") {
      const json = await tasksRes.value.json().catch(() => []);
      state.reportsTasks = Array.isArray(json) ? json.map(snakeToCamel) : [];
    } else {
      state.reportsError = `tasks: ${String(tasksRes.reason)}`;
    }

    if (recordsRes.status === "fulfilled") {
      const json = await recordsRes.value.json().catch(() => []);
      state.reportsRecords = Array.isArray(json) ? json.map(snakeRecordToCamel) : [];
    } else {
      state.reportsError = [state.reportsError, `records: ${String(recordsRes.reason)}`]
        .filter(Boolean)
        .join(" | ");
    }
  } catch (err) {
    state.reportsError = err instanceof Error ? err.message : String(err);
  } finally {
    state.reportsLoading = false;
  }
}

export async function triggerRun(basePath: string, taskId: string): Promise<void> {
  const url = apiUrl(basePath, `/api/reports/tasks/${taskId}/run`);
  const resp = await fetch(url, { method: "POST" });
  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    throw new Error(body.detail ?? `HTTP ${resp.status}`);
  }
}

export async function patchTaskConfig(
  basePath: string,
  taskId: string,
  patch: { cron_expr?: string; enabled?: boolean; notify_wecom_group?: string; notify_emails?: string[] },
): Promise<void> {
  const url = apiUrl(basePath, `/api/reports/tasks/${taskId}/config`);
  const resp = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    throw new Error(body.detail ?? `HTTP ${resp.status}`);
  }
}
```

- [ ] **Step 3: 检查 TypeScript 是否有报错**

```bash
cd "Agent Team version3/control-ui"
npx tsc --noEmit
```

Expected: 0 errors（或只有与 reports 无关的已存在 errors）

- [ ] **Step 4: commit**

```bash
cd "Agent Team version3"
git add control-ui/src/ui/types.ts control-ui/src/ui/controllers/reports.ts
git commit -m "feat(reports): add frontend types and reports controller"
```

---

## Task 7: 前端 Reports 面板 + Agents 连线

**Files:**
- Create: `control-ui/src/ui/views/agents-panels-reports.ts`
- Modify: `control-ui/src/ui/views/agents.ts`
- Modify: `control-ui/src/ui/app-view-state.ts`
- Modify: `control-ui/src/ui/app.ts`
- Modify: `control-ui/src/ui/app-settings.ts`
- Modify: `control-ui/src/ui/app-render.ts`

- [ ] **Step 1: 创建 `control-ui/src/ui/views/agents-panels-reports.ts`**

```typescript
import { html, nothing } from "lit";
import type { ReportRecord, ReportTask } from "../types.ts";
import { triggerRun, patchTaskConfig } from "../controllers/reports.ts";

export type ReportsPanelProps = {
  basePath: string;
  loading: boolean;
  error: string | null;
  tasks: ReportTask[];
  records: ReportRecord[];
  editingTaskId: string | null;
  editForm: { cronExpr: string; notifyWecomGroup: string; notifyEmails: string; enabled: boolean };
  onRefresh: () => void;
  onEditOpen: (taskId: string) => void;
  onEditClose: () => void;
  onEditFormChange: (patch: Partial<ReportsPanelProps["editForm"]>) => void;
  onEditSave: (taskId: string) => void;
  onTriggerRun: (taskId: string) => void;
};

function statusBadge(status: string | null) {
  if (!status) return html`<span class="muted">—</span>`;
  const color = status === "success" ? "#22c55e" : status === "failed" ? "#ef4444" : "#f59e0b";
  const icon = status === "success" ? "✅" : status === "failed" ? "❌" : "⏳";
  return html`<span style="color:${color}">${icon} ${status}</span>`;
}

export function renderReportsPanel(props: ReportsPanelProps) {
  return html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div class="row" style="justify-content:space-between;align-items:center;">
        <div>
          <div class="card-title">Reports</div>
          <div class="card-sub">Scheduled data reports — configure and trigger manually.</div>
        </div>
        <button class="btn btn--sm" ?disabled=${props.loading} @click=${props.onRefresh}>
          ${props.loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      ${props.error ? html`<div class="callout danger">${props.error}</div>` : nothing}

      <!-- Tasks -->
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${props.tasks.length === 0
          ? html`<div class="muted">No report tasks found.</div>`
          : props.tasks.map((task) => html`
            <div class="card" style="padding:14px;">
              <div class="row" style="justify-content:space-between;align-items:flex-start;">
                <div>
                  <div style="font-weight:600;font-size:14px;">📊 ${task.name}</div>
                  <div class="muted" style="font-size:12px;margin-top:2px;">
                    ${task.cronExpr}
                    ${task.notifyWecomGroup ? " · 企微" : ""}
                    ${task.notifyEmails.length > 0 ? ` · ${task.notifyEmails.length} 邮件` : ""}
                  </div>
                  <div style="margin-top:4px;font-size:12px;">
                    上次运行：${statusBadge(task.lastRunStatus)}
                    ${task.lastWeekLabel ? html`<span class="muted">${task.lastWeekLabel}</span>` : nothing}
                  </div>
                </div>
                <div class="row" style="gap:8px;">
                  <button
                    class="btn btn--sm"
                    @click=${() => props.onTriggerRun(task.id)}
                  >▶ 立即运行</button>
                  <button
                    class="btn btn--sm"
                    @click=${() =>
                      props.editingTaskId === task.id
                        ? props.onEditClose()
                        : props.onEditOpen(task.id)}
                  >${props.editingTaskId === task.id ? "取消" : "⚙ 配置"}</button>
                </div>
              </div>

              ${props.editingTaskId === task.id ? html`
                <div style="margin-top:12px;border-top:1px solid var(--border,#e5e7eb);padding-top:12px;">
                  <div class="form-grid">
                    <label class="field">
                      <span>Cron 表达式</span>
                      <input
                        .value=${props.editForm.cronExpr}
                        placeholder="0 8 * * 1"
                        @input=${(e: Event) =>
                          props.onEditFormChange({ cronExpr: (e.target as HTMLInputElement).value })}
                      />
                    </label>
                    <label class="field">
                      <span>企微 Robot Key</span>
                      <input
                        .value=${props.editForm.notifyWecomGroup}
                        placeholder="xxxxxxxx-xxxx-..."
                        @input=${(e: Event) =>
                          props.onEditFormChange({ notifyWecomGroup: (e.target as HTMLInputElement).value })}
                      />
                    </label>
                    <label class="field">
                      <span>邮件列表（逗号分隔）</span>
                      <input
                        .value=${props.editForm.notifyEmails}
                        placeholder="a@x.com, b@x.com"
                        @input=${(e: Event) =>
                          props.onEditFormChange({ notifyEmails: (e.target as HTMLInputElement).value })}
                      />
                    </label>
                    <label class="field checkbox">
                      <span>启用</span>
                      <input
                        type="checkbox"
                        .checked=${props.editForm.enabled}
                        @change=${(e: Event) =>
                          props.onEditFormChange({ enabled: (e.target as HTMLInputElement).checked })}
                      />
                    </label>
                  </div>
                  <div class="row" style="gap:8px;margin-top:10px;">
                    <button class="btn btn--sm btn--primary" @click=${() => props.onEditSave(task.id)}>
                      保存
                    </button>
                    <button class="btn btn--sm" @click=${props.onEditClose}>取消</button>
                  </div>
                </div>
              ` : nothing}
            </div>
          `)}
      </div>

      <!-- Recent Runs -->
      ${props.records.length > 0 ? html`
        <div>
          <div style="font-weight:600;font-size:13px;margin-bottom:8px;">Recent Runs</div>
          <table style="width:100%;font-size:12px;border-collapse:collapse;">
            <thead>
              <tr style="text-align:left;color:var(--text-muted,#6b7280);border-bottom:1px solid var(--border,#e5e7eb);">
                <th style="padding:4px 8px;">周次</th>
                <th style="padding:4px 8px;">触发</th>
                <th style="padding:4px 8px;">状态</th>
                <th style="padding:4px 8px;">时间</th>
              </tr>
            </thead>
            <tbody>
              ${props.records.slice(0, 10).map((r) => html`
                <tr style="border-bottom:1px solid var(--border,#f3f4f6);">
                  <td style="padding:4px 8px;">${r.weekLabel}</td>
                  <td style="padding:4px 8px;">${r.triggeredBy}</td>
                  <td style="padding:4px 8px;">${statusBadge(r.status)}</td>
                  <td style="padding:4px 8px;color:var(--text-muted,#6b7280);">
                    ${r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
                    ${r.errorMsg ? html`<span style="color:#ef4444" title="${r.errorMsg}"> [错误]</span>` : nothing}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      ` : nothing}
    </div>
  `;
}
```

- [ ] **Step 2: 修改 `control-ui/src/ui/views/agents.ts`**

**2a.** 在第 1 行 `AgentsPanel` 类型定义处，追加 `"reports"`：

```typescript
// 原来：
export type AgentsPanel = "overview" | "files" | "tools" | "skills" | "channels" | "cron";
// 改为：
export type AgentsPanel = "overview" | "files" | "tools" | "skills" | "channels" | "cron" | "reports";
```

**2b.** 在 `AgentsProps` 中（`onCronRefresh` 后面）追加新属性：

```typescript
  // Reports panel
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: import("../types.ts").ReportTask[];
  reportsRecords: import("../types.ts").ReportRecord[];
  reportsEditingTaskId: string | null;
  reportsEditForm: { cronExpr: string; notifyWecomGroup: string; notifyEmails: string; enabled: boolean };
  onReportsRefresh: () => void;
  onReportsEditOpen: (taskId: string) => void;
  onReportsEditClose: () => void;
  onReportsEditFormChange: (patch: Partial<AgentsProps["reportsEditForm"]>) => void;
  onReportsEditSave: (taskId: string) => void;
  onReportsTriggerRun: (taskId: string) => void;
```

**2c.** 在 `renderAgents` 函数里的 tab 按钮列表（找 `cron` tab 按钮）之后加：

```typescript
<button
  class="tab ${activePanel === "reports" ? "active" : ""}"
  @click=${() => props.onSelectPanel("reports")}
>
  Reports
</button>
```

**2d.** 在面板内容 switch/if 区域（`cron` panel 分支后）加：

```typescript
${activePanel === "reports" ? renderReportsPanel({
  basePath: props.basePath ?? "",
  loading: props.reportsLoading,
  error: props.reportsError,
  tasks: props.reportsTasks,
  records: props.reportsRecords,
  editingTaskId: props.reportsEditingTaskId,
  editForm: props.reportsEditForm,
  onRefresh: props.onReportsRefresh,
  onEditOpen: props.onReportsEditOpen,
  onEditClose: props.onReportsEditClose,
  onEditFormChange: props.onReportsEditFormChange,
  onEditSave: props.onReportsEditSave,
  onTriggerRun: props.onReportsTriggerRun,
}) : nothing}
```

**2e.** 在 `agents.ts` 顶部 import 区加：

```typescript
import { renderReportsPanel } from "./agents-panels-reports.ts";
```

- [ ] **Step 3: 修改 `control-ui/src/ui/app-view-state.ts`**

在 `AppViewState` 类型末尾追加：

```typescript
  reportsLoading: boolean;
  reportsError: string | null;
  reportsTasks: import("./types.ts").ReportTask[];
  reportsRecords: import("./types.ts").ReportRecord[];
  reportsEditingTaskId: string | null;
  reportsEditForm: { cronExpr: string; notifyWecomGroup: string; notifyEmails: string; enabled: boolean };
```

- [ ] **Step 4: 修改 `control-ui/src/ui/app.ts`**

在已有的 `@state() dashboardLoading` 等属性块后追加：

```typescript
  @state() reportsLoading = false;
  @state() reportsError: string | null = null;
  @state() reportsTasks: import("./types.js").ReportTask[] = [];
  @state() reportsRecords: import("./types.js").ReportRecord[] = [];
  @state() reportsEditingTaskId: string | null = null;
  @state() reportsEditForm = { cronExpr: "", notifyWecomGroup: "", notifyEmails: "", enabled: true };
```

- [ ] **Step 5: 修改 `control-ui/src/ui/app-settings.ts`**

在 `loadOverview` 或合适的加载函数中加报告数据加载（选择在 Agents 面板打开时懒加载）。
在 `app-settings.ts` 新增导出函数：

```typescript
import { fetchReports, triggerRun, patchTaskConfig } from "./controllers/reports.ts";

export async function loadReports(host: SettingsHost) {
  await fetchReports(host as unknown as Parameters<typeof fetchReports>[0]);
}

export async function runReportTask(host: SettingsHost, taskId: string) {
  await triggerRun((host as any).basePath ?? "", taskId);
  await fetchReports(host as unknown as Parameters<typeof fetchReports>[0]);
}

export async function saveReportTaskConfig(
  host: SettingsHost,
  taskId: string,
  form: { cronExpr: string; notifyWecomGroup: string; notifyEmails: string; enabled: boolean },
) {
  await patchTaskConfig((host as any).basePath ?? "", taskId, {
    cron_expr: form.cronExpr || undefined,
    notify_wecom_group: form.notifyWecomGroup || undefined,
    notify_emails: form.notifyEmails
      ? form.notifyEmails.split(",").map((e) => e.trim()).filter(Boolean)
      : undefined,
    enabled: form.enabled,
  });
  await fetchReports(host as unknown as Parameters<typeof fetchReports>[0]);
}
```

- [ ] **Step 6: 修改 `control-ui/src/ui/app-render.ts`**

在传递给 `renderAgents` 的 props 对象末尾追加：

```typescript
    reportsLoading: state.reportsLoading,
    reportsError: state.reportsError,
    reportsTasks: state.reportsTasks,
    reportsRecords: state.reportsRecords,
    reportsEditingTaskId: state.reportsEditingTaskId,
    reportsEditForm: state.reportsEditForm,
    onReportsRefresh: () => loadReports(host),
    onReportsEditOpen: (taskId) => { host.reportsEditingTaskId = taskId; const t = state.reportsTasks.find(t => t.id === taskId); if (t) host.reportsEditForm = { cronExpr: t.cronExpr, notifyWecomGroup: t.notifyWecomGroup ?? "", notifyEmails: t.notifyEmails.join(", "), enabled: t.enabled }; },
    onReportsEditClose: () => { host.reportsEditingTaskId = null; },
    onReportsEditFormChange: (patch) => { host.reportsEditForm = { ...host.reportsEditForm, ...patch }; },
    onReportsEditSave: (taskId) => saveReportTaskConfig(host, taskId, host.reportsEditForm),
    onReportsTriggerRun: (taskId) => runReportTask(host, taskId),
```

- [ ] **Step 7: 检查 TypeScript**

```bash
cd "Agent Team version3/control-ui"
npx tsc --noEmit
```

Expected: 0 new errors

- [ ] **Step 8: 构建前端**

```bash
npm run build
```

Expected: Build succeeded，`dist/control-ui` 已更新

- [ ] **Step 9: commit**

```bash
cd "Agent Team version3"
git add control-ui/src/ui/views/agents-panels-reports.ts \
        control-ui/src/ui/views/agents.ts \
        control-ui/src/ui/app-view-state.ts \
        control-ui/src/ui/app.ts \
        control-ui/src/ui/app-settings.ts \
        control-ui/src/ui/app-render.ts \
        control-ui/src/ui/controllers/reports.ts
git commit -m "feat(reports): frontend Reports panel in Agents tab"
```

---

## Task 8: 安装依赖 + 运行全部测试

**Files:**
- Modify: `requirements.txt`（或 `pyproject.toml`）

- [ ] **Step 1: 检查 requirements.txt 并追加缺失依赖**

```bash
grep -i "apscheduler\|pandas\|psycopg2" requirements.txt
```

如果没有则追加：

```
apscheduler>=3.10
pandas>=2.0
psycopg2-binary>=2.9
```

- [ ] **Step 2: 安装依赖**

```bash
pip install apscheduler pandas psycopg2-binary
```

- [ ] **Step 3: 运行所有报告相关测试**

```bash
python -m pytest tests/test_reports_analyzer.py tests/test_reports_routes.py -v
```

Expected: 5 tests PASS

- [ ] **Step 4: 运行现有测试确保无回归**

```bash
python -m pytest tests/ -v --ignore=tests/test_reports_analyzer.py --ignore=tests/test_reports_routes.py -x -q
```

Expected: 无新增失败

- [ ] **Step 5: 最终 commit**

```bash
git add requirements.txt
git commit -m "chore: add apscheduler, pandas, psycopg2-binary dependencies"
```

---

## 验收标准

1. `python -m pytest tests/test_reports_analyzer.py tests/test_reports_routes.py` 全部通过
2. 服务启动日志出现 `APScheduler started`，`report_task_config / report_records 表已就绪`
3. `GET /api/reports/tasks` 返回 `[{"id":"sales_weekly",...}]`
4. `POST /api/reports/tasks/sales_weekly/run` 返回 `{"success":true}`，Neon 中出现 `status=running` 记录
5. 前端 Agents 页面出现 `Reports` tab，展示任务卡片与历史记录
