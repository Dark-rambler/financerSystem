import { IBranchModel } from "./BranchOffice"
import { IAccount } from "./Account"
import { ISubAccount } from "./SubAccount"

export interface IExpense {
    id?: number
    depositOrderId?: number
    documentType: string
    documentNumber: string
    date: Date | null
    branchOfficeId: number
    branchOffice?: IBranchModel,
    expenseType: string
    amount: number | string
    description: string
    accountId: number
    account?: IAccount
    subAccountId: number
    subAccount?: ISubAccount
}