import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'

import socket from "../services/SocketIOConnection"

import { useLoginStore } from '../components/store/loginStore'
import { DepositOrderInterface } from '../models/DepositOrder'
import { getAllDepositOrders } from '../services/DepositOrder'
import { errorToast } from '../services/toasts'

const useDepositOrder = () => {
    const navigate = useNavigate()
    const { token, role } = useLoginStore()
    const [depositOrderData, setDepositOrderData] = useState<
      DepositOrderInterface[]
    >([])
    const depositOrderDataRef = useRef<DepositOrderInterface[]>([])
  
    const gridRef = useRef<AgGridReact<DepositOrderInterface>>(null)
  
    const getDepositOrders = async () => {
      const data = await getAllDepositOrders(token)
      if (!data) {
        errorToast('No se pudo obtener la información de las ordenes de deposito')
        return
      }
      setDepositOrderData(() => data)
      depositOrderDataRef.current = data
    }
  
    useEffect(() => {
      getDepositOrders()
    }, [])
  
    useEffect(() => { 
      socket.on('newDepositOrder', (data: DepositOrderInterface) => { 
        const newData = [...depositOrderDataRef.current, data]

        setDepositOrderData(() => [...newData])
        depositOrderDataRef.current = [...newData]
      })
      socket.on('updatedDepositOrder', (data: DepositOrderInterface) => { 
        const newData = depositOrderDataRef.current.map((depositOrder) => { 
          if (depositOrder.id === data.id) { 
            return data
          }
          return depositOrder
        })
        setDepositOrderData(() => [...newData])
        depositOrderDataRef.current = [...newData]
      })

  
      return () => { 
        socket.off('newDepositOrder')
        socket.off('updatedDepositOrder')
      }
  
    }, [])
  
    const onFilterTextBoxChanged = useCallback(() => {
      let value = ''
      const input = document.getElementById(
        'filter-text-box'
      ) as HTMLInputElement | null
  
      if (input !== null) {
        value = input.value
      }
      gridRef.current?.api.setQuickFilter(value)
    }, [])

    return { 
        navigate,
        token,
        role,
        depositOrderData,

        gridRef,
        onFilterTextBoxChanged,
        depositOrderDataRef
    }
}

export default useDepositOrder