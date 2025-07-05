import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthManager from "./AuthManager.jsx";

createRoot(document.getElementById('root')).render(
    <AuthManager />
)
