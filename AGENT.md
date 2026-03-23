# AGENT.md - Authoritative Project Reconstruction Guide

This document is the authoritative AI-oriented specification for this repository.

It is the current source of truth after validating and expanding the repository guidance against the actual project structure and implementation.

Use this file when:

- recreating the project from scratch
- extending the repository without breaking architectural boundaries
- verifying whether a generated implementation matches the current codebase

All technical code, comments, filenames, folder names, and internal documentation must be written in English.

---

# 1. Mission

Your mission is to generate, extend, or maintain this frontend project while preserving:

- the current folder structure
- the current provider composition model
- strict TypeScript boundaries
- feature-first organization
- MUI-first UI conventions
- Redux Toolkit and RTK Query patterns
- selective Redux persistence
- MSAL-based authentication
- SignalR realtime integration
- i18n namespace conventions
- folder-level contextual documentation through `_ABOUT.md`

You must behave like a disciplined maintainer of an existing architecture, not like a generic scaffold generator.

---

# 2. Repository Baseline

The actual repository root currently contains:

```txt
.env.development
.env.template
.git/
.gitignore
.prettierignore
.prettierrc.json
.vscode/
AGENT.md
AGENT_FEATURE_REQUEST_TEMPLATE.md
dist/
eslint.config.js
index.html
node_modules/
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

Important interpretation rules:

- `src/` is the source of truth for application structure.
- `dist/` is generated output and must not be treated as authored source.
- `node_modules/` is dependency output and must not be treated as authored source.
- `README.md` is currently still the generic Vite README and is not an accurate architecture reference.
- The older `AGENT.md` contains useful rules, but also assumptions that no longer match the repository exactly.

---

# 3. Core Stack

Assume this project uses the following stack and package family unless explicitly changed in the repository:

- React 19
- Vite 7
- TypeScript 5
- React Router 7
- Material UI 7
- MUI X Data Grid 8
- MUI X Date Pickers 8
- MUI Icons
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

The package manager in the current repo is `pnpm`.

## 3.1 Installation Contract

If the project is regenerated from zero, the dependency manifest must preserve the current dependency families from `package.json`.

Runtime dependencies currently are:

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

Development dependencies currently are:

- `@eslint/js`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@vitejs/plugin-react-swc`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-simple-import-sort`
- `eslint-plugin-unused-imports`
- `globals`
- `prettier`
- `typescript`
- `typescript-eslint`
- `vite`

Do not hardcode dependency versions as part of the generation contract.

The generation policy must be:

- resolve the latest stable versions that are mutually compatible
- keep the dependency families listed above
- preserve compatibility with the React, Vite, TypeScript, MUI, Redux Toolkit, MSAL, and i18n architecture described in this document
- prefer current ecosystem-supported versions over copying historical versions from the source repository

Compatibility rules for generation:

- `formik` and `yup` must be installed at current stable versions compatible with the generated React baseline
- MUI core packages, icons, Data Grid, and Date Pickers must be chosen from compatible releases of the same ecosystem generation
- `react`, `react-dom`, and related typings must be mutually compatible
- `vite`, the React Vite plugin, TypeScript, ESLint, and `typescript-eslint` must be selected in a combination that is known to work together
- the final arbiter is successful execution of the validation commands defined in this document

Recommended reconstruction flow:

1. create `package.json` with the same `name`, `private`, `version`, and `type`
2. recreate the `scripts`, `dependencies`, and `devDependencies` blocks using the dependency families in this section and current compatible stable versions
3. run `pnpm install`
4. ensure `pnpm-lock.yaml` is generated from that compatible dependency resolution and committed if the workflow expects a locked dependency graph

## 3.2 Form Stack Baseline

The current repository already includes the form stack baseline and the shared forms module.

Mandatory form libraries for the generated scaffold:

- `formik`
- `yup`

Generated-project form rules:

- entity creation and entity editing forms should default to Formik for state handling
- schema validation for creation and editing forms should default to Yup
- validation schemas should live close to the owning feature unless they are genuinely reusable
- translation-friendly validation messages must be supported
- submission state, touched state, and error state must not be reimplemented ad hoc when Formik already solves them

Decision rule by form type:

- use `formik` plus `yup` by default for create, edit, and other forms that collect or mutate validated business data
- simple filter, search, or view-state forms may stay as local component state when they are shallow, low-risk, and do not benefit from schema validation
- if a filter form grows in complexity, cross-field rules, async validation, or reusable field behavior, it may be promoted to Formik plus Yup

Current repository example:

- `features/tenders/components/TendersFilters.tsx` is a valid example of a lightweight filter surface that does not need Formik plus Yup by default

Current shared forms baseline:

```txt
src/shared/forms/
  _ABOUT.md
  entityForm.types.ts
  formModes.ts
  index.ts
```

That shared forms module should expose project conventions and shared helpers when needed, not a second competing form framework.

## 3.3 Package Manifest Contract

The generated `package.json` must preserve this baseline shape:

- `name`
- `private: true`
- `version`
- `type: module`
- `scripts`
- `dependencies`
- `devDependencies`

Do not generate a CommonJS package manifest.

## 3.4 Scripts Contract

The base scripts are mandatory and must exist exactly as they do today.

Current scripts are:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier . --write",
  "format:check": "prettier . --check"
}
```

Behavioral expectations:

- `build` must type-check through project references before running the Vite production build
- `lint` must run against the whole repository root
- `format` and `format:check` must be repository-wide Prettier commands

Useful script invocations:

