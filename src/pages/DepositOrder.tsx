import RegisterDepositOrderModal from '../modals/RegisterDepositOrderModal'
import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'


const DepositOrder = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div className='h-full bg-slate-200'>
      <div className='w-full p-5'>
        <div>
          <div className='w-64'>
            {/* <BlueButton label={'Emitir nueva orden de depósito'} onClick={() => {() => window.my_modal_1.showModal()} } isLoading={false}/> */}
            <Button
              size='sm'
              variant='filled'
              color='blue'
              radius={'sm'}
              className='bg-blue-600 hover:bg-blue-700'
              onClick={open}
            >
              Emitir nueva orden de depósito
            </Button>
            <RegisterDepositOrderModal opened={opened} close={close}/>
   
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default DepositOrder
