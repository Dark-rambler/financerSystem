import { Badge } from '@mantine/core'
import RevisionStatusEnum from '../../enums/RevisionStatus'
import {
  TbClockHour4,
  TbDiscountCheck,
  TbExclamationCircle
} from 'react-icons/tb'
import { DepositOrderInterface } from '../../models/DepositOrder'

const RevisionStatusBadge = ({ data }: DepositOrderInterface) => {
  const RevisionStatus = data.revitionStatus
  return (
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
             {RevisionStatus.toUpperCase() === RevisionStatusEnum.NOT_ASSIGNED && (
              <Badge color='gray'>{RevisionStatus}</Badge>
          )}
    </>
  )
}

export default RevisionStatusBadge
