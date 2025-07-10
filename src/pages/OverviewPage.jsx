import React, { useState, useEffect } from 'react';
import {
    Activity,
    DollarSign,
    Eye,
    PauseCircle,
    PlayCircle,
    Target,
    Users,
    Zap,
    Clock,
    Smartphone,
    Monitor,
    Tablet,
    Star,
    CheckCircle,
    AlertCircle,
    XCircle,
    Server,
    Database,
    Globe,
    Shield,
    TrendingUp,
    TrendingDown,
    UserCheck,
    ShoppingCart,
    CreditCard,
    Settings
} from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
} from "recharts";

const OverviewPage = ({ selectedProject, selectedTimeRange, refresh }) => {
    const [realTimeEnabled, setRealTimeEnabled] = useState(true);
    const [liveFeedPaused, setLiveFeedPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [metrics, setMetrics] = useState({
        eventsCount: 45672,
        pageViews: 23456,
        avgSessionDuration: 245,
        customerSatisfaction: 4.7
    });

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Enhanced data generators
    const generateSessionData = () => {
        return [
            { time: '00:00', sessions: 145, concurrent: 89 },
            { time: '02:00', sessions: 98, concurrent: 56 },
            { time: '04:00', sessions: 76, concurrent: 34 },
            { time: '06:00', sessions: 234, concurrent: 156 },
            { time: '08:00', sessions: 567, concurrent: 389 },
            { time: '10:00', sessions: 789, concurrent: 567 },
            { time: '12:00', sessions: 1024, concurrent: 734 },
            { time: '14:00', sessions: 1156, concurrent: 823 },
            { time: '16:00', sessions: 1342, concurrent: 945 },
            { time: '18:00', sessions: 1567, concurrent: 1123 },
            { time: '20:00', sessions: 1890, concurrent: 1345 },
            { time: '22:00', sessions: 1234, concurrent: 876 },
            { time: '23:59', sessions: 678, concurrent: 445 }
        ];
    };

    // Geographic distribution data with actual countries
    const generateGeographicData = () => {
        return [
            { country: 'United States', users: 15420, percentage: 32.5, color: '#22c55e', flag: '🇺🇸' },
            { country: 'United Kingdom', users: 8930, percentage: 18.8, color: '#3b82f6', flag: '🇬🇧' },
            { country: 'Germany', users: 6780, percentage: 14.3, color: '#f59e0b', flag: '🇩🇪' },
            { country: 'France', users: 5640, percentage: 11.9, color: '#8b5cf6', flag: '🇫🇷' },
            { country: 'Canada', users: 4210, percentage: 8.9, color: '#ef4444', flag: '🇨🇦' },
            { country: 'Australia', users: 3890, percentage: 8.2, color: '#06b6d4', flag: '🇦🇺' },
            { country: 'Japan', users: 2540, percentage: 5.4, color: '#ec4899', flag: '🇯🇵' }
        ];
    };

    // System health data
    const generateSystemHealth = () => {
        return {
            services: [
                {
                    name: 'Web Server',
                    status: 'healthy',
                    uptime: '99.9%',
                    responseTime: '45ms',
                    icon: Server,
                    lastCheck: '2 min ago'
                },
                {
                    name: 'Database',
                    status: 'healthy',
                    uptime: '99.8%',
                    responseTime: '12ms',
                    icon: Database,
                    lastCheck: '1 min ago'
                },
                {
                    name: 'API Gateway',
                    status: 'warning',
                    uptime: '97.2%',
                    responseTime: '120ms',
                    icon: Globe,
                    lastCheck: '30 sec ago'
                },
                {
                    name: 'CDN',
                    status: 'healthy',
                    uptime: '99.9%',
                    responseTime: '8ms',
                    icon: Shield,
                    lastCheck: '1 min ago'
                }
            ],
            events: [
                { type: 'success', count: 24567, change: 12.3, icon: CheckCircle },
                { type: 'warning', count: 234, change: -5.7, icon: AlertCircle },
                { type: 'error', count: 45, change: -23.1, icon: XCircle },
                { type: 'critical', count: 2, change: -50.0, icon: XCircle }
            ],
            errorDistribution: [
                { name: '4xx Errors', value: 65, color: '#f59e0b' },
                { name: '5xx Errors', value: 25, color: '#ef4444' },
                { name: 'Timeout', value: 10, color: '#8b5cf6' }
            ]
        };
    };

    const deviceData = [
        { name: 'Desktop', value: 45, color: '#38bdf8', icon: Monitor },
        { name: 'Mobile', value: 35, color: '#22c55e', icon: Smartphone },
        { name: 'Tablet', value: 20, color: '#f59e0b', icon: Tablet }
    ];

    // State management
    const [sessionData] = useState(generateSessionData());
    const [geographicData] = useState(generateGeographicData());
    const [systemHealth] = useState(generateSystemHealth());
    const [activities, setActivities] = useState([
        { id: 1, type: 'signup', user: 'John D.', time: '2 min ago', status: 'success', location: 'New York, US', icon: UserCheck },
        { id: 2, type: 'purchase', user: 'Sarah M.', time: '5 min ago', status: 'success', amount: 299, location: 'London, UK', icon: ShoppingCart },
        { id: 3, type: 'trial', user: 'Mike R.', time: '8 min ago', status: 'pending', location: 'Toronto, CA', icon: Settings },
        { id: 4, type: 'signup', user: 'Emma L.', time: '12 min ago', status: 'success', location: 'Sydney, AU', icon: UserCheck },
        { id: 5, type: 'upgrade', user: 'David K.', time: '15 min ago', status: 'success', amount: 99, location: 'Berlin, DE', icon: CreditCard },
        { id: 6, type: 'purchase', user: 'Lisa T.', time: '18 min ago', status: 'success', amount: 149, location: 'Tokyo, JP', icon: ShoppingCart },
        { id: 7, type: 'trial', user: 'Alex M.', time: '22 min ago', status: 'pending', location: 'Paris, FR', icon: Settings },
        { id: 8, type: 'signup', user: 'Chris P.', time: '25 min ago', status: 'success', location: 'Mumbai, IN', icon: UserCheck },
        { id: 9, type: 'upgrade', user: 'Nina R.', time: '28 min ago', status: 'success', amount: 199, location: 'Moscow, RU', icon: CreditCard },
        { id: 10, type: 'purchase', user: 'Tom H.', time: '32 min ago', status: 'success', amount: 79, location: 'Madrid, ES', icon: ShoppingCart }
    ]);

    // Generate trend data for metric cards
    const generateTrendData = () => Array.from({ length: 7 }, (_, i) => ({
        value: Math.floor(Math.random() * 100) + 50
    }));

    const MetricCard = ({ title, value, change, icon: Icon, color, suffix = "", trend }) => (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                    {change >= 0 ? '+' : ''}{change}%
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold text-white">{value?.toLocaleString()}{suffix}</p>
            </div>
        </div>
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'healthy': return 'text-green-400';
            case 'warning': return 'text-yellow-400';
            case 'error': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case 'healthy': return 'bg-green-500/20';
            case 'warning': return 'bg-yellow-500/20';
            case 'error': return 'bg-red-500/20';
            default: return 'bg-slate-500/20';
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'signup': return 'bg-green-500/20 text-green-400';
            case 'purchase': return 'bg-blue-500/20 text-blue-400';
            case 'upgrade': return 'bg-purple-500/20 text-purple-400';
            case 'trial': return 'bg-yellow-500/20 text-yellow-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    const getActivityBgColor = (type) => {
        switch (type) {
            case 'signup': return 'bg-green-500/10';
            case 'purchase': return 'bg-blue-500/10';
            case 'upgrade': return 'bg-purple-500/10';
            case 'trial': return 'bg-yellow-500/10';
            default: return 'bg-slate-500/10';
        }
    };

    return (
        <div className="min-h-screen text-white">
            <div className="space-y-6 p-2">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                        <p className="text-slate-400 mt-1">Real-time insights and performance metrics</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm text-slate-400">Last updated</p>
                            <p className="text-white font-medium">{currentTime.toLocaleTimeString()}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${realTimeEnabled ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                    </div>
                </div>

                {/* Enhanced Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <MetricCard
                        title="Events Ingested"
                        value={metrics.eventsCount}
                        change={-1.3}
                        icon={Activity}
                        color="from-red-500 to-red-600"
                        suffix=""
                        trend={generateTrendData()}
                    />
                    <MetricCard
                        title="Page Views"
                        value={metrics.pageViews}
                        change={12.4}
                        icon={Eye}
                        color="from-purple-500 to-purple-600"
                        trend={generateTrendData()}
                    />
                    <MetricCard
                        title="Avg Session"
                        value={`${Math.floor(metrics.avgSessionDuration / 60)}:${(metrics.avgSessionDuration % 60).toString().padStart(2, '0')}`}
                        change={7.2}
                        icon={Clock}
                        color="from-cyan-500 to-cyan-600"
                        trend={generateTrendData()}
                    />
                    <MetricCard
                        title="Customer Satisfaction"
                        value={metrics.customerSatisfaction}
                        change={0.3}
                        icon={Star}
                        color="from-pink-500 to-pink-600"
                        suffix="/5"
                        trend={generateTrendData()}
                    />
                </div>

                {/* Session Count Chart */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Session Activity (24h)</h3>
                    <ResponsiveContainer width="100%" height={450}>
                        <AreaChart data={sessionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="time" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #475569',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="sessions"
                                stackId="1"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.3}
                                name="Total Sessions"
                            />
                            <Area
                                type="monotone"
                                dataKey="concurrent"
                                stackId="2"
                                stroke="#22c55e"
                                fill="#22c55e"
                                fillOpacity={0.6}
                                name="Concurrent Users"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* System Health and Live Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* System Health Dashboard */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-6">System Health</h3>

                        {/* Services Status */}
                        <div className="space-y-4 mb-6">
                            {systemHealth.services.map((service) => {
                                const IconComponent = service.icon;
                                return (
                                    <div key={service.name} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${getStatusBg(service.status)}`}>
                                                <IconComponent className={`w-5 h-5 ${getStatusColor(service.status)}`} />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{service.name}</p>
                                                <p className="text-slate-400 text-sm">Updated {service.lastCheck}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-semibold">{service.uptime}</p>
                                            <p className="text-slate-400 text-sm">{service.responseTime}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Event Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            {systemHealth.events.map((event) => {
                                const IconComponent = event.icon;
                                const isPositive = event.type === 'success';
                                const isNegative = event.change < 0;

                                return (
                                    <div key={event.type} className="p-4 bg-slate-700/30 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <IconComponent className={`w-5 h-5 ${
                                                event.type === 'success' ? 'text-green-400' :
                                                    event.type === 'warning' ? 'text-yellow-400' :
                                                        'text-red-400'
                                            }`} />
                                            <div className={`flex items-center space-x-1 text-xs ${
                                                isPositive ? (isNegative ? 'text-red-400' : 'text-green-400') :
                                                    (isNegative ? 'text-green-400' : 'text-red-400')
                                            }`}>
                                                {event.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                <span>{Math.abs(event.change)}%</span>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-white">{event.count.toLocaleString()}</p>
                                        <p className="text-slate-400 text-sm capitalize">{event.type} events</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Enhanced Live Activity Feed */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-white">Live Activity</h3>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-slate-400">Live</span>
                                </div>
                                <button
                                    onClick={() => setLiveFeedPaused(!liveFeedPaused)}
                                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                                >
                                    {liveFeedPaused ?
                                        <PlayCircle className="w-5 h-5 text-slate-400" /> :
                                        <PauseCircle className="w-5 h-5 text-green-400" />
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="h-150">
                            <div className="space-y-3 h-full overflow-y-auto custom-scrollbar pr-2">
                                {activities.map((activity) => {
                                    const IconComponent = activity.icon;
                                    return (
                                        <div
                                            key={activity.id}
                                            className={`flex items-start space-x-4 p-4 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 ${getActivityBgColor(activity.type)}`}
                                        >
                                            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="text-sm font-medium text-white truncate">
                                                        {activity.user}
                                                    </p>
                                                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-1">
                                                    {activity.type === 'signup' && 'Created new account'}
                                                    {activity.type === 'purchase' && `Made purchase • $${activity.amount}`}
                                                    {activity.type === 'trial' && 'Started free trial'}
                                                    {activity.type === 'upgrade' && `Upgraded plan • $${activity.amount}`}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-slate-500 truncate">{activity.location}</p>
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                                                    }`} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Geographic Distribution and Device Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Enhanced Geographic Distribution */}
                    {/* Enhanced Geographic Distribution */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Geographic Distribution</h3>
                        <div className="flex items-center justify-center mb-6">
                            <div style={{ width: '100%', height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={geographicData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            innerRadius="50%"
                                            dataKey="users"
                                            startAngle={90}
                                            endAngle={450}
                                            paddingAngle={2}
                                        >
                                            {geographicData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1e293b',
                                                border: '1px solid #475569',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="flex space-x-4 pb-2 min-w-max">
                                {geographicData.map((country, index) => (
                                    <div key={country.country} className="flex-shrink-0 w-48 p-4 bg-slate-700/30 rounded-lg">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className="text-2xl">{country.flag}</span>
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: country.color }}
                                                />
                                                <span className="text-white font-semibold">{country.percentage}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium mb-1">{country.country}</p>
                                            <p className="text-slate-400 text-sm">{country.users.toLocaleString()} users</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Device Distribution */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Device Distribution</h3>
                        <div className="flex items-center justify-center mb-6">
                            <div style={{ width: '100%', height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            innerRadius="50%"
                                            dataKey="value"
                                            startAngle={90}
                                            endAngle={450}
                                            paddingAngle={5}
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1e293b',
                                                border: '1px solid #475569',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {deviceData.map((device) => {
                                const IconComponent = device.icon;
                                return (
                                    <div key={device.name} className="text-center p-3 bg-slate-700/30 rounded-lg">
                                        <div className="flex items-center justify-center mb-3">
                                            <IconComponent className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <div className="flex items-center justify-center mb-2">
                                            <div
                                                className="w-3 h-3 rounded-full mr-2"
                                                style={{ backgroundColor: device.color }}
                                            />
                                            <span className="text-sm text-slate-300">{device.name}</span>
                                        </div>
                                        <div className="text-xl font-bold text-white">{device.value}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Custom CSS for scrollbar */}
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #334155;
                        border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #64748b;
                        border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default OverviewPage;