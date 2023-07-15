import { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'

import { IDolar } from '../models/Dolar'

interface FormSelectOption {
  value: string
  label: string
}

export const useDolar = () => {
  const [dolars, setDolars] = useState<IDolar[]>([])
  const [opened, modalHandler] = useDisclosure()
  const [openedDelete, modalDeleteHandler] = useDisclosure()
  const [actualId, setActualId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [totalAmountBs, setTotalAmountBs] = useState<number>(0)

  const [branchOffices, setBranchOffices] = useState<FormSelectOption[]>([])

  const form = useForm<IDolar>({
    initialValues: {
      branchOfficeId: 0,
      date: null,
      amount: '',
      amountBs: '',
      description: ''
    },
    validate: {
      branchOfficeId: value => value === 0 && 'Seleccione una sucursal',
      date: isNotEmpty('Ingrese una fecha'),
      amount: isNotEmpty('Ingrese un monto en dólares'),
      amountBs: isNotEmpty('Ingrese un monto en bolivianos'),
      description: isNotEmpty('Ingrese una descripción')
    }
  })

  const onClose = () => {
    modalHandler.close()
    setIsEditing(false)
    form.reset()
  }

  const getNewDolars = () => {
    const newDolars = {
      date: form.values.date,
      amount: form.values.amount,
      branchOffice: {
        name: branchOffices.find(
          branchOffice =>
            Number(branchOffice.value) === form.values.branchOfficeId
        )?.label as string,
        address: '',
        regionalOfficeId: 0
      },
      branchOfficeId: form.values.branchOfficeId,
      amountBs: form.values.amountBs,
      description: form.values.description
    }
    return newDolars
  }

  const calculateAmount = () => {
    const totalAmount = dolars.reduce((accumulator, currentValue) => {
      const amount =
        typeof currentValue.amount === 'string'
          ? parseInt(currentValue.amount)
          : currentValue.amount
      return accumulator + amount
    }, 0)
    const totalAmountBs = dolars.reduce((accumulator, currentValue) => {
      const amountBs =
        typeof currentValue.amountBs === 'string'
          ? parseInt(currentValue.amountBs)
          : currentValue.amountBs
      return accumulator + amountBs
    }, 0)
    setTotalAmount(() => totalAmount)
    setTotalAmountBs(() => totalAmountBs)
  }

  const onSubmit = () => {
    modalHandler.close()
    const newDolars = getNewDolars()
    dolars.push(newDolars)
    form.reset()
    calculateAmount()
  }

  const onSubmitEdit = () => {
    const newDolar = getNewDolars()
    dolars[actualId] = newDolar
    modalHandler.close()
    setIsEditing(false)
    form.reset()
    calculateAmount()
  }

  const onClickEdit = (id: number) => {
    modalHandler.open()
    setIsEditing(true)
    setActualId(id)
    const selectedDolar = dolars[id]

    form.setFieldValue(
      'branchOfficeId',
      selectedDolar?.branchOfficeId as number
    )
    form.setFieldValue('date', selectedDolar?.date as Date)
    form.setFieldValue('amount', selectedDolar?.amount as string)
    form.setFieldValue('amountBs', selectedDolar?.amountBs as string)
    form.setFieldValue('description', selectedDolar?.description as string)
  }

  const onDelete = () => {
    dolars.splice(actualId, 1)
    modalDeleteHandler.close()
    setIsEditing(false)
    modalDeleteHandler.close()
    form.reset()
    calculateAmount()
  }

  return {
    opened,
    modalHandler,
    openedDelete,
    modalDeleteHandler,
    dolars,
    setDolars,
    actualId,
    form,
    onSubmit,
    onClickEdit,
    onClose,
    isEditing,
    onSubmitEdit,
    setActualId,
    onDelete,
    branchOffices,
    setBranchOffices,
    totalAmount,
    totalAmountBs
  }
}
