import { useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await axios.post('/auth/forgot-password', { email });
            setMessage('Email sent! check your inbox.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send email');
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            <p>
                <Link to="/login">Back to Login</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
