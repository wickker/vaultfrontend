import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react'

const App = () => {
  return (
    <div>
      <div>Hello World</div>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default App
