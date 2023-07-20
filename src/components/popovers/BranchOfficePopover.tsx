import { useDisclosure } from '@mantine/hooks'
import { Popover, ActionIcon, Table } from '@mantine/core'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import { useDepositOrderStore } from '../store/depositOrderStore'

const BranchOfficePopover = () => {
  const { depositBranchOffice } = useDepositOrderStore()
  const [opened, { open, close }] = useDisclosure()
  return (
    <Popover opened={opened} >
      <Popover.Target>
        <ActionIcon
          onMouseEnter={open}
          onMouseLeave={close}
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
              </tr>
            </thead>
            <tbody>
              {depositBranchOffice &&
                depositBranchOffice.map((element, index) => {
                  return (
                    <tr key={`branchOffices-${index}`}>
                      <td>{element.branchOffice?.name}</td>
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

export default BranchOfficePopover
