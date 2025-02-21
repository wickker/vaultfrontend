import { GetItemsRequest } from '@/@types/items'

export const QUERY_KEYS = {
  GET_CATEGORIES: ['categories'] as const,
  GET_ITEMS: (request: GetItemsRequest) => ['items', request] as const,
  GET_RECORDS: (itemId: number) => ['records', itemId] as const,
} as const
