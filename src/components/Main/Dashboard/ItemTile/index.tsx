import { MouseEvent } from 'react'
import { DateTime } from 'luxon'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { Item } from '@/@types/items'
import { CategoryColor, Route } from '@/utils/constants/enums'

type ItemTileProps = {
  item: Item
  categoryInitials: string
  categoryColor: string
  onEdit: () => void
}

const ItemTile = ({
  item,
  categoryColor = CategoryColor.YELLOW,
  categoryInitials,
  onEdit,
}: ItemTileProps) => {
  const navigate = useNavigate()

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onEdit()
  }

  const handleClickTile = () =>
    navigate(`${Route.ITEMS}/${btoa(item.id.toString())}`)

  return (
    <div
      className='grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md bg-white p-4 text-left hover:cursor-pointer'
      onClick={handleClickTile}
    >
      <div
        className='flex h-12 w-12 items-center justify-center rounded-full text-xl text-white'
        style={{
          backgroundColor: categoryColor,
        }}
      >
        {categoryInitials}
      </div>

      <div className='flex w-0 min-w-full flex-col gap-y-0.5'>
        <p className='text-app-default truncate font-semibold'>{item.name}</p>
        <p className='truncate text-sm text-slate-500'>
          {DateTime.fromJSDate(new Date(item.created_at)).toFormat(
            'd MMM yyyy'
          )}
        </p>
      </div>

      <button onClick={handleEdit} className='hover:cursor-pointer'>
        <FiEdit className='h-6 w-6 text-slate-500' />
      </button>
    </div>
  )
}

export default ItemTile
