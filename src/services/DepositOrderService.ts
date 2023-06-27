export const getAllDepositOrders = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/deposit-order/deposit-orders`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      }
    )

    if (response.status !== 200) {
      return null
    }
    const data = await response.json()
    return data
  } catch {
    return null
  }
}

