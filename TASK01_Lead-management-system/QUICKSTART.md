# Quick Start Guide - Lead Management System

Get the complete Lead Management System running in under 10 minutes!

## Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org))
- **Git** ([Download](https://git-scm.com))
- **MongoDB Atlas** account or local MongoDB instance
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com))

## 1️⃣ Clone/Prepare Project

```bash
# Navigate to your project directory
cd lead-management-system
```

## 2️⃣ Setup Backend

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
MONGO_URI=mongodb+srv://ADMIN:ADMIN@cluster0.iqhlwcl.mongodb.net/lead-management
JWT_SECRET=supersecretkey" > .env

# Start backend server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB connected successfully
```

✅ **Backend Ready at http://localhost:5000**

## 3️⃣ Setup Frontend

### In a NEW terminal window:

```bash
# Navigate to client
cd client

# Install dependencies (includes Tailwind CSS)
npm install

# Start frontend development server
npm run dev
```

**Expected Output:**
```
  VITE v8.1.1  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

✅ **Frontend Ready at http://localhost:5173**

## 4️⃣ Test the Application

### 4.1 Public Lead Submission
1. Open http://localhost:5173
2. Fill the form with:
   - Name: Test Company
   - Email: test@company.com
   - Phone: 5551234567
3. Click "Submit Inquiry"
4. Verify success message

### 4.2 Admin Login
1. Click "Login here"
2. Enter:
   - Email: `admin@test.com`
   - Password: `password123`
3. Click "Login"
4. You'll see the Dashboard

### 4.3 View and Manage Leads
1. Click "View Leads" or navigate to Leads
2. View the lead you just created
3. Click "View" to see details
4. Change the status using the dropdown
5. Add a note
6. View activity history

### 4.4 Member Access
1. Logout (click Logout button)
2. Login as:
   - Email: `member@test.com`
   - Password: `password123`
3. Notice:
   - Only assigned leads visible
   - No Delete button
   - Can still add notes

## 5️⃣ Key URLs

| Page | URL | Auth Required |
|------|-----|---|
| Home / Public Form | http://localhost:5173 | ❌ |
| Login | http://localhost:5173/login | ❌ |
| Dashboard | http://localhost:5173/dashboard | ✅ |
| Leads List | http://localhost:5173/leads | ✅ |
| Lead Details | http://localhost:5173/leads/:id | ✅ |

## 6️⃣ Demo Credentials

```
Admin Account:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: admin@test.com
Password: password123
Permissions: All features

Member Account:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: member@test.com
Password: password123
Permissions: View assigned leads, add notes
```

## 7️⃣ API Testing

### Test Backend Directly

```bash
# Create a new lead (public endpoint)
curl -X POST http://localhost:5000/api/leads/public \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "phone": "5551234567",
    "company": "Test Corp"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'

# Get leads (requires token from login response)
curl http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 8️⃣ Troubleshooting

### Backend won't start

**Error:** "Cannot find module"
```bash
cd server
npm install
```

**Error:** "Connection refused" (MongoDB)
- Check MongoDB Atlas connection string in .env
- Ensure IP whitelist includes your IP

**Error:** "Port 5000 already in use"
```bash
# Kill existing process
lsof -ti:5000 | xargs kill -9
# Then restart npm run dev
```

### Frontend shows blank page

**Error:** "API call failed"
- Check backend is running on http://localhost:5000
- Check browser console (F12) for errors
- Clear browser cache: Ctrl+Shift+Delete

**Error:** "Not authenticated"
- Check localStorage: F12 → Application → localStorage
- Token should exist after login
- Try login again

### Tailwind CSS not working

```bash
cd client
npm install tailwindcss postcss autoprefixer
npm run dev
```

## 9️⃣ Project Structure Overview

```
lead-management-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Login, Dashboard, Leads
│   │   ├── components/    # Layout, Tables, Forms
│   │   ├── api/          # API client functions
│   │   └── store/        # Zustand auth store
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints
│   │   └── middleware/   # Auth, validation
│   ├── .env             # Environment variables
│   └── package.json
│
└── README.md            # Full documentation
```

## 🔟 Next Steps

1. **Explore the Code**
   - Check [README.md](./README.md) for full API documentation
   - Read [TESTING.md](./TESTING.md) for comprehensive test scenarios

2. **Customize**
   - Modify database schema in `server/src/models/`
   - Add new pages in `client/src/pages/`
   - Update styling with Tailwind CSS classes

3. **Deploy**
   - Backend: Render, Railway, Vercel
   - Frontend: Vercel, Netlify, GitHub Pages
   - Database: MongoDB Atlas (already configured)

4. **Extend Features**
   - Add email notifications
   - Export leads to CSV
   - Advanced reporting
   - Mobile app

## 📚 Documentation

- **API Reference**: See [README.md - API Documentation](./README.md#api-documentation)
- **Testing Guide**: See [TESTING.md](./TESTING.md) for detailed test scenarios
- **Architecture**: See [README.md - Architecture Overview](./README.md#architecture-overview)

## 🆘 Still Having Issues?

1. Check the logs in both terminals
2. Verify .env file exists in server directory
3. Test API directly with curl commands above
4. Clear browser cache and localStorage
5. Restart both backend and frontend

## ✨ Features Implemented

✅ Public lead submission form  
✅ Admin/Member authentication with JWT  
✅ Role-based access control  
✅ Lead management (create, read, update, delete)  
✅ Lead status workflow  
✅ Notes system with timestamps  
✅ Activity audit trail  
✅ Pagination and filtering  
✅ Form validation with Zod  
✅ Responsive design with Tailwind CSS  

---

**🎉 You're all set! Start exploring the Lead Management System.**

For detailed information, see the [main README](./README.md).
