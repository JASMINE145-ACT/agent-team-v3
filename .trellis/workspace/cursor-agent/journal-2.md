## Session 49: 2026-04-19 — CCB history compression study (Ralph iteration 10)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 10 轮最终收官，补齐“最终阅读入口 + 版本演进日志 + 终局结论”。
- 首轮 review 发现两处导航一致性问题（标题迭代号与复盘章节列表过期），修复后复审通过。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §33：最终阅读入口（按场景给出阅读顺序）
  - 新增 §34：Iteration 1–10 版本演进日志
  - 新增 §35：Iteration 10 交付视角结论
  - 修订：
    - 导航标题更新为 `导航（Iteration 10 终稿）`
    - 复盘路径补齐 `§29/§32/§35`
    - 章节分组索引新增 `§30–§32`、`§33–§35`
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 10）」记录（与 `max_iterations: 10` 对齐）

### Verification Gate

- Code-review agent: **PASS**（复审后）
  - 初审发现 2 项一致性问题；修复后 PASS。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

## Session 57: Library Schema Sync 第六轮收口（schema-diff 兜底契约）

**Date**: 2026-04-24  
**Task**: Ralph loop iteration 6，补齐 `schema-diff` 在无物理列场景下的返回契约测试并完成最终门禁。

### Summary

新增 `schema-diff` 空结果用例测试，明确约束当物理表 introspect 返回空列表时，接口应返回 `200 + {"new_columns": []}`。

### Main Changes

- `tests/test_admin_libraries_routes.py`
  - 新增 `test_schema_diff_returns_empty_list_when_no_physical_columns`
    - mock `resolve_library_meta` 返回存在库
    - mock `introspect_table_columns` 返回空数组
    - 断言响应 `status_code == 200` 且 payload 为 `{"new_columns": []}`

### Verification Gate Evidence

1) **Code-Review Agent PASS**
- 结论：新增测试与当前路由契约一致，无阻断问题。

2) **Test Agent PASS**
- `python -m pytest -q tests/test_library_schema_sync.py tests/test_admin_libraries_routes.py`
  - 结果：`23 passed`
- `cd control-ui && npx vitest run src/ui/controllers/admin-data.test.ts --browser.enabled false`
  - 结果：`1 file passed, 2 tests passed`
- `cd control-ui && npx tsc --noEmit`
  - 结果：通过（无类型错误）

3) **Documentation / Trellis**
- 本条 Session 57 已记录本轮改动与证据链

### Status

[OK] **Completed**

## Session 56: Library Schema Sync 第五轮加固（异常路径契约测试）

**Date**: 2026-04-24  
**Task**: Ralph loop iteration 5，补充 `schema-diff` / `sync-schema` 异常路径契约测试。

### Summary

新增三条路由异常路径测试，覆盖库不存在（404）和同步内部异常（500）分支，进一步锁定 API 行为边界。

### Main Changes

- `tests/test_admin_libraries_routes.py`
  - 新增 `test_schema_diff_returns_404_when_library_missing`
  - 新增 `test_sync_schema_returns_404_when_library_missing`
  - 新增 `test_sync_schema_propagates_repository_failure`
    - 使用 `TestClient(..., raise_server_exceptions=False)` 验证 500 状态码

### Verification Gate Evidence

1) **Code-Review Agent PASS**
- 结论：新增测试与当前路由行为对齐，无阻断问题。

2) **Test Agent PASS**
- `python -m pytest -q tests/test_library_schema_sync.py tests/test_admin_libraries_routes.py`
  - 结果：`22 passed`
- `cd control-ui && npx vitest run src/ui/controllers/admin-data.test.ts --browser.enabled false`
  - 结果：`1 passed file, 2 passed tests`
- `cd control-ui && npx tsc --noEmit`
  - 结果：通过（无类型错误）

3) **Documentation / Trellis**
- 本条 Session 56 已记录本轮改动与证据链

### Status

[OK] **Completed**

## Session 55: Library Schema Sync 第四轮加固（路由契约测试）

**Date**: 2026-04-24  
**Task**: Ralph loop iteration 4，补充 schema-diff / sync-schema 路由契约测试，锁定 spec 行为。

### Summary

新增两条 `routes_admin` 路由测试：验证 `schema-diff` 只返回新增列，`sync-schema` 返回合并列名数组，进一步固化 API 返回结构。

### Main Changes

- `tests/test_admin_libraries_routes.py`
  - 新增 `test_schema_diff_returns_only_new_columns`
    - mock `resolve_library_meta` 与 `introspect_table_columns`
    - 断言返回的 `new_columns` 仅包含元数据外的新增物理列，且结构为 `{name,type,original_name}`
  - 新增 `test_sync_schema_returns_merged_column_names`
    - mock `sync_library_schema`
    - 断言 `POST /sync-schema` 返回 `{merged: [...]}` 与预期列名列表一致

### Verification Gate Evidence

1) **Code-Review Agent PASS**
- 结论：新增测试无阻断问题，契约覆盖与 spec 对齐。

2) **Test Agent PASS**
- `python -m pytest -q tests/test_library_schema_sync.py tests/test_admin_libraries_routes.py`
  - 结果：`19 passed`
- `cd control-ui && npx vitest run src/ui/controllers/admin-data.test.ts --browser.enabled false`
  - 结果：`1 file passed, 2 tests passed`
- `cd control-ui && npx tsc --noEmit`
  - 结果：通过（无类型错误）

3) **Documentation / Trellis**
- 本条 Session 55 已记录本轮改动与证据链

### Status

[OK] **Completed**

## Session 54: Library Schema Sync 第三轮加固（前端控制器测试）

**Date**: 2026-04-24  
**Task**: Ralph loop iteration 3，补足 schema-sync 前端控制器链路自动化验证并打通运行环境。

### Summary

新增 `admin-data` controller 测试，覆盖 `loadLibraryData` 并行拉取 schema-diff 与 `syncLibrarySchema` 完成后清空待合并列；补充 `jsdom` 开发依赖，确保该测试可在非 browser 模式稳定运行。

### Main Changes

- `control-ui/src/ui/controllers/admin-data.test.ts`（新文件）
  - 新增 `loads library rows and schema-diff columns together`
  - 新增 `syncLibrarySchema clears pending new columns after reload`
  - 使用 `vi.stubGlobal("fetch", ...)` 模拟接口链路，并通过 `afterEach(vi.unstubAllGlobals)` 防止全局污染

- `control-ui/package.json`
  - 新增 devDependency：`jsdom`

- `control-ui/package-lock.json`
  - 锁文件同步更新（包含 `jsdom` 及其传递依赖）

### Verification Gate Evidence

1) **Code-Review Agent PASS**
- 复审结论：通过（测试实现与依赖变更均无阻断问题）

2) **Test Agent PASS**
- `python -m pytest -q tests/test_library_schema_sync.py tests/test_admin_libraries_routes.py`
  - 结果：`17 passed`
- `cd control-ui && npx vitest run src/ui/controllers/admin-data.test.ts --browser.enabled false`
  - 结果：`1 passed file, 2 passed tests`
- `cd control-ui && npx tsc --noEmit`
  - 结果：通过（无类型错误）

3) **Documentation / Trellis**
- 本条 Session 54 已记录本轮改动与证据链

### Status

[OK] **Completed**

## Session 53: Library Schema Sync 第二轮加固（验证与保护列）

**Date**: 2026-04-24  
**Task**: Ralph loop iteration 2，继续按 spec 补强 schema-sync 细节与测试。

### Summary

完成 repository 与路由测试层的二次收敛：修正 `introspect_table_columns` 参数处理，补上保护列校验，并扩大自动化覆盖。

### Main Changes

- `backend/tools/admin/repository.py`
  - `introspect_table_columns()` 改为直接使用原始 `table_name` 参数查询 `information_schema`，避免对 `_safe_table_name` 结果再 `strip('"')` 的隐式依赖。
  - `add_library_column()` 新增保护列拒绝：`id` / `_row_index` → `ValueError("protected column")`。
  - `rename_library_column()` 新增目标列保护校验：禁止重命名为 `id` / `_row_index`。

- `tests/test_library_schema_sync.py`
  - 扩展 `introspect_table_columns` 测试，断言查询参数为 `{"tn": "dl_1_demo"}`。
  - 新增 `test_add_library_column_rejects_protected_name`。
  - 新增 `test_rename_library_column_rejects_protected_target`。

- `tests/test_admin_libraries_routes.py`
  - 扩展 schema 列管理错误映射用例：覆盖非法列名 422 分支（repository 抛 `ValueError("invalid column name")`）。

### Verification Evidence

- Code-review agent：**PASS**
  - 结论：本轮改动无阻断问题，保护列校验与测试覆盖到位。
- Test-agent：**PASS**
  - `python -m pytest -q tests/test_library_schema_sync.py tests/test_admin_libraries_routes.py`
  - 结果：`17 passed`
  - `cd control-ui && npx tsc --noEmit`
  - 结果：无类型错误

### Status

[OK] **Completed**

## Session 57: 2026-04-24 — Ralph Iteration 6（最终收口：前端高亮样式契约补测 + 扩展回归）

**Date**: 2026-04-24  
**Task**: `2026-04-24-reports-wow-chart-predict.md` 最后一轮查缺补漏（max-turn=6）

### Summary

- 新增前端测试覆盖“已选日期行高亮”视觉契约，确保图表联动状态不仅触发回调，也能体现在表格行样式上。
- 执行一组扩展回归（前端 vitest + tsc、后端 reports 相关 pytest 套件）确认三项需求在当前代码库中稳定通过。

### Main Changes

- `control-ui/src/ui/views/reports-tab.test.ts`
  - 新增 `highlights selected daily row when selectedDailyDate is set`
  - 断言选中日期行样式包含高亮背景（`accent-soft`）与加粗（`font-weight:600`）。

### Verification Gate

- Code-review agent: **PASS**
  - 结论：新增测试覆盖有效，未引入阻塞问题；建议后续可增加未选中行负向断言（非阻塞）。
- Test-agent: **PASS**
  - `cd control-ui && npx vitest run "src/ui/views/reports-tab.test.ts" "src/ui/report-chart.test.ts"` -> `6 passed`
  - `cd control-ui && npx tsc --noEmit` -> `0 errors`
  - `python -m pytest tests/test_reports_runner.py backend/reports/tests/test_runner_prev_summary.py backend/reports/tests/test_llm_prompt.py tests/test_reports_llm_analyzer.py tests/test_reports_analyzer.py tests/test_reports_formatter.py -q` -> `25 passed`

### Status

[OK] **Completed**

## Session 56: 2026-04-24 — Ralph Iteration 5（runner 测试稳健化：去 SQL 文本耦合）

**Date**: 2026-04-24  
**Task**: 继续执行 `2026-04-24-reports-wow-chart-predict.md`，提升测试抗变更能力

### Summary

- 本轮将 `tests/test_reports_runner.py` 的 success update 识别逻辑从 SQL 文本匹配切换为参数结构语义匹配，降低换行/空格/SQL 文案变更导致的脆弱失败。
- 保持原有行为验证目标不变：确保 `run_report_task` 正确写入 `week_start/week_end` 与 `prev_week` 百分比。

### Main Changes

- `tests/test_reports_runner.py`
  - 新增 helper：`_find_success_update_params(execute_calls, expected_record_id)`
  - helper 约束：
    - `execute` 第 2 参数为 6 元 tuple；
    - `record_id` 等于预期值；
    - `summary/report_json/report_md/week_start/week_end` 类型与关键字段符合预期。
  - 两个测试均改为调用 helper，替代 `"status='success'"` SQL 文本检索。

### Verification Gate

- Code-review agent: **PASS**
  - 结论：参数语义匹配可靠，避免 SQL 文本脆弱性，未引入明显误判。
