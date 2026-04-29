# OOS and Shortage Lifecycle

> Core business path (P1).  
> Scope: out-of-stock registration, tracking, persistence, and notification chain.

---

## 1) Purpose

Provide a reliable lifecycle for shortage data:
- capture shortage events
- persist records
- support query/report use cases
- trigger notification/operational follow-up

---

## 2) Entry Points

- OOS-related API routes in `routes_oos.py`
- OOS services under `backend/tools/oos`
- Alert dispatch integrations where configured

---

## 3) Lifecycle

1. Register shortage/OOS event with structured fields.
2. Validate and normalize payload.
3. Persist to primary store (Neon Postgres preferred; fallback supported).
4. Expose query/list/status endpoints to UI.
5. Dispatch notifications or downstream signals.
6. Include records in reports/operational views.

---

## 4) Data and Consistency Rules

- Storage mode should be explicit (cloud DB preferred for deployment continuity).
- OOS schema must stay backward compatible for existing dashboards.
- Retry-safe writes are required for flaky external dependencies.

---

## 5) Failure Modes

- DB unavailable -> degrade with clear error or fallback path, never silent success.
- Notification send failure -> keep OOS record persisted and mark notify failure separately.
- Schema drift -> breakage in dashboards/reports; guard with contract checks.

---

## 6) Related Specs

- `reports-system.md`
- `database-guidelines.md`
- `tools-catalog.md`
- `../tech-framework-guidelines.md`
