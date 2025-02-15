import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreateRecordRequest,
  GetRecordsByItemResponse,
  Record,
  UpdateRecordRequest,
} from '@/@types/records'
import { vaultApi } from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const path = '/records'

const useRecord = () => {
  const { getToken } = useAuth()

  const useGetRecordsByItem = (itemId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_RECORDS(itemId),
      queryFn: async (): Promise<GetRecordsByItemResponse> => {
        const res = await vaultApi.get(path, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          params: { itemId },
        })
        return res.data
      },
      enabled: !!itemId,
      retry: false,
    })

  const useCreateRecordMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: async (request: CreateRecordRequest): Promise<Record> => {
        const res = await vaultApi.post(path, request, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        return res.data
      },
      onSuccess,
    })

  const useUpdateRecordMutation = (onSuccess: (d: Record) => void) =>
    useMutation({
      mutationFn: async (request: UpdateRecordRequest): Promise<Record> => {
        const res = await vaultApi.put(
          `${path}/${request.id}`,
          { name: request.name, value: request.value },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        )
        return res.data
      },
      onSuccess,
    })

  const useDeleteRecordMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: async (id: number): Promise<null> => {
        const res = await vaultApi.delete(`${path}/${id}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        return res.data
      },
      onSuccess,
    })

  return {
    useCreateRecordMutation,
    useDeleteRecordMutation,
    useGetRecordsByItem,
    useUpdateRecordMutation,
  }
}

export default useRecord
