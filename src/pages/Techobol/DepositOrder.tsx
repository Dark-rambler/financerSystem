import { Button, Input } from '@mantine/core'

import { useNavigate } from 'react-router-dom'
import { TbPlus, TbSearch, TbFilter, TbFilterOff } from 'react-icons/tb'
import { useEffect } from 'react'
import { useLoginStore } from '../../components/store/loginStore'
import { useState, useRef, useCallback } from 'react'

import { DepositOrderInterface } from '../../models/DepositOrder'
import { getAllDepositOrders } from '../../services/DepositOrderService'
import { errorToast } from '../../services/toasts'
import Table from '../../components/table/Table'

import { AgGridReact } from 'ag-grid-react'

const DepositOrder = () => {
  const navigate = useNavigate()
  const { token } = useLoginStore()
  const [depositOrderData, setDepositOrderData] = useState<
    DepositOrderInterface[]
  >([])

  const gridRef = useRef<AgGridReact<DepositOrderInterface>>(null)

  const getDepositOrders = async () => {
    const data = await getAllDepositOrders(token)
    if (!data) {
      errorToast('No se pudo obtener la información de las ordenes de deposito')
      return
    }
    setDepositOrderData(data)
  }

  useEffect(() => {
    getDepositOrders()
  }, [])

  const onFilterTextBoxChanged = useCallback(() => {
    let value = ''
    const input = document.getElementById(
      'filter-text-box'
    ) as HTMLInputElement | null

    if (input !== null) {
      value = input.value
    }
    gridRef.current?.api.setQuickFilter(value)
  }, [])

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>ÓRDENES DE DEPÓSITO</h1>
          </div>

          <div className='flex space-x-5'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={onFilterTextBoxChanged}
            />
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
        </div>

        <div className='h-[calc(100%-46px)]'>
          <Table depositOrderData={depositOrderData} gridRef={gridRef} />
        </div>
      </div>
    </>
  )
}

export default DepositOrder
