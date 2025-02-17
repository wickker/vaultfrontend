import { z } from 'zod'

// Requests
export const ItemFormSchema = z.object({
  name: z.string().trim().min(1),
})

export const UpdateItemRequestSchema = z.object({
  id: z.number(),
  name: z.string(),
})

// Responses
export const ItemSchema = z
  .object({
    createdAt: z.string(),
  })
  .merge(UpdateItemRequestSchema)

export type Item = z.infer<typeof ItemSchema>
export type UpdateItemRequest = z.infer<typeof UpdateItemRequestSchema>