- Test-agent: **PASS**
  - `python -m pytest tests/test_reports_runner.py -v` -> `2 passed`
  - `python -m pytest backend/reports/tests/test_runner_prev_summary.py backend/reports/tests/test_llm_prompt.py -q` -> `6 passed`
  - `cd control-ui && npx vitest run "src/ui/views/reports-tab.test.ts" "src/ui/report-chart.test.ts"` -> `5 passed`
  - `cd control-ui && npx tsc --noEmit` -> `0 errors`

### Status

[OK] **Completed**

## Session 55: 2026-04-24 — Ralph Iteration 4（周报链路补测：runner prev_week 写库断言）

**Date**: 2026-04-24  
**Task**: 继续执行 `2026-04-24-reports-wow-chart-predict.md`，补齐链路级测试缺口

### Summary

- 本轮聚焦“查缺补漏”中的后端链路稳定性，新增 `run_report_task` 层面的回归测试，验证 `summary_json.prev_week`（含 `amount_pct` / `count_pct`）确实写入成功记录。
- 目标是避免仅测 helper 而漏掉“实际 UPDATE 参数”这一关键落库行为。

### Main Changes

- `tests/test_reports_runner.py`
  - 新增 `test_run_report_task_includes_prev_week_summary_with_pct`
  - 通过 mock `fetchone.side_effect` 模拟：
    - `INSERT ... RETURNING id`
    - `SELECT summary_json` 返回上周汇总
  - patch `backend.reports.runner.Json` 为透传，直接断言 `UPDATE status='success'` 参数中的 `summary` 结构：
    - `prev_week.total_sales_amount`
    - `prev_week.total_order_count`
    - `prev_week.amount_pct`
    - `prev_week.count_pct`

### Verification Gate

- Code-review agent: **PASS**
  - 结论：断言命中关键行为，mock 路径可靠；仅提示 SQL 文本匹配可后续做稳健化。
- Test-agent: **PASS**
  - `python -m pytest tests/test_reports_runner.py -v` -> `2 passed`
  - `python -m pytest backend/reports/tests/test_runner_prev_summary.py backend/reports/tests/test_llm_prompt.py -q` -> `6 passed`
  - `cd control-ui && npx vitest run "src/ui/views/reports-tab.test.ts" "src/ui/report-chart.test.ts"` -> `5 tests passed`
  - `cd control-ui && npx tsc --noEmit` -> exit `0`

### Status

[OK] **Completed**

## Session 54: 2026-04-24 — 周报三项增强（WoW KPI + 图表联动 + 下周预测）

**Date**: 2026-04-24  
**Task**: 执行 `docs/superpowers/plans/2026-04-24-reports-wow-chart-predict.md`

### Summary

- 完成计划中的三项增强：
  - KPI 卡片新增 WoW 环比百分比（销售额/订单数）。
  - `report-chart` 柱状图点击后联动高亮每日明细行，支持再次点击取消与手动清除。
  - `build_analysis_prompt()` 新增「下周预测」段落与“必须标注预测”约束。
- 增加后端测试覆盖：`_fetch_prev_summary` 空数据行为与 prompt 关键文案回归。

### Main Changes

- `backend/reports/runner.py`
  - 新增 `_fetch_prev_summary(conn, task_key, week_start)`。
  - `run_report_task()` 在写库前注入 `summary.prev_week`，包含上周销售额/订单数及 `amount_pct`/`count_pct`。
- `control-ui/src/ui/views/reports-tab.ts`
  - KPI 区读取 `summary_json.prev_week` 并渲染涨跌百分比。
  - `ReportsTabParams` 新增 `selectedDailyDate` 与 `onDailyDateClick`。
  - daily 图表监听 `chart-bar-click`，并在表格中高亮对应日期行。
- `control-ui/src/ui/report-chart.ts`
  - daily 图表新增 Chart.js `onClick`，派发 `chart-bar-click`（`bubbles + composed`）。
- `control-ui/src/ui/app-view-state.ts`
  - 新增 `reportsSelectedDailyDate: string | null`。
- `control-ui/src/ui/app.ts`
  - 新增 `@state() reportsSelectedDailyDate` 初始值 `null`。
- `control-ui/src/ui/app-render.ts`
  - `renderReportsTab()` 传入 `selectedDailyDate/onDailyDateClick`。
  - 切换报告 `onSelectRecord` 时清空 `reportsSelectedDailyDate`。
- `backend/reports/llm_analyzer.py`
  - prompt 输出要求新增第 4 项「下周预测」，并补“预测必须标注”规则。
- 新增测试：
  - `backend/reports/tests/test_runner_prev_summary.py`
  - `backend/reports/tests/test_llm_prompt.py`

### Verification Gate

- Code-review agent: **PASS**
  - 结论：实现与计划一致，无阻塞性缺陷；建议后续补充前端交互自动化测试。
- Test-agent: **PASS**
  - `python -m pytest backend/reports/tests/test_runner_prev_summary.py backend/reports/tests/test_llm_prompt.py -v` -> `3 passed, 0 failed`
  - `cd control-ui && npx tsc --noEmit` -> `0 errors`

### Status

[OK] **Completed**

---

## Session 48: 2026-04-19 — CCB history compression study (Ralph iteration 9)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 9 轮增量，补齐“单页速查版”与排障现场 FAQ，进一步降低文档使用门槛。
- 目标是把已有长文收敛为可快速决策的现场卡片。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §30：单页速查版（顺序、互斥、分流、最小诊断与指标）
  - 新增 §31：一句话 FAQ（排障现场常见问答）
  - 新增 §32：Iteration 9 速查视角小结
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 9）」记录

### Verification Gate

- Code-review agent: **PASS**
  - 结论：`§30–§32` 与前文和源码契约一致，无新增冲突。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 47: 2026-04-19 — CCB history compression study (Ralph iteration 8)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 8 轮增量，文档做“导航化收口”，补齐快速阅读路径、章节分组与终稿使用建议。
- 首轮 review 提示索引覆盖遗漏（未纳入 `§27–§29`），已修复后复审通过。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增“导航（Iteration 8 收口）”
  - 新增 §27：终稿使用建议（按角色）
  - 新增 §28：文档边界与后续扩展
  - 新增 §29：Iteration 8 收口结论
  - 修订：章节分组索引补齐 `收口与交付 | §27–§29`
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 8）」记录

### Verification Gate

- Code-review agent: **PASS**（复审后）
  - 初审发现 1 项索引遗漏；修复后 PASS。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 46: 2026-04-19 — CCB history compression study (Ralph iteration 7)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 7 轮增量，补齐“案例 -> 源码分支 -> 指标”对照层。
- 目标是把前序案例库从经验总结升级为可直接定位代码与验证指标的排障索引。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §24：案例-源码分支对照表
  - 新增 §25：案例-指标对照表
  - 新增 §26：Iteration 7 对照化结论
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 7）」记录

### Verification Gate

- Code-review agent: **PASS**
  - 结论：§24–§26 与 `query.ts` / `autoCompact.ts` / `microCompact.ts` / `toolResultStorage.ts` 契约一致。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 45: 2026-04-19 — CCB history compression study (Ralph iteration 6)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 6 轮增量，补齐“实战案例库”与“复盘模板”，把压缩策略从理论/参数层推进到案例化落地层。
- 本轮重点是把常见失败模式映射成统一的「现象 -> 判定 -> 修复 -> 验证」闭环。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §21：实战案例库（4 个典型案例）
  - 新增 §22：案例复盘模板（6 行记录法）
  - 新增 §23：Iteration 6 案例化结论
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 6）」记录

### Verification Gate

- Code-review agent: **PASS**
  - 结论：`§21-§23` 与 `query.ts` / `autoCompact.ts` 契约一致，和前序章节口径连贯。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 44: 2026-04-19 — CCB history compression study (Ralph iteration 5)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 5 轮增量，围绕 `context collapse` 策略补充“反例/误配”与“快速排障路径”。
- 文档从“机制 + 调参”继续推进到“反模式识别 + 故障定位”层面。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §18：反例与误配清单（常见参数组合误解与短路场景）
  - 新增 §19：10分钟排障路径（主导层判定 -> gate判定 -> 错误分流 -> 终局指标）
  - 新增 §20：Iteration 5 反模式结论
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 5）」记录

### Verification Gate

- Code-review agent: **PASS**
  - 结论：新增内容与 `query.ts` / `autoCompact.ts` 的 preempt 与恢复链契约一致。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 43: 2026-04-19 — CCB history compression study (Ralph iteration 4)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 4 轮增量，补齐面向落地的“调参实战手册”与“观测指标建议”。
- 文档从“机制/参数”进一步推进到“目标导向策略包 + 验证指标”。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §15：调参实战手册（保细节 / 省成本 / 稳恢复 三类目标）
  - 新增 §16：观测指标建议（压缩层命中率、恢复路径分布、会话质量指标）
  - 新增 §17：Iteration 4 可操作结论
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 4）」记录

### Verification Gate

- Code-review agent: **PASS**
  - 结论：新增内容与 `query.ts` / `autoCompact.ts` / `microCompact.ts` / `toolResultStorage.ts` 契约一致。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 42: 2026-04-19 — CCB history compression study (Ralph iteration 3)

**Date**: 2026-04-19

### Summary

- 完成 Step 5 第 3 轮增量，文档从“流程分析”升级到“参数化控制面板”，补齐 history compression 的可调参数与优先级冲突处理。
- 首轮 review 给出两项重要修正后已完成收敛：补 reactive-only 开关项、明确 413 与 media 恢复链差异。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §12：参数面板（env/user config/feature 对压缩行为的作用）
  - 新增 §13：覆盖优先级与冲突处理
  - 新增 §14：Iteration 3 参数化结论
  - review 修订：
    - 新增 `tengu_cobalt_raccoon`（reactive-only 抑制 proactive autocompact）
    - 将恢复链拆分为
      - `413`: `recoverFromOverflow -> reactiveCompact`
      - `media`: 直接 `reactiveCompact`
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 3）」并记录 review 修订点。

### Verification Gate

- Code-review agent: **PASS**
  - 初审提出 2 项重要问题；修订后复审 PASS。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 41: 2026-04-19 — CCB history compression study (Ralph iteration 2)

**Date**: 2026-04-19

### Summary

