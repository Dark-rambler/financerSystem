import { create } from 'zustand'
import { DepositOrderInterface } from '../../models/DepositOrder'

interface Store {
  depositOrder: DepositOrderInterface
  setDepositOrder: (depositOrder: DepositOrderInterface) => void
}

export const useDepositOrderStore = create<Store>()(set => ({
  depositOrder: {
    id: 0,
    deliveryDate: new Date(),
    employeeId: 0,
    amount: 0,
    orderNumber: '',
    solitudeDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    documentUrl: ''
  },
  setDepositOrder: (depositOrder: DepositOrderInterface) =>
    set({ depositOrder: depositOrder })
}))
