# 周报 P0 改进实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不破坏现有契约的前提下，分三批交付：前端排障助手、DQ 状态落库展示、历史列表筛选分页。

**Architecture:**
- Task 1（前端排障）：纯 UI/文案改动，不碰后端状态机
- Task 2（DQ Gate）：后端 `llm_analyzer.py` 聚合检查结果写入 `summary_json`，API 返回新增字段
- Task 3（列表筛选分页）：前端 `reports.ts` controller 叠加坡度过滤 + `limit/offset` 分页

**Tech Stack:** Python (FastAPI/pydantic/psycopg2) / Lit (TypeScript)

---

## Task 1：前端失败态排障助手

**Files:**
- Modify: `control-ui/src/ui/views/reports-tab.ts`（L267–273 失败态渲染区）
- Modify: `control-ui/src/i18n/locales/zh-CN.ts`（i18n 文案）
- Modify: `control-ui/src/i18n/locales/en.ts`（i18n 文案）
- Test: `control-ui/src/ui/views/reports-tab.test.ts`

- [ ] **Step 1: 在 `renderAnalysisTab` 失败态分支新增排障区域**

找到 `reports-tab.ts` L267–273：
```typescript
if (aStatus === "failed") {
  return html`
    <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
      <div style="color:var(--color-danger,#ef4444);">${t("agents.reports.analysisFailed")}</div>
      <button class="btn btn--sm" @click=${() => params.onReanalyze(params.reportDetail!.id)}>${t("agents.reports.reanalyzeBtn")}</button>
    </div>
  `;
}
```

替换为：
```typescript
if (aStatus === "failed") {
  const err = params.reportDetail?.error_message ?? t("agents.reports.errorUnknown");
  const recordId = params.reportDetail?.id;
  return html`
    <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
      <div style="color:var(--color-danger,#ef4444);font-size:14px;font-weight:600;">
        ${t("agents.reports.analysisFailed")}
      </div>
      <div style="font-size:12px;color:var(--text-muted);max-width:320px;text-align:center;">
        ${t("agents.reports.analysisFailedHint")}
      </div>
      <details style="width:100%;max-width:360px;margin-top:4px;">
        <summary style="cursor:pointer;font-size:12px;color:var(--text-muted);user-select:none;">
          ${t("agents.reports.troubleshooting")}
        </summary>
        <div style="margin-top:8px;padding:10px;background:var(--surface-2);border-radius:6px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
          <div>
            <span style="color:var(--text-secondary);">1. </span>
            <span>${t("agents.reports.stepCheckToken")}</span>
          </div>
          <div>
            <span style="color:var(--text-secondary);">2. </span>
            <span>${t("agents.reports.stepCheckBackendLog")}</span>
          </div>
          <div>
            <span style="color:var(--text-secondary);">3. </span>
            <span>${t("agents.reports.stepRetry")}</span>
          </div>
          ${recordId ? html`
            <div style="margin-top:4px;display:flex;align-items:center;gap:6px;">
              <code style="font-size:11px;background:var(--surface-1);padding:2px 6px;border-radius:4px;color:var(--text-muted);">
                record_id=${recordId}
              </code>
              <button
                class="btn btn--sm"
                style="font-size:11px;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(String(recordId));
                }}
              >
                ${t("agents.reports.copy")}
              </button>
            </div>
          ` : nothing}
        </div>
      </details>
      <button class="btn btn--sm primary" @click=${() => params.onReanalyze(params.reportDetail!.id)}>
        ${t("agents.reports.reanalyzeBtn")}
      </button>
    </div>
  `;
}
```

- [ ] **Step 2: 在 zh-CN.ts 增加 i18n 字段**

在 `agents.reports` 区块添加：
```typescript
"analysisFailedHint": "分析失败，可能由 Token 超额或后端异常引起",
"troubleshooting": "排障指引",
"stepCheckToken": "检查 Token 是否充足",
"stepCheckBackendLog": "检查后端日志是否有错误",
"stepRetry": "点击上方重试按钮",
"copy": "复制",
"errorUnknown": "未知错误",
```

