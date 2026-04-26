# Frontend Overview — Language, Style & Patterns

> A living cheat-sheet for understanding and modifying the `control-ui/` frontend.

---

## 1. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Lit 3.x (`LitElement`, `@customElement`, `@state`, `@property`, `@query`) |
| Language | TypeScript 5.x (strict-ish, no `any` in production code) |
| Build | Vite 6.x (`vite build` / `vite`) |
| Testing | Vitest (unit) + Playwright (browser E2E) |
| Charts | Chart.js 4.x (`chart.js` + `report-chart.ts` custom element) |
| Markdown | `marked` + `dompurify` |
| i18n | Custom lightweight (`src/i18n/`) — NOT `react-i18next` |

---

## 2. Project Structure

```
control-ui/src/
├── main.ts                  # Entry point — imports styles + app.ts
├── styles.css               # Central CSS import hub (@import chain)
├── styles/
│   ├── base.css             # CSS variables (design tokens), fonts, resets
│   ├── layout.css           # Grid, nav, sidebar layout
│   ├── components.css       # Shared component styles (card, btn, table…)
│   ├── config.css           # Config-form specific styles
│   └── chat.css             # Chat area styles
├── ui/
│   ├── app.ts               # Root LitElement — holds ALL @state
│   ├── app-render.ts        # Main render function — orchestrates all tabs
│   ├── app-render.helpers.ts# Shared render helpers (tab nav, theme toggle…)
│   ├── app-view-state.ts    # AppViewState TYPE definition (no implementation)
│   ├── app-*.ts             # Lifecycle, gateway, chat, channels, settings…
│   ├── controllers/         # Business logic + API calls (DO NOT render)
│   │   ├── admin-data.ts    # Admin data CRUD (login, load, upload…)
│   │   ├── admin-data.types.ts  # AdminDataState, LibraryMeta types
│   │   ├── chat.ts         # Chat history, send, upload file
│   │   ├── reports.ts       # Report list, detail, run task
│   │   └── ... (30+ controllers)
│   ├── views/               # Pure render functions — return html``
│   │   ├── admin-data.ts    # Admin data view (list + detail)
│   │   ├── reports-tab.ts   # Report tab view
│   │   ├── chat.ts         # Chat view
│   │   └── ... (40+ views)
│   ├── report-chart.ts      # Chart.js Web Component (customElement)
│   ├── theme.ts            # ThemeMode / ResolvedTheme types + helpers
│   ├── navigation.ts       # Tab routing, path helpers
│   ├── types.ts            # Shared domain types
│   └── icons.ts            # SVG icon strings
├── i18n/
│   ├── index.ts            # i18n controller, locale loader
│   └── locales/
│       ├── en.ts           # English translations
│       ├── zh-CN.ts        # Simplified Chinese
│       └── ... (pt-BR, zh-TW)
└── infra/
    └── format-time/        # Time formatting utilities
```

**Rule of thumb:**
- `controllers/` = "做什么" (API 调用、状态变换)
- `views/` = "怎么显示" (纯函数，只 return `html`)
- Never mix rendering into controllers

---

## 3. CSS / Styling System

### CSS Variables (Design Tokens)

Defined in `styles/base.css`. Always use variables, never hardcode colors:

```css
/* Always do: */
color: var(--text);
background: var(--card);
border: 1px solid var(--border);

/* Never do: */
color: #e4e4e7;  /* hardcoded */
```

Key variable groups:

