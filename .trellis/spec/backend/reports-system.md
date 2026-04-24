# Reports System — 周报系统

> 周报系统从 Accurate Online 获取销售发票数据，经过 pandas 统计 + Markdown 格式化 + Claude Haiku LLM 分析，输出完整周报。

---

## 系统架构

```
Accurate Online API
       ↓ fetch_sales_invoices()
backend/reports/accurate_fetcher.py

pandas 分析
       ↓ analyze_sales_orders()
backend/reports/analyzer.py
       ↓ ReportPayload (dataclass)
Markdown 格式化
       ↓ format_report_md()
Markdown 文本
       ↓
report_records.report_md（同步保存）
       ↓
后台线程 run_llm_analysis()
       ↓ fetch_prev_week_payload() + build_analysis_prompt()
Claude Haiku API (claude-haiku-4-5-20251001)
       ↓
report_records.analysis_md（异步保存）
```

---

## 数据库表

### `report_task_config` — 调度任务配置

| 字段 | 类型 | 说明 |
|------|------|------|
| `task_key` | TEXT PK | 任务键名，当前固定 `sales_weekly_basic` |
| `title` | TEXT | 显示标题 `销售发票周报（基础版）` |
| `enabled` | BOOLEAN | 是否启用调度 |
| `cron_expr` | TEXT | Cron 表达式，默认 `0 9 * * 1`（每周一 09:00） |
| `timezone` | TEXT | 时区，默认 `Asia/Shanghai` |
| `updated_at` | TIMESTAMPTZ | 更新时间 |

### `report_records` — 周报执行记录

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | BIGSERIAL PK | 记录 ID |
| `task_key` | TEXT | 所属任务 |
| `status` | TEXT | `running` / `success` / `failed` |
| `trigger_type` | TEXT | `schedule`（定时）或 `manual`（手动） |
| `started_at` | TIMESTAMPTZ | 开始时间 |
| `finished_at` | TIMESTAMPTZ | 结束时间（成功/失败时） |
| `error_message` | TEXT | 失败原因 |
| `summary_json` | JSONB | `{total_order_count, total_sales_amount}`（列表页摘要用） |
| `report_json` | JSONB | 完整 `ReportPayload`，含日统计/客户统计/状态统计 |
| `report_md` | TEXT | Markdown 格式的原始数据报告 |
| `analysis_md` | TEXT | Claude Haiku 生成的 LLM 分析文本 |
| `analysis_status` | TEXT | `pending` / `running` / `done` / `failed` |
| `week_start` | DATE | 本期统计起始日（上周一） |
| `week_end` | DATE | 本期统计截止日（上周日） |

---

## 核心模块

### `backend/reports/models.py`

- **Dataclass**：`DayStats` / `CustomerStat` / `StatusStat` / `ReportPayload`
- **Pydantic Model**：`TaskConfigPatch` / `ReportTaskResponse` / `ReportRecordResponse` / `ReportRecordDetailResponse`
- **`ensure_tables()`**：启动时建表 + 插入默认任务配置
- **`reset_stale_running_analyses()`**：进程重启后把遗留 `analysis_status='running'` 批量改 `failed`

### `backend/reports/accurate_fetcher.py`

```python
fetch_sales_invoices(week_start, week_end) -> List[Dict]
```
- 调用 Accurate Online `/api/sales-invoice/list.do`
- 日期过滤用 `BETWEEN` + `filter.transDate.val[0]/val[1]`
- 分页最多 500 页，防止死循环（有 `last_page_ids` 去重）
- 返回字段：`id, number, transDate, customer, description, statusName, age, totalAmount`

### `backend/reports/analyzer.py`

```python
analyze_sales_orders(week_start, week_end, orders) -> ReportPayload
```
- `transDate` 解析：优先 `DD/MM/YYYY`，fallback 到 `pd.to_datetime`
- `totalAmount` → `amount_num`（float）
- `customer` 可能是 dict（Accurate 结构）或 string
- **日统计**：`groupby date` → 每日订单数 + 销售额
- **客户 Top10**：`groupby customerName` → 排序取前 10
- **状态统计**：`groupby statusName`

### `backend/reports/formatter.py`

```python
format_report_md(payload: ReportPayload) -> str
```
生成纯 Markdown 表格：每日趋势 / 客户 Top10 / 状态汇总。

### `backend/reports/runner.py`

```python
resolve_week_range(now=None) -> (week_start, week_end)
```
周范围 = 上上周一 ~ 上上周日（当前周一前一周）。

```python
run_report_task(task_key, trigger_type) -> Dict
```
**主执行流程（同步）**：
1. 插入 `report_records`（status=running）
2. `fetch_sales_invoices()` 获取发票原始数据
3. `analyze_sales_orders()` 生成统计
4. `format_report_md()` 生成 Markdown
5. 更新 `report_records`（report_json + report_md + summary_json）
6. **后台线程**启动 `run_llm_analysis()`
7. 返回 `{record_id, status, summary}`

### `backend/reports/llm_analyzer.py`

```python
run_llm_analysis(db_url, record_id, task_key, current_payload)
```
**异步 Phase 2（后台线程）**：
1. `analysis_status = 'running'`
2. `fetch_prev_week_payload()` 拉上周报告（用于环比）
3. `build_analysis_prompt()` 构造 prompt：
   - 本周完整 JSON 数据
   - 上周数据摘要（若有）
   - 要求：趋势分析 / 环比对比 / 问题建议
   - 严格规则：所有数字必须来自 JSON，禁止编造
