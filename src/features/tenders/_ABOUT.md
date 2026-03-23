# Tenders Feature

This feature contains the tender extracts listing mockup.

## Responsibilities

- Load tender extract data through RTK Query
- Support both real backend and `json-server` routing through the feature API layer
- Render the filters area and the tender extracts table
- Keep feature-specific types and filtering logic inside the feature

## Structure

- `api/`: RTK Query endpoints and real/mock resource routing
- `components/`: feature-specific UI blocks for filters, summary, grid, and empty state
- `model/`: feature types, constants, and filter contracts
- `pages/`: route-level page composition
- `hooks/`: reserved for feature-specific hooks if the feature grows
- `store/`: reserved for feature-specific Redux state if needed later
- `realtime/`: reserved for feature-specific SignalR sessions if needed later

## Rules

- Do not move this domain logic into `shared/`
- Do not fetch tender data outside RTK Query
- Keep all user-facing copy in the `tenders` i18n namespace
- Use the project `json-server` mock backend when the tender resource is listed in `VITE_MOCK_API_RESOURCES`
- Use shared resource URL helpers for the real/mock switch so the route decision stays out of the page layer
- Keep `REAL_API_PENDING` markers only around temporary client-side derivations that should later move to the backend
