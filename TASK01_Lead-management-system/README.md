# Lead Management System (LMS)

A full-stack web application for managing customer leads with role-based access control, comprehensive audit trails, and real-time collaboration features.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  Lead Management System                      │
├──────────────────────┬──────────────────────────────────────┤
│   Frontend (React)   │        Backend (Node.js/Express)     │
│  - Vite bundler      │  - JWT authentication                │
│  - React Router      │  - MongoDB database                  │
│  - Zustand state     │  - Role-based authorization          │
│  - React Query       │  - Activity logging                  │
│  - Tailwind CSS      │  - RESTful API                       │
└──────────────────────┴──────────────────────────────────────┘
```

## Features

### Public Functionality
- **Lead Submission Form**: Anyone can submit a lead inquiry without authentication
- Form validation with real-time feedback
- Email notifications (future enhancement)

### Authenticated Features

#### Admin Features
- View all leads in the system
- Assign leads to team members
- Change lead status at any time
- Delete leads
- Create new team member accounts
- View comprehensive activity logs for all leads
- Export lead data (future enhancement)

#### Member Features
- View only assigned leads
- Add notes to assigned leads
- Change status of assigned leads
- View activity history
- Cannot delete leads or create users

### Core Features
- **Lead Lifecycle Management**
  - Status workflow: NEW → CONTACTED → QUALIFIED → PROPOSAL_SENT → WON/LOST
  - Automatic activity logging on status changes
  
- **Notes & Comments**
  - Add internal notes to leads
  - Author attribution with timestamps
  - Visible to all team members
  
- **Activity Audit Trail**
  - Track all changes to leads
  - Timestamps and user attribution
  - Complete history of lead interactions

- **Pagination & Filtering**
  - Browse large lead lists efficiently
  - Filter by status and assignment
  - Sort and organize data

## Technology Stack

### Frontend
- **React 19** - UI library with hooks
- **TypeScript** - Type safety
- **Vite** - Fast development bundler
- **React Router v7** - Client-side routing
- **Zustand** - Lightweight state management
- **React Hook Form** - Efficient form handling
- **Zod** - Schema validation
- **Axios** - HTTP client with JWT interceptor
- **TanStack React Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.x** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **Morgan** - Request logging
- **CORS** - Cross-origin requests

## Project Structure

```
lead-management-system/
├── client/                          # React frontend
│   ├── src/
│   │   ├── api/                    # API client functions
│   │   │   ├── axios.ts           # Configured HTTP client
│   │   │   ├── authApi.ts         # Authentication endpoints
│   │   │   └── leadApi.ts         # Lead endpoints
│   │   ├── pages/                 # Page components
│   │   │   ├── Login.tsx          # Login page
│   │   │   ├── PublicLeadForm.tsx # Public submission form
│   │   │   ├── Dashboard.tsx      # Main dashboard
│   │   │   ├── Leads.tsx          # Leads list
│   │   │   └── LeadDetails.tsx    # Lead detail view
│   │   ├── components/            # Reusable components
│   │   │   ├── layout/           # Layout components
│   │   │   ├── leads/            # Lead components
│   │   │   ├── notes/            # Note components
│   │   │   └── activity/         # Activity components
│   │   ├── routes/               # Routing configuration
│   │   │   ├── AppRoutes.tsx    # All routes
│   │   │   └── ProtectedRoute.tsx # Auth guard
│   │   ├── store/                # State management
│   │   │   └── authStore.ts     # Zustand auth store
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── controllers/           # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── leadController.ts
│   │   │   ├── noteController.ts
│   │   │   └── activityController.ts
│   │   ├── models/               # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── Lead.ts
│   │   │   ├── Note.ts
│   │   │   └── Activity.ts
│   │   ├── middleware/           # Express middleware
│   │   │   ├── authMiddleware.ts
│   │   │   └── roleMiddleware.ts
│   │   ├── routes/              # Route definitions
│   │   │   ├── authRoutes.ts
│   │   │   ├── leadRoutes.ts
│   │   │   ├── noteRoutes.ts
│   │   │   └── activityRoutes.ts
│   │   ├── utils/              # Helper functions
│   │   │   ├── generateToken.ts
│   │   │   ├── activityLogger.ts
│   │   │   └── statusTransition.ts
│   │   ├── config/
│   │   │   └── db.ts           # MongoDB connection
│   │   ├── app.ts              # Express app setup
│   │   └── server.ts           # Entry point
│   ├── .env                    # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.build.json
│
└── README.md                       # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://ADMIN:ADMIN@cluster0.iqhlwcl.mongodb.net/lead-management
   JWT_SECRET=your-secret-key-here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Backend will run at: `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (optional, defaults to http://localhost:5000/api)
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run at: `http://localhost:5173`

## Demo Credentials

