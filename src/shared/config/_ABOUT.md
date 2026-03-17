# Configuration Layer

Centralized configuration for the application.

## Responsibilities

- Environment variables parsing
- Type-safe access to configuration
- AppConfig definition

## Files

- AppConfig.ts
- env helpers (readEnvString, etc.)

## Supported Types

- string
- number
- boolean
- arrays (if needed)

## Rules

- NEVER access import.meta.env directly outside this module
- Always go through AppConfig

## Environments

Supports:
- development
- staging
- preproduction
- production

## AI Notes

If new config is required:
1. Add to .env.template
2. Add to vite-env.d.ts
3. Add to AppConfig