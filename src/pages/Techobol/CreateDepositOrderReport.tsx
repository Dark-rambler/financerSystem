import { useEffect } from 'react'
import { Button, ActionIcon } from '@mantine/core'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import Status from '../../enums/Status'

import { useDepositOrderStore } from '../../components/store/depositOrderStore'
import { useExpense } from '../../hooks/useExpense'
import { useDeposit } from '../../hooks/useDeposit'
import { useEnvelope } from '../../hooks/useEnvelope'
import { useMoneyCollection } from '../../hooks/useMoneyCollection'
import { useDollar } from '../../hooks/useDollar'
import { useDepositOrderReport } from '../../hooks/useDepositOrderReport'

import DepositModal from '../../components/modals/DepositModal'
import MoneyCollectionModal from '../../components/modals/MoneyCollectionModal'
import ExpenseModal from '../../components/modals/ExpenseModal'
import EnvelopeModal from '../../components/modals/EnvelopeModal'
import DollarModal from '../../components/modals/DollarModal'
import ConfirmModal from '../../components/modals/ConfirmModal'
import ViewIsReportCorrectModal from '../../components/modals/ViewIsReportCorrect'

import DropzonePDFFile from '../../components/dropzone/DropzonePDFFile'
import ReturnButton from '../../components/buttons/depositOrder/ReturnButton'

import ExpenseTable from '../../components/table/techobol/ExpenseTable'
import MoneyCollectionTable from '../../components/table/techobol/MoneyCollectionTable'
import DepositTable from '../../components/table/techobol/DepositTable'
import EnvelopeTable from '../../components/table/techobol/EnvelopeTable'
import DollarTable from '../../components/table/techobol/DollarTable'
import SingleDepositOrderTable from '../../components/table/techobol/SingleDepositOrderTable'
import { generateReportPDF } from '../../components/pdf/PDFReport'
import { useRealTimeDate } from '../../hooks/useRealTimeDate'

