# TASK01 — Lead Management System

Task 01 implementation of the Digital Heroes Full Stack Assessment. A REST API + React frontend for capturing, assigning, and tracking sales leads, with JWT authentication and role-based access control.

---

## Features

- Public lead capture form (no auth required)
- JWT authentication (register/login)
- Role-based access control — `admin` / `member`
- Admin dashboard — manage users, view all leads
- Member dashboard — view/manage assigned leads
- Lead assignment to team members
- Lead status pipeline (e.g. `NEW → CONTACTED → QUALIFIED → WON/LOST`)
- Notes & activity timeline per lead
- Search, filtering, and pagination
- Responsive UI

---

## Tech Stack

- **Frontend:** React, Vite, React Router, TailwindCSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT, bcrypt
- **Testing:** Vitest, Supertest

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a connection URI (e.g. MongoDB Atlas)

### Install

```bash
cd TASK01_Lead-management-system/server
npm install

cd ../client
npm install
```

### Environment Variables

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lead_management
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d
```

Create a `.env` file in `client/` (if applicable):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run (development)

```bash
# Server
cd server
npm run dev

# Client
cd client
npm run dev
```

### Seed / Test Credentials

For local testing, the following seed account may be available:

```
Email:    admin@test.com
Password: password123
```

> Update or rotate these credentials before any non-local deployment.

---

## API Documentation

Base URL: `http://localhost:5000/api`

### Auth

#### `POST /api/auth/register`
Register a new user.

- **Auth required:** No

Request:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePass123",
  "role": "member"
}
```

Response `201 Created`:
```json
{
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "member"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Status codes: `201` Created · `400` Validation error · `409` Email already exists

---

#### `POST /api/auth/login`
Authenticate a user and receive a JWT.

- **Auth required:** No

Request:
```json
{
  "email": "jane@example.com",
  "password": "SecurePass123"
}
```

Response `200 OK`:
```json
{
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Jane Doe",
    "role": "member"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Status codes: `200` OK · `400` Validation error · `401` Invalid credentials

---

### Health

#### `GET /api/health`
- **Auth required:** No

Response `200 OK`:
```json
{ "status": "ok", "uptime": 12345 }
```

---

### Users

#### `GET /api/users`
List all users.
- **Auth required:** Yes (admin only)

Response `200 OK`:
```json
{
  "items": [
    { "id": "64f1...", "name": "Jane Doe", "email": "jane@example.com", "role": "member" }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

Status codes: `200` OK · `401` Unauthorized · `403` Forbidden

---

#### `GET /api/users/:id`
Get a single user's details.
- **Auth required:** Yes

Status codes: `200` OK · `401` Unauthorized · `404` Not found

---

#### `PUT /api/users/:id`
Update a user.
- **Auth required:** Yes (self or admin)

Request:
```json
{ "name": "Jane D. Doe", "role": "admin" }
```

Status codes: `200` OK · `400` Validation error · `401` Unauthorized · `403` Forbidden · `404` Not found

---

#### `DELETE /api/users/:id`
Delete a user.
- **Auth required:** Yes (admin only)

Status codes: `204` No Content · `401` Unauthorized · `403` Forbidden · `404` Not found

---

### Leads

#### `GET /api/leads`
List leads with pagination and filters.
- **Auth required:** Yes

Query params:
```
page=1
limit=20
status=NEW
assignedTo=64f1a2b3c4d5e6f7a8b9c0d1
search=john
```

Example: `GET /api/leads?page=2&limit=20&status=NEW&search=john`

Response `200 OK`:
```json
{
  "items": [
    {
      "id": "64f2a2b3c4d5e6f7a8b9c0e2",
      "name": "John Smith",
      "email": "john@company.com",
      "phone": "+1-555-0100",
      "company": "Acme Corp",
      "status": "NEW",
      "assignedTo": "64f1a2b3c4d5e6f7a8b9c0d1",
      "createdAt": "2026-07-20T10:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 2,
  "limit": 20
}
```

---

#### `GET /api/leads/:id`
Get a single lead.
- **Auth required:** Yes

Status codes: `200` OK · `401` Unauthorized · `404` Not found

---

#### `POST /api/leads`
Create a new lead. Also used by the public lead capture form.
- **Auth required:** No (public capture) — some deployments may require auth for internal creation

Request:
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "+1-555-0100",
  "company": "Acme Corp"
}
```

Response `201 Created`:
```json
{
  "id": "64f2a2b3c4d5e6f7a8b9c0e2",
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "+1-555-0100",
  "company": "Acme Corp",
  "status": "NEW",
  "assignedTo": null,
  "createdAt": "2026-07-20T10:00:00.000Z"
}
```

Status codes: `201` Created · `400` Validation error

---

#### `PUT /api/leads/:id`
Update lead details.
- **Auth required:** Yes

Request:
```json
{ "company": "Acme Corporation", "phone": "+1-555-0199" }
```

Status codes: `200` OK · `400` Validation error · `401` Unauthorized · `404` Not found

---

#### `PATCH /api/leads/:id/status`
Update a lead's pipeline status.
- **Auth required:** Yes

Request:
```json
{ "status": "QUALIFIED" }
```

Response `200 OK`:
```json
{ "id": "64f2a2b3c4d5e6f7a8b9c0e2", "status": "QUALIFIED", "updatedAt": "2026-07-25T09:30:00.000Z" }
```

Status codes: `200` OK · `400` Invalid status · `401` Unauthorized · `404` Not found

---

#### `DELETE /api/leads/:id`
Delete a lead.
- **Auth required:** Yes (admin only)

Status codes: `204` No Content · `401` Unauthorized · `403` Forbidden · `404` Not found

---

#### `POST /api/leads/:id/notes`
Add a note to a lead's activity timeline.
- **Auth required:** Yes

Request:
```json
{ "content": "Called the client, follow up next week." }
```

Response `201 Created`:
```json
{
  "id": "64f3a2b3c4d5e6f7a8b9c0f3",
  "leadId": "64f2a2b3c4d5e6f7a8b9c0e2",
  "userId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "content": "Called the client, follow up next week.",
  "createdAt": "2026-07-25T09:35:00.000Z"
}
```

Status codes: `201` Created · `400` Validation error · `401` Unauthorized · `404` Not found

---

## Testing

```bash
cd server
npm install
npm test

cd ../client
npm install
npm test
```

Coverage includes: authentication, role permissions, lead creation, lead assignment, status updates, API health, and input validation.

---

## Notes

- Adjust route paths above if this project's implementation differs (see inline comments in `server/routes`).
- Rotate the seed admin credentials before deploying anywhere beyond local development.