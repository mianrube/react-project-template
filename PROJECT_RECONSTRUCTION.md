# PROJECT_RECONSTRUCTION.md - Base Project Scaffold Guide

This document is the authoritative AI-oriented specification for starting a new project from this repository baseline and reconstructing the base scaffold until it reaches the current architectural posture.

Use this file when:

- starting a new project with this base architecture
- recreating the base project scaffold from scratch
- validating whether a generated scaffold matches the current repository baseline
- rebuilding the root configuration, dependencies, source tree, and bootstrap wiring mechanically

Use `AGENT.md` instead for normal evolutionary development inside the existing repository.

All technical code, comments, filenames, folder names, and internal documentation must be written in English.

---

# 1. Scaffold Goal

The generated result must reproduce the current project posture:

- feature-first frontend architecture
- React + Vite + TypeScript baseline
- MUI-first UI stack
- Redux Toolkit with RTK Query
- selective Redux persistence
- MSAL authentication wiring
- SignalR runtime support
- i18n startup and namespace discipline
- folder-level `_ABOUT.md` documentation

The output should be close to a mechanical reproduction of the base project, not a loose conceptual approximation.

---

# 2. Quickstart

Use this section when the task is to create a new project that starts from this repository base.

Recommended command order:

1. initialize the package manifest with the contract described in section 7
2. add runtime dependencies:

```txt
pnpm add @azure/msal-browser @azure/msal-react @emotion/react @emotion/styled @fontsource/roboto @microsoft/signalr @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers @reduxjs/toolkit dayjs formik i18next react react-dom react-i18next react-redux react-router redux-persist yup
```

3. add development dependencies:

```txt
pnpm add -D @eslint/js @types/node @types/react @types/react-dom @vitejs/plugin-react-swc concurrently cross-env eslint eslint-config-prettier eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort eslint-plugin-unused-imports globals json-server prettier typescript typescript-eslint vite
```

4. create the root config files listed in section 8
5. create the app entry, providers, shared modules, store, and features following section 4
6. run validation:

```txt
pnpm lint
pnpm build
pnpm format:check
```

Use the phased sequence in section 4 for the full ordered implementation.

---

# 3. How To Use This Guide

Read and execute this document in order.

Recommended working mode:

1. complete the scaffold phases in section 4
2. use the contracts in later sections as acceptance criteria for each phase
3. do not jump ahead to features before the root scaffold, bootstrap, and store foundation are in place
4. do not treat the source tree listing as the only requirement; the wiring and behavior contracts matter just as much as the files themselves

If a generated project matches the folder names but misses the runtime behavior described here, the scaffold is incomplete.

---

# 4. Scaffold Sequence

Follow this exact order.

## Phase 0 - Preparation

1. create the repository root
2. initialize `package.json` with:
   - `name: react-project-template`
   - `private: true`
   - `version: 0.0.0`
   - `type: module`
3. recreate root metadata and repo hygiene files:
   - `.gitignore`
   - `.prettierrc.json`
   - `.prettierignore`
   - `.env.template`
4. choose `pnpm` as the package manager

Exit criteria:

- root manifest exists with the correct shape
- repository-wide formatting and ignore files exist

## Phase 1 - Root Tooling Scaffold

1. create:
   - `vite.config.ts`
   - `tsconfig.json`
   - `tsconfig.app.json`
   - `tsconfig.node.json`
   - `eslint.config.js`
   - `index.html`
2. recreate scripts exactly as defined in section 6
3. add runtime and dev dependency families from sections 5.1 and 5.2
4. run `pnpm install`
5. confirm a `pnpm-lock.yaml` is generated

Exit criteria:

- aliases, TypeScript config, ESLint config, and build scripts exist
- dependency graph installs successfully

## Phase 2 - App Entry And Bootstrap

1. create `src/main.tsx`
2. create `src/app/main.tsx`
3. create `src/app/App.tsx` and `src/app/index.ts`
4. wire the split bootstrap so `src/main.tsx` only imports `./app/main`
5. in `src/app/main.tsx` wire:
   - Roboto imports
   - i18n initialization import
   - awaited `bootstrapMsal()`
   - `StrictMode`
   - `ErrorBoundary`
   - `AppProviders`
   - `App`

