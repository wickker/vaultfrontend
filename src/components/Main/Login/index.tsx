import { SignIn } from '@clerk/react-router'

const Login = () => {
  return (
    <div className='flex h-[100dvh] w-full justify-center'>
      <div className='flex h-full w-md max-w-md items-center justify-center'>
        <SignIn />
        {/* TODO: Style button and input */}
      </div>
    </div>
  )
}

export default Login
