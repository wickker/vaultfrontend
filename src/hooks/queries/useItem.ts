import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetItemsRequest, Item, UpdateItemRequest } from '@/@types/items'
import { vaultApi } from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const path = '/items'

const useItem = () => {
  const { getToken } = useAuth()

  const useGetItemsQuery = (request: GetItemsRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_ITEMS(request),
      queryFn: async (): Promise<Array<Item>> => {
        const res = await vaultApi.get(path, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          params: request,
        })
        return res.data
      },
      retry: false,
    })

  const useCreateItemMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: async (name: string): Promise<Item> => {
        const res = await vaultApi.post(
          path,
          { name },
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

  const useUpdateItemMutation = (onSuccess: (d: Item) => void) =>
    useMutation({
      mutationFn: async (request: UpdateItemRequest): Promise<Item> => {
        const res = await vaultApi.put(
          `${path}/${request.id}`,
          { name: request.name },
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

  const useDeleteItemMutation = (onSuccess: () => void) =>
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
    useCreateItemMutation,
    useDeleteItemMutation,
    useGetItemsQuery,
    useUpdateItemMutation,
  }
}

export default useItem
