# 销售周报自动化系统设计

**日期**: 2026-04-08  
**状态**: 待实现  
**范围**: 后端 ReportService + Neon 存储 + 前端 Agents > Reports 面板

---

## 概述

基于 Accurate Online API 的销售周报自动化系统。每周定时拉取 `sales-order` 数据，在内存中完成 pandas 分析，将报告结果存入 Neon PostgreSQL，并通过企业微信和邮件推送给相关人员。前端在 Agents 页面新增 `Reports` 面板，支持任务配置、手动触发和历史记录查看。

**核心约束**：
- 原始销售数据不落库，全程内存处理
- 报告结果（聚合 JSON）存 Neon，供历史对比
- 部署环境：Render（单进程）+ Neon（托管 Postgres）

---

## 整体架构

```
Frontend: Agents > "Reports" 面板（新 panel tab）
           ↕  REST API /api/reports/*
Backend: ReportService (Python, 内嵌 APScheduler)
  ├─ accurate_fetcher.py  → Accurate sales-order API
  ├─ analyzer.py          → pandas 聚合（纯函数）
  ├─ runner.py            → 执行链编排
  └─ notifier.py          → 企微 + 邮件
           ↓ store
Neon: report_task_config + report_records
```

---

## 后端模块

### 目录结构

```
backend/reports/
├── __init__.py
├── service.py          # ReportService — APScheduler 生命周期 + 任务注册
├── runner.py           # 执行单次报告：fetch → analyze → store → notify
├── analyzer.py         # pandas 分析逻辑（纯函数，易单元测试）
├── accurate_fetcher.py # 封装 AccurateClient list_sales_orders(start, end)
├── notifier.py         # 企微 + 邮件推送（复用现有 wecom_service）
└── models.py           # Pydantic 模型：ReportRecord, TaskConfig, ReportPayload

backend/server/api/
└── routes_reports.py   # 新增路由，注册到 app.py
```

### service.py

`ReportService` 随 FastAPI 启动（`app.py` lifespan）一同初始化：

```python
async def lifespan(app):
    report_service = ReportService()
    await report_service.start()   # 启动 APScheduler + 从 Neon 加载任务配置
    yield
    await report_service.stop()
```

- 从 `report_task_config` 读取所有 `enabled=true` 的任务，按 `cron_expr` 注册到 APScheduler
- `PATCH /api/reports/tasks/{id}/config` 更新配置后，`service.reload_task(id)` 重新注册调度

### runner.py 执行链

```python
async def run_report(task_id: str, triggered_by: str = "scheduler"):
    config = await load_task_config(task_id)
    week_start, week_end = resolve_week_range()        # 上周一到周日
    
    raw_orders = await fetch_sales_orders(week_start, week_end)  # 不落库
    payload = analyze(raw_orders, week_start, week_end)          # pandas，纯函数
    
    record_id = await store_report(task_id, payload, triggered_by)
    await notify(payload, config)                                  # 企微 + 邮件
    
    return record_id
```

失败时写 `status=failed` + `error_msg` 到 `report_records`，不影响下次运行。

### analyzer.py 输出（ReportPayload）

```python
@dataclass
class DayStats:
    date: str          # "2026-04-07"
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
    daily_trend: list[DayStats]          # 7条
    top_customers: list[CustomerStat]    # TOP 10，按 total_amount 降序
    status_distribution: dict[str, int]  # QUEUE/WAITING/PROCEED/CLOSED
    generated_at: str            # ISO8601
```

### accurate_fetcher.py

使用项目已有的 `AccurateOnlineAPIClient`，调用 `sales-order/list.do`：

- 按 `filter.transDate.op=BETWEEN`，`val[0]=week_start`，`val[1]=week_end`
- 分页：`sp.pageSize=100`，循环直到 `sp.page * pageSize >= totalData`
- 字段：`id,number,transDate,customerName,totalAmount,status`（通过 `fields` 参数精简）
- 返回 `list[dict]`，内存处理，不写数据库

### API 端点（routes_reports.py）

| 方法 | 路径 | 用途 |
|---|---|---|
| `GET` | `/api/reports/tasks` | 列出所有任务 + 上次运行状态 |
| `POST` | `/api/reports/tasks/{id}/run` | 手动触发（异步，立即返回 record_id） |
| `GET` | `/api/reports/tasks/{id}/run/{record_id}/status` | 查询运行状态（轮询） |
| `PATCH` | `/api/reports/tasks/{id}/config` | 更新任务配置 |
| `GET` | `/api/reports/records` | 历史报告列表（`?task_id=&limit=20&offset=0`） |
| `GET` | `/api/reports/records/{id}` | 查看单份报告 payload |

手动触发走后台 asyncio.create_task，不阻塞响应。

---

## 数据库（Neon PostgreSQL）

使用现有 `DATABASE_URL` 环境变量，无需新建数据库。

### report_task_config

