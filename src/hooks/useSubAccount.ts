import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState, useRef } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import socket from '../services/SocketIOConnection'

import { getAllAccounts } from '../services/Account'

import { useLoginStore } from '../components/store/loginStore'
import { ISubAccount } from '../models/SubAccount'

import { IAccount } from '../models/Account'
import { errorToast, succesToast } from '../services/toasts'

import {
  getAllSubAccounts,
  createSubAccount,
  deleteSubAccount
} from '../services/SubAccount'

interface SelectFormat {
  label: string
  value: string
}

export const useSubAccount = () => {
  const { token } = useLoginStore()
  const [opened, { open, close }] = useDisclosure()
  const [openedDelete, handlersDelete] = useDisclosure()

  const [subAccounts, setSubAccounts] = useState<ISubAccount[]>([])
  const gridRef = useRef<AgGridReact<ISubAccount>>(null)

  const [actualSubAccountId, setActualSubAccountId] = useState<number>(0)

  const [accounts, setAccounts] = useState<SelectFormat[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRepeatedError, setIsRepeatedError] = useState<boolean>(false)

  const form = useForm<ISubAccount>({
    initialValues: {
      name: '',
      accountId: 0
    },
    validate: {
      name: value => {
        if (value === '') return 'Ingrese una subcuenta financiera'
        if (isRepeatedError) return 'Ya existe una subcuenta con este nombre'
      },
      accountId: value => {
        if (value === 0) return 'Seleccione una regional'
      }
    }
  })

  const getSubAccounts = async () => {
    const data = await getAllSubAccounts(token)
    setSubAccounts(data)
  }

  const getAccounts = async () => {
    const data = await getAllAccounts(token)
    if (!data) {
      errorToast('Error al cargar las cuentas financieras')
      return null
    }

    const accounts = data.map((account: IAccount) => ({
      value: account.id,
      label: account.name
    }))
    setAccounts(accounts)
  }

  useEffect(() => {
    getSubAccounts()
    getAccounts()
  }, [])

  useEffect(() => {
    socket.on('newSubAccount', (data: ISubAccount) => {
      setSubAccounts(subAccounts => [...subAccounts, data])
    })

    socket.on('deletedSubAccount', (data: ISubAccount) => {
      setSubAccounts(subAccounts =>
        subAccounts.filter(subAccount => subAccount.id !== data.id)
      )
    })

    return () => {
      socket.off('newSubAccount')
      socket.off('deletedSubAccount')
    }
  }, [])

  const registerSubAccount = async () => {
    const isRepeated = subAccounts.find(
      subAccount => subAccount.name === form.values.name
    )

    if (isRepeated) {
      setIsRepeatedError(() => true)
      return null
    }

    setIsRepeatedError(() => false)
    setIsLoading(true)
    const body: ISubAccount = {
      name: form.values.name,
      accountId: form.values.accountId
    }
    const data = await createSubAccount(token, body)

    if (!data) {
      errorToast('Error al crear subcuenta financiera')
      setIsLoading(false)
      return null
    }
    setSubAccounts([...subAccounts, data])
    close()
    form.reset()
    succesToast('Subcuenta financiera creada correctamente')
    setIsLoading(false)

    socket.emit('createSubAccount', data)
  }

  const onFilterTextBoxChanged = () => {
    let value = ''
    const input = document.getElementById(
      'filter-text-box'
    ) as HTMLInputElement | null

    if (input !== null) {
      value = input.value
    }
    gridRef.current?.api.setQuickFilter(value)
  }

  const onDeleteBranchOffice = async () => {
    setIsLoading(true)
    const data = await deleteSubAccount(token, actualSubAccountId)
    if (!data) {
      errorToast('Error al eliminar subcuenta financiera')
      setIsLoading(false)
      return null
    }
    setSubAccounts(
      subAccounts.filter(subAccount => subAccount.id !== actualSubAccountId)
    )
    handlersDelete.close()
    setIsLoading(false)
    succesToast('Subcuenta financiera eliminada correctamente')
    socket.emit('deleteSubAccount', data)
  }

  return {
    opened,
    open,
    close,
    subAccounts,
    gridRef,
    onFilterTextBoxChanged,
    form,
    accounts,

    registerSubAccount,
    openedDelete,
    handlersDelete,
    actualSubAccountId,
    setActualSubAccountId,
    onDeleteBranchOffice,
    isLoading
  }
}
