import { SignOutButton, useUser } from '@clerk/clerk-react'
import { MdLogout } from 'react-icons/md'
import { RiLoader4Line } from 'react-icons/ri'
import { Avatar, Page } from '@/components/commons'

const Profile = () => {
  const { user, isLoaded } = useUser()

  return (
    <Page>
      <div className='flex h-full w-full flex-col items-center bg-white px-6 py-4'>
        {isLoaded ? (
          <>
            <Avatar
              url={user?.imageUrl}
              email={user?.primaryEmailAddress?.emailAddress}
              className='mt-16 mb-3'
            />

            <p className='text-app-default mb-9 text-lg font-semibold'>
              {user?.primaryEmailAddress?.emailAddress}
            </p>

            <SignOutButton>
              <button className='text-app-default bg-app-background flex w-full items-center gap-x-3 rounded-md p-4'>
                <MdLogout className='h-5 w-5' />
                Logout
              </button>
            </SignOutButton>
          </>
        ) : (
          <RiLoader4Line className='text-app-secondary my-auto h-10 w-10 animate-spin' />
        )}
      </div>
    </Page>
  )
}

export default Profile
