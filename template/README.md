# MERN Auth Starter

This project was generated using `create-react-express-auth`.
It contains a fully functional MERN stack application with Authentication and Role-based Authorization.

## Project Structure

```
.
├── client/     # Frontend (React + Vite)
└── server/     # Backend (Node.js + Express + MongoDB)
```

## Getting Started

### 1. Setup Backend

Navigate to the server directory:

```bash
cd server
npm install
```

**Environment Variables:**

Rename `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and:
1.  Set `MONGO_URI` to your MongoDB connection string (e.g., `mongodb://localhost:27017/mern-auth-db`).
2.  Set `JWT_SECRET` to a secure random string.

Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

### 2. Setup Frontend

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The client will run on `http://localhost:5173`.

## Features Guide

### Authentication
- Users can register and login.
- Tokens are stored in `localStorage`.
- `AuthContext` provides `user` object and auth methods globally.

### Roles & Authorization
- Default role for new users is `user`.
- To create an **Admin**:
  - You can manually update a user's role to `admin` in your MongoDB database.
  - Or modify the registration logic in `server/routes/auth.js`.
- **Protected Routes**:
  - `/dashboard`: Accessible by any logged-in user.
  - `/admin`: Accessible ONLY by users with `admin` role.

### API Requests
- Use the pre-configured axios instance in `client/src/api/axios.js`.
- It automatically attaches the JWT token to every request header.

## Deployment

### Backend
Deploy to platforms like Render, Railway, or Heroku. Remember to set your environment variables on the platform.

### Frontend
Deploy to Vercel or Netlify.
Build command: `npm run build`
Output directory: `dist`
