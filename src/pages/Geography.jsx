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
import {AnalyticsService} from "../utils/RestPaths.js";
import {getToken} from "../KeycloakService.js";
import axios from "axios";

const Geography = ({selectedProject,selectedTimeRange, refresh}) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('15m');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('');
    const [geographyData, setGeographyData] = useState([]);

    // Update time every second
    useEffect(() => {
        axios.post(AnalyticsService.location, {
            projectId: selectedProject,
            timeframe: selectedTimeRange
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => {
            console.log(res.data);
            setGeographyData(res.data);
        })
    }, [selectedProject, selectedTimeRange, refresh]);

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

    // const generateInsights = () => {
    //     const insights = [];
    //
    //     // Top performing country
    //     const topCountry = geographyData[0];
    //     insights.push({
    //         type: 'positive',
    //         icon: Target,
    //         title: `${topCountry?.name} Leading Sessions`,
    //         description: `${topCountry?.name} accounts for ${getCountryPercentage(topCountry?.sessions)}% of total sessions with ${topCountry.sessions} sessions.`,
    //         color: 'text-green-400'
    //     });
    //
    //     return insights;
    // };

    return (
        <div className="min-h-screen text-white">
            <div className="">

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Country List */}
                    <div className="lg:col-span-2">
                        <div className="">
                            <div className="p-2 border-b border-slate-700/50">
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
                                                        {/*<div>*/}
                                                        {/*    <p className="text-white font-medium">{formatDuration(country.avgDuration)}</p>*/}
                                                        {/*    <p className="text-slate-400 text-sm">avg duration</p>*/}
                                                        {/*</div>*/}
                                                        {/*<div>*/}
                                                        {/*    <p className="text-white font-medium">{formatPercentage(country.bounceRate)}</p>*/}
                                                        {/*    <p className="text-slate-400 text-sm">bounce rate</p>*/}
                                                        {/*</div>*/}
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
                                                                {/*<div>*/}
                                                                {/*    <p className="text-white text-sm">{formatDuration(city.avgDuration)}</p>*/}
                                                                {/*    <p className="text-slate-400 text-xs">duration</p>*/}
                                                                {/*</div>*/}
                                                                {/*<div>*/}
                                                                {/*    <p className="text-white text-sm">{formatPercentage(city.bounceRate)}</p>*/}
                                                                {/*    <p className="text-slate-400 text-xs">bounce</p>*/}
                                                                {/*</div>*/}
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
                        {/*<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">*/}
                        {/*    <div className="flex items-center space-x-2 mb-4">*/}
                        {/*        <Zap className="w-5 h-5 text-purple-400" />*/}
                        {/*        <h3 className="text-lg font-semibold text-white">Geographic Insights</h3>*/}
                        {/*    </div>*/}
                        {/*    <div className="space-y-4">*/}
                        {/*        /!*{generateInsights().map((insight, index) => (*!/*/}
                        {/*        /!*    <div key={index} className="p-4 bg-slate-700/30 rounded-lg">*!/*/}
                        {/*        /!*        <div className="flex items-start space-x-3">*!/*/}
                        {/*        /!*            <div className="p-2 bg-slate-600/50 rounded-lg">*!/*/}
                        {/*        /!*                <insight.icon className={`w-4 h-4 ${insight.color}`} />*!/*/}
                        {/*        /!*            </div>*!/*/}
                        {/*        /!*            <div className="flex-1">*!/*/}
                        {/*        /!*                <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>*!/*/}
                        {/*        /!*                <p className="text-slate-400 text-xs">{insight.description}</p>*!/*/}
                        {/*        /!*            </div>*!/*/}
                        {/*        /!*        </div>*!/*/}
                        {/*        /!*    </div>*!/*/}
                        {/*        /!*))}*!/*/}
                        {/*    </div>*/}
                        {/*</div>*/}

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
                                        {/*{getCountryPercentage(geographyData[0].sessions)}%*/}
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