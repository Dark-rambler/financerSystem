import { useState } from 'react'
import { Popover, ActionIcon, Table } from '@mantine/core'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import { useDepositOrderStore } from '../store/depositOrderStore'

const BranchOfficeAmountPopover = () => {
  const { depositBranchOffice } = useDepositOrderStore()
  const [opened, setOpened] = useState(false)
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <ActionIcon
          onClick={() => setOpened(o => !o)}
          className='bg-gray-100 hover:bg-gray-200'
        >
          <AiOutlineQuestionCircle size={18} color={'#6b7280'} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <div className='w-full rounded-md border border-gray-300 '>
          <Table verticalSpacing={'xs'}>
            <thead className='bg-slate-200'>
              <tr>
                <th>Sucursal</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {depositBranchOffice &&
                depositBranchOffice.map((element, index) => {
                  return (
                    <tr key={`amounts-${index}`}>
                      <td>{element.branchOffice?.name}</td>
                      <td>{element.amount.toFixed(2)} Bs.</td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}

export default BranchOfficeAmountPopover
