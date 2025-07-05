import React, {useEffect, useState} from 'react';
import { User, Plus, CreditCard, Bell, Settings, Mail, Shield, Trash2, Edit3, Save, X, Copy, Eye, EyeOff, RotateCw, Power } from 'lucide-react';
import axios from "axios";
import {IdentityService} from "../utils/RestPaths.js";
import {getToken} from "../KeycloakService.js";

const SettingsPage = ({updateProjects}) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [visibleKeys, setVisibleKeys] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation]= useState({});

    // Mock user data - in real app this would come from props/context
    const [userProfile, setUserProfile] = useState({});

    const [projects, setProjects] = useState([]);

    const [appSettings, setAppSettings] = useState({
        emailNotifications: true,
        weeklyReports: false,
        alertThreshold: 85,
        dataRetention: 12,
        darkMode: false,
        timezone: 'UTC-5'
    });

    const billingData = {
        plan: 'Professional',
        nextBilling: '2024-07-15',
        amount: '$49.99',
        method: '**** **** **** 1234',
        usage: {
            events: 125000,
            limit: 500000,
            percentage: 25
        }
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
        console.log(userProfile);
        axios.put(IdentityService.user, userProfile, {
            headers: {
                Authorization: `Bearer ${getToken()}`
             }
        }).then(r => refreshUserProfile());
    };

    useEffect(() => {
        refreshProjects();
        refreshUserProfile();
    }, []);

    const refreshUserProfile = ()=> {
        axios.get(IdentityService.user, {
            headers: {
                Authorization:  `Bearer ${getToken()}`
            }
        }).then(res => {
            setUserProfile(res.data);
        });
    }

    const refreshProjects = () => {
        axios.get(IdentityService.projects, {
            headers: {
                Authorization:  `Bearer ${getToken()}`
            }
        }).then(res => {
            setProjects(res.data);
            updateProjects(res.data);
        });
    }

    const handleCreateProject = () => {
        if (newProjectName.trim()) {
            const newProject = {
                projectName: newProjectName,
            };
            axios.post(IdentityService.projects, newProject, {
                headers:{
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(res => {
                refreshProjects();
            })
            setNewProjectName('');
            setShowCreateProject(false);
            setShowModal(false);
        }
    };

    const handleDeleteProject = (projectId) => {
        axios.delete(IdentityService.projects + "/" + projectId, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => refreshProjects());
    };

    const handleToggleKey = (projectId, status) => {
        axios.get(IdentityService.projects + "/status/" + projectId, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => refreshProjects());
    };

    const handleRenewKey = (projectId) => {
        setProjects(projects.map(p =>
            p.id === projectId ? { ...p, projectId: `proj_${Math.random().toString(36).substring(2, 22)}` } : p
        ));
    };

    const handleCopyKey = (key) => {
        navigator.clipboard.writeText(key);
        // You could add a toast notification here
    };

    const toggleKeyVisibility = (projectId) => {
        setVisibleKeys(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    const maskKey = (key) => {
        return key.substring(0, 8) + '•'.repeat(key.length - 12) + key.substring(key.length - 4);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'projects', label: 'Analytics Projects', icon: Settings },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield }
    ];

    const TabButton = ({ tab, isActive, onClick }) => {
        const Icon = tab.icon;
        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive
                        ? 'bg-gray-700 text-white border-l-4 border-blue-500'
                        : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
            </button>
        );
    };

    const renderProfileTab = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                        <Edit3 size={16} />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveProfile}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Save size={16} />
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={userProfile.firstName}
                                onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-100 py-2">{userProfile.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={userProfile.lastName}
                                onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-100 py-2">{userProfile.lastName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <p className="text-gray-100 py-2">{userProfile.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={userProfile.phoneNo}
                                onChange={(e) => setUserProfile({...userProfile, phoneNo: e.target.value})}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-100 py-2">{userProfile.phoneNo}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={userProfile.company}
                                onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-100 py-2">{userProfile.company}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={userProfile.role}
                                onChange={(e) => setUserProfile({...userProfile, role: e.target.value})}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-100 py-2">{userProfile.role}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProjectsTab = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Analytics Projects</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    Create Project
                </button>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{project.projectName}</h3>
                                    <p className="text-sm text-gray-400">
                                        Created: {new Date(project.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        project.isActive === true
                                            ? 'bg-green-900/50 text-green-300 border border-green-700'
                                            : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                                    }`}>
                                        {project.isActive ? "Active" : "Disabled"}
                                    </span>
                                    <button
                                        onClick={() => setDeleteConfirmation({ show: true, projectId: project.projectId, projectName: project.projectName })}
                                        className="text-red-400 hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Project ID Section */}
                            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-300">Project ID</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleKeyVisibility(project.id)}
                                            className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors"
                                            title={visibleKeys[project.projectId] ? "Hide key" : "Show key"}
                                        >
                                            {visibleKeys[project.projectId] ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                        <button
                                            onClick={() => handleCopyKey(project.projectId)}
                                            className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors"
                                            title="Copy key"
                                        >
                                            <Copy size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleRenewKey(project.projectId)}
                                            className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors"
                                            title="Renew key"
                                        >
                                            <RotateCw size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleToggleKey(project.projectId, project.isActive)}
                                            className={`p-1 rounded transition-colors ${
                                                project.isActive
                                                    ? 'text-green-400 hover:text-green-300'
                                                    : 'text-red-400 hover:text-red-300'
                                            }`}
                                            title={project.isActive ? "Disable key" : "Enable key"}
                                        >
                                            <Power size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <code className="text-sm text-gray-100 bg-gray-600 px-2 py-1 rounded font-mono">
                                        {visibleKeys[project.id] ? project.projectId : maskKey(project.projectId)}
                                    </code>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        project.isActive
                                            ? 'bg-green-900/50 text-green-300'
                                            : 'bg-red-900/50 text-red-300'
                                    }`}>
                                        {project.isActive ? 'Active' : 'Disabled'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Project Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Create New Project</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter project name"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleCreateProject}
                                    disabled={!newProjectName.trim()}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                                >
                                    Create Project
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setNewProjectName('');
                                    }}
                                    className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmation.show && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Delete Project</h3>
                            <button
                                onClick={() => setDeleteConfirmation({ show: false, projectId: null, projectName: '' })}
                                className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                                <div className="text-red-400">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Are you sure you want to delete this project?</p>
                                    <p className="text-gray-300 text-sm mt-1">
                                        "{deleteConfirmation.projectName}" will be permanently deleted.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => {
                                        handleDeleteProject(deleteConfirmation.projectId);
                                        setDeleteConfirmation({ show: false, projectId: null, projectName: '' });
                                    }}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete Project
                                </button>
                                <button
                                    onClick={() => setDeleteConfirmation({ show: false, projectId: null, projectName: '' })}
                                    className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderBillingTab = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Billing & Usage</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Plan</span>
                            <span className="font-medium text-gray-100">{billingData.plan}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Next Billing</span>
                            <span className="font-medium text-gray-100">{billingData.nextBilling}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Amount</span>
                            <span className="font-medium text-gray-100">{billingData.amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Payment Method</span>
                            <span className="font-medium text-gray-100">{billingData.method}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Events Tracked</span>
                                <span className="font-medium text-gray-100">{billingData.usage.events.toLocaleString()} / {billingData.usage.limit.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${billingData.usage.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Notification Settings</h2>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-white">Email Notifications</h3>
                            <p className="text-sm text-gray-400">Receive alerts and updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={appSettings.emailNotifications}
                                onChange={(e) => setAppSettings({...appSettings, emailNotifications: e.target.checked})}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-white">Weekly Reports</h3>
                            <p className="text-sm text-gray-400">Get weekly analytics summaries</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={appSettings.weeklyReports}
                                onChange={(e) => setAppSettings({...appSettings, weeklyReports: e.target.checked})}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Alert Threshold (%)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={appSettings.alertThreshold}
                            onChange={(e) => setAppSettings({...appSettings, alertThreshold: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                            <span>0%</span>
                            <span className="font-medium text-gray-100">{appSettings.alertThreshold}%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Security Settings</h2>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-white mb-4">Data Retention</h3>
                        <div className="flex items-center gap-4">
                            <select
                                value={appSettings.dataRetention}
                                onChange={(e) => setAppSettings({...appSettings, dataRetention: parseInt(e.target.value)})}
                                className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value={1}>1 month</option>
                                <option value={3}>3 months</option>
                                <option value={6}>6 months</option>
                                <option value={12}>12 months</option>
                                <option value={24}>24 months</option>
                            </select>
                            <span className="text-sm text-gray-400">Data will be automatically deleted after this period</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-white mb-4">Timezone</h3>
                        <select
                            value={appSettings.timezone}
                            onChange={(e) => setAppSettings({...appSettings, timezone: e.target.value})}
                            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="UTC-5">UTC-5 (Eastern)</option>
                            <option value="UTC-6">UTC-6 (Central)</option>
                            <option value="UTC-7">UTC-7 (Mountain)</option>
                            <option value="UTC-8">UTC-8 (Pacific)</option>
                            <option value="UTC+0">UTC+0 (GMT)</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-white">Dark Mode</h3>
                            <p className="text-sm text-gray-400">Enable dark theme for the interface</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={appSettings.darkMode}
                                onChange={(e) => setAppSettings({...appSettings, darkMode: e.target.checked})}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfileTab();
            case 'projects':
                return renderProjectsTab();
            case 'billing':
                return renderBillingTab();
            case 'notifications':
                return renderNotificationsTab();
            case 'security':
                return renderSecurityTab();
            default:
                return renderProfileTab();
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-2">Manage your account, projects, and preferences</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 space-y-2">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
                            {tabs.map((tab) => (
                                <TabButton
                                    key={tab.id}
                                    tab={tab}
                                    isActive={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;