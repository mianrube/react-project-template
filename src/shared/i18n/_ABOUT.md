# Internationalization (i18n)

Handles translations using i18next.

## Responsibilities

- i18n configuration
- Language switching
- Namespaced translations

## Structure

- locales/
  - en/
  - es/
- i18n.ts (setup)

## Pattern

Uses structured keys:

shared.navigation.home
features.chat.header.title

## Rules

- Always use useScopedTranslation
- Avoid hardcoded strings
- Keep keys structured and predictable

## AI Notes

When creating new UI:
→ define translation keys first
→ then use tScoped()