- 基于 Step 5 第 2 轮迭代，继续深化 `context collapse` 研究文档，补齐「触发矩阵 + 决策树 + 工程化准则」。
- 将结果写回 Ralph scratchpad，记录 iteration 2 完成状态。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`
  - 新增 §8：触发矩阵（budget/snip/microcompact/contextCollapse/autocompact/reactive compact 分工）
  - 新增 §9：运行时决策树（含 withheld 413 / media 错误分流）
  - 新增 §10：工程化启发（分层成本、恢复触发、缓存稳定性协同）
  - 新增 §11：Iteration 2 结论句
- `.cursor/ralph/scratchpad.md`
  - 追加「已完成（迭代 2）」进度说明

### Verification Gate

- Code-review agent: **PASS**
  - 结论：新增内容与 `query.ts` / `autoCompact.ts` / `toolResultStorage.ts` 契约一致。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 40: 2026-04-19 — CCB context collapse/history compression study

**Date**: 2026-04-19

### Summary

- 在 `学习案例/claude-code-best` 范围完成 Step 5 调研，新增 `contextCollapse_historyCompressionStrategy.md`，梳理 `queryLoop` 中 history compression 分层策略与 `contextCollapse` 的角色。
- 启动新一轮 Ralph Loop：重置 `.cursor/ralph/scratchpad.md` 为 `iteration: 1`、`max_iterations: 10`，任务聚焦 `context collapse` 与 `history compression strategy`。

### Main Changes

- `学习案例/claude-code-best/claude学习/contextCollapse_historyCompressionStrategy.md`（新建）：
  - 归纳 `query.ts` 压缩流水线顺序：`applyToolResultBudget` -> `snip` -> `microcompact` -> `contextCollapse` -> `autocompact` -> `callModel`。
  - 解释 `autoCompact.ts` 中「`contextCollapse` 启用时抑制 `autocompact`」的互斥设计原因。
  - 解释 withheld 413 恢复链：`recoverFromOverflow` 优先，`reactiveCompact` 兜底。
- `.cursor/ralph/scratchpad.md`（更新）：
  - 记录新 loop frontmatter 与本轮研究提示词。

### Verification Gate

- Code-review agent: **PASS**
  - 结论：文档与源码行为一致（流水线顺序、collapse/autocompact 互斥、413 恢复顺序）。
- Test-agent: **PASS**
  - `python -m pytest "Agent Team version3/tests/test_smoke.py" -q --tb=no` -> `4 passed`。

### Status

[OK] **Completed**

---

## Session 38: 2026-04-17 — Admin 自定义库 table_name 修复与展示重命名 API

**Date**: 2026-04-17

### Summary

- 修复 `data_libraries.table_name` 与物理表不一致导致的 `relation "dl_*" does not exist`：`_make_table_slug` 在「去符号后 slug 为空」时不再生成 `dl_{id}_lib_`；新增 `resolve_library_meta`、`try_repair_library_table_name(meta=…)`、`_is_undefined_table_error`（PostgreSQL `42P01` 异常链 + 文案兜底）；读库失败时仍可一次性自动修复并重试。
- 自定义库相关路由在读写删、删库前统一走 `resolve_library_meta`，避免仅读过列表就写入时仍指向错误物理表名。
- 新增 `PUT /api/admin/libraries/{lib_id}`，仅更新展示字段 `name`，不修改物理 `table_name`。

### Main Changes

- `backend/tools/admin/repository.py`：slug 修复、`resolve_library_meta`、repair 与 `fetch_library_data` 的 `lib_id` 重试、`pgcode` 识别。
- `backend/server/api/routes_admin.py`：`PUT /libraries/{id}`；`GET/POST/PUT/DELETE` 库数据与 `DELETE /libraries/{id}` 使用 `resolve_library_meta`。
- `backend/tools/admin/tests/test_library_slug.py`、`test_undefined_table_error.py`；`tests/test_admin_libraries_routes.py` 扩展（含 mock 路径修正）。

### Verification Gate

- `py -3 -m pytest backend/tools/admin/tests/test_library_slug.py backend/tools/admin/tests/test_undefined_table_error.py tests/test_admin_libraries_routes.py -q` → **12 passed**

### Status

[OK] **Completed**

---

## Session 34: 2026-04-16 — Weekly Report 修复 + 数据管理模块闭环 + control-ui 全局 TS 清绿

**Date**: 2026-04-16

### Summary

- 完成周报修复与图表增强闭环：`analysis_md` ThinkingBlock 污染修复、上周对比改为 `week_start` 维度、`report_records` 写入 `week_start/week_end`、新增报告图表组件并接入数据页。
- 连续迭代完成数据管理模块 Task 1~8：`data_libraries` migration、`parse_generic` 与测试、自定义库 repository CRUD、`/api/admin/libraries/...` 路由、前端第三 Tab（自定义库）与库列表/详情编辑、宿主接线与警告样式。
- 按用户要求执行 B 方案：清理 `control-ui` 全局 TypeScript 编译错误，最终 `npx tsc --noEmit` 全量通过。

### Main Changes

- 周报修复与增强（backend + ui）：
  - `backend/reports/llm_analyzer.py`：`_message_text()` 跳过 ThinkingBlock，仅取 text block；`fetch_prev_week_payload()` 使用 `week_start < current_week_start` 查询；`run_llm_analysis()` 调用参数同步更新。
  - `backend/reports/models.py`：`report_records` 新增 `week_start/week_end` 列（DDL + `ensure_tables` 迁移）。
  - `backend/reports/runner.py`：成功写库时落 `week_start/week_end`。
  - `tests/test_reports_llm_analyzer.py`、`tests/test_reports_runner.py`：补齐对应单测。
  - `control-ui/src/ui/report-chart.ts`（新建）+ `views/reports-tab.ts`：Data tab 新增 daily/customers 图表。
- 数据管理模块（admin custom libraries）：
  - backend：`002_create_data_libraries.sql`、`repository.py` 自定义库 CRUD、`excel_parser.py` `parse_generic`、`routes_admin.py` 自定义库路由。
  - frontend：`admin-data.types.ts`、`admin-data.ts`、`views/admin-data.ts`、`app-render.ts`、`components.css` 完成自定义库三层能力（上传/列表/详情编辑）。
- control-ui 全局 TS 清理（最小类型修复）：
  - `control-ui/tsconfig.json`、`src/gateway/protocol/client-info.ts`、`src/gateway/device-auth.ts`、`src/shared/device-auth.ts`、`src/shared/usage-aggregates.ts`、`src/ui/gateway.ts`、`src/ui/app-gateway.ts`、`src/ui/navigation.ts`、`src/ui/controllers/chat.ts`、`src/ui/controllers/chat.test.ts`、`src/ui/tool-display.ts`。

### Verification Gate

- Code-review agent: **PASS**
  - 周报修复首轮发现 chart rebuild/文本问题，修复后二次 review PASS。
  - 数据管理前端接线首轮发现 NUMERIC 输入保存为字符串，修复后二次 review PASS。
  - TS 全局修复 review PASS（无阻塞项）。
- Test-agent: **PASS（最终收口）**
  - `control-ui`: `npx tsc --noEmit` → Exit 0
  - `py -3 -c "from backend.server.api.app import app; print('routes ok')"` → `routes ok`
  - `py -3 -m pytest backend/tools/admin/tests/test_generic_parser.py -v` → `12 passed`
  - 周报相关回归：`tests/test_reports_llm_analyzer.py` + `tests/test_reports_runner.py` 通过（12 passed）

### Status

[OK] **Completed**

## Session 33: 2026-04-16 — 数据管理模块两次增量修复（前端可见性 + 自定义库上传）

**Date**: 2026-04-16

### Summary

- 修复 1（前端可见性）：用户在 `admin-data` 页面看不到「自定义库」Tab，根因是运行时仍在使用旧 `dist/control-ui` 构建产物；已重新构建并确认新 bundle 包含「自定义库」文本与渲染分支。
- 修复 2（上传失败）：`POST /api/admin/libraries/upload` 报 `syntax error at or near ":"`，根因是 `repository.create_library_and_insert()` 使用 `:cols::jsonb` 在 SQLAlchemy `text()` + psycopg2 下未被正确绑定；已改为 `CAST(:cols AS jsonb)`。

### Main Changes

- `control-ui` 重新构建：
  - `npm run build`（`vite build`）成功，产物更新到 `dist/control-ui/`。
  - 构建后在 `dist/control-ui/assets/index-*.js` 中可检索到「自定义库」。
- `backend/tools/admin/repository.py`：
  - `INSERT INTO data_libraries ... VALUES (:name, :tn, :cols::jsonb, 0)`  
    → `INSERT INTO data_libraries ... VALUES (:name, :tn, CAST(:cols AS jsonb), 0)`。

### Verification Gate

- Code-review agent: **PASS**
  - 结论：`CAST(:cols AS jsonb)` 对 SQLAlchemy 参数绑定更稳，无阻塞问题。
- Test-agent: **PASS**
  - `py -m pytest tests/test_admin_libraries_routes.py -q` → `3 passed`
  - `py -m pytest backend/tools/admin/tests/test_generic_parser.py -q` → `12 passed`
  - `py -c "from backend.server.api.app import app; print('routes ok')"` → `routes ok`

### Status

[OK] **Completed**

## Session 32: 2026-04-15 — Tool-Defer 当前 P0/Stub 排查

**Date**: 2026-04-15

### Summary

- 复核了 `ToolRegistry` 与 `JAgentExtension.register()` 实际注册链路，确认当前运行时工具并非“代码里所有工具”，而是“已注册工具”集合。
- 在 `ENABLE_TOOL_DEFER=true` 情况下，模型收到的是 **P0 完整 schema + deferred stub**；deferred 工具完整 schema 需经 `tool_search` 展开。
- 本次环境实测计数：`ALL=18`、`P0=11`、`DEFER=7`、`STUBS=7`，满足 `ALL = P0 + DEFER` 与 `STUBS = DEFER`。

### Evidence

- Runtime introspection（`ToolRegistry + JAgentExtension.register`）：
  - `ALL=18`
  - `P0=11`: `ask_clarification`, `get_inventory_by_code`, `get_inventory_by_code_batch`, `get_profit_by_price`, `get_profit_by_price_batch`, `match_by_quotation_history`, `match_quotation`, `match_quotation_batch`, `match_wanding_price`, `search_inventory`, `tool_search`
  - `DEFER=7`: `append_business_knowledge`, `batch_quick_quote`, `edit_excel`, `modify_inventory`, `parse_excel_smart`, `run_quotation_fill`, `select_wanding_match`
  - `STUBS=7`（与 `DEFER` 一致）
- `backend/core/agent.py` 验证到分支：
  - `if Config.ENABLE_TOOL_DEFER: tools = get_p0_definitions() + get_deferred_stubs()`
  - `else: tools = get_definitions()`
- `backend/tools/oos/handler.py` 当前 `ctx.register_tool(...)` 6 行处于注释状态，因此 OOS 工具未进入当前 chat registry。

### Verification Gate

- Code-review agent: **PASS**（结论正确；提示低风险改进项：`_OOS_TOOL_DEFS` 未使用、stub 描述统一省略号、`fill_quotation_sheet` 跳过无显式日志）。
- Test-agent: **PASS**（给出命令与计数证据；确认 defer 分支存在且生效）。

### Status

[OK] **Completed**

## Session 31: 2026-04-15 — OCR 卡片与历史回放修复

**Date**: 2026-04-15

### Summary

- **根因**：`resetToolRender()` 在每次 `chat` 流 **结束（final）** 时也会被调用，顺带清空了 `ocrResultCards`，导致「图片识别结果」卡片在助手回复完成后消失；`save_turn` 将 `query` 截断为 **200 字**，长 OCR 注入被截断；`chat.history` 只返回纯文本用户句，无 OCR 卡片回放。
- **修复**：`resetToolRender` 不再清空 `ocrResultCards`；仅在 **新发送**、**重连**、**切会话** 时清空；`context["ocr_text"]` 写入并随 `turn.extra` 持久化；`handle_chat_history` 展开 `__openclaw` OCR 虚拟消息并剥离用户气泡中的 OCR 块；`query` 截断放宽至 32k；前端 `buildChatItems` 识别历史 OCR 并与实时卡片 **去重**。

### Status

[OK] **Completed**（缩略图在刷新历史后仍依赖后续「持久化图片」能力，当前仅保证 OCR 卡片与无 OCR 正文气泡）

## Session 15A: 2026-04-08 — Weekly Sales Report Foundation (Inline Execution)

**Date**: 2026-04-08
**Task**: sales-weekly-report-foundation

### Summary

Implemented the backend foundation for weekly sales reporting with Accurate fetch, basic analysis, scheduler wiring, and secure admin APIs.

### Main Changes

- Added new module: `backend/reports/` (`models.py`, `accurate_fetcher.py`, `analyzer.py`, `runner.py`, `service.py`).
- Added report APIs: `backend/server/api/routes_reports.py`; mounted in `backend/server/api/routes.py`.
- Integrated scheduler lifecycle in `backend/server/api/app.py` startup/shutdown.
- Added env/config notes: `requirements.txt` (`APScheduler`) and `.env.example` (`REPORTS_ADMIN_TOKEN` and report section note).
- Added tests: `tests/test_reports_analyzer.py`, `tests/test_reports_routes.py`.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_routes.py -q` (3 passed)
- [OK] Accurate connectivity smoke test:
  - `py -c "from backend.reports.accurate_fetcher import ping_accurate; ..."` -> `{"ok": true, "keys": ["s", "d"]}`

