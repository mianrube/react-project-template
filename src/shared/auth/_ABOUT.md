# Authentication (MSAL)

This module handles authentication using Microsoft Authentication Library (MSAL).

## Responsibilities

- MSAL instance configuration
- Login / logout flows
- Access token retrieval
- Role extraction from account claims

## Key APIs

- bootstrapMsal()
- getAccessToken()
- getAccountRoles()
- hasAnyRole()

## Rules

- Do NOT call MSAL directly from features
- Always use helpers from this module
- Token retrieval must be silent-first

## Integration

- Used by:
  - RTK Query (API calls)
  - SignalR (accessTokenFactory)
  - Route guards

## AI Notes

If authentication behavior needs to change:
→ modify this module only

Do not duplicate auth logic elsewhere