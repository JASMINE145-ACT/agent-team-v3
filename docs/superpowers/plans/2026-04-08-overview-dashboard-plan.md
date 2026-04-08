# Overview Dashboard 升级实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把现有 Overview 页升级为以业务 KPI 和图表为主的 Dashboard，包含无货/缺货/报价单三组 KPI 卡片和两张 Chart.js 折线图。

**Architecture:** 后端新增 `/api/quotation-drafts/stats` 接口；前端新增 `DashboardCharts` LitElement 组件（封装 Chart.js canvas）和 `controllers/dashboard.ts` 数据层；`app.ts` / `app-settings.ts` / `app-render.ts` / `overview.ts` 做少量扩展，系统状态区布局压缩，KPI 行替换为三组业务数据。

**Tech Stack:** Python/FastAPI (后端)、Lit 3 + TypeScript (前端)、Chart.js 4 (图表)

---

## 文件清单

| 操作 | 文件 |
|---|---|
| 修改 | `backend/tools/oos/services/data_service.py` |
| 修改 | `backend/server/api/routes_quotation.py` |
| 修改 | `control-ui/src/ui/types.ts` |
| 新建 | `control-ui/src/ui/controllers/dashboard.ts` |
| 新建 | `control-ui/src/ui/views/dashboard-charts.ts` |
| 修改 | `control-ui/src/ui/app.ts` |
| 修改 | `control-ui/src/ui/app-view-state.ts` |
| 修改 | `control-ui/src/ui/app-settings.ts` |
| 修改 | `control-ui/src/ui/app-render.ts` |
| 修改 | `control-ui/src/ui/views/overview.ts` |
| 新建 | `tests/test_quotation_draft_stats.py` |

---

## Task 1：后端 data_service — 新增 `get_quotation_draft_stats()`

**Files:**
- Modify: `backend/tools/oos/services/data_service.py`
- Test: `tests/test_quotation_draft_stats.py`

- [ ] **Step 1: 写失败测试**

新建 `tests/test_quotation_draft_stats.py`：

```python
"""测试 get_quotation_draft_stats() 返回结构正确。"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent.parent))

from unittest.mock import patch, MagicMock
from backend.tools.oos.services.data_service import OosDataService


def _make_service():
    with patch("backend.tools.oos.services.data_service.create_engine"), \
         patch("backend.tools.oos.services.data_service.sessionmaker"):
        svc = OosDataService.__new__(OosDataService)
        svc.SessionLocal = MagicMock()
        return svc


def test_get_quotation_draft_stats_structure():
    svc = _make_service()

    mock_session = MagicMock()
    svc.SessionLocal.return_value = mock_session

    # pending_count
    mock_session.query.return_value.filter.return_value.count.return_value = 3
    # today_count — second call
    # shortage_count — third call
    # replenishment_count — fourth call
    mock_session.query.return_value.filter.return_value.count.side_effect = [3, 2, 1, 5]

    # by_time: empty
    mock_session.query.return_value.filter.return_value.group_by.return_value.all.return_value = []

    result = svc.get_quotation_draft_stats(days=7)

    assert "pending_count" in result
    assert "today_count" in result
    assert "shortage_count" in result
    assert "replenishment_count" in result
    assert "by_time" in result
    assert isinstance(result["by_time"], list)
    # by_time 应补全 7 天
    assert len(result["by_time"]) == 7


def test_by_time_fills_missing_days():
    """缺数据的日期补 0。"""
    svc = _make_service()
    mock_session = MagicMock()
    svc.SessionLocal.return_value = mock_session
    mock_session.query.return_value.filter.return_value.count.side_effect = [0, 0, 0, 0]

    # 只返回 2 天
    from datetime import date, timedelta
    today = date.today()
    day1 = (today - timedelta(days=6)).isoformat()
    day2 = (today - timedelta(days=4)).isoformat()
    mock_session.execute.return_value.fetchall.return_value = [
        (day1, 3),
        (day2, 1),
    ]

    result = svc.get_quotation_draft_stats(days=7)
    assert len(result["by_time"]) == 7
    dates = [r["date"] for r in result["by_time"]]
    assert len(set(dates)) == 7  # 无重复
```

