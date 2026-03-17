# App Layer

This folder is responsible for application composition.

## Responsibilities

- Application bootstrap
- Providers composition
- Runtime side-effects
- Global integrations (SignalR, i18n sync, auth sync)

## Structure

- providers/
  - AppProviders (public entry point)
  - Bootstrap providers (Redux, Persist, MSAL)
  - Runtime providers (SignalR, global errors, sync logic)

## Rules

- Do NOT place business logic here
- Do NOT place feature-specific code
- This layer orchestrates, not implements

## AI Notes

If you need to:
- add a global provider → do it here
- integrate a new cross-cutting concern → do it here