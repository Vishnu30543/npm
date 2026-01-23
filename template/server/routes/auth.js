import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Role security check: prevent creating 'admin' directly without checks if needed. 
        // For this template, we allow it for simplicity/testing, but in prod you might restrict it.

        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT Payload
        const payload = {
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ... existing code ... */

// Google Login Route
router.post('/google-login', async (req, res) => {
    try {
        if (!process.env.GOOGLE_CLIENT_ID) {
            return res.status(500).json({ message: 'Google client ID not configured on server' });
        }
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user with a random password (since they use Google)
            const randomPassword = crypto.randomBytes(20).toString('hex');
            user = new User({
                name,
                email,
                password: randomPassword,
                role: 'user', // Default role
                googleId,
                avatar: picture,
            });
            await user.save();
        } else if (!user.googleId) {
            // Link existing user to Google if not already linked
            user.googleId = googleId;
            if (!user.avatar) user.avatar = picture;
            await user.save();
        }

        // Create JWT Payload
        const payload = {
            id: user._id,
            role: user.role,
        };

        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Google Login Failed' });
    }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Check if SMTP is configured
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpEmail || smtpEmail.startsWith('your_') || !smtpPassword || smtpPassword.startsWith('your_')) {
        return res.status(503).json({
            message: 'Email service is not configured. Please set SMTP_EMAIL and SMTP_PASSWORD in the server .env file to enable password reset.'
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get Reset Token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash token and set to resetPasswordToken field
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Set expire (10 minutes)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Create reset url
        // Assuming client runs on port 5173 or environment variable
        // In a real app, CLIENT_URL should be in .env
        const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                html: message,
            });

            res.status(200).json({ success: true, message: 'Password reset link has been sent to your email address.' });
        } catch (err) {
            console.error('Email sending failed:', err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return res.status(500).json({ message: 'Failed to send email. Please check SMTP configuration on the server.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password Route
router.put('/reset-password/:resetToken', async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resetToken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, data: 'Password updated success' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
