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
  const [moneyCollectionOpenedEdit, moneyCollectionOpenedEditHandler] = useDisclosure()
  const [moneyCollectionOpenedDelete, moneyCollectionOpenedDeleteHandler] = useDisclosure()
  const [moneyCollections, setMoneyCollections] = useState<IMoneyCollection[]>(
    []
  )

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

  const getAllBranchOffices = async () => {
    const response = await getAllBranchOfficesService(token)
    if (!response) {
      return null
    }

    const branchOfficesFiltered = response
      .filter((branchOffice: IBranchModel) => {
        if (branchOffice.regionalOffice?.id == depositOrder.regional?.id) {
          return true
        }
      })
      .map((branchOffice: IBranchModel) => {
        return { value: branchOffice.id, label: branchOffice.name }
      })

    setBranchOffices(branchOfficesFiltered)
  }

  useEffect(() => {
    getAllBranchOffices()
  }, [])

  const onClose = () => {
    moneyCollectionOpenedHandler.close()
    form.reset()
  }


  const onSubmit = () => {
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
        email: '',
        password: '',
        roleId: 0,
        regionalOfficeId: depositOrder.regional?.id as number
      }
    }
    moneyCollectionOpenedHandler.close()
    setMoneyCollections([...moneyCollections, newMoneyCollection])
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
    onClose
  }
}
