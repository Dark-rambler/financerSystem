import { useState, useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useForm, isNotEmpty } from '@mantine/form'
import { succesToast, errorToast } from '../services/toasts'

import { useNavigate } from 'react-router-dom'
import { useAmazonS3 } from './useAmazonS3'

import { getAllEmployeesWithRoles } from '../services/Employee'
import { getAllRegionals } from '../services/Regional'
import { getAllBranchOffices } from '../services/BranchOffices'
import { IBranchModel } from '../models/BranchOffice'
import { RegionalOfficeInterface } from '../models/RegionalOffice'
import { EmployeeInterface } from '../models/Employee'
import { useDisclosure } from '@mantine/hooks'

import { createDepositOrder } from '../services/DepositOrder'
import socket from '../services/SocketIOConnection'

interface SelectMantineData {
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

interface branchOfficesAndAmount {
  branchOffice: SelectMantineData
  amount: number
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
  const [branchOfficeEntireData, setBranchOfficeEntireData] = useState<
    IBranchModel[]
  >([])
  const [employeesData, setEmployeesData] = useState<EmployeeInterface[]>([])
  const [regionalData, setRegionalData] = useState<RegionalOfficeInterface[]>(
    []
  )
  const [data, setData] = useState<SelectMantineData[]>([])
  const [branchOfficeData, setBranchOfficeData] = useState<SelectMantineData[]>(
    []
  )
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined)
  const [regionalId, setRegionalId] = useState<number | undefined>(undefined)
  const [administratorId, setAdministratorId] = useState<number | undefined>(
    undefined
  )

