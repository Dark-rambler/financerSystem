import { useState, useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useForm, isNotEmpty, } from '@mantine/form'

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
        administrator: isNotEmpty('Seleccione una región válida'),
        orderNumber: isNotEmpty('Ingrese el número de orden'),
        orderDate: isNotEmpty('Seleccione la fecha de la orden'),
        orderRange: (value) => { 
            if (value[0] === null || value[1] === null) {
                return 'Seleccione el rango de fechas del depósito'
            }
        },
        amount: isNotEmpty('Ingrese el monto del depósito'),
        limitedDate: isNotEmpty('Seleccione la fecha limite del depósito')
    }
  })
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([])
  const [isDocumentGenerated, setIsDocumentGenerated] = useState(false)
  const [data, setData] = useState<SelectManineData[]>([])
  const [pdfDoc, setPdfDoc] = useState< string | undefined>(undefined)

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

  const onSelectRegional = async (regionalSelected: string) => {
    const employee = await employeesData.find(
      employee =>
        employee.regionalOffice.name === regionalSelected &&
        employee.role.name.includes(
          `Administrador de operaciones de ventas ${regionalSelected}`
        )
    )
  
    if (!employee) form.setFieldValue('administrator', '')
    else form.setFieldValue('administrator', `${employee.name} ${employee.lastName}`)
  }

  useEffect(() => {
    fetchRegionalData()
    fetchEmployeesWithRoles()
  }, [])

  return {
    data,
    onSelectRegional,
    form,
    employeesData,
    isDocumentGenerated,
    setIsDocumentGenerated,
    pdfDoc,
    setPdfDoc
  }
}
