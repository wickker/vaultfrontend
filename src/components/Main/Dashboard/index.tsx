import { useMemo } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { RiLoader4Line } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router'
import { ItemModalProps } from './ItemModal'
import ItemTile from './ItemTile'
import { AppLocation } from '@/@types/commons'
import { Button, NoItemsYet, Page, SearchHeader } from '@/components/commons'
import useItem from '@/hooks/queries/useItem'
import { RelativeRoute } from '@/utils/constants/enums'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { useGetItemsQuery } = useItem()
  const getItems = useGetItemsQuery()
  const hasItems = getItems.isSuccess && getItems.data.length > 0

  const handleAddItem = () =>
    navigate(RelativeRoute.MODAL, {
      state: {
        props: {},
        previousLocation: location,
      } satisfies AppLocation<ItemModalProps>,
    })

  const items = useMemo(
    () =>
      (getItems.data || []).map((item) => (
        <ItemTile item={item} key={item.id} />
      )),
    [getItems.data]
  )

  const renderItems = () => {
    if (getItems.isFetching)
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <RiLoader4Line className='h-10 w-10 animate-spin text-slate-400' />
        </div>
      )

    if (!hasItems) return <NoItemsYet />

    return (
      <div className='bg-app-background scrollbar flex h-full w-full flex-col gap-y-3 overflow-y-auto px-6 pt-6 pb-22'>
        {items}
      </div>
    )
  }

  return (
    <Page
      header={
        <SearchHeader
          onSearchChange={() => {}}
          isSearchDisabled={getItems.isFetching}
        />
      }
      className='relative'
    >
      {renderItems()}

      <div className='absolute right-0 bottom-[52px] p-6'>
        <Button
          icon={<FaPlus className='h-5 w-5' />}
          className='rounded-full p-2'
          onClick={handleAddItem}
          disabled={getItems.isFetching}
        />
      </div>
    </Page>
  )
}

export default Dashboard
