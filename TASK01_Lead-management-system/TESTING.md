# Frontend-Backend Integration Testing Guide

This document provides step-by-step testing procedures to verify the entire Lead Management System works correctly.

## Pre-Test Setup

### 1. Backend Preparation
```bash
cd server
npm install
# Ensure .env is configured
npm run dev
# Server should start on http://localhost:5000
```

### 2. Frontend Preparation
```bash
cd client
npm install  # Install Tailwind CSS and autoprefixer
npm run dev
# Frontend should start on http://localhost:5173
```

### 3. Database Setup
- Ensure MongoDB Atlas connection is active
- Or use local MongoDB instance
- Create seed data or test manually

---

## Test Scenarios

### PHASE 1: Public Lead Submission (No Authentication Required)

#### Test 1.1: Access Public Form
**Steps:**
1. Open browser to `http://localhost:5173`
2. Verify PublicLeadForm page displays
3. Verify form has fields: Name, Email, Phone, Company, Message

**Expected Result:** ✅
- Form visible with all fields
- No login required
- Can access without token

#### Test 1.2: Form Validation
**Steps:**
1. Click "Submit Inquiry" with empty form
2. Verify validation errors appear
3. Fill only name field
4. Click submit
5. Verify email and phone validation errors

**Expected Result:** ✅
- Name required error
- Email format validation error
- Phone length validation error
- Submit button disabled until all required fields valid

#### Test 1.3: Submit Lead
**Steps:**
1. Fill all required fields:
   - Name: "Test Company"
   - Email: "test@company.com"
   - Phone: "5551234567"
   - Company: "Test Corp" (optional)
   - Message: "Interested in services" (optional)
2. Click "Submit Inquiry"
3. Verify success message appears

**Expected Result:** ✅
- Success message: "Thank you! Your inquiry has been received..."
- Form resets
- API call made to POST /leads/public
- Lead appears in backend database with status "NEW"

#### Test 1.4: Verify Backend Lead Creation
**Steps:**
1. Check MongoDB
2. Query leads collection
3. Verify new lead exists with submitted data

**Expected Result:** ✅
```json
{
  "name": "Test Company",
  "email": "test@company.com",
  "phone": "5551234567",
  "company": "Test Corp",
  "message": "Interested in services",
  "status": "NEW",
  "createdBy": null,
  "assignedTo": null,
  "createdAt": "2024-01-01T12:00:00Z"
}
```

---

### PHASE 2: Authentication (Login)

#### Test 2.1: Access Login Page
**Steps:**
1. From home page, click "Login here" link
2. Or navigate to `http://localhost:5173/login`

**Expected Result:** ✅
- Login form visible
- Fields: Email, Password
- Demo credentials displayed
- Submit button

#### Test 2.2: Login Validation
**Steps:**
1. Click login with empty form
2. Verify validation errors
3. Enter invalid email
4. Verify email validation error
5. Enter valid email but invalid password length
6. Verify password validation error

**Expected Result:** ✅
- Email required error
- Email format validation
- Password must be 6+ characters
- Submit blocked until valid

#### Test 2.3: Admin Login
**Steps:**
1. Enter email: `admin@test.com`
2. Enter password: `password123`
3. Click "Login"

**Expected Result:** ✅
- API call made to POST /auth/login
- JWT token stored in localStorage
- Redirect to /dashboard
- User info in store: name "Admin", role "admin"
- Header shows username and logout button

#### Test 2.4: Member Login
**Steps:**
1. Login as member@test.com / password123
2. Verify redirected to /dashboard
3. Verify header shows user info

**Expected Result:** ✅
- Token stored
- Redirect successful
- Dashboard shows "Welcome, [Name]!"
- Role displays as "member"

#### Test 2.5: Invalid Credentials
**Steps:**
1. Enter admin@test.com with wrong password
2. Click login

**Expected Result:** ✅
- Error message appears: "Login failed" or "Invalid credentials"
- No token stored
- Stay on login page

---

### PHASE 3: Protected Routes (Authentication Guards)

#### Test 3.1: Access Protected Route Without Token
**Steps:**
1. Clear localStorage (F12 → Application → localStorage → Clear all)
2. Navigate directly to `http://localhost:5173/dashboard`

