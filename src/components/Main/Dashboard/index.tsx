import { TbSearch } from 'react-icons/tb'
import { Page } from '@/components/commons'

const Dashboard = () => {
  return (
    <Page>
      <div className='bg-app-background h-full w-full p-6'>
        <div className='text-app-default flex items-center justify-between mb-10'>
          <h1 className='text-3xl'>Vault</h1>
          <TbSearch className='h-8 w-8' />
        </div>

        <input className='bg-white text-app-default text-base rounded-md focus-visible-app block w-full p-2.5'
        />
      </div>
    </Page>
  )
}

export default Dashboard
