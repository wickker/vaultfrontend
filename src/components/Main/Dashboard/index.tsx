import { useMemo } from 'react'
import { DateTime } from 'luxon'
import { RiLoader4Line } from 'react-icons/ri'
import ItemTile from './ItemTile'
import { NoItemsYet, Page, SearchHeader } from '@/components/commons'
import useItem from '@/hooks/queries/useItem'

const Dashboard = () => {
  const { useGetItemsQuery } = useItem()
  const getItems = useGetItemsQuery()
  const hasItems = getItems.isSuccess && getItems.data.length > 0

  const items = useMemo(() => {
    return (getItems.data || []).map((item) => (
      <ItemTile
        name={item.name}
        date={DateTime.fromJSDate(new Date(item.createdAt)).toFormat(
          'd MMM yyyy'
        )}
        onEdit={() => {}}
        key={item.id}
      />
    ))
  }, [getItems.data])

  const renderItems = () => {
    if (getItems.isFetching) {
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <RiLoader4Line className='h-10 w-10 animate-spin text-slate-400' />
        </div>
      )
    }

    if (!hasItems) {
      return <NoItemsYet />
    }

    return (
      <div className='bg-app-background scrollbar flex h-full w-full flex-col gap-y-3 overflow-y-auto p-6'>
        {items}
      </div>
    )
  }

  return (
    <Page header={<SearchHeader onSearchChange={() => {}} />}>
      {renderItems()}
    </Page>
  )
}

export default Dashboard
