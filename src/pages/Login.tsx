import LoginCard from '../components/loginCard/LoginCard'

const Login = () => {
  return (
    <div className='h-full bg-white flex justify-center items-center'>
      <div className=' space-y-7'>
        {/* <h1 className='text-3xl font-bold text-center text-slate-800'>Inicio de sesión</h1> */}
        <LoginCard />
      </div>
    </div>
  )
}

export default Login
