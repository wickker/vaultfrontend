import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/react-router'
import { Page } from '@/components/commons'

const Main = () => {
  return (
    <Page>
      <SignedOut>
        <div className='flex h-full w-full justify-center items-center'>
          <SignIn />
          {/* TODO: Style button and input */}
        </div>
      </SignedOut>

      <SignedIn>
        <SignOutButton>
          <button>SIGN OUT</button>
        </SignOutButton>
      </SignedIn>
    </Page>
  )
}

export default Main
