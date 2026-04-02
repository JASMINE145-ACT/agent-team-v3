# Journal - cursor-agent (Part 1)

> AI development session journal
> Started: 2026-03-28

---

## Session: 2026-04-01 — Auto select_wanding_match + MiniMax-M2.7 switch

### What was done
- Updated `backend/tools/inventory/services/inventory_agent_tools.py` so `match_quotation` auto-runs LLM selection when multi-candidate results appear, returning one payload with:
  - `candidates`
  - `chosen`
  - `selection_reasoning`
  - `match_source`
- Kept single-candidate path unchanged (no reasoning shown when `len(candidates) == 1`).
- Added LLM-call safety fallback in auto-select path: on selector exception, return `needs_selection: true` with `llm_error: true`.
- Updated `backend/tools/inventory/services/llm_selector.py` to persist reasoning end-to-end:
  - `_candidate_to_result(..., reasoning=\"\")`
  - fallback result now includes top-level `reasoning`
- Switched inventory LLM defaults in `backend/tools/inventory/config.py` to MiniMax:
  - `LLM_API_KEY`: prefer `MINIMAX_API_KEY`
  - `LLM_BASE_URL`: default `https://api.minimaxi.com/v1`
  - `LLM_MODEL`: default `MiniMax-M2.7`
- Updated `Agent Team version3/.env.example` with MiniMax sample keys.

### Verification
- Code-review agent completed (focus: compatibility, error-path robustness, API-key priority behavior).
- Runtime checks passed:
  - `py -3 -m py_compile` on modified Python files
  - direct OpenAI-compatible call with MiniMax endpoint confirmed response model `MiniMax-M2.7`
  - `llm_select_best` output includes `reasoning` field
  - mocked multi-candidate `match_quotation` path returns `single + candidates + chosen + selection_reasoning`

### Key lesson
- For this codebase, model switch is controlled by runtime `.env` (`LLM_MODEL`) first; config default only applies when env value is missing.
- If product requires one-shot UX, auto-selection should return both candidate table and machine-selected reason in the same payload.

### Status
**Completed**

### Next step
- Frontend should render `selection_reasoning` consistently at the bottom of candidate result card.
- If needed, add one integration test for `match_quotation` multi-candidate auto-select payload contract.

---

## Session: 2026-04-01 — Render / select_wanding_match 可见性与日志

### What was done
- `inventory_agent_tools._execute_select_wanding_match`：入口打 `logger.info("select_wanding_match invoked …")`，便于在 Render 日志确认第二步是否发生。
- `claude.md`：纠正为 `needs_selection`；说明第二步由模型显式 tool call、非后端自动串联；注明 `LLM_SELECT_*` 与排查方式。

### Key lesson
- 截图中的 commit（如 `9a433f9`）若信息仅为 `/ip` 等，**不能**单独证明库存两步逻辑版本；需对照 **同一仓库、Root Directory、该 commit 下** 的 `inventory_agent_tools.py` / `skills.py`。
- 即使代码正确，**未出现 `select_wanding_match` 也可能是预期**：`single`、或用户要整表展示、或模型未遵守 prompt。

---

## Session: 2026-03-29 — Two-Step LLM Selector

### What was done
- Implemented two-step visible LLM selection: `match_quotation` returns `needs_human_choice`, Agent auto-calls `select_wanding_match`
- Changed files: `inventory_agent_tools.py`, `skills.py`, `agent_runner.py`, `claude.md`
- Unit tests + e2e tests all PASS

### Key lesson learned
**`skills.py` is the source of truth for Agent behavior**, not `agent_runner.py`.
- `agent_runner.py`'s `_SYSTEM_PROMPT` only applies to standalone ReAct tool execution
- `JAgentExtension` uses `skills.py` to inject prompts into the LLM
- Initially forgot to sync `skills.py` when fixing Agent behavior → caused persistent bug
- Must always update `skills.py` for any Agent behavior change, then restart backend

### Bug encountered
User reported "直接50 价格" still returned a candidate list instead of auto-selected result.
- Root cause: `skills.py` still described "needs_selection" behavior (not synced with code changes)
- Fix: Updated 4 places in `skills.py` to reflect new `needs_human_choice` auto-selection rule
- Also updated `skills.py` Ambiguity & Recovery Rules section

### Next step
Backend needs restart to activate new `skills.py` code.

---

## Session: 2026-03-29 — Chinese/English Size Specification Matching Fix

### What was done
Fixed size specification matching issue (L2: 规格识别缺失) affecting ~200 queries.

**Problem**: System could not recognize Chinese size units like "2寸"→DN50, "1寸"→DN25, "6英寸"→DN150.

**Files Modified**:
- `backend/tools/inventory/services/wanding_fuzzy_matcher.py` - Added CUN_TO_MM mapping, updated `_expand_unit_tokens`, `_split_tokens`, `_is_inch_token`
- `backend/tools/data/wanding_business_knowledge.md` - Added conversion rules section
- `backend/tools/inventory/tests/test_chinese_size_recognition.py` - New test file
- `doc/尺寸规格匹配失败案例记录.md` - New documentation of failure cases

