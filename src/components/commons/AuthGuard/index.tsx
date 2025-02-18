import { PropsWithChildren, useEffect } from 'react'
import { SignedIn, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'
import { Route } from '@/utils/constants/enums'

const AuthGuard = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn) navigate(Route.DASHBOARD)
  }, [isSignedIn, navigate])

  return <SignedIn>{children}</SignedIn>
}

export default AuthGuard
