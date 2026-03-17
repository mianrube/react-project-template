# Persist Configuration

Handles Redux persistence using redux-persist.

## Responsibilities

- Storage selection (localStorage / sessionStorage)
- Versioning
- Migration strategy

## Key Concepts

- Each slice defines its own persist config
- Version mismatch resets state

## Rules

- Do NOT persist everything
- Only persist necessary state

## Storage Types

- local → long-term
- session → per session

## AI Notes

When persisting a slice:
→ use createPersistConfig()