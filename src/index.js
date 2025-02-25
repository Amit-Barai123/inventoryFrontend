import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/authentication_context";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
        <AuthProvider>
            <App />
        </AuthProvider>
);

// Performance measurement setup
reportWebVitals();
