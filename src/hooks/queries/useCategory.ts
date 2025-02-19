import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@/@types/categories'
import { vaultApi } from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const path = '/categories'

const useCategory = () => {
  const { getToken } = useAuth()

  const useGetCategoriesQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CATEGORIES,
      queryFn: async (): Promise<Array<Category>> => {
        const res = await vaultApi.get(path, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        return res.data
      },
      retry: false,
    })

  return {
    useGetCategoriesQuery,
  }
}

export default useCategory
