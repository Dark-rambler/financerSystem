import { ISubAccount } from '../models/SubAccount'

export const getAllSubAccounts = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/sub-account/sub-accounts`,
      {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      }
    )
    if (!response.ok) return null

    return response.json()
  } catch {
    return null
  }
}

export const createSubAccount = async (token: string, body: ISubAccount) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/sub-account/create-sub-account`,
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

export const deleteSubAccount = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/sub-account/delete-sub-account/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      }
    )

    if (!response.ok) return null

    return response.json()
  } catch {
    return null
  }
}
