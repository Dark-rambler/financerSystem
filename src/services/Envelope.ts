export const getAllEnvelopes = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/envelope/envelopes`,
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

export const getAllEnvelopesFromDepositOrder = async (id: number, token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/envelope/envelopes/${id}`,
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
