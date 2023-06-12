import { useEffect, useState } from 'react'
import Employee from '../models/employee'
import {useNavigate } from 'react-router-dom'

const useAuthentication = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, serRole] = useState('')

  const signIn = async (email: string, password: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }
    const response = await fetch('http://localhost:8080/api/authentication/signIn', requestOptions)

    if (response.status !== 200){
      return response
    }
   
    const data = await response.json()
    navigate('/deposit-order')
    console.log(data)

    return data
  }

  return { signIn, email, password, setEmail, setPassword }
}

export default useAuthentication