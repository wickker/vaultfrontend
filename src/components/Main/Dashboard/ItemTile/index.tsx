import { FiEdit } from 'react-icons/fi'
import { getRandomPastelColor } from '@/utils/functions/commons'

type ItemTileProps = {
  name: string
  date: string
  onEdit: () => void
}

const ItemTile = ({ name = '', date = '', onEdit }: ItemTileProps) => {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] items-start gap-x-3 rounded-md bg-white p-4'>
      <div
        className='h-12 w-12 rounded-md'
        style={{
          backgroundColor: getRandomPastelColor(),
        }}
      />

      <div className='flex w-0 min-w-full flex-col gap-y-0.5'>
        <p className='text-app-default truncate font-semibold'>{name}</p>
        <p className='truncate text-sm text-slate-500'>{date}</p>
      </div>

      <button onClick={onEdit}>
        <FiEdit className='h-5 w-5 text-slate-500' />
      </button>
    </div>
  )
}

export default ItemTile
