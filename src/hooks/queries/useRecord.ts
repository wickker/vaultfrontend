import { useMutation, useQuery } from '@tanstack/react-query'
import { Record } from '@/@types/records'
import useAxiosConfig from '@/hooks/useAxiosConfig'
import vaultApi from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const useRecord = () => {
  const { initConfig } = useAxiosConfig()

  const useGetRecordsByItemQuery = (itemId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_RECORDS(itemId),
      queryFn: vaultApi.getRecordsByItem(initConfig({ itemId })),
      enabled: !!itemId,
      retry: false,
    })

  const useCreateRecordMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: vaultApi.createRecord(initConfig()),
      onSuccess,
    })

  const useUpdateRecordMutation = (onSuccess: (d: Record) => void) =>
    useMutation({
      mutationFn: vaultApi.updateRecord(initConfig()),
      onSuccess,
    })

  const useDeleteRecordMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: vaultApi.deleteRecord(initConfig()),
      onSuccess,
    })

  return {
    useCreateRecordMutation,
    useDeleteRecordMutation,
    useGetRecordsByItemQuery,
    useUpdateRecordMutation,
  }
}

export default useRecord
