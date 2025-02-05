import { ClerkProvider } from '@clerk/react-router'
import { BrowserRouter, Routes, Route } from 'react-router'
import { registerSW } from 'virtual:pwa-register'
import Item from './components/Item'
import Main from './components/Main'
import Config from './configs'

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
          // signInUrl='/'
          // signUpUrl='/'
        >
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/item' element={<Item />} />
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
