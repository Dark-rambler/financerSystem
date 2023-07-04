import { IAccount } from './Account'

export interface ISubAccount {
  id?: number
  name: string
  accountId: number
  account?: IAccount
}
