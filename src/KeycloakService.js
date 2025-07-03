// KeycloakService.js
import Keycloak from 'keycloak-js';

let keycloakInstance = null;
let initialized = false;

const getKeycloak = () => {
    if (!keycloakInstance) {
        keycloakInstance = new Keycloak({
            url: 'http://localhost:8001/',
            realm: 'eventiq',
            clientId: 'frontend',
        });
    }
    return keycloakInstance;
};

export const initKeycloak = async (onReady) => {
    const kc = getKeycloak();

    if (!initialized) {
        try {
            const authenticated = await kc.init({
                onLoad: 'check-sso',
                pkceMethod: 'S256',
                checkLoginIframe: false, // avoids iframe issues
            });

            initialized = true;
            onReady(authenticated);
        } catch (err) {
            console.error('Keycloak init failed', err);
            onReady(false);
        }
    } else {
        onReady(kc.authenticated);
    }
};

export const login = () => getKeycloak().login();
export const logout = () => getKeycloak().logout({ redirectUri: window.location.origin });
export const getToken = () => getKeycloak().token;
export const isAuthenticated = () => getKeycloak().authenticated;
