import React, {useState, useEffect} from 'react';
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Clock,
    Globe,
    Smartphone,
    Monitor,
    Tablet,
    User,
    MousePointer,
    Eye,
    Activity,
    FileText,
    Send,
    AlertTriangle,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Brain,
    Target,
    Timer,
    Zap,
    Navigation,
    Users,
    BarChart3,
    Filter
} from "lucide-react";
import axios from "axios";
import {AnalyticsService} from "../utils/RestPaths.js";
import {getToken} from "../KeycloakService.js";

const SessionsPage = ({selectedProject, selectedTimeRange}) => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessionData, setSessionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [filterType, setFilterType] = useState('all');
    const sessionsPerPage = 10;
    const [sessions, setSessions] = useState([]);

    // Update time every second
    useEffect(() => {
        axios.post(AnalyticsService.analytics, {
            projectId: selectedProject,
            timeframe: selectedTimeRange
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => {
            console.log(res.data)
            setSessions(res.data);
        })

    }, [selectedTimeRange]);

    useEffect(() => {
        if(selectedSession===null || selectedSession.sessionId == null) return;
        axios.post(AnalyticsService.analytics + "/" + selectedSession.sessionId, {
            projectId: selectedProject,
            timeframe: selectedTimeRange
        }, {headers:{Authorization: `Bearer ${getToken()}`}})
            .then(res => {
                console.log("data :")
                setSessionData(res.data);
            }).catch(err=>{
            console.log(err);
        })
    }, [selectedSession]);

    // Core analytics events configuration
    const analyticsEvents = {
        VISIT: {
            label: 'Page Visit',
            icon: Eye,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/20',
            description: 'User loaded a page'
        },
        CLICK: {
            label: 'Element Click',
            icon: MousePointer,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/20',
            description: 'User clicked on an element'
        },
        SESSION_START: {
            label: 'Session Started',
            icon: Activity,
            color: 'text-green-400',
            bgColor: 'bg-green-500/20',
            description: 'User session began'
        },
        SESSION_END: {
            label: 'Session Ended',
            icon: Timer,
            color: 'text-red-400',
            bgColor: 'bg-red-500/20',
            description: 'User session ended'
        },
        FORM_INTERACT: {
            label: 'Form Interaction',
            icon: FileText,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/20',
            description: 'User interacted with form'
        },
        FORM_SUBMIT: {
            label: 'Form Submission',
            icon: Send,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/20',
            description: 'User submitted form'
        },
        ERROR: {
            label: 'Error Occurred',
            icon: AlertTriangle,
            color: 'text-red-400',
            bgColor: 'bg-red-500/20',
            description: 'User encountered error'
        }
    };

    // Auto-select first session
    useEffect(() => {
        if (sessions.length > 0 && !selectedSession) {
            setSelectedSession(sessions[0]);
        }
    }, [sessions, selectedSession]);

    const formatDuration = (sessionData) => {
        if (!sessionData || sessionData.length === 0) return "N/A";

        let startTime = null;
        let endTime = null;

        sessionData.forEach(data => {
            if (data.eventType === "SESSION_START") {
                startTime = new Date(data.eventTime);
            }
            if (data.eventType === "SESSION_END") {
                endTime = new Date(data.eventTime);
            }
        });

        if (!startTime || !endTime) return "N/A";

        const durationInSeconds = Math.floor((endTime - startTime) / 1000);
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        let parts = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
        parts.push(`${seconds}s`);

        return parts.join(' ');
    };


    const getBrowserIcon = (browserName) => {
        return Globe; // Using Globe icon for all browsers
    };

    const getDeviceIcon = (deviceName) => {
        switch (deviceName) {
            case 'Desktop':
                return Monitor;
            case 'Mobile':
                return Smartphone;
            case 'Tablet':
                return Tablet;
            default:
                return Monitor;
        }
    };

    // Filter sessions based on selected filter
    const filteredSessions = sessions.filter(session => {
        switch (filterType) {
            case 'errors':
                return session.hasErrors;
            case 'forms':
                return session.hasFormSubmission;
            case 'bounce':
                return session.bounceRate;
            case 'engaged':
                return session.duration > 300 && session.pageViews > 3;
            default:
                return true;
        }
    });

    const paginatedSessions = filteredSessions.slice(
        (currentPage - 1) * sessionsPerPage,
        currentPage * sessionsPerPage
    );

    const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

    return (
        <div className="min-h-screen text-white">
            <div className="flex h-screen">
                {/* Left Panel - Session List */}
                <div className="w-1/3 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
                    <div className="p-2 border-b border-slate-700/50">
                        <h2 className="text-xl font-semibold text-white mb-4">Analytics Sessions</h2>

                        <p className="text-slate-400 text-sm">
                            Showing {paginatedSessions.length} of {filteredSessions.length} sessions
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="p-4 space-y-3">
                            {paginatedSessions.map((session) => {
                                const BrowserIcon = getBrowserIcon(session.userAgent);
                                const DeviceIcon = getDeviceIcon(session.agentType);

                                return (
                                    <div
                                        key={session.id}
                                        onClick={() => setSelectedSession(session)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                            selectedSession?.sessionId === session.sessionId
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-slate-700/50 bg-slate-700/20 hover:border-slate-600/50 hover:bg-slate-700/30'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-mono text-slate-300">
                                                    {session.sessionId}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-slate-400">
                                                    {session.country.flag}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <BrowserIcon className="w-4 h-4 text-slate-400"/>
                                                <DeviceIcon className="w-4 h-4 text-slate-400"/>
                                                {session.hasErrors && (
                                                    <AlertTriangle className="w-4 h-4 text-red-400"/>
                                                )}
                                                {session.hasFormSubmission && (
                                                    <CheckCircle className="w-4 h-4 text-green-400"/>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-400">
                                                {new Date(session.eventTime).toUTCString()}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {session.actions?.length} events
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className=" border-t border-slate-700/50">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4"/>
                                <span>Previous</span>
                            </button>

                            <span className="text-sm text-slate-400">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Session Details */}
                <div className="flex-1 flex flex-col">
                    {selectedSession ? (
                        <>
                            {/* Session Header */}
                            <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">
                                            Session {sessionData[0]?.sessionId}
                                        </h1>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm text-slate-400">Status</p>
                                            <p className={`font-medium ${
                                                sessionData?.some(e => e.eventType === 'ERROR') ? 'text-red-400' :
                                                    sessionData?.length < 3 ? 'text-yellow-400' :
                                                        selectedSession?.hasFormSubmission ? 'text-green-400' :
                                                            'text-blue-400'
                                            }`}>
                                                {
                                                    sessionData?.some(e => e.eventType === 'ERROR') ? 'Has Errors' :
                                                        sessionData?.length < 3 ? 'Bounced' :
                                                            selectedSession?.hasFormSubmission ? 'Converted' :
                                                                'Engaged'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {/* Session Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Clock className="w-4 h-4 text-slate-400"/>
                                            <span className="text-sm text-slate-400">Duration</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {formatDuration(sessionData)}
                                        </p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <MapPin className="w-4 h-4 text-slate-400"/>
                                            <span className="text-sm text-slate-400">Location</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedSession.city}, {selectedSession.country}
                                        </p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {React.createElement(getBrowserIcon(selectedSession.userAgent), {
                                                className: "w-4 h-4 text-slate-400"
                                            })}
                                            <span className="text-sm text-slate-400">Browser</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedSession.userAgent}
                                        </p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {React.createElement(getDeviceIcon(selectedSession.agentType), {
                                                className: "w-4 h-4 text-slate-400"
                                            })}
                                            <span className="text-sm text-slate-400">Device</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedSession.agentType}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Event Timeline */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-6">Event Timeline</h3>

                                    <div className="space-y-4">
                                        {sessionData.map((action, index) => {
                                            const eventConfig = analyticsEvents[action.eventType.toUpperCase()];
                                            const IconComponent = eventConfig.icon;
                                            const isLast = index === sessionData.length - 1;

                                            return (
                                                <div key={index} className="flex items-start space-x-4">
                                                    <div className="flex flex-col items-center">
                                                        <div
                                                            className={`p-3 rounded-full ${eventConfig.bgColor} border-2 ${
                                                                action.type === 'SESSION_START' ? 'border-green-400' :
                                                                    action.type === 'SESSION_END' ? 'border-red-400' :
                                                                        action.type === 'ERROR' ? 'border-red-400' :
                                                                            action.type === 'FORM_SUBMIT' ? 'border-green-400' :
                                                                                'border-slate-600'
                                                            }`}>
                                                            <IconComponent className={`w-5 h-5 ${eventConfig.color}`}/>
                                                        </div>
                                                        {!isLast && (
                                                            <div className="w-0.5 h-12 bg-slate-700 mt-2"/>
                                                        )}
                                                    </div>

                                                    <div className="flex-1 pb-8">
                                                        <div className="bg-slate-700/30 rounded-lg p-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="text-white font-medium">
                                                                    {eventConfig.label}
                                                                </h4>
                                                                <span className="text-xs text-slate-400">
                                                                    {new Date(action.eventTime).toUTCString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-slate-400 text-sm mb-2">
                                                                {action.details}
                                                            </p>
                                                            {action.metaData && (
                                                                <div className="text-xs text-slate-500">
                                                                    <pre className="font-mono text-xs">
                                                                        {JSON.stringify(action.metaData, null, 2)}
                                                                    </pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* AI Insights */}
                            <div className="border-t border-slate-700/50 bg-slate-800/30 p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Brain className="w-5 h-5 text-purple-400"/>
                                    <h3 className="text-xl font-semibold text-white">AI Insights</h3>
                                </div>

                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                                <p className="text-slate-400">Select a session to view analytics</p>
                                <p className="text-slate-500 text-sm mt-1">Choose
                                    from {filteredSessions.length} sessions</p>
                            </div>
                        </div>
                    )}
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

export default SessionsPage;