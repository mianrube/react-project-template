# Realtime (SignalR)

This module provides SignalR infrastructure.

## Types of connections

### Persistent
- Defined in app layer
- Always active
- Used for notifications

### Session-based
- Defined in features
- Created on demand
- Used for streaming (chat, progress, etc.)

## Responsibilities

- Connection factories
- Authentication integration (MSAL)
- Reconnection strategies

## Rules

- No domain logic here
- No feature-specific events

## AI Notes

To implement streaming:
→ create a session in the feature layer
→ do NOT modify shared core