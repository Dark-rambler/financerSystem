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
    <>
      <Table verticalSpacing={'sm'} withColumnBorders withBorder>
        <thead className='bg-[#FBE9D9]'>
          <tr>
            <th>De Sucursal</th>
            <th>A Sucursal</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Descripcion</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {envelope.envelopes.map((element, index) => (
            <tr key={`expense-key-${index}`}>
              <td>{element.fromBranchOffice?.name}</td>
              <td>{element.toBranchOffice?.name}</td>
              <td>{new Date(element.date as Date).toLocaleDateString()}</td>
              <td>{element.amount} Bs.</td>
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
        <tfoot>
          <th></th>
          <th></th>
          <th>Total</th>
          {/* TOTAL SUMATORY OF AMOUNTS */}
          <th>
500 Bs.
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
    </>
  )
}

export default EnvelopeTable
