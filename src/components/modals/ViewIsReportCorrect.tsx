import { Modal, Divider } from '@mantine/core'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'

interface ViewIsReportCorrectProps {
  opened: boolean
  close: () => void
  moneyCollectionAmount: number
  expenseAnount: number
  dollarAmount: number
  envelopeAmount: number
  depositOrderAmount: number
  depositAmount: number
}

const ViewIsReportCorrectModal = ({
  opened,
  close,
  moneyCollectionAmount,
  expenseAnount,
  dollarAmount,
  envelopeAmount,
  depositOrderAmount,
  depositAmount
}: ViewIsReportCorrectProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      styles={{
        title: { fontSize: '18px', fontWeight: 'bold' },
        body: { padding: '20px' }
      }}
      size={'auto'}
    >
      <section className='space-y-4'>
        <div className='space-y-1'>
          <div className='flex items-center space-x-2'>
            <h1 className='font-semibold text-md'>Primera validación</h1>
            {depositOrderAmount ===
            moneyCollectionAmount +
              dollarAmount +
              expenseAnount -
              envelopeAmount ? (
              <BsCheckCircleFill color={'#22c55e'} size={'15px'} />
            ) : (
              <BsXCircleFill color={'#ef4444'} size={'15px'} />
            )}
          </div>

          <table className='w-full'>
            <thead className=' text-sm'>
              <th className=' font-normal pr-2 py-3'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <div className='w-2 h-2 bg-green-500 rounded-sm'></div>
                  <p>Recaudaciones</p>
                </div>
              </th>
              <th  className='font-normal'> + </th>
              <th className='font-normal  px-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <div className='w-2 h-2 bg-amber-500 rounded-sm'></div>
                  <p>Salidas</p>
                </div>{' '}
              </th>
              <th className='font-normal '> + </th>
              <th className='font-normal px-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <div className='w-2 h-2 bg-amber-500 rounded-sm'></div>
                  <p>Dólares</p>
                </div>
              </th>
              <th className='font-normal'> - </th>
              <th className='font-normal px-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <div className='w-2 h-2 bg-amber-500 rounded-sm'></div>
                  <p>Sobres</p>
                </div>
              </th>
              <th  className='font-normal'> = </th>
              <th className='font-normal pl-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <div className='w-2 h-2 bg-gray-500 rounded-sm'></div>
                  <p>{`${depositOrderAmount.toFixed(
                    2
                  )} Bs. (Orden de depósito)`}</p>
                </div>
              </th>
            </thead>

            <tbody className='text-sm'>
              <td className='pr-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <p>{moneyCollectionAmount.toFixed(2)} Bs.</p>
                </div>
              </td>
              <td> + </td>
              <td className='px-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <p>{expenseAnount.toFixed(2)} Bs.</p>
                </div>{' '}
              </td>
              <td> + </td>
              <td className='px-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <p>{dollarAmount.toFixed(2)} Bs.</p>
                </div>
              </td>
              <td> - </td>
              <td className='px-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <p>{envelopeAmount.toFixed(2)} Bs.</p>
                </div>
              </td>
              <td> = </td>
              <td className='pl-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <p>
                    {(
                      moneyCollectionAmount +
                      dollarAmount -
                      envelopeAmount +
                      expenseAnount
                    ).toFixed(2)}{' '}
                    Bs.
                  </p>
                </div>
              </td>
            </tbody>
          </table>
        </div>
        <Divider />
        <div className='space-y-1'>
          <div className='flex items-center space-x-2'>
            <h1 className='font-semibold text-md'>Segunda validación</h1>
            {depositAmount === moneyCollectionAmount ? (
              <BsCheckCircleFill color={'#22c55e'} size={'15px'} />
            ) : (
              <BsXCircleFill color={'#ef4444'} size={'15px'} />
            )}
          </div>

          <table className=''>
            <thead className='text-sm'>
              <th className='pr-2 py-3 font-normal'>
                {' '}
                <div className='flex space-x-1 items-center '>
                  <div className='w-2 h-2 bg-green-500 rounded-sm'></div>
                  <p>Recaudaciones</p>
                </div>
              </th>
              <th className='font-normal'> = </th>
              <th className='px-2 font-normal'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <div className='w-2 h-2 bg-blue-500 rounded-sm'></div>
                  <p>Depósitos</p>
                </div>{' '}
              </th>
            </thead>

            <tbody className='text-sm'>
              <td className='pr-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <p>{moneyCollectionAmount.toFixed(2)} Bs.</p>
                </div>
              </td>
              <td> = </td>
              <td className='px-2'>
                {' '}
                <div className='flex space-x-1 items-center'>
                  <p>{depositAmount.toFixed(2)} Bs.</p>
                </div>{' '}
              </td>
            </tbody>
          </table>
        </div>
      </section>
    </Modal>
  )
}

export default ViewIsReportCorrectModal
