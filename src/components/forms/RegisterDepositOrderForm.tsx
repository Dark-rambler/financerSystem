import {
  TextInput,
  SimpleGrid,
  Button,
  Flex,
  Box,
  NumberInput
} from '@mantine/core'
import {  DatePickerInput   } from '@mantine/dates'
import {
  TbAppsFilled,
  TbCalendarDue,
  TbCalendarTime,
  TbCalendarMinus,
  TbCurrencyDollar
} from 'react-icons/tb'

interface RegisterDepositOrderFormProps {
  changeStepForward: (e: React.MouseEvent<HTMLButtonElement>) => void
  changeStepBackward: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const RegisterDepositOrderForm = ({
  changeStepForward,
  changeStepBackward
}: RegisterDepositOrderFormProps) => {
  return (
    <Box className='space-y-8'>
      {' '}
      <SimpleGrid cols={2}>
        <TextInput
          withAsterisk
          label={'Número de orden'}
          placeholder='Numero de orden'
          icon={<TbAppsFilled />}
        />

        <DatePickerInput
        withAsterisk
          valueFormat='DD MMM YYYY'
          clearable
          dropdownType='modal'
          label={'Fecha de orden'}
          placeholder='Fecha de orden'
          icon={<TbCalendarDue />}
        />
        
        <DatePickerInput
         type="range"
          valueFormat='DD MMM YYYY'
          clearable
          dropdownType='modal'
          withAsterisk 
          label={'Fecha periodo'} 
          placeholder='Fecha periodo'
          icon={<TbCalendarMinus />}
        />

        
        <NumberInput
         stepHoldDelay={500}
         stepHoldInterval={100}
          precision={2}
          min={0}
          withAsterisk
          label={'Monto a depositar'}
          placeholder='Monto a depositar'
          icon={<TbCurrencyDollar/>}
        />

        <DatePickerInput
        withAsterisk
          valueFormat='DD MMM YYYY'
          clearable
          dropdownType='modal'
          label={'Fecha límite de entrega'}
          placeholder='Fecha límite de entrega'
          icon={<TbCalendarTime />}
        />
      </SimpleGrid>
      <Flex justify={'space-between'}>
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          onClick={changeStepBackward}
        >
          Anterior
        </Button>
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          onClick={changeStepForward}
        >
          Siguiente
        </Button>
      </Flex>
    </Box>
  )
}

export default RegisterDepositOrderForm
