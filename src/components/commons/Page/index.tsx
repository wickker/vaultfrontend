import { PropsWithChildren } from 'react'

const Page = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-[100dvh] w-full justify-center'>
      <div className='h-full w-md max-w-md'>{children}</div>
    </div>
  )
}

export default Page
