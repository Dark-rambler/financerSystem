import { Modal, Button } from '@mantine/core'
import { TextInput } from '@mantine/core'
import { PasswordInput } from '@mantine/core'
import { Select } from '@mantine/core'

import { SimpleGrid } from '@mantine/core'

interface RegisterUserProps {
  opened: boolean
  close: () => void
}

const RegisterUser = ({ opened, close }: RegisterUserProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={'Registrar usuario'}
        size={'lg'}
      >
        <div className='space-y-5'>
        <SimpleGrid cols={2}>
          <TextInput placeholder='Nombre' label={'Nombre'} />
          <TextInput label={'Apellidos'} placeholder={'Apellidos'} />
          <TextInput
            label={'Correo electronico'}
            placeholder='Correo electronico'
          />
          <PasswordInput label={'Contraseña'} placeholder='Contraseña' />
          <Select
            label={'Rol'}
            placeholder='Rol'
            data={['Administrador', 'Empleado']}
          />
          <Select
            label={'Regional'}
            placeholder={'Regional'}
            data={['Administrador', 'Empleado']}
          />
        </SimpleGrid>
        <div className='flex justify-end'>
          <Button className='bg-blue-600 hover:bg-blue-700'>Guardar</Button>
        </div>
        </div>
       
      </Modal>
    </>
  )
}

export default RegisterUser
