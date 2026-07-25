# Digital Heroes Full Stack Assessment

**Lead Management Platform**

Built by: Atharva Sable
Submission Date: 2026-07-25

---

## Project Overview

This repository contains two assessment tasks, delivered as separate folders:

| Folder | Description |
|---|---|
| [`TASK01_Lead-management-system`](./TASK01_Lead-management-system) | Lead Management System implementing the primary product features. |
| [`project`](./project) | Digital Heroes Full Stack Assessment scaffold with supporting utilities — validation, health checks, CI, Docker, and docs. |

Both projects are full-stack applications demonstrating secure authentication, a REST API for managing leads and users, and a React frontend for viewing and interacting with the system. The goal is a maintainable, testable, and deployable platform for lead capture and management.

Each folder has its own detailed README — see [TASK01 README](./TASK01_Lead-management-system/README.md) and [project README](./project/README.md) for endpoint examples, setup, and env variables.

---

## Features

- Public Lead Capture Form
- Secure Authentication (JWT)
- Admin Dashboard
- Member Dashboard
- Role-based Access Control
- Lead Assignment
- Lead Status Pipeline
- Notes & Activity Timeline
- Search & Filters
- Pagination
- Responsive UI
- Health check endpoint & Docker support (`project`)
- Automated tests & CI — Vitest + GitHub Actions (`project`)

---

## Tech Stack

**Frontend**
- React, Vite
- React Router
- TailwindCSS (where used)

**Backend**
- Node.js, Express
- MongoDB (Mongoose)

**Authentication**
- JWT
- bcrypt (password hashing)

**Testing**
- Vitest (unit + integration)
- Supertest (HTTP integration tests)

**Dev / Deployment**
- Docker & docker-compose
- GitHub Actions (CI)

---

## Database Schema

### User
```
id
name
email
password
role (admin|member)
createdAt
```

### Lead
```
id
name
email
phone
company
status
assignedTo
createdAt
updatedAt
```

### Note
```
id
leadId
userId
content
createdAt
```

### Activity
```
id
leadId
action
performedBy
timestamp
```

---

## Quickstart

```bash
git clone <repo-url>
cd digital01

# Task 01
cd TASK01_Lead-management-system/server && npm install
cd ../client && npm install

# Task 02 (project)
cd ../../project/server && npm install
cd ../client && npm install
```

Run locally (development):

```bash
# Server (project)
cd project/server
npm run dev

# Client (project)
cd project/client
npm run dev
```

Full setup, seed data, and environment variables are documented in each folder's README.

---

## Testing

```bash
# Server
cd TASK01_Lead-management-system/server   # or project/server
npm install
npm test

# Client
cd TASK01_Lead-management-system/client   # or project/client
npm install
npm test
```

Key test scenarios covered: authentication, role permissions, lead creation, lead assignment, status updates, API health, input validation.

---

## Deployment

```bash
# Build client
cd project/client
npm run build

# Run server
cd project/server
npm start

# Or with Docker
cd project
docker compose up --build
```

---

## AI Usage

> AI tools were used for brainstorming architecture, reviewing API documentation, improving technical writing, and validating implementation ideas. All coding decisions, implementation, testing, debugging, and final deliverables were completed and reviewed by me.

---

## License

This project was created for the Digital Heroes Full Stack Assessment and is not licensed for external distribution unless stated otherwise by the author.