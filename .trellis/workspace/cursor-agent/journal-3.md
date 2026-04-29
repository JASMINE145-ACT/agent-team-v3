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