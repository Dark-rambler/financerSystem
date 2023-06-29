import { Table, Input, Button, ActionIcon } from '@mantine/core'
import {
  getAllEmployeesWithRoles,
  createEmployee
} from '../../services/EmployeeService'

import { useEffect, useState } from 'react'
import EmployeeInterface from '../../models/Employee'
import { TbSearch, TbPlus, TbTrash } from 'react-icons/tb'

import RegisterUser from '../../components/modals/admin/RegisterUser'

import { useLoginStore } from '../../components/store/loginStore'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'

const Users = () => {
  const [opened, {open, close}] = useDisclosure()
  const [users, setUsers] = useState<EmployeeInterface[]>([])
  const { token } = useLoginStore()

  const getEmployees = async () => {
    const data = await getAllEmployeesWithRoles(token)
    if (!data) {
      return
    }
    setUsers(data)
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>USUARIOS</h1>
          </div>

          <div className='flex space-x-5'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              // onChange={onFilterTextBoxChanged}
            />
            <Button
              leftIcon={<TbPlus />}
              size='sm'
              variant='filled'
              color='blue'
              radius={'sm'}
              className='bg-blue-600 hover:bg-blue-700'
              onClick={open}
            >
              Registrar nuevo usuario
            </Button>
          </div>
        </div>

        <div className='h-[calc(100%-60px)] border border-gray-300 rounded-md overflow-y-auto'>
          <Table
            horizontalSpacing={'xl'}
            verticalSpacing={'sm'}
            striped
            highlightOnHover
            withColumnBorders
          >
            <thead className='bg-gray-100 rounded-xl'>
              <tr>
                <th className='rounded-md'>Nombre</th>
                <th>Apellido</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Regional</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>{user.regionalOffice.name}</td>
                  <td>
                    <ActionIcon className='bg-gray-100 hover:bg-gray-200'>
                      <TbTrash size={'20px'} />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* <div className='h-[calc(100%-46px)]'>

        </div> */}
        <RegisterUser opened={opened} close={close} />
      </div>
    </>
  )
}

export default Users
