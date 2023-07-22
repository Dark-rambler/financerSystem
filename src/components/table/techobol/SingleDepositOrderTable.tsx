import { Table } from "@mantine/core"

import BranchOfficeAmountPopover from "../../popovers/BranchOfficeAmountPopover"
import BranchOfficePopover from "../../popovers/BranchOfficePopover"
import { useDepositOrderStore } from "../../store/depositOrderStore"

const SingleDepositOrderTable = () => {
    const { depositOrder } = useDepositOrderStore()
  return (
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
          <td className='flex items-center space-x-1'>
            <p> {depositOrder.regional?.name} </p>
            <BranchOfficePopover />{' '}
          </td>
          <td>
            {depositOrder.employee?.name}{' '}
            {depositOrder.employee?.lastName}
          </td>
          <td>{new Date(depositOrder.startDate).toLocaleDateString()}</td>
          <td>{new Date(depositOrder.endDate).toLocaleDateString()}</td>
          <td className='flex items-center space-x-1'>
            <p> {Number(depositOrder.amount).toFixed(2)} Bs. </p>
            <BranchOfficeAmountPopover />{' '}
          </td>
          <td>
            {new Date(depositOrder.deliveryDate).toLocaleDateString()}
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
  )
}

export default SingleDepositOrderTable