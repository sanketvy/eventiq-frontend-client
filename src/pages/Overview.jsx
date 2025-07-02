import MetricCard from "../components/MetricCard.jsx";
import {Activity, DollarSign, Eye, PauseCircle, PlayCircle, Target, Users, Zap} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";

const Overview = () => {
    const [realTimeEnabled, setRealTimeEnabled] = useState(true);
    const [liveFeedPaused, setLiveFeedPaused] = useState(false);
    const generateDeviceData = () => {
        return [
            { name: 'Desktop', value: 45, color: '#38bdf8' },
            { name: 'Mobile', value: 35, color: '#22c55e' },
            { name: 'Tablet', value: 20, color: '#f59e0b' }
        ];
    };

    const generateGeoData = () => {
        return [
            { country: 'USA', users: 3240, revenue: 45600, lat: 39.8, lng: -98.5 },
            { country: 'UK', users: 1560, revenue: 23400, lat: 55.3, lng: -3.4 },
            { country: 'Germany', users: 1890, revenue: 28900, lat: 51.1, lng: 10.4 },
            { country: 'France', users: 1220, revenue: 18700, lat: 46.2, lng: 2.2 },
            { country: 'Canada', users: 980, revenue: 15600, lat: 56.1, lng: -106.3 }
        ];
    };

    const [geoData] = useState(generateGeoData());

    const [deviceData] = useState(generateDeviceData());

    // Live activity feed
    const [activities, setActivities] = useState([
        { id: 1, type: 'signup', user: 'John D.', time: '2 min ago', status: 'success' },
        { id: 2, type: 'purchase', user: 'Sarah M.', time: '5 min ago', status: 'success' },
        { id: 3, type: 'trial', user: 'Mike R.', time: '8 min ago', status: 'pending' },
        { id: 4, type: 'signup', user: 'Emma L.', time: '12 min ago', status: 'success' },
        { id: 5, type: 'upgrade', user: 'David K.', time: '15 min ago', status: 'success' }
    ]);
    const generateUserJourneyData = () => {
        return [
            { stage: 'Landing', users: 10240, color: '#38bdf8' },
            { stage: 'Sign Up', users: 3856, color: '#22c55e' },
            { stage: 'Trial', users: 1247, color: '#f59e0b' },
            { stage: 'Purchase', users: 456, color: '#ef4444' },
            { stage: 'Renewal', users: 234, color: '#8b5cf6' }
        ];
    };
    const [userJourneyData] = useState(generateUserJourneyData());

    // Sample data generators
    const generateRevenueData = () => {
        return Array.from({ length: 30 }, (_, i) => ({
            day: i + 1,
            revenue: Math.floor(Math.random() * 5000) + 2000,
            users: Math.floor(Math.random() * 200) + 100,
            conversions: Math.floor(Math.random() * 50) + 20
        }));
    };
    const [revenueData, setRevenueData] = useState(generateRevenueData());

    // Real-time metrics
    const [metrics, setMetrics] = useState({
        totalUsers: 24567,
        conversionRate: 12.8,
        revenue: 89234,
        bounceRate: 23.4,
        pageViews: 156789,
        activeUsers: 1234
    });

    return (
        <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <MetricCard
                    title="Total UsersPage"
                    value={metrics.totalUsers}
                    change={5.2}
                    icon={Users}
                    color="from-blue-500 to-blue-600"
                />
                <MetricCard
                    title="Conversion Rate"
                    value={metrics.conversionRate}
                    change={2.1}
                    icon={Target}
                    color="from-green-500 to-green-600"
                    suffix="%"
                />
                <MetricCard
                    title="Revenue"
                    value={metrics.revenue}
                    change={8.7}
                    icon={DollarSign}
                    color="from-yellow-500 to-yellow-600"
                    prefix="$"
                />
                <MetricCard
                    title="Bounce Rate"
                    value={metrics.bounceRate}
                    change={-1.3}
                    icon={Activity}
                    color="from-red-500 to-red-600"
                    suffix="%"
                />
                <MetricCard
                    title="Page Views"
                    value={metrics.pageViews}
                    change={12.4}
                    icon={Eye}
                    color="from-purple-500 to-purple-600"
                />
                <MetricCard
                    title="Active UsersPage"
                    value={metrics.activeUsers}
                    change={3.8}
                    icon={Zap}
                    color="from-indigo-500 to-indigo-600"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Revenue Trends</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setRealTimeEnabled(!realTimeEnabled)}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                    realTimeEnabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                                }`}
                            >
                                {realTimeEnabled ? 'Live' : 'Paused'}
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="day" stroke="#64748b" />
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
                                dataKey="revenue"
                                stroke="#38bdf8"
                                fillOpacity={1}
                                fill="url(#revenueGradient)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Live Activity Feed */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Live Activity</h3>
                        <button
                            onClick={() => setLiveFeedPaused(!liveFeedPaused)}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            {liveFeedPaused ?
                                <PlayCircle className="w-5 h-5 text-slate-400" /> :
                                <PauseCircle className="w-5 h-5 text-slate-400" />
                            }
                        </button>
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        <AnimatePresence>
                            {activities.map((activity) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg"
                                >
                                    <div className={`w-3 h-3 rounded-full ${
                                        activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">
                                            <span className="font-medium">{activity.user}</span>
                                            <span className="text-slate-400 ml-1">
                              {activity.type === 'signup' && 'signed up'}
                                                {activity.type === 'purchase' && 'made a purchase'}
                                                {activity.type === 'trial' && 'started trial'}
                                                {activity.type === 'upgrade' && 'upgraded plan'}
                            </span>
                                        </p>
                                        <p className="text-xs text-slate-500">{activity.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* User Journey & Device Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conversion Funnel */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Conversion Funnel</h3>
                    <div className="space-y-4">
                        {userJourneyData.map((stage, index) => {
                            const percentage = index === 0 ? 100 : (stage.users / userJourneyData[0].users * 100);
                            return (
                                <motion.div
                                    key={stage.stage}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-white">{stage.stage}</span>
                                        <span className="text-sm text-slate-400">{stage.users.toLocaleString()}</span>
                                    </div>
                                    <div className="relative h-8 bg-slate-700/50 rounded-lg overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className="h-full rounded-lg"
                                            style={{ backgroundColor: stage.color }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                                            {percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Device Distribution */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Device Distribution</h3>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={deviceData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={450}
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
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {deviceData.map((device) => (
                            <div key={device.name} className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: device.color }}
                                    />
                                    <span className="text-sm text-slate-300">{device.name}</span>
                                </div>
                                <div className="text-lg font-semibold text-white">{device.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;