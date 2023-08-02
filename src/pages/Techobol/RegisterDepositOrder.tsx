import { Stack, AspectRatio } from '@mantine/core'

import { useNavigate } from 'react-router-dom'

import RegisterDepositOrderForm from '../../components/forms/RegisterDepositOrderForm'
import DocumentVisualizer from '../../components/pdf/DocumentVisualizer'
import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'
import ConfirmModal from '../../components/modals/ConfirmModal'
import ReturnButton from '../../components/buttons/depositOrder/ReturnButton'

const RegisterDepositOrder = () => {
  const navigate = useNavigate()
  const registerOrder = useRegisterDepositOrder()
  return (
    <>
      <div className='h-full  flex justify-center'>
        <div className=' grid grid-cols-2 h-full w-[1365px] p-5 space-x-5'>
          <Stack className='py-9 space-y-4 h-full max-w-[550px] min-w-[370px]'>
            <div className='relative flex'>
              <div className='absolute left-[-50px]'>
              <ReturnButton
                onClick={() => navigate('/techobol/deposit-order')}
              />
              </div>
    
              <h1 className=' text-gray-900 font-bold text-xl m-0'>
                Emitir nueva orden de depósito
              </h1>
            </div>

            <RegisterDepositOrderForm depositOrder={registerOrder} />
          </Stack>
          <Stack
            className=' border-gray-300 h-full py-0 min-w-[660px]'
            spacing={20}
          >
            <AspectRatio ratio={9 / 11.6}>
              <div className='border border-gray-300 rounded-md w-full'>
                <DocumentVisualizer depositOrder={registerOrder} />
              </div>
            </AspectRatio>
          </Stack>
        </div>
      </div>
      <ConfirmModal
        opened={registerOrder.opened}
        close={registerOrder.close}
        onClick={() => {
          registerOrder.onCreateDepositOrder()
        }}
        primaryColor='blue'
        title='Emitir orden de depósito'
        description='Esta orden de depósito no puede ser modificada una vez emitida'
        buttonText='Emitir'
        isLoading={registerOrder.isLoading}
      />
    </>
  )
}

export default RegisterDepositOrder
