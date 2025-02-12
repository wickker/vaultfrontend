import { z } from 'zod'

// Requests
export const ItemFormSchema = z.object({
  name: z.string().min(1),
})

// Responses
export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
})

export type Item = z.infer<typeof ItemSchema>