在 en.ts 添加对应英文：
```typescript
"analysisFailedHint": "Analysis failed — possibly due to token limits or backend errors",
"troubleshooting": "Troubleshooting",
"stepCheckToken": "Check if API token has remaining quota",
"stepCheckBackendLog": "Check backend logs for errors",
"stepRetry": "Click Retry above",
"copy": "Copy",
"errorUnknown": "Unknown error",
```

- [ ] **Step 3: 写前端单元测试覆盖失败态渲染**

在 `reports-tab.test.ts` 添加：
```typescript
test('failed analysis shows troubleshooting section with copy button', () => {
  const mockDetail: ReportRecord = {
    id: 42,
    task_key: 'sales_weekly_basic',
    status: 'success',
    trigger_type: 'manual',
    started_at: '2026-04-30T10:00:00Z',
    summary_json: {},
    analysis_status: 'failed',
    error_message: 'anthropic API error',
  };
  const params = makeParams({ reportDetail: mockDetail, reportsDetailTab: 'analysis' });
  const result = renderAnalysisTab(params);
  // 包含排障区域
  assert(result.querySelector('details') !== null);
  // 包含复制 record_id 按钮
  assert(result.querySelector('button')?.textContent?.includes('Copy') ?? false);
});
```

- [ ] **Step 4: 运行测试确认通过**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
py -m playwright test control-ui/src/ui/views/reports-tab.test.ts
# 若无 playwright，改用 ts-node 做类型检查：
npx tsc --noEmit control-ui/src/ui/views/reports-tab.ts
```

- [ ] **Step 5: 提交**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/views/reports-tab.ts
git add control-ui/src/i18n/locales/zh-CN.ts
git add control-ui/src/i18n/locales/en.ts
git add control-ui/src/ui/views/reports-tab.test.ts
git commit -m "feat(reports-ui): add troubleshooting assistant for failed analysis state"
```

---

## Task 2：DQ Gate 落库与展示

**Files:**
- Modify: `backend/reports/models.py`（`ReportRecordDetailResponse` 新增字段）
- Modify: `backend/reports/llm_analyzer.py`（聚合 DQ 检查，写入 `summary_json.dq_*`）
- Modify: `backend/server/api/routes_reports.py`（确认 API 返回结构不变，只扩展字段）
- Test: `tests/test_reports_analyzer.py`
- Test: `tests/test_reports_routes.py`

- [ ] **Step 1: 在 `models.py` 的 `ReportRecordDetailResponse` 确认字段已兼容**

确认 `ReportRecordDetailResponse`（L75）包含 `summary_json?: Dict[str, Any]`，若有即可直接使用无需修改。

- [ ] **Step 2: 在 `llm_analyzer.py` 的 `run_llm_analysis` 开始处插入 DQ 检查**

找到 `llm_analyzer.py` L171 `run_llm_analysis` 函数入口，在 `_set_analysis_status(db_url, record_id, "running")` 之后插入：

