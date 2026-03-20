# Sidebar Component

This folder contains the shared application sidebar used by the main layout.

## Responsibilities

- Render navigation entries allowed for the current user roles
- Support desktop collapsed and expanded states
- Support a mobile drawer presentation
- Keep collapsed navigation usable through icon-only navigation with labels exposed on hover/focus
- Keep the sidebar header area visible while the navigation list scrolls

## Rules

- Desktop collapse preference is driven by global UI state
- Mobile open state is driven by global UI state but must remain transient
- Navigation labels must stay accessible when the sidebar is collapsed
- The sidebar must remain visually distinct from the main content without relying on a harsh divider line
- Do not move navigation filtering logic into the layout
