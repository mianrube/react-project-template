# FAQs Feature

This feature manages the full lifecycle of frequently asked questions.

## Responsibilities

- provide FAQ listing, search, detail, creation, update, and deletion flows
- show how feature-local form schemas and values integrate with shared form helpers
- keep form-specific UI and validation logic inside the owning feature

## Rules

- entity form models and validation schemas belong in this feature
- the feature may consume shared form helpers from `shared/forms`
- the current implementation is self-contained and can later connect to a real backend without changing the feature boundary

## AI Notes

- use this feature as the baseline for future FAQ-related work
- keep domain form specifics here and only lift genuinely reusable pieces into `shared/forms`
