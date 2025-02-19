import { useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { RiLoader4Line } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router'
import Chips from './Chips'
import { ItemModalProps } from './ItemModal'
import ItemTile from './ItemTile'
import { AppLocation } from '@/@types/commons'
import { Button, NoItemsYet, Page, SearchHeader } from '@/components/commons'
import useItem from '@/hooks/queries/useItem'
import { GetItemsOrderBy, RelativeRoute } from '@/utils/constants/enums'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchPhrase, setSearchPhrase] = useState<string>()
  const [orderBy, setOrderBy] = useState<GetItemsOrderBy>(
    GetItemsOrderBy.NAME_ASC
  )
  const { useGetItemsQuery } = useItem()
  const request = {
    search_phrase: searchPhrase,
    order_by: orderBy,
  }
  const queryKey = QUERY_KEYS.GET_ITEMS(request)
  const getItems = useGetItemsQuery(request)
  const hasItems = getItems.isSuccess && getItems.data.length > 0

  const handleSearchChange = (s: string) => {
    const trimmed = s.trim()
    if (!trimmed) {
      setSearchPhrase(undefined)
      return
    }
    setSearchPhrase(trimmed)
  }

  const handleAddItem = () =>
    navigate(RelativeRoute.MODAL, {
      state: {
        props: {
          queryKey,
        },
        previousLocation: location,
      } satisfies AppLocation<ItemModalProps>,
    })

  const handleOrderByChange = (v: GetItemsOrderBy) => setOrderBy(v)

  const items = useMemo(
    () =>
      (getItems.data || []).map((item) => (
        <ItemTile item={item} key={item.id} queryKey={queryKey} />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getItems.data]
  )

  const renderItems = () => {
    if (getItems.isFetching)
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <RiLoader4Line className='h-10 w-10 animate-spin text-slate-400' />
        </div>
      )

    if (!hasItems && searchPhrase)
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <p className='text-slate-500'>
            No search results found for {searchPhrase}
          </p>
        </div>
      )

    if (!hasItems) return <NoItemsYet />

    return (
      <div className='bg-app-background scrollbar flex h-full w-full flex-col gap-y-3 overflow-y-auto px-6 pt-2 pb-22'>
        {items}
      </div>
    )
  }

  return (
    <Page
      header={
        <div>
          <SearchHeader
            onSearchChange={handleSearchChange}
            isSearchDisabled={getItems.isFetching}
          />
          <Chips
            orderBy={orderBy}
            onOrderByChange={handleOrderByChange}
            isDisabled={getItems.isFetching}
          />
        </div>
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
