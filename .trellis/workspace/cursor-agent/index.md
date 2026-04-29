# Workspace Index - cursor-agent

> Journal tracking for AI development sessions.

---

## Current Status

<!-- @@@auto:current-status -->
- **Active File**: `journal-2.md`
- **Total Sessions**: 57
- **Last Active**: 2026-04-24
<!-- @@@/auto:current-status -->

---

## Agent Onboarding (30s)

For project understanding, start here:

1. `.trellis/INDEX.md`
2. `.trellis/spec/tech-framework-guidelines.md`
3. `.trellis/knowledge-graph.md`
4. `.trellis/spec/guides/agent-fast-path.md` (task-first jumps)
5. `.trellis/spec/guides/agent-onboarding-checklist.md` (15-minute runbook)

Core business deep dives:
- `.trellis/spec/backend/quotation-inventory-flow.md`
- `.trellis/spec/backend/work-pipeline-core.md`
- `.trellis/spec/backend/oos-shortage-lifecycle.md`

Frontend runtime quick path:
- `.trellis/spec/frontend/core-interaction-flow.md`

---

## Active Documents

<!-- @@@auto:active-documents -->
| File | Lines | Status |
|------|-------|--------|
| `journal-3.md` | ~10 | Active |
| `journal-2.md` | ~1985 | Archived |
| `journal-1.md` | ~230 | Archived |
<!-- @@@/auto:active-documents -->

---

## Session History

<!-- @@@auto:session-history -->
| # | Date | Title | Commits |
|---|------|-------|---------|
| 57 | 2026-04-24 | 周报三项增强（WoW KPI + 图表联动 + 下周预测）最终收口 | - |
| 56 | 2026-04-24 | 周报三项增强第 5 轮（runner 测试稳健化） | - |
| 55 | 2026-04-24 | 周报三项增强第 4 轮（prev_week 写库断言） | - |
| 54 | 2026-04-24 | 周报三项增强（WoW KPI + 图表联动 + 下周预测）| - |
| 53 | 2026-04-23 | PN/MPa 字段匹配修复复核（正则边界 + 去重精度） | - |
| 52 | 2026-04-21 | Skill 规范文档（合格标准 + 注意事项） | - |
| 51 | 2026-04-20 | 修复 Neon 库表查询：表名/列名/排序字段全面修正 | - |
| 50 | 2026-04-20 | 万鼎业务知识 Neon 主存储（KnowledgeBackend + llm_selector 降级链） | - |
| 49 | 2026-04-19 | CCB history compression study (Ralph iteration 10) | - |
| 39 | 2026-04-16 | [2026-04-16] admin/tests, control-ui/assets, inventory/services +6 | `680aba9` |
| 38 | 2026-04-17 | Admin 自定义库 table_name 修复 + PUT 展示重命名 | `9d58958` |
| 37 | 2026-04-16 | [2026-04-16] Agent Team version3/tests, server/api, tools/admin | `09e40dd` |
| 36 | 2026-04-16 | [2026-04-16] backend/reports, gateway/protocol, server/api +5 | `a6ac708` |
| 35 | 2026-04-15 | Session 2026-04-15 | `a6ac708` |
| 34 | 2026-04-16 | Weekly Report + 数据管理模块闭环 + control-ui TS 清绿 |
| 33 | 2026-04-16 | 数据管理模块两次增量修复（可见性 + 自定义库上传） |
| 32 | 2026-04-15 | Tool-Defer 当前 P0/Stub 排查 |
| 31 | 2026-04-15 | OCR 卡片与历史回放修复 |
| 30 | 2026-04-15 | OCR–Chat fusion (SSE + UI) |
| 29 | 2026-04-14 | LLM selector fast path + GLM vision OCR |
| 28 | 2026-04-13 | 周报分析无限轮询修复（startup 重置 running + soft poll + LLM timeout） |
| 27 | 2026-04-12 | Render 部署 / WebSocket 与 render.yaml DEBUG |
| 26 | 2026-04-12 | Session Neon persistence（agent-team-v3：SessionBackend / WeCom / API） |
| 25 | 2026-04-12 | 周报两阶段管道（analysis_md + LLM + Lit reports UI） |
| 13 | 2026-04-03 | GLM 思考模型 Plan B（reasoning_content fallback + max_tokens 16000） |
| 12 | 2026-04-03 | match_quotation 三项修复（selection_reasoning 显示 + GLM 路由 + 来源优先级） |
| 11 | 2026-04-03 | Reasoning 显示修复 + Selector Reasoning 需求确认 |
| 10 | 2026-04-02 | CoreAgent Anthropic Messages routing (1211 fix, full impl) |
| 9 | 2026-04-01 | Fix BigModel 1211 model-not-found routing |
| 8 | 2026-04-01 | Unified reply format (disable 4-phase output) |
| 7 | 2026-04-01 | Tool-call stall fix + reasoning visibility fix |
| 6 | 2026-04-01 | LLM four-role policy (MiniMax / GLM-4.5-air / gpt-4o-mini / glm-ocr) |
| 5 | 2026-04-01 | Auto select_wanding_match + MiniMax-M2.7 switch |
| 1 | 2026-03-29 | Two-Step LLM Selector | - |
| 2 | 2026-03-29 | Chinese/English Size Spec Fix | - |
| 3 | 2026-03-29 | Create Frontend Spec Documentation | - |
| 4 | 2026-03-30 | Doom-loop Detection + Step Snapshots | - |
<!-- @@@/auto:session-history -->

---

## Notes

- Sessions are appended to journal files
- New journal file created when current exceeds 2000 lines
- Use `add_session.py` to record sessions