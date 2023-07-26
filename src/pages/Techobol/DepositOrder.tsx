import { Button, Input } from '@mantine/core'

import { TbPlus, TbSearch } from 'react-icons/tb'

import { Roles } from '../../enums/Roles'
import Table from '../../components/table/DepositOrderTable'
import useDepositOrder from '../../hooks/useDepositOrder'



const DepositOrder = () => {
 const depositOrder = useDepositOrder()

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>ÓRDENES DE DEPÓSITO</h1>
          </div>

          <div className='flex space-x-5'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={depositOrder.onFilterTextBoxChanged}
            />
            {depositOrder.role === Roles.FINANCIAL_MANAGER && (
              <Button
                leftIcon={<TbPlus />}
                size='sm'
                variant='filled'
                color='blue'
                radius={'sm'}
                className='bg-blue-600 hover:bg-blue-700'
                // onClick={open}
                onClick={() => {
                  depositOrder.navigate('/techobol/register-deposit-order')
                }}
              >
                Emitir nueva orden de depósito
              </Button>
            )}
          </div>
        </div>

        <div className='h-[calc(100%-46px)]'>
          <Table
            depositOrderData={depositOrder.depositOrderData}
            gridRef={depositOrder.gridRef}
          />
        </div>
      </div>
    </>
  )
}

export default DepositOrder
