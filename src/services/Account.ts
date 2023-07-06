import { IAccount } from '../models/Account'

export const getAllAccounts = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/account/accounts`,
      {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      }
    )

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch {
    return null
  }
}

export const createAccount = async (token: string, body: IAccount) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/account/create-account`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(body)
      }
    )

    if (!response.ok) return null

    return response.json()
  } catch {
    return null
  }
}

export const deleteAccount = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/account/delete-account/${id}`,
      {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) return null

    return response.json()
  } catch {
    return null
  }
}
