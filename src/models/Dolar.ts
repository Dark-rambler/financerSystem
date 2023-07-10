import { IBranchModel } from "./BranchOffice"

export interface IDolar { 
    id?: number
    branchOfficeId: number
    branchOffice?: IBranchModel
    date: Date | null
    amount: number | string
    amountBs: number | string
    description: string
}