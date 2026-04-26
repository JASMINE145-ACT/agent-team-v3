# Type Safety Guidelines

## Overview

The frontend uses **TypeScript 5.x** with strict typing. All types are defined in `src/ui/types.ts` and `src/ui/ui-types.ts`.

---

## Type Definition Files

### `src/ui/types.ts`

Domain types shared across the application:

```typescript
// Session types
export type GatewaySessionRow = {
  key: string;
  kind: "direct" | "group" | "global" | "unknown";
  updatedAt: number | null;
  // ...
};

// Usage types
export type OosStats = {
  total_records: number;
  out_of_stock_count: number;
  // ...
};
```

### `src/ui/ui-types.ts`

UI-specific types (attachments, drafts, etc.):

```typescript
export type ChatAttachment = {
  name: string;
  size: number;
  type: string;
  url: string;
};

export type ChatQueueItem = {
  id: string;
  message: string;
  attachments: ChatAttachment[];
  // ...
};
```

---

## Type Conventions

### Naming

| Convention | Example |
|------------|---------|
| Type aliases | `GatewaySessionRow`, `OosStats` |
| Interface | `ChannelAccountSnapshot` |
| Event payloads | `ChatEventPayload`, `AgentEventPayload` |
| State types | `ChatState`, `GatewayHost` |

### Import Pattern

```typescript
// Import types only (no runtime values)
import type { OosStats, OosRecord } from "./types.ts";

// Import with runtime values
import { loadOosStats } from "./controllers/oos.ts";
```

### Avoid `any`

Use `unknown` for truly unknown types, then narrow:

```typescript
// ❌ Bad
function handleEvent(data: any) {
  console.log(data.message);
}

// ✅ Good
function handleEvent(data: unknown) {
  if (typeof data === "object" && data !== null && "message" in data) {
    console.log((data as { message: string }).message);
  }
}
```

---

## API Contract Types

Gateway API responses are typed:

```typescript
// Request
await client.request<{ messages?: Array<unknown> }>("chat.history", {
  sessionKey: state.sessionKey,
  limit: 200,
});

// Response type
type ChatHistoryResponse = {
  messages?: Array<unknown>;
  thinkingLevel?: string;
};
```

---

## State Types

Controllers define their state interfaces:

```typescript
// controllers/chat.ts
export type ChatState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  sessionKey: string;
  chatLoading: boolean;
  chatMessages: unknown[];
  // ...
};
```

The main app (`app.ts`) implements all state interfaces using `@state()` decorators.

---

## Null Handling

Use optional chaining and nullish coalescing:

```typescript
// Optional chaining
const name = user?.profile?.name;

// Nullish coalescing
const displayName = name ?? "Anonymous";

// Default value in render
html`<span>${user?.name ?? "Guest"}</span>`
```

---

## Type Testing

Test types implicitly through component tests:

```typescript
// controllers/chat.test.ts
async function testLoadChatHistory() {
  const mockState: ChatState = {
    client: mockClient,
    connected: true,
    sessionKey: "test-session",
    chatLoading: false,
    chatMessages: [],
    // ...
  };

  await loadChatHistory(mockState);
  expect(mockState.chatMessages).toHaveLength(5);
}
```
