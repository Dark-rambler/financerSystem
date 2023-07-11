import { Table } from '@mantine/core'

import { useExpense } from '../../hooks/useExpense'
import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'
import DeleteModal from '../modals/DeleteModal'

interface ExpenseTableProps {
  expense: ReturnType<typeof useExpense>
}

const ExpenseTable = ({ expense }: ExpenseTableProps) => {
  return (
    <div className='rounded-md border border-gray-200'>
      <Table striped highlightOnHover fontSize={'sm'} withColumnBorders>
        <thead>
          <tr>
            <th className='w-[150px]'>Documento</th>
            <th className='w-[170px]'>Nº documento</th>
            <th className='w-[150px]'>Fecha</th>
            <th className='w-[150px]'>Sucursal</th>
            <th className='w-[150px]'>Tipo de salida</th>
            <th className='w-[130px]'>Monto</th>
            <th className='w-[180px]'>Cuenta financiera</th>
            <th className='w-[180px]'>Subcuenta financiera</th>
            <th className='w-[400px]'>Descripción</th>
            <th className='w-12'></th>
            <th className='w-12'></th>
          </tr>
        </thead>
        <tbody>
          {expense.expenses.map((element, index) => (
            <tr key={`expense-key-${index}`}>
              <td>{element.documentType}</td>
              <td>{element.documentNumber}</td>
              <td>{new Date(element.date as Date).toLocaleDateString()}</td>
              <td>{element.branchOffice?.name}</td>
              <td>{element.expenseType}</td>
              <td className='text-left'>
                {Number(element.amount).toFixed(2)} Bs.
              </td>
       
              <td>{element.account?.name}</td>
              <td>{element.subAccount?.name}</td>
              <td>{element.description}</td>
              <td>
                <EditButton
                  onClick={() => {
                    expense.onClickEdit(index)
                  }}
                />
              </td>
              <td className='max-w-10'>
                <DeleteButton
                  onClick={() => {
                    expense.setActualId(index)
                    expense.expenseOpenedDeleteHandler.open()
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className='border-t border-t-slate-200'>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th className='font-semibold text-xs text-left py-2 px-3'>
          Σ {expense.totalAmount.toFixed(2)} Bs.
          </th>
          <th></th>
        </tfoot>
      </Table>
      <DeleteModal
        label={'Gasto'}
        opened={expense.expenseOpenedDelete}
        close={expense.expenseOpenedDeleteHandler.close}
        onDelete={expense.onDelete}
      />
    </div>
  )
}

export default ExpenseTable
