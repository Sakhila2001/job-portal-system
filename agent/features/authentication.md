Description: This is the authentication feature.
Flow: Authentication flow

# User Stories

- We need to seed an admin user with the following credentials:
  - Email: admin@jps.com
  - Password: adminJPS12345

- When a user opens the website, they should navigate to the registration page and fill in the required fields:
  - Email
  - Password
- For Candidate we have separate registration page and login drawer
- For Recruiter/Employer we have separate registration and login drawer in the Employer Portal
- After successful registration, the user should be redirected to the login page with their email and password.

- After a successful login, the user should be redirected to the dashboard.

# Project Folder Structure

## Backend (`backend/`)
- **`app.ts`** - Application entry point
- **`package.json`** - Backend dependencies
- **`prisma/`** - Database schema and migrations
  - `schema.prisma` - Prisma schema definition
  - `migrations/` - Database migration files
- **`src/modules/`** - Feature-based backend modules
  - `auth/` - Authentication module
    - `login/` - Login feature (controller, service, repository, route)
    - `register/` - Registration feature (controller, service, repository, route)

## Frontend (`frontend/`)
- **`app/`** - Next.js App Router pages and layouts
  - `globals.css` - Global styles
  - `register/page.tsx` - Candidate registration page
  - `login/` - (future) Login page route
- **`components/`** - React components
  - `ui/` - Generic reusable UI components
    - `header.tsx` - Main header/navbar with drawer state management
    - `footer.tsx` - Site footer
    - `hero.tsx` - Hero section
    - `job-card.tsx` - Job listing card
  - `features/` - Feature-specific components
    - `auth/` - Authentication-related components
      - `candidate-login-drawer.tsx` - Candidate login slide-in drawer
      - `employer-auth-drawer.tsx` - Employer login/register slide-in drawer
- **`lib/`** - (future) Utility functions and helpers
- **`hooks/`** - (future) Custom React hooks
- **`types/`** - (future) TypeScript type definitions

## Agent (`agent/`)
- **`features/`** - Feature documentation and specifications
  - `authentication.md` - This file
- **`rules/`** - Agent rules and configuration
  - `project.md` - Project-level rules

# Frontend Architecture

## Candidate Authentication

### Registration Page
- **Route**: `/register`
- **Component**: `frontend/app/register/page.tsx`
- **Fields**:
  - Full Name (text, required)
  - Email ID (email, required)
  - Password (password, required, min 6 chars)
  - Confirm Password (password, required, must match Password)
  - Mobile Number (tel, required, 10 digits)
  - Work Status (toggle: Experienced / Fresher)
  - Resume Upload (file input, optional)
  - Terms & Conditions agreement (checkbox, required)
- **Validation**:
  - Passwords must match before submission
  - Terms must be agreed to before submission
- **UX Features**:
  - Show/Hide toggle for Password and Confirm Password fields
  - Success screen with verification message after submission
  - "Log in here" button opens the candidate login drawer via custom event `open-login-drawer`
  - "Resend verification email" button if email not received
- **Post-Registration**: Shows success screen with next steps and link to job search
- **Verification Flow**:
  1. Form submits to `POST /api/auth/register/candidate`
  2. Backend returns `emailVerified: false`
  3. Frontend shows success screen with verification instructions
  4. Backend sends verification email with token link
  5. User clicks link → `GET /api/auth/verify-email?token=<token>`
  6. Backend marks email as verified
  7. User can now log in

### Candidate Login Drawer
- **Component**: `frontend/components/features/auth/candidate-login-drawer.tsx`
- **Trigger**: Navbar "Login" button, mobile menu "Candidate Login" button, "Log in here" from register page
- **Fields**:
  - Email ID / Username (text, required)
  - Password (password, required)
- **UX Features**:
  - Show/Hide toggle for Password field
  - "Forgot Password?" link
  - "Use OTP to Login" button
  - "Register for free" link to `/register`
  - Google Sign-in button
- **State Management**: Managed in `Header` component (`frontend/components/ui/header.tsx`)
  - `isLoginDrawerOpen` - drawer visibility
  - `showPassword` - password visibility toggle
  - `email` - email input value
  - `password` - password input value

## Employer Authentication

### Employer Auth Drawer
- **Component**: `frontend/components/features/auth/employer-auth-drawer.tsx`
- **Trigger**: Navbar "For employers" button, mobile menu "Employers" button
- **Tabs**: Employer Login | Register Company
- **Login Fields**:
  - Official Email ID (email, required)
  - Password (password, required)
- **Register Fields**:
  - Company Name (text, required)
  - HR Contact Name (text, required)
  - Official Email ID (email, required)
  - Password (password, required, min 6 chars)
  - Confirm Password (password, required, must match Password)
  - Phone Number (tel, required)
- **Validation**:
  - Passwords must match before registration submission
- **UX Features**:
  - Show/Hide toggle for Password and Confirm Password fields
  - Success screen after registration ("Company Application Sent!")
  - Google Sign-in button (login tab only)
- **State Management**: Managed in `Header` component (`frontend/components/ui/header.tsx`)
  - `isEmployerDrawerOpen` - drawer visibility
  - `employerActiveTab` - current tab ("login" | "register")
  - `showEmployerPassword` - password visibility toggle (login)
  - `showConfirmEmployerPassword` - confirm password visibility toggle (register)
  - `employerEmail` - email input value
  - `employerPassword` - password input value
  - `confirmEmployerPassword` - confirm password input value
  - `companyName` - company name input value
  - `hrName` - HR contact name input value
  - `contactNumber` - phone number input value
   - `employerSubmitted` - success state after registration

# Email Notifications

## Email Service
- **Module**: `backend/src/lib/email.ts`
- **Provider**: Nodemailer
- **Configuration**: Environment variables (`.env`)
  - `SMTP_HOST` - SMTP server host
  - `SMTP_PORT` - SMTP server port (465 for SSL, 587 for TLS)
  - `SMTP_USER` - SMTP authentication username
  - `SMTP_PASS` - SMTP authentication password
  - `SMTP_FROM` - From email address
- **Behavior**: If SMTP is not configured, emails are logged to console (dev mode)

## Notification Flow
After successful registration (both candidate and employer):

1. **Database Record**: A `Notification` record is created in the `notifications` table with:
   - `userId` - The registered user's ID
   - `channel` - `"email"`
   - `notificationType` - `"welcome"`
   - `subject` - `"Welcome to JobPortal!"` or `"Welcome to JobPortal Employer"`
   - `payload` - JSON object containing email and role
   - `status` - `"queued"`

2. **Email Sending**: A welcome email is sent via Nodemailer with:
   - **Candidate**: Welcome message with user's first name
   - **Employer**: Welcome message with company name
   - **HTML Template**: Branded HTML email with JobPortal branding

## Notification Model (Prisma)
```prisma
model Notification {
  id               String    @id @default(uuid()) @db.Uuid @map("notification_id")
  userId           String    @db.Uuid @map("user_id")
  channel          String
  notificationType String    @map("notification_type")
  subject          String?
  payload          Json?
  status           String    @default("queued")
  sentAt           DateTime? @map("sent_at")
  readAt           DateTime? @map("read_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("notifications")
}
```

## Email Templates

### Candidate Welcome Email
- Subject: "Welcome to JobPortal!"
- Content: Personalized welcome message with first name
- Call-to-action: Log in and start exploring jobs

### Employer Welcome Email
- Subject: "Welcome to JobPortal Employer"
- Content: Welcome message with company name
- Note: Company verification pending (24 hours)

## Future Enhancements
- Password reset emails
- Job alert emails
- Application status update emails
- OTP login emails

## Email Verification

### Verification Flow
1. User registers via `/api/auth/register/candidate` or `/api/auth/register/employer`
2. Backend generates a random verification token (32-byte hex)
3. Token expires in 24 hours
4. Backend sends verification email with link: `http://localhost:3000/api/auth/verify-email?token=<token>`
5. User clicks link → `GET /api/auth/verify-email?token=<token>`
6. Backend validates token and marks `emailVerified = true`
7. User can now log in and access all features

