# Nuxt Employee Dashboard

A full-stack Nuxt 4 employee management application with login, dashboard, employee CRUD, shared dynamic forms, and server APIs on Nitro.

## Features
- Cookie-based authentication (`/api/login`, `/api/logout`, `/api/session`)
- Session persistence on refresh via `app/plugins/auth-session.ts`
- Protected routes with middleware (`app/middleware/auth.ts`)
- Responsive Tailwind UI with shared layout, navbar, and sticky footer
- Employee list with pagination (page size: `9`)
- Add and edit employee forms powered by a reusable dynamic form component
- Zod validation on both client and server
- Seed data sourced from `main.db.json`
- Runtime DB auto-initialization in `server/utils/db.ts` (uses `/tmp/main.db.json` on Vercel)
- Seed plugin to generate employees when DB is empty
- Employees list/API served with `no-store` caching to avoid stale SSR/CSR hydration mismatches after edits

## Tech Stack
- Nuxt 4
- Vue 3
- Pinia
- Nitro server routes
- Tailwind CSS
- Zod
- UUID

## Demo Credentials
From `main.db.json`:
- `admin@test.com` / `admin123`
- `emp1@test.com` / `emp123`
- `emp2@test.com` / `emp123`

## UI Routes
- `/` - Login
- `/dashboard` - Overview and quick actions
- `/employees` - Employee directory with pagination
- `/employees/new` - Create employee
- `/employees/:id` - Edit employee

## API Routes
- `POST /api/login`
  - Validates with `loginSchema`
  - Sets `session` HTTP-only cookie
- `POST /api/logout`
  - Clears `session` cookie
- `GET /api/session`
  - Returns current user from cookie-backed session
- `GET /api/dashboard`
  - Returns total employee count
- `GET /api/employees?page=1`
  - Returns paginated employees and total count
  - Uses `EMPLOYEE_PAGE_SIZE` from `data/data.ts`
  - Sets `Cache-Control: no-store` to keep list data fresh after mutations
- `POST /api/employees`
  - Creates employee after `employeeSchema` validation
- `GET /api/employees/:id`
  - Returns single employee by id
- `PATCH /api/employees/:id`
  - Updates employee
  - Returns `{ employee, index, total, page, pageSize }`
- `DELETE /api/employees/:id`
  - Deletes employee by id

## Validation
- Login:
  - Client: `schemas/auth.ts` in `app/pages/index.vue`
  - Server: `server/api/login.post.ts`
- Employee create/edit:
  - Client: `schemas/employee.ts` in `new.vue` and `[id].vue`
  - Server: create validation in `server/api/employees.post.ts`
- Required inputs are shown with `*` in shared form UI.

## Dynamic Form and Static Data
Centralized project constants are in `data/data.ts`:
- `LOGIN_FORM_FIELDS`
- `EMPLOYEE_FORM_FIELDS`
- `NAV_LINKS`
- `SEED_ROLES`
- `SEED_DEPARTMENTS`
- `EMPLOYEE_PAGE_SIZE`

Shared form renderer:
- `app/components/form/DynamicFormFields.vue`
- Supports `input` and `select` fields
- Supports `numbersOnly` sanitization (used by salary field)

## Employee Update Redirect Logic
After editing an employee on `/employees/:id`:
1. API returns employee index in the full collection.
2. Page is computed with `Math.floor(index / EMPLOYEE_PAGE_SIZE) + 1`.
3. UI redirects to `/employees?page=<computedPage>`.

This keeps users on the exact list page where that employee appears.

## Runtime Config
Defined in `nuxt.config.ts`:
- `public.apiBase` (default: `/api`)
- `public.companyName` (default: `Alok People Co.`)

## Deployment Notes (Vercel)
- The app does not rely on reading `main.db.json` from the runtime filesystem.
- Seed JSON is bundled at build time and used to initialize runtime storage automatically.
- On Vercel, writes go to `/tmp/main.db.json` (ephemeral storage).
- Because `/tmp` is ephemeral, data is not durable across cold starts/redeploys. Use a managed database for persistent production data.

## Scripts
- `npm run dev` - Start dev server
- `npm run build` - Build production bundle
- `npm run preview` - Run built app
- `npm run generate` - Generate static output

## Local Development
```bash
npm install
npm run dev
```

## Project Structure
```txt
app/
  components/
    employee/
    form/
    layout/
    ui/
  composables/
  layouts/
  middleware/
  pages/
  plugins/
  stores/

data/
  data.ts

schemas/
  auth.ts
  employee.ts

server/
  api/
  middleware/
  plugins/
  utils/

types/
  index.ts
```
