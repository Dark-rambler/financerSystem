import { Badge } from '@mantine/core'
import StatusEnum from '../../enums/Status'

const StatusBadge = ({ Status }: { Status: string }) => {
    console.log(status)
  return (
    <>{Status.toUpperCase() === StatusEnum.EMITTED && <Badge color='blue'>{Status}</Badge>}
    {Status.toUpperCase() === StatusEnum.RECEIVED && <Badge color='green'>{Status}</Badge>}
    {Status.toUpperCase() === StatusEnum.CANCELED && <Badge color='red'>{Status}</Badge>}</>
  )
}

export default StatusBadge
