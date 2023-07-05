import { Modal } from '@mantine/core'

interface DepositModalProps {
  opened: boolean
  close: () => void
}

const DepositModal = ({ opened, close }: DepositModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={'Depósitos'}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      size={'xl'}
    ></Modal>
  )
}

export default DepositModal
