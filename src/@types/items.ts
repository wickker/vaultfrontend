import { z } from 'zod'

// Requests

// Responses
export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
})

export type Item = z.infer<typeof ItemSchema>
