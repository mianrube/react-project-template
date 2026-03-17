# SignalR Infrastructure

Core SignalR infrastructure for realtime communication.

## Responsibilities

- Create connections
- Handle authentication (MSAL token)
- Configure reconnection
- Provide base utilities

## Structure

- core/
  - connection factory
  - start helpers
- session/
  - session-based streaming helpers

## Types of usage

### Persistent
- Managed in app/providers
- Always connected

### Session-based
- Created in features
- Short-lived
- Streaming or task-based

## Rules

- No domain logic
- No feature-specific events
- Only infrastructure

## AI Notes

To add new realtime functionality:
→ extend via feature session, not here