import React, { useState, useEffect } from 'react';
import {
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    TrendingUp,
    TrendingDown,
    Activity,
    Search,
    ChevronRight,
    Zap,
    Target,
    AlertCircle,
    CheckCircle,
    Eye,
    Timer,
    Percent
} from "lucide-react";
import axios from "axios";
import {AnalyticsService} from "../utils/RestPaths.js";
import {getToken} from "../KeycloakService.js";

const DevicePage = ({selectedProject}) => {
    const [selectedBrowser, setSelectedBrowser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userAgentData, setUserAgentData] = useState([]);

    useEffect(() => {
        axios.post(AnalyticsService.device, {
            projectId: selectedProject
        }, {
            headers:{
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => {
            setUserAgentData(res.data);
        })
    }, []);
    // Generate mock user agent data
    const generateUserAgentData = () => {
        const browsers = [
            {
                name: 'Chrome',
                version: '120.0',
                icon: '🌐',
                sessions: 1547,
                avgDuration: 267,
                bounceRate: 0.32,
                conversionRate: 0.11,
                trend: 'up',
                devices: [
                    { name: 'Desktop', sessions: 889, avgDuration: 312, bounceRate: 0.28, os: 'Windows 10' },
                    { name: 'Mobile', sessions: 456, avgDuration: 201, bounceRate: 0.38, os: 'Android' },
                    { name: 'Tablet', sessions: 202, avgDuration: 289, bounceRate: 0.31, os: 'iPad OS' }
                ]
            },
            {
                name: 'Safari',
                version: '17.2',
                icon: '🧭',
                sessions: 823,
                avgDuration: 298,
                bounceRate: 0.29,
                conversionRate: 0.14,
                trend: 'up',
                devices: [
                    { name: 'Mobile', sessions: 456, avgDuration: 267, bounceRate: 0.26, os: 'iOS 17' },
                    { name: 'Desktop', sessions: 289, avgDuration: 356, bounceRate: 0.22, os: 'macOS' },
                    { name: 'Tablet', sessions: 78, avgDuration: 312, bounceRate: 0.31, os: 'iPad OS' }
                ]
            },
            {
                name: 'Firefox',
                version: '121.0',
                icon: '🔥',
                sessions: 456,
                avgDuration: 234,
                bounceRate: 0.38,
                conversionRate: 0.09,
                trend: 'stable',
                devices: [
                    { name: 'Desktop', sessions: 334, avgDuration: 278, bounceRate: 0.35, os: 'Windows 11' },
                    { name: 'Mobile', sessions: 89, avgDuration: 167, bounceRate: 0.45, os: 'Android' },
                    { name: 'Tablet', sessions: 33, avgDuration: 201, bounceRate: 0.42, os: 'Android' }
                ]
            },
            {
                name: 'Edge',
                version: '120.0',
                icon: '🌊',
                sessions: 289,
                avgDuration: 245,
                bounceRate: 0.35,
                conversionRate: 0.10,
                trend: 'up',
                devices: [
                    { name: 'Desktop', sessions: 223, avgDuration: 267, bounceRate: 0.32, os: 'Windows 11' },
                    { name: 'Mobile', sessions: 45, avgDuration: 189, bounceRate: 0.41, os: 'Android' },
                    { name: 'Tablet', sessions: 21, avgDuration: 234, bounceRate: 0.38, os: 'Windows 11' }
                ]
            },
            {
                name: 'Opera',
                version: '106.0',
                icon: '🎭',
                sessions: 167,
                avgDuration: 289,
                bounceRate: 0.31,
                conversionRate: 0.12,
                trend: 'stable',
                devices: [
                    { name: 'Desktop', sessions: 123, avgDuration: 312, bounceRate: 0.28, os: 'Windows 10' },
                    { name: 'Mobile', sessions: 34, avgDuration: 201, bounceRate: 0.36, os: 'Android' },
                    { name: 'Tablet', sessions: 10, avgDuration: 245, bounceRate: 0.33, os: 'Android' }
                ]
            },
            {
                name: 'Samsung Internet',
                version: '23.0',
                icon: '📱',
                sessions: 134,
                avgDuration: 201,
                bounceRate: 0.42,
                conversionRate: 0.08,
                trend: 'down',
                devices: [
                    { name: 'Mobile', sessions: 112, avgDuration: 189, bounceRate: 0.44, os: 'Android' },
                    { name: 'Tablet', sessions: 22, avgDuration: 234, bounceRate: 0.38, os: 'Android' }
                ]
            }
        ];

        return browsers.sort((a, b) => b.sessions - a.sessions);
    };


    const totalSessions = userAgentData.reduce((sum, browser) => sum + browser.sessions, 0);
    const avgDuration = Math.round(userAgentData.reduce((sum, browser) => sum + browser.avgDuration, 0) / userAgentData.length);
    const avgBounceRate = userAgentData.reduce((sum, browser) => sum + browser.bounceRate, 0) / userAgentData.length;
    const avgConversionRate = userAgentData.reduce((sum, browser) => sum + browser.conversionRate, 0) / userAgentData.length;

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const formatPercentage = (value) => {
        return `${(value * 100).toFixed(1)}%`;
    };

    const getBrowserPercentage = (sessions) => {
        return ((sessions / totalSessions) * 100).toFixed(1);
    };

    const getDevicePercentage = (deviceSessions, browserSessions) => {
        return ((deviceSessions / browserSessions) * 100).toFixed(1);
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

    const getDeviceIcon = (device) => {
        switch (device.toLowerCase()) {
            case 'mobile':
                return <Smartphone className="w-4 h-4 text-slate-400" />;
            case 'tablet':
                return <Tablet className="w-4 h-4 text-slate-400" />;
            default:
                return <Monitor className="w-4 h-4 text-slate-400" />;
        }
    };

    const filteredData = userAgentData.filter(browser =>
        browser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        browser.devices.some(device => device.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // const generateInsights = () => {
    //     const insights = [];
    //
    //     // Top performing browser
    //     const topBrowser = userAgentData[0];
    //     insights.push({
    //         type: 'positive',
    //         icon: Target,
    //         title: `${topBrowser?.name} Dominates`,
    //         description: `${topBrowser?.name} accounts for ${getBrowserPercentage(topBrowser?.sessions)}% of total sessions with ${topBrowser.sessions} sessions.`,
    //         color: 'text-green-400'
    //     });
    //
    //     // High engagement browser
    //     const highEngagement = userAgentData.find(b => b.avgDuration > 280 && b.bounceRate < 0.32);
    //     if (highEngagement) {
    //         insights.push({
    //             type: 'positive',
    //             icon: Timer,
    //             title: 'High Engagement Browser',
    //             description: `${highEngagement.name} shows strong engagement with ${formatDuration(highEngagement.avgDuration)} avg duration and ${formatPercentage(highEngagement.bounceRate)} bounce rate.`,
    //             color: 'text-blue-400'
    //         });
    //     }
    //
    //     // Conversion leader
    //     const conversionLeader = userAgentData.reduce((max, browser) =>
    //         browser.conversionRate > max.conversionRate ? browser : max
    //     );
    //     insights.push({
    //         type: 'positive',
    //         icon: CheckCircle,
    //         title: 'Conversion Leader',
    //         description: `${conversionLeader.name} leads in conversions with ${formatPercentage(conversionLeader.conversionRate)} conversion rate.`,
    //         color: 'text-emerald-400'
    //     });
    //
    //     // High bounce rate warning
    //     const highBounce = userAgentData.find(b => b.bounceRate > 0.40);
    //     if (highBounce) {
    //         insights.push({
    //             type: 'warning',
    //             icon: AlertCircle,
    //             title: 'High Bounce Rate Alert',
    //             description: `${highBounce.name} has elevated bounce rate at ${formatPercentage(highBounce.bounceRate)}. Consider browser-specific optimizations.`,
    //             color: 'text-yellow-400'
    //         });
    //     }
    //
    //     return insights;
    // };

    return (
        <div className="min-h-screen text-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Browser List */}
                <div className="lg:col-span-2">
                    <div className="">
                        <div className="p-2 border-b border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white">User Agent Analytics</h2>
                                <div className="flex items-center space-x-2">
                                    <Search className="w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search browsers or devices..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-fit overflow-y-auto custom-scrollbar">
                            <div className="p-6 space-y-4">
                                {filteredData.map((browser, index) => (
                                    <div key={browser.name} className="space-y-3">
                                        <div
                                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                selectedBrowser?.name === browser.name
                                                    ? 'border-blue-500 bg-blue-500/10'
                                                    : 'border-slate-700/50 bg-slate-700/20 hover:border-slate-600/50'
                                            }`}
                                            onClick={() => setSelectedBrowser(selectedBrowser?.name === browser.name ? null : browser)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-2xl">{browser.icon}</div>
                                                    <div>
                                                        <h3 className="text-white font-medium">{browser.name} {browser.version}</h3>
                                                        <p className="text-slate-400 text-sm">
                                                            {browser.sessions.toLocaleString()} sessions ({getBrowserPercentage(browser.sessions)}%)
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4 text-right">
                                                    {/*<div>*/}
                                                    {/*    <p className="text-white font-medium">{formatDuration(browser.avgDuration)}</p>*/}
                                                    {/*    <p className="text-slate-400 text-sm">avg duration</p>*/}
                                                    {/*</div>*/}
                                                    {/*<div>*/}
                                                    {/*    <p className="text-white font-medium">{formatPercentage(browser.bounceRate)}</p>*/}
                                                    {/*    <p className="text-slate-400 text-sm">bounce rate</p>*/}
                                                    {/*</div>*/}
                                                    <div className="flex items-center space-x-2">
                                                        {getTrendIcon(browser.trend)}
                                                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                                                            selectedBrowser?.name === browser.name ? 'rotate-90' : ''
                                                        }`} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-3">
                                                <div className="w-full bg-slate-700 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${getBrowserPercentage(browser.sessions)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Device Breakdown */}
                                        {selectedBrowser?.name === browser.name && (
                                            <div className="ml-8 space-y-2">
                                                <h4 className="text-sm text-slate-400 font-medium">Device Breakdown</h4>
                                                {browser.devices.map((device, deviceIndex) => (
                                                    <div key={deviceIndex} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                                        <div className="flex items-center space-x-3">
                                                            {getDeviceIcon(device.name)}
                                                            <div>
                                                                <p className="text-white text-sm font-medium">{device.name}</p>
                                                                <p className="text-slate-400 text-xs">
                                                                    {device.sessions} sessions ({getDevicePercentage(device.sessions, browser.sessions)}%) • {device.os}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-right">
                                                            {/*<div>*/}
                                                            {/*    <p className="text-white text-sm">{formatDuration(device.avgDuration)}</p>*/}
                                                            {/*    <p className="text-slate-400 text-xs">duration</p>*/}
                                                            {/*</div>*/}
                                                            {/*<div>*/}
                                                            {/*    <p className="text-white text-sm">{formatPercentage(device.bounceRate)}</p>*/}
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
                        <h3 className="text-lg font-semibold text-white mb-4">Top Browsers</h3>
                        <div className="space-y-3">
                            {userAgentData.slice(0, 3).map((browser, index) => (
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
                                            <p className="text-white font-medium">{browser.icon} {browser.name}</p>
                                            <p className="text-slate-400 text-sm">{browser.sessions.toLocaleString()} sessions</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-medium">{getBrowserPercentage(browser.sessions)}%</p>
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
                    {/*        <h3 className="text-lg font-semibold text-white">Browser Insights</h3>*/}
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
                                <span className="text-slate-400">Browsers</span>
                                <span className="text-white font-medium">{userAgentData.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Device Types</span>
                                <span className="text-white font-medium">
                                    {userAgentData.reduce((sum, browser) => sum + browser.devices.length, 0)}
                                </span>
                            </div>
                            {/*<div className="flex justify-between">*/}
                            {/*    <span className="text-slate-400">Top Browser Share</span>*/}
                            {/*    <span className="text-white font-medium">*/}
                            {/*        {getBrowserPercentage(userAgentData[0].sessions)}%*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            {/*<div className="flex justify-between">*/}
                            {/*    <span className="text-slate-400">Avg Conversion</span>*/}
                            {/*    <span className="text-white font-medium">*/}
                            {/*        {formatPercentage(avgConversionRate)}*/}
                            {/*    </span>*/}
                            {/*</div>*/}
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

export default DevicePage;