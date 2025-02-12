import { useState } from 'react'
import { DateTime } from 'luxon'
import { FiEdit } from 'react-icons/fi'
import { Item } from '@/@types/items'
import ItemModal from '@/components/Main/Dashboard/ItemModal'
import { getRandomPastelColor } from '@/utils/functions/commons'

type ItemTileProps = {
  item: Item
}

const ItemTile = ({ item }: ItemTileProps) => {
  const [isUpdateItemModalVisible, setIsUpdateItemModalVisible] =
    useState(false)

  return (
    <>
      <div className='grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md bg-white p-4'>
        <div
          className='h-12 w-12 rounded-md'
          style={{
            backgroundColor: getRandomPastelColor(),
          }}
        />

        <div className='flex w-0 min-w-full flex-col gap-y-0.5'>
          <p className='text-app-default truncate font-semibold'>{item.name}</p>
          <p className='truncate text-sm text-slate-500'>
            {DateTime.fromJSDate(new Date(item.createdAt)).toFormat(
              'd MMM yyyy'
            )}
          </p>
        </div>

        <button onClick={() => setIsUpdateItemModalVisible(true)}>
          <FiEdit className='h-6 w-6 text-slate-500' />
        </button>
      </div>

      <ItemModal
        isVisible={isUpdateItemModalVisible}
        onClose={() => setIsUpdateItemModalVisible(false)}
        item={item}
      />
    </>
  )
}

export default ItemTile
