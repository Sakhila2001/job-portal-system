# Job Portal - Mandatory Engineering Rules

These rules apply to every change in this repository. Treat **MUST** and **MUST NOT** as non-negotiable requirements.

## 1. Technology and existing architecture

- The backend and frontend **MUST** be written in TypeScript. Do not add JavaScript source files for application code.
- Preserve the established application boundaries:
  - `backend/` is the Express + Prisma API.
  - `frontend/` is the Next.js application.
- Inspect the relevant existing feature, route, component, utility, and patterns before writing code. New code **MUST** follow the local conventions already in use.
- Do not add a dependency, framework, state manager, ORM, UI kit, validation library, or utility library unless the existing dependencies cannot reasonably solve the requirement.
- Before adding a dependency, explain why the existing stack is insufficient and obtain approval.
- Reuse an existing component, helper, type, validation schema, hook, or API client before creating a new equivalent.
- Do not duplicate logic between features. Extract genuinely reusable logic to the appropriate shared folder.

## 2. Required folder structure

- Organize product code by feature/domain, not by generic technical layer alone.
- Each feature **MUST** keep its API, types, validation, services, UI, and tests close to that feature where practical.
- Use these locations for reusable code only:
  - `backend/src/shared/` - shared middleware, errors, utilities, constants, types, validation helpers, and infrastructure abstractions.
  - `frontend/shared/` - shared UI components, hooks, utilities, types, constants, and client-side helpers.
- Feature-specific code **MUST NOT** be put in a shared folder merely for convenience.
- Shared code **MUST NOT** import from a feature folder. This prevents circular and hidden feature dependencies.
- Do not create a "common", "misc", "helpers", or "utils" dumping-ground folder. Name modules by their responsibility.
- Keep imports explicit, typed, and free of unused exports or circular dependencies.

## 3. TypeScript quality

- Do not use `any`, `@ts-ignore`, `@ts-nocheck`, or unsafe type assertions to bypass type errors.
- Prefer explicit domain types, discriminated unions, and inferred types from trusted schemas.
- Validate all untrusted input at the application boundary. Backend request inputs must use the existing Zod-based validation approach.
- Never trust client-provided roles, permissions, ownership IDs, salary data, company IDs, or job status values without server-side validation and authorization.
- Use clear, domain-oriented names. Avoid one-letter names except for tightly scoped loop indices.

## 4. Backend rules

- Keep route handlers thin: parse/validate input, call the feature service, and return a consistent response.
- Put business rules in feature services, not controllers/routes.
- Centralize error handling through shared error middleware; do not leak raw stack traces, Prisma errors, tokens, or internal implementation details to API consumers.
- Every protected endpoint **MUST** authenticate the caller and authorize the requested action on the server.
- Enforce ownership checks for employer, recruiter, candidate, company, job, application, and saved-job resources.
- Hash passwords using the existing password tooling. Never store or log plaintext passwords, tokens, cookies, or reset codes.
- Keep authentication cookies secure, HTTP-only, and configured consistently through shared code.
- Version or consistently namespace API routes according to the existing route conventions; do not create competing API styles.

## 5. Frontend rules

- Prefer server components by default; add `"use client"` only when browser state, effects, or event handling requires it.
- Reuse existing UI primitives and styling conventions before creating a new component or visual pattern.
- Keep feature pages thin by composing feature components, hooks, and services.
- Never treat client-side authorization, hidden buttons, or route guards as the security boundary; the backend remains authoritative.
- Provide loading, empty, error, and accessible interaction states for user-facing asynchronous views.
- Use semantic HTML, keyboard-accessible controls, visible focus states, meaningful labels, and alt text where applicable.

## 6. Database and Prisma safety

- **Never modify the database schema** (`backend/prisma/schema.prisma` or its equivalent) without first explaining the required change and receiving explicit user approval.
- Do not create, edit, apply, reset, delete, or replace Prisma migrations unless schema work has been explicitly approved.
- Never delete, truncate, seed over, reset, or otherwise alter existing database data unless the user explicitly requests it.
- Never run destructive Prisma commands such as `migrate reset`, `db push --force-reset`, or production-affecting commands.
- When a requested feature needs a schema change, stop and report: the proposed model/field/index changes, migration impact, and any data-migration/backfill requirement. Wait for approval before changing anything.
- Query only the data needed, paginate collection endpoints, and enforce authorization before returning records.

## 7. Secrets, configuration, and privacy

- Never place real secrets, credentials, private keys, access tokens, database URLs, cookie secrets, or API keys in any written `.env` file, source file, test fixture, documentation, log, or commit.
- Do not read, print, copy, or expose secret values from environment files.
- Use environment variable names and a sanitized `.env.example` only when configuration documentation is needed.
- Do not expose server-only environment variables to the frontend. Only explicitly public values may use the framework's public-variable convention.
- Redact sensitive values from errors and logs. Avoid logging personally identifiable applicant information unless operationally required.

## 8. Change discipline and verification

- Make the smallest coherent change that fulfills the request; avoid unrelated refactors, formatting churn, and dependency upgrades.
- Preserve existing user changes and do not overwrite or delete files unrelated to the task.
- Update or add focused tests when behavior changes and the project has a suitable test setup.
- At minimum, run the relevant TypeScript, lint, build, or test command when available after a change. Report checks that could not be run and why.
- Do not claim a feature is complete when required validation, authorization, error handling, or verification is missing.
- Flag ambiguity, security risk, destructive action, database impact, or new-dependency need before proceeding.
