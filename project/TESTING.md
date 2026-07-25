# Testing Guide

## Overview
This project includes automated backend and frontend tests plus CI validation.

## Backend Tests

### Run locally
```bash
cd server
npm test
```

### What is covered
- API health check
- Authentication input validation
- Error handling for invalid registration data

## Frontend Tests

### Run locally
```bash
cd client
npm test
```

### What is covered
- Basic page rendering
- React component behavior

## Continuous Integration

A GitHub Actions workflow is configured at `.github/workflows/ci.yml`.
It runs:
- `npm install`
- `npm run lint`
- `npm test`
for both the server and client packages.

## Docker Validation

From the project root:
```bash
docker compose up --build
```

Then verify the API health endpoint:
```bash
curl http://localhost:5000/api/health
```
