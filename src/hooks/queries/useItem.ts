import { useMutation, useQuery } from '@tanstack/react-query'
import { GetItemsRequest, Item } from '@/@types/items'
import useAxiosConfig from '@/hooks/useAxiosConfig'
import vaultApi from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const useItem = () => {
  const { initConfig } = useAxiosConfig()

  const useGetItemsQuery = (params: GetItemsRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_ITEMS(params),
      queryFn: vaultApi.getItems(initConfig(params)),
      retry: false,
    })

  const useCreateItemMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: vaultApi.createItem(initConfig()),
      onSuccess,
    })

  const useUpdateItemMutation = (onSuccess: (d: Item) => void) =>
    useMutation({
      mutationFn: vaultApi.updateItem(initConfig()),
      onSuccess,
    })

  const useDeleteItemMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: vaultApi.deleteItem(initConfig()),
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
