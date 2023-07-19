import { IDepositOrderReport } from '../models/DepositOrderReport'

export const createDepositOrderReport = async (
  token: string,
  body: IDepositOrderReport
) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/deposit-order-report/create-deposit-order-report`,
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
