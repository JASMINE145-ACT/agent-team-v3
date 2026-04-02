# Testing Guidelines

## Overview

Frontend testing uses **Vitest** for unit/integration tests and **Playwright** for E2E browser tests.

---

## Test Structure

```
control-ui/src/
├── ui/
│   ├── controllers/
│   │   ├── chat.ts
│   │   └── chat.test.ts      # Controller tests
│   ├── views/
│   │   └── usage-render-details.test.ts
│   └── app.test.ts
```

### Test File Naming

| Pattern | Example |
|---------|---------|
| Controller tests | `controllers/chat.test.ts` |
| View tests | `views/usage-render-details.test.ts` |
| Component tests | `app.test.ts` |

---

## Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

---

## Writing Tests

### Controller Tests

```typescript
// controllers/chat.test.ts
import { describe, it, expect, vi } from "vitest";
import { loadChatHistory } from "./chat.ts";

describe("loadChatHistory", () => {
  it("should load chat messages", async () => {
    const mockClient = {
      request: vi.fn().mockResolvedValue({
        messages: [{ role: "user", content: "Hello" }],
      }),
    };

    const state = {
      client: mockClient as any,
      connected: true,
      sessionKey: "test-session",
      chatLoading: false,
      chatMessages: [],
      lastError: null,
    };

    await loadChatHistory(state);

    expect(state.chatMessages).toHaveLength(1);
    expect(state.lastError).toBeNull();
  });
});
```

### State Type Tests

```typescript
// Test state immutability
it("should not mutate original state on error", async () => {
  const originalMessages = [...state.chatMessages];
  await loadChatHistory(state);
  expect(state.chatMessages).not.toEqual(originalMessages);
});
```

---

## Playwright E2E Tests

```typescript
// e2e/app.test.ts
import { test, expect } from "@playwright/test";

test("app connects to gateway", async ({ page }) => {
  await page.goto("/");
  // Wait for connection indicator
  await expect(page.locator(".connection-status")).toBeVisible();
});
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/ui/controllers/chat.test.ts

# Run E2E tests
npx playwright test
```

---

## Anti-Patterns

❌ **Don't** test implementation details — test behavior

❌ **Don't** use `any` in test assertions — use proper types

❌ **Don't** write tests that depend on timing (use `waitFor` instead)

❌ **Don't** forget to cleanup state between tests
