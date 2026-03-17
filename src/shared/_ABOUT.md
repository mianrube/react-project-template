# Shared Layer

This folder contains reusable, domain-agnostic modules.

## Responsibilities

- UI components (generic)
- Hooks
- Config (AppConfig, env handling)
- Auth helpers
- Realtime infrastructure (SignalR)
- Error utilities
- i18n setup

## Rules

- Must NOT contain business logic
- Must NOT depend on features
- Must be reusable across the entire app

## Examples

Good:
- Button component
- useDebounce hook
- SignalR connection factory

Bad:
- Chat-specific logic
- Admin-specific components

## AI Notes

If logic is specific to a feature:
→ move it to `features/`

If reusable across features:
→ place it here