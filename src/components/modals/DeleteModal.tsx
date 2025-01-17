import { Modal, Button } from '@mantine/core'

interface DeleteModalProps {
  label: string
  opened: boolean
  close: () => void
  onDelete: () => void
  isFemaleArtcle: boolean
}

const DeleteModal = ({ label, opened, close, onDelete, isFemaleArtcle }: DeleteModalProps) => {
  return (
    <>
      <Modal
        title={`Eliminar ${label.toLowerCase()}`}
        opened={opened}
        onClose={close}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
      >
        <div className='space-y-5'>
          <p className='text-sm'>
            ¿Esta seguro que desea eliminar {isFemaleArtcle?"esta":"este"} {label.toLowerCase()}?
          </p>
          <div className='flex justify-end space-x-2'>
            <Button className='bg-gray-200 text-gray-900 hover:bg-gray-300' onClick={close}>
              Cancelar
            </Button>
            <Button className='bg-red-600 hover:bg-red-700' onClick={onDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DeleteModal
