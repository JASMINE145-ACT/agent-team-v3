# Overview Dashboard 升级设计

**日期：** 2026-04-08
**状态：** 已批准，待实现

---

## 问题陈述

当前 Overview 页是系统运行状态为主的布局，包含无货/缺货 stat card，但：
- 系统信息占据视觉主位，业务数据退居其次
- 报价单没有任何展示
- 没有任何图表，无法感知趋势

目标是把 Overview 升级为以业务 KPI 和图表为主的 Dashboard，系统信息缩减到角落。

---

## 目标行为

### 布局（从上到下）

1. **系统状态区（缩减）**：连接状态、在线 Sessions、Cron 状态，压缩为单行 card，不再铺开
2. **业务 KPI 行（新增）**：6 个横排 stat card
   - 无货产品数（`oosStats.out_of_stock_count`）
   - 缺货产品数（`shortageStats.shortage_product_count`）
   - 待确认报价单（`quotationStats.pending_count`）
   - 今日新增报价（`quotationStats.today_count`）
   - 缺货报价单（`quotationStats.shortage_count`）
   - 补货单数（`quotationStats.replenishment_count`）
3. **图表区（新增）**：两张 Chart.js 折线图并排
   - 左：近 7 天每日报价单数量趋势（单线）
   - 右：近 7 天无货 + 缺货数量对比（双线）

### 交互

- 进入页面时加载一次，右上角提供手动刷新按钮
- 图表使用 Chart.js（npm 安装到 `control-ui/`）
- 无数据时图表显示空状态提示

---

## 后端变更

### 新增接口：`GET /api/quotation-drafts/stats`

**位置：** `backend/server/api/routes_quotation.py`

**响应结构：**
```json
{
  "success": true,
  "data": {
    "pending_count": 3,
    "today_count": 2,
    "shortage_count": 1,
    "replenishment_count": 5,
    "by_time": [
      { "date": "2026-04-02", "count": 1 },
      { "date": "2026-04-03", "count": 0 },
      ...
    ]
  }
}
```

**字段定义：**
- `pending_count`：status = `"pending"` 的报价单数量
- `today_count`：今日（UTC+8）新增报价单数量
- `shortage_count`：至少含一条缺货 line 的报价单数量（通过 join QuotationDraftLineDB 判断）
- `replenishment_count`：补货单总数（查 ReplenishmentDraftDB）
- `by_time`：近 7 天每日报价单数，日期升序，缺数据的日补 0

**新增 data_service 方法：** `get_quotation_draft_stats(days: int = 7) -> Dict`

位置：`backend/tools/oos/services/data_service.py`

---

## 前端变更

### 新文件：`control-ui/src/ui/views/dashboard-charts.ts`

- 纯函数 `renderDashboardCharts(props: DashboardChartsProps) => TemplateResult`
- Props：
  ```typescript
  type DashboardChartsProps = {
    quotationByTime: Array<{ date: string; count: number }>;
    oosByTime: OosByTimeRow[];
    shortageByTime: ShortageByTimeRow[];
    loading: boolean;
  };
  ```
- 渲染两个 `<canvas>` 元素，并在 DOM 挂载后通过 `requestAnimationFrame` + `Chart.js` 初始化
- 使用 Lit `@updated` 钩子（或 Reactive Controller）管理 Chart 实例生命周期，防止重复创建

### 新文件：`control-ui/src/ui/controllers/dashboard.ts`

```typescript
type DashboardState = {
  basePath: string;
  dashboardLoading: boolean;
  dashboardError: string | null;
  quotationStats: QuotationDraftStats | null;
  oosByTime: OosByTimeRow[];
  shortageByTime: ShortageByTimeRow[];
};
```

- `fetchDashboard(state, basePath)` 并发调用 3 个接口：
  - `GET /api/quotation-drafts/stats`
  - `GET /api/oos/by-time?days=7`
  - `GET /api/shortage/by-time?days=7`

### 新类型：`QuotationDraftStats`（`types.ts`）

```typescript
export type QuotationDraftStats = {
  pending_count: number;
  today_count: number;
  shortage_count: number;
  replenishment_count: number;
  by_time: Array<{ date: string; count: number }>;
};
```

### 修改：`control-ui/src/ui/views/overview.ts`

- 系统状态 card 保留但布局压缩（连接状态、sessions、cron 合并到一行）
- 原无货/缺货 stat card 区域改为 6 格 KPI 行（合并报价单 stats）
- 末尾追加 `renderDashboardCharts(...)` 调用
- 原 Notes 区块（Tailscale / Session / Cron 说明）保留在最底部

### 修改：`OverviewProps`（`views/overview.ts`）

新增 props：
```typescript
quotationStats: QuotationDraftStats | null;
oosByTime: OosByTimeRow[];
shortageByTime: ShortageByTimeRow[];
dashboardLoading: boolean;
```

### 修改：Overview Controller / Bootstrap

在现有 overview 状态初始化时，调用 `fetchDashboard()` 并将结果注入 props。

### Chart.js 安装

```
cd control-ui && npm install chart.js
```

---

## 兼容性与风险

- `quotationStats` 为 null 时所有 KPI 显示 `—`，图表显示空状态，不崩溃
- 旧 overview 的 `oosStats`、`shortageStats` 接口调用保留，KPI 数字来源不变，只是布局重组
- Chart.js 按需 import（只引入 `LineController`、`LineElement`、`PointElement`、`LinearScale`、`CategoryScale`、`Tooltip`），避免 bundle 过大
- 图表 canvas 需在 LitElement 或宿主组件 `updated` 时初始化，不能在 pure function template 里直接操作 DOM；需封装为 LitElement class 或使用 Reactive Controller

---

## 测试计划

1. 后端单测：`get_quotation_draft_stats()` 返回结构正确，`by_time` 长度为 7，缺日补 0
2. 前端构建：`npm run build` 无报错
3. 人工验证：进入 Overview 页，6 个 KPI 卡片有数据，两张图表渲染正常
4. 空数据验证：清空报价单数据，KPI 显示 0，图表显示空状态提示
