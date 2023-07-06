import { Table, Button } from '@mantine/core'

import { useDepositOrderStore } from '../../components/store/depositOrderStore'
import { useExpense } from '../../hooks/useExpense'
import { useDeposit } from '../../hooks/useDeposit'
import { useMoneyCollection } from '../../hooks/useMoneyCollection'

import DepositModal from '../../components/modals/DepositModal'
import MoneyCollectionModal from '../../components/modals/MoneyCollectionModal'
import ExpenseModal from '../../components/modals/ExpenseModal'
import DeleteModal from '../../components/modals/DeleteModal'

import DeleteButton from '../../components/buttons/DeleteButton'

const CreateDepositOrderReport = () => {
  const { depositOrder, setDepositOrder } = useDepositOrderStore()
  const deposit = useDeposit()
  const expense = useExpense()
  const moneyCollection = useMoneyCollection()

  return (
    <div className='px-16 py-12 space-y-10'>
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

        <div className='w-full rounded-md border border-gray-300 '>
          <Table verticalSpacing={'sm'} withColumnBorders>
            <thead className='bg-[#D3E9DD]'>
              <tr>
                <th>Sucursal</th>
                <th>Fecha de recaudación</th>
                <th>Monto</th>
                <th>Entregado por</th>
                <th>Recibido por</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {moneyCollection.moneyCollections.map((collection, index) => (
                <tr key={`money-collection-${index}`}>
                  <td>{collection.branchOffice?.name}</td>
                  <td>
                    {new Date(collection.date as Date).toLocaleDateString()}
                  </td>
                  <td>{collection.amount}</td>
                  <td>{collection.deliveredBy}</td>
                  <td>
                    {collection.receivedBy?.name}{' '}
                    {collection.receivedBy?.lastName}
                  </td>
                  <td className='max-w-10'>
                    <DeleteButton onClick={moneyCollection.moneyCollectionOpenedDeleteHandler.open}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
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

        <div className='w-full rounded-md border border-gray-300 '>
          <Table verticalSpacing={'sm'} withColumnBorders>
            <thead className='bg-[#FBE9D9]'>
              <tr>
                <th>Documento</th>
                <th>Nº documento</th>
                <th>Fecha</th>
                <th>Sucursal</th>
                <th>Monto</th>
                <th>Descripcion</th>
                <th>Cuenta financiera</th>
                <th>Subcuenta financiera</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {expense.expenses.map(expense => (
                  <>
                    <td>{expense.documentType}</td>
                    <td>{expense.documentNumber}</td>
                    <td>{expense.date}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td>{expense.account?.name}</td>
                    <td>{expense.subAccount?.name}</td>
                  </>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <h1 className='font-bold'>Depósitos</h1>
          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={deposit.depositOpenedHandler.open}
          >
            +
          </Button>
        </div>
        <div className='w-full rounded-md border border-gray-300 '>
          <Table verticalSpacing={'sm'} withColumnBorders>
            <thead className='bg-[#D2E5F3]'>
              <tr>
                <th>Nº Voucher</th>
                <th>Monto</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {deposit.deposits.map(deposit => (
                  <>
                    <td>{deposit.voucherNumber}</td>
                    <td>{deposit.amount}</td>
                    <td>{deposit.description}</td>
                  </>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
      <MoneyCollectionModal
        opened={moneyCollection.moneyCollectionOpened}
        close={moneyCollection.onClose}
        moneyCollection={moneyCollection}
      />
      <DeleteModal
        label={'Quitar recaudación'}
        onDelete={() => {
          console.log('a')
        }}
        close={moneyCollection.moneyCollectionOpenedDeleteHandler.close}
        opened={moneyCollection.moneyCollectionOpenedDelete}
      />
      <ExpenseModal
        opened={expense.expenseOpened}
        close={expense.expenseOpenedHandler.close}
      />
      <DepositModal
        opened={deposit.depositOpened}
        close={deposit.depositOpenedHandler.close}
      />
    </div>
  )
}

export default CreateDepositOrderReport
