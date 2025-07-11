const basePath = "http://localhost:8080"

export const IdentityService = {
    currentUser : basePath + "/api/identity/current-user",
    projects: basePath + "/api/identity/project",
    user : basePath + "/api/identity/user",
    payment : basePath + "/api/identity/payment/intent",
    paymentStatus : basePath + "/api/identity/payment/status",
    billing : basePath + "/api/identity/billing"
}

export const AnalyticsService = {
    analytics: basePath + "/api/analytics/dashboard/v1"
}