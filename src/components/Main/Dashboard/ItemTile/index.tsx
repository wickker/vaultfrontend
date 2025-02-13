import { MouseEvent, useState } from 'react'
import { DateTime } from 'luxon'
import { FiEdit } from 'react-icons/fi'
import { createSearchParams, useNavigate } from 'react-router'
import { Item } from '@/@types/items'
import ItemModal from '@/components/Main/Dashboard/ItemModal'
import { Route } from '@/utils/constants/enums'

type ItemTileProps = {
  item: Item
}

const ItemTile = ({ item }: ItemTileProps) => {
  const [isUpdateItemModalVisible, setIsUpdateItemModalVisible] =
    useState(false)
  const navigate = useNavigate()

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsUpdateItemModalVisible(true)
  }

  const handleClickTile = () => {
    const params = {
      id: btoa(item.id.toString()),
      name: item.name,
    }
    navigate({
      pathname: Route.ITEM,
      search: createSearchParams(params).toString(),
    })
  }

  return (
    <>
      <div
        className='grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md bg-white p-4 text-left'
        onClick={handleClickTile}
      >
        <div
          className='h-12 w-12 rounded-md bg-zinc-300'
          //   style={{
          //     backgroundColor: getRandomPastelColor(),
          //   }}
        />

        <div className='flex w-0 min-w-full flex-col gap-y-0.5'>
          <p className='text-app-default truncate font-semibold'>{item.name}</p>
          <p className='truncate text-sm text-slate-500'>
            {DateTime.fromJSDate(new Date(item.createdAt)).toFormat(
              'd MMM yyyy'
            )}
          </p>
        </div>

        <button onClick={handleEdit}>
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
