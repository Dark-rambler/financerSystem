import { IMoneyCollection } from './MoneyCollection'
import { IExpense } from './Expense'
import { IEnvelope } from './Envelope'
import { IDolar } from './Dolar'
import { IDeposit } from './Deposit'

export interface IDepositOrderReport {
  moneyCollections: IMoneyCollection[]
  expenses: IExpense[]
  envelopes: IEnvelope[]
  dolars: IDolar[]
  deposits: IDeposit[]
}
