
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
    TrendingUp,
    Clock,
    Globe,
    Smartphone,
    Monitor,
    Tablet,
    ShoppingCart,
    UserCheck,
    AlertTriangle,
    Star,
    MessageSquare,
    Share2,
    Download
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
    RadialBarChart,
    RadialBar
} from "recharts";

import { AnimatePresence, motion } from "framer-motion";

// Enhanced MetricCard Component
const MetricCard = ({ title, value, change, icon: Icon, color, prefix = "", suffix = "", trend = [] }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative overflow-hidden"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-slate-400" />
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                        {change >= 0 ? '+' : ''}{change}%
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">{title}</h3>
                    <p className="text-2xl font-bold text-white">
                        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                    </p>
                    {trend.length > 0 && (
                        <div className="h-8 mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trend}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={change >= 0 ? "#22c55e" : "#ef4444"}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Overview = () => {
    const [realTimeEnabled, setRealTimeEnabled] = useState(true);
    const [liveFeedPaused, setLiveFeedPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
        setRevenueData(generateRevenueData());
    }, []);

    // Enhanced data generators
    const generateRevenueData = () => {
        return Array.from({ length: 30 }, (_, i) => ({
            day: i + 1,
            revenue: Math.floor(Math.random() * 5000) + 2000,
            users: Math.floor(Math.random() * 200) + 100,
            conversions: Math.floor(Math.random() * 50) + 20,
            sessions: Math.floor(Math.random() * 300) + 150
        }));
    };

    const generateHourlyData = () => {
        return Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            users: Math.floor(Math.random() * 100) + 20,
            pageViews: Math.floor(Math.random() * 300) + 50,
            revenue: Math.floor(Math.random() * 1000) + 200
        }));
    };

    const generateTrafficSources = () => {
        return [
            { source: 'Organic Search', users: 12450, percentage: 45, color: '#22c55e' },
            { source: 'Direct', users: 8320, percentage: 30, color: '#3b82f6' },
            { source: 'Social Media', users: 4160, percentage: 15, color: '#f59e0b' },
            { source: 'Email', users: 2770, percentage: 10, color: '#8b5cf6' }
        ];
    };

    const generateUserRetention = () => {
        return [
            { week: 'Week 1', cohort1: 100, cohort2: 85, cohort3: 92 },
            { week: 'Week 2', cohort1: 75, cohort2: 68, cohort3: 78 },
            { week: 'Week 3', cohort1: 60, cohort2: 55, cohort3: 65 },
            { week: 'Week 4', cohort1: 48, cohort2: 42, cohort3: 52 },
        ];
    };

    const generateTopPages = () => {
        return [
            { page: '/dashboard', views: 15420, bounceRate: 12.3, avgTime: '4:23' },
            { page: '/product/analytics', views: 8930, bounceRate: 18.7, avgTime: '3:45' },
            { page: '/pricing', views: 6780, bounceRate: 25.4, avgTime: '2:18' },
            { page: '/features', views: 5640, bounceRate: 15.9, avgTime: '3:12' },
            { page: '/about', views: 3210, bounceRate: 32.1, avgTime: '1:56' }
        ];
    };

    const generateUserActivity = () => {
        return [
            { time: '00:00', active: 234 },
            { time: '04:00', active: 156 },
            { time: '08:00', active: 890 },
            { time: '12:00', active: 1234 },
            { time: '16:00', active: 1567 },
            { time: '20:00', active: 1890 },
            { time: '23:59', active: 678 }
        ];
    };

    // State management
    const [revenueData, setRevenueData] = useState(generateRevenueData());
    const [hourlyData] = useState(generateHourlyData());
    const [trafficSources] = useState(generateTrafficSources());
    const [userRetention] = useState(generateUserRetention());
    const [topPages] = useState(generateTopPages());
    const [userActivity] = useState(generateUserActivity());

    const [metrics, setMetrics] = useState({
        totalUsers: 24567,
        conversionRate: 12.8,
        revenue: 89234,
        bounceRate: 23.4,
        pageViews: 156789,
        activeUsers: 1234,
        avgSessionDuration: 245,
        newUsers: 3456,
        returningUsers: 21111,
        customerLifetimeValue: 1250,
        churnRate: 5.2,
        customerSatisfaction: 4.6
    });

    const [activities, setActivities] = useState([
        { id: 1, type: 'signup', user: 'John D.', time: '2 min ago', status: 'success', location: 'New York, US' },
        { id: 2, type: 'purchase', user: 'Sarah M.', time: '5 min ago', status: 'success', amount: 299, location: 'London, UK' },
        { id: 3, type: 'trial', user: 'Mike R.', time: '8 min ago', status: 'pending', location: 'Toronto, CA' },
        { id: 4, type: 'signup', user: 'Emma L.', time: '12 min ago', status: 'success', location: 'Sydney, AU' },
        { id: 5, type: 'upgrade', user: 'David K.', time: '15 min ago', status: 'success', amount: 99, location: 'Berlin, DE' }
    ]);

    const deviceData = [
        { name: 'Desktop', value: 45, color: '#38bdf8', icon: Monitor },
        { name: 'Mobile', value: 35, color: '#22c55e', icon: Smartphone },
        { name: 'Tablet', value: 20, color: '#f59e0b', icon: Tablet }
    ];

    const userJourneyData = [
        { stage: 'Landing', users: 10240, color: '#38bdf8' },
        { stage: 'Sign Up', users: 3856, color: '#22c55e' },
        { stage: 'Trial', users: 1247, color: '#f59e0b' },
        { stage: 'Purchase', users: 456, color: '#ef4444' },
        { stage: 'Renewal', users: 234, color: '#8b5cf6' }
    ];

    // Generate trend data for metric cards
    const generateTrendData = () => Array.from({ length: 7 }, (_, i) => ({
        value: Math.floor(Math.random() * 100) + 50
    }));

    return (
        <div className="space-y-6">
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
                    title="Total Users"
                    value={metrics.totalUsers}
                    change={5.2}
                    icon={Users}
                    color="from-blue-500 to-blue-600"
                    trend={generateTrendData()}
                />
                <MetricCard
                    title="Active Users"
                    value={metrics.activeUsers}
                    change={3.8}
                    icon={Zap}
                    color="from-indigo-500 to-indigo-600"
                    trend={generateTrendData()}
                />
                <MetricCard
                    title="Revenue"
                    value={metrics.revenue}
                    change={8.7}
                    icon={DollarSign}
                    color="from-green-500 to-green-600"
                    prefix="$"
                    trend={generateTrendData()}
                />
                <MetricCard
                    title="Conversion Rate"
                    value={metrics.conversionRate}
                    change={2.1}
                    icon={Target}
                    color="from-yellow-500 to-yellow-600"
                    suffix="%"
                    trend={generateTrendData()}
                />
                <MetricCard
                    title="Bounce Rate"
                    value={metrics.bounceRate}
                    change={-1.3}
                    icon={Activity}
                    color="from-red-500 to-red-600"
                    suffix="%"
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

            {/* Revenue and Hourly Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Enhanced Revenue Chart */}
                <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">Revenue Trends</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setRealTimeEnabled(!realTimeEnabled)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    realTimeEnabled
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-slate-700 text-slate-400 border border-slate-600'
                                }`}
                            >
                                {realTimeEnabled ? 'Live' : 'Paused'}
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <AreaChart
                            data={revenueData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                            <XAxis
                                dataKey="day"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                    borderRadius: "12px",
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                                }}
                                labelStyle={{ color: "#e2e8f0" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#22c55e"
                                fill="url(#revenueGradient)"
                                fillOpacity={1}
                                strokeWidth={3}
                                name="Revenue"
                            />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke="#3b82f6"
                                fill="url(#usersGradient)"
                                fillOpacity={1}
                                strokeWidth={2}
                                name="Users"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Enhanced Live Activity Feed */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">Live Activity</h3>
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
                    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                        <AnimatePresence>
                            {activities.map((activity) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                                >
                                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                                        activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white">
                                            <span className="font-medium">{activity.user}</span>
                                            <span className="text-slate-400 ml-1">
                        {activity.type === 'signup' && 'signed up'}
                                                {activity.type === 'purchase' && `purchased for $${activity.amount}`}
                                                {activity.type === 'trial' && 'started trial'}
                                                {activity.type === 'upgrade' && `upgraded for $${activity.amount}`}
                      </span>
                                        </p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-xs text-slate-500">{activity.time}</p>
                                            <p className="text-xs text-slate-500">{activity.location}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Traffic Sources and User Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Traffic Sources</h3>
                    <div className="space-y-4">
                        {trafficSources.map((source, index) => (
                            <motion.div
                                key={source.source}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: source.color }}
                                    />
                                    <span className="text-white font-medium">{source.source}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-semibold">{source.users.toLocaleString()}</p>
                                    <p className="text-slate-400 text-sm">{source.percentage}%</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={trafficSources} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#64748b" />
                                <YAxis dataKey="source" type="category" stroke="#64748b" width={100} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #475569',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="users" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Real-time User Activity */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">User Activity (24h)</h3>
                    <ResponsiveContainer width="100%" height={450}>
                        <LineChart data={userActivity}>
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
                            <Line
                                type="monotone"
                                dataKey="active"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Conversion Funnel and Device Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enhanced Conversion Funnel */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Conversion Funnel</h3>
                    <div className="space-y-4">
                        {userJourneyData.map((stage, index) => {
                            const percentage = index === 0 ? 100 : (stage.users / userJourneyData[0].users * 100);
                            const dropoff = index > 0 ? ((userJourneyData[index-1].users - stage.users) / userJourneyData[index-1].users * 100) : 0;

                            return (
                                <motion.div
                                    key={stage.stage}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-medium">{stage.stage}</span>
                                        <div className="text-right">
                                            <span className="text-white font-semibold">{stage.users.toLocaleString()}</span>
                                            {index > 0 && (
                                                <p className="text-red-400 text-xs">-{dropoff.toFixed(1)}% dropoff</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative h-10 bg-slate-700/50 rounded-lg overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1, delay: index * 0.2 }}
                                            className="h-full rounded-lg shadow-lg"
                                            style={{ backgroundColor: stage.color }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                                            {percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Enhanced Device Distribution */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Device Distribution</h3>
                    <div className="flex items-center justify-center mb-6">
                        <div style={{ width: '100%', height: '350px' }}>
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

            {/* Top Pages Performance */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Top Pages Performance</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-slate-700">
                            <th className="text-left py-3 px-4 text-slate-300 font-medium">Page</th>
                            <th className="text-right py-3 px-4 text-slate-300 font-medium">Views</th>
                            <th className="text-right py-3 px-4 text-slate-300 font-medium">Bounce Rate</th>
                            <th className="text-right py-3 px-4 text-slate-300 font-medium">Avg Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topPages.map((page, index) => (
                            <motion.tr
                                key={page.page}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                            >
                                <td className="py-4 px-4 text-white font-medium">{page.page}</td>
                                <td className="py-4 px-4 text-right text-white">{page.views.toLocaleString()}</td>
                                <td className="py-4 px-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.bounceRate < 20 ? 'bg-green-500/20 text-green-400' :
                            page.bounceRate < 30 ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                    }`}>
                      {page.bounceRate}%
                    </span>
                                </td>
                                <td className="py-4 px-4 text-right text-slate-300">{page.avgTime}</td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Retention Cohort */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">User Retention Cohorts</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userRetention}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="week" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="cohort1" stroke="#22c55e" strokeWidth={2} name="Cohort 1" />
                        <Line type="monotone" dataKey="cohort2" stroke="#3b82f6" strokeWidth={2} name="Cohort 2" />
                        <Line type="monotone" dataKey="cohort3" stroke="#f59e0b" strokeWidth={2} name="Cohort 3" />
                    </LineChart>
                </ResponsiveContainer>
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
    );
};

export default Overview;