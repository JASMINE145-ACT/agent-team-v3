# Quotation and Inventory Flow

> Core business path (P0).  
> Goal: help agents quickly understand how product matching decisions are made.

---

## 1) Purpose

This flow handles user quotation intents and maps keywords to the best product candidate, then returns structured output for chat/work pipelines.

Primary value:
- correct product selection
- stable fallback when LLM fails
- correction loop for continuous improvement

---

## 2) Entry Points

- API/chat path through `routes_chat` -> `CoreAgent` tool invocation
- Work pipeline path through `/api/work/*` and tool execution
- Main tools:
  - `match_quotation`
  - `match_quotation_batch`
  - inventory lookup utilities in `backend/tools/inventory/services`

---

## 3) Control Flow (Core)

1. Parse user keyword + context from chat/work input.
2. Build candidate set from inventory/price/mapping sources.
3. Apply deterministic pre-ranking in code (`_apply_candidate_pre_filter`).
4. Run selector LLM on pre-ranked candidates (if multiple candidates remain).
5. Return:
   - single chosen result, or
   - needs-selection for user confirmation, or
   - unmatched/no-fit result.
6. If user says "wrong/not this", trigger rework and correction recording.

---

## 4) Deterministic vs LLM Boundary

### Deterministic (code-tier)
- default drainage vs water-supply preference
- JIS/guobiao signal handling
- hot/cold and pressure signals
- source weighting and brand tie-break

### Semantic (LLM-tier)
- ambiguous wording interpretation
- candidate explanation text
- final tie-break when deterministic scores are close

---

## 5) Failure Modes (High Impact)

- LLM selector timeout/error -> rule fallback still returns top pre-ranked candidate.
- Candidate ambiguity too high -> return needs-selection instead of forcing wrong pick.
- Wrong selection discovered by user -> rework path records correction.

---

## 6) Related Specs

- `llm-selector-architecture.md`
- `tools-catalog.md`
- `skills-system.md`
- `../tech-framework-guidelines.md`
