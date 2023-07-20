import { Table } from '@mantine/core'

import EditButton from '../../buttons/EditButton'
import DeleteButton from '../../buttons/DeleteButton'
import DeleteModal from '../../modals/DeleteModal'
import { useDollar } from '../../../hooks/useDollar'

interface DollarsTableProps {
  dollar: ReturnType<typeof useDollar>
}

const DollarTable = ({ dollar }: DollarsTableProps) => {
  return (
    <div className='border border-gray-200 rounded-md'>
      <Table striped highlightOnHover fontSize={'sm'} withColumnBorders>
        <thead>
          <tr>
            <th className='w-[300px]'>Sucursal</th>
            <th className='w-[300px]'>Fecha</th>
            <th className='w-[200px]'>Monto USD.</th>
            <th className='w-[200px]'>Monto Bs.</th>
            <th className='w-[500px]'>Descripción</th>
            <th className='w-12'></th>
            <th className='w-12'></th>
          </tr>
        </thead>
        <tbody>
          {dollar.dollars.map((element, index) => (
            <tr key={`deposit-row-${index}`}>
              <td>{element.branchOffice?.name}</td>
              <td>{new Date(element.date as Date).toLocaleDateString()}</td>
              <td>{Number(element.amount).toFixed(2)} USD.</td>
              <td>{Number(element.amountBs).toFixed(2)} Bs.</td>
              <td>{element.description}</td>
              <td>
                <EditButton
                  onClick={() => {
                    dollar.onClickEdit(index)
                  }}
                />
              </td>
              <td className='max-w-10'>
                <DeleteButton
                  onClick={() => {
                    dollar.setActualId(index)
                    dollar.modalDeleteHandler.open()
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className='border-t border-t-slate-200 '>
          <tr>
            <th></th>
            <th></th>
            <th className='font-semibold text-xs text-left py-3 px-3'>
              {' '}
              Σ {dollar.totalAmount.toFixed(2)} USD.
            </th>
            <th className='font-semibold text-xs text-left py-3 px-3'>
              {' '}
              Σ {dollar.totalAmountBs.toFixed(2)} Bs.
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </Table>
      <DeleteModal
        label={'Depósito'}
        opened={dollar.openedDelete}
        close={dollar.modalDeleteHandler.close}
        onDelete={dollar.onDelete}
      />
    </div>
  )
}

export default DollarTable
