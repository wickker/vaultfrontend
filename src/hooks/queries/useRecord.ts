import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { GetRecordsByItemResponse } from '@/@types/records'
import { vaultApi } from '@/services'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const path = '/records'

const useRecord = () => {
  const { getToken } = useAuth()

  const useGetRecordsByItem = (itemId: string) => {
    const decodedItemId = atob(itemId)

    return useQuery({
      queryKey: QUERY_KEYS.GET_RECORDS(decodedItemId),
      queryFn: async (): Promise<GetRecordsByItemResponse> => {
        const res = await vaultApi.get(path, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          params: {
            itemId: decodedItemId,
          },
        })
        return res.data
      },
      enabled: !!decodedItemId,
      retry: false,
    })
  }

  return { useGetRecordsByItem }
}

export default useRecord
