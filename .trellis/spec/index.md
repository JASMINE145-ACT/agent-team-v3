# Project Spec Index

> Fast entry for AI agents and developers.
> Strategy: deep docs for core flows, concise docs for secondary modules.

---

## 1) Read This First

1. `spec/tech-framework-guidelines.md` - stack, architecture boundaries, coding guardrails.
2. `spec/backend/index.md` - core ReAct engine, model routing, backend conventions.
3. `spec/frontend/index.md` - control-ui architecture and state/controller patterns.
4. `spec/frontend/core-interaction-flow.md` - fastest UI runtime chain for debugging.
5. `INDEX.md` - concept-to-file lookup.
6. `spec/agent-fast-path.md` - task-first entry (when you know your target).
7. `spec/index-maintenance.md` - keep indexing quality stable over time.
8. `spec/agent-onboarding-checklist.md` - 15-minute execution checklist.
9. `spec/role-based-reading-paths.md` - minimal plans by task role.
10. `spec/time-budget-reading.md` - minimum context by available time.

Agent quick-start target: finish these 5 docs in under 30 minutes, then jump to task-specific sections below.

---

## 2) Core Features (Detailed)

These are the business-critical paths. Read in order when onboarding:

| Priority | Feature | Why it matters | Main docs |
|---|---|---|---|
| P0 | Core ReAct runtime loop | Central orchestration for all tool-driven behavior | `spec/backend/core-react-loop.md`, `spec/backend/index.md` |
| P0 | Quotation + Inventory matching | Primary user value and highest call volume | `spec/backend/quotation-inventory-flow.md`, `spec/backend/llm-selector-architecture.md`, `spec/backend/tools-catalog.md` |
| P0 | Chat ReAct loop | Controls tool orchestration and response behavior | `spec/backend/index.md`, `spec/backend/skills-system.md` |
| P1 | Work pipeline (quotation fill) | End-to-end task execution and stream output | `spec/backend/work-pipeline-core.md`, `spec/backend/api-routes.md` |
| P1 | OOS / shortage lifecycle | Business closure, alerts, and persistence | `spec/backend/oos-shortage-lifecycle.md`, `spec/backend/reports-system.md`, `spec/backend/database-guidelines.md` |
| P1 | Model/protocol routing | Reliability of OpenAI vs Anthropic paths | `spec/backend/index.md`, `spec/backend/config-reference.md` |

---

## 3) Secondary Features (Concise)

Use these as quick references unless your task directly targets them:

| Module | Main docs |
|---|---|
| All secondary modules (single page) | `spec/secondary-modules-quick-reference.md` |
| Reports dashboard + scheduler | `spec/backend/reports-system.md` |
| Admin data management | `spec/backend/api-routes.md` |
| Frontend tabs/pages map | `spec/frontend/pages.md`, `spec/frontend/core-interaction-flow.md` |
| i18n / type-safety / testing | `spec/frontend/i18n-guidelines.md`, `spec/frontend/type-safety.md`, `spec/frontend/testing-guidelines.md` |
| Logging / error handling / quality rules | `spec/backend/logging-guidelines.md`, `spec/backend/error-handling.md`, `spec/backend/quality-guidelines.md` |

---

## 4) Suggested Navigation by Task

Need a compact table instead of bullets? see `spec/agent-fast-path.md`.

- **Fix wrong product selection**
  - `spec/backend/llm-selector-architecture.md`
  - `spec/backend/skills-system.md`
  - `spec/backend/tools-catalog.md`
- **Add or adjust API**
  - `spec/backend/api-routes.md`
  - `spec/backend/directory-structure.md`
- **UI rendering or tab behavior**
  - `spec/frontend/pages.md`
  - `spec/frontend/component-guidelines.md`
- **Deployment/config issue**
  - `spec/tech-framework-guidelines.md`
  - `spec/backend/config-reference.md`

---

## 5) Indexing Policy

- Keep core-path docs detailed (data contract + flow + failure modes).
- Keep secondary docs brief and link back to core docs.
- Prefer updating this index when adding a new spec file.
- Follow `spec/index-maintenance.md` for ongoing governance.
