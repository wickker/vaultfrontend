import { ClerkProvider } from '@clerk/clerk-react'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Location,
} from 'react-router'
import { registerSW } from 'virtual:pwa-register'
import { AppError, AppLocation } from './@types/commons'
import Categories from './components/Categories'
import CategoryModal from './components/Categories/CatgeoryModal'
import { AuthRequired, Toast } from './components/commons'
import Fallback from './components/Fallback'
import Item from './components/Item'
import RecordModal from './components/Item/RecordModal'
import Main from './components/Main'
import ItemModal from './components/Main/Dashboard/ItemModal'
import Profile from './components/Profile'
import Config from './configs'
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

        <Route element={<AuthRequired />}>
          <Route path={`${ITEMS}/:id`} element={<Item />} />
          <Route path={PROFILE} element={<Profile />} />
          <Route path={CATEGORIES} element={<Categories />} />
        </Route>
      </Routes>

      {previousLocation && (
        <Routes>
          <Route element={<AuthRequired />}>
            <Route
              path={`${DASHBOARD}${RelativeRoute.MODAL}`}
              element={<ItemModal />}
            />
            <Route
              path={`${ITEMS}/:id/${RelativeRoute.MODAL}`}
              element={<RecordModal />}
            />
            <Route
              path={`${CATEGORIES}/${RelativeRoute.MODAL}`}
              element={<CategoryModal />}
            />
          </Route>
        </Routes>
      )}
    </>
  )
}

const App = () => {
  registerSW({ immediate: true })
  const { toast } = useToastContext()

  const handleError = (err: AxiosError<AppError> | Error) => {
    if ('response' in err) {
      toast.error(err.response?.data?.message || JSON.stringify(err))
      return
    }
    toast.error(err.message || JSON.stringify(err))
  }

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
    </div>
  )
}

export default App
