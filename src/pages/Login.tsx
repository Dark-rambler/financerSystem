import LoginCard from '../components/loginCard/LoginCard'

const Login = () => {
  return (
    <div className='bg-s-100 h-[calc(100%-64px)] pt-36 flex justify-center'>
      <div className=' space-y-7'>
        {/* <h1 className='text-3xl font-bold text-center text-gray-800'>Inicio de sesión</h1> */}
        <LoginCard />
      </div>
    </div>
  )
}

export default Login
