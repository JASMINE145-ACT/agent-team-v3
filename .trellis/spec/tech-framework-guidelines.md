# Technical Framework Guidelines

> Development baseline for Agent Team version3.
> Use this as a dependency guideline before implementing features.

---

## 1) Technology Stack

### Backend
- Python 3.10+
- FastAPI + Uvicorn
- Pydantic v2
- SQLAlchemy + asyncpg/psycopg2
- OpenAI-compatible SDK + Anthropic SDK (protocol-routed)
- APScheduler, pandas/openpyxl for reports and Excel flows

### Frontend
- Lit 3.x + TypeScript 5.x
- Vite 6.x
- Vitest + Playwright
- Custom lightweight i18n

### Data/Integration
- Neon Postgres (preferred) with SQLite fallback
- Accurate API integration
- WeCom callback/bot integration

---

## 2) Architecture Rules (Must Keep)

1. **Single-agent ReAct architecture**
   - `CoreAgent` is the central orchestration loop.
   - Do not introduce multi-agent orchestration into runtime business paths.

2. **Core vs business separation**
   - `backend/core`: infrastructure and generic engine behavior.
   - `backend/plugins` + `backend/tools`: business-specific logic.

3. **Behavior source of truth**
   - Agent behavior prompts/rules are owned by `backend/plugins/jagent/skills.py`.
   - Avoid behavior changes only in ad-hoc prompt strings elsewhere.

4. **Deterministic rules before LLM judgment**
   - Stable, signal-based ranking logic belongs in code.
   - Semantic/ambiguous judgment belongs in knowledge docs + LLM.

---

## 3) Module Priority for Future Development

### High Priority (detailed design required)
- Quotation/inventory selection pipeline
- Chat ReAct tool orchestration
- Work pipeline stream execution
- OOS/shortage registration and persistence

### Medium Priority (incremental and concise)
- Reports analytics and cron flow
- Admin data operations
- Frontend tab-level UX improvements

### Low Priority (quick-reference updates)
- Cosmetic UI adjustments
- Minor i18n wording changes
- Non-critical logging refinements

---

## 4) Implementation Guardrails

- Prefer extending existing hooks and tool contracts over parallel new paths.
- Keep API contracts backward compatible; add fields instead of breaking existing ones.
- Maintain fallback behavior for LLM failures.
- Ensure observability (structured logs + test evidence) for core-flow changes.

---

## 5) Testing Baseline

- Core-flow changes require focused tests in related backend modules.
- Selector/ranking changes require deterministic test cases.
- Keep a lightweight non-live regression command available for broad confidence.

---

## 6) Recommended Read Order for New Contributors

1. `spec/index.md`
2. `spec/backend/index.md`
3. `spec/frontend/index.md`
4. `INDEX.md`
