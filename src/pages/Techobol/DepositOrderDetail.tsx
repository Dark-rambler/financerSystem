import { Divider } from '@mantine/core'
import ViewDocument from '../../components/buttons/depositOrder/ViewDocument'
import SingleDepositOrderTable from '../../components/table/techobol/SingleDepositOrderTable'

import { useDepositOrderStore } from '../../components/store/depositOrderStore'

const DepositOrderDetail = () => {
  const { depositOrder } = useDepositOrderStore()

  return (
    <div className='p-14 space-y-9'>
      <div className='space-y-4'>
        <h1 className='text-xl font-bold'>Documento</h1>
        <div className='flex items-end space-x-3 px-3'>
          <ViewDocument
            label='Orden de depósito'
            url={depositOrder.documentUrl as string}
          />
        </div>
      </div>
      <Divider />
      <div className='space-y-4'>
        <h1 className='text-xl font-bold'>Orden de depósito</h1>
        <SingleDepositOrderTable />
      </div>
    </div>
  )
}

export default DepositOrderDetail
