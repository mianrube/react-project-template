# Error Utilities

Provides utilities to normalize and handle errors.

## Responsibilities

- Normalize unknown errors into readable messages
- Provide helpers for global error handling

## Key Functions

- normalizeErrorMessage()

## Usage

Used by:
- RTK Query middleware
- SignalR error handling
- Global error runtime

## Rules

- Must be pure utilities
- No UI logic
- No side effects

## AI Notes

Always normalize unknown errors before displaying them