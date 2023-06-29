import RegisterDepositOrderForm from '../../components/forms/RegisterDepositOrderForm'
import PDFVisualizer from '../../components/pdf/PDFVisualizer'

import { Button, Stack, ActionIcon } from '@mantine/core'

import { TbChevronLeft } from 'react-icons/tb'

import { useNavigate } from 'react-router-dom'
import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'

const RegisterDepositOrder = () => {
  const navigate = useNavigate()
  const registerOrder = useRegisterDepositOrder()
  return (
    <div className='h-full min-w-[1200px] flex justify-center'>

        <div className=' grid grid-cols-2 h-full'>
          <div className='pr-24 py-16 space-y-10'>
            <div className='relative flex'>
              <ActionIcon
                className='absolute left-[-50px]'
                size={'md'}
                onClick={() => {
                  navigate('/deposit-order')
                }}
              >
                <TbChevronLeft />
              </ActionIcon>
              <h1 className=' text-gray-900 font-bold text-xl m-0'>
                Emitir nueva orden de depósito
              </h1>
            </div>
            <RegisterDepositOrderForm depositOrder={registerOrder} />
          </div>
          <Stack className='  border-gray-300 h-full py-9' spacing={20}>
            <div className='border border-gray-300 h-full rounded-md border-dashed '>
              {/* {registerOrder.isDocumentGenerated && <PDFVisualizer />} */}
              <PDFVisualizer depositOrder={registerOrder} />
            </div>
            <Button
              disabled={!registerOrder.isDocumentGenerated}
              className=' disabled:hover:cursor-not-allowed w-full bg-blue-600 hover:bg-blue-700'
              onClick={() => {registerOrder.onCreateDepositOrder()}}
            >
              Enviar orden de depósito
            </Button>
          </Stack>
        </div>
   
    </div>
  )
}

export default RegisterDepositOrder
