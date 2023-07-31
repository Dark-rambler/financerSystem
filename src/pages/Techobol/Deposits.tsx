
import { useState, useRef, useEffect, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Input } from '@mantine/core'
import { TbSearch } from 'react-icons/tb'

import { useLoginStore } from '../../components/store/loginStore'
import { IDeposit } from '../../models/Deposit'
import { errorToast } from '../../services/toasts'

import { getAllDeposits } from '../../services/Deposit'
import DepositAGTable from '../../components/table/techobol/AGTables/DepositAGTable'
import socket from '../../services/SocketIOConnection'

const Deposits = () => {
  const { token } = useLoginStore()
  const [depositData, setDepositData] = useState<IDeposit[]>([])

  const gridRef = useRef<AgGridReact<IDeposit>>(null)

  const getDeposits = async () => {
    const data = await getAllDeposits(token)
    if (!data) {
      errorToast('No se pudo obtener la información de los depósitos')
      return
    }
    setDepositData(data)
  }

  useEffect(() => {
    getDeposits()
  }, [])

  
  useEffect(() => {
    socket.on('newDeposits', (data: IDeposit[]) => {
      setDepositData(prevState => [...prevState, ...data])
    })

    return () => { 
      socket.off('newDeposits')
    }
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
            <h1 className='font-bold text-md'>DEPÓSITOS</h1>
          </div>

          <div className='flex space-x-5'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={onFilterTextBoxChanged}
            />
          </div>
        </div>

        <div className='h-[calc(100%-46px)]'>
          <DepositAGTable data={depositData} gridRef={gridRef} />
        </div>
      </div>
    </>
  )
}

export default Deposits
