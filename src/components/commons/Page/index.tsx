import { PropsWithChildren } from 'react'
import { FooterNavigation } from '@/components/commons'
import { mc } from '@/utils/functions/commons'

type PageProps = {
  header?: JSX.Element
  className?: string
  hideFooter?: boolean
} & PropsWithChildren

const Page = ({
  children,
  header = <div />,
  className,
  hideFooter = false,
}: PageProps) => {
  return (
    <div className='flex h-[100dvh] w-full justify-center'>
      <div
        className={mc(
          'grid h-full w-md max-w-md grid-rows-[auto_1fr_auto]',
          className
        )}
      >
        {header}
        {children}
        {hideFooter ? <div /> : <FooterNavigation />}
      </div>
    </div>
  )
}

export default Page
