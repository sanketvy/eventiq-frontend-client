import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Globe,
    TrendingUp,
    TrendingDown,
    Clock,
    Users,
    Activity,
    BarChart3,
    Filter,
    Search,
    ChevronRight,
    Navigation,
    Zap,
    Target,
    AlertCircle,
    CheckCircle,
    Eye,
    Timer,
    Percent
} from "lucide-react";

const Geography = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('15m');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('');

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Generate mock geography data
    const generateGeographyData = () => {
        const countries = [
            {
                name: 'India',
                code: 'IN',
                flag: '🇮🇳',
                sessions: 847,
                avgDuration: 245,
                bounceRate: 0.32,
                conversionRate: 0.08,
                trend: 'up',
                cities: [
                    { name: 'Mumbai', sessions: 298, avgDuration: 267, bounceRate: 0.28 },
                    { name: 'Pune', sessions: 186, avgDuration: 312, bounceRate: 0.24 },
                    { name: 'Bangalore', sessions: 154, avgDuration: 289, bounceRate: 0.31 },
                    { name: 'Delhi', sessions: 142, avgDuration: 198, bounceRate: 0.38 },
                    { name: 'Chennai', sessions: 67, avgDuration: 223, bounceRate: 0.35 }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                flag: '🇨🇦',
                sessions: 423,
                avgDuration: 198,
                bounceRate: 0.45,
                conversionRate: 0.12,
                trend: 'up',
                cities: [
                    { name: 'Toronto', sessions: 156, avgDuration: 234, bounceRate: 0.41 },
                    { name: 'Vancouver', sessions: 98, avgDuration: 189, bounceRate: 0.48 },
                    { name: 'Montreal', sessions: 87, avgDuration: 167, bounceRate: 0.52 },
                    { name: 'Calgary', sessions: 52, avgDuration: 201, bounceRate: 0.43 },
                    { name: 'Ottawa', sessions: 30, avgDuration: 178, bounceRate: 0.46 }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                flag: '🇺🇸',
                sessions: 1234,
                avgDuration: 189,
                bounceRate: 0.41,
                conversionRate: 0.09,
                trend: 'stable',
                cities: [
                    { name: 'New York', sessions: 345, avgDuration: 234, bounceRate: 0.38 },
                    { name: 'Los Angeles', sessions: 298, avgDuration: 178, bounceRate: 0.44 },
                    { name: 'Chicago', sessions: 187, avgDuration: 201, bounceRate: 0.39 },
                    { name: 'Houston', sessions: 156, avgDuration: 167, bounceRate: 0.46 },
                    { name: 'Phoenix', sessions: 248, avgDuration: 189, bounceRate: 0.42 }
                ]
            },
            {
                name: 'United Kingdom',
                code: 'GB',
                flag: '🇬🇧',
                sessions: 367,
                avgDuration: 234,
                bounceRate: 0.38,
                conversionRate: 0.11,
                trend: 'down',
                cities: [
                    { name: 'London', sessions: 198, avgDuration: 278, bounceRate: 0.32 },
                    { name: 'Manchester', sessions: 67, avgDuration: 201, bounceRate: 0.41 },
                    { name: 'Birmingham', sessions: 45, avgDuration: 189, bounceRate: 0.44 },
                    { name: 'Leeds', sessions: 34, avgDuration: 167, bounceRate: 0.48 },
                    { name: 'Glasgow', sessions: 23, avgDuration: 156, bounceRate: 0.52 }
                ]
            },
            {
                name: 'Germany',
                code: 'DE',
                flag: '🇩🇪',
                sessions: 298,
                avgDuration: 267,
                bounceRate: 0.35,
                conversionRate: 0.13,
                trend: 'up',
                cities: [
                    { name: 'Berlin', sessions: 134, avgDuration: 298, bounceRate: 0.31 },
                    { name: 'Munich', sessions: 78, avgDuration: 245, bounceRate: 0.36 },
                    { name: 'Hamburg', sessions: 45, avgDuration: 234, bounceRate: 0.38 },
                    { name: 'Cologne', sessions: 23, avgDuration: 201, bounceRate: 0.42 },
                    { name: 'Frankfurt', sessions: 18, avgDuration: 189, bounceRate: 0.44 }
                ]
            },
            {
                name: 'France',
                code: 'FR',
                flag: '🇫🇷',
                sessions: 234,
                avgDuration: 198,
                bounceRate: 0.42,
                conversionRate: 0.07,
                trend: 'stable',
                cities: [
                    { name: 'Paris', sessions: 134, avgDuration: 234, bounceRate: 0.38 },
                    { name: 'Lyon', sessions: 45, avgDuration: 189, bounceRate: 0.44 },
                    { name: 'Marseille', sessions: 32, avgDuration: 167, bounceRate: 0.48 },
                    { name: 'Toulouse', sessions: 23, avgDuration: 156, bounceRate: 0.52 }
                ]
            },
            {
                name: 'Australia',
                code: 'AU',
                flag: '🇦🇺',
                sessions: 189,
                avgDuration: 278,
                bounceRate: 0.29,
                conversionRate: 0.14,
                trend: 'up',
                cities: [
                    { name: 'Sydney', sessions: 89, avgDuration: 312, bounceRate: 0.26 },
                    { name: 'Melbourne', sessions: 67, avgDuration: 267, bounceRate: 0.31 },
                    { name: 'Brisbane', sessions: 23, avgDuration: 234, bounceRate: 0.34 },
                    { name: 'Perth', sessions: 10, avgDuration: 198, bounceRate: 0.38 }
                ]
            }
        ];

        return countries.sort((a, b) => b.sessions - a.sessions);
    };

    const [geographyData] = useState(generateGeographyData());

    const totalSessions = geographyData.reduce((sum, country) => sum + country.sessions, 0);
    const avgDuration = Math.round(geographyData.reduce((sum, country) => sum + country.avgDuration, 0) / geographyData.length);
    const avgBounceRate = geographyData.reduce((sum, country) => sum + country.bounceRate, 0) / geographyData.length;
    const avgConversionRate = geographyData.reduce((sum, country) => sum + country.conversionRate, 0) / geographyData.length;

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const formatPercentage = (value) => {
        return `${(value * 100).toFixed(1)}%`;
    };

    const getCountryPercentage = (sessions) => {
        return ((sessions / totalSessions) * 100).toFixed(1);
    };

    const getCityPercentage = (citySessions, countrySessions) => {
        return ((citySessions / countrySessions) * 100).toFixed(1);
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-green-400" />;
            case 'down':
                return <TrendingDown className="w-4 h-4 text-red-400" />;
            default:
                return <Activity className="w-4 h-4 text-blue-400" />;
        }
    };

    const filteredData = geographyData.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.cities.some(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const generateInsights = () => {
        const insights = [];

        // Top performing country
        const topCountry = geographyData[0];
        insights.push({
            type: 'positive',
            icon: Target,
            title: `${topCountry.name} Leading Sessions`,
            description: `${topCountry.name} accounts for ${getCountryPercentage(topCountry.sessions)}% of total sessions with ${topCountry.sessions} sessions.`,
            color: 'text-green-400'
        });

        // High engagement country
        const highEngagement = geographyData.find(c => c.avgDuration > 250 && c.bounceRate < 0.35);
        if (highEngagement) {
            insights.push({
                type: 'positive',
                icon: Timer,
                title: 'High Engagement Market',
                description: `${highEngagement.name} shows strong engagement with ${formatDuration(highEngagement.avgDuration)} avg duration and ${formatPercentage(highEngagement.bounceRate)} bounce rate.`,
                color: 'text-blue-400'
            });
        }

        // Conversion leader
        const conversionLeader = geographyData.reduce((max, country) =>
            country.conversionRate > max.conversionRate ? country : max
        );
        insights.push({
            type: 'positive',
            icon: CheckCircle,
            title: 'Conversion Leader',
            description: `${conversionLeader.name} leads in conversions with ${formatPercentage(conversionLeader.conversionRate)} conversion rate.`,
            color: 'text-emerald-400'
        });

        // High bounce rate warning
        const highBounce = geographyData.find(c => c.bounceRate > 0.45);
        if (highBounce) {
            insights.push({
                type: 'warning',
                icon: AlertCircle,
                title: 'High Bounce Rate Alert',
                description: `${highBounce.name} has elevated bounce rate at ${formatPercentage(highBounce.bounceRate)}. Consider localization improvements.`,
                color: 'text-yellow-400'
            });
        }

        return insights;
    };

    return (
        <div className="min-h-screen text-white">
            <div className="p-2">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Geography Analytics</h1>
                            <p className="text-slate-400">Real-time geographic distribution of user sessions</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm text-slate-400">Live</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-400">Last updated</p>
                                <p className="text-white font-medium">{currentTime.toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-400" />
                                </div>
                                <TrendingUp className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white mb-1">
                                    {totalSessions.toLocaleString()}
                                </p>
                                <p className="text-slate-400 text-sm">Total Sessions</p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg">
                                    <Timer className="w-6 h-6 text-purple-400" />
                                </div>
                                <Activity className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white mb-1">
                                    {formatDuration(avgDuration)}
                                </p>
                                <p className="text-slate-400 text-sm">Avg Duration</p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-yellow-500/20 rounded-lg">
                                    <Percent className="w-6 h-6 text-yellow-400" />
                                </div>
                                <TrendingDown className="w-4 h-4 text-red-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white mb-1">
                                    {formatPercentage(avgBounceRate)}
                                </p>
                                <p className="text-slate-400 text-sm">Avg Bounce Rate</p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500/20 rounded-lg">
                                    <Target className="w-6 h-6 text-green-400" />
                                </div>
                                <TrendingUp className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white mb-1">
                                    {formatPercentage(avgConversionRate)}
                                </p>
                                <p className="text-slate-400 text-sm">Avg Conversion</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Country List */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
                            <div className="p-6 border-b border-slate-700/50">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-white">Geographic Distribution</h2>
                                    <div className="flex items-center space-x-2">
                                        <Search className="w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search countries or cities..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className=" h-fit overflow-y-auto custom-scrollbar">
                                <div className="p-6 space-y-4">
                                    {filteredData.map((country, index) => (
                                        <div key={country.code} className="space-y-3">
                                            <div
                                                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                    selectedCountry?.code === country.code
                                                        ? 'border-blue-500 bg-blue-500/10'
                                                        : 'border-slate-700/50 bg-slate-700/20 hover:border-slate-600/50'
                                                }`}
                                                onClick={() => setSelectedCountry(selectedCountry?.code === country.code ? null : country)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-2xl">{country.flag}</div>
                                                        <div>
                                                            <h3 className="text-white font-medium">{country.name}</h3>
                                                            <p className="text-slate-400 text-sm">
                                                                {country.sessions.toLocaleString()} sessions ({getCountryPercentage(country.sessions)}%)
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-right">
                                                        <div>
                                                            <p className="text-white font-medium">{formatDuration(country.avgDuration)}</p>
                                                            <p className="text-slate-400 text-sm">avg duration</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{formatPercentage(country.bounceRate)}</p>
                                                            <p className="text-slate-400 text-sm">bounce rate</p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            {getTrendIcon(country.trend)}
                                                            <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                                                                selectedCountry?.code === country.code ? 'rotate-90' : ''
                                                            }`} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="mt-3">
                                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${getCountryPercentage(country.sessions)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* City Breakdown */}
                                            {selectedCountry?.code === country.code && (
                                                <div className="ml-8 space-y-2">
                                                    <h4 className="text-sm text-slate-400 font-medium">City Breakdown</h4>
                                                    {country.cities.map((city, cityIndex) => (
                                                        <div key={cityIndex} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                                            <div className="flex items-center space-x-3">
                                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                                <div>
                                                                    <p className="text-white text-sm font-medium">{city.name}</p>
                                                                    <p className="text-slate-400 text-xs">
                                                                        {city.sessions} sessions ({getCityPercentage(city.sessions, country.sessions)}%)
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-4 text-right">
                                                                <div>
                                                                    <p className="text-white text-sm">{formatDuration(city.avgDuration)}</p>
                                                                    <p className="text-slate-400 text-xs">duration</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-white text-sm">{formatPercentage(city.bounceRate)}</p>
                                                                    <p className="text-slate-400 text-xs">bounce</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insights Panel */}
                    <div className="space-y-6">
                        {/* Top Performers */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
                            <div className="space-y-3">
                                {geographyData.slice(0, 3).map((country, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                index === 0 ? 'bg-yellow-500 text-yellow-900' :
                                                    index === 1 ? 'bg-gray-400 text-gray-900' :
                                                        'bg-amber-600 text-amber-900'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{country.flag} {country.name}</p>
                                                <p className="text-slate-400 text-sm">{country.sessions.toLocaleString()} sessions</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-medium">{getCountryPercentage(country.sessions)}%</p>
                                            <p className="text-slate-400 text-sm">of total</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <Zap className="w-5 h-5 text-purple-400" />
                                <h3 className="text-lg font-semibold text-white">Geographic Insights</h3>
                            </div>
                            <div className="space-y-4">
                                {generateInsights().map((insight, index) => (
                                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <div className="p-2 bg-slate-600/50 rounded-lg">
                                                <insight.icon className={`w-4 h-4 ${insight.color}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>
                                                <p className="text-slate-400 text-xs">{insight.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Countries</span>
                                    <span className="text-white font-medium">{geographyData.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Total Cities</span>
                                    <span className="text-white font-medium">
                                        {geographyData.reduce((sum, country) => sum + country.cities.length, 0)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Top Country Share</span>
                                    <span className="text-white font-medium">
                                        {getCountryPercentage(geographyData[0].sessions)}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Global Conversion</span>
                                    <span className="text-white font-medium">
                                        {formatPercentage(avgConversionRate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
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

export default Geography;