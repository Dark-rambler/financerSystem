import { ActionIcon } from '@mantine/core'
import { TbTrash } from 'react-icons/tb'

interface DeleteButtonProps {
  onClick: () => void
 
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <ActionIcon
      onClick={onClick}
      className='bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed'
    >
      <TbTrash size={18} color={'#475569'} />
    </ActionIcon>
  )
}

export default DeleteButton
