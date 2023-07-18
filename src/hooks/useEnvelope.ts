import { useState, useEffect } from 'react'
import { useForm, isNotEmpty } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

import { IEnvelope } from '../models/Envelope'
import { IBranchModel } from '../models/BranchOffice'

import { getAllBranchOffices as getAllBranchOfficesService } from '../services/BranchOffices'
import { useLoginStore } from '../components/store/loginStore'

interface FormSelectOption {
  value: string
  label: string
}

export const useEnvelope = () => {
  const { token } = useLoginStore()
  const [envelopes, setEnvelopes] = useState<IEnvelope[]>([])
  const [opened, modalHandler] = useDisclosure()
  const [openedDelete, modalDeleteHandler] = useDisclosure()
  const [actualId, setActualId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  const [branchOffices, setBranchOffices] = useState<FormSelectOption[]>([])
  const [toBranchOffices, setToBranchOffices] = useState<FormSelectOption[]>([])

  const form = useForm<IEnvelope>({
    initialValues: {
      fromBranchOfficeId: 0,
      toBranchOfficeId: 0,
      amount: '',
      date: null,
      description: ''
    },
    validate: {
      fromBranchOfficeId: value => value === 0 && 'Seleccione una sucursal',
      toBranchOfficeId: value => value === 0 && 'Seleccione una sucursal',
      amount: isNotEmpty('Ingrese un monto'),
      date: isNotEmpty('Ingrese una fecha'),
      description: isNotEmpty('Ingrese una descripción')
    }
  })

  useEffect(() => {
    getAllBranchOffices()
  }, [])

  const getAllBranchOffices = async () => {
    const response = await getAllBranchOfficesService(token)
    if (!response) return null

    const branchOfficesFormatted = response.map((branchOffice: IBranchModel) => ({
      value: branchOffice.id,
      label: branchOffice.name
    }))

    setToBranchOffices(branchOfficesFormatted)
  }

  const calculateAmount = () => {
    const totalAmount = envelopes.reduce((accumulator, currentValue) => {
      const amount =
        typeof currentValue.amount === 'string'
          ? parseInt(currentValue.amount)
          : currentValue.amount
      return accumulator + amount
    }, 0)
    setTotalAmount(() => totalAmount)
  }

  const onClose = () => {
    modalHandler.close()
    setIsEditing(false)
    form.reset()
  }

  const getNewEnvelope = () => {
    const newEnvelope = {
      fromBranchOfficeId: form.values.fromBranchOfficeId,
      toBranchOfficeId: form.values.toBranchOfficeId,
      fromBranchOffice: {
        name: branchOffices.find(
          branchOffice =>
            Number(branchOffice.value) === Number(form.values.fromBranchOfficeId)
        )?.label as string,
        address: '',
        regionalOfficeId: 0
      },
      toBranchOffice: {
        name: toBranchOffices.find(
          branchOffice =>
            Number(branchOffice.value) === Number(form.values.toBranchOfficeId)
        )?.label as string,
        address: '',
        regionalOfficeId: 0
      },
      amount: form.values.amount,
      date: form.values.date,
      description: form.values.description
    }
    return newEnvelope
  }

  const onSubmit = () => {
    modalHandler.close()
    const newEnvelope = getNewEnvelope()
    envelopes.push(newEnvelope)
    form.reset()
    calculateAmount()
  }

  const onSubmitEdit = () => {
    const newEnvelop = getNewEnvelope()
    envelopes[actualId] = newEnvelop
    modalHandler.close()
    setIsEditing(false)
    form.reset()
    calculateAmount()
  }

  const onClickEdit = (id: number) => {
    modalHandler.open()
    setIsEditing(true)
    setActualId(id)
    const selectedEnvelopes = envelopes[id]

    form.setFieldValue(
      'fromBranchOfficeId',
      selectedEnvelopes?.fromBranchOfficeId as number
    )
    form.setFieldValue(
      'toBranchOfficeId',
      selectedEnvelopes?.toBranchOfficeId as number
    )
    form.setFieldValue('amount', selectedEnvelopes?.amount as string)
    form.setFieldValue('date', selectedEnvelopes?.date as Date)
    form.setFieldValue('description', selectedEnvelopes?.description as string)
  }

  const onDelete = () => {
    envelopes.splice(actualId, 1)
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
    envelopes,
    setEnvelopes,
    actualId,
    form,
    onSubmit,
    onClickEdit,
    onClose,
    isEditing,
    onSubmitEdit,
    setActualId,
    onDelete,
    setBranchOffices,
    branchOffices,
    totalAmount,
    toBranchOffices
  }
}
