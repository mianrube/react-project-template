# AGENT.md - Evolutionary Development Guide

This document is the authoritative AI-oriented guide for extending, refactoring, and maintaining the existing repository.

Use this file when:

- implementing a new feature in the current codebase
- modifying existing architecture without breaking boundaries
- reviewing whether a change fits the established repository patterns
- deciding where new code, docs, or configuration should live

Use `PROJECT_RECONSTRUCTION.md` instead when the goal is to regenerate the project from zero or to validate full scaffold parity.

All technical code, comments, filenames, folder names, and internal documentation must be written in English.

---

# 1. Mission

Your mission is to evolve this frontend project without eroding its current architecture.

Preserve:

- feature-first organization
- strict boundaries between `app`, `shared`, `features`, and `store`
- provider composition through the app layer
- MUI-first UI conventions
- Redux Toolkit and RTK Query patterns
- selective Redux persistence
- MSAL-based authentication
- SignalR runtime integration
- i18n namespace discipline
- folder-level documentation through `_ABOUT.md`

Behave like a disciplined maintainer of an existing system, not like a generic scaffold generator.

---

# 2. Working Mode

Before making architectural assumptions:

1. inspect the relevant code in the owning module
2. read the nearest `_ABOUT.md`
3. read the parent `_ABOUT.md` if the local one is not enough
4. follow the existing pattern unless there is a verified reason to improve it

Practical expectations:

- prefer focused, minimal changes over broad rewrites
- fix the root cause instead of layering ad hoc patches
- keep public APIs stable unless the task explicitly requires change
- update documentation in the same delivery when a stable rule changes

---

# 3. Repository Posture

Important interpretation rules:

- `src/` is the source of truth for application structure
- `dist/` is generated output and must not be treated as authored source
- `node_modules/` is dependency output and must not be treated as authored source
- `README.md` is still a generic Vite README and is not the architecture guide
- `AGENT.md` is the guide for evolutionary development
- `PROJECT_RECONSTRUCTION.md` is the guide for zero-to-current reconstruction

---

# 4. Top-Level Architecture

The actual top-level source tree is:

```txt
src/
  _ABOUT.md
  main.tsx
  vite-env.d.ts
  app/
  assets/
  features/
  shared/
  store/
```

Module responsibilities:

- `app/`: application composition, routing, providers, runtime orchestration
- `features/`: business domains and app-level slices that belong to one domain
- `shared/`: domain-agnostic infrastructure and reusable modules
- `store/`: global Redux composition, RTK Query base API, typed hooks, persist helpers
- `assets/`: static source assets

Do not blur these boundaries for convenience.

---

# 5. Core Stack Summary

Assume this project currently uses these baseline families unless the repository explicitly changes them:

- React 19
- Vite 7
- TypeScript 5
- React Router 7
- Material UI 7
- MUI X Data Grid 8
- MUI X Date Pickers 8
- Redux Toolkit 2 with RTK Query
- Redux Persist 6
- MSAL Browser and MSAL React
- SignalR client
- i18next and react-i18next
- Formik and Yup
- dayjs
- Roboto via `@fontsource/roboto`

The package manager is `pnpm`.

For exact reconstruction contracts, scripts, dependencies, and root configuration files, consult `PROJECT_RECONSTRUCTION.md`.

---

# 6. Non-Negotiable Global Rules

## 6.1 Language Rules

All technical artifacts must be in English:

- code
- comments
- folder names
- file names
- types
- interfaces
- enums
- `_ABOUT.md`
- architecture documentation

Spanish may appear only in product-facing copy when intentionally required.

## 6.2 Export Rules

Use named exports by default.

Preferred:

```ts
export const HomePage = () => {
  return null;
};
```

Avoid default exports unless there is a strong existing reason.

## 6.3 Component Rules

Use functional components declared as constants.

Keep boundaries pragmatic:

- do not extract tiny JSX fragments only to reduce line count
- keep a component inline when it has one clear responsibility
- extract a subcomponent when it creates a stable UI or behavior contract
- colocate private subcomponents when they are meaningful only inside one module

## 6.4 Hook Rules

Hooks must:

- start with `use`
- use camelCase
- live in `src/shared/hooks` when reusable
- live in `src/features/<feature>/hooks` when feature-specific