### Resend Verification
- **Endpoint**: POST /api/auth/resend-verification
- **Request Body**: `{ email, name }`
- Checks if user exists and is not already verified
- Generates new token and sends verification email
- Used by "Resend verification email" button on frontend

### Database Fields
- `emailVerified` - Boolean, default false
- `verificationToken` - String, unique, nullable
- `verificationExpires` - DateTime, nullable

### Email Template
- Subject: "Verify your email - JobPortal"
- Contains branded HTML with verification button
- Fallback plain text link
- 24-hour expiration notice

## APIs (/api)

## Base URL
- `http://localhost:5000/api`

## Candidate APIs

### Register Candidate
- **Endpoint**: POST /api/auth/register/candidate
- **Module**: `backend/src/modules/auth/register/`
- **Validation**: Zod schema (`candidateSchema`)
- **Request Body**: `{ name, email, password, mobile }`
- **Process**:
  1. Check if email exists
  2. Hash password with bcrypt (10 rounds)
  3. Generate 32-byte hex verification token (expires in 24h)
  4. Create `User` record with `role = "candidate"`, `emailVerified = false`, `verificationToken`, `verificationExpires`
  5. Split `name` into `firstName` and `lastName` for `UserProfile`
  6. Create `UserProfile` record
  7. Create `Notification` records for welcome and verification
  8. Send verification email (non-blocking)
  9. Send welcome email (non-blocking)
  10. Generate JWT access token (1h) and refresh token (7d)
- **Response (201)**:
  ```json
  {
    "user": { "id": "uuid", "email": "string", "role": "candidate", "emailVerified": false },
    "accessToken": "string",
    "refreshToken": "string"
  }
  ```

### Login Candidate
- **Endpoint**: POST /api/auth/login/candidate
- **Module**: `backend/src/modules/auth/login/`
- **Request Body**: `{ email, password }`
- **Response**: JWT tokens + user data

### Logout
- **Endpoint**: POST /api/auth/logout
- **Action**: Clear tokens from localStorage

## Employer APIs

### Register Employer
- **Endpoint**: POST /api/auth/register/employer
- **Module**: `backend/src/modules/auth/register/`
- **Validation**: Zod schema (`employerSchema`)
- **Request Body**: `{ companyName, hrName, email, password, contactNumber }`
- **Process**:
  1. Check if email exists
  2. Hash password with bcrypt (10 rounds)
  3. Generate 32-byte hex verification token (expires in 24h)
  4. Generate URL-friendly slug from company name
  5. Create `Company` record with `hrContactName` and `contactNumber`
  6. Create `User` record with `role = "employer"`, `emailVerified = false`, `verificationToken`, `verificationExpires`
  7. Create `EmployerAccount` linking `userId` → `companyId`
  8. Create `Notification` records for welcome and verification
  9. Send verification email (non-blocking)
  10. Send welcome email (non-blocking)
  11. Generate JWT access token (1h) and refresh token (7d)
