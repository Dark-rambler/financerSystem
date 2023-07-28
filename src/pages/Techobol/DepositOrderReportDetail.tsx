import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Divider } from '@mantine/core'

import ViewDocument from '../../components/buttons/depositOrder/ViewDocument'
import { useDepositOrderStore } from '../../components/store/depositOrderStore'
import { useMoneyCollection } from '../../hooks/useMoneyCollection'
import { useExpense } from '../../hooks/useExpense'
import { useDollar } from '../../hooks/useDollar'
import { useEnvelope } from '../../hooks/useEnvelope'
import { useDeposit } from '../../hooks/useDeposit'

import MoneyCollectionTable from '../../components/table/techobol/MoneyCollectionTable'
import ExpenseTable from '../../components/table/techobol/ExpenseTable'
import DollarTable from '../../components/table/techobol/DollarTable'
import EnvelopeTable from '../../components/table/techobol/EnvelopeTable'
import DepositTable from '../../components/table/techobol/DepositTable'

import Status from '../../enums/Status'

const DepositOrderReportDetail = () => {
  const { depositOrder } = useDepositOrderStore()
  const { id } = useParams()
  const isReadOnly = true
  const moneyCollection = useMoneyCollection()
  const expense = useExpense(isReadOnly)
  const dollar = useDollar()
  const envelope = useEnvelope(isReadOnly)
  const deposit = useDeposit()

  useEffect(() => {
    if (depositOrder.status !== Status.EMITTED) {
      moneyCollection.getMoneyCollectionsFromDepositOrder(Number(id))
      expense.getExpensesFromDepositOrder(Number(id))
      dollar.getDollarsFromDepositOrder(Number(id))
      envelope.getEnvelopesFromDepositOrder(Number(id))
      deposit.getDepositsFromDepositOrder(Number(id))
    }
  }, [])

  return (
    <div className='p-14 space-y-9'>
      <div className='space-y-4'>
        <h1 className='text-xl font-bold'>Documentos</h1>
        <div className='flex items-end space-x-3 px-3'>
          <ViewDocument
            label='Respaldo de salidas'
            url={depositOrder.reportUrl as string}
          />
        </div>
        <div className='flex items-end space-x-3 px-3'>
          <ViewDocument
            label='Reporte de orden de depósito'
            url={depositOrder.generatedReportUrl as string}
          />
        </div>
      </div>
      <Divider />
      <div className='space-y-10'>
        <h1 className='text-xl font-bold'>Reporte de orden de depósito</h1>

        <div className='space-y-20'>
          <section className='space-y-2'>
            <div className='flex items-end justify-between'>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-green-500 rounded-sm'></div>
                <h1 className='font-bold'>Recaudaciones</h1>
              </div>
            </div>
            <MoneyCollectionTable
              moneyCollection={moneyCollection}
              isReadonly={true}
            />
          </section>

          <section className='space-y-2'>
            <div className='flex items-end justify-between'>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
                <h1 className='font-bold'>Salidas</h1>
              </div>
            </div>
            <ExpenseTable expense={expense} isReadonly={true} />
          </section>

          <section className='space-y-2'>
            <div className='flex items-end justify-between'>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
                <h1 className='font-bold'>Dólares</h1>
              </div>
            </div>
            <DollarTable dollar={dollar} isReadonly={true} />
          </section>

          <section className='space-y-2'>
            <div className='flex items-end justify-between'>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
                <h1 className='font-bold'>Sobres</h1>
              </div>
            </div>
            <EnvelopeTable envelope={envelope} isReadonly={true} />
          </section>

          <section className='space-y-2'>
            <div className='flex items-end justify-between'>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-blue-500 rounded-sm'></div>
                <h1 className='font-bold'>Depósitos</h1>
              </div>
            </div>
            <DepositTable deposit={deposit} isReadonly={true} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default DepositOrderReportDetail
