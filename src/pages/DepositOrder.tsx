import { Button, Input } from '@mantine/core'

import { useNavigate } from 'react-router-dom'
import { TbPlus, TbSearch, TbFilter, TbFilterOff } from 'react-icons/tb'
import { useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useState, useRef, useCallback } from 'react'

import { DepositOrderInterface } from '../models/DepositOrder'
import { useDisclosure } from '@mantine/hooks'
import { useFilterTable } from '../hooks/useFilterTable'
import FilterTable from '../components/modals/FilterTable'
import { getAllDepositOrders } from '../services/DepositOrderService'
import { errorToast } from '../services/toasts'
import Table from '../components/table/Table'

import { AgGridReact } from 'ag-grid-react'

const DepositOrder = () => {
  const navigate = useNavigate()
  const { token } = useLoginStore()
  const [depositOrderData, setDepositOrderData] = useState<
    DepositOrderInterface[]
  >([])

  const [opened, { close, open }] = useDisclosure()
  const filter = useFilterTable(depositOrderData)
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
        <div className='flex space-x-5'>
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
          <Input
            id='filter-text-box'
            icon={<TbSearch />}
            placeholder={'Buscar..'}
            className='w-72'
            onChange={onFilterTextBoxChanged}
          />
          <Button
            onClick={open}
            className='bg-gray-50 border border-gray-300 text-gray-800 hover:bg-gray-100'
          >
            <div className='flex justify-between space-x-1 items-center'>
              <TbFilter />
              <p>Filtrar tabla</p>
            </div>
          </Button>
          <Button
            // onClick={open}
            className='bg-gray-50 border border-gray-300 text-gray-800 hover:bg-gray-100'
          >
            <div className='flex justify-between space-x-1 items-center'>
              <TbFilterOff />
              <p>Qutiar filtros</p>
            </div>
          </Button>
        </div>

        <div className='h-[calc(100%-46px)]'>
          {/* <DepositOrderTable depositOrderData={selectedData} /> */}
          <Table depositOrderData={depositOrderData} gridRef={gridRef} />
          {/* <Table data={despositOrderData} columns={cols} showNavigation/> */}
        </div>
      </div>
      <FilterTable opened={opened} close={close} filterHook={filter} />
    </>
  )
}

export default DepositOrder
