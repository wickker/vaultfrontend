import { Page, SearchHeader } from '@/components/commons'
import useItem from '@/hooks/queries/useItem'

const Dashboard = () => {
  const { useGetItemsQuery } = useItem()
  const getItems = useGetItemsQuery()
  console.log(getItems.data)

  return (
    <Page header={<SearchHeader onSearchChange={() => {}} />}>
      <div className='bg-app-background h-full w-full p-6'></div>
    </Page>
  )
}

export default Dashboard
