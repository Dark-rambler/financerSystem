export const getAllMoneyCollections = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/money-collection/money-collections`,
      { method: 'GET', headers: { 'x-access-token': token } }
    )
    if (!response.ok) return null

    return response.json()
  } catch {
    return null
  }
}

export const getAllMoneyCollectionsFromDepositOrder = async (
  id: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/money-collection/money-collections/${id}`,
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
