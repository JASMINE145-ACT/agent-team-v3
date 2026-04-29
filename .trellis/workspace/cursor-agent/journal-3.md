# Journal - Session 58+

**Developer**: cursor-agent
**Started**: 2026-04-25

---

## Session 58: 2026-04-28 — 批量询价核对结果仅保留匹配错误项

**Date**: 2026-04-28  
**Task**: `test/批量询价核对结果.md` 仅保留匹配错误记录

### Summary

按要求精简核对表，删除所有“编号是否一致=是”的行，仅保留匹配错误的 8 条记录，并同步核对结论。

### Main Changes

- `Agent Team version3/test/批量询价核对结果.md`
  - 删除序号 `2,3,4,5,8`（一致项）
  - 保留序号 `1,6,7,9,10,11,12,13`（不一致项）
  - 结论区仅保留：`不正确：1、6、7、9、10、11、12、13（共 8 项）`

### Verification Gate Evidence

1) **Code-review agent: PASS**
- 结论：当前表格仅含 `编号是否一致=否` 的 8 行，且结论统计与表格一致。

2) **Test-agent: PASS**
- 目标文件状态检查通过；冲突标记检查无异常。
- 轻量回归：`python -m pytest -q tests/test_vision_config.py` -> `6 passed, 2 warnings`。

### Status

[OK] **Completed**

---

## Session 59: 2026-04-29 — Knowledge Tier Split（spec+plan 执行）

**Date**: 2026-04-29  
**Task**: 执行 `2026-04-29-knowledge-tier-split` 的 spec 与 plan

### Summary

将确定性规则从 `wanding_business_knowledge.md` 下沉到代码层 `_apply_candidate_pre_filter()`，统一在 LLM 选型前与规则回退处执行；同时瘦身知识库文档并补齐规则回归测试。

### Main Changes

- `backend/tools/inventory/services/llm_selector.py`
  - 新增 `_apply_candidate_pre_filter()`，统一执行确定性打分重排
  - LLM 路径改为先走 pre-filter 再截断候选
  - `_rule_based_fallback` 简化为直接取 pre-filter 首位
  - `_BUSINESS_KNOWLEDGE` 精简为 5 条摘要规则
- `tests/unit/test_candidate_pre_filter.py`
  - 新建 13 个单测，覆盖默认排水/日标/冷热水/压强/联塑/来源与回归场景
- `backend/tools/data/wanding_business_knowledge.md`
  - 删除代码层已覆盖规则，仅保留语义判断规则
  - 文件行数控制到 70 行
- `docs/superpowers/plans/2026-04-29-knowledge-tier-split.md`
  - 回填执行状态与验证结论

### Verification Gate Evidence

1) **Code-review agent: PASS**
- 首轮发现 2 个阻塞问题（显式`国标`与显式压强可能被来源权重压过）
- 修复后复审通过：无阻塞问题

2) **Test-agent: PASS**
- `python -m pytest -q tests/unit/test_candidate_pre_filter.py tests/test_llm_selector_protocol.py`
- 结果：`20 passed`

3) **补充回归**
- `py -m pytest tests/ -k "not live" -q --tb=short`
- 结果：`373 passed, 2 deselected`

### Status

[OK] **Completed (implementation & verification)**  
[PENDING] **Commit/Push by request**

---

## Session 60: 2026-04-29 — Trellis knowledge indexing acceleration

**Date**: 2026-04-29  
**Task**: Build fast onboarding index for agents (core detailed, secondary concise)

### Summary

Established a three-layer Trellis navigation model so agents can quickly understand the project: workspace quick entry, spec-level priority index, and concept graph lookup.

### Main Changes

- New index and framework baseline:
  - `.trellis/spec/index.md`
  - `.trellis/spec/tech-framework-guidelines.md`
- New core feature deep dives:
  - `.trellis/spec/backend/quotation-inventory-flow.md`
  - `.trellis/spec/backend/work-pipeline-core.md`
  - `.trellis/spec/backend/oos-shortage-lifecycle.md`
  - `.trellis/spec/frontend/core-interaction-flow.md`