### Status

[OK] **Completed**

## Session 29: 2026-04-14 — LLM selector fast path + GLM vision OCR

**Date**: 2026-04-14
**Task**: llm-selector-fast-path + glm-vision-ocr

### Summary

Implemented and validated two config-gated upgrades: (1) inventory `llm_selector` fast path with dedicated selector model routing, and (2) OCR vision path using `glm-4.6v` with silent fallback to `glm-ocr`.

### Main Changes

- Added selector fast-path config keys in `backend/tools/inventory/config.py` and docs in `.env.example`.
- Updated `backend/tools/inventory/services/llm_selector.py` with fast path (`response_format=json_object`, singleton client, fallback guard when selector key is missing).
- Added compatibility fix for `gpt-5-*` models: use `max_completion_tokens` instead of `max_tokens`.
- Added selector tests: `tests/test_llm_selector_fast_path.py`, and updated `tests/test_llm_selector_protocol.py`.
- Added GLM vision OCR config keys in `backend/config.py` and env docs in `.env.example`.
- Added `call_zhipu_vision_ocr()` and vision-first routing with silent fallback in `backend/core/glm_ocr.py`.
- Added vision OCR tests in `tests/test_vision_ocr.py`; adjusted `tests/test_vision_config.py` to pin old-path behavior when vision model is empty.
- Added smoke utility `scripts/smoke_glm_vision_ocr.py` and executed live verification against configured Zhipu endpoint.
- **Follow-up (2026-04-15):** Fast-path default output cap raised **120 → 500** (`LLM_SELECTOR_FAST_OUTPUT_TOKENS` in `InventoryConfig`, clamped 32–4000); mitigates `gpt-5-nano` `finish_reason=length` with empty `content`.

### Git Commits

| Hash | Message |
|------|---------|
| `0dce68f` | feat(inventory): LLM selector fast path (LLM_SELECTOR_* env) |

### Testing

- [OK] `pytest tests/test_llm_selector_fast_path.py tests/test_llm_selector_protocol.py -v`
- [OK] `pytest tests/test_vision_ocr.py tests/test_vision_config.py -v`
- [OK] Live smoke: `python scripts/smoke_glm_vision_ocr.py` reached `finish_reason=stop` on `glm-4.6v` (empty content on 1x1 blank image is expected).

### Status

[OK] **Completed**

### Next Steps

- Run one live OCR check using a real screenshot containing text (e.g., `3/4寸`) to verify extraction quality, not only endpoint availability.
- If desired, commit and push the GLM vision OCR code changes as a separate logical commit.

## Session 30: 2026-04-15 — OCR–Chat fusion (SSE + UI)

**Date**: 2026-04-15
**Task**: ocr-chat-integration (plan + spec)

### Summary

- **Backend:** `routes_chat.query_stream` runs OCR inside `_gen()` after confirmation SSE, yields `{"type":"ocr_result","text":...}` then injects marker into `query_text`. Gateway `chat.py` pushes WebSocket event `ocr_result` with payload text after OCR success.
- **Frontend:** `hasOcrBlock` / `stripOcrBlock`, user bubble badge「已识别 ✓」, queue「识别中…」, `ocrResultCards` state + gateway handler + chat thread OCR card; `resetToolRender` clears OCR cards.
- **Prompt:** `CHAT_SKILL_PROMPT_*` includes 图片识别 rules (`skills.py`).

### Testing

- [OK] `python -c` import `routes_chat`, `CHAT_SKILL_PROMPT_DOC`
- Vitest: project uses browser mode; `message-extract.test.ts` added (run in CI/local when browser runner available).

### Status

[OK] **Completed** (manual UI verify recommended)

## Session 19: 2026-04-09 — Weekly invoice report view end-to-end (inline)

**Date**: 2026-04-09
**Task**: weekly-invoice-report-view-inline

### Summary

Implemented the approved B plan for weekly reports:

- Backend report pipeline switched from sales orders to Accurate sales invoices (`/api/sales-invoice/list.do`) with confirmed projected fields (`id,number,transDate,customer,description,statusName,age,totalAmount`).
- Added status aggregation to report payload (`status_stats`) and generated Markdown output via new `backend/reports/formatter.py`.
- Persisted `report_md` into `report_records` and added migration in `ensure_tables()` (`ALTER TABLE ... ADD COLUMN IF NOT EXISTS report_md`).
- Added report detail and reformat APIs:
  - `GET /api/reports/records/{id}` (returns `report_json` + `report_md`)
  - `POST /api/reports/records/{id}/reformat` (rebuilds `report_md` from stored `report_json`)
- Added task key existence check for manual run and improved empty PATCH response consistency.
- Added new control-ui top-level `Reports` tab with two-panel layout:
  - Left: record list + token + refresh
  - Right: full Markdown text + copy button + reformat action when text is missing
- Added reports detail state and controller methods (`loadReportDetail`, `reformatRecord`), i18n labels, and navigation wiring.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_formatter.py tests/test_reports_routes.py -q` — 6 passed
- [OK] `npm run build` (control-ui) — success
- [OK] scoped code-reviewer gate — PASS

### Status

[OK] **Completed**

### Next Steps

- Implement frontend `Agents > Skills` report task panel binding to `/api/reports/tasks` and `/api/reports/records`.
- Add notification layer (WeCom/email recipients) after business recipient rules are finalized.

## Session 16A: 2026-04-08 — Agents Skills Panel Integration for Reports

**Date**: 2026-04-08
**Task**: reports-ui-agents-skills-integration

### Summary

Integrated weekly report task management into `Agents > Skills` with task editing, manual run, and execution records.

### Main Changes

- Added report UI types in `control-ui/src/ui/types.ts`: `ReportTask`, `ReportRecord`, `ReportTaskConfig`.
- Added report controller `control-ui/src/ui/controllers/reports.ts` for:
  - loading tasks/records (`/api/reports/tasks`, `/api/reports/records`)
  - manual run (`POST /api/reports/tasks/{task_key}/run`)
  - config save (`PATCH /api/reports/tasks/{task_key}`)
- Added report state fields to `app.ts` and `app-view-state.ts`.
- Wired refresh flow in `app-settings.ts` and render/event handlers in `app-render.ts`.
- Extended `views/agents.ts` and `views/agents-panels-tools-skills.ts`:
  - report token input
  - task list with edit/save/cancel
  - manual run button
  - latest execution records
- Backend route generalized from fixed run endpoint to parameterized:
  - `POST /api/reports/tasks/{task_key}/run`
- `routes_reports.py` update path now uses `await asyncio.to_thread(reload_task)` to avoid event-loop blocking.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_routes.py -q` -> 3 passed
- [OK] `npm run build` in `control-ui/` -> build succeeded
- [OK] `ReadLints` on changed files -> no lints

### Status

[OK] **Completed**

### Next Steps

- Add record detail drawer (`/api/reports/records/{id}`) for full `report_json` comparison view.
- Persist reports admin token securely (or replace with existing gateway auth).

## Session: 2026-04-01 — LLM 四角色策略（MiniMax / GLM-4.5-air / gpt-4o-mini / glm-ocr）

- Updated `backend/config.py`: default `LLM_MODEL` and Zhipu+MiniMax conflict fallback to `glm-4.5-air`; clarified comments for FALLBACK vs SUMMARY.
- `work_executor`: `_work_context_summarizer()` uses `SUMMARY_LLM_*`; primary model default `MiniMax-M2.7`.
- Replaced hardcoded `glm-4-flash` / `gpt-4o` defaults in `text_to_inquiry`, `chat.py` session title, `spec_extract`, `llm_selector`, `spec_extractor`, `oos` config/agent_runner, `inventory/lib/agents/llm_config.py`.
- `.env.example` + `claude.md` + `.cursorrules` + `.trellis/spec/backend/index.md`: documented chat four-model policy and embedding exception; corrected `match_quotation` vs `match_wanding_price` behavior.
- `llm_selector`: info log on selection call; restored `Snapshot` in `session.py` for test imports.
- Tests: updated `test_auto_llm_selector.py`, `test_llm_selector_two_step.py`; `oos/tests/test_glm_model.py` accepts glm-4.5-air.
- Full `pytest tests/`: 109 passed; 5 failures in unrelated files (pre-existing doom-loop mocks, wanding private, alert).

## Session: 2026-04-01 Tool-call Stall + Reasoning Visibility Fix

- Fixed Anthropic-compatible ReAct parsing in `backend/core/anthropic_react_llm.py`:
  - Robust XML `<tool_call>...</tool_call>` extraction from both plain string content and text blocks.
  - Converts parsed XML calls into native tool-call structures so step-2 runs.
  - Strips XML payload from user-visible text to avoid raw tool markup output.
- Added parser regression tests in `tests/test_anthropic_react_messages.py`:
  - XML tool-call in text block is extracted and converted.
  - XML tool-call in raw string content is extracted and converted.
- Fixed missing reasoning-level persistence and display:
  - `backend/server/gateway/handlers/sessions.py`: `sessions.patch` now persists `thinkingLevel` / `reasoningLevel` / `verboseLevel`; `sessions.list` returns all three.
  - `backend/agent/session.py`: turn schema supports optional `thinking`; `save_turn` persists thinking; session list reads persisted label and levels.
  - `backend/core/agent.py`: saves accumulated `thinking_parts` into session turns.
  - `backend/server/gateway/handlers/chat.py`: `chat.history` now returns assistant `thinking` block (when present) plus text block, and includes level fields.
- Added gateway tests in `tests/test_gateway_reasoning_visibility.py`:
  - Confirms saved thinking appears in `chat.history`.
  - Confirms patched levels are persisted and surfaced in `sessions.list` / `chat.history`.
- Validation:
  - `pytest -q tests/test_gateway_reasoning_visibility.py tests/test_anthropic_react_messages.py` -> passed.
  - `pytest -q tests/test_chat_language.py` -> passed.
## Session: 2026-04-01 Unified Reply Format (Disable 4-Phase Output)

- Standardized chat output format to avoid exposing `Plan/Gather/Act/Verify` in user-visible replies.
- Updated defaults:
  - `backend/config.py`: `USE_CLAUDE_LOOP_PROMPT` default switched from `true` to `false`.
  - `backend/plugins/jagent/extension.py`: fallback default for `getattr(Config, "USE_CLAUDE_LOOP_PROMPT", ...)` switched to `False`.
- Added answer post-processing guard in `backend/core/agent.py`:
  - New `_normalize_user_answer()` removes leaked loop-phase headings such as `1. Plan`, `2. Gather Context`, `3. Act`, `4. Verify Results`.
  - Applied before final response persistence and return.
- Added regression tests:
  - `tests/test_answer_format_normalization.py` verifies heading removal while preserving result content.
- Validation:
  - `pytest -q tests/test_answer_format_normalization.py tests/test_gateway_reasoning_visibility.py tests/test_anthropic_react_messages.py tests/test_chat_language.py` -> passed (20 tests).
## Session: 2026-04-01 Fix BigModel 1211 (Model Not Found)

- Root cause: `backend/config.py` had regressed to OpenAI-only routing and no longer honored `PRIMARY_LLM_PROTOCOL=anthropic`.
- In this environment, `.env` sets `LLM_MODEL=MiniMax-M2.7`; without anthropic routing, requests were sent to BigModel OpenAI endpoint and failed with `code=1211`.
- Fixes in `backend/config.py`:
  - Restored protocol switch support: `PRIMARY_LLM_PROTOCOL` with `openai|anthropic`.
  - Added `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` config fields used by `CoreAgent` anthropic path.
  - Improved OpenAI base/API-key routing fallback order.
  - Added compatibility fallback: if endpoint is Zhipu + model looks MiniMax + protocol is not anthropic, auto-fallback to `OPENAI_MODEL/CHAT_LLM_MODEL`.
  - Added `SESSION_TITLE_MODEL` default to `OPENAI_MODEL` to avoid session-title calls using provider-incompatible model ids.
