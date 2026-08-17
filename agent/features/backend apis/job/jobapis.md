# JPS — Backend API Implementation Instructions

## Project Context

You are working on **JPS (Job Portal System)**, an MVP job marketplace with three roles:

* **Candidate** — searches and applies for jobs
* **Recruiter** — creates and manages jobs and reviews applicants
* **Admin** — manages/moderates the platform

The frontend dashboards for all three roles are already designed.

Your responsibility is to build the backend APIs required by those dashboards.

---

# IMPORTANT DEVELOPMENT RULES

Before writing code:

1. Inspect the existing project structure.
2. Inspect the existing database schema.
3. Inspect the existing authentication implementation.
4. Inspect existing middleware, utilities, error handling, validation, and response formats.
5. Reuse existing architecture and conventions.
6. Do NOT create duplicate authentication, database, validation, or utility systems.
7. Do NOT change unrelated frontend code.
8. Do NOT introduce unnecessary dependencies.
9. Do NOT implement future features during the current phase.
10. Follow the existing TypeScript/JavaScript conventions of the project.

If an existing implementation conflicts with this document, prefer the existing project architecture unless it creates a clear security or correctness problem.

---

# API NAMING CONVENTION

Use consistent REST-style routes.

Correct:

```text
/api/recruiter/jobs
/api/recruiter/jobs/:uuid

/api/candidate/jobs
/api/candidate/jobs/:uuid

/api/admin/jobs
/api/admin/jobs/:uuid
```

Do NOT use inconsistent names such as:

```text
/recuriter
/candiate
/job/create
/job/save/:uuid
```

Use:

```text
/recruiter
/candidate
/jobs
```

---

# AUTHORIZATION MODEL

Every protected endpoint must:

1. Verify authentication.
2. Identify the logged-in user.
3. Verify the user's role.
4. Verify ownership where applicable.
5. Execute the business operation.

Conceptually:

```text
Request
   ↓
Authentication Middleware
   ↓
Role Authorization Middleware
   ↓
Controller
   ↓
Service
   ↓
Database
```

Never trust:

* userId from request body
* recruiterId from request body
* candidateId from request body
* companyId from request body

Use the authenticated user's identity from the server-side auth context.

---

# STANDARD ERROR HANDLING

Use the project's existing error-handling system.

