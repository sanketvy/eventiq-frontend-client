import React, { useState, useEffect } from 'react';
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

const UniversalAnalyticsDashboard = () => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [filterType, setFilterType] = useState('all');
    const sessionsPerPage = 10;

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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

    // Generate mock session data
    const generateSessions = () => {
        const browsers = [
            { name: 'Chrome', icon: Globe, version: '120.0.6099.109' },
            { name: 'Firefox', icon: Globe, version: '121.0' },
            { name: 'Safari', icon: Globe, version: '17.2' },
            { name: 'Edge', icon: Globe, version: '120.0.2210.77' }
        ];

        const devices = [
            { name: 'Desktop', icon: Monitor, os: 'Windows 11' },
            { name: 'Mobile', icon: Smartphone, os: 'iOS 17.2' },
            { name: 'Tablet', icon: Tablet, os: 'Android 14' },
            { name: 'Desktop', icon: Monitor, os: 'macOS 14' }
        ];

        const locations = [
            { country: 'United States', city: 'New York', lat: 40.7128, lng: -74.0060, flag: '🇺🇸' },
            { country: 'United Kingdom', city: 'London', lat: 51.5074, lng: -0.1278, flag: '🇬🇧' },
            { country: 'Germany', city: 'Berlin', lat: 52.5200, lng: 13.4050, flag: '🇩🇪' },
            { country: 'France', city: 'Paris', lat: 48.8566, lng: 2.3522, flag: '🇫🇷' },
            { country: 'Canada', city: 'Toronto', lat: 43.6532, lng: -79.3832, flag: '🇨🇦' },
            { country: 'Australia', city: 'Sydney', lat: -33.8688, lng: 151.2093, flag: '🇦🇺' },
            { country: 'Japan', city: 'Tokyo', lat: 35.6762, lng: 139.6503, flag: '🇯🇵' },
            { country: 'India', city: 'Mumbai', lat: 19.0760, lng: 72.8777, flag: '🇮🇳' }
        ];

        const websiteTypes = ['Blog', 'Portfolio', 'E-commerce', 'News', 'Documentation', 'SaaS', 'Corporate'];

        return Array.from({ length: 75 }, (_, i) => {
            const browser = browsers[Math.floor(Math.random() * browsers.length)];
            const device = devices[Math.floor(Math.random() * devices.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const websiteType = websiteTypes[Math.floor(Math.random() * websiteTypes.length)];
            const sessionStart = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
            const duration = Math.floor(Math.random() * 1800) + 30; // 30s to 30 minutes
            const numActions = Math.floor(Math.random() * 12) + 3;

            const sessionActions = [];
            const eventTypes = Object.keys(analyticsEvents);

            // Always start with SESSION_START
            sessionActions.push({
                type: 'SESSION_START',
                timestamp: sessionStart,
                details: `User arrived from ${['Google', 'Direct', 'Social Media', 'Email', 'Referral'][Math.floor(Math.random() * 5)]}`,
                metadata: {
                    referrer: ['google.com', 'facebook.com', 'twitter.com', 'direct', 'email'][Math.floor(Math.random() * 5)],
                    userAgent: `${browser.name}/${browser.version}`,
                    screen: device.name === 'Mobile' ? '390x844' : device.name === 'Tablet' ? '768x1024' : '1920x1080'
                }
            });

            // Add random actions based on website type
            for (let j = 1; j < numActions - 1; j++) {
                const actionTime = new Date(sessionStart.getTime() + (j * duration * 1000 / numActions));
                const eventType = getRandomEventType(websiteType);

                sessionActions.push({
                    type: eventType,
                    timestamp: actionTime,
                    details: generateEventDetails(eventType, websiteType),
                    metadata: generateEventMetadata(eventType, websiteType)
                });
            }

            // Always end with SESSION_END
            sessionActions.push({
                type: 'SESSION_END',
                timestamp: new Date(sessionStart.getTime() + duration * 1000),
                details: 'Session ended',
                metadata: {
                    totalDuration: duration,
                    bounceRate: sessionActions.length <= 3
                }
            });

            const hasErrors = sessionActions.some(a => a.type === 'ERROR');
            const hasFormSubmission = sessionActions.some(a => a.type === 'FORM_SUBMIT');
            const pageViews = sessionActions.filter(a => a.type === 'VISIT').length;

            return {
                id: `SES-${String(i + 1).padStart(6, '0')}`,
                startTime: sessionStart,
                duration,
                browser,
                device,
                location,
                websiteType,
                actions: sessionActions,
                pageViews: pageViews || 1,
                bounceRate: sessionActions.length <= 3,
                hasErrors,
                hasFormSubmission,
                userId: Math.random() < 0.4 ? `user_${Math.floor(Math.random() * 10000)}` : null,
                referrer: ['Google', 'Facebook', 'Direct', 'Email', 'LinkedIn'][Math.floor(Math.random() * 5)]
            };
        });
    };

    const getRandomEventType = (websiteType) => {
        const commonEvents = ['VISIT', 'CLICK'];
        const typeSpecificEvents = {
            'E-commerce': ['FORM_INTERACT', 'FORM_SUBMIT'],
            'Blog': ['CLICK', 'VISIT'],
            'Portfolio': ['CLICK', 'VISIT'],
            'News': ['CLICK', 'VISIT'],
            'Documentation': ['CLICK', 'VISIT'],
            'SaaS': ['FORM_INTERACT', 'FORM_SUBMIT', 'ERROR'],
            'Corporate': ['FORM_INTERACT', 'FORM_SUBMIT']
        };

        const availableEvents = [...commonEvents, ...(typeSpecificEvents[websiteType] || [])];

        // 5% chance of error
        if (Math.random() < 0.05) {
            availableEvents.push('ERROR');
        }

        return availableEvents[Math.floor(Math.random() * availableEvents.length)];
    };

    const generateEventDetails = (eventType, websiteType) => {
        const details = {
            VISIT: [
                'Homepage', 'About Page', 'Contact Page', 'Services Page', 'Blog Post',
                'Product Page', 'Category Page', 'Search Results', 'User Profile', 'Dashboard'
            ],
            CLICK: [
                'Navigation Menu', 'CTA Button', 'Social Media Link', 'Download Button', 'Read More',
                'Contact Button', 'Subscribe Button', 'Search Button', 'Menu Toggle', 'Logo'
            ],
            FORM_INTERACT: [
                'Contact Form', 'Newsletter Signup', 'Login Form', 'Registration Form', 'Search Form',
                'Feedback Form', 'Quote Request', 'Survey Form', 'Comment Form', 'Filter Form'
            ],
            FORM_SUBMIT: [
                'Contact Form Submitted', 'Newsletter Subscription', 'User Registration', 'Login Attempt',
                'Feedback Submitted', 'Quote Requested', 'Survey Completed', 'Comment Posted', 'Search Query'
            ],
            ERROR: [
                '404 Page Not Found', 'Form Validation Error', 'Network Connection Error', 'Server Error (500)',
                'Authentication Failed', 'File Upload Error', 'Payment Processing Error', 'Database Connection Error'
            ]
        };

        const eventDetails = details[eventType] || ['Generic action performed'];
        return eventDetails[Math.floor(Math.random() * eventDetails.length)];
    };

    const generateEventMetadata = (eventType, websiteType) => {
        const baseMetadata = {
            timestamp: new Date().toISOString(),
            sessionId: Math.random().toString(36).substring(7)
        };

        switch (eventType) {
            case 'VISIT':
                return {
                    ...baseMetadata,
                    pageUrl: `/${Math.random().toString(36).substring(7)}`,
                    loadTime: Math.floor(Math.random() * 3000) + 200,
                    viewport: '1920x1080'
                };
            case 'CLICK':
                return {
                    ...baseMetadata,
                    elementId: `btn-${Math.random().toString(36).substring(7)}`,
                    elementType: ['button', 'link', 'div', 'span'][Math.floor(Math.random() * 4)],
                    coordinates: { x: Math.floor(Math.random() * 1920), y: Math.floor(Math.random() * 1080) }
                };
            case 'FORM_INTERACT':
                return {
                    ...baseMetadata,
                    formId: `form-${Math.random().toString(36).substring(7)}`,
                    fieldName: ['email', 'name', 'message', 'phone'][Math.floor(Math.random() * 4)],
                    interactionType: ['focus', 'blur', 'input'][Math.floor(Math.random() * 3)]
                };
            case 'FORM_SUBMIT':
                return {
                    ...baseMetadata,
                    formId: `form-${Math.random().toString(36).substring(7)}`,
                    success: Math.random() > 0.1,
                    validationErrors: Math.random() < 0.2 ? ['email', 'required'] : []
                };
            case 'ERROR':
                return {
                    ...baseMetadata,
                    errorCode: [404, 500, 403, 400][Math.floor(Math.random() * 4)],
                    errorMessage: 'An error occurred',
                    stack: 'Error stack trace...'
                };
            default:
                return baseMetadata;
        }
    };

    const [sessions] = useState(generateSessions());

    // Auto-select first session
    useEffect(() => {
        if (sessions.length > 0 && !selectedSession) {
            setSelectedSession(sessions[0]);
        }
    }, [sessions, selectedSession]);

    const generateAIInsights = (session) => {
        const insights = [];

        // Error analysis
        const errorActions = session.actions.filter(a => a.type === 'ERROR');
        if (errorActions.length > 0) {
            insights.push({
                type: 'critical',
                icon: AlertTriangle,
                title: 'Errors Detected',
                description: `User encountered ${errorActions.length} error(s). Check for technical issues or UX problems.`,
                impact: 'High',
                color: 'text-red-400',
                actionable: true
            });
        }

        // Form abandonment
        const formInteractions = session.actions.filter(a => a.type === 'FORM_INTERACT');
        const formSubmissions = session.actions.filter(a => a.type === 'FORM_SUBMIT');

        if (formInteractions.length > 0 && formSubmissions.length === 0) {
            insights.push({
                type: 'warning',
                icon: AlertCircle,
                title: 'Form Abandonment',
                description: 'User interacted with forms but didn\'t submit. Consider simplifying form fields.',
                impact: 'Medium',
                color: 'text-yellow-400',
                actionable: true
            });
        }

        // High engagement
        if (session.duration > 300 && session.pageViews > 3) {
            insights.push({
                type: 'positive',
                icon: TrendingUp,
                title: 'High Engagement',
                description: `User spent ${Math.floor(session.duration / 60)} minutes across ${session.pageViews} pages. Strong interest indicated.`,
                impact: 'Medium',
                color: 'text-green-400',
                actionable: false
            });
        }

        // Quick bounce
        if (session.bounceRate) {
            insights.push({
                type: 'negative',
                icon: TrendingDown,
                title: 'Quick Bounce',
                description: 'User left quickly with minimal interaction. Content may not match expectations.',
                impact: 'Medium',
                color: 'text-red-400',
                actionable: true
            });
        }

        // Successful form submission
        if (formSubmissions.length > 0) {
            insights.push({
                type: 'positive',
                icon: CheckCircle,
                title: 'Form Conversion',
                description: 'User successfully submitted form(s). Good conversion indicator.',
                impact: 'High',
                color: 'text-green-400',
                actionable: false
            });
        }

        // Click-heavy session
        const clickActions = session.actions.filter(a => a.type === 'CLICK');
        if (clickActions.length > 5) {
            insights.push({
                type: 'info',
                icon: MousePointer,
                title: 'High Click Activity',
                description: 'User performed many clicks. Consider analyzing click patterns for optimization.',
                impact: 'Low',
                color: 'text-blue-400',
                actionable: true
            });
        }

        return insights;
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getBrowserIcon = (browserName) => {
        return Globe; // Using Globe icon for all browsers
    };

    const getDeviceIcon = (deviceName) => {
        switch (deviceName) {
            case 'Desktop': return Monitor;
            case 'Mobile': return Smartphone;
            case 'Tablet': return Tablet;
            default: return Monitor;
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

                        {/* Filter Controls */}
                        <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <Filter className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-400">Filter by:</span>
                            </div>
                            <select
                                value={filterType}
                                onChange={(e) => {
                                    setFilterType(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Sessions</option>
                                <option value="errors">With Errors</option>
                                <option value="forms">Form Submissions</option>
                                <option value="bounce">Bounced Sessions</option>
                                <option value="engaged">Highly Engaged</option>
                            </select>
                        </div>

                        <p className="text-slate-400 text-sm">
                            Showing {paginatedSessions.length} of {filteredSessions.length} sessions
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="p-4 space-y-3">
                            {paginatedSessions.map((session) => {
                                const BrowserIcon = getBrowserIcon(session.browser.name);
                                const DeviceIcon = getDeviceIcon(session.device.name);

                                return (
                                    <div
                                        key={session.id}
                                        onClick={() => setSelectedSession(session)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                            selectedSession?.id === session.id
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-slate-700/50 bg-slate-700/20 hover:border-slate-600/50 hover:bg-slate-700/30'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-mono text-slate-300">
                                                {session.id}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-slate-400">
                                                    {session.location.flag}
                                                </span>
                                                <span className="text-xs px-2 py-1 rounded-full bg-slate-600/50 text-slate-300">
                                                    {session.websiteType}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <BrowserIcon className="w-4 h-4 text-slate-400" />
                                                <DeviceIcon className="w-4 h-4 text-slate-400" />
                                                {session.hasErrors && (
                                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                                )}
                                                {session.hasFormSubmission && (
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                )}
                                            </div>
                                            <span className="text-xs text-slate-400">
                                                {formatDuration(session.duration)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-400">
                                                {session.startTime.toLocaleTimeString()}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {session.actions.length} events
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
                                <ChevronLeft className="w-4 h-4" />
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
                                <ChevronRight className="w-4 h-4" />
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
                                            Session {selectedSession.id}
                                        </h1>
                                        <p className="text-slate-400 mt-1">
                                            {selectedSession.websiteType} • User journey analysis
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm text-slate-400">Status</p>
                                            <p className={`font-medium ${
                                                selectedSession.hasErrors ? 'text-red-400' :
                                                    selectedSession.hasFormSubmission ? 'text-green-400' :
                                                        selectedSession.bounceRate ? 'text-yellow-400' :
                                                            'text-blue-400'
                                            }`}>
                                                {selectedSession.hasErrors ? 'Has Errors' :
                                                    selectedSession.hasFormSubmission ? 'Converted' :
                                                        selectedSession.bounceRate ? 'Bounced' :
                                                            'Engaged'}
                                            </p>
                                        </div>
                                        <div className={`w-3 h-3 rounded-full ${
                                            selectedSession.hasErrors ? 'bg-red-400' :
                                                selectedSession.hasFormSubmission ? 'bg-green-400' :
                                                    selectedSession.bounceRate ? 'bg-yellow-400' :
                                                        'bg-blue-400'
                                        }`} />
                                    </div>
                                </div>

                                {/* Session Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Clock className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm text-slate-400">Duration</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {formatDuration(selectedSession.duration)}
                                        </p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm text-slate-400">Location</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedSession.location.flag} {selectedSession.location.city}
                                        </p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {React.createElement(getBrowserIcon(selectedSession.browser.name), {
                                                className: "w-4 h-4 text-slate-400"
                                            })}
                                            <span className="text-sm text-slate-400">Browser</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedSession.browser.name}
                                        </p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {React.createElement(getDeviceIcon(selectedSession.device.name), {
                                                className: "w-4 h-4 text-slate-400"
                                            })}
                                            <span className="text-sm text-slate-400">Device</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedSession.device.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Event Timeline */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-6">Event Timeline</h3>

                                    <div className="space-y-4">
                                        {selectedSession.actions.map((action, index) => {
                                            const eventConfig = analyticsEvents[action.type];
                                            const IconComponent = eventConfig.icon;
                                            const isLast = index === selectedSession.actions.length - 1;

                                            return (
                                                <div key={index} className="flex items-start space-x-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className={`p-3 rounded-full ${eventConfig.bgColor} border-2 ${
                                                            action.type === 'SESSION_START' ? 'border-green-400' :
                                                                action.type === 'SESSION_END' ? 'border-red-400' :
                                                                    action.type === 'ERROR' ? 'border-red-400' :
                                                                        action.type === 'FORM_SUBMIT' ? 'border-green-400' :
                                                                            'border-slate-600'
                                                        }`}>
                                                            <IconComponent className={`w-5 h-5 ${eventConfig.color}`} />
                                                        </div>
                                                        {!isLast && (
                                                            <div className="w-0.5 h-12 bg-slate-700 mt-2" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 pb-8">
                                                        <div className="bg-slate-700/30 rounded-lg p-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="text-white font-medium">
                                                                    {eventConfig.label}
                                                                </h4>
                                                                <span className="text-xs text-slate-400">
                                                                    {action.timestamp.toLocaleTimeString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-slate-400 text-sm mb-2">
                                                                {action.details}
                                                            </p>
                                                            {action.metadata && (
                                                                <div className="text-xs text-slate-500">
                                                                    <pre className="font-mono text-xs">
                                                                        {JSON.stringify(action.metadata, null, 2)}
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
                                    <Brain className="w-5 h-5 text-purple-400" />
                                    <h3 className="text-xl font-semibold text-white">AI Insights</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {generateAIInsights(selectedSession).map((insight, index) => {
                                        const IconComponent = insight.icon;
                                        return (
                                            <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                                                <div className="flex items-start space-x-3">
                                                    <div className="p-2 rounded-lg bg-slate-600/50">
                                                        <IconComponent className={`w-5 h-5 ${insight.color}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="text-white font-medium">
                                                                {insight.title}
                                                            </h4>
                                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                                insight.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                                                                    insight.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                        'bg-blue-500/20 text-blue-400'
                                                            }`}>
                                                                {insight.impact}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-400 text-sm mb-2">
                                                            {insight.description}
                                                        </p>
                                                        {insight.actionable && (
                                                            <div className="flex items-center space-x-1">
                                                                <Zap className="w-3 h-3 text-yellow-400" />
                                                                <span className="text-xs text-yellow-400">Actionable</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {generateAIInsights(selectedSession).length === 0 && (
                                    <div className="text-center py-8">
                                        <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-slate-400">No specific insights for this session</p>
                                        <p className="text-slate-500 text-sm mt-1">This appears to be a normal user session</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <p className="text-slate-400">Select a session to view analytics</p>
                                <p className="text-slate-500 text-sm mt-1">Choose from {filteredSessions.length} sessions</p>
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

export default UniversalAnalyticsDashboard;