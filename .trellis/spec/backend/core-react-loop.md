# Core ReAct Loop

> Core runtime path (P0).  
> Scope: how `CoreAgent` orchestrates thinking, tool calls, and stop conditions.

---

## 1) Purpose

`CoreAgent` is the central execution engine of this project.
It runs a single-agent ReAct loop that:
- reads conversation context
- decides next action
- invokes tools
- integrates observations
- exits with final answer or loop stop condition

---

## 2) High-Level Loop

1. Build system/user context for current turn.
2. Call model with tool schema and reasoning settings.
3. Parse model output into:
   - visible content
   - thinking/reasoning parts
   - tool calls
4. Execute tool calls via registry/extension.
5. Append observations back into loop context.
6. Evaluate stop conditions (explicit final answer or extension hook decision).
7. Persist turn history (including reasoning when enabled).

---

## 3) Hook and Extension Boundaries

`AgentExtension` hooks are used to keep business logic out of core:
- augment user content before loop
- normalize tool args before execution
- run side-effects after tool completion
- determine early-stop conditions

This keeps `core/` reusable and business behavior in plugin/tool layers.

---

## 4) Critical Contracts

- Core loop must remain business-agnostic.
- Tool execution must be routed through registered definitions/handlers.
- History persistence must preserve enough context for replay and debugging.
- Rework/correction flow should be extension-driven, not hardcoded in core loop.

---

## 5) Failure Modes

- malformed tool arguments -> structured tool error, no hard crash
- model response without usable content/tool call -> safe retry or controlled fallback
- long loops without convergence -> stop guard and snapshot trace
- protocol mismatch (OpenAI/Anthropic path) -> route by configured protocol

---

## 6) Related Docs

- `index.md`
- `skills-system.md`
- `tools-catalog.md`
- `../tech-framework-guidelines.md`
