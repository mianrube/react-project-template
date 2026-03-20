# Theme Configuration

This folder defines the global Material UI theme baseline for the application.

## Responsibilities

- Expose design tokens used by the app theme
- Create the shared MUI theme through `createAppTheme(mode)`
- Define global component overrides for reusable visual behavior
- Expose reusable style presets for patterns that are shared but not universal defaults

## Rules

- Reusable visual defaults for MUI and MUI X components must be defined here
- Client or product brand colors must be centralized here in theme tokens instead of being hardcoded in feature components
- Feature-level `sx` should only cover feature-specific layout or presentation
- If a styling fix must apply to future screens as a baseline, move it into theme overrides
- Do not hardcode one-off component colors in features when the same rule belongs to the shared system
- Do not leave reusable `MuiDataGrid` internal selectors inside features; promote them to the global override here
- Reusable primitive defaults must be centralized here only when they are safe for all usages of that primitive
- If a style should be reused across several screens but should not affect every component instance, define it here as a shared preset instead of inlining it in a feature

## Examples

- Good: global `MuiDataGrid` header, icon button, filler, cell, and focus styling in the theme
- Good: global button text casing in the theme
- Good: rounded surface presets for selected `Paper` usages defined in `config/theme/`
- Good: shared surface presets such as highlighted filter panels defined in `config/theme/`
- Good: feature-specific row height or cell wrapping in the feature component
- Bad: redefining the same `DataGrid` header colors in each page
- Bad: styling `MuiDataGrid-cell`, `MuiDataGrid-columnHeader`, or `MuiDataGrid-menuIconButton` in a feature-level `sx`
- Bad: global `MuiPaper` overrides that unintentionally affect paper-based components such as `AppBar`
- Bad: inlining the same gradient panel recipe in feature components when it can be shared