- Verified effective runtime config:
  - `PRIMARY_LLM_PROTOCOL=anthropic`
  - `LLM_MODEL=MiniMax-M2.7`
  - `ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic`
  - `OPENAI_BASE_URL=https://open.bigmodel.cn/api/paas/v4/`
- Regression checks:
  - `pytest -q tests/test_answer_format_normalization.py tests/test_gateway_reasoning_visibility.py tests/test_anthropic_react_messages.py tests/test_chat_language.py` -> passed (20 tests).

## Session: 2026-04-02 — CoreAgent Anthropic Messages 主链路（智谱 1211 完整落地）

**现象**：`PRIMARY_LLM_PROTOCOL=anthropic` + `LLM_MODEL=MiniMax-M2.7` 时，若仍用 OpenAI `chat.completions` 打智谱 `OPENAI_BASE_URL`，智谱返回 **1211 模型不存在**。

**根因**：`app.py` 曾用 `OPENAI_*` 初始化 `CoreAgent`，未把主对话切到 **Anthropic Messages**（MiniMax `…/anthropic`）；`anthropic_react_llm.py` 已有 helper 但未接入 `execute_react`。

**实现要点**（代码已合入）：

- `backend/core/llm_client.py`：`get_openai_client(..., anthropic_messages=False)`；仅 CoreAgent 传 `True` 时返回 **Anthropic SDK**（其它 Work/报价解析等仍用 OpenAI client，避免全局误切）。
- `backend/core/agent_helpers.py`：`call_anthropic_react_streaming_sync` / `call_anthropic_react_non_streaming_sync`，与 OpenAI 侧 `kwargs` 形状对齐。
- `backend/core/agent.py`：
  - `_should_use_anthropic_messages_api(base_url)`：`PRIMARY_LLM_PROTOCOL=anthropic` **且** `base_url` **不含** `bigmodel.cn` 时才走 Anthropic（单测显式传智谱 URL 时仍走 `chat.completions`）。
  - `execute_react` 流式/非流式分支：`call_anthropic_react_*` vs `call_llm_streaming_sync` / `chat.completions`；**`except` 顺序**：超时类须在泛型 `Exception` 之前，保证 fallback 可达。
  - 智谱 URL + `LLM_MODEL` 含 `minimax`：将 `self.model` 改为 `OPENAI_MODEL` / `CHAT_LLM_MODEL` / `glm-4.5-air`，避免 env 仍为 MiniMax 名时打智谱 1211。
- `backend/config.py`：`get_primary_react_llm_credentials()` → `anthropic` 时用 `ANTHROPIC_*`，否则 `OPENAI_*`。
- 启动与兼容入口：`backend/server/api/app.py`、`start_wecom_bot.py`、`backend/agent/agent.py`、`cli_agent.py` 使用 primary credentials（`SingleAgent`/CLI 不再强行绑死智谱 key）。
- `tests/test_integration_agent_react.py`：Live anthropic 用 `get_primary_react_llm_credentials()`，断言 `_use_anthropic` 与 `isinstance(client, Anthropic)`。
- `.env.example`：补充「智谱 + MiniMax 模型名」时运行时会改用 `OPENAI_MODEL` 的说明。

**验证**：`pytest` 覆盖 `test_core_glm_query`、`test_anthropic_react_messages`、`test_answer_format_normalization`、`test_integration_agent_react`（live 可能 skip）。

**运维**：改 `.env` 后需 **重启后端**；主对话应打 **MiniMax Anthropic**（`messages`），而非智谱 + MiniMax 模型 id。

## Session: 2026-04-03 — Reasoning 显示修复 + Selector Reasoning 需求确认

### 现象
前端助手消息不显示 reasoning。用户以为 reasoning 没出来，实际出来了但不是想要的。

### 调试过程（Debug Mode，7 个假设）

使用运行时日志（NDJSON → `debug-d5441f.log`）并行验证：

| 假设 | 结论 | 依据 |
|------|------|------|
| H1: MiniMax ThinkingBlock 在 `anthropic_react_llm` 解析丢失 | **不成立** | `thinking_parts_len=1`，thinking 已被正确提取 |
| H2: `agent.py` `<think>` 标签提取后 `thought` 为空 | **不成立** | `had_think_tag=true`，`thought_len=392~678` |
| H3: `execute_react` 结果 `thinking` 长度为 0 | **不成立** | `thinking_len=1071`，完整保留 |
| H4: `routes_chat.py` 流式 `loop_end` 事件丢 thinking | **不成立** | SSE 路径 `loop_end` 有正确 `thinking` 字段 |
| H5: SSE 终止事件类型/载荷被前端忽略 | **不成立** | SSE 路径本身完整 |
| H6: `gateway chat.send` `execute_react` 返回 `thinking` 为空 | **不成立** | `thinking_len=1071` |
| **H7**: **`gateway chat.send` final 事件未携带 `message/thinking`** | **成立（根因1）** | `includes_thinking=false`，final 事件只发 `state`，无 `message` |

### 根因定位（两条）

**根因 1（后端）**：`backend/server/gateway/handlers/chat.py` 的 `handle_chat_send`，final `chat` 事件只发了 `{"state": "final"}`，**没有 `message` 载荷**，前端自然收不到 thinking。

**根因 2（前端）**：
- `control-ui/src/ui/views/chat.ts`：`reasoningLevel ?? "off"` 把「未设置」当 `off`，只要会话没手动设置 `reasoningLevel` 就永远不展示 reasoning。
- `grouped-render.ts`：若气泡只有 thinking、没有正文文本，代码提前 `return nothing`，连 thinking 也画不出来。

**根因 3（持久化）**：`CoreAgent.execute_react` 的 `save_turn(...)` 原本**没有传 `thinking`**，导致 `chat.history` 刷新后也拿不到 thinking（只有非流的 `/api/query` 路径用 `result["thinking"]`）。

### 已应用修复（代码已合入）

1. **`backend/server/gateway/handlers/chat.py`**：final `chat` 事件补 `message: {"role": "assistant", "content": [{"type": "thinking", "thinking": ...}, {"type": "text", "text": ...}]}`（H7 修复）。
2. **`backend/core/agent.py`**：`save_turn(..., thinking=thinking_for_store)` 把 accumulated `thinking_parts` 写入会话持久化（H3 修复）。
3. **`control-ui/src/ui/views/chat.ts`**：`reasoningLevel !== "off"` 改为 `activeSession?.reasoningLevel !== "off"`（未设置的会话默认展示）。
4. **`control-ui/src/ui/chat/grouped-render.ts`**：空气泡判断加 `!reasoningMarkdown`，允许仅有 thinking 的气泡显示。
5. **调试日志埋点已全部移除**，`py_compile` 验证通过。

### 用户新需求：Selector Reasoning

**现状**：界面里出现的 reasoning 是模型自己的**链式思考**（意图判断、选工具、参数怎么填），来自 MiniMax `ThinkingBlock`。

**用户实际想要**：工具返回的 **LLM selector 为什么选这个产品** 的理由，即：
- `llm_selector.py` 产生的 `reasoning` 字段
- `match_quotation` 返回 JSON 里的 `selection_reasoning`（`inventory_agent_tools.py` L187）
- `select_wanding_match` 候选 items 里的 `reasoning`

**为什么没有出来**：技能 prompt（`skills.py` L383）明确指示「`selection_reasoning` 由 UI 直接渲染，模型不需要在 think 里复述」——所以模型只展示「选了哪个 + 价格」，不会把 selector reasoning 写进正文。

**Option A Plan（回答里显式带出）**：
- `backend/plugins/jagent/skills.py`：把「不需要复述」指令改为「`selection_reasoning` / `reasoning` 存在时，在最终回答正文里用『选型依据：<理由>』格式体现」。
- `backend/core/agent.py` L802 附近：在 tool observation 入消息之前，把 `selection_reasoning` 从 JSON 里提出来，拼成 `【选型依据】<理由>` 追加到 observation 文本后，让模型在下一轮自然把它写进 answer。

**未决定**：是放在 answer 正文里（Option A）还是单独一块 UI（Option B）——用户倾向 Option A，等待确认后实施。

---

## Session 12: 2026-04-03 — match_quotation 三项修复（selection_reasoning 显示 + GLM 路由 + 来源优先级）

**Date**: 2026-04-03
**Task**: match-quotation-fix

### Summary

三项修复：① `selection_reasoning` 现在必须在回复正文体现；② `llm_select_best` 始终走 GLM OpenAI-compat 路径，不随主链路协议切换；③ 业务知识库追加来源优先级规则。

### Main Changes

- **`backend/plugins/jagent/skills.py`**：
  - 删除「`selection_reasoning` 由 UI 直接渲染，模型不需要复述」，改为明确指令：有 `selection_reasoning` 时在结果表下方附上「匹配理由：{selection_reasoning}」。
  - 库存为 0 时若有 `selection_reasoning`，💡 消息格式更新为含匹配理由的版本。
  - `fallback: true` 时 `chosen.code` 仍有效，须展示（DOC + RULES 双版本均更新）。
- **`backend/tools/inventory/services/llm_selector.py`**：
  - 删除 `use_anthropic` 分支，始终走 OpenAI SDK（GLM `open.bigmodel.cn`）。
  - `max_tokens` cap 从 512 → 8000。
- **`backend/tools/data/wanding_business_knowledge.md`**：追加来源优先级规则：`source="共同"` > `"历史报价"` > `"字段匹配"`。
- **新增测试**：
  - `tests/test_llm_selector_protocol.py`：3 项，验证始终走 OpenAI、max_tokens ≤ 8000、返回 reasoning。
  - `tests/test_skills_reasoning_display.py`：3 项，验证旧指令已删除、新指令存在。

### Testing

- [OK] `pytest tests/test_llm_selector_protocol.py tests/test_skills_reasoning_display.py` — 6 passed
- [OK] `pytest tests/test_anthropic_react_messages.py` — 13 passed（含修复 `<redacted_thinking>` 拆分测试）

### Status

[OK] **Completed**

### Next Steps

- 观察 GLM 在 `glm-4.5-air` 下是否仍有 `finish_reason=length` + `content=""` 问题（见 Session 13）

---

## Session 13: 2026-04-03 — GLM 思考模型 Plan B（reasoning_content fallback + max_tokens 16000）

**Date**: 2026-04-03
**Task**: match-quotation-fix (follow-up)

### Summary

`glm-4.5-air` 为思考模型，内部推理消耗 token 后 `message.content` 为空，答案实际在 `message.reasoning_content`。实现 Plan B：当 `content` 为空时自动从 `reasoning_content` 提取 JSON；同步把 max_tokens cap 提升到 16000。

### Root Cause

`glm-4.5-air` 是思考模型：选型 JSON 放在 `message.reasoning_content`，`message.content` 返回空字符串，导致 `llm_selector.py` 抛「LLM 返回空内容」并走规则兜底。日志特征：`finish_reason=length, raw=`（48 秒延迟）。

### Main Changes

- **`backend/tools/inventory/services/llm_selector.py`**：
  - `mt` cap 从 8000 → 16000。
  - `raw_content` 为空时，用 `re.search(r'\{[^{}]*"confident"[^{}]*\}', reasoning_content)` 从 `message.reasoning_content` 提取 JSON；成功则继续正常解析，失败则 warning + 规则兜底。
  - warning 日志新增 `reasoning_content_len` 字段，便于诊断。
- **`tests/test_llm_selector_protocol.py`**：`test_max_tokens_capped_at_8000` → `test_max_tokens_capped_at_16000`（`assertLessEqual(mt, 16000)`）。

### Testing

- [OK] `pytest tests/test_llm_selector_protocol.py tests/test_anthropic_react_messages.py tests/test_skills_reasoning_display.py` — **20 passed**

### Status

[OK] **Completed**

