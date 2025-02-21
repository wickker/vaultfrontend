import { useMutation, useQuery } from '@tanstack/react-query'
import { Category } from '@/@types/categories'
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

  const useCreateCategoryMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: vaultApi.createCategory(initConfig()),
      onSuccess,
    })

  const useUpdateCategoryMutation = (onSuccess: (d: Category) => void) =>
    useMutation({
      mutationFn: vaultApi.updateCategory(initConfig()),
      onSuccess,
    })

  const useDeleteCategoryMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: vaultApi.deleteCategory(initConfig()),
      onSuccess,
    })

  return {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
  }
}

export default useCategory
