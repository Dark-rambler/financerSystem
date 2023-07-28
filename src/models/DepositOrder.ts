import { EmployeeInterface } from './Employee'
import { RegionalOfficeInterface } from './RegionalOffice'

export interface DepositOrderInterface {
  amount: number
  deliveryDate: Date
  employeeId?: number
  employee?: EmployeeInterface
  endDate: Date
  id?: number
  orderNumber: string
  regionalId?: number
  regional?: RegionalOfficeInterface
  revisionStatus?: string
  solitudeDate: Date
  startDate: Date
  status?: string
  documentUrl?: string
  generatedReportUrl?: string 
  reportUrl?: string
  [key: string]: any
}