**Expected Result:** ✅
- Redirected to /login
- ProtectedRoute component checks localStorage.getItem("token")
- No dashboard access without token

#### Test 3.2: Access Protected Route With Token
**Steps:**
1. Login successfully (Test 2.3)
2. Navigate to `/leads`
3. Navigate to `/leads/{id}` for any lead

**Expected Result:** ✅
- Dashboard accessible
- Leads list accessible
- Lead details accessible
- No redirect to login

#### Test 3.3: Logout Functionality
**Steps:**
1. Login as admin
2. Click "Logout" button in header
3. Verify localStorage token cleared
4. Verify redirected to /login
5. Try to access /dashboard

**Expected Result:** ✅
- Token removed from localStorage
- Redirect to login
- Cannot access dashboard
- Must login again

---

### PHASE 4: Admin Functionality

#### Test 4.1: Admin Dashboard
**Steps:**
1. Login as admin@test.com
2. View /dashboard
3. Verify welcome message with admin name
4. Verify role shows "admin"
5. Verify "View Leads" card clickable

**Expected Result:** ✅
- Dashboard displays correctly
- Shows admin welcome
- Quick stats section
- Navigation to leads works

#### Test 4.2: View All Leads (Admin)
**Steps:**
1. Admin login
2. Navigate to /leads
3. Verify lead table displays
4. Verify columns: Name, Email, Company, Status, Assigned To, Actions

**Expected Result:** ✅
- All leads visible (public and authenticated)
- Pagination controls visible
- Status filters visible
- Delete button visible for each lead
- "View" button visible

#### Test 4.3: Change Lead Status (Admin)
**Steps:**
1. View leads list
2. Click status dropdown for any lead
3. Change from "NEW" to "CONTACTED"
4. Verify dropdown updates

**Expected Result:** ✅
- Status changes in table
- API call to PATCH /leads/:id/status
- Activity logged in backend
- Lead updated in database

#### Test 4.4: View Lead Details (Admin)
**Steps:**
1. From leads table, click "View" button
2. Verify lead details page loads
3. Verify all lead information displayed
4. Verify tabs: Notes, Activity

**Expected Result:** ✅
- Lead name, email, phone, company displayed
- Status shown with editable dropdown
- Delete button visible
- Assigned to field shown
- Notes form visible
- Activity history visible

#### Test 4.5: Delete Lead (Admin)
**Steps:**
1. View lead details
2. Click "Delete Lead" button
3. Confirm deletion

**Expected Result:** ✅
- API call to DELETE /leads/:id
- Lead removed from database
- Redirect to /leads
- Lead no longer visible in list
- 403 error if member tries (access denied)

#### Test 4.6: Add Note (Admin)
**Steps:**
1. View lead details
2. In Notes tab, enter text: "Awaiting customer response"
3. Click "Add Note"
4. Verify note appears in list with admin name and timestamp

**Expected Result:** ✅
- Note form submits to POST /notes/:leadId
- Note displays with author name "Admin"
- Timestamp shown in locale format
- Activity logged for note addition

#### Test 4.7: View Activity History (Admin)
**Steps:**
1. Click "Activity" tab
2. Verify activity list shows
3. Look for entries like:
   - "Lead Created"
   - "Status Changed from NEW to CONTACTED"
   - "Note Added"

**Expected Result:** ✅
- All activities shown in reverse chronological order
- Each shows user who made change, action, and timestamp
- Activity details explain the change

---

### PHASE 5: Member Functionality (Authorization Tests)

#### Test 5.1: Member Dashboard
**Steps:**
1. Login as member@test.com
2. View /dashboard
3. Verify welcome message with member name
4. Verify role shows "member"

**Expected Result:** ✅
- Dashboard displays correctly
- Shows member name in welcome
- Role field shows "member"

#### Test 5.2: View Only Assigned Leads (Member)
**Steps:**
1. Member login
2. Navigate to /leads
3. Verify only leads assigned to this member display
4. Count of leads should be ≤ total leads in system

**Expected Result:** ✅
- Member sees subset of leads
- All visible leads show member's name in "Assigned To"
- Cannot see leads assigned to other members
- Cannot see unassigned leads