## 6.5 App Config Rule

Do not access `import.meta.env` directly outside the shared app config module.

All environment access must go through:

```txt
src/shared/config/app-config/
```

## 6.6 Feature Boundary Rule

Do not create direct dependencies between unrelated features.

If logic is domain-specific, keep it inside that feature.
If logic is reusable across the application, move it to `shared`.

---

# 7. Bootstrap And Provider Contract

Bootstrap is intentionally split:

- `src/main.tsx` delegates to `src/app/main.tsx`
- `src/app/main.tsx` initializes fonts, i18n, MSAL bootstrap, React root, and the global error boundary
- `AppProviders` composes `ProvidersBootstrap` and `ProvidersRuntime`

Provider responsibilities:

- bootstrap providers own application-level setup such as store, persist, router, and auth providers
- runtime providers own lifecycle integrations such as i18n sync, auth return URL sync, global runtime error hooks, and SignalR notification runtime wiring

Do not place business logic in the provider layer.

---

# 8. Routing, Layout, And Auth Contract

Routing rules:

- application routes live in `src/app/router/AppRoutes.tsx`
- navigable features expose pages and are mounted through the existing routing system
- use guards only through the shared auth guard layer

Layout rules:

- `shared/layouts/MainLayout.tsx` is the default authenticated shell
- `shared/layouts/SimpleLayout.tsx` is the minimal shell for simpler pages
- shared app chrome belongs in `shared/components`, not in feature folders

Authentication rules:

- MSAL bootstrap, config, token helpers, guards, and navigation helpers live in `src/shared/auth/`
- do not duplicate auth logic outside `shared/auth`
- auth-related URL synchronization belongs in the app provider/runtime layer

---

# 9. State, API, And Persistence Contract

Redux rules:

- global store composition lives in `src/store/`
- `baseApi` in `src/store/api/` is the shared RTK Query foundation
- feature-specific API slices and endpoints should layer on top of the shared RTK Query setup
- do not fetch server data directly inside pages or feature UI components when RTK Query is the appropriate tool

Persistence rules:

- persistence must stay selective
- persisted preferences belong only where they are truly user preferences or session-restoration concerns
- transient UI state must not be persisted casually

Current expectation:

- UI preferences are owned by the `ui` feature and persisted through the existing persist wiring

Mock and real backend rules:

- normal real-backend flow uses `VITE_API_BASE_URL`
- mock flow uses `VITE_MOCK_API_BASE_URL`
- resource-level mock selection uses `VITE_MOCK_API_RESOURCES`
- pages and components must not branch on real vs mock sources
- resource routing belongs in the feature API layer through shared config helpers

Preferred mock strategy order:

1. `json-server` for CRUD-like resources
2. RTK Query against that mock server
3. feature-local static data only for lightweight read-only datasets

---

# 10. Forms Contract

Formik and Yup are the default form baseline for validated create and edit flows.

Rules:

- keep validation schemas close to the owning feature unless they are genuinely reusable
- use `src/shared/forms/` for shared form contracts and reusable Formik+MUI adapters
- do not invent a parallel form abstraction when the shared forms module already covers the need
- lightweight search or filter state may remain local component state when validation and orchestration would add noise

Reference point:

- `features/faqs` is the current reference feature for validated create/edit forms

---

# 11. i18n, Theme, And Realtime Contract

i18n rules:

- shared i18n setup lives in `src/shared/i18n/`
- use namespace discipline and `useScopedTranslation`
- new user-facing UI copy should be translatable by default
- if a feature still contains hardcoded text, treat that as a gap to reduce, not a new precedent

Theme rules:

- use Material UI theming through the shared theme/config layer
- do not hardcode colors when the theme already provides the token or intent
- preserve the existing visual language unless the task is explicitly a design change

Realtime rules:

- shared realtime infrastructure lives under `src/shared/realtime/`
- app-wide notification runtime belongs in `app/providers/`
- feature-specific realtime behavior belongs in `src/features/<feature>/realtime/`

---

# 12. Folder Documentation Rules

`_ABOUT.md` files are part of the architecture, not decoration.

Add or update `_ABOUT.md` when:

