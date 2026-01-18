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
if (googleClientId && !googleClientId.startsWith('your_')) {
    const requiredGoogleVars = ['GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL'];
    const missingGoogleVars = requiredGoogleVars.filter((key) => {
        const value = process.env[key];
        return !value || value.startsWith('your_');
    });

    if (missingGoogleVars.length > 0) {
        console.warn(`⚠️  Google Auth Warning: Missing or default values for ${missingGoogleVars.join(', ')}`);
        console.warn('Google OAuth may not work correctly.');
    }
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