- [ ] **Step 2: 运行确认失败**

```
cd "d:\Projects\agent-jk\Agent Team version3"
py -3 -m pytest tests/test_quotation_draft_stats.py -v
```

期望：FAILED（`get_quotation_draft_stats` 方法不存在）

- [ ] **Step 3: 实现 `get_quotation_draft_stats()`**

在 `backend/tools/oos/services/data_service.py` 中，找到 `get_quotation_drafts` 方法之后（约第 1013 行），追加：

```python
def get_quotation_draft_stats(self, days: int = 7) -> Dict:
    """Dashboard 用：报价单统计 + 近 N 天趋势。"""
    from datetime import date, timedelta
    session = self.SessionLocal()
    try:
        today_start = datetime.combine(date.today(), datetime.min.time())
        # pending_count
        pending_count = (
            session.query(QuotationDraftDB)
            .filter(QuotationDraftDB.status == "pending")
            .count()
        )
        # today_count
        today_count = (
            session.query(QuotationDraftDB)
            .filter(QuotationDraftDB.created_at >= today_start)
            .count()
        )
        # shortage_count: 含至少一条 shortage line 的报价单数
        shortage_count = (
            session.query(QuotationDraftDB.id)
            .join(
                QuotationDraftLineDB,
                QuotationDraftDB.id == QuotationDraftLineDB.draft_id,
            )
            .filter(QuotationDraftLineDB.shortage.isnot(None))
            .filter(QuotationDraftLineDB.shortage > 0)
            .distinct()
            .count()
        )
        # replenishment_count
        replenishment_count = session.query(ReplenishmentDraftDB).count()

        # by_time: 近 days 天每日数量（SQL group by date）
        cutoff = datetime.combine(date.today() - timedelta(days=days - 1), datetime.min.time())
        rows = (
            session.query(
                func.date(QuotationDraftDB.created_at).label("day"),
                func.count(QuotationDraftDB.id).label("cnt"),
            )
            .filter(QuotationDraftDB.created_at >= cutoff)
            .group_by(func.date(QuotationDraftDB.created_at))
            .all()
        )
        row_map = {str(r.day): r.cnt for r in rows}

        # 填补缺失日期为 0
        by_time = []
        for i in range(days - 1, -1, -1):
            d = (date.today() - timedelta(days=i)).isoformat()
            by_time.append({"date": d, "count": row_map.get(d, 0)})

        return {
            "pending_count": pending_count,
            "today_count": today_count,
            "shortage_count": shortage_count,
            "replenishment_count": replenishment_count,
            "by_time": by_time,
        }
    finally:
        session.close()
```

确认文件顶部已导入 `func`：
```python
from sqlalchemy import func
```
若未导入，在 `from sqlalchemy import ...` 那行补上 `func`。

- [ ] **Step 4: 运行测试确认通过**

```
py -3 -m pytest tests/test_quotation_draft_stats.py -v
```

期望：2 PASSED

- [ ] **Step 5: Commit**

```
git add backend/tools/oos/services/data_service.py tests/test_quotation_draft_stats.py
git commit -m "feat: add get_quotation_draft_stats() to data_service"
```

---

## Task 2：后端 routes_quotation — 新增 `/api/quotation-drafts/stats`

**Files:**
- Modify: `backend/server/api/routes_quotation.py`

- [ ] **Step 1: 在 `routes_quotation.py` 的 `GET /api/quotation-drafts` 之前（约第 104 行）插入新路由**

必须在 `/{draft_id}` 之前，否则 FastAPI 会把 `stats` 当成 `draft_id`：

