import { useState } from 'react'
import { Popover, Button, ActionIcon, Table } from '@mantine/core'
import { AiFillQuestionCircle } from 'react-icons/ai'

import { useDepositOrderStore } from '../store/depositOrderStore'

const BranchOfficePopover = () => {
  const { depositOrder, depositBranchOffice } = useDepositOrderStore()
  const [opened, setOpened] = useState(false)
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        {/* <Button onClick={() => setOpened(o => !o)}>Toggle popover</Button> */}
        <ActionIcon onClick={() => setOpened(o => !o)}>
          <AiFillQuestionCircle size={19} color={'#6b7280'} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <div className='w-full rounded-md border border-gray-300 '>
          <Table verticalSpacing={'xs'}>
            <thead className='bg-slate-200'>
              <tr>
                <th>Sucursal</th>
              </tr>
            </thead>
            <tbody>
              {depositBranchOffice.map(element => (
                <tr>
                  <td>{element.branchOffice?.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}

export default BranchOfficePopover
