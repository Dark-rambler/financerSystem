import { Modal, Button } from '@mantine/core'

interface ConfirmReportModalProps {
  opened: boolean
  close: () => void
  onClick: () => void
  isReportValid: boolean
}

const ConfirmReportModal = ({
  opened,
  close,
  onClick,
  isReportValid
}: ConfirmReportModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
    >
      <div className='space-y-5'>
        {isReportValid ? (
          <p className='text-sm'>El reporte creado coincide en los montos</p>
        ) : (
          <p className='text-sm'>El reporte creado no coincide en los montos</p>
        )}
        {isReportValid ? (
          <p className='text-sm'>¿Desea enviar el reporte ahora?</p>
        ) : (
          <p className='text-sm'>
            ¿Esta seguro que enviar el reporte en este momento?
          </p>
        )}

        <div className='flex justify-end space-x-2'>
          <Button
            className='bg-gray-200 text-gray-900 hover:bg-gray-300'
            onClick={close}
          >
            Cancelar
          </Button>
          <Button className={`${isReportValid ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={onClick}>
            Enviar
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmReportModal
