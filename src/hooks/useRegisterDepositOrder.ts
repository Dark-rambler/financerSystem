import { useState, useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useForm, isNotEmpty } from '@mantine/form'
import { succesToast, errorToast } from '../services/toasts'

import { useNavigate } from 'react-router-dom'
import { useAmazonS3 } from './useAmazonS3'

import { getAllEmployeesWithRoles } from '../services/EmployeeService'
import { getAllRegionals } from '../services/RegionalService'

interface RegionalOffice {
  id: number
  name: string
  techobolDepositOrderCounter: number
  megadisDepositOrderCounter: number
  regionalAbbr: string
}

interface Role {
  id: number
  name: string
}
interface EmployeeData {
  id: number
  name: string
  lastName: string
  regionalOffice: RegionalOffice
  role: Role
}

interface SelectManineData {
  value: string
  label: string
}

interface useFormInterface {
  regional: string
  administrator: string
  orderNumber: string
  orderDate: Date | null
  orderRange: [Date | null, Date | null]
  amount: string
  limitedDate: Date | null
}

export const useRegisterDepositOrder = () => {
  const form = useForm<useFormInterface>({
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
      orderRange: value => {
        if (value[0] === null || value[1] === null) {
          return 'Seleccione el rango de fechas del depósito'
        }
      },
      amount: isNotEmpty('Ingrese el monto del depósito'),
      limitedDate: isNotEmpty('Seleccione la fecha limite del depósito')
    }
  })
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([])
  const [regionalData, setRegionalData] = useState<RegionalOffice[]>([])
  const [isDocumentGenerated, setIsDocumentGenerated] = useState(false)
  const [data, setData] = useState<SelectManineData[]>([])
  const [pdfDoc, setPdfDoc] = useState<string | undefined>(undefined)
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined)

  const [regionalId, setRegionalId] = useState<number | undefined>(undefined)
  const [administratorId, setAdministratorId] = useState<number | undefined>(
    undefined
  )

  const { token } = useLoginStore()
  const navigate = useNavigate()
  const s3 = useAmazonS3()

  const fetchRegionalData = async () => {
    const data = await getAllRegionals(token)

    if (!data) {
      errorToast('Error al cargar los datos')
      return
    }

    const mantineSelectData = data.map((regional: RegionalOffice) => ({
      value: regional.name,
      label: regional.name
    }))
    setData(mantineSelectData)
    setRegionalData(data)
  }

  const fetchEmployeesWithRoles = async () => {
    const data = await getAllEmployeesWithRoles(token)

    if (!data) {
      errorToast('Error al cargar los datos')
      return
    }
    setEmployeesData(data)
  }

  const onSelectRegional = async (regionalSelected: string) => {
    if (regionalSelected !== '') {
      const regional = regionalData.find(regional => {
        return regional.name === regionalSelected
      })
      form.setFieldValue(
        'orderNumber',
        `ODT${regional?.regionalAbbr} - ${regional?.techobolDepositOrderCounter}`
      )
      const employee = employeesData.find(
        employee =>
          employee.regionalOffice.name === regionalSelected &&
          employee.role.name.includes(
            `Administrador de operaciones de ventas ${regionalSelected}`
          )
      )

      if (!employee) {
        form.setFieldValue('administrator', '')
      } else {
        setRegionalId(employee.regionalOffice.id)
        setAdministratorId(employee.id)
        form.setFieldValue(
          'administrator',
          `${employee.name} ${employee.lastName}`
        )
      }
    }
  }

  const onCreateDepositOrder = async () => {
    try {
      s3.uploadDepositOrderFileOfTechoBol(
        pdfFile as File,
        form.values.orderNumber
      )
      fetch(
        `${import.meta.env.VITE_API_DOMAIN}/deposit-order/create-deposit-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({
            orderNumber: form.values.orderNumber,
            startDate: form.values.orderRange[0],
            endDate: form.values.orderRange[1],
            solitudeDate: form.values.orderDate,
            amount: form.values.amount,
            deliveryDate: form.values.limitedDate,
            regionalId: regionalId,
            employeeId: administratorId,
            documentUrl: `${
              import.meta.env.VITE_PUBLIC_ACCESS_DOMAIN
            }/TECHOBOL/DEPOSIT_ORDER/${form.values.orderNumber}.pdf`
          })
        }
      )
        .then(res => {
          return res.json()
        })
        .then(() => {
          succesToast('Orden de depósito enviada con éxito')
          navigate('/deposit-order')
        })
        .catch(() => {
          errorToast('Error al crear la orden de depósito')
        })
    } catch (err) {
      console.log(err)
    }
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
    setPdfDoc,
    onCreateDepositOrder,
    pdfFile,
    setPdfFile
  }
}