#### Test 5.3: No Delete Button (Member)
**Steps:**
1. Member view /leads
2. Verify no "Delete" button visible for any lead
3. Verify only "View" button shows

**Expected Result:** ✅
- Delete button hidden from member
- Admin has delete button, member does not
- Frontend permission enforcement working

#### Test 5.4: Attempt Delete Via API (Member)
**Steps:**
1. Member login
2. Open browser console
3. Call: `fetch('/api/leads/{id}', {method: 'DELETE', headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})`
4. Observe response

**Expected Result:** ✅
- API returns 403 Forbidden
- Response: `{ "message": "Access denied" }`
- Lead not deleted
- Backend permission enforcement working

#### Test 5.5: Add Note to Assigned Lead (Member)
**Steps:**
1. Member login
2. View details of assigned lead
3. Add note: "Customer prefers email contact"
4. Verify note appears with member name

**Expected Result:** ✅
- Note submits successfully
- POST /notes/:leadId succeeds
- Note displays with member name as author
- Can add unlimited notes

#### Test 5.6: Change Status on Assigned Lead (Member)
**Steps:**
1. Member view lead details
2. Change status from NEW to CONTACTED
3. Verify update succeeds

**Expected Result:** ✅
- Status changes
- PATCH /leads/:id/status succeeds
- Activity logged with member as actor
- Member can only change assigned leads

#### Test 5.7: Attempt Update Unassigned Lead (Member)
**Steps:**
1. Find an unassigned lead or lead assigned to different member
2. Member tries to update via edit form or API
3. Observe response

**Expected Result:** ✅
- Update blocked
- API returns 403 Forbidden
- Response: `{ "message": "You can only update leads assigned to you" }`
- Frontend doesn't show lead if unassigned
- Backend enforces permission

#### Test 5.8: View Activity (Member)
**Steps:**
1. Member view lead details
2. Click Activity tab
3. Verify activities display

**Expected Result:** ✅
- Activity history visible
- Shows all changes to the lead
- Can see actions by other team members
- Read-only access

---

### PHASE 6: Lead Status Workflow

#### Test 6.1: Valid Status Transitions
**Steps:**
1. Create/view a lead with status "NEW"
2. Change to "CONTACTED" - Should succeed
3. Change to "QUALIFIED" - Should succeed
4. Change to "PROPOSAL_SENT" - Should succeed
5. Change to "WON" or "LOST" - Should succeed

**Expected Result:** ✅
- All valid transitions succeed
- Activity logged for each change
- Status updates in database

#### Test 6.2: Invalid Status Transitions (Future)
**Steps:**
1. Lead in "NEW" status
2. Try to change to "QUALIFIED" (should only go to CONTACTED first)
3. Observe response

**Expected Result:** ✅
- Invalid transition rejected (400 Bad Request)
- Only valid next statuses offered in dropdown

---

### PHASE 7: Pagination & Filtering

#### Test 7.1: Pagination
**Steps:**
1. Admin view /leads
2. Verify pagination info: "Showing 1 to 10 of X"
3. Click "Next" button
4. Verify next 10 leads display
5. Verify "Previous" button enabled
6. Click previous to go back

**Expected Result:** ✅
- Pagination controls work
- Correct number of results per page (default 10)
- Can navigate between pages
- Previous disabled on page 1
- Next disabled on last page

#### Test 7.2: Status Filtering
**Steps:**
1. View /leads
2. Change status filter from "All Status" to "NEW"
3. Verify only leads with status "NEW" display
4. Change to "WON"
5. Verify only "WON" leads display

**Expected Result:** ✅
- Filter dropdown works
- API called with filter parameter
- Table updates with filtered results
- Count reflects filtered results
- Pagination resets to page 1

#### Test 7.3: Multiple Filters
**Steps:**
1. Filter by status "CONTACTED"
2. Navigate pages
3. Change status filter to "QUALIFIED"
4. Verify correct results

**Expected Result:** ✅
- Filters work independently
- Changing filter resets pagination
- Combined with pagination works

---

### PHASE 8: Error Handling

#### Test 8.1: Network Error
**Steps:**
1. Stop backend server
2. Try to load /leads
3. Observe error state

**Expected Result:** ✅
- Error message displayed
- "Failed to fetch" or similar
- Graceful error handling
- No crash

