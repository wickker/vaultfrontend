import { z } from 'zod'

// Requests
export const CategoryFormSchema = z.object({
  name: z.string().trim().min(1),
  color: z.string().trim().min(1),
})

export const UpdateCategoryRequestSchema = CategoryFormSchema.merge(
  z.object({
    id: z.number(),
  })
)

// Responses
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
})

export type Category = z.infer<typeof CategorySchema>
export type CreateCategoryRequest = z.infer<typeof CategoryFormSchema>
export type UpdateCategoryRequest = z.infer<typeof UpdateCategoryRequestSchema>
