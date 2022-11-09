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
        <GoogleOAuthProvider clientId='437358693043-6sotkdjdqrnvq7bcibllm9v2r2n884le.apps.googleusercontent.com'>
            <App />
        </GoogleOAuthProvider>
    </AuthProvider>
);