```python
@router.get("/api/quotation-drafts/stats")
async def quotation_drafts_stats(days: int = 7) -> Dict[str, Any]:
    """Dashboard 用：报价单统计 + 近 N 天趋势。"""
    try:
        ds = get_oos_data_service()
        data = ds.get_quotation_draft_stats(days=max(1, min(90, days)))
        return {"success": True, "data": data}
    except Exception as e:
        logger.exception("quotation-drafts/stats 失败")
        raise HTTPException(status_code=500, detail=str(e))
```

- [ ] **Step 2: 本地验证路由可访问**

启动后端：
```
py -3 -m uvicorn backend.server.api.app:app --reload --port 8000
```

访问：`http://localhost:8000/api/quotation-drafts/stats`

期望：`{"success": true, "data": {"pending_count": ..., "by_time": [...]}}`

- [ ] **Step 3: Commit**

```
git add backend/server/api/routes_quotation.py
git commit -m "feat: add GET /api/quotation-drafts/stats endpoint"
```

---

## Task 3：前端 types.ts — 新增 `QuotationDraftStats`

**Files:**
- Modify: `control-ui/src/ui/types.ts`

- [ ] **Step 1: 在 `types.ts` 中 `QuotationDraftListItem` 定义之前（约第 397 行）插入**

```typescript
/** Dashboard 用：报价单统计 */
export type QuotationDraftStats = {
  pending_count: number;
  today_count: number;
  shortage_count: number;
  replenishment_count: number;
  by_time: Array<{ date: string; count: number }>;
};
```

- [ ] **Step 2: Commit**

```
git add control-ui/src/ui/types.ts
git commit -m "feat: add QuotationDraftStats type"
```

---

## Task 4：前端 controllers/dashboard.ts — 新数据控制器

**Files:**
- Create: `control-ui/src/ui/controllers/dashboard.ts`

- [ ] **Step 1: 新建文件**

```typescript
import type {
  OosByTimeRow,
  ShortageByTimeRow,
  QuotationDraftStats,
} from "../types.js";

export type DashboardState = {
  basePath: string;
  dashboardLoading: boolean;
  dashboardError: string | null;
  quotationStats: QuotationDraftStats | null;
  oosByTime: OosByTimeRow[];
  shortageByTime: ShortageByTimeRow[];
};

function apiUrl(basePath: string, path: string, params?: Record<string, string | number>): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  const base = prefix ? `${prefix}${path}` : path;
  if (!params || Object.keys(params).length === 0) return base;
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) search.set(k, String(v));
  return `${base}?${search.toString()}`;
}

export async function fetchDashboard(state: DashboardState): Promise<void> {
  state.dashboardLoading = true;
  state.dashboardError = null;
  try {
    const [quotationRes, oosByTimeRes, shortageByTimeRes] = await Promise.all([
      fetch(apiUrl(state.basePath, "/api/quotation-drafts/stats", { days: 7 })),
      fetch(apiUrl(state.basePath, "/api/oos/by-time", { days: 7 })),
      fetch(apiUrl(state.basePath, "/api/shortage/by-time", { days: 7 })),
    ]);

    const quotationJson = await quotationRes.json().catch(() => ({}));
    const oosByTimeJson = await oosByTimeRes.json().catch(() => ({}));
    const shortageByTimeJson = await shortageByTimeRes.json().catch(() => ({}));

    if (quotationJson.success && quotationJson.data) {
      state.quotationStats = quotationJson.data as QuotationDraftStats;
    } else {
      state.quotationStats = null;
      if (!quotationRes.ok) {
        state.dashboardError = quotationJson.detail ?? `quotation/stats: ${quotationRes.status}`;
      }
    }

    state.oosByTime = oosByTimeJson.success && Array.isArray(oosByTimeJson.data)
      ? (oosByTimeJson.data as OosByTimeRow[])
      : [];

    state.shortageByTime = shortageByTimeJson.success && Array.isArray(shortageByTimeJson.data)
      ? (shortageByTimeJson.data as ShortageByTimeRow[])
      : [];
  } catch (err) {
    state.dashboardError = err instanceof Error ? err.message : String(err);
    state.quotationStats = null;
    state.oosByTime = [];
    state.shortageByTime = [];
  } finally {
    state.dashboardLoading = false;
  }
}
```

