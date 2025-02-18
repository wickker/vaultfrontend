import { PropsWithChildren, useEffect } from 'react'
import { SignedIn, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'
import { Route } from '@/utils/constants/enums'

const AuthGuard = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate(Route.DASHBOARD)
  }, [isSignedIn, navigate, isLoaded])

  return <SignedIn>{children}</SignedIn>
}

export default AuthGuard
