import { Tooltip, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TbBan } from 'react-icons/tb'
import CancelDepositOrderModal from '../modals/CancelDepositOrder'

interface CancelDepositOrderProps {
  id: number
  status: string
}

const CancelDepositOrder = ({ id, status }: CancelDepositOrderProps) => {
  const [opened, { close, open }] = useDisclosure()
  return (
    <>
      <Tooltip label={'Cancelar orden de deposito'}>
        <ActionIcon
          className='bg-slate-200 hover:bg-slate-300'
          onClick={open}
          disabled={status === 'Cancelado'}
        >
          <TbBan size={20} color={'#475569'} />
        </ActionIcon>
      </Tooltip>{' '}
      <CancelDepositOrderModal opened={opened} close={close} id={id} />
    </>
  )
}

export default CancelDepositOrder