```sql
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

-- 默认任务（服务启动时 INSERT IF NOT EXISTS）
INSERT INTO report_task_config (id, name, description, cron_expr)
VALUES ('sales_weekly', '销售周报', '每周销售额/客户分布/趋势分析', '0 8 * * 1')
ON CONFLICT (id) DO NOTHING;
```

### report_records

```sql
CREATE TABLE IF NOT EXISTS report_records (
    id              BIGSERIAL PRIMARY KEY,
    task_id         TEXT NOT NULL REFERENCES report_task_config(id),
    week_label      TEXT NOT NULL,
    week_start      DATE NOT NULL,
    week_end        DATE NOT NULL,
    status          TEXT NOT NULL CHECK (status IN ('success', 'failed', 'running')),
    payload         JSONB,
    error_msg       TEXT,
    triggered_by    TEXT DEFAULT 'scheduler' CHECK (triggered_by IN ('scheduler', 'manual')),
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_report_records_task_week
    ON report_records(task_id, week_start DESC);
```

**存储策略**：
- `status=running` 先插入占位，完成后 UPDATE 为 `success/failed`
- 同一周允许多条记录（失败重跑、手动补跑），不做唯一约束
- payload JSONB 支持后续 SQL 环比查询（`LAG()` + 窗口函数）

---

## 前端（Agents > Reports 面板）

### 类型扩展（types.ts）

```typescript
export type AgentsPanel = "overview" | "files" | "tools" | "skills" | "channels" | "cron" | "reports";

export type ReportTask = {
  id: string;
  name: string;
  description: string | null;
  cronExpr: string;
  enabled: boolean;
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

export type ReportTaskConfig = {
  cronExpr: string;
  enabled: boolean;
  notifyWecomGroup: string;
  notifyEmails: string[];
};
```

### 新增文件

```
control-ui/src/ui/
├── controllers/reports.ts          # fetch /api/reports/*，模式同 dashboard.ts
└── views/agents-panels-reports.ts  # renderAgentReports(props) 面板渲染
```

### 面板布局

```
[Tasks]
┌──────────────────────────────────────────────┐
│ 📊 销售周报              ✅ 上次: 2026-W13   │
│    每周一 08:00  企微 + 3封邮件               │
│    [▶ 立即运行]  [⚙ 配置（展开内联表单）]    │
└──────────────────────────────────────────────┘

[配置表单（展开时）]
  Cron:        [0 8 * * 1     ]
  企微 Robot:  [_______________]
  邮件:        [_______________]
  启用:        [✓]
  [保存]  [取消]

[Recent Runs]
  周次       触发    状态   时间
  2026-W13  定时    ✅     Mon 08:02
  2026-W12  手动    ✅     Fri 14:31
  2026-W11  定时    ❌     Mon 08:00  [查看错误]
```

### app.ts 状态扩展

```typescript
@state() reportsTasksLoading = false;
@state() reportsTasks: ReportTask[] = [];
@state() reportsRecords: ReportRecord[] = [];
@state() reportsError: string | null = null;
```

---

## 通知格式

### 企业微信（Markdown 消息）

```
📊 **销售周报 2026-W14**（2026-03-31 ~ 2026-04-06）

**本周汇总**
• 订单数：156 单
• 销售额：¥ 382,450
• 客单价：¥ 2,452

**每日趋势**
03-31(一) ■■■■■ 28单 ¥65,200
04-01(二) ■■■   18单 ¥40,100
...

**Top 5 客户**
1. 青山建材    32单  ¥98,000
2. 万达管业    18单  ¥54,200
...

**状态分布**  CLOSED 71% · PROCEED 18% · WAITING 8% · QUEUE 3%
```

### 邮件

- Subject: `[销售周报] 2026-W14 — 156单 / ¥382,450`
- Body: 与企微相同内容的 HTML 格式（使用 Python `email.mime`）

---

## 错误处理

| 场景 | 处理 |
|---|---|
| Accurate API 超时/限流 | 最多重试 3 次（指数退避），全部失败写 `status=failed` |
| pandas 分析异常 | 捕获异常，写 `error_msg`，不发通知 |
| 通知失败（企微/邮件） | 记录日志，不影响 `status=success`（报告已生成） |
| APScheduler 错过触发（Render 重启） | 下次手动触发补跑，或配置 `misfire_grace_time=3600` |

---

## 环境变量（新增）

```env
# 报告推送（可选，不配置则跳过对应推送）
REPORT_NOTIFY_WECOM_GROUP=your-robot-key
REPORT_NOTIFY_EMAILS=a@example.com,b@example.com
REPORT_CRON_EXPR=0 8 * * 1
```

---

## 依赖（新增）

```
apscheduler>=3.10
pandas>=2.0
```

两者均轻量，apscheduler 无需外部 broker（内存模式），与 Render 单进程兼容。

---

## 不在本次范围内

- 多种报告类型（采购周报、库存周报）— 架构支持，但初期只实现销售周报
- 报告详情页内嵌图表渲染 — 企微/邮件推送文字版即可，前端只列历史记录
- 报告导出 Excel/PDF — 后续迭代
