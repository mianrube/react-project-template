# AGENT.md — AI Contextual Repository Instructions (Final)

This repository follows the **AI Contextual Repository Pattern**.  
It is designed so AI development agents (such as GitHub Copilot, ChatGPT, or similar tools) can safely understand, extend, and maintain the application with minimal ambiguity.

All **technical code, naming, comments, and internal documentation must be written in English**.

---

# 1. Mission

Your mission as an AI agent is to help develop and maintain this application while preserving:

- architecture consistency
- feature boundaries
- strict typing
- UI consistency
- i18n conventions
- predictable state management
- reusable patterns
- folder-level contextual documentation through `_ABOUT.md`

You must act as a disciplined software engineer, not as a code generator that places files arbitrarily.

---

# 2. Core Technology Stack

Always assume this project uses:

- React 19
- Vite
- TypeScript
- React Router 7
- Material UI
- MUI X DataGrid
- MUI X Date Pickers
- MUI Icons
- Redux Toolkit
- RTK Query
- Redux Persist
- MSAL
- SignalR
- i18next
- dayjs
- UUID
- Markdown rendering with sanitization

---

# 3. Global Development Rules

## 3.1 Language Rules

All technical artifacts must be written in English:

- variables
- functions
- components
- types
- interfaces
- enums
- comments
- filenames
- folder names
- `_ABOUT.md` documentation
- this `AGENT.md`

Spanish may only appear in product copy or user-facing content when explicitly required.

---

## 3.2 Export Rules

Use **named exports** by default.

Preferred:

```ts
export const HomePage = () => { ... };
```

Avoid default exports unless there is a strong and explicit reason.

---

## 3.3 Component Declaration Style

Use functional components declared as constants:

```ts
export const MyComponent = () => { ... };
```

Do not use `export function MyComponent()` unless explicitly required.

---

## 3.4 Hook Naming

Hooks must:

- start with `use`
- use camelCase
- be placed in `shared/hooks` if reusable
- be placed in `features/<feature>/hooks` if feature-specific

---

# 4. Architecture Overview

Top-level frontend structure:

```txt
src/
  app/
  shared/
  features/
  store/
  assets/
```

Additional top-level folder:

```txt
pipelines/
```

---

# 5. Folder Responsibilities

## 5.1 `src/app`

Application composition layer.

Responsibilities:

- app bootstrap
- providers composition
- runtime cross-cutting behavior
- routing integration

Do NOT place:

- feature business logic
- feature state
- domain-specific components

---

## 5.2 `src/shared`

Reusable, domain-agnostic code.

Examples:

- generic UI components
- reusable hooks
- auth helpers
- config
- error normalization
- realtime infrastructure
- i18n setup

Do NOT place:

- feature-specific domain logic
- page-specific state
- domain-specific streaming handlers

---

## 5.3 `src/features`

Business domains.

Each feature should be self-contained.

Typical feature structure:

```txt
features/<feature>/
  api/
  components/
  hooks/
  model/
  pages/
  realtime/
  store/
  index.ts
  _ABOUT.md
```

Feature rules:

- pages stay in `pages/`
- domain-specific components stay in `components/`
- feature state stays in `store/`
- RTK Query endpoints stay in `api/`
- session-based SignalR logic stays in `realtime/`

Do NOT create direct dependencies between unrelated features.

---

## 5.4 `src/store`

Global Redux infrastructure.

Responsibilities:

- store configuration
- root reducer
- persist helpers
- typed hooks
- base RTK Query API

Do NOT place:

- business logic
- UI-specific components
- feature-specific state definitions (except root registration)

---

## 5.5 `pipelines`

Azure DevOps deployment infrastructure.

Responsibilities:

- pipeline entry YAML
- reusable templates
- environment generation from `.env.template`

Do NOT place application code here.

---

# 6. Barrels (`index.ts`) Rules

Use barrels intentionally.

## 6.1 Must Use Barrels For

- public APIs of modules
- shared folders
- features
- store submodules
- app providers
- reusable component folders when that component is part of a stable shared API

## 6.2 Avoid Unnecessary Barrels For

- trivial local-only folders
- single-file feature internals that are not reused
- folders where a barrel would hide important structure without benefit

## 6.3 AI Rule

Whenever an existing barrel can simplify imports, use it and prefer the barrel import.

Example:

```ts
import { LanguageSwitcher } from '@shared/components';
```

instead of:

```ts
import { LanguageSwitcher } from '@shared/components/language-switcher/LanguageSwitcher';
```

---

# 7. `_ABOUT.md` Rules

## 7.1 Purpose

Each `_ABOUT.md` explains the architectural purpose of a folder.

It exists to help humans and AI agents understand:

- what belongs in the folder
- what does not belong there
- naming conventions
- architectural boundaries
- special rules

## 7.2 When `_ABOUT.md` Must Exist

A folder must have an `_ABOUT.md` if it is:

- a top-level architectural folder
- a feature folder
- a shared submodule with architectural significance
- a store submodule
- a pipeline folder
- a provider folder
- a realtime folder
- a config folder
- any folder that introduces non-obvious rules

## 7.3 AI Obligation to Create or Update `_ABOUT.md`

When you create a new relevant folder, you MUST also create its `_ABOUT.md`.

When you change a folder’s responsibility or conventions, you MUST update its `_ABOUT.md`.

Do not leave architectural folders undocumented.

## 7.4 `_ABOUT.md` Naming

Always use:

```txt
_ABOUT.md
```

Never use `README.md` for folder-level contextual architecture docs.

## 7.5 How AI Must Read `_ABOUT.md`

Before modifying files in a folder, the AI must:

1. read that folder’s `_ABOUT.md`
2. read parent `_ABOUT.md` files if relevant
3. apply all local and inherited rules

---

# 8. UI Rules (MUI-First)

## 8.1 Primary UI Library

Use Material UI as the primary UI system.

Preferred primitives:

- `Box`
- `Stack`
- `Grid`
- `Container`
- `Paper`
- standard MUI form and display components

## 8.2 Styling Priority Order

Use styling mechanisms in this order:

1. `sx`
2. MUI `styled()`
3. `styled-components` when truly needed
4. CSS Modules as a last resort

## 8.3 Styling Constraints

Do NOT:

- use global CSS
- use plain `.css` files without module scoping
- use legacy MUI styling APIs
- hardcode random colors in components
- implement reusable MUI or MUI X internal selector overrides inside feature components

If CSS is necessary, use **CSS Modules**.

## 8.4 Icons

Use icons from:

```txt
@mui/icons-material
```

Do not introduce external icon libraries unless explicitly justified.

---

# 9. Theme Rules

## 9.1 Source of Truth

Raw design values come from:

```txt
shared/config/theme/design-tokens.ts
```

## 9.2 Theme Generation

The MUI theme must be generated through:

```txt
createAppTheme(mode)
```

## 9.3 Theme State

Theme mode is stored in Redux UI state and persisted.

## 9.4 AI Rule

Do not hardcode color values inside components when a theme token or semantic color is appropriate.

## 9.5 Global Component Overrides

Shared visual defaults for Material UI and MUI X components must be defined in:

```txt
shared/config/theme/create-app-theme.ts
```

Examples:

- `MuiDataGrid` headers, icons, fillers, and shared interaction states
- shared button defaults
- reusable defaults that are safe for every instance of a component

If a style fix should apply to future screens by default, move it into the global theme instead of repeating it in feature-local `sx`.

This is mandatory for MUI X internals such as:

- `MuiDataGrid` headers
- `MuiDataGrid` icon buttons
- `MuiDataGrid` fillers
- `MuiDataGrid` focus states
- other repeated grid internals shared across screens

Feature components may configure behavior props such as columns, pagination, row height, sorting, and slots, but reusable `MuiDataGrid` internal selectors must be owned by `create-app-theme.ts`.

Shared component defaults that define the baseline visual language, such as button text casing, must also be owned by `create-app-theme.ts` instead of being repeated in feature components.

Before adding a global override for a base MUI primitive, verify that it will not create side effects in other components that inherit from it. For example, broad `MuiPaper` overrides can affect `AppBar`, menus, dialogs, and other paper-based surfaces. If the style is not safe for all of them, use a shared preset inside `shared/config/theme/` instead of a global override.

