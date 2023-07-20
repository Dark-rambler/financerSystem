import { useState, useRef, useEffect, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Input } from '@mantine/core'
import { TbSearch } from 'react-icons/tb'

import { useLoginStore } from '../../components/store/loginStore'
import { IExpense } from '../../models/Expense'
import { errorToast } from '../../services/toasts'

import { getAllExpenses } from '../../services/Expense'
import ExpenseAGTable from '../../components/table/techobol/AGTables/ExpenseAGTable'

const Expenses = () => {
  const { token } = useLoginStore()
  const [expenseData, setExpenseData] = useState<IExpense[]>([])

  const gridRef = useRef<AgGridReact<IExpense>>(null)

  const getExpenses = async () => {
    const data = await getAllExpenses(token)
    if (!data) {
      errorToast('No se pudo obtener la información de las salidas')
      return
    }
    setExpenseData(data)
  }

  useEffect(() => {
    getExpenses()
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
            <h1 className='font-bold text-md'>SALIDAS</h1>
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
          <ExpenseAGTable data={expenseData} gridRef={gridRef} />
        </div>
      </div>
    </>
  )
}

export default Expenses
