import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'

import { IExpense } from '../models/Expense'
import { IAccount } from '../models/Account'
import { ISubAccount } from '../models/SubAccount'
import { getAllSubAccounts as getAllSubAccountsServide } from '../services/SubAccount'
import { getAllAccounts as getAllAccountsService } from '../services/Account'
import { errorToast } from '../services/toasts'

import { useLoginStore } from '../components/store/loginStore'

export const useExpense = () => {
  const { token } = useLoginStore()
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [subAccounts, setSubAccounts] = useState<ISubAccount[]>([])
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [expenseOpened, expenseOpenedHandler] = useDisclosure()

  const getAllAccounts = async () => {
    const response = await getAllAccountsService(token)
    if (!response) {
      errorToast('Error al obtener los datos')
      return null
    }
    setAccounts(response)
  }

  const getAllSubAccounts = async () => {
    const response = await getAllSubAccountsServide(token)
    if (!response) {
      return null
    }
    setSubAccounts(response)
  }

  useEffect(() => {
    getAllAccounts()
    getAllSubAccounts()
  }, [])
  return {
    expenseOpened,
    expenseOpenedHandler,

    expenses
  }
}
