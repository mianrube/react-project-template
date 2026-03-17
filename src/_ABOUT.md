# Frontend Architecture Overview

This project follows a **modular, feature-based architecture** designed for scalability and AI-assisted development.

## Core Principles

- Feature-first organization
- Strong separation between:
  - app (composition)
  - shared (reusable infrastructure)
  - features (business domains)
  - store (global state)
- Explicit boundaries to support AI agents understanding the codebase

## Main Folders

### app

Application bootstrap, providers, and runtime logic.

### shared

Reusable and domain-agnostic modules:

- components
- hooks
- config
- realtime (SignalR)
- auth
- errors

### features

Business domains:

- chat
- admin
- search
- etc.

Each feature is self-contained.

### store

Global Redux configuration and shared store logic.

## AI Guidelines

- Always respect folder boundaries
- Do not mix feature logic into shared
- Do not introduce cross-feature coupling
- Prefer creating new feature modules instead of overloading shared
