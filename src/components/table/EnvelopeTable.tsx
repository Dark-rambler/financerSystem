import { Table } from '@mantine/core'

import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'
import DeleteModal from '../modals/DeleteModal'

import { useEnvelope } from '../../hooks/useEnvelope'

interface EnvelopeTableProps {
  envelope: ReturnType<typeof useEnvelope>
}

const EnvelopeTable = ({ envelope }: EnvelopeTableProps) => {
  return (
    <div className='border border-gray-200 rounded-md'>
      <Table striped highlightOnHover fontSize={'sm'} withColumnBorders>
        <thead>
          <tr>
            <th className='w-[300px]'>De Sucursal</th>
            <th className='w-[300px]'>A Sucursal</th>
            <th className='w-[200px]'>Fecha</th>
            <th className='w-[200px]'>Monto</th>
            <th className='w-[500px]'>Descripción</th>
            <th className='w-12'></th>
            <th className='w-12'></th>
          </tr>
        </thead>
        <tbody>
          {envelope.envelopes.map((element, index) => (
            <tr key={`expense-key-${index}`}>
              <td>{element.fromBranchOffice?.name}</td>
              <td>{element.toBranchOffice?.name}</td>
              <td>{new Date(element.date as Date).toLocaleDateString()}</td>
              <td className='text-left'>
                {Number(element.amount).toFixed(2)} Bs.
              </td>
              <td>{element.description}</td>

              <td>
                <EditButton
                  onClick={() => {
                    envelope.onClickEdit(index)
                  }}
                />
              </td>
              <td className='max-w-10'>
                <DeleteButton
                  onClick={() => {
                    envelope.setActualId(index)
                    envelope.modalDeleteHandler.open()
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
          <th className='font-semibold text-xs text-left py-2 px-3'>
          Σ {envelope.totalAmount.toFixed(2)} Bs.
          </th>
          <th></th>
          <th></th>
          <th></th>
        </tfoot>
      </Table>
      <DeleteModal
        label={'Sobre'}
        opened={envelope.openedDelete}
        close={envelope.modalDeleteHandler.close}
        onDelete={envelope.onDelete}
      />
    </div>
  )
}

export default EnvelopeTable
