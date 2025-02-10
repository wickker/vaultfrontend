import { PropsWithChildren } from 'react'
import Footer from '@/components/commons/Footer'

type PageProps = {
  header?: JSX.Element
} & PropsWithChildren

const Page = ({ children, header }: PageProps) => {
  return (
    <div className='flex h-[100dvh] w-full justify-center'>
      <div className='grid h-full w-md max-w-md grid-rows-[auto_1fr_auto]'>
        {header ? header : <div />}
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Page
