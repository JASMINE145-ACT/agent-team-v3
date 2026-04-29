# Work Pipeline Core

> Core business path (P1).  
> Focus: from user task request to streamable executable work result.

---

## 1) Purpose

The work pipeline runs multi-step task execution (often quotation-related) with resumable state and stream updates for UI.

It is the bridge between chat-level intent and operational delivery artifacts.

---

## 2) Main Entry Points

- `/api/work/run`
- `/api/work/run-stream`
- `/api/work/resume`

Related runtime modules:
- `backend/agent/work_executor.py`
- work route handlers under `backend/server/api`

---

## 3) Runtime Model

1. Validate input and initialize run context.
2. Build execution plan over tool-capable steps.
3. Execute steps with state snapshots.
4. Emit stream/progress events for UI.
5. Pause when user confirmation is required (pending choices).
6. Resume after user input and continue until final result.

---

## 4) Key Contracts

- Runs must be resumable (id + state + pending action).
- Stream payloads must remain UI-compatible across releases.
- Tool failure should produce actionable error state, not silent stop.

---

## 5) Failure Modes

- Mid-run interruption -> resume endpoint must recover from persisted state.
- Tool parameter mismatch -> return structured error and keep run trace.
- User-dependent decision point unresolved -> keep pending status instead of guessing.

---

## 6) Related Specs

- `api-routes.md`
- `tools-catalog.md`
- `database-guidelines.md`
- `../tech-framework-guidelines.md`
