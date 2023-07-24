export const getAllExpenses = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/expense/expenses`,
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

export const getAllExpensesFromDepositOrder = async (
  id: number,
  token: string
) => {
  try {
    const response = await fetch(
      ` ${import.meta.env.VITE_API_DOMAIN}/expense/expenses/${id}`,
      {
        method: 'GET',
        headers: { 'x-access-token': token }
      }
    )
    if(!response.ok) return null

    return response.json()
  } catch {
    return null
  }
}
