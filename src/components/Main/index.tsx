import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/react-router'
// import { FaCottonBureau } from 'react-icons/fa6'

const Main = () => {
  return (
    <>
      {/* <div className='bg-pink-400 p-5'>
        <div className='h-[512px] w-[512px] bg-white p-16'>
          <FaCottonBureau className='h-full w-full' />
        </div>
      </div>
      <br /> */}
      <div>Hello BLA</div>
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
