import { Modal, Button } from '@mantine/core'
import { TextInput } from '@mantine/core'

import { useAccount } from '../../../hooks/useAccount'

interface RegisterUserProps {
  opened: boolean
  close: () => void
  account: ReturnType<typeof useAccount>
}

const RegisterAccountModal = ({
  account,
  opened,
  close
}: RegisterUserProps) => {
  const onCloseModal = () => {
    account.form.reset()
    close()
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onCloseModal}
        title={'Registrar cuenta financiera'}
        size={'lg'}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
      >
        <form
          onSubmit={account.form.onSubmit(() => {
            account.registerAccount()
          })}
        >
          <div className='space-y-5'>
            <TextInput
              label={'Cuenta financiera'}
              placeholder='Cuenta financiera'
              withAsterisk
              {...account.form.getInputProps('name')}
            />

            <div className='flex justify-end'>
              <Button
                type={'submit'}
                className='bg-blue-600 hover:bg-blue-700'
                loading={account.isLoading}
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

export default RegisterAccountModal
