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

A `.env` file is automatically created when you run the CLI. Open `server/.env` and configure:

1.  **`MONGO_URI`** - Your MongoDB connection string (e.g., `mongodb://localhost:27017/mern-auth-db`)
2.  **`JWT_SECRET`** - A secure random string for JWT signing

Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

---

## Optional Features Configuration

### Google OAuth (Optional)

Google Login allows users to sign in with their Google account.

**Setup Steps:**
1.  Go to [Google Cloud Console](https://console.cloud.google.com/)
2.  Create a project and setup OAuth Consent Screen
3.  Create Credentials → OAuth Client ID (Web Application)
4.  Add `http://localhost:5173` to "Authorized JavaScript origins"
5.  Copy the Client ID and Client Secret to your `.env` files:
    - **Server** (`server/.env`): Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
    - **Client** (`client/.env`): Set `VITE_GOOGLE_CLIENT_ID`

> ⚠️ If not configured, Google Authentication will NOT work. The app will still function with email/password login.

---

### SMTP Email Service (Optional - Required for Forgot Password)

SMTP (Simple Mail Transfer Protocol) is used to send password reset emails. Without SMTP configured, the **Forgot Password** feature will NOT work.

#### What is SMTP?
SMTP is an internet standard protocol for sending emails. To send emails from your app, you need:
- **SMTP Host** - The mail server address (e.g., `smtp.gmail.com`)
- **SMTP Port** - Usually `587` (TLS) or `465` (SSL)
- **SMTP Email** - Your email address
- **SMTP Password** - An app-specific password (NOT your regular password)

#### Option 1: Using Gmail (Recommended for Development)

1. **Enable 2-Step Verification** on your Google Account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification"

2. **Generate an App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. **Update `server/.env`**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_16_char_app_password
   FROM_NAME=Your App Name
   ```

#### Option 2: Using Other Email Providers

| Provider | SMTP Host | Port |
|----------|-----------|------|
| Gmail | smtp.gmail.com | 587 |
| Outlook/Hotmail | smtp-mail.outlook.com | 587 |
| Yahoo | smtp.mail.yahoo.com | 587 |
| SendGrid | smtp.sendgrid.net | 587 |
| Mailgun | smtp.mailgun.org | 587 |

#### Option 3: Using Dedicated Email Services (Production)

For production, consider using:
- **[SendGrid](https://sendgrid.com/)** - Free tier: 100 emails/day
- **[Mailgun](https://www.mailgun.com/)** - Free tier: 5,000 emails/month
- **[AWS SES](https://aws.amazon.com/ses/)** - Very cost-effective for high volume
- **[Resend](https://resend.com/)** - Developer-friendly, 3,000 emails/month free

#### Troubleshooting SMTP

| Error | Solution |
|-------|----------|
| "Email service is not configured" | Set `SMTP_EMAIL` and `SMTP_PASSWORD` in `.env` |
| "Failed to send email" | Check if your email/password is correct |
| Gmail blocks sign-in | Enable "Less secure app access" or use App Password |
| Connection timeout | Check firewall/network settings |

> ⚠️ If SMTP is not configured, users will see a clear error message when trying to reset their password.

---

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
