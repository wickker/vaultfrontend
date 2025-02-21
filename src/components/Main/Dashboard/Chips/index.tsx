import { FaChevronDown } from 'react-icons/fa6'
import { LuArrowDownUp } from 'react-icons/lu'
import { Category } from '@/@types/categories'
import { FilterChip } from '@/components/commons'
import CategoryTile from '@/components/Main/Dashboard/CategoryTile'
import { ORDER_BY_LABELS_MAP } from '@/utils/constants/commons'
import { GetItemsOrderBy } from '@/utils/constants/enums'

type ChipsProps = {
  orderBy: GetItemsOrderBy
  onOrderByChange: (v: GetItemsOrderBy) => void
  isDisabled: boolean
  categoryId: number
  onCategoryChange: (v: number) => void
  categories: Array<Category>
}

const Chips = ({
  orderBy,
  onOrderByChange,
  isDisabled = false,
  categoryId,
  onCategoryChange,
  categories = [],
}: ChipsProps) => {
  const categoryOptions = [
    { text: 'All', value: 0 },
    ...categories.map((c) => ({
      text: <CategoryTile name={c.name} color={c.color} />,
      value: c.id,
    })),
  ]
  const orderByOptions = Object.values(GetItemsOrderBy).map((o) => ({
    text: ORDER_BY_LABELS_MAP[o],
    value: o,
  }))
  const categoryFilterLabel =
    categoryOptions.find((c) => c.value === categoryId)?.text || ''

  return (
    <div className='flex items-center gap-x-2 px-6'>
      <FilterChip<number>
        value={categoryId}
        onChange={onCategoryChange}
        isDisabled={isDisabled}
        options={categoryOptions}
      >
        {categoryFilterLabel}
        <FaChevronDown />
      </FilterChip>

      <FilterChip<GetItemsOrderBy>
        value={orderBy}
        options={orderByOptions}
        onChange={onOrderByChange}
        isDisabled={isDisabled}
      >
        Sort
        <LuArrowDownUp className='h-4 w-4' />
      </FilterChip>
    </div>
  )
}

export default Chips
