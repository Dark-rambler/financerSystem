import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'
import BlueButton from '../buttons/BlueButton'
import useAuthentication from '../../hooks/useAuthentication'

const LoginCard = () => {
  const authentication = useAuthentication()
  return (
    <div className='space-y-8 w-[430px] border border-slate-200 rounded-md bg-white p-8'>
      <div className='space-y-6'>
        <EmailInput email={authentication.email} setEmail={authentication.setEmail}/>
        <PasswordInput password={authentication.password} setPassword={authentication.setPassword}/>
      </div>
      <div>
        <BlueButton label={'Iniciar sesión'} onClick={() => authentication.signIn(authentication.email, authentication.password)}/>
      </div>
    </div>
  )
}

export default LoginCard
