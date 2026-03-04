# Nuxt Employee Management Dashboard

## Overview

This project is a **production-style Nuxt 3 full-stack application** demonstrating how a modern web system can combine frontend, backend APIs, and data persistence in a single framework.

The application simulates a **company employee management dashboard** with authentication, role-based access, employee CRUD operations, pagination, and observability logging.

The project is intentionally designed to showcase **real production architecture patterns** rather than just UI components.

---

# Tech Stack

Frontend

* Nuxt 3
* Vue 3
* Pinia
* TailwindCSS

Backend

* Nitro Server (Nuxt server runtime)
* Server API routes

Data Layer

* JSON file database (`main.db.json`)
* 5000 seeded employees
* UUID identifiers

Infrastructure Concepts

* SSR (Server Side Rendering)
* Cookie based authentication
* Role-based access control
* API rate limiting
* Structured server logging
* Request retry and error handling

---

# Features

## Authentication

Authentication uses **HTTP-only cookies** to store the user session.

Login endpoint validates credentials and sets a session cookie.

Example accounts:

Admin user

```
admin@test.com
admin123
```

Employee users

```
emp1@test.com
emp123
emp2@test.com
emp123
```

Admin users have full access while employee users can only view their own employee profile.

---

# Role Based Access

Admin can:

* View all employees
* Add new employees
* Edit employee details
* Access dashboard statistics

Employee users can:

* Login
* View only their own employee record

---

# Employee Management

The system manages **5000 employees seeded automatically** when the server starts if the database is empty.

Each employee contains:

```
id (UUID)
name
role
department
salary
```

---

# Backend Architecture

The backend uses Nuxt Nitro server routes.

Example endpoints:

List employees with pagination

```
GET /api/employees?page=1
```

Get single employee

```
GET /api/employees/{id}
```

Create employee

```
POST /api/employees
```

Update employee

```
PATCH /api/employees/{id}
```

Delete employee

```
DELETE /api/employees/{id}
```

Authentication APIs

```
POST /api/login
GET /api/session
```

Dashboard API

```
GET /api/dashboard
```

---

# Database Layer

The project uses a **JSON file as a lightweight database**.

File:

```
main.db.json
```

Utility helpers handle reading and writing the database:

```
server/utils/db.ts
```

Employees are automatically seeded using:

```
server/utils/seedEmployees.ts
```

This creates 5000 employees with random roles and departments.

---

# Frontend Architecture

The frontend follows a **layered architecture** to keep responsibilities separated.

Pages handle UI and routing.

Composables manage application logic and state.

Plugins handle shared infrastructure such as the API client.

Example architecture flow:

```
Page
 ↓
Composable
 ↓
API Plugin
 ↓
Nitro API
 ↓
JSON Database
```

---

# Composables

Reusable data logic is implemented using composables.

Example:

```
composables/useEmployees.ts
```

Responsibilities:

* fetching paginated employees
* managing loading state
* storing total employee count

---

# API Client Plugin

A global API client plugin centralizes network communication.

```
plugins/api.ts
```

Features:

* automatic retry
* centralized error handling
* redirect to login on unauthorized requests

Usage example:

```
const { $api } = useNuxtApp()
const employees = await $api("/employees?page=1")
```

---

# Pagination

Employees are fetched using server-side pagination.

Example:

```
/employees?page=2
```

The backend returns:

```
{
  data: [...employees],
  total: 5000
}
```

---

# Dashboard

The dashboard displays company statistics such as the **total number of employees**.

Example API:

```
GET /api/dashboard
```

Response:

```
{
  totalEmployees: 5000
}
```

---

# Observability Logging

The server includes **structured logging** for monitoring API activity.

Example log entry:

```
{
  "type": "request_start",
  "method": "GET",
  "path": "/api/employees"
}
```

This allows easier debugging and can be integrated with log aggregation systems such as:

* ELK stack
* Grafana Loki
* Datadog

---

# Project Structure

```
components/

composables/
  useEmployees.ts

middleware/
  auth.ts

pages/
  login.vue
  dashboard.vue
  employees/
    index.vue
    new.vue
    [id].vue

plugins/
  api.ts

stores/
  auth.ts

server/
  api/
  middleware/
  plugins/
  utils/

main.db.json
```

---

# Running the Project

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Build production version

```
npm run build
```

Preview production build

```
npm run preview
```

---

# What This Project Demonstrates

This project demonstrates how Nuxt can be used to build a **full-stack production-style application** with both frontend and backend capabilities.

Concepts included:

* SSR rendering
* Nitro backend APIs
* authentication and session cookies
* role-based access control
* composable data layer
* centralized API client plugin
* pagination
* CRUD operations
* structured server logging

The architecture closely resembles patterns used in real SaaS dashboards and internal company tools.

---

# Possible Future Improvements

Planned enhancements:

* server-side search and filtering for employees
* indexed lookups for large datasets
* Redis caching
* role-based permissions system
* database integration (PostgreSQL)
* CI/CD deployment pipeline
* monitoring and metrics dashboards

---
