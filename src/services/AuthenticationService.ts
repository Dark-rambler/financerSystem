import { errorToast } from './toasts'

export const logInAuth = async (email: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    setTimeout: 10000
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/authentication/signIn`,
    requestOptions
  )

  if (!response.ok) {
    errorToast('Email o contraseña incorrectos')
    return null
  }

  const data = await response.json()
  return data
}

export const validateToken = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/authentication/validateToken`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      }
    )

    if (!response.ok) {
      return null
    }
    return true
  } catch {
    return null
  }
}
