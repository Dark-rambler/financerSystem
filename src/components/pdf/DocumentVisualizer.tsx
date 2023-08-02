//This component replace the PDF visualizer, but it just show a representation in HTML of the PDF
import { useEffect, useState } from 'react'
import { Image } from '@mantine/core'
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
    <div className='relative w-full h-full'>
      <Image
        className='absolute top-0 left-0 object-contain rounded-md -z-10 w-full h-full'
        src='/images/depositOrderTechobol.jpg'
        alt=''
      />

      <section className=' py-[164px] pl-[71px]'>
        <div className='space-y-2'>
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
        </div>

        <div className='pt-[58px] pb-[17px]'>
          <div className='flex space-x-2 font-sans text-[10px]'>
            <p className='font-bold '>FECHAS DEL DEPÓSITO: </p>
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
        </div>

        <div className='absolute top-[160px] right-[110px]'>
          <p className='font-sans text-[12px] font-semibold '>{depositOrder.form.values.orderNumber}</p>
        </div>

        <div className='px-[134px] space-y-[2px]'>
          <div className='p-[4px] px-[11px] flex relative space-x-[100px] border border-gray-800 w-[248px]'>
            <p className='font-bold font-sans text-[10px]'>SUCURSAL</p>
            <p className='font-bold space-x-2 font-sans text-[10px]'>MONTO</p>
          </div>
          {depositOrder.branchOfficesAndAmounts.map((element, index) => (
            <div key={`table-${index}`} className='p-[4px] px-[11px] flex relative border border-gray-800 w-[248px]'>
              <p className='font-semibold font-sans text-[10px]'>
                {element.branchOffice.label.toUpperCase()}
              </p>
              <p className='absolute left-[167px] font-semibold space-x-2 font-sans text-[10px]'>
                {element.amount.toFixed(2)} BS.
              </p>
            </div>
          ))}
          <div className='p-[4px] px-[11px] flex relative border border-gray-800 w-[248px]'>
            <p className='font-bold font-sans text-[10px]'>TOTAL A DEPOSITAR</p>
            <p className='absolute left-[167px] font-bold space-x-2 font-sans text-[10px]'>
              {depositOrder.totalAmount.toFixed(2)} BS.
            </p>
          </div>
          <div className='flex space-x-2 pt-1'>
            <p className='font-bold italic font-sans text-[9px]'>
              Fecha límite de depósito:{' '}
            </p>
            <p className='font-semibold italic font-sans text-[9px]'>{depositOrder.form.values.limitedDate ? `${dayjs(
              depositOrder.form.values.limitedDate
            )
              .locale('es-us')
              .format('DD MMMM YYYY')
              .toUpperCase()}` : ''}</p>
          </div>
        </div>

        <div className='absolute flex top-[672px] space-x-[88px] left-[121px]'>
          <div className=' w-[160px] text-center space-y-[6px]'>
            <p className='font-sans text-[10px] font-semibold '>
              {' '}
              {financeBoss
                ? `${financeBoss?.name.toUpperCase()} ${financeBoss?.lastName.toUpperCase()}`
                : ''}
            </p>
            <p className='font-sans text-[9px] font-bold '>JEFE DE FINANZAS</p>
          </div>

          <div className=' w-[160px] text-center space-y-[6px] '>
            <p className='font-sans text-[10px] font-semibold '>
              {' '}
              {financeTechical
                ? `${financeTechical?.name.toUpperCase()} ${financeTechical?.lastName.toUpperCase()}`
                : ''}
            </p>
            <p className='font-sans text-[9px] font-bold '>
              TÉCNICO DE FINANZAS
            </p>
          </div>
        </div>
      </section>

      {/* <div className='  bg-red-500 w-[247px] h-[23px]'></div> */}
    </div>
  )
}

export default DocumentVisualizer
