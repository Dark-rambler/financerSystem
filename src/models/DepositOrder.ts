import EmployeeInterface from "./Employee"
import { RegionalOfficeInterface } from "./RegionalOffice"

export interface DepositOrderInterface {
    amount: number
    deliveryDate: Date
    employee: EmployeeInterface
    endDate: Date
    id: number
    orderNumber: string
    regional: RegionalOfficeInterface
    revitionStatus: string
    solitudeDate: Date
    startDate: Date
    status: string
    documentUrl: string
    [key: string]: any
  }
  