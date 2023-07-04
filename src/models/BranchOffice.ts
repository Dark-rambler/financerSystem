import { RegionalOfficeInterface } from './RegionalOffice'

export interface IBranchModel {
  id?: number
  name: string
  address: string
  regionalOfficeId: number
  regionalOffice?: RegionalOfficeInterface
}