const CreateDepositOrderReport = () => {
  const depositOrderReport = useDepositOrderReport()
  const { depositOrder, depositBranchOffice } = useDepositOrderStore()
  const realTimeDate = useRealTimeDate()
  const navigate = useNavigate()

  const moneyCollection = useMoneyCollection()
  const deposit = useDeposit()
  const expense = useExpense(false)
  const envelope = useEnvelope(false)
  const dollar = useDollar()

  const setBranchOffices = () => {
    if (!depositBranchOffice) return

    const branchOffices = depositBranchOffice.map(element => ({
      label: element.branchOffice?.name as string,
      value: element.branchOffice?.id?.toString() as string
    }))

    moneyCollection.setBranchOffices(branchOffices)
    expense.setBranchOffices(branchOffices)
    envelope.setBranchOffices(branchOffices)
    dollar.setBranchOffices(branchOffices)
  }

  useEffect(() => {
    if (depositOrder.status?.toUpperCase() !== Status.EMITTED)
      navigate('/techobol/deposit-order')
    setBranchOffices()
  }, [depositBranchOffice])

  useEffect(() => {
    moneyCollection.setCurrentDate(realTimeDate)
    expense.setCurrentDate(realTimeDate)
    envelope.setCurrentDate(realTimeDate)
    dollar.setCurrentDate(realTimeDate)
    deposit.setCurrentDate(realTimeDate)
  }, [realTimeDate])

  useEffect(() => {
    const isReportValid =
      moneyCollection.totalAmount +
        dollar.totalAmountBs +
        expense.totalAmount -
        envelope.totalAmount ===
        depositOrder.amount &&
      deposit.totalAmount === moneyCollection.totalAmount

    depositOrderReport.setIsReportValid(isReportValid)
  }, [
    moneyCollection.totalAmount,
    deposit.totalAmount,
    expense.totalAmount,
    envelope.totalAmount,
    dollar.totalAmount,
    depositOrder.amount
  ])

  const handleSendDepositOrderReport = async () => {
    depositOrderReport.setIsSubmited(true)
    const file = generateReportPDF({
      moneyCollection,
      deposit,
      expense,
      envelope,
      dollar
    })
    depositOrderReport.setReportFile(() => file)

    if (!depositOrderReport.file || !depositOrderReport.reportFile) return
    depositOrderReport.open()
  }

  return (
    <div className='px-16 py-12 space-y-16'>
      <section className='space-y-7'>
        <div className='flex justify-between'>
          <ReturnButton onClick={() => navigate('/techobol/deposit-order')} />
          <h1 className='text-center text-md font-bold'>
            INFORME ORDEN DE DEPOSITO
          </h1>
          <div></div>
        </div>
        <SingleDepositOrderTable />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-green-500 rounded-sm'></div>
            <h1 className='font-bold'>Recaudaciones</h1>
          </div>
          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={moneyCollection.moneyCollectionOpenedHandler.open}
          >
            +
          </Button>
        </div>
        <MoneyCollectionTable
          moneyCollection={moneyCollection}
          isReadonly={false}
        />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
            <h1 className='font-bold'>Salidas</h1>
          </div>
          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={expense.expenseOpenedHandler.open}
          >
            +
          </Button>
        </div>
        <ExpenseTable expense={expense} isReadonly={false} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
            <h1 className='font-bold'>Dólares</h1>
          </div>

          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={dollar.modalHandler.open}
          >
            +
          </Button>
        </div>
        <DollarTable dollar={dollar} isReadonly={false} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
            <h1 className='font-bold'>Sobres</h1>
          </div>

          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={envelope.modalHandler.open}
          >
            +
          </Button>
        </div>
        <EnvelopeTable envelope={envelope} isReadonly={false} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-blue-500 rounded-sm'></div>
            <h1 className='font-bold'>Depósitos</h1>
          </div>

          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={deposit.modalHandler.open}
          >
            +
          </Button>
        </div>
        <DepositTable deposit={deposit} isReadonly={false} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <h1 className='font-bold'>Documento</h1>
          </div>
        </div>
        <DropzonePDFFile depositOrderReport={depositOrderReport} />
        {depositOrderReport.isSubmited && !depositOrderReport.file ? (
          <p className='text-red-600'>Este campo es obligatorio</p>
        ) : null}
      </section>

      <section className='flex justify-end space-x-2'>
        <ActionIcon
          onClick={depositOrderReport.handlerDisclosureView.open}
          className={`${
            depositOrderReport.isReportValid
              ? 'bg-emerald-200 hover:bg-emerald-300'
              : 'bg-red-200 hover:bg-red-300'
          } w-9 p-0 h-9`}
        >
          {depositOrderReport.isReportValid ? (
            <BsCheckCircleFill color={'#22c55e'} size={'19px'} />
          ) : (
            <BsXCircleFill color={'#ef4444'} size={'19px'} />
          )}
        </ActionIcon>
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          onClick={handleSendDepositOrderReport}
        >
          Enviar informe
        </Button>
      </section>

      <MoneyCollectionModal
        opened={moneyCollection.moneyCollectionOpened}
        close={moneyCollection.onClose}
        moneyCollection={moneyCollection}
      />
      <ExpenseModal
        opened={expense.expenseOpened}
        close={expense.onClose}
        expense={expense}
      />
      <DepositModal
        opened={deposit.opened}
        close={deposit.onClose}
        deposit={deposit}
      />
      <EnvelopeModal
        opened={envelope.opened}
        close={envelope.onClose}
        envelope={envelope}
      />
      <DollarModal
        opened={dollar.opened}
        close={dollar.onClose}
        dollar={dollar}
      />
      <ConfirmModal
        opened={depositOrderReport.opened}
        close={depositOrderReport.close}
        title={'Enviar reporte de orden de depósito'}
        description={
          depositOrderReport.isReportValid
            ? 'El reporte parece correcto. ¿Desea enviarlo ahora?'
            : 'El reporte no coincide. ¿Desea enviarlo de todos modos?'
        }
        buttonText='Enviar'
        primaryColor={depositOrderReport.isReportValid ? 'blue' : 'red'}
        onClick={() => {
          const depositData = deposit.getFormattedDeposits()
          const envelopeData = envelope.getFormattedEnvelopes()
          const moneyCollentionData =
            moneyCollection.getFormattedMoneyCollections()
          const expenseData = expense.getFormattedExpenses()
          const dollarData = dollar.getFormattedDollars()

          const depositOrderReportData = {
            depositOrderId: Number(depositOrder.id),
            moneyCollections: moneyCollentionData,
            expenses: expenseData,
            envelopes: envelopeData,
            dollars: dollarData,
            deposits: depositData
          }
          depositOrderReport.onSendDepositOrderReport(depositOrderReportData)
        }}
        isLoading={depositOrderReport.isLoading}
      />
      <ViewIsReportCorrectModal
        opened={depositOrderReport.openedView}
        close={depositOrderReport.handlerDisclosureView.close}
        depositOrderAmount={depositOrder.amount}
        moneyCollectionAmount={moneyCollection.totalAmount}
        dollarAmount={dollar.totalAmountBs}
        envelopeAmount={envelope.totalAmount}
        expenseAnount={expense.totalAmount}
        depositAmount={deposit.totalAmount}
      />
    </div>
  )
}

export default CreateDepositOrderReport
