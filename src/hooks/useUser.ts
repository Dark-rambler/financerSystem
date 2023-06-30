import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState, useRef } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'

import {
  createEmployee,
  deleteEmployee,
  getAllEmployeesWithRoles
} from '../services/EmployeeService'
import { getAllRegionals } from '../services/RegionalService'

import { useLoginStore } from '../components/store/loginStore'
import EmployeeInterface from '../models/Employee'
import { getAllRoles } from '../services/Roles'
import { Role } from '../models/Roles'
import { RegionalOfficeInterface } from '../models/RegionalOffice'
import { errorToast, succesToast } from '../services/toasts'

interface SelectFormat {
  label: string
  value: string
}

export const useUser = () => {
  const { token } = useLoginStore()
  const [opened, { open, close }] = useDisclosure()
  const [openedDelete, handlersDelete] = useDisclosure()
  const [users, setUsers] = useState<EmployeeInterface[]>([])
  const gridRef = useRef<AgGridReact<EmployeeInterface>>(null)
  const [actualUserId, setActualUserId] = useState<number>(0)

  const [regionals, setRegionals] = useState<SelectFormat[]>([])
  const [roles, setRoles] = useState<SelectFormat[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<EmployeeInterface>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      roleId: 0,
      regionalOfficeId: 0
    },
    validate: {
      name: isNotEmpty('Ingrese un nombre'),
      lastName: isNotEmpty('Ingrese un apellido'),
      email: isEmail('Ingrese un correo válido'),
      password: isNotEmpty('Ingrese una contraseña'),
      roleId: value => {
        if (value === 0) return 'Seleccione un rol'
      },
      regionalOfficeId: value => {
        if (value === 0) return 'Seleccione una regional'
      }
    }
  })

  const getEmployees = async () => {
    const data = await getAllEmployeesWithRoles(token)
    setUsers(data)
  }

  const getRoles = async () => {
    const data = await getAllRoles(token)

    if (!data) {
      errorToast('Error al cargar los roles')
      return null
    }
    const roles = data.map((role: Role) => ({
      value: role.id,
      label: role.name
    }))
    setRoles(roles)
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
    getEmployees()
    getRoles()
    getRegionals()
  }, [])

  const registerUser = async () => {
    setIsLoading(true)
    const body: EmployeeInterface = {
      name: form.values.name,
      lastName: form.values.lastName,
      email: form.values.email,
      password: form.values.password,
      roleId: form.values.roleId,
      regionalOfficeId: form.values.regionalOfficeId
    }
    const data = await createEmployee(token, body)

    if (!data) {
      errorToast('Error al crear el usuario')
      setIsLoading(false)
      return null
    }
    setUsers([...users, data])
    close()
    form.reset()
    succesToast('Usuario creado correctamente')
    setIsLoading(false)
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

  const onDeleteUser = async () => {
    setIsLoading(true)
    const data = await deleteEmployee(token, actualUserId)
    console.log(data)
    if (!data) {
      errorToast('Error al eliminar el usuario')
      setIsLoading(false)
      return null
    }
    setUsers(users.filter(user => user.id !== actualUserId))
    handlersDelete.close()
    setIsLoading(false)
    succesToast('Usuario eliminado correctamente')

  }

  return {
    opened,
    open,
    close,
    users,
    gridRef,
    onFilterTextBoxChanged,
    form,
    regionals,
    roles,
    registerUser,
    openedDelete,
    handlersDelete,
    actualUserId,
    setActualUserId,
    onDeleteUser,
    isLoading
  }
}
