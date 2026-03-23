# Shared Forms

This folder defines the shared form conventions for the application.

## Responsibilities

- document the default form architecture for the project
- provide a stable shared entry point for future reusable form helpers
- define when to use Formik and Yup versus lightweight local state
- expose small cross-feature utilities for entity forms when they are broadly reusable
- provide reusable MUI plus Formik field adapters when they are generic enough for multiple features

## Rules

- create and edit forms should default to Formik plus Yup
- lightweight filters and simple query controls may use local state when validation needs are minimal
- feature-specific forms must stay inside their owning feature
- only reusable form helpers, adapters, and conventions belong here
- shared types such as form mode contracts are valid here when they reduce duplication across features
- shared field wrappers must stay presentational and generic, without embedding domain-specific validation or API logic

## AI Notes

- do not move entity-specific forms into this folder
- use this folder for shared form patterns only when reuse is real
- keep utilities small, generic, and free from domain-specific assumptions
