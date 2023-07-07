import { Badge } from '@mantine/core'
import StatusEnum from '../../enums/Status'
import { DepositOrderInterface } from '../../models/DepositOrder'

const StatusBadge = ({ data }: { data: DepositOrderInterface }) => {
  const Status = data.status
  return (
    <>
      {Status?.toUpperCase() === StatusEnum.EMITTED && (
        <Badge color='blue'>{Status}</Badge>
      )}
      {Status?.toUpperCase() === StatusEnum.RECEIVED && (
        <Badge color='green'>{Status}</Badge>
      )}
      {Status?.toUpperCase() === StatusEnum.CANCELED && (
        <Badge color='red'>{Status}</Badge>
      )}
    </>
  )
}

export default StatusBadge
