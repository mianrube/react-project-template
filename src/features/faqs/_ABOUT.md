# FAQs Feature

This feature contains both the public FAQ experience and the administration workflows.

## Responsibilities

- provide a public FAQ list and detail experience for end users
- provide administration flows for FAQ creation, update, and deletion
- show how feature-local form schemas and values integrate with shared form helpers
- keep form-specific UI and validation logic inside the owning feature

## Rules

- entity form models and validation schemas belong in this feature
- the feature may consume shared form helpers from `shared/forms`
- the current implementation uses feature state and can later connect to a real backend without changing the public/admin split

## AI Notes

- use this feature as the baseline for future FAQ-related work
- keep domain form specifics here and only lift genuinely reusable pieces into `shared/forms`