Exit criteria:

- the app can mount only after MSAL bootstrap completes
- the split entrypoint is preserved

## Phase 3 - Provider And Routing Foundation

1. create `src/app/providers/`
2. create `AppProviders.tsx`
3. create `ProvidersBootstrap.tsx`
4. create `ProvidersRuntime.tsx`
5. create runtime helpers:
   - `AuthReturnUrlSync.tsx`
   - `GlobalErrorRuntime.tsx`
   - `I18nStoreSync.tsx`
   - `SignalRNotificationsRuntime.tsx`
6. create `src/app/router/AppRoutes.tsx`

Exit criteria:

- bootstrap providers and runtime providers are separated
- route composition is owned by the app layer

## Phase 4 - Shared Infrastructure Foundation

1. create `src/shared/auth/`
2. create `src/shared/config/`
3. create `src/shared/i18n/`
4. create `src/shared/errors/`
5. create `src/shared/components/`
6. create `src/shared/layouts/`
7. create `src/shared/navigation/`
8. create `src/shared/realtime/`
9. create `src/shared/hooks/`
10. create `src/shared/forms/`

Exit criteria:

- auth, config, i18n, theme, shared UI, realtime, and forms all exist as domain-agnostic modules

## Phase 5 - Store Foundation

1. create `src/store/store.ts`
2. create `src/store/api/`
3. create `src/store/root/`
4. create `src/store/hooks/`
5. create `src/store/persist/`
6. create `src/store/index.ts`
7. wire `configureStore()`, `persistStore()`, typed hooks, shared RTK Query base API, and root reducer

Exit criteria:

- global Redux infrastructure exists and can be consumed by providers
- persistence is selective and version-aware

## Phase 6 - Base Features

1. create global feature state modules:
   - `features/ui`
   - `features/realtime`
   - `features/app-feedback`
2. create route example features:
   - `features/home`
   - `features/protected`
   - `features/admin`
3. create reference domain features:
   - `features/faqs`
   - `features/tenders`

Exit criteria:

- the project includes both app-shell slices and route-level example features
- at least one validated form feature and one richer domain feature exist

## Phase 7 - Mock And Documentation Layer

1. create `mock-api/db.json`
2. wire mock resource selection through config helpers and feature API layers
3. create `_ABOUT.md` files for all architecturally meaningful folders
4. review imports, barrels, route registration, and namespace coverage

Exit criteria:

- mock mode can support FAQ and tender resources
- `_ABOUT.md` files explain the generated structure accurately

## Phase 8 - Final Verification

1. run `pnpm lint`
2. run `pnpm build`
3. run `pnpm format:check`
4. verify runtime expectations listed in section 24

Exit criteria:

- the repository is buildable, lintable, and mechanically understandable

---

# 5. Repository Baseline

The repository root currently contains these authored baseline artifacts:

