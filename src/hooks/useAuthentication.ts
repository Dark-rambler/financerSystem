import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { errorToast, succesToast } from '../services/toasts'
import { useLoginStore } from '../components/store/loginStore'

const useAuthentication = () => {
  const navigate = useNavigate()
  const { setFullName, setRole, changeLogInState, setToken} = useLoginStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }
    const response = await fetch('http://localhost:8080/api/authentication/signIn', requestOptions)

    if (response.status !== 200){
      setIsLoading(false)
      errorToast('Email o contraseña incorrectos')
      return null
    }

    const data = await response.json()
    setFullName(`${data.name} ${data.lastName}`)
    setToken(data.token)
    setRole(data.role)
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