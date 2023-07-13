import {
  TextInput,
  SimpleGrid,
  Button,
  Box,
  NumberInput,
  Select,
  Divider,
  Table
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import { useRegisterDepositOrder } from '../../hooks/useRegisterDepositOrder'
import { PDFModifier } from '../pdf/PDFVisualizer'

import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'

interface RegisterDepositOrderFormProps {
  depositOrder: ReturnType<typeof useRegisterDepositOrder>
}

const RegisterDepositOrderForm = ({
  depositOrder
}: RegisterDepositOrderFormProps) => {
  return (
    <Box
      component='form'
      className='space-y-6 h-full max-h-full'
      onSubmit={depositOrder.form.onSubmit(() => {
        PDFModifier({ depositOrder })
      })}
    >
      {' '}
      <SimpleGrid cols={2}>
        <Select
          withAsterisk
          placeholder='Regional'
          label={'Regional'}
          data={depositOrder.data}
          onSelect={e => depositOrder.onSelectRegional(e.currentTarget.value)}
          {...depositOrder.form.getInputProps('regional')}
          // value={depositOrder.regional}
          // onChange={depositOrder.onSelectRegional}
        />
        <TextInput
          withAsterisk
          placeholder='Administrador'
          label={'Administrador'}
          disabled
          {...depositOrder.form.getInputProps('administrator')}
        />
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <TextInput
          withAsterisk
          label={'Número de orden'}
          placeholder='Número de orden'
          {...depositOrder.form.getInputProps('orderNumber')}
          disabled
        />
        <DatePickerInput
          withAsterisk
          valueFormat='DD MMM YYYY'
          clearable
          label={'Fecha de orden'}
          placeholder='Fecha de orden'
          {...depositOrder.form.getInputProps('orderDate')}
        />
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <DatePickerInput
          type='range'
          allowSingleDateInRange
          valueFormat='DD MMM YYYY'
          clearable
          withAsterisk
          label={'Periodo de depósito '}
          placeholder='Periodo de depósito'
          {...depositOrder.form.getInputProps('orderRange')}
        />
        <DatePickerInput
          withAsterisk
          valueFormat='DD MMM YYYY'
          clearable
          label={'Fecha límite de entrega'}
          placeholder='Fecha límite de entrega'
          {...depositOrder.form.getInputProps('limitedDate')}
        />
      </SimpleGrid>
      <Divider />
      <SimpleGrid cols={2}>
        <Select
          withAsterisk
          placeholder='Sucursal'
          label={'Sucursal'}
          data={depositOrder.branchOfficeData}
          // {...depositOrder.form.getInputProps('branhOffice')}
          disabled={depositOrder.form.values.regional === ''}
          value={depositOrder.branchOffice}
          onChange={depositOrder.setBranchOffice}
        />
        <div className='flex items-end space-x-2'>
          <NumberInput
            stepHoldDelay={600}
            stepHoldInterval={100}
            precision={2}
            min={0}
            withAsterisk
            label={'Monto'}
            placeholder='Monto'
            onChange={depositOrder.setAmount}
            value={depositOrder.amount}
          />
          <Button
            className='p-2 w-10 font-bold text-xl bg-blue-600 hover:bg-blue-700'
            disabled={
              depositOrder.amount === '' || depositOrder.branchOffice === null || depositOrder.amount === 0
            }
            onClick={
              depositOrder.isBranchOfficeAndAmountsEditing
                ? depositOrder.onSaveEditBranchOfficesAndAmounts
                : depositOrder.onAddBranchOfficesAndAmounts
            }
          >
            {depositOrder.isBranchOfficeAndAmountsEditing ? '✓' : '+'}
          </Button>
          {depositOrder.isBranchOfficeAndAmountsEditing && (
            <Button
              className='bg-blue-600 hover:bg-700 p-2 w-10 text-xl font-bold'
              onClick={() => {
                depositOrder.setBranchOffice(null)
                depositOrder.setAmount('')
                depositOrder.setIsBranchOfficeAndAmountsEditing(false)
              }}
            >
              x
            </Button>
          )}
        </div>
      </SimpleGrid>
      <div className='w-full border max-h-[300px] border-gray-300 rounded-md overflow-y-auto'>
        <Table
          className='h-full w-full'
          cellSpacing={'xs'}
          striped
          fontSize={'13px'}
          highlightOnHover
          horizontalSpacing={'xl'}
        >
          <thead className='bg-gray-50 text-sm sticky' >
            <tr>
              <th className='w-[200px] !font-semibold'>Sucursal</th>
              <th className='w-[200px] !font-semibold'>Monto</th>
              <th className='w-[30px]'></th>
              <th className='w-[30px]'></th>
            </tr>
          </thead>
          <tbody className=' overflow-y-auto'>
            {depositOrder.branchOfficesAndAmounts.map((element, index) => {

              return (
                <tr className='h-5' key={`key-t-${index}`}>
                  <td>{element.branchOffice.label}</td>
                  <td>{Number(element.amount).toFixed(2)} Bs.</td>
                  <td>
                    {' '}
                    <EditButton
                      onClick={() =>
                        depositOrder.onEditBranchOfficesAndAmounts(index)
                      }
                    />
                  </td>
                  <td>
                    {' '}
                    <DeleteButton
                      onClick={() =>
                        depositOrder.onRemoveBranchOfficesAndAmounts(index)
                      }
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th className='!font-semibold'>
                {depositOrder.branchOfficesAndAmounts.length}{' '}
                {depositOrder.branchOfficesAndAmounts.length === 1
                  ? 'Sucursal'
                  : 'Sucursales'}
              </th>
              <th className='!font-semibold'>Σ {Number(depositOrder.totalAmount).toFixed(2)} Bs.</th>
              <th></th>
              <th> </th>
            </tr>
          </tfoot>
        </Table>
      </div>
      <Button className='w-full bg-blue-600 hover:bg-blue-700' type='submit'>
        {depositOrder.isDocumentGenerated
          ? 'Editar orden de depósito'
          : 'Generar orden de depósito'}
      </Button>
    </Box>
  )
}

export default RegisterDepositOrderForm
