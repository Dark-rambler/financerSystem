import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState, useRef } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'

import { getAllRegionals } from '../services/Regional'

import { useLoginStore } from '../components/store/loginStore'
import { IBranchModel } from '../models/BranchOffice'

import { RegionalOfficeInterface } from '../models/RegionalOffice'
import { errorToast, succesToast } from '../services/toasts'

import socket from '../services/SocketIOConnection'
import {
  createBranchOffice,
  deleteBranchOffice,
  getAllBranchOffices
} from '../services/BranchOffices'

interface SelectFormat {
  label: string
  value: string
}

export const useBranchOffice = () => {
  const { token } = useLoginStore()
  const [opened, { open, close }] = useDisclosure()
  const [openedDelete, handlersDelete] = useDisclosure()

  const [branchOffices, setBranchOffices] = useState<IBranchModel[]>([])
  const gridRef = useRef<AgGridReact<IBranchModel>>(null)

  const [actualBranchOfficeId, setActualBranchOfficeId] = useState<number>(0)

  const [regionals, setRegionals] = useState<SelectFormat[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<IBranchModel>({
    initialValues: {
      name: '',
      address: '',
      regionalOfficeId: 0
    },
    validate: {
      name: value => {
        const name = value.trim().toLowerCase()
        const isRepeated = branchOffices.some((branchOffice) => branchOffice.name.toLowerCase().replace(/\s+/g,'') === name.replace(/\s+/g,''));
        
        if (name === '') return 'Ingrese un nombre'
        if (isRepeated) return 'Ya existe una sucursal con este nombre'
      },
      address: isNotEmpty('Ingrese una dirección'),

      regionalOfficeId: value => {
        if (value === 0) return 'Seleccione una regional'
      }
    }
  })

  const getBranchOffices = async () => {
    const data = await getAllBranchOffices(token)
    setBranchOffices(data)
  }

  const getRegionals = async () => {
    const data = await getAllRegionals(token)
    if (!data) {
      errorToast('Error al cargar las regionales')
      return null
    }

    const regionals = data.map((regionals: RegionalOfficeInterface) => ({
      value: regionals.id,
      label: regionals.name
    }))
    setRegionals(regionals)
  }

  useEffect(() => {
    getBranchOffices()
    getRegionals()
  }, [])

  useEffect(() => {
    socket.on('newBranchOffice', (data: IBranchModel) => {
      setBranchOffices(branchOffices => [...branchOffices, data])
    })

    socket.on('deletedBranchOffice', (data: IBranchModel) => {
      setBranchOffices(branchOffice =>
        branchOffice.filter(branchOffice => branchOffice.id !== data.id)
      )
    })

    return () => {
      socket.off('newBranchOffice')
      socket.off('deletedBranchOffice')
    }
  }, [])

  const registerBranchOffice = async () => {
    setIsLoading(true)
    const body: IBranchModel = {
      name: form.values.name,
      address: form.values.address,
      regionalOfficeId: form.values.regionalOfficeId
    }
    const data = await createBranchOffice(token, body)

    if (!data) {
      errorToast('Error al crear sucursal')
      setIsLoading(false)
      return null
    }
    setBranchOffices([...branchOffices, data])
    close()
    form.reset()
    succesToast('Sucursal creada correctamente')
    setIsLoading(false)

    socket.emit('createBranchOffice', data)
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
    const data = await deleteBranchOffice(token, actualBranchOfficeId)
    if (!data) {
      errorToast('Error al eliminar sucursal')
      setIsLoading(false)
      return null
    }
    setBranchOffices(
      branchOffices.filter(
        branchOffice => branchOffice.id !== actualBranchOfficeId
      )
    )
    handlersDelete.close()
    setIsLoading(false)
    succesToast('Sucursal eliminada correctamente')
    socket.emit('deleteBranchOffice', data)
  }

  return {
    opened,
    open,
    close,
    branchOffices,
    gridRef,
    onFilterTextBoxChanged,
    form,
    regionals,

    registerBranchOffice,
    openedDelete,
    handlersDelete,
    actualBranchOfficeId,
    setActualBranchOfficeId,
    onDeleteBranchOffice,
    isLoading,
    //isRepeatedError
  }
}
