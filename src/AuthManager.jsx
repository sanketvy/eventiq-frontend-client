import React, { useState, useEffect } from 'react';
import App from "./App.jsx";
import AuthenticationPage from "./components/AuthenticationPage.jsx";

const AuthManager = () => {
    // Toggle this state based on your authentication logic
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Example: Check authentication status on mount
    useEffect(() => {
        // Replace with your actual authentication check
        const checkAuth = () => {
            // Example: Check localStorage, cookies, or make API call
            const authToken = localStorage.getItem('authToken');
            setIsAuthenticated(!!authToken);
        };

        checkAuth();
    }, []);

    return (
        <>
            {isAuthenticated ? <App /> : <AuthenticationPage />}
        </>
    );
};

export default AuthManager;