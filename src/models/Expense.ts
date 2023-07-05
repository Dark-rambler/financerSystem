import { IBranchModel } from "./BranchOffice"
import { IAccount } from "./Account"
import { ISubAccount } from "./SubAccount"

export interface IExpense {
    id?: number
    documentType: string
    documentNumber: string
    date: string
    branchOfficeId: number
    branchOffice?: IBranchModel
    amount: number
    description: string
    accountId: string
    account?: IAccount
    subAccountId: string
    subAccount?: ISubAccount
}