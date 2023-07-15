import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'

import { IBranchModel } from '../models/BranchOffice'
import { IMoneyCollection } from '../models/MoneyCollection'
import { useLoginStore } from '../components/store/loginStore'

import { getAllBranchOffices as getAllBranchOfficesService } from '../services/BranchOffices'
import { useDepositOrderStore } from '../components/store/depositOrderStore'

interface FormSelectOption {
  value: string
  label: string
}

export const useMoneyCollection = () => {
  const { token } = useLoginStore()
  const { depositOrder } = useDepositOrderStore()

  const [branchOffices, setBranchOffices] = useState<FormSelectOption[]>([])
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
      branchOfficeId: value => value === 0 && 'Seleccione una sucursal',
      date: isNotEmpty('Seleccione una fecha'),
      amount: isNotEmpty('Ingrese un monto'),
      deliveredBy: isNotEmpty('Ingrese un nombre'),
      receivedById: isNotEmpty('Seleccione un empleado')
    }
  })

  // const getAllBranchOffices = async () => {
  //   const response = await getAllBranchOfficesService(token)
  //   if (!response) {
  //     return null
  //   }

  //   const branchOfficesFiltered = response
  //     .filter((branchOffice: IBranchModel) => {
  //       if (branchOffice.regionalOffice?.id == depositOrder.regional?.id) {
  //         return true
  //       }
  //     })
  //     .map((branchOffice: IBranchModel) => {
  //       return { value: branchOffice.id, label: branchOffice.name }
  //     })

  //   setBranchOffices(branchOfficesFiltered)
  // }

  // useEffect(() => {
  //   getAllBranchOffices()
  // }, [])

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
            Number(branchOffice.value) === form.values.branchOfficeId
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
    // setMoneyCollections([...moneyCollections, newMoneyCollection])
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
    form.reset()
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
    setBranchOffices
  }
}