  const [branchOfficesAndAmounts, setBranchOfficesAndAmounts] = useState<
    branchOfficesAndAmount[]
  >([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [isBranchOfficeAndAmountsEditing, setIsBranchOfficeAndAmountsEditing] =
    useState<boolean>(false)

  const [amount, setAmount] = useState<number | ''>('')
  const [branchOffice, setBranchOffice] = useState<string | null>(null)
  const [
    actualBranchOfficeAndAmountIndex,
    setActualBranchOfficeAndAmountIndex
  ] = useState<number | null>(null)

  const [opened, { open, close }] = useDisclosure()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isBranchOfficeRepeated, setIsBranchOfficeRepeated] =
    useState<boolean>(false)

  const { token } = useLoginStore()
  const navigate = useNavigate()
  const s3 = useAmazonS3()

  const fetchRegionalData = async () => {
    const data = await getAllRegionals(token)

    if (!data) {
      errorToast('Error al cargar los datos')
      return
    }

    const mantineSelectData = data.map((regional: RegionalOfficeInterface) => ({
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

  const fetchBranchOfficeData = async () => {
    const response = await getAllBranchOffices(token)

    if (!response) {
      errorToast('Error al cargar los datos')
      return
    }
    setBranchOfficeEntireData(response)
    const branchOfficesFormated = response.map((element: IBranchModel) => {
      return {
        value: element.id,
        label: element.name
      }
    })
    setBranchOfficeData(branchOfficesFormated)
  }

  const onSelectRegional = async (regionalSelected: string) => {
    const regionalSelectedData = regionalData.filter(regional => {
      return regional.name === regionalSelected
    })

    if (regionalSelected !== '' && regionalSelectedData[0].id !== regionalId) {
      const regional = regionalData.find(regional => {
        return regional.name === regionalSelected
      })
      form.setFieldValue(
        'orderNumber',
        `ODT${regional?.regionalAbbr} - ${regional?.techobolDepositOrderCounter}`
      )
      const employee = employeesData.find(
        employee =>
          employee.regionalOffice?.name === regionalSelected &&
          employee.role?.name.includes(
            `Administrador de operaciones de ventas ${regionalSelected}`
          )
      )

      if (!employee) {
        form.setFieldValue('administrator', '')
      } else {
        setRegionalId(employee.regionalOffice?.id)
        setAdministratorId(employee.id)
        form.setFieldValue(
          'administrator',
          `${employee.name} ${employee.lastName}`
        )
      }

      setBranchOffice(null)
      const filteredBranchOffices = branchOfficeEntireData.filter(
        branchOffice => {
          return branchOffice.regionalOffice?.name === regionalSelected
        }
      )

      const branchOffices = filteredBranchOffices.map(branchOffice => {
        return {
          value: branchOffice.id?.toString() as string,
          label: branchOffice.name
        }
      })
      setBranchOfficeData(branchOffices)
      setBranchOfficesAndAmounts(() => [])
    }
  }

  useEffect(() => {
    calculateTotalAmount()
  }, [branchOfficesAndAmounts])

  const calculateTotalAmount = () => {
    const totalAmount = branchOfficesAndAmounts.reduce(
      (accumulator, currentValue) => {
        const amountBs =
          typeof currentValue.amount === 'string'
            ? parseInt(currentValue.amount)
            : currentValue.amount
        return accumulator + amountBs
      },
      0
    )
    form.setFieldValue('amount', totalAmount.toString())
    setTotalAmount(() => totalAmount)
  }

  const onEditBranchOfficesAndAmounts = (index: number) => {
    setIsBranchOfficeRepeated(() => false)
    setIsBranchOfficeAndAmountsEditing(() => true)
    const actualSucursalAndAmount = branchOfficesAndAmounts[index]
    setAmount(actualSucursalAndAmount.amount)
    setBranchOffice(actualSucursalAndAmount.branchOffice.value)
    setActualBranchOfficeAndAmountIndex(() => index)
  }

  const onSaveEditBranchOfficesAndAmounts = () => {
    const branchEdited =
      branchOfficesAndAmounts[actualBranchOfficeAndAmountIndex as number]
    const branchFound = branchOfficesAndAmounts.find(
      element =>
        element.branchOffice.value === branchOffice &&
        element.branchOffice.value !== branchEdited.branchOffice.value
    )

    if (branchFound) {
      setIsBranchOfficeRepeated(() => true)
      return
    }

    const branchOfficeInfo = branchOfficeEntireData.find(
      element => element.id === Number(branchOffice)
    )
    const newBranchOfficesAndAmounts = branchOfficesAndAmounts.map(
      (element, index) => {
        if (index === actualBranchOfficeAndAmountIndex) {
          return {
            branchOffice: {
              value: branchOffice as string,
              label: branchOfficeInfo?.name as string
            },
            amount: amount as number
          }
        }
        return element
      }
    )
    setBranchOfficesAndAmounts(() => newBranchOfficesAndAmounts)
    setAmount('')
    setBranchOffice(null)
    setActualBranchOfficeAndAmountIndex(null)
    setIsBranchOfficeAndAmountsEditing(() => false)
    calculateTotalAmount()
  }

  const onAddBranchOfficesAndAmounts = () => {
    const branchFound = branchOfficesAndAmounts.find(
      element => element.branchOffice.value === branchOffice
    )

    if (branchFound) {
      setIsBranchOfficeRepeated(() => true)
      return
    }

    const branchOfficeInfo = branchOfficeEntireData.find(
      element => element.id === Number(branchOffice)
    )
    const newBranchOfficesAndAmounts = {
      branchOffice: {
        value: branchOffice as string,
        label: branchOfficeInfo?.name as string
      },
      amount: amount as number
    }
    setBranchOfficesAndAmounts(branchOfficesAndAmounts => [
      ...branchOfficesAndAmounts,
      newBranchOfficesAndAmounts
    ])
    setAmount('')
    setBranchOffice(null)
    setActualBranchOfficeAndAmountIndex(null)
    calculateTotalAmount()
  }

  const onRemoveBranchOfficesAndAmounts = (index: number) => {
    const newBranchOfficesAndAmounts = branchOfficesAndAmounts.filter(
      element => {
        return branchOfficesAndAmounts.indexOf(element) !== index
      }
    )
    setBranchOfficesAndAmounts(() => newBranchOfficesAndAmounts)
    calculateTotalAmount()

    const branchFound = newBranchOfficesAndAmounts.find(
      element => element.branchOffice.value === branchOffice
    )

    if (!branchFound) {
      setIsBranchOfficeRepeated(() => false)
    }
  }

  const onCreateDepositOrder = async () => {
    setIsLoading(() => true)
    const depositOrderBody = {
      orderNumber: form.values.orderNumber,
      startDate: form.values.orderRange[0] as Date,
      endDate: form.values.orderRange[1] as Date,
      solitudeDate: form.values.orderDate as Date,
      amount: Number(form.values.amount),
      deliveryDate: form.values.limitedDate as Date,
      regionalId: regionalId,
      employeeId: administratorId,
      documentUrl: `${
        import.meta.env.VITE_PUBLIC_ACCESS_DOMAIN
      }/TECHOBOL/DEPOSIT_ORDER/${form.values.orderNumber}.pdf`
    }

    const deposiOrderBranchOfficeBody = branchOfficesAndAmounts.map(
      element => ({
        branchOfficeId: element.branchOffice.value,
        amount: element.amount
      })
    )

    s3.uploadDepositOrderFileOfTechoBol(
      pdfFile as File,
      form.values.orderNumber
    )

    const response = await createDepositOrder(
      depositOrderBody,
      deposiOrderBranchOfficeBody,
      token
    )

    if (!response) {
      errorToast('Error al crear la orden de depósito')
      setIsLoading(() => false)
      return
    }

    socket.emit('createDepositOrder', response)
    succesToast('Orden de depósito enviada con éxito')
    navigate('/deposit-order')
    setIsLoading(() => false)
  }

  useEffect(() => {
    fetchRegionalData()
    fetchEmployeesWithRoles()
    fetchBranchOfficeData()
  }, [])

  return {
    data,
    onSelectRegional,
    form,
    employeesData,
    onCreateDepositOrder,
    pdfFile,
    setPdfFile,
    branchOfficeData,
    setBranchOfficeData,
    branchOfficesAndAmounts,
    setBranchOfficesAndAmounts,
    onEditBranchOfficesAndAmounts,
    onAddBranchOfficesAndAmounts,
    onRemoveBranchOfficesAndAmounts,
    isBranchOfficeAndAmountsEditing,
    setIsBranchOfficeAndAmountsEditing,
    totalAmount,
    setTotalAmount,
    amount,
    setAmount,
    branchOffice,
    setBranchOffice,
    onSaveEditBranchOfficesAndAmounts,
    opened,
    close,
    open,
    isLoading,
    setIsLoading,
    isBranchOfficeRepeated,
    setIsBranchOfficeRepeated
  }
}
