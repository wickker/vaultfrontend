import { SignedOut, SignedIn } from '@clerk/react-router'
import Dashboard from './Dashboard'
import Login from './Login'

const Main = () => {
  return (
    <>
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  )
}

export default Main
