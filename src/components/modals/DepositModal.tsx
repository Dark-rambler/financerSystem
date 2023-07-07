import {
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  SimpleGrid,
  Button,
  Select
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import { useDeposit } from '../../hooks/useDeposit'

interface DepositModalProps {
  opened: boolean
  close: () => void
  deposit: ReturnType<typeof useDeposit>
}

const DepositModal = ({ opened, close, deposit }: DepositModalProps) => {
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
    >
      <form
        onSubmit={deposit.form.onSubmit(() => {
          if (deposit.isEditing) deposit.onSubmitEdit()
          else deposit.onSubmit()
        })}
        className='space-y-7 h-full'
      >
        <SimpleGrid cols={2}>
          <TextInput
            withAsterisk
            label={'Nº de voucher'}
            placeholder={'Nº de voucher'}
            {...deposit.form.getInputProps('voucherNumber')}
          />
          <NumberInput
            withAsterisk
            label={'Monto'}
            placeholder='Monto'
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            {...deposit.form.getInputProps('amount')}
          />
          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            placeholder='Fecha de depósito'
            label={'Fecha de depósito'}
            dropdownType='modal'
            clearable
            {...deposit.form.getInputProps('date')}
          />
          <Select
            maxDropdownHeight={160}
          height={40}
            data={deposit.banks}
            withAsterisk
            placeholder='Banco'
            label={'Banco'}
            {...deposit.form.getInputProps('bank')}
            searchable
          />
        </SimpleGrid>
        <Textarea
          withAsterisk
          label={'Observaciones'}
          placeholder={'Observaciones'}
          {...deposit.form.getInputProps('description')}
        />
        <div className='flex justify-end'>
          <Button type={'submit'} className='bg-blue-600 hover:bg-blue-700'>
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DepositModal
