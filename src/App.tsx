import { ClerkProvider } from '@clerk/clerk-react'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router'
import { registerSW } from 'virtual:pwa-register'
import { Toast } from './components/commons'
import Item from './components/Item'
import Main from './components/Main'
import Profile from './components/Profile'
import Config from './configs'
import ToastProvider from './contextProviders/toast'
import { Route as R } from './utils/constants/enums'

if (!Config.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key')
}

const App = () => {
  registerSW({ immediate: true })

  // TODO: Change this
  const handleError = (err: Error) =>
    console.log(err.message || JSON.stringify(err))

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
              afterSignOutUrl='/'
            >
              <Routes>
                <Route path={R.DASHBOARD} element={<Main />} />
                <Route path={R.ITEM} element={<Item />} />
                <Route path={R.PROFILE} element={<Profile />} />
              </Routes>
            </ClerkProvider>
          </BrowserRouter>
        </QueryClientProvider>
        <Toast />
      </ToastProvider>
    </div>
  )
}

export default App
