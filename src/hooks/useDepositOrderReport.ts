import { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useParams } from 'react-router-dom'

import { IDepositOrderReport } from '../models/DepositOrderReport'

import { getAllDepositOrderBranchOfficeGivenAnId } from '../services/DepositOrderBranchOffice'
import { getOneDepositOrder } from '../services/DepositOrderService'
import { useLoginStore } from '../components/store/loginStore'
import { useDepositOrderStore } from '../components/store/depositOrderStore'
import { errorToast, succesToast } from '../services/toasts'
import { createDepositOrderReport } from '../services/DepositOrderReport'

export const useDepositOrderReport = () => {
  const { token } = useLoginStore()
  const [opened, { open, close }] = useDisclosure()
  const { setDepositBranchOffice, setDepositOrder } = useDepositOrderStore()

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

  const onSendDepositOrderReport = async (
    depositOrderData: IDepositOrderReport
  ) => {
    setIsLoading(() => true)
    const response = await createDepositOrderReport(token, depositOrderData)

    if (!response) {
      errorToast('Error al enviar el reporte')
      setIsLoading(false)
      return
    }
    close()
    succesToast('Reporte enviado correctamente')

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return {
    file,
    setFile,
    isLoading,
    setIsLoading,
    verifyDepositOrderReport,
    onSendDepositOrderReport,
    isReportValid,
    isSubmited,
    opened,
    open,
    close
  }
}
