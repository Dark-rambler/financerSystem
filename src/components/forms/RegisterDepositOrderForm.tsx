import {
  TextInput,
  SimpleGrid,
  Button,
  Box,
  NumberInput,
  Select,
  Divider,
  MultiSelect
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import {
  TbAppsFilled,
  TbCalendarDue,
  TbCalendarTime,
  TbCalendarMinus,
  TbCurrencyDollar,
  TbMapPin,
  TbUser
} from 'react-icons/tb'

import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'
import { PDFModifier } from '../pdf/PDFVisualizer'

interface RegisterDepositOrderFormProps {
  depositOrder: ReturnType<typeof useRegisterDepositOrder>
}

const RegisterDepositOrderForm = ({
  depositOrder
}: RegisterDepositOrderFormProps) => {

  return (
    <Box
      component='form'
      className='space-y-8 h-full'
      onSubmit={depositOrder.form.onSubmit(() => {
        PDFModifier({depositOrder})
      })}
    >
      {' '}
      <SimpleGrid cols={2}>
        <Select
          withAsterisk
          icon={<TbMapPin />}
          placeholder='Regional'
          label={'Regional'}
          data={depositOrder.data}
          // value={depositOrder.regional}
          // onChange={depositOrder.setRegional}
          onSelect={e => depositOrder.onSelectRegional(e.currentTarget.value)}
          {...depositOrder.form.getInputProps('regional')}
        />
        <TextInput
          withAsterisk
          // value={depositOrder.administrator}
          // onChange={(e) => {depositOrder.setAdministrator(e.currentTarget.value)}}
          icon={<TbUser />}
          placeholder='Administrador'
          label={'Administrador'}
          disabled
          {...depositOrder.form.getInputProps('administrator')}
        />
      </SimpleGrid>
      <Box className='space-y-8'>
        <SimpleGrid cols={2}>
          <TextInput
            withAsterisk
            label={'Número de orden'}
            placeholder='Número de orden'
            icon={<TbAppsFilled />}
            // value={depositOrder.orderNumber}
            // onChange={(e) => {depositOrder.setOrderNumber(e.currentTarget.value)}}
            {...depositOrder.form.getInputProps('orderNumber')}
            disabled
          />
          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            clearable
            label={'Fecha de orden'}
            placeholder='Fecha de orden'
            icon={<TbCalendarDue />}
            // value={depositOrder.orderDate}
            // onChange={depositOrder.setOrderDate}
            {...depositOrder.form.getInputProps('orderDate')}
          />
        </SimpleGrid>
        <DatePickerInput
          type='range'
          allowSingleDateInRange
          valueFormat='DD MMM YYYY'
          clearable
          withAsterisk
          label={'Periodo de depósito '}
          placeholder='Periodo de depósito'
          icon={<TbCalendarMinus />}
          // value={depositOrder.orderRange}
          // onChange={depositOrder.setOrderRange}
          {...depositOrder.form.getInputProps('orderRange')}
        />
        <SimpleGrid cols={2}>
          <NumberInput
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            withAsterisk
            label={'Monto a depositar (Bs.)'}
            placeholder='Monto a depositar (Bs.)'
            icon={<TbCurrencyDollar />}
            // value={depositOrder.amount}
            // onChange={depositOrder.setAmount}
            {...depositOrder.form.getInputProps('amount')}
          />

          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            clearable
            label={'Fecha límite de entrega'}
            placeholder='Fecha límite de entrega'
            icon={<TbCalendarTime />}
            // value={depositOrder.limitedDate}
            // onChange={depositOrder.setLimitedDate}

            {...depositOrder.form.getInputProps('limitedDate')}
          />
        </SimpleGrid>
      </Box>
      <Divider />
      <Button className='w-full bg-blue-600 hover:bg-blue-700' type='submit'>
        {depositOrder.isDocumentGenerated ? 'Editar orden de depósito' : 'Generar orden de depósito'}
      </Button>
    </Box>
  )
}

export default RegisterDepositOrderForm
