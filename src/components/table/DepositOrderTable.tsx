import { Table, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'

import { TbZoomQuestion, TbBan } from 'react-icons/tb'
import { ActionIcon } from '@mantine/core'

interface Regional {
  id: number
  name: string
}

interface Employee {
  id: number
  name: string
  lastName: string
}

interface DepositOrderModel {
  amount: number
  deliveryDate: Date
  employee: Employee
  endDate: Date
  id: number
  orderNumber: string
  regional: Regional
  revitionStatus: string
  solitudeDate: Date
  startDate: Date
  status: string
}

interface DepositOrderTableProps {
  depositOrderData: DepositOrderModel[]
}

const DepositOrderTable = ({ depositOrderData }: DepositOrderTableProps) => {
  return (
    <Table
      verticalSpacing={'md'}
      highlightOnHover
      withBorder
      className='border border-slate-300 rounded-lg'
    >
      <thead className='bg-slate-200 rounded-3xl'>
        <tr>
          <th>Nº Orden</th>
          <th>Fecha de orden</th>
          <th>Regional</th>
          <th>Administrador</th>
          <th>Periodo de depósito</th>
          <th>Fecha limite</th>
          <th>Estado de entrega</th>
          <th>Estado de revisión</th>
          <th>Documento</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {depositOrderData.map(depositOrder => (
          <tr key={depositOrder.orderNumber}>
            <td>{depositOrder.orderNumber}</td>
            <td>
              {dayjs(depositOrder.solitudeDate)
                .locale('es-us')
                .format('DD MMMM YYYY')}
            </td>
            <td>{`${depositOrder.regional.name}`}</td>
            <td>{`${depositOrder.employee.name} ${depositOrder.employee.lastName}`}</td>
            <td>{`${dayjs(depositOrder.startDate)
              .locale('es-us')
              .format('DD MMMM YYYY')} - ${dayjs(depositOrder.endDate)
              .locale('es-us')
              .format('DD MMMM YYYY')}`}</td>
            <td>
              {dayjs(depositOrder.deliveryDate)
                .locale('es-us')
                .format('DD MMMM YYYY')}
            </td>
            <td>{depositOrder.status}</td>
            <td>{depositOrder.revitionStatus}</td>
            <td>{depositOrder.revitionStatus}</td>
            <td>
              <Tooltip label={'Revisar orden de deposito'}>
              <ActionIcon className='bg-slate-200 hover:bg-slate-300'>
                <TbZoomQuestion size={20} color={'#475569'} />
              </ActionIcon>
              </Tooltip>
       
            </td>
            <td>
            <Tooltip label={'Cancelar orden de deposito'}>
              <ActionIcon className='bg-slate-200 hover:bg-slate-300'>
                <TbBan size={20} color={'#475569'} />
              </ActionIcon>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default DepositOrderTable
