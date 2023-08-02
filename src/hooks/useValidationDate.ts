import jwtDecode from 'jwt-decode'
import { useLoginStore } from '../components/store/loginStore'
import { useRealTimeDate } from './useRealTimeDate'
interface DecodedToken {
  exp: number
}
export const useValidatioDate = () => {
  const { token } = useLoginStore()
  const currentDate = useRealTimeDate()
  let expirationDateInSeconds = 0
  if (token) {
    const decodedToken: DecodedToken = jwtDecode(token)
    expirationDateInSeconds = decodedToken.exp
  }
  const currentDateInSeconds = Math.floor(Number(currentDate) / 1000)

  if (currentDateInSeconds < expirationDateInSeconds) {
    return false
  }
  return true
}