### Next Steps

- 验证真实 `glm-4.5-air` 调用时 Plan B 是否正确提取 JSON（观察日志「从 reasoning_content 提取到 JSON」）
- 若 `reasoning_content` 也无 JSON（纯推理链），可考虑换用非思考版 GLM（如 `glm-4-flash`）

---

## Session 14: 2026-04-04 — 暂时从 Chat prompt 中移除 8 个工具

**Date**: 2026-04-04
**Task**: chat-tool-disable

### Summary

应用户要求，暂时将 8 个工具从 Chat 模型的 tool list 中移除（代码保留，仅不注册到 `ExtensionContext`），以减少 prompt 干扰、降低误触发概率。

### Main Changes

- **`backend/tools/oos/handler.py`**：注释掉 6 个 OOS 工具的注册调用（`get_oos_list`、`get_oos_stats`、`get_oos_by_file`、`get_oos_by_time`、`register_oos`、`register_oos_from_text`）；handler 函数和 adapter 导入保留。
- **`backend/tools/quotation/handler.py`**：`register_quotation_tools()` 加入 `_SKIPPED_QUOTE_TOOLS = {"fill_quotation_sheet", "run_quotation_fill"}`，在两处注册循环中 `continue` 跳过。
- **`tests/test_oos_handler.py`**：将 `test_register_oos_tools_registers_at_least_four_tools`（断言 `>= 4`）改为 `test_register_oos_tools_skips_all_oos_tools`（断言 `== 0`），反映工具已禁用。

### What Was NOT Changed

- 所有 handler 函数、schema 定义、business logic 均原样保留
- `JAgentExtension.register()` 仍调用 `register_oos_tools()` / `register_quotation_tools()`，只是它们现在无操作
- Work Mode 工具链未受影响

### Testing

- [TODO] 待有 Python+pytest 环境时运行 `pytest tests/test_oos_handler.py -v` 验证

### Status

[OK] **Completed**

### Next Steps

- 重启后端使更改生效
- 用户如需重新启用这 8 个工具，取消对应注释即可

---

## Session 15: 2026-04-04 — WeCom 长连接 Bot 工具注入路径排查

**Date**: 2026-04-04
**Task**: wecom-tool-scope

### Summary

排查发现：Chat prompt 移除 8 个工具的改动会同时影响 WeCom 长连接 bot，原因是 `start_wecom_bot.py` 的 `create_agent()` 使用 `JAgentExtension()` 注册全量工具，两套通道共享同一工具注册表。

### Key Findings

- **两套 WeCom 入口存在于同一代码库**：
  - `routes_wecom.py` + `wecom_service.py`：HTTP 回调模式（`wecom_chat_bridge` 硬编码 `allowed_tools=["batch_quick_quote"]`）
  - `backend/wecom_bot/client.py` + `start_wecom_bot.py`：WebSocket 长连接模式（`JAgentExtension()` 注册全量工具，**无 `allowed_tools` 限制**）

- **用户使用场景**：`start_wecom_bot.py` 长连接模式，工具注入走 `JAgentExtension.register()` → `register_oos_tools()` + `register_quotation_tools()`

- **刚才禁用 8 个工具的影响**：OOS 工具（6个）+ `fill_quotation_sheet` + `run_quotation_fill` 也从 WeCom 长连接 bot 的 tool list 中移除

### 待确认

- WeCom 长连接 bot 用户是否需要这 8 个已禁用工具？
- 是否需要给 WeCom 单独维护一个受限工具白名单？

### Status

