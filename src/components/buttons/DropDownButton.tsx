import React from 'react'

import { Menu } from '@mantine/core'
import { useSubAccount } from '../../hooks/useSubAccount'
interface ComponentListProps {
  open: () => void

  addBuscar: (value: string) => void
}

const DropDownButton: React.FC<ComponentListProps> = ({ open, addBuscar }) => {

  const expenses= useSubAccount().accounts
  return (
    <div>
      <Menu.Dropdown>
        <Menu.Label>Salidas</Menu.Label>
        {expenses.map(expense => (
          <Menu.Item key={expense.value} onClick={() => {open(), addBuscar(expense.label)}}>
            {expense.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </div>
  )
}

export default DropDownButton
