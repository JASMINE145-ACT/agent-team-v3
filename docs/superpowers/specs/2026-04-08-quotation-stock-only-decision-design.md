# Quotation Module — Stock-Only Decision Design

> **For agentic workers:** This spec defines decision logic only. Keep implementation minimal and local to quotation flow.

**Goal:** In quotation/quotation-sheet flow, keep `可售` visible in tables but make all shortage/replenishment/fulfillment decisions depend only on `库存（qty_warehouse）`.

**Scope:** Quotation flow only (quote pipeline and pending quotation decisions). No schema change, no UI column removal, no change to non-quotation inventory queries.

---

## 1. Problem Statement

Current behavior may mix `可售` into narrative or decision branches. This causes business mismatch: quotation decisions should follow warehouse stock (`库存`) only.

Required business rule:
- `可售` remains a display field.
- Decision state and copy must be derived from `库存` only.

---

## 2. Target Behavior

### 2.1 Decision Source of Truth

Use only `qty_warehouse` (or normalized warehouse-stock equivalent) for:
- Out-of-stock judgment
- Insufficient stock judgment
- Replenishment suggestion quantity
- Fulfillable judgment

Do not use `qty_available` in any decision branch.

### 2.2 Decision Rules

Given:
- `stock = qty_warehouse`
- `req = Qty` from quotation row

Rules:
1. `stock <= 0` → status: out_of_stock
2. `0 < stock < req` → status: insufficient_stock, shortage = `req - stock`
3. `stock >= req` → status: in_stock
4. If `req` missing/invalid: report stock state only; skip shortage math

### 2.3 Display Rules

- Keep `可售` column in table output.
- Narrative copy, badges, and summary text must mention decisions based on `库存`.
- Do not output phrases implying decision based on `可售`.

---

## 3. File-Level Change Plan

Primary touchpoints (minimal diff):
- `backend/tools/quotation/handler.py`
- `backend/tools/quotation/quote_tools.py`
- `backend/tools/quotation/canonical_lines.py` (if line normalization currently feeds decision fields)
- `backend/server/services/fulfill.py` (if pending-quotation status text is generated here)

Expected edits:
- Replace any decision dependency on `qty_available` with `qty_warehouse`.
- Keep response payload/table fields unchanged where possible.
- Update copy templates to state inventory-based decision semantics.

---

## 4. Compatibility and Risk

### 4.1 Backward Compatibility

- API/table structure unchanged (still includes `可售` for display).
- Existing consumers reading `可售` column are not broken.

### 4.2 Risks

- Hidden branch may still reference `qty_available`.
- Conflicting aliases (`quantityAvailable`, `availableToSell`) may leak into decision logic.

Mitigation:
- Centralize decision input variable (`stock_for_decision`) in quotation decision path.
- Add focused tests with conflicting stock/available samples.

---

## 5. Test Plan (Acceptance)

Add/adjust tests in quotation pipeline tests to assert stock-only decisions:

1. **Conflict A:** `stock=0`, `available=90`, `req=10`  
   Expected: out_of_stock (not fulfillable)

2. **Conflict B:** `stock=5`, `available=0`, `req=10`  
   Expected: insufficient_stock, shortage=5

3. **Conflict C:** `stock=12`, `available=1`, `req=10`  
   Expected: in_stock

4. **No qty:** `stock=8`, `available=0`, `req=None`  
   Expected: stock-state only; no shortage calculation

5. **Copy checks:** summary/pending-quotation text references `库存`-based decision and does not describe `可售` as decision basis.

Completion criteria:
- Quotation decisions match all five acceptance cases.
- `可售` remains visible in table payload.
- No regression in non-quotation inventory query behavior.

---

## 6. Out of Scope

- Removing `可售` column from UI/API
- Changing inventory source systems
- Refactoring unrelated inventory tools
- Policy changes outside quotation module
