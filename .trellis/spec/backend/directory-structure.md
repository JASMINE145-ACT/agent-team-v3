# Directory Structure

> How backend code is organized in this project.

---

## Overview

**Agent Team version3** is a single-agent, ReAct-loop driven quotation and inventory management system.
The backend provides tools for price matching, inventory lookup, OOS registration, and ERP modification.

---

## Directory Layout

```
backend/
├── core/                    # Pure ReAct engine — no business logic
│   ├── agent.py             # CoreAgent (ReAct loop), session context, tool execution
│   ├── registry.py          # ToolRegistry: tool registration & execution with JSON schema validation
│   ├── extension.py          # AgentExtension abstract base (business logic injection)
│   ├── llm_client.py         # LLM client (OpenAI-compatible, streaming + fallback)
│   ├── context_compression.py # Long context trimming
│   └── compact.py            # Turn compaction for multi-session memory
├── agent/                   # Agent-level: session store, tools aggregation, work executor
│   ├── session.py           # Session, SessionStore — multi-turn context management
│   ├── tools.py             # EXTRA_TOOLS: run_quotation_fill, ask_clarification,
│   │                        #   append_business_knowledge, record_correction_to_knowledge
│   ├── remember.py          # record_correction_to_knowledge: append user corrections
│   │                        #   to wanding_business_knowledge.md
│   ├── executor.py           # WorkExecutor: tool execution with retry and timeout
│   └── memory.py             # SessionMemory for multi-session state
├── tools/                   # Tool implementations (inventory, quotation, OOS, WeCom)
│   ├── inventory/
│   │   ├── config.py        # InventoryConfig: API endpoints, path configs, env vars
│   │   ├── services/
│   │   │   ├── inventory_agent_tools.py  # _execute_match_quotation, search_inventory, etc.
│   │   │   ├── match_and_inventory.py   # match_quotation_union, match_price_and_get_inventory
│   │   │   ├── llm_selector.py           # llm_select_best, _load_relevant_corrections
│   │   │   ├── wand_mapping.py           # WandCodeMapper: item no → item id
│   │   │   └── wand_api.py              # WandAPI: price library search, history search
│   │   ├── handlers/
│   │   │   └── inventory_tools_handler.py  # Tool handlers wiring to ExtensionContext
│   │   └── .env
│   ├── quotation/
│   │   ├── spec_extract.py   # extract_spec_from_quote_name
│   │   ├── handler.py         # Tool handlers for quotation tools
│   │   └── .env
│   ├── oos/
│   │   ├── handler.py         # Tool handlers for OOS tools
│   │   ├── register.py         # register_oos_from_text
│   │   └── .env
│   └── wecom_bot/
│       └── ...
├── server/
│   └── api/
│       └── app.py             # FastAPI app
└── plugins/
    └── jagent/
        └── skills.py           # SKILL_KNOWLEDGE_DOC, SKILL_KNOWLEDGE_RULES
                                # — business knowledge prompts for LLM selection
```

---

## Module Organization

### `core/` — Pure Infrastructure
- **No business logic here**
- `CoreAgent` runs the ReAct loop: LLM → tool_calls → execute → observe → repeat
- `ToolRegistry` is the single entry point for all tool execution
- `AgentExtension` is the interface for adding business-logic tools

### `agent/` — Agent-Level State & Tools
- `SessionStore` persists multi-turn conversation context to `data/sessions/`
- `EXTRA_TOOLS` registers cross-cutting tools (quotation fill, clarification, knowledge recording)
- `record_correction_to_knowledge` writes confirmed user selections to `wanding_business_knowledge.md`

### `tools/inventory/` — Core Business Logic
- `match_quotation` = parallel search (history + wanding fuzzy) + **auto LLM selection**
  - Single candidate → fast return
  - Multiple candidates → `llm_select_best` automatically
  - LLM uncertain → `needs_human_choice` returned to agent
- `llm_select_best` uses `wanding_business_knowledge.md` (business rules + few-shot corrections)
- `InventoryConfig` reads env vars: `PRICE_LIBRARY_PATH`, `MAPPING_TABLE_PATH`, `WANDING_BUSINESS_KNOWLEDGE_PATH`

### `tools/quotation/` — Excel & Price Tools
- `extract_spec_from_quote_name`: parse product name → spec string (PVC-U, dn50, etc.)
- `run_quotation_fill`: full pipeline (extract → match → inventory check → fill Excel)

---

## Naming Conventions

| Pattern | Example | Meaning |
|---------|---------|---------|
| `_execute_<action>` | `_execute_match_quotation` | Tool implementation function |
| `_detect_<intent>` | `_detect_rework_intent` | Intent detection helper |
| `_load_<resource>` | `_load_relevant_corrections` | Resource loading helper |
| `pending_human_choice` | session.pending_human_choice | Session field for rework candidates |
| `needs_human_choice` | tool result flag | Signal that agent needs user input |

---

## Key Design Patterns

### Rework Flow (Human-in-the-Loop Correction)
1. User says "错了" / "不对" → `_detect_rework_intent()` returns True
2. CoreAgent sees `session.pending_human_choice` exists → injects `_build_rework_injection()` into prompt
3. User confirms correct option → agent calls `record_correction_to_knowledge`
4. Correction appended to `wanding_business_knowledge.md` as few-shot example
5. Future similar queries → LLM prompt includes relevant correction examples

### Tool Registration
```
AgentExtension.register(ctx)
  → ctx.register_tool(definition, handler)
  → ToolRegistry.register(definition, handler)
  → CoreAgent builds system prompt from all extensions' SKILL_KNOWLEDGE_DOC
```

### Business Knowledge Injection
`llm_select_best` prompt = `llm_selector.py` hardcoded rules + `wanding_business_knowledge.md` content + few-shot corrections from `_load_relevant_corrections`

---

## Examples

- Well-organized tool: `backend/tools/inventory/services/inventory_agent_tools.py`
- Session persistence: `backend/agent/session.py` (SessionStore)
- LLM selection: `backend/tools/inventory/services/llm_selector.py`
- Rework integration: `backend/core/agent.py` (`_detect_rework_intent`, `_build_rework_injection`)
