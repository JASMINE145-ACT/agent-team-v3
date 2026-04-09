# 周报可视化 — 设计文档

**日期**：2026-04-08  
**状态**：已批准，待实现  
**目标**：控制台新增「周报」侧边栏 Tab，展示销售发票周报历史记录及完整 Markdown 正文，支持一键复制。

---

## 1. 背景与目标

当前 `report_records` 表已存储执行记录，但 `report_json` 是原始结构化数据，控制台无法直接阅读。  
本次目标：**B 方案** — 后端生成 Markdown 字段存库（`report_md`），前端新 Tab 展示 + 复制。

成功标准：
- 运行报告任务后，记录含 `report_md` 字段（格式化 Markdown 文本）。
- 控制台「周报」Tab 可浏览历史记录，选中后看到完整报告正文。
- 「复制」按钮把 `report_md` 复制到剪贴板，可直接粘贴到企微/邮件。

---

## 2. 数据源

- **Accurate API 端点**：`/api/sales-invoice/list.do`（销售发票，非销售订单）  
- **日期过滤参数**：`filter.transDate.startDate` / `filter.transDate.endDate`（上周一 ~ 上周日）  
- **字段投影**（待实测后填入真实字段名）：

  ```python
  "fields": "id,number,transDate,customer,description,statusName,age,totalAmount"
  ```

  > Step 0 已完成（探针调用 + detail.do 全字段确认）。

- **字段含义（已实测确认）**：

  | 截图列 | 真实字段 | 取值示例 | 备注 |
  |--------|---------|---------|------|
  | Number | `number` | `016/VIG/INV/04/2026` | |
  | Date | `transDate` | `06/04/2026`（DD/MM/YYYY）| 需解析 |
  | Customer | `customer.name` | `PT. LANDASAN TEKNIK LESTARI` | 嵌套，`fields=customer` 返回 dict |
  | Description | `description` | `LTL-IWIP-257101` | |
  | Status | `statusName` | `Belum Lunas` / `Lunas` | Outstanding=Belum Lunas |
  | Age(Day) | `age` | `-11`（负=未到期，正=逾期）| |
  | Total | `totalAmount` | `655766233.0` Rp | |

---

## 3. 后端变更

### 3.1 新文件：`backend/reports/formatter.py`

```python
def format_report_md(payload: ReportPayload) -> str:
    """ReportPayload → Markdown 字符串"""
```

输出模板：

```markdown
# 销售发票周报｜{week_start} ~ {week_end}

**本周开票数**：{total_order_count} 张
**本周开票总额**：Rp {total_sales_amount:,.0f}

## 客户明细（Top 10）

| 排名 | 客户名称 | 发票数 | 金额 |
|------|----------|--------|------|
| 1 | XX贸易有限公司 | 3 | Rp 1,967,000,000 |
...

## 状态汇总

| 状态 | 张数 | 金额 |
|------|------|------|
| Outstanding | 15 | Rp 5,100,000,000 |
| Paid | 8 | Rp 3,134,500,000 |
```

> `ReportPayload` 需扩展 `status_stats: List[StatusStat]`（状态汇总），`analyzer.py` 对 `status` 字段做 groupby 填充。若 `status` 字段为空/缺失则跳过状态汇总段。

### 3.2 数据库变更（`backend/reports/models.py`）

```sql
ALTER TABLE report_records ADD COLUMN IF NOT EXISTS report_md TEXT NULL;
```

在 `ensure_tables()` 末尾追加此语句，Neon 上存量记录自动为 NULL，无损。

### 3.3 `backend/reports/runner.py`

`run_report_task()` 在生成 `payload` 后：

```python
from backend.reports.formatter import format_report_md
report_md = format_report_md(payload)
# 写库时加入 report_md 字段
```

### 3.4 `backend/reports/accurate_fetcher.py`

- 端点改为 `/api/sales-invoice/list.do`
- 加 `"fields": "..."` 参数（Step 0 后填入）
- 函数名改为 `fetch_sales_invoices`（语义更准确）

### 3.5 `backend/reports/analyzer.py`

- 字段映射改为 invoice 字段名（`grandTotal` 替换 `amount` 等）
- `ReportPayload` 加 `status_stats: List[StatusStat]`
- `StatusStat` dataclass：`status: str, count: int, total_amount: float`
- 分析中增加按 `status` groupby

