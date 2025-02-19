import { GetItemsOrderBy } from './enums'

export const ORDER_BY_LABELS_MAP: Record<GetItemsOrderBy, string> = {
  [GetItemsOrderBy.CREATED_AT_ASC]: 'Created at (asc)',
  [GetItemsOrderBy.CREATED_AT_DESC]: 'Created at (desc)',
  [GetItemsOrderBy.NAME_ASC]: 'Name (asc)',
  [GetItemsOrderBy.NAME_DESC]: 'Name (desc)',
}
