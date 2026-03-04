# Nuxt Employee Dashboard

A full-stack Nuxt 4 employee management app with:
- cookie-based login/logout
- dashboard + employee CRUD
- paginated employee list
- server APIs in Nitro
- Zod validation on client and server
- Tailwind UI with shared layout (navbar + footer)

## Tech Stack
- Nuxt 4
- Vue 3
- Pinia
- Tailwind CSS
- Zod
- Nitro server routes
- JSON database (`main.db.json`)

## Current App Behavior
- Login page is at `/`.
- Protected pages use route middleware (`app/middleware/auth.ts`) and redirect to `/` when unauthenticated.
- Shared layout (`app/layouts/default.vue`) includes:
  - dynamic navbar
  - logout on non-login pages
  - footer with dynamic year and company name from runtime config

## Demo Credentials
From `main.db.json`:
- `admin@test.com` / `admin123`
- `emp1@test.com` / `emp123`
- `emp2@test.com` / `emp123`

## Validation
### Login
- Client-side Zod validation in `schemas/auth.ts`
- Server-side Zod validation in `server/api/login.post.ts`
- Friendly error for invalid credentials (`Wrong email or password`)

### Employee Create
- Client-side Zod validation in `app/pages/employees/new.vue`
- Server-side Zod validation in `server/api/employees.post.ts`
- Required fields are marked with `*`

## Routes (UI)
- `/` - Login
- `/dashboard` - Dashboard stats
- `/employees` - Employee list (paginated)
- `/employees/new` - Add employee
- `/employees/:id` - Edit employee

## API Endpoints
- `POST /api/login` - login + set `session` cookie
- `POST /api/logout` - clear `session` cookie
- `GET /api/session` - current session user
- `GET /api/dashboard` - dashboard summary
- `GET /api/employees?page=1` - list employees (cached)
- `POST /api/employees` - create employee
- `GET /api/employees/:id` - get employee
- `PATCH /api/employees/:id` - update employee
- `DELETE /api/employees/:id` - delete employee

## Server Features
- Seed plugin creates 5000 employees if DB is empty (`server/plugins/seed.ts`)
- Basic in-memory rate limiter (`server/middleware/rateLimiter.ts`)
- Request logging plugin (`server/plugins/logger.ts`)

## Project Structure
```txt
app/
  app.vue
  layouts/default.vue
  pages/
    index.vue
    dashboard.vue
    employees/
      index.vue
      new.vue
      [id].vue
  components/
    layout/
      AppNavbar.vue
      AppFooter.vue
    employee/
      EmployeeCard.vue
    ui/
      EmployeeSkeleton.vue
  stores/auth.ts
  middleware/auth.ts
  plugins/api.ts

server/
  api/
  middleware/
  plugins/
  utils/

schemas/
  auth.ts
  employee.ts

types/
main.db.json
```

## Runtime Config
Defined in `nuxt.config.ts`:
- `public.apiBase` (default: `/api`)
- `public.companyName` (default: `Alok People Co.`)

## Scripts
- `npm run dev` - start dev server
- `npm run build` - build production app
- `npm run preview` - preview production build
- `npm run generate` - static generation

## Local Setup
```bash
npm install
npm run dev
```

## Notes
- Auth checks for page access are currently on the frontend middleware side.
- Employee list endpoint uses cached handler + route rule caching.