- Index wiring updates:
  - `.trellis/knowledge-graph.md`
  - `.trellis/spec/backend/index.md`
  - `.trellis/spec/frontend/index.md`
  - `.trellis/workspace/index.md`
  - `.trellis/workspace/cursor-agent/index.md`

### Knowledge Index Policy (applied)

- Core features: detailed flow docs with boundaries and failure modes
- Secondary features: concise references with links back to core docs
- Technical framework: single baseline guideline for future implementation decisions

### Status

[OK] **Completed (documentation/indexing)**

---

## Session 61: 2026-04-29 — Trellis index readability tuning

**Date**: 2026-04-29  
**Task**: Improve index scan speed with explicit core-vs-general reading order

### Summary

Refined backend/frontend index pages to explicitly separate core detailed paths from concise general references, reducing onboarding ambiguity for future agents.

### Main Changes

- `spec/backend/index.md`
  - Added "Recommended Reading Order"
  - Split into Core Paths (detailed) and General References (concise)
- `spec/frontend/index.md`
  - Added the same reading-order structure
- Maintained existing links to project-level index and framework baseline

### Status

[OK] **Completed (index readability)**

---

## Session 62: 2026-04-29 — Trellis index governance baseline

**Date**: 2026-04-29  
**Task**: Prevent future index drift with lightweight maintenance rules

### Summary

Added a compact index-governance spec so future updates preserve the "core detailed / secondary concise" structure and keep agent onboarding speed stable.

### Main Changes

- Added `.trellis/spec/index-maintenance.md`
  - core-vs-secondary placement rule
  - required link-update checklist
  - length discipline guidance
  - onboarding speed targets
- Updated:
  - `.trellis/spec/index.md`
  - `.trellis/knowledge-graph.md`

### Status

[OK] **Completed (index governance)**

---

## Session 63: 2026-04-29 — Core ReAct loop deep-dive index

**Date**: 2026-04-29  
**Task**: Fill missing core-runtime deep-dive in Trellis

### Summary

Added a dedicated Core ReAct loop spec to complete the core-detailed set, then wired it into backend/project/concept indexes.

### Main Changes

- Added `.trellis/spec/backend/core-react-loop.md`
- Updated:
  - `.trellis/spec/backend/index.md`
  - `.trellis/spec/index.md`
  - `.trellis/knowledge-graph.md`

### Status

[OK] **Completed (core runtime indexing)**

---

## Session 64: 2026-04-29 — Agent onboarding runbook

**Date**: 2026-04-29  
**Task**: Add a practical onboarding checklist for faster task startup

### Summary

Added a 15-minute execution checklist so agents can consistently move from orientation to safe implementation without over-reading.

### Main Changes

- Added `.trellis/spec/agent-onboarding-checklist.md`
- Updated:
  - `.trellis/spec/index.md`
  - `.trellis/knowledge-graph.md`
  - `.trellis/workspace/cursor-agent/index.md`

### Status

[OK] **Completed (onboarding runbook)**

---

## Session 65: 2026-04-29 — Secondary modules compact index

**Date**: 2026-04-29  
**Task**: Build a concise landing page for non-core modules

### Summary

Added a single quick-reference page for secondary modules, so agents can avoid overloading core indexes with peripheral details.

### Main Changes

- Added `.trellis/spec/secondary-modules-quick-reference.md`
- Updated:
  - `.trellis/spec/index.md`
  - `.trellis/knowledge-graph.md`

### Status

[OK] **Completed (secondary concise indexing)**

---

## Session 66: 2026-04-29 — Fast-path closure refinements

**Date**: 2026-04-29  
**Task**: Close remaining fast navigation gaps

### Summary

Refined task-first routing to include explicit CoreAgent loop debugging and secondary-module entry, completing practical navigation coverage.

### Main Changes

