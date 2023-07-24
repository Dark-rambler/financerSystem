import { useState } from 'react'
import { Modal, Button } from '@mantine/core'

interface ReviweModalProps {
  opened: boolean
  close: () => void
}

const ReviewDepositOrderModal = ({ opened, close }: ReviweModalProps) => {
  const [isActive, setIsActive] = useState([false, false, false])

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={'Revisar informe'}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      size={'md'}
    >
      <section className=' px-6 pb-7 pt-5'>
        <div className='flex justify-between'>
          <div
            className='flex flex-col items-center space-y-3 hover:bg-gray-100 p-3 rounded-md hover:cursor-pointer'
            onClick={() => setIsActive([true, false, false])}
          >
            <div
              className={`${
                isActive[0] ? 'bg-[#fab005]' : 'bg-[#e2e8f0]'
              } rounded-full w-10 h-10 transition-all`}
            ></div>
            <p>Pendiente</p>
          </div>
          <div
            className='flex flex-col items-center space-y-3 hover:bg-gray-100 p-3 rounded-md hover:cursor-pointer'
            onClick={() => setIsActive([false, true, false])}
          >
            <div
              className={`${
                isActive[1] ? 'bg-red-500 ' : 'bg-[#e2e8f0]'
              } rounded-full w-10 h-10 transition-all`}
            ></div>
            <p>Observado</p>
          </div>
          <div
            className='flex flex-col items-center space-y-3 hover:bg-gray-100 p-3 rounded-md hover:cursor-pointer'
            onClick={() => setIsActive([false, false, true])}
          >
            <div
              className={`${
                isActive[2] ? 'bg-[#40c057]' : 'bg-[#e2e8f0]'
              } rounded-full  w-10 h-10 transition-all`}
            ></div>
            <p>Aprobado</p>
          </div>
        </div>
      </section>

      <div className='flex justify-end'>
        <Button className='bg-blue-600 hover:bg-blue-700'>Guardar</Button>
      </div>
    </Modal>
  )
}

export default ReviewDepositOrderModal
