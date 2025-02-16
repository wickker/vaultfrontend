export const QUERY_KEYS = {
  GET_ITEMS: ['items'] as const,
  GET_RECORDS: (itemId: number) => ['records', itemId] as const,
} as const
