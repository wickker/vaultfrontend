import { Page, SearchHeader } from '@/components/commons'

const Dashboard = () => {
  return (
    <Page header={<SearchHeader />}>
      <div className='bg-app-background h-full w-full p-6'>Hello</div>
    </Page>
  )
}

export default Dashboard
