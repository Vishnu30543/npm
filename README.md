# create-react-express-auth

> A CLI tool to scaffold a production-ready MERN stack application with built-in Authentication (JWT, Roles) and Authorization.

![License](https://img.shields.io/npm/l/create-react-express-auth)

This package helps beginner to intermediate developers simple start a full-stack project without setting up the boilerplate manually.

## Features

- **Frontend**: React + Vite + Context API
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT-based Auth (Login/Register)
- **Authorization**: Role-based access control (Admin/User)
- **Security**: Password hashing with bcrypt, protected routes
- **Structure**: Clean, specialized folder structure for scalability

## Installation & Usage

You don't need to install this package globally. Just run:

```bash
npx create-react-express-auth <project-name>
```

Example:

```bash
npx create-react-express-auth my-awesome-app
```

Then follow the on-screen instructions to get started!

## What's Included?

### Client (React + Vite)
- **AuthContext**: Manages user session state globally.
- **Axios**: Pre-configured instance with JWT interceptors.
- **Protected Routes**: Components to restrict access based on login status and roles.
- **Pages**: Login, Register, Dashboard, Admin.

### Server (Express)
- **MVC Architecture**: Models, Routes, Controllers/Middleware separation.
- **Middleware**: `verifyToken` and `authorizeRoles`.
- **Database**: Mongoose schema with password hashing hooks.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

ISC
