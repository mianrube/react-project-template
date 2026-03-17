# Features Layer

This folder contains all business domains of the application.

## Responsibilities

- Pages
- Feature-specific components
- Feature state (slices, RTK Query APIs)
- Feature-specific realtime sessions (SignalR)

## Structure (example)

features/chat/
  components/
  hooks/
  store/
  realtime/
  pages/

## Rules

- Features must be self-contained
- No direct dependency between features
- Shared logic must be extracted to `shared/`

## Realtime Rule

- Persistent connections → app layer
- Session-based connections → feature layer

## AI Notes

When creating new functionality:
- always create a new feature
- do not extend unrelated features