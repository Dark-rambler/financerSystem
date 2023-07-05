import { Modal } from '@mantine/core'

interface ExpenseModalProps {
  opened: boolean
  close: () => void
}

const ExpenseModal = ({ opened, close }: ExpenseModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={'Costos y gastos'}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      size={'xl'}
    ></Modal>
  )
}

export default ExpenseModal
