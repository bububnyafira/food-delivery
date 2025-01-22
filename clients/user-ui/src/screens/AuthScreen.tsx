import Login from '@/src/components/Login'

const AuthScreen = () => {
  return (
    <div className='w-full fixed top-0 h-screen z-50 flex items-center justify-center bg-[#00000027]'>
        <div className='w-[50%] h-[500px]'>
            <Login />
        </div>
    </div>
  )
}

export default AuthScreen