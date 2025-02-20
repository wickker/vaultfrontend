import { useQuery } from '@tanstack/react-query'
import useAxiosConfig from '@/hooks/useAxiosConfig'
import vaultApi from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const useCategory = () => {
  const { initConfig } = useAxiosConfig()

  const useGetCategoriesQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CATEGORIES,
      queryFn: vaultApi.getCategories(initConfig()),
      retry: false,
    })

  return {
    useGetCategoriesQuery,
  }
}

export default useCategory
