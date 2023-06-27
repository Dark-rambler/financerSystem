import { Tooltip, ActionIcon } from "@mantine/core"
import { TbZoomQuestion } from 'react-icons/tb'

interface ReviewDepositOrderProps {
    status: string
}

const ReviewDepositOrder = ({status}:ReviewDepositOrderProps ) => {
  return (
    <Tooltip label={'Revisar orden de depósito'}>
    <ActionIcon
      className='bg-slate-200 hover:bg-slate-300 disabled:cursor-not-allowed'
      disabled={status !== 'Entregado'}
    >
      <TbZoomQuestion size={20} color={'#475569'} />
    </ActionIcon>
  </Tooltip>
  )
}

export default ReviewDepositOrder