- **Response (201)**:
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "string",
      "role": "employer",
      "companyId": "uuid",
      "companyName": "string",
      "emailVerified": false
    },
    "accessToken": "string",
    "refreshToken": "string"
  }
  ```

### Login Employer
- **Endpoint**: POST /api/auth/login/employer
- **Module**: `backend/src/modules/auth/login/`
- **Request Body**: `{ email, password }`
- **Response**: JWT tokens + user data + company info

### Logout
- **Endpoint**: POST /api/auth/logout
- **Action**: Clear tokens from localStorage

## Email Verification APIs

### Verify Email
- **Endpoint**: GET /api/auth/verify-email?token=<token>
- **Module**: `backend/src/modules/auth/verify/`
- **Query Params**: `token` - 32-byte hex verification token
- **Process**:
  1. Find user by token where `verificationExpires > now()`
  2. Set `emailVerified = true`, clear token and expiry
  3. Return success with email and role
- **Response (200)**:
  ```json
  {
    "message": "Email verified successfully",
    "email": "user@example.com",
    "role": "candidate"
  }
  ```
- **Error (400)**: Invalid or expired token

### Resend Verification Email
- **Endpoint**: POST /api/auth/resend-verification
- **Module**: `backend/src/modules/auth/verify/`
- **Request Body**: `{ email, name }`
- **Process**:
  1. Find user by email
  2. Check if already verified
  3. Generate new token (24h expiry)
  4. Update user record
  5. Send verification email
- **Response (200)**:
  ```json
  {
    "message": "Verification email resent."
  }
  ```
- **Error (400)**: No account found / Already verified

# Backend Architecture

## Register Module Structure
```
backend/src/modules/auth/register/
├── register.controller.ts   → Request handlers (registerCandidateHandler, registerEmployerHandler)
├── register.service.ts      → Business logic (registerCandidate, registerEmployer) + Zod validation
├── register.repository.ts   → Database queries + password hashing + JWT generation
└── register.route.ts        → Route definitions (/candidate, /employer)
```

## Verify Module Structure
```
backend/src/modules/auth/verify/
├── verify.controller.ts     → Request handlers (verifyEmailHandler, resendVerificationHandler)
├── verify.service.ts        → Business logic (verifyEmail, resendVerificationEmail)
└── verify.route.ts          → Route definitions (/verify-email, /resend-verification)
```

## Register Service Logic

### registerCandidate(data: CandidateRegisterDto)
1. Validate input with Zod
2. Check email uniqueness
3. Hash password
4. Generate verification token (32-byte hex, 24h expiry)
5. Split full name into firstName/lastName
6. Create User with role="candidate", emailVerified=false, verificationToken, verificationExpires
7. Create UserProfile
8. Create Notification records (welcome + verification)
9. Send verification email (non-blocking)
10. Send welcome email (non-blocking)
11. Generate JWT tokens
12. Return user + tokens

### registerEmployer(data: EmployerRegisterDto)
1. Validate input with Zod
2. Check email uniqueness
3. Hash password
4. Generate verification token (32-byte hex, 24h expiry)
5. Generate slug from company name
6. Create Company with hrContactName + contactNumber
7. Create User with role="employer", emailVerified=false, verificationToken, verificationExpires
8. Create EmployerAccount linking user to company
9. Create Notification records (welcome + verification)
10. Send verification email (non-blocking)
11. Send welcome email (non-blocking)
12. Generate JWT tokens
13. Return user + tokens + company info

## Database Schema Changes

### User Model
- Added `role` field: `String @default("candidate") @db.VarChar(20)`
- Values: `"candidate"` | `"employer"` | `"admin"`

### Company Model
- Added `hrContactName`: `String? @map("hr_contact_name")`
- Added `contactNumber`: `String? @map("contact_number")`

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection (transaction pooler)
- `DIRECT_URL` - PostgreSQL connection (session pooler for migrations)
- `JWT_SECRET` - Secret key for JWT signing

## Dependencies
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT generation
- `zod` - Input validation
- `@prisma/client` - Database ORM


# Navigation Flow

## Header Component (`frontend/components/ui/header.tsx`)
- **Desktop**: Login button, Register button, "For employers" button
- **Mobile**: Login button, Employers button, hamburger menu
- **Events**: Listens for `open-login-drawer` custom event to open candidate login drawer
- **Drawers**: Renders `CandidateLoginDrawer` and `EmployerAuthDrawer` as child components

## Register Page (`frontend/app/register/page.tsx`)
- "Log in here" button dispatches `open-login-drawer` event
- Candidate registration form with all fields and validation

# UI Components

- `frontend/components/features/auth/candidate-login-drawer.tsx` - Candidate login slide-in drawer
- `frontend/components/features/auth/employer-auth-drawer.tsx` - Employer login/register slide-in drawer
- `frontend/components/ui/header.tsx` - Main header with drawer state management
