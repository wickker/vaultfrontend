export const Route = {
    DASHBOARD: '/',
    PROFILE: '/profile'
} as const

export type Route = (typeof Route)[keyof typeof Route]