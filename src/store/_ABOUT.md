# Store Layer

This folder defines the global Redux store.

## Responsibilities

- Store configuration
- Root reducer
- Middleware
- Persist configuration
- Store hooks

## Architecture

- Feature slices live inside features/
- Root store composes them here

## Persist Rules

- Each slice defines its own persist configuration
- Supports:
  - localStorage
  - sessionStorage
- Versioned with migrations

## Middleware

- RTK Query middleware
- Global error middleware

## AI Notes

- Do not place business logic here
- Do not create slices here unless global