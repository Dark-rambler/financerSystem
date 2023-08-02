import { Table } from '@mantine/core'

import { useMoneyCollection } from '../../../hooks/useMoneyCollection'
import EditButton from '../../buttons/EditButton'
import DeleteButton from '../../buttons/DeleteButton'
import DeleteModal from '../../modals/DeleteModal'

interface ExpenseTableProps {
  moneyCollection: ReturnType<typeof useMoneyCollection>
  isReadonly: boolean
}
const MoneyCollectionTable = ({
  moneyCollection,
  isReadonly
}: ExpenseTableProps) => {
  return (
    <div className='border border-gray-200 rounded-md'>
      <Table striped highlightOnHover fontSize={'sm'} withColumnBorders>
        <thead>
          <tr>
            <th className='w-[330px]'>Sucursal</th>
            <th className='w-[330px]'>Fecha de recaudación</th>
            <th className='w-[330px]'>Monto</th>
            <th className='w-[330px]'>Entregado por</th>
            <th className='w-[330px]'>Recibido por</th>
            {!isReadonly && (
              <>
                {' '}
                <th className='w-12'></th> <th className='w-12'></th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {moneyCollection.moneyCollections.map((collection, index) => (
            <tr key={`money-collection-${index}`}>
              <td>{collection.branchOffice?.name}</td>
              <td>{new Date(collection.date as Date).toLocaleDateString()}</td>
              <td >
                {Number(collection.amount).toFixed(2)} Bs.
              </td>
              <td>{collection.deliveredBy}</td>
              <td>
                {collection.receivedBy?.name} {collection.receivedBy?.lastName}
              </td>
              {!isReadonly && (
                <>
                  {' '}
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
                </>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot className='border-t border-t-slate-200'>
          <tr>
            <th></th>
            <th></th>
            <th className='text-xs font-semibold text-left py-2 px-3'>
              Σ {moneyCollection.totalAmount.toFixed(2)} Bs.
            </th>
          </tr>
        </tfoot>
      </Table>
      <DeleteModal
        label={'Recaudación'}
        onDelete={moneyCollection.onDelete}
        close={moneyCollection.moneyCollectionOpenedDeleteHandler.close}
        opened={moneyCollection.moneyCollectionOpenedDelete}
        isFemaleArtcle={true}
      />
    </div>
  )
}

export default MoneyCollectionTable
