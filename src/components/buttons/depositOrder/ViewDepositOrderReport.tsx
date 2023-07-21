import { ActionIcon } from '@mantine/core'
import { HiDocumentChartBar } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

import { DepositOrderInterface } from '../../../models/DepositOrder'

interface ViewDepositOrderReport {
  data: DepositOrderInterface
}

const ViewDepositOrderReport = ({ data }: DepositOrderInterface) => {
  const navigate = useNavigate()
  const { id } = data
  return (
    <ActionIcon
      className='bg-gray-100 hover:bg-gray-200'
      onClick={() => navigate(`/techobol/deposit-order-detail/${id}`)}
    >
      <HiDocumentChartBar size={20} color={'#2563eb'} />
    </ActionIcon>
  )
}

export default ViewDepositOrderReport
