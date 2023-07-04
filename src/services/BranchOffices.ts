import { IBranchModel } from "../models/BranchOffice"

export const getAllBranchOffices = async (token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/branch-office/branch-offices`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token
          }
        }
      )
  
      if (!response.ok) {
        return null
      }
  
      const data = await response.json()
      return data

    } catch {
      return null
    }
  }
  
  export const createBranchOffice = async (
    token: string,
    body: IBranchModel
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/branch-office/create-branch-office`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify(body)
        }
      )
  
      if (!response.ok) {
        return null
      }
  
      return response.json()

    } catch {
      console.log('Something went wrong')
      return null
    }
  }
  
  export const deleteBranchOffice = async (token: string, id: number) => {
    try{
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/branch-office/delete-branch-office/${id}`,
        {
          method: 'PUT',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        }
      )
    
      if (!response.ok) {
        return null
      }
    
      return response.json()
    }
    catch{
      console.log('Something went wrong')
      return null
    }
 
  }
  
  