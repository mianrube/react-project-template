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

## Theme Submodule

- Shared MUI and MUI X baseline styles belong in `config/theme/`
- Reusable component overrides must be implemented in `create-app-theme.ts`
- Feature-local styling should not redefine global component baselines already owned by the theme
- Feature code must not keep reusable `MuiDataGrid` selector overrides locally; extend the global theme first
- Shared baseline defaults for primitives should only be defined globally when they are safe for every instance of that primitive
- Reusable but non-universal visual recipes should be exposed from `config/theme/` as shared presets or helpers and then consumed by features

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
