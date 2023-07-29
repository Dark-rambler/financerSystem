import { Modal, SimpleGrid, Select, NumberInput, Textarea, Button } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import { useEnvelope } from '../../hooks/useEnvelope'
import { useRealTimeDate } from '../../hooks/useRealTimeDate'

interface EnvelopeModalProps {
  opened: boolean
  close: () => void
  envelope: ReturnType<typeof useEnvelope>
}

const EnvelopeModal = ({ opened, close, envelope }: EnvelopeModalProps) => {
  const {currentDate} = useRealTimeDate();
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
        onSubmit={envelope.form.onSubmit(() => {
          if (envelope.isEditing) envelope.onSubmitEdit()
          else envelope.onSubmit()
        })}
        className='space-y-7 h-full'
      >
        <SimpleGrid cols={2}>
          <Select
            data={envelope.fromBranchOffices}
            withAsterisk
            placeholder='De sucursal'
            label={'De sucursal'}
            {...envelope.form.getInputProps('fromBranchOfficeId')}
            searchable
          />
          <Select
            data={envelope.branchOffices}
            withAsterisk
            placeholder='A sucursal'
            label={'A sucursal'}
            {...envelope.form.getInputProps('toBranchOfficeId')}
            searchable
          />
          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            placeholder='Fecha'
            label={'Fecha'}
            dropdownType='modal'
            clearable
            maxDate={currentDate}
            {...envelope.form.getInputProps('date')}
          />
          <NumberInput
            withAsterisk
            label={'Monto'}
            placeholder='Monto'
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            {...envelope.form.getInputProps('amount')}
          />
        </SimpleGrid>
        <Textarea
          withAsterisk
          label={'Descripción'}
          placeholder={'Descripción'}
          {...envelope.form.getInputProps('description')}
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

export default EnvelopeModal
