import { errorToast } from './toasts'

export const logInAuth = async (email: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/authentication/signIn`,
    requestOptions
  )

  if (response.status !== 200) {
    errorToast('Email o contraseña incorrectos')
    return null
  }

  const data = await response.json()
  return data
}
