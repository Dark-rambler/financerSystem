import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'
import BlueButton from '../buttons/BlueButton'
import useAuthentication from '../../hooks/useAuthentication'

const LoginCard = () => {
  const authentication = useAuthentication()
  return (
    <div className=' space-y-8 w-[430px] shadow-lg   border-slate-300 rounded-xl bg-white p-8'>
             <h1 className=' text-3xl font-bold text-center text-slate-700'>Iniciar sesión</h1>
      <div className='space-y-6'>
        <EmailInput
          email={authentication.email}
          setEmail={authentication.setEmail}
        />
        <PasswordInput
          password={authentication.password}
          setPassword={authentication.setPassword}
        />
      </div>
      <div>
        <BlueButton
          label={'Iniciar sesión'}
          onClick={() =>
            authentication.signIn(authentication.email, authentication.password)
          }
          isLoading={authentication.isLoading}
          // isLoading={true}
        />
      </div>
    </div>
  )
}

export default LoginCard
