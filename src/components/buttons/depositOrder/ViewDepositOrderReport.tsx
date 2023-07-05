import { ActionIcon } from '@mantine/core'
import { HiDocumentChartBar } from 'react-icons/hi2'

import { DepositOrderInterface } from '../../../models/DepositOrder'
import Status from '../../../enums/Status'

interface ViewDepositOrderReport {
  data: DepositOrderInterface
}

const ViewDepositOrderReport = ({ data }: DepositOrderInterface) => {
  const isAvailable = data.status.toUpperCase() === Status.RECEIVED
  return (
    <ActionIcon
      className='bg-gray-100 hover:bg-gray-200'
      disabled={!isAvailable}
    >
      <HiDocumentChartBar
        size={20}
        color={`${isAvailable ? '#2563eb' : '#d1d5db'}`}
      />
    </ActionIcon>
  )
}

export default ViewDepositOrderReport
