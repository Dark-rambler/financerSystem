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
