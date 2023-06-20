import RegisterDepositOrderForm from '../components/forms/RegisterDepositOrderForm'
import { Button, Stack, ActionIcon } from '@mantine/core'

import { TbChevronLeft } from 'react-icons/tb'

import { useNavigate } from 'react-router-dom'

const RegisterDepositOrder = () => {
  const navigate = useNavigate()
  return (
    <div className='h-full min-w-[1200px] py-10 flex justify-center'>
      <div>
        <div className='relative flex'>
          <ActionIcon
            className='absolute left-[-50px]'
            size={'md'}
            onClick={() => {
              navigate(-1)
            }}
          >
            <TbChevronLeft />
          </ActionIcon>
          <h1 className=' text-gray-900 font-bold text-xl'>
            Emitir nueva orden de depósito
          </h1>
        </div>

        <div className='pt-10 grid grid-cols-2 h-full pb-20'>
          <div className='pr-24'>
            {' '}
            <RegisterDepositOrderForm />
          </div>
          <Stack
            className=' pl-24 border-l border-gray-300 h-full'
            spacing={20}
          >
            <div className='border border-gray-300 h-full rounded-md border-dashed'></div>
            <Button
              disabled
              className=' disabled:hover:cursor-not-allowed w-full bg-blue-600 hover:bg-blue-700'
            >
              Enviar orden de depósito
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default RegisterDepositOrder
