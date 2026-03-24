# Status Bar

This module owns the bottom application status bar and its colocated sections.

## Responsibilities

- provide the status bar layout shell
- render stable, app-level status sections such as application version
- render optional realtime status sections such as SignalR notifications when enabled by configuration

## Rules

- keep `StatusBar.tsx` focused on layout and composition
- move distinct status sections into colocated subcomponents when they have their own dependencies, such as config, store selectors, or i18n wiring
- do not extract trivial markup fragments that do not form a meaningful section contract
- keep status-bar-only pieces inside this folder unless they become reusable outside the status bar
