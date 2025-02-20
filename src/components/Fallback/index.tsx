import { IoMdArrowRoundBack } from 'react-icons/io'
import { TbMoodSadDizzy } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { Button, Page } from '@/components/commons'
import { Route } from '@/utils/constants/enums'

const Fallback = () => {
  const navigate = useNavigate()

  const handleGoHome = () => navigate(Route.DASHBOARD)

  return (
    <Page hideFooter>
      <div className='flex flex-col items-center justify-center gap-y-6 p-6'>
        <TbMoodSadDizzy className='h-30 w-30 text-slate-500' />

        <h1 className='text-app-default text-2xl'>Page not found</h1>

        <p className='text-app-default text-center text-sm'>
          Sorry, the page you are looking for could not be found.
        </p>

        <Button
          className='mt-8'
          icon={<IoMdArrowRoundBack className='h-5 w-5' />}
          onClick={handleGoHome}
        >
          Return home
        </Button>
      </div>
    </Page>
  )
}

export default Fallback
