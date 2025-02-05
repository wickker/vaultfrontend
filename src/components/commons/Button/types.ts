export const ButtonVariant = {
  DEFAULT: 'default',
  DANGER: 'danger',
  OUTLINE: 'outline',
  SECONDARY: 'secondary',
  LINK: 'link',
} as const

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]