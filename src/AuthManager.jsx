import React, { useState, useEffect } from 'react';
import App from "./App.jsx";
import AuthenticationPage from "./components/AuthenticationPage.jsx";
import {initKeycloak} from "./KeycloakService.js";

const AuthManager = () => {
    // Toggle this state based on your authentication logic
    const [authChecked, setAuthChecked] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        console.log(authenticated);
        initKeycloak((auth) => {
            setAuthenticated(auth);
            setAuthChecked(true);
        });
    }, []);

    return (
        <>
            {authenticated ? <App /> : <AuthenticationPage />}
        </>
    );
};

export default AuthManager;