```
Admin Account:
- Email: admin@test.com
- Password: password123
- Role: admin

Member Account:
- Email: member@test.com
- Password: password123
- Role: member
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints except public ones require JWT token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

### Auth Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"  // "admin" or "member"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

### Lead Endpoints

#### Create Lead (Public)
```http
POST /leads/public
Content-Type: application/json

{
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "555-1234",
  "company": "Acme Corporation",
  "message": "Interested in your services"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "555-1234",
  "company": "Acme Corporation",
  "message": "Interested in your services",
  "status": "NEW",
  "createdBy": null,
  "assignedTo": null,
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

#### Get All Leads
```http
GET /leads?page=1&limit=10&status=NEW&assignedTo=userId
Authorization: Bearer <TOKEN>
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): Filter by status (NEW, CONTACTED, QUALIFIED, PROPOSAL_SENT, WON, LOST)
- `assignedTo` (string): Filter by assignee user ID

**Response (200):**
```json
{
  "leads": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Acme Corp",
      "email": "contact@acme.com",
      "phone": "555-1234",
      "company": "Acme Corporation",
      "status": "NEW",
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdBy": null,
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

#### Get Single Lead
```http
GET /leads/:id
Authorization: Bearer <TOKEN>
```

**Response (200):** Same as individual lead object above

#### Update Lead
```http
PUT /leads/:id
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "555-5678",
  "company": "Updated Company",
  "message": "Updated message"
}
```

**Access Control:**
- Admin: Can update any lead
- Member: Can update only assigned leads (403 if not assigned)

**Response (200):** Updated lead object

#### Update Lead Status
```http
PATCH /leads/:id/status
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "status": "CONTACTED"
}
```

**Valid Statuses:** NEW, CONTACTED, QUALIFIED, PROPOSAL_SENT, WON, LOST

**Status Flow:**
```
NEW → CONTACTED → QUALIFIED → PROPOSAL_SENT → (WON OR LOST)
```

**Response (200):** Updated lead with activity logged

#### Assign Lead
```http
PATCH /leads/:id/assign
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "assignedTo": "507f1f77bcf86cd799439012"
}
```

**Access Control:** Admin only (403 for members)

**Validation:**
- Assignee must be a "member" role user
- Returns 400 if assignee is not found

**Response (200):** Updated lead with activity logged

#### Delete Lead
```http
DELETE /leads/:id
Authorization: Bearer <TOKEN>
```

**Access Control:** Admin only (403 for members)

**Response (204):** No content

### Note Endpoints

#### Add Note
```http
POST /notes/:leadId
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "content": "Customer expressed interest in premium plan"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "lead": "507f1f77bcf86cd799439011",
  "author": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe"
  },
  "content": "Customer expressed interest in premium plan",
  "createdAt": "2024-01-01T13:00:00Z"
}
```

#### Get Notes
```http
GET /notes/:leadId
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
{
  "notes": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe"
      },
      "content": "Customer expressed interest in premium plan",
      "createdAt": "2024-01-01T13:00:00Z"
    }
  ]
}
```

### Activity Endpoints

#### Get Activity History
```http
GET /activity/:leadId
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
{
  "activities": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "lead": "507f1f77bcf86cd799439011",
      "user": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe"
      },
      "action": "status_changed",
      "details": "Status changed from NEW to CONTACTED",
      "createdAt": "2024-01-01T13:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "user": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe"
      },
      "action": "note_added",
      "details": "Added a note",
      "createdAt": "2024-01-01T13:05:00Z"
    }
  ]
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no content to return |
| 400 | Bad Request - Invalid parameters or validation failed |
| 401 | Unauthorized - Missing or invalid JWT token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

## Frontend Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | PublicLeadForm | ❌ | Public lead submission form |
| `/login` | Login | ❌ | Login page |
| `/dashboard` | Dashboard | ✅ | Main dashboard with welcome |
| `/leads` | Leads | ✅ | List of all/assigned leads |
| `/leads/:id` | LeadDetails | ✅ | Lead detail with notes & activity |

## Authentication Flow

```
┌─────────────┐
│  User Login │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  POST /auth/login   │
│  {email, password}  │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────┐
│ Verify credentials   │
│ Generate JWT token   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Return token & user  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Store in localStorage│
│ Set in Axios header  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Navigate to /dashboard
└──────────────────────┘
```

## Authorization

### Role-Based Access Control (RBAC)

**Admin Role:**
- Full access to all leads
- Can delete any lead
- Can assign leads to team members
- Can create new user accounts
- Can change any lead status

**Member Role:**
- View only assigned leads
- Add notes to assigned leads
- Change status of assigned leads
- Cannot delete leads
- Cannot access admin features

### Frontend Authorization

The `ProtectedRoute` component checks for JWT token presence. Role-based features are conditionally rendered based on `user.role`:

```typescript
{user?.role === "admin" && (
  <button onClick={() => deleteLead(id)}>Delete</button>
)}
```

### Backend Authorization

Every protected endpoint verifies JWT and checks role:

```typescript
app.delete("/leads/:id", protect, adminOnly, (req, res) => {
  // Only admins can reach here
});

app.put("/leads/:id", protect, (req, res) => {
  // Both admin and member can reach here
  // But member can only update assigned leads
  if (req.user.role === "member" && lead.assignedTo._id !== req.user._id) {
    return res.status(403).json({ message: "Access denied" });
  }
});
```

## Error Handling

### Frontend Error States

All API calls should handle errors:

```typescript
const { isError, error } = useQuery({
  queryKey: ["leads"],
  queryFn: getLeads,
});

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

### Common Error Responses

**Invalid Token (401):**
```json
{
  "message": "Invalid token"
}
```

**Insufficient Permissions (403):**
```json
{
  "message": "Access denied"
}
```

**Not Found (404):**
```json
{
  "message": "Lead not found"
}
```

**Validation Error (400):**
```json
{
  "message": "Invalid email format"
}
```

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  role: "admin" | "member",
  createdAt: Date,
  updatedAt: Date
}
```

### Lead
```javascript
{
  name: String,
  email: String,
  phone: String,
  company: String,
  message: String,
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "WON" | "LOST",
  createdBy: ObjectId (User ref),
  assignedTo: ObjectId (User ref),
  createdAt: Date,
  updatedAt: Date
}
```

### Note
```javascript
{
  lead: ObjectId (Lead ref),
  author: ObjectId (User ref),
  content: String,
  createdAt: Date
}
```

### Activity
```javascript
{
  lead: ObjectId (Lead ref),
  user: ObjectId (User ref),
  action: String,
  details: String,
  createdAt: Date
}
```

## Testing Scenarios

### Public Lead Submission
1. Navigate to `/` (home page)
2. Fill in all required fields
3. Submit form
4. Verify lead appears in admin dashboard with status "NEW"

### Admin Login & Management
1. Login as admin@test.com
2. Verify dashboard shows all leads
3. Click "View" on a lead
4. Change status dropdown and verify activity logged
5. Click "Delete" and verify confirmation

### Member Login & Restrictions
1. Login as member@test.com
2. Verify dashboard shows only assigned leads
3. Attempt to delete a lead (should not have delete button)
4. Add a note and verify appears with username/timestamp
5. Attempt to view unassigned lead (should redirect to /leads)

### Pagination & Filtering
1. Create multiple leads (>10)
2. View /leads page
3. Use pagination to navigate pages
4. Use status filter dropdown
5. Verify correct leads display per page

## Deployment

### Frontend Deployment (Vercel)

```bash
cd client
npm run build
# Deploy 'dist' folder to Vercel
```

### Backend Deployment (Render/Railway)

```bash
cd server
npm run build
# Deploy with environment variables
```

## Security Considerations

1. **Password Hashing**: Passwords hashed with bcryptjs (10 salt rounds)
2. **JWT Tokens**: 7-day expiration time
3. **CORS**: Configured to allow frontend origin
4. **Helmet**: Security headers enabled
5. **Environment Variables**: Sensitive data in .env files
6. **Input Validation**: All inputs validated with Zod/express-validator

## Troubleshooting

### Server Won't Start
- Check `.env` file exists with valid MONGO_URI
- Verify MongoDB connection
- Check port 5000 is not in use
- Run `npm install` to ensure all dependencies

### Frontend API Errors
- Verify backend is running on http://localhost:5000
- Check JWT token in localStorage
- Verify CORS configuration in server
- Check network tab in browser DevTools

### Authentication Issues
- Clear localStorage and login again
- Verify JWT_SECRET matches between frontend token and backend verification
- Check token expiration (7 days)

## Future Enhancements

- [ ] Email notifications on lead assignment
- [ ] Lead search and advanced filtering
- [ ] Bulk lead import (CSV)
- [ ] Lead export functionality
- [ ] Custom fields for leads
- [ ] Pipeline analytics and reporting
- [ ] Two-factor authentication
- [ ] Role customization
- [ ] Webhook integrations
- [ ] Mobile app (React Native)

## Contributing

This is a demonstration project. For production use, consider:

1. Adding comprehensive test coverage (Jest, Vitest)
2. Implementing API rate limiting
3. Adding request validation middleware
4. Implementing refresh token rotation
5. Adding comprehensive error logging
6. Setting up CI/CD pipeline

## License

MIT License - See LICENSE file for details

---

**Project Status:** ✅ MVP Complete

**Last Updated:** January 2024

**Questions or Issues?** Please refer to the code comments and API documentation above.

