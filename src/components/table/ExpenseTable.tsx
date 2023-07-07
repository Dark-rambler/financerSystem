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
    <>
      <Table verticalSpacing={'sm'} withColumnBorders withBorder>
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expense.expenses.map((element, index) => (
            <tr key={`expense-key-${index}`}>
              <td>{element.documentType}</td>
              <td>{element.documentNumber}</td>
              <td>{new Date(element.date as Date).toLocaleDateString()}</td>
              <td>{element.branchOffice?.name}</td>
              <td>{element.amount} Bs.</td>
              <td>{element.description}</td>
              <td>{element.account?.name}</td>
              <td>{element.subAccount?.name}</td>
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
      </Table>
      <DeleteModal
        label={'Gasto'}
        opened={expense.expenseOpenedDelete}
        close={expense.expenseOpenedDeleteHandler.close}
        onDelete={expense.onDelete}
      />
    </>
  )
}

export default ExpenseTable
