import { Role } from "./Roles"
import { RegionalOfficeInterface } from "./RegionalOffice"

export interface EmployeeInterface {
  id? : number
  name: string
  lastName: string
  email: string
  password: string
  roleId: number
  role?: Role
  regionalOfficeId: number
  regionalOffice?: RegionalOfficeInterface
}


