import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'

import { IDollar } from '../models/Dollar'
import { useDepositOrderStore } from '../components/store/depositOrderStore'
import { useLoginStore } from '../components/store/loginStore'
import { getAllDollarsFromDepositOrder } from '../services/Dollar'

interface FormSelectOption {
  value: string
  label: string
}

export const useDollar = () => {
  const { depositOrder } = useDepositOrderStore()
  const { token } = useLoginStore()
  const [dollars, setDollars] = useState<IDollar[]>([])
  const [opened, modalHandler] = useDisclosure()
  const [openedDelete, modalDeleteHandler] = useDisclosure()
  const [actualId, setActualId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [totalAmountBs, setTotalAmountBs] = useState<number>(0)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const [branchOffices, setBranchOffices] = useState<FormSelectOption[]>([])

  const form = useForm<IDollar>({
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

  const getNewDollars = () => {
    const newDollars = {
      date: form.values.date,
      amount: form.values.amount,
      branchOffice: {
        name: branchOffices.find(
          branchOffice =>
            Number(branchOffice.value) === Number(form.values.branchOfficeId)
        )?.label as string,
        address: '',
        regionalOfficeId: 0
      },
      branchOfficeId: form.values.branchOfficeId,
      amountBs: form.values.amountBs,
      description: form.values.description
    }
    return newDollars
  }

  const calculateAmount = () => {
    const totalAmount = dollars.reduce((accumulator, currentValue) => {
      const amount =
        typeof currentValue.amount === 'string'
          ? parseInt(currentValue.amount)
          : currentValue.amount
      return accumulator + amount
    }, 0)
    const totalAmountBs = dollars.reduce((accumulator, currentValue) => {
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
    const newDollars = getNewDollars()
    dollars.push(newDollars)
    form.reset()
    calculateAmount()
  }

  const onSubmitEdit = () => {
    const newDollar = getNewDollars()
    dollars[actualId] = newDollar
    modalHandler.close()
    setIsEditing(false)
    form.reset()
    calculateAmount()
  }

  const onClickEdit = (id: number) => {
    modalHandler.open()
    setIsEditing(true)
    setActualId(id)
    const selectedDollar = dollars[id]

    form.setFieldValue(
      'branchOfficeId',
      selectedDollar?.branchOfficeId as number
    )
    form.setFieldValue('date', selectedDollar?.date as Date)
    form.setFieldValue('amount', selectedDollar?.amount as string)
    form.setFieldValue('amountBs', selectedDollar?.amountBs as string)
    form.setFieldValue('description', selectedDollar?.description as string)
  }

  const onDelete = () => {
    dollars.splice(actualId, 1)
    modalDeleteHandler.close()
    setIsEditing(false)
    modalDeleteHandler.close()
    form.reset()
    calculateAmount()
  }

  const getFormattedDollars = () => {
    const formattedDollars = dollars.map(dollar => ({
      depositOrderId: depositOrder.id,
      branchOfficeId: Number(dollar.branchOfficeId),
      date: dollar.date,
      amount: Number(dollar.amount),
      amountBs: Number(dollar.amountBs),
      description: dollar.description
    }))
    return formattedDollars
  }

  const getDollarsFromDepositOrder = async (
    id: number,
    totalAmountBs: number,
    totalAmountUSD: number
  ) => {
    const dollars = await getAllDollarsFromDepositOrder(id, token)
    if (!dollars) return
  
    setDollars(dollars)
    setTotalAmountBs(totalAmountBs)
    setTotalAmount(totalAmountUSD)
  }

  return {
    opened,
    modalHandler,
    openedDelete,
    modalDeleteHandler,
    dollars,
    setDollars,
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
    setTotalAmount,
    totalAmountBs,
    setTotalAmountBs,
    getFormattedDollars,
    getDollarsFromDepositOrder,
    currentDate,
    setCurrentDate
  }
}
