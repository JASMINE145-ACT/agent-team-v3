# Backend Development Guidelines

> Best practices for backend development in Agent Team version3.

---

## Overview

Agent Team version3 is a **single-agent ReAct system** providing quotation, inventory lookup, OOS registration, and ERP modification tools.
The backend is organized into `core/` (pure infrastructure) and `tools/` (business logic).

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | Module organization and file layout | ✅ Filled |
| [Error Handling](./error-handling.md) | Tool error categories, result shapes, rework flow | ✅ Filled |
| [Quality Guidelines](./quality-guidelines.md) | Required shapes, forbidden patterns, logging, testing | ✅ Filled |
| [Logging Guidelines](./logging-guidelines.md) | Structured logging, log levels | To fill |
| [Database Guidelines](./database-guidelines.md) | Session persistence, JSON file storage | To fill |

---

## Key Architecture Points

### Single-Agent ReAct Loop
All tools are exposed through a single `CoreAgent` ReAct loop. No multi-agent orchestration in this project.

### Auto LLM Selection
`match_quotation` automatically calls `llm_select_best` when multiple candidates exist.
- Confident → `single` result returned directly
- Uncertain → `needs_human_choice` with options list
- No match → `unmatched`

### Rework Mechanism
User says "错了"/"不对" → agent detects rework intent → presents candidates → user confirms → `record_correction_to_knowledge` writes to knowledge base.

### Tools via AgentExtension
Business tools register via `AgentExtension.register(ctx)` → `ctx.register_tool(definition, handler)`.
Skills layer (`plugins/jagent/skills.py`) provides `SKILL_KNOWLEDGE_DOC` and `SKILL_KNOWLEDGE_RULES` for LLM guidance.

---

## Language

All documentation is in **English**. Code comments may use Chinese for domain-specific terms.
