# Root Store

Combines all reducers into a single store.

## Responsibilities

- Combine feature reducers
- Register RTK Query
- Integrate persist reducers

## Structure

- rootReducer.ts
- store.ts

## Rules

- No business logic
- No feature logic

## AI Notes

When adding a new slice:
→ import and register it here