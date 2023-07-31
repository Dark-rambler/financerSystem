import {
  Modal,
  Select,
  TextInput,
  SimpleGrid,
  NumberInput,
  Button
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import { useMoneyCollection } from '../../hooks/useMoneyCollection'

interface MoneyCollectionModalProps {
  opened: boolean
  close: () => void
  moneyCollection: ReturnType<typeof useMoneyCollection>
}

const MoneyCollectionModal = ({
  opened,
  close,
  moneyCollection
}: MoneyCollectionModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={'Recaudación'}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      size={'xl'}
    >
      <form
        onSubmit={moneyCollection.form.onSubmit(() => {
          if (moneyCollection.isEditing) moneyCollection.onSubmitEdit()
          else moneyCollection.onSubmit()
        })}
        className='space-y-4 h-full'
      >
        <SimpleGrid cols={2}>
          <Select
            data={moneyCollection.branchOffices}
            withAsterisk
            placeholder='Sucursal'
            label={'Sucursal'}
            {...moneyCollection.form.getInputProps('branchOfficeId')}
            searchable
          />
          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            placeholder='Fecha de recaudación'
            label={'Fecha de recaudación'}
            dropdownType='modal'
            clearable
            maxDate={moneyCollection.currentDate}
            {...moneyCollection.form.getInputProps('date')}
          />
        </SimpleGrid>
        <NumberInput
          withAsterisk
          label={'Monto'}
          placeholder='Monto'
          stepHoldDelay={600}
          stepHoldInterval={100}
          precision={2}
          min={0}
          {...moneyCollection.form.getInputProps('amount')}
        />
        <SimpleGrid cols={2}>
          <TextInput
            withAsterisk
            label={'Entregado por'}
            placeholder='Entregado por'
            {...moneyCollection.form.getInputProps('deliveredBy')}
          />
          <TextInput
            withAsterisk
            label={'Recibido por'}
            placeholder='Recibido por'
            disabled
            value={moneyCollection.adminName}
          />
        </SimpleGrid>

        <div className='flex justify-end'>
          <Button type={'submit'} className='bg-blue-600 hover:bg-blue-700'>
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default MoneyCollectionModal
