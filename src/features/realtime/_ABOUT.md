# Realtime Feature

Handles global realtime state (notifications, connection status).

## Responsibilities

- Store connection state
- Store last events
- Provide UI feedback (StatusBar)

## Rules

- Only global realtime state
- No feature-specific streaming

## AI Notes

Feature-specific realtime:
→ create inside that feature