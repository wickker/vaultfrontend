import { PropsWithChildren } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { LuLayoutDashboard } from 'react-icons/lu'
import { useLocation } from 'react-router'

const Page = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className='flex h-[100dvh] w-full justify-center'>
      <div className='grid h-full w-md max-w-md grid-rows-[auto_1fr_auto]'>
        <div />
        {children}
        <div className='flex items-center justify-around p-4 text-neutral-300'>
          <LuLayoutDashboard className='h-5 w-5' />
          <FaRegUser className='h-5 w-5' />
        </div>
      </div>
    </div>
  )
}

export default Page
