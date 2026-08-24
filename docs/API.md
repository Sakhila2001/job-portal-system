# JPS Backend API

## Authentication

Protected endpoints require:

```http
Authorization: Bearer <accessToken>
```

Recruiter endpoints accept the current project recruiter role, `employer`, and the alias `recruiter`.

## Recruiter Jobs

### Create Job

- Method: `POST`
- URL: `/api/recruiter/jobs`
- Authentication: required
- Role: `employer` or `recruiter`
- Body: `{ title, description, location, employmentType, workMode?, salaryMin?, salaryMax?, skills? }`
- Success: `201 { success, message, data }`
- Errors: `400`, `401`, `403`
- Rules: server derives `createdBy` and `companyId` from the authenticated employer account. New jobs start as `PENDING`.

### List Recruiter Jobs

- Method: `GET`
- URL: `/api/recruiter/jobs?page=1&limit=10&status=PENDING&search=react`
- Authentication: required
- Role: `employer` or `recruiter`
- Success: `200 { success, message, data: { items, meta } }`
- Rules: only returns jobs created by the authenticated recruiter account.

### Get Recruiter Job

- Method: `GET`
- URL: `/api/recruiter/jobs/:uuid`
- Authentication: required
- Role: `employer` or `recruiter`
- Success: `200 { success, message, data }`
- Errors: `401`, `403`, `404`
- Rules: recruiter must own the job.

### Update Recruiter Job

- Method: `PATCH`
- URL: `/api/recruiter/jobs/:uuid`
- Authentication: required
- Role: `employer` or `recruiter`
- Body: any of `{ title, description, location, employmentType, workMode, salaryMin, salaryMax, skills }`
- Success: `200 { success, message, data }`
- Rules: protected fields such as `companyId`, `createdBy`, and `status` are not accepted from recruiters.

### Close Recruiter Job

- Method: `DELETE`
- URL: `/api/recruiter/jobs/:uuid`
- Authentication: required
- Role: `employer` or `recruiter`
- Success: `200 { success, message, data }`
- Rules: performs a soft close by setting status to `CLOSED`.

## Candidate Jobs

### Browse Published Jobs

- Method: `GET`
- URL: `/api/candidate/jobs?page=1&limit=10&search=react&location=Kathmandu&employmentType=FULL_TIME`
- Authentication: public
- Success: `200 { success, message, data: { items, meta } }`
- Rules: only returns jobs with status `PUBLISHED`.

### Get Published Job

- Method: `GET`
- URL: `/api/candidate/jobs/:uuid`
- Authentication: public
- Success: `200 { success, message, data }`
- Errors: `404`
- Rules: unpublished, suspended, rejected, pending, and closed jobs are not exposed.

## Admin Jobs

### List All Jobs

- Method: `GET`
- URL: `/api/admin/jobs?page=1&limit=20&status=PENDING&search=react`
- Authentication: required
- Role: `admin`
- Success: `200 { success, message, data: { items, meta } }`

### Get Admin Job

- Method: `GET`
- URL: `/api/admin/jobs/:uuid`
- Authentication: required
- Role: `admin`
- Success: `200 { success, message, data }`
- Rules: includes company and recruiter account metadata, but never password hashes.

### Update Job Status

- Method: `PATCH`
- URL: `/api/admin/jobs/:uuid/status`
- Authentication: required
- Role: `admin`
- Body: `{ status, reason? }`
- Allowed statuses: `PENDING`, `PUBLISHED`, `SUSPENDED`, `REJECTED`, `CLOSED`
- Allowed transitions: `PENDING -> PUBLISHED|REJECTED`, `PUBLISHED -> SUSPENDED|CLOSED`, `SUSPENDED -> PUBLISHED`
- Success: `200 { success, message, data }`
