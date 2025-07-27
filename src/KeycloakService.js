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
        // --- FIX 1: Set flag immediately to prevent race conditions ---
        initialized = true;
        console.log("Attempting to initialize Keycloak...");

        try {
            const authenticated = await kc.init({
                onLoad: 'check-sso',
                pkceMethod: 'S256',
                checkLoginIframe: false,
            });

            // --- FIX 2: Add automatic token refresh ---
            // This tells keycloak to automatically refresh the token when it expires.
            kc.onTokenExpired = () => {
                console.log('Token expired, attempting refresh...');
                kc.updateToken(30) // 30 seconds minimum validity
                    .then(refreshed => {
                        if (refreshed) {
                            console.log('Token was successfully refreshed');
                        } else {
                            console.log('Token is still valid, no refresh needed');
                        }
                    })
                    .catch(() => {
                        console.error('Failed to refresh the token');
                    });
            };

            onReady(authenticated);
        } catch (err) {
            console.error('Keycloak init failed', err);
            onReady(false);
        }
    } else {
        // If already initialized, just call onReady with the current status
        onReady(kc.authenticated);
    }
};

// --- Your exported functions remain unchanged ---
export const login = () => getKeycloak().login();
export const logout = () => getKeycloak().logout({ redirectUri: window.location.origin });
export const getToken = () => getKeycloak().token;
export const isAuthenticated = () => getKeycloak().authenticated;