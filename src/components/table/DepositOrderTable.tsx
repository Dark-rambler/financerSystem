import { Table, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'

import { TbZoomQuestion, TbBan } from 'react-icons/tb'
import { ActionIcon, FileButton } from '@mantine/core'

import StatusBadge from '../badges/StatusBadge'
import RevisionStatusBadge from '../badges/RevisionStatusBadge'

import CancelDepositOrder from '../modals/CancelDepositOrder'
import { useDisclosure } from '@mantine/hooks'
// the AG Grid React Component
import { useEffect, useMemo, useState } from 'react'

import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'

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
  const [opened, { open, close }] = useDisclosure()
  const [actualOrder, setActualOrder] = useState<DepositOrderModel | null>(null)

  const handleOnClickCancel = (actualOrder: DepositOrderModel) => {
    setActualOrder(actualOrder)
    open()
  }

  return (
    <>
      <div className='border border-slate-300 rounded-xl h-[calc(100%-90px)]'>
        <Table
          verticalSpacing={'sm'}
          highlightOnHover
          striped
          withColumnBorders
        >
          <thead className='bg-gray-100 rounded-xl'>
            <tr>
              <th>Nº Orden</th>
              <th>Fecha de orden</th>
              <th>Regional</th>
              <th>Administrador</th>
              <th>Monto</th>
              <th>Periodo de depósito</th>
              <th>Fecha limite</th>
              <th>Estado de entrega</th>
              <th>Estado de revisión</th>
              <th>Orden</th>
              <th>Informe</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {depositOrderData.map((depositOrder, index) => (
              <tr key={`deposit-key-${index}`}>
                <td>{depositOrder.orderNumber}</td>
                <td>
                  {dayjs(depositOrder.solitudeDate)
                    .locale('es-us')
                    .format('DD MMMM YYYY')}
                </td>
                <td>{`${depositOrder.regional.name}`}</td>
                <td>{`${depositOrder.employee.name} ${depositOrder.employee.lastName}`}</td>
                <td>{depositOrder.amount} Bs.</td>
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
                <td>
                  <StatusBadge Status={depositOrder.status} />
                </td>
                <td>
                  <RevisionStatusBadge
                    RevisionStatus={depositOrder.revitionStatus}
                    Status={depositOrder.status}
                  />
                </td>

                <td>
                  <Tooltip label={'Ver documento'}>
                    <ActionIcon
                      className='bg-gray-100 hover:bg-gray-200'
                      onClick={() => {
                        window.open(
                          `https://pub-32a96368cbbd4a5583b6334c5bc7fe4a.r2.dev/TECHOBOL/ODF4-24.pdf`
                        )
                      }}
                    >
                      <BsFillFileEarmarkPdfFill size={20} color={'#dc2626'} />
                    </ActionIcon>
                  </Tooltip>
                </td>
                <td>
                  {depositOrder.status === 'Entregado' ? (
                    <Tooltip label={'Ver documento'}>
                      <ActionIcon
                        className='bg-gray-100 hover:bg-gray-200'
                        onClick={() => {
                          window.open(
                            `https://pub-32a96368cbbd4a5583b6334c5bc7fe4a.r2.dev/TECHOBOL/ODF4-24.pdf`
                          )
                        }}
                      >
                        <BsFillFileEarmarkPdfFill size={20} color={'#dc2626'} />
                      </ActionIcon>
                    </Tooltip>
                  ) : (
                    // <FileButton onChange={setFile} accept="image/png,image/jpeg"></FileButton>
                    <></>
                  )}
                </td>
                <td>
                  <Tooltip label={'Revisar orden de deposito'}>
                    <ActionIcon
                      className='bg-slate-200 hover:bg-slate-300 disabled:cursor-not-allowed'
                      disabled={depositOrder.status !== 'Entregado'}
                    >
                      <TbZoomQuestion size={20} color={'#475569'} />
                    </ActionIcon>
                  </Tooltip>
                </td>
                <td className=' text-center'>
                  <Tooltip label={'Cancelar orden de deposito'}>
                    <ActionIcon
                      disabled={depositOrder.status === 'Cancelado'}
                      className='bg-slate-200 hover:bg-slate-300'
                      onClick={() => {
                        handleOnClickCancel(depositOrder)
                      }}
                    >
                      <TbBan size={20} color={'#475569'} />
                    </ActionIcon>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <CancelDepositOrder close={close} opened={opened} id={actualOrder?.id} />
    </>
  )
}

export default DepositOrderTable