```txt
.env.development
.env.template
.gitignore
.prettierignore
.prettierrc.json
AGENT.md
AGENT_FEATURE_REQUEST_TEMPLATE.md
PROJECT_RECONSTRUCTION.md
eslint.config.js
index.html
mock-api/
package.json
pnpm-lock.yaml
public/
README.md
src/
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

Interpretation rules:

- `src/` is the main source of truth for authored application code
- `dist/` and `node_modules/` are generated and must not be treated as authored baseline
- `README.md` is still generic and should not be used as the reconstruction guide
- `AGENT.md` governs evolutionary maintenance
- `PROJECT_RECONSTRUCTION.md` governs base-project scaffolding and full reconstruction

---

# 6. Core Stack And Package Manager

Current ecosystem baseline:

- React 19
- Vite 7
- TypeScript 5
- React Router 7
- Material UI 7
- MUI X Data Grid 8
- MUI X Date Pickers 8
- Redux Toolkit 2
- RTK Query
- Redux Persist 6
- MSAL Browser and MSAL React
- SignalR client
- i18next and react-i18next
- Formik
- Yup
- dayjs
- Roboto via `@fontsource/roboto`

Package manager:

- `pnpm`

Scaffold policy:

- preserve the same dependency families
- preserve the same package manifest shape and scripts
- prefer mutually compatible stable versions
- if exact parity matters, start from the current package list and versions below

## 5.1 Runtime Dependencies Baseline

Current runtime dependency set:

- `@azure/msal-browser`
- `@azure/msal-react`
- `@emotion/react`
- `@emotion/styled`
- `@fontsource/roboto`
- `@microsoft/signalr`
- `@mui/icons-material`
- `@mui/material`
- `@mui/x-data-grid`
- `@mui/x-date-pickers`
- `@reduxjs/toolkit`
- `dayjs`
- `formik`
- `i18next`
- `react`
- `react-dom`
- `react-i18next`
- `react-redux`
- `react-router`
- `redux-persist`
- `yup`

## 5.2 Development Dependencies Baseline

Current development dependency set:

- `@eslint/js`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@vitejs/plugin-react-swc`
- `concurrently`
- `cross-env`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-simple-import-sort`
- `eslint-plugin-unused-imports`
- `globals`
- `json-server`
- `prettier`
- `typescript`
- `typescript-eslint`
- `vite`

---

# 7. Package Manifest And Scripts Contract

The generated `package.json` must preserve this shape:

- `name`
- `private: true`
- `version`
- `type: module`
- `scripts`
- `dependencies`
- `devDependencies`

Current manifest identity:

```json
{
  "name": "react-project-template",
  "private": true,
  "version": "0.0.0",
  "type": "module"
}
```

The base scripts are mandatory and should be reproduced exactly:

```json
{
  "dev": "vite",
  "dev:mock": "concurrently -k -n MOCK,APP -c yellow,cyan \"pnpm mock:api\" \"cross-env VITE_MOCK_API_BASE_URL=http://localhost:5001 VITE_MOCK_API_RESOURCES=faqs,tenders pnpm dev\"",
  "dev:mock:custom": "concurrently -k -n MOCK,APP -c yellow,cyan \"pnpm mock:api\" \"cross-env VITE_MOCK_API_BASE_URL=http://localhost:5001 pnpm dev\"",
  "build": "tsc -b && vite build",
  "build:des": "tsc -b && vite build --mode des",
  "build:int": "tsc -b && vite build --mode int",
  "build:pro": "tsc -b && vite build --mode pro",
  "preview": "vite preview",
  "mock:api": "json-server ./mock-api/db.json --port 5001",
  "lint": "eslint src vite.config.ts",
  "lint:fix": "eslint src vite.config.ts --fix",
  "format": "prettier . --write",
  "format:check": "prettier . --check"
}
```

Behavioral expectations:

- `build` must type-check through project references before the Vite build
- `build:des`, `build:int`, and `build:pro` must preserve the same sequencing
- `mock:api` must serve `mock-api/db.json` on port `5001`
- `format` and `format:check` remain repository-wide Prettier commands

---

# 8. Root Configuration Files Contract

Recreate these root files:

- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `eslint.config.js`
- `.prettierrc.json`
- `.prettierignore`
- `.env.template`
- `index.html`

## 7.1 Vite Contract

`vite.config.ts` must:

- use `@vitejs/plugin-react-swc`
- read `package.json` to inject `import.meta.env.VITE_APP_VERSION`
- expose these aliases:
  - `@app` -> `src/app`
  - `@shared` -> `src/shared`
  - `@features` -> `src/features`
  - `@store` -> `src/store`
  - `@assets` -> `src/assets`

## 7.2 TypeScript App Contract

`tsconfig.app.json` must preserve:

- bundler module resolution
- `strict: true`
- `jsx: react-jsx`
- path aliases matching the Vite aliases
- project scoped to `src`

Current notable detail:

- the config reserves bare aliases for `@shared` and `@features`, but the repository does not currently expose matching root barrels for those entry points
- preserve that fact intentionally or complete it intentionally, but do not assume the barrels exist silently

## 7.3 ESLint Contract

`eslint.config.js` must preserve:

- flat config style
- ignores for `dist` and `node_modules`
- recommended JavaScript and TypeScript baseline
- React Hooks and Vite React Refresh rules
- Prettier compatibility at the end of the extends list
- import sorting groups in this order:
  1. `node:`
  2. React
  3. external libraries
  4. `@app`
  5. `@shared`
  6. `@features`
  7. `@store`
  8. `@assets`
  9. relative imports
  10. side-effect imports

## 7.4 Prettier Contract

Prettier remains repository-wide.

Rules:

- keep `.env`-style files excluded through `.prettierignore`
- do not narrow formatting to `src/`

---

# 9. Environment Contract

The environment template must include these variables:

```dotenv
VITE_API_BASE_URL=
VITE_MOCK_API_BASE_URL=
VITE_MOCK_API_RESOURCES=
VITE_ENVIRONMENT_NAME=development

