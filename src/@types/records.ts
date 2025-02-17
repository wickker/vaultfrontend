import { z } from 'zod'
import { UpdateItemRequestSchema } from './items'

// Requests
export const RecordFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

export const CreateRecordRequestSchema = RecordFormSchema.merge(
  z.object({
    item_id: z.number(),
  })
)

export const UpdateRecordRequestSchema = RecordFormSchema.merge(
  z.object({
    id: z.number(),
  })
)

// Responses
export const RecordSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.string(),
})

export const GetRecordsByItemResponseSchema = UpdateItemRequestSchema.merge(
  z.object({
    records: z.array(RecordSchema),
  })
)

export type CreateRecordRequest = z.infer<typeof CreateRecordRequestSchema>
export type GetRecordsByItemResponse = z.infer<
  typeof GetRecordsByItemResponseSchema
>
export type Record = z.infer<typeof RecordSchema>
export type UpdateRecordRequest = z.infer<typeof UpdateRecordRequestSchema>