At minimum, correctly handle:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```

Never expose:

* passwords
* password hashes
* JWT secrets
* database credentials
* internal stack traces
* sensitive internal implementation details

---

# VALIDATION

Every create/update endpoint must validate input.

Validate:

* required fields
* string lengths
* enum values
* numbers
* salary ranges
* arrays
* IDs
* pagination parameters
* filters

If the project already uses Zod, use the existing Zod pattern.

Do not duplicate validation logic inside controllers if reusable schemas/services can handle it.

---

# RESPONSE FORMAT

Follow the existing project's response format.

If no response format exists, establish one consistent format such as:

```json
{
  "success": true,
  "message": "Job created successfully",
  "data": {}
}
```

For errors:

```json
{
  "success": false,
  "message": "Job not found",
  "error": {}
}
```

Do not create different response structures for different controllers.

---

# PHASE 1 — JOB MANAGEMENT

## Objective

Implement the complete **Job Management API** for:

* Recruiter
* Candidate
* Admin

Do NOT implement applications, saved jobs, candidate profile management, recruiter application management, notifications, payments, AI features, or advanced search in this phase.

---

# PHASE 1A — RECRUITER JOB APIs

## 1. Create Job

```http
POST /api/recruiter/jobs
```

### Authorization

```text
Authenticated
Role: RECRUITER
```

### Responsibilities

* Validate request body.
* Identify recruiter from authenticated user.
* Identify the recruiter's company using server-side data.
* Create the job.
* Set appropriate initial status.
* Return created job.

Do NOT accept recruiterId from the client.

### Example request

```json
{
  "title": "Senior React Developer",
  "description": "We are looking for...",
  "location": "Kathmandu",
  "employmentType": "FULL_TIME",
  "salaryMin": 50000,
  "salaryMax": 80000,
  "skills": [
    "React",
    "Next.js",
    "TypeScript"
  ]
}
```

### Initial status

Use the project's agreed moderation workflow.

Recommended MVP:

```text
PENDING
```

if admin approval is required.

If the existing product requirement says recruiter jobs are immediately published, use:

```text
PUBLISHED
```

Do not invent a second workflow.

---

# 2. Get Recruiter's Jobs

```http
GET /api/recruiter/jobs
```

### Authorization

```text
Authenticated
Role: RECRUITER
```

Return only jobs belonging to the authenticated recruiter/company.

Never return another recruiter's jobs.

### Pagination

Support:

```text
?page=1&limit=10
```

Recommended defaults:

```text
page = 1
limit = 10
```

Add a reasonable maximum limit such as:

```text
limit <= 100
```

### Optional MVP filters

```text
?status=PUBLISHED
?search=react
```

Do not implement complicated search infrastructure yet.

---

# 3. Get Particular Recruiter Job

```http
GET /api/recruiter/jobs/:uuid
```

### Authorization

```text
Authenticated
Role: RECRUITER
```

### Security requirement

The recruiter must own the job.

If the job exists but belongs to another recruiter:

```text
403 Forbidden
```

Do not leak job ownership information unnecessarily.

---

# 4. Update Recruiter Job

```http
PATCH /api/recruiter/jobs/:uuid
```

### Authorization

```text
Authenticated
Role: RECRUITER
```

### Requirements

* Verify job exists.
* Verify ownership.
* Validate only supplied fields.
* Update only allowed fields.
* Do not allow the recruiter to change protected fields such as:

  * recruiterId
  * companyId
  * createdAt
  * moderation fields
  * admin-only status fields

Use PATCH semantics.

---

# 5. Delete Recruiter Job

```http
DELETE /api/recruiter/jobs/:uuid
```

### Authorization

```text
Authenticated
Role: RECRUITER
```

### Requirements

* Verify ownership.
* Do not allow deletion of another recruiter's job.
* Prefer soft deletion/closing if the project schema supports it.

Recommended behavior:

```text
Job → CLOSED
```

instead of physically deleting a job that may later have applications.

However, follow the existing schema if it already defines a deletion strategy.

---

# PHASE 1B — CANDIDATE JOB APIs

## 6. Browse Jobs

```http
GET /api/candidate/jobs
```

### Authorization

Follow the existing product requirement.

If job browsing is public, authentication is not required.

If the dashboard requires login, require:

```text
Authenticated
Role: CANDIDATE
```

### Important

Candidates should only see jobs that are eligible for candidates.

For example:

```text
PUBLISHED
```

Do NOT expose:

```text
PENDING
SUSPENDED
REJECTED
```

unless the product explicitly requires it.

### Pagination

```text
?page=1&limit=10
```

### Basic filters

Support only what the existing UI requires.

Potential filters:

```text
search
location
employmentType
```

Do not build Elasticsearch or advanced full-text search for MVP.

---

# 7. Get Particular Job

```http
GET /api/candidate/jobs/:uuid
```

Return the job and company information required by the candidate UI.

Do not expose internal recruiter information.

Recommended response concept:

```json
{
  "job": {},
  "company": {}
}
```

If the frontend already requires these values:

```text
hasApplied
isSaved
```

those should be added later when Application and SavedJob APIs are implemented.

Do not create fake values during Phase 1.

---

# PHASE 1C — ADMIN JOB APIs

## 8. Get All Jobs

```http
GET /api/admin/jobs
```

### Authorization

```text
Authenticated
Role: ADMIN
```

Admin can view jobs across the entire platform.

### Pagination

```text
?page=1&limit=20
```

### Filters

At minimum:

```text
status
search
```

Example:

```text
GET /api/admin/jobs?status=PENDING&page=1&limit=20
```

Admin should be able to inspect jobs in different states.

---

# 9. Get Particular Job

```http
GET /api/admin/jobs/:uuid
```

### Authorization

```text
Authenticated
Role: ADMIN
```

Admin can see more information than candidates.

Recommended:

```text
Job
Company
Recruiter
Job status
Created date
Updated date
```

Do not expose passwords or sensitive authentication data.

---

# 10. Admin Job Status Management

This is required if the admin dashboard contains pending/suspended/moderation actions.

```http
PATCH /api/admin/jobs/:uuid/status
```

Example:

```json
{
  "status": "PUBLISHED"
}
```

or:

```json
{
  "status": "SUSPENDED",
  "reason": "Job violates platform guidelines"
}
```

### Allowed status transitions

Do not allow arbitrary status changes.

Define valid transitions according to the product workflow.

For example:

```text
PENDING → PUBLISHED
PENDING → REJECTED

PUBLISHED → SUSPENDED
PUBLISHED → CLOSED

