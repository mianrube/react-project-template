# UI Feature

This feature owns global user interface preferences and cross-layout UI state.

## Responsibilities

- Persist user interface preferences such as theme mode and language
- Store desktop layout preferences that should survive reloads
- Store transient layout state needed by shared app chrome components

## Rules

- Persist only durable preferences that should be restored between sessions
- Keep transient responsive UI state here only when it coordinates shared layout components
- Do not place feature-specific UI state here

## Current State

- `themeMode`: persisted
- `language`: persisted
- `sidebarExpanded`: persisted desktop preference
- `mobileSidebarOpen`: transient mobile drawer state
