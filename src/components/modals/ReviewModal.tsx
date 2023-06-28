import { Modal } from '@mantine/core'

interface ReviweModalProps {
  opened: boolean
  close: () => void
}

const ReviewModal = ({ opened, close }: ReviweModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={'Revisar informe'}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      size={'md'}
    ></Modal>
  )
}

export default ReviewModal
