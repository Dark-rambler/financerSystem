import { IBranchModel } from './BranchOffice'
import { EmployeeInterface } from './Employee'

export interface IMoneyCollection {
  id?: number
  depositOrderId?:  number
  date: Date | null
  branchOfficeId: number
  branchOffice?: IBranchModel
  amount: number | string
  deliveredBy: string 
  receivedById: number
  receivedBy?: EmployeeInterface
}
