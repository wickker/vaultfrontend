import { FaChevronDown } from 'react-icons/fa6'
import { FilterChip } from '@/components/commons'
import { ORDER_BY_LABELS_MAP } from '@/utils/constants/commons'
import { GetItemsOrderBy } from '@/utils/constants/enums'

type ChipsProps = {
  orderBy: GetItemsOrderBy
  onOrderByChange: (v: GetItemsOrderBy) => void
}

const Chips = ({ orderBy, onOrderByChange }: ChipsProps) => {
  const orderByLabel = `Sort by: ${ORDER_BY_LABELS_MAP[orderBy]}`

  return (
    <div className='bg-app-background flex items-center px-6 pt-2 pb-2'>
      <FilterChip<GetItemsOrderBy>
        value={orderBy}
        options={Object.values(GetItemsOrderBy).map((o) => ({
          text: ORDER_BY_LABELS_MAP[o],
          value: o,
        }))}
        onChange={onOrderByChange}
      >
        {orderByLabel}
        <FaChevronDown />
      </FilterChip>
    </div>
  )
}

export default Chips
