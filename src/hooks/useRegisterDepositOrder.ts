import { useState, useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useForm, isNotEmpty } from '@mantine/form'

interface RegionalData {
  id: number
  name: string
}

interface RegionalOffice {
  name: string
}

interface Role {
  name: string
}
interface EmployeeData {
  name: string
  lastName: string
  regionalOffice: RegionalOffice
  role: Role
}

interface SelectManineData {
  value: string
  label: string
}

export const useRegisterDepositOrder = () => {
  const form = useForm({
    initialValues: {
      regional: '',
      administrator: '',
      orderNumber: '',
      orderDate: null,
      orderRange: [null, null],
      amount: '',
      limitedDate: null
    },
    validate: {
        regional: isNotEmpty('Seleccione una región'),
        administrator: isNotEmpty('Seleccione una región para ver el administrador'),
        orderNumber: isNotEmpty('Ingrese el número de orden'),
        orderDate: isNotEmpty('Seleccione la fecha de la orden'),
        orderRange: isNotEmpty('Seleccione el periodo del deposito'),
        amount: isNotEmpty('Ingrese el monto del deposito'),
        limitedDate: isNotEmpty('Seleccione la fecha limite del deposito')
    }
  })
  // const [regionalData, setRegionalData] = useState<RegionalData[]>([])
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([])

  const [data, setData] = useState<SelectManineData[]>([])

  // const [regional, setRegional] = useState<string | null>(null)
  // const [administrator, setAdministrator] = useState<string>('')
  // const [orderNumber, setOrderNumber] = useState<string>('')
  // const [orderDate, setOrderDate] = useState<Date | null>(null)
  // const [orderRange, setOrderRange] = useState<[Date | null, Date | null]>([
  //   null,
  //   null
  // ])
  // const [amount, setAmount] = useState<number | ''>('')
  // const [limitedDate, setLimitedDate] = useState<Date | null>(null)

  const { token } = useLoginStore()

  const fetchRegionalData = async () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}/regional/regionals`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        (data)
        const mantineSelectData = data.map((regional: RegionalData) => ({
          value: regional.name,
          label: regional.name
        }))
        setData(mantineSelectData)
      })
  }

  const fetchEmployeesWithRoles = async () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}/employee/employees`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setEmployeesData(data)
      })
  }

  const onSelectRegional = (regionalSelected: string) => {
    const employee = employeesData.find(
      employee =>
        employee.regionalOffice.name === regionalSelected &&
        employee.role.name.includes(
          `Administrador de operaciones de ventas ${regionalSelected}`
        )
    )
  
    if (!employee) form.setValues({ administrator: '' })
    else form.setValues({ administrator: `${employee?.name} ${employee?.lastName}` })
  }

  useEffect(() => {
    fetchRegionalData()
    fetchEmployeesWithRoles()
  }, [])

  return {
    // regionalData,
    // setRegionalData,
    data,
    // regional,
    // setRegional,
    // administrator,
    // setAdministrator,
    // orderNumber,
    // setOrderNumber,
    // orderDate,
    // setOrderDate,
    // orderRange,
    // setOrderRange,
    // amount,
    // setAmount,
    // limitedDate,
    // setLimitedDate,
    onSelectRegional,
    form
  }
}
