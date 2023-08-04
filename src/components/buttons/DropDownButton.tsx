import React from 'react';
import { IExpense } from '../../models/Expense';
import { Menu } from '@mantine/core';

interface ComponentListProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  expenses: IExpense[];
}

const DropDownButton: React.FC<ComponentListProps> = ({ isOpen, open, close, expenses }) => {
  return (
    <div>
        <Menu.Dropdown >
           <Menu.Label>Salidas</Menu.Label>
      {expenses.map(expense => (
         
           <Menu.Item key={expense.id} onClick={() => open()}>{expense.account?.name}</Menu.Item>
         
      )
      )}
      </Menu.Dropdown>
    </div>
  );
}; 

export default DropDownButton;
