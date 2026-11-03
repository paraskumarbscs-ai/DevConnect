# DevConnect

A full-stack developer collaboration platform built with MongoDB, Express, React and Node.js.

## Features in this starter release

- JWT-based registration and login
- Password hashing with bcrypt
- Developer profile editing and skill search
- Publish, browse, update and delete projects (owner-only update/delete)
- Send collaboration requests and accept/reject incoming requests
- Responsive dark UI
- Request validation, rate limiting, Helmet and centralized error handling

## Stack

- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Zod + Axios

## Requirements

- Node.js 20+
- MongoDB local instance or MongoDB Atlas database

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB connection string and a random JWT secret of at least 32 characters.

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/health` | API health check | No |
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Sign in | No |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/users/search?q=` | Search developers | Yes |
| GET | `/api/users/me` | View own profile | Yes |
| PATCH | `/api/users/me` | Update own profile | Yes |
| GET | `/api/projects` | Browse projects | Yes |
| POST | `/api/projects` | Create project | Yes |
| GET | `/api/projects/:id` | Project details | Yes |
| PATCH | `/api/projects/:id` | Update own project | Yes |
| DELETE | `/api/projects/:id` | Delete own project | Yes |
| POST | `/api/collaborations` | Request to join project | Yes |
| GET | `/api/collaborations/inbox` | Incoming requests | Yes |
| PATCH | `/api/collaborations/:id/respond` | Accept/reject request | Yes |

## Notes

- The frontend stores the JWT in localStorage for this learning/demo starter. For a production deployment, consider secure, httpOnly cookies and CSRF protection.
- The collaboration inbox endpoints are implemented; a dedicated inbox UI is a planned next module.
- Messaging, Socket.IO, task boards, image uploads and automated tests are planned next.
- Never commit `.env`, credentials, private keys or real user data.
