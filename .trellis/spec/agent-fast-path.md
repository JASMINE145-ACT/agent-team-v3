# Agent Fast Path

> Task-first navigation for fast execution.
> Use this when you already know what you need to do.

---

Related entry modes:
- Time budget mode: `spec/time-budget-reading.md`
- Role mode: `spec/role-based-reading-paths.md`

---

## 1) If You Need To...

| Task | Read First | Then |
|---|---|---|
| Debug CoreAgent loop behavior | `spec/backend/core-react-loop.md` | `spec/backend/index.md`, `spec/backend/skills-system.md` |
| Fix wrong quotation selection | `spec/backend/quotation-inventory-flow.md` | `spec/backend/llm-selector-architecture.md`, `spec/backend/skills-system.md` |
| Add/update a backend API | `spec/backend/api-routes.md` | `spec/backend/directory-structure.md`, `spec/backend/error-handling.md` |
| Modify tool behavior | `spec/backend/tools-catalog.md` | `spec/backend/skills-system.md`, `spec/backend/quality-guidelines.md` |
| Debug chat runtime/tool stream | `spec/backend/index.md` | `spec/frontend/core-interaction-flow.md` |
| Change work pipeline logic | `spec/backend/work-pipeline-core.md` | `spec/backend/api-routes.md`, `spec/backend/database-guidelines.md` |
| Change OOS/shortage flow | `spec/backend/oos-shortage-lifecycle.md` | `spec/backend/reports-system.md`, `spec/backend/database-guidelines.md` |
| Update control-ui behavior | `spec/frontend/core-interaction-flow.md` | `spec/frontend/pages.md`, `spec/frontend/component-guidelines.md` |
| Add/adjust tab/page UI | `spec/frontend/pages.md` | `spec/frontend/index.md`, `spec/frontend/type-safety.md` |
| Check deployment/env issues | `spec/tech-framework-guidelines.md` | `spec/backend/config-reference.md`, `README.md` |
| Handle non-core/peripheral task | `spec/secondary-modules-quick-reference.md` | `spec/index.md`, `INDEX.md` |
| Understand project quickly from zero | `spec/index.md` | `INDEX.md`, then domain doc above |

---

## 2) Priority Heuristic

- Start from a **core path** doc for P0/P1 issues.
- Use concise references only when your task is peripheral.
- If blocked, jump to `INDEX.md` for concept lookup.
