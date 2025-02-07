import { PropsWithChildren } from 'react'
import Footer from '@/components/commons/Footer'

const Page = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-[100dvh] w-full justify-center'>
      <div className='grid h-full w-md max-w-md grid-rows-[auto_1fr_auto]'>
        <div />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Page
