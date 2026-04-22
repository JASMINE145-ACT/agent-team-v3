# Frontend Development Guidelines

> Best practices for frontend development in Agent Team version3.

---

## Overview

**Frontend**: `control-ui/` — A Lit Web Components based admin control panel.

| Attribute | Value |
|-----------|-------|
| Framework | Lit 3.x (Web Components) |
| Language | TypeScript 5.x |
| Build Tool | Vite 6.x |
| Testing | Vitest + Playwright |
| Styling | Plain CSS (CSS Modules style with separate `.css` files) |
| State | Component-level `@state()` with controller pattern |
| i18n | Custom lightweight i18n (`src/i18n/`) |

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | Module organization and file layout | ✅ Filled |
| [Pages / Tabs](./pages.md) | All 16 tabs: routes, Chinese names, view/controller files | ✅ Filled |
| [Component Guidelines](./component-guidelines.md) | Web Component patterns, `@state`, lifecycle | ✅ Filled |
| [Type Safety](./type-safety.md) | TypeScript conventions, type definitions | ✅ Filled |
| [i18n Guidelines](./i18n-guidelines.md) | Translation system, locale files | ✅ Filled |
| [Testing Guidelines](./testing-guidelines.md) | Vitest + Playwright patterns | ✅ Filled |

---

## Key Architecture Points

### Lit Web Components

All UI components extend `LitElement` with `@customElement` and `@state` decorators:

```typescript
import { LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("openclaw-app")
export class OpenClawApp extends LitElement {
  @state() settings: UiSettings = loadSettings();
  @state() tab: Tab = "chat";
}
```

### Controller Pattern

Business logic is extracted into **controllers** under `ui/controllers/`:

```
src/ui/
├── controllers/
│   ├── chat.ts        # Chat handling logic
│   ├── agents.ts     # Agent management
│   ├── procurement.ts # Procurement workflow
│   ├── oos.ts        # OOS dashboard
│   ├── admin-data.ts  # Price library / product mapping
│   └── ...
├── views/            # View/render functions (pure, return HTML)
│   ├── chat.ts / overview.ts / oos-dashboard.ts
│   ├── business-knowledge.ts / work.ts / cron.ts
│   └── ...
├── app.ts           # Main application shell
```

**All 16 tabs are documented in [Pages / Tabs](./pages.md)** — includes route, Chinese name, and exact file paths for each page.

### Gateway Communication

WebSocket-based communication via `GatewayBrowserClient`:

```typescript
const client = new GatewayBrowserClient({
  url: host.settings.gatewayUrl,
  token: host.settings.token,
  onHello: (hello) => { /* connection established */ },
  onEvent: (evt) => { handleGatewayEvent(host, evt); },
});
```

---

## Language

All documentation is in **English**. Code comments may use Chinese for domain-specific terms.
