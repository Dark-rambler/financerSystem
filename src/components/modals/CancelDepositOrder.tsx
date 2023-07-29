import { useState } from 'react'
import { Button, Modal } from '@mantine/core'

import { useLoginStore } from '../store/loginStore'
import { errorToast, succesToast } from '../../services/toasts'
import { cancelDepositOrder } from '../../services/DepositOrder'
import socket from '../../services/SocketIOConnection'

interface CancelDepositOrderProps {
  id?: number
  opened: boolean
  close: () => void
}

const CancelDepositOrder = ({ opened, close, id }: CancelDepositOrderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useLoginStore()

  const handleCancelButton = async () => {
    setIsLoading(() => true)
    const response = await cancelDepositOrder(Number(id), token)

    if (!response) {
      setIsLoading(() => false)
      errorToast('Error al cancelar la orden de depósito')
      return
    }
    close()
    succesToast('Orden de depósito cancelada')
    setIsLoading(() => false)
    socket.emit('updateDepositOrder', response)
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={'Cancelar orden de depósito'}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
        size={'md'}
      >
        <div className='space-y-2'>
          {/* <p className=' text-md'>
            ¿Está seguro que desea cancelar la orden de depósito?
          </p> */}
          <p className='text-sm '>Esta accion no se puede deshacer</p>
        </div>
        <div className='pt-5 flex justify-end'>
          <Button
            loading={isLoading}
            onClick={handleCancelButton}
            className='bg-red-600 hover:bg-red-700 w-full'
          >
            Cancelar orden de depósito
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default CancelDepositOrder
