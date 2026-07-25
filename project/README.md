# Digital Heroes Training Task B

## Overview
This project is a production-ready MERN application scaffold built for the Digital Heroes Training Task B. It includes a React frontend and Express backend with clean architecture, JWT authentication, and secure API structure.

## Features
- React frontend with routing and reusable components
- Express backend with MVC + service + repository layers
- JWT authentication and password hashing
- Input validation and centralized error handling
- Environment-based configuration
- Production-ready structure for deployment

## Folder Structure
- `client/`: React application
- `server/`: Express API server
- `project/`: root project scaffold

## Technologies
- Frontend: React, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Security: Helmet, CORS, JWT, bcrypt
- Tools: ESLint, Prettier, nodemon

## Installation
### Prerequisites
- Node.js 18+
- npm 10+
- MongoDB Atlas or local MongoDB

### Clone Repository
```bash
git clone <repo-url>
cd project
```

### Install Client
```bash
cd client
npm install
```

### Install Server
```bash
cd ../server
npm install
```

### Configure .env
Copy `.env.example` to `.env` and update values.

### Run Development
```bash
cd client
npm run dev
```

```bash
cd server
npm run dev
```

### Run Tests
```bash
cd server
npm test
```

```bash
cd client
npm test
```

### Run with Docker
```bash
docker compose up --build
```

### Health Check
Use the health check endpoint to verify the API is running:
```bash
curl http://localhost:5000/api/health
```

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Future Improvements
- Add tests with Jest
- Add more user roles and permissions
- Add UI components for user management
- Deploy to Vercel and Render

## License
MIT
