import { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useParams, useNavigate } from 'react-router-dom'

import { IDepositOrderReport } from '../models/DepositOrderReport'

import { getAllDepositOrderBranchOfficeGivenAnId } from '../services/DepositOrderBranchOffice'
import {
  getOneDepositOrder,
  updateStatusAndRevisionStatusAndReportURL
} from '../services/DepositOrder'
import { useLoginStore } from '../components/store/loginStore'
import { useDepositOrderStore } from '../components/store/depositOrderStore'
import { errorToast, succesToast } from '../services/toasts'
import { createDepositOrderReport } from '../services/DepositOrderReport'

import { useAmazonS3 } from './useAmazonS3'
import socket from '../services/SocketIOConnection'

export const useDepositOrderReport = () => {
  const s3 = useAmazonS3()
  const { token } = useLoginStore()
  const [opened, { open, close }] = useDisclosure()
  const [openedView, handlerDisclosureView] = useDisclosure()
  const { depositOrder, setDepositBranchOffice, setDepositOrder } =
    useDepositOrderStore()

  const { id } = useParams()
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [reportFile, setReportFile] = useState<File | null>(null)
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
    const r2Response = await s3.uploadDepositOrderReportFileOfTechoBol(
      file as File,
      `${depositOrder.orderNumber} DOCUMENTOS`
    )
    if (!r2Response.ok) {
      errorToast('Error al enviar el reporte')
      return
    }

    const r2ReportResponse =
      await s3.uploadGeneratedDepositOrderReportFileOfTechoBol(
        reportFile as File,
        `${depositOrder.orderNumber} REPORTE`
      )
    if (!r2ReportResponse.ok) {
      errorToast('Error al enviar el reporte')
      return
    }

    const depositOrderResponse = await createDepositOrderReport(token, depositOrderData)

    if (!depositOrderResponse) {
      errorToast('Error al enviar el reporte')
      setIsLoading(false)
      return
    }

    const body = {
      reportUrl: `${import.meta.env.VITE_PUBLIC_ACCESS_DOMAIN}/TECHOBOL/DEPOSIT_ORDER_DOCUMENTS/${depositOrder?.orderNumber} DOCUMENTOS.pdf`,
      generatedReportUrl: `${import.meta.env.VITE_PUBLIC_ACCESS_DOMAIN}/TECHOBOL/DEPOSIT_ORDER_REPORT/${depositOrder?.orderNumber} REPORTE.pdf`
    }

    const depositOrderStatusResponse =
      await updateStatusAndRevisionStatusAndReportURL(
        depositOrder.id as number,
        token,
        body
      )

    if (!depositOrderStatusResponse) {
      errorToast('Error al enviar el reporte')
      setIsLoading(false)
      return
    }

    close()
    succesToast('Reporte enviado correctamente')
    navigate('/techobol/deposit-order')
    socket.emit('updateDepositOrder', depositOrderStatusResponse)

    socket.emit('createMoneyCollections', depositOrderResponse.moneyCollections)
    socket.emit('createExpenses', depositOrderResponse.expenses)
    socket.emit('createDollars', depositOrderResponse.dollars)
    socket.emit('createEnvelopes', depositOrderResponse.envelopes)
    socket.emit('createDeposits', depositOrderResponse.deposits)

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
    setIsSubmited,
    opened,
    open,
    close,
    openedView,
    handlerDisclosureView,
    setIsReportValid,
    reportFile,
    setReportFile
  }
}
