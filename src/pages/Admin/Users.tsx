import { Input, Button } from '@mantine/core'
import { TbSearch, TbPlus } from 'react-icons/tb'

import RegisterUser from '../../components/modals/admin/RegisterUserModal'
import UserTable from '../../components/table/admin/UserTable'
import { useUser } from '../../hooks/useUser'
import DeleteModal from '../../components/modals/DeleteModal'

const Users = () => {
  const user = useUser()

  const openModal = () => {
    user.form.setFieldValue('password', Math.random().toString(36).slice(2))
    user.open()
  }

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>USUARIOS</h1>
          </div>
          <div className='flex space-x-4'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={user.onFilterTextBoxChanged}
            />
            <Button
              leftIcon={<TbPlus />}
              size='sm'
              variant='filled'
              color='blue'
              radius={'sm'}
              className='bg-blue-600 hover:bg-blue-700'
              onClick={openModal}
            >
              Registrar nuevo usuario
            </Button>
          </div>
        </div>

        <div className='h-[calc(100%-60px)] overflow-y-auto max-2xl:border-x-2 '>
          <UserTable user={user} gridRef={user.gridRef} />
        </div>
      </div>
      <RegisterUser user={user} opened={user.opened} close={user.close} />
      <DeleteModal
        label={'Usuario'}
        opened={user.openedDelete}
        close={user.handlersDelete.close}
        onDelete={user.onDeleteUser}
      />
    </>
  )
}

export default Users
