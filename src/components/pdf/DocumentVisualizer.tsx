//This component replace the PDF visualizer, but it just show a representation in HTML of the PDF
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { EmployeeInterface } from '../../models/Employee'
import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'

interface DocumentVisualizerProps {
  depositOrder: ReturnType<typeof useRegisterDepositOrder>
}

const DocumentVisualizer = ({ depositOrder }: DocumentVisualizerProps) => {
  const [financeTechical, setFinanceTechical] = useState<EmployeeInterface>()
  const [financeBoss, setFinanceBoss] = useState<EmployeeInterface>()

  useEffect(() => {
    const financeTechical = depositOrder.employeesData.find(
      employee => employee.role?.name === 'Técnico de finanzas'
    )
    const financeBoss = depositOrder.employeesData.find(
      employee => employee.role?.name === 'Jefe de finanzas'
    )
    setFinanceBoss(financeBoss)
    setFinanceTechical(financeTechical)
  }, [depositOrder.employeesData])

  return (
    <div className='w-full h-full'>
      <img
        className='object-contain rounded-md fixed -z-10'
        width={'661px'}
        //   height={25}
        src='/images/depositOrderTechobol.jpg'
        alt=''
      />
      <div className=' py-[164px] pl-[71px]'>
      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-bold '>FECHA: </p>
        <p className='font-semibold'>
          {' '}
          {depositOrder.form.values.orderDate
            ? `${dayjs(depositOrder.form.values.orderDate)
                .locale('es-us')
                .format('DD MMMM YYYY')
                .toUpperCase()}`
            : ''}
        </p>
      </div>

      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-semibold '>
          {' '}
          {`${financeTechical?.name.toUpperCase()} ${financeTechical?.lastName.toUpperCase()}`}
        </p>
      </div>

      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-semibold '>
          {' '}
          {`${financeBoss?.name.toUpperCase()} ${financeBoss?.lastName.toUpperCase()}`}
        </p>
      </div>

      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-bold '>SUCURSAL: </p>
        <p className='font-semibold '>
          {' '}
          {`${depositOrder.form.values.regional.toUpperCase()}`}
        </p>
      </div>

      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-bold '>RESPONSABLE: </p>
        <p className='font-semibold '>
          {' '}
          {`${depositOrder.form.values.administrator.toUpperCase()}`}
        </p>
      </div>

      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-bold '>FECHAS DEL DEPOSITO: </p>
        <p className='font-semibold '>
          {depositOrder.form.values.orderRange[0] &&
          depositOrder.form.values.orderRange[1]
            ? `${dayjs(depositOrder.form.values.orderRange[0])
                .locale('es-us')
                .format('DD MMMM YYYY')
                .toUpperCase()} - ${dayjs(
                depositOrder.form.values.orderRange[1]
              )
                .locale('es-us')
                .format('DD MMMM YYYY')
                .toUpperCase()}`
            : ''}
        </p>
      </div>

      {/* <div className='  bg-red-500 w-[247px] h-[23px]'></div> */}

      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-bold '>SUCURSAL</p>
      </div>
      <div className='flex space-x-2 font-sans text-[10px]'>
        <p className='font-bold'>MONTO</p>
      </div>

      <div className='flex  space-x-2 font-sans text-[9px]'>
        <p className='font-bold '>JEFE DE FINANZAS</p>
      </div>
      <div className='flexspace-x-2 font-sans text-[9px]'>
        <p className='font-bold'>TÉCNICO DE FINANZAS</p>
      </div>
      {/* {depositOrder.branchOfficesAndAmounts.map((branchOffice, index) => (
        <div className={`absolute border border-gray-800 top-[${343 + index}px] left-[205px] w-[249px] h-[23px]`}></div>

        ))} */}

      <div
        className={`absolute border border-gray-800 top-[150px] left-[205px] w-[249px] h-[23px]`}
      ></div>
      </div>

    
    </div>
  )
}

export default DocumentVisualizer
