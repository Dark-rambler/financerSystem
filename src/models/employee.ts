import { Role } from "./Roles"
import { RegionalOfficeInterface } from "./RegionalOffice"

interface EmployeeInterface {
  name: string
  lastName: string
  email?: string
  password?: string
  roleId: number
  role: Role
  regionalId: number
  regionalOffice: RegionalOfficeInterface

}

export default EmployeeInterface
