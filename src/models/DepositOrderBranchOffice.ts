import { IBranchModel } from "./BranchOffice"

export interface IDepositOrderBranchOffice {
  id?: number
  depositOrderId: number
  branchOfficeId: number
  amount: number

  branchOffice?: IBranchModel
}
