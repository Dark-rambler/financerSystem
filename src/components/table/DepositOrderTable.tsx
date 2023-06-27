import { FileInput, Table, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'
import { DepositOrderInterface } from '../../models/DepositOrder'

import {
  TbZoomQuestion,
  TbBan,
  TbArrowDown,
  TbArrowUp,
  TbArrowsVertical
} from 'react-icons/tb'
import { ActionIcon } from '@mantine/core'

import StatusBadge from '../badges/StatusBadge'
import RevisionStatusBadge from '../badges/RevisionStatusBadge'

import CancelDepositOrder from '../modals/CancelDepositOrder'
import { useDisclosure } from '@mantine/hooks'
// the AG Grid React Component
import { useEffect, useState } from 'react'

import ViewUploadReport from '../buttons/ViewUploadReport'
import ViewDocument from '../buttons/ViewDocument'

interface DepositOrderTableProps {
  depositOrderData: DepositOrderInterface[]
}

const DepositOrderTable = ({ depositOrderData }: DepositOrderTableProps) => {
  const [opened, { open, close }] = useDisclosure()
  const [actualOrder, setActualOrder] = useState<DepositOrderInterface | null>(
    null
  )
  console.log(depositOrderData)
  const [sortedArray, setSortedArray] = useState<DepositOrderInterface[]>([])

  const [activeColumn, setActiveColumn] = useState('solitudeDate')
  const [sortOrder, setSortOrder] = useState('desc')

  const handleOnClickCancel = (actualOrder: DepositOrderInterface) => {
    setActualOrder(actualOrder)
    open()
  }

  const sortDepositOrder = (columnName: string) => {
    const isSameColumn = activeColumn === columnName
    const newSortOrder = isSameColumn
      ? sortOrder === 'asc'
        ? 'desc'
        : 'asc'
      : 'asc'

    const newDate = [...depositOrderData]
    newDate.sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return newSortOrder === 'asc' ? -1 : 1
      }
      if (a[columnName] > b[columnName]) {
        return newSortOrder === 'asc' ? 1 : -1
      }
      return 0
    })

    setActiveColumn(columnName)
    setSortedArray(newDate)
    setSortOrder(newSortOrder)
  }

  const sortDepositOrderRE = (columnName: string) => {
    const isSameColumn = activeColumn === columnName
    const newSortOrder = isSameColumn
      ? sortOrder === 'asc'
        ? 'desc'
        : 'asc'
      : 'asc'

    const newDate = [...depositOrderData]
    newDate.sort((a, b) => {
      if (a[columnName].name < b[columnName].name) {
        return newSortOrder === 'asc' ? -1 : 1
      }
      if (a[columnName].name > b[columnName].name) {
        return newSortOrder === 'asc' ? 1 : -1
      }
      return 0
    })

    setActiveColumn(columnName)
    setSortedArray(newDate)
    setSortOrder(newSortOrder)
  }

  useEffect(() => {
    setSortedArray(depositOrderData)
  }, [depositOrderData])

  return (
    <>
      <div className='border border-slate-300 rounded-md h-[calc(100vh-205px)] overflow-y-auto'>
        <Table
          verticalSpacing={'sm'}
          highlightOnHover
          striped
          withColumnBorders
          className=' overflow-y-auto overflow-x-auto min-w-[1500px]'
        >
          <thead className='bg-gray-100 rounded-xl top-0 z-30 sticky'>
            <tr>
              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrder('orderNumber')
                }}
              >
                <div className='flex justify-between items-center'>
                  Nº Orden
                  {activeColumn === 'orderNumber' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'orderNumber' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'orderNumber' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>
              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrder('solitudeDate')
                }}
              >
                <div className='flex justify-between items-center hover:cursor-pointer'>
                  Fecha orden
                  {activeColumn === 'solitudeDate' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'solitudeDate' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'solitudeDate' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>
              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrderRE('regional')
                }}
              >
                <div className='flex justify-between items-center hover:cursor-pointer'>
                  Regional
                  {activeColumn === 'regional' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'regional' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'regional' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>
              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrderRE('employee')
                }}
              >
                <div className='flex justify-between items-center hover:cursor-pointer'>
                  Administrador
                  {activeColumn === 'employee' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'employee' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'employee' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>

              <th className=' hover:cursor-pointer select-none'>
                <div
                  className='flex justify-between items-center hover:cursor-pointer'
                  onClick={() => {
                    sortDepositOrder('startDate')
                  }}
                >
                  Periodo de depósito
                  {activeColumn === 'startDate' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'startDate' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'startDate' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>
              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrder('amount')
                }}
              >
                <div className='flex justify-between items-center hover:cursor-pointer'>
                  Monto Bs.
                  {activeColumn === 'amount' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'amount' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'amount' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>
              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrder('deliveryDate')
                }}
              >
                <div className='flex justify-between items-center hover:cursor-pointer'>
                  Fecha limite
                  {activeColumn === 'deliveryDate' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'deliveryDate' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'deliveryDate' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>

              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrder('status')
                }}
              >
                <div className='flex justify-between items-center hover:cursor-pointer'>
                  Estado
                  {activeColumn === 'status' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'status' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'status' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>
              <th
                className=' hover:cursor-pointer select-none'
                onClick={() => {
                  sortDepositOrder('revitionStatus')
                }}
              >
                <div className='flex justify-between items-center hover:cursor-pointer'>
                  Revisión
                  {activeColumn === 'revitionStatus' && sortOrder === 'asc' ? (
                    <TbArrowUp color={'#3b82f6'} />
                  ) : null}
                  {activeColumn === 'revitionStatus' && sortOrder === 'desc' ? (
                    <TbArrowDown color={'#3b82f6'} />
                  ) : null}
                  {activeColumn !== 'revitionStatus' && (
                    <TbArrowsVertical color={'#6b7280'} />
                  )}
                </div>
              </th>
              <th>Orden</th>
              <th>Informe</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedArray.map((depositOrder, index) => (
              <tr key={`deposit-key-${index}`}>
                <td>{depositOrder.orderNumber}</td>
                <td>
                  {dayjs(depositOrder.solitudeDate)
                    .locale('es-us')
                    .format('DD/MM/YY')}
                </td>
                <td>{`${depositOrder.regional.name}`}</td>
                <td>{`${depositOrder.employee.name} ${depositOrder.employee.lastName}`}</td>

                <td>{`${dayjs(depositOrder.startDate)
                  .locale('es-us')
                  .format('DD/MM/YY')} - ${dayjs(depositOrder.endDate)
                  .locale('es-us')
                  .format('DD/MM/YY')}`}</td>
                <td>
                  <div className='text-left'>{depositOrder.amount} Bs.</div>
                </td>
                <td>
                  {dayjs(depositOrder.deliveryDate)
                    .locale('es-us')
                    .format('DD/MM/YY')}
                </td>
                <td>
                  <div className='flex justify-center'>
                    <StatusBadge Status={depositOrder.status} />
                  </div>
                </td>
                <td>
                  <div className='flex justify-center'>
                    <RevisionStatusBadge
                      RevisionStatus={depositOrder.revitionStatus}
                      Status={depositOrder.status}
                    />
                  </div>
                </td>
                <td>
                  <div className='flex justify-center'>
                    <ViewDocument url={depositOrder.documentUrl} />
                  </div>
                </td>
                <td>
                  {depositOrder.status === 'Entregado' ? (
                    <ViewUploadReport
                      url={
                        'https://pub-32a96368cbbd4a5583b6334c5bc7fe4a.r2.dev/TECHOBOL/ODF4-24.pdf'
                      }
                    />
                  ) : (
                    <></>
                    // <FileButton onChange={handleUploadFunction} accept="application/pdf">
                    //   {(props) => <Button {...props} className='bg-blue-600 hover:bg-blue-700 max-w-xs max-h-sm'>+</Button>}
                    // </FileButton>
                  )}
                </td>
                <td>
                  <Tooltip label={'Revisar orden de depósito'}>
                    <ActionIcon
                      className='bg-slate-200 hover:bg-slate-300 disabled:cursor-not-allowed'
                      disabled={depositOrder.status !== 'Entregado'}
                    >
                      <TbZoomQuestion size={20} color={'#475569'} />
                    </ActionIcon>
                  </Tooltip>
                </td>
                <td className=' text-center'>
                  <Tooltip label={'Cancelar orden de depósito'}>
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
