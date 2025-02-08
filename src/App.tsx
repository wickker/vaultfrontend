import { ClerkProvider } from '@clerk/react-router'
import { BrowserRouter, Routes, Route } from 'react-router'
import { registerSW } from 'virtual:pwa-register'
import Item from './components/Item'
import Main from './components/Main'
import Profile from './components/Profile'
import Config from './configs'
import { Route as R } from './utils/constants/enums'

if (!Config.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key')
}

const App = () => {
  registerSW({ immediate: true })

  return (
    <div className='font-noto-sans'>
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
    </div>
  )
}

export default App
