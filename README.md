# create-react-express-auth

> A CLI tool to scaffold a production-ready MERN stack application with built-in Authentication (JWT, Roles), Google OAuth, and Authorization.

[![npm version](https://img.shields.io/npm/v/create-react-express-auth)](https://www.npmjs.com/package/create-react-express-auth)
[![License](https://img.shields.io/npm/l/create-react-express-auth)](https://opensource.org/licenses/ISC)
[![Downloads](https://img.shields.io/npm/dm/create-react-express-auth)](https://www.npmjs.com/package/create-react-express-auth)

This package helps beginner to intermediate developers quickly start a full-stack project without setting up the boilerplate manually.

## ✨ Features

- **Frontend**: React + Vite + Context API
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT-based Auth (Login/Register)
- **Google OAuth**: One-click Google Sign-In integration
- **Authorization**: Role-based access control (Admin/User)
- **Security**: Password hashing with bcrypt, protected routes
- **Structure**: Clean, modular folder structure for scalability

## 🚀 Quick Start

You don't need to install this package globally. Just run:

```bash
npx create-react-express-auth <project-name>
```

**Example:**

```bash
npx create-react-express-auth my-awesome-app
```

Then follow the on-screen instructions to get started!

## 📁 What's Included?

### Client (React + Vite)

| Feature | Description |
|---------|-------------|
| **AuthContext** | Manages user session state globally |
| **Google OAuth** | One-click sign-in using `@react-oauth/google` |
| **Axios** | Pre-configured instance with JWT interceptors |
| **Protected Routes** | Components to restrict access based on login status and roles |
| **Pages** | Login, Register, Dashboard, Admin |

### Server (Express)

| Feature | Description |
|---------|-------------|
| **MVC Architecture** | Models, Routes, Controllers/Middleware separation |
| **Google Auth** | Token verification using `google-auth-library` |
| **Middleware** | `verifyToken` and `authorizeRoles` |
| **Database** | Mongoose schema with password hashing hooks |

## ⚙️ Prerequisites

- Node.js >= 16.0.0
- MongoDB (local or Atlas)
- npm or yarn

## 📝 Environment Setup

After scaffolding your project, create `.env` files:

### Server `.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-super-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
```

### Client `.env`
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and setup **OAuth Consent Screen**
3. Navigate to **Credentials** > **Create Credentials** > **OAuth Client ID**
4. Select **Web Application**
5. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - Your production URL (for deployment)
6. Copy the **Client ID** to both server and client `.env` files

## 🏃 Running the Application

```bash
# Navigate to your project
cd my-awesome-app

# Install dependencies for both client and server
cd client && npm install
cd ../server && npm install

# Start the server (in server directory)
npm run dev

# Start the client (in client directory)
npm run dev
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[ISC](https://opensource.org/licenses/ISC)

---

**Made with ❤️ for the developer community**
