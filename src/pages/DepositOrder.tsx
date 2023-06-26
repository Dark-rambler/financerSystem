import { Button } from '@mantine/core'

import { useNavigate } from 'react-router-dom'
import { TbPlus } from 'react-icons/tb'
import { useEffect } from 'react'
import { useLoginStore } from '../components/store/loginStore'
import { useState } from 'react'

import DepositOrderTable from '../components/table/DepositOrderTable'

const DepositOrder = () => {
  const navigate = useNavigate()
  const { token } = useLoginStore()
  const [despositOrderData, setDepositOrderData] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}/deposit-order/deposit-orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(data => {
        setDepositOrderData(data)
      })
  }, [])

  return (
    <>

        <div className='w-full p-10 space-y-5 '>
          <div className=''>
            {/* <blueButton label={'Emitir nueva orden de depósito'} onClick={() => {() => window.my_modal_1.showModal()} } isLoading={false}/> */}
            <Button
              leftIcon={<TbPlus />}
              size='sm'
              variant='filled'
              color='blue'
              radius={'sm'}
              className='bg-blue-600 hover:bg-blue-700'
              // onClick={open}
              onClick={() => {
                navigate('/techobol/register-deposit-order')
              }}
            >
              Emitir nueva orden de depósito
            </Button>
          </div>
          <div className='max-h-full'>
            <DepositOrderTable depositOrderData={despositOrderData}/>
            {/* <Table data={despositOrderData} columns={cols} showNavigation/> */}
          </div>
        </div>
  
    </>
  )
}

export default DepositOrder
