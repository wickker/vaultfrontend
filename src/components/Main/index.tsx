import { SignedIn, SignedOut, SignIn } from '@clerk/react-router'
import { Button, Page } from '@/components/commons'

const Main = () => {
  return (
    <>
      <SignedOut>
        <div className='flex h-[100dvh] w-full justify-center'>
          <div className='flex h-full w-md max-w-md items-center justify-center'>
            <SignIn />
            {/* TODO: Style button and input */}
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <Page>
          <div className='h-full w-full bg-app-background p-4'>
            <Button>Test</Button>
          </div>
        </Page>
      </SignedIn>
    </>
  )
}

export default Main
