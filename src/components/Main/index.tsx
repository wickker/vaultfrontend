import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/react-router'
// import { FaCottonBureau } from 'react-icons/fa6'

const Main = () => {
  return (
    <>
      {/* <div className='bg-[#e6e6e6] p-16 h-[512px] w-[512px]'>
        <FaCottonBureau className='h-full w-full' />
      </div>
      <br /> */}
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <button>Custom sign out button</button>
        </SignOutButton>
      </SignedIn>
    </>
  )
}

export default Main
