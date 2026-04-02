# i18n Guidelines

## Overview

The frontend uses a custom lightweight i18n system in `src/i18n/`. It supports:
- English (`en`)
- Simplified Chinese (`zh-CN`)
- Traditional Chinese (`zh-TW`)
- Portuguese Brazil (`pt-BR`)

---

## File Structure

```
src/i18n/
├── lib/
│   ├── translate.ts   # I18nManager class
│   └── types.ts      # Locale, TranslationMap types
└── locales/
    ├── en.ts
    ├── zh-CN.ts
    ├── zh-TW.ts
    └── pt-BR.ts
```

---

## Translation Files

Each locale file exports a `TranslationMap`:

```typescript
// locales/en.ts
export const en = {
  app: {
    title: "OpenClaw Control UI",
    loading: "Loading...",
  },
  chat: {
    placeholder: "Type a message...",
    send: "Send",
  },
  tabs: {
    chat: "Chat",
    agents: "Agents",
    usage: "Usage",
  },
} as const;
```

---

## Usage in Components

### Basic Translation

```typescript
import { i18n, t } from "../i18n/index.ts";

// In a Lit controller
const message = t("chat.placeholder");

// With parameters
const greeting = t("app.greeting", { name: "Alice" });
// "Hello, Alice" (if key is "Hello, {name}")
```

### In Templates

```typescript
import { html } from "lit";
import { I18nController } from "../i18n/index.ts";

class MyComponent extends LitElement {
  private i18n = new I18nController(this);

  render() {
    return html`<span>${this.i18n.t("app.title")}</span>`;
  }
}
```

---

## I18nController

For Lit components, use `I18nController` to subscribe to locale changes:

```typescript
import { I18nController } from "../i18n/index.ts";

@customElement("my-component")
export class MyComponent extends LitElement {
  // Subscribes to i18n changes, triggers re-render on locale change
  private i18n = new I18nController(this);
}
```

---

## Adding New Keys

1. Add the key to `en.ts` (source of truth):
```typescript
export const en = {
  // ...
  newFeature: {
    title: "New Feature",
    description: "This is a new feature",
  },
} as const;
```

2. Add to all other locale files with translations

3. Use dot notation to access:
```typescript
t("newFeature.title")  // "New Feature"
```

---

## Key Naming Convention

Use dot notation with category prefix:

| Pattern | Example | Description |
|---------|---------|-------------|
| `{category}.{action}` | `chat.send` | Chat actions |
| `{category}.{noun}` | `tabs.agents` | Tab labels |
| `{category}.{status}` | `status.loading` | Status messages |

---

## Fallback Behavior

The i18n system automatically falls back to English when:
- A key is missing in the current locale
- The current locale is not supported

**Supported locales** (from `translate.ts`):
```typescript
export const SUPPORTED_LOCALES: ReadonlyArray<Locale> = ["en", "zh-CN"];
```

Note: `zh-TW` and `pt-BR` exist in the codebase but are loaded lazily.

---

## Anti-Patterns

❌ **Don't** hardcode strings in templates:
```typescript
// ❌ Bad
html`<span>Hello</span>`

// ✅ Good
html`<span>${t("greeting.hello")}</span>`
```

❌ **Don't** use `i18n.t()` in class property initializers — locale may not be ready.

❌ **Don't** mix i18n keys with business logic — keep translations pure.
