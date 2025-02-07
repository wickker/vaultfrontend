import { SignedIn } from '@clerk/react-router'
import { Page } from '@/components/commons'

const Dashboard = () => {
  return (
    <SignedIn>
      <Page>
        <div className='bg-app-background h-full w-full p-4'>
        </div>
      </Page>
    </SignedIn>
  )
}

export default Dashboard
