import {
  Modal,
  SimpleGrid,
  Button,
  Select,
  NumberInput,
  Textarea
} from '@mantine/core'

import { DatePickerInput } from '@mantine/dates'

import { useDollar } from '../../hooks/useDollar'

interface DollarModalProps {
  opened: boolean
  close: () => void
  dollar: ReturnType<typeof useDollar>
}

const DollarModal = ({ opened, close, dollar }: DollarModalProps) => {
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
        onSubmit={dollar.form.onSubmit(() => {
          if (dollar.isEditing) dollar.onSubmitEdit()
          else dollar.onSubmit()
        })}
        className='space-y-7 h-full'
      >
        <SimpleGrid cols={2}>
          <Select
            data={dollar.branchOffices}
            withAsterisk
            placeholder='Sucursal'
            label={'Sucursal'}
            {...dollar.form.getInputProps('branchOfficeId')}
            searchable
          />

          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            placeholder='Fecha de cobro'
            label={'Fecha de cobro'}
            dropdownType='modal'
            clearable
            maxDate={dollar.currentDate}
            {...dollar.form.getInputProps('date')}
          />
          <NumberInput
            withAsterisk
            label={'Monto en USD'}
            placeholder='Monto en USD'
            stepHoldDelay={600}
            stepHoldInterval={100}
            // description=''
            precision={2}
            min={0}
            {...dollar.form.getInputProps('amount')}
          />
          <NumberInput
            withAsterisk
            label={'Monto en Bs.'}
            placeholder={`Monto: ${(Number(dollar.form.values.amount) * 6.96).toFixed(2) } Bs.`}
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            {...dollar.form.getInputProps('amountBs')}
          />
        </SimpleGrid>
        <Textarea
          withAsterisk
          label={'Descripción'}
          placeholder={'Descripción'}
          {...dollar.form.getInputProps('description')}
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

export default DollarModal
