# Quotation Module — Stock-Only Decision Implementation Plan

> **For agentic workers:** Execute tasks in order. Keep diffs minimal and local to quotation flow. Do not remove `可售` display column.

**Spec:** `docs/superpowers/specs/2026-04-08-quotation-stock-only-decision-design.md`  
**Goal:** Keep `可售` for table display, but make quotation decisions (缺货/补货/满足) depend only on `库存（qty_warehouse）`.

---

## File Map

### Expected code touchpoints
- `backend/tools/quotation/handler.py`
- `backend/tools/quotation/quote_tools.py`
- `backend/tools/quotation/canonical_lines.py` (only if it currently drives decision fields)
- `backend/server/services/fulfill.py` (only if it emits pending-quotation status/copy)

### Expected test touchpoints
- `tests/test_quotation_pipeline.py`
- Nearby quotation-related tests if assertions on status/copy exist

---

## Execution Checklist

- [ ] **Task 1 — Locate decision branches that read `qty_available`**
  - Search quotation flow for `qty_available`, `quantityAvailable`, `availableToSell`.
  - Enumerate only branches used for decision/copy, not plain table rendering.
  - Output a short mapping: file → function → branch purpose.

- [ ] **Task 2 — Introduce a single decision input (`stock_for_decision`)**
  - In quotation decision path, normalize:
    - `stock_for_decision = qty_warehouse` (or normalized warehouse equivalent).
  - Ensure all decision/status branches use this variable only.
  - Keep `qty_available` untouched in payload for display.

- [ ] **Task 3 — Apply stock-only status logic**
  - Implement:
    - `stock <= 0` → out_of_stock
    - `0 < stock < req_qty` → insufficient_stock, `shortage = req_qty - stock`
    - `stock >= req_qty` → in_stock
    - invalid/missing `req_qty` → stock-state only, no shortage math
  - Do not alter unrelated quotation matching logic.

- [ ] **Task 4 — Update quotation copy/templates**
  - Adjust summary, badge text, and pending-quotation prompts to reflect inventory-based decisions.
  - Remove/avoid wording that implies decision was based on `可售`.
  - Keep table columns unchanged (still include `可售`).

- [ ] **Task 5 — Add conflict-case regression tests**
  - Add/adjust tests for:
    - A: `stock=0`, `available=90`, `req=10` → out_of_stock
    - B: `stock=5`, `available=0`, `req=10` → insufficient_stock, shortage=5
    - C: `stock=12`, `available=1`, `req=10` → in_stock
    - D: `stock=8`, `available=0`, `req=None` → stock-state only
  - Add copy assertion: status explanations are inventory-based.

- [ ] **Task 6 — Verification**
  - Run targeted quotation tests.
  - Run any directly affected tests.
  - Confirm:
    - decisions follow `库存` only
    - `可售` still appears in table payload
    - no regression in non-quotation inventory query behavior

- [ ] **Task 7 — Review Gate**
  - Run code-review agent first; fix findings.
  - Run test-agent second; fix findings.
  - Repeat until both pass.

- [ ] **Task 8 — Finalize**
  - Summarize changed files and behavior deltas.
  - Optionally update related docs only if behavior text changed in user-facing docs.

---

## Guardrails

- Do not remove `可售` fields/columns from API or table rendering.
- Do not refactor unrelated inventory modules.
- Keep naming and existing response shapes stable unless required by tests.
- Prefer smallest possible diff that enforces stock-only decision semantics.

---

## Done Criteria

- All quotation decision branches use warehouse stock only.
- Conflict-case tests pass.
- `可售` remains display-only in quotation output.
- Code review + test validation both pass.