```txt
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## 3.5 Mechanical Scaffold Requirement

The generated scaffold should be close to mechanical reproduction.

That means the generator should not merely describe the stack. It should emit:

- the dependency manifest
- the scripts
- the config files
- the source tree
- the `_ABOUT.md` files
- the environment template
- the base providers and store wiring
- the form baseline with `formik` and `yup`

The intended result is that a newly generated project can be installed and understood immediately, with minimal manual follow-up.

---

# 4. Non-Negotiable Global Rules

## 4.1 Language Rules

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

## 4.2 Export Rules

Use named exports by default.

Preferred:

```ts
export const HomePage = () => {
  return null;
};
```

Avoid default exports.

## 4.3 Component Rules

Use functional components declared as constants.

Preferred:

```ts
export const MyComponent = () => {
  return <div />;
};
```

## 4.4 Hook Rules

Hooks must:

- start with `use`
- use camelCase
- live in `src/shared/hooks` when reusable
- live in `src/features/<feature>/hooks` when feature-specific

## 4.5 App Config Rule

Do not access `import.meta.env` directly outside the shared app config module.

All environment access must go through:

```txt
src/shared/config/app-config/
```

## 4.6 Feature Boundary Rule

Do not create direct dependencies between unrelated features.

If logic is domain-specific, keep it inside that feature.
If logic is reusable across the application, move it to `shared`.

---

# 5. Top-Level Source Architecture

The real top-level source tree is:

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

Responsibilities:

- `src/app`: application assembly and runtime orchestration
- `src/assets`: authored frontend assets, currently reserved and empty
- `src/features`: business domains
- `src/shared`: domain-agnostic reusable modules
- `src/store`: global Redux composition and persistence infrastructure

There is currently no `pipelines/` folder in the repository.
Do not assume Azure DevOps pipeline files exist unless they are explicitly added later.

---

# 6. Actual Project Tree You Must Reproduce

If rebuilding from scratch, reproduce this structure:

```txt
src/
  main.tsx
  vite-env.d.ts
  app/
    _ABOUT.md
    App.tsx
    index.ts
    main.tsx
    router/
      AppRoutes.tsx
    providers/
      _ABOUT.md
      AppProviders.tsx
      AuthReturnUrlSync.tsx
      GlobalErrorRuntime.tsx
      I18nStoreSync.tsx
      index.ts
      ProvidersBootstrap.tsx
      ProvidersRuntime.tsx
      SignalRNotificationsRuntime.tsx
  assets/
  features/
    _ABOUT.md
    admin/
      pages/
        AdminPage.tsx
    app-feedback/
      _ABOUT.md
      store/
        appFeedbackSlice.ts
        index.ts
    faqs/
      _ABOUT.md
      index.ts
      components/
        FaqDetailsCard.tsx
        index.ts
        FaqForm.tsx
        FaqListPanel.tsx
      model/
        index.ts
        faqForm.schema.ts
        faqForm.types.ts
      pages/
        index.ts
        FaqsPage.tsx
        FaqManagementPage.tsx
      store/
        faqManagementSlice.ts
        index.ts
    home/
      api/
        homeApi.ts
        index.ts
      components/
        CrashTestButton.tsx
      pages/
        HomePage.tsx
    protected/
      pages/
        ProtectedPage.tsx
    realtime/
      _ABOUT.md
      store/
        realtimeSlice.ts
        index.ts
    tenders/
      _ABOUT.md
      index.ts
      api/
        index.ts
        tendersApi.ts
        mocks/
          tenderExtracts.mock.json
      components/
        index.ts
        TendersDataGrid.tsx
        TendersEmptyState.tsx
        TendersFilters.tsx
        TendersSummaryCards.tsx
      hooks/
        index.ts
      model/
        index.ts
        tenders.constants.ts
        tenders.types.ts
      pages/
        index.ts
        TendersListPage.tsx
      realtime/
        index.ts
      store/
        index.ts
    ui/
      _ABOUT.md
      store/
        index.ts
        uiPersistReducer.ts
        uiSlice.ts
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
      index.ts
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
    config/
      _ABOUT.md
      app-config/
      localization/
      theme/
        _ABOUT.md
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
        en/
          home.json
          shared.json
          tenders.json
        es/
          home.json
          shared.json
          tenders.json
    layouts/
      index.ts
      MainLayout.tsx
      SimpleLayout.tsx
    navigation/
      index.ts
      nav.items.tsx
      nav.selectors.ts
      nav.types.ts
    pages/
      index.ts
      NotFoundPage.tsx
      UnauthorizedPage.tsx
    realtime/
      _ABOUT.md
      index.ts
      signalr/
        _ABOUT.md
        index.ts
        core/
        session/
  store/
    _ABOUT.md
    index.ts
    rtkQueryErrorMiddleware.ts
    store.ts
    api/
      baseApi.ts
      baseQueryWithAuth.ts
      index.ts
    app/
    hooks/
      index.ts
      useAppDispatch.ts
      useAppSelector.ts
    persist/
      _ABOUT.md
      create-persist-config.ts
      index.ts
      persist-storages.ts
      storage-version.ts
    root/
      _ABOUT.md
      rootReducer.ts
```

Notes:

- Some folders exist mainly as architectural placeholders for future growth, such as `features/tenders/store`, `features/tenders/realtime`, `features/tenders/hooks`, and `src/store/app`.
- Preserve those placeholders when reconstructing the project.
- `src/shared/forms/` is now part of the real base repository and must be preserved when reconstructing the project.

---

# 7. Bootstrap Flow

The real app bootstrap sequence is:

1. `src/main.tsx` imports `./app/main`
2. `src/app/main.tsx` imports fonts and initializes i18n
3. `bootstrapMsal()` runs before rendering
4. React renders:
   - `StrictMode`
   - `ErrorBoundary`
   - `AppProviders`
   - `App`

This ordering matters.

Do not render the app before MSAL bootstrap completes.

The current flow in conceptual form is:

```txt
main.tsx
  -> app/main.tsx
     -> bootstrapMsal()
     -> createRoot(...).render(
          StrictMode
            ErrorBoundary
              AppProviders
                App
        )
