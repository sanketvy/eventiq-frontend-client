// Simple Authentication Page Component
import {useEffect, useState} from "react";
import {
    BarChart3,
    Lock,
    Shield,
    ArrowRight,
    Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import {login} from "../KeycloakService.js";

const AuthenticationPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [pulseAnimation, setPulseAnimation] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulseAnimation(true);
            setTimeout(() => setPulseAnimation(false), 2000);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleAuthClick = () => {
        // Replace with your actual Keycloak server URL
        const keycloakUrl = "https://your-keycloak-server.com/auth/realms/your-realm/protocol/openid-connect/auth";
        window.location.href = keycloakUrl;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000"
                    style={{
                        left: mousePosition.x * 0.02,
                        top: mousePosition.y * 0.02,
                        opacity: pulseAnimation ? 0.3 : 0.1
                    }}
                />
                <div
                    className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1000"
                    style={{
                        right: mousePosition.x * 0.01,
                        bottom: mousePosition.y * 0.01,
                        opacity: pulseAnimation ? 0.3 : 0.1
                    }}
                />
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" />
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            </div>

            {/* Central Authentication Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-md w-full mx-4 text-center"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl" />

                <div className="relative z-10">
                    {/* Logo/Icon */}
                    <motion.div
                        animate={{ rotate: pulseAnimation ? 360 : 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-8"
                    >
                        <BarChart3 className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Analytics Dashboard
                    </h1>
                    <p className="text-slate-400 mb-8">
                        Sign in to access your analytics and insights
                    </p>

                    {/* Authentication Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={login}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3 group"
                    >
                        <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </motion.button>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center mt-6 text-slate-400">
                        <Shield className="w-4 h-4 mr-2" />
                        <span className="text-sm">Secured by Enterprise SSO</span>
                    </div>
                </div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute top-20 left-20 w-6 h-6 bg-blue-400/20 rounded-full blur-sm"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                    }}
                    className="absolute bottom-20 right-20 w-8 h-8 bg-purple-400/20 rounded-full blur-sm"
                />
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2
                    }}
                    className="absolute top-1/2 right-10 w-4 h-4 bg-green-400/20 rounded-full blur-sm"
                />
            </div>
        </div>
    );
};

export default AuthenticationPage;