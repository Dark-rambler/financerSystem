import { Table } from '@mantine/core'

import { useMoneyCollection } from '../../hooks/useMoneyCollection'
import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'
import DeleteModal from '../modals/DeleteModal'

interface ExpenseTableProps {
  moneyCollection: ReturnType<typeof useMoneyCollection>
}
const MoneyCollectionTable = ({ moneyCollection }: ExpenseTableProps) => {
  return (
    <>
      <Table verticalSpacing={'sm'} withColumnBorders withBorder>
        <thead className='bg-[#D3E9DD]'>
          <tr>
            <th>Sucursal</th>
            <th>Fecha de recaudación</th>
            <th>Monto</th>
            <th>Entregado por</th>
            <th>Recibido por</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {moneyCollection.moneyCollections.map((collection, index) => (
            <tr key={`money-collection-${index}`}>
              <td>{collection.branchOffice?.name}</td>
              <td>{new Date(collection.date as Date).toLocaleDateString()}</td>
              <td>{collection.amount} Bs.</td>
              <td>{collection.deliveredBy}</td>
              <td>
                {collection.receivedBy?.name} {collection.receivedBy?.lastName}
              </td>
              <td>
                <EditButton
                  onClick={() => {
                    moneyCollection.onClickEdit(index)
                  }}
                />
              </td>
              <td className='max-w-10'>
                <DeleteButton
                  onClick={() => {
                    moneyCollection.setActualId(index)
                    moneyCollection.moneyCollectionOpenedDeleteHandler.open()
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModal
        label={'Recaudación'}
        onDelete={moneyCollection.onDelete}
        close={moneyCollection.moneyCollectionOpenedDeleteHandler.close}
        opened={moneyCollection.moneyCollectionOpenedDelete}
      />
    </>
  )
}

export default MoneyCollectionTable
