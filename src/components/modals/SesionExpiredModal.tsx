import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import { Modal, Button, Stack } from '@mantine/core'

import { useValidatioDate } from '../../hooks/useValidationDate'
import useAuthentication from '../../hooks/useAuthentication'


const SesionExpiredModal = () => {
  const { logOut } = useAuthentication()
  return (
    <>
      <Modal
        opened={useValidatioDate()}
        onClose={() => {}}
       
        withCloseButton={false}
        styles={{
          title: { fontSize: '18px', fontWeight: 'bold' },
          body: { padding: '20px' }
        }}
        size={'md'}
      >
        <Stack 
        align='center'
        >
          <h1 className='font-extrabold'>Su sesión ha expirado</h1>
          <BsFillExclamationTriangleFill className='text-[40px] text-yellow-600' />
          <p>Por favor ingrese a su cuenta nuevamente</p>
          <Button variant='outline' onClick={logOut}>
            Iniciar sesion
          </Button>
        </Stack>
      </Modal>
    </>
  )
}

export default SesionExpiredModal
