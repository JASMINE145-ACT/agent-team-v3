# Index Maintenance Rules

> Keep Trellis high-signal over time.

---

## 1) Core vs Secondary Rule

- New docs that affect P0/P1 runtime paths must be linked in `spec/index.md` under **Core Features (Detailed)**.
- Secondary or peripheral docs should stay in concise reference sections.

---

## 2) Link Update Rule

When adding a new spec file, update at least:

1. `spec/index.md`
2. `INDEX.md`
3. Relevant domain index (`spec/backend/index.md` or `spec/frontend/index.md`)

---

## 3) Length Discipline

- Core docs: include purpose, entry points, control flow, failure modes.
- Secondary docs: keep to short reference style with links back to core docs.
- Avoid duplicating deterministic logic details across multiple docs.

---

## 4) Agent Onboarding Promise

Any new agent should be able to:
- find architecture baseline in under 1 minute
- find task-specific path in under 3 minutes
- identify core business flows in under 10 minutes

If this is not true, adjust indexes before adding more content.