- [ ] **Step 2: Commit**

```
git add control-ui/src/ui/controllers/dashboard.ts
git commit -m "feat: add dashboard controller with fetchDashboard()"
```

---

## Task 5：安装 Chart.js + 新建 dashboard-charts.ts 组件

**Files:**
- Create: `control-ui/src/ui/views/dashboard-charts.ts`

- [ ] **Step 1: 安装 Chart.js**

```
cd "d:\Projects\agent-jk\Agent Team version3\control-ui"
npm install chart.js
```

期望：`package.json` 中出现 `"chart.js": "^4.x.x"`

- [ ] **Step 2: 新建 `dashboard-charts.ts`**

```typescript
import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
);

export type ByTimeRow = { date?: string; count?: number };

@customElement("dashboard-charts")
export class DashboardCharts extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .chart-card {
      background: var(--bg-card, #fff);
      border: 1px solid var(--border, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .chart-title {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--text, #111);
    }
    canvas {
      width: 100% !important;
      height: 180px !important;
    }
    .empty {
      font-size: 12px;
      color: var(--text-muted, #999);
      padding: 32px 0;
      text-align: center;
    }
  `;

  @property({ attribute: false }) quotationByTime: ByTimeRow[] = [];
  @property({ attribute: false }) oosByTime: ByTimeRow[] = [];
  @property({ attribute: false }) shortageByTime: ByTimeRow[] = [];
  @property({ type: Boolean }) loading = false;

  private _quotationChart: Chart | null = null;
  private _stockChart: Chart | null = null;

  override render() {
    return html`
      <div class="chart-card">
        <div class="chart-title">近 7 天报价单趋势</div>
        ${this.loading
          ? html`<div class="empty">加载中…</div>`
          : this.quotationByTime.length === 0
            ? html`<div class="empty">暂无数据</div>`
            : html`<canvas id="quotation-chart"></canvas>`}
      </div>
      <div class="chart-card">
        <div class="chart-title">近 7 天无货 / 缺货趋势</div>
        ${this.loading
          ? html`<div class="empty">加载中…</div>`
          : this.oosByTime.length === 0 && this.shortageByTime.length === 0
            ? html`<div class="empty">暂无数据</div>`
            : html`<canvas id="stock-chart"></canvas>`}
      </div>
    `;
  }

  override updated() {
    this._initQuotationChart();
    this._initStockChart();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._quotationChart?.destroy();
    this._stockChart?.destroy();
    this._quotationChart = null;
    this._stockChart = null;
  }

  private _initQuotationChart() {
    const canvas = this.shadowRoot?.getElementById("quotation-chart") as HTMLCanvasElement | null;
    if (!canvas) return;
    this._quotationChart?.destroy();
    const labels = this.quotationByTime.map((r) => (r.date ?? "").slice(5)); // MM-DD
    const data = this.quotationByTime.map((r) => r.count ?? 0);
    this._quotationChart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "报价单",
            data,
            borderColor: "#4f8ef7",
            backgroundColor: "rgba(79,142,247,0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: { legend: { display: false }, tooltip: { mode: "index" } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    });
  }

  private _initStockChart() {
    const canvas = this.shadowRoot?.getElementById("stock-chart") as HTMLCanvasElement | null;
    if (!canvas) return;
    this._stockChart?.destroy();
    const allDates = [
      ...new Set([
        ...this.oosByTime.map((r) => r.date ?? ""),
        ...this.shortageByTime.map((r) => r.date ?? ""),
      ]),
    ].sort();
    const labels = allDates.map((d) => d.slice(5));
    const oosMap = Object.fromEntries(this.oosByTime.map((r) => [r.date, r.count ?? 0]));
    const shortageMap = Object.fromEntries(this.shortageByTime.map((r) => [r.date, r.count ?? 0]));
    this._stockChart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "无货",
            data: allDates.map((d) => oosMap[d] ?? 0),
            borderColor: "#e05c5c",
            backgroundColor: "rgba(224,92,92,0.08)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
          },
          {
            label: "缺货",
            data: allDates.map((d) => shortageMap[d] ?? 0),
            borderColor: "#f5a623",
            backgroundColor: "rgba(245,166,35,0.08)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: { legend: { display: true, position: "top" }, tooltip: { mode: "index" } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-charts": DashboardCharts;
  }
}
```

- [ ] **Step 3: 确认 build 通过**

```
cd "d:\Projects\agent-jk\Agent Team version3\control-ui"
npm run build
```

期望：无 TypeScript 报错

- [ ] **Step 4: Commit**

```
git add control-ui/package.json control-ui/package-lock.json control-ui/src/ui/views/dashboard-charts.ts
git commit -m "feat: add DashboardCharts LitElement with Chart.js"
```

---

## Task 6：app.ts — 新增 dashboard 状态字段

**Files:**
- Modify: `control-ui/src/ui/app.ts`

- [ ] **Step 1: 在 `app.ts` 的 overview 状态区（约第 261 行）之后追加**

```typescript
/** Dashboard 用：报价单统计 + 近 7 天趋势 */
@state() dashboardLoading = false;
@state() dashboardError: string | null = null;
@state() quotationStats: import("./types.js").QuotationDraftStats | null = null;
@state() dashboardOosByTime: import("./types.js").OosByTimeRow[] = [];
@state() dashboardShortageByTime: import("./types.js").ShortageByTimeRow[] = [];
```

- [ ] **Step 2: Commit**

```
git add control-ui/src/ui/app.ts
git commit -m "feat: add dashboard state fields to app.ts"
```

---

## Task 7：app-view-state.ts — 新增 dashboard 状态类型

**Files:**
- Modify: `control-ui/src/ui/app-view-state.ts`

- [ ] **Step 1: 在 `app-view-state.ts` 中找到 `overviewShortageStats` 所在类型定义区（约第 157 行），在其后追加**

```typescript
dashboardLoading: boolean;
dashboardError: string | null;
quotationStats: import("./types.js").QuotationDraftStats | null;
dashboardOosByTime: import("./types.js").OosByTimeRow[];
dashboardShortageByTime: import("./types.js").ShortageByTimeRow[];
```

- [ ] **Step 2: 确认 build 无报错**

```
cd "d:\Projects\agent-jk\Agent Team version3\control-ui"
npm run build
```

- [ ] **Step 3: Commit**

```
git add control-ui/src/ui/app-view-state.ts
git commit -m "feat: add dashboard state types to app-view-state"
```

---

## Task 8：app-settings.ts — 把 fetchDashboard 加入 loadOverview

**Files:**
- Modify: `control-ui/src/ui/app-settings.ts`

- [ ] **Step 1: 在文件顶部 import 区追加**

```typescript
import { fetchDashboard } from "./controllers/dashboard.js";
```

- [ ] **Step 2: 修改 `loadOverview` 函数（约第 433 行），在 `Promise.all` 中追加 `fetchDashboard` 调用**

将：
```typescript
export async function loadOverview(host: SettingsHost) {
  await Promise.all([
    loadChannels(host as unknown as OpenClawApp, false),
    loadPresence(host as unknown as OpenClawApp),
    loadSessions(host as unknown as OpenClawApp),
    loadCronStatus(host as unknown as OpenClawApp),
    loadDebug(host as unknown as OpenClawApp),
  ]);
}
```

改为：
```typescript
export async function loadOverview(host: SettingsHost) {
  await Promise.all([
    loadChannels(host as unknown as OpenClawApp, false),
    loadPresence(host as unknown as OpenClawApp),
    loadSessions(host as unknown as OpenClawApp),
    loadCronStatus(host as unknown as OpenClawApp),
    loadDebug(host as unknown as OpenClawApp),
    fetchDashboard(host as unknown as Parameters<typeof fetchDashboard>[0]),
  ]);
}
```

- [ ] **Step 3: 确认 build 无报错**

```
npm run build
```

- [ ] **Step 4: Commit**

```
git add control-ui/src/ui/app-settings.ts
git commit -m "feat: call fetchDashboard in loadOverview"
```

---

## Task 9：app-render.ts — 把 dashboard props 传给 renderOverview

**Files:**
- Modify: `control-ui/src/ui/app-render.ts`

- [ ] **Step 1: 找到 `renderOverview({...})` 调用（约第 229 行），在 props 对象末尾追加**

```typescript
quotationStats: state.quotationStats,
oosByTime: state.dashboardOosByTime,
shortageByTime: state.dashboardShortageByTime,
dashboardLoading: state.dashboardLoading,
```

完整调用示意：
```typescript
renderOverview({
  connected: state.connected,
  hello: state.hello,
  settings: state.settings,
  password: state.password,
  lastError: state.lastError,
  presenceCount,
  sessionsCount,
  cronEnabled: state.cronStatus?.enabled ?? null,
  cronNext,
  lastChannelsRefresh: state.channelsLastSuccess,
  oosStats: state.overviewOosStats,
  shortageStats: state.overviewShortageStats,
  onSettingsChange: (next) => state.applySettings(next),
  onPasswordChange: (next) => (state.password = next),
  onSessionKeyChange: /* 保持原有代码不变 */,
  onConnect: () => state.connect(),
  onRefresh: () => state.loadOverview(),
  // 新增：
  quotationStats: state.quotationStats,
  oosByTime: state.dashboardOosByTime,
  shortageByTime: state.dashboardShortageByTime,
  dashboardLoading: state.dashboardLoading,
})
```

- [ ] **Step 2: Commit**

```
git add control-ui/src/ui/app-render.ts
git commit -m "feat: pass dashboard props to renderOverview"
```

---

## Task 10：overview.ts — 更新 props、KPI 行、追加图表组件

**Files:**
- Modify: `control-ui/src/ui/views/overview.ts`

- [ ] **Step 1: 更新 import 区**

在文件顶部，追加：
```typescript
import type { QuotationDraftStats } from "../../types.js";
import type { OosByTimeRow, ShortageByTimeRow } from "../../types.js";
import "../../views/dashboard-charts.js";
```

- [ ] **Step 2: 更新 `OverviewProps` 类型，追加新字段**

在 `OverviewProps` 末尾（`onRefresh` 之前）加入：
```typescript
quotationStats: QuotationDraftStats | null;
oosByTime: OosByTimeRow[];
shortageByTime: ShortageByTimeRow[];
dashboardLoading: boolean;
```

- [ ] **Step 3: 更新 KPI 行（替换原 grid-cols-2 区块）**

找到当前的 `<section class="grid grid-cols-2" style="margin-top: 18px;">` 区块（约第 313 行，到第 380 行），将其**整体替换**为：

```typescript
html`
<section style="margin-top: 18px;">
  <div class="row" style="gap: 12px; flex-wrap: wrap;">
    <!-- 无货 -->
    <div class="card stat-card" style="min-width: 130px;">
      <div class="stat-value">${props.oosStats?.out_of_stock_count ?? "—"}</div>
      <div class="stat-label">无货产品</div>
    </div>
    <!-- 缺货 -->
    <div class="card stat-card" style="min-width: 130px;">
      <div class="stat-value">${props.shortageStats?.shortage_product_count ?? "—"}</div>
      <div class="stat-label">缺货产品</div>
    </div>
    <!-- 待确认报价 -->
    <div class="card stat-card" style="min-width: 130px;">
      <div class="stat-value">${props.quotationStats?.pending_count ?? "—"}</div>
      <div class="stat-label">待确认报价</div>
    </div>
    <!-- 今日新增 -->
    <div class="card stat-card" style="min-width: 130px;">
      <div class="stat-value">${props.quotationStats?.today_count ?? "—"}</div>
      <div class="stat-label">今日新增报价</div>
    </div>
    <!-- 缺货报价单 -->
    <div class="card stat-card" style="min-width: 130px;">
      <div class="stat-value">${props.quotationStats?.shortage_count ?? "—"}</div>
      <div class="stat-label">缺货报价单</div>
    </div>
    <!-- 补货单 -->
    <div class="card stat-card" style="min-width: 130px;">
      <div class="stat-value">${props.quotationStats?.replenishment_count ?? "—"}</div>
      <div class="stat-label">补货单</div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: 在 KPI 行之后、Notes 区块之前，追加图表组件**

在 `<section class="card" style="margin-top: 18px;">` Notes 区块（约第 382 行）**之前**插入：

```typescript
html`
<section style="margin-top: 18px;">
  <dashboard-charts
    .quotationByTime=${props.quotationStats?.by_time ?? []}
    .oosByTime=${props.oosByTime}
    .shortageByTime=${props.shortageByTime}
    .loading=${props.dashboardLoading}
  ></dashboard-charts>
</section>
`
```

- [ ] **Step 5: 系统状态区压缩（可选但推荐）**

把现有第一个 `<section class="card">` 里的 Tailscale / Session 长说明文字折叠到 `<details>` 标签内，让系统信息不再占主要视觉空间。具体：把 `${props.lastError ? ... : html\`<div class="callout"...\`}` 整段包裹进：

```typescript
html`<details style="margin-top: 8px"><summary style="cursor:pointer; font-size:12px; color: var(--text-muted)">系统信息</summary>
  <!-- 原有系统 callout 内容 -->
</details>`
```

- [ ] **Step 6: 确认 build 通过**

```
cd "d:\Projects\agent-jk\Agent Team version3\control-ui"
npm run build
```

期望：无 TypeScript 报错

- [ ] **Step 7: Commit**

```
git add control-ui/src/ui/views/overview.ts
git commit -m "feat: upgrade overview to dashboard with KPI cards and charts"
```

---

## Task 11：端到端验证

- [ ] **Step 1: 启动后端**

```
cd "d:\Projects\agent-jk\Agent Team version3"
py -3 -m uvicorn backend.server.api.app:app --reload --port 8000
```

- [ ] **Step 2: 确认 stats 接口正常**

访问 `http://localhost:8000/api/quotation-drafts/stats`，返回包含 `by_time` 数组（7 条）

- [ ] **Step 3: 启动前端 dev server**

```
cd control-ui
npm run dev
```

打开 Overview 页，确认：
- 6 个 KPI 卡片显示（无货/缺货/报价相关）
- 两张折线图渲染（报价趋势 + 无货/缺货双线）
- 无货 0 时图表显示「暂无数据」，不报错

- [ ] **Step 4: 最终 commit（若有零散修复）**

```
git add -A
git commit -m "fix: dashboard e2e adjustments"
```

---

## Self-Review 检查结果

| Spec 需求 | 覆盖任务 |
|---|---|
| 系统状态区缩减 | Task 10 Step 5 |
| 6 个 KPI 卡片 | Task 10 Step 3 |
| Chart.js 折线图（报价趋势） | Task 5 |
| Chart.js 折线图（无货+缺货双线） | Task 5 |
| 进入页面加载一次 | Task 8（loadOverview 调用 fetchDashboard） |
| 后端 /api/quotation-drafts/stats | Task 1 + Task 2 |
| `QuotationDraftStats` 类型 | Task 3 |
| `DashboardState` + `fetchDashboard` | Task 4 |
| `shortage_count` 定义（含 shortage line 的报价单） | Task 1 |
| 无数据空状态 | Task 5（canvas 不渲染时显示文字） |
| 补货单数量 | Task 1（replenishment_count） |
