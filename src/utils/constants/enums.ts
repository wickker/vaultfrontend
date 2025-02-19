export const Route = {
  CATEGORIES: '/categories',
  DASHBOARD: '/',
  ITEMS: '/items',
  PROFILE: '/profile',
} as const

export type Route = (typeof Route)[keyof typeof Route]

export const RelativeRoute = {
  MODAL: 'modal',
} as const

export type RelativeRoute = (typeof RelativeRoute)[keyof typeof RelativeRoute]

export const RecordType = {
  ADDRESS: 'Address',
  BIRTHDAY: 'Birthday',
  EMAIL: 'Email',
  KEY: 'Key',
  PASSWORD: 'Password',
  PIN: 'Pin',
  SECRET: 'Secret',
  USERNAME: 'Username',
} as const

export type RecordType = (typeof RecordType)[keyof typeof RecordType]

export const GetItemsOrderBy = {
  CREATED_AT_ASC: 'created_at_asc',
  CREATED_AT_DESC: 'created_at_desc',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
} as const

export type GetItemsOrderBy =
  (typeof GetItemsOrderBy)[keyof typeof GetItemsOrderBy]

export const CategoryColor = {
  PURPLE: '#584566',
  RED: '#BF5268',
  ORANGE: '#F3915A',
  YELLOW: '#F4C578',
  LIME: '#86A874',
  GREEN: '#54856B',
  AQUA: '#446870',
  INDIGO: '#4E5470',
} as const

export type CategoryColor = (typeof CategoryColor)[keyof typeof CategoryColor]
