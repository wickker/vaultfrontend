import { Page, SearchHeader } from '@/components/commons'

const Dashboard = () => {
  return (
    <Page header={<SearchHeader onSearchChange={() => {}} />}>
      <div className='bg-app-background h-full w-full p-6'></div>
    </Page>
  )
}

export default Dashboard
