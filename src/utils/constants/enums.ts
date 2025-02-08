export const Route = {
  DASHBOARD: '/',
  ITEM: '/item',
  PROFILE: '/profile',
} as const

export type Route = (typeof Route)[keyof typeof Route]
