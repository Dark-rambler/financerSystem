import { useState } from 'react'

export const useDepositOrderReport = () => {
  const [file, setFile] = useState<File | null>(null)
   const [isLoading, setIsLoading] = useState<boolean>(false)
   


  return { file, setFile, isLoading, setIsLoading }
}