VITE_AUTH_CLIENT_ID=
VITE_AUTH_TENANT_ID=
VITE_AUTH_AUTHORITY=
VITE_AUTH_REDIRECT_URI=
VITE_AUTH_POST_LOGOUT_REDIRECT_URI=
VITE_AUTH_API_SCOPE=

VITE_SIGNALR_NOTIFICATIONS_ENABLED=false
VITE_SIGNALR_NOTIFICATIONS_HUB_URL=
VITE_SIGNALR_CHAT_HUB_URL=
```

Rules:

- application code must access env values only through `src/shared/config/app-config/`
- `VITE_API_BASE_URL` is the normal real-backend base URL
- `VITE_MOCK_API_BASE_URL` is the mock server base URL
- `VITE_MOCK_API_RESOURCES` selects which resources use the mock server
- mode-specific env files such as `.env.des`, `.env.int`, and `.env.pro` are optional but the scripts reserve those build modes

---

# 10. Source Tree To Create

The top-level source tree must be created as:

```txt
src/
  _ABOUT.md
  main.tsx
  vite-env.d.ts
  app/
    _ABOUT.md
    App.tsx
    index.ts
    main.tsx
    providers/
      _ABOUT.md
      AppProviders.tsx
      AuthReturnUrlSync.tsx
      GlobalErrorRuntime.tsx
      I18nStoreSync.tsx
      ProvidersBootstrap.tsx
      ProvidersRuntime.tsx
      SignalRNotificationsRuntime.tsx
      index.ts
    router/
      AppRoutes.tsx
  assets/
  features/
    _ABOUT.md
    admin/
      pages/
    app-feedback/
      _ABOUT.md
      store/
    faqs/
      _ABOUT.md
      api/
      components/
      model/
      pages/
      store/
      index.ts
    home/
      api/
      components/
      pages/
    protected/
      pages/
    realtime/
      _ABOUT.md
      store/
    tenders/
      _ABOUT.md
      api/
      components/
      hooks/
      model/
      pages/
      realtime/
      store/
      index.ts
    ui/
      _ABOUT.md
      store/
  shared/
    _ABOUT.md
    auth/
      _ABOUT.md
      authRequests.ts
      bootstrapMsal.ts
      index.ts
      msalConfig.ts
      msalInstance.ts
      claims/
      guards/
      navigation/
      token/
    components/
      _ABOUT.md
      app-brand/
      auth-buttons/
      error-boundary/
      error-state/
      global-feedback-snackbar/
      language-switcher/
      loading-state/
      sidebar/
      status-bar/
      theme-switcher/
      top-bar/
      index.ts
    config/
      _ABOUT.md
      app-config/
      localization/
      theme/
    errors/
      _ABOUT.md
      index.ts
      normalizeErrorMessage.ts
    forms/
      _ABOUT.md
      entityForm.types.ts
      FormikSwitchField.tsx
      FormikTextField.tsx
      formModes.ts
      index.ts
    hooks/
      _ABOUT.md
      index.ts
      useScopedTranslation.ts
    i18n/
      _ABOUT.md
      i18n.ts
      index.ts
      locale-mapping.ts
      locales/
    layouts/
      MainLayout.tsx
      SimpleLayout.tsx
      index.ts
    navigation/
      index.ts
      nav.items.tsx
    pages/
    realtime/
  store/
    _ABOUT.md
    api/
    app/
    hooks/
    index.ts
    persist/
    root/
    rtkQueryErrorMiddleware.ts
    store.ts
