import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Item } from '@/@types/items'
import { vaultApi } from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const path = '/items'

const useItem = () => {
  const { getToken } = useAuth()

  const useGetItemsQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.GET_ITEMS,
      queryFn: async (): Promise<Array<Item>> => {
        const res = await vaultApi.get(path, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        return res.data
      },
    })

  const useCreateItemMutation = () =>
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
    })

  const useUpdateItemMutation = () =>
    useMutation({
      mutationFn: async (request: Item): Promise<Item> => {
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
    })

  const useDeleteItemMutation = () =>
    useMutation({
      mutationFn: async (id: number): Promise<null> => {
        const res = await vaultApi.delete(`${path}/${id}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        return res.data
      },
    })

  return {
    useCreateItemMutation,
    useDeleteItemMutation,
    useGetItemsQuery,
    useUpdateItemMutation,
  }
}

export default useItem