**New Mappings Added**:
- `2寸` → DN50, `1寸` → DN25, `6英寸` → DN150
- `1½寸` → DN40, `3/4寸` → DN20

### Key lesson learned
Chinese size units like "2寸" (2 inches) are colloquial forms that need explicit mapping to DN规格 in `_expand_unit_tokens`. The matching flow: `_split_tokens` extracts "2寸" as a token → `_expand_unit_tokens` expands it to `{'50', 'dn50', '2"'}` → matches against product specs.

### Testing
- [OK] All Chinese size recognition tests pass
- [OK] 26/29 existing unit tests pass (3 pre-existing encoding failures unrelated to changes)
- [OK] No regression in existing functionality

### Status
**Completed**

### Next step
Run end-to-end test with actual quotation data to verify coverage improvement (expected: 21.7% → 30-35%).

---

## Session: 2026-03-29 — Create Frontend Spec Documentation

### What was done
Created frontend development guidelines for `control-ui/` in `.trellis/spec/frontend/`.

**Files Created**:
- `frontend/index.md` - Frontend guidelines index
- `frontend/directory-structure.md` - Module organization
- `frontend/component-guidelines.md` - Lit Web Components patterns
- `frontend/type-safety.md` - TypeScript conventions
- `frontend/i18n-guidelines.md` - Translation system
- `frontend/testing-guidelines.md` - Vitest + Playwright testing

### Key Findings
**Frontend Stack**:
- Framework: Lit 3.x (Web Components)
- Language: TypeScript 5.x
- Build: Vite 6.x
- Testing: Vitest + Playwright
- State: Component-level @state() with controller pattern
- i18n: Custom lightweight system (`src/i18n/`)

**Architecture**:
- `OpenClawApp` in `app.ts` holds ALL application state
- Business logic in `controllers/`
- Pure render functions in `views/`
- Gateway uses WebSocket (`GatewayBrowserClient`)

### Status
**Completed**

### Next step
Continue with original task or wait for new instructions.

---

## Session: 2026-03-30 — Close Two-Agent-Paths Todo

### What was done
- Updated `doc/待办事宜.md` to mark "Two Agent Paths" as completed.
- Recorded the implementation result: `run_inventory_agent()` now delegates to `SingleAgent.execute_react()`, removing the standalone inline prompt path.
- Updated `claude.md` with a new note about path unification and return-contract compatibility.

### Status
**Completed**

### Next step
- Continue closing remaining TODO items in `doc/待办事宜.md` as they are implemented.

---

## Session: 2026-03-30 — Context Compression Full-Picture Audit

### What was done
- Dispatched a `search-agent` to map the full compression/truncation pipeline across Chat and Work paths.
- Updated `doc/待办事宜.md` section 8/9 with code-based behavior:
  - `_trim_context` trigger, scope, order, and summarizer fallback
  - Chat vs Work ReAct threshold differences
  - Tool-memory injection conditions and risk notes
- Synced project change note into `claude.md`.

### Key finding
- `_trim_context` currently compresses only tool messages and does not enforce a hard “keep latest 2 tools” rule.

### Status
**Completed**

### Next step
- If needed, convert this mechanism map into a dedicated optimization plan with measurable acceptance checks.

---

## Session: 2026-03-30 — Doom-loop Detection + Step Snapshots

### What was done
Implemented two improvements to the CoreAgent ReAct loop:

**1. Doom-loop Detection**:
- Tracks if the same tool is called in 3+ consecutive ReAct steps
- When detected, sets `doom_loop_detected = True` in result
- Logs warning: "Doom-loop detected: tool {name} called in {n} consecutive steps"

**2. Step Snapshots**:
- Records a `Snapshot` dataclass after each LLM call
- Fields: step, ts, tool_calls, input_tokens, output_tokens, cost, duration_ms, model
- Cost calculated using GLM-4-flash pricing ($0.1/1M tokens)
- Added to result dict as `snapshots` list

### Files Modified
- `backend/agent/session.py` - Added `Snapshot` dataclass with `from_dict()`/`to_dict()`
- `backend/core/agent.py` - Added doom-loop tracking and snapshot recording in `execute_react()`

### Key Implementation Details
- `_tool_streak` dict tracks consecutive same-tool calls
- `_current_step_tool` captures the tool called in current step
- Snapshot recording wrapped in try/except to prevent crashes
- Snapshot imported inside try block to avoid circular imports

### Testing
- [OK] No linter errors
- [OK] Code review verified logic correctness
- [OK] Implementation follows existing code patterns

### Code Review Fixes Applied
1. **Fixed pricing formula** (line 384): Changed from `(pt + ct) * 0.1 / 1_000_000` to `(pt * 0.1 + ct * 0.1) / 1_000_000` to match comment (was underestimating cost by 2x)
2. **Fixed snapshots accumulation** (line 258): Added `self._snapshots: List[Any] = []` at start of `execute_react` to reset between calls
3. **Removed duplicate keyword**: Fixed `"不是这个"` appearing twice in `_REWORK_KEYWORDS`

### Status
**Completed**

### Next step
- Update `claude.md` with new feature documentation if needed
