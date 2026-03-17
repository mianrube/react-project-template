# App Feedback

Global user feedback system.

## Responsibilities

- Display global messages
- Handle errors and notifications
- Provide snackbar UI

## Types

- error
- warning
- info
- success

## Usage

Used by:
- RTK Query middleware
- Global error runtime
- SignalR errors

## Rules

- Centralized feedback only
- Do not duplicate snackbars elsewhere

## AI Notes

When showing global feedback:
→ dispatch enqueueMessage()