import { useAuth } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router'
import { Route } from '@/utils/constants/enums'

const AuthRequired = () => {
  const { isLoaded, isSignedIn } = useAuth()

  if (isLoaded && !isSignedIn) {
    return <Navigate to={Route.DASHBOARD} replace />
  }

  return <Outlet />
}

export default AuthRequired
