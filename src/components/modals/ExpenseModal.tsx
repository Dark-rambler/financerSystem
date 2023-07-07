import {
  Modal,
  Select,
  TextInput,
  NumberInput,
  SimpleGrid,
  Button,
  Textarea
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import { useExpense } from '../../hooks/useExpense'

interface ExpenseModalProps {
  opened: boolean
  close: () => void
  expense: ReturnType<typeof useExpense>
}

const ExpenseModal = ({ opened, close, expense }: ExpenseModalProps) => {
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
    >
      <form
        onSubmit={expense.form.onSubmit(() => {
          if (expense.isEditing) expense.onSubmitEdit()
          else expense.onSubmit()
        })}
        className='space-y-4 h-full'
      >
        <SimpleGrid cols={2}>
          <Select
            data={expense.documentTypes}
            withAsterisk
            placeholder='Tipo de documento'
            label={'Sucursales'}
            searchable
            {...expense.form.getInputProps('documentType')}
          />
          <TextInput
            withAsterisk
            label={'Nº de documento'}
            placeholder={'Nº de documento'}
            {...expense.form.getInputProps('documentNumber')}
          />
          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            placeholder='Fecha de gasto'
            label={'Fecha de gasto'}
            dropdownType='modal'
            clearable
            {...expense.form.getInputProps('date')}
          />
          <Select
            data={expense.branchOffices}
            withAsterisk
            placeholder='Sucursal'
            label={'Sucursal'}
            searchable
            {...expense.form.getInputProps('branchOfficeId')}
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
          {...expense.form.getInputProps('amount')}
        />
        <Textarea
          withAsterisk
          label={'Descripción'}
          placeholder={'Descripción'}
          {...expense.form.getInputProps('description')}
        />
        <SimpleGrid cols={2}>
        <Select
          data={expense.accounts}
          withAsterisk
          placeholder='Cuenta financiera'
          label={'Cuenta financiera'}
          searchable
          {...expense.form.getInputProps('accountId')}
          
          // onSelect={(e) => expense.onSelectAccount(e.currentTarget.value)}
        />
        <Select
          data={expense.filteredSubAccounts}
          withAsterisk
          placeholder={'Subcuenta financiera'}
          label={'Subcuenta financiera'}
          searchable
          // disabled={expense.form.values.accountId === 0}
          {...expense.form.getInputProps('subAccountId')}
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

export default ExpenseModal
