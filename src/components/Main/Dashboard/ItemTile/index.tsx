import { MouseEvent, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { GetItemsRequest, Item } from '@/@types/items'
import { ModalConfirmDelete, SwipeX } from '@/components/commons'
import { SwipeXRef } from '@/components/commons/SwipeX'
import useItem from '@/hooks/queries/useItem'
import { CategoryColor, Route } from '@/utils/constants/enums'

type ItemTileProps = {
  item: Item
  categoryInitials: string
  categoryColor: string
  onEdit: () => void
  queryKey: readonly ['items', GetItemsRequest]
}

const ItemTile = ({
  item,
  categoryColor = CategoryColor.YELLOW,
  categoryInitials,
  onEdit,
  queryKey,
}: ItemTileProps) => {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false)
  const navigate = useNavigate()
  const swipeRef = useRef<SwipeXRef>(null)
  const queryClient = useQueryClient()
  const { useDeleteItemMutation } = useItem()
  const deleteItem = useDeleteItemMutation(deleteItemSuccessCb)

  function deleteItemSuccessCb() {
    swipeRef.current?.reset()
    queryClient.setQueryData(queryKey, (items: Array<Item>) =>
      items.filter((i) => i.id !== item?.id)
    )
    setIsDeleteConfirmationVisible(false)
  }

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onEdit()
  }

  const handleCancelDelete = () => {
    setIsDeleteConfirmationVisible(false)
    swipeRef.current?.reset()
  }

  const handleClickTile = () =>
    navigate(`${Route.ITEMS}/${btoa(item.id.toString())}`)

  return (
    <>
      <SwipeX
        onClick={handleClickTile}
        onTrigger={() => setIsDeleteConfirmationVisible(true)}
        onRevertTrigger={() => setIsDeleteConfirmationVisible(false)}
        ref={swipeRef}
      >
        <div className='grid h-[80px] grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md bg-white p-4 text-left hover:cursor-pointer'>
          <div
            className='flex h-12 w-12 items-center justify-center rounded-full text-xl text-white'
            style={{
              backgroundColor: categoryColor,
            }}
          >
            {categoryInitials}
          </div>

          <div className='flex w-0 min-w-full flex-col gap-y-0.5'>
            <p className='text-app-default truncate font-semibold'>
              {item.name}
            </p>
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
      </SwipeX>

      <ModalConfirmDelete
        isVisible={isDeleteConfirmationVisible}
        onConfirm={() => deleteItem.mutate(item.id)}
        onClose={handleCancelDelete}
        text='Do you really want to delete this item? All associated records will be deleted as well and this process cannot be undone.'
        isLoading={deleteItem.isPending}
      />
    </>
  )
}

export default ItemTile
