export const getAllDeposits = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/deposit/deposits`,
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

export const getAllDepositsFromDepositOrder = async (
  id: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/deposit/deposits/${id}`,
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
