import EmployeeInterface from "./Employee"
import { RegionalOfficeInterface } from "./RegionalOffice"

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
    revitionStatus?: string
    solitudeDate: Date
    startDate: Date
    status?: string
    documentUrl?: string
    [key: string]: any
  }
  