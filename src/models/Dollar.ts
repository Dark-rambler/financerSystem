import { IBranchModel } from "./BranchOffice"

export interface IDollar { 
    id?: number
    depositOrderId?: number
    branchOfficeId: number
    branchOffice?: IBranchModel
    date: Date | null
    amount: number | string
    amountBs: number | string
    description: string
}