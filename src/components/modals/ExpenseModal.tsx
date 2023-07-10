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
      title={'Salidas'}
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
            label={'Tipo de documento'}
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
          <Select
            data={expense.expenseTypes}
            withAsterisk
            placeholder='Tipo de salida'
            label={'Tipo de salida'}
            searchable
            {...expense.form.getInputProps('expenseType')}
          />
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
        </SimpleGrid>

    
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
        <Textarea
          withAsterisk
          label={'Descripción'}
          placeholder={'Descripción'}
          {...expense.form.getInputProps('description')}
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

export default ExpenseModal
