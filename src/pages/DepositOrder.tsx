import { Button } from '@mantine/core'

import { useNavigate } from 'react-router-dom'
import { TbPlus } from 'react-icons/tb'
import { useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useState, useMemo } from 'react'
import { Table } from '../components/table/Table'
import StatusBadge from '../components/badges/StatusBadge'
import RevisionStatusBadge from '../components/badges/RevisionStatusBadge'
import ReviewDepositOrder from '../components/buttons/ReviewDepositOrder'
import CancelDepositOrder from '../components/buttons/CancelDepositOrder'
//import default as another
import CancelDepositOrderModal from '../components/modals/CancelDepositOrder'

import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'

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

const DepositOrder = () => {
  const navigate = useNavigate()
  const { token } = useLoginStore()
  const [despositOrderData, setDepositOrderData] = useState([])

  const cols = useMemo<ColumnDef<DepositOrderModel>[]>(
    () => [
      {
        header: 'Nº Orden',
        cell: row => row.renderValue(),
        accessorKey: 'orderNumber',
        enableSorting: true
      },
      {
        header: 'Fecha de orden',
        cell: row =>
          `${dayjs(row.row.original.solitudeDate)
            .locale('es-us')
            .format('DD MMMM YYYY')}`,
        accessorKey: 'solitudeDate'
      },
      {
        header: 'Regional',
        cell: row => row.renderValue(),
        accessorKey: 'regional.name'
      },
      {
        header: 'Administrador',
        cell: row =>
          row.row.original.employee.name +
          ' ' +
          row.row.original.employee.lastName,
        accessorKey: 'employee'
      },
      {
        header: 'Monto',
        cell: row => `${row.renderValue()} Bs.`,
        accessorKey: 'amount'
      },
      {
        header: 'Periodo deposito',
        cell: row =>
          `${dayjs(row.row.original.startDate)
            .locale('es-us')
            .format('DD MMMM YYYY')} - ${dayjs(row.row.original.endDate)
            .locale('es-us')
            .format('DD MMMM YYYY')}`
      },
      {
        header: 'Fecha limite',
        cell: row =>
          `${dayjs(row.row.original.deliveryDate)
            .locale('es-us')
            .format('DD MMMM YYYY')}`,
        accessorKey: 'deliveryDate'
      },
      {
        header: 'Estado de entrega',
        cell: row => <StatusBadge Status={row.row.original.status} />,
        accessorKey: 'status'
      },
      {
        header: 'Estado de revisión',
        cell: row => (
          <RevisionStatusBadge
            Status={row.row.original.status}
            RevisionStatus={row.row.original.revitionStatus}
          />
        ),
        accessorKey: 'revitionStatus'
      },
      {
        header: 'Documento',
        cell: row => row.renderValue(),
        accessorKey: 'document'
      },
      {
        header: 'Informe',
        cell: row => row.renderValue(),
        accessorKey: 'report'
      },
      {
        header: '',
        cell: row => <ReviewDepositOrder status={row.row.original.status} />,
        accessorKey: 'review'
      },
      {
        header: '',
        cell: row => {
          // setSelectedOrder(row.row.original)
          return <CancelDepositOrder status={row.row.original.status} id={row.row.original.id} />
        },
        accessorKey: 'cancel'
      }
    ],
    []
  )

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}/deposit-order/deposit-orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(data => {
        setDepositOrderData(data)
      })
  }, [])

  return (
    <>
      <div className='h-full bg-white'>
        <div className='w-full p-10 space-y-5 h-full'>
          <div>
            {/* <blueButton label={'Emitir nueva orden de depósito'} onClick={() => {() => window.my_modal_1.showModal()} } isLoading={false}/> */}
            <Button
              leftIcon={<TbPlus />}
              size='sm'
              variant='filled'
              color='blue'
              radius={'sm'}
              className='bg-blue-600 hover:bg-blue-700'
              // onClick={open}
              onClick={() => {
                navigate('/techobol/register-deposit-order')
              }}
            >
              Emitir nueva orden de depósito
            </Button>
          </div>
          <div className='h-full'>
            {/* <DepositOrderTable depositOrderData={despositOrderData} /> */}
            <Table data={despositOrderData} columns={cols} showNavigation/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DepositOrder
