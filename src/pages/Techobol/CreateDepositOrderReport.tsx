import { useEffect } from 'react'
import { Table, Button, Group, Text } from '@mantine/core'
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone'
import { TbFileUpload, TbFileCheck, TbFileX } from 'react-icons/tb'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'

import { useDepositOrderStore } from '../../components/store/depositOrderStore'
import { useExpense } from '../../hooks/useExpense'
import { useDeposit } from '../../hooks/useDeposit'
import { useEnvelope } from '../../hooks/useEnvelope'
import { useMoneyCollection } from '../../hooks/useMoneyCollection'
import { useDolar } from '../../hooks/useDolar'
import { useDepositOrderReport } from '../../hooks/useDepositOrderReport'

import DepositModal from '../../components/modals/DepositModal'
import MoneyCollectionModal from '../../components/modals/MoneyCollectionModal'
import ExpenseModal from '../../components/modals/ExpenseModal'
import EnvelopeModal from '../../components/modals/EnvelopeModal'
import DolarModal from '../../components/modals/DolarModal'

import ExpenseTable from '../../components/table/ExpenseTable'
import MoneyCollectionTable from '../../components/table/MoneyCollectionTable'
import DepositTable from '../../components/table/DepositTable'
import EnvelopeTable from '../../components/table/EnvelopeTable'
import DolarTable from '../../components/table/DolarTable'

const CreateDepositOrderReport = () => {
  const { depositOrder } = useDepositOrderStore()
  const moneyCollection = useMoneyCollection()
  const deposit = useDeposit()
  const expense = useExpense()
  const envelope = useEnvelope()
  const dolar = useDolar()

  const depositOrderReport = useDepositOrderReport()

  useEffect(() => {
    envelope.setBranchOffices(moneyCollection.branchOffices)
    dolar.setBranchOffices(moneyCollection.branchOffices)
  }, [moneyCollection.branchOffices])

  return (
    <div className='px-16 py-12 space-y-16'>
      <section className='space-y-7'>
        <h1 className='text-center text-md font-bold'>
          INFORME ORDEN DE DEPOSITO
        </h1>
        <div className='w-full rounded-md border border-gray-300 '>
          <Table verticalSpacing={'sm'}>
            <thead className='bg-slate-200'>
              <tr>
                <th>Nº de orden</th>
                <th>Fecha de orden</th>
                <th>Regional</th>
                <th>Administrador</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Monto</th>
                <th>Fecha limite</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{depositOrder.orderNumber}</td>
                <td>
                  {new Date(depositOrder.solitudeDate).toLocaleDateString()}
                </td>
                <td>{depositOrder.regional?.name}</td>
                <td>
                  {depositOrder.employee?.name}{' '}
                  {depositOrder.employee?.lastName}
                </td>
                <td>{new Date(depositOrder.startDate).toLocaleDateString()}</td>
                <td>{new Date(depositOrder.endDate).toLocaleDateString()}</td>
                <td className='font-semibold'>
                  {Number(depositOrder.amount).toFixed(2)} Bs.
                </td>
                <td>
                  {new Date(depositOrder.deliveryDate).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-green-500 rounded-sm'></div>
            <h1 className='font-bold'>Recaudaciones</h1>
          </div>

          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={moneyCollection.moneyCollectionOpenedHandler.open}
          >
            +
          </Button>
        </div>
        <MoneyCollectionTable moneyCollection={moneyCollection} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
            <h1 className='font-bold'>Salidas</h1>
          </div>
          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={expense.expenseOpenedHandler.open}
          >
            +
          </Button>
        </div>

        <ExpenseTable expense={expense} />
        {/* </div> */}
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
            <h1 className='font-bold'>Dólares</h1>
          </div>

          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={dolar.modalHandler.open}
          >
            +
          </Button>
        </div>
        <DolarTable dolar={dolar} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-amber-500 rounded-sm'></div>
            <h1 className='font-bold'>Sobres</h1>
          </div>

          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={envelope.modalHandler.open}
          >
            +
          </Button>
        </div>
        <EnvelopeTable envelope={envelope} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-blue-500 rounded-sm'></div>
            <h1 className='font-bold'>Depósitos</h1>
          </div>

          <Button
            className='bg-blue-600 hover:bg-blue-700 text-xl px-3'
            onClick={deposit.modalHandler.open}
          >
            +
          </Button>
        </div>
        <DepositTable deposit={deposit} />
      </section>

      <section className='space-y-2'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center space-x-2'>
            {/* <div className='w-4 h-4 bg-blue-500 rounded-sm'></div> */}
            <h1 className='font-bold'>Documento</h1>
          </div>
        </div>
        <Dropzone
          onDrop={files => {
            depositOrderReport.setFile(files[0])
          }}
          onReject={files => {
            console.log(files)
            depositOrderReport.setFile(null)
          }}
          maxSize={50 * 1024 ** 2}
          accept={PDF_MIME_TYPE}
          //num of files 1
          maxFiles={1}
          // {...props}
        >
          <Group
            position='center'
            spacing='xl'
            style={{ minHeight: '110px', pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <TbFileCheck size={50} color={'#2563eb'} className={'stroke-1'} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <TbFileX size={50} color={'#dc2626'} className={'stroke-1'} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              {depositOrderReport.file ? (
                <>
                  <BsFillFileEarmarkPdfFill size={40} color={'#dc2626'} />
                </>
              ) : (
                <TbFileUpload
                  size={50}
                  color={'#374151'}
                  className={'stroke-1'}
                />
              )}
            </Dropzone.Idle>

            {depositOrderReport.file ? (
              <div>
                <Text size='xl' inline>
                  {depositOrderReport.file.name}
                </Text>
                <Text size='sm' color='dimmed' inline mt={7}>
                  {Number(depositOrderReport.file.size / 1024 / 1024).toFixed(3)} MB
                </Text>
              </div>
            ) : (
              <div>
                <Text size='xl' inline>
                  Arrastre el documento aqui o haga click para seleccionar
                </Text>
                <Text size='sm' color='dimmed' inline mt={7}>
                  Solo se permite subir un documento en formato PDF, el
                  documento no debe exceder los 50 mb.
                </Text>
              </div>
            )}
          </Group>
        </Dropzone>
      </section>

      <section className='flex justify-end'>
        <Button className='bg-blue-600 hover:bg-blue-700'>
          Enviar informe
        </Button>
      </section>

      <MoneyCollectionModal
        opened={moneyCollection.moneyCollectionOpened}
        close={moneyCollection.onClose}
        moneyCollection={moneyCollection}
      />
      <ExpenseModal
        opened={expense.expenseOpened}
        close={expense.onClose}
        expense={expense}
      />
      <DepositModal
        opened={deposit.opened}
        close={deposit.onClose}
        deposit={deposit}
      />
      <EnvelopeModal
        opened={envelope.opened}
        close={envelope.onClose}
        envelope={envelope}
      />
      <DolarModal opened={dolar.opened} close={dolar.onClose} dolar={dolar} />
    </div>
  )
}

export default CreateDepositOrderReport
