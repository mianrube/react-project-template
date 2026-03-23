# FAQs Feature

This feature contains both the public FAQ experience and the administration workflows.

## Responsibilities

- provide a public FAQ list and detail experience for end users
- provide administration flows for FAQ creation, update, and deletion
- show how feature-local form schemas and values integrate with shared form helpers
- keep form-specific UI and validation logic inside the owning feature
- expose FAQ data through feature-local RTK Query endpoints even when the backend does not exist yet

## Rules

- entity form models and validation schemas belong in this feature
- the feature may consume shared form helpers from `shared/forms`
- when there is no real backend, this feature should prefer the project `json-server` mock backend so the pages already talk to a real HTTP boundary
- the current FAQ mock source lives in `mock-api/db.json` and is selected through `VITE_MOCK_API_BASE_URL` plus `VITE_MOCK_API_RESOURCES`
- use `createCrudMockResourceUrls('faqs', '/faqs')` as the base convention for this kind of CRUD resource
- this feature should not need explicit pending markers while the mock and real route shapes stay aligned
- the public/admin split must stay intact when the mock source is replaced by the real API

## AI Notes

- use this feature as the baseline for future FAQ-related work
- keep domain form specifics here and only lift genuinely reusable pieces into `shared/forms`
- prefer changing the RTK Query endpoint definitions when the real backend arrives, not the pages
