import { useState, useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'

interface RegionalData {
  id: number
  name: string
}

interface SelectManineData {
  value: string
  label: string
}

export const useRegisterDepositOrder = () => {
  const [regionalData, setRegionalData] = useState<RegionalData[]>([])

  const [data, setData] = useState<SelectManineData[]>([])

  const [regional, setRegional] = useState<string | null>(null)
  const [administrator, setAdministrator] = useState<string>('')
  const [orderNumber, setOrderNumber] = useState<string>('')
  const [orderDate, setOrderDate] = useState<Date | null>(null)
  const [orderRange, setOrderRange] = useState<[Date | null, Date | null]>([
    null,
    null
  ])
  const [amount, setAmount] = useState<number | ''>('')
  const [payedAmount, setPayedAmount] = useState<number | ''>(0)
  const [payedDate, setPayedDate] = useState<Date | null>(null)
  const [limitedDate, setLimitedDate] = useState<Date | null>(null)

  const { token } = useLoginStore()

  const fetchRegionalData = async () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}/regional-deposit/regionals`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setRegionalData(data)
        const mantineSelectData = data.map((regional: RegionalData) => ({
          value: regional.name,
          label: regional.name
        }))
        setData(mantineSelectData)
      })
  }

  const fetchEmployeesWithRoles = async () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}/employee/employees-roles`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
            console.log(data)
          setRegionalData(data)
          const mantineSelectData = data.map((regional: RegionalData) => ({
            value: regional.name,
            label: regional.name
          }))

        })
  }

  useEffect(() => {
    fetchRegionalData()
    fetchEmployeesWithRoles()
  }, [])

  return {
    regionalData,
    setRegionalData,
    data,
    regional,
    setRegional,
    administrator,
    setAdministrator,
    orderNumber,
    setOrderNumber,
    orderDate,
    setOrderDate,
    orderRange,
    setOrderRange,
    amount,
    setAmount,
    payedAmount,
    setPayedAmount,
    payedDate,
    setPayedDate,
    limitedDate,
    setLimitedDate
  }
}