4. `call_llm_for_analysis()` → Claude Haiku `claude-haiku-4-5-20251001`，超时 180s
5. 写回 `analysis_md`，状态置 `done`
6. 失败则状态 `failed`（不污染 `report_md`）

### `backend/reports/service.py`

```python
start_report_service()  # 启动 APScheduler BackgroundScheduler
reload_task()           # 重新加载任务配置并更新调度器
stop_report_service()   # 关闭调度器
```
- 调度器启动时从 DB 读取 `cron_expr` / `timezone` / `enabled`
- 定时触发走 `run_report_task(trigger_type='schedule')`

---

## API 路由（FastAPI）

所有路由需要 `X-Reports-Token` header。

| Method | Path | 说明 |
|--------|------|------|
| GET | `/api/reports/accurate/ping` | Ping Accurate Online API |
| POST | `/api/reports/tasks/{task_key}/run` | 手动触发一次报告生成 |
| GET | `/api/reports/tasks` | 列出所有任务配置 |
| PATCH | `/api/reports/tasks/{task_key}` | 更新任务配置（enabled/cron_expr/timezone/title） |
| GET | `/api/reports/records` | 列出历史记录（limit=20，默认） |
| GET | `/api/reports/records/{record_id}` | 获取单条记录详情（含 report_md / analysis_md） |
| POST | `/api/reports/records/{record_id}/reformat` | 重新格式化 Markdown（不改数据） |
| POST | `/api/reports/records/{record_id}/reanalyze` | 重跑 LLM 分析（不改数据） |
| POST | `/api/reports/reset-stale` | 批量重置遗留 running 状态 |

---

## 前端（Lit Web Components）

### `control-ui/src/ui/views/reports-tab.ts`

主 Tab 页面，分为左右两栏：

**左侧栏**：
- Admin Token 输入框（`x-reports-token`）
- 「立即运行」按钮（每个 task 一个）
- 历史记录列表（按 `started_at DESC`）
- 每条记录显示：日期 / 分析状态 badge / 订单数+金额
- 底部：任务配置编辑面板（cron / timezone / enabled）

**右侧栏**：
- **数据 Tab**（`data`）：
  - 两个指标卡：总销售额 / 总订单数
  - `report-chart`（每日柱状图）
  - 每日明细表
  - `report-chart`（客户横向柱状图）
  - 客户 Top10 表
  - 状态汇总表
- **分析 Tab**（`analysis`）：
  - `pending` / `running` → 显示等待状态
  - `failed` → 错误提示 + 「重新分析」按钮
  - `done` → 渲染 `analysis_md` 为 sanitized HTML

### `control-ui/src/ui/controllers/reports.ts`

- `loadReports(state)` — 并行加载 tasks + records
- `runReportTask(state, taskKey)` — POST 触发，返回后刷新列表
- `loadReportDetail(state, id)` — 加载单条，含 soft 轮询模式
- `reanalyzeRecord(state, id)` — POST reanalyze，自动启动轮询
- `saveReportTaskConfig(state, taskKey, patch)` — PATCH 更新任务配置

**分析状态轮询**：
- `startAnalysisPoller(state, id)` — 每 3 秒轮询一次
- 最多 `_ANALYSIS_POLL_MAX_TICKS = 80` 次（约 4 分钟）后超时
- `soft=true` 模式：轮询时不切换 `reportDetailLoading`，避免整页闪烁

### `control-ui/src/ui/report-chart.ts`

`<report-chart type="daily" .data=${daily}>` 或 `<report-chart type="customers" .data=${customers}>`

- 使用 Chart.js 柱状图
- `type="daily"`：垂直柱状图，Y 轴为金额（Rp）
- `type="customers"`：水平柱状图，倒序（Top1 在上）
- 颜色：`rgba(99,102,241,0.72)`
- 响应式，`maintainAspectRatio: false`

---

## 两阶段设计要点

1. **同步 Phase 1**（秒级）：抓数据 → 分析 → 生成 `report_md` → 返回 `record_id`
   - `report_md` 一旦生成永不修改（除非调用 `/reformat`）
2. **异步 Phase 2**（数秒~数十秒）：后台线程调用 LLM → 生成 `analysis_md`
   - LLM 分析失败不影响 `report_md`，状态标记 `failed`
   - 进程重启后 `analysis_status='running'` 的记录会残留，`reset_stale` 清理

---

## 配置项

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | Neon PostgreSQL（必填） |
| `ANTHROPIC_API_KEY` | Claude API Key |
| `ANTHROPIC_BASE_URL` | Claude API Base URL（可选） |
| `REPORTS_ADMIN_TOKEN` | 前端调用所有 `/api/reports/*` 路由的共享密钥 |

---

## 注意事项

1. **Accurate Online 日期格式**：API 要求 `DD/MM/YYYY`，`analyzer.py` 的 `_parse_trans_date` 已做解析
2. **LLM 分析可能超时**：设置了 180s 超时；若 `analysis_status` 长期停留 `running`，可用 `POST /api/reports/reset-stale` 重置
3. **历史记录无分页**：前端固定 `?limit=20`，按 `id DESC` 取最新 20 条
4. **Week range 计算**：`resolve_week_range()` 以当前服务器时间为准，取决于部署时区
