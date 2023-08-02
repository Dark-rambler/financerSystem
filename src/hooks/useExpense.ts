import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'

import { IExpense } from '../models/Expense'
import { IAccount } from '../models/Account'
import { ISubAccount } from '../models/SubAccount'

import { getAllSubAccounts as getAllSubAccountsServide } from '../services/SubAccount'
import { getAllAccounts as getAllAccountsService } from '../services/Account'
import { errorToast } from '../services/toasts'

import { useLoginStore } from '../components/store/loginStore'
import { useDepositOrderStore } from '../components/store/depositOrderStore'
import { getAllExpensesFromDepositOrder } from '../services/Expense'

interface FormSelectOption {
  value: string
  label: string
}

export const useExpense = (isReadOnly: boolean) => {
  const { token } = useLoginStore()
  const { depositOrder } = useDepositOrderStore()

  const [expenseOpened, expenseOpenedHandler] = useDisclosure()
  const [expenseOpenedDelete, expenseOpenedDeleteHandler] = useDisclosure()

  const [accounts, setAccounts] = useState<FormSelectOption[]>([])
  const [subAccounts, setSubAccounts] = useState<ISubAccount[]>([])
  const [filteredSubAccounts, setFilteredSubAccounts] = useState<
    FormSelectOption[]
  >([])
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  )
  const [branchOffices, setBranchOffices] = useState<FormSelectOption[]>([])

  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [actualId, setActualId] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const documentTypes = [
    { value: 'Recibo', label: 'Recibo' },
    { value: 'Factura', label: 'Factura' }
  ]

  const expenseTypes = [
    { value: 'Gasto', label: 'Gasto' },
    { value: 'Activo', label: 'Activo' },
    { value: 'Importación', label: 'Importación' }
  ]

  const form = useForm<IExpense>({
    initialValues: {
      documentType: '',
      documentNumber: '',
      date: null,
      branchOfficeId: 0,
      expenseType: '',
      amount: '',
      description: '',
      accountId: 0,
      subAccountId: 0
    },
    validate: {
      documentType: isNotEmpty('Seleccione un tipo de documento'),
      documentNumber: isNotEmpty('Ingrese un número de documento'),
      date: isNotEmpty('Seleccione una fecha'),
      branchOfficeId: value => value === 0 && 'Seleccione una sucursal',
      amount: isNotEmpty('Ingrese un monto'),
      expenseType: isNotEmpty('Seleccione un tipo de gasto'),
      description: isNotEmpty('Ingrese una descripción'),
      accountId: (value) => (value === 0 ? 'Seleccione una cuenta' : null),
      subAccountId: value => value === 0 && 'Seleccione una subcuenta'
    }
  })

  useEffect(() => {
    if (!isReadOnly) {
      getAllAccounts()
      getAllSubAccounts()
    }
  }, [])


  const calculateAmount = () => {
    const totalAmount = expenses.reduce((accumulator, currentValue) => {
      const amount =
        typeof currentValue.amount === 'string'
          ? parseInt(currentValue.amount)
          : currentValue.amount
      return accumulator + amount
    }, 0)
    setTotalAmount(() => totalAmount)
  }

  const onClose = () => {
    expenseOpenedHandler.close()
    setIsEditing(false)
    form.reset()
  }

  const getAllAccounts = async () => {
    const response = await getAllAccountsService(token)
    if (!response) {
      errorToast('Error al obtener los datos')
      return null
    }
    const accountsFiltered = response.map((account: IAccount) => ({
      value: account.id,
      label: account.name
    }))
    setAccounts(accountsFiltered)
  }

  const getAllSubAccounts = async () => {
    const response = await getAllSubAccountsServide(token)
    if (!response) {
      return null
    }
    setSubAccounts(response)
    const subAccountsFiltered = response.map((subAccount: ISubAccount) => ({
      value: subAccount.id,
      label: subAccount.name
    }))
    setFilteredSubAccounts(subAccountsFiltered)
  }

  const getNewExpense = () => {
    const newExpense: IExpense = {
      documentType: form.values.documentType,
      documentNumber: form.values.documentNumber,
      date: form.values.date,
      branchOfficeId: form.values.branchOfficeId,
      branchOffice: {
        name: branchOffices.find(
          branchOffice =>
            Number(branchOffice.value) === Number(form.values.branchOfficeId)
        )?.label as string,
        address: '',
        regionalOfficeId: depositOrder.regional?.id as number
      },
      expenseType: form.values.expenseType,
      amount: form.values.amount,
      description: form.values.description,
      accountId: form.values.accountId,
      account: {
        name: accounts.find(
          account => Number(account.value) === form.values.accountId
        )?.label as string
      },
      subAccountId: form.values.subAccountId,
      subAccount: {
        name: filteredSubAccounts.find(subAccount => {
          return Number(subAccount.value) === Number(form.values.subAccountId)
        })?.label as string,
        accountId: form.values.accountId
      }
    }
    return newExpense
  }

  const onSubmit = () => {
    const newExpense = getNewExpense()
    expenses.push(newExpense)
    expenseOpenedHandler.close()
    form.reset()
    calculateAmount()
  }

  const onSubmitEdit = () => {
    const newMoneyCollection = getNewExpense()
    expenses[actualId] = newMoneyCollection
    expenseOpenedHandler.close()
    setIsEditing(false)
    form.reset()
    calculateAmount()
  }

  const onClickEdit = (id: number) => {
    expenseOpenedHandler.open()
    setIsEditing(true)
    setActualId(id)
    const expense = expenses[id]

    form.setFieldValue('documentType', expense.documentType)
    form.setFieldValue('documentNumber', expense.documentNumber)
    form.setFieldValue('date', expense.date)
    form.setFieldValue('branchOfficeId', expense.branchOfficeId)
    form.setFieldValue('expenseType', expense.expenseType)
    form.setFieldValue('amount', expense.amount)
    form.setFieldValue('description', expense.description)
    form.setFieldValue('accountId', expense.accountId)
    form.setFieldValue('subAccountId', Number(expense.subAccountId))
  }

  const onSelectAccount = (accountId: string) => {
    const filterSubAccounts = subAccounts.filter(subAccount => {
      return Number(subAccount.accountId) === Number(accountId)
    })

    const formatedSubAccounts = filterSubAccounts.map(subAccount => ({
      value: subAccount.id?.toString() as string,
      label: subAccount.name
    }))

    setFilteredSubAccounts(formatedSubAccounts)
    setSelectedAccountId(Number(accountId))
    form.setFieldValue('subAccountId', 0)
  }

  const onDelete = () => {
    expenses.splice(actualId, 1)
    expenseOpenedDeleteHandler.close()
    setIsEditing(false)
    form.reset()
    calculateAmount()
  }

  const getFormattedExpenses = () => {
    const formatedData = expenses.map(expense => ({
      depositOrderId: depositOrder.id as number,
      documentType: expense.documentType,
      documentNumber: expense.documentNumber,
      date: expense.date,
      branchOfficeId: Number(expense.branchOfficeId),
      expenseType: expense.expenseType,
      amount: Number(expense.amount),
      accountId: Number(expense.accountId),
      subAccountId: Number(expense.subAccountId),
      description: expense.description
    }))
    return formatedData
  }

  const getExpensesFromDepositOrder = async (id: number) => {
    const response = await getAllExpensesFromDepositOrder(id, token)
    if (!response) return

    setExpenses(response)
    calculateAmount()
  }

  return {
    expenseOpened,
    expenseOpenedHandler,
    form,
    expenses,
    documentTypes,
    accounts,
    subAccounts,
    branchOffices,
    expenseOpenedDelete,
    expenseOpenedDeleteHandler,
    onSubmit,
    isEditing,
    filteredSubAccounts,
    onSelectAccount,
    onClickEdit,
    onSubmitEdit,
    onClose,
    setActualId,
    onDelete,
    expenseTypes,
    totalAmount,
    setBranchOffices,
    getFormattedExpenses,
    getExpensesFromDepositOrder,
    selectedAccountId,
    currentDate,
    setCurrentDate
  }
}