If a style is reusable but not universal for every instance of a component, define it as a shared preset or helper inside `shared/config/theme/` and consume that preset from features. Do not inline repeated gradients, surface treatments, or repeated visual recipes directly inside feature components.

---

# 10. i18n Rules

## 10.1 i18n Model

This project uses **Model B**:

- namespace defines the domain or feature
- keys inside the namespace are local to that namespace

Example:

- namespace: `home`
- key: `pages.HomePage.title`

## 10.2 Translation Key Conventions

Shared namespace:

- `navigation.home`
- `navigation.admin`
- `components.LanguageSwitcher.label`

Feature namespace:

- `pages.HomePage.title`
- `forms.ChatPromptForm.submit`
- `components.ChatMessage.references`

## 10.3 Required Hook

Use:

```ts
useScopedTranslation(baseKey, { ns });
```

Pattern:

```ts
const BASE_KEY = 'pages.HomePage';
const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'home' });
```

## 10.4 AI Rule

When building UI:

1. define translation keys
2. add translations to locale JSON files
3. use `useScopedTranslation`
4. avoid hardcoded UI strings

---

# 11. Redux Rules

## 11.1 Store Boundaries

Feature slices live inside features.

The global store only:

- composes reducers
- configures middleware
- defines typed hooks
- defines base APIs

## 11.2 UI State

Global UI state belongs in the UI feature slice.

Examples:

- language
- themeMode

## 11.3 Persist Strategy

Each slice chooses its own storage:

- localStorage
- sessionStorage

Use `createPersistConfig()` for persisted slices.

## 11.4 Persist Versioning

Use `APP_STORAGE_VERSION`.

Default migration strategy resets persisted state by returning `undefined`.

---

# 12. RTK Query Rules

## 12.1 Base API

There is one shared `baseApi`.

All feature APIs must use `injectEndpoints()`.

## 12.2 Auth

Auth token injection happens in the RTK Query base query wrapper, not in components.

## 12.3 Tags

When relevant, endpoints must use:

- `providesTags`
- `invalidatesTags`

Follow list/detail tagging patterns.

## 12.4 AI Rule

Never create ad-hoc `fetch` logic if the feature belongs in RTK Query.

---

# 13. MSAL Rules

## 13.1 Single Source of Auth Logic

MSAL setup lives in `shared/auth`.

Do not duplicate auth logic in features.

## 13.2 Token Retrieval

Always use the shared auth token helpers.

Token acquisition must be silent-first.

## 13.3 Roles

Role logic must use shared claim helpers.

Do not inspect raw account claims across the app in multiple places.

---

# 14. SignalR Rules

## 14.1 Two Realtime Modes

### Persistent connections

- global
- runtime-managed
- used for notifications and status

### Session connections

- feature-owned
- created on demand
- used for streaming workflows (chat, progress, export sessions, etc.)

## 14.2 Shared vs Feature Responsibility

Shared realtime layer provides:

- infrastructure
- connection factories
- token integration
- reconnect behavior

Features provide:

- domain-specific events
- session logic
- handlers
- integration with feature state

## 14.3 AI Rule

Never place feature-specific streaming behavior in `shared/realtime`.

---

# 15. Providers Rules

## 15.1 Public Entry

The public entrypoint is:

```txt
app/providers/AppProviders.tsx
```

## 15.2 Bootstrap vs Runtime

Bootstrap providers:

- Provider
- PersistGate
- BrowserRouter

Runtime providers:

- MsalProvider
- ThemeProvider
- LocalizationProvider
- sync runtime components
- SignalR runtime
- global error runtime

## 15.3 AI Rule

If a new concern is global and cross-cutting:

- add it to providers
- choose bootstrap or runtime deliberately
- do not mix feature logic into providers

---

# 16. Error Handling Rules

## 16.1 Render Errors

Use `ErrorBoundary` for render/lifecycle crashes.

## 16.2 Async Errors

Use the global feedback system for:

- RTK Query failures
- SignalR connection failures
- unhandled promise rejections
- global runtime errors

## 16.3 UI Components

Use:

- `ErrorState`
- `LoadingState`
- `GlobalFeedbackSnackbar`

