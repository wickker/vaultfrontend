import { z } from 'zod'
import { GetItemsOrderBy } from '@/utils/constants/enums'

// Requests
export const ItemFormSchema = z.object({
  name: z.string().trim().min(1),
})

export const UpdateItemRequestSchema = z
  .object({
    id: z.number(),
  })
  .merge(ItemFormSchema)

export const GetItemsRequestSchema = z.object({
  search_phrase: z.string().optional(),
  order_by: z.nativeEnum(GetItemsOrderBy),
})

// Responses
export const ItemSchema = z
  .object({
    created_at: z.string(),
  })
  .merge(UpdateItemRequestSchema)

export type GetItemsRequest = z.infer<typeof GetItemsRequestSchema>
export type Item = z.infer<typeof ItemSchema>
export type UpdateItemRequest = z.infer<typeof UpdateItemRequestSchema>
