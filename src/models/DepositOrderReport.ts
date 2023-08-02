import { IMoneyCollection } from './MoneyCollection'
import { IExpense } from './Expense'
import { IEnvelope } from './Envelope'
import { IDollar } from './Dollar'
import { IDeposit } from './Deposit'

export interface IDepositOrderData {
  deliveredDate: Date
  moneyCollectionAmount: number
  expenseAmount: number
  dollarAmountUSD: number
  dollarAmountBs: number
  envelopeAmount: number
  depositAmount: number
}

export interface IDepositOrderReport {
  depositOrderId: number
  moneyCollections: IMoneyCollection[]
  expenses: IExpense[]
  envelopes: IEnvelope[]
  dollars: IDollar[]
  deposits: IDeposit[]
}
