import { useEffect, useState } from 'react'
import { Modal, Button } from '@mantine/core'
import {
  TbClockHour4,
  TbDiscountCheck,
  TbExclamationCircle
} from 'react-icons/tb'

import socket from '../../services/SocketIOConnection'

import RevisionStatus from '../../enums/RevisionStatus'
import { updateRevisionStatus as updateRevisionStatusService } from '../../services/DepositOrder'
import { errorToast, succesToast } from '../../services/toasts'

import { DepositOrderInterface } from '../../models/DepositOrder'

import { useLoginStore } from '../store/loginStore'

interface ReviweModalProps {
  opened: boolean
  close: () => void
  data: DepositOrderInterface
}

const ReviewDepositOrderModal = ({ opened, close, data }: ReviweModalProps) => {
  const { token } = useLoginStore()
  const [isActive, setIsActive] = useState([false, false, false])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (data.revisionStatus?.toUpperCase() === RevisionStatus.PENDING)
      setIsActive([true, false, false])
    if (data.revisionStatus?.toUpperCase() === RevisionStatus.OBSERVED)
      setIsActive([false, true, false])
    if (data.revisionStatus?.toUpperCase() === RevisionStatus.APPROBED)
      setIsActive([false, false, true])
  }, [opened])

  const getRevisionStatusToUpdate = () => {
    if (isActive[0])
      return (
        RevisionStatus.PENDING.toLowerCase().charAt(0).toUpperCase() +
        RevisionStatus.PENDING.toLowerCase().slice(1)
      )
    if (isActive[1])
      return (
        RevisionStatus.OBSERVED.toLowerCase().charAt(0).toUpperCase() +
        RevisionStatus.OBSERVED.toLowerCase().slice(1)
      )
    if (isActive[2])
      return (
        RevisionStatus.APPROBED.toLowerCase().charAt(0).toUpperCase() +
        RevisionStatus.APPROBED.toLowerCase().slice(1)
      )

    return ''
  }

  const updateRevisionStatus = async () => {
    setIsLoading(() => true)
    const response = await updateRevisionStatusService(
      getRevisionStatusToUpdate(),
      Number(data.id),
      token
    )
    if (!response) {
      errorToast('Error al actualizar el estado de revisión')
      setIsLoading(() => false)
      return
    }
    close()
    succesToast('Estado de revisión actualizado correctamente')
    socket.emit('updateRevisionStatus', response)
    setTimeout(() => {
      setIsLoading(() => false)
    }, 1000)
  }

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
      <section className=' px-6 pb-7 pt-5 select-none'>
        <div className='flex justify-between'>
          <div
            className='flex flex-col items-center space-y-3 hover:bg-gray-100 p-3 rounded-md hover:cursor-pointer'
            onClick={() => setIsActive([true, false, false])}
          >
            <div
              className={`${
                isActive[0] ? 'bg-[#ffeca1]' : 'bg-[#e2e8f0]'
              } rounded-full w-10 h-10 transition-all flex items-center justify-center`}
            >
              <TbClockHour4
                color={isActive[0] ? '#fbbf24' : '#d1d8e2'}
                className={'stoke-2 transition-all'}
                size={22}
              />
            </div>
            <p>Pendiente</p>
          </div>
          <div
            className='flex flex-col items-center space-y-3 hover:bg-gray-100 p-3 rounded-md hover:cursor-pointer'
            onClick={() => setIsActive([false, true, false])}
          >
            <div
              className={`${
                isActive[1] ? 'bg-red-200 ' : 'bg-[#e2e8f0]'
              } rounded-full w-10 h-10 transition-all flex items-center justify-center`}
            >
              <TbExclamationCircle
                color={isActive[1] ? '#ef4444' : '#d1d8e2'}
                className={'stoke-2 transition-all'}
                size={22}
              />
            </div>
            <p>Observado</p>
          </div>
          <div
            className='flex flex-col items-center space-y-3 hover:bg-gray-100 p-3 rounded-md hover:cursor-pointer'
            onClick={() => setIsActive([false, false, true])}
          >
            <div
              className={`${
                isActive[2] ? 'bg-[#86efac]' : 'bg-[#e2e8f0]'
              } rounded-full  w-10 h-10 transition-all flex items-center justify-center`}
            >
              <TbDiscountCheck
                color={isActive[2] ? '#22c55e' : '#d1d8e2'}
                className={'stoke-2 transition-all'}
                size={22}
              />
            </div>
            <p>Aprobado</p>
          </div>
        </div>
      </section>

      <div className='flex justify-end' onClick={updateRevisionStatus}>
        <Button className='bg-blue-600 hover:bg-blue-700' loading={isLoading}>
          Guardar
        </Button>
      </div>
    </Modal>
  )
}

export default ReviewDepositOrderModal
