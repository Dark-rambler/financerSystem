import { Tooltip, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TbBan } from 'react-icons/tb'

import CancelDepositOrderModal from '../../modals/CancelDepositOrder'
import { DepositOrderInterface } from '../../../models/DepositOrder'
import Status from '../../../enums/Status'

const CancelDepositOrder = ({ data }: DepositOrderInterface) => {
  const { id, status } = data
  const [opened, { close, open }] = useDisclosure()

  const isAvailable = status.toUpperCase() !== Status.CANCELED
  return (
    <>
      <Tooltip label={'Cancelar orden de depósito'}>
        <ActionIcon
          className='bg-slate-200 hover:bg-slate-300'
          onClick={open}
          disabled={!isAvailable}
        >
          <TbBan size={20} color={`${isAvailable ? '#6b7280' : '#d1d5db'}`} />
        </ActionIcon>
      </Tooltip>{' '}
      <CancelDepositOrderModal opened={opened} close={close} id={id} />
    </>
  )
}

export default CancelDepositOrder
