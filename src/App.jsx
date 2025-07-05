import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Home, Users, TrendingUp, Globe, Smartphone, Settings, Bell, Search, RefreshCcw,
    ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-react';
import Overview from "./pages/Overview.jsx";
import Geography from "./pages/Geography.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import DevicesPage from "./pages/DevicesPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import {getToken, logout} from "./KeycloakService.js";
import {IdentityService} from "./utils/RestPaths.js";
import axios from 'axios';


const App = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [realTimeEnabled, setRealTimeEnabled] = useState(true);
    const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
    const [selectedProject, setSelectedProject] = useState('project-1');
    const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
    const [liveFeedPaused, setLiveFeedPaused] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [projects, setProjects] = useState([]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const token = getToken();
        console.log(token)
        axios.get(IdentityService.currentUser, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then(r => setCurrentUser(r.data));

        axios.get(IdentityService.projects, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(r => setProjects(r.data));

        const handleClickOutside = (event) => {
            if (!event.target.closest('.project-dropdown')) {
                setProjectDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sidebarItems = [
        { id: 'overview', icon: Home, label: 'Overview' },
        { id: 'users', icon: Users, label: 'Users' },
        { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
        { id: 'geography', icon: Globe, label: 'Geography' },
        { id: 'devices', icon: Smartphone, label: 'Devices' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    const timeRanges = [
        { value: '1h', label: '1 Hour' },
        { value: '24h', label: '24 Hours' },
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' }
    ];

    const getCurrentProject = () => {
        return projects.find(p => p.projectId === selectedProject) || projects[0];
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <Overview selectedProject={selectedProject} />
                );

            case 'users':
                return (
                    <UsersPage selectedProject={selectedProject} />
                );

            case 'analytics':
                return (
                    <AnalyticsPage selectedProject={selectedProject} />
                )

            case 'devices':
                return (
                    <DevicesPage selectedProject={selectedProject} selectedTimeRange={selectedTimeRange} />
                )
            case 'geography':
                return (
                    <Geography selectedProject={selectedProject} />
                );
            case 'settings':
                return (
                    <SettingsPage selectedProject={selectedProject} updateProjects={setProjects} />
                );
            default:
                return <div className="text-white">Content for {activeTab}</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
            {/* Sidebar */}
            <motion.div
                animate={{ width: sidebarCollapsed ? 80 : 280 }}
                className="fixed left-0 top-0 h-full bg-slate-900/80 backdrop-blur-sm border-r border-slate-700/50 z-50"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        {!sidebarCollapsed && (
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                            >
                                EventIQ
                            </motion.h1>
                        )}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <nav className="px-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                                activeTab === item.id
                                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400'
                                    : 'hover:bg-slate-700/30 text-slate-300'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {!sidebarCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="ml-3 font-medium"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </motion.button>
                    ))}
                </nav>
            </motion.div>

            {/* Main Content */}
            <div style={{ marginLeft: sidebarCollapsed ? 80 : 280 }} className="min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>

                            {/* Project Selector Dropdown */}
                            <div className="relative project-dropdown">
                                <button
                                    onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                                >
                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600`}></div>
                                    <span className="text-sm font-medium text-white">{getCurrentProject()?.projectName}</span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${projectDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {projectDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 mt-2 w-64 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-xl z-50"
                                        >
                                            <div className="p-2">
                                                {projects.map((project) => (
                                                    <button
                                                        key={project.projectId}
                                                        onClick={() => {
                                                            setSelectedProject(project.projectId);
                                                            setProjectDropdownOpen(false);
                                                        }}
                                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                                            selectedProject === project.projectId
                                                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                                : 'hover:bg-slate-700/50 text-slate-300'
                                                        }`}
                                                    >
                                                        <div className={`w-3 h-3 rounded-full from-purple-400 to-purple-600`}></div>
                                                        <span className="text-sm font-medium">{project.projectName}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex items-center space-x-2">
                                {timeRanges.map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => setSelectedTimeRange(range.value)}
                                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                            selectedTimeRange === range.value
                                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                : 'hover:bg-slate-700/50 text-slate-400'
                                        }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 relative">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
                                />
                            </div>

                            {/* Notification Button */}
                            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors relative">
                                <Bell className="w-5 h-5 text-slate-400" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            </button>

                            {/* User Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg transition-colors"
                                >
                                    <span className="font-medium">{currentUser.firstName} {currentUser.lastName}</span>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                                        <div className="px-4 py-3 border-b border-slate-700 text-sm text-slate-300">
                                            <div>{currentUser.firstName} {currentUser.lastName}</div>
                                            <div className="text-slate-400 text-xs">{currentUser.email}</div>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 text-slate-300"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderMainContent()}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default App;