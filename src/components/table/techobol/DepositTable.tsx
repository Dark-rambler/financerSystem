import { Table } from '@mantine/core'

import { useDeposit } from '../../../hooks/useDeposit'
import EditButton from '../../buttons/EditButton'
import DeleteButton from '../../buttons/DeleteButton'
import DeleteModal from '../../modals/DeleteModal'

interface DepositTableProps {
  deposit: ReturnType<typeof useDeposit>
}

const DepositTable = ({ deposit }: DepositTableProps) => {
  return (
    <div className='rounded-md border border-gray-200'>
      <Table striped highlightOnHover fontSize={'sm'} withColumnBorders>
        <thead>
          <tr>
            <th className='w-[300px]'>Nº Voucher</th>
            <th className='w-[300px]'>Banco</th>
            <th className='w-[200px]'>Fecha</th>
            <th className='w-[200px]'>Monto</th>
            <th className='w-[500px]'>Observaciones</th>
            <th className='w-12'></th>
            <th className='w-12'></th>
          </tr>
        </thead>
        <tbody>
          {deposit.deposits.map((element, index) => (
            <tr key={`deposit-row-${index}`}>
              <td>{element.voucherNumber}</td>
              <td>{element.bank}</td>
              <td>{new Date(element.date as Date).toLocaleDateString()}</td>

              <td className='text-left'>
                {Number(element.amount).toFixed(2)} Bs.
              </td>
              <td>{element.description}</td>
              <td>
                <EditButton
                  onClick={() => {
                    deposit.onClickEdit(index)
                  }}
                />
              </td>
              <td>
                <DeleteButton
                  onClick={() => {
                    deposit.setActualId(index)
                    deposit.modalDeleteHandler.open()
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className='border-t border-t-slate-200'>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th className='font-semibold text-xs text-left py-2 px-3'>
              Σ {deposit.totalAmount.toFixed(2)} Bs.
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </Table>
      <DeleteModal
        label={'Depósito'}
        opened={deposit.openedDelete}
        close={deposit.modalDeleteHandler.close}
        onDelete={deposit.onDelete}
      />
    </div>
  )
}

export default DepositTable
