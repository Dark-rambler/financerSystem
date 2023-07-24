import { ActionIcon } from '@mantine/core'
import { TbChevronLeft } from 'react-icons/tb'

interface ReturnButtonProps {
  onClick: () => void
}

const ReturnButton = ({ onClick }: ReturnButtonProps) => {
  return (
    <ActionIcon
      className=' bg-gray-100 hover:bg-gray-200'
      size={'md'}
      onClick={onClick}
    >
      <TbChevronLeft />
    </ActionIcon>
  )
}

export default ReturnButton
