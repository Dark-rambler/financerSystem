import { Table } from '@mantine/core'

import { useDeposit } from '../../hooks/useDeposit'
import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'
import DeleteModal from '../modals/DeleteModal'

interface DepositTableProps {
  deposit: ReturnType<typeof useDeposit>
}

const DepositTable = ({ deposit }: DepositTableProps) => {
  return (
    <>
      <Table verticalSpacing={'sm'} withColumnBorders withBorder>
        <thead className='bg-[#D2E5F3]'>
          <tr>
            <th>Nº Voucher</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Banco</th>
            <th>Observaciones</th>
   
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
      
            {deposit.deposits.map((element, index) => (
             <tr key={`deposit-row-${index}`}>
                <td>{element.voucherNumber}</td>
                <td>{element.amount}</td>
                <td>{new Date(element.date as Date).toLocaleDateString()}</td>
                <td>{element.bank}</td>
                <td>{element.description}</td>
                <td>
                  <EditButton
                    onClick={() => {
                      deposit.onClickEdit(index)
                    }}
                  />
                </td>
                <td className='max-w-10'>
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
      </Table>
      <DeleteModal
        label={'Depósito'}
        opened={deposit.openedDelete}
        close={deposit.modalDeleteHandler.close}
        onDelete={deposit.onDelete}
      />
    </>
  )
}

export default DepositTable
