import { ActionIcon } from '@mantine/core'
import { MdOutlineAddBox } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { useDepositOrderStore } from '../../store/depositOrderStore'
import { DepositOrderInterface } from '../../../models/DepositOrder'
import Status from '../../../enums/Status'

interface GenerateDepositOrderReport {
  data: DepositOrderInterface
}

const GenerateDepositOrderReport = ({ data }: GenerateDepositOrderReport) => {
  const { setDepositOrder } = useDepositOrderStore()
  const isAvailable = data.status?.toUpperCase() === Status.EMITTED
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/techobol/create-deposit-order-report')
    setDepositOrder(data)
  }

  return (
    <ActionIcon
      className={` bg-gray-100 hover:bg-gray-200`}
      disabled={!isAvailable}
      onClick={handleOnClick}
    >
      <MdOutlineAddBox
        size={20}
        color={`${isAvailable ? '#6b7280' : '#d1d5db'}`}
      />
    </ActionIcon>
  )
}

export default GenerateDepositOrderReport
