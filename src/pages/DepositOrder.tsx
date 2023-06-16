import { Button } from '@mantine/core'

import { useNavigate } from 'react-router-dom'
import {TbPlus} from 'react-icons/tb'


const DepositOrder = () => {
  const navigate = useNavigate()
  return (
    <div className='h-full bg-white'>
      <div className='w-full p-5'>
        <div>
          <div className='w-64'>
            {/* <blueButton label={'Emitir nueva orden de depósito'} onClick={() => {() => window.my_modal_1.showModal()} } isLoading={false}/> */}
            <Button
            leftIcon={<TbPlus />}
              size='sm'
              variant='filled'
              color='blue'
              radius={'sm'}
              className='bg-blue-600 hover:bg-blue-700'
              // onClick={open}
              onClick={() => {navigate('/techobol/register-deposit-order')}}
            >
              Emitir nueva orden de depósito
            </Button>
   
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default DepositOrder
