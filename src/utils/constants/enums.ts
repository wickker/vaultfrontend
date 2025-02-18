export const Route = {
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