- creating a new architecturally meaningful folder
- changing a folder responsibility or rule
- introducing a new stable pattern inside a documented module

Minimum `_ABOUT.md` contract:

- folder purpose
- responsibilities
- important rules
- AI-oriented placement guidance when useful

---

# 13. Barrel And Import Rules

Barrel rules:

- add `index.ts` only when a folder has a stable public surface
- do not create barrels that hide unclear ownership or increase circular import risk
- keep internal-only files imported directly when that is clearer

Import ordering rules follow the ESLint configuration:

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

# 14. New Feature Checklist

When creating a new feature:

1. create `src/features/<feature>/`
2. add `_ABOUT.md`
3. add `pages/` when the feature is navigable
4. add `components/` when the feature owns UI pieces
5. add `hooks/` if the feature owns reusable local hooks
6. add `api/` if data fetching or mutation exists
7. add `model/` for feature types and mapping logic when needed
8. add `store/` only if the feature owns client-side state
9. add `realtime/` only if the feature owns realtime behavior
10. add translations and locale keys
11. register routes and navigation only if the feature is navigable
12. keep business logic self-contained

Reference features:

- `tenders` for a fuller domain feature
- `home` for a lightweight route feature
- `faqs` for validated CRUD-like forms

---

# 15. New Shared Module Checklist

When creating a new shared module:

1. confirm the concern is genuinely domain-agnostic
2. create a clearly scoped folder
3. add `_ABOUT.md` if the folder is architecturally meaningful
4. add a public `index.ts` only when the module should be imported externally
5. never import from features into shared

---

# 16. Errors And Feedback Contract

Use the established global feedback model.

Current patterns:

- render and lifecycle failures -> `ErrorBoundary`
- window runtime errors -> `GlobalErrorRuntime`
- unhandled promise rejections -> `GlobalErrorRuntime`
- API and runtime user feedback -> `features/app-feedback` plus `GlobalFeedbackSnackbar`
- page-level load failures -> `ErrorState`
- page-level loading -> `LoadingState`

Do not create parallel global snackbar or error systems without an explicit architectural decision.

---

# 17. Validation Workflow

Preferred workflow:

1. format touched files
2. lint touched files with fixes when appropriate
3. run broader validation for the affected scope

Repository-wide validation commands:

```txt
pnpm lint
pnpm build
pnpm format:check
```

Use the mock scripts only when the feature work requires mock-backed resources.

---

# 18. What Must Never Be Done

Do not:

- add default exports casually
- place feature logic in `shared`
- access env vars directly outside app config
- bypass RTK Query for feature data fetching without a strong reason
- duplicate auth logic outside `shared/auth`
- place feature-specific SignalR sessions in shared infrastructure
- persist transient UI state carelessly
- forget `_ABOUT.md` for new architectural folders
- leave `AGENT.md` stale after a verified evolution rule changes
- leave `PROJECT_RECONSTRUCTION.md` stale after a verified scaffold baseline changes
- invent folders or workflows that the real repository does not own

---

# 19. Governance And Self-Update Rules

This repository is expected to evolve.

Update `AGENT.md` when:

- a new architectural or workflow rule becomes stable in the current codebase
- a repeated implementation pattern becomes part of the baseline
- an existing rule is proven incomplete or outdated
- a new shared module or cross-cutting concern becomes standard

Update `PROJECT_RECONSTRUCTION.md` when:

- the stack baseline changes
- root configuration changes
- scripts or environment contracts change
- a new folder or subsystem becomes part of the reconstruction baseline

Promotion rule:

- keep repository-wide stable rules here
- keep zero-to-current regeneration contracts in `PROJECT_RECONSTRUCTION.md`
- keep local details in the nearest `_ABOUT.md`
- keep concise operational lessons in repository memory

If documented guidance and verified code diverge, update the docs so they match intentional repository reality.

---

# 20. Final Rule

If you are unsure where something belongs:

1. inspect the nearest `_ABOUT.md`
2. inspect the parent `_ABOUT.md`
3. compare against existing folders in `src/`
4. prefer feature isolation over convenience
5. prefer extending an existing repository pattern over inventing a parallel one

The goal is not only to generate code, but to keep the repository understandable by both humans and AI as it evolves.
