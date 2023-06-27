import {
  Modal,
  SimpleGrid,
  TextInput,
  Box,
  Select,
  Stack,
  Divider,
  Button,
  NumberInput,
  MultiSelect,
  Container
} from '@mantine/core'
import {
  TbAppsFilled,
  TbCalendarDue,
  TbCalendarTime,
  TbCalendarMinus,
  TbCurrencyDollar,
  TbMapPin,
  TbUser
} from 'react-icons/tb'
import { DatePickerInput } from '@mantine/dates'
import { useFilterTable } from '../../hooks/useFilterTable'
import {useState} from 'react'

interface FilterTableProps {
  opened: boolean
  close: () => void
  filterHook: ReturnType<typeof useFilterTable>
}

const FilterTable = ({ opened, close, filterHook }: FilterTableProps) => {
  const [isLoading, setIsLoading] = useState(false)


  return (
    <>
      <Modal
      closeOnClickOutside={false}
        opened={opened}
        onClose={close}
        title={'Filtrar Tabla'}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
        size={'xl'}
      >
        <Stack spacing={20}>
          {' '}
          <MultiSelect
              icon={<TbMapPin />}
              placeholder='Regional'
              label={'Regional'}
              data={filterHook.regionalsSelect}
              clearable

              {...filterHook.form.getInputProps('regional')}
            />
            <MultiSelect
              icon={<TbUser />}
              data={filterHook.employeesSelect}
              placeholder='Administrador'
              label={'Administrador'}
              clearable
              // {...depositOrder.form.getInputProps('administrator')}
            />

          <div className='space-y-1'>
            <p className='text-[13px] font-medium'>Fecha de orden</p>
            <Divider className='m-0 p-0' />
            <SimpleGrid cols={2}>
            <DatePickerInput
              valueFormat='DD MMM YYYY'
              clearable
              label={'Mayor o igual a'}
              placeholder='Fecha de orden'
              icon={<TbCalendarDue />}
              // {...depositOrder.form.getInputProps('orderDate')}
            />
                    <DatePickerInput
              valueFormat='DD MMM YYYY'
              clearable
              label={'Menor o igual a'}
              placeholder='Fecha de orden'
              icon={<TbCalendarDue />}
              // {...depositOrder.form.getInputProps('orderDate')}
            />
            </SimpleGrid>
          </div>
          <div className='space-y-1'>
            <p className='text-[13px] font-medium'>Periodo de depósito</p>
            <Divider className='m-0 p-0' />
            <SimpleGrid cols={2}>
              <DatePickerInput
                valueFormat='DD MMM YYYY'
                clearable
                label={'Mayor o igual a'}
                placeholder='Fecha de inicio'
                icon={<TbCalendarMinus />}
                // {...depositOrder.form.getInputProps('orderRange')}
              />
              <DatePickerInput
                valueFormat='DD MMM YYYY'
                clearable
                label={'Menor o igual a'}
                placeholder='Fecha de fin'
                icon={<TbCalendarMinus />}
                // {...depositOrder.form.getInputProps('orderRange')}
              />
            </SimpleGrid>
          </div>
          <div className='space-y-1'>
            <p className='text-[13px] font-medium'>Monto de depósito</p>
            <Divider className='m-0 p-0' />
            <SimpleGrid cols={2}>
              <NumberInput
                stepHoldDelay={600}
                stepHoldInterval={100}
                precision={2}
                min={0}
                label={'Monto mayor o igual a'}
                placeholder='Monto a depositar (Bs.)'
                icon={<TbCurrencyDollar />}

                {...filterHook.form.getInputProps('minAmount')}
              />
              <NumberInput
                stepHoldDelay={600}
                stepHoldInterval={100}
                precision={2}
                min={0}
                label={'Monto menor o igual a '}
                placeholder='Monto a depositar (Bs.)'
                icon={<TbCurrencyDollar />}

                {...filterHook.form.getInputProps('maxAmount')}
              />
            </SimpleGrid>
          </div>
          <SimpleGrid cols={2}>
            <MultiSelect
              icon={<TbUser />}
              data={filterHook.statusSelect}
              placeholder='Estado'
              label={'Estado'}
              dropdownPosition="top"
              clearable

              // {...depositOrder.form.getInputProps('administrator')}
            />
            <MultiSelect
              icon={<TbUser />}
              data={filterHook.revitionSelect}
              placeholder='Revisión'
              label={'Revisión'}
              dropdownPosition="top"
              clearable
              // {...depositOrder.form.getInputProps('administrator')}
            />
          </SimpleGrid>
          <Button
            className='w-full bg-blue-600 hover:bg-blue-700'
            type='submit'
            onClick={close}
          >
            Filtrar
          </Button>
        </Stack>
      </Modal>
    </>
  )
}

export default FilterTable
