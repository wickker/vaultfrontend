import { SignedIn, SignedOut, SignIn } from '@clerk/react-router'
import { Page } from '@/components/commons'

const Main = () => {
  return (
    <Page>
      <SignedOut>
        <div className='flex h-full w-full items-center justify-center'>
          <SignIn />
          {/* TODO: Style button and input */}
        </div>
      </SignedOut>

      <SignedIn>
        <div className='flex h-full w-full justify-center p-4'></div>
      </SignedIn>
    </Page>
  )
}

export default Main
