import { DepositOrderInterface } from '../models/DepositOrder'

interface deposiOrderBranchOfficeBody {
  branchOfficeId: string
  amount: number
}

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

export const createDepositOrder = async (
  depositOrderBody: DepositOrderInterface,
  deposiOrderBranchOfficeBody: deposiOrderBranchOfficeBody[],
  token: string
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/deposit-order/create-deposit-order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({ depositOrderBody, deposiOrderBranchOfficeBody })
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

export const getOneDepositOrder = async (id: number, token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/deposit-order/deposit-order/${id}`,
      {
        method: 'GET',
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

export const updateStatusAndRevisionStatusAndReportURL = async (
  id: number,
  token: string,
  body: {
    reportUrl: string
    generatedReportUrl: string
  }
) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/deposit-order/update-status-report/${id}`,
      {
        method: 'PUT',
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

export const updateRevisionStatus = async (
  revisionStatus: string,
  id: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/deposit-order/update-revision-status/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({ revisionStatus })
      }
    )

    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}
