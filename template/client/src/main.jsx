import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

let clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId || clientId.startsWith('your_')) {
    console.warn('⚠️ VITE_GOOGLE_CLIENT_ID is not configured in client/.env file.');
    console.warn('❌ Google Authentication will NOT work until configured.');
    // Use a placeholder to prevent crashes - Google auth simply won't work
    clientId = 'not-configured';
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>,
);