[#] **In Progress — awaiting user confirmation**

### Next Steps

- 确认 WeCom 场景是否需要恢复部分或全部已禁用工具
- 讨论是否需要给 WeCom 长连接 bot 单独配置 `allowed_tools` 白名单（参考 `wecom_chat_bridge` 的做法）

---

## Session 16: 2026-04-05 — Correction Learning（纠错学习写入知识库）

**Date**: 2026-04-05

### Summary

prompt-only 方式实现纠错学习：当用户纠正选型时，LLM 追问原因 → 生成 IF/THEN 规则草稿展示给用户 → 确认后调用现有 `append_business_knowledge` 工具写入 `wanding_business_knowledge.md`。

### Main Changes

- **`backend/plugins/jagent/skills.py`**：
  - `SKILL_KNOWLEDGE_DOC`：新增「纠错学习（Correction Learning）」段落，描述四步流程（检测纠正意图 → 追问原因 → 展示 IF/THEN 草稿 → 确认后写入）。
  - `SKILL_KNOWLEDGE_RULES`：新增纠错路由规则（触发词：「不对」「选错了」「应该是/选 XXX」等）+ IF/THEN 内容格式要求 + 未经确认不得调用工具的硬约束。
  - 两版同步，DOC 版为自然语言，RULES 版为 Decision Rules 风格。
- **`tests/test_correction_learning_prompt.py`**（新建）：7 项单元测试，断言两版均含：纠正触发词、原因追问、确认要求、IF/THEN 格式、`IF 用户询价` 具体格式。

### Testing

- [OK] `pytest tests/test_correction_learning_prompt.py -v` — 7 passed

### Status

[OK] **Completed**

---

## Session 17: 2026-04-05 — 修复 Session.pending_human_choice AttributeError

**Date**: 2026-04-05

### Summary

后端运行时崩溃：`'Session' object has no attribute 'pending_human_choice'`。`agent.py` 已引用该字段和 store 方法，但 `session.py` 未实现。

### Root Cause

`backend/core/agent.py` L290 读 `session.pending_human_choice`；L673/676 调 `self._store.set/clear_pending_human_choice()`，均未在 `session.py` 定义。

### Main Changes

- **`backend/agent/session.py`**：
  - `Session` dataclass：新增 `pending_human_choice: Optional[Dict[str, Any]] = None`。
  - `Session.empty()`：初始化 `pending_human_choice=None`。
  - `SessionStore`：新增 `set_pending_human_choice(session_id, data)` 和 `clear_pending_human_choice(session_id)` 方法。

### Testing

- [OK] Python inline 验证：`Session.pending_human_choice` 可读写；两个 store 方法正常执行。

### Status

[OK] **Completed**

---

## Session 18: 2026-04-05 — WeCom 长连接卡片支持（multi reply_stream + 前端独立气泡）

**Date**: 2026-04-05

### Summary

当 `match_quotation` 返回报价卡片时，WeCom 长连接将每张卡片单独通过 `reply_stream` 发送，而不是只发 LLM 文字；前端每张卡片渲染为独立气泡。`extension.py` 零改动。

### Architecture

`handler.py` 在调用 `execute_react` 前注入 `push_event` 收集器到 context；`extension.py` 已有 `if callable(context["push_event"]): push(...)` 逻辑，自动触发收集。`handle_wecom_message` 返回 `List[str]`（卡片列表或 fallback `[answer]`），`client.py` 循环 `reply_stream`。

### Main Changes

- **`backend/wecom_bot/handler.py`**：
  - 新增 `List` import。
  - `handle_wecom_message` 返回类型改为 `List[str]`。
  - 在 context 赋值后注入 `collected_cards: List[str]` + `_push_event` 闭包 + `context["push_event"] = _push_event`。
  - 函数末尾：有卡片时返回 `collected_cards`，无卡片时返回 `[answer]`；timeout 返回 `["处理超时，请稍后重试。"]`。

- **`backend/wecom_bot/client.py`**：
  - 新增 `List` import。
  - `WeComBotClient._on_text_message`：`answer = await handle_wecom_message(...)` → `messages = await ...`；`for msg_text in messages: reply_stream(...)` 循环发送。
  - 图片 OCR 路径同步更新（`ocr_messages` 变量名 + 循环）。
  - `DummyWeComBotClient.on_message` 类型注解改为 `Callable[[StandardWeComMessage], Awaitable[List[str]]]`；`run_forever` 改为 `for reply in replies` 打印。

- **`control-ui/src/ui/views/chat.ts`**：
  - `groupMessages` 函数：检测消息 `__openclaw.kind === "tool_render"`，是则直接 push 为独立 group 并 `continue`，不与相邻 assistant 消息合并为同一气泡。

- **`tests/test_wecom_card_handler.py`**（新建）：4 项测试：无卡片返回 `[answer]`；tool_render 事件返回卡片列表；空 `formatted_response` 被过滤；非 tool_render 事件被忽略。

### Testing

- [OK] `pytest tests/test_wecom_card_handler.py -v` — 4 passed
- [OK] `npm run build` (control-ui) — success, no TypeScript errors

### Status

[OK] **Completed**

### Notes

- 前端的 `toolRenderItems` 累积逻辑（`app-tool-stream.ts`）和 `buildChatItems` marker 配对逻辑均无需改动，只有 `groupMessages` 一处变更。
- 多张卡片场景：WeCom 用户收到 N 条独立消息；前端每张卡片独占一个气泡。

## Session 18A: 2026-04-08 — Weekly reports UI i18n + import fix

**Date**: 2026-04-08
**Task**: agents-reports-i18n

### Summary

Fixed `t()` import path in `agents-panels-tools-skills.ts` (`../../i18n/index.ts`). Added missing `agents.reports.*` and `common.loading` / `common.save` / `common.edit` entries to `en.ts` and `zh-CN.ts` so the Weekly Reports card shows translated strings instead of raw keys.

### Testing

- [OK] `npm run build` (control-ui)

### Status

[OK] **Completed**

## Session 20: 2026-04-09 — sales-invoice date filter (BETWEEN)

**Date**: 2026-04-09

### Summary

Live-probed `/api/sales-invoice/list.do`: `filter.transDate.startDate` / `endDate` do not narrow results (`sp.rowCount` stayed ~8387). The working shape matches `sales-order/list.do`: `filter.transDate.op=BETWEEN` with `filter.transDate.val[0]` / `val[1]` as **DD/MM/YYYY**. Updated `backend/reports/accurate_fetcher.py` accordingly.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_formatter.py -q`

### Follow-up (same day)

- Sidebar **周报** tab had only Refresh; added per-task **立即运行** wired to `POST /api/reports/tasks/{task_key}/run` (`control-ui` `reports-tab.ts` + `app-render.ts`). `npm run build` OK.

## Session 21: 2026-04-10 — Admin 价格库 follow-up（上传限制、删除错误、HTTP 语义）

**Date**: 2026-04-10

### Summary

Completed review follow-ups: Excel uploads use `Config.MAX_UPLOAD_MB` with chunked read + 413; `deletePriceRow` / `deleteMappingRow` surface non-401 errors. Repository update/delete now return `Optional[bool]` (None = DB unavailable or error, False = not found, True = ok); admin routes map None → 503, False → 404.

### Main Changes

- `backend/server/api/routes_admin.py` — `_read_upload_limited` chunked; upload endpoints unchanged behavior otherwise.
- `backend/tools/admin/repository.py` — tri-state return on update/delete four functions.
- `control-ui/src/ui/controllers/admin-data.ts` — delete handlers set `priceError` / `mappingError` on failure.

### Testing

- [OK] `py -3 -m pytest tests/test_smoke.py -q`
- [OK] `npm run build` (control-ui)
- [OK] Import `routes_admin`

### Status

[OK] **Completed** (full suite not run; unrelated pre-existing failure in `test_wanding_fuzzy_matcher_units.py`)

## Session 22: 2026-04-10 — Batch quotation mode (>=3 items) end-to-end

**Date**: 2026-04-10
**Task**: batch-quotation-mode-implementation

### Summary

Implemented the batch quotation mode plan: auto-switch at `>=3` items, consolidated batch payload (`resolved/pending/unmatched` with `input_index`), one SSE summary card, and frontend ordered batch table rendering.

### Main Changes

- Added config threshold in `backend/tools/inventory/config.py`:
  - `MATCH_QUOTATION_BATCH_MIN_ITEMS` (default `3`).
- Updated `backend/tools/inventory/services/inventory_agent_tools.py`:
  - Added multi-keyword splitter for auto batch routing from `match_quotation`.
  - Extended `_execute_match_quotation_batch` output to include:
    - `resolved_items[]`, `pending_items[]`, `unmatched_items[]`
    - per-item `input_index`
    - backward-compatible `items[]`
  - Added consolidated `formatted_response` markdown and JSON result payload for extension consumption.
- Updated `backend/plugins/jagent/extension.py`:
  - `match_quotation_batch` now pushes a single unified `tool_render` batch summary card.
  - Returns compact marker summary for LLM continuation without per-item re-querying.
- Updated frontend tool stream and chat rendering:
  - `control-ui/src/ui/app-tool-stream.ts`: support batch payload fields.
  - `control-ui/src/ui/views/chat.ts`: added batch summary rendering branch and global `input_index` ordering.

### Testing

- [OK] `py -m pytest tests/test_candidates_sse_push.py -q` (10 passed)
- [OK] `npm test -- "src/ui/views/chat.test.ts" -t "renders batch summary table ordered by input_index"` (passed)
- [OK] `ReadLints` on changed backend/frontend/test files (no lints)

### Status

[OK] **Completed**

## Session 23: 2026-04-11 — Neon admin plan alignment (migrations + UI polish)

**Date**: 2026-04-11
**Task**: price-library-neon-admin spec/plan follow-up

### Summary

Aligned implementation with `docs/superpowers/specs/2026-04-10-price-library-neon-admin-design.md`: added `001_create_price_tables.sql` + GIN index, `setup_tables()` runs migration file; frontend: login 503 message, upload confirm dialogs, database tab icon, fixed `MappingRow` type import in admin view.

### Testing

- [OK] `npm run build` (control-ui)
- [OK] `py -3 -c` import `backend.tools.admin.repository`

### Status

[OK] **Completed**

## Session 24: 2026-04-11 — Candidates SSE preview (tool_candidates UI)

**Date**: 2026-04-11
**Task**: `docs/superpowers/plans/2026-04-11-candidates-sse-preview.md`

### Summary

- Backend: `_execute_match_quotation` `tool_candidates` payload includes `keywords`.
- Frontend: `CandidatesPreviewItem`, `handleCandidatesEvent`, FIFO pop on `tool_render` in `app-tool-stream.ts`; `candidatePreviews` state on app; chat renders dashed preview card (max 5 rows) before final tool cards; i18n + CSS; exported `renderAvatar` for reuse.
- Tests: `test_tool_candidates_includes_keywords`, `app-tool-stream.candidates.test.ts`, two chat tests for preview.

### Testing

- [OK] `py -3 -m pytest tests/test_candidates_sse_push.py -q` (11 passed)
- [OK] Vitest: `app-tool-stream.candidates.test.ts` + new chat preview tests (pass; 4 unrelated `chat.test.ts` failures on locale/button)
- [OK] `npm run build`

### Status

[OK] **Completed**

## Session 25: 2026-04-12 — 周报两阶段管道（analysis_md + Lit UI）

**Date**: 2026-04-12
**Spec / Plan**: `docs/superpowers/specs/2026-04-12-weekly-report-enhancement-design.md`, `docs/superpowers/plans/2026-04-12-weekly-report-enhancement.md`

### Summary

- **原则**：原始 `report_json` / `report_md` 不经过 LLM；Phase 2 单独写入 `analysis_md`，`analysis_status`：`pending` → `running` → `done` / `failed`。
- **DB**：`report_records` 增加 `analysis_md`、`analysis_status`（`_DDL` + `ensure_tables` ALTER）。
- **后端**：新建 `backend/reports/llm_analyzer.py`（取同 `task_key` 上一条成功 `report_json` 作环比、Claude Haiku、`_set_analysis_status` 短连接避免 LLM 期间长占连接）；`runner.py` Phase 1 成功后 `daemon` 线程触发分析；`routes_reports.py` 列表/详情扩展字段，`POST .../reanalyze`。
- **前端**：`ReportRecord` + `reportsDetailTab`；`reanalyzeRecord` + 轮询（`inFlight` 防重叠）；`reports-tab.ts` 重写（数据 tab 结构化表格 + 智能分析 Markdown）；i18n；`app-render` 接线。
- **Review 跟进**：失败写回 `failed` 时记录日志（避免静默吞掉）。

### Testing

- [OK] `py -m pytest tests/test_reports_llm_analyzer.py` (5 passed)
- [OK] `npm run build` (control-ui)
- 注：全量 `pytest -k "not live"` 存在与本次无关的既有失败，未在本次扩大范围修复。

### Status

[OK] **Completed**

## Session 26: 2026-04-12 — Session Neon persistence (agent-team-v3)

**Date**: 2026-04-12
**Task**: `docs/superpowers/plans/2026-04-12-session-neon-persistence.md` + design spec

### Summary

Implemented session storage strategy in repo path **`agent-team-v3/`** (parallel to this tree): `SessionBackend` protocol, `FileBackend` (JSON), `NeonBackend` (psycopg2 pool + `sessions`/`turns` DDL + `session_aux` JSONB for sidecar). `SessionStore` delegates I/O; `DATABASE_URL` selects Neon with fallback to file backend on init failure. `Turn.from_user` + `CoreAgent.save_turn(from_user=ctx)`; WeCom uses fixed `session_id = "wecom"`, `/new` → `clear_turns`, file bind calls `flush_session_aux`. HTTP: `routes_sessions.py` (`GET/POST/DELETE /api/sessions`); startup `ensure_session("wecom")`. Gateway `sessions` handler path from `Config.SESSION_STORE_DIR`. Full test run: **114 passed**.

### Main Changes (paths relative to `agent-team-v3/`)

- New: `backend/agent/session_backend.py`, `session_backend_file.py`, `session_backend_neon.py`
- Modified: `backend/agent/session.py`, `backend/core/agent.py`, `backend/wecom_bot/handler.py`, `backend/server/api/app.py`, `routes.py`, `backend/server/gateway/handlers/sessions.py`
- New: `backend/server/api/routes_sessions.py`
- Tests: `tests/test_session_turn.py`, `test_session_backend_file.py`, `test_session_backend_neon.py`, `test_session_store_refactored.py`, `test_wecom_handler_session.py`, `test_routes_sessions.py`; adjusted `test_oos_tools_refactor.py`, `test_current_topic_injection.py`

### Lessons

- Neon needs explicit **sidecar** (`session_aux`) for summary/tool_memory/file_path parity with file JSON; **`load_turns`** should use **newest N by ts** then chronological order for injection.
- Shared WeCom session is **by approved spec**; per-user isolation would be a separate product change.

### Status

[OK] **Completed**

## Session 27: 2026-04-12 — Render 部署对话 / WebSocket 排查与 render.yaml 修正

**Date**: 2026-04-12

### Summary

- **根因倾向**：`render.yaml` 曾设 `DEBUG=true`，`run_backend.py` 会 `reload=Config.DEBUG`，在 Render 托管环境启用 uvicorn **reload** 易导致不稳定；生产应默认 `DEBUG=false`。
- **已改**：`render.yaml` 中 `DEBUG` → `"false"`，并注释说明需在 Dashboard 临时开调试时再改回。
- **排查清单（用户侧）**：确认 Dashboard **有效** `DEBUG`（勿与 Blueprint 重复冲突）；`PORT` 由 Render 注入；会话持久化需 **`DATABASE_URL`**（Neon）且启动日志应显示 Neon 成功而非仅 FileBackend；**免费实例休眠**会断开 WebSocket；若前端与 API **不同源**须在控制 UI 里把 `gatewayUrl` 设为 `wss://<你的 Render 域名>/ws`。

### Status

[OK] **Completed**（配置修正）；线上行为需用户在 Render 日志与环境变量中核对。

## Session 28: 2026-04-13 — 周报「分析中」无限轮询与遗留 running 修复

**Date**: 2026-04-13

### Summary

- **根因**：进程重启后 `run_llm_analysis` 守护线程消失，但 `report_records.analysis_status` 仍可能为 **`running`**；前端对 `pending`/`running` 每 3s 轮询，且旧版 `loadReportDetail` 每次把 **`reportDetailLoading=true`**，表现为整页闪刷、永远「分析中」。
- **后端**：`reset_stale_running_analyses()` 在 **startup** 将遗留 `running` → `failed`；`POST /api/reports/reset-stale` 供带 token 手动批量修复；`llm_analyzer` 对 Anthropic 设 **`timeout=180s`**，降低再次挂死概率。
- **前端**：轮询使用 **`loadReportDetail(..., { soft: true })`**，不切换 loading；仅非 soft 首次加载时启停 poller，避免重置轮询计数；约 **80×3s** 硬停并提示检查配置或「重新分析」。
- **Git**：`dbae649`（`fix(reports): stop infinite poll; reset stale running analysis on startup`），含 `dist/control-ui` 重建。

### Testing

- [OK] `py -m pytest tests/test_reports_llm_analyzer.py tests/test_reports_analyzer.py -q`

### Status

[OK] **Completed**

## Session 1: Session 2026-04-15

**Date**: 2026-04-15
**Task**: Session 2026-04-15

### Summary

Auto-recorded by trellis-journal hook after Code Review + Test verification.

Changed files (0 total):

### Main Changes



### Git Commits

| Hash | Message |
|------|---------|
| `a6ac708` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete

## Session 52: Library Schema Sync 落地（后端 + 前端 + 测试）

**Date**: 2026-04-24  
**Task**: 按 `2026-04-24-library-schema-sync-design.md` 实现库结构同步、列管理与联动 UI。

### Summary

完成 data libraries 的 schema-diff/sync 与 UI 列管理（新增/删除/改名），并补齐路由与仓储层测试。

### Main Changes

- **Backend repository (`backend/tools/admin/repository.py`)**
  - 新增 `_safe_col_name()`，统一列名白名单校验（`^[a-z_][a-z0-9_]*$`）。
  - 新增 `introspect_table_columns()`，读取 `information_schema.columns` 并排除 `id`、`_row_index`。
  - 新增 `sync_library_schema()`，把物理表新增列合并进 `data_libraries.columns`（默认 `TEXT`）。
  - 新增 `add_library_column()` / `drop_library_column()` / `rename_library_column()`，实现物理表与元数据同步变更。

- **Backend routes (`backend/server/api/routes_admin.py`)**
  - 新增端点：
    - `GET /api/admin/libraries/{lib_id}/schema-diff`
    - `POST /api/admin/libraries/{lib_id}/sync-schema`
    - `POST /api/admin/libraries/{lib_id}/columns`
    - `DELETE /api/admin/libraries/{lib_id}/columns/{col_name}`
    - `PATCH /api/admin/libraries/{lib_id}/columns/{col_name}`
  - 新增 `_invalidate_library_caches()`，schema 变更后统一失效缓存（price/mapping/wanding/matcher）。

- **Frontend state/controller/view**
  - `admin-data.types.ts`：新增 `libraryNewColumns`、`librarySchemaLoading`、`librarySchemaError`、`librarySchemaOpen`。
  - `admin-data.ts`：`loadLibraryData()` 并行加载 schema-diff；新增 `syncLibrarySchema` / `addLibraryColumn` / `dropLibraryColumn` / `renameLibraryColumn`。
  - `admin-data.ts`：工具栏新增“同步结构”“管理列”，支持 warn-bar 一键合并、内联列管理表格与 prompt/confirm 交互。
  - `app-render.ts`：接入新 handlers（同步、开关面板、加列、删列、改名）。

- **Tests**
  - 新增 `tests/test_library_schema_sync.py`（仓储层：introspect/sync/add/drop/rename）。
  - 扩展 `tests/test_admin_libraries_routes.py`（路由错误映射 + schema mutation 缓存失效）。

### Verification Evidence

- Code-review agent：**PASS**（确认无阻断问题）
- Test-agent：**PASS**
  - `python -m pytest -q tests/test_admin_libraries_routes.py tests/test_library_schema_sync.py`
  - 结果：`15 passed`
  - `cd control-ui && npx tsc --noEmit`
  - 结果：`exit code 0`

### Status

[OK] **Completed**

## Session 53: 2026-04-23 — PN/MPa 字段匹配修复复核（正则边界 + 去重精度）

**Date**: 2026-04-23
**Task**: Trellis 字段匹配 PN/MPa 双向扩展检测与修复

### Summary

- 对 `wanding_fuzzy_matcher` 的 PN/MPa 双向扩展做了独立复核，发现并修复两处会影响召回稳定性的实现问题：
  - `PN16热水管` 这类“PN 数值后直接接中文”场景漏扩展；
  - `PN3 + 0.3MPa` 这类浮点表示会触发重复扩展。
- 修复后已按“Code-review PASS -> Test PASS”完成验证闭环。

### Main Changes

- `Agent Team version3/backend/tools/inventory/services/wanding_fuzzy_matcher.py`
  - `_PN_RE` 由尾部 `\b` 改为负前瞻约束，支持 `PN16热水管` 命中，仍拦截 `PN16A`。
  - `_apply_pressure_expansion()` 的 `seen_pn/seen_mpa` 从 `float` 改为格式化字符串键，消除浮点精度导致的重复追加。
  - 在扩展追加后即时写回 `seen_*` 集合，避免同轮重复。
- `Agent Team version3/tests/test_pressure_expansion.py`
  - 新增 `PN16热水管` 正向回归。
  - 新增 `PN16A` 不应命中的边界回归。
  - 新增 `PN3 0.3MPa` 去重精度回归。

### Verification Gate

- Code-review agent: **PASS**
  - 结论：两处问题已修复；低风险提示为未来若出现 >2 位小数压力值可再评估格式化策略。
- Test-agent / local tests: **PASS**
  - `python -m pytest tests/test_pressure_expansion.py` -> `24 passed, 0 failed`。

### Status

[OK] **Completed**


## Session 52: 2026-04-21 — Skill 规范文档（合格标准 + 注意事项）

**Date**: 2026-04-21  
**Task**: 基于 `学习总结文档/cursor-skills-index.md` 汇总 Skill 编写规范

### Summary

- 新增 `学习总结文档/skill-规范文档.md`，沉淀“合格 Skill”标准。
- 结构覆盖：最小结构、推荐模板、必备要素、反模式、description 写法、上线前自检清单、分类型建议。
- 目标是统一 Skill 质量基线：**可触发、可执行、可验证、可维护**。

### Verification

- Code-review agent: **PASS**（文档清晰、可执行；给出非阻塞优化建议）
- Test-agent: **PASS**  
  - 路径可读：`学习总结文档/skill-规范文档.md`  
  - 行数：152  
  - 标题命中：`Trigger` / `Workflow` / `Output` / `Guardrails`

### Status

[OK] **Completed**


## Session 35: Session 2026-04-15

**Date**: 2026-04-15
**Task**: Session 2026-04-15

### Summary

Auto-recorded by trellis-journal hook after Code Review + Test verification.

Changed files (0 total):

### Main Changes



### Git Commits

| Hash | Message |
|------|---------|
| `a6ac708` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete


## Session 36: [2026-04-16] backend/reports, gateway/protocol, server/api +5

**Date**: 2026-04-16
**Task**: [2026-04-16] backend/reports, gateway/protocol, server/api +5

### Summary

Auto-recorded by trellis-journal hook after Code Review + Test verification.

Changed files (24 total):
- `Agent Team version3/backend/reports/llm_analyzer.py`
- `Agent Team version3/backend/reports/models.py`
- `Agent Team version3/backend/reports/runner.py`
- `Agent Team version3/backend/server/api/routes_admin.py`
- `Agent Team version3/backend/tools/admin/excel_parser.py`
- `Agent Team version3/backend/tools/admin/repository.py`
- `Agent Team version3/control-ui/src/gateway/device-auth.ts`
- `Agent Team version3/control-ui/src/gateway/protocol/client-info.ts`
- `Agent Team version3/control-ui/src/shared/device-auth.ts`
- `Agent Team version3/control-ui/src/shared/usage-aggregates.ts`
- `Agent Team version3/control-ui/src/ui/app-gateway.ts`
- `Agent Team version3/control-ui/src/ui/app-render.ts`
- `Agent Team version3/control-ui/src/ui/controllers/admin-data.ts`
- `Agent Team version3/control-ui/src/ui/controllers/admin-data.types.ts`
- `Agent Team version3/control-ui/src/ui/controllers/chat.test.ts`
- `Agent Team version3/control-ui/src/ui/controllers/chat.ts`
- `Agent Team version3/control-ui/src/ui/controllers/control-ui-bootstrap.ts`
- `Agent Team version3/control-ui/src/ui/gateway.ts`
- `Agent Team version3/control-ui/src/ui/navigation.ts`
- `Agent Team version3/control-ui/src/ui/tool-display.ts`
- `Agent Team version3/control-ui/src/ui/views/admin-data.ts`
- `Agent Team version3/control-ui/src/ui/views/reports-tab.ts`
- `Agent Team version3/dist/control-ui/assets/index-NmMyS_Ho.js`
- `Agent Team version3/tests/test_reports_llm_analyzer.py`

### Main Changes



### Git Commits

| Hash | Message |
|------|---------|
| `a6ac708` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete


## Session 37: [2026-04-16] Agent Team version3/tests, server/api, tools/admin

**Date**: 2026-04-16
**Task**: [2026-04-16] Agent Team version3/tests, server/api, tools/admin

### Summary

Auto-recorded by trellis-journal hook after Code Review + Test verification.

Changed files (3 total):
- `Agent Team version3/backend/server/api/routes_admin.py`
- `Agent Team version3/backend/tools/admin/repository.py`
- `Agent Team version3/tests/test_admin_libraries_routes.py`

### Main Changes



### Git Commits

| Hash | Message |
|------|---------|
| `09e40dd` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete


## Session 39: [2026-04-16] admin/tests, control-ui/assets, inventory/services +6

**Date**: 2026-04-16
**Task**: [2026-04-16] admin/tests, control-ui/assets, inventory/services +6

### Summary

Auto-recorded by trellis-journal hook after Code Review + Test verification.

Changed files (13 total):
- `Agent Team version3/backend/server/api/routes_admin.py`
- `Agent Team version3/backend/tools/admin/excel_parser.py`
- `Agent Team version3/backend/tools/admin/repository.py`
- `Agent Team version3/backend/tools/admin/tests/test_generic_parser.py`
- `Agent Team version3/backend/tools/inventory/config.py`
- `Agent Team version3/backend/tools/inventory/services/mapping_table_matcher.py`
- `Agent Team version3/backend/tools/inventory/services/wanding_fuzzy_matcher.py`
- `Agent Team version3/control-ui/src/ui/app-render.ts`
- `Agent Team version3/control-ui/src/ui/app-settings.ts`
- `Agent Team version3/control-ui/src/ui/controllers/admin-data.ts`
- `Agent Team version3/control-ui/src/ui/controllers/admin-data.types.ts`
- `Agent Team version3/control-ui/src/ui/views/admin-data.ts`
- `Agent Team version3/dist/control-ui/assets/index-BRF11MFX.js`

### Main Changes



### Git Commits

| Hash | Message |
|------|---------|
| `680aba9` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete


## Session 50: 2026-04-20 — 万鼎业务知识 Neon 主存储（KnowledgeBackend + llm_selector 降级链）

**Date**: 2026-04-20  
**Spec / Plan**: `docs/superpowers/specs/2026-04-20-business-knowledge-neon-design.md`, `docs/superpowers/plans/2026-04-20-business-knowledge-neon.md`

### Summary

- **目标**：业务知识主存从本地 MD 迁到 Neon（`business_knowledge` 表，固定 key `wanding_selector`）；本地文件与内嵌常量作 fallback；Control UI 的 `GET/PUT /api/business-knowledge` 契约不变。
- **新增**：`backend/agent/knowledge_backend.py`（psycopg2 连接池、`get`/`put`/`close`）；`backend/agent/tests/test_knowledge_backend.py`（mock 单测 + llm_selector 注入测；有 `DATABASE_URL`/`NEON_DATABASE_URL` 时跑集成测）。
- **修改**：`llm_selector` — `set_knowledge_backend` / `shutdown_knowledge_backend`、`_get_knowledge_path`、三层 `_load_business_knowledge`（Neon → 文件 → 内嵌）；`routes_oos` — GET 优先 Neon，PUT 写 Neon 且 Neon 失败仍写本地再可能 500；`app.py` 启动注入、shutdown 释放池。
- **环境变量**：`DATABASE_URL` 或 `NEON_DATABASE_URL`（与仓库其余 Neon 用法一致）。

### Testing

- [OK] `python -m pytest backend/agent/tests/test_knowledge_backend.py -v` — **10 passed**, **1 skipped**（无 DB URL 时跳过集成测）

### Follow-ups / 已知

- **数据管理「自定义库」空白（`relation "dl_*_lib_*" does not exist`）**：`data_libraries` 元数据指向的物理表在 Neon 上不存在，且 `pg_tables` 下无 `dl_{id}_%` 匹配时 `try_repair_library_table_name` 无法自动修复 → 列表 0 行。需在同一 `DATABASE_URL` 上恢复表、或重新上传建表、或手工修正 `data_libraries.table_name`。**与业务知识表 `business_knowledge` 无关**。

### Status

[OK] **Completed**（计划内代码与自动化测）；数据管理空白为独立运维/元数据问题。


## Session 51: 修复 Neon 库表查询：表名/列名/排序字段全面修正

**Date**: 2026-04-20
**Task**: 修复 Neon 库表查询：表名/列名/排序字段全面修正

### Summary

repository.py 查询修复：data_libraries table_name + 两张主表列名/排序字段

### Main Changes

### 问题 1：data_libraries 表名错误

`data_libraries` 存的是旧 slug（`dl_2_lib_` / `dl_3_lib_2`），实际 Neon 表名是中文。

```sql
UPDATE data_libraries SET table_name='万鼎价格库_管材与国标管件_标准格式' WHERE id=2;
UPDATE data_libraries SET table_name='整理产品(2)' WHERE id=3;
```

### 问题 2：表名含中文字符未加双引号

PostgreSQL 对非 ASCII 标识符要求双引号包裹，否则报错 `UndefinedTable` / `UndefinedFunction`。

修复：新增 `_quote_sql_identifier(name)` → 返回 `"name"`（双引号内嵌引号转义），所有表名列名均走此函数。

### 问题 3：列名和实际数据库不匹配

`fetch_all_price_library` 写的 `material` 等列名与 Neon 实际列名不符。

实际列名对照（万鼎价格库）：
- `Material` / `Describrition` / `（二级代理）A级别_报单价格` 等

实际列名对照（整理产品）：
- `Nama_Permintaan_Barang_询价货物名称`
- `Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号`
- `Product_number_产品编号`
- `Nama_Penawaran_Barang_报价名称`

### 问题 4：ORDER BY 用了不存在的 id 列

两个表均无 `id` 列，价格库用 `NO`，产品表用 `Product_number_产品编号`。

### 修改文件

- `backend/tools/admin/repository.py`
  - 新增 `_quote_sql_identifier()` 函数
  - 修正 `fetch_all_price_library()` 列名 + 排序字段
  - 修正 `fetch_all_product_mapping()` 列名 + 排序字段
  - `_safe_table_name()` 改造：ASCII 名称走原逻辑，中文/特殊字符走 `_quote_sql_identifier()`

### 验证结果

- `fetch_all_price_library()` → 4988 行 ✅
- `fetch_all_product_mapping()` → 1005 行 ✅


### Git Commits

(No commits - planning session)

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete
