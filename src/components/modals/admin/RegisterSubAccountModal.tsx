import { Modal, Button } from '@mantine/core'
import { TextInput } from '@mantine/core'
import { Select } from '@mantine/core'

import { useSubAccount } from '../../../hooks/useSubAccount'

interface RegisterUserProps {
  opened: boolean
  close: () => void
  subAccount: ReturnType<typeof useSubAccount>
}

const RegisterSubAccountModal = ({
    subAccount,
  opened,
  close
}: RegisterUserProps) => {
  const onCloseModal = () => {
    subAccount.form.reset()
    close()
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onCloseModal}
        title={'Registrar subcuenta financiera'}
        size={'lg'}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
      >
        <form
          onSubmit={subAccount.form.onSubmit(() => {
            subAccount.registerSubAccount()
          })}
        >
          <div className='space-y-5'>
            <TextInput
              label={'Subcuenta financiera'}
              placeholder='Subcuenta financiera'
              withAsterisk
              {...subAccount.form.getInputProps('name')}
            />
            <Select
              maxDropdownHeight={80}
              zIndex={30}
              label={'Cuenta financiera'}
              placeholder={'Cuenta financiera'}
              data={subAccount.accounts}
              withAsterisk
              searchable
              {...subAccount.form.getInputProps('accountId')}
            />

            <div className='flex justify-end'>
              <Button
                type={'submit'}
                className='bg-blue-600 hover:bg-blue-700'
                loading={subAccount.isLoading}
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

export default RegisterSubAccountModal
