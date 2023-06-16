import {
  TextInput,
  SimpleGrid,
  Button,
  Box,
  NumberInput,
  Select,
  Divider,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import {
  TbAppsFilled,
  TbCalendarDue,
  TbCalendarTime,
  TbCalendarMinus,
  TbCurrencyDollar,
  TbMapPin,
  TbUser,
} from 'react-icons/tb'

import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'

const RegisterDepositOrderForm = () => {
  const depositOrder = useRegisterDepositOrder()

  return (
    <Box className='space-y-8 h-full'>
      {' '}
      <SimpleGrid cols={2}>
        <Select
          withAsterisk
          icon={<TbMapPin />}
          placeholder='Regional'
          label={'Regional'}
          data={depositOrder.data}
          // data={[
          //   {value: 'aaa', label: '2222'}]
          // }
          value={depositOrder.regional}
          onChange={depositOrder.setRegional}
      
        />
        <TextInput
          withAsterisk
          value={depositOrder.administrator}
          onChange={(e) => {depositOrder.setAdministrator(e.currentTarget.value)}}
          icon={<TbUser />}
          placeholder='Administrador'
          label={'Administrador'}
          disabled
        />
      </SimpleGrid>
      
      <Box className='space-y-8'>
        <SimpleGrid cols={2}>
          <TextInput
            withAsterisk
            label={'Número de orden'}
            placeholder='Número de orden'
            icon={<TbAppsFilled />}
            value={depositOrder.orderNumber}
            onChange={(e) => {depositOrder.setOrderNumber(e.currentTarget.value)}}
          />
          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            clearable
            label={'Fecha de orden'}
            placeholder='Fecha de orden'
            icon={<TbCalendarDue />}
            value={depositOrder.orderDate}
            onChange={depositOrder.setOrderDate}
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
          value={depositOrder.orderRange}
          onChange={depositOrder.setOrderRange}
        />
        <SimpleGrid cols={2}>
          <NumberInput
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            withAsterisk
            label={'Monto a depositar'}
            placeholder='Monto a depositar'
            icon={<TbCurrencyDollar />}
            value={depositOrder.amount}
            onChange={depositOrder.setAmount}
          />

          <DatePickerInput
            withAsterisk
            valueFormat='DD MMM YYYY'
            clearable
            label={'Fecha límite de entrega'}
            placeholder='Fecha límite de entrega'
            icon={<TbCalendarTime />}
            value={depositOrder.limitedDate}
            onChange={depositOrder.setLimitedDate}

          />
        </SimpleGrid>
      </Box>
      <Divider />
      <Button className='w-full bg-blue-600 hover:bg-blue-700'>Generar orden de depósito</Button>

    </Box>
  )
}

export default RegisterDepositOrderForm
