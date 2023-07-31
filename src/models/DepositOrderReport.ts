import { IMoneyCollection } from './MoneyCollection'
import { IExpense } from './Expense'
import { IEnvelope } from './Envelope'
import { IDollar } from './Dollar'
import { IDeposit } from './Deposit'

export interface IDepositOrderReport {
  moneyCollections: IMoneyCollection[]
  expenses: IExpense[]
  envelopes: IEnvelope[]
  dollars: IDollar[]
  deposits: IDeposit[]
  depositOrderId: number
}
