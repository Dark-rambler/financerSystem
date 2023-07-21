import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { Tabs, ActionIcon } from '@mantine/core'

import { TbChevronLeft } from 'react-icons/tb'
import { useEffect } from 'react'

const DepositOrderDetailLayout = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/techobol/deposit-order-detail/:id/deposit-order')
  }, [])

  return (
    <>
      <div className='p-10'>
        <div className='max-w-[440px] flex items-center space-x-5'>
          <ActionIcon
            className=' bg-gray-100 hover:bg-gray-200'
            size={'md'}
            onClick={e => {
              e.preventDefault()
              navigate('/techobol/deposit-order')
            }}
          >
            <TbChevronLeft />
          </ActionIcon>
          <Tabs defaultValue='depositOrder'>
            <Tabs.List>
              <Tabs.Tab
                value='depositOrder'
                onClick={() =>
                  navigate('/techobol/deposit-order-detail/:id/deposit-order')
                }
              >
                Orden de deposito
              </Tabs.Tab>
              <Tabs.Tab
                value='depositOrderReport'
                onClick={() =>
                  navigate(
                    '/techobol/deposit-order-detail/:id/deposit-order-report'
                  )
                }
              >
                Reporte de orden de deposito
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default DepositOrderDetailLayout
