import { ClerkProvider } from '@clerk/react-router'
import { BrowserRouter, Routes, Route } from 'react-router'
import Item from './components/Item'
import Main from './components/Main'
import Config from './configs'

if (!Config.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key')
}

const App = () => {
  return (
    <div className='app-font'>
      <BrowserRouter>
        <ClerkProvider
          publishableKey={Config.VITE_CLERK_PUBLISHABLE_KEY}
          afterSignOutUrl='/'
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