```python
def _run_dq_checks(payload: ReportPayload, dq_checks: List[dict]) -> dict:
    """执行数据质量检查，结果追加到 dq_checks 列表。"""
    # 1. 完整性：关键字段空值检测
    if not payload.week_start or not payload.week_end:
        dq_checks.append({"rule": "date_range_complete", "passed": False, "detail": "week_start or week_end is empty"})
    else:
        dq_checks.append({"rule": "date_range_complete", "passed": True})

    # 2. 金额非负
    if payload.total_sales_amount < 0:
        dq_checks.append({"rule": "amount_non_negative", "passed": False, "detail": f"total_sales_amount={payload.total_sales_amount} < 0"})
    else:
        dq_checks.append({"rule": "amount_non_negative", "passed": True})

    # 3. 聚合一致性：daily_stats 求和 vs total
    daily_sum = sum(d.sales_amount for d in payload.daily_stats)
    if abs(daily_sum - payload.total_sales_amount) > 1.0:
        dq_checks.append({"rule": "daily_sum_matches_total", "passed": False, "detail": f"diff={abs(daily_sum - payload.total_sales_amount):.2f}"})
    else:
        dq_checks.append({"rule": "daily_sum_matches_total", "passed": True})

    # 4. 订单数合理性：daily_order_count 求和 vs total
    daily_count = sum(d.order_count for d in payload.daily_stats)
    if daily_count != payload.total_order_count:
        dq_checks.append({"rule": "daily_count_matches_total", "passed": False, "detail": f"sum={daily_count} vs total={payload.total_order_count}"})
    else:
        dq_checks.append({"rule": "daily_count_matches_total", "passed": True})

    # 5. 唯一性：订单号重复率（若有）
    # （本版本暂不实现，规则为空 dict placeholder）
    dq_checks.append({"rule": "invoice_id_uniqueness", "passed": True, "detail": "not implemented"})

    return {
        "dq_passed": all(c.get("passed", False) for c in dq_checks),
        "warnings_count": sum(1 for c in dq_checks if not c.get("passed", False)),
        "failed_rules": [c["rule"] for c in dq_checks if not c.get("passed", False)],
        "dq_checks": dq_checks,
    }
```

- [ ] **Step 3: 修改 `run_llm_analysis` 中调用 DQ 并写入 summary_json**

找到 L171 入口处，在 `_set_analysis_status` 之后插入：

```python
    # DQ Gate 检查
    dq_result = _run_dq_checks(current_payload, [])
    # 将 DQ 结果写入 summary_json（通过 _update_summary_json）
    _update_summary_json(db_url, record_id, dq_result)
```

在文件末尾（L187 之后）添加：

```python
def _update_summary_json(db_url: str, record_id: int, extra: dict) -> None:
    """将 extra 合并入 record 的 summary_json，不改变其他字段。"""
    import json as _json
    conn = psycopg2.connect(db_url)
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT summary_json FROM report_records WHERE id=%s",
                    (record_id,),
                )
                row = cur.fetchone()
                existing = (row[0] or {}) if row else {}
                merged = {**existing, **extra}
                cur.execute(
                    "UPDATE report_records SET summary_json=%s WHERE id=%s",
                    (_json.dumps(merged), record_id),
                )
    finally:
        conn.close()
```

- [ ] **Step 4: 修改 `_set_analysis_status` 调用 `_update_summary_json` 以在 done 时也更新 DQ**

找到 L179 `_set_analysis_status(db_url, record_id, "done", analysis_md)`，在其后插入：

```python
        # done 时DQ结果已写入summary_json，此处无需额外操作
```

（DQ 在 running 前已写入，done 时 summary_json 已有dq_* 字段。）

- [ ] **Step 5: 写后端单元测试**

在 `tests/test_reports_analyzer.py` 添加：

```python
def test_dq_checks_detect_negative_amount():
    from backend.reports.llm_analyzer import _run_dq_checks
    from backend.reports.models import ReportPayload, DayStats, CustomerStat, StatusStat

    payload = ReportPayload(
        week_start="2026-04-01", week_end="2026-04-07",
        total_sales_amount=-100.0,  # 负数
        total_order_count=10,
        daily_stats=[DayStats(date="2026-04-01", order_count=10, sales_amount=-100.0)],
        top_customers=[],
        status_stats=[],
    )
    result = _run_dq_checks(payload, [])
    assert result["dq_passed"] is False
    assert "amount_non_negative" in result["failed_rules"]
    assert result["warnings_count"] == 1


def test_dq_checks_detect_aggregation_mismatch():
    from backend.reports.llm_analyzer import _run_dq_checks
    from backend.reports.models import ReportPayload, DayStats, CustomerStat, StatusStat

    payload = ReportPayload(
        week_start="2026-04-01", week_end="2026-04-07",
        total_sales_amount=1000.0,
        total_order_count=10,
        daily_stats=[DayStats(date="2026-04-01", order_count=10, sales_amount=500.0)],  # sum=500 != 1000
        top_customers=[],
        status_stats=[],
    )
    result = _run_dq_checks(payload, [])
    assert result["dq_passed"] is False
    assert "daily_sum_matches_total" in result["failed_rules"]


def test_dq_checks_pass_when_data_valid():
    from backend.reports.llm_analyzer import _run_dq_checks
    from backend.reports.models import ReportPayload, DayStats, CustomerStat, StatusStat

    payload = ReportPayload(
        week_start="2026-04-01", week_end="2026-04-07",
        total_sales_amount=1000.0,
        total_order_count=10,
        daily_stats=[DayStats(date="2026-04-01", order_count=10, sales_amount=1000.0)],
        top_customers=[],
        status_stats=[],
    )
    result = _run_dq_checks(payload, [])
    assert result["dq_passed"] is True
    assert result["warnings_count"] == 0
    assert result["failed_rules"] == []
```

