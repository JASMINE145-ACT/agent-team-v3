# Frontend Directory Structure

## Overview

```
control-ui/
├── src/
│   ├── main.ts              # Entry point
│   ├── styles.css           # Global styles
│   ├── gateway/             # Gateway/WebSocket client
│   │   ├── protocol/       # Protocol types
│   │   ├── control-ui-contract.ts
│   │   └── device-auth.ts
│   ├── i18n/                # Internationalization
│   │   ├── lib/
│   │   │   ├── translate.ts    # I18n manager (class-based)
│   │   │   └── types.ts
│   │   └── locales/
│   │       ├── en.ts
│   │       ├── zh-CN.ts
│   │       ├── zh-TW.ts
│   │       └── pt-BR.ts
│   ├── infra/                # Infrastructure utilities
│   │   └── format-time/     # Time formatting
│   ├── routing/              # Session/route management
│   ├── shared/               # Shared utilities
│   │   ├── chat-envelope.ts
│   │   ├── device-auth.ts
│   │   └── usage-aggregates.ts
│   ├── agents/               # Agent-related utilities
│   │   ├── tool-display-common.ts
│   │   └── tool-policy.ts
│   └── ui/                   # Main UI layer
│       ├── app.ts            # Root component (OpenClawApp)
│       ├── app-*.ts          # App-level handlers (lifecycle, gateway, scroll, etc.)
│       ├── controllers/        # Business logic controllers
│       │   ├── chat.ts
│       │   ├── agents.ts
│       │   ├── procurement.ts
│       │   ├── fulfillment.ts
│       │   ├── admin-data.ts    # 数据管理（含自定义库 + 业务知识子模块）
│       │   ├── skills.ts
│       │   ├── sessions.ts
│       │   └── ...
│       ├── views/             # Pure render functions (return HTML)
│       │   ├── chat.ts
│       │   ├── agents.ts
│       │   ├── usage.ts
│       │   └── ...
│       ├── types.ts           # Shared TypeScript types
│       ├── ui-types.ts        # UI-specific types
│       ├── navigation.ts      # Tab/route definitions
│       ├── storage.ts         # LocalStorage settings
│       └── theme.ts           # Theme handling
├── public/                   # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Key Patterns

### File Naming Conventions

| Pattern | Example | Purpose |
|---------|---------|---------|
| `app-*.ts` | `app-gateway.ts`, `app-lifecycle.ts` | App-level concerns |
| `controllers/*.ts` | `controllers/chat.ts` | Business logic |
| `views/*.ts` | `views/chat.ts` | Render functions only |
| `*.test.ts` | `chat.test.ts` | Test files |

### Component Structure

```
ui/
├── app.ts           # Main LitElement with ALL @state
├── controllers/    # Extracted from app.ts for maintainability
└── views/          # Pure functions: (state) => TemplateResult
```

**Rule**: `app.ts` holds all state. Controllers modify state. Views only render.

### Gateway Pattern

```
gateway/
├── protocol/client-info.ts   # Client identification
├── control-ui-contract.ts   # API contract types
└── device-auth.ts           # Authentication
```

Gateway is used by `app-gateway.ts` to establish WebSocket connection.
