import { useEffect } from 'react'
import { Table, Button, Group, Text, ActionIcon } from '@mantine/core'
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone'
import { TbFileUpload, TbFileCheck, TbFileX } from 'react-icons/tb'
import {
  BsFillFileEarmarkPdfFill,
  BsCheckCircleFill,
  BsXCircleFill
} from 'react-icons/bs'
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

import BranchOfficePopover from '../../components/popovers/BranchOfficePopover'
import BranchOfficeAmountPopover from '../../components/popovers/BranchOfficeAmountPopover'
import ViewIsReportCorrectModal from '../../components/modals/ViewIsReportCorrect'

import ExpenseTable from '../../components/table/techobol/ExpenseTable'
import MoneyCollectionTable from '../../components/table/techobol/MoneyCollectionTable'
import DepositTable from '../../components/table/techobol/DepositTable'
import EnvelopeTable from '../../components/table/techobol/EnvelopeTable'
import DollarTable from '../../components/table/techobol/DollarTable'

const CreateDepositOrderReport = () => {
  const depositOrderReport = useDepositOrderReport()
  const { depositOrder, depositBranchOffice } = useDepositOrderStore()
  const navigate = useNavigate()

  const moneyCollection = useMoneyCollection()
  const deposit = useDeposit()
  const expense = useExpense()
  const envelope = useEnvelope()
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
    if (depositOrder.status?.toUpperCase() !== Status.EMITTED) navigate('/techobol/deposit-order')
    setBranchOffices()
  }, [depositBranchOffice])

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

  return (
    <div className='px-16 py-12 space-y-16'>
      <section className='space-y-7'>
        <h1 className='text-center text-md font-bold'>
          INFORME ORDEN DE DEPOSITO
        </h1>
        <div className='w-full rounded-md border border-gray-300 '>
          <Table verticalSpacing={'sm'}>
            <thead className='bg-slate-200'>
              <tr>
                <th>Nº de orden</th>
                <th>Fecha de orden</th>
                <th>Regional</th>
                <th>Administrador</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Monto</th>
                <th>Fecha limite</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{depositOrder.orderNumber}</td>
                <td>
                  {new Date(depositOrder.solitudeDate).toLocaleDateString()}
                </td>
                <td className='flex items-center space-x-1'>
                  <p> {depositOrder.regional?.name} </p>
                  <BranchOfficePopover />{' '}
                </td>
                <td>
                  {depositOrder.employee?.name}{' '}
                  {depositOrder.employee?.lastName}
                </td>
                <td>{new Date(depositOrder.startDate).toLocaleDateString()}</td>
                <td>{new Date(depositOrder.endDate).toLocaleDateString()}</td>
                <td className='flex items-center space-x-1'>
                  <p> {Number(depositOrder.amount).toFixed(2)} Bs. </p>
                  <BranchOfficeAmountPopover />{' '}
                </td>
                <td>
                  {new Date(depositOrder.deliveryDate).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
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
        <MoneyCollectionTable moneyCollection={moneyCollection} />
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

        <ExpenseTable expense={expense} />
        {/* </div> */}
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
        <DollarTable dollar={dollar} />
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
        <EnvelopeTable envelope={envelope} />
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
        <DepositTable deposit={deposit} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <h1 className='font-bold'>Documento</h1>
          </div>
        </div>
        <Dropzone
          onDrop={files => {
            depositOrderReport.setFile(files[0])
          }}
          onReject={files => {
            console.log(files)
            depositOrderReport.setFile(null)
          }}
          className={`${
            depositOrderReport.isSubmited && !depositOrderReport.file
              ? 'border-red-500'
              : ''
          }`}
          maxSize={50 * 1024 ** 2}
          accept={PDF_MIME_TYPE}
          maxFiles={1}
        >
          <Group
            position='center'
            spacing='xl'
            style={{ minHeight: '110px', pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <TbFileCheck size={50} color={'#2563eb'} className={'stroke-1'} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <TbFileX size={50} color={'#dc2626'} className={'stroke-1'} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              {depositOrderReport.file ? (
                <>
                  <BsFillFileEarmarkPdfFill size={40} color={'#dc2626'} />
                </>
              ) : (
                <TbFileUpload
                  size={50}
                  color={
                    depositOrderReport.isSubmited && !depositOrderReport.file
                      ? '#dc2626'
                      : '#374151'
                  }
                  className={'stroke-1'}
                />
              )}
            </Dropzone.Idle>

            {depositOrderReport.file ? (
              <div>
                <Text size='xl' inline>
                  {depositOrderReport.file.name}
                </Text>
                <Text size='sm' color='dimmed' inline mt={7}>
                  {Number(depositOrderReport.file.size / 1024 / 1024).toFixed(
                    3
                  )}{' '}
                  MB
                </Text>
              </div>
            ) : (
              <div>
                <Text
                  size='xl'
                  inline
                  color={
                    depositOrderReport.isSubmited && !depositOrderReport.file
                      ? '#dc2626'
                      : '#171717'
                  }
                >
                  Arrastre el documento aqui o haga click para seleccionar
                </Text>
                <Text size='sm' color='dimmed' inline mt={7}>
                  Solo se permite un documento en formato PDF, el documento no
                  debe exceder los 50 mb.
                </Text>
              </div>
            )}
          </Group>
        </Dropzone>
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
          onClick={() => {
            depositOrderReport.setIsSubmited(true)
            if (!depositOrderReport.file) return
            depositOrderReport.open()
          }}
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