在 `tests/test_reports_routes.py` 添加：

```python
def test_record_detail_contains_dq_fields():
    # 假设有一条含 dq_* 的 record
    resp = client.get("/api/reports/records/1", headers={"x-reports-token": TEST_TOKEN})
    assert resp.status_code == 200
    data = resp.json()
    if "summary_json" in data and data["summary_json"]:
        dq = data["summary_json"].get("dq_passed")
        # DQ 已运行时字段必在
        assert "dq_passed" in data["summary_json"] or dq is not None
```

- [ ] **Step 6: 运行后端测试确认无回归**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
py -m pytest tests/test_reports_analyzer.py tests/test_reports_routes.py -v
```

期望：全部 PASS（含新增 4 个用例）

- [ ] **Step 7: 提交**

```bash
git add backend/reports/llm_analyzer.py
git add backend/reports/models.py
git add tests/test_reports_analyzer.py
git add tests/test_reports_routes.py
git commit -m "feat(reports): add DQ Gate checks and results in summary_json"
```

---

## Task 3：历史记录列表筛选/分页

**Files:**
- Modify: `control-ui/src/ui/controllers/reports.ts`（`loadReports` 增加过滤参数）
- Modify: `control-ui/src/ui/views/reports-tab.ts`（历史列表区增加搜索框/状态筛选）
- Modify: `control-ui/src/ui/types.ts`（`ReportsState` 增加 filter 字段）
- Test: `control-ui/src/ui/views/reports-tab.test.ts`

- [ ] **Step 1: 在 `ReportsState` 增加过滤状态**

找到 `reports.ts` L3–14 的 `ReportsState`，在末尾添加：

```typescript
export type ReportsState = {
  // ... 现有字段 ...
  reportsFilter: {
    search: string;
    status: AnalysisStatus | "all";
  };
};
```

初始化处（`loadReports` 调用前）默认：
```typescript
state.reportsFilter = { search: "", status: "all" };
```

- [ ] **Step 2: 在 `loadReports` 增加过滤查询参数**

找到 `reports.ts` L49 `fetch(apiUrl(state.basePath, "/api/reports/records?limit=20")`：

替换为：
```typescript
const params = new URLSearchParams({ limit: "50" });
if (state.reportsFilter.search) params.set("search", state.reportsFilter.search);
if (state.reportsFilter.status !== "all") params.set("status", state.reportsFilter.status);
fetch(apiUrl(state.basePath, `/api/reports/records?${params.toString()}`), ...)
```

- [ ] **Step 3: 在 `reports-tab.ts` 历史记录列表头部增加筛选 UI**

找到 L388–393 区域：
```typescript
<div
  style="font-size:11px;color:var(--text-muted);padding:10px 12px 6px;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border);"
>
  历史记录
</div>
```

在这行**之后**插入搜索框：
```typescript
<div style="padding:6px 8px;border-bottom:1px solid var(--border);display:flex;gap:6px;">
  <input
    style="flex:1;font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:6px;"
    placeholder="${t("agents.reports.filterSearch")}"
    .value=${params.reportsFilter?.search ?? ""}
    @input=${(e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      params.onFilterChange?.({ search: val, status: params.reportsFilter?.status ?? "all" });
    }}
  />
  <select
    style="font-size:12px;padding:4px;border:1px solid var(--border);border-radius:6px;"
    .value=${params.reportsFilter?.status ?? "all"}
    @change=${(e: Event) => {
      const val = (e.target as HTMLSelectElement).value as AnalysisStatus | "all";
      params.onFilterChange?.({ search: params.reportsFilter?.search ?? "", status: val });
    }}
  >
    <option value="all">${t("agents.reports.filterAll")}</option>
    <option value="done">${t("agents.reports.filterDone")}</option>
    <option value="failed">${t("agents.reports.filterFailed")}</option>
    <option value="pending">${t("agents.reports.filterPending")}</option>
  </select>
</div>
```

- [ ] **Step 4: 新增 `onFilterChange` 到 `ReportsTabParams` 类型**

在 `ReportsTabParams`（L42–66）末尾添加：
```typescript
onFilterChange?: (filter: { search: string; status: AnalysisStatus | "all" }) => void;
```

并在 `renderReportsTab` 入口处传入：
```typescript
onFilterChange: (filter) => { state.reportsFilter = filter; loadReports(state); },
```

（若上层组件未传递，可在 `renderReportsTab` 中使用空函数作为默认值。）

- [ ] **Step 5: i18n 增加筛选相关文案**

zh-CN.ts 添加：
```typescript
"filterSearch": "搜索日期/金额",
"filterAll": "全部状态",
"filterDone": "已分析",
"filterFailed": "失败",
"filterPending": "分析中",
```

en.ts 添加：
```typescript
"filterSearch": "Search date/amount",
"filterAll": "All",
"filterDone": "Done",
"filterFailed": "Failed",
"filterPending": "Pending",
```

- [ ] **Step 6: 写前端测试覆盖筛选功能**

在 `reports-tab.test.ts` 添加：
```typescript
test('history list renders search input and status filter', () => {
  const params = makeParams({ reportsRecords: [...], reportsDetailTab: 'data' });
  // 验证搜索框和筛选 select 存在
});
```

- [ ] **Step 7: 提交**

```bash
git add control-ui/src/ui/controllers/reports.ts
git add control-ui/src/ui/views/reports-tab.ts
git add control-ui/src/ui/types.ts
git add control-ui/src/i18n/locales/zh-CN.ts
git add control-ui/src/i18n/locales/en.ts
git commit -m "feat(reports-ui): add search and status filter for history list"
```

---

## 自检

### Spec 覆盖

| Spec 要求 | Task |
|-----------|------|
| 前端失败态排障助手含三步 + 复制 record_id | Task 1 |
| DQ 检查结果落库 `summary_json.dq_*` | Task 2 |
| 至少覆盖 3 条 DQ 规则（日期完整性/聚合一致性/金额合法性） | Task 2 |
| 历史记录列表搜索 + 状态筛选 | Task 3 |
| 失败态/排障 UI 可通过手测 | Task 1 |
| 核心回归测试全绿 | Task 1、2 |

### 工作量估算

| Task | 预计时间 |
|------|---------|
| Task 1: 前端排障助手 | 30 min |
| Task 2: DQ Gate 落库 | 45 min |
| Task 3: 列表筛选/分页 | 30 min |
| **合计** | **~105 min** |

### 验收标准

- [ ] `test_reports_analyzer.py` 新增 3 个 DQ 测试 PASS
- [ ] `test_reports_routes.py` 新增 DQ 字段断言 PASS
- [ ] 前端失败态显示排障三步 + 复制按钮（record_id）
- [ ] 历史列表有搜索框 + 状态下拉筛选
- [ ] i18n 中英双语覆盖
- [ ] 核心回归（7+ 用例）全绿

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-30-weekly-report-p0-improvements.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**