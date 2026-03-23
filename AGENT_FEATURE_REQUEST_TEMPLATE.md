# AGENT_FEATURE_REQUEST_TEMPLATE.md

# Feature Request — [FEATURE_NAME]

You are working inside a project that follows the **AI Contextual Repository Pattern**.

You MUST strictly follow:

- AGENT.md
- all relevant `_ABOUT.md` files

Do NOT improvise architecture.

---

# 1. Feature Description

[DESCRIBE HERE WHAT THE FEATURE SHOULD DO]

Examples:

- What problem does it solve?
- What should the user see?
- What interactions are expected?

---

# 2. Functional Requirements

- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

---

# 3. Data Strategy (MANDATORY)

Define the intended backend strategy before implementation.

## 3.1 Resource Identity

- Feature folder: `src/features/[feature-name]/`
- Primary resource key: `[resource-key]`
- Does this resource need to be selectable through `VITE_MOCK_API_RESOURCES`?
  - [yes/no]

## 3.2 Backend Mode

Choose one:

- [ ] Real backend from day one
- [ ] Mock HTTP backend through `json-server`
- [ ] Feature-local static mock data
- [ ] Mixed mode by resource

## 3.3 Expected Behavior By Mode

If **Real backend from day one**:

- Real base URL must come from `VITE_API_BASE_URL`
- The feature API layer must call the real endpoint directly through RTK Query
- No mock source should be introduced unless explicitly requested for local development support

If **Mock HTTP backend through `json-server`**:

- Prefer this when the feature behaves like a real CRUD or query API
- Route the feature through shared app config helpers
- Use `createCrudMockResourceUrls(resource, collectionPath)` for CRUD-like collections
- Store mock seed data in `mock-api/db.json`
- Keep pages and components unaware of whether the source is real or mock

If **Feature-local static mock data**:

- Use this only for read-only, local, or transformation-oriented datasets
- Keep the mock source inside the feature API boundary
- Pages and components must still consume RTK Query hooks or the agreed feature API abstraction

If **Mixed mode by resource**:

- Specify exactly which resources are real and which are mock-backed
- Resource-level routing must happen in the feature API layer, never in pages or components
- The implementation must support switching resources independently through config

## 3.4 API Contract

List every required endpoint or query surface.

- Endpoint: `[GET/POST/PATCH/DELETE ... /endpoint]`
- Uses: `[real/mock/both]`
- Description: `[WHAT IT RETURNS / DOES]`

Repeat as needed.

## 3.5 Types

```ts
type [ENTITY_NAME] = {
  [FIELD]: [TYPE];
};
```

## 3.6 Temporary Backend Gaps

If the feature starts mocked but already has known future backend changes, describe them here.

- Is `REAL_API_PENDING` expected? [yes/no]
- If yes, why exactly? [client-side aggregation / temporary response mapping / missing real endpoint / other]
- What should remain stable when the real backend arrives? [pages/components/forms/query hooks/etc.]

---

# 4. Feature Scope

Create or extend the feature here:

`src/features/[feature-name]/`

The structure SHOULD include the folders that actually fit the feature:

- `api/`
- `components/`
- `pages/`
- `hooks/` if needed
- `model/`
- `store/` only if truly needed
- `realtime/` only if truly needed
- `index.ts`
- `_ABOUT.md`

---

# 5. UI Requirements

- Use Material UI
- Use `sx` for styling
- Use MUI Icons if needed
- Responsive layout
- Clean composition using MUI primitives such as `Box`, `Stack`, and `Grid`

---

# 6. State Management

- Use RTK Query for server or mock-backed data
- Do NOT use `fetch` directly in feature components
- Do NOT duplicate server state locally without a clear reason
- Keep real vs mock routing decisions inside the feature API layer

---

# 7. Forms (If Applicable)

- If the feature includes create or edit flows, default to Formik + Yup
- Keep validation schemas close to the feature unless they are genuinely reusable
- Lightweight filters may stay as local component state if they do not need full form orchestration

---

# 8. i18n Requirements

- Create or use namespace: `[namespace]`
- Follow Model B
- Use `useScopedTranslation`

Example keys:

`pages.[PageName].title`

`components.[ComponentName].label`

`states.loading`

`states.empty`

`states.error`

---

# 9. Routing

- Add route if needed
- Use the existing routing system
- Apply guards if required: public, protected, or role-based

---

# 10. Error / Loading Handling

- Use shared components such as `LoadingState` and `ErrorState`
- Handle loading, error, and empty state explicitly

---

# 11. Realtime (Optional)

If needed:

- Use shared SignalR infrastructure
- Create feature-specific runtime pieces inside `features/[feature]/realtime/`

---

# 12. Documentation (MANDATORY)

- Create or update `_ABOUT.md` for the feature
- Document whether the feature is real-backed, mock-backed, or mixed
- Document the resource key used for `VITE_MOCK_API_RESOURCES` when applicable
- Document any `REAL_API_PENDING` markers with concrete replacement intent

---

# 13. Barrels

- Create `index.ts` where appropriate
- Use barrels for clean imports

---

# 14. Constraints

Do NOT:

- break architecture rules
- introduce default exports unnecessarily
- hardcode strings, use i18n
- hardcode colors, use theme
- place feature logic in shared
- put real vs mock branching in pages or components

---

# 15. Output

Generate:

- folder structure
- all required files
- complete implementation
- typings
- translations (`en` + `es`)
- `_ABOUT.md`
- mock backend wiring or real backend wiring according to the selected mode

---

# 16. Additional Notes

[ANY EXTRA DETAILS, EDGE CASES, OR MIGRATION CONSTRAINTS]