```

Preserve `_ABOUT.md` files for architecturally meaningful folders.

---

# 11. Bootstrap Flow Contract

Recreate the entry flow exactly:

1. `src/main.tsx` only imports `./app/main`
2. `src/app/main.tsx`:
   - imports Roboto font weights
   - initializes shared i18n
   - awaits `bootstrapMsal()`
   - mounts `App` inside `ErrorBoundary` and `AppProviders`
3. `AppProviders` composes `ProvidersBootstrap` and `ProvidersRuntime`

This split is intentional and should not be collapsed casually.

---

# 12. Provider Architecture Contract

The provider layer must preserve this responsibility split:

- `ProvidersBootstrap`: one-time composition concerns such as Redux, persist, router, and MSAL providers
- `ProvidersRuntime`: lifecycle-bound integrations and synchronization logic
- `AuthReturnUrlSync`: auth navigation synchronization
- `I18nStoreSync`: store <-> i18n synchronization
- `GlobalErrorRuntime`: window-level runtime error listeners
- `SignalRNotificationsRuntime`: notification runtime integration

`AppProviders` is the public composition entry point.

---

# 13. Routing And Layout Contract

Routing baseline:

- application routes live in `src/app/router/AppRoutes.tsx`
- route-level features mount their pages there
- protected and admin behavior must go through shared auth guards, not custom per-page hacks

Layout baseline:

- `MainLayout` is the full application shell
- `SimpleLayout` is the stripped-down shell
- sidebar, top bar, language switcher, theme switcher, and status bar remain shared app chrome components

---

# 14. Authentication Contract

Authentication baseline lives in `src/shared/auth/`.

Recreate:

- MSAL instance setup
- MSAL config
- bootstrap helper
- auth requests helper
- token helper layer
- claims helper layer
- guard layer
- auth navigation support

Rules:

- do not duplicate auth logic outside `shared/auth`
- bootstrap must happen before app mount

---

# 15. Redux And RTK Query Contract

The store layer must provide:

- `configureStore()` wiring in `src/store/store.ts`
- `persistStore(store)` wiring
- shared `baseApi` in `src/store/api/`
- `rootReducer` composition in `src/store/root/`
- typed exports for `RootState` and `AppDispatch`
- typed hooks in `src/store/hooks/`
- RTK Query error middleware in `src/store/rtkQueryErrorMiddleware.ts`

Rules:

- disable serializable check in the current baseline
- concatenate `baseApi.middleware` and `rtkQueryErrorMiddleware`
- feature APIs should build on the shared RTK Query layer

---

# 16. Persist Contract

Persistence must remain selective.

Current baseline:

- UI preferences are stored in the `ui` feature and persisted through redux-persist
- transient UI state should not be persisted

Important operational caveat:

- the persist helper includes migration logic; do not scaffold it in a way that wipes persisted state on every reload by default

---

# 17. Mock And Real Backend Contract

The repository supports mixed backend states.

Rules:

- normal real-backend flow uses `VITE_API_BASE_URL`
- mock flow uses `VITE_MOCK_API_BASE_URL`
- `VITE_MOCK_API_RESOURCES` selects mock-backed resources per resource key
- resource-level branching must happen in the feature API layer
- pages, components, and forms must stay unaware of real vs mock mode

Preferred strategy order:

1. `json-server` for CRUD-like resources
2. RTK Query against that mock server
3. feature-local static data only for lightweight read-only datasets

Current example resource keys:

- `faqs`
- `tenders`

---

# 18. Forms Contract

Formik and Yup are part of the baseline scaffold.

Rules:

- validated entity create/edit flows should default to Formik + Yup
- shared Formik+MUI adapters live in `src/shared/forms/`
- `src/shared/forms/` must include:
  - `FormikTextField.tsx`
  - `FormikSwitchField.tsx`
  - `entityForm.types.ts`
  - `formModes.ts`
  - `index.ts`
- validation schemas usually stay close to the owning feature

Reference implementation:

- `features/faqs` is the current example feature for validated create/edit forms with shared adapters and feature-local schema logic

---

# 19. i18n Contract

The shared i18n layer must provide:

- root i18n initialization in `src/shared/i18n/i18n.ts`
- locale mapping support
- namespace-ready locale files under `src/shared/i18n/locales/`
- `useScopedTranslation()` in `src/shared/hooks/`

Rules:

- new UI copy should be translatable by default
- preserve current behavior even if some legacy text remains hardcoded

---

# 20. Theme And Styling Contract

The generated scaffold must be MUI-first.

Rules:

- theme infrastructure belongs under `src/shared/config/theme/`
- shared visual chrome components belong under `src/shared/components/`
- use the theme rather than hardcoded design tokens when practical
- preserve space for future client branding without replacing the existing shared theme structure

---

# 21. Realtime Contract

Realtime support must preserve this split:

- shared SignalR infrastructure in `src/shared/realtime/`
- app-level notification runtime in `src/app/providers/SignalRNotificationsRuntime.tsx`
- feature-owned realtime logic in `src/features/<feature>/realtime/`

Do not move feature-specific realtime sessions into shared infrastructure.

---

# 22. Feature Inventory To Create

Create these current feature areas in the base scaffold:

- `admin`: admin-facing page surface
- `app-feedback`: global feedback state and notifications support
- `faqs`: FAQ domain with API, forms, pages, state, and feature barrel
- `home`: lightweight route feature
- `protected`: protected example page surface
- `realtime`: app-level realtime feature state
- `tenders`: reference domain feature with API, pages, hooks, model, realtime, and store
- `ui`: global UI preferences and persisted settings

The intent is not to generate placeholder folders only. The scaffold should wire them into the architecture so the project is installable and understandable immediately.

---

# 23. Shared Module Inventory To Create

Create these shared module areas in the base scaffold:

- `shared/auth`
- `shared/components`
- `shared/config`
- `shared/errors`
- `shared/forms`
- `shared/hooks`
- `shared/i18n`
- `shared/layouts`
- `shared/navigation`
- `shared/pages`
- `shared/realtime`

Each module should preserve its current role as domain-agnostic infrastructure.

---

# 24. `_ABOUT.md` Contract

Automatically generate `_ABOUT.md` files for every architecturally meaningful folder.

Minimum content:

- folder purpose
- responsibilities
- rules
- AI notes when helpful

These files are part of the scaffold target and must not be treated as optional documentation garnish.

---

# 25. Barrels And Public Surface Contract

Rules:

- create `index.ts` files where a folder has a stable public API
- avoid default exports by default
- do not create broad barrels that hide unclear ownership

Current expected public surfaces include at least:

- `src/app/index.ts`
- `src/app/providers/index.ts`
- `src/features/faqs/index.ts`
- `src/features/tenders/index.ts`
- `src/shared/components/index.ts`
- `src/shared/forms/index.ts`
- `src/shared/hooks/index.ts`
- `src/shared/layouts/index.ts`
- `src/shared/navigation/index.ts`
- `src/store/index.ts`

---

# 26. Import Ordering Contract

Generated code should respect the repository import sort order:

1. `node:` builtins
2. React
3. external libraries
4. `@app`
5. `@shared`
6. `@features`
7. `@store`
8. `@assets`
9. relative imports
10. side-effect imports

---

# 27. Final Verification Checklist

The scaffolded project is acceptable only when these commands succeed:

```txt
pnpm install
pnpm lint
pnpm build
pnpm format:check
```

Additionally verify:

- the app boots through the split entrypoint
- MSAL bootstrap completes before mount
- fonts and i18n initialize correctly
- store and persist wiring are active
- mock API mode can start on port `5001`
- feature routes render through the shared routing/layout system
- `_ABOUT.md` files explain the generated structure
- the generated source tree matches the contracts in this document, not only the folder names

---

# 28. Known Parity Notes

Current repository notes worth preserving explicitly:

- `README.md` is generic and not authoritative
- some UI text is still hardcoded in English even though the project prefers translation-first UI copy
- `tsconfig.app.json` reserves some bare alias entry points whose root barrels are not all present yet

Document these facts if they still exist after scaffolding. Do not silently invent different behavior and call it parity.

---

# 29. Final Rule

If you are unsure whether a detail belongs to the scaffold contract:

1. inspect the real folder structure under `src/`
2. inspect the nearest `_ABOUT.md`
3. inspect `AGENT.md` for evolutionary rules
4. prefer matching current repository reality over generic best-practice scaffolding

The goal is a newly scaffolded project that lands as close as possible to the current repository state while remaining buildable and understandable.
