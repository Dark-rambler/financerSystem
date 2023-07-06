import { ActionIcon } from '@mantine/core'
import { TbPencil } from 'react-icons/tb'

interface EditButtonProps {
  onClick: () => void
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <ActionIcon
      onClick={onClick}
      className='bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed'
    >
      <TbPencil size={18} color={'#475569'} />
    </ActionIcon>
  )
}

export default EditButton
