export const getAllDollars = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/dollar/dollars`,
      {
        method: 'GET',
        headers: { 'x-access-token': token }
      }
    )
    if (!response.ok) return null

    return response.json()
  } catch {
    return null
  }
}

export const getAllDollarsFromDepositOrder = async (
  id: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/dollar/dollars/${id}`,
      {
        method: 'GET',
        headers: { 'x-access-token': token }
      }
    )
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}
