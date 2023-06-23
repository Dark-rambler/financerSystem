import { Badge } from '@mantine/core'
import RevisionStatusEnum from '../../enums/RevisionStatus'
import StatusEnum from '../../enums/Status'
import {
  TbClockHour4,
  TbDiscountCheck,
  TbExclamationCircle
} from 'react-icons/tb'

const RevisionStatusBadge = ({
  RevisionStatus,
  Status
}: {
  RevisionStatus: string
  Status: string
}) => {
  return (
    <>
      {Status.toUpperCase() === StatusEnum.RECEIVED ? (
        <>
          {RevisionStatus.toUpperCase() === RevisionStatusEnum.PENDING && (
            <Badge color='yellow' leftSection={<TbClockHour4 />}>
              {RevisionStatus}
            </Badge>
          )}
          {RevisionStatus.toUpperCase() === RevisionStatusEnum.APPROBED && (
            <Badge color='green' leftSection={<TbDiscountCheck />}>
              {RevisionStatus}
            </Badge>
          )}
          {RevisionStatus.toUpperCase() === RevisionStatusEnum.OBSERVED && (
            <Badge color='red' leftSection={<TbExclamationCircle />}>
              {RevisionStatus}
            </Badge>
          )}
        </>
      ) : (
        <Badge color='gray'>
         No asignado
        </Badge>
      )}
    </>
  )
}

export default RevisionStatusBadge