SUSPENDED → PUBLISHED
```

If the current database does not support this workflow, document the limitation instead of inventing a complex moderation system.

---

# JOB STATUS

Use one consistent enum.

Recommended:

```text
PENDING
PUBLISHED
SUSPENDED
REJECTED
CLOSED
```

Do not create different job statuses for recruiter, candidate, and admin.

The status belongs to the Job entity.

---

# JOB DATA OWNERSHIP

The server determines:

```text
recruiterId
companyId
createdAt
updatedAt
```

The client should not control these fields.

Example:

BAD:

```json
{
  "title": "Developer",
  "recruiterId": "123",
  "companyId": "456"
}
```

GOOD:

```json
{
  "title": "Developer",
  "description": "...",
  "location": "Kathmandu"
}
```

The backend determines the recruiter/company.

---

# DATABASE REQUIREMENTS

Before implementing the APIs, verify that the Job model supports:

```text
id
companyId
title
description
location
employmentType
salaryMin
salaryMax
skills
status
createdAt
updatedAt
```

Use the existing schema if these fields already exist.

Do not unnecessarily migrate or rename existing database fields.

---

# PHASE 1 TESTING

Before declaring Phase 1 complete, test every endpoint.

## Recruiter

```text
POST   /api/recruiter/jobs
GET    /api/recruiter/jobs
GET    /api/recruiter/jobs/:uuid
PATCH  /api/recruiter/jobs/:uuid
DELETE /api/recruiter/jobs/:uuid
```

## Candidate

```text
GET    /api/candidate/jobs
GET    /api/candidate/jobs/:uuid
```

## Admin

```text
GET    /api/admin/jobs
GET    /api/admin/jobs/:uuid
PATCH  /api/admin/jobs/:uuid/status
```

---

# SECURITY TESTS

Test these cases explicitly.

### Recruiter

```text
Recruiter A cannot update Recruiter B's job.

Recruiter A cannot delete Recruiter B's job.

Recruiter cannot change companyId.

Recruiter cannot change recruiterId.

Candidate cannot call recruiter endpoints.

Admin endpoints cannot be accessed by recruiter/candidate.
```

### Candidate

```text
Candidate cannot see unpublished/suspended jobs.

Unauthenticated users cannot access protected candidate endpoints if auth is required.
```

### Admin

```text
Recruiter cannot modify admin job status.

Candidate cannot modify admin job status.
```

---

# API DOCUMENTATION

Document every endpoint with:

```text
Method
URL
Authentication
Role
Request parameters
Request body
Success response
Error responses
Business rules
```

If the project already uses Swagger/OpenAPI, update it.

Otherwise create an API documentation file such as:

```text
docs/API.md
```

---

# PHASE 1 COMPLETION CRITERIA

Phase 1 is complete only when:

* [ ] Recruiter can create jobs.
* [ ] Recruiter can list their jobs.
* [ ] Recruiter can view their individual jobs.
* [ ] Recruiter can update their jobs.
* [ ] Recruiter can close/delete their jobs.
* [ ] Candidate can browse published jobs.
* [ ] Candidate can view a particular published job.
* [ ] Admin can list all jobs.
* [ ] Admin can filter jobs by status.
* [ ] Admin can view a particular job.
* [ ] Admin can moderate job status.
* [ ] Authentication is enforced.
* [ ] RBAC is enforced.
* [ ] Ownership checks are enforced.
* [ ] Validation is implemented.
* [ ] Pagination is implemented.
* [ ] Error handling is consistent.
* [ ] No sensitive data is exposed.
* [ ] API documentation is updated.
* [ ] All endpoints are tested.

---

# DO NOT IMPLEMENT YET

The following belong to later phases:

```text
Candidate application
Saved jobs
Candidate application history
Recruiter applicant management
Candidate profile
Resume upload
Notifications
Email notifications
AI recommendations
AI resume analysis
Advanced search
Chat
Payments
Subscription
Analytics
```

Do not implement them during Phase 1 unless an existing dependency makes it absolutely necessary.

---

# EXPECTED AGENT WORKFLOW

Follow this workflow:

```text
1. Inspect project
2. Report current architecture
3. Inspect database schema
4. Inspect authentication
5. Inspect existing middleware
6. Identify missing Job model fields
7. Propose minimal changes
8. Implement Job APIs
9. Add validation
10. Add authorization
11. Add ownership checks
12. Add pagination/filtering
13. Test APIs
14. Fix issues
15. Update documentation
16. Report completion
```

Before making major schema changes, stop and explain the proposed change.

Do not silently rewrite existing architecture.

---

# FINAL RESPONSE AFTER IMPLEMENTATION

When the implementation is complete, report:

```text
## Implemented

- Endpoint
- Endpoint
- Endpoint

## Database Changes

- Change

## Middleware

- Authentication
- Authorization

## Validation

- Schemas added

## Tests

- Passed
- Failed

## Remaining Work

- Phase 2 items
```

Do not claim an endpoint is implemented unless it actually exists and has been tested.