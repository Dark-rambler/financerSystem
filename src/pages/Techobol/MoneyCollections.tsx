import { useState, useRef, useEffect, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Input } from '@mantine/core'
import { TbSearch } from 'react-icons/tb'

import { useLoginStore } from '../../components/store/loginStore'
import { IMoneyCollection } from '../../models/MoneyCollection'
import { errorToast } from '../../services/toasts'

import { getAllMoneyCollections } from '../../services/MoneyCollection'
import MoneyCollectionAGTable from '../../components/table/techobol/AGTables/MoneyCollectionAGTable'

const MoneyCollections = () => {
  const { token } = useLoginStore()
  const [moneyCollectionData, setMoneyCollectionData] = useState<
    IMoneyCollection[]
  >([])

  const gridRef = useRef<AgGridReact<IMoneyCollection>>(null)

  const getMoneyCollections = async () => {
    const data = await getAllMoneyCollections(token)
    if (!data) {
      errorToast('No se pudo obtener la información de las recaudaciones')
      return
    }
    setMoneyCollectionData(data)
  }

  useEffect(() => {
    getMoneyCollections()
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
            <h1 className='font-bold text-md'>RECAUDACIONES</h1>
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
          <MoneyCollectionAGTable
            data={moneyCollectionData}
            gridRef={gridRef}
          />
        </div>
      </div>
    </>
  )
}

export default MoneyCollections
