import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'

import { IDeposit } from '../models/Deposit'
import { useLoginStore } from '../components/store/loginStore'

export const useDeposit = () => {
  const { token } = useLoginStore()
  const [deposits, setDeposits] = useState<IDeposit[]>([])
  const [depositOpened, depositOpenedHandler] = useDisclosure()

  return {
    depositOpened,
    depositOpenedHandler,
    deposits
  }
}