according to the error/loading scope.

---

# 17. Layout Rules

## 17.1 MainLayout

Main layout may contain:

- TopBar
- Sidebar
- main content
- StatusBar

## 17.2 SimpleLayout

Simple layout is for:

- public pages
- unauthorized page
- not found page
- minimal screens

## 17.3 AI Rule

Do not place layout logic inside pages.

---

# 18. Routing Rules

Use React Router 7.

Supported route types:

- public
- protected
- protected by role

Use shared auth guards.

When authentication redirects are required, preserve the intended return URL using session-based redirect handling.

---

# 19. Import Ordering Rules

Imports must follow the enforced grouping strategy.

Typical order:

1. Node built-ins
2. React / React DOM
3. external packages
4. `@app`
5. `@shared`
6. `@features`
7. `@store`
8. `@assets`
9. relative imports
10. side-effect imports

Do not manually fight the linter.

---

# 20. When Creating a New Feature

When asked to build a new feature, follow this checklist:

1. Create a new feature folder under `src/features/<feature>/`
2. Add:
   - `_ABOUT.md`
   - `pages/`
   - `components/`
   - `hooks/`
   - `store/` if needed
   - `api/` if needed
   - `realtime/` if needed
   - `index.ts`
3. Add translation namespaces or keys
4. Add route(s) if needed
5. Add navigation item(s) if needed
6. Add role guards if needed
7. Add RTK Query endpoints if applicable
8. Add or update barrels
9. Add or update `_ABOUT.md`

---

# 21. When Creating a New Shared Module

Follow this checklist:

1. Create a clearly scoped folder
2. Add `_ABOUT.md` if architecturally relevant
3. Add public `index.ts` if appropriate
4. Keep it domain-agnostic
5. Do not import from features

---

# 22. When Creating a New SignalR Streaming Feature

Use this pattern:

1. Keep infrastructure in `shared/realtime`
2. Create feature-specific session logic in:
   - `features/<feature>/realtime/`
3. Define domain event types
4. Start/stop the session explicitly
5. Clean up handlers and connection on completion/unmount

Do not reuse chat-specific session code for unrelated domains.

---

# 23. Pipeline Rules

## 23.1 Folder

Pipelines live under:

```txt
pipelines/
```

## 23.2 Responsibilities

- Azure DevOps pipeline entry
- build templates
- deploy templates
- env transform templates

## 23.3 Environment Generation

`.env.<environment>` files are generated from `.env.template`.

Secrets and real values come from Azure DevOps Library variables.

## 23.4 AI Rule

Do not hardcode secrets in pipeline files.

---

# 24. AI Change Management Rules

Whenever you make an architectural change, ask:

- Do I need to create a new `_ABOUT.md`?
- Do I need to update an existing `_ABOUT.md`?
- Do I need a barrel?
- Should this live in `shared` or in a feature?
- Is this persistent state or ephemeral state?
- Does this belong in providers or in a feature component?
- Should this use RTK Query instead of ad-hoc fetch?
- Should this be translated?

If the answer is yes, do it now. Do not defer documentation or structure decisions.

---

# 25. What AI Must Never Do

Do NOT:

- introduce default exports casually
- place feature logic in `shared`
- bypass AppConfig and access `import.meta.env` directly
- hardcode random color values inside components
- create global CSS
- place auth logic outside `shared/auth`
- create undocumented architectural folders
- forget `_ABOUT.md` for relevant new folders
- add ad-hoc API calls when RTK Query should be used
- add feature-specific SignalR logic in shared infrastructure
- leave imports unsimplified when barrels are available

---

# 26. What AI Should Optimize For

Always optimize for:

- clarity
- consistency
- explicit architecture
- maintainability
- strong typing
- clean module APIs
- future AI readability
- low coupling
- high reuse where appropriate

---

# 27. Final Rule

If you are unsure where something belongs:

1. check the nearest `_ABOUT.md`
2. check parent `_ABOUT.md` files
3. prefer explicit structure over convenience
4. prefer feature isolation over premature abstraction
5. update the contextual documentation when you introduce a new pattern

This repository is intended to be self-describing.  
Your job is not only to write code, but to preserve that property.
