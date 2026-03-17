# Shared Hooks

Reusable React hooks.

## Responsibilities

- Encapsulate reusable logic
- Provide abstraction over libraries
- Improve readability and consistency

## Examples

- useScopedTranslation
- useDebounce (future)
- usePrevious (future)

## Rules

- Must be generic
- Must NOT depend on features
- Must NOT include business logic

## Naming Convention

- useXxx

## AI Notes

If logic is reusable across features:
→ create a hook here

If specific to a feature:
→ place inside that feature