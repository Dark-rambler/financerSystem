import { Modal, Button } from '@mantine/core'

interface ConfirmModalProps {
  opened: boolean
  close: () => void
  onClick: () => void
  primaryColor: string
  title: string
  description: string
  buttonText: string
}

const ConfirmModal = ({
  opened,
  close,
  onClick,
  primaryColor,
  title,
  description,
  buttonText
}: ConfirmModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      title={title}
    >
      <div className='space-y-5'>
        <p className='text-sm'>{description}</p>
        <div className='flex justify-end space-x-2'>
          <Button
            className='bg-gray-200 text-gray-900 hover:bg-gray-300'
            onClick={close}
          >
            Cancelar
          </Button>
          <Button
            className={`bg-${primaryColor}-600 text-white hover:bg-${primaryColor}-700`}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
