import { Tooltip, ActionIcon } from '@mantine/core'
import { TbZoomQuestion } from 'react-icons/tb'
import { DepositOrderInterface } from '../../../models/DepositOrder'
import ReviewDepositOrderModal from '../../modals/ReviewDepositOrderModal'

import { useDisclosure } from '@mantine/hooks'
import Status from '../../../enums/Status'

const ReviewDepositOrder = ({ data }: DepositOrderInterface) => {
  const [opened, { close, open }] = useDisclosure()

  const isAvailable = data.status.toUpperCase() === Status.RECEIVED
  return (
    <>
      <Tooltip label={'Revisar orden de depósito'} onClick={open}>
        <ActionIcon
          className='bg-slate-200 hover:bg-slate-300 disabled:cursor-not-allowed'
          disabled={!isAvailable}
        >
          <TbZoomQuestion
            size={20}
            color={`${isAvailable ? '#6b7280' : '#d1d5db'}`}
          />
        </ActionIcon>
      </Tooltip>
      <ReviewDepositOrderModal opened={opened} close={close} />
    </>
  )
}

export default ReviewDepositOrder
