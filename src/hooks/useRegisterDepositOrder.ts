import { useState, useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useForm, isNotEmpty } from '@mantine/form'
import { succesToast } from '../services/toasts'
import { useNavigate } from 'react-router-dom'



interface RegionalData {
  id: number
  name: string
}

interface RegionalOffice {
  id: number
  name: string
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
        data
        const mantineSelectData = data.map((regional: RegionalData) => ({
          value: regional.name,
          label: regional.name
        }))
        setData(mantineSelectData)
      })
      .catch(err => console.log(err))
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

  const onCreateDepositOrder = async () => {
    const formData = new FormData() 
    formData.append('pdfFile', pdfFile as File); // Adjunta el archivo PDF al formulario

    // formData.append('pdfDoc', pdfDoc as string); // Adjunta el archivo PDF al formulario

    // const jsonData = {
    //   orderNumber: form.values.orderNumber,
    //   orderRange: form.values.orderRange,
    //   orderDate: form.values.orderDate,
    //   amount: form.values.amount,
    //   limitedDate: form.values.limitedDate,
    //   regional: regionalId,
    //   administrator: administratorId
    // }
      
    // const blob = new Blob([jsonData as BlobPart], {
    //   type: 'application/json'
    // });

    // formData.append('jsonData', blob) 
  


    formData.append('orderNumber', form.values.orderNumber);
    formData.append('orderRange', form.values.orderRange.toString());
    formData.append('orderDate', form.values.orderDate?.toISOString() as string);
    formData.append('amount', form.values.amount);
    formData.append('limitedDate', form.values.limitedDate?.toString() as string);
    formData.append('regional', regionalId?.toString() as string);
    formData.append('administrator', administratorId?.toString() as string);


    
    try {
      fetch(
        `${import.meta.env.VITE_API_DOMAIN}/deposit-order/create-deposit-order`,
        {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            // "Content-Type": "multipart/form-data",
            'x-access-token': token
          },
          // body: JSON.stringify({
          //   orderNumber: form.values.orderNumber,
          //   orderRange: form.values.orderRange,
          //   orderDate: form.values.orderDate,
          //   amount: form.values.amount,
          //   limitedDate: form.values.limitedDate,
          //   regional: regionalId,
          //   administrator: administratorId,
          //   pdfDoc: pdfDoc,
          //   pdfFile: pdfFile
          // }),
          body: formData
        }
      )
        .then(res => {
          return res.json()
        })
        .then(data => {
          succesToast('Orden de depósito enviada con éxito')
          navigate('/deposit-order')
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