- Updated `.trellis/spec/agent-fast-path.md`
  - Added `Debug CoreAgent loop behavior` route
  - Added `Handle non-core/peripheral task` route

### Status

[OK] **Completed (fast-path closure)**

---

## Session 67: 2026-04-29 — Workspace entry consistency pass

**Date**: 2026-04-29  
**Task**: Align workspace-level quick entry with latest spec indexes

### Summary

Updated workspace global entry so any developer/agent (not only cursor-agent index users) gets direct access to fast-path and secondary-module concise references.

### Main Changes

- Updated `.trellis/workspace/index.md`
  - Added quick links to:
    - `spec/agent-fast-path.md`
    - `spec/secondary-modules-quick-reference.md`

### Status

[OK] **Completed (workspace consistency)**

---

## Session 68: 2026-04-29 — Role-based reading paths

**Date**: 2026-04-29  
**Task**: Add minimal reading plans by task role

### Summary

Added a compact role-based reading guide so agents can pick a predefined path for backend, frontend, ops, or testing work without manual route planning.

### Main Changes

- Added `.trellis/spec/role-based-reading-paths.md`
- Updated:
  - `.trellis/spec/index.md`
  - `.trellis/knowledge-graph.md`

### Status

[OK] **Completed (role-based onboarding)**

---

## Session 69: 2026-04-29 — Backend/Frontend index quick-nav unification

**Date**: 2026-04-29  
**Task**: Reduce navigation ambiguity on domain index homepages

### Summary

Added direct links to task-first and onboarding docs in both backend and frontend index quick-navigation blocks, so agents can jump from domain homepages without returning to project index.

### Main Changes

- Updated:
  - `.trellis/spec/backend/index.md`
  - `.trellis/spec/frontend/index.md`

### Status

[OK] **Completed (homepage navigation unification)**

---

## Session 70: 2026-04-29 — Workspace role-path entry completion

**Date**: 2026-04-29  
**Task**: Complete workspace quick context links for role-based navigation

### Summary

Added role-based reading path link to workspace global quick context so non-cursor-agent entry points have the same role-oriented onboarding path.

### Main Changes

- Updated `.trellis/workspace/index.md`
  - Added `.trellis/spec/role-based-reading-paths.md` to fast context list

### Status

[OK] **Completed (workspace role-path completion)**

---

## Session 71: 2026-04-29 — Time-budget reading guide

**Date**: 2026-04-29  
**Task**: Add minimum-context reading sets by available time

### Summary

Added a compact time-budget reading guide (5/15/30 minutes) so agents can choose the smallest sufficient context set based on urgency.

### Main Changes

- Added `.trellis/spec/time-budget-reading.md`
- Updated:
  - `.trellis/spec/index.md`
  - `.trellis/knowledge-graph.md`

### Status

[OK] **Completed (time-budget onboarding)**

---

## Session 72: 2026-04-29 — Entry-mode cross-linking

**Date**: 2026-04-29  
**Task**: Connect task-first, role-based, and time-budget entry modes

### Summary

Added explicit cross-links from fast-path to role/time reading modes so agents can switch context strategy without returning to top-level index.

### Main Changes

- Updated `.trellis/spec/agent-fast-path.md`
  - Added links to:
    - `spec/time-budget-reading.md`
    - `spec/role-based-reading-paths.md`

### Status

[OK] **Completed (entry-mode linking)**

---

## Session 73: 2026-04-29 — Workspace quick-entry final completion

**Date**: 2026-04-29  
**Task**: Ensure workspace-level quick context covers all entry modes

### Summary

Completed workspace quick-entry list by adding onboarding checklist and time-budget guide, so global entry now includes task-first, role-based, checklist, and time-based modes.

### Main Changes

- Updated `.trellis/workspace/index.md`
  - Added:
    - `.trellis/spec/agent-onboarding-checklist.md`
    - `.trellis/spec/time-budget-reading.md`

### Status

[OK] **Completed (workspace quick-entry completion)**