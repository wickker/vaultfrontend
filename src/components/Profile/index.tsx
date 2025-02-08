import { SignOutButton, useUser } from '@clerk/react-router'
import { MdLogout } from 'react-icons/md'
import { Avatar, Page } from '@/components/commons'

const Profile = () => {
  const { user } = useUser()

  return (
    <Page>
      <div className='flex h-full w-full flex-col items-center bg-white px-6 py-4'>
        <Avatar 
        url={user?.imageUrl} 
        email={user?.primaryEmailAddress?.emailAddress}
        className='mt-16 mb-3' />

        <p className='text-app-default mb-9 text-lg font-semibold'>
          {user?.primaryEmailAddress?.emailAddress}
        </p>

        <SignOutButton>
          <button className='text-app-default flex w-full items-center gap-x-3 rounded-md bg-app-background p-4'>
            <MdLogout className='h-5 w-5' />
            Logout
          </button>
        </SignOutButton>
      </div>
    </Page>
  )
}

export default Profile
