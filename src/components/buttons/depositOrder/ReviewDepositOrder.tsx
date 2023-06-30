import { Tooltip, ActionIcon } from '@mantine/core'
import { TbZoomQuestion } from 'react-icons/tb'
import { DepositOrderInterface } from '../../../models/DepositOrder'
import ReviewModal from '../../modals/ReviewModal'

import { useDisclosure } from '@mantine/hooks'

const ReviewDepositOrder = ({ data }: DepositOrderInterface) => {
  const [opened, { close, open }] = useDisclosure()

  const status = data.status
  return (
    <>
      <Tooltip label={'Revisar orden de depósito'} onClick={open}>
        <ActionIcon
          className='bg-slate-200 hover:bg-slate-300 disabled:cursor-not-allowed'
          disabled={status !== 'Entregado'}
        >
          <TbZoomQuestion size={20} color={'#475569'} />
        </ActionIcon>
      </Tooltip>
      <ReviewModal opened={opened} close={close} />
    </>
  )
}

export default ReviewDepositOrder
