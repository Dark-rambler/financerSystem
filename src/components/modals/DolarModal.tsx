import {
  Modal,
  SimpleGrid,
  Button,
  Select,
  NumberInput,
  Textarea
} from '@mantine/core'

import { DatePickerInput } from '@mantine/dates'

import { useDolar } from '../../hooks/useDolar'

interface DolarModalProps {
  opened: boolean
  close: () => void
  dolar: ReturnType<typeof useDolar>
}

const DolarModal = ({ opened, close, dolar }: DolarModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={'Sobre'}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      size={'xl'}
    >
      <form
        onSubmit={dolar.form.onSubmit(() => {
          if (dolar.isEditing) dolar.onSubmitEdit()
          else dolar.onSubmit()
        })}
        className='space-y-7 h-full'
      >
        <SimpleGrid cols={2}>
          <Select
            data={dolar.branchOffices}
            withAsterisk
            placeholder='Sucursal'
            label={'Sucursal'}
            {...dolar.form.getInputProps('branchOfficeId')}
            searchable
          />

          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            placeholder='Fecha de cobro'
            label={'Fecha de cobro'}
            dropdownType='modal'
            clearable
            {...dolar.form.getInputProps('date')}
          />
          <NumberInput
            withAsterisk
            label={'Monto en USD'}
            placeholder='Monto en USD'
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            {...dolar.form.getInputProps('amount')}
          />
          <NumberInput
            withAsterisk
            label={'Monto en Bs.'}
            placeholder='Monto en Bs.'
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            {...dolar.form.getInputProps('amountBs')}
          />
        </SimpleGrid>
        <Textarea
          withAsterisk
          label={'Observaciones'}
          placeholder={'Observaciones'}
          {...dolar.form.getInputProps('description')}
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

export default DolarModal
