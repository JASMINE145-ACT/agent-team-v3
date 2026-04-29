# Frontend Core Interaction Flow

> Core UI path for agent onboarding.  
> Focus: how user actions become backend calls and rendered results.

---

## 1) Purpose

Describe the minimal end-to-end chain in `control-ui`:
- input from tab/view
- controller/state transition
- gateway/API call
- stream/render update

This is the fastest entry point for UI-related debugging.

---

## 2) Core Runtime Topology

1. `ui/app.ts` holds global reactive state (`@state`).
2. `ui/app-render.ts` routes current `tab` to corresponding view renderer.
3. `ui/views/*.ts` renders UI and forwards actions to handlers.
4. `ui/controllers/*.ts` handles business logic and async calls.
5. `gateway` / HTTP clients talk to backend and return payload/events.
6. state updates trigger Lit re-render.

---

## 3) High-Value Interaction Chains

### A) Chat chain (P0)
1. user sends text in `views/chat.ts`
2. handler in app/controller sends request through gateway
3. backend streams events (`token`, `tool_render`, `tool_result`, etc.)
4. stream handlers in UI update message/tool-render state
5. chat timeline re-renders with final structured result

### B) Work chain (P1)
1. user triggers work run in `views/work.ts`
2. work endpoint executes run/stream pipeline
3. UI receives progress/status updates
4. pending-choice states are surfaced for user confirmation
5. resume flow continues until completion

### C) OOS dashboard chain (P1)
1. user enters `instances`/OOS tab
2. controller loads list/stats via OOS APIs
3. state updates drive dashboard render
4. add/delete actions call API and refresh local state

---

## 4) Contracts to Protect

- `app.ts` remains single source of UI state truth.
- views stay render-focused; controllers own side effects.
- gateway/stream payload shapes remain backward compatible.
- chat ordering must preserve chronology under tool-render scenarios.

---

## 5) Related Docs

- `index.md`
- `pages.md`
- `component-guidelines.md`
- `testing-guidelines.md`
