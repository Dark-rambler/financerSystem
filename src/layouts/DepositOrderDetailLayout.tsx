import { useEffect, useState  } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { Tabs } from '@mantine/core'

import ReturnButton from '../components/buttons/depositOrder/ReturnButton'
import { errorToast } from '../services/toasts'

import { getOneDepositOrder } from '../services/DepositOrder'
import { getAllDepositOrderBranchOfficeGivenAnId } from '../services/DepositOrderBranchOffice'

import { useDepositOrderStore } from '../components/store/depositOrderStore'
import { useLoginStore } from '../components/store/loginStore'

import Status from '../enums/Status'

const DepositOrderDetailLayout = () => {
  const { depositOrder, setDepositOrder, setDepositBranchOffice } =
    useDepositOrderStore()
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useLoginStore() 

  const getBranchOfficesAndAmounts = async () => {
    const response = await getAllDepositOrderBranchOfficeGivenAnId(
      Number(id),
      token
    )
    setDepositBranchOffice(response)
  }

  const getDepositOrder = async () => {
    const response = await getOneDepositOrder(Number(id), token)

    if (!response) {
      errorToast('Error al cargar los datos')
      return
    }
    setDepositOrder(response)
  }

  useEffect(() => {
    getDepositOrder()
    getBranchOfficesAndAmounts()
    navigate(`/techobol/deposit-order-detail/${id}/deposit-order`);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      navigate('/techobol/deposit-order');
    });
  }, []);

  return (
    <>
      <div className='px-16 py-12'>
        <div className='max-w-[440px] flex items-center space-x-5'>
          <ReturnButton onClick={() => navigate('/techobol/deposit-order')} />
          <Tabs defaultValue='depositOrder'>
            <Tabs.List>
              <Tabs.Tab
                value='depositOrder'
                onClick={() =>
                  navigate(`/techobol/deposit-order-detail/${id}/deposit-order`)
                }
              >
                Orden de deposito
              </Tabs.Tab>
              <Tabs.Tab
                value='depositOrderReport'
                onClick={() =>
                  navigate(
                    `/techobol/deposit-order-detail/${id}/deposit-order-report`
                  )
                }
                disabled={depositOrder.status?.toUpperCase() === Status.EMITTED}
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
