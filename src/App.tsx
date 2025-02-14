import { ClerkProvider } from '@clerk/clerk-react'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Location,
} from 'react-router'
import { registerSW } from 'virtual:pwa-register'
import { AppLocation } from './@types/commons'
import { Toast } from './components/commons'
import Fallback from './components/Fallback'
import Item from './components/Item'
import Main from './components/Main'
import ItemModal from './components/Main/Dashboard/ItemModal'
import Profile from './components/Profile'
import Config from './configs'
import ToastProvider from './contexts/useToastContext'
import { useToastContext } from './contexts/useToastContext/context'
import { Route as AppRoute, RelativeRoute } from './utils/constants/enums'

const ClerkAndRoutes = () => {
  const location: Location<AppLocation> = useLocation()
  const previousLocation = location.state?.previousLocation
  const { DASHBOARD, ITEM, PROFILE } = AppRoute

  return (
    <ClerkProvider
      publishableKey={Config.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl={DASHBOARD}
    >
      <Routes location={previousLocation || location}>
        <Route path={DASHBOARD} element={<Main />} />
        <Route path={ITEM} element={<Item />}></Route>
        <Route path={PROFILE} element={<Profile />} />
        <Route path='*' element={<Fallback />} />
      </Routes>

      {previousLocation && (
        <Routes>
          <Route
            path={`${DASHBOARD}${RelativeRoute.MODAL}`}
            element={<ItemModal />}
          />
        </Routes>
      )}
    </ClerkProvider>
  )
}

const App = () => {
  registerSW({ immediate: true })
  const { toast } = useToastContext()

  const handleError = (err: Error) =>
    toast.error(err.message || JSON.stringify(err))

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
  })

  return (
    <div className='font-noto-sans'>
      <ToastProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <ClerkAndRoutes />
          </BrowserRouter>
        </QueryClientProvider>
        <Toast />
      </ToastProvider>
    </div>
  )
}

export default App
