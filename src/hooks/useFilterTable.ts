import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useLoginStore } from '../components/store/loginStore'

import { getAllEmployeesWithRoles } from '../services/EmployeeService'
import { getAllRegionals } from '../services/RegionalService'
import { errorToast } from '../services/toasts'

import EmployeeInterface from '../models/Employee'
import { RegionalOfficeInterface } from '../models/RegionalOffice'
import { RiCreativeCommonsSaLine } from 'react-icons/ri'
import { DepositOrderInterface } from '../models/DepositOrder'

interface SelecteI {
  value: string
  label: string
}

export const useFilterTable = (data: DepositOrderInterface[]) => {
  const [regionals, setRegionals] = useState<RegionalOfficeInterface[]>([])
  const [employees, setEmployees] = useState<EmployeeInterface[]>([])

  const [regionalsSelect, setRegionalsSelect] = useState<SelecteI[]>([])
  const [employeesSelect, setEmployeesSelect] = useState<SelecteI[]>([])

  const [statusSelect, setStatusSelect] = useState<SelecteI[]>([
    { value: 'Emitido', label: 'Emitido' },
    { value: 'Entregado', label: 'Entregado' },
    { value: 'Cancelado', label: 'Cancelado' }
  ])

  const [revitionSelect, setRevitionSelect] = useState<SelecteI[]>([
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'Aprobado', label: 'Aprobado' },
    { value: 'Observado', label: 'Observado' }
  ])

  const { token } = useLoginStore()

  interface FormValues {
    regional: string
    minAmount: string
    maxAmount: string
  }

  const form = useForm<FormValues>({
    initialValues: {
      regional: '',
      minAmount: '',
      maxAmount: ''
    }
  })

  const getEmployees = async () => {
    const data = await getAllEmployeesWithRoles(token)

    if (!data) {
      errorToast('Error al cargar los datos')
      return
    }

    const formatedData = data.map((employee: EmployeeInterface) => ({
      label: `${employee.name} ${employee.lastName}`,
      value: `${employee.name} ${employee.lastName}`
    }))

    setEmployees(data)
    setEmployeesSelect(formatedData)
  }

  const getRegionals = async () => {
    const data = await getAllRegionals(token)

    if (!data) {
      errorToast('Error al cargar los datos')
      return
    }

    const formatedData = data.map((regional: RegionalOfficeInterface) => ({
      label: `${regional.name}`,
      value: `${regional.name}`
    }))

    setRegionals(data)
    setRegionalsSelect(formatedData)
  }

  const onClickFilter = () => {
    console.log(data)
  }

  useEffect(() => {
    getEmployees()
    getRegionals()
  }, [])

  return {
    form,
    regionals,
    employees,
    regionalsSelect,
    employeesSelect,
    statusSelect,
    revitionSelect,
    onClickFilter
  }
}
