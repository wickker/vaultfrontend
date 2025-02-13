import { useSearchParams } from 'react-router'
import useRecord from '@/hooks/queries/useRecord'

const Item = () => {
  const [search] = useSearchParams()
  const { useGetRecordsByItem } = useRecord()
  const getRecords = useGetRecordsByItem(search.get('id') || '')
  console.log(getRecords.data)

  return <div>ITEM</div>
}

export default Item
