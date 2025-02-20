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
import Categories from './components/Categories'
import { AuthGuard, Toast } from './components/commons'
import Fallback from './components/Fallback'
import Item from './components/Item'
import RecordModal from './components/Item/RecordModal'
import Main from './components/Main'
import ItemModal from './components/Main/Dashboard/ItemModal'
import Profile from './components/Profile'
import Config from './configs'
import ToastProvider from './contexts/useToastContext'
import { useToastContext } from './contexts/useToastContext/context'
import { Route as AppRoute, RelativeRoute } from './utils/constants/enums'

const AppRoutes = () => {
  const location: Location<AppLocation> = useLocation()
  const previousLocation = location.state?.previousLocation
  const { DASHBOARD, ITEMS, PROFILE, CATEGORIES } = AppRoute

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path={DASHBOARD} element={<Main />} />
        <Route path='*' element={<Fallback />} />
        <Route
          path={`${ITEMS}/:id`}
          element={
            <AuthGuard>
              <Item />
            </AuthGuard>
          }
        />
        <Route
          path={PROFILE}
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
        <Route
          path={CATEGORIES}
          element={
            <AuthGuard>
              <Categories />
            </AuthGuard>
          }
        />
      </Routes>

      {previousLocation && (
        <Routes>
          <Route
            path={`${DASHBOARD}${RelativeRoute.MODAL}`}
            element={
              <AuthGuard>
                <ItemModal />
              </AuthGuard>
            }
          />
          <Route
            path={`${ITEMS}/:id/${RelativeRoute.MODAL}`}
            element={
              <AuthGuard>
                <RecordModal />
              </AuthGuard>
            }
          />
        </Routes>
      )}
    </>
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
            <ClerkProvider
              publishableKey={Config.VITE_CLERK_PUBLISHABLE_KEY}
              afterSignOutUrl={AppRoute.DASHBOARD}
            >
              <AppRoutes />
            </ClerkProvider>
          </BrowserRouter>
        </QueryClientProvider>
        <Toast />
      </ToastProvider>
    </div>
  )
}

export default App
