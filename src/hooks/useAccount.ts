import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState, useRef } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'
import socket from '../services/SocketIOConnection'

import { useLoginStore } from '../components/store/loginStore'
import { IAccount } from '../models/Account'

import { errorToast, succesToast } from '../services/toasts'

import {
  getAllAccounts,
  createAccount,
  deleteAccount
} from '../services/Account'

export const useAccount = () => {
  const { token } = useLoginStore()
  const [opened, { open, close }] = useDisclosure()
  const [openedDelete, handlersDelete] = useDisclosure()

  const [accounts, setAccounts] = useState<IAccount[]>([])
  const gridRef = useRef<AgGridReact<IAccount>>(null)

  const [actualAccountId, setActualAccountId] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<IAccount>({
    initialValues: {
      name: ''
    },
    validate: {
      name: isNotEmpty('Ingrese una cuenta financiera')
    }
  })

  const getAccounts = async () => {
    const data = await getAllAccounts(token)
    if (!data) {
      errorToast('Error al obtener las cuentas financieras')
      return null
    }
    setAccounts(data)
  }

  useEffect(() => {
    getAccounts()
  }, [])

  useEffect(() => {
    socket.on('newAccount', (data: IAccount) => {
      console.log(data)
      setAccounts(accounts => [...accounts, data])
    })

    socket.on('deletedAccount', (data: IAccount) => {
      console.log(data)
      setAccounts(accounts => accounts.filter(account => account.id !== data.id))
    })

    return () =>
    {
      socket.off('newAccount')
      socket.off('deletedAccount')
    }
  }, [])

  const registerAccount = async () => {
    setIsLoading(true)
    const body: IAccount = {
      name: form.values.name
    }
    const data = await createAccount(token, body)

    if (!data) {
      errorToast('Error al crear cuenta financiera')
      setIsLoading(false)
      return null
    }
    setAccounts([...accounts, data])
    close()
    form.reset()
    succesToast('Cuenta financiera creada correctamente')
    setIsLoading(false)

    socket.emit('createAccount', data)
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
    const data = await deleteAccount(token, actualAccountId)
    if (!data) {
      errorToast('Error al eliminar cuenta financiera')
      setIsLoading(false)
      return null
    }
    setAccounts(accounts.filter(account => account.id !== actualAccountId))
    handlersDelete.close()
    setIsLoading(false)
    succesToast('Cuenta financiera eliminada correctamente')
    socket.emit('deleteAccount', data)
  }

  return {
    opened,
    open,
    close,
    accounts,
    gridRef,
    onFilterTextBoxChanged,
    form,

    registerAccount,
    openedDelete,
    handlersDelete,
    actualAccountId,
    setActualAccountId,
    onDeleteBranchOffice,
    isLoading
  }
}
