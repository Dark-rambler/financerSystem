import { IBranchModel } from "./BranchOffice"

export interface IEnvelope {
  id?: number
  fromBranchOfficeId: number
  fromBranchOffice?: IBranchModel
  toBranchOfficeId: number
  toBranchOffice?: IBranchModel
  amount: number | string
  date: Date | null
  description: string
}
