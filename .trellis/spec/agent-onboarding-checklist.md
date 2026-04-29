# Agent Onboarding Checklist (15 min)

> Operational checklist for a new agent session.
> Goal: move from zero context to safe implementation quickly.

---

## Phase 1: Project Orientation (3 min)

- [ ] Read `spec/index.md`
- [ ] Read `spec/tech-framework-guidelines.md`
- [ ] Read `INDEX.md`

Expected outcome:
- know architecture boundaries
- know where core docs are

---

## Phase 2: Runtime Core (5 min)

- [ ] Read `spec/backend/core-react-loop.md`
- [ ] Read `spec/frontend/core-interaction-flow.md`

Expected outcome:
- understand request -> tool -> render critical path

---

## Phase 3: Domain Focus (5 min)

Pick by task:

- quotation/inventory: `spec/backend/quotation-inventory-flow.md`
- work pipeline: `spec/backend/work-pipeline-core.md`
- OOS shortage: `spec/backend/oos-shortage-lifecycle.md`
- fast task routing: `spec/agent-fast-path.md`

Expected outcome:
- identify exact module ownership for current task

---

## Phase 4: Safety Check (2 min)

- [ ] Confirm where deterministic rules live (code-tier) vs semantic rules (doc/LLM-tier)
- [ ] Confirm target files through domain index (`spec/backend/index.md` or `spec/frontend/index.md`)
- [ ] Confirm test/verification scope before edits

Expected outcome:
- avoid cross-layer regressions and doc/code duplication
