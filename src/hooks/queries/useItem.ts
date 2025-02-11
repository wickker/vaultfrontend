import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { Item } from '@/@types/items'
import { vaultApi } from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const url = '/items'

const useItem = () => {
  const { getToken } = useAuth()

  const useGetItemsQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.GET_ITEMS,
      queryFn: async (): Promise<Array<Item>> => {
        const res = await vaultApi.get(url, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        return res.data
      },
    })

  return {
    useGetItemsQuery,
  }
}

export default useItem
