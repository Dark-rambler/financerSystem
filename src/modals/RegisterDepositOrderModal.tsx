import { Modal } from '@mantine/core'
import SelectRegionalOffice from '../components/forms/SelectRegionalOffice'
import RegisterDepositOrderForm from '../components/forms/RegisterDepositOrderForm'
import { useState } from 'react'

interface RegisterDepositOrderProps {
  opened: boolean
  close: () => void
}

const RegisterDepositOrderModal: React.FC<RegisterDepositOrderProps> = ({
  opened,
  close
}) => {
  const [step, setStep] = useState(0)

  const changeStep = (step: number) => {
    setStep(step)
  }

  return (
    <Modal
      opened={opened}
      onClose={() => {close()}}
      title={'Emitir nueva orden de depósito'}
      size={step === 0 ? 'sm' : 'lg'}
      closeOnClickOutside={false}
      closeOnEscape={true}
    >
      {step === 0 && (
        <SelectRegionalOffice
          changeStepForward={() => {
            changeStep(1)
          }}
        />
      )}

      {step === 1 && (
        <RegisterDepositOrderForm
          changeStepForward={() => {
            changeStep(2)
          }}
          changeStepBackward={() => {
            changeStep(0)
          }}
        />
      )}
    </Modal>
  )
}

export default RegisterDepositOrderModal