### 3.6 `backend/server/api/routes_reports.py` — 新增接口

```
GET  /api/reports/records/{id}           # 返回完整记录含 report_md
POST /api/reports/records/{id}/reformat  # 对旧记录按 report_json 补生成 report_md
```

`GET /api/reports/records`（列表）**不返回** `report_md`，保持轻量。

---

## 4. 前端变更

### 4.1 `src/ui/navigation.ts`

```ts
// TAB_GROUPS agent 分组
{ label: "agent", tabs: ["agents", "skills", "nodes", "reports"] }

// Tab 类型加 "reports"
// TAB_PATHS 加 reports: "/reports"
// iconForTab 加 case "reports": return "barChart2"
```

### 4.2 i18n（`en.ts` / `zh-CN.ts`）

```ts
// tabs
reports: "Reports" / "周报"

// subtitles
reports: "Weekly sales invoice reports. Click a record to view full content." /
         "销售发票周报历史。点击记录查看完整报告。"

// agents.reports — 新键
detailLoading: "Loading report..." / "加载报告中…"
detailEmpty: "Select a record on the left to view the report." / "选择左侧记录查看报告正文。"
copyBtn: "Copy" / "复制"
copiedBtn: "Copied!" / "已复制！"
reformatBtn: "Regenerate report_md" / "重新生成报告文本"
```

### 4.3 `src/ui/types.ts`

```ts
interface ReportRecord {
  // 已有字段 ...
  report_md?: string; // 仅 detail 接口返回
}
```

### 4.4 `src/ui/controllers/reports.ts`

新增函数：

```ts
export async function loadReportDetail(state: ReportsState, id: number): Promise<void>
// GET /api/reports/records/{id} → state.reportDetail
```

`ReportsState` 新增字段：

```ts
reportDetail: ReportRecord | null;
reportDetailLoading: boolean;
selectedRecordId: number | null;
```

### 4.5 新文件：`src/ui/views/reports-tab.ts`

页面结构（两栏）：

```
┌──────────────────┬──────────────────────────────────────────┐
│  执行记录列表（35%）│  报告正文（65%）                          │
│                  │                                           │
│  Token 输入框     │  [复制] 按钮（右上）                       │
│  [刷新] 按钮      │                                           │
│                  │  <pre> report_md                          │
│  每行：           │  （等宽字体，Markdown 原文）                │
│  · 周期起止日      │                                           │
│  · status badge  │  未选中时：                                │
│  · 总张数/总额     │  "选择左侧记录查看报告正文。"               │
│  点击行 → 高亮    │                                           │
└──────────────────┴──────────────────────────────────────────┘
```

复制逻辑：`navigator.clipboard.writeText(state.reportDetail.report_md)` → 按钮文字临时变「已复制！」2 秒后还原。

Token 共享：`reports-tab.ts` 读写 `state.reportsAdminToken`，与 Agents>Skills 共用同一字段，用户设置一次两处生效。

### 4.6 `src/ui/app-render.ts`

在 tab switch 逻辑加 `case "reports"` → 渲染 `renderReportsTab(state, ...)`。

---

## 5. 错误处理

| 场景 | 处理 |
|------|------|
| `report_md` 为 NULL（旧记录）| 右栏展示「暂无报告文本，可点击「重新生成」按钮补生成。」 |
| 列表加载失败 | 展示 callout danger + 错误信息 |
| Detail 加载失败 | 右栏展示 callout danger |
| Token 未配置（503）| 错误信息里提示「请在输入框填写 Reports Admin Token」 |

---

## 6. 实现顺序

1. **Step 0**：运行探针，确认 invoice 字段名
2. 后端：`formatter.py` + DB migration + `runner.py` + `analyzer.py` + `accurate_fetcher.py` + 新 API 端点
3. 前端：`navigation.ts` + i18n + `types.ts` + `reports.ts` controller + `reports-tab.ts` view + `app-render.ts` 接入
4. 测试：手动触发一次任务，验证 `report_md` 写库；前端打开周报 Tab 验证展示与复制

---

## 7. 不在本次范围内

- 企微/邮件推送
- Excel 导出
- 图表可视化
- 同比/环比分析
- 多任务调度自动化
