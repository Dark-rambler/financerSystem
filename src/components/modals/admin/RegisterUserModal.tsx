import { Modal, Button } from '@mantine/core'
import { TextInput } from '@mantine/core'
import { Select } from '@mantine/core'

import { SimpleGrid } from '@mantine/core'
import { useUser } from '../../../hooks/useUser'

interface RegisterUserProps {
  opened: boolean
  close: () => void
  user: ReturnType<typeof useUser>
}

const RegisterUser = ({ user, opened, close }: RegisterUserProps) => {
  const onCloseModal = () => {
    user.form.reset()
    close()
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onCloseModal}
        title={'Registrar usuario'}
        size={'lg'}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
      >
        <form
          onSubmit={user.form.onSubmit(() => {
            user.registerUser()
          })}
        >
          <div className='space-y-5'>
            <SimpleGrid cols={2}>
              <TextInput
                placeholder='Nombre'
                label={'Nombre'}
                withAsterisk
                {...user.form.getInputProps('name')}
              />
              <TextInput
                label={'Apellidos'}
                placeholder={'Apellidos'}
                withAsterisk
                {...user.form.getInputProps('lastName')}
              />
              <TextInput
                label={'Correo electrónico'}
                placeholder='Correo electronico'
                withAsterisk
                {...user.form.getInputProps('email')}
              />
              <Select
                maxDropdownHeight={124}
                zIndex={30}
                label={'Regional'}
                placeholder={'Regional'}
                data={user.regionals}
                withAsterisk
                searchable
                {...user.form.getInputProps('regionalOfficeId')}
                onChange={e => (
                  user.onSelectRegional(e ?.toString() || ''),
                  user.form.getInputProps('regionalOfficeId').onChange(e)
                )}

              />
            </SimpleGrid>
            <Select
              label={'Rol'}
              maxDropdownHeight={162}
              placeholder='Rol'
              data={user.filteredRoles}
              withAsterisk
              searchable
              {...user.form.getInputProps('roleId')}
            />
            <div className='flex justify-end'>
              <Button
                type={'submit'}
                className='bg-blue-600 hover:bg-blue-700'
                loading={user.isLoading}
              >
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default RegisterUser
