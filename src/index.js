import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// AuthProvider
import { AuthProvider } from './services/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT}>
            <App />
        </GoogleOAuthProvider>
    </AuthProvider>
);
