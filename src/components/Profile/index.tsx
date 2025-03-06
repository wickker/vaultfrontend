import { SignOutButton, useUser } from '@clerk/clerk-react'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaChevronRight } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'
import { RiLoader4Line } from 'react-icons/ri'
import { useNavigate } from 'react-router'
import { Avatar, Page } from '@/components/commons'
import { Route } from '@/utils/constants/enums'

const Profile = () => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()

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

            <div className='flex w-full flex-col gap-y-4'>
              <button
                className='text-app-default bg-app-background grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md p-4 text-left'
                onClick={() => navigate(Route.CATEGORIES)}
              >
                <BiCategoryAlt className='h-5 w-5' />
                Categories
                <FaChevronRight className='h-4 w-4 text-slate-500' />
              </button>

              {/* TODO: Remove later */}
              {/* <button
                className='text-app-default bg-app-background grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md p-4 text-left'
                onClick={() => navigate(Route.CAMERA)}
              >
                <IoCameraOutline className='h-5 w-5' />
                Camera
                <FaChevronRight className='h-4 w-4 text-slate-500' />
              </button> */}

              <SignOutButton>
                <button className='text-app-default bg-app-background flex w-full items-center gap-x-3 rounded-md p-4'>
                  <MdLogout className='h-5 w-5' />
                  Logout
                </button>
              </SignOutButton>
            </div>
          </>
        ) : (
          <RiLoader4Line className='text-app-secondary my-auto h-10 w-10 animate-spin' />
        )}
      </div>
    </Page>
  )
}

export default Profile
