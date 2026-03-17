# App Providers

This module composes all application providers.

## Responsibilities

- Redux Provider
- PersistGate
- MSAL Provider
- Theme Provider
- i18n sync
- SignalR runtime
- Global error runtime

## Structure

- AppProviders (public entry)
- Bootstrap providers
- Runtime providers

## Types

### Bootstrap
- Initialize app dependencies

### Runtime
- Side effects
- Subscriptions
- Global listeners

## Rules

- No business logic
- No feature logic

## AI Notes

If adding global behavior:
→ add a runtime provider