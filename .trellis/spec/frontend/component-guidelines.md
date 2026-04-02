# Component Guidelines

## Lit Web Components Pattern

### Component Structure

```typescript
import { LitElement, html } from "lit";
import { customElement, state, property } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  // Reactive state - changes trigger re-render
  @state() private counter = 0;

  // Properties - external inputs
  @property({ type: String }) name = "";
  @property({ type: Number }) value = 0;

  // Called when element is added to DOM
  connectedCallback() {
    super.connectedCallback();
    // Setup logic here
  }

  // Called when element is removed from DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    // Cleanup logic here
  }

  // Main render method (must be defined)
  render() {
    return html`
      <div class="container">
        <span>${this.name}: ${this.counter}</span>
        <button @click=${this._increment}>+</button>
      </div>
    `;
  }

  private _increment() {
    this.counter++;
  }
}
```

### State Management

**Rule**: All application state lives in `app.ts` (OpenClawApp). Child components receive data via properties and emit events upward.

```typescript
// Parent passes data down
<child-component
  .data=${this.myData}
  @child-event=${this._handleChildEvent}
></child-component>
```

### Controller Pattern

Extract business logic into controllers to keep components clean:

```
src/ui/
├── app.ts           # Holds all @state, orchestrates
├── controllers/     # Business logic
│   ├── chat.ts
│   ├── agents.ts
│   └── procurement.ts
└── views/          # Render-only functions
    ├── chat.ts
    └── agents.ts
```

**Example Controller** (`controllers/chat.ts`):

```typescript
export type ChatState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  chatMessages: unknown[];
  // ...
};

export async function loadChatHistory(state: ChatState) {
  if (!state.client || !state.connected) return;
  state.chatLoading = true;
  try {
    const res = await state.client.request("chat.history", { sessionKey: state.sessionKey });
    state.chatMessages = res.messages ?? [];
  } finally {
    state.chatLoading = false;
  }
}
```

### Event Handling

Use `@` in templates for event binding:

```typescript
// In render()
html`<button @click=${this._handleClick}>Click</button>`

// Handler
private _handleClick(e: Event) {
  const target = e.target as HTMLButtonElement;
  // ...
}
```

### CSS Guidelines

Use separate CSS files, imported in the component:

```typescript
import styles from "./my-component.css?inline";

@customElement("my-component")
export class MyComponent extends LitElement {
  static styles = styles;
  // ...
}
```

CSS variables for theming:

```css
.container {
  background: var(--bg-color, #ffffff);
  color: var(--text-color, #333);
}
```

### Lifecycle

| Lifecycle Method | Purpose |
|-----------------|---------|
| `connectedCallback()` | Setup when added to DOM |
| `disconnectedCallback()` | Cleanup when removed |
| `firstUpdated()` | One-time init after first render |
| `updated(changed)` | React to property/state changes |

---

## Anti-Patterns

❌ **Don't** put business logic in render methods

❌ **Don't** use `window.location` directly — use `navigation.ts`

❌ **Don't** fetch data in render — use lifecycle methods

❌ **Don't** use `any` types — use proper TypeScript interfaces
