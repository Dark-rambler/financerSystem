import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'

import { IDeposit } from '../models/Deposit'

interface SelectFormat {
  value: string
  label: string
}

export const useDeposit = () => {
  const [deposits, setDeposits] = useState<IDeposit[]>([])
  const [opened, modalHandler] = useDisclosure()
  const [openedDelete, modalDeleteHandler] = useDisclosure()
  const [actualId, setActualId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)

  const [banks, setBanks] = useState<SelectFormat[]>([
    
    { value: 'Banco de credito BCP', label: 'Banco de credito BCP' },
    { value: 'Banco Bisa', label: 'Banco Bisa' },
    { value: 'Banco Fie', label: 'Banco Fie' },
    { value: 'Banco Ganadero', label: 'Banco Ganadero' },
    { value: 'Banco Mercantil Santa Cruz', label: 'Banco Mercantil Santa Cruz' },
    { value: 'Banco Nacional de Bolivia', label: 'Banco Nacional de Bolivia' },
    { value: 'Banco Unión', label: 'Banco Unión' },
    { value: 'BancoSol', label: 'BancoSol' },
    { value: 'Otro', label: 'Otro' },
  ])

  const form = useForm<IDeposit>({
    initialValues: {
      voucherNumber: '',
      amount: '',
      date: null,
      bank: '',
      description: ''
    },
    validate: {
      voucherNumber: isNotEmpty('Ingrese un número de voucher'),
      amount: isNotEmpty('Ingrese un monto'),
      date: isNotEmpty('Ingrese una fecha'),
      bank: isNotEmpty('Ingrese un banco'),
      description: isNotEmpty('Ingrese una descripción'),
    }
  })

  const onClose = () => {
    modalHandler.close()
    form.reset()
  }

  const getNewDeposit = () => {
    const newDeposit = {
      voucherNumber: form.values.voucherNumber,
      amount: form.values.amount,
      date: form.values.date,
      bank: form.values.bank,
      description: form.values.description
    }
    return newDeposit
  }

  const onSubmit = () => {
    modalHandler.close()
    const newDeposit = getNewDeposit()
    setDeposits([...deposits, newDeposit])
    form.reset()
  }

  const onSubmitEdit = () => {
    const newMoneyCollection = getNewDeposit()
    deposits[actualId] = newMoneyCollection
    modalHandler.close()
    setIsEditing(false)
    form.reset()
  }

  const onClickEdit = (id: number) => {
    modalHandler.open()
    setIsEditing(true)
    setActualId(id)
    const selectedDeposit = deposits[id]

    form.setFieldValue(
      'voucherNumber',
      selectedDeposit?.voucherNumber as string
    )
    form.setFieldValue('amount', selectedDeposit?.amount as string)
    form.setFieldValue('date', selectedDeposit?.date as Date)
    form.setFieldValue('bank', selectedDeposit?.bank as string)
    form.setFieldValue('description', selectedDeposit?.description as string)
  }

  const onDelete = () => {
    deposits.splice(actualId, 1)
    modalDeleteHandler.close()
    setIsEditing(false)
    modalDeleteHandler.close()
    form.reset()
  }

  return {
    opened,
    modalHandler,
    openedDelete,
    modalDeleteHandler,
    deposits,
    setDeposits,
    actualId,
    form,
    onSubmit,
    onClickEdit,
    onClose,
    isEditing,
    onSubmitEdit,
    setActualId,
    onDelete,
    banks,
    setBanks
  }
}