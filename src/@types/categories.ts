import { z } from 'zod'

// Requests

// Responses
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
})

export type Category = z.infer<typeof CategorySchema>