| Group | Examples |
|-------|---------|
| Background | `--bg`, `--bg-accent`, `--bg-elevated` |
| Surface | `--card`, `--panel`, `--popover` |
| Text | `--text`, `--text-strong`, `--muted` |
| Border | `--border`, `--border-strong`, `--input` |
| Accent | `--accent` (#ff5c5c punchy red), `--accent-2` (teal) |
| Semantic | `--ok`, `--destructive`, `--warn`, `--info` |
| Focus | `--focus-ring`, `--focus-glow` |

### Inline Styles

Views use inline `style="..."` extensively — this is normal and accepted:

```typescript
html`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">`
html`<div style="font-size:11px;color:var(--text-muted,#888);">`
```

### Shared CSS Classes

For repeating patterns across views, use the classes defined in `styles/components.css`:

| Class | Use for |
|-------|---------|
| `.card` | Card container with hover effect |
| `.card-title` | Card heading |
| `.btn` | Button base |
| `.mono` | Monospace text |
| `.admin-btn`, `.admin-btn--primary`, `.admin-btn--danger` | Admin panel buttons |
| `.admin-table`, `.admin-input` | Admin data tables/inputs |
| `.admin-warn-bar` | Warning banners (upload warnings, schema diff) |
| `.admin-err` | Error text |

### Component-scoped CSS

`report-chart.ts` demonstrates component-scoped styles via `static styles = css\`...\``:

```typescript
@customElement("report-chart")
export class ReportChart extends LitElement {
  static styles = css`
    :host { display: block; }
    .chart-wrap { position: relative; width: 100%; }
  `;
}
```

---

## 4. State Management

### Root State: `app.ts` + `@state()`

All application state lives in `OpenClawApp extends LitElement` using `@state()` decorators:

```typescript
@customElement("openclaw-app")
export class OpenClawApp extends LitElement {
  @state() tab: Tab = "chat";
  @state() chatMessages: unknown[] = [];
  @state() chatLoading = false;
  @state() configValid: boolean | null = null;
  // ... 80+ @state fields
}
```

### Sub-state Pattern (Admin Data)

Admin data has its own isolated state object + `patch()` pattern (not on root):

```typescript
// admin-data.types.ts — defines shape
export type AdminDataState = {
  token: string | null;
  libraries: LibraryMeta[];
  activeLibraryId: number | null;
  // ...
};

// admin-data.ts — initial state factory
export function initialAdminDataState(): AdminDataState { ... }

// admin-data.ts — patch utility
function patch(host: AdminDataHost, partial: Partial<AdminDataState>) {
  host.adminData = { ...host.adminData, ...partial };
}
```

`AdminDataHost` is typed as `{ basePath: string; adminData: AdminDataState }` — implemented by `OpenClawApp` via `app.ts`.

### ViewState Pattern

For complex views (reports, config), `app-view-state.ts` defines a flat `AppViewState` TYPE that mirrors the actual `@state` fields in `app.ts`. Views receive pieces of this state as render params:

```typescript
// ReportsTabParams is a slice of AppViewState for the reports tab
export type ReportsTabParams = {
  reportsLoading: boolean;
  reportsRecords: ReportRecord[];
  selectedRecordId: number | null;
  onSelectRecord: (recordId: number) => void;
  // ...
};
```

### Updating State from Views

Views are pure functions — they never mutate state directly. Instead they call handler callbacks passed as params:

```typescript
// app-render.ts wires state mutations to handlers
onSelectRecord: (recordId) => {
  stopAnalysisPoller();
  void loadReportDetail(state, recordId);
},
```

---

## 5. Component & Rendering Patterns

### Lit Templates

Always import from `lit`:

```typescript
import { html, nothing } from "lit";

// Conditional rendering — use ternary, NOT if/else in template
html`${condition ? html`<div>yes</div>` : nothing}`

// List rendering — use map, NOT forEach
html`${items.map(item => html`<li>${item.name}</li>`)}`

// Keyed list — use repeat directive for stable keys
import { repeat } from "lit/directives/repeat.js";
html`${repeat(items, (item) => item.id, (item) => html`<li>${item.name}</li>`)}`
```

### Pure Render Functions

Views are exported as pure functions that return `TemplateResult`. No side effects, no API calls:

```typescript
// views/admin-data.ts
export function renderAdminData(props: AdminDataViewProps) {
  const s = props.host.adminData;
  if (!s.token) {
    return html`<section class="admin-panel">${renderLogin(props)}</section>`;
  }
  return html`<section class="admin-panel">...</section>`;
}
```

### Custom Elements (Web Components)

Chart component (`report-chart.ts`) demonstrates the full pattern:

```typescript
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("report-chart")
export class ReportChart extends LitElement {
  static styles = css`...`;
  @property({ type: Array }) data: DailyStat[] = [];
  @property({ type: String }) type: "daily" | "customers" = "daily";

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("data")) this._rebuild();
  }

  private _rebuild(): void { /* Chart.js init */ }
}
```

Used in views as: `<report-chart type="daily" .data=${daily}></report-chart>`

### Event Handling in Views

```typescript
// DOM events in Lit templates
html`<button @click=${() => props.onLogin(password)}>登录</button>`

// Custom events from child Web Components (must check bubbles/composed for shadow DOM)
html`<report-chart .data=${daily}
  @chart-bar-click=${(e: CustomEvent<{ date: string }>) => {
    params.onDailyDateClick(e.detail.date);
  }}
></report-chart>`
```

### Confirm / Prompt for Destructive Actions

No modal dialogs. Destructive actions use browser built-ins:

```typescript
// Delete confirmation
if (confirm(`确认删除「${lib.name}」？此操作不可恢复。`)) {
  props.onLibraryDrop(lib.id);
}

// Column rename via prompt
const newName = prompt("新列名：", oldName);
if (newName) props.onRenameColumn(libId, oldName, newName);
```

---

## 6. API / Communication Patterns

### Backend API Calls

All from controllers. Pattern: `fetch` + JSON + auth headers:

```typescript
// Standard pattern
const res = await fetch(apiUrl(host.basePath, "/api/admin/libraries"), {
  headers: { "X-Admin-Token": token, "Content-Type": "application/json" },
});
if (res.status === 401) { adminLogout(host); return; }
if (!res.ok) { patch(host, { error: await res.text() }); return; }
const data = await res.json() as { items: LibraryMeta[] };
patch(host, { libraries: data.items });
```

### Auth Token Pattern

Admin API uses `X-Admin-Token` header. Token stored in `sessionStorage`:

```typescript
sessionStorage.getItem("admin_token");
sessionStorage.setItem("admin_token", token);
sessionStorage.removeItem("admin_token");
```

### URL Building

```typescript
function apiUrl(basePath: string, path: string, params?: Record<string, string | number>): string {
  const prefix = basePath?.trim() ? basePath.replace(/\/$/, "") : "";
  const base = prefix ? `${prefix}${path}` : path;
  if (!params) return base;
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) search.set(k, String(v));
  return `${base}?${search.toString()}`;
}
```

### Gateway (WebSocket)

`GatewayBrowserClient` handles WebSocket communication with the backend agent:

```typescript
const client = new GatewayBrowserClient({
  url: settings.gatewayUrl,
  token: settings.token,
  onHello: (hello) => { state.hello = hello; },
  onEvent: (evt) => { handleGatewayEvent(state, evt); },
});
```

---

## 7. i18n System

Located in `src/i18n/`. Not react-i18next — a custom lightweight solution.

### Translation Usage

```typescript
import { t } from "../i18n/index.ts";

// In templates — returns string (NOT TemplateResult)
html`<div>${t("common.save")}</div>`

// Interpolate with variables
t("agents.reports.metricTotal")  // returns string
```

### Translation Files

`src/i18n/locales/*.ts` — each exports a `TranslationMap`:

```typescript
// locales/zh-CN.ts
export const zh_CN: TranslationMap = {
  common: { save: "保存", cancel: "取消" },
  agents: { reports: { metricTotal: "总销售额" } },
};
```

### I18nController for Reactive Translations

```typescript
import { I18nController } from "../i18n/index.ts";

export class OpenClawApp extends LitElement {
  private i18nController = new I18nController(this);
}
```

---

## 8. TypeScript Conventions

### Type Files

| File | Purpose |
|------|---------|
| `types.ts` | Shared domain types (ReportRecord, CronJob, AgentInfo…) |
| `ui-types.ts` | UI-specific types (ChatQueueItem, CronFormState…) |
| `controllers/*.types.ts` | Isolated state types for sub-features |
| `app-view-state.ts` | Flat state type mirroring `app.ts` @state fields |

### Key Type Patterns

```typescript
// Nullable state — use explicit null, not undefined
chatAvatarUrl: string | null;
compactionStatus: CompactionStatus | null;

// JSON blob — use Record<string, unknown>
configForm: Record<string, unknown> | null;

// Enum-like string unions
type ThemeMode = "system" | "light" | "dark";
type Tab = "chat" | "agents" | "control" | "settings" | "work";

// Discriminated unions
type AnalysisStatus = "pending" | "running" | "done" | "failed" | null | undefined;
```

### Type Safety Rules

- No `as any` in production code (allowed in test mocks)
- Unknown API response → cast via `as SpecificType`
- DOM event targets → cast with `as HTMLInputElement`
- Color prop for Ink components → `as keyof Theme`

---

## 9. Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Files | kebab-case | `admin-data.ts`, `report-chart.ts` |
| Types | PascalCase | `AdminDataState`, `LibraryMeta` |
| Functions | camelCase | `loadLibraryData`, `patchLibraryRow` |
| CSS classes | kebab-case | `.admin-btn`, `.admin-warn-bar` |
| CSS variables | kebab-case | `--text-muted`, `--accent-2` |
| Lit custom elements | kebab-case (in HTML) | `<report-chart>`, `<openclaw-app>` |
| State fields | camelCase | `libraryDataLoading`, `reportsSelectedDailyDate` |
| i18n keys | dot-separated lowercase | `common.save`, `agents.reports.metricTotal` |

---

## 10. Common Patterns Quick Reference

### Adding a New Tab

1. Add `Tab` type in `navigation.ts`
2. Add route in `navigation.ts` (`pathForTab`, `iconForTab`, `titleForTab`)
3. Add `@state()` fields in `app.ts` for tab's data
4. Add render function in `app-render.ts`
5. Create `controllers/xxx.ts` + `views/xxx.ts`
6. Wire in `app-render.ts` (import + call)
7. Add i18n keys in `src/i18n/locales/*.ts`

### Adding Admin API Feature

1. Backend: Add route in `routes_admin.py` + repository function
2. Frontend: Add `AdminDataState` field in `admin-data.types.ts`
3. Add controller function in `admin-data.ts`
4. Add to `AdminDataViewProps` in `admin-data.ts`
5. Call from view via `props.onXxx(...)`
6. Wire from `app-render.ts`

### Adding Chart Feature

1. Component: `@customElement` + `LitElement` + `Chart.js` in `report-chart.ts`
2. Usage: Import in view + `<report-chart .data=${...}></report-chart>`
3. Shadow DOM events: Must use `bubbles: true, composed: true` to cross boundary
4. `report-wow-chart-predict.md` plan has full example (Step 2.1)

---

## 11. Build & Dev

```bash
cd control-ui

bun install
bun run dev          # Vite dev server
bun run build        # Production build (outputs dist/)
bun test             # Vitest unit tests
```

No TypeScript build step — Vite handles it. `tsconfig.json` enforces strict-ish checking.

---

## 12. Admin Panel Specifics

Admin data management lives in a self-contained sub-state (`AdminDataState`) to avoid polluting root `app.ts`. Key files:

- `controllers/admin-data.ts` — all API + state logic
- `controllers/admin-data.types.ts` — type definitions
- `views/admin-data.ts` — pure render functions
- `routes_admin.py` (backend) — REST API endpoints

CRUD operations: login → list → upload → view/edit rows → delete row/library.

The `data_libraries` table drives this — `columns` JSONB field controls what columns the admin UI renders dynamically.

---

*Last reviewed: 2026-04-24 — reflects `control-ui/` as of current main branch.*
