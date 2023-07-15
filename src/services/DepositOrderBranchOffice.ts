export const getAllDepositOrderBranchOfficeGivenAnId = async (
  id: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/deposit-order-branch-office/deposit-order-branch-offices/${id}`,
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

export const getAllDepositOrderBranchOffices = async (token: string) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/deposit-order-branch-office/deposit-order-branch-offices`,
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
