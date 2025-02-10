import { useState } from 'react'
import { Menu, Page, SearchHeader } from '@/components/commons'

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Page header={<SearchHeader onSearchChange={() => {}} />}>
      <div className='bg-app-background h-full w-full p-6'>
        <button onClick={() => setIsVisible((prev) => !prev)}>Button</button>
      </div>
      <Menu isVisible={isVisible} />
    </Page>
  )
}

export default Dashboard
