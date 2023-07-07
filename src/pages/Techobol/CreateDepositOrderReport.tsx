import { Table, Button } from '@mantine/core'

import { useDepositOrderStore } from '../../components/store/depositOrderStore'
import { useExpense } from '../../hooks/useExpense'
import { useDeposit } from '../../hooks/useDeposit'
import { useMoneyCollection } from '../../hooks/useMoneyCollection'

import DepositModal from '../../components/modals/DepositModal'
import MoneyCollectionModal from '../../components/modals/MoneyCollectionModal'
import ExpenseModal from '../../components/modals/ExpenseModal'

import ExpenseTable from '../../components/table/ExpenseTable'
import MoneyCollectionTable from '../../components/table/MoneyCollectionTable'
import DepositTable from '../../components/table/DepositTable'

const CreateDepositOrderReport = () => {
  const { depositOrder } = useDepositOrderStore()
  const deposit = useDeposit()
  const expense = useExpense()
  const moneyCollection = useMoneyCollection()

  return (
    <div className='px-16 py-12 space-y-10'>
      <section className='space-y-7'>
        <h1 className='text-center text-md font-bold'>
          INFORME ORDEN DE DEPOSITO
        </h1>
        <div className='w-full rounded-sm border border-gray-300 '>
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
                <td>{depositOrder.regional?.name}</td>
                <td>
                  {depositOrder.employee?.name}{' '}
                  {depositOrder.employee?.lastName}
                </td>
                <td>{new Date(depositOrder.startDate).toLocaleDateString()}</td>
                <td>{new Date(depositOrder.endDate).toLocaleDateString()}</td>
                <td>{depositOrder.amount} Bs.</td>
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
          <h1 className='font-bold'>Recaudación</h1>
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
          <h1 className='font-bold'>Costos y gastos</h1>
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
          <h1 className='font-bold'>Depósitos</h1>
          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={deposit.modalHandler.open}
          >
            +
          </Button>
        </div>

        <DepositTable deposit={deposit} />
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
    </div>
  )
}

export default CreateDepositOrderReport
