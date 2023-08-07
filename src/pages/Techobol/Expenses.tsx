import { useState, useRef, useEffect, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Input, Button, Menu } from '@mantine/core'
import { TbSearch } from 'react-icons/tb'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { HiArrowTrendingUp } from 'react-icons/hi2'

import { useLoginStore } from '../../components/store/loginStore'
import { IExpense } from '../../models/Expense'
import { errorToast } from '../../services/toasts'
import { generateExpenseReportPDF } from '../../components/pdf/PDFExpenseReport'

import { getAllExpenses } from '../../services/Expense'
import ExpenseAGTable from '../../components/table/techobol/AGTables/ExpenseAGTable'

import socket from '../../services/SocketIOConnection'
import { useRealTimeDate } from '../../hooks/useRealTimeDate'
import StadisticsModal from '../../components/modals/StadisticsModal'
import { useDisclosure } from '@mantine/hooks'
import DropDownButton from '../../components/buttons/DropDownButton'

const Expenses = () => {
  const { token } = useLoginStore()
  const [expenseData, setExpenseData] = useState<IExpense[]>([])
  const realTimeDate = useRealTimeDate()
  const [isOpen, { open, close }] = useDisclosure()
  const [buscar, setBuscar] = useState('')

  const gridRef = useRef<AgGridReact<IExpense>>(null)
  const filteredExpenseData = useRef<IExpense[]>()
  const addBuscar = (value: string) => {
    setBuscar(value)
  }
  const getExpenses = async () => {
    const data = await getAllExpenses(token)
    if (!data) {
      errorToast('No se pudo obtener la información de las salidas')
      return
    }
    setExpenseData(data)
    filteredExpenseData.current = data
  }

  useEffect(() => {
    getExpenses()
  }, [])

  useEffect(() => {
    socket.on('newExpenses', (data: IExpense[]) => {
      setExpenseData(prevState => [...prevState, ...data])
      filteredExpenseData.current = [...expenseData, ...data]
    })

    return () => {
      socket.off('newExpenses')
    }
  }, [])

  const handleDownloadPDFReport = () => {
    generateExpenseReportPDF(
      filteredExpenseData.current as IExpense[],
      realTimeDate
    )
  }

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
            <Menu shadow='md' width={200}>
              <Menu.Target>
                <Button
                  className='bg-gray-600 hover:bg-gray-700'
                  leftIcon={<HiArrowTrendingUp />}
                >
                  Gráfica de datos
                </Button>
              </Menu.Target>

              <DropDownButton open={open}  addBuscar={addBuscar}/>
            </Menu>

            <StadisticsModal
              isOpen={isOpen}
              onClose={close}
              datas={expenseData}
              buscar={buscar}
            />
            <Button
              className='bg-blue-600 hover:bg-blue-700'
              leftIcon={<BsFillFileEarmarkPdfFill />}
              onClick={handleDownloadPDFReport}
            >
              Descargar PDF
            </Button>
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
          <ExpenseAGTable
            data={expenseData}
            gridRef={gridRef}
            filteredExpenseData={filteredExpenseData}
          />
        </div>
      </div>
    </>
  )
}

export default Expenses
