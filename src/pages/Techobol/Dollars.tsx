import { useState, useRef, useEffect, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Input } from '@mantine/core'
import { TbSearch } from 'react-icons/tb'

import { useLoginStore } from '../../components/store/loginStore'
import { IDollar } from '../../models/Dollar'
import { errorToast } from '../../services/toasts'

import { getAllDollars } from '../../services/Dollar'
import DollarAGTable from '../../components/table/techobol/AGTables/DollarAGTable'
import socket from '../../services/SocketIOConnection'

const Dollars = () => {
  const { token } = useLoginStore()
  const [dollarData, setDollarData] = useState<IDollar[]>([])

  const gridRef = useRef<AgGridReact<IDollar>>(null)

  const getDollars = async () => {
    const data = await getAllDollars(token)
    if (!data) {
      errorToast('No se pudo obtener la información de los dólares')
      return
    }
    setDollarData(data)
  }

  useEffect(() => {
    getDollars()
  }, [])

  
  useEffect(() => {
    socket.on('newDollars', (data: IDollar[]) => {
      setDollarData(prevState => [...prevState, ...data])
    })

    return () => { 
      socket.off('newDollars')
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
            <h1 className='font-bold text-md'>DÓLARES</h1>
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
          <DollarAGTable data={dollarData} gridRef={gridRef} />
        </div>
      </div>
    </>
  )
}

export default Dollars
