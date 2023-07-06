import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TbArrowNarrowRight } from 'react-icons/tb'

import PasswordInput from '../components/inputs/PasswordInput'
import { validateToken as ValidateTokenBackend } from '../services/AuthenticationService'
import { Button } from '@mantine/core'
import { errorToast, succesToast } from '../services/toasts'
import { changePassword } from '../services/EmployeeService'

const SetPassword = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmNewPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

  const [isTokenValid, setIsTokenValid] = useState<boolean>(false)

  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false)

  const { token } = useParams()

  useEffect(() => {
    validatePassword()
  }, [password, confirmPassword])

  useEffect(() => {
    validateToken()
  }, [])

  const validateToken = async () => {
    const status = await ValidateTokenBackend(token as string)
    if (!status) {
      setIsTokenValid(false)
      navigate('/set-password-error')
      return
    }
    setIsTokenValid(true)
  }

  const handleCreatePasswordClick = async () => {
    setIsLoading(true)
    const response = await changePassword(token as string, {
      password,
      newPassword: confirmPassword
    })

    if (!response) {
      errorToast('No se pudo cambiar la contraseña')
      setIsLoading(false)
      return null
    }

    succesToast('Contraseña cambiada con éxito')
    setIsLoading(false)
    setIsPasswordChanged(true)
    setPassword('')
    setConfirmNewPassword('')
    setIsPasswordValid(false)
  }

  const validatePassword = () => {
    if (
      password === confirmPassword &&
      password.length >= 8 &&
      password.match(/[A-Z]/g) &&
      password.match(/[a-z]/g) &&
      password.match(/[0-9]/g)
    )
      setIsPasswordValid(true)
    else setIsPasswordValid(false)
  }

  return (
    <>
      {isTokenValid ? (
        <div className=' pt-36 flex h-full justify-center'>
          <form
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            {isPasswordChanged ? (
              <div className='space-y-4 text-center'>
                <h1 className=' text-2xl text-center'>
                  Contraseña creada con éxito, ahora puedes iniciar sesión
                </h1>

                <Button
                  className='bg-blue-500 hover:bg-blue-600'
                  rightIcon={<TbArrowNarrowRight />}
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  Ir al inicio de sesión
                </Button>
              </div>
            ) : (
              <div className=' space-y-5 w-[430px] border-slate-300 rounded-xl bg-white p-8'>
                <div className='space-y-4'>
                  <h1 className=' text-3xl font-bold text-center text-slate-700'>
                    Crear contraseña
                  </h1>
                  <p className='text-center text-sm'>
                    La contraseña debe tener al menos 8 caracteres, una
                    mayúscula, una minúscula y un número
                  </p>
                </div>

                <div className='space-y-6'>
                  <PasswordInput
                    password={password}
                    setPassword={setPassword}
                  />
                  <PasswordInput
                    label='Confirmar contraseña'
                    password={confirmPassword}
                    setPassword={setConfirmNewPassword}
                  />
                </div>
                <div>
                  <Button
                    disabled={!isPasswordValid}
                    type='submit'
                    loading={isLoading}
                    className='w-full bg-blue-600 hover:bg-blue-700 transition-all'
                    onClick={handleCreatePasswordClick}
                  >
                    Crear contraseña
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <>
          <div className='bg-gray-100'></div>
        </>
      )}
    </>
  )
}

export default SetPassword
