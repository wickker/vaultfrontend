import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/react-router'

const Main = () => {
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <button>Custom sign out button</button>
        </SignOutButton>
      </SignedIn>
    </>
  )
}

export default Main