#### Test 8.2: 404 Error
**Steps:**
1. Login
2. Navigate to `/leads/invalid-id-12345`
3. Observe error

**Expected Result:** ✅
- Error displayed: "Lead not found"
- Graceful handling

#### Test 8.3: Expired Token
**Steps:**
1. Login
2. Clear localStorage token manually
3. Try to access /leads
4. Observe redirect

**Expected Result:** ✅
- Redirect to /login
- Cannot access protected route

---

### PHASE 9: Data Validation

#### Test 9.1: Invalid Email on Form
**Steps:**
1. Open PublicLeadForm
2. Enter email: "notanemail"
3. Click submit

**Expected Result:** ✅
- Validation error: "Invalid email"
- Cannot submit
- Zod validation working

#### Test 9.2: Required Fields
**Steps:**
1. Try to submit form with missing required fields
2. Each field shows specific error

**Expected Result:** ✅
- Name required
- Email required
- Phone required
- Messages helpful

#### Test 9.3: API Data Validation
**Steps:**
1. Create lead via API with invalid data
2. Send: `{name: "", email: "invalid"}`

**Expected Result:** ✅
- 400 Bad Request
- Validation error message
- Lead not created

---

## Integration Checklist

### Frontend Checklist
- [ ] Login page form validates correctly
- [ ] Login submits to POST /auth/login
- [ ] JWT token stored in localStorage
- [ ] Token injected in axios Authorization header
- [ ] ProtectedRoute guards dashboard
- [ ] Dashboard displays user info
- [ ] Leads page calls GET /leads with pagination
- [ ] Leads table displays data correctly
- [ ] Pagination controls work
- [ ] Status filter works
- [ ] Lead details page loads
- [ ] Notes form submits to POST /notes/:id
- [ ] Notes list displays
- [ ] Activity history displays
- [ ] Status change dropdown works
- [ ] Delete button shows for admin only
- [ ] Logout clears localStorage and redirects

### Backend Checklist
- [ ] POST /auth/login returns token and user
- [ ] POST /auth/register creates user
- [ ] POST /leads/public creates unassigned lead
- [ ] GET /leads returns paginated results
- [ ] GET /leads?status=NEW filters correctly
- [ ] GET /leads/:id returns lead details
- [ ] PATCH /leads/:id/status updates status
- [ ] PATCH /leads/:id/status logs activity
- [ ] PATCH /leads/:id/assign assigns lead
- [ ] PUT /leads/:id updates lead data
- [ ] PUT /leads/:id enforces member authorization
- [ ] DELETE /leads/:id returns 403 for members
- [ ] POST /notes/:id creates note
- [ ] GET /notes/:id returns notes with author
- [ ] GET /activity/:id returns activities

### Authorization Checklist
- [ ] Admin can view all leads
- [ ] Member can view only assigned leads
- [ ] Admin can delete leads
- [ ] Member cannot delete leads (403)
- [ ] Member can update only assigned leads
- [ ] Both can add notes to assigned leads
- [ ] Frontend hides delete button for members
- [ ] Backend returns 403 for unauthorized operations

---

## Debugging Tips

### Check Token
```javascript
// In browser console
localStorage.getItem("token")
// Should return JWT string
```

### Check API Call
```javascript
// In Network tab (F12 → Network)
// Look for POST /auth/login
// Headers should have Authorization: Bearer ...
```

### Check Database
```javascript
// MongoDB Atlas console
db.leads.find({})
// Should show all leads
```

### Check Logs
```bash
# Terminal running backend
# Should show:
# Server running on port 5000
# GET /api/leads 200
# POST /auth/login 200
```

---

## Performance Notes

- Pagination default: 10 items per page
- JWT token expires: 7 days
- Frontend caches queries with React Query
- Database indexes on email (unique), status

---

## Success Criteria

✅ **System is working when:**
1. Public users can submit leads without login
2. Admin can login and see all leads
3. Member can login and see only assigned leads
4. Admin can delete, member cannot
5. Both can add notes and see activity
6. Status changes create activity log entries
7. Pagination and filtering work
8. Proper error messages display
9. Logout clears session
10. API returns correct status codes (200, 201, 400, 403, 404)

**All tests passing = Full Integration Complete ✅**
