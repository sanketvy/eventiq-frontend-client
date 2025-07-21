import React, {useState, useEffect} from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Globe,
    Monitor,
    Plus,
    Server,
    Trash2,
    XCircle,
    Bell,
    Shield,
    Database,
    Play,
    Pause,
    AlertCircle, PauseCircle, PlayCircle,
} from "lucide-react";
import axios from "axios";
import {MonitoringService} from "../utils/RestPaths.js";
import {getToken} from "../KeycloakService.js";

const MonitoringDashboard = ({selectedProject, refresh}) => {
    const [activeTab, setActiveTab] = useState('monitors');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const [monitors, setMonitors] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch monitors
    useEffect(() => {
        if (selectedProject) {
            fetchMonitors();
        }
    }, [selectedProject, refresh]);

    // Fetch alerts when alerts tab is active
    useEffect(() => {
        if (activeTab === 'alerts' && selectedProject) {
            fetchAlerts();
        }
    }, [activeTab, selectedProject]);

    const fetchMonitors = async () => {
        try {
            const response = await axios.get(MonitoringService.probes + '/' + selectedProject, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setMonitors(response.data);
        } catch (error) {
            console.error('Error fetching monitors:', error);
        }
    };

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            // Assuming you have an alerts endpoint - adjust as needed
            const response = await axios.get(MonitoringService.alert, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setAlerts(response.data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        } finally {
            setLoading(false);
        }
    };

    const [newMonitor, setNewMonitor] = useState({
        name: '',
        url: '',
        type: 'website',
        checkInterval: 60
    });

    const [newAlert, setNewAlert] = useState({
        name: '',
        alertType: '',
        alertThreshold: '',
        notificationMethod: 'email',
        notificationValue: '',
        isEnabled: true
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return 'text-green-400';
            case 'warning':
                return 'text-yellow-400';
            case 'offline':
                return 'text-red-400';
            default:
                return 'text-slate-400';
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case 'online':
                return 'bg-green-500/20';
            case 'warning':
                return 'bg-yellow-500/20';
            case 'offline':
                return 'bg-red-500/20';
            default:
                return 'bg-slate-500/20';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'website':
                return Globe;
            case 'api':
                return Server;
            case 'cdn':
                return Shield;
            case 'database':
                return Database;
            default:
                return Monitor;
        }
    };

    const handleCreateMonitor = async () => {
        try {
            await axios.post(MonitoringService.probes, {
                projectId: selectedProject,
                interval: newMonitor.checkInterval,
                name: newMonitor.name,
                type: newMonitor.type,
                url: newMonitor.url
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setShowCreateModal(false);
            setNewMonitor({name: '', url: '', type: 'website', checkInterval: 60});
            fetchMonitors(); // Refresh monitors list
        } catch (error) {
            console.error('Error creating monitor:', error);
        }
    };

    const handleCreateAlert = async () => {
        if (selectedMonitor) {
            try {
                await axios.post(MonitoringService.alert, {
                    monitoringId: selectedMonitor.id,
                    name: newAlert.name,
                    alertType: newAlert.alertType,
                    alertThreshold: newAlert.alertThreshold,
                    notificationMethod: newAlert.notificationMethod,
                    notificationValue: newAlert.notificationValue,
                    isEnabled: newAlert.isEnabled
                }, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                setShowAlertModal(false);
                setSelectedMonitor(null);
                fetchAlerts(); // Refresh alerts list
            } catch (error) {
                console.error('Error creating alert:', error);
            }
        }
    };

    const deleteMonitor = async (id) => {
        try {
            await axios.delete(MonitoringService.probes + '/' + id, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            fetchMonitors(); // Refresh monitors list
        } catch (error) {
            console.error('Error deleting monitor:', error);
        }
    };

    const deleteAlert = async (alertId) => {
        try {
            await axios.delete(MonitoringService.alert + '/' + alertId, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            fetchAlerts(); // Refresh alerts list
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    const toggleMonitor = (id) => {
        setMonitors(monitors.map(m =>
            m.id === id ? {...m, status: m.status === 'online' ? 'offline' : 'online'} : m
        ));
    };

    const toggleAlertEnabled = async (alertId, currentStatus) => {
        try {
            await axios.patch(AlertService.alerts + '/' + alertId, {
                isEnabled: !currentStatus
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            fetchAlerts(); // Refresh alerts list
        } catch (error) {
            console.error('Error toggling alert:', error);
        }
    };

    // Helper function to get alerts for a specific monitor
    const getAlertsForMonitor = (monitorId) => {
        return alerts.filter(alert => alert.monitoringId === monitorId);
    };

    // Helper function to get monitor by ID
    const getMonitorById = (monitorId) => {
        return monitors.find(monitor => monitor.id === monitorId);
    };

    const MonitorCard = ({monitor}) => {
        const StatusIcon = monitor.status === 'online' ? CheckCircle :
            monitor.status === 'warning' ? AlertTriangle : XCircle;
        const TypeIcon = getTypeIcon(monitor.type);
        const monitorAlerts = getAlertsForMonitor(monitor.id);

        return (
            <div
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${getStatusBg(monitor.status)}`}>
                            <TypeIcon className={`w-6 h-6 ${getStatusColor(monitor.status)}`}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">{monitor.name}</h3>
                            <p className="text-slate-400 text-sm">{monitor.url}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => toggleMonitor(monitor.id)}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            {monitor.status === 'online' ?
                                <Pause className="w-4 h-4 text-slate-400"/> :
                                <Play className="w-4 h-4 text-green-400"/>
                            }
                        </button>
                        <button
                            onClick={() => {
                                setSelectedMonitor(monitor);
                                setShowAlertModal(true);
                            }}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors relative"
                        >
                            <Bell className="w-4 h-4 text-slate-400"/>
                            {monitorAlerts.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {monitorAlerts.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => deleteMonitor(monitor.id)}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4 text-red-400"/>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                            <StatusIcon className={`w-4 h-4 ${getStatusColor(monitor.status)}`}/>
                            <span className={`text-sm font-medium ${getStatusColor(monitor.status)}`}>
                                {monitor.status.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">Status</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-white">
                            {monitor.responseTime ? `${monitor.responseTime}ms` : 'N/A'}
                        </p>
                        <p className="text-xs text-slate-500">Response Time</p>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-slate-500"/>
                        <span className="text-slate-400">Every {monitor.checkInterval}s</span>
                    </div>
                    <span className="text-slate-500">Last check: {monitor.lastCheck}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen text-white">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Monitoring & Alerts</h1>
                        <p className="text-slate-400 mt-1">Monitor your infrastructure and get notified instantly</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5"/>
                        <span>Add Monitor</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setActiveTab('monitors')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                            activeTab === 'monitors'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                        }`}
                    >
                        <Monitor className="w-4 h-4"/>
                        <span>Monitors</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('alerts')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                            activeTab === 'alerts'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                        }`}
                    >
                        <Bell className="w-4 h-4"/>
                        <span>Alerts</span>
                    </button>
                </div>

                {/* Monitors Tab */}
                {activeTab === 'monitors' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {monitors?.map(monitor => (
                            <MonitorCard key={monitor.id} monitor={monitor}/>
                        ))}
                    </div>
                )}

                {/* Alerts Tab */}
                {activeTab === 'alerts' && (
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Alert Configuration</h3>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="text-slate-400">Loading alerts...</div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {monitors.map(monitor => {
                                    const IconComponent = getTypeIcon(monitor.type);
                                    const monitorAlerts = getAlertsForMonitor(monitor.id);

                                    return (
                                        <div key={monitor.id} className="bg-slate-700/30 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`p-2 rounded-lg ${getStatusBg(monitor.status)}`}>
                                                        <IconComponent
                                                            className={`w-5 h-5 ${getStatusColor(monitor.status)}`}/>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium">{monitor.name}</h4>
                                                        <p className="text-slate-400 text-sm">{monitor.url}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setSelectedMonitor(monitor);
                                                        setShowAlertModal(true);
                                                    }}
                                                    className="flex items-center space-x-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4"/>
                                                    <span>Add Alert</span>
                                                </button>
                                            </div>
                                            {monitorAlerts.length > 0 ? (
                                                <div className="space-y-2">
                                                    {monitorAlerts.map((alert) => (
                                                        <div key={alert.id}
                                                             className="flex items-center justify-between bg-slate-600/30 rounded-lg p-3">
                                                            <div className="flex items-center space-x-3">
                                                                <AlertCircle className="w-4 h-4 text-yellow-400"/>
                                                                <div>
                                                                    <div className="flex items-center space-x-2 mb-1">
                                                                        <span className="text-white font-medium">{alert.name}</span>
                                                                        <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">
                                                            {alert.alertType === 'downtime' ? 'Downtime' :
                                                                alert.alertType === 'status_code' ? 'Status Code' :
                                                                    alert.alertType === 'response_time' ? 'Response Time' :
                                                                        alert.alertType}
                                                        </span>
                                                                    </div>
                                                                    <p className="text-slate-400 text-sm">
                                                                        {alert.notificationMethod}: {alert.notificationValue}
                                                                    </p>
                                                                    {(alert.alertType === 'status_code' || alert.alertType === 'response_time') && alert.alertThreshold && (
                                                                        <p className="text-slate-500 text-xs mt-1">
                                                                            Threshold: {alert.alertThreshold}
                                                                            {alert.alertType === 'response_time' ? 'ms' : ''}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <div
                                                                    className={`w-3 h-3 rounded-full ${alert.isEnabled ? 'bg-green-400' : 'bg-slate-500'}`}/>
                                                                <button
                                                                    onClick={() => toggleAlertEnabled(alert.id, alert.isEnabled)}
                                                                    className={`p-1.5 rounded-lg transition-colors ${
                                                                        alert.isEnabled
                                                                            ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30'
                                                                            : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                                                                    }`}
                                                                    title={alert.isEnabled ? 'Disable Alert' : 'Enable Alert'}
                                                                >
                                                                    {alert.isEnabled ? (
                                                                        <PauseCircle className="w-4 h-4"/>
                                                                    ) : (
                                                                        <PlayCircle className="w-4 h-4"/>
                                                                    )}
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteAlert(alert.id)}
                                                                    className="p-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
                                                                    title="Delete Alert"
                                                                >
                                                                    <Trash2 className="w-4 h-4"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-slate-500 text-sm">No alerts configured</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Create Monitor Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold text-white mb-6">Create New Monitor</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Monitor Name</label>
                                    <input
                                        type="text"
                                        value={newMonitor.name}
                                        onChange={(e) => setNewMonitor({...newMonitor, name: e.target.value})}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="e.g., Main Website"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">URL/Endpoint</label>
                                    <input
                                        type="url"
                                        value={newMonitor.url}
                                        onChange={(e) => setNewMonitor({...newMonitor, url: e.target.value})}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Monitor Type</label>
                                    <select
                                        value={newMonitor.type}
                                        onChange={(e) => setNewMonitor({...newMonitor, type: e.target.value})}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="website">Website</option>
                                        <option value="api">API Endpoint</option>
                                        <option value="cdn">CDN/Assets</option>
                                        <option value="database">Database</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Check Interval
                                        (seconds)</label>
                                    <input
                                        type="number"
                                        value={newMonitor.checkInterval}
                                        onChange={(e) => setNewMonitor({
                                            ...newMonitor,
                                            checkInterval: parseInt(e.target.value)
                                        })}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        min="30"
                                        max="3600"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateMonitor}
                                    disabled={!newMonitor.name || !newMonitor.url}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                >
                                    Create Monitor
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Create Alert Modal */}
                {showAlertModal && selectedMonitor && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Create Alert for {selectedMonitor.name}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Alert Name</label>
                                    <input
                                        type="text"
                                        value={newAlert.name}
                                        onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="e.g., Downtime Alert"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Alert Type</label>
                                    <select
                                        value={newAlert.alertType}
                                        onChange={(e) => setNewAlert({...newAlert, alertType: e.target.value})}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="downtime">URL Downtime/Unavailable</option>
                                        <option value="status_code">Status Code</option>
                                        <option value="response_time">Response Time</option>
                                    </select>
                                </div>

                                {(newAlert.alertType === 'status_code' || newAlert.alertType === 'response_time') && (
                                    <div>
                                        <label className="block text-slate-400 text-sm mb-2">
                                            Alert Threshold
                                            {newAlert.alertType === 'status_code' && ' (Status Code)'}
                                            {newAlert.alertType === 'response_time' && ' (milliseconds)'}
                                        </label>
                                        <input
                                            type="number"
                                            value={newAlert.alertThreshold || ''}
                                            onChange={(e) => setNewAlert({...newAlert, alertThreshold: e.target.value})}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                            placeholder={
                                                newAlert.alertType === 'status_code' ? '404' :
                                                    newAlert.alertType === 'response_time' ? '5000' : ''
                                            }
                                            min="0"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            {newAlert.alertType === 'status_code' && 'Alert when status code equals or exceeds this value'}
                                            {newAlert.alertType === 'response_time' && 'Alert when response time exceeds this value (in ms)'}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Notification Method</label>
                                    <select
                                        value={newAlert.notificationMethod}
                                        onChange={(e) => setNewAlert({...newAlert, notificationMethod: e.target.value})}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        <option value="webhook">Webhook</option>
                                        <option value="slack">Slack</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">
                                        {newAlert.notificationMethod === 'email' ? 'Email Address' :
                                            newAlert.notificationMethod === 'sms' ? 'Phone Number' :
                                                newAlert.notificationMethod === 'webhook' ? 'Webhook URL' :
                                                    newAlert.notificationMethod === 'slack' ? 'Slack Channel/Webhook' : 'Notification Value'}
                                    </label>
                                    <input
                                        type="text"
                                        value={newAlert.notificationValue}
                                        onChange={(e) => setNewAlert({...newAlert, notificationValue: e.target.value})}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        placeholder={
                                            newAlert.notificationMethod === 'email' ? 'admin@example.com' :
                                                newAlert.notificationMethod === 'sms' ? '+1234567890' :
                                                    newAlert.notificationMethod === 'webhook' ? 'https://webhook.url' :
                                                        newAlert.notificationMethod === 'slack' ? '#alerts or webhook-url' : ''
                                        }
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="enabled"
                                        checked={newAlert.isEnabled}
                                        onChange={(e) => setNewAlert({...newAlert, isEnabled: e.target.checked})}
                                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="enabled" className="text-slate-400 text-sm">
                                        Enable alert immediately
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => {
                                        setShowAlertModal(false);
                                        setSelectedMonitor(null);
                                        setNewAlert({
                                            name: '',
                                            alertType: 'downtime',
                                            notificationMethod: 'email',
                                            notificationValue: '',
                                            alertThreshold: '',
                                            isEnabled: true
                                        });
                                    }}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateAlert}
                                    disabled={
                                        !newAlert.name ||
                                        !newAlert.notificationValue ||
                                        ((newAlert.alertType === 'status_code' || newAlert.alertType === 'response_time') && !newAlert.alertThreshold)
                                    }
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                >
                                    Create Alert
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonitoringDashboard;