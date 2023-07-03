import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { succesToast } from '../services/toasts'
import { useLoginStore } from '../components/store/loginStore'
import { logInAuth } from '../services/AuthenticationService'

const useAuthentication = () => {
  const navigate = useNavigate()
  const { setFullName, setRole, changeLogInState, setToken } = useLoginStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    const user = await logInAuth(email, password)

    if (!user) {
      setIsLoading(false)
      return null
    }

    setFullName(`${user.name} ${user.lastName}`)
    setToken(user.token)
    setRole(user.role)
    changeLogInState()

    navigate('/techobol/deposit-order')

    succesToast('Bienvenido')
    setIsLoading(false)
  }

  const logOut = () => {
    setFullName('')
    setRole('')
    changeLogInState()
    navigate('/login')
  }

  return { signIn, email, password, setEmail, setPassword, isLoading, logOut }
}

export default useAuthentication
