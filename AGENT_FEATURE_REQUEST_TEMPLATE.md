# AGENT_FEATURE_REQUEST_TEMPLATE.md

# Feature Request — [FEATURE_NAME]

You are working inside a project that follows the **AI Contextual Repository Pattern**.

You MUST strictly follow:
- AGENT.md
- all relevant _ABOUT.md files

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

# 3. Data Requirements

## API

- Endpoint: [GET/POST/... /endpoint]
- Description: [WHAT IT RETURNS / DOES]

## Types

```ts
type [ENTITY_NAME] = {
  [FIELD]: [TYPE];
};
```

---

# 4. Feature Scope

Create a new feature:

src/features/[feature-name]/

The structure MUST include:

api/
components/
pages/
hooks/ (if needed)
model/
store/ (if needed)
realtime/ (if needed)
index.ts
_ABOUT.md

---

# 5. UI Requirements

- Use Material UI
- Use `sx` for styling
- Use MUI Icons if needed
- Responsive layout
- Clean composition using MUI primitives (Box, Stack, Grid)

---

# 6. State Management

- Use RTK Query for server data
- Do NOT use fetch directly
- Do NOT duplicate server state locally

---

# 7. i18n Requirements

- Create or use namespace: [namespace]
- Follow Model B

Example keys:

pages.[PageName].title
components.[ComponentName].label
states.loading
states.empty
states.error

- Use `useScopedTranslation`

---

# 8. Routing

- Add route if needed
- Use existing routing system
- Apply guards if required:
  - public
  - protected
  - role-based

---

# 9. Error / Loading Handling

- Use shared components:
  - LoadingState
  - ErrorState
- Handle:
  - loading
  - error
  - empty state

---

# 10. Realtime (Optional)

If needed:

- Use shared SignalR infrastructure
- Create feature-specific session inside:

features/[feature]/realtime/

---

# 11. Documentation (MANDATORY)

- Create `_ABOUT.md` for the feature
- Update parent `_ABOUT.md` if necessary

---

# 12. Barrels

- Create `index.ts` where appropriate
- Use barrels for clean imports

---

# 13. Constraints

Do NOT:

- break architecture rules
- introduce default exports unnecessarily
- hardcode strings (use i18n)
- hardcode colors (use theme)
- place feature logic in shared

---

# 14. Output

Generate:

- folder structure
- all required files
- complete implementation
- typings
- translations (en + es)
- `_ABOUT.md`

---

# 15. Additional Notes

[ANY EXTRA DETAILS OR EDGE CASES]
