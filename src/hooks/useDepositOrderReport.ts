import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getAllDepositOrderBranchOfficeGivenAnId } from '../services/DepositOrderBranchOffice'
import { getOneDepositOrder } from '../services/DepositOrderService'
import { useLoginStore } from '../components/store/loginStore'
import { useDepositOrderStore } from '../components/store/depositOrderStore'
import { errorToast } from '../services/toasts'

export const useDepositOrderReport = () => {
  const { token } = useLoginStore()
  const { setDepositBranchOffice, setDepositOrder } = useDepositOrderStore()
  // const []

  const { id } = useParams()

  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isReportValid, setIsReportValid] = useState<boolean>(false)
  const [isSubmited, setIsSubmited] = useState<boolean>(false)

  const getBranchOfficesAndAmounts = async () => {
    const response = await getAllDepositOrderBranchOfficeGivenAnId(
      Number(id),
      token
    )
    setDepositBranchOffice(response)
  }

  const verifyDepositOrderReport = () => {
    setIsSubmited(true)
  }

  const getDepositOrder = async () => {
    const response = await getOneDepositOrder(Number(id), token)

    if (!response) {
      errorToast('Error al cargar los datos')
      return
    }

    setDepositOrder(response)
  }

  useEffect(() => {
    getDepositOrder()
    getBranchOfficesAndAmounts()
  }, [])

  return {
    file,
    setFile,
    isLoading,
    setIsLoading,
    verifyDepositOrderReport,
    isReportValid,
    isSubmited
  }
}
