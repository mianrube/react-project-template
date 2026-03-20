# App Brand Component

This folder contains the shared application brand component.

## Responsibilities

- Render the app logo, title, or both
- Link the brand to the home route
- Provide a reusable brand block for app chrome areas

## Rules

- Brand text comes from shared i18n
- The default brand text must come from `shared.app.projectName`
- Callers may select another key from the shared `app` scope through `titleI18nKey`
- The component must remain reusable across top bars, drawers, or auth layouts
- Visibility of logo and title is controlled by props instead of duplicating markup
