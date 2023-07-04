import { Modal, Button } from '@mantine/core'
import { TextInput } from '@mantine/core'
import { Select } from '@mantine/core'

import { useBranchOffice } from '../../../hooks/useBranchOffice'

interface RegisterUserProps {
  opened: boolean
  close: () => void
  branchOffice: ReturnType<typeof useBranchOffice>
}

const RegisterBrachOfficeModal = ({
  branchOffice,
  opened,
  close
}: RegisterUserProps) => {
  const onCloseModal = () => {
    branchOffice.form.reset()
    close()
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onCloseModal}
        title={'Registrar sucursal'}
        size={'lg'}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
      >
        <form
          onSubmit={branchOffice.form.onSubmit(() => {
            branchOffice.registerBranchOffice()
          })}
        >
          <div className='space-y-5'>
            <TextInput
              label={'Sucursal'}
              placeholder='Sucursal'
              withAsterisk
              {...branchOffice.form.getInputProps('name')}
            />
            <TextInput
              label={'Dirección'}
              placeholder='Dirección'
              withAsterisk
              {...branchOffice.form.getInputProps('address')}
            />
            <Select
              maxDropdownHeight={160}
              zIndex={30}
              label={'Regional'}
              placeholder={'Regional'}
              data={branchOffice.regionals}
              withAsterisk
              searchable
              {...branchOffice.form.getInputProps('regionalOfficeId')}
            />

            <div className='flex justify-end'>
              <Button
                type={'submit'}
                className='bg-blue-600 hover:bg-blue-700'
                loading={branchOffice.isLoading}
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

export default RegisterBrachOfficeModal
