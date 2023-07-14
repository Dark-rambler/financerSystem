import { create } from 'zustand'
import { DepositOrderInterface } from '../../models/DepositOrder'
import { IDepositOrderBranchOffice } from '../../models/DepositOrderBranchOffice'

interface Store {
  depositOrder: DepositOrderInterface
  setDepositOrder: (depositOrder: DepositOrderInterface) => void
  depositBranchOffice: IDepositOrderBranchOffice[]
  setDepositBranchOffice: (depositBranchOffice: IDepositOrderBranchOffice[]) => void
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
    endDate: new Date()
  },
  setDepositOrder: (depositOrder: DepositOrderInterface) =>
    set({ depositOrder: depositOrder }),
  depositBranchOffice: [],
  setDepositBranchOffice: (depositBranchOffice: IDepositOrderBranchOffice[]) =>
    set({ depositBranchOffice: depositBranchOffice })

}))
