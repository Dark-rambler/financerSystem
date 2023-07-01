import EmployeeInterface from '../models/Employee'

export const getAllEmployeesWithRoles = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/employee/employees`,
      {
        method: 'GET',
        headers: {
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

export const createEmployee = async (
  token: string,
  body: EmployeeInterface
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/employee/create-employee`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(body)
      }
    )

    if (response.status !== 201) {
      return null
    }

    return response.json()
  } catch {
    console.log('Something went wrong')
    return null
  }
}

export const deleteEmployee = async (token: string, id: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/employee/delete-employee/${id}`,
    {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    }
  )

  if (response.status !== 200) {
    return null
  }

  return response.json()
}


export const changePassword = async (token: string, body: {password: string, newPassword: string}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/authentication/change-password/${token}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  )

  if (response.status !== 200) {
    return null
  }

  return response.json()
}