import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Google Auth Configuration Check
const googleClientId = process.env.GOOGLE_CLIENT_ID;
if (!googleClientId || googleClientId.startsWith('your_')) {
    console.warn('⚠️  Google Auth: GOOGLE_CLIENT_ID is not configured.');
    console.warn('❌ Google Authentication will NOT work until configured in .env file.');
} else {
    const requiredGoogleVars = ['GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL'];
    const missingGoogleVars = requiredGoogleVars.filter((key) => {
        const value = process.env[key];
        return !value || value.startsWith('your_');
    });

    if (missingGoogleVars.length > 0) {
        console.warn(`⚠️  Google Auth: Missing or default values for ${missingGoogleVars.join(', ')}`);
        console.warn('❌ Google Authentication will NOT work until all Google OAuth variables are configured in .env file.');
    }
}

// SMTP Configuration Check
const smtpEmail = process.env.SMTP_EMAIL;
const smtpPassword = process.env.SMTP_PASSWORD;
if (!smtpEmail || smtpEmail.startsWith('your_') || !smtpPassword || smtpPassword.startsWith('your_')) {
    console.warn('⚠️  SMTP: Email service is not configured.');
    console.warn('❌ Forgot Password feature will NOT work until SMTP_EMAIL and SMTP_PASSWORD are configured in .env file.');
}

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-auth-db')
    .then((conn) => console.log(`✅ MongoDB connected: ${conn.connection.host} / ${conn.connection.name}`))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
