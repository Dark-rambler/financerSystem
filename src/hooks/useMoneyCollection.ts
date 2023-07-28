import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'

import { IMoneyCollection } from '../models/MoneyCollection'

import { useDepositOrderStore } from '../components/store/depositOrderStore'
import { getAllMoneyCollectionsFromDepositOrder } from '../services/MoneyCollection'
import { useLoginStore } from '../components/store/loginStore'

interface FormSelectOption {
  value: string
  label: string
}

export const useMoneyCollection = () => {
  const { depositOrder } = useDepositOrderStore()
  const { token } = useLoginStore()
  const [branchOffices, setBranchOffices] = useState<FormSelectOption[]>([])
  const [selectedBranchOffices, setSelectedBranchOffices] = useState<
    FormSelectOption[]
  >([])

  const [moneyCollectionOpened, moneyCollectionOpenedHandler] = useDisclosure()
  const [moneyCollectionOpenedDelete, moneyCollectionOpenedDeleteHandler] =
    useDisclosure()
  const [moneyCollections, setMoneyCollections] = useState<IMoneyCollection[]>(
    []
  )

  const [actualId, setActualId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  const form = useForm<IMoneyCollection>({
    initialValues: {
      branchOfficeId: 0,
      date: null,
      amount: '',
      deliveredBy: '',
      receivedById: depositOrder.employee?.id as number
    },
    validate: {
      branchOfficeId: value => {
        if (value === 0) return 'Seleccione una sucursal'
        if (
          selectedBranchOffices.find(
            branchOffice =>
              Number(branchOffice.value) === Number(value) &&
              Number(moneyCollections[actualId].branchOfficeId) !==
                Number(value)
          )
        )
          return 'Esta sucursal ya fue seleccionada'
      },
      date: isNotEmpty('Seleccione una fecha'),
      amount: isNotEmpty('Ingrese un monto'),
      deliveredBy: isNotEmpty('Ingrese un nombre')
    }
  })

  const calculateAmount = () => {
    const totalAmount = moneyCollections.reduce((accumulator, currentValue) => {
      const amount =
        typeof currentValue.amount === 'string'
          ? parseInt(currentValue.amount)
          : currentValue.amount
      return accumulator + amount
    }, 0)
    setTotalAmount(() => totalAmount)
  }

  const onClose = () => {
    moneyCollectionOpenedHandler.close()
    setIsEditing(false)
    form.reset()
  }

  const getNewMoneyCollection = () => {
    const newMoneyCollection = {
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
      amount: form.values.amount,
      deliveredBy: form.values.deliveredBy,
      receivedById: depositOrder.employee?.id as number,
      receivedBy: {
        name: depositOrder.employee?.name as string,
        lastName: depositOrder.employee?.lastName as string,
        roleId: 0,
        regionalOfficeId: depositOrder.regional?.id as number
      }
    }
    return newMoneyCollection
  }

  const onSubmit = () => {
    moneyCollectionOpenedHandler.close()
    const newMoneyCollection = getNewMoneyCollection()
    moneyCollections.push(newMoneyCollection)
    const branchOfficeIndex = branchOffices.findIndex(
      branchOffice =>
        Number(branchOffice.value) === Number(form.values.branchOfficeId)
    )
    setSelectedBranchOffices(prevState => [
      ...prevState,
      branchOffices[branchOfficeIndex]
    ])

    form.reset()
    calculateAmount()
  }

  const onSubmitEdit = () => {
    const newMoneyCollection = getNewMoneyCollection()
    moneyCollections[actualId] = newMoneyCollection
    moneyCollectionOpenedHandler.close()
    setIsEditing(false)
    form.reset()
    calculateAmount()
  }

  const onClickEdit = (id: number) => {
    moneyCollectionOpenedHandler.open()
    setIsEditing(true)
    setActualId(id)
    const moneyCollection = moneyCollections[id]

    form.setFieldValue('date', moneyCollection?.date as Date)
    form.setFieldValue(
      'branchOfficeId',
      moneyCollection?.branchOfficeId as number
    )
    form.setFieldValue('amount', moneyCollection?.amount as string)
    form.setFieldValue('deliveredBy', moneyCollection?.deliveredBy as string)
    form.setFieldValue('receivedById', moneyCollection?.receivedById as number)
  }

  const onDelete = () => {
    moneyCollections.splice(actualId, 1)
    moneyCollectionOpenedHandler.close()
    setIsEditing(false)
    moneyCollectionOpenedDeleteHandler.close()

    selectedBranchOffices.splice(actualId, 1)

    form.reset()
    calculateAmount()
  }

  const getFormattedMoneyCollections = () => {
    const formatedData = moneyCollections.map(element => ({
      depositOrderId: depositOrder.id,
      date: element.date,
      branchOfficeId: Number(element.branchOfficeId),
      amount: Number(element.amount),
      deliveredBy: element.deliveredBy,
      receivedById: Number(element.receivedById)
    }))
    return formatedData
  }

  const getMoneyCollectionsFromDepositOrder = async (id: number) => {
    const moneyCollections = await getAllMoneyCollectionsFromDepositOrder(id, token)
    if(!moneyCollections) return

    setMoneyCollections(moneyCollections)
    calculateAmount()
  }

  return {
    moneyCollectionOpened,
    moneyCollectionOpenedHandler,
    moneyCollectionOpenedDelete,
    moneyCollectionOpenedDeleteHandler,

    branchOffices,
    moneyCollections,
    form,
    adminName: `${depositOrder.employee?.name} ${depositOrder.employee?.lastName}`,
    onSubmit,
    onClickEdit,
    onClose,
    isEditing,
    onSubmitEdit,
    setActualId,
    onDelete,
    totalAmount,
    setBranchOffices,
    setMoneyCollections,
    getFormattedMoneyCollections,
    getMoneyCollectionsFromDepositOrder,
    depositOrder
  }
}