```

---

# 8. Provider Architecture

The provider model is intentionally split in two layers.

## 8.1 Public Provider Entry

The public provider entry point is:

```txt
src/app/providers/AppProviders.tsx
```

## 8.2 Bootstrap Providers

`ProvidersBootstrap.tsx` owns foundational app infrastructure:

- Redux `Provider`
- `PersistGate`
- `BrowserRouter`

It uses `LoadingState` with the label `Restoring session...` while persistence rehydrates.

## 8.3 Runtime Providers and Runtimes

`ProvidersRuntime.tsx` owns runtime concerns:

- `MsalProvider`
- MUI `ThemeProvider`
- `CssBaseline`
- `LocalizationProvider` with `AdapterDayjs`
- `I18nStoreSync`
- `AuthReturnUrlSync`
- `SignalRNotificationsRuntime`
- `GlobalErrorRuntime`
- `GlobalFeedbackSnackbar`

Rules:

- bootstrap providers are for core app shells and store/router wiring
- runtime providers are for authenticated, theme, localization, realtime, and global feedback behavior
- feature business logic does not belong here

---

# 9. Routing Contract

Routing is defined in `src/app/router/AppRoutes.tsx` using React Router 7.

Current route map:

```txt
MainLayout
  /
  /faqs
  /tenders
  /protected          -> RequireAuth
  /admin/*            -> RequireAuth + RequireRoles(['Chat.Admin'])
    index             -> AdminPage
    faqs              -> FaqManagementPage

SimpleLayout
  /public
  /unauthorized
  *                    -> NotFoundPage
```

Rules:

- public routes may render without authentication
- protected routes must use shared guards from `shared/auth/guards`
- role-protected routes must compose `RequireAuth` and `RequireRoles`
- when several routes share the same auth and role boundary, prefer a guarded parent route with nested children instead of repeating the same wrapper on sibling routes
- when redirecting to login, preserve return URL through the shared auth navigation helpers

---

# 10. Layout Contract

## 10.1 MainLayout

`MainLayout.tsx` is the main application chrome.

It renders:

- `TopBar`
- `Sidebar`
- routed `Outlet`
- `StatusBar`

It uses full-height layout with `100dvh`, column composition, and a scrollable main content region.

## 10.2 SimpleLayout

`SimpleLayout.tsx` is intentionally minimal and wraps an `Outlet` inside a basic main region.

Use it for:

- unauthorized page
- not found page
- minimal public screens

Do not move layout-level composition into pages.

---

# 11. Shared Navigation and App Chrome

Shared navigation is defined in:

- `src/shared/navigation/nav.items.tsx`
- `src/shared/navigation/nav.selectors.ts`
- `src/shared/navigation/nav.types.ts`

Current nav items:

- `home` -> `/`
- `faqs` -> `/faqs`
- `protected` -> `/protected`
- `tenders` -> `/tenders`
- `admin` -> `/admin` and requires `Chat.Admin`

App chrome components currently include:

- `TopBar`
- `Sidebar`
- `StatusBar`
- `AppBrand`
- `AuthButtons`
- `ThemeSwitcher`
- `LanguageSwitcher`

Sidebar behavior rules:

- desktop collapse state is persisted in the global UI slice
- mobile drawer open state is global but transient
- role-based filtering happens before rendering nav items
- collapsed desktop mode must remain accessible through tooltips and icons

---

# 12. Authentication Contract

Authentication is centralized in:

```txt
src/shared/auth/
```

This module owns:

- MSAL configuration
- MSAL instance
- bootstrap logic
- login request definitions
- token acquisition helpers
- claim and role helpers
- return URL storage and consumption
- route guards

Rules:

- do not call MSAL directly from features
- do not duplicate token logic in API clients or SignalR code
- token retrieval must be silent-first
- route protection must use shared guards

Current behavioral details:

- `bootstrapMsal()` initializes the instance, handles redirect promises, and sets the active account
- `getAccessToken()` uses `acquireTokenSilent()` first
- on `InteractionRequiredAuthError`, it triggers a one-shot `loginRedirect()` using a session flag to avoid infinite loops
- `RequireAuth` stores the intended URL before redirecting to login
- `AuthReturnUrlSync` consumes that URL after successful auth and navigates back
- `RequireRoles` checks roles via shared helpers and redirects to `/unauthorized`

---

# 13. Environment Variables Contract

Environment values are defined by `.env.template` and read through `src/shared/config/app-config/AppConfig.ts`.

Rebuild the same contract exactly:

```txt
VITE_API_BASE_URL=
VITE_ENVIRONMENT_NAME=development

VITE_AUTH_CLIENT_ID=
VITE_AUTH_TENANT_ID=
VITE_AUTH_AUTHORITY=
VITE_AUTH_REDIRECT_URI=
VITE_AUTH_POST_LOGOUT_REDIRECT_URI=
VITE_AUTH_API_SCOPE=

VITE_SIGNALR_NOTIFICATIONS_HUB_URL=
VITE_SIGNALR_CHAT_HUB_URL=
```

App config currently exposes:

- `apiBaseUrl`
- `environmentName`
- `auth.clientId`
- `auth.tenantId`
- `auth.authority`
- `auth.redirectUri`
- `auth.postLogoutRedirectUri`
- `auth.apiScope`
- `signalR.notificationsHubUrl`
- `signalR.chatHubUrl`

Do not bypass this module by reading env vars in features or components.

---

# 14. Redux Architecture

Global Redux infrastructure lives in:

```txt
src/store/
```

Current store composition:

- `store.ts` configures the store and persistor
- `root/rootReducer.ts` composes reducers
- `api/baseApi.ts` creates the shared RTK Query API
- `api/baseQueryWithAuth.ts` injects bearer tokens
- `hooks/` exposes typed store hooks
- `persist/` defines storage selection, versioning, and migration
- `rtkQueryErrorMiddleware.ts` handles global API failure feedback

Current `rootReducer` shape:

```txt
ui
api
realtime
appFeedback
```

Current reducer sources:

- `ui` -> `features/ui/store/uiPersistReducer`
- `api` -> `baseApi.reducer`
- `realtime` -> `features/realtime/store/realtimeReducer`
- `appFeedback` -> `features/app-feedback/store/appFeedbackReducer`

Rules:

- keep feature slices inside features
- use `src/store` only for global composition and infrastructure
- do not place business-domain reducers in `src/store` unless they are truly application-global

---

# 15. Persist Contract

Persistence is selective and versioned.

Current facts:

- storage kinds: `local` and `session`
- `APP_STORAGE_VERSION = 1`
- the UI slice is the currently persisted feature slice
- persisted UI keys are:
  - `themeMode`
  - `language`
  - `sidebarExpanded`
- `mobileSidebarOpen` is intentionally transient and must not be persisted

Use `createPersistConfig()` for persisted reducers.

Important correction relative to the old AGENT:

- the default migration strategy does not wipe state on every reload
- it keeps persisted state by default
- it resets only when an incoming persisted version differs from `APP_STORAGE_VERSION`

This behavior must be preserved if the project is regenerated.

---

# 16. RTK Query Contract

There is one shared base API:

```txt
src/store/api/baseApi.ts
```

All feature APIs must use `baseApi.injectEndpoints()`.

Current examples:

- `features/home/api/homeApi.ts`
- `features/tenders/api/tendersApi.ts`

Auth behavior:

- `baseQueryWithAuth.ts` fetches the access token through the shared auth module
- bearer token injection happens in the base query wrapper, not in components

Rules:

- do not add ad-hoc `fetch` logic when the concern belongs in RTK Query
- use tags when the feature introduces cache invalidation requirements
- keep endpoints close to the owning feature

---

# 17. i18n Contract

Internationalization is centralized in:

```txt
src/shared/i18n/
```

Current namespaces:

- `shared`
- `home`
- `faqs`
- `tenders`

Current languages:

- `en`
- `es`

Locale file matrix:

```txt
src/shared/i18n/locales/en/shared.json
src/shared/i18n/locales/en/home.json
src/shared/i18n/locales/en/faqs.json
src/shared/i18n/locales/en/tenders.json
src/shared/i18n/locales/es/shared.json
src/shared/i18n/locales/es/home.json
src/shared/i18n/locales/es/faqs.json
src/shared/i18n/locales/es/tenders.json
```

Translation pattern:

- namespace defines the domain
- scoped keys are used inside the namespace

Required hook pattern:

```ts
const BASE_KEY = 'pages.HomePage';
const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'home' });
```

Shared rules:

- prefer `useScopedTranslation()` for UI work
- keep keys structured and predictable
- add translation keys before wiring the component

Current implementation note:

- the project still contains some hardcoded English UI/runtime strings in a few places such as status text, error titles, and minimal pages
- when regenerating the project, preserve current behavior unless the explicit goal is to complete i18n coverage

---

# 18. Theme and Styling Contract

This is a MUI-first project.

Preferred UI primitives:

- `Box`
- `Stack`
- `Container`
- `Paper`
- standard MUI form and display components

Styling priority:

1. `sx`
2. MUI theme configuration and component overrides
3. `styled()` when necessary
4. CSS Modules as a last resort

Do not:

- introduce global CSS
- hardcode repeated design values inside feature components
- scatter MUI X internal selector overrides across features when they belong in the shared theme

Theme source of truth:

- raw theme values belong under `src/shared/config/theme/`
- the MUI theme must be created through `createAppTheme(mode)`
- theme mode is controlled by the persisted `ui.themeMode` state

Client branding and visual identity rule:

- the generated project must start from a sensible default theme baseline
- the theme system must remain open to client-specific branding assets and brand tokens
- if a client provides a corporate theme file, palette definition, typography set, logo pack, or image identity guide, that material must be integrated through the shared theme/config layer, not scattered across feature components
- client branding must be treated as a configuration concern, not as feature-local styling

Recommended client-branding approach for generated projects:

- keep reusable design tokens in `src/shared/config/theme/`
- allow a client-specific brand manifest, token file, or asset bundle to be introduced under shared config or assets
- apply logos, palette values, typography, and other corporate identity rules through `createAppTheme(...)`, shared components such as `AppBrand`, and central asset references
- avoid hardcoding client-specific colors, imagery, or logos directly inside feature pages

Branding implementation rule:

- the architecture must support replacing the baseline visual identity with a customer-specific one without rewriting feature code
- feature screens should consume semantic theme values and shared branding components so the client look-and-feel can be swapped centrally

Current runtime details:

- `ProvidersRuntime.tsx` builds the theme from Redux state
- `setDayjsLocale()` and `mapI18nLanguageToLocale()` keep date handling aligned with the active language

---

# 19. Realtime Contract

Realtime infrastructure is split into shared infrastructure and app-level runtime usage.

Shared infrastructure lives in:

```txt
src/shared/realtime/
src/shared/realtime/signalr/
```

Current shared SignalR structure includes:

- `core/createHubConnection.ts`
- `core/startConnectionSafely.ts`
- `core/buildHubUrl.ts`
- `session/createChatStreamSession.ts`
- `session/chatStreamEvents.ts`

Current global runtime integration:

- `app/providers/SignalRNotificationsRuntime.tsx`

That runtime:

- creates the notifications hub connection using shared infrastructure
- updates `features/realtime/store`
- emits global feedback on connection failure
- listens to `NotificationReceived`

Rules:

- shared realtime owns connection infrastructure
- persistent global connections belong in app runtime providers
- feature-specific session behavior belongs in the corresponding feature's `realtime/` folder

---

# 20. Feature Inventory

The project currently contains these feature modules.

## 20.1 `admin`

Current state:

- contains route-level page `pages/AdminPage.tsx`
- consumed by `/admin`
- protected by role `Chat.Admin`

## 20.2 `app-feedback`

Purpose:

- global feedback message queue
- snackbar-driven message display

Current store contract:

- `messages: AppFeedbackMessage[]`
- actions:
  - `enqueueMessage`
  - `dequeueMessage`
  - `clearMessages`

## 20.3 `home`

Purpose:

- landing page example
- backend connectivity smoke test
- crash testing entry point

Current implementation:

- RTK Query endpoint `ping`
- `HomePage` reads translations from the `home` namespace
- `CrashTestButton` exists as a local feature component
- ping failure is currently treated as expected when no backend is running

## 20.4 `faqs`

Purpose:

- provide a public FAQ browsing experience
- provide FAQ administration workflows for creation, update, and deletion
- demonstrate Formik plus Yup usage with shared MUI plus Formik helpers

Current implementation:

- route-level page `FaqsPage` for public consultation
- route-level page `FaqManagementPage`
- reusable feature form component `FaqForm`
- list and detail components for FAQ browsing and actions
- feature-local slice for shared FAQ state
- feature-local form schema, values model, and initial mock inventory
- success feedback integration through the global app feedback slice

## 20.5 `protected`

Purpose:

- authenticated-only route example

Current state:

- contains route-level page `pages/ProtectedPage.tsx`
- consumed by `/protected`

## 20.6 `realtime`

Purpose:

- global realtime Redux state

Current state shape:

- `notificationsConnected: boolean`
- `lastNotification?: { name: string; payload: unknown; atIso: string }`

## 20.7 `tenders`

This is the most complete business feature and should be treated as the reference feature blueprint.

Purpose:

- load tender extract data
- filter and summarize tender extracts
- render a rich page with summary cards, filters, table, and empty state

Current structure responsibilities:

- `api/` -> RTK Query endpoints and mock data loading
- `api/mocks/tenderExtracts.mock.json` -> local mock source
- `components/` -> feature-specific UI blocks
- `model/` -> types, constants, filter contracts
- `pages/` -> route-level page composition
- `hooks/`, `store/`, `realtime/` -> present as extension points

Current endpoints:

- `getTenderExtracts`
- `getTenderFilterOptions`

Current page behavior:

- uses local draft filters and applied filters state
- uses `startTransition()` when applying or clearing filters
- shows `LoadingState` during initial load
- shows `ErrorState` with retry on failure
- shows `TendersEmptyState` when filtered result is empty
- otherwise renders `TendersDataGrid`

## 20.8 `ui`

Purpose:

- global UI preferences and shared layout state

Current state shape:

- `themeMode: 'light' | 'dark'`
- `language: 'en' | 'es'`
- `sidebarExpanded: boolean`
- `mobileSidebarOpen: boolean`

Rules:

- persist durable preferences
- keep only shared chrome state here
- do not move feature-specific local UI state into this slice

---

# 21. Shared Module Inventory

## 21.1 `shared/components`

This folder owns reusable, domain-agnostic UI building blocks.

Current exported shared components include:

- `AppBrand`
- `AuthButtons`
- `ErrorBoundary`
- `ErrorState`
- `GlobalFeedbackSnackbar`
- `LanguageSwitcher`
- `LoadingState`
- `Sidebar`
- `StatusBar`
- `ThemeSwitcher`
- `TopBar`

## 21.2 `shared/errors`

Owns normalization helpers for runtime and API-friendly error display.

## 21.3 `shared/hooks`

Currently exposes `useScopedTranslation()`.

## 21.4 `shared/layouts`

Owns `MainLayout` and `SimpleLayout`.

## 21.5 `shared/pages`

Owns generic pages such as:

- `NotFoundPage`
- `UnauthorizedPage`

## 21.6 `shared/config`

Owns:

- app config and env readers
- localization helpers
- theme creation and shared presets

## 21.7 `shared/forms`

This module is part of the current base repository.

Purpose:

- document the project-wide form conventions
- centralize reusable form helpers only when they are truly cross-feature
- define that Formik is the baseline form-state library and Yup is the baseline validator
- expose small reusable contracts such as entity form mode and submit typings

Current shared baseline includes:

- Formik plus MUI field adapters
- entity form mode helpers
- shared entity form typing contracts

Rules:

- do not move feature-specific forms into `shared/forms`
- do not create an alternative competing form architecture
- only shared adapters, helpers, and conventions belong here

---

# 22. `_ABOUT.md` Rules

`_ABOUT.md` is a required part of the architecture.

Create or maintain `_ABOUT.md` for:

- top-level architectural folders
- feature folders
- shared submodules with non-obvious responsibilities
- provider folders
- persist folders
- realtime folders
- theme/config folders

Before modifying a folder, read:

1. the folder's own `_ABOUT.md`
2. the nearest relevant parent `_ABOUT.md`

When creating a new architecturally relevant folder, create `_ABOUT.md` at the same time.

## 22.1 Automatic Generation Requirement

For the generated scaffold, `_ABOUT.md` files must be created automatically.

Do not wait for a later documentation pass.
Do not leave major folders undocumented on first generation.

At minimum, the generator must emit `_ABOUT.md` for:

- `src/`
- `src/app/`
- `src/app/providers/`
- `src/features/`
- each top-level feature folder
- `src/shared/`
- `src/shared/auth/`
- `src/shared/components/`
- `src/shared/config/`
- `src/shared/config/theme/`
- `src/shared/errors/`
- `src/shared/hooks/`
- `src/shared/i18n/`
- `src/shared/realtime/`
- `src/shared/realtime/signalr/`
- `src/shared/forms/`
- `src/store/`
- `src/store/persist/`
- `src/store/root/`

## 22.2 Minimum `_ABOUT.md` Content Contract

Each generated `_ABOUT.md` should contain at least these sections when relevant:

- purpose of the folder
- responsibilities
- what does not belong there
- naming or export conventions
- AI notes or generation rules when the folder has special constraints

Recommended shape:

```md
# Folder Name

Short explanation of why the folder exists.

## Responsibilities

- responsibility one
- responsibility two

## Rules

- what belongs here
- what must not be placed here

## AI Notes

- generation or maintenance guidance
```

## 22.3 Generation Quality Rule

The generated `_ABOUT.md` files must be folder-specific.

Do not generate generic filler text that says the same thing in every folder.
Each `_ABOUT.md` must explain the real reason that folder exists in this architecture.

---

# 23. Barrel Rules

Use barrels intentionally.

Must use barrels for:

- stable public APIs
- provider folder exports
- shared component public exports
- store public exports
- mature feature public exports

Current examples:

- `src/app/index.ts`
- `src/app/providers/index.ts`
- `src/shared/components/index.ts`
- `src/store/index.ts`
- `src/features/tenders/index.ts`

Important repository detail:

- `tsconfig.app.json` defines root aliases for bare `@shared` and bare `@features`
- however, `src/shared/index.ts` and `src/features/index.ts` do not currently exist in the repository

If regenerating the project exactly as implemented today:

- preserve the existing alias map
- avoid introducing bare `@shared` or bare `@features` imports unless you also add the missing root barrels

If improving the scaffold for stricter consistency, create:

```txt
src/shared/index.ts
src/features/index.ts
```

but only if that change is explicitly accepted.

---

# 24. Import Ordering Rules

Import order is enforced by ESLint with `simple-import-sort`.

Use this grouping order:

1. Node built-ins
2. React and React DOM
3. external packages
4. `@app`
5. `@shared`
6. `@features`
7. `@store`
8. `@assets`
9. relative imports
10. side-effect imports

Do not fight the configured linter.

---

# 25. Tooling and Alias Rules

This section defines the baseline configuration contract for the generated project.

If a scaffold omits or weakens these files, it is not a faithful reproduction.

## 25.0 Root Configuration Files Contract

The generated repository must include and wire these root files intentionally:

- `package.json`
- `pnpm-lock.yaml` after installation
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `eslint.config.js`
- `.prettierrc.json`
- `.prettierignore`
- `.env.template`
- `.env.development` when a local baseline is expected

## 25.0.1 `index.html` Contract

The generated `index.html` must support the Vite entry model and include:

- a root mount node with id `root`
- the module script that points to `src/main.tsx`
- a standard HTML shell compatible with React and Vite

Do not generate a legacy CRA-style HTML template.

## 25.0.2 Entry File Contract

The generated entry files must preserve this split:

- `src/main.tsx` only imports `./app/main`
- `src/app/main.tsx` performs the real bootstrap

`src/app/main.tsx` must own these side effects and startup responsibilities:

- font imports
- i18n initialization import
- MSAL bootstrap before render
- `createRoot(...).render(...)`
- root `ErrorBoundary`
- `AppProviders`
- `App`

This split should not be collapsed unless the architecture is intentionally redesigned.

Vite aliases currently are:

```txt
@app     -> src/app
@shared  -> src/shared
@features -> src/features
@store   -> src/store
@assets  -> src/assets
```

TypeScript path aliases mirror that intent through `tsconfig.app.json`.

## 25.1 Vite Contract

`vite.config.ts` currently must:

- import `path` from `node:path`
- use `@vitejs/plugin-react-swc`
- export `defineConfig(...)`
- define aliases for `@app`, `@shared`, `@features`, `@store`, and `@assets`

This is not optional decoration. The alias layout is part of the architecture because the import conventions depend on it.

## 25.2 TypeScript Contract

The root `tsconfig.json` currently acts as the project-reference entry point and references:

- `./tsconfig.app.json`
- `./tsconfig.node.json`

`tsconfig.app.json` must preserve these characteristics:

- `target: ES2022`
- DOM libs enabled
- `module: ESNext`
- `moduleResolution: bundler`
- `allowImportingTsExtensions: true`
- `verbatimModuleSyntax: true`
- `moduleDetection: force`
- `noEmit: true`
- `jsx: react-jsx`
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `erasableSyntaxOnly: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedSideEffectImports: true`
- path aliases for `@app`, `@shared`, `@features`, `@store`, and `@assets`
- `include: ["src"]`

`tsconfig.node.json` must preserve these characteristics:

- `target: ES2023`
- Node types enabled
- `module: ESNext`
- `moduleResolution: bundler`
- `allowImportingTsExtensions: true`
- `verbatimModuleSyntax: true`
- `moduleDetection: force`
- `noEmit: true`
- the same strictness profile used for tooling files
- `include: ["vite.config.ts"]`

Strict TypeScript expectations currently include:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noEmit: true`
- bundler module resolution

## 25.3 ESLint Contract

`eslint.config.js` currently must:

- use flat config through `defineConfig`
- ignore `dist` and `node_modules`
- lint `**/*.{ts,tsx}`
- extend:
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `eslint-plugin-react-hooks` flat recommended
  - `eslint-plugin-react-refresh` Vite config
  - `eslint-config-prettier` last
- register plugins:
  - `simple-import-sort`
  - `unused-imports`
- enforce import grouping aligned with the architecture aliases
- error on unused imports
- warn on unused variables unless prefixed with `_`

The import-sort grouping is part of the repository architecture and must not be replaced casually.

## 25.4 Prettier Contract

`.prettierrc.json` currently must preserve:

- `singleQuote: true`
- `semi: true`
- `trailingComma: all`
- `printWidth: 100`
- `tabWidth: 2`
- `arrowParens: always`

`.prettierignore` currently must ignore:

- `dist`
- `node_modules`
- `coverage`
- `*.log`

## 25.5 Forms Configuration Contract

The generated scaffold must preconfigure forms as a first-class concern.

At minimum, this means:

- `formik` is installed
- `yup` is installed
- a shared forms entry point exists at `src/shared/forms/index.ts`
- `src/shared/forms/_ABOUT.md` explains the form conventions
- the architecture states that Formik is the default form state solution and Yup is the default schema validator for creation and editing forms

Recommended form baseline guidance for generated projects:

- feature forms should live inside the owning feature
- create and edit forms should use Formik plus Yup unless there is a strong reason not to
- lightweight filters made of simple selects, toggles, or query controls may use local state when validation and submission semantics are minimal
- reusable field adapters or form helpers may live in `shared/forms`
- validation schemas should be colocated with the feature unless shared across domains
- form submission should integrate cleanly with RTK Query mutations or feature services
- error rendering and translated labels/messages should follow shared UI and i18n conventions

Anti-patterns to avoid:

- using Formik for a tiny filter form that only mirrors a handful of dropdowns with no meaningful validation
- reimplementing touched, dirty, submission, and error orchestration manually in create and edit forms when Formik already covers the need
- scattering validation logic inline inside UI components instead of keeping it in a Yup schema or clearly scoped helper

## 25.6 Package Script and Validation Contract

After generation, the scaffold should be considered incomplete until these commands are expected to work:

- `pnpm install`
- `pnpm build`
- `pnpm lint`
- `pnpm format:check`

Recommended edit workflow for day-to-day development:

1. run Prettier on the files that were created or modified
2. run ESLint on the touched files with fix enabled and resolve the remaining problems
3. only after formatting and lint issues are resolved, run the normal repository-wide validation commands
4. run `format:check` as the final repository-wide formatting gate

Practical rule:

- after adding or editing files, format first
- after formatting, run lint on the touched files and fix the reported issues before moving on
- do not jump directly to the normal validation flow while formatting or lint problems are still open
- do not leave formatting as an optional cleanup step after validation

Suggested commands for a touched-file workflow:

- `pnpm prettier <changed-files> --write`
- `pnpm eslint <changed-files> --fix`
- `pnpm lint`
- `pnpm build`
- `pnpm format:check`

Operational interpretation:

- `pnpm lint` and `pnpm build` are part of the final validation phase, not the first cleanup phase
- the expected sequence is: touched-file format, touched-file lint and fixes, repository-wide lint, repository-wide build, repository-wide `format:check`
- if lint autofix changes a file, run Prettier on that file again before the final repository-wide checks

If one of these commands cannot run because the scaffold omitted a root config or baseline dependency, the generation is not complete.

Formatting and linting are part of the project contract, not optional extras.

---

# 26. From-Scratch Reconstruction Checklist

If generating this project from zero, follow this exact order.

1. Create the root config files:
   - `vite.config.ts`
   - `tsconfig.json`
   - `tsconfig.app.json`
   - `tsconfig.node.json`
   - `eslint.config.js`
   - `.prettierrc.json`
   - `.prettierignore`
   - `.env.template`
2. Recreate `package.json` with the correct package shape, scripts, module type, and dependency families from section 3, including `formik` and `yup` as part of the base runtime dependencies.
3. Run `pnpm install` so the lockfile reflects the chosen compatible dependency set.
4. Create `index.html`, `src/main.tsx`, and `src/app/main.tsx` with the exact bootstrap split described in section 25.
5. Create the `app/providers` split exactly as described.
6. Create the Redux store, root reducer, RTK Query base API, persist helpers, and typed hooks.
7. Create `shared/auth` and wire MSAL bootstrap, token access, guards, and return URL helpers.
8. Create `shared/config/app-config` and wire all env access through it.
9. Create `shared/i18n`, namespaces, locale files, and `useScopedTranslation()`.
10. Create `shared/layouts`, `shared/pages`, `shared/navigation`, shared app chrome components, the base `shared/forms` module, and the shared theme structure prepared for future client branding.
11. Create the global feature slices:
    - `features/ui`
    - `features/realtime`
    - `features/app-feedback`

12. Create the route example features:
    - `features/home`
    - `features/protected`
    - `features/admin`

13. Create the reference domain feature `features/tenders`, including mock JSON data and all subfolders.
14. Automatically generate `_ABOUT.md` files for every architecturally relevant folder using the folder-specific documentation contract from section 22.
15. Reproduce the exact scripts, Vite aliases, TypeScript project references, ESLint flat config, Prettier config, entrypoint split, env template, and theme extensibility rules from sections 3, 18, and 25.
16. Validate the base form module and form baseline so that future features can implement Formik plus Yup forms without additional dependency or architecture setup.
17. Verify routes, provider composition, persistence, i18n startup, MSAL bootstrap, SignalR runtime wiring, branding extensibility, and that `pnpm build`, `pnpm lint`, and `pnpm format:check` are valid for the generated scaffold.

---

# 27. Rules for New Features

When creating a new feature:

1. create `src/features/<feature>/`
2. add `_ABOUT.md`
3. add `pages/`
4. add `components/`
5. add `hooks/` if needed
6. add `api/` if data fetching exists
7. add `store/` if feature Redux state exists
8. add `realtime/` if the feature owns realtime sessions
9. add `index.ts` when the feature exposes a stable public API
10. add or update translation keys and locale files
11. add routes and navigation only if the feature is navigable
12. keep business logic self-contained

Use `tenders` as the reference for a full-featured module and `home` as the reference for a lightweight route feature.

---

# 28. Rules for New Shared Modules

When creating a new shared module:

1. confirm that the concern is genuinely domain-agnostic
2. create a clearly scoped folder
3. add `_ABOUT.md` if the folder is architecturally meaningful
4. add a public `index.ts` when the module is meant to be imported externally
5. never import from features into shared

---

# 29. Rules for Errors and Feedback

Use the existing global error and feedback approach.

Current patterns:

- render and lifecycle failures -> `ErrorBoundary`
- window runtime errors -> `GlobalErrorRuntime`
- unhandled promise rejections -> `GlobalErrorRuntime`
- API and runtime user feedback -> `app-feedback` feature + `GlobalFeedbackSnackbar`
- page-level load failures -> `ErrorState`
- page-level loading -> `LoadingState`

Do not create isolated, competing global snackbar systems.

---

# 30. What Must Never Be Done

Do not:

- add default exports casually
- place feature logic in `shared`
- access env vars directly outside app config
- bypass RTK Query for feature data fetching without a strong reason
- duplicate auth logic outside `shared/auth`
- place feature-specific SignalR sessions in shared infrastructure
- persist transient UI state carelessly
- forget `_ABOUT.md` for new architectural folders
- leave `AGENT.md` stale after a verified architectural, workflow, or tooling change
- invent a `pipelines/` folder unless the repo actually adds it

---

# 31. Known Repository Gaps and Accuracy Notes

These are important when using this document to regenerate the project.

## 31.1 Old AGENT vs Real Repo

The old `AGENT.md` mentions a `pipelines/` folder and Azure DevOps pipeline responsibilities.
That folder does not exist in the current workspace.

## 31.2 Generic README

The root `README.md` is still the stock Vite template and should not be treated as the project architecture guide.

## 31.3 Alias Consistency Gap

`tsconfig.app.json` defines bare alias entry points for `@shared` and `@features`, but the corresponding root `index.ts` files are absent.

## 31.4 Partial i18n Coverage

The project strongly prefers translated UI copy, but some current screens and runtime messages still contain hardcoded English text.

These gaps should be documented, not silently ignored.

---

# 32. Evolution and Self-Update Rules

This repository is expected to evolve.

`AGENT.md` is not a static manifesto. It is the living source of truth and must be updated when the real codebase establishes a better rule, workflow, baseline, or architectural decision.

## 32.1 Update Triggers

Update `AGENT.md` when one or more of these happens:

- a new architectural pattern is introduced and accepted in the codebase
- a repeated implementation decision appears in multiple places and is no longer accidental
- a tooling workflow proves necessary in practice, such as formatting before lint or lint cleanup before global validation
- a previous rule is shown to be incomplete, misleading, or outdated
- a new shared module, cross-cutting concern, or generation contract becomes part of the baseline
- a feature establishes a reusable reference implementation that future work should follow

## 32.2 Update Scope Rule

When a verified rule changes, update the guidance in the same delivery whenever feasible.

The expected order is:

1. validate the new behavior in real code
2. update `AGENT.md`
3. update the nearest relevant `_ABOUT.md` files if the change affects a folder contract
4. update any baseline example, shared helper, or reference feature that now represents the preferred pattern
5. run the normal validation sequence

Do not defer rule updates indefinitely after the code has already moved on.

## 32.3 Decision Promotion Rule

Not every local implementation detail deserves promotion into `AGENT.md`.

Promote a decision only when it is at least one of the following:

- architectural
- cross-feature
- repeated
- baseline-defining
- required to avoid future regressions or confusion

Keep purely local details inside the owning feature or folder documentation.

## 32.4 Conflict Resolution Rule

If the documented rule and the verified repository reality diverge:

- first confirm the real implementation is intentional and validated
- then update `AGENT.md` so it matches the current repository truth
- remove or rewrite obsolete guidance instead of layering contradictory notes on top

The goal is one current rule set, not a history of every past assumption.

## 32.5 Automation Bias

The project should favor self-adaptation with as little manual follow-up as possible.

Practical interpretation:

- when a change creates a new stable pattern, document it immediately
- when a new folder changes architectural understanding, update `_ABOUT.md` in the same work
- when a repeated code shape appears, consider extracting a shared helper or reference implementation
- when validation exposes recurring friction, convert the learned workflow into an explicit rule
- when a rule becomes obsolete, delete or replace it instead of keeping it for nostalgia

## 32.6 Repository Memory Rule

Use repository memory for concise, verified facts that help future work, especially when they are easy to forget but important in practice.

Examples:

- persistence caveats
- migration gotchas
- validated workflow rules
- important exceptions to a general pattern

Repository memory does not replace `AGENT.md`.

Use `AGENT.md` for stable repository-wide rules and architecture.
Use repository memory for short operational facts and lessons learned.

## 32.7 Success Criterion

The repository is in a healthy state when:

- the codebase follows the documented rules
- `AGENT.md` reflects the current reality instead of a historical snapshot
- `_ABOUT.md` files explain local structure accurately
- validation workflows are explicit and repeatable
- future contributors can infer the next correct move from the repository itself

---

# 32. Final Rule

If you are unsure where something belongs:

1. inspect the nearest `_ABOUT.md`
2. inspect the parent `_ABOUT.md`
3. compare against the actual folder inventory in this file
4. prefer feature isolation over convenience
5. prefer extending an existing repository pattern over inventing a parallel one

This repository is intended to be understandable by both humans and AI through explicit structure.
Your job is not only to generate code, but to preserve that property with accuracy.
